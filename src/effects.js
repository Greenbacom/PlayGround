import * as THREE from 'three'

const rand = (a, b) => a + Math.random() * (b - a)

function radialTexture(inner = 'rgba(255,255,255,1)', mid = 'rgba(255,190,100,0.5)', outer = 'rgba(255,80,30,0)', size = 128) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const x = c.getContext('2d')
  const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, inner)
  g.addColorStop(0.32, mid)
  g.addColorStop(1, outer)
  x.fillStyle = g
  x.fillRect(0, 0, size, size)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function cloudTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const x = c.getContext('2d')
  const g = x.createRadialGradient(64, 64, 2, 64, 64, 62)
  g.addColorStop(0, 'rgba(70,62,58,0.55)')
  g.addColorStop(0.5, 'rgba(50,45,42,0.3)')
  g.addColorStop(1, 'rgba(30,28,26,0)')
  x.fillStyle = g
  x.fillRect(0, 0, 128, 128)
  for (let i = 0; i < 16; i++) {
    const ax = 20 + Math.random() * 88
    const ay = 20 + Math.random() * 88
    const r = 8 + Math.random() * 26
    const g2 = x.createRadialGradient(ax, ay, 0, ax, ay, r)
    g2.addColorStop(0, 'rgba(95,85,78,0.14)')
    g2.addColorStop(1, 'rgba(40,38,35,0)')
    x.fillStyle = g2
    x.beginPath()
    x.arc(ax, ay, r, 0, Math.PI * 2)
    x.fill()
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export class Effects {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
    this.glowTex = radialTexture()
    this.cloudTex = cloudTexture()
    this.flashTex = radialTexture('rgba(255,255,255,1)', 'rgba(255,220,160,0.55)', 'rgba(255,130,40,0)', 64)

    /* sparks */
    this.maxSparks = 520
    this.sparks = []
    const sp = new Float32Array(this.maxSparks * 3)
    const sc = new Float32Array(this.maxSparks * 3)
    for (let i = 0; i < this.maxSparks; i++) {
      sp[i * 3 + 1] = -100
      this.sparks.push({ active: false, pos: new THREE.Vector3(), vel: new THREE.Vector3(), life: 0, maxLife: 1, drag: 0.9 })
    }
    const spGeo = new THREE.BufferGeometry()
    spGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3))
    spGeo.setAttribute('color', new THREE.BufferAttribute(sc, 3))
    const spMat = new THREE.PointsMaterial({
      map: this.glowTex,
      size: 0.13,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      toneMapped: false,
    })
    this.sparkPoints = new THREE.Points(spGeo, spMat)
    this.sparkPoints.frustumCulled = false
    this.scene.add(this.sparkPoints)
    this.sparkPositions = sp
    this.sparkColors = sc
    this.sparkCursor = 0

    /* debris */
    this.maxDebris = 100
    const dGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12)
    const dMat = new THREE.MeshStandardMaterial({ color: 0x8a8b84, roughness: 0.6, metalness: 0.3 })
    this.debrisMesh = new THREE.InstancedMesh(dGeo, dMat, this.maxDebris)
    this.debrisMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.debrisMesh.frustumCulled = false
    this.debris = []
    const zero = new THREE.Matrix4().makeScale(0, 0, 0)
    for (let i = 0; i < this.maxDebris; i++) {
      this.debris.push({
        active: false,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        rot: new THREE.Euler(),
        rotVel: new THREE.Vector3(),
        life: 0,
        scale: 1,
      })
      this.debrisMesh.setMatrixAt(i, zero)
      this.debrisMesh.setColorAt(i, new THREE.Color(0x999999))
    }
    this.scene.add(this.debrisMesh)

    /* tracer pool */
    this.tracers = []
    for (let i = 0; i < 28; i++) {
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
      const m = new THREE.LineBasicMaterial({
        color: 0xffd166,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
      const line = new THREE.Line(g, m)
      line.frustumCulled = false
      this.scene.add(line)
      this.tracers.push({ line, life: 0, maxLife: 0.12, active: false })
    }
    this.tracerCursor = 0

    /* flashes */
    this.flashes = []
    for (let i = 0; i < 30; i++) {
      const mat = new THREE.SpriteMaterial({
        map: this.flashTex,
        color: 0xffb703,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
      const s = new THREE.Sprite(mat)
      s.visible = false
      this.scene.add(s)
      this.flashes.push({ sprite: s, life: 0, maxLife: 0.2, from: 1, to: 4, active: false })
    }
    this.flashCursor = 0

    /* smoke */
    this.smokes = []
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.SpriteMaterial({
        map: this.cloudTex,
        color: 0x3b3733,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        toneMapped: true,
      })
      const s = new THREE.Sprite(mat)
      s.visible = false
      this.scene.add(s)
      this.smokes.push({ sprite: s, life: 0, maxLife: 1.4, active: false, drift: new THREE.Vector3() })
    }
    this.smokeCursor = 0

    /* rings */
    this.rings = []
    const ringGeo = new THREE.RingGeometry(0.82, 1, 48)
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffb703,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
      const mesh = new THREE.Mesh(ringGeo, mat)
      mesh.visible = false
      this.scene.add(mesh)
      this.rings.push({ mesh, life: 0, maxLife: 0.5, from: 0.4, to: 3, active: false, flat: false, rise: 0 })
    }
    this.ringCursor = 0

    /* sprite light shafts for portals */
    this.portals = []
    const shaftMat = new THREE.MeshBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    })
    const shaftGeo = new THREE.CylinderGeometry(0.25, 1.3, 8, 18, 1, true)
    for (let i = 0; i < 8; i++) {
      const m = new THREE.Mesh(shaftGeo, shaftMat.clone())
      m.visible = false
      this.scene.add(m)
      this.portals.push({ mesh: m, life: 0, maxLife: 0.85, active: false })
    }
    this.portalCursor = 0
  }

  spawnTracer(from, to, color = 0xffd166) {
    const t = this.tracers[this.tracerCursor]
    this.tracerCursor = (this.tracerCursor + 1) % this.tracers.length
    const arr = t.line.geometry.attributes.position.array
    arr[0] = from.x
    arr[1] = from.y
    arr[2] = from.z
    arr[3] = to.x
    arr[4] = to.y
    arr[5] = to.z
    t.line.geometry.attributes.position.needsUpdate = true
    t.line.material.color.setHex(color)
    t.line.material.opacity = 0.85
    t.line.visible = true
    t.life = 0.09
    t.maxLife = 0.09
    t.active = true
  }

  spawnSparks(pos, color = 0xffb703, count = 8) {
    const c = new THREE.Color(color)
    for (let i = 0; i < count; i++) {
      const idx = this.sparkCursor
      this.sparkCursor = (this.sparkCursor + 1) % this.maxSparks
      const s = this.sparks[idx]
      s.active = true
      s.pos.copy(pos)
      s.vel.set(rand(-3, 3), rand(-0.5, 3.5), rand(-3, 3))
      s.life = rand(0.18, 0.5)
      s.maxLife = s.life
      s.drag = rand(1.5, 4)
      const cc = c.clone().offsetHSL(rand(-0.03, 0.03), rand(-0.1, 0.1), rand(-0.1, 0.15))
      this.sparkColors[idx * 3] = cc.r
      this.sparkColors[idx * 3 + 1] = cc.g
      this.sparkColors[idx * 3 + 2] = cc.b
      this.sparkPositions[idx * 3] = pos.x
      this.sparkPositions[idx * 3 + 1] = pos.y
      this.sparkPositions[idx * 3 + 2] = pos.z
    }
    this.sparkPoints.geometry.attributes.color.needsUpdate = true
  }

  spawnFlash(pos, color = 0xffb703, size = 2, life = 0.18) {
    const f = this.flashes[this.flashCursor]
    this.flashCursor = (this.flashCursor + 1) % this.flashes.length
    f.sprite.visible = true
    f.sprite.position.copy(pos)
    f.sprite.material.color.setHex(color)
    f.sprite.material.opacity = 1
    f.sprite.scale.setScalar(size * 0.4)
    f.life = life
    f.maxLife = life
    f.from = size * 0.3
    f.to = size
    f.active = true
  }

  spawnSmoke(pos, size = 2, life = 1.5) {
    const s = this.smokes[this.smokeCursor]
    this.smokeCursor = (this.smokeCursor + 1) % this.smokes.length
    s.sprite.visible = true
    s.sprite.position.copy(pos)
    s.sprite.material.opacity = 0.45
    s.sprite.scale.setScalar(size)
    s.life = life
    s.maxLife = life
    s.drift.set(rand(-0.4, 0.4), rand(0.4, 1.0), rand(-0.4, 0.4))
    s.active = true
  }

  spawnRing(pos, color = 0xffb703, { flat = false, from = 0.4, to = 4, life = 0.55, rise = 0, opacity = 0.8 } = {}) {
    const r = this.rings[this.ringCursor]
    this.ringCursor = (this.ringCursor + 1) % this.rings.length
    r.mesh.visible = true
    r.mesh.position.copy(pos)
    r.mesh.material.color.setHex(color)
    r.mesh.material.opacity = opacity
    r.mesh.scale.setScalar(from)
    r.mesh.rotation.set(flat ? -Math.PI / 2 : 0, 0, 0)
    if (!flat) r.mesh.lookAt(this.camera.position)
    r.life = life
    r.maxLife = life
    r.from = from
    r.to = to
    r.flat = flat
    r.rise = rise
    r.active = true
  }

  spawnPortal(pos, color = 0xff6b35) {
    const p = this.portals[this.portalCursor]
    this.portalCursor = (this.portalCursor + 1) % this.portals.length
    p.mesh.visible = true
    p.mesh.position.set(pos.x, Math.max(4, pos.y), pos.z)
    p.mesh.material.color.setHex(color)
    p.mesh.material.opacity = 0.22
    p.mesh.scale.setScalar(0.4)
    p.life = 0.85
    p.maxLife = 0.85
    p.active = true
    this.spawnRing(new THREE.Vector3(pos.x, 0.08, pos.z), color, { flat: true, from: 0.2, to: 2.8, life: 0.9, opacity: 0.45 })
    this.spawnFlash(new THREE.Vector3(pos.x, pos.y, pos.z), color, 3.2, 0.45)
  }

  spawnMuzzle(pos, color = 0xffb703, scale = 1) {
    this.spawnFlash(pos, color, 1.4 * scale, 0.09)
    this.spawnSparks(pos, color, Math.ceil(3 * scale))
  }

  spawnImpact(pos, color = 0xffb703, scale = 1) {
    this.spawnFlash(pos, color, 1.8 * scale, 0.16)
    this.spawnSparks(pos, color, Math.round(10 * scale))
    this.spawnRing(pos, color, { flat: false, from: 0.1, to: 1.6 * scale, life: 0.28, opacity: 0.7 })
  }

  spawnDebris(pos, color, count, power, scale = 1) {
    const c = new THREE.Color(color)
    for (let i = 0; i < count; i++) {
      const d = this.debris.find((x) => !x.active)
      if (!d) return
      d.active = true
      d.pos.copy(pos)
      d.pos.x += rand(-0.5, 0.5) * scale
      d.pos.y += rand(-0.5, 0.5) * scale
      d.pos.z += rand(-0.5, 0.5) * scale
      d.vel.set(rand(-1, 1), rand(0.3, 1.4), rand(-1, 1)).normalize().multiplyScalar(rand(2, 7) * power)
      d.rot.set(rand(0, 6), rand(0, 6), rand(0, 6))
      d.rotVel.set(rand(-8, 8), rand(-8, 8), rand(-8, 8))
      d.life = rand(0.9, 1.8)
      d.scale = rand(0.5, 1.5) * scale
      const cc = c.clone().offsetHSL(0, -0.15, rand(-0.25, 0.05))
      this.debrisMesh.setColorAt(this.debris.indexOf(d), cc)
    }
    if (this.debrisMesh.instanceColor) this.debrisMesh.instanceColor.needsUpdate = true
  }

  spawnExplosion(pos, color = 0xff5d3a, scale = 1, big = false) {
    this.spawnFlash(pos, color, big ? 10 : 4.2 * scale, big ? 0.6 : 0.32)
    this.spawnSparks(pos, color, big ? 90 : 26)
    this.spawnSparks(pos, 0xffd166, big ? 40 : 12)
    this.spawnRing(pos, color, { flat: false, from: 0.4, to: big ? 13 : 4.2 * scale, life: big ? 0.85 : 0.5, opacity: 0.85 })
    this.spawnRing(new THREE.Vector3(pos.x, 0.08, pos.z), 0xffd166, { flat: true, from: 0.5, to: big ? 12 : 4 * scale, life: 0.7, opacity: 0.5 })
    this.spawnDebris(pos, color, big ? 34 : 12, big ? 2.2 : 1, big ? 2.3 : 1)
    const smokeCount = big ? 7 : 2
    for (let i = 0; i < smokeCount; i++) {
      const p = pos.clone().add(new THREE.Vector3(rand(-1, 1) * scale, rand(-0.3, 0.8) * scale, rand(-1, 1) * scale))
      this.spawnSmoke(p, (big ? 4.5 : 1.7) * rand(0.7, 1.2), rand(1.1, 2.2))
    }
  }

  update(dt, time) {
    // sparks
    let dirty = false
    for (let i = 0; i < this.maxSparks; i++) {
      const s = this.sparks[i]
      if (!s.active) continue
      s.life -= dt
      if (s.life <= 0) {
        s.active = false
        this.sparkPositions[i * 3 + 1] = -100
        dirty = true
        continue
      }
      s.vel.y -= 9.5 * dt
      s.vel.multiplyScalar(1 - s.drag * dt)
      s.pos.addScaledVector(s.vel, dt)
      if (s.pos.y < 0.03) {
        s.pos.y = 0.03
        s.vel.y *= -0.35
        s.vel.x *= 0.7
        s.vel.z *= 0.7
      }
      this.sparkPositions[i * 3] = s.pos.x
      this.sparkPositions[i * 3 + 1] = s.pos.y
      this.sparkPositions[i * 3 + 2] = s.pos.z
      dirty = true
    }
    if (dirty) this.sparkPoints.geometry.attributes.position.needsUpdate = true

    // debris
    let ddirty = false
    const matrix = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const sc = new THREE.Vector3()
    for (let i = 0; i < this.maxDebris; i++) {
      const d = this.debris[i]
      if (!d.active) continue
      d.life -= dt
      if (d.life <= 0) {
        d.active = false
        matrix.makeScale(0, 0, 0)
        this.debrisMesh.setMatrixAt(i, matrix)
        ddirty = true
        continue
      }
      d.vel.y -= 13 * dt
      d.pos.addScaledVector(d.vel, dt)
      if (d.pos.y < 0.08) {
        d.pos.y = 0.08
        d.vel.y *= -0.32
        d.vel.x *= 0.72
        d.vel.z *= 0.72
        d.rotVel.multiplyScalar(0.7)
      }
      d.rot.x += d.rotVel.x * dt
      d.rot.y += d.rotVel.y * dt
      d.rot.z += d.rotVel.z * dt
      q.setFromEuler(d.rot)
      sc.setScalar(d.scale)
      matrix.compose(d.pos, q, sc)
      this.debrisMesh.setMatrixAt(i, matrix)
      ddirty = true
    }
    if (ddirty) this.debrisMesh.instanceMatrix.needsUpdate = true

    // tracers
    for (const t of this.tracers) {
      if (!t.active) continue
      t.life -= dt
      t.line.material.opacity = Math.max(0, t.life / t.maxLife) * 0.85
      if (t.life <= 0) {
        t.active = false
        t.line.visible = false
      }
    }

    // flashes
    for (const f of this.flashes) {
      if (!f.active) continue
      f.life -= dt
      const k = Math.max(0, f.life / f.maxLife)
      f.sprite.material.opacity = k
      const s = f.from + (f.to - f.from) * (1 - k)
      f.sprite.scale.setScalar(s)
      if (f.life <= 0) {
        f.active = false
        f.sprite.visible = false
      }
    }

    // smoke
    for (const s of this.smokes) {
      if (!s.active) continue
      s.life -= dt
      const k = Math.max(0, s.life / s.maxLife)
      s.sprite.material.opacity = k * 0.4
      s.sprite.scale.setScalar(s.sprite.scale.x + dt * 1.1)
      s.sprite.position.addScaledVector(s.drift, dt)
      if (s.life <= 0) {
        s.active = false
        s.sprite.visible = false
      }
    }

    // rings
    for (const r of this.rings) {
      if (!r.active) continue
      r.life -= dt
      const k = 1 - Math.max(0, r.life / r.maxLife)
      const s = r.from + (r.to - r.from) * k
      r.mesh.scale.setScalar(s)
      r.mesh.material.opacity = (1 - k) * 0.85
      if (r.rise) r.mesh.position.y += r.rise * dt
      if (r.life <= 0) {
        r.active = false
        r.mesh.visible = false
      }
    }

    // portals
    for (const p of this.portals) {
      if (!p.active) continue
      p.life -= dt
      const k = Math.max(0, p.life / p.maxLife)
      p.mesh.material.opacity = k * 0.25
      p.mesh.scale.set(0.5 + (1 - k) * 0.9, 1, 0.5 + (1 - k) * 0.9)
      if (p.life <= 0) {
        p.active = false
        p.mesh.visible = false
      }
    }
  }
}
