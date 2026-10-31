import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { canvasTexture, radialSprite, clamp, lerp, damp, rand } from './util.js';

function stickerTexture() {
  return canvasTexture(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#f6e6c8';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#2a1b2e';
    ctx.lineWidth = 5;
    ctx.stroke();
    // capivara head
    ctx.fillStyle = '#8a5c3c';
    ctx.beginPath();
    ctx.ellipse(64, 70, 33, 29, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(44, 40, 10, 15, -0.4, 0, Math.PI * 2);
    ctx.ellipse(84, 40, 10, 15, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6a442c';
    ctx.beginPath();
    ctx.ellipse(64, 84, 18, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#120c0c';
    ctx.beginPath();
    ctx.arc(51, 66, 4, 0, Math.PI * 2);
    ctx.arc(77, 66, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2a1b2e';
    ctx.beginPath();
    ctx.ellipse(64, 82, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '900 13px Arial';
    ctx.fillStyle = '#2a1b2e';
    ctx.textAlign = 'center';
    ctx.fillText('MV', 64, 116);
  });
}

export class Weapon {
  constructor(camera, audio) {
    this.camera = camera;
    this.audio = audio;
    this.time = 0;
    this.heat = 0;
    this.overheated = false;
    this.nextShot = 0;
    this.recoil = 0;
    this.flash = 0;
    this.overcharge = 0;
    this.base = new THREE.Vector3(0.265, -0.235, -0.5);
    this.group = new THREE.Group();
    this.group.position.copy(this.base);
    camera.add(this.group);

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x6b3fb0, roughness: 0.32, metalness: 0.55 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2b1b3d, roughness: 0.45, metalness: 0.4 });
    const creamMat = new THREE.MeshStandardMaterial({ color: 0xf2e2c6, roughness: 0.6, metalness: 0.15 });
    const glowMat = new THREE.MeshStandardMaterial({ color: 0x8af5ff, emissive: 0x38d6ff, emissiveIntensity: 2.2, roughness: 0.3 });

    const body = new THREE.Mesh(new RoundedBoxGeometry(0.15, 0.17, 0.42, 4, 0.045), bodyMat);
    body.position.set(0, 0, -0.12);
    this.group.add(body);

    const shell = new THREE.Mesh(new RoundedBoxGeometry(0.155, 0.09, 0.26, 4, 0.035), creamMat);
    shell.position.set(0, 0.045, -0.08);
    this.group.add(shell);

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.058, 0.3, 12), darkMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, -0.005, -0.44);
    this.group.add(barrel);

    for (let i = 0; i < 2; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.066, 0.011, 8, 20), glowMat);
      ring.position.set(0, -0.005, -0.36 - i * 0.09);
      this.group.add(ring);
    }

    const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.05, 12), darkMat);
    muzzle.rotation.x = Math.PI / 2;
    muzzle.position.set(0, -0.005, -0.59);
    this.group.add(muzzle);

    const grip = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.2, 0.11, 3, 0.03), darkMat);
    grip.position.set(0, -0.15, 0.01);
    grip.rotation.x = -0.24;
    this.group.add(grip);

    const guard = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.012, 6, 14, Math.PI), creamMat);
    guard.position.set(0, -0.1, -0.09);
    guard.rotation.set(0, 0, Math.PI);
    this.group.add(guard);

    // açaí bowl on top
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x3b1450, roughness: 0.5, metalness: 0.2 }));
    bowl.rotation.x = Math.PI;
    bowl.position.set(0, 0.1, -0.16);
    bowl.scale.y = 0.55;
    this.group.add(bowl);
    const acai = new THREE.Mesh(new THREE.SphereGeometry(0.078, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x7c3aed, emissive: 0x5b21b6, emissiveIntensity: 0.7, roughness: 0.35 }));
    acai.rotation.x = Math.PI;
    acai.position.set(0, 0.108, -0.16);
    acai.scale.y = 0.42;
    this.group.add(acai);

    // açaí berries
    const berryGeo = new THREE.SphereGeometry(0.015, 6, 5);
    const berryMat = new THREE.MeshBasicMaterial({ color: 0xd8b4fe });
    const berries = new THREE.InstancedMesh(berryGeo, berryMat, 9);
    const m = new THREE.Matrix4();
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const r = i === 8 ? 0 : 0.05;
      m.makeTranslation(Math.cos(a) * r, 0.125, -0.16 + Math.sin(a) * r);
      berries.setMatrixAt(i, m);
    }
    berries.instanceMatrix.needsUpdate = true;
    this.group.add(berries);

    // heat vents
    this.vents = [];
    for (const x of [-0.078, 0.078]) {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.11, 0.2), new THREE.MeshStandardMaterial({
        color: 0xff8a3d,
        emissive: 0xff4d1a,
        emissiveIntensity: 0.2,
        roughness: 0.4,
      }));
      vent.position.set(x, 0, -0.18);
      this.group.add(vent);
      this.vents.push(vent);
    }

    // sticker
    const sticker = new THREE.Mesh(
      new THREE.PlaneGeometry(0.085, 0.085),
      new THREE.MeshBasicMaterial({ map: stickerTexture(), transparent: true }),
    );
    sticker.position.set(0.079, 0.02, -0.09);
    sticker.rotation.y = Math.PI / 2;
    this.group.add(sticker);

    // muzzle glow sprite
    this.muzzlePos = new THREE.Object3D();
    this.muzzlePos.position.set(0, -0.005, -0.63);
    this.group.add(this.muzzlePos);
    this.flashSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialSprite('rgba(220,190,255,1)', 'rgba(140,80,255,0)'),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0,
    }));
    this.flashSprite.scale.set(0.34, 0.34, 1);
    this.flashSprite.position.copy(this.muzzlePos.position);
    this.group.add(this.flashSprite);

    this.muzzleLight = new THREE.PointLight(0xb887ff, 0, 5, 2);
    this.muzzleLight.position.copy(this.muzzlePos.position);
    this.group.add(this.muzzleLight);
  }

  setViewport(aspect) {
    // Keep the viewmodel readable without swallowing the screen on phones.
    if (aspect < 0.85) {
      this.base.set(0.145, -0.3, -0.66);
      this.group.scale.setScalar(0.46);
    } else if (aspect < 1.35) {
      const k = (aspect - 0.85) / 0.5;
      this.base.set(0.145 + 0.085 * k, -0.3 + 0.055 * k, -0.66 + 0.09 * k);
      this.group.scale.setScalar(0.46 + 0.2 * k);
    } else {
      this.base.set(0.235, -0.245, -0.57);
      this.group.scale.setScalar(0.68);
    }
    this.group.rotation.set(0, 0.035, 0);
  }

  get firingRate() {
    return this.overcharge > 0 ? 0.062 : 0.105;
  }

  tryFire(now) {
    if (this.overheated || now < this.nextShot) return false;
    this.nextShot = now + this.firingRate;
    this.heat = Math.min(100, this.heat + (this.overcharge > 0 ? 4.5 : 7.2));
    this.recoil = Math.min(1.5, this.recoil + 1);
    this.flash = 1;
    if (this.heat >= 100) {
      this.overheated = true;
      this.heat = 100;
      this.audio?.overheat();
    }
    return true;
  }

  setOvercharge(seconds) {
    this.overcharge = Math.max(this.overcharge, seconds);
  }

  update(dt, moving = 0, firing = false) {
    this.time += dt;
    this.overcharge = Math.max(0, this.overcharge - dt);
    if (this.overheated) {
      this.heat = Math.max(0, this.heat - 34 * dt);
      if (this.heat <= 22) this.overheated = false;
    } else {
      this.heat = Math.max(0, this.heat - (firing ? 3 : 19) * dt);
    }
    this.recoil = damp(this.recoil, 0, 13, dt);
    this.flash = Math.max(0, this.flash - dt * 15);

    const t = this.time;
    const bobAmt = clamp(moving, 0, 1);
    const bx = Math.sin(t * 8.6) * 0.011 * bobAmt + Math.sin(t * 1.4) * 0.0022;
    const by = Math.abs(Math.cos(t * 8.6)) * 0.012 * bobAmt + Math.sin(t * 1.9) * 0.0025;
    this.group.position.set(
      this.base.x + bx + this.recoil * 0.006,
      this.base.y + by - this.recoil * 0.012,
      this.base.z + this.recoil * 0.045,
    );
    this.group.rotation.set(
      -this.recoil * 0.075 - by * 0.4,
      0.035 - bx * 0.6,
      Math.sin(t * 1.1) * 0.006 - bx * 0.8,
    );

    const heatK = this.heat / 100;
    const glowColor = this.overheated ? 0xff3b30 : this.overcharge > 0 ? 0xc084fc : 0xff7a2f;
    const intensity = this.overheated ? 2.8 : 0.15 + heatK * 1.6;
    this.vents.forEach((v) => {
      v.material.emissive.setHex(glowColor);
      v.material.emissiveIntensity = intensity;
    });

    this.flashSprite.material.opacity = this.flash * 0.9;
    this.flashSprite.material.color.setHex(this.overcharge > 0 ? 0xe9d5ff : 0xdcd0ff);
    this.flashSprite.scale.setScalar(0.28 + this.flash * 0.16 + rand(-0.02, 0.02));
    this.flashSprite.material.rotation = rand(0, Math.PI);
    this.muzzleLight.intensity = this.flash * (this.overcharge > 0 ? 9 : 6);
    this.muzzleLight.color.setHex(this.overcharge > 0 ? 0xd8b4fe : 0xb887ff);

    for (const vent of this.vents) {
      vent.material.color.setHex(this.overheated ? 0xff6b5a : 0x4a2a63);
    }
  }

  reset() {
    this.heat = 0;
    this.overheated = false;
    this.nextShot = 0;
    this.recoil = 0;
    this.flash = 0;
    this.overcharge = 0;
  }

  muzzleWorld(target = new THREE.Vector3()) {
    return this.muzzlePos.getWorldPosition(target);
  }
}
