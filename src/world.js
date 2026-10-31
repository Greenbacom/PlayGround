import * as THREE from 'three';
import { canvasTexture, radialSprite, clamp, rand, randInt, pick, TAU, lerp } from './util.js';

const PALETTES = [
  { wall: '#d9776d', trim: '#f2c9a4', win: '#ffcc7a' },
  { wall: '#5fa8a0', trim: '#e7d9b7', win: '#ffd58a' },
  { wall: '#e0b155', trim: '#7a4a3a', win: '#ffe3a1' },
  { wall: '#7d8fc9', trim: '#e8dcc4', win: '#ffcf7d' },
  { wall: '#b56a9e', trim: '#f0cdb2', win: '#ffd98f' },
  { wall: '#c96f4f', trim: '#f4dfc0', win: '#ffd07a' },
  { wall: '#6e9e6b', trim: '#ecd9b8', win: '#ffe1a4' },
  { wall: '#a3585c', trim: '#e9cfae', win: '#ffcf86' },
];

function hash2(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function makeWallTexture(palette, variant) {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = palette.wall;
    ctx.fillRect(0, 0, w, h);
    // weathering streaks
    for (let i = 0; i < 42; i++) {
      const x = rand(0, w);
      ctx.globalAlpha = rand(0.02, 0.08);
      ctx.fillStyle = i % 3 ? '#241a20' : '#ffffff';
      ctx.fillRect(x, 0, rand(1, 7), rand(h * 0.3, h));
    }
    ctx.globalAlpha = 1;
    // subtle bricks
    ctx.strokeStyle = 'rgba(30,10,20,.08)';
    ctx.lineWidth = 1;
    for (let y = 0; y < h; y += 14) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    // windows grid
    const cols = 3;
    const rows = 4;
    const padX = 18;
    const padY = 14;
    const cw = (w - padX * 2) / cols;
    const ch = (h - padY * 2) / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = padX + c * cw + cw * 0.18;
        const y = padY + r * ch + ch * 0.14;
        const ww = cw * 0.58;
        const wh = ch * 0.56;
        const lit = hash2(c + variant * 7, r + variant * 3) > 0.42;
        ctx.fillStyle = 'rgba(22,12,26,.72)';
        ctx.fillRect(x - 3, y - 3, ww + 6, wh + 6);
        if (lit) {
          const g = ctx.createLinearGradient(x, y, x, y + wh);
          g.addColorStop(0, palette.win);
          g.addColorStop(1, '#e88a3e');
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = '#2a1e33';
        }
        ctx.fillRect(x, y, ww, wh);
        if (lit) {
          ctx.fillStyle = 'rgba(255,255,255,.25)';
          ctx.fillRect(x + 2, y + 2, ww - 4, 2);
        }
        // window frame
        ctx.strokeStyle = 'rgba(20,10,18,.55)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, ww, wh);
        ctx.beginPath();
        ctx.moveTo(x + ww / 2, y);
        ctx.lineTo(x + ww / 2, y + wh);
        ctx.stroke();
        // laundry / detail on some
        if (hash2(c + 9, r + variant) > 0.8) {
          ctx.fillStyle = ['#ffbf3c', '#38e08a', '#8b5cf6'][Math.floor(hash2(c, r) * 3)];
          ctx.fillRect(x + 1, y + wh + 4, ww - 2, 3);
        }
      }
    }
    // top trim
    ctx.fillStyle = palette.trim;
    ctx.fillRect(0, 0, w, 7);
    ctx.fillStyle = 'rgba(0,0,0,.22)';
    ctx.fillRect(0, 7, w, 2);
  });
}

