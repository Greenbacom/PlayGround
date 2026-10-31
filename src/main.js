import * as THREE from '../vendor/three.module.js';
import { buildWorld } from './world.js';
import { Effects } from './effects.js';
import { Player, WEAPONS } from './player.js';
import { EnemyManager } from './enemies.js';
import { AudioEngine } from './audio.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const clamp = THREE.MathUtils.clamp;
const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (isTouch && innerWidth < 1200);
const STORE = 'mandacaru.v1';
const TAU = Math.PI * 2;

if (isTouch) document.body.classList.add('touch');

/* ------------------------------------------------------------------ i18n */
const I18N = {
  pt: {
    loading: 'ACENDENDO O FAROL...', loadingWorld: 'MONTANDO A LAJE...', loadingWeapons: 'CARREGANDO O BATUQUE...',
    eyebrow: 'UM FPS DA LAJE · DIRETO NO NAVEGADOR', subtitle: 'ÚLTIMA LINHA',
    tagline: 'A laje é nossa. O farol é a última luz do morro.<br><b>Segure as ondas. Não deixe a música parar.</b>',
    play: 'JOGAR AGORA', tilt: 'ATIVAR TILT', tiltOn: 'TILT ATIVO', best: 'MELHOR PONTUAÇÃO', made: 'FEITO COM THREE.JS · 60 FPS',
    briefing: 'BRIEFING', objective: 'PROTEJA O FAROL',
    objectiveDesc: 'As máscaras do bloco querem apagar a última luz da laje. Elas vêm em ondas. Você é a linha.',
    ctrlMove: 'MOVER', ctrlLook: 'MIRAR', ctrlFire: 'ATIRAR', ctrlReload: 'RECARREGAR', ctrlSwap: 'TROCAR ARMA', ctrlJump: 'PULAR',
    tiltNote: 'Toque em ATIVAR TILT para mirar inclinando o celular. No iPhone, o Safari pede permissão.',
    farol: 'FAROL', score: 'PONTOS', you: 'VOCÊ', fire: 'FOGO', aim: 'MIRA', reload: 'RECARGA', swap: 'TROCAR', jump: 'PULO',
    paused: 'PAUSA', pausedDesc: 'Respira. O morro espera.', resume: 'CONTINUAR', restart: 'REINICIAR', quit: 'SAIR',
    sensitivity: 'SENSIBILIDADE', music: 'MÚSICA', sfx: 'EFEITOS', tiltSetting: 'TILT / GIROSCÓPIO', language: 'IDIOMA',
    fullscreen: 'TELA CHEIA', fullscreenBtn: 'ATIVAR', kills: 'ABATES', accuracy: 'PRECISÃO', waves: 'ONDAS',
    headshots: 'NA CABEÇA', bestCombo: 'MELHOR COMBO', playAgain: 'JOGAR DE NOVO', menu: 'MENU',
    wave: 'ONDA', waveClear: 'ONDA LIMPA', waveBonus: 'BÔNUS DE ONDA', bossIncoming: 'REI MOMO CHEGOU', bossDown: 'REI MOMO CAIU',
    tiltDenied: 'Permissão de movimento negada. O toque continua valendo.', tiltUnsupported: 'Este aparelho não tem sensores de movimento.',
    tiltEnabled: 'TILT ATIVO — incline para mirar', tiltDisabled: 'TILT DESATIVADO', calibrate: 'TILT CALIBRADO',
    capybara: 'RESPEITA A CAPIVARA!', pickup: 'AÇAÍ! +30 DE VIDA', beaconLow: 'O FAROL ESTÁ APAGANDO!',
    gameOverBeacon: 'O FAROL APAGOU', gameOverPlayer: 'VOCÊ CAIU', gameOverDesc: 'A laje resistiu até o fim. Volta pra roda.',
    gameOverDescBeacon: 'As máscaras tomaram a laje. Acende o farol de novo.', victory: 'A LAJE RESISTIU',
    rank0: 'INICIANTE', rank1: 'ALUNO', rank2: 'FORMADO', rank3: 'CONTRAMESTRE', rank4: 'MESTRE',
    rank0d: 'A roda ainda está te esperando.', rank1d: 'O berimbau já conhece seu nome.',
    rank2d: 'Agora você joga no ritmo do morro.', rank3d: 'A laje confia em você.', rank4d: 'Você é a última linha. Lenda da laje.',
    feedMask: 'MÁSCARA', feedBoneco: 'BONECO', feedBoss: 'REI MOMO', feedKill: 'ABATIDO', feedHead: 'NA CABEÇA',
    lowAmmo: 'RECARREGUE', combo: 'COMBO', newBest: 'NOVO RECORDE!',
    youDied: 'VOCÊ CAIU', beaconDied: 'O FAROL APAGOU',
    musicOn: 'SOM ON', musicOff: 'SOM OFF',
    tapPlay: 'TOQUE PARA JOGAR', dragLook: 'ARRASTE PARA MIRAR', joyMove: 'DIRECIONAL PARA ANDAR',
    desktopHint: 'WASD + MOUSE · R RECARREGA · 1/2 TROCA · ESC PAUSA', portrait: 'Vire o celular para uma visão melhor.',
    aimTouch: 'MIRA', reloadTouch: 'RECARGA', tiltCalibrate: 'CALIBRAR',
    waveNames: ['CHEGADA', 'CORO DE MÁSCARAS', 'BATUQUE PESADO', 'REI MOMO', 'TAMBORES DA MADRUGADA', 'A LAJE RESPONDE', 'ENXAME DE PLUMAS', 'O BLOCO INTEIRO'],
  },
  en: {
    loading: 'LIGHTING THE BEACON...', loadingWorld: 'BUILDING THE ROOFTOP...', loadingWeapons: 'LOADING THE BEAT...',
    eyebrow: 'A ROOFTOP FPS · RIGHT IN YOUR BROWSER', subtitle: 'LAST LINE',
    tagline: 'The rooftop is ours. The beacon is the last light on the hill.<br><b>Hold the waves. Don\'t let the music stop.</b>',
    play: 'PLAY NOW', tilt: 'ENABLE TILT', tiltOn: 'TILT ON', best: 'BEST SCORE', made: 'BUILT WITH THREE.JS · 60 FPS',
    briefing: 'BRIEFING', objective: 'PROTECT THE BEACON',
    objectiveDesc: 'The carnival masks want to snuff out the last light on the rooftop. They come in waves. You are the line.',
    ctrlMove: 'MOVE', ctrlLook: 'LOOK', ctrlFire: 'FIRE', ctrlReload: 'RELOAD', ctrlSwap: 'SWAP WEAPON', ctrlJump: 'JUMP',
    tiltNote: 'Tap ENABLE TILT to aim by tilting your phone. On iPhone, Safari asks for permission.',
    farol: 'BEACON', score: 'SCORE', you: 'YOU', fire: 'FIRE', aim: 'AIM', reload: 'RELOAD', swap: 'SWAP', jump: 'JUMP',
    paused: 'PAUSED', pausedDesc: 'Breathe. The hill waits.', resume: 'RESUME', restart: 'RESTART', quit: 'QUIT',
    sensitivity: 'SENSITIVITY', music: 'MUSIC', sfx: 'SFX', tiltSetting: 'TILT / GYROSCOPE', language: 'LANGUAGE',
    fullscreen: 'FULLSCREEN', fullscreenBtn: 'ENABLE', kills: 'KILLS', accuracy: 'ACCURACY', waves: 'WAVES',
    headshots: 'HEADSHOTS', bestCombo: 'BEST COMBO', playAgain: 'PLAY AGAIN', menu: 'MENU',
    wave: 'WAVE', waveClear: 'WAVE CLEAR', waveBonus: 'WAVE BONUS', bossIncoming: 'REI MOMO ARRIVED', bossDown: 'REI MOMO DOWN',
    tiltDenied: 'Motion permission denied. Touch still works.', tiltUnsupported: 'This device has no motion sensors.',
    tiltEnabled: 'TILT ON — lean to aim', tiltDisabled: 'TILT OFF', calibrate: 'TILT CALIBRATED',
    capybara: 'RESPECT THE CAPYBARA!', pickup: 'AÇAÍ! +30 HEALTH', beaconLow: 'THE BEACON IS FADING!',
    gameOverBeacon: 'THE BEACON WENT OUT', gameOverPlayer: 'YOU WENT DOWN', gameOverDesc: 'The rooftop held until the end. Back to the circle.',
    gameOverDescBeacon: 'The masks took the rooftop. Light the beacon again.', victory: 'THE ROOFTOP HELD',
    rank0: 'BEGINNER', rank1: 'STUDENT', rank2: 'FORMADO', rank3: 'CONTRAMESTRE', rank4: 'MESTRE',
    rank0d: 'The circle is still waiting for you.', rank1d: 'The berimbau knows your name now.',
    rank2d: 'You move to the rhythm of the hill.', rank3d: 'The rooftop trusts you.', rank4d: 'You are the last line. A rooftop legend.',
    feedMask: 'MASK', feedBoneco: 'SCRAP BONE', feedBoss: 'REI MOMO', feedKill: 'DOWN', feedHead: 'HEADSHOT',
    lowAmmo: 'RELOAD', combo: 'COMBO', newBest: 'NEW BEST!',
    youDied: 'YOU WENT DOWN', beaconDied: 'THE BEACON WENT OUT',
    musicOn: 'SOUND ON', musicOff: 'SOUND OFF',
    tapPlay: 'TAP TO PLAY', dragLook: 'DRAG TO LOOK', joyMove: 'STICK TO MOVE',
    desktopHint: 'WASD + MOUSE · R RELOAD · 1/2 SWAP · ESC PAUSE', portrait: 'Rotate your phone for a better view.',
    aimTouch: 'AIM', reloadTouch: 'RELOAD', tiltCalibrate: 'CALIBRATE',
    waveNames: ['ARRIVAL', 'MASK CHOIR', 'HEAVY BATUQUE', 'REI MOMO', 'MIDNIGHT DRUMS', 'THE ROOFTOP ANSWERS', 'FEATHER SWARM', 'THE WHOLE BLOCK'],
  },
};

