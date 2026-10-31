import * as THREE from 'three'

const TAU = Math.PI * 2
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t

export const WEAPONS = {
  rifle: {
    id: 'rifle',
    name: 'SACI-15',
    type: 'FUZIL · AUTOMÁTICO',
    damage: 24,
    headMult: 2.1,
    rpm: 620,
    mag: 30,
    spread: 0.0075,
    pellets: 1,
    reloadTime: 1.55,
    auto: true,
    kick: 0.011,
    bloom: 0.0028,
    maxBloom: 0.022,
    tracer: 0xffd166,
  },
  shotgun: {
    id: 'shotgun',
    name: 'BOTO-12',
    type: 'ESPINGARDA · CURTA',
    damage: 15,
    headMult: 1.6,
    rpm: 78,
    mag: 6,
    spread: 0.048,
    pellets: 8,
    reloadTime: 2.25,
    auto: false,
    kick: 0.045,
    bloom: 0.008,
    maxBloom: 0.03,
    tracer: 0xff9e5e,
  },
}

function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
  m.position.set(x, y, z)
  return m
}

function cyl(rt, rb, h, mat, x = 0, y = 0, z = 0, seg = 10) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat)
  m.rotation.x = Math.PI / 2
  m.position.set(x, y, z)
  return m
}

function makeRifle() {
  const g = new THREE.Group()
  const dark = new THREE.MeshStandardMaterial({ color: 0x19201d, roughness: 0.48, metalness: 0.5 })
  const green = new THREE.MeshStandardMaterial({ color: 0x2c4a32, roughness: 0.62, metalness: 0.15 })
  const tan = new THREE.MeshStandardMaterial({ color: 0xb08a4e, roughness: 0.66, metalness: 0.12 })
  const orange = new THREE.MeshStandardMaterial({ color: 0xd96a25, roughness: 0.5, metalness: 0.2 })
  const black = new THREE.MeshStandardMaterial({ color: 0x0c100e, roughness: 0.5, metalness: 0.4 })
  const metal = new THREE.MeshStandardMaterial({ color: 0x6d7771, roughness: 0.32, metalness: 0.8 })

  g.add(box(0.095, 0.115, 0.5, dark, 0, 0, -0.08)) // receiver
  g.add(box(0.105, 0.035, 0.34, green, 0, 0.068, -0.13)) // top rail / cowl
  g.add(cyl(0.02, 0.022, 0.42, metal, 0, 0.012, -0.52, 10)) // barrel
  g.add(cyl(0.034, 0.034, 0.09, black, 0, 0.012, -0.75, 10)) // muzzle brake
  g.add(cyl(0.026, 0.026, 0.05, orange, 0, 0.012, -0.7, 8)) // muzzle ring
  g.add(box(0.083, 0.075, 0.31, green, 0, -0.004, -0.34)) // handguard
  g.add(box(0.088, 0.02, 0.3, orange, 0, -0.043, -0.34)) // handguard accent
  for (let i = 0; i < 3; i++) g.add(box(0.09, 0.012, 0.018, black, 0, 0.024, -0.46 + i * 0.07))
  g.add(box(0.082, 0.09, 0.24, tan, 0, -0.015, 0.25)) // stock
  g.add(box(0.072, 0.06, 0.1, black, 0, 0.0, 0.38)) // butt pad
  g.add(box(0.05, 0.15, 0.075, black, 0, -0.105, 0.09)) // grip
  const mag = box(0.06, 0.2, 0.085, green, 0, -0.135, -0.03)
  mag.rotation.x = -0.18
  g.add(mag)
  g.add(box(0.03, 0.032, 0.13, black, 0, 0.021, 0.04)) // charging handle
  // holo sight
  const sightBase = box(0.055, 0.035, 0.11, black, 0, 0.104, -0.11)
  g.add(sightBase)
  const frame = new THREE.Mesh(
    new THREE.TorusGeometry(0.031, 0.006, 5, 14),
    metal
  )
  frame.position.set(0, 0.15, -0.11)
  frame.rotation.y = Math.PI / 2
  frame.rotation.z = 0
  g.add(frame)
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.0065, 6, 5),
    new THREE.MeshBasicMaterial({ color: 0xff5d3a, toneMapped: false })
  )
  dot.position.set(0.007, 0.15, -0.11)
  g.add(dot)
  // side detail + tiny flag patch
  g.add(box(0.012, 0.045, 0.09, orange, -0.055, 0.02, -0.2))
  g.add(box(0.012, 0.03, 0.03, green, 0.055, 0.02, -0.2))
  // hands
  const glove = new THREE.MeshStandardMaterial({ color: 0x2a2b26, roughness: 0.8 })
  const skin = new THREE.MeshStandardMaterial({ color: 0x8c5b3d, roughness: 0.7 })
  const sleeve = new THREE.MeshStandardMaterial({ color: 0x33483a, roughness: 0.85 })
  const rightHand = box(0.085, 0.095, 0.11, glove, 0.012, -0.13, 0.1)
  rightHand.rotation.x = -0.25
  g.add(rightHand)
  g.add(box(0.095, 0.13, 0.12, sleeve, 0.06, -0.21, 0.23))
  // left support hand
  const leftHand = box(0.085, 0.08, 0.13, glove, -0.006, -0.06, -0.36)
  leftHand.rotation.x = 0.12
  g.add(leftHand)
  g.add(box(0.09, 0.1, 0.16, skin, -0.03, -0.115, -0.45))
  g.add(box(0.1, 0.12, 0.2, sleeve, -0.09, -0.19, -0.47))

  // muzzle flash
  const flash = new THREE.Group()
  const flashMat = new THREE.MeshBasicMaterial({
    color: 0xffc46b,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  })
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.26, 6, 1, true), flashMat)
  cone.rotation.x = -Math.PI / 2
  cone.position.z = -0.12
  flash.add(cone)
  const star = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.24), flashMat)
  star.position.z = -0.02
  flash.add(star)
  flash.position.set(0, 0.012, -0.8)
  g.add(flash)
  const light = new THREE.PointLight(0xffa63d, 0, 5, 2)
  light.position.set(0, 0.02, -0.85)
  g.add(light)
  g.userData = { flash, flashMat, light, kind: 'rifle' }
  return g
}

