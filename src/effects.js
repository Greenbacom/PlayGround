// Pooled particles, tracers, shockwaves, explosions and confetti.
import * as THREE from 'three'
import { glowTexture, rand, pick } from './utils.js'

const MAX_PARTICLES = 520

export class Effects {
  constructor(scene) {
    this.scene = scene
    this.time = 0
    this.tracerPool = []
    this.ringPool = []
    this.flashPool = []
    this.lights = []

    this.initParticles()
    this.initTracers()
    this.initRings()
    this.initFlashes()
    this.initLights()
  }

  initParticles() {
    const geo = new THREE.BufferGeometry()
    this.pPos = new Float32Array(MAX_PARTICLES * 3)
    this.pCol = new Float32Array(MAX_PARTICLES * 3)
    this.pSize = new Float32Array(MAX_PARTICLES)
    this.pAlpha = new Float32Array(MAX_PARTICLES)
    geo.setAttribute('position', new THREE.BufferAttribute(this.pPos, 3).setUsage(THREE.DynamicDrawUsage))
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.pCol, 3).setUsage(THREE.DynamicDrawUsage))
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.pSize, 1).setUsage(THREE.DynamicDrawUsage))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.pAlpha, 1).setUsage(THREE.DynamicDrawUsage))
    geo.setDrawRange(0, MAX_PARTICLES)

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uMap: { value: glowTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0)') } },
      vertexShader: /* glsl */`
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (340.0 / max(0.001, -mv.z));
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */`
        uniform sampler2D uMap;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec4 t = texture2D(uMap, gl_PointCoord);
          float a = t.a * vAlpha;
          if (a < 0.01) discard;
          gl_FragColor = vec4(vColor * t.rgb, a);
        }`,
    })
    this.particleMat = mat
    const points = new THREE.Points(geo, mat)
    points.frustumCulled = false
    this.scene.add(points)
    this.points = points
    this.particles = []
    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.particles.push({ alive: false, x: 0, y: -100, z: 0, vx: 0, vy: 0, vz: 0, life: 0, maxLife: 1, size: 1, gravity: -9, drag: 0.98, r: 1, g: 1, b: 1 })
      this.pAlpha[i] = 0
      this.pPos[i * 3 + 1] = -100
    }
    this.pCursor = 0
  }

  spawnParticles(pos, count, opts = {}) {
    const {
      color = 0xffcf3f, color2 = null, speed = 5, spread = 0.6, life = 0.6,
      size = 0.35, gravity = -7, drag = 0.96, up = 1, dir = null,
    } = opts
    const c1 = new THREE.Color(color)
    const c2 = color2 === null ? c1 : new THREE.Color(color2)
    for (let n = 0; n < count; n++) {
      const i = this.pCursor
      this.pCursor = (this.pCursor + 1) % MAX_PARTICLES
      const p = this.particles[i]
      p.alive = true
      p.x = pos.x + rand(-spread, spread) * 0.4
      p.y = pos.y + rand(-spread, spread) * 0.4
      p.z = pos.z + rand(-spread, spread) * 0.4
      let vx = rand(-1, 1)
      let vy = rand(-1, 1) * 0.7 + up
      let vz = rand(-1, 1)
      const l = Math.hypot(vx, vy, vz) || 1
      vx = (vx / l) * speed * rand(0.35, 1)
      vy = (vy / l) * speed * rand(0.35, 1)
      vz = (vz / l) * speed * rand(0.35, 1)
      if (dir) {
        vx = vx * 0.35 + dir.x * speed * rand(0.4, 1)
        vy = vy * 0.35 + dir.y * speed * rand(0.4, 1)
        vz = vz * 0.35 + dir.z * speed * rand(0.4, 1)
      }
      p.vx = vx
      p.vy = vy
      p.vz = vz
      p.maxLife = life * rand(0.65, 1.25)
      p.life = p.maxLife
      p.size = size * rand(0.65, 1.4)
      p.gravity = gravity
      p.drag = drag
      const mix = Math.random()
      const c = c1.clone().lerp(c2, mix)
      p.r = c.r; p.g = c.g; p.b = c.b
      this.pAlpha[i] = 1
      this.pSize[i] = p.size
      this.pCol[i * 3] = c.r
      this.pCol[i * 3 + 1] = c.g
      this.pCol[i * 3 + 2] = c.b
    }
    this.points.geometry.attributes.aColor.needsUpdate = true
    this.points.geometry.attributes.aSize.needsUpdate = true
  }

  initTracers() {
    const geo = new THREE.CylinderGeometry(0.018, 0.018, 1, 4, 1, true)
    geo.translate(0, 0.5, 0)
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffe6a0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending,
        depthWrite: false, side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.visible = false
      mesh.frustumCulled = false
      this.scene.add(mesh)
      this.tracerPool.push({ mesh, life: 0, maxLife: 0.09 })
    }
    this.tracerCursor = 0
  }

  tracer(from, to, color = 0xffe6a0, width = 1) {
    const t = this.tracerPool[this.tracerCursor]
    this.tracerCursor = (this.tracerCursor + 1) % this.tracerPool.length
    const dir = new THREE.Vector3().subVectors(to, from)
    const len = dir.length()
    if (len < 0.01) return
    dir.normalize()
    t.mesh.position.copy(from)
    t.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    t.mesh.scale.set(width, len, width)
    t.mesh.material.color.set(color)
    t.mesh.material.opacity = 1
    t.mesh.visible = true
    t.life = 0.1
  }

  initRings() {
    for (let i = 0; i < 10; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffcf3f, transparent: true, opacity: 0, side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
      const mesh = new THREE.Mesh(new THREE.RingGeometry(0.86, 1, 40), mat)
      mesh.visible = false
      mesh.frustumCulled = false
      this.scene.add(mesh)
      this.ringPool.push({ mesh, life: 0, maxLife: 0.6, from: 0.2, to: 4, flat: true })
    }
    this.ringCursor = 0
  }

  ring(pos, { color = 0xffcf3f, from = 0.2, to = 4, life = 0.55, flat = true, opacity = 1 } = {}) {
    const r = this.ringPool[this.ringCursor]
    this.ringCursor = (this.ringCursor + 1) % this.ringPool.length
    r.mesh.position.copy(pos)
    r.mesh.rotation.set(flat ? -Math.PI / 2 : 0, 0, 0)
    r.mesh.material.color.set(color)
    r.mesh.material.opacity = opacity
    r.mesh.visible = true
    r.from = from
    r.to = to
    r.life = life
    r.maxLife = life
    r.opacity = opacity
  }

  initFlashes() {
    const tex = glowTexture('rgba(255,240,200,1)', 'rgba(255,120,30,0)')
    for (let i = 0; i < 8; i++) {
      const mat = new THREE.SpriteMaterial({
        map: tex, color: 0xffd08a, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
      const s = new THREE.Sprite(mat)
      s.visible = false
      this.scene.add(s)
      this.flashPool.push({ sprite: s, life: 0, maxLife: 0.12, size: 1 })
    }
    this.flashCursor = 0
  }

  flash(pos, size = 2, color = 0xffd08a, life = 0.12) {
    const f = this.flashPool[this.flashCursor]
    this.flashCursor = (this.flashCursor + 1) % this.flashPool.length
    f.sprite.position.copy(pos)
    f.sprite.material.color.set(color)
    f.sprite.material.opacity = 1
    f.sprite.scale.set(size, size, 1)
    f.sprite.visible = true
    f.life = life
    f.maxLife = life
    f.size = size
  }

  initLights() {
    for (let i = 0; i < 2; i++) {
      const l = new THREE.PointLight(0xff9a4a, 0, 16, 2)
      this.scene.add(l)
      this.lights.push({ light: l, life: 0, maxLife: 0.2, power: 20 })
    }
    this.lightCursor = 0
  }

  lightFlash(pos, power = 25, color = 0xffa04a, life = 0.18) {
    const l = this.lights[this.lightCursor]
    this.lightCursor = (this.lightCursor + 1) % this.lights.length
    l.light.position.copy(pos)
    l.light.color.set(color)
    l.light.intensity = power
    l.power = power
    l.life = life
    l.maxLife = life
  }

  explosion(pos, scale = 1) {
    this.spawnParticles(pos, 34, {
      color: 0xffd76a, color2: 0xff3d2e, speed: 9 * scale, spread: 1.2,
      life: 0.7, size: 0.8, gravity: -5, drag: 0.94,
    })
    this.spawnParticles(pos, 14, {
      color: 0xfff6d8, color2: 0xff9a2e, speed: 4 * scale, spread: 0.6,
      life: 0.45, size: 1.2, gravity: 1, drag: 0.9,
    })
    this.spawnParticles(pos, 10, {
      color: 0x3a3040, color2: 0x1a1420, speed: 3 * scale, spread: 1.4,
      life: 1.4, size: 2.2, gravity: 1.2, drag: 0.9,
    })
    this.flash(pos, 7 * scale, 0xffb35c, 0.16)
    this.ring(pos, { color: 0xffb04a, from: 0.4, to: 7 * scale, life: 0.45, flat: true, opacity: 0.8 })
    this.lightFlash(pos, 60 * scale, 0xff8a3a, 0.3)
  }

  hit(pos, color = 0xffd76a, count = 7) {
    this.spawnParticles(pos, count, {
      color, color2: 0xffffff, speed: 5, spread: 0.25, life: 0.32,
      size: 0.3, gravity: -6, drag: 0.9,
    })
    this.flash(pos, 1.1, color, 0.08)
  }

  muzzle(pos, dir) {
    this.flash(pos, 1.6, 0xffd08a, 0.06)
    this.spawnParticles(pos, 4, {
      color: 0xffd76a, color2: 0xff8a2e, speed: 6, spread: 0.1, life: 0.12,
      size: 0.35, gravity: 0, drag: 0.9, dir,
    })
    this.lightFlash(pos, 14, 0xffb35c, 0.06)
  }

  confetti(center) {
    const colors = [0xffcf3f, 0xff3d8b, 0x2ee6c8, 0xff7a2f, 0xfff6e6, 0x8a5cff]
    for (let i = 0; i < 150; i++) {
      const a = rand(0, Math.PI * 2)
      const r = rand(0, 7)
      const pos = new THREE.Vector3(center.x + Math.cos(a) * r, center.y + rand(2, 12), center.z + Math.sin(a) * r)
      this.spawnParticles(pos, 1, {
        color: pick(colors), speed: rand(1, 4), spread: 0.2, life: rand(2.2, 4.2),
        size: rand(0.16, 0.32), gravity: -3.2, drag: 0.985, up: 0.2,
      })
    }
  }

  update(dt) {
    this.time += dt
    // particles
    let any = false
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = this.particles[i]
      if (!p.alive) continue
      any = true
      p.life -= dt
      if (p.life <= 0) {
        p.alive = false
        this.pAlpha[i] = 0
        continue
      }
      p.vy += p.gravity * dt
      const drag = Math.pow(p.drag, dt * 60)
      p.vx *= drag; p.vy *= drag; p.vz *= drag
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt
      if (p.y < 0.04) { p.y = 0.04; p.vy *= -0.32; p.vx *= 0.7; p.vz *= 0.7 }
      this.pPos[i * 3] = p.x
      this.pPos[i * 3 + 1] = p.y
      this.pPos[i * 3 + 2] = p.z
      const t = p.life / p.maxLife
      this.pAlpha[i] = Math.min(1, t * 2.4)
      this.pSize[i] = p.size * (0.5 + t * 0.7)
    }
    if (any) {
      this.points.geometry.attributes.position.needsUpdate = true
      this.points.geometry.attributes.aAlpha.needsUpdate = true
      this.points.geometry.attributes.aSize.needsUpdate = true
    }

    // tracers
    for (const t of this.tracerPool) {
      if (t.life > 0) {
        t.life -= dt
        t.mesh.material.opacity = Math.max(0, t.life / t.maxLife)
        if (t.life <= 0) t.mesh.visible = false
      }
    }

    // rings
    for (const r of this.ringPool) {
      if (r.life > 0) {
        r.life -= dt
        const k = 1 - r.life / r.maxLife
        const s = r.from + (r.to - r.from) * k
        r.mesh.scale.set(s, s, 1)
        r.mesh.material.opacity = r.opacity * Math.pow(1 - k, 1.4)
        if (r.life <= 0) r.mesh.visible = false
      }
    }

    // flashes
    for (const f of this.flashPool) {
      if (f.life > 0) {
        f.life -= dt
        const k = Math.max(0, f.life / f.maxLife)
        f.sprite.material.opacity = k
        const s = f.size * (1.15 - k * 0.15)
        f.sprite.scale.set(s, s, 1)
        if (f.life <= 0) f.sprite.visible = false
      }
    }

    // lights
    for (const l of this.lights) {
      if (l.life > 0) {
        l.life -= dt
        l.light.intensity = l.power * Math.max(0, l.life / l.maxLife)
        if (l.life <= 0) l.light.intensity = 0
      }
    }
  }

  clear() {
    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.particles[i].alive = false
      this.pAlpha[i] = 0
    }
    this.points.geometry.attributes.aAlpha.needsUpdate = true
    for (const t of this.tracerPool) { t.life = 0; t.mesh.visible = false }
    for (const r of this.ringPool) { r.life = 0; r.mesh.visible = false }
    for (const f of this.flashPool) { f.life = 0; f.sprite.visible = false }
    for (const l of this.lights) { l.life = 0; l.light.intensity = 0 }
  }
}
