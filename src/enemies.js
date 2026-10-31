// Enemies: carnival masks, Saci rushers, Boi-Bumbá chargers and the Trio Elétrico.
import * as THREE from 'three'
import { rand, pick, clamp, angleLerp, canvasTexture, glowTexture, textTexture, TAU } from './utils.js'

let boiTexture = null
function getBoiTexture() {
  if (boiTexture) return boiTexture
  boiTexture = canvasTexture(256, 128, (ctx, w, h) => {
    ctx.fillStyle = '#1c1030'
    ctx.fillRect(0, 0, w, h)
    const cols = ['#ff3d8b', '#ffcf3f', '#2ee6c8', '#ff7a2f', '#8a5cff']
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = cols[i % cols.length]
      ctx.beginPath()
      const x = i * 28
      ctx.moveTo(x, h / 2)
      ctx.lineTo(x + 14, h / 2 - 22)
      ctx.lineTo(x + 28, h / 2)
      ctx.lineTo(x + 14, h / 2 + 22)
      ctx.closePath()
      ctx.fill()
    }
    ctx.fillStyle = 'rgba(255,255,255,0.08)'
    for (let i = 0; i < 40; i++) ctx.fillRect(rand(0, w), rand(0, h), 2, 2)
  })
  boiTexture.wrapS = boiTexture.wrapT = THREE.RepeatWrapping
  boiTexture.repeat.set(2, 1)
  return boiTexture
}

class Enemy {
  constructor(game, type, pos) {
    this.game = game
    this.type = type
    this.dead = false
    this.flash = 0
    this.spawnT = 0
    this.age = 0
    this.attackTimer = rand(0.8, 2.2)
    this.group = new THREE.Group()
    this.group.position.copy(pos)
    this.baseY = 0
    this.knock = new THREE.Vector3()
    this.materials = []
  }

  addMat(m) { this.materials.push(m); return m }

  updateFlash(dt) {
    this.flash = Math.max(0, this.flash - dt * 4)
    const s = 1 + this.flash * 0.09
    this.group.scale.setScalar(this.spawnScale * s)
  }

  takeDamage(amount, point) {
    if (this.dead || this.dying) return false
    this.hp -= amount
    this.flash = 1
    this.game.effects.hit(point || this.center(), this.hitColor || 0xffd76a, 6)
    this.game.audio.hit()
    if (this.hp <= 0) {
      this.die()
      return true
    }
    return false
  }

  die() {
    this.dead = true
    this.game.effects.explosion(this.center(), this.type === 'boi' ? 1.5 : 1)
    this.game.audio.kill()
    this.game.onEnemyKilled?.(this)
    this.game.world.scene.remove(this.group)
    this.dispose()
  }

  dispose() {
    this.group.traverse((o) => {
      if (o.geometry) o.geometry.dispose?.()
      if (o.material) {
        const ms = Array.isArray(o.material) ? o.material : [o.material]
        ms.forEach((m) => m.dispose?.())
      }
    })
  }

  center() {
    return new THREE.Vector3(this.group.position.x, this.group.position.y + (this.hitY || 1), this.group.position.z)
  }
}

/* ============================================================ MÁSCARA */
class Mask extends Enemy {
  constructor(game, pos) {
    super(game, 'mask', pos)
    this.hp = 30
    this.maxHp = 30
    this.hitY = 0.08
    this.hitRadius = 0.9
    this.hitColor = 0xff7ab8
    this.score = 100
    this.spawnScale = 0
    this.preferred = rand(12, 17)
    this.orbitDir = Math.random() < 0.5 ? 1 : -1
    this.baseY = rand(2.4, 3.4)
    this.warn = 0
    this.build()
  }