function makeShotgun() {
  const g = new THREE.Group()
  const teal = new THREE.MeshStandardMaterial({ color: 0x1e5b58, roughness: 0.42, metalness: 0.55 })
  const dark = new THREE.MeshStandardMaterial({ color: 0x141b19, roughness: 0.5, metalness: 0.45 })
  const wood = new THREE.MeshStandardMaterial({ color: 0x7d4f2b, roughness: 0.7, metalness: 0.05 })
  const orange = new THREE.MeshStandardMaterial({ color: 0xd96a25, roughness: 0.5, metalness: 0.2 })
  const metal = new THREE.MeshStandardMaterial({ color: 0x7a8580, roughness: 0.3, metalness: 0.85 })

  g.add(box(0.105, 0.115, 0.4, teal, 0, 0, -0.04))
  g.add(box(0.11, 0.04, 0.3, orange, 0, 0.066, -0.1))
  g.add(cyl(0.031, 0.031, 0.52, metal, -0.028, 0.035, -0.48, 12))
  g.add(cyl(0.031, 0.031, 0.52, metal, 0.028, 0.035, -0.48, 12))
  g.add(box(0.105, 0.06, 0.32, teal, 0, -0.03, -0.3))
  g.add(box(0.07, 0.26, 0.24, wood, 0, -0.03, 0.27))
  g.add(box(0.078, 0.13, 0.06, wood, 0, -0.17, 0.34))
  g.add(box(0.08, 0.07, 0.34, wood, 0, -0.02, 0.14))
  g.add(box(0.055, 0.15, 0.08, dark, 0, -0.1, -0.14))
  g.add(box(0.11, 0.06, 0.22, wood, 0, -0.07, -0.27)) // pump
  g.add(box(0.012, 0.022, 0.34, dark, 0, 0.062, -0.44))
  const bead = new THREE.Mesh(
    new THREE.SphereGeometry(0.012, 6, 5),
    new THREE.MeshBasicMaterial({ color: 0xffb703, toneMapped: false })
  )
  bead.position.set(0, 0.08, -0.7)
  g.add(bead)
  // hands
  const glove = new THREE.MeshStandardMaterial({ color: 0x2a2b26, roughness: 0.8 })
  const skin = new THREE.MeshStandardMaterial({ color: 0x8c5b3d, roughness: 0.7 })
  const sleeve = new THREE.MeshStandardMaterial({ color: 0x33483a, roughness: 0.85 })
  const rh = box(0.09, 0.1, 0.12, glove, 0.01, -0.1, 0.15)
  rh.rotation.x = -0.15
  g.add(rh)
  g.add(box(0.1, 0.13, 0.18, sleeve, 0.07, -0.2, 0.27))
  g.add(box(0.09, 0.08, 0.14, glove, -0.005, -0.09, -0.33))
  g.add(box(0.09, 0.1, 0.16, skin, -0.035, -0.14, -0.42))
  g.add(box(0.1, 0.12, 0.2, sleeve, -0.09, -0.2, -0.46))

  const flash = new THREE.Group()
  const flashMat = new THREE.MeshBasicMaterial({
    color: 0xffb15e,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  })
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.34, 7, 1, true), flashMat)
  cone.rotation.x = -Math.PI / 2
  cone.position.z = -0.14
  flash.add(cone)
  const star = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34), flashMat)
  star.position.z = -0.02
  flash.add(star)
  flash.position.set(0, 0.035, -0.78)
  g.add(flash)
  const light = new THREE.PointLight(0xff9a3d, 0, 6, 2)
  light.position.set(0, 0.04, -0.85)
  g.add(light)
  g.userData = { flash, flashMat, light, kind: 'shotgun' }
  return g
}

