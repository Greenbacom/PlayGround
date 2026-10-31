import * as THREE from 'three';
import { clamp, damp, lerp, rand, radialTexture } from './utils.js';

export const WEAPONS = [
  {
    id: 'berimbau', name: 'BERIMBAU DE GUERRA', short: 'BERIMBAU', slot: 1,
    damage: 27, pellets: 1, mag: 30, fireDelay: 0.145, reload: 1.35, spread: 0.0075,
    recoil: 1.0, unlockWave: 1, sound: 'rifle', color: 0xffd27a,
    desc: 'Rifle de precisão. A corda do berimbau vibra em cada tiro.',
  },
  {
    id: 'shotgun', name: 'ESPINGARDA DE SÃO JOÃO', short: 'ESPINGARDA', slot: 2,
    damage: 13, pellets: 9, mag: 6, fireDelay: 0.78, reload: 2.0, spread: 0.072,
    recoil: 3.3, unlockWave: 1, sound: 'shotgun', color: 0xff9a5a,
    desc: 'Estouro de festa junina. Devastadora de perto.',
  },
  {
    id: 'smg', name: 'METRALHADORA DE AÇAÍ', short: 'AÇAÍ', slot: 3,
    damage: 12, pellets: 1, mag: 45, fireDelay: 0.072, reload: 1.55, spread: 0.021,
    recoil: 0.55, unlockWave: 3, sound: 'smg', color: 0xb784ff,
    desc: 'Cadência de forró. Liberada na onda 3.',
  },
];

function metal(color = 0x3b3a42, rough = 0.45) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.72, flatShading: true });
}

function wood(color = 0x7a4b28) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.86, metalness: 0.05, flatShading: true });
}

function flat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color, roughness: opts.roughness ?? 0.75, metalness: opts.metalness ?? 0.1,
    emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.emissiveIntensity ?? 1,
    flatShading: true, side: opts.side ?? THREE.FrontSide,
  });
}

function addBox(parent, w, h, d, mat, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

function addCyl(parent, rt, rb, len, mat, x, y, z, seg = 8) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, len, seg), mat);
  m.rotation.x = Math.PI / 2;
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

function ribbon(parent, x, y, z, color, tilt = 0.2) {
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.85, side: THREE.DoubleSide, flatShading: true });
  const geo = new THREE.PlaneGeometry(0.028, 0.16, 1, 3);
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y - 0.08, z);
  m.rotation.z = tilt;
  m.rotation.x = rand(0.4, -0.4);
  parent.add(m);
  return m;
}

function makeHand(mat, sleeveMat) {
  const g = new THREE.Group();
  const palm = new THREE.Mesh(new THREE.IcosahedronGeometry(0.048, 0), mat);
  palm.scale.set(1.1, 0.8, 0.95);
  g.add(palm);
  const thumb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.02, 0), mat);
  thumb.position.set(0.042, 0.026, -0.024);
  g.add(thumb);
  const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.062, 0.14, 6), sleeveMat);
  sleeve.rotation.x = Math.PI / 2 + 0.16;
  sleeve.position.set(0, -0.055, 0.095);
  g.add(sleeve);
  return g;
}

export class WeaponRig {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.models = {};
    this.current = 0;
    this.recoil = 0;
    this.recoilVel = 0;
    this.swayX = 0;
    this.swayY = 0;
    this.targetSwayX = 0;
    this.targetSwayY = 0;
    this.bobTime = 0;
    this.flashLife = 0;
    this.switchState = null;
    this.reloadTime = 0;
    this.reloadDuration = 0;
    this.ribbons = [];
    this.root = new THREE.Group();
    this.camera.add(this.root);

    const fill = new THREE.PointLight(0xffd2a6, 2.2, 3.2, 2);
    fill.position.set(0.35, 0.2, 0.2);
    this.camera.add(fill);

