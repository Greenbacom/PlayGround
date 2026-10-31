import * as THREE from '../vendor/three.module.js';
import { maskPaintTexture, clothTexture, glowSprite } from './textures.js';

const TAU = Math.PI * 2;
const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);

const COLORS = [
  { main: 0xff4f9a, alt: 0xffd24a, dark: 0x24162e },
  { main: 0x1fd1b2, alt: 0xff8a3d, dark: 0x12242a },
  { main: 0xff7a24, alt: 0x3f6bff, dark: 0x241a2a },
  { main: 0xa86bff, alt: 0xffe36a, dark: 0x1c1830 },
];

function flashMats(root) {
  const mats = [];
  root.traverse((o) => {
    if (o.isMesh && o.material && !Array.isArray(o.material)) {
      if (o.material.emissive !== undefined && !o.userData.noFlash) mats.push(o.material);
    }
  });
  return mats;
}

function healthBar() {
  const g = new THREE.Group();
  const back = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0x160f1c, transparent: true, opacity: 0.7, depthWrite: false, depthTest: false }));
  back.scale.set(1.36, 0.14, 1);
  back.position.y = 0.0;
  const bar = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0x5ee0a0, transparent: true, opacity: 0.95, depthWrite: false, depthTest: false }));
  bar.scale.set(1.24, 0.075, 1);
  bar.position.y = 0.0;
  bar.center.set(0.5, 0.5);
  g.add(back, bar);
  g.userData = { bar, back };
  return g;
}

function featherCrown(colors, scale = 1) {
  const g = new THREE.Group();
  const cols = [colors.alt, colors.main, 0xfff3d6, colors.main, colors.alt];
  for (let i = 0; i < 7; i++) {
    const a = -0.9 + i * 0.3;
    const f = new THREE.Mesh(
      new THREE.ConeGeometry(0.07 * scale, (0.55 + (i % 3) * 0.13) * scale, 5),
      new THREE.MeshStandardMaterial({ color: cols[i % cols.length], roughness: 0.65, emissive: cols[i % cols.length], emissiveIntensity: 0.08 })
    );
    f.position.set(Math.sin(a) * 0.22 * scale, 0.32 * scale, Math.cos(a) * 0.02);
    f.rotation.z = -a * 0.65;
    f.rotation.x = 0.12;
    g.add(f);
  }
  return g;
}

function ribbon(color, len = 0.9, w = 0.07) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, len, 1, 4),
    new THREE.MeshStandardMaterial({ color, roughness: 0.8, side: THREE.DoubleSide, emissive: color, emissiveIntensity: 0.05 })
  );
  return m;
}

