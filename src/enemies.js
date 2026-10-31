import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

const TAU = Math.PI * 2
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const rand = (a, b) => a + Math.random() * (b - a)

const ENEMY_TYPES = {
  vespa: {
    name: 'VESPA',
    hp: 52,
    speed: 4.1,
    radius: 0.78,
    scale: 0.92,
    altitude: [3.4, 6.2],
    orbit: [6.0, 10.0],
    fireMin: 2.4,
    fireMax: 3.8,
    projectileDamage: 8,
    coreDamage: 3,
    color: 0xff7a35,
    eye: 0xffb703,
    score: 100,
  },
  urubu: {
    name: 'URUBU',
    hp: 118,
    speed: 2.5,
    radius: 1.0,
    scale: 1.22,
    altitude: [3.0, 5.6],
    orbit: [7.5, 12.0],
    fireMin: 1.9,
    fireMax: 3.0,
    projectileDamage: 13,
    coreDamage: 6,
    color: 0xff3b2f,
    eye: 0xff4d3d,
    score: 250,
  },
  colosso: {
    name: 'COLOSSO',
    hp: 2100,
    speed: 1.35,
    radius: 2.9,
    scale: 3.1,
    altitude: [4.6, 6.4],
    orbit: [8.5, 11.5],
    fireMin: 1.2,
    fireMax: 2.0,
    projectileDamage: 18,
    coreDamage: 12,
    color: 0xff4326,
    eye: 0xffd166,
    score: 5000,
    boss: true,
  },
}

let droneGeoCache = null
function getDroneGeometry() {
  if (droneGeoCache) return droneGeoCache
  const chassisParts = []
  const body = new THREE.IcosahedronGeometry(0.44, 1)
  body.scale(1.1, 0.72, 1.25)
  chassisParts.push(body)
  // nose
  const nose = new THREE.ConeGeometry(0.19, 0.5, 6)
  nose.rotateX(Math.PI / 2)
  nose.translate(0, 0, 0.46)
  chassisParts.push(nose)
  // arms
  for (const side of [-1, 1]) {
    const arm = new THREE.BoxGeometry(0.85, 0.08, 0.14)
    arm.translate(side * 0.5, 0.05, 0)
    chassisParts.push(arm)
    const pod = new THREE.CylinderGeometry(0.18, 0.18, 0.17, 8)
    pod.translate(side * 0.87, 0.03, 0)
    chassisParts.push(pod)
    const fin = new THREE.BoxGeometry(0.05, 0.3, 0.36)
    fin.translate(side * 0.36, -0.16, -0.12)
    chassisParts.push(fin)
  }
  const top = new THREE.BoxGeometry(0.28, 0.09, 0.5)
  top.translate(0, 0.29, -0.06)
  chassisParts.push(top)
  const chassis = mergeGeometries(chassisParts.map((g) => (g.index ? g.toNonIndexed() : g)))

  const armorParts = []
  const hood = new THREE.SphereGeometry(0.47, 8, 5, 0, TAU, 0, Math.PI / 2)
  hood.scale(1.1, 0.45, 1.2)
  hood.translate(0, 0.18, 0)
  armorParts.push(hood)
  for (const side of [-1, 1]) {
    const panel = new THREE.BoxGeometry(0.7, 0.11, 0.36)
    panel.rotateZ(side * 0.12)
    panel.translate(side * 0.46, -0.1, 0)
    armorParts.push(panel)
  }
  const armor = mergeGeometries(armorParts.map((g) => (g.index ? g.toNonIndexed() : g)))

  const bladeParts = []
  for (let i = 0; i < 3; i++) {
    const blade = new THREE.BoxGeometry(0.55, 0.022, 0.09)
    blade.rotateY((i / 3) * TAU)
    blade.translate(0, 0, 0)
    bladeParts.push(blade)
  }
  const blades = mergeGeometries(bladeParts.map((g) => (g.index ? g.toNonIndexed() : g)))

  droneGeoCache = { chassis, armor, blades }
  return droneGeoCache
}