function makeRoofTexture() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#7d6a5e');
    g.addColorStop(0.5, '#6d5a4f');
    g.addColorStop(1, '#796457');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i++) {
      ctx.globalAlpha = rand(0.02, 0.1);
      ctx.fillStyle = pick(['#2e2220', '#b9a58f', '#5a463a', '#8f9c72']);
      const s = rand(1, 5);
      ctx.fillRect(rand(0, w), rand(0, h), s, s);
    }
    ctx.globalAlpha = 1;
    // tiles
    ctx.strokeStyle = 'rgba(35,22,20,.5)';
    ctx.lineWidth = 3;
    for (let x = 0; x <= w; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255,240,220,.07)';
    ctx.lineWidth = 1;
    for (let x = 2; x <= w; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    // moss patches
    for (let i = 0; i < 18; i++) {
      ctx.globalAlpha = rand(0.05, 0.16);
      ctx.fillStyle = '#3f5a35';
      ctx.beginPath();
      ctx.ellipse(rand(0, w), rand(0, h), rand(8, 42), rand(6, 24), rand(0, TAU), 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, { repeat: [5, 4] });
}

function makeMuralTexture() {
  return canvasTexture(1024, 384, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#243b4a');
    g.addColorStop(1, '#16222e');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // sun
    ctx.fillStyle = '#ffb03a';
    ctx.beginPath();
    ctx.arc(820, 120, 78, 0, TAU);
    ctx.fill();
    // rays
    ctx.strokeStyle = 'rgba(255,176,58,.55)';
    ctx.lineWidth = 10;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU;
      ctx.beginPath();
      ctx.moveTo(820 + Math.cos(a) * 100, 120 + Math.sin(a) * 100);
      ctx.lineTo(820 + Math.cos(a) * 150, 120 + Math.sin(a) * 150);
      ctx.stroke();
    }
    // hills
    ctx.fillStyle = '#101822';
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.quadraticCurveTo(180, 190, 360, 300);
    ctx.quadraticCurveTo(560, 210, 760, 320);
    ctx.quadraticCurveTo(900, 250, 1024, 330);
    ctx.lineTo(1024, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    // big lettering
    ctx.save();
    ctx.translate(58, 196);
    ctx.rotate(-0.03);
    ctx.font = '900 96px "Arial Black", Impact, sans-serif';
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#0d141c';
    ctx.strokeText('MORRO', 0, 0);
    ctx.fillStyle = '#ffe9c9';
    ctx.fillText('MORRO', 0, 0);
    ctx.font = '900 96px "Arial Black", Impact, sans-serif';
    ctx.strokeText('VIVO', 34, 92);
    ctx.fillStyle = '#ffbf3c';
    ctx.fillText('VIVO', 34, 92);
    ctx.restore();
    // spray marks
    for (let i = 0; i < 26; i++) {
      ctx.globalAlpha = rand(0.05, 0.2);
      ctx.fillStyle = pick(['#38e08a', '#ff4d5e', '#8b5cf6', '#ffbf3c']);
      ctx.beginPath();
      ctx.arc(rand(0, w), rand(0, h), rand(2, 16), 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    // tag
    ctx.save();
    ctx.translate(660, 318);
    ctx.rotate(-0.06);
    ctx.font = 'italic 700 30px "Arial", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.fillText('salve, quebrada', 0, 0);
    ctx.restore();
  });
}

function neonTexture(text, color, sub = '') {
  return canvasTexture(512, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 84px "Arial Black", Impact, sans-serif';
    ctx.shadowColor = color;
    ctx.shadowBlur = 40;
    ctx.fillStyle = color;
    ctx.fillText(text, w / 2, sub ? h / 2 - 18 : h / 2);
    ctx.shadowBlur = 16;
    ctx.fillStyle = '#fff6e8';
    ctx.fillText(text, w / 2, sub ? h / 2 - 18 : h / 2);
    if (sub) {
      ctx.font = '700 30px "Arial", sans-serif';
      ctx.shadowBlur = 22;
      ctx.fillStyle = color;
      ctx.fillText(sub, w / 2, h / 2 + 62);
    }
  });
}

function leafTexture() {
  return canvasTexture(128, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.translate(w / 2, 0);
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#3f8f4b');
    g.addColorStop(1, '#1f5b31');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(38, 60, 26, 140);
    ctx.quadraticCurveTo(16, 210, 0, 256);
    ctx.quadraticCurveTo(-16, 210, -26, 140);
    ctx.quadraticCurveTo(-38, 60, 0, 0);
    ctx.fill();
    // frond notches
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 16; i++) {
      const y = 30 + i * 13;
      const spread = 8 + i * 1.6;
      ctx.beginPath();
      ctx.ellipse(-spread, y, 6, 10, -0.5, 0, TAU);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(spread, y, 6, 10, 0.5, 0, TAU);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 'rgba(150,220,150,.22)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(0, 250);
    ctx.stroke();
  });
}

function buildSky() {
  const geo = new THREE.SphereGeometry(460, 32, 20);
  const uniforms = {
    uTime: { value: 0 },
    uSun: { value: new THREE.Vector3(-0.42, 0.14, -0.9).normalize() },
  };
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms,
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uSun;
      varying vec3 vDir;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float amp = 0.55;
        for (int i = 0; i < 3; i++) {
          v += noise(p) * amp;
          p *= 2.03;
          amp *= 0.5;
        }
        return v;
      }
      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 zenith = vec3(0.045, 0.028, 0.105);
        vec3 mid = vec3(0.23, 0.085, 0.26);
        vec3 horizon = vec3(0.98, 0.40, 0.27);
        vec3 col = mix(horizon, mid, smoothstep(-0.02, 0.26, h));
        col = mix(col, zenith, smoothstep(0.22, 0.72, h));

        float sd = max(dot(d, normalize(uSun)), 0.0);
        col += vec3(1.0, 0.48, 0.2) * pow(sd, 7.0) * 0.5;
        col += vec3(1.0, 0.86, 0.62) * pow(sd, 420.0) * 1.8;

        vec2 cuv = d.xz / max(0.12, d.y + 0.24);
        float cl = fbm(cuv * 1.35 + vec2(uTime * 0.01, uTime * 0.004));
        float band = smoothstep(0.0, 0.22, h) * (1.0 - smoothstep(0.28, 0.6, h));
        col += vec3(1.0, 0.42, 0.32) * cl * band * 0.38;

        float starSeed = hash(floor(d.xz * 340.0) + floor(d.y * 210.0));
        float stars = step(0.9975, starSeed) * smoothstep(0.34, 0.72, h);
        col += vec3(0.75, 0.82, 1.0) * stars * 0.9;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  return { mesh, uniforms };
}