function buildBoneco(wave) {
  const c = COLORS[(Math.random() * COLORS.length) | 0];
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: c.main, roughness: 0.52, metalness: 0.35 });
  const darkMat = new THREE.MeshStandardMaterial({ color: c.dark, roughness: 0.55, metalness: 0.55 });
  const trimMat = new THREE.MeshStandardMaterial({ color: c.alt, roughness: 0.5, metalness: 0.3 });
  const creamMat = new THREE.MeshStandardMaterial({ color: 0xfff0d2, roughness: 0.75 });

  // legs
  const legs = [];
  for (const s of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(s * 0.25, 0.95, 0);
    const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.6, 7), darkMat);
    thigh.position.y = -0.3;
    const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.5, 7), bodyMat);
    shin.position.y = -0.72;
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, 0.42), trimMat);
    foot.position.set(0, -0.98, 0.09);
    leg.add(thigh, shin, foot);
    group.add(leg);
    legs.push(leg);
  }

  // drum body
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.52, 0.8, 14), bodyMat);
  body.position.y = 1.3;
  body.castShadow = true;
  group.add(body);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.535, 0.535, 0.15, 14), trimMat);
  band.position.y = 1.3;
  group.add(band);
  const band2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.06, 14), creamMat);
  band2.position.y = 1.62;
  group.add(band2);

  // ribbons around waist
  const ribbons = [];
  for (let i = 0; i < 6; i++) {
    const r = ribbon([c.alt, 0xfff3d6, c.main, 0x3f6bff][i % 4], 0.6 + Math.random() * 0.35, 0.075);
    const a = (i / 6) * TAU;
    r.position.set(Math.cos(a) * 0.42, 0.85, Math.sin(a) * 0.42);
    r.rotation.y = -a + Math.PI / 2;
    group.add(r);
    ribbons.push({ mesh: r, a, phase: Math.random() * 6 });
  }

  // arms
  const arms = [];
  for (const s of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(s * 0.52, 1.55, 0);
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.55, 6), darkMat);
    upper.position.y = -0.26;
    const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.5, 6), bodyMat);
    fore.position.y = -0.76;
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.11, 7, 6), creamMat);
    hand.position.y = -1.02;
    arm.add(upper, fore, hand);
    if (s > 0) {
      const club = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 0.85, 6), trimMat);
      club.position.set(0, -1.28, 0.15);
      club.rotation.x = 0.5;
      arm.add(club);
    }
    arm.rotation.z = s * 0.18;
    group.add(arm);
    arms.push(arm);
  }

  // mask head
  const head = new THREE.Group();
  head.position.y = 2.05;
  const maskMat = new THREE.MeshStandardMaterial({ map: maskPaintTexture((Math.random() * 3) | 0), roughness: 0.42, metalness: 0.2 });
  const mask = new THREE.Mesh(new THREE.SphereGeometry(0.36, 18, 14), maskMat);
  mask.scale.set(1, 1.14, 0.38);
  mask.castShadow = true;
  head.add(mask);
  const crown = featherCrown(c, 0.95);
  crown.position.y = 0.24;
  head.add(crown);
  for (const s of [-1, 1]) {
    const socket = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), new THREE.MeshBasicMaterial({ color: 0x0b0710 }));
    socket.position.set(s * 0.14, 0.03, 0.125);
    head.add(socket);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe36a, toneMapped: false }));
    eye.position.set(s * 0.14, 0.03, 0.17);
    head.add(eye);
  }
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.04, 0.03), new THREE.MeshBasicMaterial({ color: 0x1a0c16 }));
  mouth.position.set(0, -0.17, 0.14);
  head.add(mouth);
  group.add(head);

  group.userData = { legs, arms, head, ribbons, body, c };
  return group;
}

function buildMascara(wave) {
  const c = COLORS[(Math.random() * COLORS.length) | 0];
  const group = new THREE.Group();
  const maskMat = new THREE.MeshStandardMaterial({ map: maskPaintTexture((Math.random() * 3) | 0), roughness: 0.38, metalness: 0.25 });
  const mask = new THREE.Mesh(new THREE.SphereGeometry(0.48, 18, 14), maskMat);
  mask.scale.set(1, 1.2, 0.36);
  mask.castShadow = true;
  group.add(mask);
  const crown = featherCrown(c, 1.25);
  crown.position.y = 0.4;
  group.add(crown);
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe36a, toneMapped: false }));
    eye.position.set(s * 0.17, 0.05, 0.16);
    group.add(eye);
  }
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.85, 0.025, 6, 28),
    new THREE.MeshBasicMaterial({ color: c.alt, toneMapped: false, transparent: true, opacity: 0.85 })
  );
  ring.rotation.x = 1.1;
  group.add(ring);
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.95, 0.018, 6, 28),
    new THREE.MeshBasicMaterial({ color: c.main, toneMapped: false, transparent: true, opacity: 0.6 })
  );
  ring2.rotation.y = 1.2;
  ring2.rotation.x = 0.4;
  group.add(ring2);

  const tails = [];
  for (let i = 0; i < 5; i++) {
    const r = ribbon([c.main, c.alt, 0xfff3d6][i % 3], 1.4 + Math.random() * 0.5, 0.09);
    r.position.set((i - 2) * 0.13, -0.75, -0.1);
    r.rotation.x = 0.2;
    group.add(r);
    tails.push({ mesh: r, phase: Math.random() * 6 });
  }
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowSprite('rgba(255,170,90,0.7)', 'rgba(255,90,40,0)'),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0.55,
  }));
  glow.scale.setScalar(2.2);
  group.add(glow);

  group.userData = { mask, ring, ring2, tails, c, glow };
  return group;
}