  build() {
    const faceMat = this.addMat(new THREE.MeshLambertMaterial({ color: 0xffe6cf, emissive: 0x5a2438, emissiveIntensity: 0.9 }))
    const face = new THREE.Mesh(new THREE.SphereGeometry(0.6, 14, 11), faceMat)
    face.scale.set(1, 1.2, 0.34)
    this.group.add(face)

    const socketMat = this.addMat(new THREE.MeshBasicMaterial({ color: 0x1a0812 }))
    for (const sx of [-0.2, 0.2]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), socketMat)
      eye.scale.set(1, 1.3, 0.4)
      eye.position.set(sx, 0.12, 0.21)
      this.group.add(eye)
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.07, 7, 6), new THREE.MeshBasicMaterial({ color: 0xff5aa8 }))
      pupil.position.set(sx, 0.12, 0.265)
      this.group.add(pupil)
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.06, 0.06), socketMat)
      brow.position.set(sx, 0.31, 0.26)
      brow.rotation.z = sx > 0 ? 0.32 : -0.32
      this.group.add(brow)
    }
    const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 0.08), socketMat)
    mouth.position.set(0, -0.24, 0.23)
    this.group.add(mouth)
    for (let i = 0; i < 4; i++) {
      const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.1, 3), new THREE.MeshBasicMaterial({ color: 0xfff2dc }))
      tooth.position.set(-0.13 + i * 0.087, -0.22, 0.28)
      tooth.rotation.z = Math.PI
      this.group.add(tooth)
    }
    // feather crown
    const featherCols = [0xff3d8b, 0xffcf3f, 0x2ee6c8, 0xff7a2f, 0x8a5cff]
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * TAU
      const feather = new THREE.Mesh(new THREE.ConeGeometry(0.09, rand(0.7, 1.1), 4), new THREE.MeshLambertMaterial({ color: pick(featherCols), emissive: 0x221018, emissiveIntensity: 0.4 }))
      feather.position.set(Math.cos(a) * 0.35, 0.55 + Math.sin(a * 2) * 0.08, -0.05)
      feather.rotation.z = Math.cos(a) * 0.9
      feather.rotation.x = Math.sin(a) * 0.9 - 0.2
      this.group.add(feather)
    }
    // halo ring
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.025, 4, 32), new THREE.MeshBasicMaterial({ color: 0xff5aa8, transparent: true, opacity: 0.65 }))
    halo.rotation.x = Math.PI / 2.2
    halo.position.z = -0.15
    this.group.add(halo)
    this.halo = halo

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,120,190,0.85)', 'rgba(255,40,120,0)'),
      color: 0xff6ab4, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.42,
    }))
    glow.scale.set(1.6, 1.6, 1)
    this.group.add(glow)

    this.group.position.y = this.baseY
    this.game.world.scene.add(this.group)
    this.game.effects.ring(this.group.position, { color: 0xff5aa8, from: 0.2, to: 2.4, life: 0.5, flat: true })
  }

  update(dt) {
    this.age += dt
    this.spawnT = Math.min(1, this.spawnT + dt * 3)
    this.spawnScale = this.spawnT
    this.updateFlash(dt)
    const p = this.game.player.position
    const dx = p.x - this.group.position.x
    const dz = p.z - this.group.position.z
    const dist = Math.hypot(dx, dz) || 0.001
    const nx = dx / dist
    const nz = dz / dist

    // keep preferred distance and orbit
    let radial = 0
    if (dist > this.preferred + 2) radial = 1
    else if (dist < this.preferred - 2) radial = -1
    const speed = 2.6
    const tx = nx * radial + -nz * this.orbitDir * 0.7
    const tz = nz * radial + nx * this.orbitDir * 0.7
    const tl = Math.hypot(tx, tz) || 1
    this.group.position.x += (tx / tl) * speed * dt
    this.group.position.z += (tz / tl) * speed * dt
    const r = Math.hypot(this.group.position.x, this.group.position.z)
    if (r > 24) {
      this.group.position.x *= 24 / r
      this.group.position.z *= 24 / r
    }
    this.group.position.y = this.baseY + Math.sin(this.age * 1.6 + this.hitRadius) * 0.22
    this.group.lookAt(p.x, this.group.position.y, p.z)
    this.halo.rotation.z += dt * 1.4

    // attack
    this.attackTimer -= dt
    if (this.attackTimer <= 0 && this.warn <= 0) {
      this.warn = 0.55
    }
    if (this.warn > 0) {
      this.warn -= dt
      this.halo.scale.setScalar(1 + (1 - this.warn / 0.55) * 0.5)
      if (this.warn <= 0) {
        this.halo.scale.setScalar(1)
        this.fire()
        this.attackTimer = rand(2.9, 4.1)
      }
    }
  }

  fire() {
    const origin = this.center()
    const target = this.game.player.eyePosition
    const dir = target.sub(origin).normalize()
    this.game.enemies.spawnProjectile(origin, dir, { speed: 9.2, damage: 8, color: 0xff5aa8, owner: this })
    this.game.effects.flash(origin, 1.8, 0xff8ac4, 0.12)
  }
}

/* ============================================================== SACI */
class Saci extends Enemy {
  constructor(game, pos) {
    super(game, 'saci', pos)
    this.hp = 20
    this.maxHp = 20
    this.hitY = 1.0
    this.hitRadius = 0.62
    this.hitColor = 0xff5a3c
    this.score = 130
    this.spawnScale = 0
    this.teleCooldown = rand(5, 8)
    this.windup = 0
    this.build()
  }

