import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { forgeWeapon, createStarterWeapon, normalizeText } from './data.js'
import { AudioEngine } from './audio.js'
import { VoiceController } from './voice.js'
import {
  createSky, createArena, createWeaponModel, createEnemyModel, createMenuDisplay,
  createProjectileMesh, ParticleField, disposeObject, glowTexture, makeBeamTexture, PALETTE
} from './world.js'

const $ = id => document.getElementById(id)
const TAU = Math.PI * 2
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t
const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt))
const rand = (a, b) => a + Math.random() * (b - a)
const pick = list => list[Math.floor(Math.random() * list.length)]
const formatScore = n => String(Math.max(0, Math.floor(n))).padStart(6, '0')

const IS_TOUCH = matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window)
const IS_MOBILE = IS_TOUCH || innerWidth < 760

const ENEMY_TYPES = {
  drone: { hp: 34, speed: 2.35, radius: .86, scale: .88, color: '#ff526d', score: 100, fire: 2.7, damage: 7, projectileSpeed: 13, name: 'SENTINELA' },
  stalker: { hp: 52, speed: 3.15, radius: .82, scale: .8, color: '#ff4bd8', score: 150, fire: 2.15, damage: 8, projectileSpeed: 15, name: 'CAÇADORA' },
  brute: { hp: 105, speed: 1.22, radius: 1.25, scale: 1.35, color: '#ff9a3c', score: 210, fire: 3.15, damage: 13, projectileSpeed: 11, name: 'COLOSSO' },
  boss: { hp: 760, speed: .74, radius: 2.5, scale: 2.75, color: '#ff2d55', score: 1200, fire: 1.65, damage: 16, projectileSpeed: 12, name: 'O SILÊNCIO' }
}

const BOSS_NAMES = ['O SILÊNCIO', 'A BOCA VAZIA', 'CORO SEM VOZ', 'O ÚLTIMO ECO', 'AUSÊNCIA']

