import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { FX } from './fx.js';
import { rand, randInt, pick, clamp, angleDelta, damp, TAU } from './util.js';

const UP = new THREE.Vector3(0, 1, 0);

export class EnemyManager {
  constructor(scene, audio, hooks) {
    this.scene = scene;
    this.audio = audio;
    this.hooks = hooks;
    this.fx = new FX(scene);
    this.enemies = [];
    this.projectiles = [];
    this.boss = null;
    this.time = 0;
    this.ray = new THREE.Ray();
    this.tmp = new THREE.Vector3();
    this.tmp2 = new THREE.Vector3();
    this._buildShared();
    this._buildProjectilePool();
  }

  _buildShared() {
    this.geo = {
      sphere: new THREE.SphereGeometry(1, 14, 12),
      lowSphere: new THREE.SphereGeometry(1, 10, 8),
      cone: new THREE.ConeGeometry(1, 1, 10),
      cylinder: new THREE.CylinderGeometry(1, 1, 1, 8),
      torus: new THREE.TorusGeometry(1, 0.06, 6, 22),
      icosa: new THREE.IcosahedronGeometry(1, 1),
      box: new THREE.BoxGeometry(1, 1, 1),
      rounded: new RoundedBoxGeometry(1, 1, 1, 3, 0.14),
    };
    this.mat = {
      saciBody: new THREE.MeshStandardMaterial({ color: 0x2c1f42, roughness: 0.5, metalness: 0.25, emissive: 0x241238, emissiveIntensity: 0.95 }),
      saciHat: new THREE.MeshStandardMaterial({ color: 0xff3b30, roughness: 0.45, emissive: 0xff2415, emissiveIntensity: 1.55 }),
      eye: new THREE.MeshBasicMaterial({ color: 0xa9f7ff }),
      vortex: new THREE.MeshBasicMaterial({ color: 0xff7a3d, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
      ring: new THREE.MeshBasicMaterial({ color: 0xff9a3d, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }),
      flame: new THREE.MeshBasicMaterial({ color: 0xff8a2f, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }),
      muleBody: new THREE.MeshStandardMaterial({ color: 0x1c1020, roughness: 0.62, metalness: 0.18 }),
      muleLeg: new THREE.MeshStandardMaterial({ color: 0x2a1728, roughness: 0.7 }),
      bossBody: new THREE.MeshStandardMaterial({ color: 0xff7a1f, emissive: 0xff4d00, emissiveIntensity: 1.3, roughness: 0.35, metalness: 0.2 }),
      bossAud: new THREE.MeshStandardMaterial({ color: 0x38e0ff, emissive: 0x00b8ff, emissiveIntensity: 1.6, roughness: 0.3 }),
      bossEye: new THREE.MeshBasicMaterial({ color: 0xfff2a8 }),
      handStick: new THREE.MeshStandardMaterial({ color: 0x3b2415, roughness: 0.9 }),
      cap: new THREE.MeshStandardMaterial({ color: 0xff3b30, emissive: 0x991000, emissiveIntensity: 0.8, roughness: 0.5 }),
      wood: new THREE.MeshStandardMaterial({ color: 0x6b4a2d, roughness: 0.9 }),
      lightGlow: new THREE.SpriteMaterial({ map: this._glowTexture(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.8 }),
      projOrange: new THREE.MeshBasicMaterial({ color: 0xffd08a, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
      projRed: new THREE.MeshBasicMaterial({ color: 0xff6a4d, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
    };
    this.geo.vortex = new THREE.ConeGeometry(1, 1, 12, 1, true);
  }

  _glowTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(255,220,160,0.9)');
    g.addColorStop(1, 'rgba(255,120,40,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  _buildProjectilePool() {
    const glowTex = this.mat.lightGlow.map;
    for (let i = 0; i < 36; i++) {
      const group = new THREE.Group();
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), this.mat.projOrange);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.85 }));
      glow.scale.set(1.2, 1.2, 1);
      group.add(core, glow);
      group.visible = false;
      this.scene.add(group);
      this.projectiles.push({
        group, core, glow, active: false, vel: new THREE.Vector3(), life: 0, radius: 0.35, damage: 10, kind: 'saci',
      });
    }
  }

  _makeSaci(wave) {
    const root = new THREE.Group();
    const visual = new THREE.Group();
    root.add(visual);

    const body = new THREE.Mesh(this.geo.sphere, this.mat.saciBody);
    body.scale.set(0.44, 0.56, 0.44);
    body.position.y = 0.1;
    visual.add(body);

    const hat = new THREE.Mesh(this.geo.cone, this.mat.saciHat);
    hat.scale.set(0.3, 0.52, 0.3);
    hat.position.y = 0.62;
    hat.rotation.z = rand(-0.1, 0.1);
    visual.add(hat);

    const eye = new THREE.Mesh(this.geo.sphere, this.mat.eye);
    eye.scale.setScalar(0.1);
    eye.position.set(0, 0.2, 0.37);
    visual.add(eye);

    const eyeRing = new THREE.Mesh(this.geo.torus, this.mat.ring);
    eyeRing.scale.setScalar(0.95);
    eyeRing.rotation.x = Math.PI / 2;
    eyeRing.position.y = -0.1;
    visual.add(eyeRing);

    const vortex = new THREE.Mesh(this.geo.vortex, this.mat.vortex);
    vortex.scale.set(0.75, 1.9, 0.75);
    vortex.position.y = -0.85;
    vortex.rotation.y = rand(0, TAU);
    visual.add(vortex);

    const vortex2 = new THREE.Mesh(this.geo.vortex, this.mat.vortex);
    vortex2.scale.set(0.5, 1.2, 0.5);
    vortex2.position.y = -0.3;
    vortex2.rotation.set(Math.PI, rand(0, TAU), 0);
    visual.add(vortex2);

    const hitGlow = new THREE.Sprite(this.mat.lightGlow.clone());
    hitGlow.material.opacity = 0;
    hitGlow.scale.set(2, 2, 1);
    visual.add(hitGlow);

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.mat.lightGlow.map, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.6,
    }));
    glow.scale.set(3.1, 3.1, 1);
    glow.position.y = 0.15;
    visual.add(glow);