let lang = 'pt';
let settings = {
  sound: true, music: true, sensitivity: 1, tilt: false,
};
let bestScore = 0;
try {
  const raw = localStorage.getItem(STORE);
  if (raw) {
    const saved = JSON.parse(raw);
    if (saved.lang) lang = saved.lang;
    if (saved.settings) settings = { ...settings, ...saved.settings };
    if (typeof saved.best === 'number') bestScore = saved.best;
  }
} catch {}
const t = (key) => I18N[lang][key] ?? I18N.pt[key] ?? key;
const waveName = (n) => {
  const arr = I18N[lang].waveNames;
  return arr[Math.min(arr.length - 1, (n - 1) % arr.length)];
};
function saveStore() {
  try { localStorage.setItem(STORE, JSON.stringify({ lang, settings, best: bestScore })); } catch {}
}

/* ------------------------------------------------------------------ DOM */
const els = {
  loading: $('#loading'), loadFill: $('#loadFill'), loadLabel: $('#loadLabel'),
  menu: $('#menu'), hud: $('#hud'), pause: $('#pause'), gameover: $('#gameover'),
  playBtn: $('#playBtn'), tiltBtn: $('#tiltBtn'), bestScore: $('#bestScore'), tiltNote: $('#tiltNote'),
  langBtn: $('#langBtn'), soundBtn: $('#soundBtn'), pauseBtn: $('#pauseBtn'),
  score: $('#score'), combo: $('#combo'), comboBadge: $('#comboBadge'),
  beaconBar: $('#beaconBar'), beaconPct: $('#beaconPct'), bossWrap: $('#bossWrap'), bossBar: $('#bossBar'),
  healthBar: $('#healthBar'), healthPct: $('#healthPct'), ammo: $('#ammo'), ammoMax: $('#ammoMax'),
  weaponName: $('#weaponName'), weaponLabel: $('#weaponLabel'), crosshair: $('#crosshair'),
  hitmarker: $('#hitmarker'), damageNumbers: $('#damageNumbers'), killfeed: $('#killfeed'),
  waveBanner: $('#waveBanner'), waveBig: $('#waveBig'), waveSub: $('#waveSub'), toast: $('#toast'),
  tiltBadge: $('#tiltBadge'), lowHealth: $('#lowHealth'), damageFlash: $('#damageFlash'), flash: $('#flash'),
  joystick: $('#joystick'), joyThumb: $('#joyThumb'),
  fireBtn: $('#fireBtn'), aimBtn: $('#aimBtn'), reloadBtn: $('#reloadBtn'), swapBtn: $('#swapBtn'), jumpBtn: $('#jumpBtn'),
  resumeBtn: $('#resumeBtn'), restartBtn: $('#restartBtn'), quitBtn: $('#quitBtn'),
  pauseWave: $('#pauseWave'), pauseScore: $('#pauseScore'), pauseKills: $('#pauseKills'), pauseAcc: $('#pauseAcc'),
  sensRange: $('#sensRange'), sensOut: $('#sensOut'), musicToggle: $('#musicToggle'), sfxToggle: $('#sfxToggle'),
  tiltToggle: $('#tiltToggle'), langToggle: $('#langToggle'), fsBtn: $('#fsBtn'),
  overTitle: $('#overTitle'), overDesc: $('#overDesc'), overWave: $('#overWave'), overScore: $('#overScore'),
  overKills: $('#overKills'), overAcc: $('#overAcc'), overWaves: $('#overWaves'), overHeads: $('#overHeads'),
  overCombo: $('#overCombo'), rankMedal: $('#rankMedal'), rankName: $('#rankName'), rankDesc: $('#rankDesc'),
  againBtn: $('#againBtn'), menuBtn: $('#menuBtn'),
};

