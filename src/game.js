import * as THREE from 'three'
import { forgeWeapon, buildWeaponModel, disposeObject } from './weapons.js'
import { Effects, EnemyManager, ProjectileManager, EnemyProjectileManager, VoidField, ENEMY_TYPES } from './entities.js'

const TAU = Math.PI * 2
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t

function raySphere (origin, direction, center, radius) {
  const oc = new THREE.Vector3().subVectors(center, origin)
  const tca = oc.dot(direction)
  if (tca < 0) return null
  const d2 = oc.lengthSq() - tca * tca
  const r2 = radius * radius
  if (d2 > r2) return null
  return tca - Math.sqrt(r2 - d2)
}

export class Game {
  constructor ({ renderer, scene, camera, world, ui, audio, voice, tilt }) {
    this.renderer = renderer
    this.scene = scene
    this.camera = camera
    this.world = world
    this.ui = ui
    this.audio = audio
    this.voice = voice
    this.tilt = tilt

    this.state = 'menu'
    this.isTouch = false
    this.time = 0
    this.stateTime = 0

    this.player = {
      position: new THREE.Vector3(0, 0, 10),
      yaw: 0,
      pitch: 0,
      health: 100,
      maxHealth: 100,
      radius: 0.62,
      speed: 5.4,
      velocity: new THREE.Vector3(),
      bob: 0,
      moving: 0,
    }
    this.keys = new Set()
    this.moveInput = { x: 0, y: 0 }
    this.firing = false
    this.talking = false
    this.talkStarting = false
    this.pendingStop = false
    this.forging = false
    this.nextShot = 0
    this.recoil = 0
    this.shake = 0
    this.forgeAnim = 0
    this.wave = 0
    this.score = 0
    this.kills = 0
    this.waveQueue = []
    this.waveTotal = 0
    this.spawnTimer = 0
    this.waveClearTimer = 0
    this.betweenWaves = false
    this.lastDamageAt = -99
    this.lookPointer = null
    this.lastLook = { x: 0, y: 0 }
    this.joystickPointer = null
    this.pointerLockHad = false
    this.withMic = true
    this.best = Number(localStorage.getItem('verbo.best') || 0)
    this.voidFields = []
    this.tmpVec = new THREE.Vector3()
    this.tmpVec2 = new THREE.Vector3()
    this.tmpDir = new THREE.Vector3()
    this.tmpDir2 = new THREE.Vector3()
    this.lastEnergy = 0.45

    this.effects = new Effects(scene)
    this.enemies = new EnemyManager(scene, this.effects)
    this.projectiles = new ProjectileManager(scene, this.effects)
    this.enemyProjectiles = new EnemyProjectileManager(scene, this.effects)
    this.weapon = forgeWeapon('pulso', { energy: 0.55, pitch: 0.52, duration: 1.1 })
    this.weaponModel = null
    this.ammo = this.weapon.stats.maxAmmo
    this.camera.rotation.order = 'YXZ'
    scene.add(camera)
    this.viewLight = new THREE.PointLight('#d8f4ff', 2.6, 3.2, 2)
    this.viewLight.position.set(0.35, 0.15, 0.45)
    camera.add(this.viewLight)

    this.bindVoice()
    this.bindInput()
  }

  setTouch (isTouch) {
    this.isTouch = isTouch
    document.body.classList.toggle('touch', isTouch)
  }

  bindVoice () {
    this.voice.onLevel = (level, energy) => {
      this.lastEnergy = energy
      if (this.talking) this.ui.setLevel(level)
    }
    this.voice.onTranscript = (text, isFinal) => {
      this.ui.setTranscript(text)
    }
    this.voice.onState = ({ state, error }) => {
      if (state === 'ready') this.ui.setMicState('ready', 'MIC ATIVO')
      else if (state === 'listening') this.ui.setMicState('listening', 'OUVINDO VOCÊ')
      else if (state === 'processing') this.ui.setMicState('ready', 'PROCESSANDO')
      else if (state === 'denied') this.ui.setMicState('denied', error || 'MIC BLOQUEADO')
      else if (state === 'requesting') this.ui.setMicState('requesting', 'PEDINDO PERMISSÃO')
    }
  }