function createChrist() {
  const group = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({
    color: 0xf6e7c8,
    emissive: 0xffe2b0,
    emissiveIntensity: 0.55,
    roughness: 0.85,
  });
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.2, 3.4, 8), stone);
  ped.position.y = 1.7;
  group.add(ped);

  const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.6, 8.6, 8), stone);
  robe.position.y = 7.6;
  group.add(robe);

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.05, 4.4, 8), stone);
  torso.position.y = 13.6;
  group.add(torso);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.95, 10, 8), stone);
  head.position.y = 16.6;
  group.add(head);

  const arms = new THREE.Mesh(new THREE.BoxGeometry(13.5, 0.72, 0.9), stone);
  arms.position.y = 15.2;
  group.add(arms);

  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialSprite('rgba(255,231,180,0.9)', 'rgba(255,170,80,0)'),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.55,
  }));
  halo.scale.set(26, 26, 1);
  halo.position.set(0, 15.4, 1);
  group.add(halo);

  return group;
}

function createCapivara() {
  const group = new THREE.Group();
  const fur = new THREE.MeshStandardMaterial({ color: 0x8a5c3c, roughness: 0.92 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x5a3826, roughness: 0.9 });
  const black = new THREE.MeshStandardMaterial({ color: 0x120c0c, roughness: 0.4 });
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x0b0808, roughness: 0.2 });

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.56, 16, 12), fur);
  body.scale.set(1, 0.82, 1.55);
  body.position.set(0, 0.66, 0);
  group.add(body);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.5, 10), fur);
  neck.position.set(0, 0.95, 0.62);
  neck.rotation.x = 0.4;
  group.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.31, 14, 10), fur);
  head.scale.set(1, 1.05, 1.2);
  head.position.set(0, 1.11, 0.9);
  group.add(head);

  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.24, 0.26), dark);
  snout.position.set(0, 1.02, 1.14);
  group.add(snout);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.06), black);
  nose.position.set(0, 1.09, 1.27);
  group.add(nose);

  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), dark);
    ear.scale.set(0.7, 1, 1.2);
    ear.position.set(side * 0.19, 1.36, 0.83);
    group.add(ear);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), eyeMat);
    eye.position.set(side * 0.2, 1.19, 1.02);
    group.add(eye);
  }

  const legs = [];
  for (const [x, z] of [[-0.32, 0.34], [0.32, 0.34], [-0.32, -0.38], [0.32, -0.38]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.42, 6), dark);
    leg.position.set(x, 0.21, z);
    group.add(leg);
    legs.push(leg);
  }
  group.userData.legs = legs;
  group.userData.head = head;
  return group;
}

function createPalmField(scene) {
  const positions = [
    { x: -11.4, z: -8.6, s: 0.55, indoors: true },
    { x: 11.8, z: 7.2, s: 0.5, indoors: true },
    { x: -24, z: -18, s: 1.5 },
    { x: 28, z: -26, s: 1.35 },
    { x: 15, z: 30, s: 1.2 },
    { x: -38, z: 12, s: 1.6 },
    { x: 48, z: -10, s: 1.7 },
  ];
  const trunkGeo = new THREE.CylinderGeometry(0.11, 0.2, 4.5, 6, 4);
  trunkGeo.translate(0, 2.25, 0);
  const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5e4533 });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, positions.length);
  const leafGeo = new THREE.PlaneGeometry(1.5, 3.4);
  leafGeo.translate(0, 1.7, 0);
  const leafMat = new THREE.MeshLambertMaterial({
    map: leafTexture(),
    transparent: true,
    alphaTest: 0.4,
    side: THREE.DoubleSide,
    color: 0xbfe6b0,
  });
  const leavesPerPalm = 9;
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, positions.length * leavesPerPalm);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const v = new THREE.Vector3();
  const s = new THREE.Vector3();
  let li = 0;
  positions.forEach((p, i) => {
    const baseY = p.indoors ? 0 : -8 - p.s * 2.5;
    const scale = p.indoors ? p.s * 0.9 : p.s;
    e.set(rand(-0.08, 0.08), rand(0, TAU), rand(-0.06, 0.06));
    q.setFromEuler(e);
    v.set(p.x, baseY, p.z);
    s.set(scale, scale * rand(0.95, 1.15), scale);
    m.compose(v, q, s);
    trunks.setMatrixAt(i, m);
    for (let j = 0; j < leavesPerPalm; j++) {
      const angle = (j / leavesPerPalm) * TAU + rand(-0.2, 0.2);
      const droop = rand(0.5, 1.2);
      e.set(droop, angle, 0, 'YXZ');
      q.setFromEuler(e);
      v.set(
        p.x + Math.sin(angle) * 0.15 * scale,
        baseY + 4.45 * scale,
        p.z + Math.cos(angle) * 0.15 * scale,
      );
      s.set(scale * rand(0.85, 1.05), scale * rand(0.9, 1.15), scale);
      m.compose(v, q, s);
      leaves.setMatrixAt(li++, m);
    }
  });
  trunks.instanceMatrix.needsUpdate = true;
  leaves.instanceMatrix.needsUpdate = true;
  trunks.castShadow = false;
  scene.add(trunks, leaves);
}