export class Player {
  constructor(camera, scene, world, { mobile = false, audio, input }) {
    this.camera = camera
    this.scene = scene
    this.world = world
    this.mobile = mobile
    this.audio = audio
    this.input = input

    this.position = new THREE.Vector3(0, 0, 13)
    this.velocity = new THREE.Vector3()
    this.yaw = 0
    this.pitch = 0
    this.eyeHeight = 1.7
    this.radius = 0.38
    this.health = 100
    this.maxHealth = 100
    this.dead = false
    this.alive = false

    this.weapons = {
      rifle: { ...WEAPONS.rifle, ammo: WEAPONS.rifle.mag, reloading: false, reloadT: 0, cooldown: 0 },
      shotgun: { ...WEAPONS.shotgun, ammo: WEAPONS.shotgun.mag, reloading: false, reloadT: 0, cooldown: 0 },
    }
    this.current = 'rifle'
    this.switching = 0
    this.pendingWeapon = null
    this.bloom = 0
    this.triggerDown = false
    this.lastDamageTime = -99
    this.recoil = 0
    this.recoilPitch = 0
    this.kickPitch = 0
    this.shake = 0
    this.bobPhase = 0
    this.dashTime = 0
    this.dashCooldown = 0
    this.dashDir = new THREE.Vector3()
    this.fovBase = mobile ? 72 : 68
    this.fovCurrent = this.fovBase
    this.aimKick = 0
    this.stepDistance = 0
    this.weaponKick = 0
    this.hitPulse = 0
    this.flashTimer = 0
    this.time = 0

    this.camera.rotation.order = 'YXZ'
    this.camera.fov = this.fovBase
    this.camera.near = 0.045
    this.camera.updateProjectionMatrix()

    // viewmodels
    this.viewRoot = new THREE.Group()
    this.viewRoot.position.set(0.32, -0.3, -0.7)
    this.viewRoot.rotation.set(0.02, -0.04, 0)
    this.viewRoot.scale.setScalar(0.94)
    camera.add(this.viewRoot)

    this.rifleModel = makeRifle()
    this.shotgunModel = makeShotgun()
    this.rifleModel.position.set(0, 0, 0)
    this.shotgunModel.position.set(0, 0, 0)
    this.shotgunModel.visible = false
    this.viewRoot.add(this.rifleModel)
    this.viewRoot.add(this.shotgunModel)

    // warm fill for viewmodel
    this.viewLight = new THREE.PointLight(0xffc48a, 3.6, 4, 2)
    this.viewLight.position.set(0.05, 0.35, -0.2)
    camera.add(this.viewLight)

    this.onShoot = null
    this.onStep = null
    this.onDeath = null
    this.onDamage = null
    this.hudState = null

    this.state = {
      ammo: 30,
      mag: 30,
      weapon: 'rifle',
      name: WEAPONS.rifle.name,
      type: WEAPONS.rifle.type,
      reloading: false,
      reloadProgress: 0,
      health: 100,
      bloom: 0,
      dashCooldown: 0,
    }
  }