export class EnemyManager {
  constructor(scene, world, effects, { audio, onKill, onCoreHit, onPlayerHit, onSpawn } = {}) {
    this.scene = scene
    this.world = world
    this.effects = effects
    this.audio = audio
    this.onKill = onKill
    this.onCoreHit = onCoreHit
    this.onPlayerHit = onPlayerHit
    this.onSpawn = onSpawn

    this.enemies = []
    this.projectiles = []
    this.boss = null
    this.time = 0

    this.projectileMesh = this.makeProjectilePool()
  }

  makeProjectilePool() {
    const geo = new THREE.IcosahedronGeometry(0.16, 1)
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      toneMapped: false,
      transparent: true,
      opacity: 0.95,
    })
    const mesh = new THREE.InstancedMesh(geo, mat, 96)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false
    mesh.count = 96
    const zero = new THREE.Matrix4().makeScale(0, 0, 0)
    for (let i = 0; i < 96; i++) mesh.setMatrixAt(i, zero)
    const color = new THREE.Color(1, 0.3, 0.15)
    for (let i = 0; i < 96; i++) mesh.setColorAt(i, color)
    this.scene.add(mesh)

    // additive glow points that follow projectiles
    const positions = new Float32Array(96 * 3)
    const geo2 = new THREE.BufferGeometry()
    geo2.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat2 = new THREE.PointsMaterial({
      color: 0xff7a35,
      size: 0.42,
      map: this.pointTexture(),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      toneMapped: false,
    })
    this.glowPoints = new THREE.Points(geo2, mat2)
    this.glowPoints.frustumCulled = false
    this.scene.add(this.glowPoints)
    this._glowPositions = positions

    return mesh
  }

  pointTexture() {
    if (this._pt) return this._pt
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const x = c.getContext('2d')
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 31)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.25, 'rgba(255,200,120,0.8)')
    g.addColorStop(0.6, 'rgba(255,90,40,0.22)')
    g.addColorStop(1, 'rgba(255,40,20,0)')
    x.fillStyle = g
    x.fillRect(0, 0, 64, 64)
    this._pt = new THREE.CanvasTexture(c)
    this._pt.colorSpace = THREE.SRGBColorSpace
    return this._pt
  }

  spawn(typeName, positionOverride = null) {
    const type = ENEMY_TYPES[typeName]
    if (!type) return null
    const geo = getDroneGeometry()
    const group = new THREE.Group()
    const scale = type.scale
    group.scale.setScalar(scale)

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1c2422,
      roughness: 0.35,
      metalness: 0.72,
      emissive: 0x050807,
      emissiveIntensity: 1,
    })
    const armorMat = new THREE.MeshStandardMaterial({
      color: type.color,
      roughness: 0.38,
      metalness: 0.55,
      emissive: type.color,
      emissiveIntensity: 0.22,
    })
    const eyeMat = new THREE.MeshBasicMaterial({ color: type.eye, toneMapped: false })
    const ringMat = new THREE.MeshBasicMaterial({
      color: type.color,
      transparent: true,
      opacity: 0.7,
      toneMapped: false,
      side: THREE.DoubleSide,
    })

    const chassis = new THREE.Mesh(geo.chassis, bodyMat)
    chassis.castShadow = true
    group.add(chassis)
    const armor = new THREE.Mesh(geo.armor, armorMat)
    armor.castShadow = true
    group.add(armor)

    // rotors
    const rotors = []
    for (const side of [-1, 1]) {
      const rotor = new THREE.Group()
      rotor.position.set(side * 0.87, 0.13, 0)
      const blades = new THREE.Mesh(geo.blades, new THREE.MeshStandardMaterial({
        color: 0x232b29,
        roughness: 0.3,
        metalness: 0.8,
        transparent: true,
        opacity: 0.8,
      }))
      rotor.add(blades)
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.018, 4, 20),
        ringMat.clone()
      )
      ring.rotation.x = Math.PI / 2
      rotor.add(ring)
      group.add(rotor)
      rotors.push(rotor)
    }

    // eye
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.125, 8, 6), eyeMat)
    eye.position.set(0, 0.02, 0.48)
    group.add(eye)
    const eyeGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.pointTexture(),
        color: type.eye,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
    )
    eyeGlow.scale.set(0.5, 0.5, 1)
    eyeGlow.position.copy(eye.position)
    group.add(eyeGlow)

    // halo ring
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.012, 4, 36), ringMat)
    halo.rotation.x = Math.PI / 2.3
    group.add(halo)
    const halo2 = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.008, 4, 36), ringMat.clone())
    halo2.rotation.set(Math.PI / 2, 0.3, 0.4)
    halo2.material.opacity = 0.32
    group.add(halo2)

    // under glow
    const underGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.pointTexture(),
        color: type.color,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
    )
    underGlow.scale.set(1.6, 1.6, 1)
    underGlow.position.y = -0.2
    group.add(underGlow)

    if (type.boss) {
      const ringBoss = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.04, 5, 48),
        new THREE.MeshBasicMaterial({ color: 0xffb703, transparent: true, opacity: 0.55, toneMapped: false })
      )
      ringBoss.rotation.x = Math.PI / 2
      group.add(ringBoss)
      group.userData.bossRing = ringBoss
      const crown = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1.2, 5),
        new THREE.MeshStandardMaterial({ color: 0xd1a13d, metalness: 0.7, roughness: 0.3, emissive: 0x4a2a00 })
      )
      crown.position.y = 0.68
      crown.rotation.z = Math.PI
      group.add(crown)
    }

    // spawn position
    let pos
    if (positionOverride) {
      pos = positionOverride.clone()
    } else {
      const a = Math.random() * TAU
      const r = 30 + Math.random() * 8
      pos = new THREE.Vector3(Math.cos(a) * r, rand(7, 13), -3 + Math.sin(a) * r)
      if (type.boss) pos.set(0, 9.5, -27)
    }
    group.position.copy(pos)

    const angle = Math.atan2(pos.x, pos.z)
    const enemy = {
      type: typeName,
      def: type,
      group,
      position: group.position,
      hp: type.hp,
      maxHp: type.hp,
      scale,
      radius: type.radius,
      hitRadius: type.radius * 0.85,
      orbitAngle: angle + Math.PI,
      orbitRadius: rand(type.orbit[0], type.orbit[1]),
      altitude: rand(type.altitude[0], type.altitude[1]),
      speed: type.speed,
      fireTimer: rand(1.4, 2.6),
      charge: 0,
      charging: false,
      flash: 0,
      dead: false,
      targetPlayer: false,
      retargetTimer: rand(0.6, 1.8),
      phase: Math.random() * TAU,
      bank: 0,
      eye,
      eyeGlow,
      eyeMat,
      bodyMat,
      armorMat,
      ringMat,
      halo,
      halo2,
      rotors,
      underGlow,
      bossRing: group.userData.bossRing || null,
      burstTimer: rand(3.5, 5.5),
      tail: 0,
      name: type.name,
    }
    group.userData.enemy = enemy
    this.scene.add(group)
    this.enemies.push(enemy)
    if (type.boss) this.boss = enemy
    this.effects?.spawnPortal(pos, type.color)
    this.onSpawn?.(enemy)
    return enemy
  }

  update(dt, time, player) {
    this.time = time
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i]
      this.updateEnemy(e, dt, time, player)
    }
    this.updateProjectiles(dt, player)
  }

  updateEnemy(e, dt, time, player) {
    const core = this.world.core.position
    const def = e.def

    // visual flashes
    if (e.flash > 0) {
      e.flash = Math.max(0, e.flash - dt * 6)
      e.armorMat.emissiveIntensity = 0.22 + e.flash * 3.2
      e.bodyMat.emissive.setHex(0xffffff)
      e.bodyMat.emissiveIntensity = e.flash * 1.6
    } else {
      e.bodyMat.emissiveIntensity = 1
      e.bodyMat.emissive.setHex(0x050807)
    }

    // target decision
    e.retargetTimer -= dt
    if (e.retargetTimer <= 0) {
      e.retargetTimer = rand(1.2, 2.4)
      const pd = player.position.distanceTo(e.position)
      e.targetPlayer = pd < 25 && Math.random() < (def.boss ? 0.5 : 0.62)
    }

    // approach orbiting position around core
    e.orbitAngle += dt * (def.boss ? 0.12 : 0.22 + (e.type === 'vespa' ? 0.08 : 0))
    const targetX = core.x + Math.cos(e.orbitAngle) * e.orbitRadius
    const targetZ = core.z + Math.sin(e.orbitAngle) * e.orbitRadius
    const bob = Math.sin(time * 1.25 + e.phase) * 0.55
    const targetY = e.altitude + bob
    const tx = targetX - e.position.x
    const ty = targetY - e.position.y
    const tz = targetZ - e.position.z
    const distTarget = Math.hypot(tx, ty, tz)
    if (distTarget > 0.2) {
      const sp = e.speed * (e.charging ? 0.5 : 1)
      const step = Math.min(distTarget, sp * dt)
      e.position.x += (tx / distTarget) * step
      e.position.y += (ty / distTarget) * step
      e.position.z += (tz / distTarget) * step
      e.bank = clamp((tx / Math.max(distTarget, 0.1)) * -0.4, -0.35, 0.35)
    }
    e.group.rotation.z = e.bank * 0.8
    e.group.rotation.x = -0.05 + Math.sin(time * 1.6 + e.phase) * 0.03

    // face the current threat
    const faceTarget = e.targetPlayer ? player.camera.position : core
    const dx = faceTarget.x - e.position.x
    const dz = faceTarget.z - e.position.z
    const desiredYaw = Math.atan2(dx, dz)
    e.group.rotation.y = this.lerpAngle(e.group.rotation.y, desiredYaw, clamp(dt * 3.2, 0, 1))

    // spin visuals
    for (const r of e.rotors) r.rotation.y += dt * (e.type === 'colosso' ? 11 : 26)
    e.halo.rotation.z += dt * 1.5
    e.halo2.rotation.y += dt * 2.1
    e.eyeGlow.material.opacity = 0.7 + Math.sin(time * 4 + e.phase) * 0.18 + (e.charging ? 0.3 : 0)
    e.eye.scale.setScalar(1 + (e.charging ? Math.sin(time * 40) * 0.15 + 0.2 : 0))
    if (e.bossRing) {
      e.bossRing.rotation.z += dt * 0.6
      e.bossRing.material.opacity = 0.35 + Math.sin(time * 1.7) * 0.15
    }
    e.underGlow.material.opacity = 0.3 + Math.sin(time * 2.2 + e.phase) * 0.09

    // firing
    e.fireTimer -= dt
    if (e.charging) {
      e.charge -= dt
      if (e.charge <= 0) {
        e.charging = false
        this.fireAt(e, player)
        e.fireTimer = rand(def.fireMin, def.fireMax)
      }
    } else if (e.fireTimer <= 0) {
      const canSee = e.position.distanceTo(core) < 26
      if (canSee) {
        e.charging = true
        e.charge = def.boss ? 0.45 : 0.5
      } else {
        e.fireTimer = 0.5
      }
    }

    // boss radial burst
    if (def.boss) {
      e.burstTimer -= dt
      if (e.burstTimer <= 0) {
        e.burstTimer = (e.hp / e.maxHp < 0.5 ? 3.8 : 5.5)
        this.bossBurst(e, player)
      }
    }

  }

  lerpAngle(a, b, t) {
    let d = b - a
    while (d > Math.PI) d -= TAU
    while (d < -Math.PI) d += TAU
    return a + d * t
  }

  fireAt(e, player) {
    const def = e.def
    const targetPlayer = e.targetPlayer && player.alive
    const target = targetPlayer ? player.camera.position.clone() : this.world.core.position.clone()
    if (targetPlayer) {
      target.x += rand(-0.8, 0.8)
      target.y += rand(-0.35, 0.35)
      target.z += rand(-0.8, 0.8)
    } else {
      target.x += rand(-0.7, 0.7)
      target.y += rand(-0.5, 0.5)
      target.z += rand(-0.7, 0.7)
    }
    const origin = new THREE.Vector3()
    e.eye.getWorldPosition(origin)
    const dir = target.sub(origin).normalize()
    const speed = def.boss ? 15 : targetPlayer ? 13.5 : 11.5
    this.spawnProjectile(origin, dir, speed, def.projectileDamage, def.coreDamage, targetPlayer, e.type === 'colosso')
    this.effects?.spawnMuzzle(origin, def.color, 1.1)
    this.audio?.shoot('enemy')
  }

  bossBurst(e, player) {
    const origin = new THREE.Vector3()
    e.eye.getWorldPosition(origin)
    const count = 9
    for (let i = 0; i < count; i++) {
      const target = player.alive
        ? player.camera.position.clone().add(new THREE.Vector3(rand(-3.4, 3.4), rand(-1.2, 1.6), rand(-3.4, 3.4)))
        : this.world.core.position.clone()
      const dir = target.sub(origin).normalize()
      this.spawnProjectile(origin.clone(), dir, 9.5, 10, 4, true, true)
    }
    this.effects?.spawnMuzzle(origin, 0xff5d3a, 3)
    this.audio?.explosion(false)
  }

  spawnProjectile(origin, dir, speed, playerDmg, coreDmg, targetPlayer, big = false) {
    if (this.projectiles.length >= 90) return
    this.projectiles.push({
      pos: origin.clone(),
      vel: dir.clone().multiplyScalar(speed),
      life: 4.5,
      playerDmg,
      coreDmg,
      targetPlayer,
      big,
      color: targetPlayer ? 0xff3b2f : 0xff8a2a,
    })
  }

  updateProjectiles(dt, player) {
    const core = this.world.core.position
    const matrix = new THREE.Matrix4()
    const quat = new THREE.Quaternion()
    const scale = new THREE.Vector3()
    const pos = new THREE.Vector3()
    const positions = this._glowPositions
    let glowCount = 0

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i]
      p.life -= dt
      p.pos.addScaledVector(p.vel, dt)
      let hit = false
      if (p.targetPlayer && player.alive) {
        const dx = p.pos.x - player.camera.position.x
        const dy = p.pos.y - player.camera.position.y
        const dz = p.pos.z - player.camera.position.z
        if (dx * dx + dy * dy + dz * dz < 0.72 * 0.72) {
          this.onPlayerHit?.(p.playerDmg, p.pos.clone())
          this.effects?.spawnImpact(p.pos, 0xff5d3a, 0.6)
          hit = true
        }
      }
      // core or ground collision
      const cdx = p.pos.x - core.x
      const cdy = p.pos.y - core.y
      const cdz = p.pos.z - core.z
      if (!hit && cdx * cdx + cdy * cdy + cdz * cdz < 1.25 * 1.25) {
        this.onCoreHit?.(p.coreDmg)
        this.effects?.spawnImpact(p.pos, 0x27e0b8, 1.2)
        this.audio?.coreHit()
        hit = true
      }
      if (!hit && p.pos.y < 0.15) {
        this.effects?.spawnImpact(p.pos, 0xff8a2a, 0.5)
        hit = true
      }
      if (hit || p.life <= 0) {
        this.projectiles.splice(i, 1)
      }
    }

    for (let i = 0; i < 96; i++) {
      if (i < this.projectiles.length) {
        const p = this.projectiles[i]
        pos.copy(p.pos)
        quat.identity()
        const s = p.big ? 1.7 : 1
        scale.set(s, s, s)
        matrix.compose(pos, quat, scale)
        this.projectileMesh.setMatrixAt(i, matrix)
        const col = new THREE.Color(p.color)
        this.projectileMesh.setColorAt(i, col)
        positions[glowCount * 3] = p.pos.x
        positions[glowCount * 3 + 1] = p.pos.y
        positions[glowCount * 3 + 2] = p.pos.z
        glowCount++
      } else {
        matrix.makeScale(0, 0, 0)
        this.projectileMesh.setMatrixAt(i, matrix)
      }
    }
    // hide unused glow points
    for (let i = glowCount; i < 96; i++) {
      positions[i * 3] = 0
      positions[i * 3 + 1] = -100
      positions[i * 3 + 2] = 0
    }
    this.projectileMesh.instanceMatrix.needsUpdate = true
    if (this.projectileMesh.instanceColor) this.projectileMesh.instanceColor.needsUpdate = true
    this.glowPoints.geometry.attributes.position.needsUpdate = true
  }

  raycast(ray, maxDist = 120) {
    let best = null
    let bestDist = Infinity
    let bestPoint = null
    const point = new THREE.Vector3()
    for (const e of this.enemies) {
      if (e.dead) continue
      const sphere = new THREE.Sphere(e.position, e.hitRadius)
      const res = ray.intersectSphere(sphere, point)
      if (res) {
        const d = res.distanceTo(ray.origin)
        if (d < bestDist && d < maxDist) {
          bestDist = d
          best = e
          bestPoint = res.clone()
        }
      }
    }
    if (!best) return null
    const headY = best.position.y + best.scale * 0.28
    const isHead = bestPoint.y > headY
    return { enemy: best, point: bestPoint, distance: bestDist, isHead }
  }

  findAimAssist(origin, dir, maxAngle = 0.045) {
    let best = null
    let bestAngle = maxAngle
    const v = new THREE.Vector3()
    for (const e of this.enemies) {
      if (e.dead) continue
      v.copy(e.position).sub(origin)
      const dist = v.length()
      if (dist > 70) continue
      v.normalize()
      const dot = clamp(v.dot(dir), -1, 1)
      const angle = Math.acos(dot)
      if (angle < bestAngle) {
        bestAngle = angle
        best = e
      }
    }
    if (!best) return null
    const targetPoint = best.position.clone()
    const d = targetPoint.sub(origin).normalize()
    return { enemy: best, direction: d }
  }

  damage(enemy, amount, isHead = false, hitPoint = null) {
    if (!enemy || enemy.dead) return { killed: false }
    const mult = isHead ? enemy.def.headMult || 1.8 : 1
    const dmg = amount * mult
    enemy.hp -= dmg
    enemy.flash = 1
    this.effects?.spawnSparks(hitPoint || enemy.position, isHead ? 0xffd166 : 0xffb703, isHead ? 14 : 7)
    if (enemy.hp <= 0) {
      this.kill(enemy, isHead, hitPoint)
      return { killed: true, damage: dmg, enemy }
    }
    return { killed: false, damage: dmg, enemy }
  }

  kill(enemy, isHead, hitPoint) {
    if (enemy.dead) return
    enemy.dead = true
    const idx = this.enemies.indexOf(enemy)
    if (idx >= 0) this.enemies.splice(idx, 1)
    this.scene.remove(enemy.group)
    this.effects?.spawnExplosion(enemy.position.clone(), enemy.def.color, enemy.type === 'colosso' ? 3.4 : 1.3, enemy.type === 'colosso')
    this.audio?.explosion(enemy.type === 'colosso')
    if (this.boss === enemy) this.boss = null
    // Shared drone geometry stays cached; only per-enemy materials are released.
    const shared = getDroneGeometry()
    const sharedSet = new Set([shared.chassis, shared.armor, shared.blades])
    enemy.group.traverse((o) => {
      if (!o.isMesh && !o.isSprite) return
      if (o.geometry && !sharedSet.has(o.geometry)) o.geometry.dispose?.()
      const mats = Array.isArray(o.material) ? o.material : [o.material]
      for (const m of mats) {
        if (m && !m.userData?.shared) m.dispose?.()
      }
    })
    this.onKill?.(enemy, isHead, hitPoint)
  }

  clear() {
    for (const e of [...this.enemies]) {
      this.scene.remove(e.group)
    }
    this.enemies.length = 0
    this.projectiles.length = 0
    this.boss = null
  }

  dispose() {
    this.clear()
    this.projectileMesh.geometry.dispose()
    this.projectileMesh.material.dispose()
    this.glowPoints.geometry.dispose()
    this.glowPoints.material.dispose()
  }
}