  build() {
    const skin = this.addMat(new THREE.MeshLambertMaterial({ color: 0xd08a52, emissive: 0x4a2410, emissiveIntensity: 1.0 }))
    const dark = this.addMat(new THREE.MeshLambertMaterial({ color: 0x5a3650, emissive: 0x2a1428, emissiveIntensity: 1.2 }))
    const red = this.addMat(new THREE.MeshLambertMaterial({ color: 0xff3b30, emissive: 0x7a1010, emissiveIntensity: 1.2 }))

    const body = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 8), dark)
    body.scale.set(0.85, 1.2, 0.8)
    body.position.y = 1.0
    this.group.add(body)
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 10, 8), skin)
    head.position.y = 1.5
    this.group.add(head)
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.55, 8), red)
    cap.position.y = 1.85
    cap.rotation.z = 0.2
    this.group.add(cap)
    const capTip = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 5), red)
    capTip.position.set(0.08, 2.12, 0)
    this.group.add(capTip)

    for (const sx of [-0.1, 0.1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 5), new THREE.MeshBasicMaterial({ color: 0xffd24a }))
      eye.position.set(sx, 1.55, 0.24)
      this.group.add(eye)
    }
    const shorts = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.31, 0.3, 10), red)
    shorts.position.y = 0.64
    this.group.add(shorts)
    const belt = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.035, 5, 16), new THREE.MeshLambertMaterial({ color: 0xffcf3f, emissive: 0x5a3c0a, emissiveIntensity: 0.8 }))
    belt.rotation.x = Math.PI / 2
    belt.position.y = 0.8
    this.group.add(belt)
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.9, 5), dark)
    leg.position.set(0, 0.35, 0)
    this.group.add(leg)
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.34), dark)
    foot.position.set(0, 0.02, 0.06)
    this.group.add(foot)
    for (const sx of [-1, 1]) {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.7, 5), skin)
      arm.position.set(sx * 0.35, 1.05, 0.06)
      arm.rotation.z = sx * 0.7
      this.group.add(arm)
    }
    // pipe
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.42, 5), new THREE.MeshLambertMaterial({ color: 0x3b2a1c }))
    pipe.position.set(0.22, 1.4, 0.25)
    pipe.rotation.z = 0.9
    this.group.add(pipe)
    const ember = new THREE.Mesh(new THREE.SphereGeometry(0.05, 5, 5), new THREE.MeshBasicMaterial({ color: 0xff7a2e }))
    ember.position.set(0.38, 1.52, 0.28)
    this.group.add(ember)
    const emberGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,180,90,0.95)', 'rgba(255,60,20,0)'),
      color: 0xff7a2e, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.55,
    }))
    emberGlow.position.copy(ember.position)
    emberGlow.scale.set(1.1, 1.1, 1)
    this.group.add(emberGlow)

    // whirlwind
    this.whirl = []
    for (let i = 0; i < 2; i++) {
      const w = new THREE.Mesh(
        new THREE.TorusGeometry(0.55 + i * 0.2, 0.035, 4, 20),
        new THREE.MeshBasicMaterial({ color: 0xb9a7c9, transparent: true, opacity: 0.35 - i * 0.1, depthWrite: false })
      )
      w.rotation.x = Math.PI / 2
      w.position.y = 0.12 + i * 0.2
      this.group.add(w)
      this.whirl.push(w)
    }

    this.game.world.scene.add(this.group)
    this.game.effects.ring(this.group.position, { color: 0xffcf3f, from: 0.2, to: 2, life: 0.45, flat: true })
  }

  update(dt) {
    this.age += dt
    this.spawnT = Math.min(1, this.spawnT + dt * 4)
    this.spawnScale = this.spawnT
    this.updateFlash(dt)
    this.whirl.forEach((w, i) => { w.rotation.z += dt * (4 + i * 2) })
    const p = this.game.player.position
    const dx = p.x - this.group.position.x
    const dz = p.z - this.group.position.z
    const dist = Math.hypot(dx, dz) || 0.001

    this.teleCooldown -= dt
    if (this.teleCooldown <= 0 && dist > 7) {
      this.teleCooldown = rand(6, 9)
      this.game.effects.spawnParticles(this.center(), 12, { color: 0x9a86b0, color2: 0x2a1a33, speed: 4, spread: 0.6, life: 0.5, size: 0.5, gravity: 0 })
      const a = rand(0, TAU)
      const np = new THREE.Vector3(p.x + Math.cos(a) * 5, 0, p.z + Math.sin(a) * 5)
      this.game.world.collide(np, 0.7)
      this.group.position.set(np.x, 0, np.z)
      this.game.effects.spawnParticles(this.center(), 14, { color: 0x9a86b0, color2: 0x2a1a33, speed: 4, spread: 0.6, life: 0.5, size: 0.5, gravity: 0 })
      this.game.effects.ring(this.group.position, { color: 0xb9a7c9, from: 0.2, to: 2.4, life: 0.4, flat: true })
    }

    // rush toward the guardian
    if (this.windup > 0) {
      this.windup -= dt
      this.group.scale.setScalar(this.spawnScale * (1 + (1 - this.windup / 0.3) * 0.15))
      if (this.windup <= 0) {
        if (dist < 3.4) this.game.player.takeDamage(12, this.group.position)
        this.attackTimer = 1.65
      }
    } else {
      const sp = dist > 2.2 ? 4.4 : 0.6
      this.group.position.x += (dx / dist) * sp * dt
      this.group.position.z += (dz / dist) * sp * dt
      this.attackTimer -= dt
      if (dist < 2.6 && this.attackTimer <= 0) this.windup = 0.3
      this.group.position.x += this.knock.x * dt
      this.group.position.z += this.knock.z * dt
      this.knock.multiplyScalar(Math.exp(-dt * 7))
    }
    this.game.world.collide(this.group.position, 0.55)
    this.group.lookAt(p.x, this.group.position.y + 1, p.z)
  }
}

