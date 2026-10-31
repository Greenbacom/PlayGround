import * as THREE from 'three';
import { clamp, damp, rand, choice, TAU } from './utils.js';

const TYPES = {
  drone: {
    hp: 38, speed: 2.3, radius: 0.65, hover: 1.65, scale: 1, color: 0xff3b8d,
    attack: 'melee', range: 2.3, cooldown: 1.6, damage: 9, score: 100
  },
  seeker: {
    hp: 24, speed: 5.1, radius: 0.52, hover: 1.5, scale: 0.8, color: 0xff8a3d,
    attack: 'kamikaze', range: 2.1, cooldown: 1.3, damage: 19, score: 130
  },
  brute: {
    hp: 175, speed: 1.4, radius: 1.1, hover: 1.9, scale: 1.75, color: 0xb44cff,
    attack: 'slam', range: 3.6, cooldown: 2.2, damage: 27, score: 320
  },
  spitter: {
    hp: 64, speed: 1.95, radius: 0.72, hover: 2.15, scale: 1.05, color: 0x5dffb0,
    attack: 'ranged', range: 13, cooldown: 2.35, damage: 11, score: 180
  }
};

export const ENEMY_TYPES = TYPES;

export class EnemyManager {
  constructor({ scene, world, audio, callbacks = {} }) {
    this.scene = scene;
    this.world = world;
    this.audio = audio;
    this.cb = callbacks;
    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.killCount = 0;
    this.wave = 1;
    this.decor = false;
    this._tmp = new THREE.Vector3();
    this._tmp2 = new THREE.Vector3();
  }

