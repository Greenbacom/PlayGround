// Berimbau blaster + festa junina rocket launcher, with first-person viewmodel.
import * as THREE from 'three'
import { clamp, damp, rand, glowTexture, textTexture } from './utils.js'

export class WeaponSystem {
  constructor(game) {
    this.game = game
    this.current = 0
    this.weapons = ['berimbau', 'foguete']
    this.names = { berimbau: 'BERIMBAU', foguete: 'FOGUETE' }
    this.fireTimer = 0
    this.switchT = 0
    this.kick = 0
    this.flash = 0
    this.rocketAmmo = 3
    this.rocketMax = 3
    this.regen = 0
    this.rapidTime = 0
    this.rockets = []
    this.shotsFired = 0
    this.shotsHit = 0
    this.sway = new THREE.Vector2()
    this.bobOffset = new THREE.Vector2()

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(56, 1, 0.01, 6)
    this.scene.add(this.camera)
    this.scene.add(new THREE.AmbientLight(0xfff0dc, 1.5))
    const key = new THREE.DirectionalLight(0xffd0a0, 2.6)
    key.position.set(0.6, 1.2, 1.4)
    this.scene.add(key)
    const rim = new THREE.DirectionalLight(0x4fe6d0, 1.4)
    rim.position.set(-1.2, 0.2, 0.6)
    this.scene.add(rim)
    const back = new THREE.DirectionalLight(0xff4f9a, 1.1)
    back.position.set(0.2, -0.6, -1)
    this.scene.add(back)

    this.root = new THREE.Group()
    this.basePos = new THREE.Vector3(0.3, -0.23, -0.6)
    this.root.position.copy(this.basePos)
    this.root.scale.setScalar(0.55)
    this.root.rotation.set(0.02, -0.08, 0)
    this.camera.add(this.root)
    this.buildBerimbau()
    this.buildRocket()
    this.setWeapon(0, true)
  }