/* =============================================================== BOI */
class Boi extends Enemy {
  constructor(game, pos) {
    super(game, 'boi', pos)
    this.hp = 80
    this.maxHp = 80
    this.hitY = 1.25
    this.hitRadius = 1.15
    this.hitColor = 0xffcf3f
    this.score = 280
    this.spawnScale = 0
    this.state = 'idle'
    this.stateT = 0
    this.chargeDir = new THREE.Vector3()
    this.stun = 0
    this.build()
  }

  build() {
    const tex = getBoiTexture()
    const bodyMat = this.addMat(new THREE.MeshLambertMaterial({ map: tex, color: 0xffffff, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.32 }))
    const dark = this.addMat(new THREE.MeshLambertMaterial({ color: 0x4a2e44, emissive: 0x1a0c1a, emissiveIntensity: 1.0 }))
    const gold = this.addMat(new THREE.MeshLambertMaterial({ color: 0xffcf3f, emissive: 0x5a3c0a, emissiveIntensity: 0.9 }))

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.0, 2.1), bodyMat)
    body.position.y = 1.15
    this.group.add(body)
    const hump = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), bodyMat)
    hump.scale.set(1, 0.8, 1.4)
    hump.position.set(0, 1.75, -0.2)
    this.group.add(hump)

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.85, 1.0), dark)
    head.position.set(0, 1.5, 1.3)
    this.group.add(head)
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.42, 0.4), this.addMat(new THREE.MeshLambertMaterial({ color: 0xd08a72, emissive: 0x3a160e, emissiveIntensity: 0.8 })))
    snout.position.set(0, 1.32, 1.82)
    this.group.add(snout)
    const blaze = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.6), new THREE.MeshBasicMaterial({ color: 0xfff2dc }))
    blaze.position.set(0, 1.62, 1.815)
    this.group.add(blaze)
    for (const sx of [-0.16, 0.16]) {
      const nostril = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 5), dark)
      nostril.position.set(sx, 1.3, 2.025)
      this.group.add(nostril)
    }
    const noseRing = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.022, 5, 14), gold)
    noseRing.position.set(0, 1.16, 2.02)
    noseRing.rotation.x = Math.PI / 2
    this.group.add(noseRing)
    for (const sx of [-1, 1]) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.65, 6), gold)
      horn.position.set(sx * 0.55, 1.95, 1.4)
      horn.rotation.z = sx * -1.0
      this.group.add(horn)
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 5), new THREE.MeshBasicMaterial({ color: 0xffe27a }))
      eye.position.set(sx * 0.3, 1.65, 1.82)
      this.group.add(eye)
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.2), dark)
      ear.position.set(sx * 0.55, 1.5, 1.05)
      this.group.add(ear)
      // ribbons on horns
      const ribbon = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.5), new THREE.MeshBasicMaterial({ color: sx > 0 ? 0xff3d8b : 0x2ee6c8, side: THREE.DoubleSide }))
      ribbon.position.set(sx * 0.78, 2.0, 1.35)
      ribbon.rotation.y = 0.4
      this.group.add(ribbon)
    }
    for (const [lx, lz] of [[-0.45, -0.7], [0.45, -0.7], [-0.45, 0.7], [0.45, 0.7]]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.72, 0.24), dark)
      leg.position.set(lx, 0.36, lz)
      this.group.add(leg)
    }
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 0.8, 5), dark)
    tail.position.set(0, 1.4, -1.25)
    tail.rotation.x = 0.7
    this.group.add(tail)

    this.game.world.scene.add(this.group)
    this.game.effects.ring(this.group.position, { color: 0xffcf3f, from: 0.3, to: 3, life: 0.5, flat: true })
  }

  update(dt) {
    this.age += dt
    this.spawnT = Math.min(1, this.spawnT + dt * 3)
    this.spawnScale = this.spawnT
    this.updateFlash(dt)
    const p = this.game.player.position
    const dx = p.x - this.group.position.x
    const dz = p.z - this.group.position.z
    const dist = Math.hypot(dx, dz) || 0.001
    this.stateT -= dt

    if (this.state === 'idle') {
      const sp = 1.7
      this.group.position.x += (dx / dist) * sp * dt
      this.group.position.z += (dz / dist) * sp * dt
      this.group.position.y = Math.abs(Math.sin(this.age * 5)) * 0.05
      if (dist < 13 && this.stateT <= 0) {
        this.state = 'windup'
        this.stateT = 0.85
        this.game.audio.tone(180, 0.5, { type: 'sawtooth', gain: 0.08, to: 90 })
      }
    } else if (this.state === 'windup') {
      this.group.position.y = Math.abs(Math.sin(this.age * 16)) * 0.06
      this.group.position.x -= (dx / dist) * 0.8 * dt
      this.group.position.z -= (dz / dist) * 0.8 * dt
      if (this.stateT <= 0) {
        this.state = 'charge'
        this.stateT = 0.95
        this.chargeDir.set(dx / dist, 0, dz / dist)
        this.game.effects.ring(this.group.position, { color: 0xff3d3d, from: 0.4, to: 3, life: 0.4, flat: true })
        this.game.audio.tone(90, 0.4, { type: 'sawtooth', gain: 0.14, to: 220 })
      }
    } else if (this.state === 'charge') {
      const step = 16 * dt
      const before = this.group.position.clone()
      this.group.position.addScaledVector(this.chargeDir, step)
      this.group.position.y = 0
      this.game.world.collide(this.group.position, 1.0)
      const moved = before.distanceTo(this.group.position)
      if (dist < 2.4) {
        this.game.player.takeDamage(20, this.group.position)
        this.state = 'stun'
        this.stateT = 1.3
        this.game.effects.explosion(this.center(), 0.8)
      } else if (moved < step * 0.55 || this.stateT <= 0) {
        this.state = 'stun'
        this.stateT = 1.4
        this.game.effects.spawnParticles(this.center(), 16, { color: 0xffcf3f, color2: 0xff7a2e, speed: 6, spread: 0.7, life: 0.5, size: 0.5 })
        this.game.audio.tone(70, 0.3, { type: 'sine', gain: 0.2, to: 40 })
      }
    } else if (this.state === 'stun') {
      this.group.position.y = 0
      if (this.stateT <= 0) {
        this.state = 'idle'
        this.stateT = rand(1.2, 2.2)
      }
    }
    this.group.lookAt(p.x, this.group.position.y + 1, p.z)
  }
}

