import * as THREE from 'three';
import {
  TAU, clamp, damp, lerp, rand, pick, chance, shortestAngle, radialTexture, easeOutCubic,
} from './utils.js';

export const ENEMY_TYPES = {
  saci: {
    name: 'SACI PERERÊ', plural: 'SACIS', hp: 62, speed: 5.0, damage: 9, radius: 0.48,
    height: 1.35, score: 100, range: 1.55, windup: 0.3, cooldown: 1.05,
    color: 0xff5a3c, materials: [0x7a4328, 0xc83a2f], desc: 'Rápido, travesso e cheio de vento.',
  },
  curupira: {
    name: 'CURUPIRA', plural: 'CURUPIRAS', hp: 195, speed: 3.5, damage: 20, radius: 0.68,
    height: 2.3, score: 220, range: 2.35, windup: 0.48, cooldown: 1.55,
    color: 0x7fe35c, materials: [0x4f8a4a, 0xff6b2e], desc: 'Guardião da mata. Pés virados, porrete na mão.',
  },
  boitata: {
    name: 'BOITATÁ', plural: 'BOITATÁS', hp: 120, speed: 2.7, damage: 13, radius: 0.72,
    height: 1.75, score: 260, range: 24, windup: 0.3, cooldown: 2.6,
    color: 0xffa228, materials: [0xff7a1f, 0xffd25a], desc: 'Serpente de fogo. Ataca de longe.',
  },
  mula: {
    name: 'MULA SEM CABEÇA', plural: 'MULAS', hp: 760, speed: 3.9, damage: 26, radius: 1.45,
    height: 2.7, score: 2000, range: 3.4, windup: 0.5, cooldown: 1.4,
    color: 0xff6a24, materials: [0x4b2b1f, 0xff7a1f], boss: true, desc: 'Onde passa, deixa fogo. Investe como um trem.',
  },
  cuca: {
    name: 'CUCA, A BRUXA JACARÉ', plural: 'CUCA', hp: 1650, speed: 2.4, damage: 34, radius: 2.3,
    height: 3.4, score: 5000, range: 4.1, windup: 0.6, cooldown: 1.7,
    color: 0xb47cff, materials: [0x4e7c4b, 0x6a3f8a], boss: true, desc: 'A chefe da noite. Chama o Saci e cospe fogo.',
  },
};

const SHADOW_MAT = new THREE.MeshBasicMaterial({
  map: radialTexture('rgba(0,0,0,0.55)', 'rgba(0,0,0,0)'),
  transparent: true, opacity: 0.5, depthWrite: false, color: 0x12080f,
});
const SHADOW_GEO = new THREE.PlaneGeometry(1, 1);
const BAR_BG_MAT = new THREE.SpriteMaterial({ color: 0x1a0c18, transparent: true, opacity: 0.72, depthTest: false, depthWrite: false });
const BAR_FILL_MAT_BASE = { color: 0x63e07b, transparent: true, opacity: 0.95, depthTest: false, depthWrite: false };

function standard(color, opts = {}, mats) {
  const m = new THREE.MeshStandardMaterial({
    color, roughness: opts.roughness ?? 0.88, metalness: opts.metalness ?? 0,
    emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.emissiveIntensity ?? 1,
    flatShading: true, side: opts.side ?? THREE.FrontSide,
    transparent: opts.transparent ?? false, opacity: opts.opacity ?? 1,
  });
  if (mats) mats.push(m);
  return m;
}

function mesh(parent, geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  parent.add(m);
  return m;
}

function cyl(parent, rt, rb, h, mat, x, y, z, seg = 6) {
  return mesh(parent, new THREE.CylinderGeometry(rt, rb, h, seg), mat, x, y, z);
}

function box(parent, w, h, d, mat, x, y, z) {
  return mesh(parent, new THREE.BoxGeometry(w, h, d), mat, x, y, z);
}

function sphere(parent, r, mat, x, y, z, seg = 7) {
  return mesh(parent, new THREE.SphereGeometry(r, seg, Math.max(4, seg - 2)), mat, x, y, z);
}

// ============================================================== models
function buildSaci() {
  const g = new THREE.Group();
  const mats = [];
  const skin = standard(0x7a482c, {}, mats);
  const skinDark = standard(0x5f3721, {}, mats);
  const red = standard(0xc8372f, { roughness: 0.9 }, mats);
  const white = standard(0xfff2c4, { emissive: 0xffc34a, emissiveIntensity: 0.9 }, mats);
  const black = standard(0x1d0f0b, {}, mats);
  const pipeMat = standard(0x3b2419, { roughness: 0.6 }, mats);
  const windMat = new THREE.MeshBasicMaterial({ color: 0xf4e6c4, transparent: true, opacity: 0.2, side: THREE.DoubleSide, depthWrite: false });
  mats.push(windMat);

  const torso = cyl(g, 0.18, 0.24, 0.48, skin, 0, 0.78, 0, 6);
  const shorts = cyl(g, 0.21, 0.23, 0.2, red, 0, 0.54, 0, 6);
  const head = sphere(g, 0.19, skin, 0, 1.08, 0.01, 8);
  const cap = mesh(g, new THREE.ConeGeometry(0.23, 0.4, 7), red, 0, 1.32, 0);
  cap.rotation.z = 0.13;
  const brim = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.025, 5, 10), red);
  brim.rotation.x = Math.PI / 2;
  brim.position.set(0, 1.15, 0);
  g.add(brim);
  // Eyes.
  sphere(g, 0.036, white, -0.07, 1.11, 0.17, 5);
  sphere(g, 0.036, white, 0.07, 1.11, 0.17, 5);
  sphere(g, 0.018, black, -0.07, 1.11, 0.2, 4);
  sphere(g, 0.018, black, 0.07, 1.11, 0.2, 4);
  sphere(g, 0.045, black, 0, 1.005, 0.175, 5);
  // Pipe.
  const pipe = cyl(g, 0.018, 0.02, 0.26, pipeMat, 0.04, 1.0, 0.26, 5);
  pipe.rotation.x = Math.PI / 2;
  pipe.rotation.z = 0.25;
  sphere(g, 0.04, pipeMat, 0.09, 1.0, 0.38, 5);
  // Arms.
  const armL = cyl(g, 0.045, 0.05, 0.4, skin, -0.22, 0.85, 0, 5);
  armL.rotation.z = 0.45;
  const armR = cyl(g, 0.045, 0.05, 0.4, skin, 0.22, 0.85, 0, 5);
  armR.rotation.z = -0.45;
  // One leg.
  const leg = cyl(g, 0.065, 0.075, 0.44, skinDark, 0, 0.26, 0, 5);
  const foot = box(g, 0.14, 0.07, 0.24, skinDark, 0, 0.04, 0.07);
  // Whirlwind.
  const wind = mesh(g, new THREE.ConeGeometry(0.62, 0.75, 9, 1, true), windMat, 0, 0.34, 0);
  const wind2 = mesh(g, new THREE.ConeGeometry(0.44, 0.5, 8, 1, true), windMat, 0, 0.28, 0);
  wind2.rotation.y = 0.5;
  // Dust bits.
  const dust = [];
  const dustMat = new THREE.MeshBasicMaterial({ color: 0xf6e6c2, transparent: true, opacity: 0.4, depthWrite: false });
  mats.push(dustMat);
  for (let i = 0; i < 4; i++) {
    const d = sphere(g, 0.035, dustMat, rand(0.45, -0.45), rand(0.4, 0.05), rand(0.45, -0.45), 4);
    dust.push(d);
  }
  g.userData = { leg, cap, armL, armR, wind, wind2, head, torso, dust, baseY: 0 };
  return { group: g, mats, height: 1.35, anim: 'saci' };
}