/* --------------------------------------------------------------- renderer */
const canvas = $('#game');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', stencil: false });
} catch (e) {
  els.loadLabel.textContent = 'WebGL não disponível neste navegador.';
  throw e;
}
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.autoClear = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.05, 700);
camera.position.set(0, 1.65, 13);
camera.rotation.order = 'YXZ';

let world, effects, audio, player, enemies;
let capyMeshes = [];

/* ---------------------------------------------------------------- game state */
const game = {
  mode: 'loading',
  time: 0,
  score: 0,
  wave: 0,
  waveActive: false,
  nextWaveAt: 0,
  spawnQueue: [],
  combo: 1,
  comboTimer: 0,
  bestCombo: 1,
  beacon: 100,
  maxBeacon: 100,
  kills: 0,
  headshots: 0,
  shots: 0,
  hits: 0,
  boss: null,
  pickups: [],
  pickupGroup: null,
  capyDone: false,
  hudT: 0,
  lowWarnT: 0,
  fpsAccum: 0,
  fpsFrames: 0,
  quality: isMobile ? 1 : 2,
  hadLock: false,
  deathCause: 'player',
  runTime: 0,
};

/* ---------------------------------------------------------------- settings */
function applySettings() {
  els.sensRange.value = settings.sensitivity;
  els.sensOut.textContent = Number(settings.sensitivity).toFixed(1);
  els.musicToggle.classList.toggle('on', settings.music);
  els.sfxToggle.classList.toggle('on', settings.sound);
  els.tiltToggle.classList.toggle('on', settings.tilt && tiltState.enabled);
  els.soundBtn.innerHTML = `<span class="${settings.sound ? 'on' : ''}">${settings.sound ? t('musicOn') : t('musicOff')}</span>`;
  els.langBtn.innerHTML = `<span class="${lang === 'pt' ? 'on' : ''}">PT</span><span class="${lang === 'en' ? 'on' : ''}">/ EN</span>`;
  els.tiltBtn.classList.toggle('active', tiltState.enabled);
  els.tiltBtn.querySelector('span:last-child').textContent = tiltState.enabled ? t('tiltOn') : t('tilt');
  els.tiltNote.classList.toggle('off', !tiltState.enabled);
  els.tiltNote.querySelector('span:last-child').textContent = tiltState.enabled
    ? (lang === 'pt' ? 'Tilt ativo. Incline o aparelho para mirar. Toque de novo para desligar.' : 'Tilt on. Lean the device to aim. Tap again to turn off.')
    : t('tiltNote');
  if (audio) {
    audio.setMuted(!settings.sound);
    audio.setMusic(settings.music);
    audio.setSfxVolume(settings.sound ? 0.85 : 0);
  }
}

function applyLanguage() {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  $$('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (key === 'tagline') el.innerHTML = t(key);
    else el.textContent = t(key);
  });
  els.bestScore.textContent = bestScore.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
  applySettings();
}

/* ------------------------------------------------------------------ tilt */
const tiltState = {
  enabled: false, supported: typeof DeviceOrientationEvent !== 'undefined',
  beta: 0, gamma: 0, neutralBeta: 0, neutralGamma: 0, hasData: false, calibrated: false,
};
function orientHandler(e) {
  if (e.beta == null || e.gamma == null) return;
  tiltState.beta = e.beta;
  tiltState.gamma = e.gamma;
  if (!tiltState.hasData) {
    tiltState.hasData = true;
    tiltState.neutralBeta = e.beta;
    tiltState.neutralGamma = e.gamma;
    tiltState.calibrated = true;
  }
}
async function toggleTilt() {
  if (tiltState.enabled) {
    window.removeEventListener('deviceorientation', orientHandler, true);
    tiltState.enabled = false;
    settings.tilt = false;
    saveStore();
    applySettings();
    els.tiltBadge.classList.remove('show');
    showToast(t('tiltDisabled'));
    return;
  }
  if (typeof DeviceOrientationEvent === 'undefined') {
    showToast(t('tiltUnsupported'));
    return;
  }
  try {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      const res = await DeviceOrientationEvent.requestPermission();
      if (res !== 'granted') {
        showToast(t('tiltDenied'), 3200);
        return;
      }
    }
    tiltState.hasData = false;
    tiltState.calibrated = false;
    window.addEventListener('deviceorientation', orientHandler, true);
    tiltState.enabled = true;
    settings.tilt = true;
    saveStore();
    applySettings();
    els.tiltBadge.classList.add('show');
    showToast(t('tiltEnabled'), 2600);
    audio?.ui(true);
    // calibrate after the first sensor sample
    setTimeout(() => {
      if (tiltState.enabled && tiltState.hasData) {
        tiltState.neutralBeta = tiltState.beta;
        tiltState.neutralGamma = tiltState.gamma;
        tiltState.calibrated = true;
      }
    }, 450);
  } catch (err) {
    showToast(t('tiltDenied'), 3200);
  }
}
function calibrateTilt() {
  if (!tiltState.enabled) return;
  tiltState.neutralBeta = tiltState.beta;
  tiltState.neutralGamma = tiltState.gamma;
  tiltState.calibrated = true;
  showToast(t('calibrate'));
}
function tiltInput() {
  if (!tiltState.enabled || !tiltState.hasData) return { yaw: 0, pitch: 0 };
  const angle = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
  let yawDeg, pitchDeg;
  const db = tiltState.beta - tiltState.neutralBeta;
  const dg = tiltState.gamma - tiltState.neutralGamma;
  if (angle === 90) { yawDeg = -db; pitchDeg = -dg; }
  else if (angle === 270 || angle === -90) { yawDeg = db; pitchDeg = dg; }
  else { yawDeg = dg; pitchDeg = db; }
  const dead = 2.4;
  const dz = (v) => Math.abs(v) < dead ? 0 : Math.sign(v) * (Math.abs(v) - dead);
  const yaw = dz(yawDeg) * 0.03;
  const pitch = -dz(pitchDeg) * 0.016;
  return { yaw, pitch };
}

/* ----------------------------------------------------------------- audio */
function initAudio() {
  if (!audio) return;
  audio.init();
  audio.setMuted(!settings.sound);
  audio.setMusic(settings.music);
  audio.setSfxVolume(settings.sound ? 0.85 : 0);
}

