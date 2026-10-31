import * as THREE from 'three';
import { rand, clamp, canvasTexture } from './util.js';

export class FX {
  constructor(scene) {
    this.scene = scene;
    this.max = 1000;
    this.cursor = 0;
    this.positions = new Float32Array(this.max * 3);
    this.colors = new Float32Array(this.max * 3);
    this.sizes = new Float32Array(this.max);
    this.alphas = new Float32Array(this.max);
    this.vel = new Float32Array(this.max * 3);
    this.life = new Float32Array(this.max);
    this.maxLife = new Float32Array(this.max);
    this.gravity = new Float32Array(this.max);
    this.drag = new Float32Array(this.max);
    this.baseSize = new Float32Array(this.max);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
    this.geometry.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (330.0 / max(0.5, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float fall = smoothstep(0.5, 0.05, d);
          gl_FragColor = vec4(vColor, vAlpha * fall);
        }
      `,
    });
    this.points = new THREE.Points(this.geometry, material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
    scene.add(this.points);

    // expanding rings (sprites)
    const ringTex = canvasTexture(128, 128, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,1)';
      ctx.lineWidth = 7;
      ctx.shadowColor = 'rgba(255,255,255,1)';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 44, 0, Math.PI * 2);
      ctx.stroke();
      const g = ctx.createRadialGradient(w / 2, h / 2, 30, w / 2, h / 2, 60);
      g.addColorStop(0, 'rgba(255,255,255,0.22)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 60, 0, Math.PI * 2);
      ctx.fill();
    });
    this.rings = [];
    for (let i = 0; i < 14; i++) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: ringTex,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0,
      }));
      sprite.visible = false;
      sprite.renderOrder = 4;
      scene.add(sprite);
      this.rings.push({ sprite, life: 0, maxLife: 0.5, size: 1, color: new THREE.Color() });
    }
    this.ringCursor = 0;

    // tracers
    this.tracers = [];
    const tracerMat = new THREE.LineBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (let i = 0; i < 26; i++) {
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      const line = new THREE.Line(geo, tracerMat.clone());
      line.visible = false;
      line.frustumCulled = false;
      scene.add(line);
      this.tracers.push({ line, life: 0, maxLife: 0.08 });
    }
    this.tracerCursor = 0;

    this.time = 0;
  }

  _emit(x, y, z, color, size, life, vx, vy, vz, gravity = -6, drag = 2.4) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.max;
    this.positions[i * 3] = x;
    this.positions[i * 3 + 1] = y;
    this.positions[i * 3 + 2] = z;
    this.colors[i * 3] = color.r;
    this.colors[i * 3 + 1] = color.g;
    this.colors[i * 3 + 2] = color.b;
    this.sizes[i] = size;
    this.baseSize[i] = size;
    this.alphas[i] = 1;
    this.vel[i * 3] = vx;
    this.vel[i * 3 + 1] = vy;
    this.vel[i * 3 + 2] = vz;
    this.life[i] = life;
    this.maxLife[i] = life;
    this.gravity[i] = gravity;
    this.drag[i] = drag;
  }

  burst(position, color = 0xffbf3c, count = 14, { speed = 5, size = 0.14, life = 0.7, gravity = -7, spread = 1, drag = 2 } = {}) {
    const c = new THREE.Color(color);
    const c2 = c.clone().multiplyScalar(1.5);
    for (let i = 0; i < count; i++) {
      const theta = rand(0, Math.PI * 2);
      const phi = Math.acos(rand(-1, 1));
      const s = rand(speed * 0.25, speed);
      const cc = Math.random() > 0.5 ? c : c2;
      this._emit(
        position.x + rand(-0.08, 0.08) * spread,
        position.y + rand(-0.08, 0.08) * spread,
        position.z + rand(-0.08, 0.08) * spread,
        cc,
        size * rand(0.7, 1.6),
        life * rand(0.6, 1.2),
        Math.sin(phi) * Math.cos(theta) * s,
        Math.cos(phi) * s,
        Math.sin(phi) * Math.sin(theta) * s,
        gravity,
        drag,
      );
    }
  }

  spark(position, normal = null, color = 0xffe9c9, count = 7) {
    const c = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const dir = normal
        ? new THREE.Vector3(normal.x + rand(-0.7, 0.7), normal.y + rand(-0.7, 0.7), normal.z + rand(-0.7, 0.7)).normalize()
        : new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize();
      const s = rand(2, 7);
      this._emit(position.x, position.y, position.z, c, rand(0.05, 0.12), rand(0.18, 0.42), dir.x * s, dir.y * s, dir.z * s, -9, 3);
    }
  }

  trail(position, color = 0xff8a3d, size = 0.1) {
    const c = new THREE.Color(color);
    this._emit(position.x + rand(-0.05, 0.05), position.y + rand(-0.05, 0.05), position.z + rand(-0.05, 0.05), c, size, rand(0.2, 0.4), rand(-0.3, 0.3), rand(-0.1, 0.5), rand(-0.3, 0.3), 1.5, 2);
  }

  ring(position, color = 0xffbf3c, size = 4, life = 0.5) {
    const r = this.rings[this.ringCursor];
    this.ringCursor = (this.ringCursor + 1) % this.rings.length;
    r.sprite.position.copy(position);
    r.sprite.material.color.set(color);
    r.sprite.material.opacity = 0.95;
    r.sprite.scale.setScalar(size * 0.4);
    r.sprite.visible = true;
    r.life = life;
    r.maxLife = life;
    r.size = size;
  }

  tracer(from, to, color = 0xc084fc) {
    const t = this.tracers[this.tracerCursor];
    this.tracerCursor = (this.tracerCursor + 1) % this.tracers.length;
    const attr = t.line.geometry.attributes.position;
    attr.setXYZ(0, from.x, from.y, from.z);
    attr.setXYZ(1, to.x, to.y, to.z);
    attr.needsUpdate = true;
    t.line.material.color.set(color);
    t.line.material.opacity = 0.95;
    t.line.visible = true;
    t.life = t.maxLife;
  }

  update(dt) {
    this.time += dt;
    for (let i = 0; i < this.max; i++) {
      if (this.life[i] <= 0) {
        this.alphas[i] = 0;
        continue;
      }
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        this.alphas[i] = 0;
        continue;
      }
      const inv = 1 - this.drag[i] * dt;
      this.vel[i * 3] *= Math.max(0.02, inv);
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * Math.max(0.02, inv) + this.gravity[i] * dt;
      this.vel[i * 3 + 2] *= Math.max(0.02, inv);
      this.positions[i * 3] += this.vel[i * 3] * dt;
      this.positions[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.positions[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      const k = this.life[i] / this.maxLife[i];
      this.alphas[i] = clamp(k * 1.6, 0, 1);
      this.sizes[i] = this.baseSize[i] * (0.5 + k * 0.7);
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aColor.needsUpdate = true;
    this.geometry.attributes.aSize.needsUpdate = true;
    this.geometry.attributes.aAlpha.needsUpdate = true;

    for (const r of this.rings) {
      if (r.life <= 0) continue;
      r.life -= dt;
      const k = clamp(1 - r.life / r.maxLife, 0, 1);
      r.sprite.scale.setScalar(r.size * (0.35 + k * 0.9));
      r.sprite.material.opacity = (1 - k) * 0.9;
      if (r.life <= 0) r.sprite.visible = false;
    }
    for (const t of this.tracers) {
      if (t.life <= 0) continue;
      t.life -= dt;
      t.line.material.opacity = clamp(t.life / t.maxLife, 0, 1);
      if (t.life <= 0) t.line.visible = false;
    }
  }

  reset() {
    this.life.fill(0);
    this.alphas.fill(0);
    this.geometry.attributes.aAlpha.needsUpdate = true;
    for (const r of this.rings) { r.life = 0; r.sprite.visible = false; }
    for (const t of this.tracers) { t.life = 0; t.line.visible = false; }
  }
}