function buildCity(scene) {
  const group = new THREE.Group();
  const wallMats = PALETTES.map((p, i) => new THREE.MeshLambertMaterial({ map: makeWallTexture(p, i) }));
  const roofMat = new THREE.MeshLambertMaterial({ map: makeRoofTexture(), color: 0x9a8a7c });
  const roofGeo = new THREE.PlaneGeometry(1, 1);
  const roofInstances = [];
  const tankGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.2, 10);
  const tankMat = new THREE.MeshLambertMaterial({ color: 0x3f78a8 });
  const tankData = [];
  const windowGeo = new THREE.PlaneGeometry(0.34, 0.5);
  const windowMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
  const windowData = [];
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const batches = PALETTES.map(() => []);

  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const rotQ = new THREE.Quaternion();
  const xRot = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3();
  const e = new THREE.Euler();

  const addBuilding = ({ angle, radius, topY, w, d, h, palette }) => {
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const rot = rand(-0.3, 0.3);
    rotQ.setFromEuler(e.set(0, rot, 0));
    m.compose(pos.set(x, topY - h / 2, z), rotQ, scl.set(w, h, d));
    batches[palette].push(m.clone());

    q.copy(rotQ).multiply(xRot);
    m.compose(pos.set(x, topY + 0.02, z), q, scl.set(w * 1.03, d * 1.03, 1));
    roofInstances.push(m.clone());

    if (Math.random() < 0.55 && radius < 70) {
      tankData.push({
        x: x + rand(-w * 0.25, w * 0.25),
        y: topY + 0.62,
        z: z + rand(-d * 0.25, d * 0.25),
        s: rand(0.6, 1.1),
      });
    }

    if (Math.random() < 0.75) {
      const n = randInt(2, 5);
      const side = Math.floor(rand(0, 4));
      for (let k = 0; k < n; k++) {
        const hh = rand(-h * 0.8, -h * 0.06);
        const off = rand(-0.34, 0.34);
        let lx = 0;
        let lz = 0;
        let ry = rot;
        if (side === 0) { lx = w / 2 + 0.03; lz = off * d; ry = rot + Math.PI / 2; }
        else if (side === 1) { lx = -w / 2 - 0.03; lz = off * d; ry = rot - Math.PI / 2; }
        else if (side === 2) { lx = off * w; lz = d / 2 + 0.03; ry = rot; }
        else { lx = off * w; lz = -d / 2 - 0.03; ry = rot + Math.PI; }
        windowData.push({
          x: x + lx * Math.cos(rot) + lz * Math.sin(rot),
          y: topY + hh,
          z: z - lx * Math.sin(rot) + lz * Math.cos(rot),
          ry,
          color: pick([0xffcc7a, 0xffb35c, 0xffe3a1, 0x9fd9ff]),
        });
      }
    }
  };

  // the hillside sprawl
  for (let i = 0; i < 92; i++) {
    const angle = rand(0, TAU);
    const radius = 24 + Math.pow(Math.random(), 0.6) * 78;
    const distFade = (radius - 24) / 78;
    const tower = i % 11 === 0 && radius > 52 ? rand(4, 9) : 0;
    const topY = 1.2 - distFade * 11 + rand(-1.8, 1.6) + tower;
    addBuilding({
      angle, radius, topY,
      w: rand(3.2, 7.2) * (1 + distFade * 1.6),
      d: rand(3.2, 7.2) * (1 + distFade * 1.6),
      h: rand(4, 15),
      palette: i % PALETTES.length,
    });
  }
  // a close ridge of roofs just beyond the parapet so the midground reads as a morro
  for (let i = 0; i < 22; i++) {
    const angle = rand(0, TAU);
    const radius = rand(19, 28);
    addBuilding({
      angle, radius,
      topY: rand(-3.2, 1.4),
      w: rand(3, 6),
      d: rand(3, 6),
      h: rand(5, 11),
      palette: randInt(0, PALETTES.length - 1),
    });
  }

  batches.forEach((list, i) => {
    if (!list.length) return;
    const mesh = new THREE.InstancedMesh(boxGeo, wallMats[i], list.length);
    list.forEach((mat, j) => mesh.setMatrixAt(j, mat));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    group.add(mesh);
  });

  const roofs = new THREE.InstancedMesh(roofGeo, roofMat, roofInstances.length);
  roofInstances.forEach((mat, i) => roofs.setMatrixAt(i, mat));
  roofs.instanceMatrix.needsUpdate = true;
  roofs.frustumCulled = false;
  group.add(roofs);

  const tanks = new THREE.InstancedMesh(tankGeo, tankMat, tankData.length);
  tankData.forEach((t, i) => {
    q.identity();
    pos.set(t.x, t.y, t.z);
    scl.set(t.s, t.s, t.s);
    m.compose(pos, q, scl);
    tanks.setMatrixAt(i, m);
  });
  tanks.instanceMatrix.needsUpdate = true;
  group.add(tanks);

  const windowMesh = new THREE.InstancedMesh(windowGeo, windowMat, windowData.length);
  const col = new THREE.Color();
  windowData.forEach((wd, i) => {
    q.setFromEuler(e.set(0, wd.ry, 0));
    pos.set(wd.x + Math.sin(wd.ry) * 0.001, wd.y, wd.z + Math.cos(wd.ry) * 0.001);
    scl.set(1, 1, 1);
    m.compose(pos, q, scl);
    windowMesh.setMatrixAt(i, m);
    windowMesh.setColorAt(i, col.setHex(wd.color));
  });
  windowMesh.instanceMatrix.needsUpdate = true;
  if (windowMesh.instanceColor) windowMesh.instanceColor.needsUpdate = true;
  group.add(windowMesh);

  scene.add(group);
  return group;
}