/* -------------------------------------------------------------- boot / world */
function setLoad(p, label) {
  els.loadFill.style.width = `${p}%`;
  if (label) els.loadLabel.textContent = label;
}
const raf = () => new Promise((r) => requestAnimationFrame(() => r()));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function boot() {
  setLoad(8, t('loading'));
  await Promise.race([document.fonts.ready, wait(1600)]);
  try {
    await Promise.all([
      document.fonts.load('400 100px "Archivo Black"'),
      document.fonts.load('800 20px Manrope'),
    ]);
  } catch {}
  setLoad(24, t('loadingWorld'));
  await raf();
  world = buildWorld(scene, renderer);
  if (isMobile) {
    world.sun.shadow.mapSize.set(1024, 1024);
    world.sun.shadow.map?.dispose();
    world.sun.shadow.map = null;
  }
  setLoad(58, t('loadingWorld'));
  await raf();
  effects = new Effects(scene);
  setLoad(70, t('loadingWeapons'));
  await raf();
  audio = new AudioEngine();
  player = new Player({ camera, renderer, scene, audio, effects, world });
  setLoad(84, t('loadingWeapons'));
  await raf();

  player.getTargets = () => {
    const arr = [...world.colliders, ...enemies.getHitMeshes(), ...capyMeshes];
    return arr;
  };
  world.capybara.group.traverse((o) => { if (o.isMesh) capyMeshes.push(o); });

  enemies = new EnemyManager({
    scene, camera, effects, audio, obstacles: world.obstacles,
    onPlayerDamage: (amount, source) => {
      if (game.mode !== 'playing') return;
      player.takeDamage(amount, source);
    },
    onBeaconDamage: (amount, source) => {
      if (game.mode !== 'playing') return;
      game.beacon = Math.max(0, game.beacon - amount);
      updateBeaconUI();
      audio.beaconAlarm();
      effects.sparksBurst(world.beacon.position.clone().setY(1.4), null, 8, 0xff6a4a);
      if (game.beacon <= 0) endRun('beacon');
    },
    onKill: (enemy, head) => registerKill(enemy, head),
    onBossHealth: (ratio) => {
      els.bossBar.style.width = `${Math.max(0, ratio) * 100}%`;
    },
  });

  player.onHealth = (hp, max) => {
    const pct = clamp(hp / max, 0, 1);
    els.healthBar.style.width = `${pct * 100}%`;
    els.healthPct.textContent = Math.ceil(hp);
    els.healthBar.classList.toggle('low', pct < 0.3);
    els.lowHealth.classList.toggle('hidden', pct >= 0.3 || game.mode !== 'playing');
  };
  player.onAmmo = (id, ammo, mag, reloading) => {
    els.ammo.textContent = reloading ? '··' : ammo;
    els.ammoMax.textContent = reloading ? t('reload') : `/ ${mag}`;
    els.ammo.classList.toggle('low', ammo <= Math.ceil(mag * 0.25));
  };
  player.onWeapon = (id) => {
    els.weaponName.textContent = WEAPONS[id].name;
    els.weaponLabel.textContent = WEAPONS[id].label;
    els.ammoMax.textContent = `/ ${WEAPONS[id].mag}`;
  };
  player.onHit = (head, enemy, point, dmg) => {
    if (!point) return;
    showHitmarker(head);
    spawnDamageNumber(point, head, dmg);
  };
  player.onDamage = (amount) => {
    els.damageFlash.style.opacity = clamp(amount / 30, 0.15, 0.7);
    setTimeout(() => { els.damageFlash.style.opacity = '0'; }, 120);
    if (navigator.vibrate) navigator.vibrate(35);
  };
  player.onDeath = () => endRun('player');
  player.onCapybara = (point) => {
    if (world.capybara.scare()) {
      game.capyDone = true;
      showToast(t('capybara'), 2400);
      audio.ui(true);
      effects.confettiBurst(point, [0xffd24a, 0x1fd1b2, 0xff4f9a], 18, 3);
      addFeed(`<b>CAPIVARA</b> · ${lang === 'pt' ? 'CORREU' : 'RAN OFF'}`);
    }
  };
  player.onWeapon('smg');

  // decorative health pickup group
  game.pickupGroup = new THREE.Group();
  scene.add(game.pickupGroup);

  window.__mandacaru = { game, player, enemies, world, effects, camera, renderer };
  setLoad(100, t('loading'));
  await wait(380);
  els.loading.classList.add('hidden');
  game.mode = 'menu';
  els.menu.classList.remove('hidden');
  applyLanguage();
  updateMenuCamera(0);
  requestAnimationFrame(loop);
}

/* ---------------------------------------------------------------- menu camera */
function updateMenuCamera(time) {
  const a = time * 0.045;
  const r = 12.5;
  camera.position.set(Math.sin(a) * r, 4.7 + Math.sin(time * 0.27) * 0.22, 9.5 + Math.cos(a) * 4.6);
  camera.lookAt(0, 2.4, -6.5);
  if (camera.fov !== 64) {
    camera.fov = 64;
    camera.updateProjectionMatrix();
  }
}

/* ---------------------------------------------------------------- input */
const keys = new Set();
const lookAccum = { x: 0, y: 0 };
const oneShot = { jump: false, reload: false, swap: false };
const touch = {
  joyId: null, joyVec: { x: 0, y: 0 }, lookId: null, lastX: 0, lastY: 0,
  fire: false, aim: false, mouseFire: false, mouseAim: false,
};
let pointerLocked = false;

function buildInput(dt) {
  let moveX = touch.joyVec.x;
  let moveY = touch.joyVec.y;
  if (keys.has('KeyA') || keys.has('ArrowLeft')) moveX -= 1;
  if (keys.has('KeyD') || keys.has('ArrowRight')) moveX += 1;
  if (keys.has('KeyW') || keys.has('ArrowUp')) moveY += 1;
  if (keys.has('KeyS') || keys.has('ArrowDown')) moveY -= 1;
  const m = Math.hypot(moveX, moveY);
  if (m > 1) { moveX /= m; moveY /= m; }
  const tilt = tiltInput();
  const input = {
    moveX, moveY,
    lookX: lookAccum.x, lookY: lookAccum.y,
    fire: touch.fire || touch.mouseFire,
    aim: touch.aim || touch.mouseAim,
    jump: oneShot.jump,
    reload: oneShot.reload,
    switchWeapon: oneShot.swap,
    sprint: keys.has('ShiftLeft') || keys.has('ShiftRight'),
    sensitivity: settings.sensitivity,
    tiltYaw: tilt.yaw,
    tiltPitch: tilt.pitch,
  };
  lookAccum.x = 0; lookAccum.y = 0;
  oneShot.jump = false; oneShot.reload = false; oneShot.swap = false;
  return input;
}