  bindInput () {
    window.addEventListener('keydown', event => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
      const code = event.code
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(code)) event.preventDefault()
      this.keys.add(code)
      if (code === 'KeyV' && !event.repeat) {
        event.preventDefault()
        this.startTalking()
      }
      if ((code === 'KeyP' || code === 'Escape') && !event.repeat) {
        if (this.state === 'playing') this.pause()
        else if (this.state === 'paused' && code === 'Escape') this.resume()
      }
      if (code === 'KeyM' && !event.repeat) this.toggleMute()
      if (code === 'KeyT' && !event.repeat && this.state === 'paused') {
        this.ui.showTypeforge()
      }
    })
    window.addEventListener('keyup', event => {
      this.keys.delete(event.code)
      if (event.code === 'KeyV') this.stopTalking()
    })
    window.addEventListener('blur', () => {
      this.keys.clear()
      this.firing = false
      if (this.talking) this.stopTalking()
    })

    document.addEventListener('mousemove', event => {
      if (this.state !== 'playing' || this.isTouch) return
      if (document.pointerLockElement !== this.renderer.domElement) return
      this.look(event.movementX, event.movementY, 0.00215)
    })
    document.addEventListener('mousedown', event => {
      if (this.state !== 'playing' || this.isTouch || event.button !== 0) return
      if (document.pointerLockElement === this.renderer.domElement) {
        this.firing = true
        this.tryShoot()
      }
    })
    document.addEventListener('mouseup', event => {
      if (event.button === 0) this.firing = false
    })
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === this.renderer.domElement) {
        this.pointerLockHad = true
      } else if (this.pointerLockHad && this.state === 'playing' && !this.isTouch) {
        this.pointerLockHad = false
        this.pause()
      }
    })
    this.renderer.domElement.addEventListener('click', () => {
      if (this.state === 'playing' && !this.isTouch && document.pointerLockElement !== this.renderer.domElement) {
        this.requestPointerLock()
      }
    })

    this.renderer.domElement.addEventListener('pointerdown', event => {
      if (this.state !== 'playing' || !this.isTouch || event.pointerType === 'mouse') return
      if (this.lookPointer !== null) return
      this.lookPointer = event.pointerId
      this.lastLook.x = event.clientX
      this.lastLook.y = event.clientY
      this.renderer.domElement.setPointerCapture?.(event.pointerId)
    })
    this.renderer.domElement.addEventListener('pointermove', event => {
      if (event.pointerId !== this.lookPointer) return
      const dx = event.clientX - this.lastLook.x
      const dy = event.clientY - this.lastLook.y
      this.lastLook.x = event.clientX
      this.lastLook.y = event.clientY
      this.look(dx, dy, 0.0042)
    })
    const releaseLook = event => {
      if (event.pointerId === this.lookPointer) this.lookPointer = null
    }
    this.renderer.domElement.addEventListener('pointerup', releaseLook)
    this.renderer.domElement.addEventListener('pointercancel', releaseLook)

    const fire = document.getElementById('fire-btn')
    fire.addEventListener('pointerdown', event => {
      event.preventDefault()
      if (this.state !== 'playing') return
      fire.setPointerCapture?.(event.pointerId)
      fire.classList.add('firing')
      this.firing = true
      this.tryShoot()
    })
    const stopFire = () => {
      fire.classList.remove('firing')
      this.firing = false
    }
    fire.addEventListener('pointerup', stopFire)
    fire.addEventListener('pointercancel', stopFire)
    fire.addEventListener('lostpointercapture', stopFire)

    const vox = document.getElementById('vox-btn')
    vox.addEventListener('pointerdown', event => {
      event.preventDefault()
      vox.setPointerCapture?.(event.pointerId)
      this.startTalking()
    })
    const stopVox = () => this.stopTalking()
    vox.addEventListener('pointerup', stopVox)
    vox.addEventListener('pointercancel', stopVox)
    vox.addEventListener('lostpointercapture', stopVox)

    const joystick = document.getElementById('joystick')
    const thumb = document.getElementById('joystick-thumb')
    const updateJoystick = (event, center) => {
      if (!center) return
      const dx = event.clientX - center.x
      const dy = event.clientY - center.y
      const max = 41
      const len = Math.hypot(dx, dy)
      const scale = len > max ? max / len : 1
      const x = dx * scale
      const y = dy * scale
      thumb.style.transform = `translate(${x}px, ${y}px)`
      this.moveInput.x = x / max
      this.moveInput.y = -y / max
    }
    joystick.addEventListener('pointerdown', event => {
      event.preventDefault()
      event.stopPropagation()
      if (this.state !== 'playing') return
      this.joystickPointer = event.pointerId
      joystick.classList.add('active')
      const rect = joystick.getBoundingClientRect()
      this.joystickCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      try {
        joystick.setPointerCapture?.(event.pointerId)
      } catch {}
      updateJoystick(event, this.joystickCenter)
    })
    joystick.addEventListener('pointermove', event => {
      if (event.pointerId !== this.joystickPointer) return
      updateJoystick(event, this.joystickCenter)
    })
    const stopJoystick = event => {
      if (event.pointerId !== this.joystickPointer) return
      this.joystickPointer = null
      this.moveInput.x = 0
      this.moveInput.y = 0
      joystick.classList.remove('active')
      thumb.style.transform = 'translate(0px, 0px)'
    }
    joystick.addEventListener('pointerup', stopJoystick)
    joystick.addEventListener('pointercancel', stopJoystick)
    joystick.addEventListener('lostpointercapture', stopJoystick)
  }

  look (dx, dy, sensitivity) {
    this.player.yaw -= dx * sensitivity
    this.player.pitch -= dy * sensitivity
    this.player.pitch = clamp(this.player.pitch, -1.28, 1.28)
  }

  requestPointerLock () {
    if (this.isTouch) return
    this.renderer.domElement.requestPointerLock?.()
  }

  toggleMute () {
    const muted = this.audio.toggleMute()
    this.ui.setMuted(muted)
    this.ui.toast(muted ? 'SOM DESATIVADO' : 'SOM ATIVADO', 1200)
  }

  start (withMic = true) {
    this.withMic = withMic
    this.audio.init()
    if (withMic) {
      this.voice.requestMic()
    } else {
      this.ui.setMicState('denied', 'MODO SEM MIC')
    }
    this.beginRun()
  }

  beginRun () {
    this.clearSession()
    this.state = 'playing'
    this.stateTime = 0
    this.player.position.set(0, 0, 10)
    this.player.yaw = 0
    this.player.pitch = -0.02
    this.player.health = this.player.maxHealth
    this.player.velocity.set(0, 0, 0)
    this.score = 0
    this.kills = 0
    this.wave = 0
    this.betweenWaves = false
    this.waveClearTimer = 0
    this.firing = false
    this.talking = false
    this.talkStarting = false
    this.pendingStop = false
    this.forging = false
    this.ui.showHUD()
    this.ui.updateStats({ wave: 1, health: 100, score: 0, kills: 0 })
    this.equip(forgeWeapon('pulso', { energy: 0.6, pitch: 0.52, duration: 1.1 }), false)
    this.startWave(1)
    if (this.isTouch) {
      document.body.classList.add('touch')
    } else {
      setTimeout(() => this.requestPointerLock(), 120)
    }
  }

  clearSession () {
    this.enemies.clear()
    this.projectiles.clear()
    this.enemyProjectiles.clear()
    this.effects.clear()
    for (const field of this.voidFields) {
      this.scene.remove(field.group)
    }
    this.voidFields.length = 0
    this.waveQueue.length = 0
    this.firing = false
    this.ui.setListening(false)
    this.ui.showLowHint(false)
    if (this.weaponModel) {
      this.camera.remove(this.weaponModel.group)
      disposeObject(this.weaponModel.group)
      this.weaponModel = null
    }
  }

  equip (weapon, animate = true) {
    if (this.weaponModel) {
      this.camera.remove(this.weaponModel.group)
      disposeObject(this.weaponModel.group)
    }
    this.weapon = weapon
    this.ammo = weapon.stats.maxAmmo
    this.weaponModel = buildWeaponModel(weapon)
    this.camera.add(this.weaponModel.group)
    this.weaponModel.group.visible = this.state === 'playing'
    this.forgeAnim = animate ? 0 : 1
    if (animate) this.weaponModel.group.scale.setScalar(0.001)
    this.nextShot = 0
    this.ui.updateWeapon(weapon, this.ammo, 1)
    this.world.setEnergy(weapon.stats.energy)
  }

  startWave (number) {
    this.wave = number
    this.waveQueue.length = 0
    const count = Math.min(22, 4 + number * 2)
    for (let i = 0; i < count; i++) {
      let type = 'echo'
      if (number >= 2 && i % 3 === 0) type = 'wisp'
      if (number >= 3 && i % 7 === 6) type = 'brute'
      if (number >= 6 && i % 5 === 4) type = 'wisp'
      this.waveQueue.push(type)
    }
    this.waveTotal = count
    this.spawnTimer = 0.12
    this.waveClearTimer = 0
    this.betweenWaves = false
    this.ui.updateStats({ wave: number })
    this.ui.setWaveProgress(0)
    this.ui.showWave(number, number === 1 ? 'SINTA O PESO DO SILÊNCIO' : number % 3 === 0 ? 'ELES ESTÃO OUVINDO' : 'NÃO PARE DE FALAR')
    this.audio.wave()
  }

  spawnEnemy (typeId) {
    const firstOfWave = this.enemies.enemies.length === 0
    const angle = firstOfWave
      ? -Math.PI / 2 + this.player.yaw + (Math.random() - 0.5) * 0.9
      : Math.random() * TAU
    const radius = 13.5 + Math.random() * 6.5
    let x = Math.cos(angle) * radius
    let z = Math.sin(angle) * radius
    if (Math.hypot(x - this.player.position.x, z - this.player.position.z) < 8) {
      x *= -1
      z *= -1
    }
    const type = ENEMY_TYPES[typeId] || ENEMY_TYPES.echo
    const pos = new THREE.Vector3(x, type.hover, z)
    this.enemies.spawn(typeId, pos, this.camera)
  }

  forgeFromText (text) {
    const weapon = forgeWeapon(text, {
      energy: this.voice.lastEnergy || this.lastEnergy || 0.55,
      pitch: this.voice.lastPitch || 0.5,
      duration: 1.4,
    })
    this.equip(weapon, true)
    this.ui.showForge(weapon)
    this.audio.forge()
    this.ui.setMicState('ready', 'ARMA FORJADA')
    this.ui.setListening(false)
    this.lastEnergy = weapon.stats.energy
    return weapon
  }

  async startTalking () {
    if (this.state !== 'playing' || this.talking || this.talkStarting || this.forging) return
    if (!this.withMic || this.voice.micError) {
      this.pause()
      this.ui.showTypeforge()
      return
    }
    this.talking = true
    this.talkStarting = true
    this.pendingStop = false
    this.ui.setListening(true)
    this.ui.setLevel(0.15)
    const ok = await this.voice.beginCapture()
    this.talkStarting = false
    if (!ok) {
      this.talking = false
      this.ui.setListening(false)
      this.ui.toast('MICROFONE BLOQUEADO — FORJE POR TEXTO NO PAUSE')
      return
    }
    if (this.pendingStop || !this.talking) {
      this.pendingStop = false
      this.talking = false
      this.forging = true
      const result = await this.voice.endCapture()
      this.forging = false
      this.ui.setListening(false)
      if (result && (result.transcript || result.hadSpeech)) {
        this.forgeFromText(result.transcript || 'SINAL VOCAL')
      } else if (result) {
        this.ui.toast('NÃO OUVI NADA — TENTE DE NOVO', 1600)
      }
      return
    }
    if (!this.voice.supported) {
      this.ui.toast('TRANSCRIÇÃO INDISPONÍVEL — O TIMBRE DA SUA VOZ VAI FORJAR A ARMA', 2600)
    }
  }

  async stopTalking () {
    if (this.talkStarting) {
      this.pendingStop = true
      return
    }
    if (!this.talking) return
    this.talking = false
    this.forging = true
    const result = await this.voice.endCapture()
    this.forging = false
    this.ui.setListening(false)
    if (!result) return
    if (!result.transcript && !result.hadSpeech) {
      this.ui.toast('NÃO OUVI NADA — TENTE DE NOVO', 1600)
      return
    }
    this.forgeFromText(result.transcript || 'SINAL VOCAL')
  }

  tryShoot () {
    if (this.state !== 'playing' || this.time < this.nextShot) return
    const weapon = this.weapon
    if (!weapon || !this.weaponModel) return
    if (this.ammo <= 0) {
      this.audio.empty()
      this.ui.toast('SEM CARGA — SEGURE FALAR E DIGA OUTRA PALAVRA', 1300)
      this.nextShot = this.time + 0.35
      return
    }
    this.ammo--
    this.nextShot = this.time + 1 / weapon.stats.rate
    this.recoil = 1
    this.ui.crosshairFire()
    this.ui.updateWeapon(weapon, this.ammo, this.ammo / weapon.stats.maxAmmo)

    this.camera.updateMatrixWorld()
    this.weaponModel.muzzle.getWorldPosition(this.tmpVec)
    this.camera.getWorldDirection(this.tmpDir)
    const origin = this.tmpVec.clone()
    const direction = this.tmpDir.clone()

    if (weapon.behavior === 'chain') {
      this.shootChain(weapon, origin, direction)
    } else if (weapon.behavior === 'blade') {
      this.shootBlade(weapon, origin, direction)
    } else {
      this.shootProjectiles(weapon, origin, direction)
    }

    this.effects.muzzle(origin, weapon.color, weapon.stats.energy)
    this.audio.shoot(weapon, weapon.stats.energy)
    this.shake = Math.min(0.55, this.shake + 0.12)
  }

  shootProjectiles (weapon, origin, direction) {
    const pellets = weapon.stats.pellets || 1
    for (let i = 0; i < pellets; i++) {
      const dir = direction.clone()
      if (weapon.stats.spread > 0) {
        dir.add(new THREE.Vector3(
          (Math.random() - 0.5) * weapon.stats.spread * 2,
          (Math.random() - 0.5) * weapon.stats.spread * 2,
          (Math.random() - 0.5) * weapon.stats.spread * 2
        )).normalize()
      }
      if (weapon.behavior === 'flame') {
        dir.x += (Math.random() - 0.5) * 0.05
        dir.y += (Math.random() - 0.5) * 0.04
        dir.normalize()
      }
      this.projectiles.spawn(weapon, origin, dir, {
        homing: weapon.behavior === 'swarm',
        speed: weapon.stats.speed * (0.92 + Math.random() * 0.16),
      })
    }
  }

  shootChain (weapon, origin, direction) {
    const candidates = []
    for (const enemy of this.enemies.enemies) {
      if (enemy.userData.dead) continue
      const t = raySphere(origin, direction, enemy.position, enemy.userData.radius + 0.28)
      if (t !== null && t < weapon.stats.range) candidates.push({ enemy, t })
    }
    candidates.sort((a, b) => a.t - b.t)
    if (!candidates.length) {
      const end = origin.clone().addScaledVector(direction, weapon.stats.range)
      this.effects.beam(origin, end, weapon.color, 0.12)
      return
    }
    let current = candidates[0].enemy
    let start = origin.clone()
    const hitIds = new Set()
    let chains = 0
    let damage = weapon.stats.damage
    while (current && chains < 4) {
      hitIds.add(current.userData.id)
      const end = current.position.clone()
      this.effects.beam(start, end, weapon.color, 0.16)
      this.damageEnemy(current, damage, end)
      chains++
      damage *= 0.72
      start = end
      let nearest = null
      let nearestDist = 7.5
      for (const enemy of this.enemies.enemies) {
        if (enemy.userData.dead || hitIds.has(enemy.userData.id)) continue
        const d = enemy.position.distanceTo(current.position)
        if (d < nearestDist) {
          nearestDist = d
          nearest = enemy
        }
      }
      current = nearest
    }
  }

  shootBlade (weapon, origin, direction) {
    const originFlat = this.player.position.clone()
    originFlat.y = 1.25
    this.effects.slash(originFlat.addScaledVector(direction, 1.7), direction, weapon.color)
    let hits = 0
    for (const enemy of this.enemies.enemies) {
      if (enemy.userData.dead) continue
      const to = new THREE.Vector3().subVectors(enemy.position, origin)
      const dist = to.length()
      if (dist > weapon.stats.range + enemy.userData.radius) continue
      to.normalize()
      if (to.dot(direction) < 0.34) continue
      this.damageEnemy(enemy, weapon.stats.damage, enemy.position.clone())
      hits++
    }
    if (hits) this.shake = Math.min(0.7, this.shake + 0.15)
  }

  damageEnemy (enemy, amount, hitPos) {
    if (!enemy || enemy.userData.dead) return
    enemy.userData.hp -= amount
    enemy.userData.hitFlash = 0.13
    if (hitPos) this.effects.impact(hitPos, enemy.userData.type.color)
    if (enemy.userData.hp <= 0) {
      enemy.userData.dead = true
      this.killEnemy(enemy)
    } else {
      this.ui.hitmarker(false)
      this.audio.hit(amount > 35)
    }
  }

  registerProjectileHit (enemy, projectile, killed) {
    if (killed) {
      this.killEnemy(enemy)
    } else {
      this.ui.hitmarker(false)
      this.audio.hit(projectile.damage > 30)
    }
  }

  killEnemy (enemy) {
    const data = enemy.userData
    if (data._scored) return
    data._scored = true
    data.dead = true
    const points = Math.round(data.type.score * (1 + this.wave * 0.08))
    this.score += points
    this.kills++
    this.effects.explosion(enemy.position.clone(), data.type.color, data.type.id === 'brute' ? 3.1 : 1.8)
    this.effects.particles.burst(enemy.position.clone(), data.type.color, 14, 8, { size: 0.12, life: 0.7, gravity: 1.4 })
    this.audio.kill()
    this.ui.showKill(data.type.id === 'brute' ? 'BRUTO SILENCIADO' : data.type.id === 'wisp' ? 'SOMBRA DISPERSA' : 'ECO DESTRUÍDO', points)
    this.ui.hitmarker(true)
    this.ui.updateStats({ score: this.score, kills: this.kills })
    if (Math.random() < 0.12) {
      this.player.health = Math.min(this.player.maxHealth, this.player.health + 8)
      this.ui.updateStats({ health: this.player.health })
      this.ui.toast('ECO ABSORVIDO +8 INTEGRIDADE', 1000)
    }
  }

  onEnemyShoot (enemy, type) {
    if (this.state !== 'playing') return
    const origin = enemy.position.clone()
    const target = this.player.position.clone()
    target.y = 1.35
    if (type.ranged) {
      const dir = new THREE.Vector3().subVectors(target, origin).normalize()
      const shots = type.burst || 1
      for (let i = 0; i < shots; i++) {
        const d = dir.clone()
        if (shots > 1) {
          d.x += (i - (shots - 1) / 2) * 0.09
          d.y += (Math.random() - 0.5) * 0.04
          d.normalize()
        }
        this.enemyProjectiles.spawn(origin, origin.clone().addScaledVector(d, 12), type.color, 9 + this.wave * 0.18, type.damage)
      }
      this.effects.sprite(origin, type.color, 0.55, 0.16)
    } else {
      const dist = enemy.position.distanceTo(this.player.position)
      if (dist < 3.2) {
        this.damagePlayer(type.damage)
        this.effects.slash(this.player.position.clone().setY(1.3), new THREE.Vector3(0, 0, -1), type.color)
      }
    }
  }

  damagePlayer (amount) {
    if (this.state !== 'playing') return
    if (this.time - this.lastDamageAt < 0.35) return
    this.lastDamageAt = this.time
    this.player.health = Math.max(0, this.player.health - amount)
    this.ui.updateStats({ health: this.player.health })
    this.ui.damage()
    this.audio.hurt()
    this.shake = Math.min(1.1, this.shake + 0.55)
    if (this.player.health <= 0) this.gameOver()
  }

  gameOver () {
    if (this.state === 'over') return
    this.state = 'over'
    this.firing = false
    this.ui.setListening(false)
    if (this.talking) {
      this.talking = false
      this.voice.endCapture().catch(() => {})
    }
    this.audio.gameOver()
    document.exitPointerLock?.()
    const previousBest = this.best
    const isBest = this.score > previousBest
    if (isBest) {
      this.best = this.score
      localStorage.setItem('verbo.best', String(this.score))
    }
    this.ui.updateStats({ wave: this.wave, health: 0, score: this.score, kills: this.kills })
    this.ui.gameOver({ wave: this.wave, score: this.score, kills: this.kills }, isBest && this.score > 0)
    this.ui.showLowHint(false)
  }

  restart () {
    this.beginRun()
  }

  pause () {
    if (this.state !== 'playing') return
    this.state = 'paused'
    this.firing = false
    this.ui.setListening(false)
    this.ui.updateStats({ wave: this.wave, score: this.score, kills: this.kills, health: this.player.health })
    this.ui.showPause()
    document.exitPointerLock?.()
  }

  resume () {
    if (this.state !== 'paused') return
    this.state = 'playing'
    this.ui.showHUD()
    if (!this.isTouch) setTimeout(() => this.requestPointerLock(), 80)
  }

  quitToMenu () {
    this.state = 'menu'
    this.clearSession()
    this.ui.showMenu()
    this.ui.setListening(false)
    document.exitPointerLock?.()
    this.player.position.set(0, 0, 10)
  }

  updateMenuCamera (dt) {
    const t = this.time
    const radius = 10.5
    const angle = 0.65 + t * 0.035
    this.camera.position.set(Math.cos(angle) * radius, 4.4 + Math.sin(t * 0.22) * 0.35, Math.sin(angle) * radius)
    this.camera.lookAt(0, 2.1, 0)
    this.camera.rotation.z = Math.sin(t * 0.18) * 0.015
  }

  updateMovement (dt) {
    const forward = (this.keys.has('KeyW') || this.keys.has('ArrowUp') ? 1 : 0) - (this.keys.has('KeyS') || this.keys.has('ArrowDown') ? 1 : 0)
    const right = (this.keys.has('KeyD') || this.keys.has('ArrowRight') ? 1 : 0) - (this.keys.has('KeyA') || this.keys.has('ArrowLeft') ? 1 : 0)
    let mx = right + this.moveInput.x
    let mz = forward + this.moveInput.y
    const len = Math.hypot(mx, mz)
    if (len > 1) {
      mx /= len
      mz /= len
    }
    const sprint = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight')
    const speed = this.player.speed * (sprint ? 1.35 : 1)
    const sin = Math.sin(this.player.yaw)
    const cos = Math.cos(this.player.yaw)
    const vx = (mx * cos - mz * sin) * speed
    const vz = (-mx * sin - mz * cos) * speed
    const accel = 1 - Math.pow(0.001, dt)
    this.player.velocity.x = lerp(this.player.velocity.x, vx, accel)
    this.player.velocity.z = lerp(this.player.velocity.z, vz, accel)
    this.player.position.x += this.player.velocity.x * dt
    this.player.position.z += this.player.velocity.z * dt
    const radius = Math.hypot(this.player.position.x, this.player.position.z)
    if (radius > 23.2) {
      this.player.position.x *= 23.2 / radius
      this.player.position.z *= 23.2 / radius
    }
    const moving = Math.min(1, Math.hypot(this.player.velocity.x, this.player.velocity.z) / this.player.speed)
    this.player.moving = lerp(this.player.moving, moving, Math.min(1, dt * 8))
    this.player.bob += dt * (3 + moving * 7)
  }

  updateCamera (dt) {
    if (this.tilt.enabled) {
      const delta = this.tilt.update(dt)
      this.player.yaw -= delta.yaw * dt * 2.1
      this.player.pitch = clamp(this.player.pitch - delta.pitch * dt * 1.5, -1.28, 1.28)
    }
    const bob = Math.sin(this.player.bob) * 0.035 * this.player.moving
    const bobX = Math.cos(this.player.bob * 0.5) * 0.022 * this.player.moving
    this.camera.position.set(
      this.player.position.x + bobX,
      1.7 + bob,
      this.player.position.z
    )
    this.shake = Math.max(0, this.shake - dt * 2.6)
    const shake = this.shake * this.shake
    this.camera.rotation.set(
      this.player.pitch + (Math.random() - 0.5) * shake * 0.022,
      this.player.yaw + (Math.random() - 0.5) * shake * 0.022,
      (Math.random() - 0.5) * shake * 0.014
    )
  }

  updateWeaponModel (dt) {
    if (!this.weaponModel) return
    const group = this.weaponModel.group
    const basePos = group.userData.basePosition
    const baseRot = group.userData.baseRotation
    const baseScale = group.userData.baseScale || 0.47
    const portrait = this.camera.aspect < 0.9
    const baseX = portrait ? 0.1 : basePos.x
    const baseY = portrait ? -0.235 : basePos.y
    const baseZ = portrait ? -0.68 : basePos.z
    const viewScale = baseScale * (portrait ? 0.7 : 1)
    this.recoil = Math.max(0, this.recoil - dt * 8.5)
    if (this.forgeAnim < 1) {
      this.forgeAnim = Math.min(1, this.forgeAnim + dt * 3.6)
      const k = this.forgeAnim
      const eased = 1 - Math.pow(1 - k, 3)
      group.scale.setScalar(viewScale * eased)
      group.rotation.y = baseRot.y + (1 - eased) * 1.4
      group.position.y = baseY - (1 - eased) * 0.35
      group.position.x = baseX
      group.position.z = baseZ
    } else {
      const t = this.time
      const sway = this.player.moving
      group.scale.setScalar(viewScale)
      group.position.x = baseX + Math.sin(t * 1.25) * 0.007 + Math.sin(this.player.bob) * 0.012 * sway
      group.position.y = baseY + Math.cos(t * 1.65) * 0.006 + Math.abs(Math.cos(this.player.bob)) * 0.014 * sway - this.recoil * 0.012
      group.position.z = baseZ + this.recoil * 0.09
      group.rotation.x = baseRot.x - this.recoil * 0.09
      group.rotation.y = baseRot.y + Math.sin(t * 0.8) * 0.008
      group.rotation.z = baseRot.z + Math.sin(t * 1.1) * 0.006 + this.recoil * 0.025
    }
    group.visible = this.state === 'playing' || this.state === 'paused'
  }

  updateWaves (dt) {
    if (this.betweenWaves) {
      this.waveClearTimer -= dt
      if (this.waveClearTimer <= 0) {
        this.betweenWaves = false
        this.startWave(this.wave + 1)
      }
      return
    }
    if (this.waveQueue.length > 0) {
      this.spawnTimer -= dt
      if (this.spawnTimer <= 0) {
        this.spawnEnemy(this.waveQueue.shift())
        this.spawnTimer = 0.28 + Math.random() * 0.34
      }
    }
    const alive = this.enemies.enemies.filter(enemy => !enemy.userData.dead).length
    const killedOrSpawned = this.waveTotal - this.waveQueue.length - alive
    this.ui.setWaveProgress(this.waveTotal ? killedOrSpawned / this.waveTotal : 0)
    if (this.waveQueue.length === 0 && alive === 0) {
      this.betweenWaves = true
      this.waveClearTimer = 2.4
      const bonus = 220 * this.wave
      this.score += bonus
      this.player.health = Math.min(this.player.maxHealth, this.player.health + 22)
      this.ui.updateStats({ health: this.player.health, score: this.score })
      this.ui.toast(`ONDA ${String(this.wave).padStart(2, '0')} LIMPA  +${bonus} PONTOS  +22 INTEGRIDADE`, 2400)
      this.audio.wave()
    }
  }

  update (dt) {
    this.time += dt
    this.stateTime += dt
    this.world.update(this.time, dt, this.lastEnergy)
    this.effects.update(dt)
    if (this.state === 'menu') {
      this.updateMenuCamera(dt)
      return
    }
    if (this.state === 'over') {
      this.updateMenuCamera(dt)
      return
    }
    if (this.state === 'paused') {
      return
    }
    if (this.state !== 'playing') return

    this.updateMovement(dt)
    this.updateCamera(dt)
    this.updateWeaponModel(dt)

    if (this.firing) this.tryShoot()

    this.enemies.update(dt, this.player.position, this.camera, (enemy, type) => this.onEnemyShoot(enemy, type), this.time)
    this.projectiles.update(
      dt,
      this.enemies,
      this.player.position,
      (projectile, position, radius = 2.6) => {
        this.effects.explosion(position, projectile.weapon.color, radius)
        for (const enemy of this.enemies.enemies) {
          if (enemy.userData.dead) continue
          const d = enemy.position.distanceTo(position)
          if (d < radius + enemy.userData.radius) {
            const falloff = 1 - clamp(d / (radius + enemy.userData.radius), 0, 1)
            this.damageEnemy(enemy, projectile.damage * (0.45 + falloff * 0.75), enemy.position.clone())
          }
        }
        this.audio.kill()
        this.shake = Math.min(1, this.shake + 0.25)
      },
      (projectile, position) => {
        this.voidFields.push(new VoidField(this.scene, this.effects, position, projectile.weapon))
        this.audio.tone({ freq: 90, endFreq: 40, duration: 0.5, gain: 0.15, type: 'sine' })
      },
      (enemy, projectile, killed) => this.registerProjectileHit(enemy, projectile, killed)
    )
    const enemyDamage = this.enemyProjectiles.update(dt, this.player.position.clone().setY(1.35), 0.62)
    if (enemyDamage > 0) this.damagePlayer(enemyDamage)

    for (let i = this.voidFields.length - 1; i >= 0; i--) {
      if (!this.voidFields[i].update(dt, this.enemies)) this.voidFields.splice(i, 1)
    }

    this.enemies.removeDead()
    this.updateWaves(dt)

    this.ui.showLowHint(this.ammo <= 0, 'SEGURE FALAR PARA FORJAR')
    this.ui.setLevel(this.talking ? this.lastEnergy : 0)
    if (this.weaponModel) {
      const ratio = this.ammo / this.weapon.stats.maxAmmo
      if (Math.abs((this._lastAmmoRatio ?? -1) - ratio) > 0.015) {
        this._lastAmmoRatio = ratio
        this.ui.updateWeapon(this.weapon, this.ammo, ratio)
      }
    }
  }

  updateTouchUI () {
    const tilt = document.getElementById('tilt-btn')
    if (tilt) tilt.classList.toggle('available', this.isTouch && this.tilt.supported)
  }
}
