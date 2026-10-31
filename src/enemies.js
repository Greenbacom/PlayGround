import * as THREE from 'three'
import { glowTexture } from './textures.js'

export const ENEMY_TYPES = {
  pandeiro: {
    key: 'pandeiro', name: 'PANDEIRISTA', hp: 58, speed: 2.35, radius: 0.52, height: 2.25,
    color: 0x6e2c5c, armor: 0x2a2430, accent: 0xff3e80, score: 100,
    preferred: 13, fireInterval: 2.5, damage: 9, projectileSpeed: 10.5, scale: 1,
  },
  capoeira: {
    key: 'capoeira', name: 'CAPOEIRISTA', hp: 46, speed: 4.25, radius: 0.48, height: 2.18,
    color: 0x2b6a4d, armor: 0x14241c, accent: 0xd9ff45, score: 135,
    preferred: 0, fireInterval: 1.25, damage: 15, projectileSpeed: 0, scale: 1,
  },
  bruto: {
    key: 'bruto', name: 'BRUTO DO BLOCO', hp: 210, speed: 1.5, radius: 0.82, height: 2.55,
    color: 0x4a4b37, armor: 0x1c1c19, accent: 0xffb03a, score: 280,
    preferred: 8.5, fireInterval: 3.0, damage: 7, projectileSpeed: 8.5, scale: 1.08,
  },
  boss: {
    key: 'boss', name: 'REI MOMO 2.0', hp: 1250, speed: 1.05, radius: 1.4, height: 3.8,
    color: 0x5b1f3d, armor: 0x1c0c14, accent: 0xff3e80, score: 3500,
    preferred: 9.5, fireInterval: 2.4, damage: 11, projectileSpeed: 9, scale: 1.62,
  },
}

const ENEMY_MATS = {
  dark: new THREE.MeshStandardMaterial({ color: 0x101413, roughness: 0.62, metalness: 0.35 }),
  metal: new THREE.MeshStandardMaterial({ color: 0x303735, roughness: 0.45, metalness: 0.55 }),
  skin: new THREE.MeshStandardMaterial({ color: 0x7b4b31, roughness: 0.8 }),
  skin2: new THREE.MeshStandardMaterial({ color: 0x5f3825, roughness: 0.82 }),
  gold: new THREE.MeshStandardMaterial({ color: 0xcfa548, roughness: 0.32, metalness: 0.8 }),
  bone: new THREE.MeshStandardMaterial({ color: 0xe7ddc2, roughness: 0.6 }),
}

function capsule(radius, length, mat, x, y, z, parent) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 4, 8), mat)
  m.position.set(x, y, z)
  m.castShadow = true
  m.receiveShadow = true
  parent?.add(m)
  return m
}

function box(w, h, d, mat, x, y, z, parent) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
  m.position.set(x, y, z)
  m.castShadow = true
  m.receiveShadow = true
  parent?.add(m)
  return m
}

function sphere(radius, mat, x, y, z, parent, seg = 10) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(radius, seg, Math.max(6, seg - 2)), mat)
  m.position.set(x, y, z)
  m.castShadow = true
  m.receiveShadow = true
  parent?.add(m)
  return m
}

function cyl(rt, rb, h, mat, x, y, z, parent, seg = 10) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat)
  m.position.set(x, y, z)
  m.castShadow = true
  m.receiveShadow = true
  parent?.add(m)
  return m
}