/* ====================================================== TRIO ELÉTRICO */
class Boss extends Enemy {
  constructor(game, pos) {
    super(game, 'boss', pos)
    this.hp = 340
    this.maxHp = 340
    this.hitY = 3.2
    this.hitRadius = 4.6
    this.hitColor = 0xff3d8b
    this.score = 4000
    this.spawnScale = 1
    this.entering = true
    this.enterT = 0
    this.volley = 2.4
    this.warn = 0
    this.spawnTimer = 6
    this.dying = false
    this.deathT = 0
    this.base = new THREE.Vector3(pos.x, 0, pos.z)
    this.lights = []
    this.build()
  }

  build() {
    const bodyMat = this.addMat(new THREE.MeshLambertMaterial({ color: 0x3a2848, emissive: 0x1a0e24, emissiveIntensity: 1.0 }))
    const trimMat = this.addMat(new THREE.MeshLambertMaterial({ color: 0x4a3158, emissive: 0x20102c, emissiveIntensity: 1.0 }))
    const neonPink = this.addMat(new THREE.MeshBasicMaterial({ color: 0xff3d8b }))
    const neonTeal = this.addMat(new THREE.MeshBasicMaterial({ color: 0x2ee6c8 }))
    const neonYellow = this.addMat(new THREE.MeshBasicMaterial({ color: 0xffcf3f }))

    const pinkLight = new THREE.PointLight(0xff3d8b, 26, 18, 2)
    pinkLight.position.set(0, 4.6, 2.2)
    this.group.add(pinkLight)
    const tealLight = new THREE.PointLight(0x2ee6c8, 18, 14, 2)
    tealLight.position.set(0, 3.2, -2)
    this.group.add(tealLight)

    const chassis = new THREE.Mesh(new THREE.BoxGeometry(8, 2.4, 3.6), bodyMat)
    chassis.position.y = 1.5
    this.group.add(chassis)

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.1, 3.0), trimMat)
    cabin.position.set(0, 2.2, 1.9)
    this.group.add(cabin)
    const windshield = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 0.9), new THREE.MeshBasicMaterial({ color: 0x6fd8e6, transparent: true, opacity: 0.55 }))
    windshield.position.set(0, 2.55, 3.42)
    this.group.add(windshield)
    const bumper = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.3, 0.4), neonYellow)
    bumper.position.set(0, 0.55, 1.9)
    this.group.add(bumper)

    // wheels
    const wheelGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.5, 12)
    const wheelMat = new THREE.MeshLambertMaterial({ color: 0x0e0a14 })
    for (const [wx, wz] of [[-3.1, -1.1], [3.1, -1.1], [-3.1, 1.15], [3.1, 1.15]]) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(wx, 0.62, wz)
      this.group.add(wheel)
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.54, 8), neonTeal)
      hub.rotation.z = Math.PI / 2
      hub.position.set(wx, 0.62, wz)
      this.group.add(hub)
    }

    // speaker towers
    const speakerMats = [neonPink, neonTeal, neonYellow]
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * 2.35
      const stack = new THREE.Mesh(new THREE.BoxGeometry(2.05, 2.5, 1.25), bodyMat)
      stack.position.set(x, 3.95, -0.4)
      this.group.add(stack)
      for (let s = 0; s < 2; s++) {
        for (let c = 0; c < 2; c++) {
          const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.12, 14), trimMat)
          cone.rotation.x = Math.PI / 2
          cone.position.set(x + (c - 0.5) * 0.95, 3.35 + s * 1.05, 0.25)
          this.group.add(cone)
          const ring = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.045, 5, 18), speakerMats[i])
          ring.position.set(x + (c - 0.5) * 0.95, 3.35 + s * 1.05, 0.3)
          this.group.add(ring)
        }
      }
      const bar = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.12, 0.14), speakerMats[i])
      bar.position.set(x, 5.25, 0.28)
      this.group.add(bar)
    }

    // neon strips
    for (const sx of [-4.02, 4.02]) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 3.2), neonPink)
      strip.position.set(sx, 2.1, 0)
      this.group.add(strip)
    }
    for (let i = 0; i < 10; i++) {
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), i % 2 ? neonTeal : neonYellow)
      bulb.position.set(-3.8 + i * 0.84, 2.82, 1.85)
      this.group.add(bulb)
    }

    // banner
    const bannerTex = textTexture(['TRIO ELÉTRICO'], { w: 1024, h: 160, bg: 'rgba(14,6,20,0.96)', color: '#ff8ac4', font: 'bold 96px sans-serif' })
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 1.03), new THREE.MeshBasicMaterial({ map: bannerTex, transparent: true }))
    banner.position.set(0, 5.75, 0.3)
    this.group.add(banner)

    // beacon
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 0.5, 8), neonYellow)
    beacon.position.set(0, 6.35, 0.4)
    this.group.add(beacon)
    this.beacon = beacon
    const beaconGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,220,120,0.95)', 'rgba(255,120,20,0)'),
      color: 0xffcf3f, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }))
    beaconGlow.position.set(0, 6.6, 0.4)
    beaconGlow.scale.set(3, 3, 1)
    this.group.add(beaconGlow)
    this.beaconGlow = beaconGlow

    this.group.position.set(this.base.x, 0, -34)
    this.game.world.scene.add(this.group)
  }

  update(dt) {
    this.age += dt
    const p = this.game.player.position
    if (this.entering) {
      this.enterT += dt
      const k = clamp(this.enterT / 2.6, 0, 1)
      const e = 1 - Math.pow(1 - k, 3)
      this.group.position.set(0, Math.sin(k * Math.PI) * 0.2, -34 + e * 14)
      if (k >= 1) {
        this.entering = false
        this.base.set(0, 0, -20)
        this.game.audio.boss()
      }
      this.group.lookAt(p.x, 2, p.z)
      return
    }
    if (this.dying) {
      this.deathT += dt
      this.group.position.x = Math.sin(this.deathT * 26) * 0.25
      if (Math.random() < dt * 9) {
        const pt = this.group.position.clone().add(new THREE.Vector3(rand(-4, 4), rand(1, 6), rand(-2, 2)))
        this.game.effects.explosion(pt, rand(0.8, 1.6))
        this.game.audio.explosion()
      }
      if (this.deathT > 2.8) {
        this.dead = true
        this.game.onBossDefeated?.()
      }
      return
    }

    // slow drift across the plaza
    this.group.position.x = Math.sin(this.age * 0.42) * 7.5
    this.group.position.z = -20 + Math.cos(this.age * 0.31) * 1.6
    this.group.position.y = Math.abs(Math.sin(this.age * 1.8)) * 0.04
    this.group.lookAt(p.x, 2, p.z)
    this.beacon.rotation.y += dt * 5
    this.beaconGlow.material.opacity = 0.7 + Math.sin(this.age * 8) * 0.3

    const hpPct = this.hp / this.maxHp
    this.volley -= dt
    if (this.volley <= 0 && this.warn <= 0) {
      this.warn = 1.0
      this.volley = hpPct < 0.4 ? 2.5 : 3.4
    }
    if (this.warn > 0) {
      this.warn -= dt
      const pulse = 1 + Math.sin(this.age * 40) * 0.2
      this.beaconGlow.scale.set(3 * pulse, 3 * pulse, 1)
      if (this.warn <= 0) {
        this.fireVolley()
      }
    }

    this.spawnTimer -= dt
    if (this.spawnTimer <= 0) {
      this.spawnTimer = 7.5
      const n = this.game.enemies.countOfType('mask')
      if (n < 2) {
        for (let i = 0; i < 2; i++) {
          const pos = this.group.position.clone().add(new THREE.Vector3(rand(-6, 6), 0, rand(-2, 4)))
          this.game.enemies.spawn('mask', pos)
        }
      }
    }

    // damage smoke
    if (hpPct < 0.5 && Math.random() < dt * 8) {
      const pt = this.group.position.clone().add(new THREE.Vector3(rand(-3.5, 3.5), rand(3, 6), rand(-1.5, 1.5)))
      this.game.effects.spawnParticles(pt, 2, { color: 0x2a2030, color2: 0x0f0a14, speed: 1.4, spread: 0.4, life: 1.4, size: 1.5, gravity: 0.8, drag: 0.95 })
    }
  }

  fireVolley() {
    const base = this.group.position.clone()
    const forward = new THREE.Vector3(pForwardX(this), 0, pForwardZ(this)).normalize()
    this.game.effects.flash(base.clone().add(new THREE.Vector3(0, 4, 1)), 7, 0xff5aa8, 0.2)
    this.game.effects.ring(base.clone().add(new THREE.Vector3(0, 0.9, 0)), { color: 0xff3d8b, from: 1, to: 8, life: 0.5, flat: true })
    this.game.enemies.spawnShockwave(base, { damage: 12, speed: 9, maxRadius: 36, color: 0xff3d8b })
    this.game.audio.tone(70, 0.8, { type: 'sawtooth', gain: 0.2, to: 40 })
    this.game.audio.noise(0.6, { type: 'lowpass', freq: 500, gain: 0.22 })
    this.game.player.shake = Math.max(this.game.player.shake, 0.5)
  }

  takeDamage(amount, point) {
    if (this.dying) return false
    return super.takeDamage(amount, point)
  }

  die() {
    if (this.dying) return
    this.dying = true
    this.deathT = 0
    this.hp = 0
    this.game.onBossHp?.(0)
    this.game.audio.explosion()
    this.game.effects.confetti(this.group.position.clone().add(new THREE.Vector3(0, 4, 0)))
  }
}