window.addEventListener('keydown', (e) => {
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  if (game.mode === 'playing') {
    if (e.code === 'Space') oneShot.jump = true;
    if (e.code === 'KeyR') oneShot.reload = true;
    if (e.code === 'Digit1' || e.code === 'Digit2' || e.code === 'KeyQ') oneShot.swap = true;
    if (e.code === 'Escape') pauseRun();
  } else if (game.mode === 'paused' && e.code === 'Escape') {
    resumeRun();
  } else if (game.mode === 'menu' && (e.code === 'Enter' || e.code === 'Space')) {
    startRun();
  }
  keys.add(e.code);
});
window.addEventListener('keyup', (e) => keys.delete(e.code));
window.addEventListener('blur', () => {
  keys.clear();
  touch.fire = false; touch.aim = false; touch.mouseFire = false; touch.mouseAim = false;
  if (game.mode === 'playing' && !isTouch) pauseRun();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && game.mode === 'playing') pauseRun();
});

canvas.addEventListener('contextmenu', (e) => e.preventDefault());
canvas.addEventListener('pointerdown', (e) => {
  if (game.mode !== 'playing') return;
  if (e.pointerType === 'mouse') {
    if (!pointerLocked) {
      canvas.requestPointerLock?.();
      return;
    }
    if (e.button === 0) touch.mouseFire = true;
    if (e.button === 2) touch.mouseAim = true;
    return;
  }
  if (touch.lookId === null) {
    touch.lookId = e.pointerId;
    touch.lastX = e.clientX;
    touch.lastY = e.clientY;
    canvas.setPointerCapture?.(e.pointerId);
  }
});
canvas.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'mouse') {
    if (pointerLocked) {
      lookAccum.x += e.movementX || 0;
      lookAccum.y += e.movementY || 0;
    }
    return;
  }
  if (e.pointerId === touch.lookId) {
    lookAccum.x += e.clientX - touch.lastX;
    lookAccum.y += e.clientY - touch.lastY;
    touch.lastX = e.clientX;
    touch.lastY = e.clientY;
  }
});
function endLook(e) {
  if (e.pointerId === touch.lookId) touch.lookId = null;
}
canvas.addEventListener('pointerup', endLook);
canvas.addEventListener('pointercancel', endLook);
window.addEventListener('pointerup', (e) => {
  if (e.pointerType === 'mouse') {
    if (e.button === 0) touch.mouseFire = false;
    if (e.button === 2) touch.mouseAim = false;
  }
});
window.addEventListener('mousedown', (e) => {
  if (game.mode !== 'playing' || !pointerLocked) return;
  if (e.button === 0) touch.mouseFire = true;
  if (e.button === 2) touch.mouseAim = true;
});
window.addEventListener('mouseup', (e) => {
  if (e.button === 0) touch.mouseFire = false;
  if (e.button === 2) touch.mouseAim = false;
});
document.addEventListener('pointerlockchange', () => {
  pointerLocked = document.pointerLockElement === canvas;
  if (pointerLocked) game.hadLock = true;
  if (!pointerLocked && game.hadLock && game.mode === 'playing' && !isTouch) pauseRun();
});

// joystick
let joyRect = null;
function joyMove(e) {
  if (e.pointerId !== touch.joyId || !joyRect) return;
  const cx = joyRect.left + joyRect.width / 2;
  const cy = joyRect.top + joyRect.height / 2;
  let dx = e.clientX - cx;
  let dy = e.clientY - cy;
  const max = joyRect.width * 0.36;
  const len = Math.hypot(dx, dy);
  if (len > max) { dx = dx / len * max; dy = dy / len * max; }
  touch.joyVec.x = dx / max;
  touch.joyVec.y = -dy / max;
  els.joyThumb.style.transform = `translate(${dx}px, ${dy}px)`;
}
els.joystick.addEventListener('pointerdown', (e) => {
  if (game.mode !== 'playing') return;
  e.preventDefault(); e.stopPropagation();
  touch.joyId = e.pointerId;
  joyRect = els.joystick.getBoundingClientRect();
  els.joystick.setPointerCapture?.(e.pointerId);
  joyMove(e);
});
els.joystick.addEventListener('pointermove', (e) => { e.preventDefault(); joyMove(e); });
function joyEnd(e) {
  if (e.pointerId !== touch.joyId) return;
  touch.joyId = null;
  touch.joyVec.x = 0; touch.joyVec.y = 0;
  els.joyThumb.style.transform = '';
}
els.joystick.addEventListener('pointerup', joyEnd);
els.joystick.addEventListener('pointercancel', joyEnd);

function holdButton(el, onDown, onUp) {
  el.addEventListener('pointerdown', (e) => {
    if (game.mode !== 'playing') return;
    e.preventDefault(); e.stopPropagation();
    el.classList.add('pressed');
    el.setPointerCapture?.(e.pointerId);
    onDown?.();
  });
  const up = (e) => {
    el.classList.remove('pressed');
    onUp?.();
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('pointerleave', up);
}
holdButton(els.fireBtn, () => { touch.fire = true; }, () => { touch.fire = false; });
holdButton(els.aimBtn, () => { touch.aim = true; }, () => { touch.aim = false; });
els.reloadBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); oneShot.reload = true; els.reloadBtn.classList.add('pressed'); });
els.reloadBtn.addEventListener('pointerup', () => els.reloadBtn.classList.remove('pressed'));
els.swapBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); oneShot.swap = true; els.swapBtn.classList.add('pressed'); });
els.swapBtn.addEventListener('pointerup', () => els.swapBtn.classList.remove('pressed'));
els.jumpBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); oneShot.jump = true; els.jumpBtn.classList.add('pressed'); });
els.jumpBtn.addEventListener('pointerup', () => els.jumpBtn.classList.remove('pressed'));