function buildCurupira() {
  const g = new THREE.Group();
  const mats = [];
  const skin = standard(0x508a45, { roughness: 0.95 }, mats);
  const skinDark = standard(0x396b35, {}, mats);
  const hair = standard(0xff6428, { emissive: 0xff4a10, emissiveIntensity: 0.65, roughness: 0.9 }, mats);
  const hair2 = standard(0xffb13d, { emissive: 0xff7a10, emissiveIntensity: 0.5 }, mats);
  const eye = standard(0xfff2a0, { emissive: 0xffcf3a, emissiveIntensity: 2.4 }, mats);
  const black = standard(0x130b08, {}, mats);
  const white = standard(0xf0e6cd, {}, mats);
  const wood = standard(0x6d4526, {}, mats);

  const torso = cyl(g, 0.26, 0.34, 0.9, skin, 0, 1.4, 0, 6);
  cyl(g, 0.3, 0.33, 0.18, skinDark, 0, 0.95, 0, 6);
  const head = sphere(g, 0.255, skin, 0, 2.02, 0.03, 8);
  // Hair flames.
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * TAU;
    const h = mesh(g, new THREE.ConeGeometry(rand(0.16, 0.08), rand(0.65, 0.35), 5), i % 3 ? hair : hair2,
      Math.cos(a) * 0.17, 2.24 + rand(0.18, -0.02), Math.sin(a) * 0.17 + 0.02);
    h.rotation.z = Math.cos(a) * 0.3;
    h.rotation.x = Math.sin(a) * 0.3;
  }
  // Face.
  sphere(g, 0.048, eye, -0.09, 2.06, 0.23, 5);
  sphere(g, 0.048, eye, 0.09, 2.06, 0.23, 5);
  sphere(g, 0.02, black, -0.09, 2.06, 0.27, 4);
  sphere(g, 0.02, black, 0.09, 2.06, 0.27, 4);
  box(g, 0.2, 0.06, 0.04, black, 0, 1.94, 0.255);
  // Teeth.
  for (let i = 0; i < 4; i++) {
    const t = mesh(g, new THREE.ConeGeometry(0.018, 0.07, 4), white, -0.07 + i * 0.047, 1.905, 0.27);
    t.rotation.x = Math.PI;
  }
  // Arms + club.
  const armL = cyl(g, 0.075, 0.09, 0.78, skin, -0.4, 1.4, 0, 6);
  armL.rotation.z = 0.28;
  const armR = cyl(g, 0.075, 0.09, 0.78, skin, 0.4, 1.4, 0, 6);
  armR.rotation.z = -0.3;
  const club = cyl(g, 0.055, 0.09, 0.95, wood, 0.62, 1.12, 0.08, 6);
  club.rotation.z = -0.18;
  const clubHead = sphere(g, 0.14, wood, 0.69, 0.66, 0.08, 5);
  // Legs with backwards feet.
  const legL = cyl(g, 0.09, 0.11, 0.78, skinDark, -0.18, 0.5, 0, 6);
  const legR = cyl(g, 0.09, 0.11, 0.78, skinDark, 0.18, 0.5, 0, 6);
  const footL = box(g, 0.16, 0.09, 0.3, skinDark, -0.18, 0.09, -0.13);
  const footR = box(g, 0.16, 0.09, 0.3, skinDark, 0.18, 0.09, -0.13);
  // Leaf skirt.
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * TAU;
    const leaf = mesh(g, new THREE.ConeGeometry(0.08, 0.5, 3), standard(i % 2 ? 0x2f7a3f : 0x3f944a, {}, mats),
      Math.cos(a) * 0.3, 0.94, Math.sin(a) * 0.3);
    leaf.rotation.z = Math.cos(a) * 0.3;
    leaf.rotation.x = Math.sin(a) * 0.3;
  }
  g.userData = { armL, armR, legL, legR, club, head, hair };
  return { group: g, mats, height: 2.3, anim: 'curupira' };
}

function buildBoitata() {
  const g = new THREE.Group();
  const mats = [];
  const fire = standard(0xff7a1f, { emissive: 0xff4a00, emissiveIntensity: 1.6, roughness: 0.45 }, mats);
  const gold = standard(0xffc93d, { emissive: 0xff9b10, emissiveIntensity: 1.8, roughness: 0.35 }, mats);
  const blue = standard(0x9beaff, { emissive: 0x4fd6ff, emissiveIntensity: 2.4 }, mats);
  const black = standard(0x1b0d09, {}, mats);

  const head = sphere(g, 0.31, fire, 0, 1.25, 0.55, 8);
  head.scale.set(1.1, 0.92, 1.25);
  const snout = box(g, 0.4, 0.22, 0.38, gold, 0, 1.18, 0.87);
  sphere(g, 0.055, blue, -0.13, 1.36, 0.77, 5);
  sphere(g, 0.055, blue, 0.13, 1.36, 0.77, 5);
  sphere(g, 0.022, black, -0.13, 1.36, 0.81, 4);
  sphere(g, 0.022, black, 0.13, 1.36, 0.81, 4);
  // Fangs.
  for (const sx of [-0.13, 0.13]) {
    const fang = mesh(g, new THREE.ConeGeometry(0.03, 0.12, 4), standard(0xfff0c0, {}, mats), sx, 1.03, 0.98);
    fang.rotation.x = Math.PI;
  }
  // Horns.
  for (const sx of [-0.19, 0.19]) {
    const horn = mesh(g, new THREE.ConeGeometry(0.06, 0.35, 5), gold, sx, 1.6, 0.5);
    horn.rotation.z = sx > 0 ? -0.35 : 0.35;
  }
  const segments = [];
  for (let i = 0; i < 9; i++) {
    const r = 0.27 - i * 0.017;
    const s = sphere(g, r, i % 3 === 0 ? gold : fire, 0, 1.2 - i * 0.015, -0.1 - i * 0.37, 6);
    segments.push({ mesh: s, baseZ: -0.1 - i * 0.37, baseY: 1.2 - i * 0.015, phase: i * 0.6 });
  }
  // Dorsal flame fins.
  for (let i = 0; i < 5; i++) {
    const fin = mesh(g, new THREE.ConeGeometry(0.09, 0.3, 4), gold, 0, 1.48, 0.15 - i * 0.36);
    fin.rotation.x = -0.15;
  }
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture('rgba(255,190,80,1)', 'rgba(255,80,0,0)'),
    color: 0xffa538, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.75,
  }));
  glow.scale.set(2.2, 2.2, 1);
  glow.position.set(0, 1.25, 0.55);
  g.add(glow);
  g.userData = { segments, head, glow };
  return { group: g, mats, height: 1.75, hover: 0.55, anim: 'boitata' };
}