function makeGlowSprite(color, scale = 1) {
  const mat = new THREE.SpriteMaterial({
    map: glowTexture(),
    color,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.setScalar(scale)
  return sprite
}

class Enemy {
  constructor(manager, typeKey, position, wave = 1) {
    this.manager = manager
    this.type = ENEMY_TYPES[typeKey]
    this.typeKey = typeKey
    this.wave = wave
    this.maxHp = Math.round(this.type.hp * (1 + (wave - 1) * 0.115))
    this.hp = this.maxHp
    this.alive = true
    this.dead = false
    this.spawning = 0.65
    this.spawnT = 0.65
    this.deathT = 0
    this.phase = Math.random() * 10
    this.strafeDir = Math.random() > 0.5 ? 1 : -1
    this.strafeTimer = 1 + Math.random() * 2
    this.attackCooldown = 0.8 + Math.random() * 1.2
    this.charging = 0
    this.attackT = 0
    this.hitFlash = 0
    this.flashMats = []
    this.bossPhase = 0
    this.bossSummons = 0
    this.headshotCount = 0
    this.lastHitHead = false
    this._tmp = new THREE.Vector3()
    this._tmp2 = new THREE.Vector3()
    this.radius = this.type.radius
    this.height = this.type.height
    this.root = new THREE.Group()
    this.root.position.copy(position)
    this.root.position.y = 0
    this.model = new THREE.Group()
    this.root.add(this.model)
    this.hitMeshes = []
    this.build()
    this.root.scale.setScalar(0.01)
    manager.scene.add(this.root)
    this.spawnFx()
  }

  build() {
    const t = this.type
    const bodyMat = new THREE.MeshStandardMaterial({
      color: t.color, roughness: 0.56, metalness: 0.28,
      emissive: t.color, emissiveIntensity: 0.08,
    })
    const armorMat = new THREE.MeshStandardMaterial({
      color: t.armor, roughness: 0.44, metalness: 0.62,
      emissive: t.armor, emissiveIntensity: 0.05,
    })
    const accentMat = new THREE.MeshStandardMaterial({
      color: t.accent, emissive: t.accent, emissiveIntensity: 1.7,
      roughness: 0.35, metalness: 0.3,
    })
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x1a050a, emissive: t.accent, emissiveIntensity: 2.8, roughness: 0.2, metalness: 0.4,
    })
    this.bodyMat = bodyMat
    this.armorMat = armorMat
    this.accentMat = accentMat
    this.visorMat = visorMat
    this.flashMats.push(bodyMat, armorMat, accentMat)

    const s = t.scale
    this.model.scale.setScalar(s)
    const isBoss = this.typeKey === 'boss'

    // Legs.
    this.legL = new THREE.Group()
    this.legR = new THREE.Group()
    this.legL.position.set(-0.19, 0.94, 0)
    this.legR.position.set(0.19, 0.94, 0)
    this.model.add(this.legL, this.legR)
    for (const leg of [this.legL, this.legR]) {
      const thigh = capsule(this.typeKey === 'bruto' || isBoss ? 0.15 : 0.11, 0.44, this.typeKey === 'capoeira' ? bodyMat : armorMat, 0, -0.23, 0, leg)
      thigh.castShadow = true
      const shin = capsule(0.09, 0.35, armorMat, 0, -0.72, 0.03, leg)
      shin.castShadow = true
      const boot = box(0.2, 0.16, 0.32, ENEMY_MATS.dark, 0, -1.0, 0.08, leg)
      boot.castShadow = true
      const knee = sphere(0.1, accentMat, 0, -0.48, 0.05, leg, 8)
      knee.castShadow = false
    }

    // Torso.
    const torsoY = 1.45
    this.torso = new THREE.Group()
    this.torso.position.y = torsoY
    this.model.add(this.torso)
    if (this.typeKey === 'bruto' || isBoss) {
      const chest = box(isBoss ? 0.95 : 0.82, 0.9, 0.56, bodyMat, 0, 0.12, 0, this.torso)
      const plate = box(isBoss ? 1.0 : 0.88, 0.52, 0.14, armorMat, 0, 0.18, 0.33, this.torso)
      const belt = box(isBoss ? 0.8 : 0.68, 0.16, 0.5, ENEMY_MATS.dark, 0, -0.38, 0, this.torso)
      belt.castShadow = false
      this.addHit(chest, false)
      this.addHit(plate, false)
      this.addHit(belt, false)
    } else {
      const chest = capsule(0.29, 0.44, bodyMat, 0, 0.08, 0, this.torso)
      const vest = box(0.5, 0.48, 0.38, armorMat, 0, 0.08, 0, this.torso)
      vest.castShadow = true
      const belt = box(0.46, 0.13, 0.38, ENEMY_MATS.dark, 0, -0.33, 0, this.torso)
      belt.castShadow = false
      this.addHit(chest, false)
      this.addHit(vest, false)
      this.addHit(belt, false)
    }

    // Chest instrument / speaker.
    if (this.typeKey === 'pandeiro' || this.typeKey === 'capoeira') {
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 16), ENEMY_MATS.bone)
      drum.rotation.x = Math.PI / 2
      drum.position.set(0, 0.08, 0.33)
      this.torso.add(drum)
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.035, 6, 20), accentMat)
      rim.position.set(0, 0.08, 0.4)
      this.torso.add(rim)
      this.addHit(drum, false)
      this.addHit(rim, false)
    }
    if (this.typeKey === 'bruto' || isBoss) {
      const speaker = new THREE.Group()
      speaker.position.set(0, 0.12, 0.4)
      this.torso.add(speaker)
      const sbox = box(isBoss ? 0.72 : 0.58, isBoss ? 0.7 : 0.54, 0.14, ENEMY_MATS.dark, 0, 0, 0, speaker)
      for (const [x, y] of [[-0.17, 0.14], [0.17, 0.14], [0, -0.14]]) {
        const cone = new THREE.Mesh(new THREE.CylinderGeometry(isBoss ? 0.11 : 0.085, isBoss ? 0.14 : 0.11, 0.04, 12), accentMat)
        cone.rotation.x = Math.PI / 2
        cone.position.set(x, y, 0.09)
        speaker.add(cone)
      }
      this.addHit(sbox, false)
    }

    // Head.
    const headY = this.typeKey === 'bruto' ? 2.36 : isBoss ? 2.55 : 2.02
    this.head = new THREE.Group()
    this.head.position.y = headY
    this.model.add(this.head)
    if (isBoss) {
      const skull = sphere(0.4, armorMat, 0, 0, 0, this.head, 12)
      const visor = box(0.58, 0.12, 0.12, visorMat, 0, 0.06, 0.34, this.head)
      visor.castShadow = false
      const crown = new THREE.Group()
      crown.position.y = 0.42
      this.head.add(crown)
      for (let i = 0; i < 5; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.3, 4), accentMat)
        spike.position.set((i - 2) * 0.16, 0.1, 0)
        spike.rotation.z = (i - 2) * 0.1
        crown.add(spike)
      }
      const band = cyl(0.36, 0.36, 0.12, ENEMY_MATS.gold, 0, -0.02, 0, crown, 12)
      band.castShadow = false
      this.addHit(skull, true)
      this.addHit(visor, true)
    } else {
      const skull = sphere(0.25, armorMat, 0, 0, 0, this.head, 10)
      const helmet = box(0.34, 0.2, 0.3, bodyMat, 0, 0.13, -0.02, this.head)
      const visor = box(0.27, 0.07, 0.06, visorMat, 0, 0.02, 0.235, this.head)
      visor.castShadow = false
      const antenna = cyl(0.012, 0.012, 0.34, ENEMY_MATS.dark, 0.18, 0.3, -0.04, this.head, 4)
      antenna.rotation.z = -0.25
      const tip = sphere(0.035, accentMat, 0.23, 0.46, -0.04, this.head, 6)
      tip.castShadow = false
      this.addHit(skull, true)
      this.addHit(helmet, true)
      this.addHit(visor, true)
    }

    // Arms.
    this.armL = new THREE.Group()
    this.armR = new THREE.Group()
    const shoulderY = torsoY + 0.2
    this.armL.position.set(-(isBoss ? 0.62 : this.typeKey === 'bruto' ? 0.52 : 0.37), shoulderY, 0)
    this.armR.position.set(isBoss ? 0.62 : this.typeKey === 'bruto' ? 0.52 : 0.37, shoulderY, 0)
    this.model.add(this.armL, this.armR)
    for (const [arm, side] of [[this.armL, -1], [this.armR, 1]]) {
      const pad = box(isBoss ? 0.34 : 0.24, 0.18, 0.3, bodyMat, 0, 0.06, 0, arm)
      const upper = capsule(isBoss ? 0.12 : 0.09, 0.35, this.typeKey === 'capoeira' ? bodyMat : armorMat, 0, -0.3, 0, arm)
      const fore = capsule(0.075, 0.32, armorMat, 0, -0.68, 0.02, arm)
      const hand = sphere(0.09, ENEMY_MATS.skin2, 0, -0.91, 0.04, arm, 8)
      const cuff = cyl(0.1, 0.1, 0.08, accentMat, 0, -0.86, 0.02, arm, 8)
      cuff.castShadow = false
      this.addHit(pad, false)
      this.addHit(upper, false)
      this.addHit(fore, false)
      this.addHit(hand, false)
      if (this.typeKey === 'bruto') {
        const shield = box(0.12, 0.62, 0.52, armorMat, side * 0.17, -0.45, 0.06, arm)
        const shieldGlow = box(0.13, 0.08, 0.4, accentMat, side * 0.18, -0.36, 0.07, arm)
        shieldGlow.castShadow = false
        this.addHit(shield, false)
      }
      if (this.typeKey === 'capoeira') {
        // A curved berimbau stave across the back.
        const bow = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.016, 5, 24, Math.PI * 1.1), ENEMY_MATS.wood || ENEMY_MATS.dark)
        bow.position.set(0, 1.35, -0.27)
        bow.rotation.z = 1.2
        bow.castShadow = false
        this.model.add(bow)
      }
    }

    // Extra boss details.
    if (isBoss) {
      for (const side of [-1, 1]) {
        const shoulderDrum = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.42, 16), bodyMat)
        shoulderDrum.rotation.z = Math.PI / 2
        shoulderDrum.position.set(side * 0.74, torsoY + 0.28, 0)
        this.model.add(shoulderDrum)
        const drumRim = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.035, 6, 20), accentMat)
        drumRim.rotation.y = Math.PI / 2
        drumRim.position.set(side * 0.96, torsoY + 0.28, 0)
        this.model.add(drumRim)
        this.addHit(shoulderDrum, false)
      }
      const cape = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.7), new THREE.MeshStandardMaterial({ color: 0x9d163f, roughness: 0.9, side: THREE.DoubleSide, transparent: true, opacity: 0.86 }))
      cape.position.set(0, 1.2, -0.35)
      cape.rotation.x = 0.2
      this.model.add(cape)
      this.cape = cape
      const aura = makeGlowSprite(0xff3e80, 3.8)
      aura.position.set(0, 1.8, 0)
      aura.material.opacity = 0.16
      this.root.add(aura)
      this.aura = aura
    }

    // Health bar.
    this.hpBar = new THREE.Group()
    this.hpBar.position.y = this.type.height + 0.36
    this.root.add(this.hpBar)
    const bg = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0x050806, transparent: true, opacity: 0.72, depthWrite: false }))
    bg.scale.set(0.95, 0.11, 1)
    this.hpBar.add(bg)
    this.hpFill = new THREE.Sprite(new THREE.SpriteMaterial({ color: t.accent, transparent: true, opacity: 0.95, depthWrite: false }))
    this.hpFill.center.set(0, 0.5)
    this.hpFill.position.x = -0.43
    this.hpFill.scale.set(0.86, 0.055, 1)
    this.hpBar.add(this.hpFill)
    this.hpBar.visible = false
    if (isBoss) this.hpBar.visible = false

    // Weapon/charge orb for ranged enemies.
    if (this.typeKey !== 'capoeira') {
      this.chargeOrb = makeGlowSprite(t.accent, 0.55)
      this.chargeOrb.position.set(0, 1.55, 0.62)
      this.chargeOrb.material.opacity = 0
      this.model.add(this.chargeOrb)
    }

    // Per-enemy material clones so hit flashes stay local.
    this.model.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.material = obj.material.clone()
        obj.material.transparent = true
        if (obj.material.emissive) {
          obj.material.userData = { baseEmissive: obj.material.emissive.getHex(), baseIntensity: obj.material.emissiveIntensity }
        }
        this.flashMats.push(obj.material)
      }
    })
  }

  addHit(mesh, head) {
    mesh.userData.enemy = this
    mesh.userData.head = head
    this.hitMeshes.push(mesh)
  }

  spawnFx() {
    this.manager.effects.ring(new THREE.Vector3(this.root.position.x, 0.03, this.root.position.z), this.type.accent, 0.2, 2.6, 0.55)
    this.manager.effects.emitBurst(new THREE.Vector3(this.root.position.x, 1.2, this.root.position.z), this.type.accent, 26, { speed: 4.5, size: 0.11, life: 0.6, gravity: -1 })
    this.manager.audio.play('spawn')
  }

  getChest(target = new THREE.Vector3()) {
    return target.set(this.root.position.x, 1.35 * this.type.scale, this.root.position.z)
  }

  getHead(target = new THREE.Vector3()) {
    const y = (this.typeKey === 'bruto' ? 2.36 : this.typeKey === 'boss' ? 2.55 : 2.02) * this.type.scale
    return target.set(this.root.position.x, y, this.root.position.z)
  }

  takeDamage(amount, headshot, point) {
    if (!this.alive || this.spawning > 0) return false
    this.hp -= amount
    this.lastHitHead = headshot
    this.hitFlash = 0.09
    if (headshot) this.headshotCount++
    for (const m of this.flashMats) {
      if (m.emissive) m.emissiveIntensity = 2.8
      if (m.emissive) m.emissive.setHex(0xffffff)
    }
    if (point) {
      this.manager.effects.emitBurst(point, headshot ? 0xffd23f : 0xff8b4a, headshot ? 14 : 9, { speed: 3.5, size: 0.09, life: 0.4, gravity: 8 })
    }
    if (this.hp <= 0) {
      this.die(headshot)
      return true
    }
    this.hpBar.visible = true
    this.updateHealthBar()
    return false
  }

  updateHealthBar() {
    const ratio = Math.max(0, this.hp / this.maxHp)
    this.hpFill.scale.x = Math.max(0.001, 0.86 * ratio)
    this.hpFill.position.x = -0.43
    if (ratio < 0.35) this.hpFill.material.color.setHex(0xff3e80)
  }

  die(headshot = false) {
    if (this.dead) return
    this.dead = true
    this.alive = false
    this.deathT = 1.6
    this.hpBar.visible = false
    this.manager.effects.emitBurst(new THREE.Vector3(this.root.position.x, 1.2, this.root.position.z), this.type.accent, 34, { speed: 5.5, size: 0.12, life: 0.75, gravity: 3 })
    this.manager.effects.emitBurst(new THREE.Vector3(this.root.position.x, 1.2, this.root.position.z), 0xffc06a, 18, { speed: 3, size: 0.09, life: 0.55, gravity: 5 })
    this.manager.effects.ring(new THREE.Vector3(this.root.position.x, 0.04, this.root.position.z), this.type.accent, 0.4, 3.8, 0.6)
    if (this.typeKey === 'boss') {
      this.manager.effects.floatText(new THREE.Vector3(this.root.position.x, 3.8, this.root.position.z), 'REI MOMO CAIU', '#ffd23f', 2.2)
    }
    this.manager.onEnemyKilled(this, headshot)
    this.manager.removeTargets(this)
  }

  update(dt, player, allEnemies) {
    if (this.dead) {
      this.deathT -= dt
      const t = Math.max(0, this.deathT / 1.6)
      this.model.rotation.x = (1 - t) * 1.5
      this.model.position.y = -(1 - t) * 0.55
      this.model.scale.setScalar(this.type.scale * (0.8 + t * 0.2))
      this.root.rotation.y += dt * (1 - t) * 2
      if (this.deathT <= 0) this.dispose()
      return
    }

    if (this.spawning > 0) {
      this.spawning -= dt
      const t = 1 - Math.max(0, this.spawning) / this.spawnT
      const ease = 1 - Math.pow(1 - t, 3)
      this.root.scale.setScalar(0.05 + ease * 0.95)
      this.model.position.y = (1 - ease) * 0.25
      if (this.spawning <= 0) {
        this.root.scale.setScalar(1)
        this.model.position.y = 0
        this.manager.effects.ring(new THREE.Vector3(this.root.position.x, 0.03, this.root.position.z), this.type.accent, 1.4, 3.2, 0.3)
      }
      return
    }

    this.hitFlash -= dt
    if (this.hitFlash <= 0) {
      for (const m of this.flashMats) {
        if (m.emissive) {
          m.emissiveIntensity = m.userData?.baseIntensity ?? (m === this.bodyMat ? 0.08 : m === this.accentMat ? 1.7 : 0.05)
          m.emissive.setHex(m.userData?.baseEmissive ?? 0x000000)
        }
      }
    }

    const dx = player.position.x - this.root.position.x
    const dz = player.position.z - this.root.position.z
    const dist = Math.hypot(dx, dz)
    const targetAngle = Math.atan2(dx, dz)
    let angleDiff = targetAngle - this.root.rotation.y
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
    this.root.rotation.y += angleDiff * Math.min(1, dt * (this.typeKey === 'capoeira' ? 9 : 4.5))

    this.phase += dt * (this.typeKey === 'capoeira' ? 8 : this.typeKey === 'bruto' ? 2.4 : 4.2)
    const moving = this.updateMovement(dt, player, dist, allEnemies)
    this.animate(dt, moving, dist)

    // Ranged attacks.
    if (this.typeKey !== 'capoeira') {
      this.attackCooldown -= dt
      if (this.charging > 0) {
        this.charging -= dt
        const t = 1 - this.charging / (this.typeKey === 'boss' ? 0.62 : 0.55)
        if (this.chargeOrb) {
          this.chargeOrb.material.opacity = 0.2 + t * 0.8
          this.chargeOrb.scale.setScalar(0.35 + t * 0.55)
        }
        if (this.charging <= 0) this.releaseAttack(player)
      } else if (this.attackCooldown <= 0 && dist < (this.typeKey === 'boss' ? 30 : 24)) {
        this.charging = this.typeKey === 'boss' ? 0.62 : 0.55
        this.attackCooldown = this.type.fireInterval * (0.85 + Math.random() * 0.4)
        if (this.chargeOrb) this.chargeOrb.material.opacity = 0.4
      }
    } else {
      this.attackCooldown -= dt
      if (this.attackT > 0) {
        this.attackT -= dt
        if (this.attackT <= 0.12 && this.attackT + dt > 0.12 && dist < 2.7) {
          this.manager.damagePlayer(this.type.damage, this.root.position)
          this.manager.effects.emitBurst(this.manager.playerChest(), 0xff3e80, 12, { speed: 3, size: 0.09, life: 0.4, gravity: 4 })
        }
      } else if (this.attackCooldown <= 0 && dist < 2.45) {
        this.attackT = 0.36
        this.attackCooldown = this.type.fireInterval
      }
    }

    // Boss specials.
    if (this.typeKey === 'boss') {
      const hpRatio = this.hp / this.maxHp
      if (hpRatio < 0.66 && this.bossPhase < 1) {
        this.bossPhase = 1
        this.radialAttack()
        this.summonAdds()
      }
      if (hpRatio < 0.33 && this.bossPhase < 2) {
        this.bossPhase = 2
        this.radialAttack()
        this.summonAdds()
        this.accentMat.emissiveIntensity = 2.8
        if (this.aura) this.aura.material.color.setHex(0xff7a2a)
      }
      if (this.attackCooldown < -3.5) {
        this.radialAttack()
        this.attackCooldown = 1.2
      }
    }

    if (this.chargeOrb && this.charging <= 0) this.chargeOrb.material.opacity *= Math.pow(0.001, dt)

    if (this.hpBar.visible) {
      this.hpBar.position.y = this.type.height + 0.36
    }
    if (this.aura) this.aura.material.opacity = 0.12 + Math.sin(this.phase * 0.7) * 0.05
    if (this.cape) this.cape.rotation.x = 0.2 + Math.sin(this.phase * 0.5) * 0.06
  }

  updateMovement(dt, player, dist, allEnemies) {
    const t = this.type
    let mx = 0
    let mz = 0
    let moving = false
    if (this.typeKey === 'capoeira') {
      if (dist > 1.9) {
        mx = (player.position.x - this.root.position.x) / Math.max(0.1, dist)
        mz = (player.position.z - this.root.position.z) / Math.max(0.1, dist)
        moving = true
      }
      if (this.attackT > 0) {
        mx *= 1.8
        mz *= 1.8
        moving = true
      }
    } else {
      this.strafeTimer -= dt
      if (this.strafeTimer <= 0) {
        this.strafeDir *= -1
        this.strafeTimer = 1.4 + Math.random() * 2.2
      }
      const preferred = t.preferred
      if (dist > preferred + 1.5) {
        mx = (player.position.x - this.root.position.x) / Math.max(0.1, dist)
        mz = (player.position.z - this.root.position.z) / Math.max(0.1, dist)
        moving = true
      } else if (dist < preferred - 2.2) {
        mx = -(player.position.x - this.root.position.x) / Math.max(0.1, dist)
        mz = -(player.position.z - this.root.position.z) / Math.max(0.1, dist)
        moving = true
      }
      const px = -(player.position.z - this.root.position.z) / Math.max(0.1, dist)
      const pz = (player.position.x - this.root.position.x) / Math.max(0.1, dist)
      mx += px * 0.55 * this.strafeDir
      mz += pz * 0.55 * this.strafeDir
      if (Math.abs(mx) + Math.abs(mz) > 0.05) moving = true
    }

    // Separation from other enemies.
    for (const other of allEnemies) {
      if (other === this || !other.alive) continue
      const ox = this.root.position.x - other.root.position.x
      const oz = this.root.position.z - other.root.position.z
      const d = Math.hypot(ox, oz)
      const min = this.radius + other.radius
      if (d > 0.001 && d < min) {
        const push = (min - d) / min * 1.8
        mx += (ox / d) * push
        mz += (oz / d) * push
      }
    }

    const len = Math.hypot(mx, mz)
    if (len > 0.001) {
      mx /= len
      mz /= len
      const speed = t.speed * (this.typeKey === 'boss' ? (this.bossPhase === 2 ? 1.25 : 1) : 1)
      this.moveWithCollisions(mx * speed * dt, mz * speed * dt)
    }
    return moving
  }

  moveWithCollisions(dx, dz) {
    const nx = this.root.position.x + dx
    const nz = this.root.position.z + dz
    const r = this.radius
    let x = THREE.MathUtils.clamp(nx, -23.2 + r, 23.2 - r)
    let z = THREE.MathUtils.clamp(nz, -23.2 + r, 23.2 - r)
    for (const c of this.manager.world.colliders) {
      const minX = c.x - c.hx - r
      const maxX = c.x + c.hx + r
      const minZ = c.z - c.hz - r
      const maxZ = c.z + c.hz + r
      if (x > minX && x < maxX && z > minZ && z < maxZ) {
        const left = x - minX
        const right = maxX - x
        const top = z - minZ
        const bottom = maxZ - z
        const m = Math.min(left, right, top, bottom)
        if (m === left) x = minX
        else if (m === right) x = maxX
        else if (m === top) z = minZ
        else z = maxZ
      }
    }
    this.root.position.x = x
    this.root.position.z = z
  }

  animate(dt, moving, dist) {
    const walk = moving ? 1 : 0
    const swing = Math.sin(this.phase) * walk
    const swing2 = Math.sin(this.phase + Math.PI) * walk
    if (this.typeKey === 'capoeira') {
      this.legL.rotation.x = swing * 0.9 + (this.attackT > 0 ? Math.sin((1 - this.attackT / 0.36) * Math.PI) * 1.3 : 0)
      this.legR.rotation.x = swing2 * 0.9
      this.armL.rotation.z = 0.6 + Math.sin(this.phase * 0.8) * 0.6
      this.armR.rotation.z = -0.6 - Math.cos(this.phase * 0.8) * 0.6
      this.armL.rotation.x = swing * 0.7
      this.armR.rotation.x = swing2 * 0.7
      this.torso.rotation.y = Math.sin(this.phase * 0.7) * 0.22
      this.model.position.y = Math.abs(Math.sin(this.phase)) * 0.08
    } else {
      this.legL.rotation.x = swing * 0.55
      this.legR.rotation.x = swing2 * 0.55
      this.armL.rotation.x = swing2 * 0.35 - 0.2
      this.armR.rotation.x = swing * 0.35 - 0.2
      this.armL.rotation.z = 0.08
      this.armR.rotation.z = -0.08
      this.model.position.y = Math.abs(Math.sin(this.phase * 2)) * 0.035
      this.torso.rotation.z = Math.sin(this.phase * 0.5) * 0.025
    }
    if (this.typeKey === 'boss') {
      this.torso.rotation.z = Math.sin(this.phase * 0.35) * 0.045
      this.armL.rotation.x += Math.sin(this.phase * 0.4) * 0.15
      this.armR.rotation.x -= Math.sin(this.phase * 0.4) * 0.15
    }
    if (this.charging > 0) {
      this.armL.rotation.x = -0.9
      this.armR.rotation.x = -0.9
    }
    if (this.chargeOrb) {
      this.chargeOrb.position.set(0, 1.55 * this.type.scale, 0.62 * this.type.scale)
    }
  }

  releaseAttack(player) {
    const from = new THREE.Vector3(this.root.position.x, 1.5 * this.type.scale, this.root.position.z)
    const target = player.chest
    const dir = target.clone().sub(from).normalize()
    if (this.typeKey === 'boss') {
      const count = this.bossPhase === 2 ? 4 : 3
      for (let i = 0; i < count; i++) {
        const d = dir.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), (i - (count - 1) / 2) * 0.075)
        this.manager.spawnProjectile(from, d, this.type, this.type.damage + 2)
      }
    } else if (this.typeKey === 'bruto') {
      for (let i = 0; i < 3; i++) {
        const d = dir.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), (i - 1) * 0.07)
        this.manager.spawnProjectile(from, d, this.type, this.type.damage)
      }
    } else {
      this.manager.spawnProjectile(from, dir, this.type, this.type.damage)
    }
    this.manager.audio.play('enemyShot')
    if (this.chargeOrb) this.chargeOrb.material.opacity = 0
  }

  radialAttack() {
    const from = new THREE.Vector3(this.root.position.x, 1.4 * this.type.scale, this.root.position.z)
    const count = 16
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      const d = new THREE.Vector3(Math.cos(a), 0.05, Math.sin(a)).normalize()
      this.manager.spawnProjectile(from, d, this.type, 8)
    }
    this.manager.audio.play('boss')
    this.manager.effects.ring(new THREE.Vector3(this.root.position.x, 0.05, this.root.position.z), 0xff3e80, 0.6, 7, 0.8)
  }

  summonAdds() {
    if (this.bossSummons >= 2) return
    this.bossSummons++
    const positions = [
      new THREE.Vector3(-18, 0, -16),
      new THREE.Vector3(18, 0, -16),
    ]
    positions.forEach((p, i) => {
      const enemy = this.manager.spawn('capoeira', p, this.wave, true)
      if (enemy) enemy.attackCooldown = 1.5
    })
  }

  dispose() {
    this.manager.scene.remove(this.root)
    this.root.traverse((obj) => {
      if (obj.isMesh) {
        obj.geometry?.dispose?.()
        obj.material?.dispose?.()
      }
    })
    this.manager.removeEnemy(this)
  }
}