  reset() {
    this.position.set(0, 0, 13)
    this.velocity.set(0, 0, 0)
    this.yaw = 0
    this.pitch = -0.015
    this.health = this.maxHealth
    this.dead = false
    this.alive = true
    this.bloom = 0
    this.triggerDown = false
    this.lastDamageTime = -99
    this.recoil = 0
    this.recoilPitch = 0
    this.kickPitch = 0
    this.shake = 0
    this.dashTime = 0
    this.dashCooldown = 0
    this.fovCurrent = this.fovBase
    this.current = 'rifle'
    this.switching = 0
    this.pendingWeapon = null
    for (const id of Object.keys(this.weapons)) {
      this.weapons[id].ammo = WEAPONS[id].mag
      this.weapons[id].reloading = false
      this.weapons[id].reloadT = 0
      this.weapons[id].cooldown = 0
    }
    this.rifleModel.visible = true
    this.shotgunModel.visible = false
    this.viewRoot.position.set(0.32, -0.3, -0.7)
    this.camera.position.set(this.position.x, this.eyeHeight, this.position.z)
    this.camera.rotation.set(this.pitch, this.yaw, 0)
    this.syncModel()
  }

  get weapon() {
    return this.weapons[this.current]
  }

  get dir() {
    const v = new THREE.Vector3(0, 0, -1)
    v.applyEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'))
    return v
  }

  syncModel() {
    this.rifleModel.visible = this.current === 'rifle'
    this.shotgunModel.visible = this.current === 'shotgun'
  }

  addLook(dx, dy) {
    this.yaw -= dx
    this.pitch -= dy
    this.pitch = clamp(this.pitch, -1.32, 1.32)
    if (this.pitch > 1.25) this.pitch = 1.25
    if (this.yaw > Math.PI) this.yaw -= Math.PI * 2
    if (this.yaw < -Math.PI) this.yaw += Math.PI * 2
  }