function buildMula() {
  const g = new THREE.Group();
  const mats = [];
  const hide = standard(0x4b2b20, { roughness: 0.95 }, mats);
  const hide2 = standard(0x5f3829, { roughness: 0.95 }, mats);
  const fire = standard(0xff6a1f, { emissive: 0xff3c00, emissiveIntensity: 1.9, roughness: 0.4 }, mats);
  const gold = standard(0xffcf4a, { emissive: 0xff8a0a, emissiveIntensity: 2.1, roughness: 0.3 }, mats);
  const eye = standard(0xfff4c4, { emissive: 0xffd23f, emissiveIntensity: 3 }, mats);
  const black = standard(0x150a07, {}, mats);
  const hoof = standard(0x241610, {}, mats);

  const body = box(g, 1.0, 0.68, 1.75, hide, 0, 1.28, 0);
  sphere(g, 0.42, hide2, 0, 1.35, 0.7, 7);
  // Legs.
  const legs = [];
  for (const [sx, sz] of [[-0.36, 0.54], [0.36, 0.54], [-0.36, -0.55], [0.36, -0.55]]) {
    const upper = cyl(g, 0.11, 0.14, 0.85, hide2, sx, 0.6, sz, 6);
    const lower = cyl(g, 0.075, 0.09, 0.5, hide, sx, 0.22, sz + 0.06, 5);
    const h = box(g, 0.16, 0.12, 0.22, hoof, sx, 0.05, sz + 0.09);
    legs.push({ upper, lower, hoof: h, phase: sz > 0 ? 0 : Math.PI, x: sx, z: sz });
  }
  // Neck and fire head.
  const neck = cyl(g, 0.27, 0.4, 0.75, hide2, 0, 1.72, 0.78, 6);
  neck.rotation.x = 0.45;
  const head = new THREE.Group();
  head.position.set(0, 2.02, 1.02);
  const skull = sphere(head, 0.42, fire, 0, 0, 0, 7);
  skull.scale.set(1, 1.1, 1.2);
  const snout = box(head, 0.56, 0.36, 0.62, gold, 0, -0.08, 0.32);
  sphere(head, 0.06, eye, -0.16, 0.14, 0.26, 5);
  sphere(head, 0.06, eye, 0.16, 0.14, 0.26, 5);
  sphere(head, 0.022, black, -0.16, 0.14, 0.31, 4);
  sphere(head, 0.022, black, 0.16, 0.14, 0.31, 4);
  for (const sx of [-0.18, 0.18]) {
    const fang = mesh(head, new THREE.ConeGeometry(0.035, 0.16, 4), standard(0xfff0c0, {}, mats), sx, -0.22, 0.58);
    fang.rotation.x = Math.PI;
  }
  // Fire mane.
  const flames = [];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU;
    const f = mesh(head, new THREE.ConeGeometry(rand(0.15, 0.06), rand(0.75, 0.35), 4), i % 2 ? fire : gold,
      Math.cos(a) * 0.27, 0.15 + rand(0.2, 0.02), Math.sin(a) * 0.22, 4);
    f.rotation.z = Math.cos(a) * 0.35;
    f.rotation.x = Math.sin(a) * 0.35;
    flames.push(f);
  }
  // Ears.
  for (const sx of [-0.3, 0.3]) {
    const ear = mesh(head, new THREE.ConeGeometry(0.08, 0.3, 4), fire, sx, 0.45, 0.02);
    ear.rotation.z = sx > 0 ? -0.4 : 0.4;
  }
  g.add(head);
  // Tail fire.
  const tail = cyl(g, 0.06, 0.1, 0.9, hide, 0, 1.32, -0.95, 5);
  tail.rotation.x = -0.5;
  const tailFire = mesh(g, new THREE.ConeGeometry(0.2, 0.8, 5), fire, 0, 1.8, -1.35);
  tailFire.rotation.x = -0.6;
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture('rgba(255,190,80,1)', 'rgba(255,70,0,0)'),
    color: 0xff8a30, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.8,
  }));
  glow.scale.set(3.2, 3.2, 1);
  glow.position.set(0, 2.1, 1.0);
  g.add(glow);
  const light = new THREE.PointLight(0xff6a1f, 11, 8, 2);
  light.position.set(0, 2.0, 1.0);
  g.add(light);
  g.userData = { legs, head, flames, body, tailFire, glow };
  return { group: g, mats, height: 2.7, anim: 'mula', boss: true };
}