    root.scale.setScalar(0.28);
    this.scene.add(root);
    return {
      type: 'saci', root, visual, hitGlow, eye, eyeRing, vortex, vortex2, glow,
      hp: 26 + wave * 5, maxHp: 26 + wave * 5, radius: 0.95,
      score: 100, wave,
      phase: rand(0, TAU), orbitDir: Math.random() > 0.5 ? 1 : -1,
      fireTimer: rand(1.8, 3.6), windup: 0, contactCd: 0,
      spawnT: 0, dead: false, flash: 0,
      bobSeed: rand(0, TAU),
      aim: new THREE.Vector3(),
    };
  }

  _makeMula(wave) {
    const root = new THREE.Group();
    const visual = new THREE.Group();
    root.add(visual);

    const body = new THREE.Mesh(this.geo.rounded, this.mat.muleBody);
    body.scale.set(0.72, 0.58, 1.5);
    body.position.y = 0.05;
    visual.add(body);

    const mane = [];
    for (let i = 0; i < 7; i++) {
      const flame = new THREE.Mesh(this.geo.cone, this.mat.flame);
      flame.scale.set(rand(0.18, 0.3), rand(0.5, 0.95), rand(0.18, 0.3));
      flame.position.set(rand(-0.2, 0.2), rand(0.3, 0.55), 0.9 - i * 0.28);
      flame.rotation.x = rand(-0.2, 0.2);
      visual.add(flame);
      mane.push(flame);
    }
    const neckFlame = new THREE.Mesh(this.geo.cone, this.mat.flame);
    neckFlame.scale.set(0.34, 1.3, 0.34);
    neckFlame.position.set(0, 0.55, 0.95);
    neckFlame.rotation.x = -0.5;
    visual.add(neckFlame);
    mane.push(neckFlame);

    const legs = [];
    for (const [x, z] of [[-0.42, 0.55], [0.42, 0.55], [-0.42, -0.55], [0.42, -0.55]]) {
      const leg = new THREE.Mesh(this.geo.cylinder, this.mat.muleLeg);
      leg.scale.set(0.09, 0.55, 0.09);
      leg.position.set(x, -0.45, z);
      visual.add(leg);
      legs.push({ mesh: leg, phase: z > 0 ? 0 : Math.PI });
    }

    const hitGlow = new THREE.Sprite(this.mat.lightGlow.clone());
    hitGlow.material.opacity = 0;
    hitGlow.scale.set(3, 3, 1);
    visual.add(hitGlow);

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.mat.lightGlow.map, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.7,
    }));
    glow.scale.set(4.2, 4.2, 1);
    glow.position.y = 0.35;
    visual.add(glow);

    root.scale.setScalar(0.28);
    this.scene.add(root);
    return {
      type: 'mula', root, visual, hitGlow, mane, legs, glow,
      hp: 85 + wave * 12, maxHp: 85 + wave * 12, radius: 1.25,
      score: 220, wave,
      phase: rand(0, TAU), orbitDir: Math.random() > 0.5 ? 1 : -1,
      fireTimer: 0, windup: 0, contactCd: 0,
      spawnT: 0, dead: false, flash: 0, bobSeed: rand(0, TAU),
      dir: new THREE.Vector3(rand(-1, 1), 0, rand(-1, 1)).normalize(),
      trailTimer: 0,
      aim: new THREE.Vector3(),
    };
  }

  _makeBoss(bossIndex) {
    const root = new THREE.Group();
    const head = new THREE.Group();
    root.add(head);

    const skull = new THREE.Mesh(this.geo.icosa, this.mat.bossBody);
    skull.scale.set(1.35, 1.1, 1.7);
    head.add(skull);

    const jaw = new THREE.Mesh(this.geo.rounded, this.mat.bossAud);
    jaw.scale.set(0.85, 0.34, 0.9);
    jaw.position.set(0, -0.5, 0.85);
    head.add(jaw);

    const mouth = new THREE.Mesh(this.geo.sphere, this.mat.bossEye);
    mouth.scale.setScalar(0.35);
    mouth.position.set(0, -0.22, 1.35);
    head.add(mouth);

    const eyes = [];
    for (const x of [-0.55, 0.55]) {
      const eye = new THREE.Mesh(this.geo.sphere, this.mat.bossAud);
      eye.scale.set(0.2, 0.16, 0.12);
      eye.position.set(x, 0.28, 1.35);
      head.add(eye);
      eyes.push(eye);
    }

    const horns = [];
    for (const x of [-0.85, 0.85]) {
      const horn = new THREE.Mesh(this.geo.cone, this.mat.bossAud);
      horn.scale.set(0.22, 1.1, 0.22);
      horn.position.set(x, 0.95, 0.3);
      horn.rotation.z = x < 0 ? 0.45 : -0.45;
      head.add(horn);
      horns.push(horn);
    }

    const light = new THREE.PointLight(0xff6a1a, 22, 22, 2);
    light.position.y = 0.4;
    head.add(light);

    const hitGlow = new THREE.Sprite(this.mat.lightGlow.clone());
    hitGlow.material.opacity = 0;
    hitGlow.scale.set(8, 8, 1);
    head.add(hitGlow);

    const rootPos = new THREE.Vector3(0, 5, -14);
    const segments = [];
    const segCount = 15;
    for (let i = 0; i < segCount; i++) {
      const seg = new THREE.Mesh(this.geo.icosa, i % 3 === 0 ? this.mat.bossAud : this.mat.bossBody);
      const s = 1.05 * (1 - i / segCount * 0.55);
      seg.scale.setScalar(s);
      seg.position.set(rootPos.x, rootPos.y, rootPos.z + (i + 1) * 1.6);
      this.scene.add(seg);
      segments.push(seg);
      if (i % 2 === 0) {
        const fin = new THREE.Mesh(this.geo.cone, this.mat.bossAud);
        fin.scale.set(0.2, 0.8, 0.2);
        fin.position.set(0, 0.9, 0);
        seg.add(fin);
      }
    }

    root.position.copy(rootPos);
    this.scene.add(root);

    const hp = 560 + bossIndex * 520;
    return {
      type: 'boss', root, visual: head, head, segments, eyes, mouth, horns, hitGlow, light,
      hp, maxHp: hp, radius: 2.0, score: 2500 + bossIndex * 900, wave: bossIndex,
      phase: 0, orbitDir: 1, fireTimer: 2.6, windup: 0, contactCd: 0,
      spawnT: 0, dead: false, flash: 0, bobSeed: 0,
      trail: [],
      segPositions: segments.map(() => new THREE.Vector3(0, 5, -14)),
      aim: new THREE.Vector3(),
      bossIndex,
    };
  }

  spawnSaci(wave, position) {
    const e = this._makeSaci(wave);
    e.root.position.copy(position);
    e.root.rotation.y = rand(0, TAU);
    this.enemies.push(e);
    this.fx.ring(position, 0xff7a3d, 2.2, 0.4);
    return e;
  }

  spawnMula(wave, position) {
    const e = this._makeMula(wave);
    e.root.position.copy(position);
    this.enemies.push(e);
    this.fx.ring(position, 0xff4d1a, 3.2, 0.5);
    return e;
  }

  spawnBoss(bossIndex, position) {
    if (this.boss) return null;
    const e = this._makeBoss(bossIndex);
    e.root.position.copy(position);
    e.segments.forEach((seg, i) => {
      seg.position.set(position.x, position.y, position.z + (i + 1) * 1.6);
      e.segPositions[i].copy(seg.position);
    });
    this.boss = e;
    this.enemies.push(e);
    this.audio?.bossRoar();
    this.fx.ring(position, 0xff4d1a, 8, 0.9);
    return e;
  }

  spawnProjectile(origin, target, { speed = 12, damage = 9, kind = 'saci', spread = 0 } = {}) {
    const p = this.projectiles.find((x) => !x.active);
    if (!p) return null;
    p.active = true;
    p.group.visible = true;
    p.group.position.copy(origin);
    p.vel.copy(target).sub(origin).normalize();
    if (spread) {
      p.vel.x += rand(-spread, spread);
      p.vel.y += rand(-spread, spread) * 0.6;
      p.vel.z += rand(-spread, spread);
      p.vel.normalize();
    }
    p.vel.multiplyScalar(speed);
    p.life = 7;
    p.damage = damage;
    p.kind = kind;
    p.radius = kind === 'boss' ? 0.5 : 0.34;
    const isBoss = kind === 'boss';
    p.core.material = isBoss ? this.mat.projRed : this.mat.projOrange;
    p.core.scale.setScalar(isBoss ? 1.5 : 1);
    p.glow.scale.setScalar(isBoss ? 2.6 : 1.5);
    p.glow.material.color.setHex(isBoss ? 0xff7a1f : 0xffc47a);
    return p;
  }

  raycast(origin, direction, maxDist = 80) {
    this.ray.origin.copy(origin);
    this.ray.direction.copy(direction).normalize();
    let best = null;
    let bestDist = maxDist;
    const sphere = new THREE.Sphere();
    const hit = new THREE.Vector3();
    for (const e of this.enemies) {
      if (e.dead) continue;
      const center = e.type === 'boss' ? e.root.position : e.root.position;
      sphere.set(center, e.radius);
      const point = this.ray.intersectSphere(sphere, new THREE.Vector3());
      if (!point) continue;
      const d = point.distanceTo(origin);
      if (d < bestDist) {
        bestDist = d;
        best = { enemy: e, point: point.clone(), distance: d };
        hit.copy(point);
      }
    }
    return best;
  }

  bestAssistTarget(origin, direction, maxAngle = 0.12) {
    const cosLimit = Math.cos(maxAngle);
    let best = null;
    let bestDot = cosLimit;
    for (const e of this.enemies) {
      if (e.dead) continue;
      const to = this.tmp.copy(e.root.position).sub(origin);
      const dist = to.length();
      if (dist < 1.5 || dist > 70) continue;
      to.normalize();
      const dot = to.dot(direction);
      if (dot > bestDot) {
        bestDot = dot;
        best = e;
      }
    }
    return best;
  }

  damage(enemy, amount, point, isBossCore = false) {
    if (enemy.dead) return false;
    enemy.hp -= amount;
    enemy.flash = 1;
    if (enemy.hitGlow) enemy.hitGlow.material.opacity = 0.9;
    this.fx.spark(point, new THREE.Vector3(0, 0.6, 0), 0xffd2a1, 6);
    if (enemy.hp <= 0) {
      this._kill(enemy, point);
      return true;
    }
    return false;
  }

  _kill(enemy, point) {
    enemy.dead = true;
    const pos = enemy.root.position.clone();
    const isBoss = enemy.type === 'boss';
    if (isBoss) {
      this.boss = null;
      this.audio?.kill(true);
      this.fx.burst(pos, 0xff7a1f, 90, { speed: 14, size: 0.5, life: 1.4, gravity: -1.5 });
      this.fx.burst(pos, 0x38e0ff, 45, { speed: 11, size: 0.3, life: 1.1, gravity: -1.5 });
      this.fx.ring(pos, 0xffa53d, 16, 1.1);
      this.fx.ring(pos, 0x38e0ff, 9, 0.8);
      enemy.segments.forEach((seg, i) => {
        setTimeout(() => {
          const p = seg.position.clone();
          this.fx.burst(p, i % 3 === 0 ? 0x38e0ff : 0xff7a1f, 16, { speed: 8, size: 0.3, life: 0.8 });
          this.fx.ring(p, 0xff8a2f, 3.4, 0.45);
        }, i * 45);
      });
    } else if (enemy.type === 'mula') {
      this.audio?.kill(true);
      this.fx.burst(pos, 0xff5a1a, 36, { speed: 9, size: 0.3, life: 1 });
      this.fx.ring(pos, 0xff5a1a, 5, 0.5);
    } else {
      this.audio?.kill(false);
      this.fx.burst(pos, 0xff6a3d, 24, { speed: 7, size: 0.18, life: 0.75 });
      this.fx.burst(pos, 0xffd08a, 10, { speed: 5, size: 0.12, life: 0.5 });
      this.fx.ring(pos, 0xff7a3d, 2.6, 0.4);
    }
    this.hooks?.onKill?.(enemy, pos);
    this._removeEnemy(enemy);
  }

  _removeEnemy(enemy) {
    const i = this.enemies.indexOf(enemy);
    if (i >= 0) this.enemies.splice(i, 1);
    if (enemy.type === 'boss') {
      enemy.segments.forEach((seg) => this.scene.remove(seg));
    }
    this.scene.remove(enemy.root);
  }

  update(dt, time, playerPos, playerEye) {
    this.time = time;
    this.fx.update(dt);
    for (const e of this.enemies) {
      if (e.dead) continue;
      e.spawnT += dt;
      e.flash = Math.max(0, e.flash - dt * 6);
      if (e.hitGlow) e.hitGlow.material.opacity = e.flash * 0.85;
      const spawnK = clamp(e.spawnT / 0.45, 0, 1);
      const spawnEase = spawnK * spawnK * (3 - 2 * spawnK);
      if (e.type !== 'boss') e.root.scale.setScalar(0.28 + spawnEase * 0.72);
      if (e.type === 'saci') this._updateSaci(e, dt, time, playerPos, playerEye);
      else if (e.type === 'mula') this._updateMula(e, dt, time, playerPos, playerEye);
      else this._updateBoss(e, dt, time, playerPos, playerEye);
      e.aim.copy(e.root.position).add(this.tmp2.set(0, 0.2, 0));
    }
    this._updateProjectiles(dt, playerPos, playerEye);
  }

  _updateSaci(e, dt, time, playerPos, playerEye) {
    const offset = this.tmp.set(
      Math.sin(time * 0.55 * e.orbitDir + e.phase) * 6.5,
      0,
      Math.cos(time * 0.55 * e.orbitDir + e.phase) * 6.5,
    );
    const target = this.tmp2.copy(playerPos).add(offset);
    target.y = 2.4 + Math.sin(time * 1.1 + e.bobSeed) * 0.7;
    const k = 1 - Math.exp(-1.2 * dt);
    e.root.position.lerp(target, k);
    // face the player
    const dx = playerPos.x - e.root.position.x;
    const dz = playerPos.z - e.root.position.z;
    e.root.rotation.y = Math.atan2(dx, dz);
    e.visual.position.y = Math.sin(time * 2.4 + e.bobSeed) * 0.14;
    e.visual.rotation.z = Math.sin(time * 1.7 + e.bobSeed) * 0.08;
    e.eyeRing.rotation.z += dt * 4.5;
    e.vortex.rotation.y += dt * 5.2;
    e.vortex2.rotation.y -= dt * 7;
    e.glow.material.opacity = 0.28 + Math.sin(time * 6 + e.phase) * 0.1;

    const eyeScale = 0.095 + (e.windup > 0 ? Math.min(0.1, e.windup * 0.22) : 0);
    e.eye.scale.setScalar(eyeScale);

    e.fireTimer -= dt;
    if (e.fireTimer <= 0) {
      e.windup += dt;
      if (e.windup > 0.5) {
        e.windup = 0;
        e.fireTimer = rand(2.4, 3.9) - Math.min(1.1, e.wave * 0.05);
        const origin = e.root.position.clone().add(new THREE.Vector3(0, 0.15, 0));
        const target = playerEye.clone();
        this.spawnProjectile(origin, target, { speed: 11.5 + e.wave * 0.15, damage: 9, kind: 'saci', spread: 0.04 });
        this.audio?.enemyShot();
      }
    }
  }

  _updateMula(e, dt, time, playerPos, playerEye) {
    const toPlayer = this.tmp.copy(playerPos).setY(1.35).sub(e.root.position);
    toPlayer.y = 0;
    const dist = toPlayer.length();
    toPlayer.normalize();
    const speed = 6.6 + Math.min(3.2, e.wave * 0.16);
    if (dist < 2.2) {
      // overshoot, then wheel around
      toPlayer.multiplyScalar(-0.55);
    } else {
      toPlayer.multiplyScalar(1);
    }
    e.dir.lerp(toPlayer, 1 - Math.exp(-2.2 * dt)).normalize();
    const wobble = Math.sin(time * 1.4 + e.bobSeed) * 0.25;
    e.root.position.addScaledVector(e.dir, speed * dt);
    e.root.position.y = 1.35 + Math.sin(time * 3 + e.bobSeed) * 0.1;
    const angle = Math.atan2(e.dir.x, e.dir.z) + wobble * 0.04;
    e.root.rotation.y = angle;
    e.visual.rotation.z = Math.sin(time * 9 + e.bobSeed) * 0.06;
    e.visual.position.y = Math.abs(Math.sin(time * 8.5 + e.bobSeed)) * 0.12;
    e.legs.forEach(({ mesh, phase }) => {
      mesh.rotation.x = Math.sin(time * 9 + phase) * 0.7;
    });
    e.mane.forEach((flame, i) => {
      const s = 0.8 + Math.sin(time * 12 + i * 1.8) * 0.25;
      flame.scale.y = (i === e.mane.length - 1 ? 1.3 : 0.7) * s;
      flame.material.opacity = 0.7 + Math.sin(time * 9 + i) * 0.2;
    });
    e.glow.material.opacity = 0.55 + Math.sin(time * 8) * 0.15;
    e.trailTimer -= dt;
    if (e.trailTimer <= 0) {
      e.trailTimer = 0.035;
      this.fx.trail(e.root.position.clone().add(new THREE.Vector3(rand(-0.3, 0.3), rand(0, 0.8), rand(-0.5, 0.5))), 0xff7a2a, 0.13);
    }
    e.contactCd = Math.max(0, e.contactCd - dt);
    if (dist < 1.85 && e.contactCd <= 0) {
      e.contactCd = 1.4;
      this.hooks?.damagePlayer?.(16, e);
      this.fx.burst(e.root.position, 0xff4d1a, 20, { speed: 6, size: 0.2, life: 0.5 });
      // bounce away
      const away = this.tmp.copy(e.root.position).sub(playerPos).setY(0);
      if (away.lengthSq() < 0.0001) away.set(1, 0, 0);
      away.normalize().multiplyScalar(2.6);
      e.root.position.add(away);
    }
    // keep in the arena vicinity
    const r = Math.hypot(e.root.position.x, e.root.position.z);
    if (r > 26) {
      e.root.position.x *= 26 / r;
      e.root.position.z *= 26 / r;
    }
  }

  _updateBoss(e, dt, time, playerPos, playerEye) {
    e.root.scale.setScalar(1);
    const t = time * 0.42;
    const radius = 10.5 + Math.sin(t * 1.3) * 3.2;
    const target = this.tmp.set(
      Math.cos(t * e.orbitDir) * radius,
      4.4 + Math.sin(t * 2.1) * 1.4,
      Math.sin(t * e.orbitDir) * radius * 0.85,
    );
    // occasional dive towards the player
    const dive = Math.sin(time * 0.37) > 0.82 ? clamp((Math.sin(time * 0.37) - 0.82) / 0.18, 0, 1) : 0;
    if (dive > 0) {
      target.lerp(this.tmp2.copy(playerPos).setY(playerPos.y + 3.2), dive * 0.75);
    }
    const k = 1 - Math.exp(-1.8 * dt);
    e.root.position.lerp(target, k);

    // trail samples
    e.trail.unshift(e.root.position.clone());
    if (e.trail.length > 220) e.trail.length = 220;
    const gap = 6;
    e.segments.forEach((seg, i) => {
      const tp = e.trail[Math.min(e.trail.length - 1, (i + 1) * gap)] || e.root.position;
      const desired = this.tmp2.copy(tp);
      const sway = Math.sin(time * 2.2 - i * 0.55) * 0.55;
      desired.x += sway * 0.4;
      desired.y += sway;
      e.segPositions[i].lerp(desired, 1 - Math.exp(-14 * dt));
      seg.position.copy(e.segPositions[i]);
      seg.rotation.x += dt * 0.6;
      seg.rotation.y += dt * 0.4;
      seg.scale.setScalar(1.05 * (1 - i / e.segments.length * 0.55));
    });

    // face player-ish
    const dx = playerPos.x - e.root.position.x;
    const dz = playerPos.z - e.root.position.z;
    e.root.rotation.y = Math.atan2(dx, dz);
    e.root.rotation.z = Math.sin(time * 1.3) * 0.12;
    e.visual.rotation.x = Math.sin(time * 1.7) * 0.06;

    e.eyes.forEach((eye) => {
      eye.scale.x = 0.2 + Math.sin(time * 5) * 0.03;
    });
    e.horns.forEach((horn, i) => {
      horn.rotation.z = (i === 0 ? 0.45 : -0.45) + Math.sin(time * 2 + i) * 0.08;
    });
    e.mouth.scale.setScalar(0.32 + Math.sin(time * 3) * 0.04 + e.windup * 0.9);
    e.light.intensity = 14 + Math.sin(time * 5) * 4 + e.windup * 20;

    e.fireTimer -= dt;
    if (e.fireTimer <= 0) {
      e.windup += dt;
      if (e.windup > 0.55) {
        e.windup = 0;
        const low = e.hp / e.maxHp < 0.5;
        e.fireTimer = low ? 1.5 : 2.2;
        const count = low ? 5 : 3;
        const origin = e.root.position.clone().add(new THREE.Vector3(0, 0, 0));
        const baseTarget = playerEye.clone();
        for (let i = 0; i < count; i++) {
          const spread = (i - (count - 1) / 2) * 0.06;
          this.spawnProjectile(origin, baseTarget, { speed: 13.5, damage: 11, kind: 'boss', spread: 0 });
          const p = this.projectiles.filter((x) => x.active).slice(-1)[0];
          if (p) {
            const side = new THREE.Vector3(-baseTarget.z, 0, baseTarget.x).normalize();
            p.vel.addScaledVector(side, spread * 30);
          }
        }
        this.audio?.enemyShot();
        this.fx.burst(origin, 0xff7a1f, 18, { speed: 5, size: 0.3, life: 0.4 });
      }
    }
  }

  _updateProjectiles(dt, playerPos, playerEye) {
    const eye = this.tmp.copy(playerPos).setY(playerPos.y);
    for (const p of this.projectiles) {
      if (!p.active) continue;
      p.life -= dt;
      p.group.position.addScaledVector(p.vel, dt);
      p.group.rotation.y += dt * 5;
      const scale = 1 + Math.sin(this.time * 20 + p.life) * 0.15;
      p.core.scale.setScalar((p.kind === 'boss' ? 1.5 : 1) * scale);
      p.glow.material.opacity = 0.6 + Math.sin(this.time * 18 + p.life) * 0.25;
      if (Math.random() < 0.6) this.fx.trail(p.group.position, p.kind === 'boss' ? 0xff5a1a : 0xffa53d, p.kind === 'boss' ? 0.14 : 0.09);
      const dx = p.group.position.x - playerPos.x;
      const dz = p.group.position.z - playerPos.z;
      const dy = p.group.position.y - (playerPos.y + 1.0);
      if (Math.sqrt(dx * dx + dz * dz + dy * dy) < 0.75) {
        this._endProjectile(p);
        this.hooks?.damagePlayer?.(p.damage, p);
        continue;
      }
      if (p.group.position.y < 0.15 || p.life <= 0) {
        if (p.group.position.y < 0.4) {
          this.fx.burst(p.group.position, 0xff7a2a, 8, { speed: 2.5, size: 0.12, life: 0.35 });
        }
        this._endProjectile(p);
      }
    }
  }

  _endProjectile(p) {
    p.active = false;
    p.group.visible = false;
  }

  clearProjectiles() {
    this.projectiles.forEach((p) => this._endProjectile(p));
  }

  reset() {
    for (const e of this.enemies.slice()) {
      if (e.type === 'boss') e.segments.forEach((seg) => this.scene.remove(seg));
      this.scene.remove(e.root);
    }
    this.enemies.length = 0;
    this.boss = null;
    this.clearProjectiles();
    this.fx.reset();
  }

  get bossHp() {
    return this.boss ? this.boss.hp / this.boss.maxHp : 0;
  }
}
