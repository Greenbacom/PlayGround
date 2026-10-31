import * as THREE from '../vendor/three.module.js';
import { glowSprite, sparkSprite, smokeSprite, bulletHoleTexture, ringTexture } from './textures.js';

const PARTICLE_VERT = /* glsl */`
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (260.0 / max(0.2, -mv.z));
    gl_Position = projectionMatrix * mv;
  }
`;

const PARTICLE_FRAG = /* glsl */`
  uniform float uSquare;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d;
    if (uSquare > 0.5) {
      d = max(abs(uv.x), abs(uv.y));
      if (d > 0.5) discard;
      d = smoothstep(0.5, 0.34, d);
    } else {
      float r = length(uv);
      if (r > 0.5) discard;
      d = smoothstep(0.5, 0.08, r);
    }
    gl_FragColor = vec4(vColor, vAlpha * d);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

class ParticlePool {
  constructor(scene, max, square = false, blending = THREE.NormalBlending) {
    this.max = max;
    this.cursor = 0;
    this.pos = new Float32Array(max * 3);
    this.col = new Float32Array(max * 3);
    this.size = new Float32Array(max);
    this.alpha = new Float32Array(max);
    this.vel = new Float32Array(max * 3);
    this.life = new Float32Array(max);
    this.maxLife = new Float32Array(max);
    this.grav = new Float32Array(max);
    this.drag = new Float32Array(max);
    this.grow = new Float32Array(max);
    for (let i = 0; i < max; i++) this.pos[i * 3 + 1] = -999;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { uSquare: { value: square ? 1 : 0 } },
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      transparent: true,
      depthWrite: false,
      blending,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 4;
    scene.add(this.points);
    this.geo = geo;
    this._c = new THREE.Color();
  }

  spawn({ pos, vel, color, size = 0.14, life = 1, gravity = 0, drag = 0.98, grow = 0 }) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.max;
    this.pos[i * 3] = pos.x;
    this.pos[i * 3 + 1] = pos.y;
    this.pos[i * 3 + 2] = pos.z;
    this.vel[i * 3] = vel.x;
    this.vel[i * 3 + 1] = vel.y;
    this.vel[i * 3 + 2] = vel.z;
    this._c.set(color);
    this.col[i * 3] = this._c.r;
    this.col[i * 3 + 1] = this._c.g;
    this.col[i * 3 + 2] = this._c.b;
    this.size[i] = size;
    this.alpha[i] = 1;
    this.life[i] = life;
    this.maxLife[i] = life;
    this.grav[i] = gravity;
    this.drag[i] = drag;
    this.grow[i] = grow;
  }

  update(dt) {
    const { pos, vel, life, maxLife, alpha, size, grav, drag, grow } = this;
    for (let i = 0; i < this.max; i++) {
      if (life[i] <= 0) {
        if (alpha[i] !== 0) { alpha[i] = 0; pos[i * 3 + 1] = -999; }
        continue;
      }
      life[i] -= dt;
      const k = i * 3;
      vel[k + 1] -= grav[i] * dt;
      const d = Math.pow(drag[i], dt * 60);
      vel[k] *= d; vel[k + 1] *= d; vel[k + 2] *= d;
      pos[k] += vel[k] * dt;
      pos[k + 1] += vel[k + 1] * dt;
      pos[k + 2] += vel[k + 2] * dt;
      if (pos[k + 1] < 0.02) {
        pos[k + 1] = 0.02;
        vel[k + 1] *= -0.32;
        vel[k] *= 0.7; vel[k + 2] *= 0.7;
      }
      const t = Math.max(0, life[i] / maxLife[i]);
      alpha[i] = t > 0.72 ? (1 - t) / 0.28 : Math.min(1, t * 2.6);
      if (grow[i]) size[i] += grow[i] * dt;
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.aColor.needsUpdate = true;
    this.geo.attributes.aSize.needsUpdate = true;
    this.geo.attributes.aAlpha.needsUpdate = true;
  }
}

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.confetti = new ParticlePool(scene, 900, true, THREE.NormalBlending);
    this.sparks = new ParticlePool(scene, 500, false, THREE.AdditiveBlending);
    this.dust = new ParticlePool(scene, 320, false, THREE.NormalBlending);
    this._v = new THREE.Vector3();
    this._q = new THREE.Quaternion();
    this._up = new THREE.Vector3(0, 0, 1);

    // tracers
    this.tracers = [];
    this.tracerGroup = new THREE.Group();
    scene.add(this.tracerGroup);

    // decals
    this.decals = [];
    this.decalGroup = new THREE.Group();
    scene.add(this.decalGroup);
    this._holeTex = bulletHoleTexture();

    // smoke sprites
    this.smokes = [];
    this.smokeGroup = new THREE.Group();
    scene.add(this.smokeGroup);
    this._smokeTex = smokeSprite();
    for (let i = 0; i < 30; i++) {
      const mat = new THREE.SpriteMaterial({ map: this._smokeTex, transparent: true, depthWrite: false, opacity: 0 });
      const s = new THREE.Sprite(mat);
      s.visible = false;
      s.userData = { life: 0, max: 1, vel: new THREE.Vector3(), grow: 1 };
      this.smokeGroup.add(s);
      this.smokes.push(s);
    }
    this._smokeCursor = 0;

    // shockwaves
    this.waves = [];
    this.waveGroup = new THREE.Group();
    scene.add(this.waveGroup);
    this._ringTex = ringTexture();

    // debris
    this.debris = [];
    this.debrisGroup = new THREE.Group();
    scene.add(this.debrisGroup);

    // glow sprites pool for muzzle / beacons
    this.glowTex = glowSprite();
  }

  confettiBurst(pos, colors, count = 34, power = 4.2) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const up = 2.2 + Math.random() * power;
      const r = 1 + Math.random() * power;
      this.confetti.spawn({
        pos: { x: pos.x + (Math.random() - 0.5) * 0.3, y: pos.y + Math.random() * 0.5, z: pos.z + (Math.random() - 0.5) * 0.3 },
        vel: { x: Math.cos(a) * r, y: up, z: Math.sin(a) * r },
        color: colors[(Math.random() * colors.length) | 0],
        size: 0.07 + Math.random() * 0.1,
        life: 1.4 + Math.random() * 1.1,
        gravity: 7.5,
        drag: 0.985,
      });
    }
  }

  sparksBurst(pos, normal, count = 10, color = 0xffc75a) {
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      if (normal) v.addScaledVector(normal, 2 + Math.random() * 2);
      this.sparks.spawn({
        pos,
        vel: v,
        color: Math.random() > 0.3 ? color : 0xfff2c4,
        size: 0.05 + Math.random() * 0.07,
        life: 0.18 + Math.random() * 0.32,
        gravity: 9,
        drag: 0.96,
      });
    }
  }

  dustBurst(pos, count = 6, color = 0xbfae94) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      this.dust.spawn({
        pos: { x: pos.x + (Math.random() - 0.5) * 0.2, y: pos.y + 0.05, z: pos.z + (Math.random() - 0.5) * 0.2 },
        vel: { x: Math.cos(a) * (0.5 + Math.random() * 1.4), y: 0.5 + Math.random() * 1.1, z: Math.sin(a) * (0.5 + Math.random() * 1.4) },
        color,
        size: 0.18 + Math.random() * 0.28,
        life: 0.45 + Math.random() * 0.5,
        gravity: -0.4,
        drag: 0.94,
        grow: 0.35,
      });
    }
  }

  smoke(pos, scale = 0.5, life = 1.1, color = 0xbfb4aa) {
    const s = this.smokes[this._smokeCursor];
    this._smokeCursor = (this._smokeCursor + 1) % this.smokes.length;
    s.visible = true;
    s.position.copy(pos);
    s.scale.setScalar(scale);
    s.material.opacity = 0.5;
    s.material.color.set(color);
    s.userData.life = life;
    s.userData.max = life;
    s.userData.vel.set((Math.random() - 0.5) * 0.4, 0.5 + Math.random() * 0.4, (Math.random() - 0.5) * 0.4);
    s.userData.grow = scale * 1.8;
  }

  shockwave(pos, color = 0xffc75a, size = 3.2, life = 0.55) {
    const mat = new THREE.MeshBasicMaterial({
      map: this._ringTex, color, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
    });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    m.rotation.x = -Math.PI / 2;
    m.position.copy(pos);
    m.position.y = Math.max(0.03, pos.y + 0.02);
    m.userData = { life, max: life, size };
    this.waveGroup.add(m);
    this.waves.push(m);
  }

  tracer(from, to, color = 0xffdf9a, width = 1) {
    const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    const line = new THREE.Line(geo, mat);
    line.userData = { life: 0.09, max: 0.09 };
    this.tracerGroup.add(line);
    this.tracers.push(line);
  }

  decal(pos, normal) {
    const mat = new THREE.MeshBasicMaterial({
      map: this._holeTex, transparent: true, opacity: 0.85, depthWrite: false,
      polygonOffset: true, polygonOffsetFactor: -4, toneMapped: false,
    });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.16), mat);
    m.position.copy(pos).addScaledVector(normal, 0.012);
    this._q.setFromUnitVectors(this._up, normal);
    m.quaternion.copy(this._q);
    m.userData = { life: 18 };
    this.decalGroup.add(m);
    this.decals.push(m);
    if (this.decals.length > 56) {
      const old = this.decals.shift();
      this.decalGroup.remove(old);
      old.geometry.dispose();
      old.material.dispose();
    }
  }

  debrisPiece(mesh, pos, vel, spin, life = 2.4) {
    mesh.position.copy(pos);
    mesh.userData = { vel: vel.clone(), spin: spin.clone(), life, max: life };
    this.debrisGroup.add(mesh);
    this.debris.push(mesh);
    return mesh;
  }

  explosion(pos, colors = [0xff4f9a, 0xffd24a, 0x1fd1b2, 0xfff3d6], scale = 1) {
    this.confettiBurst(pos, colors, Math.round(46 * scale), 5.4 * scale);
    this.sparksBurst(pos, null, Math.round(20 * scale), 0xffb347);
    this.shockwave(pos, 0xffc75a, 3.4 * scale, 0.6);
    this.smoke(pos, 0.6 * scale, 1.4);
    this.smoke({ x: pos.x + 0.4, y: pos.y + 0.4, z: pos.z }, 0.4 * scale, 1.1);
  }

  update(dt) {
    this.confetti.update(dt);
    this.sparks.update(dt);
    this.dust.update(dt);

    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const t = this.tracers[i];
      t.userData.life -= dt;
      const k = Math.max(0, t.userData.life / t.userData.max);
      t.material.opacity = k * 0.95;
      if (t.userData.life <= 0) {
        this.tracerGroup.remove(t);
        t.geometry.dispose(); t.material.dispose();
        this.tracers.splice(i, 1);
      }
    }

    for (let i = this.decals.length - 1; i >= 0; i--) {
      const d = this.decals[i];
      d.userData.life -= dt;
      if (d.userData.life < 3) d.material.opacity = Math.max(0, d.userData.life / 3) * 0.85;
      if (d.userData.life <= 0) {
        this.decalGroup.remove(d);
        d.geometry.dispose(); d.material.dispose();
        this.decals.splice(i, 1);
      }
    }

    for (const s of this.smokes) {
      if (!s.visible) continue;
      const u = s.userData;
      u.life -= dt;
      if (u.life <= 0) { s.visible = false; continue; }
      s.position.addScaledVector(u.vel, dt);
      const t = 1 - u.life / u.max;
      s.scale.setScalar(s.scale.x + u.grow * dt);
      s.material.opacity = (1 - t) * 0.45;
    }

    for (let i = this.waves.length - 1; i >= 0; i--) {
      const w = this.waves[i];
      w.userData.life -= dt;
      const t = 1 - w.userData.life / w.userData.max;
      const sc = 0.6 + t * w.userData.size;
      w.scale.set(sc, sc, sc);
      w.material.opacity = Math.max(0, 1 - t) * 0.9;
      if (w.userData.life <= 0) {
        this.waveGroup.remove(w);
        w.geometry.dispose(); w.material.dispose();
        this.waves.splice(i, 1);
      }
    }

    for (let i = this.debris.length - 1; i >= 0; i--) {
      const d = this.debris[i];
      const u = d.userData;
      u.life -= dt;
      u.vel.y -= 14 * dt;
      d.position.addScaledVector(u.vel, dt);
      if (d.position.y < 0.1) { d.position.y = 0.1; u.vel.y *= -0.4; u.vel.x *= 0.7; u.vel.z *= 0.7; }
      d.rotation.x += u.spin.x * dt;
      d.rotation.y += u.spin.y * dt;
      d.rotation.z += u.spin.z * dt;
      if (u.life < 0.5) d.scale.setScalar(Math.max(0.001, u.life / 0.5));
      if (u.life <= 0) {
        this.debrisGroup.remove(d);
        d.traverse?.((o) => { if (o.geometry) o.geometry.dispose(); });
        this.debris.splice(i, 1);
      }
    }
  }
}