function pForwardX(e) {
  const v = new THREE.Vector3()
  e.group.getWorldDirection(v)
  return v.x
}
function pForwardZ(e) {
  const v = new THREE.Vector3()
  e.group.getWorldDirection(v)
  return v.z
}

/* ====================================================== MANAGER */
export class EnemyManager {
  constructor(game) {
    this.game = game
    this.list = []
    this.projectiles = []
    this.shockwaves = []
    this.boss = null
  }

  reset() {
    for (const e of this.list) {
      this.game.world.scene.remove(e.group)
      e.dispose?.()
    }
    this.list.length = 0
    for (const p of this.projectiles) this.game.world.scene.remove(p.mesh)
    this.projectiles.length = 0
    for (const s of this.shockwaves) this.game.world.scene.remove(s.mesh)
    this.shockwaves.length = 0
    this.boss = null
  }

  spawn(type, pos) {
    let e
    if (type === 'mask') e = new Mask(this.game, pos)
    else if (type === 'saci') e = new Saci(this.game, pos)
    else if (type === 'boi') e = new Boi(this.game, pos)
    else if (type === 'boss') {
      e = new Boss(this.game, new THREE.Vector3(0, 0, -34))
      this.boss = e
    }
    if (e) this.list.push(e)
    return e
  }