function buildBoss(wave) {
  const group = new THREE.Group();
  const c = { main: 0xb23a6a, alt: 0xffd24a, dark: 0x1d1224 };
  const maskMat = new THREE.MeshStandardMaterial({ map: maskPaintTexture(0), roughness: 0.34, metalness: 0.35 });
  const mask = new THREE.Mesh(new THREE.SphereGeometry(1.5, 24, 18), maskMat);
  mask.scale.set(1, 1.16, 0.4);
  mask.castShadow = true;
  group.add(mask);
  const crown = featherCrown(c, 3.2);
  crown.position.y = 1.15;
  group.add(crown);
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffe36a, toneMapped: false }));
    eye.position.set(s * 0.52, 0.1, 0.5);
    group.add(eye);
    const socket = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), new THREE.MeshBasicMaterial({ color: 0x100812 }));
    socket.position.set(s * 0.52, 0.1, 0.42);
    socket.scale.z = 0.3;
    group.add(socket);
  }
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.16, 0.1), new THREE.MeshBasicMaterial({ color: 0x140810 }));
  mouth.position.set(0, -0.7, 0.52);
  group.add(mouth);

  const rings = [];
  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(2.1 + i * 0.35, 0.05, 6, 40),
      new THREE.MeshBasicMaterial({ color: i % 2 ? c.alt : 0xff4f9a, toneMapped: false, transparent: true, opacity: 0.75 - i * 0.15 })
    );
    r.rotation.set(1.1 + i * 0.5, i * 0.8, 0.2);
    group.add(r);
    rings.push(r);
  }

  const cape = new THREE.Mesh(
    new THREE.ConeGeometry(2.3, 4.4, 18, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x4a1f47, roughness: 0.8, side: THREE.DoubleSide, metalness: 0.2 })
  );
  cape.position.y = -2.4;
  cape.rotation.y = Math.PI;
  group.add(cape);

  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowSprite('rgba(255,120,170,0.8)', 'rgba(255,40,100,0)'),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0.7,
  }));
  glow.scale.setScalar(7);
  group.add(glow);

  group.userData = { mask, rings, cape, c, glow, mouth };
  return group;
}

class Enemy {
  constructor(mgr, type, wave, pos, boss = false) {
    this.mgr = mgr;
    this.type = type;
    this.wave = wave;
    this.boss = boss;
    this.dead = false;
    this.removed = false;
    this.maxHp = boss ? 650 + wave * 140 : type === 'mascara' ? 42 + wave * 7 : 58 + wave * 9;
    this.hp = this.maxHp;
    this.speed = boss ? 0.9 : type === 'mascara' ? 1.6 : 1.25 + wave * 0.035;
    this.radius = boss ? 2.1 : type === 'mascara' ? 0.75 : 0.55;
    this.attackTimer = 1.2 + Math.random();
    this.fireTimer = 1.5 + Math.random() * 1.5;
    this.hitFlash = 0;
    this.spawnT = 0;
    this.invuln = 0.45;
    this.phase = Math.random() * 10;
    this.headshotParts = [];
    this.hitParts = [];
    this.mats = [];

    if (type === 'mascara') {
      this.group = buildMascara(wave);
      this.baseY = pos.y;
      this.group.position.copy(pos);
      this.orbit = Math.random() * TAU;
      this.orbitDir = Math.random() > 0.5 ? 1 : -1;
      this.maskMesh = this.group.userData.mask;
    } else if (type === 'boss') {
      this.group = buildBoss(wave);
      this.baseY = pos.y;
      this.group.position.copy(pos);
      this.orbit = 0;
      this.orbitDir = 1;
      this.summonTimer = 4;
      this.burst = 0;
      this.maskMesh = this.group.userData.mask;
    } else {
      this.group = buildBoneco(wave);
      this.group.position.copy(pos);
      this.group.position.y = 0;
      this.maskMesh = this.group.userData.head.children[0];
    }

    // tag meshes for raycasting
    this.group.traverse((o) => {
      if (!o.isMesh) return;
      o.userData.enemy = this;
      if (o === this.maskMesh || o.userData.isHead) {
        o.userData.head = true;
        this.headshotParts.push(o);
      } else {
        this.hitParts.push(o);
      }
    });
    if (this.type === 'mascara' || this.type === 'boss') {
      this.maskMesh.userData.head = true;
    }
    this.mats = flashMats(this.group);

    // spawn ring
    this.spawnFx = mgr.effects.shockwave(pos.clone().setY(0.02), this.type === 'boss' ? 0xff4f9a : 0xffc75a, this.type === 'boss' ? 8 : 3.2, 0.7);
    if (this.type === 'mascara' || this.type === 'boss') {
      mgr.effects.sparksBurst(pos, V(0, -1, 0), 14, 0xffb347);
    } else {
      mgr.effects.dustBurst(pos, 12);
    }

    this.bar = healthBar();
    this.bar.position.y = boss ? 4.2 : type === 'mascara' ? 1.5 : 2.55;
    this.group.add(this.bar);

    this.group.scale.setScalar(0.01);
    mgr.scene.add(this.group);
    mgr.enemies.push(this);
    mgr.audio.spawn?.();
  }

