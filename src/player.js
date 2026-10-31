// First-person guardian: movement, dash, camera feel and vitals.
import * as THREE from 'three'
import { clamp, damp, rand } from './utils.js'

const EYE = 1.68

export class Player {
  constructor(camera, world, input, audio) {
    this.camera = camera
    this.world = world
    this.input = input
    this.audio = audio
    camera.rotation.order = 'YXZ'
    this.position = new THREE.Vector3(0, 0, 12)
    this.velocity = new THREE.Vector3()
    this.yaw = 0
    this.pitch = -0.02
    this.roll = 0
    this.bobTime = 0
    this.bob = 0
    this.lookVel = { x: 0, y: 0 }
    this.recoilPitch = 0
    this.recoilYaw = 0
    this.shake = 0
    this.maxHealth = 100
    this.maxShield = 50
    this.onDamage = null
    this.onDeath = null
    this.onDash = null
    this.reset()
  }

  reset() {
    this.position.set(0, 0, 12)
    this.velocity.set(0, 0, 0)
    this.yaw = 0
    this.pitch = -0.02
    this.roll = 0
    this.health = this.maxHealth
    this.shield = 0
    this.dead = false
    this.invuln = 0
    this.dashTime = 0
    this.dashCooldown = 0
    this.dashDir = new THREE.Vector3()
    this.recoilPitch = 0
    this.recoilYaw = 0
    this.shake = 0
    this.bob = 0
    this.bobTime = 0
    this.lookVel.x = 0
    this.lookVel.y = 0
    this.fovKick = 0
    this.speedRatio = 0
    this.applyCamera(0)
  }

  get eyePosition() {
    return new THREE.Vector3(this.position.x, EYE + this.bob, this.position.z)
  }

  get aimDirection() {
    const d = new THREE.Vector3()
    this.camera.getWorldDirection(d)
    return d
  }

  forwardVector() {
    return new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
  }

  rightVector() {
    return new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw))
  }

  addRecoil(pitch, yaw = 0) {
    this.recoilPitch += pitch
    this.recoilYaw += yaw
  }

  update(dt) {
    if (this.dead) {
      this.applyCamera(dt)
      return
    }
    const input = this.input
    const [lx, ly] = input.consumeLook()
    this.lookVel.x = damp(this.lookVel.x, lx / Math.max(dt, 0.001), 10, dt)
    this.lookVel.y = damp(this.lookVel.y, ly / Math.max(dt, 0.001), 10, dt)

    this.yaw -= lx
    this.pitch -= ly
    this.pitch = clamp(this.pitch, -1.28, 1.15)

    // dash
    this.dashCooldown = Math.max(0, this.dashCooldown - dt)
    if (input.consumeDash() && this.dashCooldown <= 0 && this.dashTime <= 0) {
      const mv = input.getMove()
      const dir = this.forwardVector().multiplyScalar(mv.y || 1).add(this.rightVector().multiplyScalar(mv.x))
      if (dir.lengthSq() < 0.01) dir.copy(this.forwardVector())
      dir.normalize()
      this.dashDir.copy(dir)
      this.dashTime = 0.22
      this.dashCooldown = 2.1
      this.invuln = Math.max(this.invuln, 0.34)
      this.onDash?.()
    }

    // movement
    const mv = input.getMove()
    const speed = 5.1
    let desired = new THREE.Vector3()
    if (this.dashTime > 0) {
      this.dashTime -= dt
      const k = clamp(this.dashTime / 0.22, 0, 1)
      desired.copy(this.dashDir).multiplyScalar(15.5 * (0.45 + k * 0.55))
      this.invuln = Math.max(this.invuln, 0.05)
    } else {
      desired.copy(this.forwardVector()).multiplyScalar(mv.y * speed)
      desired.add(this.rightVector().multiplyScalar(mv.x * speed))
    }
    const accel = this.dashTime > 0 ? 30 : 13
    this.velocity.x = damp(this.velocity.x, desired.x, accel, dt)
    this.velocity.z = damp(this.velocity.z, desired.z, accel, dt)
    this.position.x += this.velocity.x * dt
    this.position.z += this.velocity.z * dt
    this.world.collide(this.position, 0.44)

    const moving = Math.hypot(this.velocity.x, this.velocity.z)
    this.speedRatio = damp(this.speedRatio, clamp(moving / speed, 0, 1.4), 8, dt)
    this.bobTime += dt * (5.5 + this.speedRatio * 5.5)
    this.bob = Math.sin(this.bobTime) * 0.028 * this.speedRatio

    this.invuln = Math.max(0, this.invuln - dt)
    this.shake = Math.max(0, this.shake - dt * 2.4)
    this.recoilPitch = damp(this.recoilPitch, 0, 9, dt)
    this.recoilYaw = damp(this.recoilYaw, 0, 9, dt)

    // strafe roll
    const strafe = input.getMove().x
    this.roll = damp(this.roll, -strafe * 0.018 - this.lookVel.x * 0.0006, 6, dt)
    this.fovKick = damp(this.fovKick, this.dashTime > 0 ? 7 : 0, 10, dt)

    this.applyCamera(dt)
  }

  applyCamera() {
    const bobY = this.bob
    const shakeX = this.shake > 0 ? rand(-1, 1) * this.shake * 0.035 : 0
    const shakeY = this.shake > 0 ? rand(-1, 1) * this.shake * 0.035 : 0
    this.camera.position.set(
      this.position.x + Math.cos(this.yaw) * 0.03,
      EYE + bobY + shakeY,
      this.position.z - Math.sin(this.yaw) * 0.03
    )
    this.camera.rotation.set(
      this.pitch + this.recoilPitch + shakeX,
      this.yaw + this.recoilYaw,
      this.roll
    )
    const targetFov = (this.input.touch ? 82 : 78) + this.fovKick
    if (Math.abs(this.camera.fov - targetFov) > 0.01) {
      this.camera.fov = damp(this.camera.fov, targetFov, 10, 0.016)
      this.camera.updateProjectionMatrix()
    }
  }

  takeDamage(amount, sourcePos = null) {
    if (this.dead || this.invuln > 0) return 0
    let dmg = amount
    if (this.shield > 0) {
      const absorbed = Math.min(this.shield, dmg)
      this.shield -= absorbed
      dmg -= absorbed
    }
    this.health = Math.max(0, this.health - dmg)
    this.invuln = 0.55
    this.shake = 1
    if (sourcePos) {
      const dx = sourcePos.x - this.position.x
      const dz = sourcePos.z - this.position.z
      this.recoilYaw += clamp((Math.atan2(-dx, -dz) - this.yaw) * 0.08, -0.05, 0.05)
    }
    this.onDamage?.(dmg)
    if (this.health <= 0) {
      this.dead = true
      this.onDeath?.()
    }
    return dmg
  }

  heal(amount) {
    const before = this.health
    this.health = Math.min(this.maxHealth, this.health + amount)
    return this.health - before
  }

  addShield(amount) {
    const before = this.shield
    this.shield = Math.min(this.maxShield, this.shield + amount)
    return this.shield - before
  }

  get healthPct() { return this.health / this.maxHealth }
  get shieldPct() { return this.shield / this.maxShield }
  get dashReady() { return this.dashCooldown <= 0 }
  get dashPct() { return 1 - clamp(this.dashCooldown / 2.1, 0, 1) }
}