function buildCuca() {
  const g = new THREE.Group();
  const mats = [];
  const green = standard(0x4e7c4b, { roughness: 0.92 }, mats);
  const green2 = standard(0x3c653f, {}, mats);
  const belly = standard(0x9db36c, { roughness: 0.95 }, mats);
  const purple = standard(0x5a3277, { roughness: 0.85 }, mats);
  const purpleGlow = standard(0x9a5bff, { emissive: 0x7a2fd6, emissiveIntensity: 1.1, roughness: 0.5 }, mats);
  const eye = standard(0xffe66a, { emissive: 0xffd23f, emissiveIntensity: 3.2 }, mats);
  const black = standard(0x140b10, {}, mats);
  const teeth = standard(0xf4e9c8, { roughness: 0.6 }, mats);
  const claw = standard(0xd5c7a0, { roughness: 0.7 }, mats);

  // Body.
  const body = sphere(g, 0.85, green, 0, 1.45, 0, 7);
  body.scale.set(1.25, 1.15, 1.05);
  const tummy = sphere(g, 0.62, belly, 0, 1.35, 0.42, 7);
  tummy.scale.set(1.05, 1.1, 0.7);
  // Legs.
  for (const sx of [-0.55, 0.55]) {
    cyl(g, 0.18, 0.24, 1.1, green2, sx, 0.55, 0, 6);
    const foot = box(g, 0.42, 0.18, 0.62, green2, sx, 0.09, 0.2);
    foot.rotation.y = sx * 0.1;
    for (let i = 0; i < 3; i++) {
      const c = mesh(g, new THREE.ConeGeometry(0.05, 0.18, 4), claw, sx - 0.12 + i * 0.12, 0.13, 0.55);
      c.rotation.x = Math.PI / 2;
    }
  }
  // Head.
  const head = new THREE.Group();
  head.position.set(0, 2.15, 0.65);
  const skull = sphere(head, 0.55, green, 0, 0, 0, 7);
  skull.scale.set(1.1, 0.95, 1.05);
  const snout = box(head, 1.0, 0.38, 0.95, green2, 0, -0.12, 0.7);
  const jaw = new THREE.Group();
  jaw.position.set(0, -0.32, 0.23);
  const jawMesh = box(jaw, 0.94, 0.22, 0.92, green2, 0, 0, 0.4);
  // Teeth.
  for (let i = 0; i < 7; i++) {
    const t = mesh(head, new THREE.ConeGeometry(0.035, 0.16, 4), teeth, -0.34 + i * 0.115, -0.33, 1.02);
    t.rotation.x = Math.PI;
  }
  for (let i = 0; i < 6; i++) {
    const t = mesh(jaw, new THREE.ConeGeometry(0.032, 0.14, 4), teeth, -0.3 + i * 0.12, 0.14, 0.8);
  }
  head.add(jaw);
  sphere(head, 0.09, eye, -0.23, 0.17, 0.44, 5);
  sphere(head, 0.09, eye, 0.23, 0.17, 0.44, 5);
  sphere(head, 0.035, black, -0.23, 0.17, 0.52, 4);
  sphere(head, 0.035, black, 0.23, 0.17, 0.52, 4);
  // Nostrils.
  sphere(head, 0.035, black, -0.13, 0.0, 1.17, 4);
  sphere(head, 0.035, black, 0.13, 0.0, 1.17, 4);
  // Witch hat.
  const brim = cyl(head, 0.72, 0.72, 0.08, purple, 0, 0.62, 0, 12);
  brim.rotation.z = 0.12;
  const coneHat = mesh(head, new THREE.ConeGeometry(0.55, 1.35, 8), purple, 0.0, 1.3, 0);
  coneHat.rotation.z = -0.15;
  coneHat.rotation.x = 0.1;
  const band = cyl(head, 0.57, 0.57, 0.14, purpleGlow, 0, 0.66, 0, 12);
  band.rotation.z = 0.12;
  g.add(head);
  // Arms.
  const armL = new THREE.Group();
  armL.position.set(-0.85, 1.7, 0.1);
  mesh(armL, new THREE.CylinderGeometry(0.11, 0.15, 0.8, 5), green, -0.15, -0.25, 0).rotation.z = 0.4;
  for (let i = 0; i < 3; i++) {
    const c = mesh(armL, new THREE.ConeGeometry(0.05, 0.24, 4), claw, -0.3 + i * 0.1, -0.67, 0.1 + i * 0.04);
    c.rotation.x = Math.PI;
  }
  g.add(armL);
  const armR = new THREE.Group();
  armR.position.set(0.85, 1.7, 0.1);
  mesh(armR, new THREE.CylinderGeometry(0.11, 0.15, 0.8, 5), green, 0.15, -0.25, 0).rotation.z = -0.4;
  for (let i = 0; i < 3; i++) {
    const c = mesh(armR, new THREE.ConeGeometry(0.05, 0.24, 4), claw, 0.3 - i * 0.1, -0.67, 0.1 + i * 0.04);
    c.rotation.x = Math.PI;
  }
  g.add(armR);

  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture('rgba(170,100,255,1)', 'rgba(80,0,200,0)'),
    color: 0xaa66ff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.6,
  }));
  glow.scale.set(3.6, 3.6, 1);
  glow.position.set(0, 2.1, 0.5);
  g.add(glow);
  const light = new THREE.PointLight(0x9a5bff, 12, 9, 2);
  light.position.set(0, 2.2, 0.6);
  g.add(light);

  g.userData = { head, jaw, armL, armR, body, glow };
  return { group: g, mats, height: 3.4, anim: 'cuca', boss: true };
}

const BUILDERS = { saci: buildSaci, curupira: buildCurupira, boitata: buildBoitata, mula: buildMula, cuca: buildCuca };

// ============================================================== manager
export class EnemyManager {
  constructor(world, effects, audio, callbacks = {}) {
    this.world = world;
    this.effects = effects;
    this.audio = audio;
    this.cb = callbacks;
    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.boss = null;
    this.currentWave = 1;
    this.time = 0;
    this.decor = 0;
  }

  setWave(wave) { this.currentWave = wave; }

  spawn(type, wave = this.currentWave, position = null) {
    const cfg = ENEMY_TYPES[type];
    if (!cfg) return null;
    const built = BUILDERS[type]();
    const hpScale = 1 + (wave - 1) * 0.155;
    const dmgScale = 1 + (wave - 1) * 0.065;
    const speedScale = 1 + (wave - 1) * 0.022;
    const pos = position ? position.clone() : this.world.getSpawnPoint(this.cb.getPlayerPos?.() || null, 12);
    pos.y = 0;
    built.group.position.set(pos.x, 0, pos.z);
    built.group.scale.setScalar(0.01);
    if (built.group.userData) built.group.userData.baseY = 0;
    this.world.scene.add(built.group);

    const shadow = new THREE.Mesh(SHADOW_GEO, SHADOW_MAT);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(pos.x, 0.028, pos.z);
    const shadowScale = cfg.radius * 2.6;
    shadow.scale.set(shadowScale, shadowScale, 1);
    this.world.scene.add(shadow);

    let bar = null;
    if (!cfg.boss) {
      bar = new THREE.Group();
      const bg = new THREE.Sprite(BAR_BG_MAT.clone());
      bg.scale.set(0.95, 0.085, 1);
      bar.add(bg);
      const fill = new THREE.Sprite(new THREE.SpriteMaterial({ ...BAR_FILL_MAT_BASE }));
      fill.center.set(0, 0.5);
      fill.position.x = -0.44;
      fill.scale.set(0.88, 0.055, 1);
      bar.add(fill);
      bar.position.set(pos.x, cfg.height + 0.4, pos.z);
      bar.visible = false;
      this.world.scene.add(bar);
    }

    const e = {
      type, cfg, wave,
      group: built.group,
      mats: built.mats,
      height: built.height,
      radius: cfg.radius,
      pos,
      hp: cfg.hp * (cfg.boss ? 1 + (wave - 5) * 0.05 : hpScale),
      maxHp: 0,
      speed: cfg.speed * speedScale,
      damage: cfg.damage * dmgScale,
      state: 'spawn',
      spawnT: 0,
      deathT: 0,
      hitFlash: 0,
      cooldown: rand(1.4, 0.4),
      windup: 0,
      attackPending: false,
      yaw: rand(TAU),
      animT: rand(TAU),
      strafe: chance(0.5) ? 1 : -1,
      shootCd: rand(2.6, 1.2),
      chargeCd: rand(5.5, 3.0),
      chargeWindup: 0,
      chargeT: 0,
      chargeDir: new THREE.Vector3(),
      chargeHit: false,
      specialCd: rand(6, 3),
      boss: !!cfg.boss,
      bar, shadow,
      shadowScale,
      hover: built.hover || 0,
      yOffset: 0,
      active: true,
    };
    e.maxHp = e.hp;
    this.enemies.push(e);
    if (cfg.boss) {
      this.boss = e;
      this.cb.onBossSpawn?.(e);
    }
    // Spawn poof.
    this.effects.death(pos.x, 0.8, pos.z, cfg.color, cfg.boss ? 1.6 : 0.55);
    return e;
  }

