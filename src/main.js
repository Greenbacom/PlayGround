import './style.css'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { buildWorld } from './world.js'
import { Effects } from './effects.js'
import { EnemyManager, ENEMY_TYPES } from './enemies.js'
import { WeaponRig, WEAPONS } from './weapons.js'
import { AudioEngine } from './audio.js'

const $ = (id) => document.getElementById(id)
const isTouch = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
document.body.classList.toggle('touch', isTouch)

const dom = {
  canvas: $('game'),
  sceneShade: $('scene-shade'),
  loading: $('loading'),
  start: $('screen-start'),
  play: $('btn-play'),
  tilt: $('btn-tilt'),
  tiltState: $('tilt-state'),
  tiltPip: $('tilt-pip'),
  startNote: $('start-note'),
  soundMenu: $('btn-sound-menu'),
  hud: $('hud'),
  radar: $('radar'),
  waveLabel: $('wave-label'),
  waveTotal: $('wave-total'),
  waveProgress: $('wave-progress'),
  waveEnemies: $('wave-enemies'),
  objectiveKicker: $('objective-kicker'),
  objectiveText: $('objective-text'),
  score: $('score'),
  pause: $('btn-pause'),
  soundHud: $('btn-sound'),
  bossBar: $('boss-bar'),
  bossFill: $('boss-fill'),
  killFeed: $('kill-feed'),
  combo: $('combo'),
  comboMult: $('combo-mult'),
  comboTimer: $('combo-timer'),
  comboValue: $('combo-value'),
  banner: $('banner'),
  bannerKicker: $('banner-kicker'),
  bannerTitle: $('banner-title'),
  bannerSub: $('banner-sub'),
  crosshair: $('crosshair'),
  hitmarker: $('hitmarker'),
  healthValue: $('health-value'),
  healthFill: $('health-fill'),
  healthStatus: $('health-status'),
  healthPanel: document.querySelector('.health-panel'),
  ammoMag: $('ammo-mag'),
  ammoReserve: $('ammo-reserve'),
  weaponType: $('weapon-type'),
  weaponName: $('weapon-name'),
  fireMode: $('fire-mode'),
  tiltHud: $('btn-tilt-hud'),
  reload: $('reload-indicator'),
  reloadRing: $('reload-ring'),
  pickupToast: $('pickup-toast'),
  hint: $('hint'),
  stickZone: $('stick-zone'),
  stickBase: $('stick-base'),
  stickKnob: $('stick-knob'),
  btnFire: $('btn-fire'),
  btnAim: $('btn-aim'),
  btnReload: $('btn-reload'),
  btnJump: $('btn-jump'),
  btnSwitch: $('btn-switch'),
  pauseScreen: $('screen-pause'),
  pauseTilt: $('pause-tilt'),
  pauseTiltState: $('pause-tilt-state'),
  pauseSound: $('pause-sound'),
  pauseSoundState: $('pause-sound-state'),
  pauseFullscreen: $('pause-fullscreen'),
  resume: $('btn-resume'),
  quit: $('btn-quit'),
  overScreen: $('screen-over'),
  overCopy: $('over-copy'),
  overScore: $('over-score'),
  overWave: $('over-wave'),
  overKills: $('over-kills'),
  overAcc: $('over-acc'),
  retry: $('btn-retry'),
  overMenu: $('btn-over-menu'),
  winScreen: $('screen-win'),
  winScore: $('win-score'),
  winKills: $('win-kills'),
  winAcc: $('win-acc'),
  winCombo: $('win-combo'),
  again: $('btn-again'),
  winMenu: $('btn-win-menu'),
  rotateHint: $('rotate-hint'),
  damageFlash: $('damage-flash'),
  lowHealth: $('low-health'),
  error: $('error-panel'),
  errorText: $('error-text'),
}

const state = {
  mode: 'attract',
  wave: 1,
  score: 0,
  kills: 0,
  shots: 0,
  hits: 0,
  combo: 1,
  comboTimer: 0,
  bestCombo: 1,
  waveKills: 0,
  waveTotal: 0,
  waveQueue: [],
  spawnTimer: 0,
  intermission: 0,
  waveActive: false,
  bossDefeated: false,
  startedAt: 0,
  muted: false,
  tiltEnabled: false,
  tiltRequesting: false,
  pointerLocked: false,
  lockRequested: false,
  deathAt: 0,
  victoryAt: 0,
  lastHudUpdate: 0,
  radarTime: 0,
  attractTime: 0,
  bannerTimeout: null,
  hintTimeout: null,
  firstShot: false,
  lowHealthShown: false,
}

const WAVE_DEFS = [
  { title: 'A RODA ABRIU', sub: 'SOBREVIVA AO BLOCO', queue: ['pandeiro', 'pandeiro', 'pandeiro', 'pandeiro'], maxAlive: 4, interval: 1.15 },
  { title: 'O BLOCO CRESCEU', sub: 'CAPOEIRISTAS NA ÁREA', queue: ['pandeiro', 'capoeira', 'pandeiro', 'capoeira', 'pandeiro', 'pandeiro'], maxAlive: 5, interval: 1.0 },
  { title: 'RITMO PESADO', sub: 'BRUTO NA PISTA', queue: ['capoeira', 'pandeiro', 'bruto', 'capoeira', 'pandeiro', 'capoeira', 'pandeiro', 'bruto'], maxAlive: 6, interval: 0.94 },
  { title: 'SEM SAÍDA', sub: 'O MORRO FECHOU O CERCO', queue: ['pandeiro', 'capoeira', 'bruto', 'pandeiro', 'capoeira', 'bruto', 'capoeira', 'pandeiro', 'pandeiro', 'capoeira'], maxAlive: 7, interval: 0.86 },
  { title: 'ÚLTIMA RODA', sub: 'AGUENTE ATÉ O REI', queue: ['bruto', 'capoeira', 'pandeiro', 'bruto', 'capoeira', 'pandeiro', 'capoeira', 'bruto', 'pandeiro', 'capoeira', 'pandeiro', 'capoeira'], maxAlive: 8, interval: 0.78 },
  { title: 'REI MOMO 2.0', sub: 'MATE O ALVO', queue: ['boss'], maxAlive: 6, interval: 1, boss: true },
]

const player = {
  position: new THREE.Vector3(0, 0, 9.5),
  chest: new THREE.Vector3(0, 1.1, 9.5),
  yaw: 0,
  pitch: 0,
  recoilPitch: 0,
  recoilYaw: 0,
  shakeT: 0,
  shakeMag: 0,
  health: 100,
  maxHealth: 100,
  lastDamage: -99,
  jumpY: 0,
  jumpVel: 0,
  grounded: true,
  weapon: 'rifle',
  ammo: { rifle: WEAPONS.rifle.magSize, shotgun: WEAPONS.shotgun.magSize },
  reserve: { rifle: 180, shotgun: 30 },
  reloading: false,
  reloadT: 0,
  reloadDuration: 0,
  nextFire: 0,
  ads: false,
  sprint: false,
  moveAmount: 0,
  lookX: 0,
  lookY: 0,
  bob: 0,
  roll: 0,
  wave: 1,
}

const input = {
  forward: 0,
  strafe: 0,
  sprint: false,
  fire: false,
  firePressed: false,
  ads: false,
  jumpPressed: false,
  switchPressed: false,
  reloadPressed: false,
  lookDX: 0,
  lookDY: 0,
}

const keys = new Set()
const pickups = []
const tmpVec = new THREE.Vector3()
const tmpVec2 = new THREE.Vector3()
const tmpChest = new THREE.Vector3()
const raycaster = new THREE.Raycaster()
const _forward = new THREE.Vector3()
const _right = new THREE.Vector3()

let renderer
let scene
let camera
let world
let effects
let enemies
let weaponRig
let audio
let composer
let bloomPass
let useComposer = true
let lastFrame = performance.now()
let elapsed = 0
let resizeTimeout = 0
let tiltHandler = null
let latestOrientation = null

const tilt = {
  baseline: null,
  deltaYaw: 0,
  deltaPitch: 0,
  sensitivity: 0.0028,
  deadzone: 0.7,
  angle: 0,
}