function buildLandmarks(scene) {
  const group = new THREE.Group();
  const hillMat = new THREE.MeshLambertMaterial({ color: 0x2a1736 });
  const hillMat2 = new THREE.MeshLambertMaterial({ color: 0x1d1029 });

  // layered hills on the horizon
  const hills = [
    { x: -80, y: -22, z: -150, sx: 110, sy: 52, sz: 70, mat: hillMat },
    { x: 80, y: -26, z: -175, sx: 130, sy: 60, sz: 80, mat: hillMat2 },
    { x: 0, y: -30, z: -220, sx: 220, sy: 80, sz: 90, mat: hillMat2 },
    { x: -30, y: -18, z: -120, sx: 55, sy: 30, sz: 45, mat: hillMat },
  ];
  hills.forEach((h) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12), h.mat);
    mesh.position.set(h.x, h.y, h.z);
    mesh.scale.set(h.sx, h.sy, h.sz);
    group.add(mesh);
  });

  // Christ the Redeemer silhouette
  const christ = createChrist();
  christ.position.set(-36, 3, -104);
  christ.scale.setScalar(1.5);
  group.add(christ);

  // Sugarloaf
  const loafMat = new THREE.MeshLambertMaterial({ color: 0x2f1c3d });
  const loaf1 = new THREE.Mesh(new THREE.SphereGeometry(1, 22, 16), loafMat);
  loaf1.position.set(52, -4, -106);
  loaf1.scale.set(19, 27, 17);
  group.add(loaf1);
  const loaf2 = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 12), loafMat);
  loaf2.position.set(73, -9, -102);
  loaf2.scale.set(12, 17, 11);
  group.add(loaf2);

  // cable car thread
  const cableMat = new THREE.LineBasicMaterial({ color: 0x1a0e24 });
  const cableGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(52, 22, -106),
    new THREE.Vector3(73, 7, -102),
  ]);
  group.add(new THREE.Line(cableGeo, cableMat));

  // ocean
  const ocean = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 620),
    new THREE.MeshStandardMaterial({ color: 0x151029, roughness: 0.22, metalness: 0.75 }),
  );
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(0, -27, -140);
  group.add(ocean);

  // sun glitter on the water
  const glitter = new THREE.Mesh(
    new THREE.PlaneGeometry(26, 150),
    new THREE.MeshBasicMaterial({
      map: radialSprite('rgba(255,190,110,0.85)', 'rgba(255,120,60,0)', 128),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      opacity: 0.5,
    }),
  );
  glitter.rotation.x = -Math.PI / 2;
  glitter.position.set(-48, -26.9, -150);
  group.add(glitter);

  scene.add(group);
  return { group, christ };
}