  get position() { return this.group.position; }

  damage(amount, head = false, point = null) {
    if (this.dead || this.invuln > 0) return false;
    this.hp -= amount * (head ? 2.2 : 1);
    this.hitFlash = 1;
    if (point) {
      this.mgr.effects.sparksBurst(point, null, head ? 14 : 8, head ? 0xffe36a : 0xffb347);
    }
    if (this.hp <= 0) {
      this.die(head);
      return true;
    }
    this.mgr.audio.hit(head);
    this.updateBar();
    return false;
  }

  updateBar() {
    const u = this.bar.userData;
    const ratio = Math.max(0, this.hp / this.maxHp);
    u.bar.scale.x = 1.24 * ratio;
    u.bar.center.x = 0.5;
    u.bar.position.x = -(1.24 * (1 - ratio)) / 2;
    u.bar.material.color.setHex(ratio > 0.55 ? 0x5ee0a0 : ratio > 0.25 ? 0xffc24a : 0xff5d4e);
    this.bar.visible = this.hp < this.maxHp;
  }

  die(head) {
    this.dead = true;
    const p = this.group.position.clone();
    const u = this.group.userData;
    const colors = [0xff4f9a, 0xffd24a, 0x1fd1b2, 0xfff3d6, 0x3f6bff];
    if (this.boss) {
      this.mgr.effects.explosion(p.clone().setY(p.y + 0.5), colors, 2.4);
      this.mgr.effects.explosion(p.clone().setY(p.y + 1.5), colors, 1.8);
      for (let i = 0; i < 6; i++) {
        setTimeout(() => this.mgr.effects.confettiBurst(p.clone().add(V((Math.random() - 0.5) * 4, Math.random() * 2, (Math.random() - 0.5) * 4)), colors, 40, 6), i * 110);
      }
      this.mgr.audio.bossDeath?.();
    } else {
      this.mgr.effects.explosion(p.clone().setY(p.y + 1), colors, 1);
      this.mgr.audio.kill();
    }
    // mask flies off
    const maskClone = this.maskMesh.clone();
    maskClone.material = this.maskMesh.material.clone();
    const dir = this.type === 'mascara' ? V(0, 1, 0) : V((Math.random() - 0.5) * 2, 1, (Math.random() - 0.5) * 2);
    this.mgr.effects.debrisPiece(maskClone, p.clone().setY(p.y + 1.5), dir.multiplyScalar(4), V(6, 8, 4), 2.4);
    for (let i = 0; i < 3; i++) {
      const piece = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.22, 0.06),
        new THREE.MeshStandardMaterial({ color: colors[(Math.random() * colors.length) | 0], roughness: 0.6 })
      );
      this.mgr.effects.debrisPiece(piece, p.clone().setY(p.y + 0.8), V((Math.random() - 0.5) * 8, 3 + Math.random() * 4, (Math.random() - 0.5) * 8), V(8, 8, 8), 1.8);
    }
    this.group.visible = false;
    this.removed = true;
    this.mgr.scene.remove(this.group);
    this.mgr.enemies.splice(this.mgr.enemies.indexOf(this), 1);
    this.mgr.onKill?.(this, head);
  }

  update(dt, t, ctx) {
    if (this.dead) return;
    this.spawnT += dt;
    if (this.invuln > 0) this.invuln -= dt;
    const scaleTarget = Math.min(1, this.spawnT / 0.55);
    const s = this.boss ? 1 : scaleTarget < 1 ? 1 - Math.pow(1 - scaleTarget, 3) : 1;
    this.group.scale.setScalar(Math.max(0.01, s));

    if (this.hitFlash > 0) {
      this.hitFlash = Math.max(0, this.hitFlash - dt * 7);
      for (const m of this.mats) {
        if (m.emissive) {
          const base = m.userData.baseEmissive ?? (m.userData.baseEmissive = m.emissive.getHex());
          m.emissive.setHex(base);
          m.emissive.lerp(new THREE.Color(0xffffff), this.hitFlash * 0.85);
          m.emissiveIntensity = (m.userData.baseEmissiveIntensity ?? 0.1) + this.hitFlash * 1.5;
        }
      }
    }

    const player = ctx.player;
    const pp = player.position;
    const bp = ctx.beacon.position;
    const u = this.group.userData;
    const pos = this.group.position;
    const distP = pos.distanceTo(pp);

    if (this.type === 'boneco') {
      const target = distP < 6.5 ? pp : bp;
      const dx = target.x - pos.x, dz = target.z - pos.z;
      const dl = Math.hypot(dx, dz) || 1;
      let mx = dx / dl, mz = dz / dl;
      // separation
      for (const e of this.mgr.enemies) {
        if (e === this || e.dead || e.type !== 'boneco') continue;
        const ex = pos.x - e.position.x, ez = pos.z - e.position.z;
        const d2 = ex * ex + ez * ez;
        if (d2 < 1.4 && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          mx += (ex / d) * 0.8; mz += (ez / d) * 0.8;
        }
      }
      const ml = Math.hypot(mx, mz) || 1;
      mx /= ml; mz /= ml;
      const moving = distP > 1.55 || target === bp;
      if (moving) this.mgr.moveGround(pos, mx, mz, this.speed, dt, this.radius);
      pos.y = 0;
      this.group.rotation.y = Math.atan2(mx, mz);

      const walk = moving ? Math.sin(t * 8 + this.phase) : 0;
      u.legs[0].rotation.x = walk * 0.55;
      u.legs[1].rotation.x = -walk * 0.55;
      u.arms[0].rotation.x = -walk * 0.4;
      u.arms[1].rotation.x = walk * 0.4;
      u.body.rotation.z = Math.sin(t * 4 + this.phase) * 0.05;
      u.head.rotation.z = Math.sin(t * 3 + this.phase) * 0.07;
      u.head.rotation.y = Math.sin(t * 1.7 + this.phase) * 0.14;
      for (const r of u.ribbons) {
        r.mesh.rotation.z = Math.sin(t * 5 + r.phase) * 0.18;
        r.mesh.rotation.x = 0.1 + Math.sin(t * 4 + r.phase) * 0.1;
      }

      this.attackTimer -= dt;
      if (distP < 2.1 && this.attackTimer <= 0) {
        this.attackTimer = 1.15;
        this.mgr.onPlayerDamage?.(9 + this.wave * 0.4, pos);
        this.group.userData.head.rotation.x = -0.4;
      }
      const distB = pos.distanceTo(bp);
      if (distB < 3.0 && this.attackTimer <= 0.2) {
        this.attackTimer = 1.2;
        this.mgr.onBeaconDamage?.(7 + this.wave * 0.3, pos);
        this.mgr.effects.sparksBurst(bp.clone().setY(1.4), null, 6, 0xff6a4a);
      }
    } else if (this.type === 'mascara') {
      this.orbit += dt * 0.35 * this.orbitDir;
      const desired = V(
        pp.x + Math.cos(this.orbit + this.phase) * 8.5,
        this.baseY + Math.sin(t * 1.4 + this.phase) * 0.45,
        pp.z + Math.sin(this.orbit + this.phase) * 8.5
      );
      const dir = desired.clone().sub(pos);
      const dl = dir.length() || 1;
      const speed = this.speed * 1.25;
      pos.addScaledVector(dir.multiplyScalar(1 / dl), Math.min(speed * dt, dl));
      pos.x = THREE.MathUtils.clamp(pos.x, -17, 17);
      pos.z = THREE.MathUtils.clamp(pos.z, -17, 17);
      pos.y = Math.max(2.2, pos.y);
      this.group.lookAt(pp.x, pp.y + 0.5, pp.z);
      this.group.rotation.z += Math.sin(t * 2 + this.phase) * 0.004;
      u.ring.rotation.z += dt * 1.6;
      u.ring2.rotation.z -= dt * 1.1;
      u.mask.rotation.z = Math.sin(t * 2.4 + this.phase) * 0.09;
      for (const tail of u.tails) {
        tail.mesh.rotation.z = Math.sin(t * 4 + tail.phase) * 0.25;
      }
      this.fireTimer -= dt;
      if (this.fireTimer <= 0 && this.spawnT > 1.2) {
        this.fireTimer = 2.4 + Math.random() * 1.4;
        this.mgr.shootOrb(pos.clone(), pp.clone().setY(1.3), 7.2, 9 + this.wave * 0.5);
        this.mgr.effects.sparksBurst(pos.clone(), null, 5, 0xffb347);
      }
    } else if (this.type === 'boss') {
      this.orbit += dt * 0.16;
      const desired = V(
        pp.x + Math.cos(this.orbit + 1.2) * 10,
        4.4 + Math.sin(t * 0.9) * 0.5,
        pp.z + Math.sin(this.orbit + 1.2) * 10
      );
      pos.lerp(desired, Math.min(1, dt * 0.55));
      pos.x = THREE.MathUtils.clamp(pos.x, -14, 14);
      pos.z = THREE.MathUtils.clamp(pos.z, -14, 14);
      this.group.lookAt(pp.x, pp.y + 0.6, pp.z);
      for (let i = 0; i < u.rings.length; i++) {
        u.rings[i].rotation.z += dt * (0.8 + i * 0.35) * (i % 2 ? -1 : 1);
        u.rings[i].rotation.y += dt * 0.2 * (i % 2 ? 1 : -1);
      }
      u.cape.rotation.z = Math.sin(t * 1.2) * 0.05;
      u.mouth.scale.y = 1 + Math.sin(t * 4) * 0.3;

      this.fireTimer -= dt;
      if (this.fireTimer <= 0 && this.spawnT > 1.6) {
        this.burst++;
        this.fireTimer = this.burst % 3 === 0 ? 2.6 : 0.22;
        const spread = (this.burst % 3 - 1) * 1.4;
        const aim = pp.clone().setY(1.2);
        aim.x += spread;
        this.mgr.shootOrb(pos.clone(), aim, 8.5, 12 + this.wave * 0.5, 0xff4f9a);
      }
      this.summonTimer -= dt;
      if (this.summonTimer <= 0 && this.mgr.enemies.filter(e => !e.dead && e.type === 'mascara').length < 4) {
        this.summonTimer = 7;
        for (let i = 0; i < 2; i++) {
          const sp = pos.clone().add(V((Math.random() - 0.5) * 8, 2, (Math.random() - 0.5) * 8));
          sp.x = THREE.MathUtils.clamp(sp.x, -14, 14);
          sp.z = THREE.MathUtils.clamp(sp.z, -14, 14);
          sp.y = 6 + Math.random() * 2;
          this.mgr.spawn('mascara', this.wave, sp);
        }
        this.mgr.audio.boss?.();
      }
      this.mgr.onBossHealth?.(this.hp / this.maxHp);
    }

    this.bar.quaternion.copy(this.mgr.camera.quaternion);
    if (this.type !== 'boneco') {
      // sprite billboards already face camera; keep group lookAt for mask orientation
    }
  }
}

