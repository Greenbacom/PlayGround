// SACI STRIKE — game bootstrap, waves, progression and presentation.
import * as THREE from 'three'
import { World } from './world.js'
import { Effects } from './effects.js'
import { Player } from './player.js'
import { EnemyManager } from './enemies.js'
import { WeaponSystem } from './weapons.js'
import { PickupManager } from './pickups.js'
import { AudioEngine } from './audio.js'
import { Input } from './input.js'
import { UI } from './ui.js'
import { rand, pick, clamp } from './utils.js'

const WAVES = [
  {
    kicker: 'ONDA 1', title: 'A FESTA COMEÇOU', sub: 'As máscaras acordaram.',
    interval: 1.55, comp: ['mask', 'mask', 'mask', 'mask', 'mask'],
  },
  {
    kicker: 'ONDA 2', title: 'VENTO NOVO', sub: 'Saci trouxe o redemoinho.',
    interval: 1.25, comp: ['saci', 'mask', 'saci', 'saci', 'mask', 'saci', 'saci', 'mask'],
  },
  {
    kicker: 'ONDA 3', title: 'BOI NA PRAÇA', sub: 'Não fique na linha da investida.',
    interval: 1.35, comp: ['boi', 'mask', 'saci', 'mask', 'saci', 'boi', 'mask', 'saci'],
  },
  {
    kicker: 'ONDA 4', title: 'ARRAIÁ PESADO', sub: 'A festa inteira contra você.',
    interval: 1.12, comp: ['boi', 'mask', 'saci', 'boi', 'mask', 'saci', 'saci', 'mask', 'boi'],
  },
  {
    kicker: 'CHEFÃO', title: 'TRIO ELÉTRICO', sub: 'Derrube os alto-falantes.',
    interval: 1, comp: ['boss'], boss: true,
  },
]

const TIPS = [
  'Dica: o DASH te deixa invulnerável por um instante.',
  'Dica: o foguete recarrega sozinho — use nos grupos.',
  'Dica: acerte as máscaras antes que elas acendam o halo.',
  'Dica: desvie do Boi para o lado, nunca de costas.',
  'Dica: a capivara não é um alvo. A capivara é família.',
  'Dica: o anel do Trio pode ser atravessado com DASH.',
]