function buildRooftop(scene) {
  const group = new THREE.Group();
  const roofTex = makeRoofTexture();
  const tileMat = new THREE.MeshStandardMaterial({ map: roofTex, roughness: 0.92, metalness: 0.02 });
  const concrete = new THREE.MeshStandardMaterial({ color: 0x8d7668, roughness: 0.95 });
  const painted = new THREE.MeshStandardMaterial({ color: 0xb08a70, roughness: 0.9 });
  const cream = new THREE.MeshStandardMaterial({ color: 0xd9c8ad, roughness: 0.9 });

  const W = 26;
  const D = 20;
  const base = new THREE.Mesh(new THREE.BoxGeometry(W, 1.4, D), [
    concrete, concrete, tileMat, concrete, concrete, concrete,
  ]);
  base.position.y = -0.7;
  group.add(base);

  // parapets
  const parapetMat = new THREE.MeshStandardMaterial({ color: 0x9a7a63, roughness: 0.94 });
  const caps = new THREE.MeshStandardMaterial({ color: 0xe0cbb0, roughness: 0.85 });
  const addParapet = (w, d, x, z) => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(w, 0.95, d), parapetMat);
    p.position.set(x, 0.47, z);
    group.add(p);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(w + 0.08, 0.1, d + 0.08), caps);
    cap.position.set(x, 0.985, z);
    group.add(cap);
  };
  addParapet(W, 0.4, 0, -D / 2 + 0.2);
  addParapet(W, 0.4, 0, D / 2 - 0.2);
  addParapet(0.4, D - 0.8, -W / 2 + 0.2, 0);
  addParapet(0.4, D - 0.8, W / 2 - 0.2, 0);

  // graffiti backdrop at the south edge
  const mural = new THREE.Mesh(
    new THREE.BoxGeometry(11, 3.1, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x1b2b38, roughness: 0.9 }),
  );
  mural.position.set(-3.5, 1.55, 9.1);
  group.add(mural);
  const muralFace = new THREE.Mesh(
    new THREE.PlaneGeometry(10.8, 2.9),
    new THREE.MeshStandardMaterial({ map: makeMuralTexture(), roughness: 0.86 }),
  );
  muralFace.position.set(-3.5, 1.58, 8.93);
  muralFace.rotation.y = Math.PI;
  group.add(muralFace);
  // neon bar sign above the mural
  const signMat = new THREE.MeshBasicMaterial({
    map: neonTexture('SALVE', '#38e08a', 'moradores'),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.9,
  });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.2), signMat);
  sign.position.set(-3.5, 4.0, 8.88);
  sign.rotation.y = Math.PI;
  group.add(sign);

  // açaí stand
  const stand = new THREE.Group();
  stand.position.set(-10.1, 0, 4.0);
  stand.rotation.y = 0.55;
  const counter = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.95, 1.25), new THREE.MeshStandardMaterial({ color: 0x5d3d2c, roughness: 0.9 }));
  counter.position.y = 0.47;
  stand.add(counter);
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.1, 1.5), new THREE.MeshStandardMaterial({ color: 0xd9b98f, roughness: 0.8 }));
  top.position.y = 1.0;
  stand.add(top);
  const postMat = new THREE.MeshStandardMaterial({ color: 0x3a2a22, roughness: 0.9 });
  for (const x of [-1.25, 1.25]) {
    for (const z of [-0.6, 0.6]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.5, 0.08), postMat);
      post.position.set(x, 1.25, z);
      stand.add(post);
    }
  }
  const awning = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.08, 1.9), new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.7 }));
  awning.position.set(0, 2.5, 0.1);
  awning.rotation.x = -0.08;
  stand.add(awning);
  const acaiSign = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 1.2),
    new THREE.MeshBasicMaterial({
      map: neonTexture('AÇAÍ', '#c084fc', 'do zé'),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  acaiSign.position.set(0, 3.1, 0.6);
  stand.add(acaiSign);
  const standGlow = new THREE.PointLight(0xa855f7, 9, 9, 2);
  standGlow.position.set(0, 2.1, 0.2);
  stand.add(standGlow);
  // cooler + cups
  const cooler = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.42), new THREE.MeshStandardMaterial({ color: 0x2f6bff, roughness: 0.6 }));
  cooler.position.set(1.6, 0.25, 0.4);
  stand.add(cooler);
  group.add(stand);

  // blue water tank
  const tank = new THREE.Group();
  tank.position.set(9.6, 0, -6.2);
  const tankMat = new THREE.MeshStandardMaterial({ color: 0x2f6fb0, roughness: 0.55, metalness: 0.15 });
  const tankBody = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 2.1, 16), tankMat);
  tankBody.position.y = 1.4;
  tank.add(tankBody);
  const tankLid = new THREE.Mesh(new THREE.CylinderGeometry(1.14, 1.14, 0.16, 16), new THREE.MeshStandardMaterial({ color: 0x1e4d80, roughness: 0.6 }));
  tankLid.position.y = 2.5;
  tank.add(tankLid);
  for (const x of [-0.7, 0.7]) {
    for (const z of [-0.7, 0.7]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.1), new THREE.MeshStandardMaterial({ color: 0x555f66, roughness: 0.8 }));
      leg.position.set(x, 0.22, z);
      tank.add(leg);
    }
  }
  group.add(tank);

  // bench
  const bench = new THREE.Group();
  bench.position.set(8.6, 0, 6.4);
  bench.rotation.y = -0.5;
  const wood = new THREE.MeshStandardMaterial({ color: 0x7a5033, roughness: 0.85 });
  for (let i = 0; i < 3; i++) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.18), wood);
    slat.position.set(0, 0.45, -0.2 + i * 0.2);
    bench.add(slat);
  }
  for (const x of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.5), new THREE.MeshStandardMaterial({ color: 0x3a2a22 }));
    leg.position.set(x, 0.22, 0);
    bench.add(leg);
  }
  group.add(bench);

  // caixa de som da quebrada
  const sounds = new THREE.Group();
  sounds.position.set(-8.3, 0, -2.3);
  sounds.rotation.y = 0.5;
  const cabMat = new THREE.MeshStandardMaterial({ color: 0x241c2c, roughness: 0.82 });
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.7, 0.62), cabMat);
  cab.position.y = 0.85;
  sounds.add(cab);
  const coneMat = new THREE.MeshStandardMaterial({ color: 0x0e0a14, roughness: 0.95 });
  const ledMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x7c3aed, emissiveIntensity: 2.1, roughness: 0.3 });
  for (const [y, r] of [[0.42, 0.34], [1.3, 0.23]]) {
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.72, 0.08, 20), coneMat);
    cone.rotation.x = Math.PI / 2;
    cone.position.set(0, y, 0.32);
    sounds.add(cone);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r + 0.045, 0.025, 8, 28), ledMat);
    ring.position.set(0, y, 0.36);
    sounds.add(ring);
  }
  const soundGlow = new THREE.PointLight(0x8b5cf6, 5, 7, 2);
  soundGlow.position.set(0, 1.1, 0.7);
  sounds.add(soundGlow);
  group.add(sounds);

  // potted plants
  const potMat = new THREE.MeshStandardMaterial({ color: 0xb4643f, roughness: 0.9 });
  const plantMat = new THREE.MeshLambertMaterial({ color: 0x376b3a });
  const potSpots = [
    [-11.6, -9.0], [-11.8, -8.2], [11.7, 2.2], [11.6, 3.0], [-11.7, 8.6],
  ];
  potSpots.forEach(([x, z], idx) => {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.4, 8), potMat);
    pot.position.set(x, 0.2, z);
    group.add(pot);
    for (let i = 0; i < 4; i++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.1, rand(0.5, 0.8), 4), plantMat);
      leaf.position.set(x + rand(-0.12, 0.12), 0.55 + rand(0, 0.15), z + rand(-0.1, 0.1));
      leaf.rotation.z = rand(-0.5, 0.5);
      leaf.rotation.x = rand(-0.35, 0.35);
      group.add(leaf);
    }
  });

  // capivara
  const capy = createCapivara();
  capy.position.set(7.4, 0, -2.6);
  capy.rotation.y = -2.2;
  capy.scale.setScalar(1.15);
  group.add(capy);

  // bunting + lights
  const bunting = buildBunting();
  group.add(bunting.group);

  // string light poles
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x3d2f28, roughness: 0.9 });
  const poleSpots = [[-12.2, -9.2], [12.2, -9.2], [-12.2, 9.2], [12.2, 9.2]];
  poleSpots.forEach(([x, z]) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 4.8, 6), poleMat);
    pole.position.set(x, 2.4, z);
    group.add(pole);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), new THREE.MeshBasicMaterial({ color: 0xffd08a }));
    cap.position.set(x, 4.82, z);
    group.add(cap);
  });

  // ambiance point lights
  const warm = new THREE.PointLight(0xffa860, 8, 20, 2);
  warm.position.set(-6, 4.0, 6);
  group.add(warm);
  const rim = new THREE.PointLight(0x5b7bff, 6, 26, 2);
  rim.position.set(4, 3.4, -9);
  group.add(rim);

  scene.add(group);
  return { group, capivara: capy, bunting, stand, tank, mural };
}