// ---------------------------------------------------------------- BOOT
function boot() {
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: dom.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
    })
  } catch (error) {
    showError('Seu navegador não conseguiu iniciar o WebGL.', error)
    return
  }
  const dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.4 : 1.7)
  renderer.setPixelRatio(dpr)
  renderer.setSize(window.innerWidth, window.innerHeight, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.04
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.autoClear = false

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.055, 500)
  camera.rotation.order = 'YXZ'
  scene.add(camera)

  world = buildWorld(scene, { isMobile: isTouch })
  effects = new Effects(scene, renderer)
  audio = new AudioEngine()
  weaponRig = new WeaponRig(renderer)
  weaponRig.resize(window.innerWidth / window.innerHeight)

  enemies = new EnemyManager(scene, world, effects, audio, {
    onKill: handleKill,
    onPlayerDamage: damagePlayer,
    onBossSpawn: handleBossSpawn,
    onBossDeath: handleBossDeath,
    onAdd: handleAdd,
  })
  enemies.setPlayer(player)

  setupComposer(dpr)
  setupInput()
  setupUI()
  setupTilt()
  resetAttractCamera()
  refreshHud()
  updateTiltUI()
  updateSoundUI()

  const targetNote = isTouch
    ? 'Melhor no celular na horizontal. Fones recomendados.'
    : 'WASD + MOUSE. Clique em JOGAR para travar o cursor.'
  setStartNote(targetNote)

  window.addEventListener('resize', onResize)
  window.addEventListener('orientationchange', () => {
    calibrateTilt()
    setTimeout(onResize, 160)
  })
  if (screen.orientation) {
    screen.orientation.addEventListener?.('change', () => {
      calibrateTilt()
      setTimeout(onResize, 160)
    })
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.mode === 'playing') pauseGame()
  })
  document.addEventListener('pointerlockchange', onPointerLockChange)
  document.addEventListener('contextmenu', (event) => event.preventDefault())

  requestAnimationFrame(loop)
  document.fonts.ready.then(() => {
    setTimeout(() => dom.loading.classList.add('done'), 180)
  })
  setTimeout(() => dom.loading.classList.add('done'), 3500)
}

function setupComposer(dpr) {
  try {
    composer = new EffectComposer(renderer)
    composer.setPixelRatio(dpr)
    composer.setSize(window.innerWidth, window.innerHeight)
    composer.addPass(new RenderPass(scene, camera))
    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      isTouch ? 0.42 : 0.58,
      isTouch ? 0.36 : 0.48,
      0.82,
    )
    composer.addPass(bloomPass)
    composer.addPass(new OutputPass())
    useComposer = true
  } catch (error) {
    console.warn('Bloom unavailable, using direct render.', error)
    useComposer = false
  }
}

function showError(message, error) {
  console.error(error)
  dom.loading.classList.add('done')
  dom.error.classList.remove('is-hidden')
  dom.errorText.textContent = message
}

// ---------------------------------------------------------------- UI SETUP
function setupUI() {
  dom.play.addEventListener('click', () => {
    audio.init()
    audio.play('ui')
    startGame()
  })
  dom.retry.addEventListener('click', () => {
    audio.init()
    startGame()
  })
  dom.again.addEventListener('click', () => {
    audio.init()
    startGame()
  })
  dom.tilt.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleTilt()
  })
  dom.tiltHud.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleTilt()
  })
  dom.pauseTilt.addEventListener('click', toggleTilt)
  dom.pause.addEventListener('click', pauseGame)
  dom.resume.addEventListener('click', resumeGame)
  dom.quit.addEventListener('click', returnToMenu)
  dom.overMenu.addEventListener('click', returnToMenu)
  dom.winMenu.addEventListener('click', returnToMenu)
  dom.soundMenu.addEventListener('click', () => {
    audio.init()
    toggleMute()
  })
  dom.soundHud.addEventListener('click', toggleMute)
  dom.pauseSound.addEventListener('click', toggleMute)
  dom.pauseFullscreen.addEventListener('click', toggleFullscreen)
  dom.btnReload.addEventListener('click', () => {
    if (state.mode === 'playing') startReload()
  })
  dom.btnSwitch.addEventListener('click', () => {
    if (state.mode === 'playing') switchWeapon()
  })
  dom.btnJump.addEventListener('click', () => {
    if (state.mode === 'playing') input.jumpPressed = true
  })
  dom.btnAim.addEventListener('pointerdown', (event) => {
    event.preventDefault()
    if (state.mode !== 'playing') return
    input.ads = true
    dom.btnAim.classList.add('active')
  })
  const releaseAim = () => {
    input.ads = false
    dom.btnAim.classList.remove('active')
  }
  dom.btnAim.addEventListener('pointerup', releaseAim)
  dom.btnAim.addEventListener('pointercancel', releaseAim)
  dom.btnAim.addEventListener('pointerleave', releaseAim)
  bindHold(dom.btnFire, () => {
    if (state.mode !== 'playing') return
    input.fire = true
    input.firePressed = true
  }, () => {
    input.fire = false
  })
  setupJoystick()
  setupLookTouch()
  dom.canvas.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && state.mode === 'playing' && document.pointerLockElement !== dom.canvas) {
      requestLock()
    }
  })
  dom.canvas.addEventListener('mousedown', (event) => {
    if (state.mode !== 'playing') return
    if (event.button === 0) {
      if (document.pointerLockElement !== dom.canvas) requestLock()
      input.fire = true
      input.firePressed = true
    }
    if (event.button === 2) input.ads = true
  })
  window.addEventListener('mouseup', (event) => {
    if (event.button === 0) input.fire = false
    if (event.button === 2) input.ads = false
  })
  window.addEventListener('blur', () => {
    input.fire = false
    input.ads = false
    if (state.mode === 'playing' && !isTouch) pauseGame()
  })
  document.addEventListener('mousemove', (event) => {
    if (state.mode !== 'playing') return
    if (document.pointerLockElement !== dom.canvas) return
    applyLook(event.movementX, event.movementY, 0.0021)
  })
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      event.preventDefault()
      if (state.mode === 'playing') pauseGame()
      else if (state.mode === 'paused') resumeGame()
    }
    if (state.mode !== 'playing') return
    if (event.code === 'KeyR') startReload()
    if (event.code === 'KeyQ' || event.code === 'Tab') {
      event.preventDefault()
      switchWeapon()
    }
    if (event.code === 'KeyM') toggleMute()
    if (event.code === 'Space' && !event.repeat) input.jumpPressed = true
  })
  // Hide the control hint after the first seconds of combat.
  state.hintTimeout = setTimeout(() => dom.hint.classList.add('hide'), 7000)
}

function bindHold(element, down, up) {
  let active = false
  const start = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (active) return
    active = true
    element.classList.add('active')
    try { element.setPointerCapture?.(event.pointerId) } catch {}
    down()
  }
  const end = (event) => {
    if (!active) return
    active = false
    element.classList.remove('active')
    up()
  }
  element.addEventListener('pointerdown', start)
  element.addEventListener('pointerup', end)
  element.addEventListener('pointercancel', end)
  element.addEventListener('lostpointercapture', end)
}

function setStartNote(text, type = '') {
  dom.startNote.textContent = text
  dom.startNote.className = `start-note ${type}`.trim()
}

function updateTiltUI() {
  const on = state.tiltEnabled
  dom.tilt.setAttribute('aria-pressed', String(on))
  dom.tiltHud.setAttribute('aria-pressed', String(on))
  dom.pauseTilt.setAttribute('aria-pressed', String(on))
  dom.tiltState.textContent = on ? 'LIGADA · INCLINE PARA MIRAR' : 'DESLIGADA · TOQUE PARA ATIVAR'
  dom.pauseTiltState.textContent = on ? 'ON' : 'OFF'
  if (on) {
    setStartNote('Inclinação ativa. Segure o celular confortavelmente e incline para mirar.', 'ok')
  }
}

function updateSoundUI() {
  const muted = state.muted
  document.body.classList.toggle('muted', muted)
  dom.soundMenu.setAttribute('aria-pressed', String(!muted))
  dom.soundHud.setAttribute('aria-pressed', String(!muted))
  dom.pauseSound.setAttribute('aria-pressed', String(!muted))
  dom.pauseSoundState.textContent = muted ? 'OFF' : 'ON'
}