class Game {
  constructor() {
    this.canvas = document.getElementById('game')
    this.state = 'menu'
    this.menuTime = 0
    this.elapsed = 0
    this.score = 0
    this.wave = 0
    this.combo = 0
    this.multiplier = 1
    this.lastKill = -99
    this.kills = 0
    this.waveActive = false
    this.spawnQueue = []
    this.spawnTimer = 0
    this.intermission = 0.9
    this.bossWave = false
    this.bossSpawned = false
    this.currentWave = null
    this.transitioning = false
    this.soundOn = true
    this.qualityHigh = true
    this.autoReduced = false
    this.fpsAccum = 0
    this.fpsFrames = 0
    this.playStart = 0

    this.loadSettings()

    if (this.inputTouch()) document.body.classList.add('touch')

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !this.inputTouch(),
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
    })
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.08
    this.renderer.autoClear = false
    this.renderer.setClearColor(0x0b0712, 1)

    this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.05, 320)
    this.camera.rotation.order = 'YXZ'

    this.world = new World(this.renderer)
    this.effects = new Effects(this.world.scene)
    this.audio = new AudioEngine()
    this.input = new Input(this.canvas, {
      onPause: () => this.pause(),
      onTiltStatus: (s) => this.onTiltStatus(s),
    })
    this.player = new Player(this.camera, this.world, this.input, this.audio)
    this.enemies = new EnemyManager(this)
    this.weapons = new WeaponSystem(this)
    this.pickups = new PickupManager(this)
    this.ui = new UI(this)

    this.player.onDamage = (dmg) => {
      this.ui.damage()
      this.audio.hurt()
      this.combo = 0
      this.multiplier = 1
    }
    this.player.onDeath = () => this.gameOver()
    this.player.onDash = () => {
      this.audio.dash()
      const p = this.player.position
      this.effects.ring(new THREE.Vector3(p.x, 0.2, p.z), { color: 0x2ee6c8, from: 0.4, to: 2.6, life: 0.35, flat: true })
      this.effects.spawnParticles(new THREE.Vector3(p.x, 0.4, p.z), 8, {
        color: 0x2ee6c8, color2: 0xffffff, speed: 3, spread: 0.3, life: 0.35, size: 0.35, gravity: 1,
      })
    }

    this.onHit = (kill) => this.ui.hit(kill)
    this.onExplosionHit = () => this.ui.hit(false)

    this.bindUI()
    this.bindWindow()

    this.ui.setBest(this.best)
    this.ui.setSound(this.soundOn)
    this.ui.setTilt(false)
    this.ui.setQuality(this.qualityHigh ? 'ALTO' : 'ECONOMIA')
    this.input.sensitivity = this.sensitivity
    this.audio.setMuted(!this.soundOn)
    this.applyQuality(false)
    this.ui.showScreen('menu')
    this.ui.setPlaying(false)
    this.resetRun()
    this.player.reset()
    this.setMenuCamera(0)
    this.resize()

    this.lastFrame = performance.now()
    this.loop = this.loop.bind(this)
    requestAnimationFrame(this.loop)
  }

  inputTouch() {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || matchMedia('(pointer: coarse)').matches
  }

  /* ------------------------------------------------------- settings */
  loadSettings() {
    this.best = 0
    this.sensitivity = 1
    this.soundOn = true
    this.qualityHigh = true
    try {
      this.best = Number(localStorage.getItem('saci-strike-best') || 0) || 0
      const s = JSON.parse(localStorage.getItem('saci-strike-settings') || '{}')
      if (typeof s.sensitivity === 'number') this.sensitivity = clamp(s.sensitivity, 0.3, 2)
      if (typeof s.sound === 'boolean') this.soundOn = s.sound
      if (typeof s.quality === 'boolean') this.qualityHigh = s.quality
    } catch { /* ignore */ }
  }

  saveSettings() {
    try {
      localStorage.setItem('saci-strike-settings', JSON.stringify({
        sensitivity: this.sensitivity,
        sound: this.soundOn,
        quality: this.qualityHigh,
      }))
    } catch { /* ignore */ }
  }

  saveBest() {
    if (this.score > this.best) {
      this.best = this.score
      try { localStorage.setItem('saci-strike-best', String(this.best)) } catch { /* ignore */ }
    }
    this.ui.setBest(this.best)
  }

  applyQuality(notify = true) {
    const dpr = Math.min(window.devicePixelRatio || 1, this.input.touch ? 1.7 : 2)
    this.renderer.setPixelRatio(this.qualityHigh ? dpr : 1)
    this.resize()
    this.ui.setQuality(this.qualityHigh ? 'ALTO' : 'ECONOMIA')
    if (notify) this.ui.toast(this.qualityHigh ? 'Gráficos em <b>ALTO</b>' : 'Gráficos em <b>ECONOMIA</b>', '', 1.6)
  }

  /* ----------------------------------------------------------- flow */
  async startGame() {
    if (this.transitioning) return
    this.transitioning = true
    this.audio.unlock()
    this.ui.fade(true)
    this.audio.setMuted(!this.soundOn)

    if (this.input.touch) {
      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen({ navigationUI: 'hide' })
        }
      } catch { /* iOS / denied */ }
      try { await screen.orientation?.lock?.('landscape') } catch { /* unsupported */ }
    }

    setTimeout(() => {
      this.resetRun()
      this.state = 'playing'
      this.playStart = performance.now()
      this.ui.showScreen(null)
      this.ui.setPlaying(true)
      this.ui.fade(false)
      this.input.setEnabled(true)
      this.transitioning = false
      if (this.input.touch && window.innerHeight > window.innerWidth) this.ui.rotateHint(true)
      this.lastFrame = performance.now()
    }, 420)
  }

  resetRun() {
    this.enemies.reset()
    this.pickups.reset()
    this.effects.clear()
    this.weapons.reset()
    this.player.reset()
    this.audio.reset()
    this.score = 0
    this.wave = 0
    this.combo = 0
    this.multiplier = 1
    this.kills = 0
    this.lastKill = -99
    this.waveActive = false
    this.spawnQueue = []
    this.spawnTimer = 0
    this.intermission = 0.9
    this.bossWave = false
    this.bossSpawned = false
    this.currentWave = null
    this.autoReduced = false
    this.fpsAccum = 0
    this.fpsFrames = 0
    this.ui.resetCache()
    this.ui.hideBoss()
    this.audio.setBossMode(false)
  }

  pause() {
    if (this.state !== 'playing' || this.transitioning) return
    this.state = 'paused'
    this.input.setEnabled(false)
    this.input.releasePointerLock()
    this.ui.showScreen('pause')
    this.ui.setPlaying(false)
  }

  resume() {
    if (this.state !== 'paused') return
    this.ui.showScreen(null)
    this.state = 'playing'
    this.input.setEnabled(true)
    this.input.recalibrate?.()
    this.ui.setPlaying(true)
    this.lastFrame = performance.now()
    if (!this.input.touch) {
      setTimeout(() => this.canvas.requestPointerLock?.(), 80)
    }
  }

  toMenu() {
    this.state = 'menu'
    this.transitioning = false
    this.input.setEnabled(false)
    this.input.releasePointerLock()
    this.enemies.reset()
    this.pickups.reset()
    this.effects.clear()
    this.weapons.reset()
    this.player.reset()
    this.audio.setBossMode(false)
    this.ui.setPlaying(false)
    this.ui.showScreen('menu')
    this.ui.hideBoss()
    this.ui.fade(false)
    this.ui.setBest(this.best)
    this.menuTime = 0
  }

  gameOver() {
    if (this.state !== 'playing') return
    this.state = 'over'
    this.input.setEnabled(false)
    this.input.releasePointerLock()
    this.audio.setBossMode(false)
    this.audio.gameOver()
    this.ui.setPlaying(false)
    this.saveBest()
    const wave = Math.max(1, this.wave)
    setTimeout(() => {
      if (this.state !== 'over') return
      document.getElementById('over-score').textContent = this.score.toLocaleString('pt-BR')
      document.getElementById('over-wave').textContent = wave
      document.getElementById('over-best').textContent = this.best.toLocaleString('pt-BR')
      document.getElementById('over-sub').textContent = pick([
        'O trio elétrico tomou a praça.',
        'A festa acabou cedo demais.',
        'Vila Vento ainda precisa de você.',
      ])
      document.getElementById('over-tip').textContent = pick(TIPS)
      this.ui.showScreen('over')
    }, 800)
  }

  onBossDefeated() {
    if (this.state !== 'playing') return
    this.score += 4000
    this.audio.setBossMode(false)
    this.audio.win()
    this.state = 'win'
    this.input.setEnabled(false)
    this.input.releasePointerLock()
    this.ui.setPlaying(false)
    this.ui.hideBoss()
    for (const e of [...this.enemies.list]) {
      if (!e.dead) e.takeDamage(999, e.center())
    }
    const center = new THREE.Vector3(0, 2, -18)
    this.effects.confetti(center)
    setTimeout(() => this.effects.confetti(center), 500)
    setTimeout(() => this.effects.confetti(center), 1100)
    setTimeout(() => this.effects.confetti(center), 1700)
    const acc = Math.round(this.weapons.accuracy * 100)
    setTimeout(() => {
      if (this.state !== 'win') return
      this.saveBest()
      document.getElementById('win-score').textContent = this.score.toLocaleString('pt-BR')
      document.getElementById('win-acc').textContent = `${acc}%`
      document.getElementById('win-best').textContent = this.best.toLocaleString('pt-BR')
      this.ui.showScreen('win')
    }, 1500)
    setTimeout(() => {
      if (this.state === 'win') this.enemies.reset()
    }, 2600)
  }

  /* ---------------------------------------------------------- waves */
  startNextWave() {
    if (this.wave >= WAVES.length) return
    const w = WAVES[this.wave]
    this.wave++
    this.currentWave = w
    this.bossWave = !!w.boss
    this.bossSpawned = false
    this.spawnQueue = [...w.comp]
    // shuffle spawn order
    for (let i = this.spawnQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.spawnQueue[i], this.spawnQueue[j]] = [this.spawnQueue[j], this.spawnQueue[i]]
    }
    this.spawnTimer = w.boss ? 1.4 : 0.5
    this.waveActive = true
    this.audio.wave()
    this.ui.announce(w.kicker, w.title, w.sub, w.boss ? 2800 : 2100)
    if (w.boss) {
      this.audio.setBossMode(true)
      this.player.shake = 0.5
    }
  }

  spawnBoss() {
    this.bossSpawned = true
    this.enemies.spawn('boss', new THREE.Vector3(0, 0, -34))
    this.audio.boss()
    this.ui.announce('CHEFÃO', 'TRIO ELÉTRICO', 'Derrube os alto-falantes', 2600)
  }

  updateWaves(dt) {
    if (this.state !== 'playing') return
    if (this.waveActive) {
      if (this.spawnQueue.length > 0) {
        this.spawnTimer -= dt
        if (this.spawnTimer <= 0) {
          const type = this.spawnQueue.shift()
          if (type === 'boss') {
            this.spawnBoss()
            this.spawnTimer = 999
          } else {
            const pos = this.world.randomSpawn()
            // avoid spawning right on top of the guardian
            const d = Math.hypot(pos.x - this.player.position.x, pos.z - this.player.position.z)
            if (d < 9) {
              const a = rand(0, Math.PI * 2)
              pos.set(Math.cos(a) * 23, 0, Math.sin(a) * 23)
              this.world.collide(pos, 0.8)
            }
            this.enemies.spawn(type, pos)
            this.spawnTimer = this.currentWave?.interval || 1.2
          }
        }
      } else if (!this.bossWave && this.enemies.aliveCount() === 0) {
        this.waveActive = false
        const bonus = 200 + this.wave * 150
        this.score += bonus
        this.audio.waveClear()
        this.ui.announce('ONDA LIMPA', `+${bonus} PONTOS`, 'Próxima em 3...', 1800)
        this.intermission = 3.6
        this.player.heal(8)
        this.player.addShield(5)
      }
    } else {
      this.intermission -= dt
      if (this.intermission <= 0) this.startNextWave()
    }
  }

  /* ------------------------------------------------------- callbacks */
  onEnemyKilled(e) {
    this.kills++
    const now = performance.now() / 1000
    if (now - this.lastKill < 3.3) this.combo++
    else this.combo = 1
    this.lastKill = now
    this.multiplier = Math.min(4, 1 + Math.max(0, this.combo - 1) * 0.35)
    this.score += Math.round(e.score * this.multiplier)
    this.ui.hit(true)
    const pos = e.group.position.clone()
    if (e.type === 'boi') {
      this.pickups.spawn('acai', pos)
      this.pickups.spawn(pick(['shield', 'rapid', 'coin']), pos.clone().add(new THREE.Vector3(rand(-1, 1), 0, rand(-1, 1))))
    } else {
      const chance = e.type === 'saci' ? 0.18 : 0.14
      if (Math.random() < chance) {
        const roll = Math.random()
        const type = roll < 0.4 ? 'acai' : roll < 0.66 ? 'shield' : roll < 0.82 ? 'rapid' : 'coin'
        this.pickups.spawn(type, pos)
      }
    }
  }

  onPickup(type) {
    this.audio.pickup()
    this.ui.pickupFlash()
    if (type === 'acai') {
      const healed = this.player.heal(30)
      this.score += 40
      this.ui.toast(`<b>Açaí</b> +${Math.round(healed)} vida`, 'good')
    } else if (type === 'shield') {
      this.player.addShield(25)
      this.ui.toast('<b>Maracujá</b> +25 escudo', 'good')
    } else if (type === 'rapid') {
      this.weapons.rapidTime = 8
      this.ui.toast('<b>Guaraná!</b> cadência turbo por 8s', 'good')
    } else {
      this.score += 150
      this.ui.toast('<b>Moeda</b> +150 pontos', 'good')
    }
  }

  onTiltStatus(status) {
    if (status === 'enabled') {
      this.ui.setTilt(true)
      this.ui.toast('<b>Giroscópio ativo</b> — incline para mirar', 'good', 2.4)
    } else if (status === 'disabled') {
      this.ui.setTilt(false)
      this.ui.toast('Inclinação desligada', '', 1.6)
    } else if (status === 'denied') {
      this.ui.setTilt(false)
      this.ui.toast('Permissão de movimento negada', 'warn', 3)
    } else if (status === 'unsupported') {
      this.ui.setTilt(false)
      this.ui.toast('Este aparelho não tem giroscópio', 'warn', 2.6)
    } else if (status === 'silent') {
      this.ui.setTilt(false)
      this.ui.toast('Sem dados do giroscópio — use o arrasto', 'warn', 2.8)
    }
  }

  async toggleTilt() {
    if (this.input.tiltEnabled) {
      this.input.disableTilt()
      return
    }
    const ok = await this.input.enableTilt()
    this.ui.setTilt(ok)
  }

  toggleSound() {
    this.soundOn = !this.soundOn
    this.audio.setMuted(!this.soundOn)
    this.ui.setSound(this.soundOn)
    this.saveSettings()
    if (this.soundOn) this.audio.pickup()
  }

  toggleQuality() {
    this.qualityHigh = !this.qualityHigh
    this.applyQuality()
    this.saveSettings()
  }

  setSensitivity(value) {
    this.sensitivity = clamp(value / 100, 0.3, 2)
    this.input.sensitivity = this.sensitivity
    document.getElementById('sensitivity-val').textContent = `${Math.round(value)}%`
    this.saveSettings()
  }

  /* ----------------------------------------------------------- UI bind */
  bindUI() {
    const on = (id, fn) => document.getElementById(id)?.addEventListener('click', fn)
    on('btn-play', () => this.startGame())
    on('btn-tilt', () => this.toggleTilt())
    on('btn-tilt-pause', () => this.toggleTilt())
    on('btn-pause', () => this.pause())
    on('btn-resume', () => this.resume())
    on('btn-restart', () => { this.ui.showScreen(null); this.startGame() })
    on('btn-quit', () => this.toMenu())
    on('btn-retry', () => this.startGame())
    on('btn-over-menu', () => this.toMenu())
    on('btn-win-again', () => this.startGame())
    on('btn-win-menu', () => this.toMenu())
    on('btn-sound-pause', () => this.toggleSound())
    on('btn-sound-hud', () => this.toggleSound())
    on('btn-quality', () => this.toggleQuality())

    const sens = document.getElementById('sensitivity')
    if (sens) {
      sens.value = String(Math.round(this.sensitivity * 100))
      document.getElementById('sensitivity-val').textContent = `${Math.round(this.sensitivity * 100)}%`
      sens.addEventListener('input', (e) => this.setSensitivity(Number(e.target.value)))
    }

    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault())
    document.addEventListener('gesturestart', (e) => e.preventDefault())
  }

  bindWindow() {
    window.addEventListener('resize', () => this.resize())
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.resize()
        if (this.state === 'playing' && this.input.touch) {
          this.ui.rotateHint(window.innerHeight > window.innerWidth)
        }
      }, 250)
    })
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pause()
    })
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.state === 'menu') this.startGame()
      if ((e.key === 'p' || e.key === 'P') && this.state === 'playing') this.pause()
      else if ((e.key === 'p' || e.key === 'P') && this.state === 'paused') this.resume()
    })
  }

  resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h, false)
    this.weapons?.resize(w / h)
  }

  setMenuCamera(dt) {
    this.menuTime += dt
    const a = this.menuTime * 0.075 + 0.4
    const r = 26.5
    this.camera.position.set(Math.cos(a) * r, 14.2 + Math.sin(this.menuTime * 0.25) * 1.1, Math.sin(a) * r)
    this.camera.lookAt(0, 1.8, -6)
    if (this.camera.fov !== 60) {
      this.camera.fov = 60
      this.camera.updateProjectionMatrix()
    }
  }

  /* ----------------------------------------------------------- loop */
  tick(dt) {
    if (this.state === 'menu') {
      this.setMenuCamera(dt)
      this.world.update(dt, null)
      this.effects.update(dt)
      return
    }
    if (this.state === 'playing') {
      this.elapsed += dt
      this.input.update(dt)
      this.player.update(dt)
      this.weapons.update(dt, this.input)
      this.enemies.update(dt)
      this.pickups.update(dt)
      this.world.update(dt, this.player.position)
      this.effects.update(dt)
      this.updateWaves(dt)
      this.ui.updateHUD()
      this.ui.updateBoss()

      const now = performance.now() / 1000
      if (this.combo > 0 && now - this.lastKill > 4.2) {
        this.combo = 0
        this.multiplier = 1
      }
      this.autoQuality(dt)
      return
    }
    if (this.state === 'paused') {
      this.world.update(dt * 0.25, this.player.position)
      return
    }
    // over / win — let the world breathe behind the panel
    this.world.update(dt, this.player.position)
    this.effects.update(dt)
  }

  autoQuality(dt) {
    if (this.autoReduced || performance.now() - this.playStart < 7000) return
    this.fpsAccum += dt
    this.fpsFrames++
    if (this.fpsAccum >= 3.5) {
      const fps = this.fpsFrames / this.fpsAccum
      if (fps < 38 && this.qualityHigh) {
        this.qualityHigh = false
        this.autoReduced = true
        this.applyQuality(false)
        this.ui.toast('Modo <b>economia</b> ativado automaticamente', '', 2.4)
      }
      this.fpsAccum = 0
      this.fpsFrames = 0
    }
  }

  loop(now) {
    requestAnimationFrame(this.loop)
    const dt = Math.min(0.05, Math.max(0.0001, (now - this.lastFrame) / 1000))
    this.lastFrame = now
    this.tick(dt)
    this.renderer.clear()
    this.renderer.render(this.world.scene, this.camera)
    if (this.state === 'playing' || this.state === 'paused') {
      this.renderer.clearDepth()
      this.renderer.render(this.weapons.scene, this.weapons.camera)
    }
  }
}

/* ------------------------------------------------------------- boot */
try {
  window.__saci = new Game()
} catch (err) {
  console.error(err)
  const msg = document.createElement('div')
  msg.style.cssText = 'position:fixed;inset:0;display:grid;place-items:center;background:#0b0712;color:#fff6e6;font:16px system-ui;padding:24px;text-align:center;z-index:9999'
  msg.innerHTML = '<div><b>SACI STRIKE precisa de WebGL.</b><br><br>Ative a aceleração de hardware ou tente outro navegador.</div>'
  document.body.appendChild(msg)
}
