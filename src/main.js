import './style.css'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { createWorld } from './world.js'
import { SoundEngine, VoiceEngine, TiltController } from './audio.js'
import { UI } from './ui.js'
import { Game } from './game.js'

const isTouch = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
window.__touch = isTouch
document.body.classList.toggle('touch', isTouch)
document.body.classList.toggle('portrait', window.innerHeight > window.innerWidth)

const canvas = document.getElementById('game-canvas')
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: !isTouch,
  powerPreference: 'high-performance',
  alpha: false,
  stencil: false,
})
let renderRatio = Math.min(window.devicePixelRatio || 1, isTouch ? 1.6 : 2)
let composerRatio = Math.min(window.devicePixelRatio || 1, isTouch ? 1.35 : 1.8)
renderer.setPixelRatio(renderRatio)
renderer.setSize(window.innerWidth, window.innerHeight, false)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.08
renderer.setClearColor('#04040a', 1)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.05, 180)
camera.position.set(7, 4.2, 8)

const world = createWorld(scene, renderer)

const composer = new EffectComposer(renderer)
composer.setPixelRatio(composerRatio)
composer.setSize(window.innerWidth, window.innerHeight)
const renderPass = new RenderPass(scene, camera)
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  isTouch ? 0.62 : 0.82,
  0.58,
  0.78
)
const outputPass = new OutputPass()
composer.addPass(renderPass)
composer.addPass(bloom)
composer.addPass(outputPass)

const ui = new UI()
const audio = new SoundEngine()
const voice = new VoiceEngine()
const tilt = new TiltController()
const game = new Game({ renderer, scene, camera, world, ui, audio, voice, tilt })
game.setTouch(isTouch)
game.updateTouchUI()

window.__verbo = {
  game,
  forge: (text) => game.forgeFromText(text),
  start: (mic = false) => game.start(mic),
  pause: () => game.pause(),
  resume: () => game.resume(),
  ui,
}

const startBtn = document.getElementById('start-btn')
const silentBtn = document.getElementById('start-silent-btn')
const helpOpen = document.getElementById('help-open')
const helpClose = document.getElementById('help-close')
const pauseBtn = document.getElementById('pause-btn')
const resumeBtn = document.getElementById('resume-btn')
const quitBtn = document.getElementById('quit-btn')
const restartBtn = document.getElementById('restart-btn')
const overMenuBtn = document.getElementById('over-menu-btn')
const tiltBtn = document.getElementById('tilt-btn')
const tiltPauseBtn = document.getElementById('tilt-pause-btn')
const muteMenu = document.getElementById('mute-menu')
const muteGame = document.getElementById('mute-game')
const typeforgeOpen = document.getElementById('typeforge-open')
const typeforgeClose = document.getElementById('typeforge-close')
const typeforgeForm = document.getElementById('typeforge-form')
const typeforgeInput = document.getElementById('typeforge-input')

function startGame (withMic) {
  audio.init()
  game.start(withMic)
  if (!withMic) {
    ui.toast('MODO SEM MIC — use FORJAR POR TEXTO no pause', 3200)
  }
}

startBtn.addEventListener('click', () => startGame(true))
silentBtn.addEventListener('click', () => startGame(false))
helpOpen.addEventListener('click', () => ui.showHelp())
helpClose.addEventListener('click', () => ui.showMenu())
pauseBtn.addEventListener('click', () => game.pause())
resumeBtn.addEventListener('click', () => game.resume())
quitBtn.addEventListener('click', () => game.quitToMenu())
restartBtn.addEventListener('click', () => game.restart())
overMenuBtn.addEventListener('click', () => game.quitToMenu())
muteMenu.addEventListener('click', () => {
  const muted = audio.toggleMute()
  ui.setMuted(muted)
})
muteGame.addEventListener('click', () => {
  const muted = audio.toggleMute()
  ui.setMuted(muted)
  ui.toast(muted ? 'SOM DESATIVADO' : 'SOM ATIVADO', 1200)
})

async function toggleTilt () {
  if (tilt.enabled) {
    tilt.disable()
    ui.setTilt(false, isTouch && tilt.supported)
    ui.toast('INCLINAÇÃO DESATIVADA', 1400)
    return
  }
  if (!tilt.supported) {
    ui.toast('SENSOR DE MOVIMENTO INDISPONÍVEL', 1800)
    return
  }
  const result = await tilt.requestPermission()
  if (!result.ok) {
    ui.toast(result.error === 'Permissão negada' ? 'PERMISSÃO DE MOVIMENTO NEGADA' : 'NÃO FOI POSSÍVEL ATIVAR A INCLINAÇÃO', 2200)
    return
  }
  tilt.enable()
  ui.setTilt(true, true)
  ui.toast('INCLINAÇÃO ATIVA — INCLINE PARA MIRAR', 1800)
  navigator.vibrate?.(30)
}

tiltBtn.addEventListener('click', toggleTilt)
tiltPauseBtn.addEventListener('click', toggleTilt)

typeforgeOpen.addEventListener('click', () => ui.showTypeforge())
typeforgeClose.addEventListener('click', () => {
  if (game.state === 'paused') ui.showPause()
  else ui.showMenu()
})
typeforgeForm.addEventListener('submit', event => {
  event.preventDefault()
  const text = typeforgeInput.value.trim()
  if (!text) {
    typeforgeInput.focus()
    return
  }
  game.forgeFromText(text)
  typeforgeInput.value = ''
  if (game.state === 'paused') game.resume()
  else if (game.state === 'menu') ui.showMenu()
})

if (!isTouch || !tilt.supported) {
  tiltBtn.classList.remove('available')
  tiltPauseBtn.style.display = 'none'
}
if (isTouch) {
  tiltBtn.classList.add('available')
}
ui.setTilt(false, isTouch && tilt.supported)

// iOS needs a user gesture for motion permission; this button is that gesture.
document.getElementById('help-close')?.addEventListener('click', () => {
  audio.ui()
})

window.addEventListener('resize', resize)
window.visualViewport?.addEventListener('resize', resize)
function resize () {
  const width = window.innerWidth
  const height = window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(renderRatio)
  renderer.setSize(width, height, false)
  composer.setPixelRatio(composerRatio)
  composer.setSize(width, height)
  bloom.setSize(width, height)
  document.body.classList.toggle('portrait', height > width)
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden && game.state === 'playing') game.pause()
})

window.addEventListener('contextmenu', event => event.preventDefault())
window.addEventListener('gesturestart', event => event.preventDefault())
document.addEventListener('dblclick', event => event.preventDefault(), { passive: false })

const clock = new THREE.Clock()
let elapsed = 0
let fpsFrames = 0
let fpsTime = 0
let lowQuality = false

renderer.setAnimationLoop(() => {
  const dt = Math.min(0.05, clock.getDelta())
  elapsed += dt
  game.update(dt)
  composer.render()
  fpsFrames++
  fpsTime += dt
  if (fpsTime > 2) {
    const fps = fpsFrames / fpsTime
    if (!lowQuality && fps < 34 && elapsed > 6) {
      lowQuality = true
      renderRatio = 1
      composerRatio = 1
      bloom.strength = 0.45
      resize()
    }
    fpsFrames = 0
    fpsTime = 0
  }
})

// Prevent iOS elastic scrolling around the fixed canvas.
document.addEventListener('touchmove', event => {
  if (event.target === canvas) event.preventDefault()
}, { passive: false })
