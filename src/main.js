import '@fontsource/archivo-black/latin-400.css'
import '@fontsource/barlow/latin-400.css'
import '@fontsource/barlow/latin-500.css'
import '@fontsource/barlow/latin-600.css'
import '@fontsource/barlow-condensed/latin-400.css'
import '@fontsource/barlow-condensed/latin-500.css'
import '@fontsource/barlow-condensed/latin-600.css'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/barlow-condensed/latin-800.css'
import './style.css'

import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

import { createWorld } from './world.js'
import { Player } from './player.js'
import { EnemyManager } from './enemies.js'
import { Effects } from './effects.js'
import { AudioEngine } from './audio.js'
import { InputManager, isTouchDevice } from './input.js'
import { HUD } from './hud.js'

/* ── constants ─────────────────────────────────────────────── */
const WAVES = [
  {
    title: 'PRIMEIRA MARÉ',
    sub: 'VESPAS NA PRAÇA',
    list: [['vespa', 5], ['urubu', 1]],
    gap: [0.65, 1.15],
  },
  {
    title: 'VENTO SUL',
    sub: 'URUBUS NO CÉU',
    list: [['vespa', 6], ['urubu', 2]],
    gap: [0.55, 1.0],
  },
  {
    title: 'CORO DE AÇO',
    sub: 'ENXAME ABERTO',
    list: [['vespa', 8], ['urubu', 3]],
    gap: [0.45, 0.85],
  },
  {
    title: 'NOITE QUENTE',
    sub: 'A PRAÇA RESPONDE',
    list: [['vespa', 9], ['urubu', 3], ['vespa', 3]],
    gap: [0.4, 0.75],
  },
  {
    title: 'COLOSSO',
    sub: 'A ÚLTIMA LUZ',
    list: [['colosso', 1], ['vespa', 4]],
    gap: [0.8, 1.3],
    boss: true,
  },
]

const TOTAL_WAVES = WAVES.length
const CORE_MAX = 100
const query = new URLSearchParams(location.search)
const touch = isTouchDevice()
const forceHighQuality = query.get('quality') === 'high'
const autoStart = query.get('play') === '1'

const $ = (id) => document.getElementById(id)
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const rand = (a, b) => a + Math.random() * (b - a)
const nowSec = () => performance.now() / 1000

/* ── DOM ───────────────────────────────────────────────────── */
const canvas = $('scene')
const loadingEl = $('loading')
const loadingBar = document.querySelector('.loading-track i')
const menuEl = $('menu')
const pauseEl = $('pause')
const howEl = $('how')
const countdownEl = $('countdown')
const cdValue = $('cdValue')

if (touch) document.body.classList.add('touch-mode')
if (query.has('touch')) document.body.classList.add('touch-mode')

/* ── renderer / scene ──────────────────────────────────────── */
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: !touch,
  powerPreference: 'high-performance',
  alpha: false,
  stencil: false,
})
const maxDpr = touch ? 1.55 : 1.8
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))
renderer.setSize(window.innerWidth, window.innerHeight, false)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.02
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.info.autoReset = true

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.045, 650)
camera.rotation.order = 'YXZ'
scene.add(camera)

