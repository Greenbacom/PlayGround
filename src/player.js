import * as THREE from '../vendor/three.module.js';
import { glowSprite, maskPaintTexture } from './textures.js';

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const clamp = THREE.MathUtils.clamp;

const WEAPONS = {
  smg: {
    id: 'smg', name: 'TUIM', label: 'SUBMETRALHADORA', mag: 30, damage: 13.5,
    rate: 0.082, spread: 0.019, adsSpread: 0.0055, recoil: 0.012, reload: 1.45,
    pellets: 1, range: 140, auto: true, color: 0x1fd1b2,
  },
  shotgun: {
    id: 'shotgun', name: 'BERRANTE', label: 'ESPINGARDA', mag: 6, damage: 10.5,
    rate: 0.78, spread: 0.078, adsSpread: 0.044, recoil: 0.055, reload: 2.2,
    pellets: 9, range: 44, auto: false, color: 0xffb347,
  },
};

function mat(color, roughness = 0.5, metalness = 0.5, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
}

export class Player {
  constructor({ camera, renderer, scene, audio, effects, world }) {
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;
    this.audio = audio;
    this.effects = effects;
    this.world = world;

    this.position = V(0, 1.65, 13);
    this.velocity = V();
    this.yaw = 0;
    this.pitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.shake = 0;
    this.bobT = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.alive = true;
    this.grounded = true;
    this.sprinting = false;
    this.lastDamage = -99;
    this.lastStep = 0;
    this.radius = 0.42;
    this.moveAmount = 0;
    this.aimAmount = 0;
    this.spread = 0.02;
    this.fireCooldown = 0;
    this.triggerReleased = true;
    this.ads = false;
    this.reloadT = 0;
    this.reloading = false;
    this.switchT = 0;
    this.switching = false;
    this.current = 'smg';
    this.ammo = { smg: 30, shotgun: 6 };
    this.reserve = { smg: Infinity, shotgun: Infinity };
    this.stats = { shots: 0, hits: 0, kills: 0, headshots: 0, damage: 0 };
    this.onHealth = null;
    this.onAmmo = null;
    this.onHit = null;
    this.onKill = null;
    this.onDamage = null;
    this.onDeath = null;
    this.onWeapon = null;
    this.onCapybara = null;
    this.getTargets = () => [];
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 150;

    this.camera.rotation.order = 'YXZ';
    this._setupViewmodel();
    this.reset();
  }