/* --------------------------------------------------------------- UI helpers */
let toastTimer = null;
function showToast(text, ms = 2200) {
  els.toast.textContent = text;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), ms);
}
let hitTimer = null;
function showHitmarker(head) {
  els.hitmarker.classList.remove('go');
  els.hitmarker.classList.toggle('head', !!head);
  void els.hitmarker.offsetWidth;
  els.hitmarker.classList.add('go');
  clearTimeout(hitTimer);
  hitTimer = setTimeout(() => els.hitmarker.classList.remove('go'), 230);
  if (navigator.vibrate) navigator.vibrate(head ? 18 : 8);
}
const projected = new THREE.Vector3();
function spawnDamageNumber(point, head, dmg) {
  if (!point) return;
  projected.copy(point).project(camera);
  if (projected.z > 1) return;
  const x = (projected.x * 0.5 + 0.5) * innerWidth;
  const y = (-projected.y * 0.5 + 0.5) * innerHeight;
  const el = document.createElement('div');
  el.className = `dmg-num${head ? ' head' : ''}`;
  el.textContent = head ? `NA CABEÇA ${Math.round(dmg * 2.2)}` : Math.round(dmg);
  el.style.left = `${x + (Math.random() - 0.5) * 26}px`;
  el.style.top = `${y}px`;
  els.damageNumbers.appendChild(el);
  if (els.damageNumbers.children.length > 22) els.damageNumbers.firstChild.remove();
  setTimeout(() => el.remove(), 700);
}
function feedItem(html) {
  const d = document.createElement('div');
  d.className = 'feed-item';
  d.innerHTML = html;
  return d;
}
function addFeed(html) {
  const d = feedItem(html);
  els.killfeed.prepend(d);
  while (els.killfeed.children.length > 4) els.killfeed.lastChild.remove();
  setTimeout(() => d.remove(), 3400);
}
function updateBeaconUI() {
  const pct = clamp(game.beacon / game.maxBeacon, 0, 1);
  els.beaconBar.style.width = `${pct * 100}%`;
  els.beaconBar.classList.toggle('low', pct < 0.35);
  els.beaconPct.textContent = `${Math.ceil(pct * 100)}%`;
  if (pct < 0.35 && game.mode === 'playing') {
    game.lowWarnT += 1;
    if (game.lowWarnT % 180 === 0) showToast(t('beaconLow'), 2000);
  }
}
function setScore(v) {
  game.score = v;
  els.score.textContent = v.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
}
function updateComboUI() {
  els.combo.textContent = game.combo;
  els.comboBadge.classList.toggle('show', game.combo > 1);
}
function showWaveBanner(n, boss = false) {
  els.waveBig.textContent = String(n).padStart(2, '0');
  els.waveSub.textContent = boss ? t('bossIncoming') : waveName(n);
  els.waveBanner.querySelector('.kicker').textContent = `${t('wave')} ${String(n).padStart(2, '0')}`;
  els.waveBanner.classList.add('show');
  clearTimeout(showWaveBanner.timer);
  showWaveBanner.timer = setTimeout(() => els.waveBanner.classList.remove('show'), 2600);
}

/* ----------------------------------------------------------------- waves */
function startWave(n) {
  game.wave = n;
  game.waveActive = true;
  game.spawnQueue = [];
  const bossWave = n % 4 === 0;
  showWaveBanner(n, bossWave);
  audio.wave(n);
  if (bossWave) setTimeout(() => audio.boss(), 600);

  const groundCount = Math.min(18, 3 + n * 2);
  const flyerCount = n >= 2 ? Math.min(6, Math.floor(n / 2)) : 0;
  const pts = [...world.spawnPoints.ground].sort(() => Math.random() - 0.5);
  const airPts = [...world.spawnPoints.air].sort(() => Math.random() - 0.5);
  const base = game.time + 0.8;
  for (let i = 0; i < groundCount; i++) {
    game.spawnQueue.push({
      t: base + i * 0.52,
      type: 'boneco',
      pos: pts[i % pts.length].clone().add(new THREE.Vector3((Math.random() - 0.5) * 1.2, 0, (Math.random() - 0.5) * 1.2)),
    });
  }
  for (let i = 0; i < flyerCount; i++) {
    game.spawnQueue.push({
      t: base + 1.2 + i * 0.9,
      type: 'mascara',
      pos: airPts[i % airPts.length].clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, Math.random(), (Math.random() - 0.5) * 2)),
    });
  }
  if (bossWave) {
    game.spawnQueue.push({ t: game.time + 2.4, type: 'boss', pos: new THREE.Vector3(0, 4.2, -15.5) });
  }
}

function processSpawns() {
  for (let i = game.spawnQueue.length - 1; i >= 0; i--) {
    const s = game.spawnQueue[i];
    if (game.time >= s.t) {
      const e = enemies.spawn(s.type, game.wave, s.pos);
      if (s.type === 'boss') {
        game.boss = e;
        els.bossWrap.classList.remove('hidden');
        els.bossBar.style.width = '100%';
        showToast(t('bossIncoming'), 2600);
        audio.boss();
      }
      game.spawnQueue.splice(i, 1);
    }
  }
}

function completeWave() {
  game.waveActive = false;
  const bonus = 200 + game.wave * 120;
  setScore(game.score + bonus);
  showToast(`${t('waveClear')}  +${bonus}`, 2200);
  audio.ui(true);
  player.addHealth(16);
  game.nextWaveAt = game.time + 4.4;
  spawnPickup();
  addFeed(`<b>${t('waveClear')}</b> · ${t('wave')} ${String(game.wave).padStart(2, '0')}`);
}

function registerKill(enemy, head) {
  const base = enemy.type === 'boss' ? 3000 : enemy.type === 'mascara' ? 160 : 100;
  const gain = Math.round(base * game.combo * (head ? 1.5 : 1));
  setScore(game.score + gain);
  game.kills++;
  if (head) game.headshots++;
  game.combo = Math.min(9, game.combo + (head ? 2 : 1));
  game.bestCombo = Math.max(game.bestCombo, game.combo);
  game.comboTimer = 4;
  updateComboUI();
  const who = enemy.type === 'boss' ? t('feedBoss') : enemy.type === 'mascara' ? t('feedMask') : t('feedBoneco');
  addFeed(`<b>${who}</b> ${head ? '· ' + t('feedHead') : ''} <b style="color:var(--sun)">+${gain}</b>`);
  if (enemy.type === 'boss') {
    game.boss = null;
    els.bossWrap.classList.add('hidden');
    showToast(t('bossDown'), 3200);
    audio.bossDeath?.();
    effects.confettiBurst(new THREE.Vector3(0, 4, -10), [0xffd24a, 0xff4f9a, 0x1fd1b2, 0xfff3d6], 80, 8);
    setScore(game.score + 1500);
  }
  if (navigator.vibrate) navigator.vibrate(enemy.type === 'boss' ? 80 : 20);
}