function buildBunting() {
  const group = new THREE.Group();
  const lines = [
    [new THREE.Vector3(-12.2, 4.7, -9.2), new THREE.Vector3(12.2, 5.2, -1.5), 0.7],
    [new THREE.Vector3(-12.2, 5.1, 5.4), new THREE.Vector3(12.2, 4.6, 8.6), 0.55],
    [new THREE.Vector3(-12.2, 4.9, 9.2), new THREE.Vector3(7, 4.6, -8.8), 0.9],
  ];
  const colors = [0xffd24a, 0x38e08a, 0xff5c6c, 0x8b5cf6, 0xfff3dc, 0x4fa8ff];
  const flagGeo = new THREE.BufferGeometry();
  flagGeo.setAttribute('position', new THREE.Float32BufferAttribute([
    -0.16, 0, 0, 0.16, 0, 0, 0, -0.34, 0,
  ], 3));
  flagGeo.computeVertexNormals();
  const flagMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, vertexColors: false });
  const instances = [];
  const lightPositions = [];
  const lightColors = [];

  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const pos = new THREE.Vector3();
  const scale = new THREE.Vector3(1, 1, 1);

  lines.forEach(([a, b, sag], lineIndex) => {
    const pts = [];
    const N = 26;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const p = new THREE.Vector3().lerpVectors(a, b, t);
      p.y -= Math.sin(Math.PI * t) * sag;
      pts.push(p);
      if (i % 2 === 0) {
        lightPositions.push(p.x, p.y - 0.06, p.z);
        const c = new THREE.Color(colors[(i + lineIndex) % colors.length]);
        lightColors.push(c.r, c.g, c.b);
      }
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
    group.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x1a1320, transparent: true, opacity: 0.8 })));
    const flagCount = 22;
    for (let i = 0; i < flagCount; i++) {
      const t = (i + 0.5) / flagCount;
      const p = new THREE.Vector3().lerpVectors(a, b, t);
      p.y -= Math.sin(Math.PI * t) * sag;
      pos.set(p.x, p.y - 0.02, p.z);
      e.set(rand(-0.1, 0.1), rand(-0.25, 0.25), rand(-0.08, 0.08));
      q.setFromEuler(e);
      m.compose(pos, q, scale);
      instances.push({ matrix: m.clone(), color: colors[(i + lineIndex) % colors.length] });
    }
  });

  const flags = new THREE.InstancedMesh(flagGeo, flagMat, instances.length);
  const col = new THREE.Color();
  instances.forEach((inst, i) => {
    flags.setMatrixAt(i, inst.matrix);
    flags.setColorAt(i, col.setHex(inst.color));
  });
  flags.instanceMatrix.needsUpdate = true;
  if (flags.instanceColor) flags.instanceColor.needsUpdate = true;
  group.add(flags);

  const lightGeo = new THREE.BufferGeometry();
  lightGeo.setAttribute('position', new THREE.Float32BufferAttribute(lightPositions, 3));
  lightGeo.setAttribute('color', new THREE.Float32BufferAttribute(lightColors, 3));
  const lights = new THREE.Points(lightGeo, new THREE.PointsMaterial({
    size: 0.16,
    map: radialSprite('rgba(255,240,200,1)', 'rgba(255,180,80,0)'),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  }));
  group.add(lights);

  return { group, lights };
}