export class EnemyManager {
  constructor({ scene, camera, effects, audio, obstacles, onPlayerDamage, onBeaconDamage, onKill, onBossHealth }) {
    this.scene = scene;
    this.camera = camera;
    this.effects = effects;
    this.audio = audio;
    this.obstacles = obstacles;
    this.onPlayerDamage = onPlayerDamage;
    this.onBeaconDamage = onBeaconDamage;
    this.onKill = onKill;
    this.onBossHealth = onBossHealth;
    this.enemies = [];
    this.projectiles = [];
    this.orbGeo = new THREE.SphereGeometry(0.16, 8, 6);
    this.orbMat = new THREE.MeshBasicMaterial({ color: 0xff9d5a, toneMapped: false });
    this.orbGlowTex = glowSprite('rgba(255,200,120,0.9)', 'rgba(255,80,30,0)');
  }

  spawn(type, wave, pos) {
    const e = new Enemy(this, type, wave, pos, type === 'boss');
    this.audio.spawn?.();
    return e;
  }

  shootOrb(from, to, speed, damage, color = 0xff9d5a) {
    const dir = to.clone().sub(from);
    const dist = dir.length();
    dir.normalize();
    const group = new THREE.Group();
    const core = new THREE.Mesh(this.orbGeo, new THREE.MeshBasicMaterial({ color, toneMapped: false }));
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.orbGlowTex, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0.9,
    }));
    glow.scale.setScalar(1.3);
    group.add(core, glow);
    group.position.copy(from);
    this.scene.add(group);
    this.projectiles.push({ group, vel: dir.multiplyScalar(speed), life: dist / speed + 1.2, damage, color });
  }

  moveGround(pos, mx, mz, speed, dt, radius) {
    const tryMove = (nx, nz) => !this.collides(nx, nz, radius);
    const step = speed * dt;
    const nx = pos.x + mx * step, nz = pos.z + mz * step;
    if (tryMove(nx, nz)) { pos.x = nx; pos.z = nz; return; }
    if (tryMove(nx, pos.z)) { pos.x = nx; return; }
    if (tryMove(pos.x, nz)) { pos.z = nz; return; }
    // sidestep
    const px = pos.x - mz * step, pz = pos.z + mx * step;
    if (tryMove(px, pz)) { pos.x = px; pos.z = pz; return; }
    const qx = pos.x + mz * step, qz = pos.z - mx * step;
    if (tryMove(qx, qz)) { pos.x = qx; pos.z = qz; }
  }

  collides(x, z, radius) {
    if (x < -17.7 + radius || x > 17.7 - radius || z < -17.7 + radius || z > 17.7 - radius) return true;
    for (const o of this.obstacles) {
      if (x > o.minX - radius && x < o.maxX + radius && z > o.minZ - radius && z < o.maxZ + radius) return true;
    }
    return false;
  }

  update(dt, t, ctx) {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      e.update(dt, t, ctx);
    }

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      p.group.position.addScaledVector(p.vel, dt);
      p.group.children[0].rotation.y += dt * 6;
      if (Math.random() < 0.5) {
        this.effects.sparks.spawn({
          pos: p.group.position,
          vel: V((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3),
          color: p.color, size: 0.07, life: 0.3, gravity: 0, drag: 0.9,
        });
      }
      const pp = ctx.player.position;
      const d = p.group.position.distanceTo(V(pp.x, pp.y - 0.35, pp.z));
      let hit = d < 0.9;
      if (!hit && p.group.position.y < 0.1) hit = true;
      if (!hit) {
        for (const o of this.obstacles) {
          if (o.label === 'beacon') continue;
          const q = p.group.position;
          if (q.x > o.minX && q.x < o.maxX && q.z > o.minZ && q.z < o.maxZ && q.y < o.h) { hit = true; break; }
        }
      }
      if (hit) {
        if (d < 1.2) {
          this.onPlayerDamage?.(p.damage, p.group.position);
          this.effects.sparksBurst(p.group.position, null, 10, p.color);
        } else {
          this.effects.sparksBurst(p.group.position, null, 8, p.color);
        }
        this.scene.remove(p.group);
        p.group.children.forEach(c => { if (c.isMesh) c.geometry.dispose?.(); c.material.dispose?.(); });
        this.projectiles.splice(i, 1);
        continue;
      }
      if (p.life <= 0) {
        this.scene.remove(p.group);
        this.projectiles.splice(i, 1);
      }
    }
  }

  clear() {
    for (const e of this.enemies) {
      this.scene.remove(e.group);
      e.group.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
          else o.material.dispose();
        }
      });
    }
    this.enemies.length = 0;
    for (const p of this.projectiles) this.scene.remove(p.group);
    this.projectiles.length = 0;
  }

  getHitMeshes() {
    const out = [];
    for (const e of this.enemies) {
      if (e.dead || e.invuln > 0) continue;
      out.push(...e.headshotParts, ...e.hitParts);
    }
    return out;
  }

  get aliveCount() {
    return this.enemies.filter(e => !e.dead).length;
  }
}