function toggleMute() {
  state.muted = !state.muted
  audio.setMuted(state.muted)
  updateSoundUI()
  if (!state.muted) audio.play('ui')
}

// ---------------------------------------------------------------- INPUT
function setupInput() {
  window.addEventListener('keydown', (event) => {
    keys.add(event.code)
    if (event.code === 'KeyW' || event.code === 'ArrowUp') event.preventDefault()
    if (event.code === 'KeyS' || event.code === 'ArrowDown') event.preventDefault()
    if (event.code === 'KeyA' || event.code === 'ArrowLeft') event.preventDefault()
    if (event.code === 'KeyD' || event.code === 'ArrowRight') event.preventDefault()
    if (event.code === 'Space') event.preventDefault()
  }, { passive: false })
  window.addEventListener('keyup', (event) => {
    keys.delete(event.code)
  })
}

function setupJoystick() {
  if (!isTouch) return
  let pointerId = null
  let maxRadius = 42
  const reset = () => {
    pointerId = null
    input.forward = 0
    input.strafe = 0
    input.sprint = false
    dom.stickKnob.style.transform = 'translate(0px, 0px)'
  }
  const move = (event) => {
    if (event.pointerId !== pointerId) return
    const rect = dom.stickBase.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    let dx = event.clientX - cx
    let dy = event.clientY - cy
    const len = Math.hypot(dx, dy)
    if (len > maxRadius) {
      dx = (dx / len) * maxRadius
      dy = (dy / len) * maxRadius
    }
    dom.stickKnob.style.transform = `translate(${dx}px, ${dy}px)`
    const nx = dx / maxRadius
    const ny = dy / maxRadius
    input.strafe = Math.abs(nx) < 0.1 ? 0 : nx
    input.forward = Math.abs(ny) < 0.1 ? 0 : -ny
    input.sprint = Math.hypot(input.forward, input.strafe) > 0.92
  }
  dom.stickZone.addEventListener('pointerdown', (event) => {
    if (state.mode !== 'playing') return
    event.preventDefault()
    event.stopPropagation()
    pointerId = event.pointerId
    maxRadius = dom.stickBase.getBoundingClientRect().width * 0.4
    try { dom.stickZone.setPointerCapture(event.pointerId) } catch {}
    move(event)
  })
  dom.stickZone.addEventListener('pointermove', move)
  dom.stickZone.addEventListener('pointerup', reset)
  dom.stickZone.addEventListener('pointercancel', reset)
  dom.stickZone.addEventListener('lostpointercapture', reset)
}

function setupLookTouch() {
  if (!isTouch) return
  const pointers = new Map()
  dom.canvas.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch' || state.mode !== 'playing') return
    if (event.clientX < window.innerWidth * 0.36) return
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    try { dom.canvas.setPointerCapture(event.pointerId) } catch {}
  })
  dom.canvas.addEventListener('pointermove', (event) => {
    const last = pointers.get(event.pointerId)
    if (!last) return
    const dx = event.clientX - last.x
    const dy = event.clientY - last.y
    last.x = event.clientX
    last.y = event.clientY
    applyLook(dx, dy, 0.0042)
  })
  const end = (event) => pointers.delete(event.pointerId)
  dom.canvas.addEventListener('pointerup', end)
  dom.canvas.addEventListener('pointercancel', end)
  dom.canvas.addEventListener('lostpointercapture', end)
}

function applyLook(dx, dy, sensitivity) {
  if (state.mode !== 'playing') return
  player.yaw -= dx * sensitivity
  player.pitch -= dy * sensitivity
  player.pitch = THREE.MathUtils.clamp(player.pitch, -1.26, 1.26)
  player.lookX = THREE.MathUtils.clamp(player.lookX + dx * 0.012, -1, 1)
  player.lookY = THREE.MathUtils.clamp(player.lookY + dy * 0.012, -1, 1)
}

function requestLock() {
  if (isTouch || state.mode !== 'playing') return
  state.lockRequested = true
  const result = dom.canvas.requestPointerLock?.()
  if (result?.catch) result.catch(() => { state.lockRequested = false })
}

function onPointerLockChange() {
  state.pointerLocked = document.pointerLockElement === dom.canvas
  if (!state.pointerLocked && state.mode === 'playing' && !isTouch && !state.lockRequested) {
    pauseGame()
  }
  if (state.pointerLocked) state.lockRequested = false
}

// ---------------------------------------------------------------- TILT
function setupTilt() {
  if (!('DeviceOrientationEvent' in window)) {
    dom.tilt.disabled = true
    dom.tiltHud.disabled = true
    dom.pauseTilt.disabled = true
    dom.tiltState.textContent = 'INDISPONÍVEL NESTE DISPOSITIVO'
    return
  }
  tiltHandler = (event) => {
    if (!state.tiltEnabled) return
    latestOrientation = event
    if (tilt.baseline === null) {
      calibrateTilt(event)
      return
    }
    if (event.beta == null || event.gamma == null) return
    const angle = getScreenAngle()
    const dBeta = event.beta - tilt.baseline.beta
    const dGamma = event.gamma - tilt.baseline.gamma
    let dx = dGamma
    let dy = dBeta
    if (angle === 90) {
      dx = dBeta
      dy = -dGamma
    } else if (angle === 270 || angle === -90) {
      dx = -dBeta
      dy = dGamma
    }
    if (Math.abs(dx) < tilt.deadzone) dx = 0
    if (Math.abs(dy) < tilt.deadzone) dy = 0
    tilt.deltaYaw -= dx * tilt.sensitivity
    tilt.deltaPitch -= dy * tilt.sensitivity * 0.78
  }
  window.addEventListener('deviceorientation', tiltHandler)
}

function getScreenAngle() {
  const angle = screen.orientation?.angle ?? window.orientation ?? 0
  return ((Number(angle) % 360) + 360) % 360
}

function calibrateTilt(event = latestOrientation) {
  if (!event || event.beta == null || event.gamma == null) {
    tilt.baseline = null
    return
  }
  tilt.baseline = { beta: event.beta, gamma: event.gamma, angle: getScreenAngle() }
  tilt.deltaYaw = 0
  tilt.deltaPitch = 0
}

async function toggleTilt() {
  if (state.tiltEnabled) {
    state.tiltEnabled = false
    tilt.baseline = null
    updateTiltUI()
    setStartNote('Inclinação desligada. Use o arraste para mirar.')
    audio.play('ui')
    return
  }
  if (state.tiltRequesting) return
  state.tiltRequesting = true
  try {
    let orientationPermission = 'granted'
    let motionPermission = 'granted'
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      const orientPromise = DeviceOrientationEvent.requestPermission()
      const motionPromise = typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function'
        ? DeviceMotionEvent.requestPermission()
        : Promise.resolve('granted')
      const [orient, motion] = await Promise.all([orientPromise, motionPromise])
      orientationPermission = orient
      motionPermission = motion
    }
    if (orientationPermission !== 'granted' || motionPermission !== 'granted') {
      setStartNote('Permissão de movimento negada. Ative em Ajustes > Safari > Movimento e Orientação.', 'warn')
      updateTiltUI()
      return
    }
    state.tiltEnabled = true
    tilt.baseline = null
    calibrateTilt()
    updateTiltUI()
    setStartNote('Permissão de movimento concedida. Segure o celular e incline para mirar.', 'ok')
    audio.play('ui')
    if (state.mode === 'playing') {
      setTimeout(calibrateTilt, 500)
    }
  } catch (error) {
    console.warn('Motion permission failed', error)
    setStartNote('Não foi possível acessar o sensor de movimento neste navegador.', 'warn')
  } finally {
    state.tiltRequesting = false
  }
}

function applyTilt() {
  if (!state.tiltEnabled || state.mode !== 'playing') {
    tilt.deltaYaw = 0
    tilt.deltaPitch = 0
    return
  }
  if (tilt.deltaYaw || tilt.deltaPitch) {
    player.yaw += tilt.deltaYaw
    player.pitch = THREE.MathUtils.clamp(player.pitch + tilt.deltaPitch, -1.26, 1.26)
    tilt.deltaYaw = 0
    tilt.deltaPitch = 0
  }
}