  /* ---------------------------------------------------------- */
  makeEnemy(type, position, { decor = false } = {}) {
    const cfg = TYPES[type] || TYPES.drone;
    const group = new THREE.Group();
    group.position.copy(position);
    const scale = cfg.scale;
    const color = new THREE.Color(cfg.color);

    const coreGeo = type === 'brute'
      ? new THREE.DodecahedronGeometry(0.5 * scale, 0)
      : new THREE.IcosahedronGeometry(0.46 * scale, 1);
    const coreMat = this.world.softwareRenderer
      ? new THREE.MeshBasicMaterial({ color: color.clone().multiplyScalar(0.42), toneMapped: false, fog: false })
      : new THREE.MeshStandardMaterial({
        color: 0x090612,
        emissive: color,
        emissiveIntensity: 1.45,
        metalness: 0.75,
        roughness: 0.26
      });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const wireMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.4, toneMapped: false, fog: false });
    const wire = new THREE.Mesh(coreGeo.clone(), wireMat);
    wire.scale.setScalar(1.09);
    group.add(wire);

    const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, toneMapped: false, fog: false });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.68 * scale, 0.018, 5, 30), ringMat);
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.84 * scale, 0.01, 5, 30), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, toneMapped: false, fog: false }));
    ring2.rotation.x = Math.PI / 2;
    ring2.rotation.y = 0.6;
    group.add(ring2);

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfff4fb, toneMapped: false, fog: false });
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.085 * scale, 10, 10), eyeMat);
    eye.position.set(0, 0, 0.48 * scale);
    group.add(eye);

    const shards = [];
    for (let i = 0; i < (type === 'brute' ? 5 : 3); i++) {
      const shard = new THREE.Mesh(new THREE.TetrahedronGeometry(0.075 * scale, 0), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, toneMapped: false, fog: false }));
      shard.userData = { a: (i / 3) * TAU, r: (0.85 + (i % 2) * 0.22) * scale, y: (i % 2 ? 0.28 : -0.22) * scale };
      group.add(shard);
      shards.push(shard);
    }

    if (type === 'brute') {
      for (let i = 0; i < 6; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.055 * scale, 0.3 * scale, 4), new THREE.MeshBasicMaterial({ color, toneMapped: false, fog: false }));
        const a = (i / 6) * TAU;
        spike.position.set(Math.cos(a) * 0.5 * scale, Math.sin(a) * 0.5 * scale, 0);
        spike.rotation.z = a - Math.PI / 2;
        group.add(spike);
      }
    }

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.world.glowTexture,
      color,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      fog: false
    }));
    glow.scale.setScalar(1.35 * scale);
    group.add(glow);

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.7, 1.7),
      new THREE.MeshBasicMaterial({
        map: this.world.shadowTexture,
        color: 0x000000,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
        fog: false
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(position.x, 0.045, position.z);
    this.scene.add(shadow);

    const enemy = {
      type,
      cfg,
      group,
      core,
      coreMat,
      wireMat,
      ring,
      ring2,
      shards,
      glow,
      shadow,
      eye,
      hp: cfg.hp,
      maxHp: cfg.hp,
      alive: true,
      active: true,
      decor,
      spawnT: decor ? 1 : 0,
      flash: 0,
      slowT: 0,
      dot: null,
      cooldown: rand(0.4, 1.8),
      phase: rand(0, TAU),
      height: cfg.hover,
      baseHeight: cfg.hover,
      vel: new THREE.Vector3(),
      knock: new THREE.Vector3(),
      radius: cfg.radius,
      orbitDir: Math.random() < 0.5 ? 1 : -1,
      dieT: 0
    };
    group.scale.setScalar(decor ? 1 : 0.01);
    this.scene.add(group);
    this.enemies.push(enemy);
    return enemy;
  }

  spawn(type, position, opts = {}) {
    const e = this.makeEnemy(type, position, opts);
    if (!opts.decor) {
      this.world.shockwave(new THREE.Vector3(position.x, 0.06, position.z), e.cfg.color, 2.8, 0.6);
      this.world.spark(new THREE.Vector3(position.x, 0.5, position.z), e.cfg.color, 16, 1.1, 0.06, 0.7);
    }
    return e;
  }

  spawnDecor(count = 4) {
    this.decor = true;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * TAU + 0.7;
      const p = new THREE.Vector3(Math.sin(a) * 12, 2.1 + rand(0, 1.4), Math.cos(a) * 12);
      const type = i === 2 ? 'brute' : i === 1 ? 'spitter' : 'drone';
      this.spawn(type, p, { decor: true });
    }
  }

  clear() {
    for (const e of this.enemies) {
      this.scene.remove(e.group);
      this.scene.remove(e.shadow);
      this.disposeEnemy(e);
    }
    for (const p of this.projectiles) {
      this.scene.remove(p.mesh);
      if (p.glow) this.scene.remove(p.glow);
    }
    for (const p of this.pickups) {
      this.scene.remove(p.group);
    }
    this.enemies.length = 0;
    this.projectiles.length = 0;
    this.pickups.length = 0;
    this.decor = false;
  }

  disposeEnemy(e) {
    e.group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material.dispose();
      }
    });
    e.shadow.geometry.dispose();
    e.shadow.material.dispose();
  }

  get aliveCount() {
    return this.enemies.reduce((n, e) => n + (e.alive ? 1 : 0), 0);
  }

  nearest(pos, maxDist = 40, exclude = null) {
    let best = null;
    let bestD = maxDist;
    for (const e of this.enemies) {
      if (!e.alive || e === exclude || e.spawnT < 0.4) continue;
      const d = e.group.position.distanceTo(pos);
      if (d < bestD) { bestD = d; best = e; }
    }
    return best;
  }

  raycast(origin, dir, maxDist = 120) {
    let best = null;
    let bestT = maxDist;
    for (const e of this.enemies) {
      if (!e.alive || e.spawnT < 0.35) continue;
      const center = this._tmp.copy(e.group.position);
      const oc = this._tmp2.copy(center).sub(origin);
      const tca = oc.dot(dir);
      if (tca < 0) continue;
      const d2 = oc.lengthSq() - tca * tca;
      const r = e.radius * 1.12;
      if (d2 > r * r) continue;
      const t = tca - Math.sqrt(Math.max(0, r * r - d2));
      if (t > 0 && t < bestT) {
        bestT = t;
        best = { enemy: e, distance: t, point: origin.clone().addScaledVector(dir, t) };
      }
    }
    return best;
  }

  raycastAll(origin, dir, maxDist = 120) {
    const hits = [];
    for (const e of this.enemies) {
      if (!e.alive || e.spawnT < 0.35) continue;
      const center = e.group.position;
      const ox = center.x - origin.x;
      const oy = center.y - origin.y;
      const oz = center.z - origin.z;
      const tca = ox * dir.x + oy * dir.y + oz * dir.z;
      if (tca < 0) continue;
      const d2 = ox * ox + oy * oy + oz * oz - tca * tca;
      const r = e.radius * 1.12;
      if (d2 > r * r) continue;
      const t = tca - Math.sqrt(Math.max(0, r * r - d2));
      if (t > 0 && t < maxDist) {
        hits.push({ enemy: e, distance: t, point: origin.clone().addScaledVector(dir, t) });
      }
    }
    return hits.sort((a, b) => a.distance - b.distance);
  }

  damage(e, amount, opts = {}) {
    if (!e || !e.alive) return false;
    const crit = opts.crit || false;
    let dmg = amount;
    if (opts.effect === 'slow') e.slowT = Math.max(e.slowT, opts.duration || 1.8);
    if (opts.effect === 'venom') e.dot = { dps: opts.dot || 8, time: opts.duration || 3 };
    if (opts.effect === 'burn') e.dot = { dps: opts.dot || 12, time: opts.duration || 2.2 };

    e.hp -= dmg;
    e.flash = 0.09;
    e.active = true;
    if (opts.knockback) {
      e.knock.copy(opts.knockback).setY(0);
    }
    const head = this._tmp.copy(e.group.position);
    head.y += 0.45;
    if (this.cb.onDamageNumber) this.cb.onDamageNumber(head.clone(), Math.round(dmg), crit ? 'crit' : 'normal');
    if (this.cb.onHit) this.cb.onHit(e, dmg, crit);
    this.audio?.hit(clamp((head.x - (this.cb.playerX?.() || 0)) / 18, -1, 1));

    if (e.hp <= 0) {
      this.kill(e);
      return true;
    }
    return false;
  }

  kill(e) {
    if (!e.alive) return;
    e.alive = false;
    e.dieT = 0.001;
    const pos = e.group.position.clone();
    this.world.spark(pos, e.cfg.color, e.type === 'brute' ? 52 : 30, e.type === 'brute' ? 2.1 : 1.4, 0.09, 1.0);
    this.world.spark(pos, 0xffffff, 8, 1.6, 0.05, 0.5);
    this.world.shockwave(new THREE.Vector3(pos.x, 0.08, pos.z), e.cfg.color, e.type === 'brute' ? 7 : 4, 0.7);
    this.world.impact(pos, e.cfg.color, e.type === 'brute' ? 3.2 : 1.8);
    this.audio?.kill();
    if (e.type === 'brute') this.audio?.explosion(0, true);
    this.killCount++;
    if (this.cb.onKill) this.cb.onKill(e, { position: pos, score: e.cfg.score, type: e.type });

    if (Math.random() < (e.type === 'brute' ? 0.7 : 0.14)) this.dropPickup(pos, 'health');
    this.scene.remove(e.group);
    this.scene.remove(e.shadow);
    this.disposeEnemy(e);
  }

  dropPickup(pos, kind = 'health') {
    const group = new THREE.Group();
    group.position.set(pos.x, 0.9, pos.z);
    const color = kind === 'health' ? 0x5dffa9 : 0x3ef3ff;
    const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 2.2,
      metalness: 0.5,
      roughness: 0.2
    }));
    group.add(orb);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.014, 5, 28),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, toneMapped: false, fog: false })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.world.glowTexture,
      color,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      fog: false
    }));
    glow.scale.setScalar(1.5);
    group.add(glow);
    this.scene.add(group);
    this.pickups.push({ group, orb, ring, kind, life: 22, phase: rand(0, TAU) });
  }

  applyArea(center, radius, damage, opts = {}) {
    let count = 0;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const d = e.group.position.distanceTo(center);
      if (d <= radius + e.radius) {
        const falloff = clamp(1 - d / (radius + e.radius) * 0.55, 0.45, 1);
        const dir = e.group.position.clone().sub(center).setY(0).normalize();
        this.damage(e, damage * falloff, { ...opts, knockback: dir.multiplyScalar(4) });
        count++;
      }
    }
    return count;
  }

  spawnProjectile(opts) {
    const {
      from, dir, speed = 30, color = 0x3ef3ff, owner = 'player',
      damage = 20, radius = 0.22, splash = 0, homing = false,
      slow = false, venom = false, burn = false, life = 3.2, size = 1
    } = opts;
    const group = new THREE.Group();
    group.position.copy(from);
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(radius * size, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false, fog: false })
    );
    group.add(mesh);
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(radius * size * 1.5, 0),
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.8, toneMapped: false, fog: false })
    );
    group.add(shell);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.world.glowTexture,
      color,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      fog: false
    }));
    glow.scale.setScalar(radius * 8 * size);
    group.add(glow);
    this.scene.add(group);
    this.projectiles.push({
      group, mesh, shell, glow, dir: dir.clone().normalize(), speed, color,
      owner, damage, radius: radius * size, splash, homing, slow, venom, burn,
      life, maxLife: life, target: null
    });
  }

  /* ---------------------------------------------------------- */
  update(dt, t, player) {
    const playerPos = player?.position || new THREE.Vector3(0, 1.7, 0);
    const chest = this._tmp2.set(playerPos.x, playerPos.y - 0.2, playerPos.z);

    for (const e of this.enemies) {
      if (!e.alive) continue;
      const g = e.group;
      const pos = g.position;

      if (e.spawnT < 1) {
        e.spawnT = Math.min(1, e.spawnT + dt * 2.4);
        const s = e.type === 'brute' ? e.cfg.scale : 1;
        g.scale.setScalar((0.2 + e.spawnT * 0.8) * (e.decor ? 1 : 1));
        if (!e.decor) g.scale.multiplyScalar(0.4 + e.spawnT * 0.6);
      }

      if (e.flash > 0) {
        e.flash -= dt;
        e.coreMat.emissiveIntensity = 4.5;
        e.coreMat.emissive.setHex(0xffffff);
        if (e.flash <= 0) {
          e.coreMat.emissiveIntensity = 1.45;
          e.coreMat.emissive.setHex(e.cfg.color);
        }
      }

      if (e.slowT > 0) {
        e.slowT -= dt;
        e.ring.material.color.setHex(0x9fefff);
        e.wireMat.color.setHex(0x9fefff);
        if (e.slowT <= 0) {
          e.ring.material.color.setHex(e.cfg.color);
          e.wireMat.color.setHex(e.cfg.color);
        }
      }

      if (e.dot && e.dot.time > 0) {
        e.dot.time -= dt;
        e.dot.acc = (e.dot.acc || 0) + dt;
        if (e.dot.acc > 0.45) {
          e.dot.acc = 0;
          this.damage(e, e.dot.dps * 0.45, {});
          if (!e.alive) continue;
        }
      }

      // hover + animations
      const bob = Math.sin(t * 1.7 + e.phase) * 0.18;
      e.height = damp(e.height, e.baseHeight + bob, 4, dt);
      g.position.y = e.height;
      g.rotation.z = Math.sin(t * 0.9 + e.phase) * 0.12;
      g.rotation.x = Math.cos(t * 1.2 + e.phase) * 0.08;
      e.ring.rotation.z += dt * (1.2 + (e.type === 'seeker' ? 2.2 : 0));
      e.ring2.rotation.z -= dt * 0.8;
      e.eye.scale.setScalar(0.9 + Math.sin(t * 5 + e.phase) * 0.16);

      for (const s of e.shards) {
        const a = s.userData.a + t * (0.7 + e.phase * 0.01);
        s.position.set(Math.cos(a) * s.userData.r, s.userData.y + Math.sin(t * 2 + a) * 0.08, Math.sin(a) * s.userData.r);
        s.rotation.x += dt * 1.4;
        s.rotation.y += dt * 1.1;
      }

      e.shadow.position.set(pos.x, 0.045, pos.z);
      const shScale = clamp(1.4 - (e.height - 1) * 0.15, 0.6, 1.5) * e.cfg.scale;
      e.shadow.scale.setScalar(shScale);
      e.shadow.material.opacity = clamp(0.5 - (e.height - 1) * 0.08, 0.12, 0.55);

      if (e.decor) {
        const a = t * 0.12 * e.orbitDir + e.phase;
        const r = 9 + Math.sin(e.phase * 2) * 4;
        g.position.x = damp(g.position.x, Math.sin(a) * r, 0.4, dt);
        g.position.z = damp(g.position.z, Math.cos(a) * r, 0.4, dt);
        g.lookAt(0, 2, 0);
        continue;
      }

      if (!e.alive || !player) continue;

      // AI steering
      const toPlayer = this._tmp.copy(chest).setY(0).sub(pos.clone().setY(0));
      const dist = toPlayer.length();
      const dir = dist > 0.001 ? toPlayer.clone().divideScalar(dist) : new THREE.Vector3();
      let desired;
      if (e.type === 'spitter') {
        const want = 9.5;
        desired = dir.clone().multiplyScalar(dist > want + 1 ? 1 : dist < want - 1 ? -0.85 : 0);
        desired.x += -dir.z * e.orbitDir * 0.65;
        desired.z += dir.x * e.orbitDir * 0.65;
      } else if (dist > e.cfg.range * 0.92) {
        desired = dir.clone();
      } else {
        desired = dir.clone().multiplyScalar(-0.2);
        desired.x += -dir.z * e.orbitDir * 0.4;
        desired.z += dir.x * e.orbitDir * 0.4;
      }

      // separation
      for (const o of this.enemies) {
        if (o === e || !o.alive) continue;
        const dx = pos.x - o.group.position.x;
        const dz = pos.z - o.group.position.z;
        const d = Math.hypot(dx, dz);
        const min = e.radius + o.radius + 0.55;
        if (d < min && d > 0.001) {
          desired.x += (dx / d) * (1 - d / min) * 2.2;
          desired.z += (dz / d) * (1 - d / min) * 2.2;
        }
      }

      const speed = e.cfg.speed * (e.slowT > 0 ? 0.42 : 1) * (1 + Math.min(this.wave, 14) * 0.018);
      const targetVel = desired.normalize().multiplyScalar(speed);
      e.vel.x = damp(e.vel.x, targetVel.x, 3.5, dt);
      e.vel.z = damp(e.vel.z, targetVel.z, 3.5, dt);
      pos.x += e.vel.x * dt + e.knock.x * dt;
      pos.z += e.vel.z * dt + e.knock.z * dt;
      e.knock.multiplyScalar(Math.exp(-7 * dt));
      this.world.pushOut(pos, e.radius);
      g.lookAt(chest.x, g.position.y, chest.z);

      // attacks
      e.cooldown -= dt;
      if (e.cooldown <= 0 && (e.type !== 'spitter' || dist < e.cfg.range)) {
        if (e.type === 'spitter') {
          e.cooldown = e.cfg.cooldown * rand(0.85, 1.15);
          const origin = new THREE.Vector3(pos.x, pos.y, pos.z);
          const aim = chest.clone().sub(origin).normalize();
          aim.x += rand(-0.035, 0.035);
          aim.y += rand(-0.02, 0.02);
          aim.z += rand(-0.035, 0.035);
          this.spawnProjectile({
            from: origin, dir: aim.normalize(), speed: 13, color: 0x7dffb2,
            owner: 'enemy', damage: e.cfg.damage, radius: 0.26, life: 4.5, size: 1.15
          });
          this.audio?.tone?.({ freq: 700, end: 220, dur: 0.18, type: 'sawtooth', gain: 0.03 });
        } else if (e.type === 'seeker' && dist < 2.6) {
          this.detonate(e, player);
          continue;
        } else if (dist < e.cfg.range) {
          e.cooldown = e.cfg.cooldown * rand(0.85, 1.2);
          this.strike(e, player, dist);
        }
      }
    }

    // remove dead
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (!e.alive) {
        e.dieT += dt;
        if (e.dieT > 0.1) this.enemies.splice(i, 1);
      }
    }

    this.updateProjectiles(dt, t, player, chest);

    // pickups
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const p = this.pickups[i];
      p.life -= dt;
      p.group.position.y = 0.85 + Math.sin(t * 2.2 + p.phase) * 0.16;
      p.ring.rotation.z += dt * 1.4;
      p.orb.rotation.y += dt * 1.6;
      p.orb.rotation.x += dt * 0.8;
      const d = Math.hypot(p.group.position.x - playerPos.x, p.group.position.z - playerPos.z);
      if (d < 1.15) {
        this.audio?.pickup();
        if (this.cb.onPickup) this.cb.onPickup(p.kind, p.group.position.clone());
        this.world.spark(p.group.position, 0x5dffa9, 20, 1, 0.07, 0.7);
        this.scene.remove(p.group);
        this.pickups.splice(i, 1);
        continue;
      }
      if (p.life <= 0) {
        this.scene.remove(p.group);
        this.pickups.splice(i, 1);
      }
    }
  }

  detonate(e, player) {
    const pos = e.group.position.clone();
    const dist = Math.hypot(pos.x - player.position.x, pos.z - player.position.z);
    const damage = e.cfg.damage * clamp(1 - dist / 4.2, 0.25, 1);
    this.audio?.explosion();
    this.world.shockwave(new THREE.Vector3(pos.x, 0.1, pos.z), 0xff8a3d, 4.4, 0.6);
    this.world.spark(pos, 0xff8a3d, 28, 1.8, 0.08, 0.8);
    if (dist < 4) this.cb.onDamagePlayer?.(Math.round(damage), pos);
    e.alive = false;
    e.dieT = 0.001;
    this.killCount++;
    if (this.cb.onKill) this.cb.onKill(e, { position: pos, score: e.cfg.score, type: e.type });
    this.scene.remove(e.group);
    this.scene.remove(e.shadow);
    this.disposeEnemy(e);
  }

  strike(e, player, dist) {
    const pos = e.group.position.clone();
    this.world.shockwave(new THREE.Vector3(player.position.x, 0.06, player.position.z), e.cfg.color, e.type === 'brute' ? 4.4 : 2.6, 0.45);
    this.world.spark(new THREE.Vector3(player.position.x, 1, player.position.z), e.cfg.color, e.type === 'brute' ? 25 : 12, 1.1, 0.06, 0.5);
    this.audio?.hurt();
    this.cb.onDamagePlayer?.(e.cfg.damage, pos);
    if (e.type === 'brute') this.cb.onShake?.(0.7);
  }

  updateProjectiles(dt, t, player, chest) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      if (p.life <= 0) { this.removeProjectile(i); continue; }

      if (p.homing && p.owner === 'player') {
        if (!p.target || !p.target.alive) p.target = this.nearest(p.group.position, 34);
        if (p.target) {
          const want = p.target.group.position.clone().sub(p.group.position).normalize();
          p.dir.lerp(want, clamp(dt * 6, 0, 1)).normalize();
        }
      }

      const prev = p.group.position.clone();
      p.group.position.addScaledVector(p.dir, p.speed * dt);
      p.group.rotation.x += dt * 9;
      p.group.rotation.y += dt * 7;

      // trail
      if (Math.random() < 0.75) {
        this.world.sparks.spawn(p.group.position, p.color, 1, 0.25, 0.2, 0.035, 0.35, 0.4);
      }

      if (p.owner === 'player') {
        let hit = null;
        for (const e of this.enemies) {
          if (!e.alive || e.spawnT < 0.3) continue;
          if (e.group.position.distanceTo(p.group.position) < e.radius + p.radius + 0.22) { hit = e; break; }
        }
        if (hit) {
          this.projectileImpact(p, hit.group.position.clone(), hit);
          this.removeProjectile(i);
          continue;
        }
        if (p.group.position.y <= 0.08) {
          this.projectileImpact(p, new THREE.Vector3(p.group.position.x, 0.1, p.group.position.z), null);
          this.removeProjectile(i);
          continue;
        }
        if (this.hitsCover(p.group.position)) {
          this.projectileImpact(p, p.group.position.clone(), null);
          this.removeProjectile(i);
          continue;
        }
        if (Math.hypot(p.group.position.x, p.group.position.z) > 34) {
          this.removeProjectile(i);
        }
      } else {
        if (p.group.position.distanceTo(chest) < 0.95) {
          this.audio?.hurt();
          this.cb.onDamagePlayer?.(p.damage, p.group.position.clone());
          this.world.shockwave(new THREE.Vector3(chest.x, 1, chest.z), p.color, 2.4, 0.35);
          this.removeProjectile(i);
          continue;
        }
        if (p.group.position.y <= 0.06 || this.hitsCover(p.group.position)) {
          this.world.spark(p.group.position, p.color, 12, 0.8, 0.05, 0.5);
          this.removeProjectile(i);
          continue;
        }
      }
    }
  }

  hitsCover(pos) {
    for (const c of this.world.colliders) {
      if (Math.hypot(pos.x - c.x, pos.z - c.z) < c.r + 0.08 && pos.y < 3.4) return true;
    }
    return false;
  }

  projectileImpact(p, point, enemy) {
    this.world.impact(point, p.color, p.splash ? 2.4 : 1.2);
    this.world.spark(point, p.color, p.splash ? 24 : 10, p.splash ? 1.7 : 1, 0.06, 0.7);
    if (p.splash > 0) {
      this.audio?.explosion();
      this.world.shockwave(new THREE.Vector3(point.x, 0.1, point.z), p.color, p.splash, 0.55);
      const opts = {};
      if (p.slow) { opts.effect = 'slow'; opts.duration = 2.2; }
      if (p.venom) { opts.effect = 'venom'; opts.dot = 10; opts.duration = 3.5; }
      if (p.burn) { opts.effect = 'burn'; opts.dot = 14; opts.duration = 2.5; }
      this.applyArea(point, p.splash, p.damage, opts);
    } else if (enemy) {
      const opts = {};
      if (p.slow) { opts.effect = 'slow'; opts.duration = 2.2; }
      if (p.venom) { opts.effect = 'venom'; opts.dot = 10; opts.duration = 3.5; }
      if (p.burn) { opts.effect = 'burn'; opts.dot = 14; opts.duration = 2.5; }
      this.damage(enemy, p.damage, opts);
    }
  }

  removeProjectile(i) {
    const p = this.projectiles[i];
    this.scene.remove(p.group);
    this.projectiles.splice(i, 1);
  }

  clearProjectiles() {
    for (const p of this.projectiles) this.scene.remove(p.group);
    this.projectiles.length = 0;
  }
}