class Projectile {
  constructor(manager, from, dir, type, damage) {
    this.manager = manager
    this.damage = damage
    this.life = 5
    this.radius = 0.18
    this.type = type
    this.dir = dir.clone()
    this.root = new THREE.Group()
    this.root.position.copy(from)
    const color = type.accent
    const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 3.2, roughness: 0.2, metalness: 0.2 })
    const orb = new THREE.Mesh(new THREE.SphereGeometry(this.radius, 10, 8), mat)
    this.root.add(orb)
    const glow = makeGlowSprite(color, 1.05)
    glow.material.opacity = 0.8
    this.root.add(glow)
    manager.scene.add(this.root)
    this.speed = type.projectileSpeed || 9
    this.trailT = 0
  }

  update(dt, playerChest) {
    this.life -= dt
    if (this.life <= 0) return false
    this.root.position.addScaledVector(this.dir, this.speed * dt)
    this.trailT -= dt
    if (this.trailT <= 0) {
      this.trailT = 0.05
      this.manager.effects.emitTrail(this.root.position, this.type.accent, 1, { size: 0.18 })
    }
    if (this.root.position.y < 0.15) return false
    if (this.root.position.distanceTo(playerChest) < 0.68) {
      this.manager.damagePlayer(this.damage, this.root.position)
      this.manager.effects.emitBurst(this.root.position, this.type.accent, 18, { speed: 3.5, size: 0.1, life: 0.4, gravity: 2 })
      return false
    }
    return true
  }

  dispose() {
    this.manager.scene.remove(this.root)
    this.root.traverse((o) => { if (o.isMesh) { o.geometry?.dispose?.(); o.material?.dispose?.() } })
  }
}