// ---------------------------------------------------------------- GAME FLOW
function startGame() {
  audio.init()
  if (state.mode === 'playing') return
  clearGame()
  state.mode = 'playing'
  state.score = 0
  state.kills = 0
  state.shots = 0
  state.hits = 0
  state.combo = 1
  state.comboTimer = 0
  state.bestCombo = 1
  state.wave = 1
  state.waveKills = 0
  state.waveTotal = 0
  state.waveQueue = []
  state.waveActive = false
  state.intermission = 0
  state.bossDefeated = false
  state.startedAt = performance.now()
  state.firstShot = false
  player.health = 100
  player.lastDamage = -99
  player.position.set(0, 0, 9.5)
  player.yaw = 0
  player.pitch = 0
  player.recoilPitch = 0
  player.recoilYaw = 0
  player.jumpY = 0
  player.jumpVel = 0
  player.grounded = true
  player.weapon = 'rifle'
  player.ammo.rifle = WEAPONS.rifle.magSize
  player.ammo.shotgun = WEAPONS.shotgun.magSize
  player.reserve.rifle = 180
  player.reserve.shotgun = 30
  player.reloading = false
  player.reloadT = 0
  player.reloadDuration = 0
  player.nextFire = 0
  player.ads = false
  player.sprint = false
  player.wave = 1
  weaponRig.setWeapon('rifle', true)
  weaponRig.cancelReload()
  input.fire = false
  input.ads = false
  input.forward = 0
  input.strafe = 0
  input.jumpPressed = false
  enemies.clear()
  effects.clear()
  clearPickups()
  if (state.tiltEnabled) {
    tilt.baseline = null
    calibrateTilt()
  }
  dom.start.classList.add('is-hidden')
  dom.overScreen.classList.add('is-hidden')
  dom.winScreen.classList.add('is-hidden')
  dom.pauseScreen.classList.add('is-hidden')
  dom.hud.classList.remove('is-hidden')
  dom.hud.setAttribute('aria-hidden', 'false')
  dom.hint.classList.remove('hide')
  dom.sceneShade.style.opacity = '0.38'
  document.body.classList.add('playing')
  state.deathAt = 0
  state.victoryAt = 0
  state.bannerTimeout && clearTimeout(state.bannerTimeout)
  refreshHud()
  audio.startMusic()
  audio.setPaused(false)
  startWave(1)
  if (!isTouch) requestLock()
  setTimeout(() => {
    if (state.mode === 'playing' && !state.tiltEnabled) {
      setStartNote(isTouch ? 'Arraste à direita para mirar.' : 'Clique para travar o mouse.')
    }
  }, 900)
}

function startWave(number) {
  const def = WAVE_DEFS[number - 1]
  if (!def) return
  state.wave = number
  player.wave = number
  state.waveQueue = def.queue.slice()
  state.waveTotal = def.queue.length
  state.waveKills = 0
  state.waveActive = true
  state.spawnTimer = def.boss ? 1.5 : 1.1
  state.intermission = 0
  state.bossDefeated = false
  audio.setIntensity(0.28 + number * 0.12)
  showBanner(`ONDA ${String(number).padStart(2, '0')} / 06`, def.title, def.sub, def.boss ? 'danger' : 'wave', 2600)
  audio.play('wave')
  if (def.boss) {
    audio.play('boss')
    setTimeout(() => {
      if (state.waveActive && state.wave === number) {
        const boss = enemies.spawn('boss', new THREE.Vector3(0, 0, -14.5), number)
        if (boss) boss.attackCooldown = 2.5
        state.waveQueue = []
        updateWaveHud()
      }
    }, 1400)
  }
  updateWaveHud()
  refreshHud()
}

function updateWave(dt) {
  const def = WAVE_DEFS[state.wave - 1]
  if (!def) return
  if (!state.waveActive) {
    if (state.intermission > 0) {
      state.intermission -= dt
      if (state.intermission <= 0) startWave(Math.min(6, state.wave + 1))
    }
    return
  }
  if (!def.boss && state.waveQueue.length > 0) {
    state.spawnTimer -= dt
    if (state.spawnTimer <= 0 && enemies.aliveCount() < def.maxAlive) {
      const type = state.waveQueue.shift()
      const point = pickSpawnPoint(type === 'bruto' ? 1.1 : 0.6)
      enemies.spawn(type, point, state.wave)
      state.spawnTimer = def.interval * (0.85 + Math.random() * 0.3)
      updateWaveHud()
    }
  }
  const alive = enemies.aliveCount()
  if (state.waveQueue.length === 0 && alive === 0) {
    if (def.boss) {
      if (state.bossDefeated) finishVictory()
      else if (enemies.getBoss()) {
        // Boss is still alive; wait.
      }
    } else {
      completeWave()
    }
  }
  if (def.boss && state.bossDefeated && alive === 0) finishVictory()
}

function completeWave() {
  if (!state.waveActive) return
  state.waveActive = false
  state.intermission = 3.4
  const heal = Math.min(22, player.maxHealth - player.health)
  player.health += heal
  player.reserve.rifle = Math.min(WEAPONS.rifle.reserveMax, player.reserve.rifle + 40)
  player.reserve.shotgun = Math.min(WEAPONS.shotgun.reserveMax, player.reserve.shotgun + 8)
  audio.play('wave')
  showBanner('ONDA LIMPA', state.wave === 5 ? 'O REI ESTÁ CHEGANDO' : 'RESPIRE. RECARREGUE.', heal > 0 ? `+${heal} VITALIDADE · MUNIÇÃO REPOSTA` : 'MUNIÇÃO REPOSTA', 'win', 3000)
  updateWaveHud()
  refreshHud()
}

function handleBossSpawn() {
  dom.bossBar.classList.remove('is-hidden')
  audio.play('boss')
}

function handleBossDeath() {
  state.bossDefeated = true
  dom.bossBar.classList.add('is-hidden')
  showBanner('ALVO ELIMINADO', 'REI MOMO CAIU', 'O LARGO É SEU', 'win', 3600)
  audio.play('victory')
  const drops = [
    ['health', new THREE.Vector3(0, 0, -12.5)],
    ['ammo', new THREE.Vector3(1.8, 0, -12.5)],
    ['health', new THREE.Vector3(-1.8, 0, -12.5)],
  ]
  drops.forEach(([type, pos]) => spawnPickup(type, pos))
}

function finishVictory() {
  if (state.mode !== 'playing') return
  state.mode = 'victory'
  state.victoryAt = performance.now()
  input.fire = false
  audio.setPaused(true)
  if (document.pointerLockElement) document.exitPointerLock?.()
  dom.bossBar.classList.add('is-hidden')
  setTimeout(() => {
    if (state.mode !== 'victory') return
    dom.winScore.textContent = formatScore(state.score)
    dom.winKills.textContent = String(state.kills)
    dom.winAcc.textContent = `${accuracy()}%`
    dom.winCombo.textContent = `x${state.bestCombo}`
    dom.winScreen.classList.remove('is-hidden')
    dom.hud.classList.add('is-hidden')
    dom.hud.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('playing')
  }, 1400)
}

function handleKill(enemy, headshot) {
  if (state.mode !== 'playing') return
  state.kills++
  state.waveKills++
  state.combo = Math.min(12, state.combo + 1)
  state.comboTimer = 4.4
  state.bestCombo = Math.max(state.bestCombo, state.combo)
  const multiplier = state.combo
  const bonus = headshot ? 1.25 : 1
  const points = Math.round(enemy.type.score * multiplier * bonus)
  state.score += points
  effects.floatText(
    new THREE.Vector3(enemy.root.position.x, 2.4 * enemy.type.scale, enemy.root.position.z),
    `${headshot ? 'CRÍTICO ' : ''}+${points}`,
    headshot ? '#ffd23f' : '#d9ff45',
    0.95,
  )
  addFeed(enemy.type.name, headshot)
  audio.play(headshot ? 'headshot' : 'kill')
  if (Math.random() < 0.18) spawnPickup('health', enemy.root.position)
  else if (Math.random() < 0.35) spawnPickup('ammo', enemy.root.position)
  updateWaveHud()
  refreshHud()
}

function handleAdd() {
  updateWaveHud()
}