  get alive() {
    return this.enemies.filter((e) => e.state !== 'dying');
  }

  update(dt, player) {
    if (!player) return;
    this.time += dt;
    for (const e of this.enemies) this.updateEnemy(e, dt, player);
    this.updateProjectiles(dt, player);
    this.updatePickups(dt, player);
    this.enemies = this.enemies.filter((e) => {
      if (e.state === 'dead') {
        this.cleanupEnemy(e);
        return false;
      }
      return true;
    });
  }

  updateEnemy(e, dt, player) {
    e.animT += dt;
    const cfg = e.cfg;

    if (e.state === 'spawn') {
      e.spawnT += dt;
      const t = clamp(e.spawnT / 0.85, 0, 1);
      const s = easeOutCubic(t);
      e.group.scale.setScalar(s);
      e.group.position.y = e.hover * s + 0;
      e.shadow.scale.set(e.shadowScale * s, e.shadowScale * s, 1);
      if (t >= 1) e.state = 'seek';
      return;
    }

    if (e.state === 'dying') {
      e.deathT -= dt;
      const t = clamp(1 - e.deathT / (e.boss ? 1.8 : 0.55), 0, 1);
      e.group.rotation.z = t * (e.boss ? 0.45 : 1.2) * (e.type === 'saci' ? -1 : 1);
      e.group.position.y = (e.hover || 0) - t * 0.5;
      if (e.deathT <= 0) e.state = 'dead';
      if (e.bar) e.bar.visible = false;
      e.shadow.visible = false;
      return;
    }

    // Hit flash.
    if (e.hitFlash > 0) {
      e.hitFlash -= dt;
      const on = e.hitFlash > 0;
      for (const m of e.mats) {
        if (!m.emissive) continue;
        if (on) {
          if (m.userData.baseEmissive === undefined) {
            m.userData.baseEmissive = m.emissive.getHex();
            m.userData.baseEmissiveIntensity = m.emissiveIntensity;
          }
          m.emissive.setHex(0xffb070);
          m.emissiveIntensity = 1.7;
        } else if (m.userData.baseEmissive !== undefined) {
          m.emissive.setHex(m.userData.baseEmissive);
          m.emissiveIntensity = m.userData.baseEmissiveIntensity;
        }
      }
    }

    const dx = player.pos.x - e.pos.x;
    const dz = player.pos.z - e.pos.z;
    const dist = Math.hypot(dx, dz);
    const dirX = dist > 0.001 ? dx / dist : 0;
    const dirZ = dist > 0.001 ? dz / dist : 0;
    let moveX = 0, moveZ = 0;
    let speed = e.speed;

    // Boss specials.
    if (e.type === 'mula') {
      if (e.chargeWindup > 0) {
        e.chargeWindup -= dt;
        speed = 0;
        e.chargeDir.set(dirX, 0, dirZ);
        if (e.chargeWindup <= 0) {
          e.chargeT = 0.85;
          e.chargeHit = false;
          this.audio.bossRoar();
        }
      } else if (e.chargeT > 0) {
        e.chargeT -= dt;
        speed = 15;
        moveX = e.chargeDir.x; moveZ = e.chargeDir.z;
        if (!e.chargeHit && dist < e.radius + 1.1) {
          e.chargeHit = true;
          this.cb.onPlayerHit?.(e.damage * 1.2, e.pos);
          this.effects.impact(player.pos.x, 1.0, player.pos.z, 0xff6a2a, 18);
        }
      } else {
        e.chargeCd -= dt;
        if (e.chargeCd <= 0 && dist > 4.5 && dist < 20) {
          e.chargeWindup = 0.8;
          e.chargeCd = rand(7.5, 5.2);
          this.effects.impact(e.pos.x, 0.2, e.pos.z, 0xff8a3a, 18);
        }
      }
    }
    if (e.type === 'cuca') {
      e.specialCd -= dt;
      if (e.specialCd <= 0) {
        e.specialCd = rand(9, 6.5);
        if (chance(0.5)) {
          this.cb.onBossSummon?.(e);
          const count = 2 + (e.wave >= 10 ? 1 : 0);
          for (let i = 0; i < count; i++) {
            const a = rand(TAU);
            const p = new THREE.Vector3(e.pos.x + Math.cos(a) * rand(5, 3.2), 0, e.pos.z + Math.sin(a) * rand(5, 3.2));
            this.spawn('saci', e.wave, p);
          }
        } else {
          this.fireRing(e);
        }
      }
    }

    // Attack telegraph.
    if (e.windup > 0) {
      e.windup -= dt;
      speed *= 0.18;
      if (e.windup <= 0 && e.attackPending) {
        e.attackPending = false;
        if (dist < cfg.range + 1.0) {
          this.cb.onPlayerHit?.(e.damage, e.pos);
          this.effects.impact(player.pos.x, 1.1, player.pos.z, 0xff5a3a, 12);
        }
        e.cooldown = cfg.cooldown * rand(1.15, 0.85);
      }
    }

    // Behavior.
    const targetDist = e.type === 'boitata' ? 11 : 0;
    if (e.type === 'boitata' && e.chargeWindup <= 0) {
      if (dist > targetDist + 4) { moveX = dirX; moveZ = dirZ; }
      else if (dist < targetDist - 3.5) { moveX = -dirX; moveZ = -dirZ; }
      else {
        moveX = -dirZ * e.strafe;
        moveZ = dirX * e.strafe;
        if (chance(0.004)) e.strafe *= -1;
      }
      e.shootCd -= dt;
      if (e.shootCd <= 0 && dist < 26 && !this.world.segmentBlocked(
        new THREE.Vector3(e.pos.x, 1.3, e.pos.z), new THREE.Vector3(player.pos.x, 1.0, player.pos.z), 0
      )) {
        e.shootCd = cfg.cooldown * rand(1.25, 0.85);
        this.shootAtPlayer(e, player, 12.5, 0xff7a1f);
      }
    } else if (e.type === 'mula' || e.type === 'cuca') {
      if (e.chargeT > 0) { /* set above */ }
      else if (e.chargeWindup > 0) { moveX = 0; moveZ = 0; }
      else {
        if (dist > cfg.range * 0.8) { moveX = dirX; moveZ = dirZ; }
      }
    } else if (e.type === 'saci') {
      moveX = dirX; moveZ = dirZ;
      // Saci sporadically bursts forward.
      if (chance(0.006)) speed *= 2.2;
    } else {
      moveX = dirX; moveZ = dirZ;
    }

    // Melee trigger.
    if (e.cooldown > 0) e.cooldown -= dt;
    if (dist < cfg.range + 0.2 && e.cooldown <= 0 && e.windup <= 0 && e.chargeT <= 0 && e.chargeWindup <= 0) {
      if (!(e.type === 'boitata')) {
        e.windup = cfg.windup;
        e.attackPending = true;
      }
    }

    // Separation and avoidance.
    let sepX = 0, sepZ = 0;
    for (const other of this.enemies) {
      if (other === e || other.state === 'dying') continue;
      const ox = e.pos.x - other.pos.x;
      const oz = e.pos.z - other.pos.z;
      const d = Math.hypot(ox, oz);
      const min = e.radius + other.radius;
      if (d < min && d > 0.0001) {
        const push = (min - d) / min;
        sepX += (ox / d) * push * 1.8;
        sepZ += (oz / d) * push * 1.8;
      }
    }
    let avoidX = 0, avoidZ = 0;
    for (const c of this.world.colliders) {
      const ox = e.pos.x - c.x;
      const oz = e.pos.z - c.z;
      const d = Math.hypot(ox, oz);
      const min = c.r + e.radius + 0.5;
      if (d < min && d > 0.001) {
        const push = (min - d) / min;
        avoidX += (ox / d) * push * 2.2;
        avoidZ += (oz / d) * push * 2.2;
      }
    }
    moveX += sepX + avoidX;
    moveZ += sepZ + avoidZ;
    const moveLen = Math.hypot(moveX, moveZ);
    if (moveLen > 1) { moveX /= moveLen; moveZ /= moveLen; }

    if (speed > 0 && moveLen > 0.001) {
      e.pos.x += moveX * speed * dt;
      e.pos.z += moveZ * speed * dt;
      this.world.resolveCollision(e.pos, e.radius);
      const r = Math.hypot(e.pos.x, e.pos.z);
      if (r > 35.5) {
        e.pos.x = (e.pos.x / r) * 35.5;
        e.pos.z = (e.pos.z / r) * 35.5;
      }
    }

    // Facing.
    const targetYaw = Math.atan2(dirX, dirZ);
    e.yaw += shortestAngle(e.yaw, targetYaw) * Math.min(1, dt * 8);
    e.group.rotation.y = e.yaw;

    // Hover & animation.
    e.group.position.x = e.pos.x;
    e.group.position.z = e.pos.z;
    this.animate(e, dt);
    e.group.position.y = e.yOffset;

    e.shadow.position.set(e.pos.x, 0.028, e.pos.z);
    e.shadow.material.opacity = 0.48;

    // Health bar.
    if (e.bar) {
      e.bar.position.set(e.pos.x, e.height + e.yOffset + 0.42, e.pos.z);
      e.bar.visible = e.hp < e.maxHp && dist < 38;
      const frac = clamp(e.hp / e.maxHp, 0, 1);
      const fill = e.bar.children[1];
      fill.scale.x = 0.88 * frac;
      fill.material.color.setHex(frac > 0.55 ? 0x63e07b : frac > 0.25 ? 0xffc93a : 0xff5545);
    }

    // Floating fire trail for Boitatá.
    if (e.type === 'boitata') {
      this.decor -= dt;
      if (this.decor <= 0) {
        this.decor = 0.06;
        this.effects.particles.spawn({
          x: e.pos.x + rand(0.4, -0.4), y: 1.2 + e.yOffset + rand(0.3, -0.2), z: e.pos.z + rand(0.4, -0.4),
          count: 1, speed: 0.4, up: 0.4, spread: 0, gravity: -0.3, drag: 1.2, life: 0.55, size: 0.22,
          colors: [0xff9a2a, 0xffd25a, 0xff4a10],
        });
      }
    }
    // Boss on fire.
    if (e.type === 'mula') {
      this.decor -= dt;
      if (this.decor <= 0) {
        this.decor = 0.08;
        this.effects.particles.spawn({
          x: e.pos.x + rand(0.6, -0.6), y: 2.25 + e.yOffset + rand(0.4, -0.1), z: e.pos.z + rand(0.6, -0.6),
          count: 1, speed: 0.6, up: 1.0, spread: 0.05, gravity: -0.7, drag: 1.1, life: 0.7, size: 0.28,
          colors: [0xffa52a, 0xff5a10, 0xffd25a],
        });
      }
    }

    if (e.boss) this.cb.onBossHp?.(clamp(e.hp / e.maxHp, 0, 1), e);
  }

