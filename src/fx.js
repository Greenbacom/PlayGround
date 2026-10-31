import * as THREE from "three";

const GRAVITY = 7.2;

export class Particles {
  constructor(scene, count = 360) {
    this.count = count;
    this.particles = Array.from({ length: count }, () => ({
      life: 0,
      max: 1,
      position: new THREE.Vector3(0, -100, 0),
      velocity: new THREE.Vector3(),
      color: new THREE.Color(0, 0, 0),
      gravity: GRAVITY,
      drag: 0.98,
      size: 1,
    }));
    this.cursor = 0;
    this.positions = new Float32Array(count * 3);
    this.colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      this.positions[i * 3 + 1] = -100;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));
    this.geometry = geo;
    this.material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
    scene.add(this.points);
    this.tmp = new THREE.Color();
  }

  burst(position, colors = [0xffb24f, 0xff5b3d, 0xfff2d4], count = 10, speed = 3.2, life = 0.55, gravity = GRAVITY) {
    for (let i = 0; i < count; i++) {
      const p = this.particles[this.cursor];
      this.cursor = (this.cursor + 1) % this.count;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const v = speed * (0.35 + Math.random() * 0.85);
      p.position.copy(position);
      p.velocity.set(
        Math.sin(phi) * Math.cos(theta) * v,
        Math.cos(phi) * v * 0.8 + speed * 0.15,
        Math.sin(phi) * Math.sin(theta) * v
      );
      p.life = life * (0.6 + Math.random() * 0.7);
      p.max = p.life;
      p.gravity = gravity;
      p.drag = 0.96 + Math.random() * 0.025;
      p.color.setHex(colors[Math.floor(Math.random() * colors.length)]);
      p.size = 0.6 + Math.random() * 0.9;
    }
  }

  spark(position, direction, count = 5, color = 0xffc36a) {
    for (let i = 0; i < count; i++) {
      const p = this.particles[this.cursor];
      this.cursor = (this.cursor + 1) % this.count;
      p.position.copy(position);
      p.velocity.copy(direction).multiplyScalar(2 + Math.random() * 3);
      p.velocity.x += (Math.random() - 0.5) * 3;
      p.velocity.y += (Math.random() - 0.5) * 3;
      p.velocity.z += (Math.random() - 0.5) * 3;
      p.life = 0.22 + Math.random() * 0.24;
      p.max = p.life;
      p.gravity = 3.2;
      p.drag = 0.94;
      p.color.setHex(color);
      p.size = 0.7 + Math.random() * 0.6;
    }
  }

  update(dt) {
    for (let i = 0; i < this.count; i++) {
      const p = this.particles[i];
      if (p.life <= 0) {
        this.positions[i * 3 + 1] = -100;
        this.colors[i * 3] = 0;
        this.colors[i * 3 + 1] = 0;
        this.colors[i * 3 + 2] = 0;
        continue;
      }
      p.life -= dt;
      if (p.life <= 0) {
        this.positions[i * 3 + 1] = -100;
        this.colors[i * 3] = 0;
        this.colors[i * 3 + 1] = 0;
        this.colors[i * 3 + 2] = 0;
        continue;
      }
      p.velocity.y -= p.gravity * dt;
      p.velocity.multiplyScalar(Math.pow(p.drag, dt * 60));
      p.position.addScaledVector(p.velocity, dt);
      if (p.position.y < 0.07) {
        p.position.y = 0.07;
        p.velocity.y *= -0.25;
        p.velocity.x *= 0.75;
        p.velocity.z *= 0.75;
      }
      const f = Math.min(1, (p.life / p.max) * 1.8);
      this.positions[i * 3] = p.position.x;
      this.positions[i * 3 + 1] = p.position.y;
      this.positions[i * 3 + 2] = p.position.z;
      this.colors[i * 3] = p.color.r * f;
      this.colors[i * 3 + 1] = p.color.g * f;
      this.colors[i * 3 + 2] = p.color.b * f;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }

  clear() {
    for (const p of this.particles) p.life = 0;
  }
}

export class Tracers {
  constructor(scene) {
    this.scene = scene;
    this.items = [];
  }

  spawn(from, to, color = 0xffc36a, life = 0.07, width = 1) {
    const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const line = new THREE.Line(geo, mat);
    line.frustumCulled = false;
    this.scene.add(line);
    this.items.push({ line, life, max: life });
  }

  update(dt) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.life -= dt;
      if (item.life <= 0) {
        this.scene.remove(item.line);
        item.line.geometry.dispose();
        item.line.material.dispose();
        this.items.splice(i, 1);
      } else {
        item.line.material.opacity = (item.life / item.max) * 0.95;
      }
    }
  }

  clear() {
    for (const item of this.items) {
      this.scene.remove(item.line);
      item.line.geometry.dispose();
      item.line.material.dispose();
    }
    this.items.length = 0;
  }
}

export function createHealthPickup(position, glowTexture) {
  const group = new THREE.Group();
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(0.27, 10, 8),
    new THREE.MeshStandardMaterial({ color: 0x8a5337, roughness: 0.95 })
  );
  shell.scale.set(1, 1.15, 1);
  group.add(shell);
  const top = new THREE.Mesh(
    new THREE.CircleGeometry(0.14, 10),
    new THREE.MeshBasicMaterial({ color: 0xfff0cf })
  );
  top.rotation.x = -Math.PI / 2;
  top.position.y = 0.3;
  group.add(top);
  const straw = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.48, 6),
    new THREE.MeshStandardMaterial({ color: 0x5ce0c6, roughness: 0.4, emissive: 0x1a8b7e, emissiveIntensity: 0.6 })
  );
  straw.position.set(0.09, 0.46, 0.02);
  straw.rotation.z = -0.28;
  group.add(straw);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0x52e0c3,
    transparent: true,
    opacity: 0.62,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  glow.scale.setScalar(1.35);
  group.add(glow);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.34, 0.39, 24),
    new THREE.MeshBasicMaterial({
      color: 0x5ce0c6,
      transparent: true,
      opacity: 0.62,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -0.44;
  group.add(ring);
  group.position.copy(position);
  group.userData.ring = ring;
  group.userData.glow = glow;
  return group;
}