function damagePlayer(amount, source) {
  if (state.mode !== 'playing') return
  player.health = Math.max(0, player.health - amount)
  player.lastDamage = performance.now() / 1000
  player.shakeT = 0.24
  player.shakeMag = Math.min(0.07, 0.025 + amount * 0.0015)
  audio.play('hurt')
  dom.damageFlash.classList.remove('hit')
  void dom.damageFlash.offsetWidth
  dom.damageFlash.classList.add('hit')
  setTimeout(() => dom.damageFlash.classList.remove('hit'), 140)
  refreshHud()
  if (player.health <= 0) endGame()
}

function endGame() {
  if (state.mode !== 'playing') return
  state.mode = 'dying'
  state.deathAt = performance.now()
  input.fire = false
  input.ads = false
  audio.setPaused(true)
  audio.play('defeat')
  if (document.pointerLockElement) document.exitPointerLock?.()
  dom.bossBar.classList.add('is-hidden')
  setTimeout(() => {
    if (state.mode !== 'dying') return
    state.mode = 'gameover'
    dom.overScore.textContent = formatScore(state.score)
    dom.overWave.textContent = `${state.wave} / 06`
    dom.overKills.textContent = String(state.kills)
    dom.overAcc.textContent = `${accuracy()}%`
    dom.overCopy.textContent = state.wave >= 6
      ? 'Você chegou ao Rei Momo. O morro viu sua luta — mas a roda ainda não acabou.'
      : 'O bloco passou por cima. Respire, recalibre a mira e volte para o morro.'
    dom.overScreen.classList.remove('is-hidden')
    dom.hud.classList.add('is-hidden')
    dom.hud.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('playing')
  }, 1200)
}

function returnToMenu() {
  clearGame()
  state.mode = 'attract'
  state.bossDefeated = false
  dom.start.classList.remove('is-hidden')
  dom.hud.classList.add('is-hidden')
  dom.hud.setAttribute('aria-hidden', 'true')
  dom.pauseScreen.classList.add('is-hidden')
  dom.overScreen.classList.add('is-hidden')
  dom.winScreen.classList.add('is-hidden')
  dom.bossBar.classList.add('is-hidden')
  dom.sceneShade.style.opacity = '1'
  document.body.classList.remove('playing')
  audio.stopMusic()
  audio.setPaused(false)
  if (document.pointerLockElement) document.exitPointerLock?.()
  resetAttractCamera()
  setStartNote(isTouch ? 'Melhor no celular na horizontal. Fones recomendados.' : 'WASD + MOUSE. Clique em JOGAR para travar o cursor.')
}

function pauseGame() {
  if (state.mode !== 'playing') return
  state.mode = 'paused'
  input.fire = false
  input.ads = false
  audio.setPaused(true)
  if (document.pointerLockElement) document.exitPointerLock?.()
  dom.pauseScreen.classList.remove('is-hidden')
}

function resumeGame() {
  if (state.mode !== 'paused') return
  state.mode = 'playing'
  dom.pauseScreen.classList.add('is-hidden')
  audio.setPaused(false)
  state.lockRequested = false
  if (!isTouch) setTimeout(requestLock, 80)
}

function clearGame() {
  enemies.clear()
  effects.clear()
  clearPickups()
  state.waveQueue = []
  state.waveActive = false
  state.intermission = 0
  dom.killFeed.innerHTML = ''
  dom.reload.classList.add('is-hidden')
  dom.bossBar.classList.add('is-hidden')
  dom.damageFlash.classList.remove('hit')
  dom.lowHealth.classList.remove('active')
  player.reloading = false
  player.reloadT = 0
  player.reloadDuration = 0
  player.ads = false
  input.fire = false
  input.ads = false
}

// ---------------------------------------------------------------- SPAWNING
function isInsideCollider(x, z, radius) {
  for (const c of world.colliders) {
    if (x > c.x - c.hx - radius && x < c.x + c.hx + radius && z > c.z - c.hz - radius && z < c.z + c.hz + radius) return true
  }
  return false
}

function pickSpawnPoint(radius = 0.7) {
  const candidates = world.spawnPoints
    .filter((p) => p.distanceTo(player.position) > 11 && !isInsideCollider(p.x, p.z, radius))
    .map((p) => p.clone())
  if (candidates.length) return candidates[Math.floor(Math.random() * candidates.length)]
  let best = world.spawnPoints[0].clone()
  let bestDist = -1
  for (const p of world.spawnPoints) {
    const d = p.distanceTo(player.position)
    if (d > bestDist && !isInsideCollider(p.x, p.z, radius)) {
      best = p.clone()
      bestDist = d
    }
  }
  return best
}

function spawnPickup(type, position) {
  if (type === 'health') {
    const group = new THREE.Group()
    group.position.set(position.x, 0.95, position.z)
    const cupMat = new THREE.MeshStandardMaterial({ color: 0x5b237d, roughness: 0.55, metalness: 0.12 })
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.14, 0.34, 10), cupMat)
    cup.castShadow = true
    group.add(cup)
    const cream = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.035, 10), new THREE.MeshStandardMaterial({ color: 0x9a5cb8, roughness: 0.7 }))
    cream.position.y = 0.18
    group.add(cream)
    const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.48, 6), new THREE.MeshStandardMaterial({ color: 0xd9ff45, emissive: 0xd9ff45, emissiveIntensity: 0.5 }))
    straw.position.set(0.05, 0.34, 0)
    straw.rotation.z = -0.18
    group.add(straw)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexturePickup(), color: 0xc792ff, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending }))
    glow.scale.set(1.3, 1.3, 1)
    group.add(glow)
    scene.add(group)
    pickups.push({ type, group, baseY: 0.95, phase: Math.random() * 10, life: 18 })
  } else {
    const group = new THREE.Group()
    group.position.set(position.x, 0.8, position.z)
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.3, 0.34), new THREE.MeshStandardMaterial({ color: 0x2d5d3a, roughness: 0.7, metalness: 0.15 }))
    crate.castShadow = true
    group.add(crate)
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.07, 0.36), new THREE.MeshStandardMaterial({ color: 0xd9ff45, emissive: 0xd9ff45, emissiveIntensity: 0.5 }))
    band.position.y = 0.06
    group.add(band)
    for (let i = 0; i < 3; i++) {
      const bullet = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.13, 6), new THREE.MeshStandardMaterial({ color: 0xd2a84c, metalness: 0.8, roughness: 0.3 }))
      bullet.position.set(-0.1 + i * 0.1, 0.25, 0)
      group.add(bullet)
    }
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexturePickup(), color: 0xd9ff45, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending }))
    glow.scale.set(1.1, 1.1, 1)
    group.add(glow)
    scene.add(group)
    pickups.push({ type, group, baseY: 0.8, phase: Math.random() * 10, life: 20 })
  }
}

function glowTexturePickup() {
  if (!spawnPickup._glow) {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,.95)')
    grad.addColorStop(0.35, 'rgba(255,255,255,.3)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    spawnPickup._glow = tex
  }
  return spawnPickup._glow
}

function updatePickups(dt) {
  for (let i = pickups.length - 1; i >= 0; i--) {
    const p = pickups[i]
    p.life -= dt
    p.phase += dt * 2
    p.group.rotation.y += dt * 1.5
    p.group.position.y = p.baseY + Math.sin(p.phase) * 0.12
    if (p.life <= 0) {
      scene.remove(p.group)
      pickups.splice(i, 1)
      continue
    }
    const dx = p.group.position.x - player.position.x
    const dz = p.group.position.z - player.position.z
    if (dx * dx + dz * dz < 1.5 * 1.5) {
      collectPickup(p)
      scene.remove(p.group)
      pickups.splice(i, 1)
    }
  }
}

function collectPickup(pickup) {
  audio.play('pickup')
  if (pickup.type === 'health') {
    const before = player.health
    player.health = Math.min(player.maxHealth, player.health + 28)
    const gained = Math.round(player.health - before)
    toast(gained > 0 ? `AÇAÍ +${gained} VITALIDADE` : 'AÇAÍ · VITALIDADE CHEIA')
    effects.emitBurst(pickup.group.position, 0xc792ff, 18, { speed: 3, size: 0.1, life: 0.5, gravity: 2 })
  } else {
    const def = WEAPONS[player.weapon]
    const amount = def.id === 'shotgun' ? 8 : 45
    player.reserve[player.weapon] = Math.min(def.reserveMax, player.reserve[player.weapon] + amount)
    toast(`MUNIÇÃO +${amount}`)
    effects.emitBurst(pickup.group.position, 0xd9ff45, 18, { speed: 3, size: 0.1, life: 0.5, gravity: 2 })
  }
  refreshHud()
}

