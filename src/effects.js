import * as THREE from 'three'
import { glowTexture } from './textures.js'

const particleVertex = /* glsl */`
  attribute vec3 aColor;
  attribute float aAlpha;
  attribute float aSize;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uPixelRatio;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (300.0 / max(0.6, -mv.z)) * uPixelRatio;
    gl_PointSize = clamp(gl_PointSize, 0.0, 96.0);
    vColor = aColor;
    vAlpha = aAlpha;
  }
`

const particleFragment = /* glsl */`
  uniform sampler2D uMap;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float mask = texture2D(uMap, gl_PointCoord).a;
    if (mask < 0.01) discard;
    gl_FragColor = vec4(vColor, mask * vAlpha);
  }
`

export class Effects {
  constructor(scene, renderer) {
    this.scene = scene
    this.renderer = renderer
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    this.max = 900
    this.cursor = 0
    this.particles = []
    this._initParticles()
    this._initTracers()
    this._initRings()
    this._initFloating()
  }

  _initParticles() {
    const max = this.max
    const positions = new Float32Array(max * 3)
    const colors = new Float32Array(max * 3)
    const alphas = new Float32Array(max)
    const sizes = new Float32Array(max)
    for (let i = 0; i < max; i++) {
      positions[i * 3 + 1] = -999
      alphas[i] = 0
      this.particles.push({
        active: false,
        life: 0,
        maxLife: 1,
        vx: 0, vy: 0, vz: 0,
        gravity: 0,
        drag: 0.98,
        baseSize: 0.1,
      })
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setDrawRange(0, max)
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: glowTexture() },
        uPixelRatio: { value: this.pixelRatio },
      },
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    this.particleSystem = new THREE.Points(geo, mat)
    this.particleSystem.frustumCulled = false
    this.particleSystem.renderOrder = 4
    this.scene.add(this.particleSystem)
    this.pGeo = geo
    this.pPos = positions
    this.pCol = colors
    this.pAlpha = alphas
    this.pSize = sizes
  }

  _initTracers() {
    this.tracers = []
    const geo = new THREE.CylinderGeometry(1, 1, 1, 6, 1, true)
    for (let i = 0; i < 26; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffd36a,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.visible = false
      mesh.renderOrder = 3
      this.scene.add(mesh)
      this.tracers.push({ mesh, life: 0, maxLife: 0.08, active: false })
    }
  }

  _initRings() {
    this.rings = []
    const geo = new THREE.RingGeometry(0.86, 1, 64)
    for (let i = 0; i < 16; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xd9ff45,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = -Math.PI / 2
      mesh.visible = false
      mesh.renderOrder = 2
      this.scene.add(mesh)
      this.rings.push({ mesh, life: 0, maxLife: 0.55, active: false, from: 0.3, to: 4 })
    }
  }

  _initFloating() {
    this.floaters = []
    for (let i = 0; i < 10; i++) {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 96
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: true })
      const sprite = new THREE.Sprite(mat)
      sprite.visible = false
      sprite.scale.set(1.5, 0.56, 1)
      this.scene.add(sprite)
      this.floaters.push({ sprite, canvas, tex, life: 0, maxLife: 1, active: false, vy: 0 })
    }
  }

  emitBurst(position, color, count = 16, options = {}) {
    const speed = options.speed ?? 4
    const size = options.size ?? 0.13
    const life = options.life ?? 0.55
    const gravity = options.gravity ?? 5
    const spread = options.spread ?? 1
    const c = new THREE.Color(color)
    for (let i = 0; i < count; i++) {
      const idx = this._nextParticle()
      if (idx < 0) return
      const p = this.particles[idx]
      p.active = true
      p.life = life * (0.55 + Math.random() * 0.65)
      p.maxLife = p.life
      p.baseSize = size * (0.55 + Math.random() * 0.8)
      p.gravity = gravity
      p.drag = options.drag ?? 0.96
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const v = speed * (0.35 + Math.random() * 0.9)
      p.vx = Math.sin(phi) * Math.cos(theta) * v * spread
      p.vy = Math.cos(phi) * v * spread + (options.up ?? 0)
      p.vz = Math.sin(phi) * Math.sin(theta) * v * spread
      this.pPos[idx * 3] = position.x
      this.pPos[idx * 3 + 1] = position.y
      this.pPos[idx * 3 + 2] = position.z
      this.pCol[idx * 3] = c.r * (0.8 + Math.random() * 0.5)
      this.pCol[idx * 3 + 1] = c.g * (0.8 + Math.random() * 0.5)
      this.pCol[idx * 3 + 2] = c.b * (0.8 + Math.random() * 0.5)
      this.pAlpha[idx] = 1
      this.pSize[idx] = p.baseSize
    }
    this.pGeo.attributes.position.needsUpdate = true
    this.pGeo.attributes.aColor.needsUpdate = true
    this.pGeo.attributes.aAlpha.needsUpdate = true
    this.pGeo.attributes.aSize.needsUpdate = true
  }

  emitTrail(position, color, count = 2, options = {}) {
    const c = new THREE.Color(color)
    for (let i = 0; i < count; i++) {
      const idx = this._nextParticle()
      if (idx < 0) return
      const p = this.particles[idx]
      p.active = true
      p.life = 0.2 + Math.random() * 0.16
      p.maxLife = p.life
      p.baseSize = (options.size ?? 0.13) * (0.7 + Math.random() * 0.7)
      p.gravity = options.gravity ?? 0
      p.drag = 0.92
      p.vx = (Math.random() - 0.5) * 0.8
      p.vy = (Math.random() - 0.5) * 0.8
      p.vz = (Math.random() - 0.5) * 0.8
      this.pPos[idx * 3] = position.x + (Math.random() - 0.5) * 0.15
      this.pPos[idx * 3 + 1] = position.y + (Math.random() - 0.5) * 0.15
      this.pPos[idx * 3 + 2] = position.z + (Math.random() - 0.5) * 0.15
      this.pCol[idx * 3] = c.r
      this.pCol[idx * 3 + 1] = c.g
      this.pCol[idx * 3 + 2] = c.b
      this.pAlpha[idx] = 0.8
      this.pSize[idx] = p.baseSize
    }
    this.pGeo.attributes.position.needsUpdate = true
    this.pGeo.attributes.aColor.needsUpdate = true
    this.pGeo.attributes.aAlpha.needsUpdate = true
    this.pGeo.attributes.aSize.needsUpdate = true
  }

  _nextParticle() {
    for (let i = 0; i < this.max; i++) {
      const idx = (this.cursor + i) % this.max
      if (!this.particles[idx].active) {
        this.cursor = (idx + 1) % this.max
        return idx
      }
    }
    return -1
  }

  tracer(from, to, color = 0xffd36a, width = 0.014) {
    const t = this.tracers.find((x) => !x.active) || this.tracers[0]
    const dir = new THREE.Vector3().subVectors(to, from)
    const len = dir.length()
    if (len < 0.001) return
    t.active = true
    t.life = t.maxLife
    t.mesh.visible = true
    t.mesh.position.copy(from).addScaledVector(dir, 0.5)
    t.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
    t.mesh.scale.set(width, len, width)
    t.mesh.material.color.set(color)
    t.mesh.material.opacity = 0.85
  }

  ring(position, color = 0xd9ff45, from = 0.4, to = 4, life = 0.55) {
    const r = this.rings.find((x) => !x.active) || this.rings[0]
    r.active = true
    r.life = life
    r.maxLife = life
    r.from = from
    r.to = to
    r.mesh.visible = true
    r.mesh.position.copy(position)
    r.mesh.position.y = Math.max(0.03, position.y)
    r.mesh.material.color.set(color)
    r.mesh.material.opacity = 0.8
    r.mesh.scale.setScalar(from)
  }

  floatText(position, text, color = '#d9ff45', life = 0.9) {
    const f = this.floaters.find((x) => !x.active) || this.floaters[0]
    const ctx = f.canvas.getContext('2d')
    ctx.clearRect(0, 0, 256, 96)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '700 48px "Barlow Condensed", Impact, sans-serif'
    ctx.lineWidth = 6
    ctx.strokeStyle = 'rgba(0,0,0,.7)'
    ctx.strokeText(text, 128, 48)
    ctx.fillStyle = color
    ctx.fillText(text, 128, 48)
    f.tex.needsUpdate = true
    f.sprite.visible = true
    f.sprite.position.copy(position)
    f.sprite.material.opacity = 1
    f.life = life
    f.maxLife = life
    f.vy = 1.4
    f.active = true
  }

  update(dt) {
    const pos = this.pPos
    const alpha = this.pAlpha
    const size = this.pSize
    let particlesDirty = false
    for (let i = 0; i < this.max; i++) {
      const p = this.particles[i]
      if (!p.active) continue
      particlesDirty = true
      p.life -= dt
      if (p.life <= 0) {
        p.active = false
        alpha[i] = 0
        pos[i * 3 + 1] = -999
        size[i] = 0
        continue
      }
      p.vx *= Math.pow(p.drag, dt * 60)
      p.vy *= Math.pow(p.drag, dt * 60)
      p.vz *= Math.pow(p.drag, dt * 60)
      p.vy -= p.gravity * dt
      pos[i * 3] += p.vx * dt
      pos[i * 3 + 1] += p.vy * dt
      pos[i * 3 + 2] += p.vz * dt
      const t = p.life / p.maxLife
      alpha[i] = Math.min(1, t * 2.4) * 0.95
      size[i] = p.baseSize * (0.45 + t * 0.75)
    }
    if (particlesDirty) {
      this.pGeo.attributes.position.needsUpdate = true
      this.pGeo.attributes.aAlpha.needsUpdate = true
      this.pGeo.attributes.aSize.needsUpdate = true
    }

    for (const t of this.tracers) {
      if (!t.active) continue
      t.life -= dt
      if (t.life <= 0) {
        t.active = false
        t.mesh.visible = false
        continue
      }
      t.mesh.material.opacity = (t.life / t.maxLife) * 0.85
    }

    for (const r of this.rings) {
      if (!r.active) continue
      r.life -= dt
      if (r.life <= 0) {
        r.active = false
        r.mesh.visible = false
        continue
      }
      const t = 1 - r.life / r.maxLife
      const scale = THREE.MathUtils.lerp(r.from, r.to, 1 - Math.pow(1 - t, 2))
      r.mesh.scale.setScalar(scale)
      r.mesh.material.opacity = (1 - t) * 0.75
    }

    for (const f of this.floaters) {
      if (!f.active) continue
      f.life -= dt
      if (f.life <= 0) {
        f.active = false
        f.sprite.visible = false
        continue
      }
      const t = f.life / f.maxLife
      f.sprite.position.y += f.vy * dt
      f.sprite.material.opacity = Math.min(1, t * 2)
    }
  }

  clear() {
    for (const p of this.particles) p.active = false
    for (let i = 0; i < this.max; i++) {
      this.pAlpha[i] = 0
      this.pPos[i * 3 + 1] = -999
      this.pSize[i] = 0
    }
    this.pGeo.attributes.position.needsUpdate = true
    this.pGeo.attributes.aAlpha.needsUpdate = true
    this.pGeo.attributes.aSize.needsUpdate = true
    for (const t of this.tracers) { t.active = false; t.mesh.visible = false }
    for (const r of this.rings) { r.active = false; r.mesh.visible = false }
    for (const f of this.floaters) { f.active = false; f.sprite.visible = false }
  }
}