/* ── post processing ───────────────────────────────────────── */
const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uVignette: { value: 0.4 },
    uGrain: { value: 0.013 },
    uAberration: { value: 0.0012 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uVignette;
    uniform float uGrain;
    uniform float uAberration;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      vec2 c = uv - 0.5;
      float r2 = dot(c, c);
      float ab = uAberration * (0.35 + r2 * 2.4);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + c * ab).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - c * ab).b;

      // subtle cinematic grade: cool shadows, warm highs
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(col, col * vec3(0.93, 1.015, 1.02), (1.0 - smoothstep(0.0, 0.45, l)) * 0.55);
      col = mix(col, col * vec3(1.045, 1.0, 0.94), smoothstep(0.45, 1.0, l) * 0.4);
      col = mix(vec3(l), col, 1.06);

      // vignette
      float vignette = smoothstep(0.85, 0.22, r2 * 1.75);
      col *= mix(1.0, vignette, uVignette);

      // grain / dither
      float n = hash(uv * 1400.0 + fract(uTime) * 71.0);
      col += (n - 0.5) * uGrain;

      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
  `,
}

const composer = new EffectComposer(renderer)
composer.setPixelRatio(renderer.getPixelRatio())
composer.setSize(window.innerWidth, window.innerHeight)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  touch ? 0.3 : 0.34,
  0.45,
  0.92
)
composer.addPass(bloomPass)
const gradePass = new ShaderPass(GradeShader)
composer.addPass(gradePass)
const outputPass = new OutputPass()
composer.addPass(outputPass)

/* ── audio / hud / input ───────────────────────────────────── */
const audio = new AudioEngine()
const hud = new HUD()
let world = null
let player = null
let effects = null
let enemies = null
let input = null

let state = 'loading'
let prePauseState = 'playing'
let pauseFromMenu = false
let animTime = 0
let lastFrame = performance.now() / 1000
let gameTime = 0
let countdown = 0
let lastCountdownLabel = ''
let qualityReduced = false
let fpsAccum = 0
let fpsFrames = 0
let qualityTimer = 0
let coreFlash = 0
let coreAlarmCd = 0

const game = {
  wave: 0,
  score: 0,
  kills: 0,
  shots: 0,
  hits: 0,
  combo: 0,
  lastKill: -99,
  coreHealth: CORE_MAX,
  spawnQueue: [],
  spawnTimer: 0,
  waveActive: false,
  intermission: 0,
  clearTimer: 0,
  running: false,
  startTime: 0,
}

const ray = new THREE.Raycaster()
const _v = new THREE.Vector3()
const _colorTeal = new THREE.Color(0x27e0b8)
const _colorAlarm = new THREE.Color(0xff4a2a)
const _colorLow = new THREE.Color(0xffa53a)
const _tmpColor = new THREE.Color()

const settings = {
  sensitivity: 1,
  tiltSens: 1,
  tilt: false,
  sound: true,
  haptics: true,
  invert: false,
}
let best = 0

try {
  const raw = localStorage.getItem('brasa.settings.v1')
  if (raw) Object.assign(settings, JSON.parse(raw))
  best = Number(localStorage.getItem('brasa.best.v1') || 0) || 0
} catch {}

function saveSettings() {
  try {
    localStorage.setItem('brasa.settings.v1', JSON.stringify(settings))
  } catch {}
}

function updateBestUI() {
  const el = $('bestScore')
  if (el) el.textContent = String(best).padStart(6, '0')
}

/* ── initial UI ────────────────────────────────────────────── */
updateBestUI()
if (loadingBar) loadingBar.style.width = '8%'
hud.setHudVisible(false)

function setLoading(pct, copy) {
  if (loadingBar) loadingBar.style.width = `${pct}%`
  const c = document.querySelector('.loading-copy')
  if (c && copy) c.textContent = copy
}

function bootError(err) {
  console.error(err)
  setLoading(100, 'FALHA AO ACENDER A PRAÇA')
  const c = document.querySelector('.loading-copy')
  if (c) {
    c.textContent = 'SEU NAVEGADOR NÃO CONSEGUIU INICIAR O WEBGL. ATUALIZE E TENTE NOVAMENTE.'
    c.style.color = '#ff9a86'
    c.style.maxWidth = '70vw'
    c.style.textAlign = 'center'
    c.style.lineHeight = '1.6'
  }
}

/* ── settings / audio helpers ──────────────────────────────── */
function applySettings() {
  if (input) {
    input.sensitivity = settings.sensitivity
    input.tiltSensitivity = settings.tiltSens
    input.invertY = settings.invert
    input.haptics = settings.haptics
  }
  if (audio) audio.setEnabled(settings.sound)
  const sens = $('sensVal')
  const tsens = $('tiltSensVal')
  if (sens) sens.textContent = `${settings.sensitivity.toFixed(2)}×`
  if (tsens) tsens.textContent = `${settings.tiltSens.toFixed(2)}×`
  const sensInput = $('sensInput')
  const tiltSensInput = $('tiltSensInput')
  if (sensInput) sensInput.value = settings.sensitivity
  if (tiltSensInput) tiltSensInput.value = settings.tiltSens
  setPressed($('pauseSound'), settings.sound)
  setPressed($('pauseHaptics'), settings.haptics)
  setPressed($('pauseInvert'), settings.invert)
  setPressed($('pauseTilt'), input?.tiltEnabled || false)
  syncTiltUI()
}

function setPressed(el, on) {
  if (el) el.setAttribute('aria-pressed', on ? 'true' : 'false')
}

function syncTiltUI() {
  const on = !!input?.tiltEnabled
  setPressed($('menuTilt'), on)
  setPressed($('pauseTilt'), on)
  const note = $('menuTiltNote')
  if (note) {
    if (!input?.tiltSupported) note.textContent = 'Indisponível neste aparelho'
    else if (input?.tiltPermission === 'denied') note.textContent = 'Permissão negada nas configurações'
    else if (on) note.textContent = 'Ativo · incline para mirar'
    else note.textContent = 'Opcional · giroscópio'
  }
  hud.setTilt(on)
}

async function toggleTilt(force) {
  if (!input) return
  const next = typeof force === 'boolean' ? force : !input.tiltEnabled
  if (!next) {
    await input.enableTilt(false)
    settings.tilt = false
    saveSettings()
    syncTiltUI()
    hud.toast('MIRADA POR INCLINAÇÃO DESLIGADA')
    return
  }
  const res = await input.enableTilt(true)
  if (!res.ok) {
    settings.tilt = false
    saveSettings()
    syncTiltUI()
    if (res.reason === 'unsupported') {
      hud.toast('GIROSCÓPIO INDISPONÍVEL NESTE APARELHO', { error: true, duration: 3200 })
    } else {
      hud.toast('PERMISSÃO DE MOVIMENTO NEGADA · AJUSTES DO NAVEGADOR', { error: true, duration: 3800 })
    }
    return
  }
  settings.tilt = true
  saveSettings()
  audio.init()
  input.calibrateTilt()
  syncTiltUI()
  hud.toast('INCLINAÇÃO ATIVA · INCLINE O APARELHO PARA MIRAR', { duration: 3400 })
  audio.ui()
  // Warn if the sensor never reports (common on laptops/desktop)
  setTimeout(() => {
    if (input.tiltEnabled && !input.tiltEventSeen) {
      input.enableTilt(false)
      settings.tilt = false
      saveSettings()
      syncTiltUI()
      hud.toast('NENHUM SENSOR DE MOVIMENTO DETECTADO', { error: true, duration: 3200 })
    }
  }, 1600)
}

function toggleSound() {
  settings.sound = !settings.sound
  audio.setEnabled(settings.sound)
  saveSettings()
  applySettings()
  if (settings.sound) audio.ui()
  hud.toast(settings.sound ? 'ÁUDIO LIGADO' : 'ÁUDIO SILENCIADO')
}

/* ── menu camera ───────────────────────────────────────────── */
function updateMenuCamera(t) {
  const a = 1.15 + Math.sin(t * 0.05) * 0.38
  const r = 17.5
  const tx = -2.2
  const tz = -7.2
  camera.position.set(
    tx + Math.cos(a) * r,
    4.55 + Math.sin(t * 0.17) * 0.32,
    tz + Math.sin(a) * r
  )
  camera.lookAt(-3.2, 2.35, -7.2)
  if (camera.fov !== 58) {
    camera.fov = 58
    camera.updateProjectionMatrix()
  }
  camera.rotation.z = Math.sin(t * 0.1) * 0.003
}

/* ── boot ──────────────────────────────────────────────────── */
async function boot() {
  setLoading(18, 'ESCULPINDO A PRAÇA DO SOL')
  await new Promise((r) => setTimeout(r, 80))
  world = createWorld(scene, renderer, { mobile: touch })
  setLoading(46, 'ACENDENDO O NÚCLEO')
  await new Promise((r) => setTimeout(r, 60))

  effects = new Effects(scene, camera)
  setLoading(62, 'CALIBRANDO OS DRONES')

  input = new InputManager({
    canvas,
    joystick: $('joystick'),
    joystickKnob: $('joyKnob'),
    fireBtn: $('btnFire'),
    reloadBtn: $('btnReload'),
    swapBtn: $('btnSwap'),
    dashBtn: $('btnDash'),
    onPause: () => togglePause(),
    onAction: (name, value) => onInputAction(name, value),
    canLock: () => state === 'playing',
  })
  if (touch) input.touch = true

  player = new Player(camera, scene, world, { mobile: touch, audio, input })
  player.viewRoot.visible = false
  player.viewLight.visible = false
  player.onShoot = handlePlayerShot
  player.onDamage = (amount, from) => {
    const angle = from ? damageAngle(from) : 0
    hud.damage(angle, amount)
  }
  player.onDeath = () => {
    if (state === 'playing' || state === 'countdown') endGame(false)
  }
  player.onStep = () => {
    audio?.noiseBurst({ dur: 0.06, vol: 0.035, type: 'lowpass', freq: 460, q: 0.8, decay: 0.05 })
  }

  enemies = new EnemyManager(scene, world, effects, {
    audio,
    onKill: handleKill,
    onCoreHit: handleCoreHit,
    onPlayerHit: handlePlayerHit,
    onSpawn: () => {},
  })

  setLoading(82, 'ENSaiando O SAMBA')
  applySettings()
  syncTiltUI()

  if (settings.tilt) {
    // Saving the flag does not grant permission; wait for first gesture below.
    setPressed($('menuTilt'), false)
  }

  bindUI()
  setLoading(100, 'PRAÇA PRONTA')
  await new Promise((r) => setTimeout(r, 350))
  loadingEl.classList.add('done')
  setTimeout(() => loadingEl.classList.add('hidden'), 750)
  menuEl.classList.remove('hidden')
  state = 'menu'
  hud.setHudVisible(false)

  if (autoStart) {
    setTimeout(() => startRound(), 500)
  }

  lastFrame = performance.now() / 1000
  window.__BRASA__ = {
    scene,
    camera,
    player,
    world,
    enemies,
    effects,
    game,
    getState: () => state,
    hud,
  }
  requestAnimationFrame(loop)
}

/* ── UI bindings ───────────────────────────────────────────── */
function bindUI() {
  $('playBtn')?.addEventListener('click', () => {
    audio.init()
    audio.ui()
    if (settings.tilt && !input.tiltEnabled) toggleTilt(true)
    startRound()
  })
  $('howBtn')?.addEventListener('click', () => {
    audio.init()
    audio.ui()
    howEl.classList.remove('hidden')
  })
  $('howClose')?.addEventListener('click', () => {
    audio.ui()
    howEl.classList.add('hidden')
  })
  $('settingsBtn')?.addEventListener('click', () => {
    audio.init()
    audio.ui()
    pauseFromMenu = true
    prePauseState = state
    $('resumeBtn').querySelector('.btn-label').textContent = 'VOLTAR'
    pauseEl.classList.remove('hidden')
  })

  $('menuTilt')?.addEventListener('pointerdown', (e) => e.stopPropagation())
  $('menuTilt')?.addEventListener('click', () => {
    audio.init()
    toggleTilt()
  })
  $('pauseTilt')?.addEventListener('click', () => toggleTilt())
  $('pauseSound')?.addEventListener('click', () => toggleSound())
  $('pauseHaptics')?.addEventListener('click', () => {
    settings.haptics = !settings.haptics
    saveSettings()
    applySettings()
    audio.ui()
  })
  $('pauseInvert')?.addEventListener('click', () => {
    settings.invert = !settings.invert
    saveSettings()
    applySettings()
    audio.ui()
  })
  $('sensInput')?.addEventListener('input', (e) => {
    settings.sensitivity = Number(e.target.value)
    saveSettings()
    applySettings()
  })
  $('tiltSensInput')?.addEventListener('input', (e) => {
    settings.tiltSens = Number(e.target.value)
    saveSettings()
    applySettings()
  })

  $('btnPause')?.addEventListener('click', () => togglePause())
  $('btnFullscreen')?.addEventListener('click', () => toggleFullscreen())
  $('resumeBtn')?.addEventListener('click', () => resumeGame())
  $('quitBtn')?.addEventListener('click', () => {
    pauseEl.classList.add('hidden')
    if (pauseFromMenu) {
      pauseFromMenu = false
      menuEl.classList.remove('hidden')
      state = 'menu'
      $('resumeBtn').querySelector('.btn-label').textContent = 'VOLTAR AO COMBATE'
      return
    }
    goToMenu()
  })
  $('retryBtn')?.addEventListener('click', () => {
    hud.hideEnd()
    startRound()
  })
  $('menuBtn')?.addEventListener('click', () => goToMenu())

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && (state === 'playing' || state === 'countdown')) togglePause()
  })

  // first-gesture audio + saved tilt permission
  const firstGesture = async () => {
    window.removeEventListener('pointerdown', firstGesture)
    window.removeEventListener('keydown', firstGesture)
    // Keep the permission request inside the user gesture (iOS requirement).
    let tiltResult = null
    if (settings.tilt && !input.tiltEnabled) {
      tiltResult = await input.enableTilt(true)
    }
    audio.init()
    if (tiltResult) {
      if (tiltResult.ok) {
        input.calibrateTilt()
        syncTiltUI()
      } else {
        settings.tilt = false
        saveSettings()
        syncTiltUI()
      }
    }
  }
  window.addEventListener('pointerdown', firstGesture, { once: true })
  window.addEventListener('keydown', firstGesture, { once: true })

  // click sounds
  document.addEventListener('pointerdown', (e) => {
    if (!audio.started) return
    if (e.target.closest('button')) audio.ui()
  })

  window.addEventListener('resize', onResize)
  window.addEventListener('orientationchange', () => setTimeout(onResize, 250))
}

function onInputAction(name, value) {
  if (name === 'weapon') {
    if (state !== 'playing' || !player) return
    player.switchWeapon(value === 0 ? 'rifle' : 'shotgun')
  } else if (name === 'mute') {
    toggleSound()
  } else if (name === 'lockchange') {
    if (!value && state === 'playing' && !input.touch) {
      hud.toast('CLIQUE NA PRAÇA PARA MIRAR', { duration: 2600 })
    }
  } else if (name === 'lockerror') {
    hud.toast('CLIQUE NOVAMENTE PARA TRAVAR O MOUSE', { duration: 2200 })
  }
}

/* ── camera / game flow ────────────────────────────────────── */
async function startRound() {
  audio.init()
  audio.setEnabled(settings.sound)
  audio.setMusic(true)
  audio.setIntensity(0.12)
  hud.reset()
  hud.setHudVisible(true)
  hud.hideTutorial()
  menuEl.classList.add('hidden')
  howEl.classList.add('hidden')
  pauseEl.classList.add('hidden')
  countdownEl.classList.remove('hidden')
  $('gameover').classList.add('hidden')

  player.reset()
  player.viewRoot.visible = true
  player.viewLight.visible = true
  player.alive = true
  enemies.clear()
  game.wave = 0
  game.score = 0
  game.kills = 0
  game.shots = 0
  game.hits = 0
  game.combo = 0
  game.lastKill = -99
  game.coreHealth = CORE_MAX
  game.spawnQueue = []
  game.spawnTimer = 0
  game.waveActive = false
  game.intermission = 0
  game.clearTimer = 0
  game.running = false
  game.startTime = nowSec()
  coreFlash = 0
  coreAlarmCd = 0

  countdown = 3.6
  lastCountdownLabel = ''
  state = 'countdown'
  input.setActive(false)

  if (touch) {
    requestFullscreen()
    lockLandscape()
  } else {
    input.requestLock()
  }
  hud.setTilt(input.tiltEnabled)
  hud.updateCompass(0)

  hud.tutorial(
    'MISSÃO',
    touch
      ? 'Joystick para mover · Arraste para mirar · Segure FOGO'
      : 'WASD mover · Mouse mirar · Clique atirar · R recarregar',
    6500
  )
}

function startWave(n) {
  const cfg = WAVES[n - 1]
  if (!cfg) return
  game.wave = n
  game.waveActive = true
  game.spawnQueue = []
  game.spawnTimer = 0
  game.intermission = 0
  game.clearTimer = 0
  let delay = n === 1 ? 1.1 : 0.9
  for (const [type, count] of cfg.list) {
    for (let i = 0; i < count; i++) {
      game.spawnQueue.push({ type, delay })
      delay += rand(cfg.gap[0], cfg.gap[1])
    }
  }
  if (cfg.boss) {
    game.spawnQueue.sort((a, b) => (a.type === 'colosso' ? -1 : b.type === 'colosso' ? 1 : 0))
    game.spawnQueue[0].delay = 0.7
  }
  game.running = true
  hud.waveBanner(`ONDA 0${n}`, cfg.title, cfg.sub, { boss: cfg.boss, duration: 2600 })
  audio.waveHorn(!!cfg.boss)
  audio.setIntensity(clamp(0.16 + n * 0.16, 0, 0.95))
  if (cfg.boss) {
    hud.feed('ALERTA: <b>COLOSSO</b> NA PRAÇA', { teal: false })
    setTimeout(() => hud.toast('COLOSSO DETECTADO · MIRE NO OLHO', { error: true, duration: 3600 }), 800)
  } else {
    hud.toast(`ONDA ${n} · ${cfg.sub}`, { duration: 2200 })
  }
}

function spawnTick(dt) {
  if (!game.spawnQueue.length) return
  game.spawnTimer += dt
  while (game.spawnQueue.length && game.spawnQueue[0].delay <= game.spawnTimer) {
    const s = game.spawnQueue.shift()
    const pos = s.type === 'colosso' ? new THREE.Vector3(0, 10.5, -29) : null
    enemies.spawn(s.type, pos)
  }
}

function updateWaveState(dt) {
  if (state !== 'playing') return
  if (game.waveActive) {
    spawnTick(dt)
    const remaining = game.spawnQueue.length + enemies.enemies.length
    if (remaining === 0 && game.spawnQueue.length === 0) {
      game.clearTimer += dt
      if (game.clearTimer > 1.4) completeWave()
    } else {
      game.clearTimer = 0
    }
  } else if (game.intermission > 0) {
    game.intermission -= dt
    if (game.intermission <= 0) {
      startWave(game.wave + 1)
    }
  }
}

function completeWave() {
  game.waveActive = false
  game.clearTimer = 0
  const bonus = 400 * game.wave
  game.score += bonus
  const healed = Math.min(CORE_MAX, game.coreHealth + 8)
  const coreGain = Math.round(healed - game.coreHealth)
  game.coreHealth = healed
  player.heal(24)
  hud.flashHeal(1)
  hud.feed(`ONDA ${game.wave} LIMPA <b>+${bonus}</b>`, { teal: true })
  if (coreGain > 0) hud.toast(`NÚCLEO ESTABILIZADO · +${coreGain}%`, { duration: 2200 })
  audio.waveClear()

  if (game.wave >= TOTAL_WAVES) {
    setTimeout(() => endGame(true), 800)
    return
  }
  game.intermission = 5.8
  hud.waveBanner('PRAÇA SEGURA', 'ONDA LIMPA', `PRÓXIMA EM 5s`, { duration: 3400 })
  audio.setMusic(true)
  audio.setIntensity(clamp(0.1 + game.wave * 0.12, 0, 0.8))
}

function endGame(victory) {
  if (state === 'over') return
  state = 'over'
  input.setActive(false)
  player.alive = false
  audio.setMusic(false)
  if (victory) audio.victory()
  else audio.fail()
  const accuracy = game.shots > 0 ? (game.hits / game.shots) * 100 : 0
  const wavesDone = victory ? TOTAL_WAVES : Math.max(0, game.wave - (game.waveActive ? 1 : 0))
  if (game.score > best) {
    best = game.score
    try {
      localStorage.setItem('brasa.best.v1', String(best))
    } catch {}
    updateBestUI()
  }
  hud.showEnd({
    victory,
    score: game.score,
    waves: victory ? TOTAL_WAVES : wavesDone,
    kills: game.kills,
    accuracy,
  })
  enemies.clear()
  countdownEl.classList.add('hidden')
}

function togglePause() {
  if (state === 'playing' || state === 'countdown') {
    prePauseState = state
    state = 'paused'
    pauseFromMenu = false
    input.setActive(false)
    audio.setMusic(false)
    $('resumeBtn').querySelector('.btn-label').textContent = 'VOLTAR AO COMBATE'
    pauseEl.classList.remove('hidden')
    if (document.pointerLockElement) document.exitPointerLock?.()
  } else if (state === 'paused') {
    resumeGame()
  }
}

function resumeGame() {
  pauseEl.classList.add('hidden')
  if (pauseFromMenu) {
    pauseFromMenu = false
    state = prePauseState === 'menu' ? 'menu' : prePauseState
    if (state === 'menu') {
      menuEl.classList.remove('hidden')
      $('resumeBtn').querySelector('.btn-label').textContent = 'VOLTAR AO COMBATE'
      return
    }
  }
  state = prePauseState
  if (state === 'playing' || state === 'countdown') {
    input.setActive(true)
    audio.setMusic(true)
    if (!input.touch) input.requestLock()
  }
  lastFrame = performance.now() / 1000
}

function goToMenu() {
  state = 'menu'
  pauseEl.classList.add('hidden')
  countdownEl.classList.add('hidden')
  menuEl.classList.remove('hidden')
  $('gameover').classList.add('hidden')
  hud.setHudVisible(false)
  hud.reset()
  input.setActive(false)
  audio.setMusic(false)
  audio.setIntensity(0)
  player.alive = false
  player.viewRoot.visible = false
  player.viewLight.visible = false
  enemies.clear()
  game.waveActive = false
  game.spawnQueue = []
  game.intermission = 0
  camera.fov = 58
  camera.updateProjectionMatrix()
  updateBestUI()
}

/* ── combat callbacks ──────────────────────────────────────── */
function handlePlayerShot({ weapon, spread, origin, muzzle }) {
  if (state !== 'playing') return
  game.shots++
  const baseDir = player.dir.clone()
  if (input.touch) {
    const assist = enemies.findAimAssist(origin, baseDir, 0.05)
    if (assist) baseDir.copy(assist.direction)
  }
  let anyHit = false
  let killMarker = false
  let headMarker = false
  const pellets = weapon.pellets

  for (let i = 0; i < pellets; i++) {
    const dir = baseDir.clone()
    dir.x += (Math.random() - 0.5) * spread * 2
    dir.y += (Math.random() - 0.5) * spread * 2
    dir.z += (Math.random() - 0.5) * spread * 2
    dir.normalize()
    ray.set(origin, dir)
    const hit = enemies.raycast(ray.ray, 130)
    let end
    if (hit) {
      anyHit = true
      const res = enemies.damage(hit.enemy, weapon.damage, hit.isHead, hit.point)
      effects.spawnImpact(hit.point, hit.isHead ? 0xffd166 : 0xffad5c, hit.isHead ? 1.15 : 0.8)
      end = hit.point
      if (res.killed) {
        killMarker = true
        headMarker = headMarker || hit.isHead
      } else if (hit.isHead) {
        headMarker = true
      }
      hud.hitmarker(res.killed, hit.isHead)
      audio.hit(hit.isHead)
    } else {
      let dist = 75
      if (dir.y < -0.001) dist = Math.min(dist, (origin.y - 0.05) / -dir.y)
      end = origin.clone().addScaledVector(dir, dist)
    }
    effects.spawnTracer(muzzle, end, weapon.tracer)
    // Extra flash for the first pellet keeps shotgun reads clear
    if (i === 0) effects.spawnMuzzle(muzzle, weapon.tracer, weapon.id === 'shotgun' ? 1.5 : 0.7)
  }
  if (anyHit) game.hits++
  if (killMarker) {
    // marker remains red; audio kill is handled by EnemyManager
  }
}

function handleKill(enemy, isHead) {
  const t = nowSec()
  if (t - game.lastKill < 3.4) game.combo++
  else game.combo = 1
  game.lastKill = t
  game.kills++
  const mult = 1 + Math.max(0, game.combo - 1) * 0.18
  const points = Math.round(enemy.def.score * mult * (isHead ? 1.5 : 1))
  game.score += points
  const name = enemy.def.name
  const label = isHead ? 'TIRO NA CABEÇA' : 'DESATIVADO'
  const feedText = enemy.type === 'colosso'
    ? `<b>COLOSSO</b> DESTRUÍDO`
    : `${name} ${label}`
  hud.feed(feedText, { teal: enemy.type === 'colosso', points })
  const pos = enemy.position.clone()
  pos.y += enemy.scale * 0.6
  hud.popScore(pos, camera, `+${points}`, isHead)
  if (isHead) hud.hitmarker(true, true)
  if (enemy.type === 'colosso') {
    hud.waveBanner('ALVO NEUTRALIZADO', 'COLOSSO CAIU', 'A PRAÇA RESISTE', { duration: 3000 })
    hud.toast('COLOSSO DESTRUÍDO · +5000', { duration: 3000 })
    player.shake = Math.max(player.shake, 0.65)
  } else {
    player.shake = Math.max(player.shake, 0.05)
  }
  input.haptic?.(enemy.type === 'colosso' ? [40, 60, 30, 60, 80] : [12, 22, 10])
}

function handleCoreHit(dmg) {
  if (state !== 'playing') return
  game.coreHealth = Math.max(0, game.coreHealth - dmg)
  coreFlash = 1
  player.shake = Math.max(player.shake, 0.18)
  if (coreAlarmCd <= 0) {
    hud.toast('NÚCLEO SOB ATAQUE', { error: true, duration: 1400 })
    coreAlarmCd = 4.5
  }
  if (game.coreHealth <= 0) endGame(false)
}

function handlePlayerHit(dmg, source) {
  if (state !== 'playing' || !player.alive) return
  player.takeDamage(dmg, source)
  if (player.health <= 0) endGame(false)
}

function damageAngle(from) {
  const dx = from.x - player.position.x
  const dz = from.z - player.position.z
  const yaw = player.yaw
  const rightX = Math.cos(yaw)
  const rightZ = -Math.sin(yaw)
  const fwdX = -Math.sin(yaw)
  const fwdZ = -Math.cos(yaw)
  const relRight = dx * rightX + dz * rightZ
  const relFwd = dx * fwdX + dz * fwdZ
  return Math.atan2(relRight, relFwd)
}

/* ── countdown ─────────────────────────────────────────────── */
function updateCountdown(dt) {
  countdown -= dt
  if (countdown <= 0) {
    countdownEl.classList.add('hidden')
    state = 'playing'
    input.setActive(true)
    startWave(1)
    lastFrame = performance.now() / 1000
    return
  }
  const n = Math.ceil(countdown - 0.55)
  let label
  if (countdown > 0.55) label = String(Math.max(1, n))
  else label = 'JÁ'
  if (label !== lastCountdownLabel) {
    lastCountdownLabel = label
    cdValue.textContent = label
    if (cdValue.animate) {
      cdValue.animate(
        [
          { transform: 'scale(1.32)', opacity: 0.4 },
          { transform: 'scale(1)', opacity: 1 },
        ],
        { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' }
      )
    }
    if (label !== 'JÁ') audio.ui()
  }
}

/* ── render loop ───────────────────────────────────────────── */
function loop() {
  requestAnimationFrame(loop)
  const now = performance.now() / 1000
  let dt = now - lastFrame
  lastFrame = now
  if (dt > 0.1) dt = 0.1
  if (dt < 0) dt = 0
  animTime += dt
  gradePass.uniforms.uTime.value = animTime

  if (!world) return

  if (state === 'menu' || state === 'loading') {
    updateMenuCamera(animTime)
    world.update(dt, animTime)
    effects?.update(dt, animTime)
  } else if (state === 'paused') {
    world.update(dt, animTime)
    effects?.update(dt, animTime)
  } else if (state === 'countdown') {
    updateCountdown(dt)
    world.update(dt, animTime)
    effects?.update(dt, animTime)
    if (player) player.update(dt, animTime)
    updateCoreVisuals(dt)
    hud.set(player.state, hudPayload())
  } else if (state === 'playing') {
    gameTime += dt
    world.update(dt, animTime)
    effects.update(dt, animTime)
    player.update(dt, animTime)
    enemies.update(dt, animTime, player)
    updateWaveState(dt)
    updateCoreVisuals(dt)
    coreAlarmCd = Math.max(0, coreAlarmCd - dt)
    if (animTime - game.lastKill > 3.4 && game.combo !== 0) game.combo = 0
    if (player.health <= 0 && state === 'playing') endGame(false)
    hud.set(player.state, hudPayload())
    hud.drawRadar(player.position, enemies.enemies, world.core.position, player.yaw, animTime)
    adaptQuality(dt)
  } else if (state === 'over') {
    world.update(dt, animTime)
    effects.update(dt, animTime)
    player?.updateWeapon(dt, animTime, 0)
    updateCoreVisuals(dt)
  }

  composer.render()
}

function hudPayload() {
  let target = null
  if ((state === 'playing' || state === 'countdown') && player?.alive) {
    const t = enemies.findAimAssist(camera.position, player.dir, 0.055)
    if (t) target = t.enemy
  }
  return {
    core: game.coreHealth / CORE_MAX,
    wave: Math.max(1, game.wave),
    totalWaves: TOTAL_WAVES,
    enemies: game.spawnQueue.length + (enemies?.enemies.length || 0),
    score: game.score,
    combo: game.combo,
    boss: enemies?.boss || null,
    target,
  }
}

function updateCoreVisuals(dt) {
  coreFlash = Math.max(0, coreFlash - dt * 1.6)
  if (!world) return
  const mat = world.core.orb.material
  const low = game.coreHealth / CORE_MAX
  const pulse = 0.5 + Math.sin(animTime * (low < 0.3 ? 6 : 2.2)) * 0.5
  _tmpColor.copy(_colorTeal)
  if (low < 0.55) _tmpColor.lerp(_colorLow, (0.55 - low) / 0.55)
  if (low < 0.25) _tmpColor.lerp(_colorAlarm, (0.25 - low) / 0.25)
  _tmpColor.lerp(_colorAlarm, coreFlash * 0.8)
  mat.emissive.copy(_tmpColor)
  mat.emissiveIntensity = 2.0 + coreFlash * 4 + (low < 0.3 ? pulse * 1.2 : 0)
  mat.color.copy(_tmpColor).lerp(new THREE.Color(0xffffff), 0.35)
}

/* ── adaptive quality ──────────────────────────────────────── */
function adaptQuality(dt) {
  if (forceHighQuality) return
  qualityTimer += dt
  fpsAccum += dt
  fpsFrames++
  if (fpsFrames >= 90) {
    const avg = fpsFrames / fpsAccum
    if (!qualityReduced && avg < 42 && qualityTimer > 4) {
      qualityReduced = true
      bloomPass.strength = 0.32
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.15))
      composer.setPixelRatio(renderer.getPixelRatio())
      onResize()
      hud.toast('QUALIDADE AJUSTADA PARA MANTER O RITMO', { duration: 2400 })
    }
    fpsAccum = 0
    fpsFrames = 0
  }
}

/* ── resize / fullscreen ───────────────────────────────────── */
function onResize() {
  const w = window.innerWidth
  const h = window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h, false)
  if (!qualityReduced) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))
  }
  composer.setPixelRatio(renderer.getPixelRatio())
  composer.setSize(w, h)
  if (bloomPass) bloomPass.setSize(w, h)
}

async function requestFullscreen() {
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' })
    }
  } catch {}
}

async function lockLandscape() {
  try {
    if (screen.orientation?.lock) await screen.orientation.lock('landscape')
  } catch {}
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    requestFullscreen()
  } else {
    document.exitFullscreen?.().catch?.(() => {})
  }
  audio.ui()
}

/* ── go ────────────────────────────────────────────────────── */
boot().catch(bootError)