function clearPickups() {
  for (const p of pickups) scene.remove(p.group)
  pickups.length = 0
}

let toastTimeout = null
function toast(text) {
  dom.pickupToast.textContent = text
  dom.pickupToast.classList.add('show')
  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => dom.pickupToast.classList.remove('show'), 1600)
}

// ---------------------------------------------------------------- PLAYER UPDATE
function updatePlayer(dt, now) {
  if (state.mode !== 'playing') return
  applyTilt()

  let f = input.forward
  let s = input.strafe
  if (keys.has('KeyW') || keys.has('ArrowUp')) f += 1
  if (keys.has('KeyS') || keys.has('ArrowDown')) f -= 1
  if (keys.has('KeyA') || keys.has('ArrowLeft')) s -= 1
  if (keys.has('KeyD') || keys.has('ArrowRight')) s += 1
  const len = Math.hypot(f, s)
  if (len > 1) { f /= len; s /= len }
  player.moveAmount = Math.min(1, Math.hypot(f, s))
  const sprintKey = keys.has('ShiftLeft') || keys.has('ShiftRight')
  player.sprint = (sprintKey || input.sprint) && f > 0.2 && !player.ads
  const speed = player.ads ? 2.15 : player.sprint ? 6.25 : 4.4

  _forward.set(-Math.sin(player.yaw), 0, -Math.cos(player.yaw))
  _right.set(Math.cos(player.yaw), 0, -Math.sin(player.yaw))
  const moveX = _forward.x * f + _right.x * s
  const moveZ = _forward.z * f + _right.z * s
  const moveLen = Math.hypot(moveX, moveZ)
  if (moveLen > 0.001) {
    player.position.x += (moveX / moveLen) * speed * dt
    player.position.z += (moveZ / moveLen) * speed * dt
    resolvePlayerCollisions()
  }
  player.position.x = THREE.MathUtils.clamp(player.position.x, -22.9, 22.9)
  player.position.z = THREE.MathUtils.clamp(player.position.z, -22.9, 22.9)

  if (input.jumpPressed && player.grounded) {
    player.jumpVel = 5.8
    player.grounded = false
    audio.play('ui')
  }
  input.jumpPressed = false
  if (!player.grounded) {
    player.jumpY += player.jumpVel * dt
    player.jumpVel -= 19.5 * dt
    if (player.jumpY <= 0) {
      player.jumpY = 0
      player.jumpVel = 0
      player.grounded = true
    }
  }

  player.bob += dt * (4.5 + player.moveAmount * 7 + (player.sprint ? 5 : 0))
  player.lookX *= Math.pow(0.001, dt)
  player.lookY *= Math.pow(0.001, dt)
  player.recoilPitch *= Math.pow(0.0012, dt)
  player.recoilYaw *= Math.pow(0.0012, dt)
  if (player.shakeT > 0) player.shakeT = Math.max(0, player.shakeT - dt)
  player.roll = THREE.MathUtils.lerp(player.roll, -s * 0.018, Math.min(1, dt * 6))

  if (now - player.lastDamage > 6.5 && player.health < player.maxHealth && state.mode === 'playing') {
    player.health = Math.min(player.maxHealth, player.health + 4.4 * dt)
  }

  if (state.comboTimer > 0) {
    state.comboTimer -= dt
    if (state.comboTimer <= 0) {
      state.combo = 1
      dom.combo.classList.add('is-hidden')
    }
  }

  if (player.reloading) {
    player.reloadT -= dt
    const progress = 1 - Math.max(0, player.reloadT) / player.reloadDuration
    dom.reloadRing.style.strokeDashoffset = String(119 * (1 - progress))
    if (player.reloadT <= 0) finishReload()
  }

  const def = WEAPONS[player.weapon]
  if (input.fire && (def.auto || input.firePressed)) {
    tryFire(now)
  }
  input.firePressed = false
  if (input.reloadPressed) {
    input.reloadPressed = false
    startReload()
  }
  if (input.switchPressed) {
    input.switchPressed = false
    switchWeapon()
  }

  if (player.ads !== input.ads) {
    player.ads = input.ads
  }
  if (player.ads && player.reloading) player.ads = false

  updateCamera(dt)
  updateCrosshair()
}

function resolvePlayerCollisions() {
  const r = 0.34
  for (const c of world.colliders) {
    const minX = c.x - c.hx - r
    const maxX = c.x + c.hx + r
    const minZ = c.z - c.hz - r
    const maxZ = c.z + c.hz + r
    const x = player.position.x
    const z = player.position.z
    if (x > minX && x < maxX && z > minZ && z < maxZ) {
      const left = x - minX
      const right = maxX - x
      const top = z - minZ
      const bottom = maxZ - z
      const m = Math.min(left, right, top, bottom)
      if (m === left) player.position.x = minX
      else if (m === right) player.position.x = maxX
      else if (m === top) player.position.z = minZ
      else player.position.z = maxZ
    }
  }
}

function updateCamera(dt) {
  const bobAmount = player.moveAmount * (player.ads ? 0.008 : 0.028) + (player.sprint ? 0.012 : 0)
  const bobY = Math.sin(player.bob * 2) * bobAmount
  const bobX = Math.cos(player.bob) * bobAmount * 0.55
  const eye = 1.68 + player.jumpY + bobY
  camera.position.set(player.position.x + bobX, eye, player.position.z)
  const shake = player.shakeT > 0 ? player.shakeMag * (player.shakeT / 0.24) : 0
  const sx = shake ? (Math.random() - 0.5) * shake : 0
  const sy = shake ? (Math.random() - 0.5) * shake : 0
  camera.rotation.set(
    player.pitch + player.recoilPitch + sx,
    player.yaw + player.recoilYaw + sy,
    player.roll,
    'YXZ',
  )
  const targetFov = player.ads ? 54 : player.sprint ? 79 : 74
  camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 10)
  camera.updateProjectionMatrix()
  player.chest.set(player.position.x, 1.15 + player.jumpY, player.position.z)
}

function updateCrosshair() {
  const def = WEAPONS[player.weapon]
  const base = player.ads ? 2 : 6
  const spread = base + player.moveAmount * 4 + Math.abs(player.recoilPitch) * 180 + (def.id === 'shotgun' ? 4 : 0)
  dom.crosshair.style.setProperty('--spread', `${Math.min(16, spread)}px`)
  dom.crosshair.classList.toggle('ads', player.ads)
}