  animate(e, dt) {
    const u = e.group.userData || {};
    const t = e.animT;
    const moving = e.state === 'seek';
    switch (e.anim) {
      case 'saci': {
        const hop = Math.abs(Math.sin(t * (e.chargeT > 0 ? 16 : 8))) * (moving ? 0.14 : 0.05);
        e.yOffset = hop;
        if (u.leg) u.leg.rotation.x = Math.sin(t * 8) * 0.2;
        if (u.armL) u.armL.rotation.x = Math.sin(t * 8 + 1) * 0.35;
        if (u.armR) u.armR.rotation.x = Math.sin(t * 8) * 0.35;
        if (u.cap) u.cap.rotation.z = 0.13 + Math.sin(t * 6) * 0.1;
        if (u.wind) u.wind.rotation.y = t * 14;
        if (u.wind2) u.wind2.rotation.y = -t * 18;
        if (u.dust) u.dust.forEach((d, i) => {
          d.position.y = 0.06 + ((t * 1.8 + i * 0.27) % 1) * 0.5;
          d.position.x = Math.cos(t * 7 + i * 2) * 0.45;
          d.position.z = Math.sin(t * 7 + i * 2) * 0.45;
          d.material.opacity = 0.4;
        });
        if (u.torso) u.torso.rotation.z = Math.sin(t * 8) * 0.06;
        break;
      }
      case 'curupira': {
        const swing = Math.sin(t * 7);
        e.yOffset = Math.abs(Math.sin(t * 7)) * 0.04;
        if (u.legL) u.legL.rotation.x = swing * 0.55;
        if (u.legR) u.legR.rotation.x = -swing * 0.55;
        if (u.armL) u.armL.rotation.x = -swing * 0.45;
        if (u.armR) u.armR.rotation.x = swing * 0.35;
        if (u.club) u.club.rotation.x = Math.sin(t * 3) * 0.12;
        if (u.head) u.head.rotation.y = Math.sin(t * 1.3) * 0.08;
        break;
      }
      case 'boitata': {
        e.yOffset = 0.65 + Math.sin(t * 2.2) * 0.14;
        if (u.segments) {
          u.segments.forEach((s, i) => {
            s.mesh.position.x = Math.sin(t * 5 - i * 0.55) * 0.12 * Math.min(1, i);
            s.mesh.position.y = s.baseY + Math.sin(t * 4 - i * 0.5) * 0.07;
          });
        }
        if (u.head) u.head.position.y = 1.25 + Math.sin(t * 3) * 0.05;
        if (u.glow) u.glow.material.opacity = 0.62 + Math.sin(t * 6) * 0.12;
        break;
      }
      case 'mula': {
        const gallop = Math.sin(t * (e.chargeT > 0 ? 18 : 8));
        e.yOffset = Math.abs(gallop) * 0.06;
        if (u.legs) {
          u.legs.forEach((l) => {
            l.upper.rotation.x = gallop * 0.62 * (l.phase ? 1 : -1);
            l.lower.rotation.x = gallop * 0.4 * (l.phase ? 1 : -1);
            l.hoof.rotation.x = gallop * 0.2;
          });
        }
        if (u.head) {
          u.head.rotation.x = e.chargeWindup > 0 ? -0.3 : Math.sin(t * 2) * 0.06;
          u.head.rotation.z = Math.sin(t * 3) * 0.04;
        }
        if (u.flames) {
          u.flames.forEach((f, i) => {
            f.scale.y = 0.8 + Math.sin(t * 9 + i * 1.3) * 0.25;
            f.rotation.z += Math.sin(t * 5 + i) * 0.004;
          });
        }
        if (u.tailFire) u.tailFire.scale.y = 0.85 + Math.sin(t * 7) * 0.2;
        if (u.glow) u.glow.material.opacity = 0.7 + Math.sin(t * 8) * 0.12;
        break;
      }
      case 'cuca': {
        e.yOffset = Math.abs(Math.sin(t * 3.2)) * 0.055;
        if (u.body) u.body.scale.y = 1.15 + Math.sin(t * 2) * 0.025;
        if (u.head) {
          u.head.rotation.y = Math.sin(t * 1.1) * 0.08;
          u.head.rotation.x = e.windup > 0 ? -0.25 : Math.sin(t * 1.5) * 0.04;
        }
        if (u.jaw) u.jaw.rotation.x = e.windup > 0 ? -0.45 : Math.sin(t * 1.2) * 0.04;
        if (u.armL) u.armL.rotation.x = Math.sin(t * 2.2) * 0.18;
        if (u.armR) u.armR.rotation.x = -Math.sin(t * 2.2) * 0.18;
        if (u.glow) u.glow.material.opacity = 0.5 + Math.sin(t * 4) * 0.12;
        break;
      }
    }
  }