export class EnemyManager {
  constructor(scene, world, effects, audio, callbacks = {}) {
    this.scene = scene
    this.world = world
    this.effects = effects
    this.audio = audio
    this.callbacks = callbacks
    this.enemies = []
    this.projectiles = []
    this.player = null
    this.boss = null
    this._playerChest = new THREE.Vector3()
    this.wave = 1
  }

  setPlayer(player) { this.player = player }

  playerChest() {
    return this._playerChest.set(this.player.position.x, this.player.position.y + 1.1, this.player.position.z)
  }

  spawn(typeKey, position, wave = 1, isAdd = false) {
    if (!ENEMY_TYPES[typeKey]) return null
    const pos = position.clone()
    pos.y = 0
    const enemy = new Enemy(this, typeKey, pos, wave)
    this.enemies.push(enemy)
    if (typeKey === 'boss') {
      this.boss = enemy
      this.callbacks.onBossSpawn?.(enemy)
    }
    if (isAdd) this.callbacks.onAdd?.(enemy)
    return enemy
  }

  removeTargets(enemy) {
    enemy.hitMeshes.length = 0
  }

  removeEnemy(enemy) {
    const i = this.enemies.indexOf(enemy)
    if (i >= 0) this.enemies.splice(i, 1)
    if (this.boss === enemy) this.boss = null
  }