// ---------------------------------------------------------------- SHOOTING
function tryFire(now) {
  const def = WEAPONS[player.weapon]
  if (now < player.nextFire || player.reloading || weaponRig.switchT > 0) return
  if (player.ammo[player.weapon] <= 0) {
    if (input.firePressed) audio.play('empty')
    if (player.reserve[player.weapon] > 0 && !player.reloading) startReload()
    return
  }
  player.nextFire = now + def.rate
  player.ammo[player.weapon]--
  state.shots += def.pellets
  if (!state.firstShot) {
    state.firstShot = true
    dom.hint.classList.add('hide')
  }
  audio.play(def.sound)
  weaponRig.fire(def.recoil)
  player.recoilPitch += def.id === 'shotgun' ? 0.036 : 0.013
  player.recoilYaw += (Math.random() - 0.5) * (def.id === 'shotgun' ? 0.014 : 0.006)
  player.shakeT = Math.max(player.shakeT, 0.07)
  player.shakeMag = Math.max(player.shakeMag, def.id === 'shotgun' ? 0.022 : 0.009)

  const muzzle = weaponRig.getMuzzleWorld(camera)
  camera.getWorldDirection(tmpVec)
  const aimDir = tmpVec.clone()
  if (isTouch) aimAssist(aimDir, player.ads ? 0.025 : 0.055)
  const spread = player.ads ? def.adsSpread : def.spread
  const targets = enemies.getHitMeshes()
  for (const mesh of world.hitMeshes) targets.push(mesh)
  let didHit = false
  let hitHead = false
  let killedAny = false

  for (let p = 0; p < def.pellets; p++) {
    const dir = aimDir.clone()
    applySpread(dir, spread)
    raycaster.set(camera.position, dir)
    raycaster.far = def.range
    const hits = raycaster.intersectObjects(targets, false)
    let endpoint = tmpVec2.copy(camera.position).addScaledVector(dir, def.range)
    if (hits.length > 0) {
      const hit = hits[0]
      endpoint = hit.point
      const enemy = hit.object.userData.enemy
      if (enemy && enemy.alive) {
        didHit = true
        const headshot = Boolean(hit.object.userData.head)
        hitHead = hitHead || headshot
        const distanceFalloff = def.id === 'shotgun' ? Math.max(0.38, 1 - hit.distance / 42) : 1
        const damage = def.damage * (headshot ? def.headshot : 1) * distanceFalloff
        const killed = enemy.takeDamage(damage, headshot, hit.point)
        state.hits++
        if (killed) killedAny = true
        effects.emitBurst(hit.point, headshot ? 0xffd23f : 0xff8b4a, headshot ? 10 : 6, { speed: 2.2, size: 0.075, life: 0.32, gravity: 9 })
        effects.tracer(muzzle, hit.point, headshot ? 0xffd23f : 0xffa75a, 0.012)
        if (killed) {
          effects.emitBurst(hit.point, 0xff3e80, 14, { speed: 3.2, size: 0.1, life: 0.45, gravity: 4 })
        }
      } else {
        effects.emitBurst(hit.point, 0xffc07a, 4, { speed: 1.4, size: 0.055, life: 0.25, gravity: 8 })
        effects.tracer(muzzle, hit.point, 0xffb866, 0.008)
      }
    } else {
      effects.tracer(muzzle, endpoint, 0xffc06a, 0.008)
    }
  }

  if (didHit) {
    showHitmarker(killedAny, hitHead)
    if (!killedAny) audio.play(hitHead ? 'headshot' : 'hit')
  }
  refreshHud()
  if (player.ammo[player.weapon] === 0 && player.reserve[player.weapon] > 0) {
    setTimeout(() => {
      if (state.mode === 'playing' && player.ammo[player.weapon] === 0) startReload()
    }, 180)
  }
}

function aimAssist(dir, maxAngle) {
  let bestAngle = maxAngle
  let best = null
  for (const enemy of enemies.enemies) {
    if (!enemy.alive || enemy.spawning > 0) continue
    enemy.getChest(tmpChest)
    const to = tmpChest.clone().sub(camera.position)
    const dist = to.length()
    if (dist > 55) continue
    to.normalize()
    const angle = to.angleTo(dir)
    if (angle < bestAngle) {
      bestAngle = angle
      best = tmpChest.clone()
    }
  }
  if (best) dir.copy(best).sub(camera.position).normalize()
}

function applySpread(dir, spread) {
  if (spread <= 0) return dir
  const right = new THREE.Vector3().crossVectors(dir, camera.up).normalize()
  const up = new THREE.Vector3().crossVectors(right, dir).normalize()
  const angle = Math.random() * Math.PI * 2
  const radius = Math.sqrt(Math.random()) * spread
  dir.addScaledVector(right, Math.cos(angle) * radius)
  dir.addScaledVector(up, Math.sin(angle) * radius)
  return dir.normalize()
}

function startReload() {
  if (state.mode !== 'playing' || player.reloading) return
  const def = WEAPONS[player.weapon]
  if (player.ammo[player.weapon] >= def.magSize || player.reserve[player.weapon] <= 0) {
    if (player.reserve[player.weapon] <= 0) toast('SEM MUNIÇÃO RESERVA')
    return
  }
  player.reloading = true
  player.reloadT = def.reloadTime
  player.reloadDuration = def.reloadTime
  player.ads = false
  input.ads = false
  weaponRig.startReload(def.reloadTime)
  audio.play('reload')
  dom.reload.classList.remove('is-hidden')
  dom.reloadRing.style.strokeDashoffset = '119'
}

function finishReload() {
  if (!player.reloading) return
  const def = WEAPONS[player.weapon]
  const need = def.magSize - player.ammo[player.weapon]
  const take = Math.min(need, player.reserve[player.weapon])
  player.ammo[player.weapon] += take
  player.reserve[player.weapon] -= take
  player.reloading = false
  player.reloadT = 0
  player.reloadDuration = 0
  weaponRig.cancelReload()
  dom.reload.classList.add('is-hidden')
  audio.play('reloadDone')
  refreshHud()
}

function switchWeapon() {
  if (state.mode !== 'playing' || player.reloading || weaponRig.switchT > 0) return
  const next = player.weapon === 'rifle' ? 'shotgun' : 'rifle'
  player.weapon = next
  weaponRig.setWeapon(next)
  input.ads = false
  player.ads = false
  audio.play('ui')
  refreshHud()
  toast(next === 'shotgun' ? 'BERIMBAU-12 · CAL 12' : 'IAUARETÊ-77 · 5.56')
}

// ---------------------------------------------------------------- HUD
function formatScore(value) {
  return String(Math.max(0, Math.round(value))).padStart(6, '0')
}

function accuracy() {
  if (!state.shots) return 0
  return Math.round((state.hits / state.shots) * 100)
}

function refreshHud() {
  const hp = Math.max(0, Math.round(player.health))
  dom.healthValue.textContent = String(hp)
  dom.healthFill.style.width = `${Math.max(0, (player.health / player.maxHealth) * 100)}%`
  dom.healthStatus.textContent = player.health > 65 ? 'ESTÁVEL' : player.health > 32 ? 'FERIDO' : 'CRÍTICO'
  dom.healthPanel.classList.toggle('low', player.health <= 32)
  dom.lowHealth.classList.toggle('active', player.health <= 32 && state.mode === 'playing')
  const def = WEAPONS[player.weapon]
  dom.ammoMag.textContent = String(player.ammo[player.weapon])
  dom.ammoReserve.textContent = `/ ${player.reserve[player.weapon]}`
  dom.ammoMag.parentElement.classList.toggle('low', player.ammo[player.weapon] <= Math.ceil(def.magSize * 0.2))
  dom.weaponType.textContent = def.type
  dom.weaponName.textContent = def.name
  dom.fireMode.textContent = def.mode
  dom.score.textContent = formatScore(state.score)
  dom.comboValue.textContent = `x${state.combo}`
  dom.comboMult.textContent = `x${state.combo}`
  dom.combo.classList.toggle('is-hidden', state.combo <= 1 || state.comboTimer <= 0)
  if (state.comboTimer > 0) dom.comboTimer.style.transform = `scaleX(${Math.max(0, state.comboTimer / 4.4)})`
  dom.objectiveText.textContent = state.wave >= 6 ? 'MATE O REI MOMO' : 'LIMPE A RODA'
  dom.objectiveKicker.textContent = state.wave >= 6 ? 'ALVO PRIORITÁRIO' : 'OBJETIVO'
  updateWaveHud()
}

function updateWaveHud() {
  const def = WAVE_DEFS[state.wave - 1]
  dom.waveLabel.textContent = `ONDA ${String(state.wave).padStart(2, '0')}`
  dom.waveTotal.textContent = '/ 06'
  const total = Math.max(1, state.waveTotal)
  const progress = Math.min(1, state.waveKills / total)
  dom.waveProgress.style.width = `${progress * 100}%`
  const alive = enemies?.aliveCount?.() ?? 0
  const queued = state.waveQueue.length
  if (def?.boss) {
    dom.waveEnemies.textContent = state.bossDefeated ? 'ALVO ELIMINADO' : 'ALVO: REI MOMO'
  } else {
    dom.waveEnemies.textContent = `${Math.max(0, queued + alive)} HOSTIS`
  }
}

function updateBossBar() {
  const boss = enemies.getBoss()
  if (!boss || !boss.alive) {
    dom.bossBar.classList.add('is-hidden')
    return
  }
  dom.bossBar.classList.remove('is-hidden')
  dom.bossFill.style.width = `${Math.max(0, (boss.hp / boss.maxHp) * 100)}%`
}

function showBanner(kicker, title, sub, kind = 'wave', ms = 2400) {
  clearTimeout(state.bannerTimeout)
  dom.bannerKicker.textContent = kicker
  dom.bannerTitle.textContent = title
  dom.bannerSub.textContent = sub
  dom.banner.className = `banner ${kind} show`
  state.bannerTimeout = setTimeout(() => {
    dom.banner.classList.remove('show')
  }, ms)
}

