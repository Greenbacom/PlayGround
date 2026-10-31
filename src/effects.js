import * as THREE from 'three';
import { rand, pick, TAU } from './utils.js';

const PARTICLE_MAX = 900;

class Particles {
  constructor(scene) {
    this.max = PARTICLE_MAX;
    this.cursor = 0;
    this.pool = new Array(this.max);
    const positions = new Float32Array(this.max * 3);
    const colors = new Float32Array(this.max * 3);
    const sizes = new Float32Array(this.max);
    const alphas = new Float32Array(this.max);
    for (let i = 0; i < this.max; i++) {
      this.pool[i] = { life: 0, max: 1, vx: 0, vy: 0, vz: 0, g: 9, drag: 1.2, size: 0.2, alpha: 1 };
      positions[i * 3 + 1] = -999;
    }
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    this.geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (330.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float d = length(p);
          float a = smoothstep(0.5, 0.05, d);
          a *= a;
          gl_FragColor = vec4(vColor * 1.25, a * vAlpha);
        }
      `,
    });
    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    scene.add(this.points);
    this._c = new THREE.Color();
  }

  spawn({ x = 0, y = 1, z = 0, count = 10, speed = 4, spread = 0.3, up = 1.5, gravity = 9, drag = 1.4, life = 0.6, size = 0.25, colors = [0xffd27a], dir = null, cone = 1 } = {}) {
    const pos = this.geometry.attributes.position.array;
    const col = this.geometry.attributes.aColor.array;
    const sizes = this.geometry.attributes.aSize.array;
    const alphas = this.geometry.attributes.aAlpha.array;
    for (let n = 0; n < count; n++) {
      const i = this.cursor;
      this.cursor = (this.cursor + 1) % this.max;
      const p = this.pool[i];
      p.life = p.max = life * rand(1.25, 0.65);
      p.size = size * rand(1.6, 0.6);
      p.alpha = rand(1, 0.6);
      p.g = gravity;
      p.drag = drag;
      let vx, vy, vz;
      if (dir) {
        vx = dir.x + rand(cone, -cone) * rand(1, 0.3);
        vy = dir.y + rand(cone, -cone) * rand(1, 0.3);
        vz = dir.z + rand(cone, -cone) * rand(1, 0.3);
      } else {
        const theta = rand(TAU);
        const phi = Math.acos(rand(1, -1));
        vx = Math.sin(phi) * Math.cos(theta);
        vy = Math.cos(phi);
        vz = Math.sin(phi) * Math.sin(theta);
      }
      const s = speed * rand(1.2, 0.35);
      p.vx = vx * s; p.vy = vy * s + up; p.vz = vz * s;
      pos[i * 3] = x + rand(spread, -spread);
      pos[i * 3 + 1] = y + rand(spread, -spread) * 0.6;
      pos[i * 3 + 2] = z + rand(spread, -spread);
      const c = new THREE.Color(pick(colors));
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      sizes[i] = p.size;
      alphas[i] = p.alpha;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aColor.needsUpdate = true;
    this.geometry.attributes.aSize.needsUpdate = true;
    this.geometry.attributes.aAlpha.needsUpdate = true;
  }

  update(dt) {
    const pos = this.geometry.attributes.position.array;
    const alphas = this.geometry.attributes.aAlpha.array;
    const sizes = this.geometry.attributes.aSize.array;
    let any = false;
    for (let i = 0; i < this.max; i++) {
      const p = this.pool[i];
      if (p.life <= 0) {
        if (alphas[i] !== 0) { alphas[i] = 0; any = true; }
        continue;
      }
      any = true;
      p.life -= dt;
      const t = Math.max(0, p.life / p.max);
      p.vy -= p.g * dt;
      const d = Math.exp(-p.drag * dt);
      p.vx *= d; p.vz *= d;
      pos[i * 3] += p.vx * dt;
      pos[i * 3 + 1] += p.vy * dt;
      pos[i * 3 + 2] += p.vz * dt;
      alphas[i] = Math.pow(t, 0.65) * p.alpha;
      sizes[i] = p.size * (0.55 + t * 0.65);
      if (p.life <= 0) { alphas[i] = 0; pos[i * 3 + 1] = -999; }
    }
    if (any) {
      this.geometry.attributes.position.needsUpdate = true;
      this.geometry.attributes.aAlpha.needsUpdate = true;
      this.geometry.attributes.aSize.needsUpdate = true;
    }
  }
}

class Tracers {
  constructor(scene) {
    this.items = [];
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const zAxis = new THREE.Vector3(0, 0, 1);
    this.zAxis = zAxis;
    for (let i = 0; i < 30; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffd58a, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.frustumCulled = false;
      scene.add(mesh);
      this.items.push({ mesh, life: 0, max: 0.1 });
    }
    this.cursor = 0;
  }

  spawn(from, to, color = 0xffd58a, thickness = 0.018, life = 0.08) {
    const idx = this.cursor;
    this.cursor = (this.cursor + 1) % this.items.length;
    const { mesh } = this.items[idx];
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    if (len < 0.01) return;
    dir.normalize();
    mesh.position.copy(from).addScaledVector(dir, len / 2);
    mesh.quaternion.setFromUnitVectors(this.zAxis, dir);
    mesh.scale.set(thickness, thickness, len);
    mesh.material.color.set(color);
    mesh.material.opacity = 0.9;
    mesh.visible = true;
    this.items[idx].life = this.items[idx].max = life;
  }

  update(dt) {
    for (const it of this.items) {
      if (it.life > 0) {
        it.life -= dt;
        it.mesh.material.opacity = Math.max(0, it.life / it.max) * 0.9;
        if (it.life <= 0) it.mesh.visible = false;
      }
    }
  }
}

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.particles = new Particles(scene);
    this.tracers = new Tracers(scene);
  }

  update(dt) {
    this.particles.update(dt);
    this.tracers.update(dt);
  }

  tracer(from, to, color = 0xffd58a) {
    this.tracers.spawn(from, to, color);
  }

  muzzle(pos, color = 0xffcf6a) {
    this.particles.spawn({
      x: pos.x, y: pos.y, z: pos.z, count: 5, speed: 2.2, up: 0.3,
      spread: 0.04, gravity: 0.4, drag: 2.4, life: 0.18, size: 0.22,
      colors: [color, 0xfff2bd, 0xff8a3a],
    });
  }

  impact(x, y, z, color = 0xffc46a, count = 9) {
    this.particles.spawn({
      x, y, z, count, speed: 4.4, up: 1.4, spread: 0.1,
      gravity: 11, drag: 1.1, life: 0.42, size: 0.14,
      colors: [color, 0xffe7a8, 0xff7336],
    });
  }

  hitEnemy(x, y, z, color = 0xffb347) {
    this.particles.spawn({
      x, y, z, count: 12, speed: 5.2, up: 1.2, spread: 0.16,
      gravity: 10, drag: 1.3, life: 0.5, size: 0.15,
      colors: [color, 0xfff0ad, 0xffffff],
    });
  }

  death(x, y, z, color = 0xff8a3a, scale = 1, colors = null) {
    this.particles.spawn({
      x, y, z, count: Math.round(30 * scale), speed: 6.5 * scale, up: 2.4,
      spread: 0.3, gravity: 8, drag: 0.8, life: 1.0, size: 0.24 * scale,
      colors: colors || [color, 0xffcf5a, 0xff5a2a, 0xffffff],
    });
    this.particles.spawn({
      x, y, z, count: Math.round(12 * scale), speed: 1.6, up: 4.2,
      spread: 0.6, gravity: -1.5, drag: 1.4, life: 1.5, size: 0.16 * scale,
      colors: [color, 0x6b3a1e],
    });
  }

  explosion(x, y, z, scale = 1) {
    this.particles.spawn({
      x, y, z, count: 70, speed: 15 * scale, up: 6, spread: 0.4,
      gravity: 7, drag: 1.1, life: 1.1, size: 0.3, colors: [0xffe36a, 0xff8438, 0xff3e2e, 0xffffff],
    });
    this.particles.spawn({
      x, y, z, count: 40, speed: 9 * scale, up: 8, spread: 0.4,
      gravity: 4, drag: 1.4, life: 1.8, size: 0.2, colors: [0x54e884, 0x5ab4ff, 0xff6fa8, 0xffef9b],
    });
    this.particles.spawn({
      x, y: y + 0.3, z, count: 18, speed: 3.5, up: 1.4, spread: 1.2,
      gravity: -0.6, drag: 1.5, life: 1.8, size: 0.9, colors: [0x5b3524, 0x3a2118],
    });
  }

  heal(x, y, z) {
    this.particles.spawn({
      x, y, z, count: 22, speed: 1.8, up: 3.6, spread: 0.4,
      gravity: -1.6, drag: 1.8, life: 1.0, size: 0.16,
      colors: [0x62ff9c, 0xc8ffd5, 0xfff1a8],
    });
  }
}