  /* ------------------------------------------------------------ viewmodel */
  _setupViewmodel() {
    this.wmScene = new THREE.Scene();
    this.wmCamera = new THREE.PerspectiveCamera(58, 1, 0.01, 6);
    this.wmScene.environment = this.scene.environment;
    this.wmScene.add(new THREE.HemisphereLight(0xbcd8ff, 0x3a1e22, 1.4));
    const key = new THREE.DirectionalLight(0xffc58a, 3.2);
    key.position.set(-1, 2, 1.5);
    this.wmScene.add(key);
    const rim = new THREE.DirectionalLight(0x6fa0ff, 1.5);
    rim.position.set(2, 1, -1);
    this.wmScene.add(rim);
    const fill = new THREE.PointLight(0xff8f5a, 2.2, 4, 2);
    fill.position.set(0.5, -0.4, 0.6);
    this.wmScene.add(fill);

    this.wmRoot = new THREE.Group();
    this.wmRoot.position.set(0.38, -0.34, -1.12);
    this.wmRoot.scale.setScalar(0.72);
    this.wmScene.add(this.wmRoot);

    this.smg = this._buildSmg();
    this.shotgun = this._buildShotgun();
    this.wmRoot.add(this.smg.group, this.shotgun.group);
    this.shotgun.group.visible = false;

    this.flashLight = new THREE.PointLight(0xffc26a, 0, 2.5, 2);
    this.flashLight.position.set(0.16, 0.02, -0.8);
    this.wmScene.add(this.flashLight);

    this.casings = [];
    const brass = mat(0xd6a34a, 0.28, 0.85);
    for (let i = 0; i < 8; i++) {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.045, 6), brass);
      c.visible = false;
      c.userData = { vel: V(), spin: V(), life: 0 };
      this.wmScene.add(c);
      this.casings.push(c);
    }
    this.casingCursor = 0;
  }

  _buildSmg() {
    const g = new THREE.Group();
    const gun = mat(0x24252e, 0.38, 0.75);
    const dark = mat(0x14151b, 0.5, 0.6);
    const tan = mat(0xb38a58, 0.65, 0.2);
    const teal = mat(0x1fd1b2, 0.32, 0.4, { emissive: 0x0f8f7c, emissiveIntensity: 0.5 });
    const orange = mat(0xff7a24, 0.4, 0.3, { emissive: 0x7a2a00, emissiveIntensity: 0.3 });
    const steel = mat(0x8e96a2, 0.25, 0.95);

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.15, 0.42), gun);
    body.position.set(0, 0, -0.1);
    g.add(body);
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.075, 0.38), dark);
    upper.position.set(0, 0.1, -0.12);
    g.add(upper);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.018, 0.34), steel);
    rail.position.set(0, 0.147, -0.11);
    g.add(rail);
    for (let i = 0; i < 7; i++) {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.018), dark);
      tooth.position.set(0, 0.16, 0.02 - i * 0.045);
      g.add(tooth);
    }
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.023, 0.023, 0.42, 10), steel);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.015, -0.47);
    g.add(barrel);
    const brake = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.034, 0.1, 8), dark);
    brake.rotation.x = Math.PI / 2;
    brake.position.set(0, 0.015, -0.68);
    g.add(brake);
    const brakeRing = new THREE.Mesh(new THREE.TorusGeometry(0.036, 0.008, 6, 12), teal);
    brakeRing.position.set(0, 0.015, -0.73);
    g.add(brakeRing);
    const shroud = new THREE.Mesh(new THREE.CylinderGeometry(0.047, 0.047, 0.2, 10), dark);
    shroud.rotation.x = Math.PI / 2;
    shroud.position.set(0, 0.012, -0.33);
    g.add(shroud);
    for (let i = 0; i < 3; i++) {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.012, 0.035), tan);
      vent.position.set(0, 0.055 - i * 0.035, -0.31);
      g.add(vent);
    }
    const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.24), tan);
    handguard.position.set(0, -0.005, -0.27);
    g.add(handguard);
    const mag = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.26, 0.12), teal);
    mag.position.set(0, -0.2, -0.06);
    mag.rotation.x = -0.16;
    g.add(mag);
    const magBase = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.035, 0.14), dark);
    magBase.position.set(0, -0.33, -0.04);
    magBase.rotation.x = -0.16;
    g.add(magBase);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.2, 0.1), dark);
    grip.position.set(0, -0.17, 0.1);
    grip.rotation.x = 0.22;
    g.add(grip);
    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.095, 0.27), gun);
    stock.position.set(0, 0.0, 0.22);
    stock.rotation.x = -0.05;
    g.add(stock);
    const stockPad = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.12, 0.035), dark);
    stockPad.position.set(0, -0.015, 0.365);
    g.add(stockPad);
    const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.035, 0.18), tan);
    cheek.position.set(0, 0.06, 0.2);
    g.add(cheek);
    const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.06, 0.02), steel);
    trigger.position.set(0, -0.09, 0.055);
    g.add(trigger);
    // sight
    const sight = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.075, 0.1), dark);
    sight.position.set(0, 0.19, -0.06);
    g.add(sight);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff3b3b, toneMapped: false }));
    dot.position.set(0, 0.19, -0.11);
    g.add(dot);
    const accent = new THREE.Mesh(new THREE.BoxGeometry(0.135, 0.025, 0.06), teal);
    accent.position.set(0, -0.055, -0.16);
    g.add(accent);

    // gloves + forearms
    const glove = mat(0x22232b, 0.82, 0.05);
    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.11, 0.14), glove);
    rightHand.position.set(0.005, -0.13, 0.1);
    rightHand.rotation.x = 0.22;
    g.add(rightHand);
    const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.17), glove);
    leftHand.position.set(-0.105, -0.12, -0.27);
    leftHand.rotation.z = 0.22;
    g.add(leftHand);
    const knuckle = new THREE.Mesh(new THREE.BoxGeometry(0.105, 0.03, 0.07), orange);
    knuckle.position.set(-0.105, -0.07, -0.34);
    g.add(knuckle);

    // sticker
    const sticker = new THREE.Mesh(
      new THREE.PlaneGeometry(0.055, 0.055),
      new THREE.MeshBasicMaterial({ map: maskPaintTexture(1), toneMapped: false })
    );
    sticker.position.set(0.068, -0.01, -0.02);
    sticker.rotation.y = Math.PI / 2;
    g.add(sticker);

    const muzzle = new THREE.Object3D();
    muzzle.position.set(0, 0.015, -0.78);
    g.add(muzzle);

    const flash = this._buildFlash(0, 0.015, -0.79);
    g.add(flash.group);

    g.userData = { mag, dot, flash, muzzle, basePos: g.position.clone() };
    return { group: g, userData: g.userData };
  }

  _buildShotgun() {
    const g = new THREE.Group();
    const gun = mat(0x2b2c34, 0.35, 0.8);
    const dark = mat(0x15161b, 0.5, 0.55);
    const wood = mat(0x8a512a, 0.62, 0.1);
    const steel = mat(0x9aa0aa, 0.22, 0.95);
    const orange = mat(0xff7a24, 0.4, 0.3, { emissive: 0x7a2a00, emissiveIntensity: 0.4 });

    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.38), gun);
    receiver.position.set(0, 0, 0.0);
    g.add(receiver);
    for (const s of [-1, 1]) {
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.72, 10), steel);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(s * 0.038, 0.045, -0.5);
      g.add(barrel);
    }
    const pump = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.1, 0.24), wood);
    pump.position.set(0, -0.03, -0.4);
    g.add(pump);
    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.16, 0.4), wood);
    stock.position.set(0, -0.05, 0.36);
    stock.rotation.x = 0.12;
    g.add(stock);
    const stockPad = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.19, 0.05), orange);
    stockPad.position.set(0, -0.075, 0.56);
    g.add(stockPad);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.18, 0.11), wood);
    grip.position.set(0, -0.14, 0.16);
    grip.rotation.x = 0.3;
    g.add(grip);
    const sight = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.035, 0.02), orange);
    sight.position.set(0, 0.13, -0.68);
    g.add(sight);
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.08, 8), mat(0xc23a2a, 0.6, 0.1));
    shell.rotation.z = Math.PI / 2;
    shell.position.set(0.085, -0.01, -0.03);
    g.add(shell);
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.075, 8), mat(0xd6a34a, 0.3, 0.8));
      s.rotation.z = Math.PI / 2;
      s.position.set(0.085, -0.05 - i * 0.001, 0.06 + i * 0.085);
      g.add(s);
    }

    const glove = mat(0x22232b, 0.82, 0.05);
    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.11, 0.15), glove);
    rightHand.position.set(0.005, -0.12, 0.16);
    rightHand.rotation.x = 0.3;
    g.add(rightHand);
    const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.1, 0.17), glove);
    leftHand.position.set(-0.01, -0.09, -0.4);
    g.add(leftHand);

    const muzzle = new THREE.Object3D();
    muzzle.position.set(0, 0.045, -0.86);
    g.add(muzzle);
    const flash = this._buildFlash(0, 0.045, -0.87);
    g.add(flash.group);
    g.userData = { mag: null, dot: null, flash, muzzle, basePos: g.position.clone() };
    return { group: g, userData: g.userData };
  }

  _buildFlash(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.visible = false;
    const tex = glowSprite('rgba(255,240,180,1)', 'rgba(255,100,20,0)');
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0.95,
    }));
    sprite.scale.setScalar(0.35);
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.09, 0.28, 6, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false })
    );
    cone.rotation.x = -Math.PI / 2;
    cone.position.z = -0.12;
    group.add(sprite, cone);
    group.userData = { sprite, cone };
    return { group, sprite, cone };
  }

  reset() {
    this.position.set(0, 1.65, 13);
    this.velocity.set(0, 0, 0);
    this.yaw = 0;
    this.pitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.shake = 0;
    this.health = this.maxHealth;
    this.alive = true;
    this.grounded = true;
    this.lastDamage = -99;
    this.ammo = { smg: 30, shotgun: 6 };
    this.current = 'smg';
    this.reloading = false;
    this.reloadT = 0;
    this.switchT = 0;
    this.switching = false;
    this.ads = false;
    this.aimAmount = 0;
    this.spread = 0.02;
    this.stats = { shots: 0, hits: 0, kills: 0, headshots: 0, damage: 0 };
    this.smg.group.visible = true;
    this.shotgun.group.visible = false;
    this.smg.userData.flash.group.visible = false;
    this.shotgun.userData.flash.group.visible = false;
    this.camera.fov = 72;
    this.camera.updateProjectionMatrix();
    this.camera.position.copy(this.position);
    this.camera.rotation.set(0, 0, 0);
    this.onHealth?.(this.health, this.maxHealth);
    this.onAmmo?.(this.current, this.ammo[this.current], WEAPONS[this.current].mag, this.reloading);
    this.onWeapon?.(this.current);
  }

  get weapon() { return WEAPONS[this.current]; }
  get weaponGroup() { return this.current === 'smg' ? this.smg : this.shotgun; }

  /* --------------------------------------------------------------- update */
  update(dt, input) {
    if (!this.alive) {
      this._updateViewmodel(dt, input, 0);
      return;
    }
    const sens = input.sensitivity ?? 1;
    // look
    this.yaw -= (input.lookX || 0) * 0.0024 * sens;
    this.pitch -= (input.lookY || 0) * 0.0024 * sens;
    if (input.tiltYaw) this.yaw -= input.tiltYaw * dt;
    if (input.tiltPitch) this.pitch -= input.tiltPitch * dt;
    this.pitch = clamp(this.pitch, -1.35, 1.32);

    // movement
    const forward = V(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right = V(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    let mx = (input.moveX || 0);
    let mz = (input.moveY || 0);
    const mag = Math.hypot(mx, mz);
    if (mag > 1) { mx /= mag; mz /= mag; }
    this.moveAmount = Math.min(1, mag);
    this.sprinting = !!input.sprint && mz > 0.4 && this.grounded && !this.ads;
    const speed = this.ads ? 2.5 : this.sprinting ? 7.0 : 5.1;
    const wish = V(right.x * mx + forward.x * mz, 0, right.z * mx + forward.z * mz);
    const accel = this.grounded ? 16 : 6;
    this.velocity.x += (wish.x * speed - this.velocity.x) * Math.min(1, accel * dt);
    this.velocity.z += (wish.z * speed - this.velocity.z) * Math.min(1, accel * dt);

    // jump
    if (input.jump && this.grounded) {
      this.velocity.y = 5.6;
      this.grounded = false;
      this.audio.jump();
      input.jump = false;
    }
    if (!this.grounded) {
      this.velocity.y -= 15.5 * dt;
      this.position.y += this.velocity.y * dt;
      if (this.position.y <= 1.65) {
        this.position.y = 1.65;
        this.velocity.y = 0;
        this.grounded = true;
        this.audio.land();
        this.effects.dustBurst(this.position.clone().setY(0.08), 5);
      }
    }

    // horizontal collision
    const nx = this.position.x + this.velocity.x * dt;
    const nz = this.position.z + this.velocity.z * dt;
    if (!this._collides(nx, this.position.z)) this.position.x = nx; else this.velocity.x = 0;
    if (!this._collides(this.position.x, nz)) this.position.z = nz; else this.velocity.z = 0;
    this.position.x = clamp(this.position.x, -17.5, 17.5);
    this.position.z = clamp(this.position.z, -17.5, 17.5);

    // footsteps
    const horiz = Math.hypot(this.velocity.x, this.velocity.z);
    if (this.grounded && horiz > 1.2) {
      this.bobT += dt * (this.sprinting ? 12 : 8.6);
      this.lastStep += dt * (this.sprinting ? 2.3 : 1.75);
      if (this.lastStep > 1) {
        this.lastStep = 0;
        this.effects.dustBurst(this.position.clone().setY(0.05), 2, 0x9a8b78);
        this.audio.step?.(this.sprinting);
      }
    } else {
      this.bobT += dt * 1.2;
    }

    // health regen
    const now = performance.now() / 1000;
    if (now - this.lastDamage > 5 && this.health < this.maxHealth) {
      this.health = Math.min(this.maxHealth, this.health + 13 * dt);
      this.onHealth?.(this.health, this.maxHealth);
    }

    // aiming
    const wantAds = !!input.aim;
    this.ads = wantAds && !this.reloading;
    this.aimAmount += ((this.ads ? 1 : 0) - this.aimAmount) * Math.min(1, dt * 10);
    const targetFov = 72 - 17 * this.aimAmount;
    this.camera.fov += (targetFov - this.camera.fov) * Math.min(1, dt * 12);
    this.camera.updateProjectionMatrix();
    this.wmCamera.fov = this.camera.fov;
    this.wmCamera.aspect = this.camera.aspect;
    this.wmCamera.updateProjectionMatrix();

    // shooting
    this.fireCooldown -= dt;
    const w = this.weapon;
    if (input.reload && !this.reloading && this.ammo[this.current] < w.mag) this.reload();
    if (input.switchWeapon && !this.switching && !this.reloading) this.switchWeapon();
    if (input.fire && !this.reloading && !this.switching) {
      if (w.auto || this.triggerReleased) this.tryFire();
      this.triggerReleased = false;
    } else {
      this.triggerReleased = true;
    }

    // recoil recovery
    this.recoilPitch *= Math.pow(0.001, dt);
    this.recoilYaw *= Math.pow(0.001, dt);
    this.shake *= Math.pow(0.0005, dt);

    // reload
    if (this.reloading) {
      this.reloadT -= dt;
      if (this.reloadT <= 0) {
        this.reloading = false;
        this.ammo[this.current] = w.mag;
        this.onAmmo?.(this.current, this.ammo[this.current], w.mag, false);
      }
    }
    if (this.switching) {
      this.switchT -= dt;
      if (this.switchT <= 0) this.switching = false;
    }

    this._updateCamera(dt);
    this._updateViewmodel(dt, input, horiz);
    this._updateCasings(dt);
  }

  _collides(x, z) {
    const r = this.radius;
    if (x < -17.8 + r || x > 17.8 - r || z < -17.8 + r || z > 17.8 - r) return true;
    for (const o of this.world.obstacles) {
      if (x > o.minX - r && x < o.maxX + r && z > o.minZ - r && z < o.maxZ + r) return true;
    }
    return false;
  }

  _updateCamera(dt) {
    const moving = this.moveAmount > 0.1 && this.grounded;
    const bob = moving ? Math.sin(this.bobT) * (this.sprinting ? 0.045 : 0.028) : 0;
    const sway = moving ? Math.cos(this.bobT * 0.5) * (this.sprinting ? 0.03 : 0.018) : 0;
    const shake = this.shake;
    this.camera.position.set(
      this.position.x + sway * 0.4 + (Math.random() - 0.5) * shake,
      this.position.y + bob + (Math.random() - 0.5) * shake,
      this.position.z
    );
    this.camera.rotation.set(
      this.pitch + this.recoilPitch + (Math.random() - 0.5) * shake * 0.4,
      this.yaw + this.recoilYaw,
      Math.sin(this.bobT * 0.5) * (moving ? 0.006 : 0)
    );
  }

  _updateViewmodel(dt, input, horiz) {
    const wg = this.weaponGroup;
    const targetX = this.ads ? 0.02 : 0.38;
    const targetY = this.ads ? -0.17 : -0.34;
    const targetZ = this.ads ? -1.05 : -1.12;
    const swayX = this.ads ? 0 : Math.sin(this.bobT * 0.5) * 0.012 * this.moveAmount;
    const swayY = this.ads ? 0 : Math.abs(Math.cos(this.bobT)) * 0.012 * this.moveAmount;
    const recoil = this.recoilPitch * 2.4;
    const reloadDip = this.reloading ? Math.sin((1 - this.reloadT / this.weapon.reload) * Math.PI) : 0;
    const switchDip = this.switching ? Math.sin((1 - this.switchT / 0.32) * Math.PI) : 0;
    this.wmRoot.position.x += (targetX + swayX - this.wmRoot.position.x) * Math.min(1, dt * 12);
    this.wmRoot.position.y += (targetY + swayY - this.wmRoot.position.y) * Math.min(1, dt * 12);
    this.wmRoot.position.z += (targetZ - this.wmRoot.position.z) * Math.min(1, dt * 12);
    this.wmRoot.position.y -= reloadDip * 0.13 + switchDip * 0.25;
    const basePitch = this.ads ? 0.015 : 0.14;
    const baseYaw = this.ads ? 0 : 0.22;
    this.wmRoot.rotation.x = basePitch - recoil * 2.2 - reloadDip * 0.45 - switchDip * 0.8;
    this.wmRoot.rotation.z = reloadDip * 0.35 + switchDip * 0.3;
    this.wmRoot.rotation.y = baseYaw;

    const mag = wg.userData.mag;
    if (mag) {
      mag.visible = !(this.reloading && this.reloadT < this.weapon.reload * 0.72 && this.reloadT > this.weapon.reload * 0.3);
      mag.position.y = -0.2 - (this.reloading ? Math.sin((1 - this.reloadT / this.weapon.reload) * Math.PI) * 0.08 : 0);
    }
    const dot = wg.userData.dot;
    if (dot) dot.visible = this.aimAmount > 0.6;

    // muzzle flash timer
    const flash = wg.userData.flash;
    if (flash.group.visible) {
      this._flashT -= dt;
      if (this._flashT <= 0) {
        flash.group.visible = false;
        this.flashLight.intensity = 0;
      } else {
        flash.group.rotation.z += dt * 30;
        flash.sprite.material.opacity = 0.9 * (this._flashT / 0.05);
      }
    }
  }

  _updateCasings(dt) {
    for (const c of this.casings) {
      if (!c.visible) continue;
      const u = c.userData;
      u.life -= dt;
      if (u.life <= 0) { c.visible = false; continue; }
      u.vel.y -= 5.5 * dt;
      c.position.addScaledVector(u.vel, dt);
      c.rotation.x += u.spin.x * dt;
      c.rotation.y += u.spin.y * dt;
      c.rotation.z += u.spin.z * dt;
    }
  }

  tryFire() {
    const w = this.weapon;
    if (this.fireCooldown > 0) return;
    if (this.ammo[this.current] <= 0) {
      this.audio.empty();
      this.reload();
      return;
    }
    this.ammo[this.current]--;
    this.fireCooldown = w.rate;
    this.stats.shots++;
    this.audio.shoot(this.current);
    this._muzzleFlash();
    this.recoilPitch += w.recoil;
    this.recoilYaw += (Math.random() - 0.5) * w.recoil * 0.6;
    this.shake = Math.max(this.shake, w.recoil * 1.8);
    this.onAmmo?.(this.current, this.ammo[this.current], w.mag, false);
    if (this.ammo[this.current] === 0) setTimeout(() => { if (this.alive && !this.reloading && this.ammo[this.current] === 0) this.reload(); }, 160);

    const spread = this.ads ? w.adsSpread : w.spread;
    const muzzleWorld = this._muzzleWorld();
    let anyHit = false, anyHead = false;
    for (let p = 0; p < w.pellets; p++) {
      const dir = this._shotDirection(spread * (1 + this.moveAmount * 1.6) * (this.sprinting ? 1.5 : 1));
      this.raycaster.set(this.camera.position, dir);
      this.raycaster.far = w.range;
      const targets = this.getTargets();
      const hits = this.raycaster.intersectObjects(targets, true);
      let end = this.camera.position.clone().addScaledVector(dir, w.range);
      let hitEnemy = false;
      for (const hit of hits) {
        const obj = hit.object;
        if (obj.userData.capybara) {
          end = hit.point;
          this.onCapybara?.(hit.point);
          break;
        }
        if (obj.userData.enemy) {
          const enemy = obj.userData.enemy;
          const head = !!obj.userData.head;
          const dmg = w.damage * (p === 0 ? 1 : 0.92);
          const died = enemy.damage(dmg, head, hit.point);
          this.stats.damage += dmg * (head ? 2.2 : 1);
          if (!this._hitThisShot) this.stats.hits++;
          this._hitThisShot = true;
          anyHit = true;
          if (head) anyHead = true;
          this.effects.sparksBurst(hit.point, hit.face?.normal ?? null, 6, head ? 0xffe36a : 0xffb347);
          if (died) {
            this.stats.kills++;
            if (head) this.stats.headshots++;
          }
          this.onHit?.(head, enemy, hit.point, dmg);
          end = hit.point;
          hitEnemy = true;
          break;
        }
        // world surface
        end = hit.point;
        const normal = hit.face ? hit.face.normal.clone().transformDirection(obj.matrixWorld) : V(0, 1, 0);
        this.effects.sparksBurst(hit.point, normal, 4, 0xffc75a);
        this.effects.decal(hit.point, normal);
        if (Math.random() < 0.4) this.effects.smoke(hit.point, 0.12, 0.6);
        this.effects.dustBurst(hit.point, 2, 0xbfae94);
        break;
      }
      this.effects.tracer(muzzleWorld, end, anyHead ? 0xfff0b0 : 0xffd08a);
    }
    this._hitThisShot = false;
    if (anyHit) {
      this.audio.hit(anyHead);
      this.onHit?.(anyHead, null, null, 0);
    }
    this.spread = spread * (1 + this.moveAmount * 1.6) + this.recoilPitch * 0.4;
  }

  _shotDirection(spread) {
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
    const r = Math.random() * Math.PI * 2;
    const s = Math.sqrt(Math.random()) * spread;
    dir.addScaledVector(right, Math.cos(r) * s).addScaledVector(up, Math.sin(r) * s);
    return dir.normalize();
  }

  _muzzleWorld() {
    const p = new THREE.Vector3(0.2, -0.14, -0.82);
    return this.camera.localToWorld(p);
  }

  _muzzleFlash() {
    const flash = this.weaponGroup.userData.flash;
    flash.group.visible = true;
    flash.group.rotation.z = Math.random() * Math.PI;
    flash.sprite.material.opacity = 0.95;
    flash.sprite.scale.setScalar((this.current === 'shotgun' ? 0.55 : 0.35) * (0.85 + Math.random() * 0.3));
    this._flashT = 0.05;
    this.flashLight.intensity = this.current === 'shotgun' ? 12 : 7;
    // casing
    const c = this.casings[this.casingCursor];
    this.casingCursor = (this.casingCursor + 1) % this.casings.length;
    c.visible = true;
    c.position.set(0.2, 0.02, -0.5);
    c.userData.life = 0.9;
    c.userData.vel.set(1.4 + Math.random(), 1.2 + Math.random() * 0.8, 0.4);
    c.userData.spin.set(Math.random() * 12, Math.random() * 12, Math.random() * 12);
  }

  reload() {
    const w = this.weapon;
    if (this.reloading || this.ammo[this.current] >= w.mag) return;
    this.reloading = true;
    this.reloadT = w.reload;
    this.ads = false;
    this.audio.reload(this.current);
    this.onAmmo?.(this.current, this.ammo[this.current], w.mag, true);
  }

  switchWeapon() {
    if (this.switching || this.reloading) return;
    this.current = this.current === 'smg' ? 'shotgun' : 'smg';
    this.smg.group.visible = this.current === 'smg';
    this.shotgun.group.visible = this.current === 'shotgun';
    this.switching = true;
    this.switchT = 0.32;
    this.ads = false;
    this.audio.ui(false);
    this.onWeapon?.(this.current);
    this.onAmmo?.(this.current, this.ammo[this.current], this.weapon.mag, false);
  }

  takeDamage(amount, source) {
    if (!this.alive) return;
    this.health = Math.max(0, this.health - amount);
    this.lastDamage = performance.now() / 1000;
    this.shake = Math.min(0.35, this.shake + amount * 0.008);
    this.audio.hurt();
    this.onHealth?.(this.health, this.maxHealth);
    this.onDamage?.(amount, source);
    if (this.health <= 0) {
      this.alive = false;
      this.audio.hurt();
      this.onDeath?.();
    }
  }

  addHealth(v) {
    this.health = Math.min(this.maxHealth, this.health + v);
    this.onHealth?.(this.health, this.maxHealth);
  }

  render() {
    const r = this.renderer;
    const auto = r.autoClear;
    r.autoClear = false;
    r.clearDepth();
    r.render(this.wmScene, this.wmCamera);
    r.autoClear = auto;
  }
}

export { WEAPONS };