    this.buildBerimbau();
    this.buildShotgun();
    this.buildSmg();
    this.buildFlash();
    this.setWeapon(0, true);
  }

  // ------------------------------------------------------------- models
  buildBerimbau() {
    const g = new THREE.Group();
    g.position.set(0.32, -0.28, -0.70);
    g.scale.setScalar(0.8);
    const woodMat = wood(0x8a5a30);
    const darkWood = wood(0x5a351a);
    const gold = flat(0xffcf5a, { emissive: 0xff9b1f, emissiveIntensity: 1.5, metalness: 0.6, roughness: 0.35 });
    const metalMat = metal(0x3d3a42);
    const skin = flat(0x9a5b3c, { roughness: 0.9 });
    const sleeve = flat(0x2f7a4f, { roughness: 0.9 });

    // Long wooden staff.
    const staff = addCyl(g, 0.028, 0.04, 0.9, woodMat, 0, 0, -0.2, 7);
    staff.rotation.x = Math.PI / 2;
    // Gourd resonator.
    const gourd = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), darkWood);
    gourd.scale.set(1, 1.12, 0.78);
    gourd.position.set(0, -0.02, -0.06);
    g.add(gourd);
    const opening = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.01, 5, 10), woodMat);
    opening.rotation.x = Math.PI / 2;
    opening.position.set(0, -0.075, -0.08);
    g.add(opening);
    // Barrel + sight.
    addCyl(g, 0.022, 0.026, 0.58, metalMat, 0, 0.025, -0.6, 8);
    const sight = addBox(g, 0.055, 0.05, 0.08, metalMat, 0, 0.075, -0.45);
    sight.rotation.x = 0.1;
    addBox(g, 0.012, 0.035, 0.012, gold, 0, 0.11, -0.48);
    // Glowing string.
    addBox(g, 0.007, 0.007, 0.62, gold, 0.034, 0.02, -0.26);
    addBox(g, 0.007, 0.007, 0.62, gold, -0.034, 0.02, -0.26);
    // Metal band and rivets.
    addCyl(g, 0.036, 0.04, 0.05, gold, 0, 0.015, 0.08, 8);
    // Ribbons tied to the staff.
    this.ribbons.push(
      ribbon(g, 0.02, 0.02, 0.09, 0xffd23f, 0.4),
      ribbon(g, 0.04, 0.0, 0.12, 0x31a95f, -0.5),
      ribbon(g, -0.02, 0.02, 0.1, 0xf04e7d, 0.7),
    );
    // Hands.
    const right = makeHand(skin, sleeve);
    right.position.set(0.045, -0.1, -0.06);
    right.rotation.set(0.2, 0.2, -0.3);
    g.add(right);
    const left = makeHand(skin, sleeve);
    left.position.set(-0.02, -0.09, -0.35);
    left.rotation.set(0.1, -0.4, 0.25);
    g.add(left);
    // Caboclo charm star.
    const charm = new THREE.Mesh(new THREE.OctahedronGeometry(0.026, 0), flat(0xffe08a, { emissive: 0xffb52e, emissiveIntensity: 1.4, metalness: 0.3 }));
    charm.position.set(0, -0.12, 0.06);
    g.add(charm);

    this.models.berimbau = g;
    this.root.add(g);
  }

  buildShotgun() {
    const g = new THREE.Group();
    g.position.set(0.33, -0.28, -0.68);
    g.scale.setScalar(0.8);
    const woodMat = wood(0x7a4524);
    const darkWood = wood(0x4b2a16);
    const steel = metal(0x4a4850, 0.35);
    const gold = flat(0xffd23f, { emissive: 0xff9b1f, emissiveIntensity: 1.3, metalness: 0.5, roughness: 0.4 });
    const skin = flat(0x9a5b3c, { roughness: 0.9 });
    const sleeve = flat(0x2f7a4f, { roughness: 0.9 });

    // Double barrels.
    addCyl(g, 0.031, 0.033, 0.8, steel, 0.045, 0.025, -0.5, 9);
    addCyl(g, 0.031, 0.033, 0.8, steel, -0.045, 0.025, -0.5, 9);
    addBox(g, 0.14, 0.08, 0.1, metal(0x2d2b30), 0, 0.025, -0.94);
    // Receiver.
    addBox(g, 0.15, 0.14, 0.32, metal(0x2f2d33, 0.5), 0, 0.005, -0.12);
    addBox(g, 0.155, 0.045, 0.3, gold, 0, 0.075, -0.1);
    // Stock.
    const stock = addBox(g, 0.09, 0.115, 0.4, woodMat, 0, -0.02, 0.25);
    stock.rotation.x = -0.1;
    addBox(g, 0.1, 0.02, 0.22, darkWood, 0, 0.04, 0.37);
    // Pump grip.
    const pump = addBox(g, 0.13, 0.1, 0.2, darkWood, 0, -0.045, -0.44);
    for (let i = 0; i < 4; i++) addBox(g, 0.135, 0.008, 0.012, woodMat, 0, -0.045, -0.52 + i * 0.05);
    // Trigger guard.
    const guard = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.011, 5, 10, Math.PI), metal(0x2d2b30));
    guard.rotation.set(0, Math.PI / 2, Math.PI);
    guard.position.set(0, -0.08, 0.03);
    g.add(guard);
    // Ribbons and a little saint charm.
    this.ribbons.push(
      ribbon(g, 0.055, 0.08, -0.02, 0xff7438, 0.5),
      ribbon(g, 0.075, 0.06, 0.0, 0xffd23f, -0.3),
    );
    const charm = new THREE.Mesh(new THREE.OctahedronGeometry(0.028, 0), gold);
    charm.position.set(-0.06, -0.07, 0.12);
    g.add(charm);
    // Hands.
    const right = makeHand(skin, sleeve);
    right.position.set(0.04, -0.1, 0.12);
    right.rotation.set(0.2, 0.2, -0.3);
    g.add(right);
    const left = makeHand(skin, sleeve);
    left.position.set(-0.02, -0.09, -0.42);
    left.rotation.set(0.1, -0.4, 0.25);
    g.add(left);

    this.models.shotgun = g;
    this.root.add(g);
  }

  buildSmg() {
    const g = new THREE.Group();
    g.position.set(0.32, -0.28, -0.70);
    g.scale.setScalar(0.8);
    const purple = flat(0x5e327d, { roughness: 0.6, metalness: 0.15 });
    const purpleLight = flat(0x8f5bd6, { emissive: 0x5b2c8a, emissiveIntensity: 0.6, roughness: 0.5 });
    const dark = metal(0x2c2634, 0.45);
    const gold = flat(0xffd23f, { emissive: 0xff9b1f, emissiveIntensity: 1.2, metalness: 0.4 });
    const glow = flat(0xd7b4ff, { emissive: 0xb47cff, emissiveIntensity: 2.2, roughness: 0.3 });
    const skin = flat(0x9a5b3c, { roughness: 0.9 });
    const sleeve = flat(0x2f7a4f, { roughness: 0.9 });

    addBox(g, 0.12, 0.14, 0.46, purple, 0, 0, -0.15);
    addBox(g, 0.126, 0.03, 0.4, gold, 0, 0.06, -0.15);
    addCyl(g, 0.021, 0.023, 0.42, dark, 0, 0.02, -0.56, 8);
    addBox(g, 0.08, 0.08, 0.08, dark, 0, 0.02, -0.78);
    // Açaí canister.
    const can = addCyl(g, 0.075, 0.075, 0.24, purpleLight, 0.095, 0.085, -0.1, 10);
    can.rotation.z = Math.PI / 2;
    can.rotation.x = 0;
    can.rotation.y = 0;
    can.rotation.set(0, 0, Math.PI / 2);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.082, 0.012, 5, 12), glow);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(0.19, 0.085, -0.1);
    g.add(ring);
    const ring2 = ring.clone();
    ring2.position.x = 0.005;
    g.add(ring2);
    // Magazine.
    const mag = addBox(g, 0.07, 0.22, 0.1, dark, 0, -0.14, -0.13);
    mag.rotation.x = 0.14;
    // Grip + trigger guard.
    const grip = addBox(g, 0.075, 0.16, 0.09, purple, 0, -0.13, 0.06);
    grip.rotation.x = 0.22;
    const guard = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.009, 5, 10, Math.PI), dark);
    guard.rotation.set(0, Math.PI / 2, Math.PI);
    guard.position.set(0, -0.09, -0.02);
    g.add(guard);
    // Stock.
    addBox(g, 0.06, 0.09, 0.24, dark, 0, -0.01, 0.19);
    addBox(g, 0.085, 0.11, 0.06, purpleLight, 0, -0.01, 0.31);
    // Tiny glowing açaí berries charm.
    for (let i = 0; i < 4; i++) {
      const berry = new THREE.Mesh(new THREE.SphereGeometry(0.018, 5, 4), glow);
      berry.position.set(0.07, 0.028 + i * 0.018, -0.36 + i * 0.02);
      g.add(berry);
    }
    // Hands.
    const right = makeHand(skin, sleeve);
    right.position.set(0.04, -0.11, 0.08);
    right.rotation.set(0.2, 0.2, -0.3);
    g.add(right);
    const left = makeHand(skin, sleeve);
    left.position.set(-0.02, -0.1, -0.38);
    left.rotation.set(0.1, -0.4, 0.25);
    g.add(left);

    this.models.smg = g;
    this.root.add(g);
  }

  buildFlash() {
    this.flash = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialTexture('rgba(255,255,230,1)', 'rgba(255,120,20,0)', [
        [0, 'rgba(255,255,235,1)'], [0.2, 'rgba(255,238,150,0.95)'],
        [0.5, 'rgba(255,150,40,0.5)'], [1, 'rgba(255,60,0,0)'],
      ]),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
    }));
    this.flash.scale.set(0.4, 0.4, 1);
    this.flash.visible = false;
    this.flash.renderOrder = 30;
    this.flash.position.set(0, 0.02, -1.02);
    this.root.add(this.flash);
  }

  setWeapon(index, instant = false) {
    this.current = index;
    const key = WEAPONS[index].id;
    for (const [id, g] of Object.entries(this.models)) g.visible = id === key;
    if (!instant) this.switchState = { to: index, t: 0, dur: 0.34, changed: true };
  }

  requestSwitch(index) {
    if (index === this.current || this.switchState) return false;
    const key = WEAPONS[index].id;
    for (const [id, g] of Object.entries(this.models)) g.visible = id === key;
    this.current = index;
    this.switchState = { to: index, t: 0, dur: 0.32, changed: true };
    this.reloadTime = 0;
    return true;
  }

  startReload(duration) {
    this.reloadDuration = duration;
    this.reloadTime = duration;
  }

  cancelReload() {
    this.reloadTime = 0;
  }

  playShoot(power = 1) {
    this.recoil = Math.min(1.6, this.recoil + 0.55 * power);
    this.flashLife = 0.05;
    this.flash.visible = true;
    this.flash.material.rotation = rand(Math.PI);
    const s = (0.32 + Math.random() * 0.2) * Math.min(1.6, 0.7 + power * 0.5);
    this.flash.scale.set(s, s, 1);
    const muzzle = this.getMuzzleWorld(new THREE.Vector3());
    this.root.updateWorldMatrix(true, false);
    this.root.worldToLocal(muzzle);
    this.flash.position.copy(muzzle);
  }

  getMuzzleWorld(target = new THREE.Vector3()) {
    const key = WEAPONS[this.current].id;
    const model = this.models[key];
    if (!model) return target.set(0, 0, 0);
    model.updateWorldMatrix(true, false);
    target.set(0, 0.02, -1.2);
    return model.localToWorld(target);
  }

  update(dt, { speed = 0, lookX = 0, lookY = 0, time = 0, grounded = true } = {}) {
    const w = WEAPONS[this.current];
    const model = this.models[w.id];
    const move = clamp(speed / 5.4, 0, 1);
    this.bobTime += dt * (2.2 + move * 7.2);

    // Spring recoil.
    this.recoilVel += -this.recoil * 44 * dt;
    this.recoilVel *= Math.exp(-12 * dt);
    this.recoil += this.recoilVel * dt + 0;
    if (this.recoil < 0) this.recoil = 0;

    // Sway from looking.
    this.targetSwayX = clamp(-lookX * 0.0018, -0.035, 0.035);
    this.targetSwayY = clamp(lookY * 0.0018, -0.03, 0.03);
    this.swayX = damp(this.swayX, this.targetSwayX, 8, dt);
    this.swayY = damp(this.swayY, this.targetSwayY, 8, dt);
    this.targetSwayX = 0;
    this.targetSwayY = 0;

    if (model.userData.baseX === undefined) {
      model.userData.baseX = model.position.x;
      model.userData.baseY = model.position.y;
      model.userData.baseZ = model.position.z;
    }

    const bobX = Math.sin(this.bobTime) * 0.008 * move;
    const bobY = Math.abs(Math.cos(this.bobTime)) * 0.009 * move;
    const breathe = Math.sin(time * 1.4) * 0.0025;
    let yExtra = 0;
    let rotZ = 0;
    let rotX = 0;
    let posZ = 0;

    if (this.switchState) {
      this.switchState.t += dt;
      const t = clamp(this.switchState.t / this.switchState.dur, 0, 1);
      yExtra = Math.sin(t * Math.PI) * 0.28;
      rotX = Math.sin(t * Math.PI) * 0.35;
      if (t >= 1) this.switchState = null;
    }

    if (this.reloadTime > 0) {
      this.reloadTime = Math.max(0, this.reloadTime - dt);
      const p = 1 - this.reloadTime / this.reloadDuration;
      const dip = Math.sin(Math.min(1, p * 1.05) * Math.PI * 0.9);
      yExtra += dip * 0.2;
      rotX += dip * 0.75;
      rotZ += dip * 0.45;
      posZ += dip * 0.06;
    }

    const kick = this.recoil;
    model.position.set(
      model.userData.baseX,
      model.userData.baseY + bobY - yExtra + breathe,
      model.userData.baseZ + posZ + kick * 0.055
    );
    model.position.x += this.swayX + bobX;
    model.position.y += this.swayY;
    model.rotation.set(rotX + kick * 0.06, 0, rotZ + Math.sin(time * 1.1) * 0.004);

    if (this.flashLife > 0) {
      this.flashLife -= dt;
      if (this.flashLife <= 0) this.flash.visible = false;
    }
    // Ribbons flutter.
    for (let i = 0; i < this.ribbons.length; i++) {
      const r = this.ribbons[i];
      r.rotation.z += Math.sin(time * 3 + i) * 0.002;
    }
    return { recoil: kick };
  }
}
