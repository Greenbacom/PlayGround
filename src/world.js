import * as THREE from 'three';
import {
  TAU, rand, randInt, pick, clamp, lerp, mulberry32,
  canvasTexture, labelTexture, radialTexture, makeCanvas,
} from './utils.js';

const PALETTE = {
  walls: [0xf0c761, 0xe88c5a, 0x64a7b5, 0xd96a7c, 0x86b56e, 0xe8d8a8, 0xc47b9f],
  roofs: [0xa8452e, 0x8f3a27, 0xbf5b35, 0x78352b],
  flags: [0xffd23f, 0x31a95f, 0x2f86d8, 0xf04e7d, 0xff7438, 0xfff3d6, 0x8f5bd6],
};

class FireSystem {
  constructor(scene, position) {
    this.position = position;
    this.count = 110;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);
    const sizes = new Float32Array(this.count);
    const alphas = new Float32Array(this.count);
    this.data = [];
    for (let i = 0; i < this.count; i++) {
      this.data.push({
        angle: rand(TAU), radius: rand(0.65), speed: rand(0.85, 0.35), phase: rand(1),
        sway: rand(0.7, 0.1), base: rand(0.25, -0.05), size: rand(0.65, 0.22),
      });
      positions[i * 3 + 1] = -999;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));
    this.geometry = geo;
    this.material = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aSize; attribute float aAlpha; attribute vec3 aColor;
        varying vec3 vColor; varying float vAlpha;
        void main() {
          vColor = aColor; vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (420.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vColor; varying float vAlpha;
        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float a = smoothstep(0.5, 0.02, length(p));
          gl_FragColor = vec4(vColor, a * vAlpha);
        }`,
    });
    this.points = new THREE.Points(geo, this.material);
    this.points.position.copy(position);
    this.points.frustumCulled = false;
    scene.add(this.points);

    this.glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialTexture('rgba(255,190,70,1)', 'rgba(255,60,0,0)', [
        [0, 'rgba(255,235,160,0.95)'], [0.25, 'rgba(255,160,50,0.65)'], [0.6, 'rgba(255,60,10,0.18)'], [1, 'rgba(255,0,0,0)'],
      ]),
      color: 0xffb45a, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    this.glow.scale.set(5.5, 5.5, 1);
    this.glow.position.copy(position).add(new THREE.Vector3(0, 1.2, 0));
    scene.add(this.glow);

    this.light = new THREE.PointLight(0xff7a2a, 42, 21, 2);
    this.light.position.copy(position).add(new THREE.Vector3(0, 1.8, 0));
    scene.add(this.light);
    this._c1 = new THREE.Color(0xfff2a0);
    this._c2 = new THREE.Color(0xff5a10);
    this._c = new THREE.Color();
  }

  update(time) {
    const pos = this.geometry.attributes.position.array;
    const col = this.geometry.attributes.aColor.array;
    const sizes = this.geometry.attributes.aSize.array;
    const alphas = this.geometry.attributes.aAlpha.array;
    for (let i = 0; i < this.count; i++) {
      const d = this.data[i];
      const life = (time * d.speed + d.phase) % 1;
      const y = d.base + life * 2.6;
      const spread = d.radius * (0.25 + life * 0.75);
      const a = d.angle + time * 1.8 + life * 3.1;
      pos[i * 3] = Math.cos(a) * spread + Math.sin(time * 5 + i) * d.sway * life * 0.2;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(a) * spread + Math.cos(time * 4 + i * 1.7) * d.sway * life * 0.2;
      const t = clamp(life * 1.8, 0, 1);
      this._c.copy(this._c1).lerp(this._c2, t);
      col[i * 3] = this._c.r; col[i * 3 + 1] = this._c.g; col[i * 3 + 2] = this._c.b;
      sizes[i] = d.size * (1.25 - life * 0.7);
      alphas[i] = Math.sin(Math.min(1, life) * Math.PI) * 0.95;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aColor.needsUpdate = true;
    this.geometry.attributes.aSize.needsUpdate = true;
    this.geometry.attributes.aAlpha.needsUpdate = true;
    const flicker = 0.86 + Math.sin(time * 13.2) * 0.06 + Math.sin(time * 7.7) * 0.05 + Math.random() * 0.05;
    this.light.intensity = 42 * flicker;
    this.glow.scale.setScalar(5.1 + Math.sin(time * 9) * 0.35);
    this.glow.material.opacity = 0.85 + Math.sin(time * 11) * 0.1;
  }
}

export class World {
  constructor(renderer) {
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x6e3b58, 58, 205);
    this.colliders = [];
    this.fronds = [];
    this.clouds = [];
    this.lanterns = [];
    this.dawn = 0;
    this.time = 0;
    this.playRadius = 34;
    this.tex = this.makeTextures();
    this.materials = {};
    this.buildSky();
    this.buildGround();
    this.buildChurch();
    this.buildHouses();
    this.buildStalls();
    this.buildLamps();
    this.buildBonfire();
    this.buildPalms();
    this.buildBunting();
    this.buildScatter();
    this.buildDistant();
    this.buildFireflies();
    this.buildLights();
    this.initialSun = this.sun.position.clone();
  }

  // --------------------------------------------------------------- helpers
  mat(color, opts = {}) {
    const key = `${color}-${opts.roughness ?? 0.9}-${opts.emissive ?? 0}-${opts.emissiveIntensity ?? 1}-${opts.metalness ?? 0}-${opts.flat ?? true}-${opts.transparent ?? false}`;
    if (this.materials[key]) return this.materials[key];
    const m = new THREE.MeshStandardMaterial({
      color, roughness: opts.roughness ?? 0.9, metalness: opts.metalness ?? 0,
      flatShading: opts.flat ?? true,
      emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.emissiveIntensity ?? 1,
      transparent: opts.transparent ?? false, opacity: opts.opacity ?? 1,
      side: opts.side ?? THREE.FrontSide, depthWrite: opts.depthWrite ?? true,
    });
    this.materials[key] = m;
    return m;
  }

  texMat(map, color = 0xffffff, opts = {}) {
    return new THREE.MeshStandardMaterial({
      map, color, roughness: opts.roughness ?? 1, metalness: 0,
      flatShading: opts.flat ?? false, side: opts.side ?? THREE.FrontSide,
    });
  }

  add(mesh, parent = this.scene, cast = true, receive = true) {
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    parent.add(mesh);
    return mesh;
  }

  box(w, h, d, color, x = 0, y = 0, z = 0, opts = {}) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.mat(color, opts));
    m.position.set(x, y, z);
    return m;
  }

  addCollider(x, z, r, h = 4) {
    this.colliders.push({ x, z, r, h });
  }

  makeTextures() {
    const dirt = canvasTexture(512, (ctx, s) => {
      const rng = mulberry32(7);
      ctx.fillStyle = '#8a6642';
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 2500; i++) {
        const x = rng() * s, y = rng() * s, r = rng() * 2.1 + 0.3;
        const l = 20 + rng() * 25;
        ctx.fillStyle = `hsla(32, ${18 + rng() * 12}%, ${l}%, ${0.18 + rng() * 0.25})`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      }
      for (let i = 0; i < 55; i++) {
        ctx.fillStyle = `rgba(45, 28, 14, ${0.04 + rng() * 0.06})`;
        ctx.beginPath(); ctx.ellipse(rng() * s, rng() * s, 18 + rng() * 50, 10 + rng() * 26, rng() * TAU, 0, TAU); ctx.fill();
      }
      ctx.strokeStyle = 'rgba(255, 230, 180, .06)';
      for (let i = 0; i < 80; i++) {
        ctx.lineWidth = 0.6 + rng() * 1.4;
        ctx.beginPath();
        const x = rng() * s, y = rng() * s;
        ctx.moveTo(x, y); ctx.lineTo(x + (rng() - 0.5) * 26, y + (rng() - 0.5) * 26); ctx.stroke();
      }
    }, { repeat: 9 });

    const cobble = canvasTexture(512, (ctx, s) => {
      const rng = mulberry32(19);
      ctx.fillStyle = '#3c322b';
      ctx.fillRect(0, 0, s, s);
      const cell = 46;
      for (let row = -1; row < s / cell + 1; row++) {
        for (let col = -1; col < s / cell + 1; col++) {
          const x = col * cell + (row % 2 ? cell / 2 : 0) + (rng() - 0.5) * 8;
          const y = row * cell + (rng() - 0.5) * 8;
          const rx = cell * (0.37 + rng() * 0.11);
          const ry = cell * (0.3 + rng() * 0.1);
          const l = 30 + rng() * 18;
          ctx.fillStyle = `hsl(${22 + rng() * 14}, ${9 + rng() * 11}%, ${l}%)`;
          ctx.beginPath();
          ctx.ellipse(x, y, rx, ry, rng() * TAU, 0, TAU);
          ctx.fill();
          ctx.strokeStyle = `rgba(255, 236, 200, ${0.03 + rng() * 0.05})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.fillStyle = `rgba(255, 235, 200, ${0.025 + rng() * 0.05})`;
          ctx.beginPath(); ctx.ellipse(x - rx * 0.2, y - ry * 0.25, rx * 0.5, ry * 0.38, 0, 0, TAU); ctx.fill();
        }
      }
    }, { repeat: 9 });

    const roof = canvasTexture(256, (ctx, s) => {
      const rng = mulberry32(3);
      ctx.fillStyle = '#9f3e2c';
      ctx.fillRect(0, 0, s, s);
      for (let y = 0; y < s; y += 26) {
        ctx.fillStyle = `rgba(60, 14, 10, ${0.3 + rng() * 0.12})`;
        ctx.fillRect(0, y, s, 3);
        for (let x = (y / 26) % 2 ? 13 : 0; x < s; x += 26) {
          ctx.strokeStyle = 'rgba(58, 12, 8, .35)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x + 13, y + 1, 13, 0, Math.PI, false);
          ctx.stroke();
          ctx.fillStyle = `rgba(255, 150, 90, ${0.025 + rng() * 0.04})`;
          ctx.beginPath(); ctx.arc(x + 13, y + 3, 11, 0, Math.PI, false); ctx.fill();
        }
      }
    }, { repeat: 2 });

    const wood = canvasTexture(256, (ctx, s) => {
      const rng = mulberry32(11);
      ctx.fillStyle = '#6e4428';
      ctx.fillRect(0, 0, s, s);
      for (let x = 0; x < s; x += 32) {
        ctx.fillStyle = `rgba(30, 14, 6, ${0.2 + rng() * 0.2})`;
        ctx.fillRect(x, 0, 2, s);
        ctx.fillStyle = `rgba(255, 210, 150, ${0.02 + rng() * 0.035})`;
        ctx.fillRect(x + 3, 0, 1, s);
      }
      for (let i = 0; i < 70; i++) {
        ctx.strokeStyle = `rgba(48, 24, 10, ${0.06 + rng() * 0.13})`;
        ctx.lineWidth = 0.7 + rng();
        ctx.beginPath();
        const x = rng() * s, y = rng() * s;
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x + 20, y + 5, x + 30, y - 8, x + 70, y + 2);
        ctx.stroke();
      }
    }, { repeat: 2 });

    const stripe = new THREE.CanvasTexture(makeCanvas(256, (ctx, s) => {
      ctx.fillStyle = '#f3e3b7'; ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#d94a3e';
      for (let x = -s; x < s * 2; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x + 32, 0); ctx.lineTo(x + 32 - s, s); ctx.lineTo(x - s, s);
        ctx.closePath(); ctx.fill();
      }
    }));
    stripe.wrapS = stripe.wrapT = THREE.RepeatWrapping;
    stripe.repeat.set(2, 1);
    stripe.colorSpace = THREE.SRGBColorSpace;

    return { dirt, cobble, roof, wood, stripe };
  }

  // ------------------------------------------------------------------ sky
  buildSky() {
    this.skyUniforms = {
      topColor: { value: new THREE.Color(0x211a4a) },
      midColor: { value: new THREE.Color(0x9c3d6b) },
      horizonColor: { value: new THREE.Color(0xffa25e) },
      sunColor: { value: new THREE.Color(0xffd98a) },
      sunDir: { value: new THREE.Vector3(0.14, 0.1, -1).normalize() },
      dawn: { value: 0 },
    };
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(300, 36, 22),
      new THREE.ShaderMaterial({
        side: THREE.BackSide, depthWrite: false, fog: false,
        uniforms: this.skyUniforms,
        vertexShader: `
          varying vec3 vWorld;
          void main() {
            vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          varying vec3 vWorld;
          uniform vec3 topColor; uniform vec3 midColor; uniform vec3 horizonColor;
          uniform vec3 sunColor; uniform vec3 sunDir; uniform float dawn;
          void main() {
            vec3 d = normalize(vWorld);
            float h = clamp(d.y, -0.3, 1.0);
            vec3 col = mix(horizonColor, midColor, smoothstep(0.0, 0.3, h));
            col = mix(col, topColor, smoothstep(0.22, 0.78, h));
            float sd = max(dot(d, normalize(sunDir)), 0.0);
            col += sunColor * pow(sd, 260.0) * 2.1;
            col += sunColor * pow(sd, 7.0) * 0.18;
            col = mix(col, vec3(0.06, 0.04, 0.09), smoothstep(0.02, -0.24, d.y));
            gl_FragColor = vec4(col, 1.0);
          }`,
      })
    );
    sky.scale.setScalar(-1);
    sky.renderOrder = -100;
    this.scene.add(sky);
    this.sky = sky;

    const starGeo = new THREE.BufferGeometry();
    const count = 260;
    const pos = new Float32Array(count * 3);
    const rng = mulberry32(55);
    for (let i = 0; i < count; i++) {
      const theta = rng() * TAU;
      const phi = Math.acos(rng() * 0.65 + 0.2);
      const r = 280;
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.cos(phi) * r;
      pos[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xffe8c2, size: 1.35, sizeAttenuation: false, transparent: true,
      opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    }));
    this.scene.add(this.stars);
  }

  // --------------------------------------------------------------- ground
  buildGround() {
    const base = new THREE.Mesh(
      new THREE.PlaneGeometry(480, 480),
      new THREE.MeshStandardMaterial({ color: 0x39462f, roughness: 1, metalness: 0, flatShading: true })
    );
    base.rotation.x = -Math.PI / 2;
    base.position.y = -0.06;
    base.receiveShadow = true;
    this.scene.add(base);

    const arena = new THREE.Mesh(
      new THREE.CircleGeometry(47, 64),
      this.texMat(this.tex.dirt, 0xffffff, { roughness: 1 })
    );
    arena.rotation.x = -Math.PI / 2;
    arena.position.y = 0.005;
    arena.receiveShadow = true;
    this.scene.add(arena);

    const plaza = new THREE.Mesh(
      new THREE.CircleGeometry(15.5, 64),
      this.texMat(this.tex.cobble, 0xd7baa2, { roughness: 0.95 })
    );
    plaza.rotation.x = -Math.PI / 2;
    plaza.position.y = 0.018;
    plaza.receiveShadow = true;
    this.scene.add(plaza);

    const path = new THREE.Mesh(
      new THREE.PlaneGeometry(4.6, 20),
      this.texMat(this.tex.cobble, 0xd0b49b, { roughness: 0.95 })
    );
    path.rotation.x = -Math.PI / 2;
    path.position.set(0, 0.02, -24);
    path.receiveShadow = true;
    this.scene.add(path);

    // Stone border around plaza.
    const stoneGeo = new THREE.DodecahedronGeometry(0.28, 0);
    const stoneMat = this.mat(0x8b8578, { roughness: 1 });
    const border = new THREE.InstancedMesh(stoneGeo, stoneMat, 44);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 44; i++) {
      const a = (i / 44) * TAU;
      const r = 15.65 + rand(0.15, -0.15);
      dummy.position.set(Math.cos(a) * r, rand(0.12, 0.02), Math.sin(a) * r);
      dummy.rotation.set(rand(TAU), rand(TAU), rand(TAU));
      dummy.scale.setScalar(rand(1.25, 0.65));
      dummy.updateMatrix();
      border.setMatrixAt(i, dummy.matrix);
    }
    border.receiveShadow = true;
    border.castShadow = false;
    this.scene.add(border);

    // Ground confetti.
    const confGeo = new THREE.CircleGeometry(0.055, 3);
    const confMat = new THREE.MeshStandardMaterial({ roughness: 1, side: THREE.DoubleSide, flatShading: true });
    const confetti = new THREE.InstancedMesh(confGeo, confMat, 180);
    const colors = PALETTE.flags.map((c) => new THREE.Color(c));
    for (let i = 0; i < 180; i++) {
      const a = rand(TAU);
      const r = rand(15, 2.5);
      dummy.position.set(Math.cos(a) * r, 0.032, Math.sin(a) * r);
      dummy.rotation.set(-Math.PI / 2, 0, rand(TAU));
      dummy.scale.setScalar(rand(1.4, 0.6));
      dummy.updateMatrix();
      confetti.setMatrixAt(i, dummy.matrix);
      confetti.setColorAt(i, pick(colors));
    }
    confetti.instanceColor.needsUpdate = true;
    this.scene.add(confetti);
  }

  // ----------------------------------------------------------------- church
  buildChurch() {
    const g = new THREE.Group();
    g.position.set(0, 0, -39);
    const cream = this.mat(0xf2e2bd);
    const creamDark = this.mat(0xdcc79a);
    const stone = this.mat(0xa49a87);
    const red = this.mat(0x8f3325);
    const woodMat = this.texMat(this.tex.wood, 0x8a6040);
    const glass = this.mat(0x3b2b6e, { emissive: 0xffb45e, emissiveIntensity: 0.7, roughness: 0.4 });
    const blueGlass = this.mat(0x274a8a, { emissive: 0x5f8dff, emissiveIntensity: 0.9, roughness: 0.3 });

    this.add(this.box(13, 7, 9, 0xf2e2bd, 0, 3.5, 0), g);
    this.add(this.box(13.6, 0.6, 9.6, 0xa49a87, 0, 0.3, 0), g);
    // Facade pediment.
    const pedShape = new THREE.Shape();
    pedShape.moveTo(-7.2, 0); pedShape.lineTo(7.2, 0); pedShape.lineTo(0, 3.4); pedShape.closePath();
    const ped = new THREE.Mesh(new THREE.ExtrudeGeometry(pedShape, { depth: 0.7, bevelEnabled: false }), cream);
    ped.position.set(0, 7, 4.2);
    this.add(ped, g);
    // Main roof.
    const roofGeo = new THREE.ConeGeometry(8.6, 3.4, 4);
    const roof = new THREE.Mesh(roofGeo, this.mat(0x893122, { flat: true }));
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(1, 1, 0.78);
    roof.position.set(0, 9.8, 0);
    this.add(roof, g);

    // Towers.
    for (const side of [-1, 1]) {
      const tx = side * 6.2;
      this.add(this.box(3.1, 11, 3.1, 0xf2e2bd, tx, 5.5, 3.6), g);
      this.add(this.box(3.5, 0.55, 3.5, 0xa49a87, tx, 0.28, 3.6), g);
      this.add(this.box(3.4, 0.4, 3.4, 0xe4d1a2, tx, 10.7, 3.6), g);
      const tr = new THREE.Mesh(new THREE.ConeGeometry(2.45, 4.2, 4), red);
      tr.rotation.y = Math.PI / 4;
      tr.position.set(tx, 13, 3.6);
      this.add(tr, g);
      // Cross.
      const crossMat = this.mat(0xffd77a, { emissive: 0xffb13d, emissiveIntensity: 0.35, metalness: 0.3, roughness: 0.4 });
      const v = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.5, 0.12), crossMat);
      v.position.set(tx, 16.1, 3.6); this.add(v, g, false, false);
      const h = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.12, 0.12), crossMat);
      h.position.set(tx, 16.35, 3.6); this.add(h, g, false, false);
      // Tower windows.
      for (const y of [5, 7.6]) {
        this.add(this.box(0.85, 1.5, 0.1, 0x3b2b6e, tx, y, 5.18, { emissive: 0xffb45e, emissiveIntensity: 0.45 }), g, false, false);
        this.add(this.box(1.15, 0.14, 0.16, 0x7a5836, tx, y - 0.82, 5.2), g, false, false);
      }
    }

    // Arched door.
    this.add(this.box(2.5, 3.5, 0.2, 0x4b2a16, 0, 1.75, 4.53), g);
    const arch = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.2, 18, 1, false, 0, Math.PI), woodMat);
    arch.rotation.z = Math.PI / 2;
    arch.rotation.y = Math.PI / 2;
    arch.position.set(0, 3.5, 4.53);
    this.add(arch, g, false, false);
    this.add(this.box(0.16, 0.16, 0.12, 0xffcf5a, 0.45, 1.65, 4.68, { metalness: 0.6, roughness: 0.3 }), g, false, false);

    // Rose window.
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.14, 8, 24), creamDark);
    ring.position.set(0, 6.6, 4.58);
    this.add(ring, g, false, false);
    const rose = new THREE.Mesh(new THREE.CircleGeometry(1.18, 20), blueGlass);
    rose.position.set(0, 6.6, 4.57);
    this.add(rose, g, false, false);
    for (let i = 0; i < 8; i++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.2, 0.06), creamDark);
      spoke.position.set(0, 6.6, 4.6);
      spoke.rotation.z = (i / 8) * Math.PI;
      this.add(spoke, g, false, false);
    }

    // Steps.
    this.add(this.box(14, 0.35, 2.4, 0xb2a794, 0, 0.17, 5.6), g);
    this.add(this.box(12.4, 0.28, 1.7, 0xc3b8a3, 0, 0.5, 5.35), g);

    // Sign.
    const sign = new THREE.Mesh(
      new THREE.PlaneGeometry(4.6, 1.0),
      new THREE.MeshBasicMaterial({ map: labelTexture('IGREJA DE SÃO JOÃO', { bg: '#f3dfae', fg: '#5a2415', size: 128 }) })
    );
    sign.position.set(0, 4.75, 4.68);
    g.add(sign);

    // Side windows.
    for (const side of [-1, 1]) {
      for (let i = 0; i < 3; i++) {
        this.add(this.box(0.12, 1.7, 1.1, 0x3b2b6e, side * 6.55, 4.5, -2.4 + i * 2.5, { emissive: 0xffb45e, emissiveIntensity: 0.55 }), g, false, false);
      }
    }

    this.scene.add(g);
    this.addCollider(0, -39, 7.6, 16);
    this.addCollider(-6.2, -35.4, 2.2, 16);
    this.addCollider(6.2, -35.4, 2.2, 16);
    this.church = g;
  }

  // ----------------------------------------------------------------- houses
  buildHouses() {
    const specs = [
      { a: 22, r: 31, w: 6.2, d: 5.4, h: 3.8, sign: 'AÇAÍ DA VILA', color: 1 },
      { a: 64, r: 31.5, w: 7, d: 5.5, h: 4.1, sign: 'FORRÓ DO ZÉ', color: 3 },
      { a: 110, r: 31, w: 5.6, d: 5, h: 3.5, sign: 'PASTEL & MILHO', color: 0 },
      { a: 152, r: 31.5, w: 6.3, d: 5.2, h: 4.0, sign: 'CASA DA VOVÓ', color: 5 },
      { a: 208, r: 31.5, w: 6.6, d: 5.4, h: 3.9, sign: 'ARTESANATO', color: 2 },
      { a: 252, r: 31, w: 5.8, d: 5, h: 3.6, sign: 'BOTECO DA LUZ', color: 4 },
      { a: 296, r: 31.5, w: 6.8, d: 5.5, h: 4.2, sign: 'SORVETE DE CAJU', color: 6 },
      { a: 338, r: 31, w: 6.0, d: 5.1, h: 3.7, sign: 'A CASA AMARELA', color: 0 },
    ];
    for (const spec of specs) {
      const rad = (spec.a * Math.PI) / 180;
      const x = Math.sin(rad) * spec.r;
      const z = Math.cos(rad) * spec.r;
      const rot = Math.atan2(-x, -z);
      this.buildHouse(x, z, rot, spec);
    }
  }

  buildHouse(x, z, rot, spec) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rot;
    const wallColor = pick(PALETTE.walls);
    const roofColor = pick(PALETTE.roofs);
    const { w, d, h } = spec;
    const wall = this.mat(wallColor);
    const trim = this.mat(0xf3e3bd);

    const body = this.box(w, h, d, wallColor, 0, h / 2, 0);
    this.add(body, g);
    this.add(this.box(w + 0.35, 0.45, d + 0.35, 0xa89b86, 0, 0.22, 0), g);
    this.add(this.box(w + 0.6, 0.24, d + 0.6, 0xf3e3bd, 0, h + 0.1, 0), g);

    // Gable roof.
    const rh = 1.65;
    const half = (w + 1.1) / 2;
    const slopeLen = Math.hypot(half, rh) + 0.55;
    const angle = Math.atan2(rh, half);
    for (const side of [-1, 1]) {
      const slope = new THREE.Mesh(new THREE.BoxGeometry(slopeLen, 0.16, d + 1.2), this.texMat(this.tex.roof, 0xffffff));
      slope.position.set(side * half / 2, h + rh / 2 + 0.12, 0);
      slope.rotation.z = side * angle;
      this.add(slope, g);
    }
    const ridge = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, d + 1.2, 5), this.mat(roofColor, { roughness: 0.8 }));
    ridge.rotation.x = Math.PI / 2;
    ridge.position.set(0, h + rh + 0.18, 0);
    this.add(ridge, g);
    const gableShape = new THREE.Shape();
    gableShape.moveTo(-half + 0.5, 0); gableShape.lineTo(half - 0.5, 0); gableShape.lineTo(0, rh); gableShape.closePath();
    const gableGeo = new THREE.ShapeGeometry(gableShape);
    for (const side of [-1, 1]) {
      const gable = new THREE.Mesh(gableGeo, wall);
      gable.position.set(0, h, side * (d / 2 + 0.01));
      gable.rotation.y = side > 0 ? 0 : Math.PI;
      this.add(gable, g, true, false);
    }

    // Door.
    this.add(this.box(1.15, 2.15, 0.16, 0x4d2b16, 0, 1.08, d / 2 + 0.08), g);
    this.add(this.box(1.35, 0.12, 0.26, 0x2b160b, 0, 2.2, d / 2 + 0.12), g);
    this.add(this.box(0.12, 0.12, 0.12, 0xffcf5a, 0.34, 1.02, d / 2 + 0.2, { metalness: 0.5, roughness: 0.3 }), g, false, false);

    // Windows with glowing panes.
    const paneMat = this.mat(0x3a2412, { emissive: 0xffa447, emissiveIntensity: 1.5, roughness: 0.5 });
    const darkPane = this.mat(0x272b40, { emissive: 0x415a9e, emissiveIntensity: 0.5, roughness: 0.4 });
    const positions = [
      [-w * 0.29, h * 0.62], [w * 0.29, h * 0.62],
    ];
    for (let i = 0; i < positions.length; i++) {
      const [wx, wy] = positions[i];
      this.add(this.box(0.9, 1.1, 0.12, 0x4b2a16, wx, wy, d / 2 + 0.06), g, false, false);
      this.add(this.box(0.74, 0.92, 0.05, i === 1 ? 0x272b40 : 0xffa447, wx, wy, d / 2 + 0.14, {
        emissive: i === 1 ? 0x415a9e : 0xffa447, emissiveIntensity: i === 1 ? 0.45 : 1.5, roughness: 0.4,
      }), g, false, false);
      this.add(this.box(0.06, 0.94, 0.08, 0x4b2a16, wx, wy, d / 2 + 0.17), g, false, false);
      this.add(this.box(0.76, 0.06, 0.08, 0x4b2a16, wx, wy, d / 2 + 0.17), g, false, false);
      // Shutters.
      this.add(this.box(0.18, 1.05, 0.08, wallColor, wx - 0.56, wy, d / 2 + 0.15), g, false, false);
      this.add(this.box(0.18, 1.05, 0.08, wallColor, wx + 0.56, wy, d / 2 + 0.15), g, false, false);
    }

    // Sign above door.
    if (spec.sign) {
      const sign = new THREE.Mesh(
        new THREE.PlaneGeometry(2.7, 0.62),
        new THREE.MeshBasicMaterial({ map: labelTexture(spec.sign, { bg: '#efd9a5', fg: '#4a2114', size: 128 }) })
      );
      sign.position.set(0, h - 0.45, d / 2 + 0.13);
      g.add(sign);
    }

    // Porch awning.
    if (Math.random() < 0.6) {
      const awning = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 1.2), this.texMat(this.tex.stripe, 0xffffff));
      awning.position.set(0, 2.75, d / 2 + 0.55);
      awning.rotation.x = -0.12;
      this.add(awning, g);
      for (const side of [-1, 1]) {
        this.add(this.box(0.1, 2.7, 0.1, 0x5a3a22, side * 1.05, 1.35, d / 2 + 1.0), g);
      }
    }

    // Chimney.
    const chim = this.box(0.55, 1.2, 0.55, 0x9d5a3b, w * 0.3, h + 1.7, -d * 0.2);
    this.add(chim, g);

    // Door lantern + halo.
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), this.mat(0xffd27a, { emissive: 0xffb13d, emissiveIntensity: 2.2 }));
    lamp.position.set(0.9, 2.5, d / 2 + 0.2);
    g.add(lamp);
    const lampWorld = lamp.position.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), rot).add(g.position);
    this.addHalo(lampWorld, 0.85, 0xffb45e);

    this.scene.add(g);
    this.addCollider(x, z, Math.max(w, d) * 0.54 + 0.6, h + 2);
    if (Math.random() < 0.8) {
      this.lanterns.push({ pos: lampWorld, intensity: 0.8 });
    }
  }

  addHalo(pos, size, color = 0xffb45e, opacity = 0.55) {
    const mat = new THREE.SpriteMaterial({
      map: radialTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0)'),
      color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const s = new THREE.Sprite(mat);
    s.position.copy(pos);
    s.scale.set(size, size, 1);
    this.scene.add(s);
    return s;
  }

  // ----------------------------------------------------------------- stalls
  buildStalls() {
    const spots = [
      { x: 12.5, z: 7.5, rot: Math.atan2(-12.5, -7.5) },
      { x: -12.5, z: 5.5, rot: Math.atan2(12.5, -5.5) },
    ];
    for (const spot of spots) {
      const g = new THREE.Group();
      g.position.set(spot.x, 0, spot.z);
      g.rotation.y = spot.rot;
      // Counter.
      this.add(this.box(3.4, 1.05, 1.0, 0x7b4b2c, 0, 0.52, 0), g);
      this.add(this.box(3.8, 0.14, 1.4, 0x9a6a3f, 0, 1.1, 0), g);
      this.add(this.box(3.5, 0.5, 0.12, 0x5a341d, 0, 0.6, 0.5), g);
      // Posts and striped awning.
      for (const sx of [-1.55, 1.55]) {
        this.add(this.box(0.11, 2.9, 0.11, 0x5a3a22, sx, 1.45, -0.55), g);
      }
      const awning = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.14, 2.0), this.texMat(this.tex.stripe, 0xffffff));
      awning.position.set(0, 2.95, -0.15);
      awning.rotation.x = -0.16;
      this.add(awning, g);
      // Bunting on posts.
      this.add(this.box(0.08, 0.5, 0.08, 0x5a3a22, -1.55, 3.2, 0.4), g);
      // Goods.
      const colors = [0xffd23f, 0xe88c5a, 0x9e6b3f, 0x31a95f, 0xf04e7d];
      for (let i = 0; i < 8; i++) {
        const item = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 0), this.mat(pick(colors)));
        item.position.set(rand(1.4, -1.4), 1.28, rand(0.3, -0.3));
        g.add(item);
      }
      // Small sign.
      const sign = new THREE.Mesh(
        new THREE.PlaneGeometry(1.8, 0.5),
        new THREE.MeshBasicMaterial({ map: labelTexture('FESTA JUNINA', { bg: '#f3dfae', fg: '#5a2415', size: 128 }) })
      );
      sign.position.set(0, 2.2, 0.64);
      g.add(sign);

      this.scene.add(g);
      this.addCollider(spot.x, spot.z, 2.1, 3);
    }

    // Crates and barrels near stalls.
    const crates = [
      [15.8, 5.2], [15.1, 4.2], [-15.4, 3.4], [-15.1, 2.4], [9.5, 11.3], [-10.2, 10.7],
    ];
    for (const [x, z] of crates) {
      const c = this.box(0.75, 0.75, 0.75, 0x8a5c37, x, 0.38, z, { roughness: 1 });
      this.add(c);
      this.add(this.box(0.82, 0.08, 0.82, 0x5e3a22, x, 0.74, z), c.parent, false, false);
      this.addCollider(x, z, 0.55, 0.9);
    }
    for (const [x, z] of [[16.2, 6.2], [-16, 4.5], [10.8, 9.6]]) {
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.38, 1.1, 9), this.texMat(this.tex.wood, 0xffffff));
      barrel.position.set(x, 0.55, z);
      this.add(barrel);
      for (const y of [0.25, 0.85]) {
        const band = new THREE.Mesh(new THREE.TorusGeometry(0.41, 0.035, 5, 12), this.mat(0x473c33, { metalness: 0.4, roughness: 0.6 }));
        band.rotation.x = Math.PI / 2; band.position.set(x, y, z); this.add(band, this.scene, false, false);
      }
      this.addCollider(x, z, 0.6, 1.2);
    }
  }

  // ------------------------------------------------------------------ lamps
  buildLamps() {
    this.lampPositions = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * TAU + 0.18;
      const r = 18.3;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      this.lampPositions.push(new THREE.Vector3(x, 0, z));
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      this.add(this.box(1.1, 0.25, 1.1, 0x484038, 0, 0.12, 0), g, false, true);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.11, 4.6, 6), this.mat(0x2c2926, { metalness: 0.3, roughness: 0.7 }));
      pole.position.y = 2.3;
      this.add(pole, g);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.75, 5), this.mat(0x2c2926));
      arm.rotation.z = Math.PI / 2;
      arm.position.set(0.34, 4.5, 0);
      this.add(arm, g);
      const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.5, 0.38), this.mat(0xffcf6a, { emissive: 0xffa12f, emissiveIntensity: 2.4, roughness: 0.25 }));
      lantern.position.set(0.68, 4.32, 0);
      this.add(lantern, g, false, false);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.24, 4), this.mat(0x2c2926));
      cap.position.set(0.68, 4.65, 0);
      this.add(cap, g, false, false);
      this.addHalo(new THREE.Vector3(x + 0.68 * Math.cos(0), 4.32, z), 1.5, 0xffb45e, 0.5);
      this.addCollider(x, z, 0.4, 5);
      this.scene.add(g);
    }
    // Two entrance lamps by the church path.
    for (const side of [-1, 1]) {
      const x = side * 4.2, z = -31.6;
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      this.add(this.box(0.9, 0.2, 0.9, 0x484038, 0, 0.1, 0), g, false, true);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 3.8, 6), this.mat(0x2c2926));
      pole.position.y = 1.9;
      this.add(pole, g);
      const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.46, 0.34), this.mat(0xffcf6a, { emissive: 0xffa12f, emissiveIntensity: 2.2 }));
      lantern.position.y = 3.9;
      this.add(lantern, g, false, false);
      this.addHalo(new THREE.Vector3(x, 3.9, z), 1.3, 0xffb45e, 0.45);
      this.addCollider(x, z, 0.35, 4);
      this.scene.add(g);
    }
  }

  // ---------------------------------------------------------------- bonfire
  buildBonfire() {
    const g = new THREE.Group();
    g.position.set(0, 0, -1.5);
    const stoneMat = this.mat(0x80786a, { roughness: 1 });
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * TAU;
      const s = new THREE.Mesh(new THREE.DodecahedronGeometry(rand(0.25, 0.15), 0), stoneMat);
      s.position.set(Math.cos(a) * 1.35, 0.12, Math.sin(a) * 1.35);
      s.rotation.set(rand(TAU), rand(TAU), rand(TAU));
      this.add(s, g, true, true);
    }
    const wood = this.texMat(this.tex.wood, 0x9b7150);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU;
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 2.4, 6), wood);
      log.position.set(Math.cos(a) * 0.4, 0.55, Math.sin(a) * 0.4);
      log.rotation.z = 0.9;
      log.rotation.y = a;
      this.add(log, g);
    }
    // Little straw figures / ribbons around fire.
    for (let i = 0; i < 7; i++) {
      const a = rand(TAU), r = rand(2.4, 1.7);
      const stake = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.8, 4), this.mat(0x8f6c40));
      stake.position.set(Math.cos(a) * r, 0.4, Math.sin(a) * r);
      this.add(stake, g);
      const ribbon = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.5), new THREE.MeshBasicMaterial({
        color: pick(PALETTE.flags), side: THREE.DoubleSide,
      }));
      ribbon.position.set(Math.cos(a) * r, 0.7, Math.sin(a) * r);
      ribbon.rotation.y = a;
      g.add(ribbon);
    }
    this.scene.add(g);
    this.bonfire = new FireSystem(this.scene, new THREE.Vector3(0, 0.25, -1.5));
    this.addCollider(0, -1.5, 1.75, 2.5);
  }

  // ------------------------------------------------------------------ palms
  buildPalms() {
    const spots = [
      [22, -4, 1.25], [-22, -2, 1.1], [18, 16, 1.0], [-18, -15, 1.2],
      [5, 23, 0.9], [-6, -22, 1.0], [25, 12, 0.95], [-24, -21, 1.05],
      [26, -20, 1.15], [-26, 18, 0.9],
    ];
    for (const [x, z, scale] of spots) {
      this.buildPalm(x, z, scale);
    }
    // Banana plants.
    for (const [x, z] of [[19, 6], [-20, 9], [8, -19], [-9, 18], [14, -17], [-14, 13]]) {
      this.buildBanana(x, z);
    }
  }

  buildPalm(x, z, scale = 1) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rand(TAU);
    g.scale.setScalar(scale);
    const trunkMat = this.mat(0x6d4b2d, { roughness: 1 });
    let px = 0, pz = 0;
    const segments = 6;
    for (let i = 0; i < segments; i++) {
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.18 - i * 0.017, 0.21 - i * 0.017, 1.2, 6), trunkMat);
      seg.position.set(px, 0.6 + i * 1.12, pz);
      seg.rotation.z = i * 0.028;
      px += 0.045;
      this.add(seg, g);
    }
    const top = new THREE.Group();
    top.position.set(px, segments * 1.12, pz);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x2f7a45, roughness: 1, side: THREE.DoubleSide, flatShading: true,
    });
    for (let i = 0; i < 8; i++) {
      const leaf = new THREE.Mesh(this.makeLeafGeometry(0.55, 3.5, 0.55), leafMat);
      leaf.rotation.y = (i / 8) * TAU + rand(0.2, -0.2);
      leaf.rotation.x = rand(-0.1, -0.5);
      leaf.position.y = rand(0.12, 0);
      top.add(leaf);
    }
    for (let i = 0; i < 3; i++) {
      const nut = new THREE.Mesh(new THREE.SphereGeometry(0.17, 5, 4), this.mat(0x6b4a26));
      nut.position.set(rand(0.3, -0.3), rand(-0.2, -0.45), rand(0.3, -0.3));
      top.add(nut);
    }
    g.add(top);
    this.fronds.push({ group: top, phase: rand(TAU) });
    this.scene.add(g);
    this.addCollider(x, z, 0.5, 7);
  }

  makeLeafGeometry(width, length, bend) {
    const geo = new THREE.PlaneGeometry(width, length, 1, 6);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = (y + length / 2) / length;
      pos.setX(i, pos.getX(i) * Math.sin(t * Math.PI * 0.9) * (1 - t * 0.35));
      pos.setZ(i, -Math.sin(t * Math.PI) * bend - t * t * 1.2);
    }
    geo.rotateX(-Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  }

  buildBanana(x, z) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rand(TAU);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 2.2, 5), this.mat(0x638d45));
    stem.position.y = 1.1;
    this.add(stem, g);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x4e9b51, roughness: 1, side: THREE.DoubleSide, flatShading: true });
    for (let i = 0; i < 5; i++) {
      const leaf = new THREE.Mesh(this.makeLeafGeometry(0.75, 2.2, 0.7), leafMat);
      leaf.position.y = 2.0;
      leaf.rotation.y = (i / 5) * TAU;
      leaf.rotation.x = rand(0.1, -0.35);
      g.add(leaf);
    }
    this.scene.add(g);
    this.addCollider(x, z, 0.45, 2);
  }

  // ---------------------------------------------------------------- bunting
  buildBunting() {
    const flagGeo = new THREE.BufferGeometry();
    flagGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
      -0.24, 0, 0, 0.24, 0, 0, 0, -0.5, 0,
    ]), 3));
    flagGeo.computeVertexNormals();
    const flagMat = new THREE.MeshStandardMaterial({ roughness: 1, side: THREE.DoubleSide, flatShading: true });
    const allFlags = [];
    const strings = [];
    const bulbs = [];

    const addString = (a, b, sag = 0.8, flagCount = 14) => {
      const pts = [];
      const flags = [];
      const seg = 18;
      for (let i = 0; i <= seg; i++) {
        const t = i / seg;
        const p = new THREE.Vector3().lerpVectors(a, b, t);
        p.y -= Math.sin(t * Math.PI) * sag;
        pts.push(p);
      }
      strings.push(pts);
      for (let i = 1; i < flagCount; i++) {
        const t = i / flagCount;
        const p = new THREE.Vector3().lerpVectors(a, b, t);
        p.y -= Math.sin(t * Math.PI) * sag;
        const tangent = new THREE.Vector3().subVectors(
          new THREE.Vector3().lerpVectors(a, b, Math.min(1, t + 0.01)),
          new THREE.Vector3().lerpVectors(a, b, Math.max(0, t - 0.01))
        );
        flags.push({ p, tangent });
      }
      for (let i = 0; i <= seg; i += 3) bulbs.push(pts[i].clone().add(new THREE.Vector3(0, -0.06, 0)));
      return flags;
    };

    const lamps = this.lampPositions;
    for (let i = 0; i < lamps.length; i++) {
      const a = lamps[i].clone().add(new THREE.Vector3(0, 4.45, 0));
      const b = lamps[(i + 1) % lamps.length].clone().add(new THREE.Vector3(0, 4.45, 0));
      const flags = addString(a, b, 1.0, 15);
      allFlags.push(...flags);
    }
    // Diagonal strings above the plaza.
    addString(lamps[0].clone().setY(6.2), lamps[4].clone().setY(6.2), 1.5, 22).forEach((f) => allFlags.push(f));
    addString(lamps[2].clone().setY(6.0), lamps[6].clone().setY(6.0), 1.4, 22).forEach((f) => allFlags.push(f));
    // Strings from houses to lamps.
    addString(new THREE.Vector3(-10, 7.8, 25), lamps[1].clone().setY(6.4), 1.1, 16).forEach((f) => allFlags.push(f));
    addString(new THREE.Vector3(13, 7.2, -24), lamps[5].clone().setY(6.2), 1.1, 16).forEach((f) => allFlags.push(f));

    const inst = new THREE.InstancedMesh(flagGeo, flagMat, allFlags.length);
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    allFlags.forEach((f, i) => {
      dummy.position.copy(f.p);
      dummy.rotation.set(rand(0.12, -0.12), Math.atan2(-f.tangent.z, f.tangent.x), rand(0.12, -0.12));
      dummy.scale.setScalar(rand(1.15, 0.85));
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
      inst.setColorAt(i, color.set(pick(PALETTE.flags)));
    });
    inst.instanceColor.needsUpdate = true;
    inst.castShadow = false;
    this.scene.add(inst);

    for (const pts of strings) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xd9c9a3, transparent: true, opacity: 0.5 }));
      this.scene.add(line);
    }

    const bulbGeo = new THREE.BufferGeometry().setFromPoints(bulbs);
    const bulbMat = new THREE.PointsMaterial({
      map: radialTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0)'),
      color: 0xffd27a, size: 0.14, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    this.scene.add(new THREE.Points(bulbGeo, bulbMat));
  }

  // --------------------------------------------------------------- scatter
  buildScatter() {
    // Grass tufts.
    const grassGeo = new THREE.ConeGeometry(0.1, 0.6, 3);
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x4f7b3c, roughness: 1, flatShading: true });
    const grass = new THREE.InstancedMesh(grassGeo, grassMat, 150);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 150; i++) {
      const a = rand(TAU);
      const r = rand(39, 16.5);
      dummy.position.set(Math.cos(a) * r, 0.28, Math.sin(a) * r);
      dummy.rotation.set(rand(0.2, -0.2), rand(TAU), rand(0.2, -0.2));
      dummy.scale.set(rand(1.7, 0.7), rand(1.8, 0.6), rand(1.4, 0.6));
      dummy.updateMatrix();
      grass.setMatrixAt(i, dummy.matrix);
    }
    grass.castShadow = false;
    this.scene.add(grass);

    // Bushes.
    const bushGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const bushMat = new THREE.MeshStandardMaterial({ color: 0x3c6d3b, roughness: 1, flatShading: true });
    const bushes = new THREE.InstancedMesh(bushGeo, bushMat, 34);
    const moor = mulberry32(101);
    for (let i = 0; i < 34; i++) {
      const a = moor() * TAU;
      const r = 17 + moor() * 12;
      dummy.position.set(Math.cos(a) * r, rand(0.55, 0.2), Math.sin(a) * r);
      dummy.rotation.set(moor() * TAU, moor() * TAU, moor() * TAU);
      dummy.scale.set(rand(1.6, 0.7), rand(1.2, 0.6), rand(1.6, 0.7));
      dummy.updateMatrix();
      bushes.setMatrixAt(i, dummy.matrix);
    }
    bushes.castShadow = true;
    this.scene.add(bushes);

    // Flowers.
    const flowerGeo = new THREE.IcosahedronGeometry(0.09, 0);
    const flowerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true });
    const flowers = new THREE.InstancedMesh(flowerGeo, flowerMat, 80);
    const fcolors = [0xffd23f, 0xf04e7d, 0xff7438, 0xfff3d6, 0x8f5bd6].map((c) => new THREE.Color(c));
    for (let i = 0; i < 80; i++) {
      const a = rand(TAU);
      const r = rand(24, 16.8);
      dummy.position.set(Math.cos(a) * r, rand(0.45, 0.18), Math.sin(a) * r);
      dummy.rotation.set(rand(TAU), rand(TAU), rand(TAU));
      dummy.scale.setScalar(rand(1.6, 0.7));
      dummy.updateMatrix();
      flowers.setMatrixAt(i, dummy.matrix);
      flowers.setColorAt(i, pick(fcolors));
    }
    flowers.instanceColor.needsUpdate = true;
    this.scene.add(flowers);
  }

  // --------------------------------------------------------------- distant
  buildDistant() {
    const rng = mulberry32(42);
    const hillMat = new THREE.MeshStandardMaterial({ color: 0x2b2038, roughness: 1, flatShading: true });
    const hillMat2 = new THREE.MeshStandardMaterial({ color: 0x382645, roughness: 1, flatShading: true });
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * TAU + rng() * 0.15;
      const r = 112 + rng() * 55;
      const h = 16 + rng() * 38;
      const rad = 18 + rng() * 28;
      const cone = new THREE.Mesh(new THREE.ConeGeometry(rad, h, 5 + Math.floor(rng() * 3)), i % 3 ? hillMat : hillMat2);
      cone.position.set(Math.cos(a) * r, h / 2 - 4, Math.sin(a) * r);
      cone.rotation.y = rng() * TAU;
      cone.castShadow = false;
      cone.receiveShadow = false;
      this.scene.add(cone);
    }

    // Low-poly clouds warmed by the setting sun.
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xdf8f93, roughness: 1, flatShading: true, transparent: true, opacity: 0.72 });
    for (let i = 0; i < 7; i++) {
      const g = new THREE.Group();
      const a = -1.4 + i * 0.48 + rng() * 0.2;
      const r = 95 + rng() * 55;
      g.position.set(Math.cos(a) * r, 42 + rng() * 16, Math.sin(a) * r);
      const puffs = 3 + Math.floor(rng() * 3);
      for (let p = 0; p < puffs; p++) {
        const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 0), cloudMat);
        puff.position.set((p - puffs / 2) * 4.4, rng() * 2, rng() * 3);
        puff.scale.set(5 + rng() * 5, 1.3 + rng() * 1.2, 3 + rng() * 2);
        puff.castShadow = false;
        g.add(puff);
      }
      g.userData.speed = 0.2 + rng() * 0.25;
      this.clouds.push(g);
      this.scene.add(g);
    }

    // River glint in the distance.
    const river = new THREE.Mesh(
      new THREE.PlaneGeometry(180, 24),
      new THREE.MeshStandardMaterial({ color: 0x2f4c73, roughness: 0.3, metalness: 0.2, emissive: 0x22253d, emissiveIntensity: 0.4 })
    );
    river.rotation.x = -Math.PI / 2;
    river.position.set(0, -0.4, -118);
    this.scene.add(river);
  }

  buildFireflies() {
    const count = 120;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    this.fireflyData = [];
    for (let i = 0; i < count; i++) {
      const a = rand(TAU);
      const r = rand(35, 4);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const y = rand(4.5, 0.5);
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      this.fireflyData.push({ x, y, z, phase: rand(TAU), speed: rand(1.2, 0.3), amp: rand(0.8, 0.2) });
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      map: radialTexture('rgba(255,255,210,1)', 'rgba(255,210,80,0)', [
        [0, 'rgba(255,250,190,1)'], [0.25, 'rgba(220,255,140,0.8)'], [1, 'rgba(160,255,80,0)'],
      ]),
      color: 0xffeaa8, size: 0.22, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    this.fireflies = new THREE.Points(geo, mat);
    this.fireflies.frustumCulled = false;
    this.scene.add(this.fireflies);
  }

  buildLights() {
    this.hemi = new THREE.HemisphereLight(0xffb9a1, 0x241b33, 0.95);
    this.scene.add(this.hemi);

    const sunPos = new THREE.Vector3(-34, 28, -62);
    this.sun = new THREE.DirectionalLight(0xffb073, 2.5);
    this.sun.position.copy(sunPos);
    this.sun.target.position.set(0, 0, 0);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1024, 1024);
    this.sun.shadow.camera.left = -48;
    this.sun.shadow.camera.right = 48;
    this.sun.shadow.camera.top = 48;
    this.sun.shadow.camera.bottom = -48;
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 190;
    this.sun.shadow.bias = -0.0007;
    this.sun.shadow.normalBias = 0.025;
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    this.rim = new THREE.DirectionalLight(0x6f6dff, 0.55);
    this.rim.position.set(40, 20, 40);
    this.scene.add(this.rim);

    // Two lantern pools of warm light near the plaza.
    this.lampLights = [];
    for (const [i, pos] of [[1, this.lampPositions[1]], [5, this.lampPositions[5]]]) {
      const light = new THREE.PointLight(0xffa155, 16, 13, 2);
      light.position.set(pos.x + 0.68, 4.2, pos.z);
      this.scene.add(light);
      this.lampLights.push(light);
    }
  }

  // ---------------------------------------------------------------- queries
  getSpawnPoint(playerPos, minDist = 12) {
    for (let attempt = 0; attempt < 40; attempt++) {
      const a = rand(TAU);
      const r = rand(34, 28.5);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (playerPos && Math.hypot(x - playerPos.x, z - playerPos.z) < minDist) continue;
      let blocked = false;
      for (const c of this.colliders) {
        if (Math.hypot(x - c.x, z - c.z) < c.r + 1.1) { blocked = true; break; }
      }
      if (!blocked) return new THREE.Vector3(x, 0, z);
    }
    return new THREE.Vector3(rand(22, -22), 0, -24);
  }

  resolveCollision(pos, radius) {
    for (let pass = 0; pass < 2; pass++) {
      for (const c of this.colliders) {
        const dx = pos.x - c.x;
        const dz = pos.z - c.z;
        const min = c.r + radius;
        const d2 = dx * dx + dz * dz;
        if (d2 < min * min && d2 > 0.00001) {
          const d = Math.sqrt(d2);
          pos.x = c.x + (dx / d) * min;
          pos.z = c.z + (dz / d) * min;
        }
      }
    }
  }

  segmentBlocked(from, to, margin = 0) {
    const dx = to.x - from.x;
    const dz = to.z - from.z;
    const len2 = dx * dx + dz * dz;
    if (len2 < 0.0001) return false;
    for (const c of this.colliders) {
      const t = clamp(((c.x - from.x) * dx + (c.z - from.z) * dz) / len2, 0, 1);
      const px = from.x + dx * t;
      const pz = from.z + dz * t;
      const d = Math.hypot(px - c.x, pz - c.z);
      const hitY = lerp(from.y, to.y, t);
      if (d < c.r + margin && hitY < c.h) return true;
    }
    return false;
  }

  // ---------------------------------------------------------------- dawn
  setDawn(t) {
    this.dawn = clamp(t, 0, 1);
    const u = this.skyUniforms;
    const duskTop = new THREE.Color(0x211a4a);
    const duskMid = new THREE.Color(0x9c3d6b);
    const duskHorizon = new THREE.Color(0xffa25e);
    const dawnTop = new THREE.Color(0x3e79b8);
    const dawnMid = new THREE.Color(0xf29aa8);
    const dawnHorizon = new THREE.Color(0xffe1a4);
    u.topColor.value.copy(duskTop).lerp(dawnTop, this.dawn);
    u.midColor.value.copy(duskMid).lerp(dawnMid, this.dawn);
    u.horizonColor.value.copy(duskHorizon).lerp(dawnHorizon, this.dawn);
    this.hemi.intensity = lerp(0.95, 1.8, this.dawn);
    this.sun.intensity = lerp(2.5, 2.9, this.dawn);
    this.sun.color.setHex(0xffb073).lerp(new THREE.Color(0xffd9a0), this.dawn);
    this.scene.fog.color.setHex(0x6e3b58).lerp(new THREE.Color(0xd9988c), this.dawn);
    this.stars.material.opacity = 0.7 * (1 - this.dawn);
    this.bonfire.glow.material.opacity = 0.9 * (1 - this.dawn * 0.55);
  }

  // --------------------------------------------------------------- update
  update(dt, time) {
    this.time = time;
    this.bonfire.update(time);
    const pos = this.fireflies.geometry.attributes.position.array;
    for (let i = 0; i < this.fireflyData.length; i++) {
      const f = this.fireflyData[i];
      pos[i * 3] = f.x + Math.sin(time * f.speed + f.phase) * f.amp;
      pos[i * 3 + 1] = f.y + Math.sin(time * f.speed * 1.7 + f.phase * 2) * 0.35;
      pos[i * 3 + 2] = f.z + Math.cos(time * f.speed * 0.8 + f.phase) * f.amp;
    }
    this.fireflies.geometry.attributes.position.needsUpdate = true;
    this.fireflies.material.opacity = 0.7 + Math.sin(time * 1.3) * 0.15;

    for (const f of this.fronds) {
      f.group.rotation.z = Math.sin(time * 0.8 + f.phase) * 0.035;
      f.group.rotation.x = Math.cos(time * 0.6 + f.phase * 1.3) * 0.025;
    }
    for (const c of this.clouds) {
      c.position.x += c.userData.speed * dt;
      if (c.position.x > 180) c.position.x = -180;
    }
    for (const l of this.lampLights) l.intensity = 15 + Math.sin(time * 9 + l.position.x) * 1.6;
  }
}