  // ---------------------------------------------------------- projectiles
  shootAtPlayer(e, player, speed = 12, color = 0xff7a1f) {
    const origin = new THREE.Vector3(e.pos.x, 1.25 + e.yOffset, e.pos.z);
    const target = new THREE.Vector3(player.pos.x, 1.0, player.pos.z);
    const dir = target.sub(origin).normalize();
    this.spawnProjectile(origin, dir, speed, e.damage, color, e.radius);
    this.audio.enemyShoot();
    this.effects.particles.spawn({
      x: origin.x, y: origin.y, z: origin.z, count: 6, speed: 2, up: 0.2,
      spread: 0.1, gravity: 0, drag: 2, life: 0.25, size: 0.25, colors: [color, 0xffe09a],
    });
  }

  fireRing(e) {
    const count = 12;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * TAU;
      const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
      const origin = new THREE.Vector3(e.pos.x + dir.x * 1.4, 0.85, e.pos.z + dir.z * 1.4);
      this.spawnProjectile(origin, dir, 6.4, e.damage * 0.65, 0xb47cff, 0.3);
    }
    this.audio.bossRoar();
    this.effects.particles.spawn({
      x: e.pos.x, y: 0.9, z: e.pos.z, count: 34, speed: 5, up: 2, spread: 0.4,
      gravity: 4, drag: 1.2, life: 0.9, size: 0.28, colors: [0xb47cff, 0x6a3f8a, 0xffe09a],
    });
  }

  spawnProjectile(origin, dir, speed, damage, color, radius = 0.25) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 2.2, roughness: 0.35 });
    const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 1), mat);
    g.add(ball);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialTexture('rgba(255,255,255,1)', 'rgba(255,120,0,0)'),
      color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.85,
    }));
    glow.scale.set(1.2, 1.2, 1);
    g.add(glow);
    g.position.copy(origin);
    this.world.scene.add(g);
    this.projectiles.push({
      group: g, pos: origin.clone(), vel: dir.clone().multiplyScalar(speed),
      life: 6, damage, radius: radius + 0.15, trail: 0, color,
    });
  }

  updateProjectiles(dt, player) {
    const playerCenter = new THREE.Vector3(player.pos.x, player.pos.y + 0.95, player.pos.z);
    for (const p of this.projectiles) {
      p.life -= dt;
      p.pos.addScaledVector(p.vel, dt);
      p.group.position.copy(p.pos);
      p.group.rotation.x += dt * 7;
      p.group.rotation.y += dt * 9;
      p.trail -= dt;
      if (p.trail <= 0) {
        p.trail = 0.045;
        this.effects.particles.spawn({
          x: p.pos.x, y: p.pos.y, z: p.pos.z, count: 1, speed: 0.3, up: 0.1,
          spread: 0.04, gravity: -0.2, drag: 1.2, life: 0.35, size: 0.2, colors: [p.color, 0xffd59a],
        });
      }
      let dead = p.life <= 0;
      if (!dead && p.pos.y < 0.08) dead = true;
      if (!dead) {
        for (const c of this.world.colliders) {
          if (p.pos.y < c.h && Math.hypot(p.pos.x - c.x, p.pos.z - c.z) < c.r + 0.1) { dead = true; break; }
        }
      }
      if (!dead && p.pos.distanceTo(playerCenter) < p.radius + 0.62) {
        this.cb.onPlayerHit?.(p.damage, p.pos);
        this.effects.impact(p.pos.x, p.pos.y, p.pos.z, p.color, 16);
        this.audio.hurt();
        dead = true;
      }
      if (dead) {
        this.effects.impact(p.pos.x, Math.max(0.15, p.pos.y), p.pos.z, p.color, 8);
        p.dead = true;
      }
    }
    this.projectiles = this.projectiles.filter((p) => {
      if (p.dead) {
        p.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
        this.world.scene.remove(p.group);
        return false;
      }
      return true;
    });
  }

  // -------------------------------------------------------------- pickups
  spawnPickup(position, type = 'heal') {
    const g = new THREE.Group();
    const mats = [];
    if (type === 'heal') {
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.14, 0.16, 10, 1, true), standard(0x6f4528, {}, mats));
      bowl.position.y = 0.02;
      g.add(bowl);
      const acai = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), standard(0x3b174f, { roughness: 0.5 }, mats));
      acai.scale.y = 0.55;
      acai.position.y = 0.12;
      g.add(acai);
      for (let i = 0; i < 5; i++) {
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.035, 5, 4), standard(0x4a1d63, {}, mats));
        b.position.set(rand(0.12, -0.12), 0.2, rand(0.12, -0.12));
        g.add(b);
      }
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.2, 3), standard(0x4d9a4c, {}, mats));
      leaf.position.set(0.1, 0.28, 0);
      leaf.rotation.z = -0.4;
      g.add(leaf);
    } else {
      const rocket = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.34, 8), standard(0xd94a3e, { roughness: 0.6 }, mats));
      g.add(rocket);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.14, 8), standard(0xffd23f, { emissive: 0xff9b1f, emissiveIntensity: 1.2 }, mats));
      tip.position.y = 0.24;
      g.add(tip);
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.4, 4), standard(0xb59a6c, {}, mats));
      stick.position.y = -0.28;
      g.add(stick);
    }
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialTexture('rgba(255,255,255,1)', 'rgba(120,255,140,0)'),
      color: type === 'heal' ? 0x62ff9c : 0xffb13d, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.6,
    }));
    glow.scale.set(1.8, 1.8, 1);
    g.add(glow);
    g.position.set(position.x, 0.35, position.z);
    this.world.scene.add(g);
    this.pickups.push({
      group: g, type, life: 26, phase: rand(TAU), baseY: 0.35,
      pos: new THREE.Vector3(position.x, 0, position.z),
    });
  }

  updatePickups(dt, player) {
    for (const p of this.pickups) {
      p.life -= dt;
      p.phase += dt * 2;
      p.group.position.y = p.baseY + Math.sin(p.phase) * 0.09;
      p.group.rotation.y += dt * 1.8;
      const d = Math.hypot(player.pos.x - p.pos.x, player.pos.z - p.pos.z);
      if (d < 1.7) {
        p.dead = true;
        this.cb.onPickup?.(p.type, p.pos);
      }
      if (p.life < 4) p.group.visible = Math.sin(p.life * 18) > -0.3;
    }
    this.pickups = this.pickups.filter((p) => {
      if (p.dead || p.life <= 0) {
        p.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
        this.world.scene.remove(p.group);
        return false;
      }
      return true;
    });
  }

  // ----------------------------------------------------------------- hit
  raycast(origin, dir, maxDist = 100) {
    let wallT = maxDist;
    for (const c of this.world.colliders) {
      const t = this.rayCircle(origin, dir, c.x, c.z, c.r);
      if (t !== null && t > 0 && t < wallT) {
        const y = origin.y + dir.y * t;
        if (y < c.h) wallT = t;
      }
    }
    let best = null;
    for (const e of this.enemies) {
      if (e.state === 'dying' || e.state === 'dead' || e.state === 'spawn') continue;
      const cx = e.pos.x;
      const cy = e.pos.y + e.height * 0.58 + e.yOffset;
      const cz = e.pos.z;
      const t = this.raySphere(origin, dir, cx, cy, cz, e.radius * (e.boss ? 1.1 : 0.9) + 0.15);
      if (t === null || t <= 0 || t > wallT || t > maxDist) continue;
      if (!best || t < best.distance) {
        const p = new THREE.Vector3().copy(origin).addScaledVector(dir, t);
        best = { enemy: e, distance: t, point: p, headshot: p.y > e.pos.y + e.yOffset + e.height * 0.8 };
      }
    }
    return best;
  }

  raySphere(origin, dir, cx, cy, cz, radius) {
    const ox = origin.x - cx, oy = origin.y - cy, oz = origin.z - cz;
    const b = ox * dir.x + oy * dir.y + oz * dir.z;
    const c = ox * ox + oy * oy + oz * oz - radius * radius;
    const h = b * b - c;
    if (h < 0) return null;
    const t = -b - Math.sqrt(h);
    return t > 0 ? t : -b + Math.sqrt(h);
  }

  rayCircle(origin, dir, cx, cz, radius) {
    const ox = origin.x - cx;
    const oz = origin.z - cz;
    const a = dir.x * dir.x + dir.z * dir.z;
    if (a < 0.00001) return null;
    const b = 2 * (ox * dir.x + oz * dir.z);
    const c = ox * ox + oz * oz - radius * radius;
    const disc = b * b - 4 * a * c;
    if (disc < 0) return null;
    const t = (-b - Math.sqrt(disc)) / (2 * a);
    return t > 0 ? t : null;
  }

  damage(e, amount, point = null, headshot = false, byPlayer = true) {
    if (!e || e.state === 'dying' || e.state === 'dead') return { killed: false, damage: 0 };
    let dmg = amount;
    if (headshot) dmg *= 1.85;
    e.hp -= dmg;
    e.hitFlash = 0.1;
    this.effects.hitEnemy(point?.x ?? e.pos.x, point?.y ?? 1.2, point?.z ?? e.pos.z, e.cfg.color);
    let killed = false;
    if (e.hp <= 0) {
      e.hp = 0;
      killed = true;
      this.kill(e);
    }
    if (e.boss) this.cb.onBossHp?.(clamp(e.hp / e.maxHp, 0, 1), e);
    this.cb.onHit?.(e, headshot, killed, Math.round(dmg));
    return { killed, damage: Math.round(dmg) };
  }

  kill(e) {
    if (e.state === 'dying' || e.state === 'dead') return;
    e.state = 'dying';
    e.deathT = e.boss ? 1.8 : 0.55;
    e.group.rotation.y = e.yaw;
    if (e.bar) e.bar.visible = false;
    const scale = e.boss ? 2.4 : 1;
    this.effects.death(e.pos.x, e.height * 0.55 + e.yOffset, e.pos.z, e.cfg.color, scale);
    this.audio.kill();
    if (e.boss) {
      this.effects.explosion(e.pos.x, 1.4, e.pos.z, 1.5);
      this.audio.explosion();
      this.cb.onBossDead?.(e);
      if (this.boss === e) this.boss = null;
    }
    this.cb.onKill?.(e);
  }

  spawnBoss(type, wave) {
    const pos = this.world.getSpawnPoint(this.cb.getPlayerPos?.() || null, 16);
    return this.spawn(type, wave, pos);
  }

  clear() {
    for (const e of this.enemies) this.cleanupEnemy(e);
    for (const p of this.projectiles) {
      p.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      this.world.scene.remove(p.group);
    }
    for (const p of this.pickups) {
      p.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      this.world.scene.remove(p.group);
    }
    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.boss = null;
  }

  cleanupEnemy(e) {
    e.group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => m.dispose());
      }
    });
    this.world.scene.remove(e.group);
    if (e.shadow) this.world.scene.remove(e.shadow);
    if (e.bar) {
      e.bar.traverse((o) => { if (o.material) o.material.dispose(); });
      this.world.scene.remove(e.bar);
    }
  }
}