  tryDash() {
    if (this.dashCooldown > 0 || this.dead) return false
    const move = this.input.getMove()
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw))
    if (Math.abs(move.x) + Math.abs(move.y) > 0.1) {
      this.dashDir.copy(forward).multiplyScalar(move.y).addScaledVector(right, move.x).normalize()
    } else {
      this.dashDir.copy(forward)
    }
    this.dashTime = 0.22
    this.dashCooldown = 3.6
    this.shake = Math.max(this.shake, 0.18)
    this.audio?.dash()
    this.input.haptic?.(18)
    return true
  }

  startReload(auto = false) {
    const w = this.weapon
    if (w.reloading || w.ammo >= w.mag || this.dead) return false
    w.reloading = true
    w.reloadT = 0
    this.audio?.reload(0)
    setTimeout(() => this.audio?.reload(1), w.reloadTime * 400)
    setTimeout(() => this.audio?.reload(2), w.reloadTime * 780)
    return true
  }

  switchWeapon(force) {
    if (this.switching > 0 && this.pendingWeapon === null) return
    let next = force || (this.current === 'rifle' ? 'shotgun' : 'rifle')
    if (next === this.current || !this.weapons[next]) return
    this.pendingWeapon = next
    this.switching = 0.42
    this.audio?.swap()
    this.weapon.reloading = false
  }

  finishSwitch() {
    if (!this.pendingWeapon) return
    this.current = this.pendingWeapon
    this.pendingWeapon = null
    this.syncModel()
    this.bloom = 0
  }

  takeDamage(amount, from) {
    if (this.dead || !this.alive) return
    if (this.time - this.lastDamageTime < 0.18) return
    this.health = Math.max(0, this.health - amount)
    this.lastDamageTime = this.time
    this.shake = Math.max(this.shake, 0.24)
    this.aimKick = 1
    this.audio?.playerHit()
    this.input.haptic?.([18, 30, 12])
    this.onDamage?.(amount, from)
    if (this.health <= 0) {
      this.dead = true
      this.alive = false
      this.firing = false
      this.onDeath?.()
    }
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount)
  }

  update(dt, time) {
    this.time = time
    const input = this.input
    const look = input.consumeLook()
    if (this.alive) this.addLook(look.x, look.y)

    if (!this.alive) {
      this.updateWeapon(dt, time, 0)
      return
    }

    // weapon action queue
    const actions = input.consumeActions()
    if (actions.dash) this.tryDash()
    if (actions.reload) this.startReload()
    if (actions.swap) this.switchWeapon()

    // movement
    const move = input.getMove()
    const speed = (move.sprint ? 7.0 : 5.15) * (this.weapon.reloading ? 0.82 : 1)
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw))
    const desired = new THREE.Vector3()
    desired.addScaledVector(forward, move.y)
    desired.addScaledVector(right, move.x)
    if (desired.lengthSq() > 1) desired.normalize()
    desired.multiplyScalar(speed)

    const accel = 14
    this.velocity.x = lerp(this.velocity.x, desired.x, clamp(accel * dt, 0, 1))
    this.velocity.z = lerp(this.velocity.z, desired.z, clamp(accel * dt, 0, 1))

    if (this.dashTime > 0) {
      this.dashTime -= dt
      const t = Math.max(this.dashTime / 0.22, 0)
      const dashSpeed = 17 * (0.45 + t * 0.55)
      this.velocity.x = this.dashDir.x * dashSpeed
      this.velocity.z = this.dashDir.z * dashSpeed
    }
    this.dashCooldown = Math.max(0, this.dashCooldown - dt)

    const oldX = this.position.x
    const oldZ = this.position.z
    this.position.x += this.velocity.x * dt
    this.position.z += this.velocity.z * dt
    this.resolveCollisions()
    const dist = Math.hypot(this.position.x - oldX, this.position.z - oldZ)
    this.stepDistance += dist
    if (this.stepDistance > 2.35 && move.magnitude > 0.15) {
      this.stepDistance = 0
      this.onStep?.(this.position)
    }

    // health regen
    if (time - this.lastDamageTime > 5.2 && this.health < this.maxHealth) {
      this.health = Math.min(this.maxHealth, this.health + dt * 9)
    }

    // firing
    const canFire = input.firing && !this.weapon.reloading && this.switching <= 0 && this.weapon.ammo > 0
    const w = this.weapon
    w.cooldown = Math.max(0, w.cooldown - dt)
    if (w.auto) {
      if (canFire && w.cooldown <= 0) this.fire()
    } else {
      if (canFire && !this.triggerDown && w.cooldown <= 0) this.fire()
      if (input.firing && w.ammo === 0 && !this.triggerDown) this.audio?.empty()
    }
    this.triggerDown = input.firing
    if (input.firing && w.ammo === 0 && !w.reloading) {
      this.autoReloadTimer = (this.autoReloadTimer || 0) + dt
      if (this.autoReloadTimer > 0.35) {
        this.autoReloadTimer = 0
        this.startReload(true)
      }
    } else {
      this.autoReloadTimer = 0
    }

    // reload update
    for (const id of Object.keys(this.weapons)) {
      const wp = this.weapons[id]
      if (wp.reloading) {
        wp.reloadT += dt
        if (wp.reloadT >= wp.reloadTime) {
          wp.reloading = false
          wp.reloadT = 0
          wp.ammo = wp.mag
          if (this.current === id) this.audio?.reload(2)
        }
      }
    }

    if (this.switching > 0) {
      this.switching -= dt
      if (this.switching <= 0.21 && this.pendingWeapon) this.finishSwitch()
    }

    // bloom / recoil
    this.bloom = Math.max(0, this.bloom - dt * 0.045)
    this.recoil = lerp(this.recoil, 0, clamp(dt * 9, 0, 1))
    this.recoilPitch = lerp(this.recoilPitch, 0, clamp(dt * 10, 0, 1))
    this.kickPitch = lerp(this.kickPitch, 0, clamp(dt * 12, 0, 1))
    this.shake = lerp(this.shake, 0, clamp(dt * 7, 0, 1))
    this.aimKick = lerp(this.aimKick, 0, clamp(dt * 4, 0, 1))
    this.weaponKick = lerp(this.weaponKick, 0, clamp(dt * 11, 0, 1))

    // bob & camera
    const speedRatio = clamp(Math.hypot(this.velocity.x, this.velocity.z) / 6, 0, 1)
    if (speedRatio > 0.04) this.bobPhase += dt * (8 + speedRatio * 3)
    const bobY = Math.sin(this.bobPhase * 2) * 0.022 * speedRatio
    const bobX = Math.cos(this.bobPhase) * 0.018 * speedRatio
    const breathe = Math.sin(time * 1.3) * 0.0035
    const shakeX = (Math.random() - 0.5) * this.shake * 0.05
    const shakeY = (Math.random() - 0.5) * this.shake * 0.05

    this.camera.position.set(
      this.position.x + bobX * 0.35 + shakeX,
      this.eyeHeight + bobY + breathe + shakeY - this.aimKick * 0.045,
      this.position.z
    )
    this.camera.rotation.set(
      this.pitch + this.recoilPitch + this.kickPitch * 0.4,
      this.yaw + Math.sin(this.bobPhase) * 0.0016 * speedRatio,
      Math.sin(this.bobPhase) * 0.0012 * speedRatio + shakeX * 0.2
    )
    const targetFov = this.fovBase + (this.dashTime > 0 ? 9 : 0) + this.aimKick * 2.5
    this.fovCurrent = lerp(this.fovCurrent, targetFov, clamp(dt * 8, 0, 1))
    if (Math.abs(this.camera.fov - this.fovCurrent) > 0.01) {
      this.camera.fov = this.fovCurrent
      this.camera.updateProjectionMatrix()
    }

    this.updateWeapon(dt, time, speedRatio)
    this.updateState()
  }

  updateWeapon(dt, time, speedRatio) {
    const w = this.weapon
    const model = this.current === 'rifle' ? this.rifleModel : this.shotgunModel
    const models = [this.rifleModel, this.shotgunModel]
    const bob = Math.sin(this.bobPhase) * 0.012 * speedRatio
    const bob2 = Math.cos(this.bobPhase * 2) * 0.008 * speedRatio
    const reloadDown = w.reloading ? Math.sin(clamp(w.reloadT / w.reloadTime, 0, 1) * Math.PI) : 0
    const switchDown = this.switching > 0 ? Math.sin(clamp((0.42 - this.switching) / 0.42, 0, 1) * Math.PI) : 0
    const idle = Math.sin(time * 1.4) * 0.003
    this.viewRoot.position.set(
      0.32 + bob * 0.7,
      -0.3 + bob2 + idle - reloadDown * 0.16 - switchDown * 0.18,
      -0.7 + this.recoil * 0.11
    )
    this.viewRoot.rotation.set(
      0.02 - this.recoil * 0.13 + reloadDown * 0.4 + switchDown * 0.5,
      -0.04 + Math.sin(time * 0.7) * 0.002,
      reloadDown * 0.12
    )

    // muzzle flash
    this.flashTimer = Math.max(0, this.flashTimer - dt)
    for (const m of models) {
      const d = m.userData
      if (!d) continue
      const on = m === model && this.flashTimer > 0
      d.flashMat.opacity = on ? 0.95 : 0
      d.light.intensity = on ? 28 * (this.flashTimer / 0.055) : 0
      d.flash.visible = on
      if (on) {
        d.flash.rotation.z = Math.random() * TAU
        d.flash.scale.setScalar(0.8 + Math.random() * 0.5)
      }
    }
    // hide weapon while switching down
    if (this.switching > 0.21) {
      const cur = this.current === 'rifle' ? this.rifleModel : this.shotgunModel
      cur.visible = true
    }
  }

  fire() {
    const w = this.weapon
    w.ammo--
    const interval = 60 / w.rpm
    w.cooldown = interval
    this.bloom = Math.min(w.maxBloom, this.bloom + w.bloom)
    this.weaponKick = 1
    this.flashTimer = 0.055
    this.recoil = Math.min(1.8, this.recoil + 1)
    this.recoilPitch += w.kick * (this.mobile ? 0.7 : 1)
    this.kickPitch += w.kick * 0.7
    this.shake = Math.max(this.shake, w.id === 'shotgun' ? 0.16 : 0.055)
    this.audio?.shoot(w.id)
    this.input.haptic?.(w.id === 'shotgun' ? 22 : 7)

    const spread = w.spread + this.bloom
    const origin = this.camera.position.clone()
    // approximate muzzle in world space (offset right & down)
    const muzzle = new THREE.Vector3(0.16, -0.12, -0.8)
    muzzle.applyEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'))
    muzzle.add(this.camera.position)
    this.onShoot?.({ weapon: w, spread, origin, muzzle })
    this.updateState()
  }

  resolveCollisions() {
    const b = this.world.bounds
    this.position.x = clamp(this.position.x, b.minX + this.radius, b.maxX - this.radius)
    this.position.z = clamp(this.position.z, b.minZ + this.radius, b.maxZ - this.radius)
    for (const o of this.world.obstacles) {
      if (o.type !== 'circle') continue
      const dx = this.position.x - o.x
      const dz = this.position.z - o.z
      const min = o.r + this.radius
      const d2 = dx * dx + dz * dz
      if (d2 < min * min && d2 > 0.0001) {
        const d = Math.sqrt(d2)
        this.position.x = o.x + (dx / d) * min
        this.position.z = o.z + (dz / d) * min
      }
    }
  }

  updateState() {
    const w = this.weapon
    const s = this.state
    s.ammo = w.ammo
    s.mag = w.mag
    s.weapon = this.current
    s.name = w.name
    s.type = w.type
    s.reloading = w.reloading
    s.reloadProgress = w.reloading ? clamp(w.reloadT / w.reloadTime, 0, 1) : 0
    s.health = this.health
    s.bloom = this.bloom
    s.dashCooldown = this.dashCooldown
  }

  getMuzzleWorld() {
    return this.camera.localToWorld(new THREE.Vector3(0.16, -0.1, -0.85))
  }
}