function spawnPickup() {
  if (game.pickups.length >= 2) return;
  const spots = [new THREE.Vector3(0, 0, 5.2), new THREE.Vector3(-11.4, 0, 9.6), new THREE.Vector3(11.2, 0, 6.8), new THREE.Vector3(-9.6, 0, -5.2)];
  const spot = spots[(Math.random() * spots.length) | 0];
  const g = new THREE.Group();
  g.position.copy(spot);
  const bowl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.22, 0.26, 16, 1, true),
    new THREE.MeshStandardMaterial({ color: 0xf3e6cf, roughness: 0.7, side: THREE.DoubleSide })
  );
  bowl.position.y = 0.3;
  const acai = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), new THREE.MeshStandardMaterial({ color: 0x4a1a5e, roughness: 0.55, emissive: 0x2a0a3a, emissiveIntensity: 0.5 }));
  acai.position.y = 0.39;
  acai.scale.y = 0.55;
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: effects.glowTex, color: 0xff6ad5, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0.55,
  }));
  glow.position.y = 0.5;
  glow.scale.setScalar(2.2);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 0.62, 28),
    new THREE.MeshBasicMaterial({ color: 0xff6ad5, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.03;
  g.add(bowl, acai, glow, ring);
  g.userData = { t: Math.random() * 5, ring };
  game.pickupGroup.add(g);
  game.pickups.push(g);
  effects.shockwave(spot.clone().setY(0.02), 0xff6ad5, 2.6, 0.7);
}

function updatePickups(dt, time) {
  for (let i = game.pickups.length - 1; i >= 0; i--) {
    const p = game.pickups[i];
    p.rotation.y += dt * 1.2;
    p.position.y = Math.sin(time * 2 + p.userData.t) * 0.08;
    p.userData.ring.scale.setScalar(1 + Math.sin(time * 2.5 + p.userData.t) * 0.08);
    const d = p.position.distanceTo(player.position.clone().setY(0));
    if (d < 1.5 && player.health < player.maxHealth) {
      player.addHealth(30);
      audio.pickup();
      effects.confettiBurst(p.position.clone().setY(0.6), [0x4a1a5e, 0xff6ad5, 0xffd24a], 24, 3);
      showToast(t('pickup'), 1800);
      game.pickupGroup.remove(p);
      game.pickups.splice(i, 1);
    }
  }
}

function clearPickups() {
  for (const p of game.pickups) game.pickupGroup.remove(p);
  game.pickups.length = 0;
}

/* ----------------------------------------------------------------- run flow */
function resetRun() {
  game.time = 0;
  game.score = 0;
  game.wave = 0;
  game.waveActive = false;
  game.nextWaveAt = 1.3;
  game.spawnQueue = [];
  game.combo = 1;
  game.comboTimer = 0;
  game.bestCombo = 1;
  game.beacon = game.maxBeacon;
  game.kills = 0;
  game.headshots = 0;
  game.shots = 0;
  game.hits = 0;
  game.boss = null;
  game.capyDone = false;
  game.runTime = 0;
  game.deathCause = 'player';
  enemies.clear();
  clearPickups();
  player.reset();
  setScore(0);
  updateComboUI();
  updateBeaconUI();
  els.bossWrap.classList.add('hidden');
  els.killfeed.innerHTML = '';
  els.damageNumbers.innerHTML = '';
  els.waveBanner.classList.remove('show');
  els.healthBar.style.width = '100%';
  els.healthPct.textContent = '100';
  els.lowHealth.classList.add('hidden');
  els.damageFlash.style.opacity = '0';
}

function startRun() {
  if (game.mode === 'playing') return;
  initAudio();
  const app = $('#app');
  if (app) { app.scrollTop = 0; app.scrollLeft = 0; }
  resetRun();
  game.mode = 'playing';
  els.menu.classList.add('hidden');
  els.pause.classList.add('hidden');
  els.gameover.classList.add('hidden');
  els.hud.classList.remove('hidden');
  els.flash.classList.remove('go');
  void els.flash.offsetWidth;
  els.flash.classList.add('go');
  audio.setMusic(settings.music);
  audio.ui(true);
  if (!isTouch) {
    canvas.requestPointerLock?.();
  }
  showToast(lang === 'pt' ? 'PROTEJA O FAROL. A LAJE É SUA.' : 'PROTECT THE BEACON. THE ROOFTOP IS YOURS.', 2600);
  if (innerHeight > innerWidth && isTouch) setTimeout(() => showToast(t('portrait'), 3000), 2800);
}

function pauseRun() {
  if (game.mode !== 'playing') return;
  game.mode = 'paused';
  els.pause.classList.remove('hidden');
  els.pauseWave.textContent = `${t('wave')} ${String(game.wave).padStart(2, '0')}`;
  els.pauseScore.textContent = game.score.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
  els.pauseKills.textContent = game.kills;
  els.pauseAcc.textContent = `${accuracy()}%`;
  els.sensRange.value = settings.sensitivity;
  els.sensOut.textContent = Number(settings.sensitivity).toFixed(1);
  if (document.pointerLockElement) document.exitPointerLock?.();
  touch.fire = false; touch.aim = false; touch.mouseFire = false; touch.mouseAim = false;
  audio.setMusic(false);
  audio.ui(false);
}

function resumeRun() {
  if (game.mode !== 'paused') return;
  game.mode = 'playing';
  els.pause.classList.add('hidden');
  audio.setMusic(settings.music);
  audio.ui(true);
  if (!isTouch) canvas.requestPointerLock?.();
}

function quitToMenu() {
  game.mode = 'menu';
  els.pause.classList.add('hidden');
  els.gameover.classList.add('hidden');
  els.hud.classList.add('hidden');
  els.menu.classList.remove('hidden');
  enemies.clear();
  clearPickups();
  player.reset();
  if (document.pointerLockElement) document.exitPointerLock?.();
  audio.setMusic(false);
  game.mode = 'menu';
}

function accuracy() {
  return game.shots > 0 ? Math.round((game.hits / game.shots) * 100) : 0;
}

function endRun(cause) {
  if (game.mode !== 'playing') return;
  game.mode = 'gameover';
  game.deathCause = cause;
  if (document.pointerLockElement) document.exitPointerLock?.();
  touch.fire = false; touch.aim = false; touch.mouseFire = false; touch.mouseAim = false;
  audio.setMusic(false);
  const isBeacon = cause === 'beacon';
  els.overTitle.textContent = isBeacon ? t('gameOverBeacon') : t('gameOverPlayer');
  els.overDesc.textContent = isBeacon ? t('gameOverDescBeacon') : t('gameOverDesc');
  els.overWave.textContent = `${t('wave')} ${String(game.wave).padStart(2, '0')}`;
  els.overScore.textContent = game.score.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
  els.overKills.textContent = game.kills;
  els.overAcc.textContent = `${accuracy()}%`;
  els.overWaves.textContent = Math.max(0, game.wave - (game.waveActive ? 1 : 0));
  els.overHeads.textContent = game.headshots;
  els.overCombo.textContent = `x${game.bestCombo}`;
  const rank = rankFor(game.score);
  els.rankMedal.textContent = ['I', 'II', 'III', 'IV', 'V'][rank];
  els.rankName.textContent = t(`rank${rank}`);
  els.rankDesc.textContent = t(`rank${rank}d`);
  els.gameover.classList.remove('hidden');
  els.gameover.classList.toggle('win', false);
  els.hud.classList.add('hidden');
  if (game.score > bestScore) {
    bestScore = game.score;
    saveStore();
    els.bestScore.textContent = bestScore.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
    showToast(t('newBest'), 3000);
  }
  if (navigator.vibrate) navigator.vibrate([60, 40, 120]);
}

function rankFor(score) {
  if (score >= 30000) return 4;
  if (score >= 15000) return 3;
  if (score >= 7000) return 2;
  if (score >= 2500) return 1;
  return 0;
}

/* ------------------------------------------------------------------ loop */
let lastTime = performance.now() / 1000;
let absTime = 0;

function updateGame(dt, time) {
  game.time += dt;
  game.runTime += dt;
  game.shots = player.stats.shots;
  game.hits = player.stats.hits;

  processSpawns();
  const input = buildInput(dt);
  player.update(dt, input);
  if (game.mode !== 'playing') return;
  enemies.update(dt, time, { player, beacon: world.beacon });
  if (game.mode !== 'playing') return;

  // wave completion
  if (game.waveActive && game.spawnQueue.length === 0 && enemies.aliveCount === 0) completeWave();
  if (!game.waveActive && game.time >= game.nextWaveAt && game.mode === 'playing') {
    startWave(game.wave + 1);
  }

  updatePickups(dt, time);
  updateComboUI();

  if (game.comboTimer > 0) {
    game.comboTimer -= dt;
    if (game.comboTimer <= 0) {
      game.combo = 1;
      updateComboUI();
    }
  }

  // crosshair
  const spread = 4 + player.spread * 230 + player.moveAmount * 5 + (player.sprinting ? 5 : 0);
  els.crosshair.style.setProperty('--spread', `${spread.toFixed(1)}px`);

  // low health
  els.lowHealth.classList.toggle('hidden', player.health >= 30 || !player.alive);

  // beacon low warning timer
  if (game.beacon / game.maxBeacon < 0.35) game.lowWarnT += dt;

  // ammo pulse
  game.hudT += dt;
  if (game.hudT > 0.25) {
    game.hudT = 0;
    const w = player.weapon;
    const low = player.ammo[player.current] <= Math.ceil(w.mag * 0.25);
    els.ammo.classList.toggle('low', low);
    els.ammoMax.textContent = player.reloading ? t('reload') : `/ ${w.mag}`;
    els.beaconBar.classList.toggle('low', game.beacon / game.maxBeacon < 0.35);
  }

  if (game.beacon <= 0) endRun('beacon');
}

function loop(now) {
  requestAnimationFrame(loop);
  const time = now / 1000;
  let dt = time - lastTime;
  lastTime = time;
  if (!(dt > 0)) dt = 0.016;
  dt = Math.min(dt, 0.05);
  absTime += dt;

  if (world) for (const fn of world.animations) fn(absTime, dt);

  if (game.mode === 'menu') {
    updateMenuCamera(absTime);
    effects?.update(dt);
  } else if (game.mode === 'playing') {
    updateGame(dt, absTime);
    effects?.update(dt);
  } else if (game.mode === 'gameover') {
    effects?.update(dt * 0.5);
  }

  renderer.render(scene, camera);
  if (player && (game.mode === 'playing' || game.mode === 'paused' || game.mode === 'gameover')) {
    player.render();
  }

  // adaptive quality
  game.fpsAccum += dt;
  game.fpsFrames++;
  if (game.fpsAccum > 2.5) {
    const avg = game.fpsAccum / game.fpsFrames;
    if (avg > 0.023 && renderer.getPixelRatio() > 1.01) {
      renderer.setPixelRatio(Math.max(1, renderer.getPixelRatio() - 0.15));
      renderer.setSize(innerWidth, innerHeight);
    } else if (avg < 0.014 && renderer.getPixelRatio() < (isMobile ? 1.5 : 2)) {
      renderer.setPixelRatio(Math.min(isMobile ? 1.5 : 2, renderer.getPixelRatio() + 0.1));
      renderer.setSize(innerWidth, innerHeight);
    }
    game.fpsAccum = 0;
    game.fpsFrames = 0;
  }
}

/* ------------------------------------------------------------------ events */
els.playBtn.addEventListener('click', () => { initAudio(); audio.ui(true); startRun(); });
els.tiltBtn.addEventListener('click', () => { initAudio(); toggleTilt(); });
els.pauseBtn.addEventListener('click', () => pauseRun());
els.resumeBtn.addEventListener('click', () => { initAudio(); resumeRun(); });
els.restartBtn.addEventListener('click', () => { initAudio(); startRun(); });
els.quitBtn.addEventListener('click', () => { audio.ui(false); quitToMenu(); });
els.againBtn.addEventListener('click', () => { initAudio(); startRun(); });
els.menuBtn.addEventListener('click', () => { audio.ui(false); quitToMenu(); });
els.langBtn.addEventListener('click', () => { lang = lang === 'pt' ? 'en' : 'pt'; saveStore(); applyLanguage(); audio?.ui(true); });
els.langToggle.addEventListener('click', () => { lang = lang === 'pt' ? 'en' : 'pt'; saveStore(); applyLanguage(); audio?.ui(true); });
els.soundBtn.addEventListener('click', () => {
  settings.sound = !settings.sound;
  saveStore(); initAudio(); applySettings(); audio?.ui(true);
});
els.musicToggle.addEventListener('click', () => {
  settings.music = !settings.music;
  saveStore(); initAudio(); applySettings(); audio?.ui(settings.music);
});
els.sfxToggle.addEventListener('click', () => {
  settings.sound = !settings.sound;
  saveStore(); initAudio(); applySettings(); audio?.ui(settings.sound);
});
els.tiltToggle.addEventListener('click', () => { initAudio(); toggleTilt(); });
els.sensRange.addEventListener('input', () => {
  settings.sensitivity = Number(els.sensRange.value);
  els.sensOut.textContent = settings.sensitivity.toFixed(1);
  saveStore();
});
els.fsBtn.addEventListener('click', async () => {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  } catch {}
});
els.tiltBadge.addEventListener('click', () => { if (tiltState.enabled) calibrateTilt(); });

window.addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  if (player) {
    player.wmCamera.aspect = camera.aspect;
    player.wmCamera.updateProjectionMatrix();
  }
});
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    if (tiltState.enabled) {
      tiltState.neutralBeta = tiltState.beta;
      tiltState.neutralGamma = tiltState.gamma;
    }
  }, 250);
});

applyLanguage();
els.bestScore.textContent = bestScore.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
boot().catch((err) => {
  console.error(err);
  els.loadLabel.textContent = lang === 'pt' ? 'ERRO AO CARREGAR A LAJE. RECARREGUE.' : 'FAILED TO LOAD THE ROOFTOP. RELOAD.';
});