function showHitmarker(kill, headshot) {
  dom.hitmarker.className = `hitmarker show${kill ? ' kill' : ''}`
  dom.hitmarker.style.setProperty('--hit-color', headshot ? '#ffd23f' : '#f0f5e8')
  clearTimeout(showHitmarker._timer)
  showHitmarker._timer = setTimeout(() => {
    dom.hitmarker.className = 'hitmarker'
  }, 190)
}

function addFeed(name, headshot) {
  const item = document.createElement('div')
  item.className = `feed-item${headshot ? ' head' : ''}`
  item.innerHTML = `<span class="feed-icon">${headshot ? '✦' : '×'}</span><b>VOCÊ</b><span>ABATEU</span><strong>${name}</strong>`
  dom.killFeed.prepend(item)
  while (dom.killFeed.children.length > 4) dom.killFeed.lastElementChild.remove()
  setTimeout(() => item.remove(), 4200)
}

function drawRadar(dt) {
  const ctx = dom.radar.getContext('2d')
  const size = dom.radar.width
  const c = size / 2
  const radius = c - 7
  ctx.clearRect(0, 0, size, size)
  ctx.save()
  ctx.translate(c, c)
  // Rings and cross.
  ctx.strokeStyle = 'rgba(217,255,69,.2)'
  ctx.lineWidth = 1
  for (const r of [radius, radius * 0.66, radius * 0.33]) {
    ctx.beginPath()
    ctx.arc(0, 0, r, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.strokeStyle = 'rgba(217,255,69,.08)'
  ctx.beginPath()
  ctx.moveTo(-radius, 0)
  ctx.lineTo(radius, 0)
  ctx.moveTo(0, -radius)
  ctx.lineTo(0, radius)
  ctx.stroke()
  // Sweep.
  const sweep = (performance.now() * 0.0011) % (Math.PI * 2)
  const grad = ctx.createLinearGradient(0, 0, Math.cos(sweep) * radius, Math.sin(sweep) * radius)
  grad.addColorStop(0, 'rgba(217,255,69,.22)')
  grad.addColorStop(1, 'rgba(217,255,69,0)')
  ctx.strokeStyle = grad
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(Math.cos(sweep) * radius, Math.sin(sweep) * radius)
  ctx.stroke()
  // Player arrow.
  ctx.fillStyle = '#d9ff45'
  ctx.beginPath()
  ctx.moveTo(0, -10)
  ctx.lineTo(6, 7)
  ctx.lineTo(0, 3)
  ctx.lineTo(-6, 7)
  ctx.closePath()
  ctx.fill()
  // Enemy blips.
  const scale = radius / 25
  for (const e of enemies.enemies) {
    if (!e.alive) continue
    const dx = e.root.position.x - player.position.x
    const dz = e.root.position.z - player.position.z
    const cos = Math.cos(player.yaw)
    const sin = Math.sin(player.yaw)
    const rx = dx * cos - dz * sin
    const ry = dx * sin + dz * cos
    let px = rx * scale
    let py = ry * scale
    const d = Math.hypot(px, py)
    if (d > radius - 4) {
      px = (px / d) * (radius - 4)
      py = (py / d) * (radius - 4)
    }
    const boss = e.typeKey === 'boss'
    ctx.fillStyle = boss ? '#ff3e80' : e.typeKey === 'bruto' ? '#ffb03a' : '#ff6a8e'
    ctx.beginPath()
    ctx.arc(px, py, boss ? 5 : 3, 0, Math.PI * 2)
    ctx.fill()
    if (boss) {
      ctx.strokeStyle = 'rgba(255,62,128,.5)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(px, py, 8, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
  // Pickup blips.
  for (const p of pickups) {
    const dx = p.group.position.x - player.position.x
    const dz = p.group.position.z - player.position.z
    const cos = Math.cos(player.yaw)
    const sin = Math.sin(player.yaw)
    let px = (dx * cos - dz * sin) * scale
    let py = (dx * sin + dz * cos) * scale
    const d = Math.hypot(px, py)
    if (d > radius - 4) { px = (px / d) * (radius - 4); py = (py / d) * (radius - 4) }
    ctx.fillStyle = p.type === 'health' ? '#c792ff' : '#ffd23f'
    ctx.fillRect(px - 2, py - 2, 4, 4)
  }
  ctx.restore()
}

// ---------------------------------------------------------------- LOOP
function loop(now) {
  requestAnimationFrame(loop)
  const dt = Math.min(0.05, Math.max(0.001, (now - lastFrame) / 1000))
  lastFrame = now
  elapsed += dt
  state.attractTime += dt
  if (state.mode === 'attract') {
    updateAttract(dt)
  } else if (state.mode === 'playing') {
    updatePlayer(dt, now / 1000)
    enemies.update(dt, player)
    updateWave(dt)
    updatePickups(dt)
    updateBossBar()
    if (now - state.lastHudUpdate > 90) {
      state.lastHudUpdate = now
      refreshHud()
    }
    drawRadar(dt)
  } else if (state.mode === 'dying') {
    updateDeathCamera(dt)
  } else if (state.mode === 'gameover' || state.mode === 'victory') {
    updateAttractCameraSlow(dt)
  } else if (state.mode === 'paused') {
    // Keep the scene alive, but frozen.
  }
  world.update(dt)
  effects.update(dt)
  if (state.mode === 'playing' || state.mode === 'paused' || state.mode === 'dying') {
    weaponRig.update(dt, {
      ads: player.ads,
      moveAmount: player.moveAmount,
      sprint: player.sprint,
      lookX: player.lookX,
      lookY: player.lookY,
    })
  }
  render()
}

function render() {
  if (useComposer && composer) {
    composer.render()
  } else {
    renderer.clear()
    renderer.render(scene, camera)
  }
  if (state.mode === 'playing' || state.mode === 'paused' || state.mode === 'dying') {
    renderer.clearDepth()
    renderer.render(weaponRig.scene, weaponRig.camera)
  }
}

function updateAttract(dt) {
  const t = state.attractTime
  const a = 0.62 + Math.sin(t * 0.035) * 0.2
  const r = 25
  camera.position.set(Math.cos(a) * r, 7.2 + Math.sin(t * 0.25) * 0.5, Math.sin(a) * r)
  camera.lookAt(0, 2.6, -4.5)
  camera.fov = 62
  camera.updateProjectionMatrix()
}

function updateAttractCameraSlow(dt) {
  // Keep a subtle camera drift behind result overlays.
  camera.rotation.z += Math.sin(elapsed * 0.5) * 0.0002
}

function updateDeathCamera(dt) {
  camera.position.y += (0.7 - camera.position.y) * Math.min(1, dt * 2)
  camera.rotation.z += (0.35 - camera.rotation.z) * Math.min(1, dt * 2)
}

function resetAttractCamera() {
  state.attractTime = 0
  camera.position.set(22, 7.5, 16)
  camera.lookAt(0, 2.6, -4.5)
  camera.fov = 62
  camera.updateProjectionMatrix()
}

function onResize() {
  if (!renderer) return
  const w = window.innerWidth
  const h = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.4 : 1.7)
  renderer.setPixelRatio(dpr)
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  weaponRig.resize(w / h)
  if (composer) {
    composer.setPixelRatio(dpr)
    composer.setSize(w, h)
  }
  if (bloomPass) bloomPass.resolution.set(w, h)
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.({ navigationUI: 'hide' })
    } else {
      await document.exitFullscreen?.()
    }
  } catch (error) {
    console.warn('Fullscreen unavailable', error)
  }
}

// Debug handle for automated visual and gameplay checks.
if (import.meta.env.DEV || new URLSearchParams(location.search).has('debug')) {
  window.__morro = {
    state, player, input, keys,
    get enemies() { return enemies },
    get renderer() { return renderer },
    get scene() { return scene },
    get world() { return world },
    get effects() { return effects },
    get weaponRig() { return weaponRig },
    get audio() { return audio },
    startGame, pauseGame, resumeGame, startWave, startReload, switchWeapon, toggleMute,
    damagePlayer, endGame,
  }
}

// Kick off once the DOM and styles are ready.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true })
} else {
  boot()
}