  countOfType(type) {
    return this.list.filter((e) => !e.dead && e.type === type).length
  }

  aliveCount() {
    return this.list.filter((e) => !e.dead).length
  }

  spawnProjectile(origin, dir, { speed = 10, damage = 10, color = 0xff5aa8, owner = null } = {}) {
    const mesh = new THREE.Group()
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 7), new THREE.MeshBasicMaterial({ color }))
    mesh.add(orb)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,255,255,0.95)', 'rgba(255,80,160,0)'),
      color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }))
    glow.scale.set(1.4, 1.4, 1)
    mesh.add(glow)
    mesh.position.copy(origin)
    this.game.world.scene.add(mesh)
    this.projectiles.push({
      mesh, dir: dir.clone().normalize(), speed, damage, color, owner,
      life: 4.5, trail: 0,
    })
  }

  spawnShockwave(pos, { damage = 12, speed = 9, maxRadius = 34, color = 0xff3d8b } = {}) {
    const mat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.85, side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const mesh = new THREE.Mesh(new THREE.RingGeometry(0.92, 1, 64), mat)
    mesh.rotation.x = -Math.PI / 2
    mesh.position.set(pos.x, 0.85, pos.z)
    mesh.scale.setScalar(1)
    this.game.world.scene.add(mesh)
    this.shockwaves.push({ mesh, radius: 1, speed, maxRadius, damage, hit: false, color })
  }

  raycast(origin, dir, maxDist = 70) {
    let best = null
    const center = new THREE.Vector3()
    for (const e of this.list) {
      if (e.dead) continue
      center.set(e.group.position.x, e.group.position.y + e.hitY, e.group.position.z)
      const oc = new THREE.Vector3().subVectors(center, origin)
      const tca = oc.dot(dir)
      if (tca < 0) continue
      const d2 = oc.lengthSq() - tca * tca
      const r2 = e.hitRadius * e.hitRadius
      if (d2 > r2) continue
      const thc = Math.sqrt(r2 - d2)
      const t = tca - thc
      if (t < 0 || t > maxDist) continue
      if (!best || t < best.dist) {
        best = {
          enemy: e,
          dist: t,
          point: origin.clone().addScaledVector(dir, t),
          center: center.clone(),
        }
      }
    }
    return best
  }

  findAimTarget(origin, dir, maxAngle = 0.1, maxDist = 70) {
    let best = null
    const to = new THREE.Vector3()
    for (const e of this.list) {
      if (e.dead) continue
      to.set(e.group.position.x, e.group.position.y + e.hitY, e.group.position.z).sub(origin)
      const dist = to.length()
      if (dist > maxDist || dist < 0.1) continue
      to.divideScalar(dist)
      const ang = Math.acos(clamp(to.dot(dir), -1, 1))
      const allowance = Math.max(maxAngle, Math.atan2(e.hitRadius, dist) * 0.85)
      if (ang < allowance) {
        const weight = ang - (1 - dist / maxDist) * 0.004
        if (!best || weight < best.weight) best = { enemy: e, weight, angle: ang }
      }
    }
    return best
  }

  damageInRadius(pos, radius, damage, source = null) {
    let hits = 0
    for (const e of this.list) {
      if (e.dead) continue
      const c = e.center()
      const d = c.distanceTo(pos)
      if (d < radius + e.hitRadius) {
        const falloff = clamp(1 - d / (radius + e.hitRadius) * 0.55, 0.45, 1)
        e.takeDamage(damage * falloff, c)
        hits++
      }
    }
    return hits
  }

  update(dt) {
    for (const e of this.list) {
      if (!e.dead) e.update(dt)
    }
    // remove dead non-boss entries
    for (let i = this.list.length - 1; i >= 0; i--) {
      const e = this.list[i]
      if (e.dead) {
        if (e.type === 'boss') this.boss = null
        this.list.splice(i, 1)
      }
    }

    // projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i]
      p.life -= dt
      p.mesh.position.addScaledVector(p.dir, p.speed * dt)
      p.mesh.rotation.y += dt * 4
      p.trail -= dt
      if (p.trail <= 0) {
        p.trail = 0.04
        this.game.effects.spawnParticles(p.mesh.position, 1, {
          color: p.color, color2: 0xffffff, speed: 0.6, spread: 0.05, life: 0.25,
          size: 0.35, gravity: 0, drag: 0.9,
        })
      }
      const pp = this.game.player.position
      const d = Math.hypot(p.mesh.position.x - pp.x, p.mesh.position.z - pp.z)
      const yHit = p.mesh.position.y > 0.4 && p.mesh.position.y < 2.3
      let remove = false
      if (d < 0.75 && yHit) {
        this.game.player.takeDamage(p.damage, p.mesh.position)
        this.game.effects.hit(p.mesh.position, p.color, 10)
        remove = true
      }
      if (p.life <= 0 || p.mesh.position.y < 0.1 || Math.hypot(p.mesh.position.x, p.mesh.position.z) > 32) remove = true
      if (remove) {
        this.game.effects.hit(p.mesh.position, p.color, 6)
        this.game.world.scene.remove(p.mesh)
        this.projectiles.splice(i, 1)
      }
    }

    // boss shockwaves
    const pp = this.game.player.position
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const s = this.shockwaves[i]
      s.radius += s.speed * dt
      const k = s.radius / s.maxRadius
      s.mesh.scale.setScalar(s.radius)
      s.mesh.material.opacity = 0.85 * (1 - k) + 0.1
      if (!s.hit) {
        const d = Math.hypot(pp.x - s.mesh.position.x, pp.z - s.mesh.position.z)
        if (Math.abs(d - s.radius) < 1.0) {
          const dealt = this.game.player.takeDamage(s.damage, s.mesh.position)
          if (dealt > 0) {
            s.hit = true
            this.game.effects.hit(this.game.player.eyePosition, 0xff3d8b, 12)
          }
        }
      }
      if (s.radius > s.maxRadius) {
        this.game.world.scene.remove(s.mesh)
        s.mesh.geometry.dispose()
        s.mesh.material.dispose()
        this.shockwaves.splice(i, 1)
      }
    }
  }
}