export class VoxGame {
  constructor() {
    this.canvas = $('game-canvas')
    this.ui = {
      hud: $('hud'),
      startScreen: $('start-screen'),
      startBtn: $('start-btn'),
      micPreflight: $('mic-preflight'),
      micPreflightLabel: $('mic-preflight-label'),
      pauseScreen: $('pause-screen'),
      gameoverScreen: $('gameover-screen'),
      voiceOverlay: $('voice-overlay'),
      weaponReveal: $('weapon-reveal'),
      waveNumber: $('wave-number'),
      scoreValue: $('score-value'),
      comboValue: $('combo-value'),
      healthFill: $('health-fill'),
      healthGhost: $('health-ghost'),
      healthValue: $('health-value'),
      shieldFill: $('shield-fill'),
      shieldValue: $('shield-value'),
      dashFill: $('dash-fill'),
      weaponName: $('weapon-name'),
      weaponSub: $('weapon-sub'),
      weaponRarity: $('weapon-rarity'),
      ammoCurrent: $('ammo-current'),
      ammoMax: $('ammo-max'),
      ammoBlock: $('weapon-panel')?.querySelector('.ammo-block'),
      reloadLabel: $('reload-label'),
      weaponSlots: $('weapon-slots'),
      reticle: $('reticle'),
      hitmarker: $('hitmarker'),
      bossPanel: $('boss-panel'),
      bossName: $('boss-name'),
      bossFill: $('boss-fill'),
      waveBanner: $('wave-banner'),
      bannerKicker: $('banner-kicker'),
      bannerMain: $('banner-main'),
      bannerSub: $('banner-sub'),
      killFeed: $('kill-feed'),
      toastContainer: $('toast-container'),
      damageLayer: $('damage-layer'),
      damageFlash: $('damage-flash'),
      healFlash: $('heal-flash'),
      radar: $('radar'),
      voicePill: $('voice-pill'),
      voiceLabel: $('voice-label'),
      voiceOrb: $('voice-orb'),
      voiceStatus: $('voice-status'),
      voiceTranscript: $('voice-transcript'),
      voiceMic: $('voice-mic'),
      voiceMicLabel: $('voice-mic-label'),
      voiceClose: $('voice-close'),
      voiceCancel: $('voice-cancel'),
      voiceTypeForm: $('voice-type-form'),
      voiceType: $('voice-type'),
      waveform: $('waveform'),
      revealRarity: $('reveal-rarity'),
      revealGlyph: $('reveal-glyph'),
      revealName: $('reveal-name'),
      revealSub: $('reveal-sub'),
      revealScreen: $('weapon-reveal'),
      statDamage: $('stat-damage'),
      statRate: $('stat-rate'),
      statRange: $('stat-range'),
      statDamageNum: $('stat-damage-num'),
      statRateNum: $('stat-rate-num'),
      statRangeNum: $('stat-range-num'),
      pauseWave: $('pause-wave'),
      pauseScore: $('pause-score'),
      pauseKills: $('pause-kills'),
      finalScore: $('final-score'),
      finalWave: $('final-wave'),
      finalKills: $('final-kills'),
      finalAccuracy: $('final-accuracy'),
      finalCombo: $('final-combo'),
      bestScore: $('best-score'),
      gameoverMessage: $('gameover-message'),
      soundBtn: $('sound-btn'),
      motionBtn: $('motion-btn'),
      pauseSound: $('pause-sound'),
      pauseMotion: $('pause-motion'),
      fireBtn: $('fire-btn'),
      moveZone: $('move-zone'),
      lookZone: $('look-zone'),
      joystickBase: $('joystick-base'),
      joystickKnob: $('joystick-knob'),
      dashBtn: $('dash-btn'),
      reloadBtn: $('reload-btn'),
      forgeMobile: $('forge-mobile'),
      rotateHint: $('rotate-hint'),
      unsupported: $('unsupported')
    }
    this.settings = {
      sound: true,
      motion: false,
      best: this.loadBest()
    }
    this.audio = new AudioEngine()
    this.voice = new VoiceController({
      onState: (state, detail) => this.handleVoiceState(state, detail),
      onLevel: level => this.handleVoiceLevel(level),
      onTranscript: data => this.handleVoiceTranscript(data),
      onResult: (text, meta) => this.handleVoiceResult(text, meta),
      onError: (error, message) => this.handleVoiceError(error, message),
      audio: this.audio
    })
    this.state = 'menu'
    this.menuTime = 0
    this.elapsed = 0
    this.timeScale = 1
    this.targetTimeScale = 1
    this.forgePause = false
    this.resumeModalAfterForge = false
    this.lastFrame = performance.now()
    this.clock = new THREE.Clock()
    this.enemies = []
    this.projectiles = []
    this.enemyProjectiles = []
    this.effects = []
    this.pickups = []
    this.damageNumbers = 0
    this.input = {
      keys: new Set(),
      firing: false,
      lookX: 0,
      lookY: 0,
      joystickX: 0,
      joystickY: 0,
      joystickId: null,
      lookId: null,
      lastPointer: null,
      pointerLocked: false
    }
    this.tilt = { x: 0, y: 0, enabled: false, calibrated: false, samples: 0, baseX: 0, baseY: 0 }
    this.player = {
      position: new THREE.Vector3(0, 1.7, 12),
      velocity: new THREE.Vector3(),
      yaw: 0,
      pitch: 0,
      health: 100,
      maxHealth: 100,
      shield: 50,
      maxShield: 50,
      lastDamage: -99,
      dashCooldown: 0,
      dashTime: 0,
      dashInvuln: 0,
      dashDir: new THREE.Vector3(),
      bob: 0
    }
    this.stats = { score: 0, kills: 0, shotsFired: 0, shotsHit: 0, combo: 0, comboTimer: 0, bestCombo: 1, wave: 1 }
    this.arsenal = []
    this.activeIndex = 0
    this.wave = 0
    this.waveActive = false
    this.enemiesRemaining = 0
    this.maxAlive = 5
    this.nextSpawnAt = 0
    this.nextWaveAt = 0
    this.boss = null
    this.reloadEnd = 0
    this.reloading = false
    this.nextShotAt = 0
    this.recoilKick = 0
    this.weaponSway = { x: 0, y: 0 }
    this.trauma = 0
    this.radarClock = 0
    this.lastHud = {}
    this.revealTimer = null
    this.bannerTimer = null
    this.motionHandler = this.handleOrientation.bind(this)
    this.animate = this.animate.bind(this)
    this.onResize = this.onResize.bind(this)

    try {
      this.initThree()
      this.buildWorld()
      this.buildMenuDisplay()
      this.bindUI()
      this.initInput()
      this.onResize()
      this.resetPlayer()
      this.equipWeapon(createStarterWeapon(), { silent: true })
      this.arsenal = [this.currentWeapon]
      this.renderArsenal()
      this.updateHud()
      this.state = 'menu'
      this.ui.hud.classList.add('hidden')
      this.ui.startScreen.classList.remove('hidden')
      this.ui.unsupported.classList.add('hidden')
      this.ui.rotateHint.style.display = IS_MOBILE && innerWidth > innerHeight ? 'block' : 'none'
      this.exposeDebugApi()
      requestAnimationFrame(this.animate)
      window.addEventListener('resize', this.onResize)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && this.state === 'playing') this.pauseGame()
      })
    } catch (error) {
      console.error('VOX initialization failed', error)
      this.ui.unsupported.classList.remove('hidden')
      this.ui.startScreen.classList.add('hidden')
    }
  }

  loadBest() {
    try { return Number(localStorage.getItem('vox-arsenal-best') || 0) || 0 } catch { return 0 }
  }

  saveBest(score) {
    try {
      if (score > this.settings.best) {
        this.settings.best = score
        localStorage.setItem('vox-arsenal-best', String(score))
      }
    } catch {}
  }

  initThree() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !IS_MOBILE,
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false
    })
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, IS_MOBILE ? 1.45 : 1.8))
    this.renderer.setSize(innerWidth, innerHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    this.renderer.shadowMap.enabled = !IS_MOBILE
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#03050d')
    this.scene.fog = new THREE.FogExp2('#050817', .0125)
    this.camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, .05, 260)
    this.camera.rotation.order = 'YXZ'
    this.camera.position.set(0, 1.7, 12)
    this.scene.add(this.camera)
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), IS_MOBILE ? .4 : .58, .52, .66)
    this.composer.addPass(this.bloom)
    this.composer.addPass(new OutputPass())
    this.particles = new ParticleField(this.scene, IS_MOBILE ? 850 : 1500)
    this.raycaster = new THREE.Raycaster()
    this.tmpVec = new THREE.Vector3()
    this.tmpVec2 = new THREE.Vector3()
    this.tmpVec3 = new THREE.Vector3()
    this.weaponGroup = null
    this.currentWeapon = null
    this.muzzleFlashTime = 0
  }

  buildWorld() {
    this.sky = createSky(this.scene)
    this.arena = createArena(this.scene)
    this.colliders = this.arena.userData.colliders || []
    this.holoPanels = this.arena.userData.holoPanels || []
    this.menuGroup = null
    this.crystalMeshes = []
    this.arena.traverse(obj => {
      if (obj.userData?.baseY !== undefined && obj.geometry?.type === 'OctahedronGeometry') this.crystalMeshes.push(obj)
    })
  }

  buildMenuDisplay() {
    const starter = createStarterWeapon()
    this.menuGroup = createMenuDisplay(starter)
    this.scene.add(this.menuGroup)
    this.menuWeapon = this.menuGroup.userData.weaponModel
  }

  onResize() {
    const w = innerWidth
    const h = innerHeight
    if (!this.renderer) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, IS_MOBILE ? 1.45 : 1.8))
    this.renderer.setSize(w, h)
    this.composer?.setSize(w, h)
    this.bloom?.setSize(w, h)
    this.ui.rotateHint.style.display = IS_MOBILE && w > h ? 'block' : 'none'
  }

  resetPlayer() {
    this.player.position.set(0, 1.7, 12)
    this.player.velocity.set(0, 0, 0)
    this.player.yaw = 0
    this.player.pitch = -.02
    this.player.health = 100
    this.player.shield = 50
    this.player.lastDamage = -99
    this.player.dashCooldown = 0
    this.player.dashTime = 0
    this.player.dashInvuln = 0
    this.player.bob = 0
    this.camera.position.copy(this.player.position)
    this.camera.rotation.set(this.player.pitch, -this.player.yaw, 0)
    this.camera.fov = 72
    this.camera.updateProjectionMatrix()
  }

  resetGame() {
    this.clearWorldObjects()
    this.resetPlayer()
    this.stats = { score: 0, kills: 0, shotsFired: 0, shotsHit: 0, combo: 0, comboTimer: 0, bestCombo: 1, wave: 1 }
    this.wave = 0
    this.waveActive = false
    this.enemiesRemaining = 0
    this.maxAlive = 5
    this.nextSpawnAt = 0
    this.nextWaveAt = 0
    this.boss = null
    this.reloadEnd = 0
    this.reloading = false
    this.nextShotAt = 0
    this.elapsed = 0
    this.trauma = 0
    this.timeScale = 1
    this.targetTimeScale = 1
    this.forgePause = false
    this.input.firing = false
    this.input.joystickX = 0
    this.input.joystickY = 0
    this.arsenal = [createStarterWeapon()]
    this.activeIndex = 0
    this.equipWeapon(this.arsenal[0], { silent: true })
    this.renderArsenal()
    this.updateHud()
    this.hideBoss()
    this.ui.bossPanel.classList.add('hidden')
    this.ui.waveBanner.classList.add('hidden')
    this.ui.pauseScreen.classList.add('hidden')
    this.ui.gameoverScreen.classList.add('hidden')
    this.ui.weaponReveal.classList.add('hidden')
    this.ui.killFeed.innerHTML = ''
    this.ui.toastContainer.innerHTML = ''
    this.audio.setPaused(false)
    this.state = 'playing'
    this.startWave(1)
  }

  clearWorldObjects() {
    for (const enemy of [...this.enemies]) this.removeEnemy(enemy, false)
    this.enemies.length = 0
    for (const p of [...this.projectiles]) this.removeProjectile(p)
    this.projectiles.length = 0
    for (const p of [...this.enemyProjectiles]) this.removeEnemyProjectile(p)
    this.enemyProjectiles.length = 0
    for (const effect of [...this.effects]) this.removeEffect(effect)
    this.effects.length = 0
    for (const pickup of [...this.pickups]) this.removePickup(pickup)
    this.pickups.length = 0
    this.particles?.clear()
    this.damageNumbers = 0
    this.ui.damageLayer.innerHTML = ''
  }

  startGame() {
    if (this.state === 'playing') return
    this.audio.unlock()
    this.voice.enable().then(ok => {
      if (ok) this.setMicStatus('on', 'MICROFONE PRONTO')
    }).catch(() => {})
    this.ui.startScreen.style.transition = 'opacity .55s ease, filter .55s ease'
    this.ui.startScreen.style.opacity = '0'
    this.ui.startScreen.style.filter = 'blur(8px)'
    this.ui.startScreen.style.pointerEvents = 'none'
    setTimeout(() => {
      if (this.state !== 'menu') this.ui.startScreen.classList.add('hidden')
      this.ui.startScreen.style.opacity = ''
      this.ui.startScreen.style.filter = ''
      this.ui.startScreen.style.pointerEvents = ''
    }, 620)
    this.ui.hud.classList.remove('hidden')
    this.ui.gameoverScreen.classList.add('hidden')
    this.ui.pauseScreen.classList.add('hidden')
    this.ui.voiceOverlay.classList.add('hidden')
    if (this.menuGroup) this.menuGroup.visible = false
    this.resetGame()
    this.showBanner('PROTOCOLO DE COMBATE', 'ONDA 01', 'SOBREVIVA AO SILÊNCIO')
    this.audio.ui()
  }

  returnToMenu() {
    this.state = 'menu'
    this.forgePause = false
    this.input.firing = false
    this.voice.cancel()
    this.audio.setPaused(false)
    this.ui.hud.classList.add('hidden')
    this.ui.pauseScreen.classList.add('hidden')
    this.ui.gameoverScreen.classList.add('hidden')
    this.ui.voiceOverlay.classList.add('hidden')
    this.ui.weaponReveal.classList.add('hidden')
    this.ui.startScreen.classList.remove('hidden')
    this.ui.startScreen.style.opacity = '1'
    this.ui.startScreen.style.filter = ''
    this.ui.startScreen.style.pointerEvents = ''
    this.ui.rotateHint.style.display = IS_MOBILE && innerWidth > innerHeight ? 'block' : 'none'
    if (this.menuGroup) this.menuGroup.visible = true
    this.clearWorldObjects()
    this.resetPlayer()
    this.menuTime = 0
    this.hideBoss()
    document.exitPointerLock?.()
  }

  restartGame() {
    this.ui.gameoverScreen.classList.add('hidden')
    this.ui.pauseScreen.classList.add('hidden')
    this.ui.voiceOverlay.classList.add('hidden')
    this.ui.weaponReveal.classList.add('hidden')
    this.ui.startScreen.classList.add('hidden')
    this.ui.hud.classList.remove('hidden')
    if (this.menuGroup) this.menuGroup.visible = false
    this.audio.setPaused(false)
    this.resetGame()
    this.showBanner('CANAL REABERTO', 'ONDA 01', 'A VOZ VOLTOU À ARENA')
    this.audio.ui()
  }

  pauseGame() {
    if (this.state !== 'playing') return
    this.state = 'paused'
    this.input.firing = false
    this.input.joystickX = 0
    this.input.joystickY = 0
    this.audio.setPaused(true)
    this.audio.ui()
    this.ui.pauseWave.textContent = String(this.wave).padStart(2, '0')
    this.ui.pauseScore.textContent = formatScore(this.stats.score)
    this.ui.pauseKills.textContent = String(this.stats.kills)
    this.ui.pauseScreen.classList.remove('hidden')
    this.syncSettingsButtons()
    document.exitPointerLock?.()
  }

  resumeGame() {
    if (this.state !== 'paused') return
    this.ui.pauseScreen.classList.add('hidden')
    this.state = 'playing'
    this.audio.setPaused(false)
    this.audio.ui()
    this.lastFrame = performance.now()
  }

  gameOver() {
    if (this.state === 'over') return
    this.state = 'over'
    this.input.firing = false
    this.input.joystickX = 0
    this.input.joystickY = 0
    this.voice.cancel()
    this.audio.setPaused(true)
    this.audio.explosion(1.3)
    this.saveBest(this.stats.score)
    this.ui.finalScore.textContent = formatScore(this.stats.score)
    this.ui.finalWave.textContent = String(this.wave).padStart(2, '0')
    this.ui.finalKills.textContent = String(this.stats.kills)
    this.ui.finalAccuracy.textContent = `${this.stats.shotsFired ? Math.round((this.stats.shotsHit / this.stats.shotsFired) * 100) : 0}%`
    this.ui.finalCombo.textContent = `x${this.stats.bestCombo.toFixed(1).replace('.0', '')}`
    this.ui.bestScore.textContent = formatScore(this.settings.best)
    this.ui.gameoverMessage.textContent = this.stats.score > 0
      ? 'O silêncio venceu esta rodada. Sua voz ainda pode mudar isso.'
      : 'A arena cobrou seu primeiro silêncio. Fale mais alto da próxima vez.'
    this.ui.gameoverScreen.classList.remove('hidden')
    this.hideBoss()
    document.exitPointerLock?.()
  }

  showBanner(kicker, main, sub, duration = 3200) {
    this.ui.bannerKicker.textContent = kicker
    this.ui.bannerMain.textContent = main
    this.ui.bannerSub.textContent = sub
    this.ui.waveBanner.classList.remove('hidden')
    this.ui.waveBanner.style.animation = 'none'
    void this.ui.waveBanner.offsetWidth
    this.ui.waveBanner.style.animation = ''
    clearTimeout(this.bannerTimer)
    this.bannerTimer = setTimeout(() => this.ui.waveBanner.classList.add('hidden'), duration)
  }

  showToast(message, danger = false) {
    const el = document.createElement('div')
    el.className = `toast${danger ? ' danger' : ''}`
    el.textContent = message
    this.ui.toastContainer.appendChild(el)
    while (this.ui.toastContainer.children.length > 3) this.ui.toastContainer.firstElementChild.remove()
    setTimeout(() => el.remove(), 2500)
  }

  feed(message, points = 0) {
    const el = document.createElement('div')
    el.className = 'feed-item'
    if (points) {
      el.innerHTML = `${escapeHtml(message)} <b>+${points}</b>`
    } else {
      el.textContent = message
    }
    this.ui.killFeed.appendChild(el)
    while (this.ui.killFeed.children.length > 4) this.ui.killFeed.firstElementChild.remove()
    setTimeout(() => el.remove(), 2900)
  }

  bindUI() {
    this.ui.startBtn.addEventListener('click', () => this.startGame())
    this.ui.micPreflight.addEventListener('click', async () => {
      this.audio.unlock()
      this.setMicStatus('', 'ABRINDO MICROFONE…')
      const ok = await this.voice.enable()
      this.setMicStatus(ok ? 'on' : 'error', ok ? 'MICROFONE PRONTO' : 'MICROFONE BLOQUEADO')
      if (!ok) this.showToast('Permissão de microfone negada. Você pode digitar a arma.', true)
    })
    this.ui.voicePill.addEventListener('click', () => this.openVoiceForge())
    this.ui.forgeMobile.addEventListener('click', () => this.openVoiceForge())
    this.ui.voiceClose.addEventListener('click', () => this.closeVoiceForge())
    this.ui.voiceCancel.addEventListener('click', () => this.closeVoiceForge())
    this.ui.voiceMic.addEventListener('click', () => {
      if (this.voice.listening) this.voice.stopListening()
      else this.voice.startListening()
    })
    this.ui.voiceTypeForm.addEventListener('submit', event => {
      event.preventDefault()
      const text = this.ui.voiceType.value.trim()
      if (!text) return
      this.voice.cancel()
      this.forgeFromText(text, { source: 'typed' })
      this.ui.voiceType.value = ''
    })
    document.querySelectorAll('[data-suggestion]').forEach(button => {
      button.addEventListener('click', () => {
        this.voice.cancel()
        this.forgeFromText(button.dataset.suggestion, { source: 'suggestion' })
      })
    })
    this.ui.pauseScreen.querySelector('#resume-btn').addEventListener('click', () => this.resumeGame())
    this.ui.pauseScreen.querySelector('#pause-forge-btn').addEventListener('click', () => this.openVoiceForge({ fromPause: true }))
    this.ui.pauseScreen.querySelector('#pause-restart-btn').addEventListener('click', () => this.restartGame())
    this.ui.pauseScreen.querySelector('#pause-menu-btn').addEventListener('click', () => this.returnToMenu())
    this.ui.gameoverScreen.querySelector('#retry-btn').addEventListener('click', () => this.restartGame())
    this.ui.gameoverScreen.querySelector('#gameover-forge-btn').addEventListener('click', () => {
      this.restartGame()
      this.openVoiceForge()
    })
    this.ui.gameoverScreen.querySelector('#menu-btn').addEventListener('click', () => this.returnToMenu())
    this.ui.soundBtn.addEventListener('click', () => this.toggleSound())
    this.ui.motionBtn.addEventListener('click', () => this.toggleMotion())
    this.ui.pauseSound.addEventListener('click', () => this.toggleSound())
    this.ui.pauseMotion.addEventListener('click', () => this.toggleMotion())
    this.ui.dashBtn.addEventListener('click', () => this.dash())
    this.ui.reloadBtn.addEventListener('click', () => this.startReload())
    this.ui.fireBtn.addEventListener('pointerdown', event => {
      event.preventDefault()
      this.input.firing = true
      this.ui.fireBtn.classList.add('pressed')
      this.ui.fireBtn.setPointerCapture?.(event.pointerId)
    })
    const stopFire = event => {
      event?.preventDefault?.()
      this.input.firing = false
      this.ui.fireBtn.classList.remove('pressed')
    }
    this.ui.fireBtn.addEventListener('pointerup', stopFire)
    this.ui.fireBtn.addEventListener('pointercancel', stopFire)
    this.ui.fireBtn.addEventListener('lostpointercapture', stopFire)
    this.ui.weaponSlots.addEventListener('click', event => {
      const slot = event.target.closest('[data-slot]')
      if (!slot) return
      this.switchWeapon(Number(slot.dataset.slot))
    })
    this.ui.voiceType.addEventListener('keydown', event => {
      if (event.key === 'Enter') event.stopPropagation()
    })
    window.addEventListener('contextmenu', event => event.preventDefault())
    this.syncSettingsButtons()
  }

  initInput() {
    const canvas = this.canvas
    window.addEventListener('keydown', event => {
      const code = event.code
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) event.preventDefault()
      if (event.repeat) return
      if (code === 'KeyV') {
        if (this.state === 'playing' || this.state === 'paused') this.openVoiceForge({ fromPause: this.state === 'paused' })
        return
      }
      if (code === 'Escape') {
        if (this.state === 'playing') this.pauseGame()
        else if (this.state === 'paused') this.resumeGame()
        return
      }
      if (this.state !== 'playing') return
      this.input.keys.add(code)
      if (code === 'KeyR') this.startReload()
      if (code === 'Space') this.dash()
      if (code === 'Digit1') this.switchWeapon(0)
      if (code === 'Digit2') this.switchWeapon(1)
      if (code === 'Digit3') this.switchWeapon(2)
      if (code === 'Digit4') this.switchWeapon(3)
    })
    window.addEventListener('keyup', event => this.input.keys.delete(event.code))
    window.addEventListener('blur', () => {
      this.input.keys.clear()
      this.input.firing = false
      this.ui.fireBtn.classList.remove('pressed')
    })

    canvas.addEventListener('pointerdown', event => {
      if (this.state !== 'playing') return
      if (event.pointerType === 'touch') return
      this.input.firing = true
      this.input.lastPointer = { x: event.clientX, y: event.clientY, id: event.pointerId }
      if (!this.input.pointerLocked) {
        try { canvas.requestPointerLock?.() } catch {}
      }
    })
    canvas.addEventListener('pointermove', event => {
      if (this.state !== 'playing' || event.pointerType === 'touch') return
      if (this.input.pointerLocked) return
      if (!this.input.lastPointer || this.input.lastPointer.id !== event.pointerId) return
      this.input.lookX += event.clientX - this.input.lastPointer.x
      this.input.lookY += event.clientY - this.input.lastPointer.y
      this.input.lastPointer.x = event.clientX
      this.input.lastPointer.y = event.clientY
    })
    const stopMouse = () => {
      this.input.firing = false
      this.input.lastPointer = null
    }
    canvas.addEventListener('pointerup', stopMouse)
    canvas.addEventListener('pointercancel', stopMouse)
    document.addEventListener('mousemove', event => {
      if (this.input.pointerLocked && this.state === 'playing') {
        this.input.lookX += event.movementX || 0
        this.input.lookY += event.movementY || 0
      }
    })
    document.addEventListener('pointerlockchange', () => {
      this.input.pointerLocked = document.pointerLockElement === canvas
    })
    document.addEventListener('mousedown', event => {
      if (event.button === 0 && event.target === canvas && this.state === 'playing') this.input.firing = true
    })
    document.addEventListener('mouseup', event => {
      if (event.button === 0) this.input.firing = false
    })

    this.initTouchControls()
  }

  initTouchControls() {
    const zone = this.ui.moveZone
    const base = this.ui.joystickBase
    const knob = this.ui.joystickKnob
    const setKnob = (x, y) => {
      knob.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
    }
    const reset = () => {
      this.input.joystickX = 0
      this.input.joystickY = 0
      this.input.joystickId = null
      setKnob(0, 0)
      knob.style.boxShadow = ''
    }
    zone.addEventListener('pointerdown', event => {
      if (this.state !== 'playing') return
      event.preventDefault()
      this.input.joystickId = event.pointerId
      zone.setPointerCapture?.(event.pointerId)
      this.updateJoystick(event)
    })
    zone.addEventListener('pointermove', event => {
      if (event.pointerId !== this.input.joystickId) return
      event.preventDefault()
      this.updateJoystick(event)
    })
    zone.addEventListener('pointerup', reset)
    zone.addEventListener('pointercancel', reset)
    zone.addEventListener('lostpointercapture', reset)
    this.updateJoystick = event => {
      const rect = base.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      let dx = event.clientX - cx
      let dy = event.clientY - cy
      const max = rect.width * .34
      const len = Math.hypot(dx, dy)
      if (len > max) {
        dx = dx / len * max
        dy = dy / len * max
      }
      this.input.joystickX = dx / max
      this.input.joystickY = dy / max
      setKnob(dx, dy)
      knob.style.boxShadow = '0 0 30px rgba(109,246,255,.4), inset 0 0 14px rgba(109,246,255,.3)'
    }

    const look = this.ui.lookZone
    look.addEventListener('pointerdown', event => {
      if (this.state !== 'playing') return
      event.preventDefault()
      this.input.lookId = event.pointerId
      this.input.lastPointer = { x: event.clientX, y: event.clientY, id: event.pointerId }
      look.setPointerCapture?.(event.pointerId)
    })
    look.addEventListener('pointermove', event => {
      if (event.pointerId !== this.input.lookId) return
      event.preventDefault()
      if (!this.input.lastPointer) return
      this.input.lookX += event.clientX - this.input.lastPointer.x
      this.input.lookY += event.clientY - this.input.lastPointer.y
      this.input.lastPointer.x = event.clientX
      this.input.lastPointer.y = event.clientY
    })
    const stopLook = event => {
      if (event.pointerId !== this.input.lookId) return
      this.input.lookId = null
      this.input.lastPointer = null
    }
    look.addEventListener('pointerup', stopLook)
    look.addEventListener('pointercancel', stopLook)
    look.addEventListener('lostpointercapture', stopLook)
  }

  toggleSound() {
    this.settings.sound = !this.settings.sound
    this.audio.setMuted(!this.settings.sound)
    this.ui.soundBtn.classList.toggle('muted', !this.settings.sound)
    this.ui.soundBtn.setAttribute('aria-label', this.settings.sound ? 'Silenciar som' : 'Ativar som')
    this.syncSettingsButtons()
    this.showToast(this.settings.sound ? 'ÁUDIO ATIVADO' : 'ÁUDIO SILENCIADO')
  }

  async toggleMotion() {
    if (this.settings.motion) {
      this.settings.motion = false
      this.tilt.enabled = false
      window.removeEventListener('deviceorientation', this.motionHandler)
      this.ui.motionBtn.classList.remove('active')
      this.syncSettingsButtons()
      this.showToast('INCLINAÇÃO DESATIVADA')
      return
    }
    if (!window.DeviceOrientationEvent) {
      this.showToast('GIROSCÓPIO INDISPONÍVEL NESTE DISPOSITIVO', true)
      return
    }
    try {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission()
        if (permission !== 'granted') {
          this.showToast('PERMISSÃO DE MOVIMENTO NEGADA', true)
          return
        }
      }
      this.settings.motion = true
      this.tilt.enabled = true
      this.tilt.calibrated = false
      this.tilt.samples = 0
      this.tilt.baseX = 0
      this.tilt.baseY = 0
      window.addEventListener('deviceorientation', this.motionHandler)
      this.ui.motionBtn.classList.add('active')
      this.syncSettingsButtons()
      this.showToast('INCLINAÇÃO ATIVADA · CALIBRANDO')
    } catch (error) {
      this.showToast('NÃO FOI POSSÍVEL ATIVAR O GIROSCÓPIO', true)
    }
  }

  handleOrientation(event) {
    if (!this.tilt.enabled || event.beta === null || event.gamma === null) return
    const angle = (screen.orientation?.angle ?? window.orientation ?? 0) | 0
    let x = event.gamma
    let y = event.beta
    if (angle === 90) { x = event.beta; y = -event.gamma }
    else if (angle === -90 || angle === 270) { x = -event.beta; y = event.gamma }
    if (!this.tilt.calibrated) {
      this.tilt.baseX += x
      this.tilt.baseY += y
      this.tilt.samples++
      if (this.tilt.samples >= 8) {
        this.tilt.baseX /= this.tilt.samples
        this.tilt.baseY /= this.tilt.samples
        this.tilt.calibrated = true
      }
      return
    }
    const dx = x - this.tilt.baseX
    const dy = y - this.tilt.baseY
    const dead = .07
    this.tilt.x = Math.abs(dx / 24) > dead ? clamp(dx / 24, -1, 1) : 0
    this.tilt.y = Math.abs(dy / 24) > dead ? clamp(dy / 24, -1, 1) : 0
  }

  syncSettingsButtons() {
    this.ui.pauseSound.textContent = `SOM: ${this.settings.sound ? 'ON' : 'OFF'}`
    this.ui.pauseSound.classList.toggle('on', this.settings.sound)
    this.ui.pauseMotion.textContent = `INCLINAÇÃO: ${this.settings.motion ? 'ON' : 'OFF'}`
    this.ui.pauseMotion.classList.toggle('on', this.settings.motion)
    this.ui.soundBtn.classList.toggle('muted', !this.settings.sound)
    this.ui.motionBtn.classList.toggle('active', this.settings.motion)
  }

  setMicStatus(status, label) {
    this.ui.micPreflightLabel.textContent = label
    const dot = this.ui.micPreflight.querySelector('.mic-dot')
    dot?.classList.toggle('on', status === 'on')
    dot?.classList.toggle('error', status === 'error')
  }

  equipWeapon(weapon, { silent = false } = {}) {
    if (!weapon) return
    if (this.weaponGroup) {
      this.camera.remove(this.weaponGroup)
      disposeObject(this.weaponGroup, true)
    }
    const model = createWeaponModel(weapon)
    const bases = {
      pistol: [.3, -.24, -.88],
      rifle: [.34, -.28, -1.02],
      smg: [.32, -.27, -.94],
      shotgun: [.33, -.28, -1],
      sniper: [.31, -.28, -1.12],
      cannon: [.32, -.3, -1.04],
      launcher: [.32, -.3, -1.04],
      bow: [.34, -.26, -.96],
      staff: [.35, -.28, -1],
      gauntlet: [.3, -.26, -.84],
      blade: [.33, -.25, -.88],
      default: [.33, -.28, -.98]
    }
    const base = bases[weapon.archetypeKey] || bases.default
    const rotation = [.06, .16, -.02]
    model.scale.setScalar(.58)
    model.position.set(...base)
    model.rotation.set(...rotation)
    model.userData.basePosition = new THREE.Vector3(...base)
    model.userData.baseRotation = new THREE.Euler(...rotation)
    this.camera.add(model)
    this.weaponGroup = model
    this.currentWeapon = weapon
    if (weapon.ammo == null) weapon.ammo = weapon.mag
    this.reloading = false
    this.reloadEnd = 0
    this.nextShotAt = 0
    this.recoilKick = 0
    this.updateWeaponUI()
    this.renderArsenal()
    if (!silent) this.showToast(`EQUIPADA · ${weapon.name}`)
  }

  updateWeaponUI() {
    const weapon = this.currentWeapon
    if (!weapon) return
    this.ui.weaponName.textContent = weapon.name
    this.ui.weaponName.classList.toggle('long', weapon.name.length > 14 && weapon.name.length <= 26)
    this.ui.weaponName.classList.toggle('very-long', weapon.name.length > 26)
    this.ui.weaponSub.textContent = weapon.subtitle
    this.ui.weaponRarity.textContent = weapon.rarity.label
    this.ui.weaponRarity.style.color = weapon.rarity.color
    this.ui.weaponName.style.textShadow = `0 0 24px rgba(${weapon.rgb},.3)`
    this.ui.hud.style.setProperty('--accent', weapon.color)
    this.ui.hud.style.setProperty('--accent-rgb', weapon.rgb)
    const ammo = weapon.ammo ?? weapon.mag
    this.ui.ammoCurrent.textContent = weapon.infinite ? '∞' : String(ammo)
    this.ui.ammoMax.textContent = weapon.infinite ? '∞' : String(weapon.mag)
    this.ui.ammoBlock.classList.toggle('low', !weapon.infinite && ammo <= Math.max(1, Math.ceil(weapon.mag * .25)))
    this.ui.reloadLabel.textContent = this.reloading ? 'RECARREGANDO' : 'MUNIÇÃO'
    this.ui.reloadLabel.classList.toggle('reloading', this.reloading)
  }

  renderArsenal() {
    this.ui.weaponSlots.innerHTML = ''
    for (let i = 0; i < 4; i++) {
      const weapon = this.arsenal[i]
      const button = document.createElement('button')
      button.type = 'button'
      button.className = `slot${weapon ? '' : ' empty'}${i === this.activeIndex && weapon ? ' active' : ''}`
      button.setAttribute('role', 'listitem')
      if (weapon) {
        button.dataset.slot = String(i)
        button.setAttribute('aria-label', `Equipar ${weapon.name}`)
        button.style.setProperty('--slot-color', weapon.color)
        button.style.setProperty('--slot-rgb', weapon.rgb)
      }
      const num = document.createElement('span')
      num.className = 'slot-num'
      num.textContent = String(i + 1)
      const glyph = document.createElement('span')
      glyph.className = 'slot-glyph'
      glyph.textContent = weapon ? weapon.glyph : '·'
      const name = document.createElement('span')
      name.className = 'slot-name'
      name.textContent = weapon ? weapon.name : 'VAZIO'
      button.append(num, glyph, name)
      this.ui.weaponSlots.appendChild(button)
    }
  }

  switchWeapon(index) {
    if (index < 0 || index >= this.arsenal.length || index === this.activeIndex) return
    this.activeIndex = index
    this.equipWeapon(this.arsenal[index])
    this.audio.ui()
  }

  startReload() {
    const weapon = this.currentWeapon
    if (!weapon || weapon.infinite || this.reloading) return
    const ammo = weapon.ammo ?? weapon.mag
    if (ammo >= weapon.mag) return
    this.reloading = true
    this.reloadEnd = this.elapsed + weapon.reload
    this.ui.reloadLabel.textContent = 'RECARREGANDO'
    this.ui.reloadLabel.classList.add('reloading')
    this.audio.reload()
  }

  finishReload() {
    if (!this.currentWeapon) return
    this.currentWeapon.ammo = this.currentWeapon.mag
    this.reloading = false
    this.reloadEnd = 0
    this.ui.reloadLabel.textContent = 'MUNIÇÃO'
    this.ui.reloadLabel.classList.remove('reloading')
    this.updateWeaponUI()
  }

  updateHud() {
    const p = this.player
    const healthPct = clamp(p.health / p.maxHealth, 0, 1) * 100
    const shieldPct = clamp(p.shield / p.maxShield, 0, 1) * 100
    this.ui.healthFill.style.width = `${healthPct}%`
    this.ui.healthGhost.style.width = `${healthPct}%`
    this.ui.healthValue.textContent = String(Math.ceil(p.health))
    this.ui.shieldFill.style.width = `${shieldPct}%`
    this.ui.shieldValue.textContent = String(Math.ceil(p.shield))
    this.ui.dashFill.style.width = `${clamp(1 - p.dashCooldown / 3.2, 0, 1) * 100}%`
    this.ui.waveNumber.textContent = String(Math.max(1, this.wave)).padStart(2, '0')
    this.ui.scoreValue.textContent = formatScore(this.stats.score)
    const comboMult = this.comboMultiplier()
    this.ui.comboValue.textContent = `x${comboMult.toFixed(1).replace('.0', '')}`
    const weapon = this.currentWeapon
    if (weapon) {
      const ammo = weapon.infinite ? '∞' : String(weapon.ammo ?? weapon.mag)
      this.ui.ammoCurrent.textContent = ammo
      this.ui.ammoBlock.classList.toggle('low', !weapon.infinite && (weapon.ammo ?? 0) <= Math.max(1, Math.ceil(weapon.mag * .25)))
    }
  }

  comboMultiplier() {
    return clamp(1 + Math.floor(this.stats.combo / 4) * .5, 1, 6)
  }

  updateRadar() {
    const canvas = this.ui.radar
    if (!canvas || canvas.offsetParent === null) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const cx = w / 2
    const cy = h / 2
    const r = w / 2 - 4
    ctx.clearRect(0, 0, w, h)
    ctx.save()
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.clip()
    const bg = ctx.createRadialGradient(cx, cy, 2, cx, cy, r)
    bg.addColorStop(0, 'rgba(15,50,66,.62)')
    bg.addColorStop(.72, 'rgba(4,15,29,.5)')
    bg.addColorStop(1, 'rgba(1,5,13,.7)')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = 'rgba(109,246,255,.18)'
    ctx.lineWidth = 1
    for (const rr of [r * .33, r * .66, r]) {
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, TAU); ctx.stroke()
    }
    ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke()
    const yaw = this.player.yaw
    const cos = Math.cos(yaw)
    const sin = Math.sin(yaw)
    for (const enemy of this.enemies) {
      if (enemy.dead) continue
      const dx = enemy.group.position.x - this.player.position.x
      const dz = enemy.group.position.z - this.player.position.z
      const localX = dx * cos + dz * sin
      const localZ = -dx * sin + dz * cos
      const scale = r / 31
      const px = cx + localX * scale
      const py = cy - localZ * scale
      if (Math.hypot(px - cx, py - cy) > r - 3) continue
      ctx.beginPath()
      ctx.arc(px, py, enemy.type === 'boss' ? 5 : 2.6, 0, TAU)
      ctx.fillStyle = enemy.type === 'boss' ? '#ff2d55' : enemy.type === 'brute' ? '#ff9a3c' : '#ff4bd8'
      ctx.shadowColor = ctx.fillStyle
      ctx.shadowBlur = 8
      ctx.fill()
    }
    ctx.shadowBlur = 0
    ctx.restore()
    ctx.save()
    ctx.translate(cx, cy)
    ctx.fillStyle = '#dffeff'
    ctx.shadowColor = '#6df6ff'
    ctx.shadowBlur = 8
    ctx.beginPath()
    ctx.moveTo(0, -8)
    ctx.lineTo(5.5, 6)
    ctx.lineTo(0, 3)
    ctx.lineTo(-5.5, 6)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    const sweep = (performance.now() / 1600) % 1
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(sweep * TAU)
    const sweepGrad = ctx.createLinearGradient(0, 0, 0, -r)
    sweepGrad.addColorStop(0, 'rgba(109,246,255,0)')
    sweepGrad.addColorStop(1, 'rgba(109,246,255,.22)')
    ctx.fillStyle = sweepGrad
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, r, -Math.PI / 2 - .34, -Math.PI / 2)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  hideBoss() {
    this.ui.bossPanel.classList.add('hidden')
  }

  showBoss(enemy) {
    this.ui.bossPanel.classList.remove('hidden')
    this.ui.bossName.textContent = enemy.bossName || 'O SILÊNCIO'
    this.ui.bossFill.style.width = '100%'
  }

  updateBoss() {
    if (!this.boss || this.boss.dead) {
      this.hideBoss()
      return
    }
    this.ui.bossFill.style.width = `${clamp(this.boss.hp / this.boss.maxHp, 0, 1) * 100}%`
  }

  startWave(n) {
    this.wave = n
    this.stats.wave = n
    this.waveActive = true
    const isBossWave = n % 5 === 0
    this.enemiesRemaining = 3 + n * 2 + (isBossWave ? 4 : 0)
    this.maxAlive = Math.min(12, 4 + Math.floor(n / 2))
    this.nextSpawnAt = this.elapsed + .35
    this.nextWaveAt = 0
    this.ui.waveNumber.textContent = String(n).padStart(2, '0')
    this.audio.wave()
    if (isBossWave) {
      this.showBanner('AMEAÇA CRÍTICA DETECTADA', `ONDA ${String(n).padStart(2, '0')}`, 'UM CORO SEM VOZ SE APROXIMA')
      const boss = this.spawnEnemy('boss', { angle: this.player.yaw + Math.PI, distance: 19 })
      if (boss) this.boss = boss
    } else {
      this.showBanner('PROTOCOLO DE COMBATE', `ONDA ${String(n).padStart(2, '0')}`, n === 1 ? 'SOBREVIVA AO SILÊNCIO' : 'MAIS UMA VOZ SE LEVANTA')
    }
    this.updateHud()
  }

  chooseEnemyType() {
    const roll = Math.random()
    if (this.wave < 2) return 'drone'
    if (this.wave < 3) return roll < .7 ? 'drone' : 'stalker'
    if (this.wave < 6) {
      if (roll < .2) return 'brute'
      if (roll < .55) return 'stalker'
      return 'drone'
    }
    if (roll < .32) return 'brute'
    if (roll < .66) return 'stalker'
    return 'drone'
  }

  spawnEnemy(type, options = {}) {
    if (this.enemies.length >= 15) return null
    const def = ENEMY_TYPES[type] || ENEMY_TYPES.drone
    const waveScale = 1 + Math.max(0, this.wave - 1) * .15
    const hp = def.hp * waveScale
    const angle = options.angle ?? this.player.yaw + rand(-1.25, 1.25)
    const distance = options.distance ?? rand(15, 21)
    let x = this.player.position.x + Math.sin(angle) * distance
    let z = this.player.position.z - Math.cos(angle) * distance
    const radius = Math.hypot(x, z)
    if (radius > 27) {
      x = x / radius * 27
      z = z / radius * 27
    }
    const group = createEnemyModel(type, def.color, def.scale)
    const baseY = type === 'boss' ? 2.3 : 1.35 + def.scale * .2
    group.position.set(x, baseY, z)
    group.userData.baseScale = def.scale
    group.scale.setScalar(def.scale * .01)
    group.lookAt(this.player.position.x, baseY, this.player.position.z)
    this.scene.add(group)
    const enemy = {
      group,
      type,
      def,
      hp,
      maxHp: hp,
      baseY,
      baseScale: def.scale,
      speed: def.speed,
      radius: def.radius,
      score: def.score,
      damage: def.damage * (1 + Math.max(0, this.wave - 1) * .07),
      projectileSpeed: def.projectileSpeed,
      fireInterval: def.fire,
      nextFire: this.elapsed + rand(1.2, 2.6),
      phase: Math.random() * TAU,
      orbitDir: Math.random() < .5 ? -1 : 1,
      desired: type === 'boss' ? 10 : rand(8, 13),
      spawnAt: this.elapsed,
      flash: 0,
      frozenUntil: 0,
      dot: null,
      dead: false,
      bossName: type === 'boss' ? pick(BOSS_NAMES) : ''
    }
    this.enemies.push(enemy)
    this.spawnEnemySpawnEffect(group.position, def.color, type === 'boss' ? 2.2 : 1)
    if (type === 'boss') this.showBoss(enemy)
    return enemy
  }

  spawnEnemySpawnEffect(position, color, scale = 1) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(.4, .46, 48),
      new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: .8, depthWrite: false,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending
      })
    )
    ring.rotation.x = -Math.PI / 2
    ring.position.copy(position)
    ring.position.y = .08
    this.scene.add(ring)
    this.addEffect(ring, .65, (effect, dt) => {
      const t = effect.age / effect.life
      effect.mesh.scale.setScalar(1 + t * 7 * scale)
      effect.mesh.material.opacity = (1 - t) * .8
    })
    this.particles.spawn(position, color, 16 * scale, { speed: 3.5 * scale, life: .7, size: .16, up: .6 })
  }

  removeEnemy(enemy, dispose = true) {
    if (!enemy) return
    enemy.dead = true
    this.scene.remove(enemy.group)
    if (dispose) disposeObject(enemy.group, false)
    const index = this.enemies.indexOf(enemy)
    if (index >= 0) this.enemies.splice(index, 1)
    if (this.boss === enemy) {
      this.boss = null
      this.hideBoss()
    }
  }

  updateWaves(dt) {
    if (this.forgePause) return
    if (!this.waveActive) {
      if (this.nextWaveAt && this.elapsed >= this.nextWaveAt) {
        this.nextWaveAt = 0
        this.startWave(this.wave + 1)
      }
      return
    }
    if (this.enemiesRemaining > 0 && this.enemies.length < this.maxAlive && this.elapsed >= this.nextSpawnAt) {
      const type = this.chooseEnemyType()
      this.spawnEnemy(type)
      this.enemiesRemaining--
      this.nextSpawnAt = this.elapsed + rand(.58, 1.18)
    }
    if (this.enemiesRemaining <= 0 && this.enemies.length === 0) {
      this.waveActive = false
      const bonus = 250 * this.wave
      this.stats.score += bonus
      this.nextWaveAt = this.elapsed + 4.4
      this.player.health = Math.min(this.player.maxHealth, this.player.health + 18)
      this.player.shield = this.player.maxShield
      if (this.currentWeapon) {
        this.currentWeapon.ammo = this.currentWeapon.mag
      }
      this.showBanner('SETOR LIMPO', `ONDA ${String(this.wave).padStart(2, '0')} CONCLUÍDA`, `BÔNUS +${bonus} · PREPARE A VOZ`)
      this.feed('SETOR LIMPO', bonus)
      this.audio.wave()
      this.updateHud()
    }
  }

  updateEnemies(dt) {
    if (this.forgePause) return
    const playerPos = this.player.position
    for (const enemy of [...this.enemies]) {
      if (enemy.dead) continue
      const group = enemy.group
      const spawnAge = this.elapsed - enemy.spawnAt
      const spawnT = clamp(spawnAge / .5, 0, 1)
      const overshoot = spawnT < 1 ? 1 + Math.sin(spawnT * Math.PI) * .18 : 1
      group.scale.setScalar(enemy.baseScale * spawnT * overshoot)
      if (spawnT < 1) {
        group.position.y = enemy.baseY + (1 - spawnT) * 2.5
      }
      const frozen = this.elapsed < enemy.frozenUntil
      const toPlayer = this.tmpVec.set(playerPos.x - group.position.x, 0, playerPos.z - group.position.z)
      const dist = toPlayer.length()
      if (dist > .01) toPlayer.normalize()
      const strafe = this.tmpVec2.set(-toPlayer.z, 0, toPlayer.x).multiplyScalar(Math.sin(this.elapsed * 1.45 + enemy.phase) * enemy.orbitDir)
      const move = this.tmpVec3.set(0, 0, 0)
      if (dist > enemy.desired) move.add(toPlayer)
      else if (dist < enemy.desired * .68) move.sub(toPlayer)
      move.addScaledVector(strafe, .55)
      if (move.lengthSq() > 0) move.normalize()
      const speed = enemy.speed * (frozen ? .3 : 1) * (spawnT < .7 ? .2 : 1)
      group.position.addScaledVector(move, speed * dt)
      const arenaDist = Math.hypot(group.position.x, group.position.z)
      if (arenaDist > 27.2) {
        group.position.x = group.position.x / arenaDist * 27.2
        group.position.z = group.position.z / arenaDist * 27.2
      }
      const bob = Math.sin(this.elapsed * 2.1 + enemy.phase) * (enemy.type === 'boss' ? .34 : .18)
      group.position.y = enemy.baseY + bob + (spawnT < 1 ? (1 - spawnT) * 2.5 : 0)
      group.lookAt(playerPos.x, group.position.y, playerPos.z)
      const data = group.userData
      data.core.rotation.x += dt * (frozen ? .3 : 1.7)
      data.core.rotation.y += dt * (frozen ? .5 : 2.2)
      data.ring.rotation.z += dt * (frozen ? .15 : 1.4)
      data.ring2.rotation.y += dt * (frozen ? .2 : -1.1)
      for (let i = 0; i < data.shards.length; i++) {
        const shard = data.shards[i]
        const a = this.elapsed * .9 + shard.userData.phase
        shard.position.set(Math.cos(a) * 1.22, Math.sin(a * 1.7) * .3, Math.sin(a) * 1.22)
        shard.rotation.x += dt * 2
        shard.rotation.y += dt * 1.4
      }
      enemy.flash = Math.max(0, enemy.flash - dt * 5.2)
      data.coreMat.emissiveIntensity = (frozen ? 1.1 : 2.4) + enemy.flash * 6
      data.coreMat.emissive.set(frozen ? '#8cecff' : enemy.def.color)
      if (enemy.dot && this.elapsed >= enemy.dot.nextTick) {
        enemy.dot.nextTick = this.elapsed + .38
        const dotPos = group.position.clone()
        this.particles.spawn(dotPos, enemy.dot.color, 2, { speed: 1.2, life: .4, size: .1, up: .5 })
        this.damageEnemy(enemy, enemy.dot.dps * .38, null, dotPos, false, true)
        if (enemy.dead) continue
        if (this.elapsed >= enemy.dot.until) enemy.dot = null
      }
      if (spawnAge > .9 && this.elapsed >= enemy.nextFire && dist < 27) {
        this.enemyFire(enemy)
        enemy.nextFire = this.elapsed + enemy.fireInterval * rand(.72, 1.28)
      }
    }
  }

  enemyFire(enemy) {
    if (this.forgePause || this.state !== 'playing') return
    const group = enemy.group
    const start = new THREE.Vector3()
    group.userData.core.getWorldPosition(start)
    const target = this.player.position.clone()
    target.y = 1.35
    const dir = target.sub(start).normalize()
    const shots = enemy.type === 'boss' ? 3 : 1
    for (let i = 0; i < shots; i++) {
      const spread = enemy.type === 'boss' ? .11 : .035
      const shotDir = dir.clone()
      shotDir.x += rand(-spread, spread)
      shotDir.y += rand(-spread, spread)
      shotDir.z += rand(-spread, spread)
      shotDir.normalize()
      this.spawnEnemyProjectile(start, shotDir, enemy)
    }
    this.particles.spawn(start, enemy.def.color, 6, { speed: 2.5, life: .35, size: .13 })
    if (Math.random() < .55) this.audio.enemyShot()
  }

  spawnEnemyProjectile(position, direction, enemy) {
    const weapon = { color: enemy.def.color }
    const mesh = createProjectileMesh(weapon, 'orb')
    mesh.scale.setScalar(enemy.type === 'boss' ? 1.7 : 1)
    mesh.position.copy(position)
    this.scene.add(mesh)
    this.enemyProjectiles.push({
      mesh,
      vel: direction.clone().multiplyScalar(enemy.projectileSpeed),
      life: 0,
      maxLife: 7,
      damage: enemy.damage,
      radius: enemy.type === 'boss' ? .38 : .24,
      color: enemy.def.color,
      trail: 0
    })
  }

  removeEnemyProjectile(projectile) {
    if (!projectile) return
    this.scene.remove(projectile.mesh)
    disposeObject(projectile.mesh, false)
    const index = this.enemyProjectiles.indexOf(projectile)
    if (index >= 0) this.enemyProjectiles.splice(index, 1)
  }

  updateEnemyProjectiles(dt) {
    if (this.forgePause) return
    const playerCenter = this.tmpVec.set(this.player.position.x, 1.35, this.player.position.z)
    for (const p of [...this.enemyProjectiles]) {
      p.life += dt
      p.mesh.position.addScaledVector(p.vel, dt)
      p.trail += dt
      if (p.trail > .04) {
        p.trail = 0
        this.particles.spawnOne(p.mesh.position, p.color, new THREE.Vector3(rand(-.3, .3), rand(-.2, .2), rand(-.3, .3)), { size: .12, life: .34, drag: .9 })
      }
      if (p.mesh.position.y < .08 || p.life > p.maxLife) {
        this.removeEnemyProjectile(p)
        continue
      }
      if (p.mesh.position.distanceTo(playerCenter) < .82 + p.radius) {
        this.damagePlayer(p.damage)
        this.particles.spawn(p.mesh.position, p.color, 14, { speed: 3, life: .5, size: .15 })
        this.removeEnemyProjectile(p)
      }
    }
  }

  damagePlayer(amount, source = null) {
    if (this.state !== 'playing' || this.player.dashInvuln > 0 || this.forgePause) return
    let remaining = amount
    if (this.player.shield > 0) {
      const absorbed = Math.min(this.player.shield, remaining)
      this.player.shield -= absorbed
      remaining -= absorbed
      if (this.player.shield <= .01) {
        this.player.shield = 0
        this.showToast('ESCUDO ROMPIDO', true)
      }
    }
    if (remaining > 0) this.player.health -= remaining
    this.player.lastDamage = this.elapsed
    this.trauma = Math.min(1, this.trauma + .48)
    this.audio.hurt()
    this.ui.damageFlash.classList.add('on')
    setTimeout(() => this.ui.damageFlash.classList.remove('on'), 150)
    if (source) {
      const away = this.player.position.clone().sub(source).setY(0).normalize()
      this.player.velocity.addScaledVector(away, 2.2)
    }
    this.particles.spawn(new THREE.Vector3(this.player.position.x, 1.3, this.player.position.z), '#ff526d', 8, { speed: 2, life: .35, size: .12 })
    this.updateHud()
    if (this.player.health <= 0) {
      this.player.health = 0
      this.updateHud()
      this.gameOver()
    }
  }

  dash() {
    if (this.state !== 'playing' || this.player.dashCooldown > 0 || this.forgePause) return
    const dir = this.getMoveDirection()
    if (dir.lengthSq() < .01) {
      dir.set(Math.sin(this.player.yaw), 0, -Math.cos(this.player.yaw))
    }
    dir.y = 0
    dir.normalize()
    this.player.dashDir.copy(dir)
    this.player.dashTime = .28
    this.player.dashInvuln = .46
    this.player.dashCooldown = 3.2
    this.trauma = Math.min(1, this.trauma + .18)
    this.audio.dash()
    this.particles.spawn(this.player.position.clone().setY(1), '#6df6ff', 22, { speed: 5, life: .5, size: .16, drag: .86 })
    this.ui.dashFill.style.width = '0%'
  }

  getMoveDirection() {
    let forward = 0
    let right = 0
    const keys = this.input.keys
    if (keys.has('KeyW') || keys.has('ArrowUp')) forward += 1
    if (keys.has('KeyS') || keys.has('ArrowDown')) forward -= 1
    if (keys.has('KeyD') || keys.has('ArrowRight')) right += 1
    if (keys.has('KeyA') || keys.has('ArrowLeft')) right -= 1
    forward -= this.input.joystickY
    right += this.input.joystickX
    const len = Math.hypot(forward, right)
    if (len > 1) {
      forward /= len
      right /= len
    }
    const sin = Math.sin(this.player.yaw)
    const cos = Math.cos(this.player.yaw)
    return new THREE.Vector3(
      sin * forward + cos * right,
      0,
      -cos * forward + sin * right
    )
  }

  updatePlayer(dt) {
    const p = this.player
    const lookSensitivity = IS_TOUCH ? .0031 : .0022
    p.yaw += this.input.lookX * lookSensitivity
    p.pitch -= this.input.lookY * lookSensitivity
    this.input.lookX = 0
    this.input.lookY = 0
    if (this.tilt.enabled) {
      p.yaw += this.tilt.x * 1.7 * dt
      p.pitch -= this.tilt.y * 1.05 * dt
    }
    p.pitch = clamp(p.pitch, -1.22, 1.22)
    const move = this.getMoveDirection()
    const speed = p.dashTime > 0 ? 13.5 : 4.7
    if (p.dashTime > 0) move.copy(p.dashDir)
    p.velocity.x = damp(p.velocity.x, move.x * speed, p.dashTime > 0 ? 24 : 10, dt)
    p.velocity.z = damp(p.velocity.z, move.z * speed, p.dashTime > 0 ? 24 : 10, dt)
    p.position.x += p.velocity.x * dt
    p.position.z += p.velocity.z * dt
    const radius = Math.hypot(p.position.x, p.position.z)
    if (radius > 27.3) {
      p.position.x = p.position.x / radius * 27.3
      p.position.z = p.position.z / radius * 27.3
    }
    for (const collider of this.colliders) {
      const dx = p.position.x - collider.x
      const dz = p.position.z - collider.z
      const d = Math.hypot(dx, dz)
      const min = collider.radius + .42
      if (d < min && d > .001) {
        p.position.x = collider.x + dx / d * min
        p.position.z = collider.z + dz / d * min
      }
    }
    p.dashTime = Math.max(0, p.dashTime - dt)
    p.dashCooldown = Math.max(0, p.dashCooldown - dt)
    p.dashInvuln = Math.max(0, p.dashInvuln - dt)
    const moving = Math.hypot(p.velocity.x, p.velocity.z)
    p.bob += dt * (3 + moving * 1.5)
    if (this.elapsed - p.lastDamage > 5 && p.shield < p.maxShield) {
      p.shield = Math.min(p.maxShield, p.shield + 7 * dt)
    }
    this.trauma = Math.max(0, this.trauma - dt * 1.4)
    const shake = this.trauma * this.trauma
    const shakeX = (Math.random() - .5) * shake * .18
    const shakeY = (Math.random() - .5) * shake * .14
    const shakeZ = (Math.random() - .5) * shake * .12
    const bobY = Math.sin(p.bob * 2) * .018 * clamp(moving / 5, 0, 1)
    const bobX = Math.cos(p.bob) * .012 * clamp(moving / 5, 0, 1)
    this.camera.position.set(p.position.x + bobX + shakeX, 1.7 + bobY + shakeY, p.position.z + shakeZ)
    this.camera.rotation.set(p.pitch + shakeY * .08, -p.yaw + shakeX * .08, shake * (Math.random() - .5) * .03)
    const targetFov = 72 + (p.dashTime > 0 ? 9 : 0)
    this.camera.fov = damp(this.camera.fov, targetFov, 10, dt)
    this.camera.updateProjectionMatrix()
    this.updateWeaponView(dt, moving)
    this.updateHud()
  }

  updateWeaponView(dt, moving) {
    const group = this.weaponGroup
    if (!group) return
    const base = group.userData.basePosition
    const baseRot = group.userData.baseRotation
    this.recoilKick = damp(this.recoilKick, 0, 13, dt)
    const speedBob = clamp(moving / 5, 0, 1)
    const bobX = Math.cos(this.player.bob) * .012 * speedBob
    const bobY = Math.sin(this.player.bob * 2) * .009 * speedBob
    let reloadDip = 0
    if (this.reloading) {
      const remaining = Math.max(0, this.reloadEnd - this.elapsed)
      const t = Math.sin(clamp(1 - remaining / Math.max(.1, this.currentWeapon.reload), 0, 1) * Math.PI)
      reloadDip = t * .16
    }
    group.position.set(
      base.x + bobX,
      base.y + bobY - reloadDip,
      base.z + this.recoilKick * .08
    )
    group.rotation.set(
      baseRot.x + this.recoilKick * 1.9 + reloadDip * 2.1,
      baseRot.y + Math.sin(this.player.bob * .5) * .008,
      baseRot.z + Math.cos(this.player.bob) * .008 * speedBob - reloadDip * .35
    )
    const data = group.userData
    data.spinRing.rotation.z += dt * 1.4
    data.spinRing.rotation.x += dt * .6
    data.coreGlow.material.opacity = .48 + Math.sin(this.elapsed * 3.2) * .12
    if (data.muzzleFlash.visible) {
      data.muzzleFlash.material.opacity -= dt * 15
      data.muzzleLight.intensity = Math.max(0, data.muzzleLight.intensity - dt * 90)
      if (data.muzzleFlash.material.opacity <= 0) {
        data.muzzleFlash.visible = false
        data.muzzleLight.intensity = 0
      }
    }
  }

  fireWeapon() {
    const weapon = this.currentWeapon
    if (!weapon || this.reloading || this.forgePause || this.state !== 'playing') return
    if (!weapon.infinite && (weapon.ammo ?? weapon.mag) <= 0) {
      this.audio.empty()
      this.startReload()
      this.nextShotAt = this.elapsed + .3
      return
    }
    this.camera.updateMatrixWorld(true)
    const origin = new THREE.Vector3()
    this.weaponGroup.userData.muzzle.getWorldPosition(origin)
    const baseDir = new THREE.Vector3()
    this.camera.getWorldDirection(baseDir)
    const pellets = Math.max(1, weapon.pellets || 1)
    for (let i = 0; i < pellets; i++) {
      const dir = baseDir.clone()
      const spread = weapon.spread * (pellets > 1 ? 1.2 : 1)
      const angle = Math.random() * TAU
      const mag = Math.sqrt(Math.random()) * spread
      dir.x += Math.cos(angle) * mag
      dir.y += Math.sin(angle) * mag
      dir.z += rand(-spread, spread) * .35
      dir.normalize()
      if (IS_TOUCH && pellets === 1) {
        const assist = this.findAimAssist(dir, 35)
        if (assist) dir.lerp(assist, .28).normalize()
      }
      this.spawnProjectile(origin, dir, weapon)
      this.stats.shotsFired++
    }
    if (!weapon.infinite) {
      weapon.ammo = Math.max(0, (weapon.ammo ?? weapon.mag) - 1)
    }
    this.recoilKick = Math.min(2.5, this.recoilKick + weapon.recoil * 5.5)
    this.player.pitch = clamp(this.player.pitch + weapon.recoil * .45, -1.22, 1.22)
    this.player.yaw += rand(-1, 1) * weapon.recoil * .12
    this.trauma = Math.min(1, this.trauma + .07 + weapon.recoil * .6)
    this.audio.weaponShot(weapon)
    this.spawnMuzzleFlash(weapon)
    this.ui.reticle.classList.add('firing')
    setTimeout(() => this.ui.reticle.classList.remove('firing'), 70)
    this.nextShotAt = this.elapsed + 1 / weapon.rate
    this.updateWeaponUI()
    if (!weapon.infinite && weapon.ammo <= 0) {
      setTimeout(() => { if (this.state === 'playing' && weapon === this.currentWeapon && weapon.ammo <= 0) this.startReload() }, 260)
    }
  }

  findAimAssist(direction, maxDistance = 30) {
    let best = null
    let bestDot = .988
    for (const enemy of this.enemies) {
      if (enemy.dead) continue
      const to = enemy.group.position.clone().sub(this.player.position)
      const dist = to.length()
      if (dist > maxDistance || dist < .01) continue
      to.normalize()
      const dot = to.dot(direction)
      if (dot > bestDot) {
        bestDot = dot
        best = to
      }
    }
    return best
  }

  spawnMuzzleFlash(weapon) {
    const group = this.weaponGroup
    if (!group) return
    const data = group.userData
    data.muzzleFlash.visible = true
    data.muzzleFlash.material.opacity = 1
    data.muzzleFlash.scale.setScalar(weapon.archetypeKey === 'cannon' ? .95 : .62)
    data.muzzleFlash.material.color.set(weapon.color)
    data.muzzleLight.intensity = 9
    data.muzzleLight.color.set(weapon.color)
    const origin = new THREE.Vector3()
    data.muzzle.getWorldPosition(origin)
    const dir = new THREE.Vector3()
    this.camera.getWorldDirection(dir)
    this.particles.spawn(origin, weapon.color, 7, {
      speed: 3.5, life: .25, size: .11, drag: .85
    })
    this.particles.spawnOne(origin, '#ffffff', dir.clone().multiplyScalar(2), { size: .4, life: .12, drag: .8 })
  }

  spawnProjectile(origin, direction, weapon) {
    const type = weapon.projectile || 'orb'
    const mesh = createProjectileMesh(weapon, type)
    mesh.position.copy(origin)
    if (type === 'rocket' || type === 'arrow' || type === 'disc' || type === 'beam') {
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction)
    }
    const scale = clamp((weapon.size || 1) * (type === 'pellet' ? .9 : 1), .65, 1.5)
    mesh.scale.setScalar(scale)
    this.scene.add(mesh)
    this.projectiles.push({
      mesh,
      vel: direction.clone().multiplyScalar(weapon.speed),
      life: 0,
      maxLife: weapon.range / weapon.speed + .35,
      weapon,
      radius: type === 'rocket' ? .3 : type === 'pellet' ? .1 : .17,
      pierceLeft: weapon.pierce || 0,
      hit: new Set(),
      trail: 0,
      removed: false,
      type
    })
  }

  removeProjectile(projectile) {
    if (!projectile || projectile.removed) return
    projectile.removed = true
    this.scene.remove(projectile.mesh)
    disposeObject(projectile.mesh, false)
    const index = this.projectiles.indexOf(projectile)
    if (index >= 0) this.projectiles.splice(index, 1)
  }

  updateProjectiles(dt) {
    if (this.forgePause) return
    for (const p of [...this.projectiles]) {
      if (p.removed) continue
      p.life += dt
      if (p.weapon.homing > 0) {
        const target = this.nearestEnemy(p.mesh.position, 16)
        if (target) {
          const desired = target.group.position.clone().sub(p.mesh.position).normalize().multiplyScalar(p.weapon.speed)
          p.vel.lerp(desired, clamp(p.weapon.homing * dt * 1.6, 0, .3))
          if (p.type === 'rocket' || p.type === 'arrow' || p.type === 'disc') {
            p.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.vel.clone().normalize())
          }
        }
      }
      p.mesh.position.addScaledVector(p.vel, dt)
      p.trail += dt
      if (p.trail > .025) {
        p.trail = 0
        this.particles.spawnOne(p.mesh.position, p.weapon.color, new THREE.Vector3(rand(-.2, .2), rand(-.15, .15), rand(-.2, .2)), {
          size: p.type === 'rocket' ? .24 : .12, life: .32, drag: .9
        })
      }
      for (const enemy of [...this.enemies]) {
        if (enemy.dead || p.hit.has(enemy)) continue
        const hitRadius = enemy.radius + p.radius
        if (p.mesh.position.distanceToSquared(enemy.group.position) < hitRadius * hitRadius) {
          const point = p.mesh.position.clone()
          this.handleProjectileHit(p, enemy, point)
          if (p.removed) break
        }
      }
      if (p.removed) continue
      if (p.mesh.position.y < .06 || p.life > p.maxLife || Math.hypot(p.mesh.position.x, p.mesh.position.z) > 32) {
        if (p.weapon.explosive > 0) this.explode(p.mesh.position.clone(), p.weapon)
        this.removeProjectile(p)
      }
    }
  }

  nearestEnemy(position, maxDistance = 99) {
    let best = null
    let bestDist = maxDistance * maxDistance
    for (const enemy of this.enemies) {
      if (enemy.dead) continue
      const d = position.distanceToSquared(enemy.group.position)
      if (d < bestDist) {
        bestDist = d
        best = enemy
      }
    }
    return best
  }

  handleProjectileHit(projectile, enemy, point) {
    const weapon = projectile.weapon
    const crit = Math.random() < .11
    let damage = weapon.damage * (crit ? 1.55 : 1)
    this.stats.shotsHit++
    this.applyWeaponEffects(weapon, enemy, point, damage)
    this.damageEnemy(enemy, damage, weapon, point, crit)
    this.audio.hit(crit)
    this.hitmarker(false)
    this.particles.spawn(point, weapon.color, crit ? 14 : 8, { speed: 3, life: .4, size: .12, drag: .88 })
    if (weapon.explosive > 0) {
      this.explode(point, weapon)
      this.removeProjectile(projectile)
      return
    }
    if (projectile.pierceLeft > 0) {
      projectile.pierceLeft--
      projectile.hit.add(enemy)
    } else {
      this.removeProjectile(projectile)
    }
  }

  applyWeaponEffects(weapon, enemy, point, damage) {
    const el = weapon.elementKey
    if (weapon.freeze) {
      enemy.frozenUntil = this.elapsed + 2.4
      this.particles.spawn(point, '#8cecff', 8, { speed: 2, life: .6, size: .12 })
    }
    if (weapon.burn) {
      enemy.dot = { dps: Math.max(3, damage * .28), until: this.elapsed + 3.2, nextTick: this.elapsed + .38, color: '#ff7a3c' }
    }
    if (weapon.poison) {
      enemy.dot = { dps: Math.max(2, damage * .2), until: this.elapsed + 4.5, nextTick: this.elapsed + .38, color: '#84ff77' }
    }
    if (weapon.chain > 0 && el === 'lightning') this.chainLightning(enemy, weapon)
    if (weapon.voidPull && Math.random() < .28) this.createVoidField(point, weapon)
    if (weapon.lifesteal > 0) this.healPlayer(damage * weapon.lifesteal)
    if (el === 'holy') this.healPlayer(damage * .04)
    if (el === 'sonic') {
      const push = enemy.group.position.clone().sub(this.player.position).setY(0).normalize()
      enemy.group.position.addScaledVector(push, .65)
      this.audio.chain()
    }
    if (el === 'cosmic') {
      this.particles.spawn(point, '#a9b8ff', 6, { speed: 2.4, life: .5, size: .1 })
    }
  }

  healPlayer(amount) {
    if (amount <= 0 || this.state !== 'playing') return
    const before = this.player.health
    this.player.health = Math.min(this.player.maxHealth, this.player.health + amount)
    if (this.player.health > before + .5) {
      this.ui.healFlash.classList.add('on')
      setTimeout(() => this.ui.healFlash.classList.remove('on'), 110)
    }
  }

  chainLightning(source, weapon) {
    const from = source.group.position.clone()
    const targets = this.enemies
      .filter(enemy => enemy !== source && !enemy.dead && enemy.group.position.distanceTo(from) < 8.5)
      .sort((a, b) => a.group.position.distanceTo(from) - b.group.position.distanceTo(from))
      .slice(0, 2 + weapon.chain)
    if (!targets.length) return
    let origin = from
    for (const target of targets) {
      const end = target.group.position.clone()
      this.spawnLightning(origin, end, weapon.color)
      this.damageEnemy(target, weapon.damage * .34, null, end, false, true)
      origin = end
    }
    this.audio.chain()
  }

  spawnLightning(start, end, color) {
    const points = []
    const segments = 9
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const point = start.clone().lerp(end, t)
      if (i > 0 && i < segments) {
        point.x += rand(-.18, .18)
        point.y += rand(-.18, .18)
        point.z += rand(-.18, .18)
      }
      points.push(point)
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false
    })
    const line = new THREE.Line(geometry, material)
    this.scene.add(line)
    this.addEffect(line, .2, (effect) => {
      const t = effect.age / effect.life
      effect.mesh.material.opacity = 1 - t
    })
    this.particles.spawn(end, color, 8, { speed: 3, life: .35, size: .1 })
  }

  explode(position, weapon) {
    const radius = 1.8 + (weapon.explosive || 0) * 1.25
    const baseDamage = weapon.damage * Math.max(.55, weapon.explosive || .6) * .9
    for (const enemy of [...this.enemies]) {
      if (enemy.dead) continue
      const dist = enemy.group.position.distanceTo(position)
      if (dist < radius + enemy.radius) {
        const falloff = clamp(1 - dist / (radius + enemy.radius), .2, 1)
        this.damageEnemy(enemy, baseDamage * falloff, weapon, enemy.group.position.clone(), false, true)
      }
    }
    this.particles.spawn(position, weapon.color, 34, { speed: 8, life: .8, size: .24, drag: .9, up: .4 })
    this.particles.spawn(position, '#ffffff', 10, { speed: 12, life: .3, size: .2, drag: .84 })
    const flash = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture(weapon.color), color: weapon.color, transparent: true,
      opacity: .9, depthWrite: false, blending: THREE.AdditiveBlending
    }))
    flash.position.copy(position)
    flash.scale.setScalar(1.8)
    this.scene.add(flash)
    this.addEffect(flash, .32, (effect) => {
      const t = effect.age / effect.life
      effect.mesh.scale.setScalar(1.8 + t * radius * 1.5)
      effect.mesh.material.opacity = (1 - t) * .9
    })
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(.5, .58, 48),
      new THREE.MeshBasicMaterial({
        color: weapon.color, transparent: true, opacity: .8, depthWrite: false,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending
      })
    )
    ring.rotation.x = -Math.PI / 2
    ring.position.copy(position)
    ring.position.y = Math.max(.06, position.y)
    this.scene.add(ring)
    this.addEffect(ring, .55, (effect) => {
      const t = effect.age / effect.life
      effect.mesh.scale.setScalar(1 + t * radius * 2.2)
      effect.mesh.material.opacity = (1 - t) * .8
    })
    const distToPlayer = position.distanceTo(this.player.position)
    this.trauma = Math.min(1, this.trauma + clamp(1 - distToPlayer / 20, .1, .65))
    this.audio.explosion(weapon.explosive > 1 ? 1.2 : .9)
  }

  createVoidField(position, weapon) {
    const group = new THREE.Group()
    group.position.copy(position)
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(.32, 16, 16),
      new THREE.MeshBasicMaterial({ color: '#160326', transparent: true, opacity: .9 })
    )
    group.add(core)
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(.55 + i * .18, .014, 6, 40),
        new THREE.MeshBasicMaterial({
          color: weapon.color, transparent: true, opacity: .65,
          depthWrite: false, blending: THREE.AdditiveBlending
        })
      )
      ring.rotation.set(i * .9, i * .7, i * .3)
      group.add(ring)
    }
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture(weapon.color), color: weapon.color, transparent: true,
      opacity: .4, depthWrite: false, blending: THREE.AdditiveBlending
    }))
    glow.scale.set(3, 3, 1)
    group.add(glow)
    this.scene.add(group)
    this.addEffect(group, 2.4, (effect, dt) => {
      const t = effect.age / effect.life
      effect.mesh.rotation.y += dt * 2.4
      effect.mesh.rotation.x += dt * 1.2
      effect.mesh.children[0].scale.setScalar(1 + Math.sin(effect.age * 8) * .15)
      for (const enemy of [...this.enemies]) {
        if (enemy.dead) continue
        const dist = enemy.group.position.distanceTo(position)
        if (dist < 6) {
          const pull = position.clone().sub(enemy.group.position).setY(0).normalize()
          enemy.group.position.addScaledVector(pull, (1 - dist / 6) * 2.6 * dt)
        }
      }
      if (Math.random() < .5) {
        const p = position.clone().add(new THREE.Vector3(rand(-1, 1), rand(-.4, .8), rand(-1, 1)))
        this.particles.spawnOne(p, weapon.color, position.clone().sub(p).normalize().multiplyScalar(rand(.5, 2)), { size: .1, life: .4 })
      }
      for (const child of effect.mesh.children) {
        if (child.material && child.material.transparent && child !== effect.mesh.children[0]) {
          child.material.opacity = (1 - t) * .65
        }
      }
    })
    this.audio.chain()
  }

  damageEnemy(enemy, damage, weapon, point, crit = false, silent = false) {
    if (!enemy || enemy.dead) return
    enemy.hp -= damage
    enemy.flash = 1
    if (!silent) {
      const pos = point || enemy.group.position.clone()
      this.spawnDamageNumber(pos, damage, crit ? '#ffc85c' : weapon?.color || '#6df6ff', crit)
    }
    if (enemy.hp <= 0) {
      this.killEnemy(enemy, weapon)
    }
  }

  killEnemy(enemy, weapon) {
    if (!enemy || enemy.dead) return
    const position = enemy.group.position.clone()
    const color = enemy.def.color
    const type = enemy.type
    const score = enemy.score
    this.removeEnemy(enemy)
    this.stats.kills++
    this.stats.combo++
    this.stats.comboTimer = 4
    const multiplier = this.comboMultiplier()
    this.stats.bestCombo = Math.max(this.stats.bestCombo, multiplier)
    const points = Math.round(score * multiplier)
    this.stats.score += points
    this.feed(`${enemy.def.name} PURGADA`, points)
    this.particles.spawn(position, color, type === 'boss' ? 80 : 30, {
      speed: type === 'boss' ? 12 : 7, life: type === 'boss' ? 1.3 : .85,
      size: type === 'boss' ? .35 : .22, drag: .9, up: .3
    })
    this.particles.spawn(position, '#ffffff', type === 'boss' ? 26 : 8, {
      speed: type === 'boss' ? 16 : 9, life: .35, size: .18, drag: .84
    })
    this.audio.kill()
    if (type === 'boss') {
      this.trauma = 1
      this.audio.explosion(1.8)
      this.showBanner('AMEAÇA NEUTRALIZADA', enemy.bossName || 'O SILÊNCIO', 'O CORO FOI SILENCIADO')
      this.showToast('AMEAÇA CRÍTICA DESTRUÍDA', false)
      this.spawnPickup(position, 'health')
      this.spawnPickup(position.clone().add(new THREE.Vector3(1.4, 0, .8)), 'shield')
    } else if (Math.random() < .11) {
      this.spawnPickup(position, Math.random() < .55 ? 'health' : 'shield')
    }
    this.ui.comboValue.classList.remove('bump')
    void this.ui.comboValue.offsetWidth
    this.ui.comboValue.classList.add('bump')
    this.updateHud()
  }

  spawnPickup(position, type) {
    const color = type === 'health' ? '#63ffb4' : '#6df6ff'
    const group = new THREE.Group()
    group.position.copy(position)
    group.position.y = 1.1
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(.22, 0),
      new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 2.5, metalness: .3, roughness: .2
      })
    )
    group.add(core)
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(.34, .012, 6, 32),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .7, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    ring.rotation.x = Math.PI / 2
    group.add(ring)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture(color), color, transparent: true, opacity: .55,
      depthWrite: false, blending: THREE.AdditiveBlending
    }))
    glow.scale.set(1.2, 1.2, 1)
    group.add(glow)
    this.scene.add(group)
    this.pickups.push({ group, type, color, core, ring, life: 0 })
  }

  removePickup(pickup) {
    if (!pickup) return
    this.scene.remove(pickup.group)
    disposeObject(pickup.group, false)
    const index = this.pickups.indexOf(pickup)
    if (index >= 0) this.pickups.splice(index, 1)
  }

  updatePickups(dt) {
    if (this.forgePause) return
    for (const pickup of [...this.pickups]) {
      pickup.life += dt
      pickup.group.rotation.y += dt * 1.8
      pickup.group.position.y = 1.1 + Math.sin(pickup.life * 3 + pickup.group.position.x) * .14
      pickup.ring.rotation.z += dt * 2.5
      if (pickup.group.position.distanceTo(this.player.position) < 1.5) {
        if (pickup.type === 'health') {
          this.player.health = Math.min(this.player.maxHealth, this.player.health + 24)
          this.showToast('NÚCLEO VITAL +24', false)
        } else {
          this.player.shield = Math.min(this.player.maxShield, this.player.shield + 26)
          this.showToast('ESCUDO RESTAURADO +26', false)
        }
        this.audio.pickup()
        this.ui.healFlash.classList.add('on')
        setTimeout(() => this.ui.healFlash.classList.remove('on'), 150)
        this.particles.spawn(pickup.group.position, pickup.color, 12, { speed: 3, life: .5, size: .14 })
        this.removePickup(pickup)
        this.updateHud()
      } else if (pickup.life > 18) {
        this.removePickup(pickup)
      }
    }
  }

  spawnDamageNumber(worldPosition, amount, color, crit = false) {
    if (this.damageNumbers > 26) return
    const projected = worldPosition.clone().project(this.camera)
    if (projected.z < -1 || projected.z > 1) return
    if (Math.abs(projected.x) > 1.15 || Math.abs(projected.y) > 1.15) return
    const el = document.createElement('div')
    el.className = `damage-number${crit ? ' crit' : ''}`
    el.textContent = String(Math.round(amount))
    el.style.left = `${(projected.x * .5 + .5) * innerWidth}px`
    el.style.top = `${(-projected.y * .5 + .5) * innerHeight}px`
    el.style.setProperty('--accent', color)
    this.ui.damageLayer.appendChild(el)
    this.damageNumbers++
    setTimeout(() => {
      el.remove()
      this.damageNumbers = Math.max(0, this.damageNumbers - 1)
    }, 780)
  }

  hitmarker(kill = false) {
    const el = this.ui.hitmarker
    el.classList.remove('show', 'kill')
    void el.offsetWidth
    if (kill) el.classList.add('kill')
    el.classList.add('show')
    setTimeout(() => el.classList.remove('show'), 190)
  }

  addEffect(mesh, life, update) {
    this.effects.push({ mesh, life, age: 0, update })
  }

  removeEffect(effect) {
    if (!effect) return
    this.scene.remove(effect.mesh)
    disposeObject(effect.mesh, true)
    const index = this.effects.indexOf(effect)
    if (index >= 0) this.effects.splice(index, 1)
  }

  updateEffects(dt) {
    for (const effect of [...this.effects]) {
      effect.age += dt
      effect.update?.(effect, dt)
      if (effect.age >= effect.life) this.removeEffect(effect)
    }
  }

  openVoiceForge({ fromPause = false } = {}) {
    if (this.state === 'menu') return
    this.voiceOpen = true
    this.forgeFromPause = fromPause || this.state === 'paused'
    this.forgePause = this.state === 'playing'
    this.input.firing = false
    this.input.joystickX = 0
    this.input.joystickY = 0
    this.ui.pauseScreen.classList.add('hidden')
    this.ui.gameoverScreen.classList.add('hidden')
    this.ui.voiceOverlay.classList.remove('hidden')
    this.ui.voiceStatus.classList.remove('error')
    this.ui.voiceStatus.textContent = 'ABRINDO CANAL VOCAL…'
    this.ui.voiceTranscript.innerHTML = '<span class="transcript-ghost">“lança de gelo”</span>'
    this.ui.voiceOrb.classList.remove('listening')
    this.ui.voiceMic.classList.remove('listening')
    this.ui.voiceMicLabel.textContent = 'FALAR'
    this.ui.voicePill.classList.remove('listening')
    this.ui.forgeMobile.classList.remove('listening')
    this.voiceLevel = 0
    this.ui.voiceOrb.style.setProperty('--level', '0')
    this.audio.setPaused(true)
    this.audio.ui()
    document.exitPointerLock?.()
    this.voice.enable().then(ok => {
      if (!this.voiceOpen) return
      if (ok) {
        this.handleVoiceState('ready', 'CANAL PRONTO · TOQUE EM FALAR')
      } else {
        this.handleVoiceState('error', 'MICROFONE INDISPONÍVEL · DIGITE ABAIXO')
      }
    }).catch(() => {
      if (this.voiceOpen) this.handleVoiceState('error', 'MICROFONE INDISPONÍVEL · DIGITE ABAIXO')
    })
  }

  closeVoiceForge({ resume = true } = {}) {
    this.voiceOpen = false
    this.voice.cancel()
    this.ui.voiceOverlay.classList.add('hidden')
    this.ui.voiceOrb.classList.remove('listening')
    this.ui.voiceMic.classList.remove('listening')
    this.ui.voiceMicLabel.textContent = 'FALAR'
    this.ui.voicePill.classList.remove('listening')
    this.ui.forgeMobile.classList.remove('listening')
    this.ui.voiceStatus.classList.remove('error')
    this.voiceLevel = 0
    if (!resume) return
    this.forgePause = false
    if (this.forgeFromPause) {
      this.forgeFromPause = false
      if (this.state === 'paused') this.ui.pauseScreen.classList.remove('hidden')
    } else if (this.state === 'playing') {
      this.audio.setPaused(false)
    }
  }

  handleVoiceState(state, detail = '') {
    const labels = {
      idle: 'TOQUE EM FALAR E DESCREVA SUA ARMA',
      ready: 'CANAL PRONTO · TOQUE EM FALAR',
      listening: 'OUVINDO… FALE O NOME DA ARMA',
      processing: 'MATERIALIZANDO SUA ARMA…',
      fallback: 'CAPTURANDO ASSINATURA VOCAL…',
      error: detail || 'NÃO FOI POSSÍVEL CAPTAR A VOZ',
      denied: detail || 'MICROFONE BLOQUEADO · DIGITE SUA ARMA',
      unsupported: 'RECONHECIMENTO INDISPONÍVEL · DIGITE SUA ARMA'
    }
    const listening = state === 'listening'
    const failed = state === 'error' || state === 'denied' || state === 'unsupported'
    this.ui.voiceStatus.textContent = detail || labels[state] || labels.idle
    this.ui.voiceStatus.classList.toggle('error', failed)
    this.ui.voiceOrb.classList.toggle('listening', listening)
    this.ui.voiceMic.classList.toggle('listening', listening)
    this.ui.voicePill.classList.toggle('listening', listening)
    this.ui.forgeMobile.classList.toggle('listening', listening)
    this.ui.voiceMicLabel.textContent = listening
      ? 'OUVINDO…'
      : state === 'processing'
        ? 'FORJANDO…'
        : 'FALAR'
  }

  handleVoiceLevel(level) {
    this.voiceLevel = level
    if (this.ui.voiceOrb) this.ui.voiceOrb.style.setProperty('--level', String(level.toFixed(3)))
  }

  handleVoiceTranscript({ text, final } = {}) {
    const value = String(text || '').trim()
    if (!value) {
      this.ui.voiceTranscript.innerHTML = '<span class="transcript-ghost">“lança de gelo”</span>'
      return
    }
    this.ui.voiceTranscript.textContent = value
    this.ui.voiceTranscript.classList.toggle('final', Boolean(final))
  }

  handleVoiceResult(text, meta = {}) {
    this.forgeFromText(text, meta)
  }

  handleVoiceError(error, message) {
    const text = message || error?.message || 'NÃO FOI POSSÍVEL CAPTAR A VOZ'
    this.ui.voiceStatus.textContent = text.toUpperCase()
    this.ui.voiceStatus.classList.add('error')
    this.ui.voiceOrb.classList.remove('listening')
    this.ui.voiceMic.classList.remove('listening')
    this.ui.voiceMicLabel.textContent = 'TENTAR NOVAMENTE'
    if (this.voiceOpen) this.showToast(text, true)
  }

  forgeFromText(text, meta = {}) {
    const clean = String(text || '').trim()
    if (!clean) return null
    const weapon = forgeWeapon(clean)
    weapon.ammo = weapon.mag
    const full = this.arsenal.length >= 4
    const slot = full ? clamp(this.activeIndex, 0, 3) : this.arsenal.length
    if (full) this.arsenal[slot] = weapon
    else this.arsenal.push(weapon)
    this.activeIndex = slot
    this.equipWeapon(weapon, { silent: true })
    this.renderArsenal()
    this.updateHud()
    this.closeVoiceForge({ resume: false })
    this.showWeaponReveal(weapon, { hold: Boolean(meta?.hold) })
    if (meta?.source === 'fallback' && meta.message) {
      setTimeout(() => this.showToast(meta.message.toUpperCase()), 650)
    }
    return weapon
  }

  showWeaponReveal(weapon, { hold = false } = {}) {
    if (!weapon) return
    clearTimeout(this.revealTimer)
    this.revealTimer = null
    const reveal = this.ui.weaponReveal
    reveal.style.setProperty('--accent', weapon.color)
    reveal.style.setProperty('--accent-rgb', weapon.rgb)
    this.ui.revealRarity.textContent = weapon.rarity.label
    this.ui.revealGlyph.textContent = weapon.glyph
    this.ui.revealName.textContent = weapon.name
    this.ui.revealSub.textContent = weapon.subtitle
    this.ui.statDamageNum.textContent = String(weapon.scores.damage)
    this.ui.statRateNum.textContent = String(weapon.scores.rate)
    this.ui.statRangeNum.textContent = String(weapon.scores.range)
    this.ui.statDamage.style.width = '0%'
    this.ui.statRate.style.width = '0%'
    this.ui.statRange.style.width = '0%'
    reveal.classList.remove('hidden')
    const card = reveal.querySelector('.reveal-card')
    const flare = reveal.querySelector('.reveal-flare')
    const lines = reveal.querySelector('.reveal-lines')
    for (const el of [card, flare, lines]) {
      if (!el) continue
      el.style.animation = 'none'
      void el.offsetWidth
      el.style.animation = ''
    }
    requestAnimationFrame(() => {
      this.ui.statDamage.style.width = `${weapon.scores.damage}%`
      this.ui.statRate.style.width = `${weapon.scores.rate}%`
      this.ui.statRange.style.width = `${weapon.scores.range}%`
    })
    if (this.state === 'playing') this.forgePause = true
    this.audio.forge()
    this.revealTimer = setTimeout(() => {
      this.ui.weaponReveal.classList.add('hidden')
      this.revealTimer = null
      this.forgePause = false
      if (this.state === 'paused' && this.forgeFromPause) {
        this.forgeFromPause = false
        this.ui.pauseScreen.classList.remove('hidden')
      } else if (this.state === 'playing') {
        this.audio.setPaused(false)
        this.lastFrame = performance.now()
      }
    }, hold ? 60000 : 3600)
  }

  drawWaveform() {
    const canvas = this.ui.waveform
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const color = this.currentWeapon?.color || '#6df6ff'
    const level = clamp(this.voiceLevel || 0, 0, 1)
    ctx.clearRect(0, 0, w, h)
    ctx.save()
    ctx.strokeStyle = 'rgba(109,246,255,.11)'
    ctx.lineWidth = 1
    for (const y of [h * .3, h * .5, h * .7]) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }
    const data = this.voice.getWaveform()
    const amp = h * (.16 + level * .24)
    const now = performance.now() / 1000
    ctx.beginPath()
    for (let x = 0; x < w; x++) {
      let value
      if (data) {
        const i = Math.min(data.length - 1, Math.floor((x / (w - 1)) * (data.length - 1)))
        value = (data[i] - 128) / 128
      } else {
        value = Math.sin(x * .035 + now * 4) * .35
      }
      if (level < .012) value += Math.sin(x * .08 - now * 2.2) * .1
      const y = h * .5 + value * amp
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.lineWidth = 2
    ctx.strokeStyle = color
    ctx.shadowColor = color
    ctx.shadowBlur = 16
    ctx.stroke()
    ctx.lineWidth = .8
    ctx.strokeStyle = 'rgba(255,255,255,.72)'
    ctx.shadowBlur = 6
    ctx.stroke()
    ctx.restore()
  }

  updateAmbient(dt) {
    if (this.sky?.userData?.debris) this.sky.userData.debris.rotation.y += dt * .006
    for (const panel of this.holoPanels || []) {
      const phase = panel.userData.phase || 0
      panel.position.y = (panel.userData.baseY || panel.position.y) + Math.sin(performance.now() * .0007 + phase) * .16
      if (panel.material) panel.material.opacity = .16 + (Math.sin(performance.now() * .0011 + phase) * .5 + .5) * .1
    }
    for (const crystal of this.crystalMeshes || []) {
      const phase = crystal.userData.phase || 0
      crystal.position.y = (crystal.userData.baseY || crystal.position.y) + Math.sin(performance.now() * .0012 + phase) * .08
      crystal.rotation.y += dt * .35
    }
  }

  updateMenu(dt) {
    this.menuTime += dt
    this.updateAmbient(dt)
    const t = this.menuTime
    if (this.menuGroup) {
      const data = this.menuGroup.userData
      if (data.rings) {
        data.rings.rotation.y += dt * .22
        data.rings.rotation.z = Math.sin(t * .28) * .14
      }
      if (data.beam) data.beam.material.opacity = .07 + (Math.sin(t * 1.2) * .5 + .5) * .05
      if (data.pedestal) data.pedestal.rotation.z += dt * .12
      if (data.glow) data.glow.material.opacity = .2 + (Math.sin(t * .9) * .5 + .5) * .08
    }
    if (this.menuWeapon) {
      this.menuWeapon.position.y = Math.sin(t * 1.05) * .13
      this.menuWeapon.rotation.set(.15 + Math.sin(t * .8) * .05, -.55 + Math.sin(t * .46) * .28, .08 + Math.sin(t * .7) * .03)
    }
    this.camera.position.set(Math.sin(t * .24) * .22, 1.7 + Math.sin(t * .5) * .025, 12)
    this.camera.rotation.set(-.02 + Math.sin(t * .34) * .008, -.11 + Math.sin(t * .19) * .012, 0)
  }

  updateGame(dt) {
    if (this.forgePause) {
      this.particles.update(dt * .18)
      return
    }
    this.elapsed += dt
    this.updateWaves(dt)
    this.updateEnemies(dt)
    this.updatePlayer(dt)
    this.updateProjectiles(dt)
    this.updateEnemyProjectiles(dt)
    this.updatePickups(dt)
    this.updateEffects(dt)
    if (this.reloading && this.elapsed >= this.reloadEnd) this.finishReload()
    if (this.input.firing && this.elapsed >= this.nextShotAt) this.fireWeapon()
    if (this.stats.comboTimer > 0) {
      this.stats.comboTimer = Math.max(0, this.stats.comboTimer - dt)
      if (this.stats.comboTimer === 0) {
        this.stats.combo = 0
        this.updateHud()
      }
    }
    this.updateBoss()
    this.particles.update(dt)
    this.radarClock += dt
    if (this.radarClock >= .09) {
      this.radarClock = 0
      this.updateRadar()
    }
    this.updateAmbient(dt)
  }

  animate(now = performance.now()) {
    requestAnimationFrame(this.animate)
    const raw = Math.max(0, (now - this.lastFrame) / 1000)
    this.lastFrame = now
    const dt = Math.min(.05, raw)
    this.timeScale = damp(this.timeScale, this.targetTimeScale, 6, dt)
    if (this.state === 'menu') {
      this.updateMenu(dt)
    } else if (this.state === 'playing') {
      this.updateGame(dt * this.timeScale)
    } else {
      this.updateAmbient(dt)
      this.particles.update(dt * .25)
    }
    if (this.voiceOpen) this.drawWaveform()
    this.composer.render()
  }

  exposeDebugApi() {
    const api = {
      game: this,
      forge: (text, options = {}) => this.forgeFromText(text, { source: 'debug', ...options }),
      start: () => this.startGame(),
      pause: () => this.pauseGame(),
      resume: () => this.resumeGame(),
      menu: () => this.returnToMenu(),
      restart: () => this.restartGame(),
      spawn: (type = 'drone') => this.spawnEnemy(type),
      forgeMenu: () => this.openVoiceForge(),
      getState: () => ({
        state: this.state,
        wave: this.wave,
        score: this.stats.score,
        kills: this.stats.kills,
        enemies: this.enemies.length,
        health: this.player.health,
        shield: this.player.shield,
        activeWeapon: this.currentWeapon?.name || null,
        arsenal: this.arsenal.map(weapon => ({
          name: weapon.name,
          rarity: weapon.rarity.label,
          archetype: weapon.archetypeKey,
          element: weapon.elementKey,
          ammo: weapon.ammo,
          mag: weapon.mag
        }))
      })
    }
    window.__VOX__ = api
    window.__VOX_GAME__ = this
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char])
}

const game = new VoxGame()