function buildAmbientParticles(scene) {
  const count = 120;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = rand(-16, 16);
    positions[i * 3 + 1] = rand(0.5, 8);
    positions[i * 3 + 2] = rand(-12, 12);
    speeds[i] = rand(0.06, 0.3);
    seeds[i] = rand(0, TAU);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.09,
    map: radialSprite('rgba(255,190,110,0.95)', 'rgba(255,120,40,0)'),
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0xffc27a,
  });
  const points = new THREE.Points(geo, mat);
  scene.add(points);
  return { points, positions, speeds, seeds, count };
}

export function buildWorld(scene, renderer) {  scene.fog = new THREE.FogExp2(0x281534, 0.0072);

  const sky = buildSky();
  scene.add(sky.mesh);

  const hemi = new THREE.HemisphereLight(0xff9a6a, 0x241232, 1.25);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffa268, 2.1);
  sun.position.set(-42, 30, -50);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x7f8cff, 0.65);
  fill.position.set(28, 18, 34);
  scene.add(fill);

  const city = buildCity(scene);
  const landmarks = buildLandmarks(scene);
  const rooftop = buildRooftop(scene);
  createPalmField(scene);

  const ambient = buildAmbientParticles(scene);
  const glows = new THREE.Group();
  // halo around the açaí stand and mural
  const standHalo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialSprite('rgba(168,85,247,0.55)', 'rgba(120,60,220,0)'),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
  }));
  standHalo.scale.set(9, 9, 1);
  standHalo.position.set(-10.1, 2.3, 4.0);
  glows.add(standHalo);
  const warmHalo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialSprite('rgba(255,170,90,0.35)', 'rgba(255,120,50,0)'),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
  }));
  warmHalo.scale.set(24, 24, 1);
  warmHalo.position.set(-2, 6, 4);
  glows.add(warmHalo);
  scene.add(glows);

  const capivaraBase = rooftop.capivara.position.y;
  let capyHop = 0;
  let capyTimer = 0;
  let time = 0;

  const spawnPoints = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU + 0.2;
    spawnPoints.push(new THREE.Vector3(Math.sin(a) * rand(17, 23), rand(2.8, 6.5), Math.cos(a) * rand(14, 20)));
  }
  spawnPoints.push(new THREE.Vector3(0, 7.5, -20));
  spawnPoints.push(new THREE.Vector3(-20, 5.2, 4));
  spawnPoints.push(new THREE.Vector3(21, 4.6, 2));

  return {
    rooftop,
    city,
    landmarks,
    sky,
    ambience: ambient,
    spawnPoints,
    obstacles: [
      { x: -10.1, z: 4.0, r: 1.9 },
      { x: -8.3, z: -2.3, r: 0.95 },
      { x: 9.6, z: -6.2, r: 1.6 },
      { x: 8.6, z: 6.4, r: 1.2 },
      { x: -3.5, z: 9.1, r: 1.2 },
    ],
    capivaraHop() { capyHop = 1.3; },
    update(dt) {
      time += dt;
      sky.uniforms.uTime.value = time;
      const pos = ambient.points.geometry.attributes.position;
      for (let i = 0; i < ambient.count; i++) {
        const iy = i * 3 + 1;
        pos.array[iy] += ambient.speeds[i] * dt;
        pos.array[i * 3] += Math.sin(time * 0.4 + ambient.seeds[i]) * dt * 0.18;
        if (pos.array[iy] > 9.5) {
          pos.array[iy] = 0.4;
          pos.array[i * 3] = rand(-16, 16);
          pos.array[i * 3 + 2] = rand(-12, 12);
        }
      }
      pos.needsUpdate = true;

      const capy = rooftop.capivara;
      capy.position.y = capivaraBase + Math.abs(Math.sin(time * 1.4)) * 0.02 + capyHop * 0.35;
      capy.rotation.y = -2.2 + Math.sin(time * 0.35) * 0.16;
      const head = capy.userData.head;
      if (head) head.position.y = 1.11 + Math.sin(time * 0.8) * 0.03;
      if (capyHop > 0) capyHop = Math.max(0, capyHop - dt * 2.4);

      // subtle flicker on the string lights
      rooftop.bunting.lights.material.opacity = 0.82 + Math.sin(time * 3.1) * 0.08 + Math.sin(time * 7.7) * 0.03;

      warmHalo.material.opacity = 0.26 + Math.sin(time * 1.3) * 0.03;
    },
  };
}