  buildBerimbau() {
    const g = new THREE.Group()
    const wood = new THREE.MeshStandardMaterial({ color: 0x9a5a2c, roughness: 0.55, metalness: 0.15 })
    const darkWood = new THREE.MeshStandardMaterial({ color: 0x4a2a18, roughness: 0.7 })
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xffe2a0 })
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xffb43d })

    // bow arc — a compact berimbau held like a blaster
    const bow = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.013, 5, 26, Math.PI), wood)
    bow.rotation.z = Math.PI / 2
    bow.position.set(-0.06, 0.02, 0)
    g.add(bow)
    // staff
    const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.017, 0.44, 6), wood)
    staff.position.set(0.08, 0.02, 0)
    g.add(staff)
    // gourd resonator
    const gourd = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 10), darkWood)
    gourd.scale.set(1, 1.1, 0.75)
    gourd.position.set(-0.12, -0.11, 0.02)
    g.add(gourd)
    // string
    const string = new THREE.Mesh(new THREE.CylinderGeometry(0.0035, 0.0035, 0.3, 4), stringMat)
    string.position.set(-0.06, 0.02, 0.02)
    g.add(string)
    // energy coil — the "blaster" part
    const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.044, 0.22, 12), new THREE.MeshStandardMaterial({ color: 0x3a2f48, roughness: 0.35, metalness: 0.65 }))
    coil.rotation.x = Math.PI / 2
    coil.position.set(0.08, 0.1, -0.19)
    g.add(coil)
    const rearRing = new THREE.Mesh(new THREE.TorusGeometry(0.048, 0.007, 4, 14), glowMat)
    rearRing.position.set(0.08, 0.1, -0.075)
    g.add(rearRing)
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.006, 4, 14), glowMat)
      ring.position.set(0.08, 0.1, -0.26 + i * 0.055)
      g.add(ring)
    }
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 7), glowMat)
    core.position.set(0.08, 0.1, -0.31)
    g.add(core)
    // grip
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.075), darkWood)
    grip.position.set(0.08, -0.09, 0.03)
    grip.rotation.x = 0.2
    g.add(grip)

    // little festa ribbon
    const ribbon = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 0.17), new THREE.MeshBasicMaterial({ color: 0xff3d8b, side: THREE.DoubleSide }))
    ribbon.position.set(-0.17, -0.17, -0.02)
    ribbon.rotation.z = 0.35
    g.add(ribbon)

    const flash = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,235,180,1)', 'rgba(255,120,30,0)'),
      color: 0xffc35a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0,
    }))
    flash.position.set(0.08, 0.1, -0.35)
    flash.scale.set(0.3, 0.3, 1)
    g.add(flash)
    this.berimbauFlash = flash
    this.berimbau = g
    g.rotation.set(0.04, -0.28, -0.08)
    this.root.add(g)
  }

  buildRocket() {
    const g = new THREE.Group()
    const tubeMat = new THREE.MeshStandardMaterial({ color: 0x2a7a5a, roughness: 0.55, metalness: 0.2 })
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.72, 14), tubeMat)
    tube.rotation.x = Math.PI / 2
    tube.position.set(0, 0.02, -0.18)
    g.add(tube)
    // festa stripes
    const stripeCols = [0xffcf3f, 0xff3d8b, 0xfff6e6]
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.081, 0.012, 5, 18), new THREE.MeshStandardMaterial({ color: stripeCols[i], roughness: 0.4 }))
      ring.position.set(0, 0.02, -0.4 + i * 0.2)
      g.add(ring)
    }
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.18, 12), new THREE.MeshStandardMaterial({ color: 0xff7a2f, emissive: 0x6a2208, emissiveIntensity: 0.8, roughness: 0.4 }))
    tip.rotation.x = -Math.PI / 2
    tip.position.set(0, 0.02, -0.63)
    g.add(tip)
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.2, 0.09), new THREE.MeshStandardMaterial({ color: 0x241420, roughness: 0.8 }))
    grip.position.set(0, -0.12, 0.03)
    grip.rotation.x = 0.25
    g.add(grip)
    const sight = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.1), new THREE.MeshBasicMaterial({ color: 0x2ee6c8 }))
    sight.position.set(0, 0.11, -0.32)
    g.add(sight)
    const flash = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,230,170,1)', 'rgba(255,110,20,0)'),
      color: 0xffb44a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0,
    }))
    flash.position.set(0, 0.02, -0.75)
    flash.scale.set(0.55, 0.55, 1)
    g.add(flash)
    this.rocketFlash = flash
    this.rocket = g
    this.root.add(g)
  }

  setWeapon(index, silent = false) {
    this.current = index
    this.switchT = 0.28
    this.berimbau.visible = index === 0
    this.rocket.visible = index === 1
    if (!silent) this.game.audio.switchWeapon()
    this.game.onWeaponChange?.(this.current)
  }

  switchWeapon() {
    if (this.switchT > 0.05) return
    this.setWeapon((this.current + 1) % this.weapons.length)
  }

  reset() {
    this.current = 0
    this.berimbau.visible = true
    this.rocket.visible = false
    this.fireTimer = 0
    this.switchT = 0
    this.rocketAmmo = this.rocketMax
    this.regen = 0
    this.rapidTime = 0
    this.kick = 0
    this.flash = 0
    this.shotsFired = 0
    this.shotsHit = 0
    for (const r of this.rockets) {
      this.game.world.scene.remove(r.group)
      r.group.traverse?.((o) => { o.geometry?.dispose?.(); o.material?.dispose?.() })
    }
    this.rockets.length = 0
    this.game.onWeaponChange?.(0)
  }

  update(dt, input) {
    this.fireTimer = Math.max(0, this.fireTimer - dt)
    this.switchT = Math.max(0, this.switchT - dt)
    this.rapidTime = Math.max(0, this.rapidTime - dt)
    this.kick = damp(this.kick, 0, 14, dt)
    this.flash = Math.max(0, this.flash - dt * 9)

    if (input.consumeSwitch()) this.switchWeapon()

    // rocket ammo regen
    if (this.rocketAmmo < this.rocketMax) {
      this.regen += dt
      if (this.regen >= 5.5) {
        this.regen = 0
        this.rocketAmmo++
        this.game.onAmmoChange?.(this.rocketAmmo)
      }
    }

    if (input.isFiring() && this.switchT <= 0.05) {
      this.tryFire()
    }

    this.updateViewmodel(dt)
    this.updateRockets(dt)
  }

  tryFire() {
    if (this.fireTimer > 0) return
    if (this.current === 0) {
      this.fireTimer = this.rapidTime > 0 ? 0.07 : 0.115
      this.fireBerimbau()
    } else {
      if (this.rocketAmmo <= 0) {
        if (this.fireTimer <= 0) {
          this.fireTimer = 0.3
          this.game.audio.tone(180, 0.06, { type: 'square', gain: 0.05 })
          this.game.ui.toast('Sem foguetes — recarregando', 'warn', 1.2)
        }
        return
      }
      this.fireTimer = 0.85
      this.rocketAmmo--
      this.game.onAmmoChange?.(this.rocketAmmo)
      this.fireRocket()
    }
  }

  aim() {
    const origin = this.game.player.camera.position.clone()
    const dir = this.game.player.aimDirection
    const assistAngle = this.game.input.touch ? 0.085 : 0.032
    const assist = this.game.enemies.findAimTarget(origin, dir, assistAngle, 65)
    if (assist) {
      const c = assist.enemy.center()
      dir.copy(c).sub(origin).normalize()
    }
    return { origin, dir }
  }

  fireBerimbau() {
    const { origin, dir } = this.aim()
    const wallDist = this.game.world.rayDistance(origin, dir, 65)
    const hit = this.game.enemies.raycast(origin, dir, Math.min(65, wallDist))
    const muzzle = origin.clone().addScaledVector(dir, 0.55)
      .add(new THREE.Vector3(0, -0.12, 0))
    const right = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize()
    muzzle.addScaledVector(right, 0.16)

    let end = origin.clone().addScaledVector(dir, Math.min(wallDist, 65))
    if (hit) {
      end.copy(hit.point)
      const killed = hit.enemy.takeDamage(10, hit.point)
      this.shotsHit++
      this.game.effects.hit(hit.point, 0xffcf3f, killed ? 12 : 6)
      this.game.onHit?.(killed, hit.enemy)
    }
    this.shotsFired++
    this.game.effects.tracer(muzzle, end, 0xffe6a0, 1)
    this.game.effects.muzzle(muzzle, dir)
    this.game.audio.shot()
    this.game.player.addRecoil(0.009 + rand(-0.002, 0.002), rand(-0.002, 0.002))
    this.kick = 1
    this.flash = 1
  }

  fireRocket() {
    const { origin, dir } = this.aim()
    const start = origin.clone().addScaledVector(dir, 0.7).add(new THREE.Vector3(0, -0.14, 0))
    const group = new THREE.Group()
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.42, 8),
      new THREE.MeshBasicMaterial({ color: 0xffcf3f })
    )
    body.rotation.x = Math.PI / 2
    group.add(body)
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.16, 8), new THREE.MeshBasicMaterial({ color: 0xff3d8b }))
    tip.rotation.x = Math.PI / 2
    tip.position.z = -0.28
    group.add(tip)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,220,160,0.95)', 'rgba(255,90,20,0)'),
      color: 0xffa63d, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }))
    glow.scale.set(0.9, 0.9, 1)
    group.add(glow)
    group.position.copy(start)
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), dir)
    this.game.world.scene.add(group)
    this.rockets.push({ group, dir: dir.clone(), speed: 34, life: 2.4, trail: 0 })
    this.game.effects.muzzle(start, dir)
    this.game.effects.flash(start, 2.4, 0xffb35c, 0.12)
    this.game.audio.rocket()
    this.game.player.addRecoil(0.05, rand(-0.004, 0.004))
    this.kick = 1.6
    this.flash = 1.4
  }

  updateRockets(dt) {
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i]
      r.life -= dt
      const step = r.speed * dt
      const prev = r.group.position.clone()
      r.group.position.addScaledVector(r.dir, step)
      r.trail -= dt
      if (r.trail <= 0) {
        r.trail = 0.025
        this.game.effects.spawnParticles(r.group.position, 1, {
          color: 0xffb35c, color2: 0x6a5a70, speed: 0.8, spread: 0.08,
          life: 0.5, size: 0.45, gravity: 0.4, drag: 0.95,
        })
      }
      let explode = false
      let hitPos = r.group.position.clone()
      // direct enemy proximity
      for (const e of this.game.enemies.list) {
        if (e.dead) continue
        const c = e.center()
        if (c.distanceTo(r.group.position) < e.hitRadius + 0.55) {
          explode = true
          hitPos = r.group.position.clone()
          break
        }
      }
      if (!explode) {
        const wall = this.game.world.rayDistance(prev, r.dir, step + 0.3)
        if (wall < step + 0.25) {
          explode = true
          hitPos = prev.clone().addScaledVector(r.dir, Math.max(0, wall - 0.15))
        }
      }
      if (r.group.position.y < 0.15 || Math.hypot(r.group.position.x, r.group.position.z) > 34) {
        explode = true
        hitPos = r.group.position.clone()
        hitPos.y = Math.max(hitPos.y, 0.2)
      }
      if (r.life <= 0) explode = true

      if (explode) {
        this.explode(hitPos)
        this.game.world.scene.remove(r.group)
        r.group.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.() })
        this.rockets.splice(i, 1)
      }
    }
  }

  explode(pos) {
    this.game.effects.explosion(pos, 1.25)
    this.game.audio.explosion()
    this.game.player.shake = Math.max(this.game.player.shake, 0.8)
    const hits = this.game.enemies.damageInRadius(pos, 4.4, 62)
    if (hits > 0) this.game.onExplosionHit?.(hits)
  }

  updateViewmodel(dt) {
    const p = this.game.player
    const look = p.lookVel
    const swayX = clamp(-look.x * 0.00022, -0.035, 0.035)
    const swayY = clamp(look.y * 0.00018, -0.03, 0.03)
    this.sway.x = damp(this.sway.x, swayX, 8, dt)
    this.sway.y = damp(this.sway.y, swayY, 8, dt)

    const bob = p.speedRatio
    const bx = Math.sin(p.bobTime * 0.5) * 0.006 * bob
    const by = Math.abs(Math.cos(p.bobTime * 0.5)) * 0.008 * bob
    const switchDrop = this.switchT > 0 ? Math.sin((1 - this.switchT / 0.28) * Math.PI) * -0.16 : 0

    this.root.position.x = damp(this.root.position.x, this.basePos.x + this.sway.x + bx, 12, dt)
    this.root.position.y = damp(this.root.position.y, this.basePos.y + this.sway.y + by + switchDrop, 12, dt)
    this.root.position.z = damp(this.root.position.z, this.basePos.z + this.kick * 0.045, 16, dt)
    this.root.rotation.x = damp(this.root.rotation.x, this.kick * 0.09, 14, dt)
    this.root.rotation.y = damp(this.root.rotation.y, this.sway.x * 0.6, 10, dt)
    this.root.rotation.z = damp(this.root.rotation.z, this.sway.y * 0.8, 10, dt)

    const f = clamp(this.flash, 0, 1.4)
    const activeFlash = this.current === 0 ? this.berimbauFlash : this.rocketFlash
    activeFlash.material.opacity = f
    activeFlash.scale.setScalar(0.3 + f * 0.35 + (this.current === 1 ? 0.2 : 0))
    const other = this.current === 0 ? this.rocketFlash : this.berimbauFlash
    other.material.opacity = 0
  }

  resize(aspect) {
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }

  get ammo() {
    return this.current === 0 ? Infinity : this.rocketAmmo
  }
  get name() {
    return this.names[this.weapons[this.current]]
  }
  get accuracy() {
    return this.shotsFired ? this.shotsHit / this.shotsFired : 0
  }
  get rapidActive() {
    return this.rapidTime > 0
  }
}