  onEnemyKilled(enemy, headshot) {
    this.callbacks.onKill?.(enemy, headshot)
    if (enemy.typeKey === 'boss') this.callbacks.onBossDeath?.(enemy)
  }

  damagePlayer(amount, source) {
    this.callbacks.onPlayerDamage?.(amount, source)
  }

  spawnProjectile(from, dir, type, damage) {
    this.projectiles.push(new Projectile(this, from, dir, type, damage))
  }

  getHitMeshes() {
    const list = []
    for (const e of this.enemies) {
      if (!e.alive || e.spawning > 0) continue
      for (const m of e.hitMeshes) list.push(m)
    }
    return list
  }

  aliveCount() {
    return this.enemies.filter((e) => e.alive).length
  }

  update(dt, player) {
    this.player = player
    this.wave = player.wave || 1
    const chest = this.playerChest()
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i]
      e.update(dt, player, this.enemies)
    }
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i]
      if (!p.update(dt, chest)) {
        p.dispose()
        this.projectiles.splice(i, 1)
      }
    }
  }

  clear() {
    for (const e of this.enemies) {
      this.scene.remove(e.root)
    }
    for (const p of this.projectiles) p.dispose()
    this.enemies.length = 0
    this.projectiles.length = 0
    this.boss = null
  }

  getBoss() {
    return this.boss
  }
}
