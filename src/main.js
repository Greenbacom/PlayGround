import * as THREE from 'three';
import { World } from './world.js';
import { Effects } from './effects.js';
import { GameAudio } from './audio.js';
import { WeaponRig, WEAPONS } from './weapons.js';
import { EnemyManager } from './entities.js';
import { Input } from './input.js';
import { clamp, damp, lerp, rand, chance, formatNumber, formatTime } from './utils.js';

// ---------------------------------------------------------------------------
// Renderer, scene, camera
// ---------------------------------------------------------------------------
const canvas = document.getElementById('game');
const isTouch = (navigator.maxTouchPoints || 0) > 0 || 'ontouchstart' in window;
function updateHandheldClass() {
  document.body.classList.toggle('touch', isTouch || innerWidth <= 900 || matchMedia('(pointer: coarse)').matches);
}
updateHandheldClass();
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
  alpha: false,
  stencil: false,
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.05, 520);
camera.rotation.order = 'YXZ';
camera.position.set(0, 6.8, 23);

const world = new World(renderer);
const scene = world.scene;
scene.add(camera);

const effects = new Effects(scene);
const audio = new GameAudio();
const weaponRig = new WeaponRig(camera, scene);

// ---------------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------------
const WAVE_LABELS = {
  1: 'SACI PERERÊ À VISTA',
  2: 'O CURUPIRA ACORDOU',
  3: 'BOITATÁ NO CÉU',
  4: 'A MATA FECHOU',
  5: 'MULA SEM CABEÇA',
  6: 'O FOGO SE ESPALHA',
  7: 'CURUPIRAS EM FUGA',
  8: 'A NOITE APERTA',
  9: 'ÚLTIMA TRINCHEIRA',
  10: 'CUCA, A BRUXA JACARÉ',
};

const state = {
  mode: 'menu',
  wave: 1,
  score: 0,
  kills: 0,
  multiplier: 1,
  comboTimer: 0,
  health: 100,
  maxHealth: 100,
  ammo: [30, 6, 45],
  currentWeapon: 0,
  fireTimer: 0,
  reloadTimer: 0,
  reloadDuration: 0,
  grenades: 2,
  grenadeCooldown: 0,
  shotsFired: 0,
  shotsHit: 0,
  playTime: 0,
  timeSinceDamage: 0,
  invuln: 0,
  recoilPitch: 0,
  recoilYaw: 0,
  shake: 0,
  waveActive: false,
  spawnQueue: [],
  spawnTimer: 0,
  maxAlive: 8,
  intermission: 0,
  pendingVictory: false,
  victoryTimer: 0,
  victoryDawn: 0,
  soundOn: true,
  qualityHigh: true,
  grenadesLive: [],
  bannerTimer: null,
  hitmarkerTimer: null,
  vignetteTimer: null,
  best: 0,
  rotateShown: false,
  startedOnce: false,
  lastWaveLabel: '',
};

const player = {
  pos: new THREE.Vector3(0, 0, 14),
  yaw: 0,
  pitch: -0.035,
  eye: 1.68,
  radius: 0.42,
  jumpY: 0,
  velY: 0,
  grounded: true,
  stepAccum: 0,
  bobPhase: 0,
  bob: 0,
};

try {
  state.best = Number(localStorage.getItem('folclore_best') || 0) || 0;
  state.soundOn = localStorage.getItem('folclore_sound') !== '0';
  state.qualityHigh = localStorage.getItem('folclore_quality') !== '0';
} catch { /* private mode */ }

let manager = null;

// ---------------------------------------------------------------------------
// DOM
// ---------------------------------------------------------------------------
const $ = (id) => document.getElementById(id);
const dom = {
  hud: $('hud'), menu: $('menu'), pause: $('pause'), gameover: $('gameover'), victory: $('victory'),
  loading: $('loading'), rotateHint: $('rotateHint'),
  healthFill: $('healthFill'), healthText: $('healthText'), waveNum: $('waveNum'), waveName: $('waveName'),
  score: $('score'), combo: $('combo'), dawnFill: $('dawnFill'), ammoMag: $('ammoMag'), ammoBox: document.querySelector('.ammo'),
  weaponName: $('weaponName'), weaponSlot: $('weaponSlot'), grenadeCount: $('grenadeCount'),
  bossBar: $('bossBar'), bossName: $('bossName'), bossHpText: $('bossHpText'), bossFill: $('bossFill'),
  banner: $('waveBanner'), bannerKicker: $('bannerKicker'), bannerTitle: $('bannerTitle'), bannerSub: $('bannerSub'),
  combatToast: $('combatToast'), crosshair: $('crosshair'), hitmarker: document.querySelector('.hitmarker'),
  damage: $('damageVignette'), flash: $('flash'), lowHealth: $('lowHealth'),
  tiltBadge: $('tiltBadge'), menuBest: $('menuBest'),
  pauseWave: $('pauseWave'), pauseScore: $('pauseScore'), pauseKills: $('pauseKills'),
  overScore: $('overScore'), overBest: $('overBest'), overWave: $('overWave'), overKills: $('overKills'), overTime: $('overTime'),
  winScore: $('winScore'), winBest: $('winBest'), winKills: $('winKills'), winTime: $('winTime'), winAccuracy: $('winAccuracy'),
  objectiveText: $('objectiveText'),
};

const setText = (el, text) => { if (el && el.textContent !== text) el.textContent = text; };

// ---------------------------------------------------------------------------
// Audio + settings
// ---------------------------------------------------------------------------
function applyQuality(high, initial = false) {
  state.qualityHigh = high;
  const dpr = Math.min(window.devicePixelRatio || 1, high ? (isTouch ? 1.5 : 1.75) : 1);
  renderer.setPixelRatio(dpr);
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.shadowMap.enabled = high;
  if (world.sun) world.sun.castShadow = high;
  if (!initial) {
    scene.traverse((o) => {
      if (!o.material) return;
      const materials = Array.isArray(o.material) ? o.material : [o.material];
      materials.forEach((m) => { m.needsUpdate = true; });
    });
  }
  try { localStorage.setItem('folclore_quality', high ? '1' : '0'); } catch { /* noop */ }
  document.querySelectorAll('[data-setting="quality"]').forEach((btn) => setButtonLabel(btn, high ? 'VISUAL ALTO' : 'VISUAL LEVE'));
}

function setButtonLabel(btn, text) {
  const span = btn.querySelector('span');
  if (span) span.textContent = text;
  else btn.textContent = text;
}

function refreshSoundUI() {
  document.querySelectorAll('[data-setting="sound"]').forEach((btn) => {
    setButtonLabel(btn, state.soundOn ? 'SOM LIGADO' : 'SOM MUDO');
    btn.setAttribute('aria-pressed', String(state.soundOn));
  });
}

function toggleSound() {
  state.soundOn = !state.soundOn;
  audio.init().then(() => {
    audio.setEnabled(state.soundOn);
    audio.ui();
  });
  if (!state.soundOn) audio.setEnabled(false);
  try { localStorage.setItem('folclore_sound', state.soundOn ? '1' : '0'); } catch { /* noop */ }
  refreshSoundUI();
}

function refreshTiltUI() {
  document.querySelectorAll('.tilt-toggle').forEach((btn) => {
    setButtonLabel(btn, input.tiltEnabled ? 'TILT LIGADO' : 'TILT DESLIGADO');
    btn.setAttribute('aria-pressed', String(input.tiltEnabled));
  });
}

async function toggleTilt() {
  if (input.tiltEnabled) {
    input.disableTilt();
    refreshTiltUI();
    if (state.mode === 'playing' || state.mode === 'paused') showToast('TILT DESLIGADO');
    return;
  }
  const buttons = [...document.querySelectorAll('.tilt-toggle')];
  buttons.forEach((b) => setButtonLabel(b, 'PEDINDO PERMISSÃO…'));
  const result = await input.enableTilt();
  if (result.ok) {
    refreshTiltUI();
    audio.init();
    audio.ui();
    input.calibrateTilt();
    if (state.mode === 'playing' || state.mode === 'paused') showToast('TILT ATIVO — INCLINE PARA MIRAR');
    if (isTouch) {
      setTimeout(() => {
        if (input.tiltEnabled && !input.hasTiltData) showToast('SEM SENSOR? O TOQUE CONTINUA VALENDO');
      }, 1800);
    }
  } else {
    const label = result.reason === 'denied' ? 'TILT NEGADO' : 'TILT INDISPONÍVEL';
    buttons.forEach((b) => setButtonLabel(b, label));
    setTimeout(refreshTiltUI, 2600);
  }
}

function applySettings() {
  refreshSoundUI();
  refreshTiltUI();
  applyQuality(state.qualityHigh, true);
  dom.menuBest.textContent = formatNumber(state.best);
  audio.setEnabled(state.soundOn);
}

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------
function setHudVisible(visible) {
  if (visible) {
    dom.hud.classList.remove('is-hidden');
    requestAnimationFrame(() => dom.hud.classList.add('visible'));
  } else {
    dom.hud.classList.remove('visible');
    setTimeout(() => { if (!dom.hud.classList.contains('visible')) dom.hud.classList.add('is-hidden'); }, 380);
  }
}

function hideAllOverlays() {
  dom.menu.classList.add('is-hidden');
  dom.pause.classList.add('is-hidden');
  dom.gameover.classList.add('is-hidden');
  dom.victory.classList.add('is-hidden');
  dom.rotateHint.classList.add('is-hidden');
}

function showBanner(kicker, title, sub, duration = 2400) {
  clearTimeout(state.bannerTimer);
  setText(dom.bannerKicker, kicker);
  setText(dom.bannerTitle, title);
  setText(dom.bannerSub, sub);
  dom.banner.classList.remove('show');
  void dom.banner.offsetWidth;
  dom.banner.classList.add('show');
  state.bannerTimer = setTimeout(() => dom.banner.classList.remove('show'), duration);
}

let toastTimer = null;
function showToast(text) {
  setText(dom.combatToast, text);
  dom.combatToast.classList.remove('pop');
  void dom.combatToast.offsetWidth;
  dom.combatToast.classList.add('pop');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dom.combatToast.classList.remove('pop'), 1150);
}

function hitMarker(kill = false) {
  dom.hitmarker.classList.remove('show', 'kill');
  void dom.hitmarker.offsetWidth;
  dom.hitmarker.classList.add('show');
  if (kill) dom.hitmarker.classList.add('kill');
  clearTimeout(state.hitmarkerTimer);
  state.hitmarkerTimer = setTimeout(() => dom.hitmarker.classList.remove('show', 'kill'), 190);
}

let crosshairTimer = null;
function kickCrosshair() {
  dom.crosshair.classList.add('kick');
  clearTimeout(crosshairTimer);
  crosshairTimer = setTimeout(() => dom.crosshair.classList.remove('kick'), 75);
}

function damageVignette() {
  dom.damage.classList.add('hit');
  clearTimeout(state.vignetteTimer);
  state.vignetteTimer = setTimeout(() => dom.damage.classList.remove('hit'), 120);
}

function screenFlash() {
  dom.flash.classList.remove('go');
  void dom.flash.offsetWidth;
  dom.flash.classList.add('go');
}

function vibrate(pattern) {
  try { navigator.vibrate?.(pattern); } catch { /* noop */ }
}

// ---------------------------------------------------------------------------
// Enemy manager
// ---------------------------------------------------------------------------
manager = new EnemyManager(world, effects, audio, {
  getPlayerPos: () => player.pos,
  onPlayerHit: (damage, source) => damagePlayer(damage, source),
  onKill: (enemy) => handleKill(enemy),
  onHit: (enemy, headshot, killed, dmg) => handleHit(enemy, headshot, killed, dmg),
  onBossSpawn: (boss) => handleBossSpawn(boss),
  onBossHp: (fraction) => {
    if (dom.bossBar.classList.contains('is-hidden')) return;
    dom.bossFill.style.width = `${(fraction * 100).toFixed(1)}%`;
    setText(dom.bossHpText, `${Math.ceil(fraction * 100)}%`);
  },
  onBossDead: (boss) => handleBossDead(boss),
  onBossSummon: () => showToast('A CUCA CHAMOU O SACI!'),
  onPickup: (type) => handlePickup(type),
});
manager.setWave(1);

function handleHit(enemy, headshot, killed) {
  hitMarker(killed);
  if (headshot) {
    audio.hit(true);
    if (!killed) showToast('TIRO NA CABEÇA!');
  }
}

function handleKill(enemy) {
  state.kills++;
  if (state.comboTimer > 0) state.multiplier = Math.min(5, state.multiplier + 1);
  else state.multiplier = 1;
  state.comboTimer = 3.6;
  const points = Math.round(enemy.cfg.score * state.multiplier);
  state.score += points;

  if (enemy.boss) {
    showToast(`${enemy.cfg.name} +${formatNumber(points)}`);
    for (let i = 0; i < 2; i++) {
      manager.spawnPickup(new THREE.Vector3(enemy.pos.x + rand(2.5, -2.5), 0, enemy.pos.z + rand(2.5, -2.5)), 'heal');
    }
    manager.spawnPickup(new THREE.Vector3(enemy.pos.x + rand(2, -2), 0, enemy.pos.z + rand(2, -2)), 'grenade');
  } else {
    showToast(`${enemy.cfg.name} ABATIDO +${formatNumber(points)}`);
    if (chance(0.16)) manager.spawnPickup(enemy.pos, 'heal');
    else if (chance(0.08)) manager.spawnPickup(enemy.pos, 'grenade');
  }
}

function handleBossSpawn(boss) {
  setText(dom.bossName, boss.cfg.name);
  dom.bossBar.classList.remove('is-hidden');
  dom.bossFill.style.width = '100%';
  setText(dom.bossHpText, '100%');
  audio.bossRoar();
  vibrate([40, 60, 80]);
  if (boss.type === 'cuca') {
    showBanner('ONDA 10 — CHEFE FINAL', 'CUCA', 'A BRUXA JACARÉ DESPERTOU', 3200);
  } else if (boss.type === 'mula') {
    showBanner('ONDA 05 — CHEFE', 'CHEFE', 'MULA SEM CABEÇA', 3000);
  }
}

function handleBossDead(boss) {
  if (boss.type === 'cuca') {
    state.pendingVictory = true;
    state.victoryTimer = 3.2;
    showBanner('O GALO CANTOU', 'CUCA CAIU', 'O SOL ESTÁ CHEGANDO', 3000);
    audio.victory();
  } else {
    showToast('MULA SEM CABEÇA DERROTADA!');
    dom.bossBar.classList.add('is-hidden');
  }
}

function damagePlayer(amount, source) {
  if (state.mode !== 'playing' || state.invuln > 0) return;
  state.health = Math.max(0, state.health - amount);
  state.invuln = 0.32;
  state.timeSinceDamage = 0;
  state.shake = Math.max(state.shake, 0.35);
  damageVignette();
  audio.hurt();
  vibrate(45);
  if (source) {
    state.recoilYaw += rand(0.02, -0.02);
  }
  if (state.health <= 0) endRun(false);
}

function handlePickup(type) {
  if (type === 'heal') {
    state.health = Math.min(state.maxHealth, state.health + 28);
    showToast('AÇAÍ! +28 DE VIDA');
    audio.pickup('heal');
    effects.heal(player.pos.x, 1.0, player.pos.z);
  } else {
    state.grenades = Math.min(4, state.grenades + 1);
    showToast('FOGUETE DE SÃO JOÃO +1');
    audio.pickup('grenade');
  }
  updateHudStatic();
}

// ---------------------------------------------------------------------------
// Run flow
// ---------------------------------------------------------------------------
function startRun() {
  audio.init();
  audio.setEnabled(state.soundOn);
  manager.clear();
  clearGrenades();
  hideAllOverlays();
  setHudVisible(true);
  state.mode = 'playing';
  document.body.classList.add('in-game');
  input.setMode('playing');

  state.wave = 0;
  state.score = 0;
  state.kills = 0;
  state.multiplier = 1;
  state.comboTimer = 0;
  state.health = state.maxHealth;
  state.ammo = [WEAPONS[0].mag, WEAPONS[1].mag, WEAPONS[2].mag];
  state.currentWeapon = 0;
  state.fireTimer = 0;
  state.reloadTimer = 0;
  state.grenades = 2;
  state.grenadeCooldown = 0;
  state.shotsFired = 0;
  state.shotsHit = 0;
  state.playTime = 0;
  state.timeSinceDamage = 0;
  state.invuln = 0;
  state.recoilPitch = 0;
  state.recoilYaw = 0;
  state.shake = 0;
  state.waveActive = false;
  state.spawnQueue = [];
  state.spawnTimer = 0;
  state.intermission = 0;
  state.pendingVictory = false;
  state.victoryTimer = 0;
  state.victoryDawn = 0;
  state.rotateShown = false;
  state.startedOnce = true;

  player.pos.set(0, 0, 14);
  player.yaw = 0;
  player.pitch = -0.035;
  player.jumpY = 0;
  player.velY = 0;
  player.grounded = true;
  player.bobPhase = 0;
  player.bob = 0;
  camera.position.set(0, player.eye, 14);
  camera.rotation.set(player.pitch, player.yaw, 0);

  weaponRig.root.visible = true;
  weaponRig.setWeapon(0, true);
  weaponRig.cancelReload();
  weaponRig.recoil = 0;
  world.setDawn(0);
  dom.bossBar.classList.add('is-hidden');
  dom.lowHealth.classList.remove('on');
  dom.rotateHint.classList.add('is-hidden');
  updateHudStatic();
  startWave(1);

  if (isTouch && innerHeight > innerWidth && !state.rotateShown) {
    state.rotateShown = true;
    setTimeout(() => {
      if (state.mode === 'playing' && innerHeight > innerWidth) {
        dom.rotateHint.classList.remove('is-hidden');
        setTimeout(() => dom.rotateHint.classList.add('is-hidden'), 4800);
      }
    }, 2200);
  }
}

function startWave(n) {
  state.wave = n;
  manager.setWave(n);
  state.waveActive = true;
  state.spawnTimer = 0.1;
  state.intermission = 0;
  state.maxAlive = Math.min(12, 6 + Math.ceil(n * 0.7));
  state.spawnQueue = [];

  if (n === 5) {
    state.spawnQueue = ['mula', 'saci', 'boitata', 'saci', 'curupira', 'saci'];
    state.maxAlive = 8;
  } else if (n === 10) {
    state.spawnQueue = ['cuca', 'curupira', 'saci', 'boitata', 'saci', 'curupira', 'saci', 'boitata'];
    state.maxAlive = 9;
  } else {
    const count = 4 + n * 2;
    for (let i = 0; i < count; i++) {
      let type = 'saci';
      const roll = Math.random();
      if (n >= 4) {
        if (roll < 0.34) type = 'curupira';
        else if (roll < 0.56) type = 'boitata';
      } else if (n === 3) {
        if (roll < 0.24) type = 'curupira';
        else if (roll < 0.48) type = 'boitata';
      } else if (n === 2) {
        if (roll < 0.26) type = 'curupira';
      }
      state.spawnQueue.push(type);
    }
    state.maxAlive = Math.min(11, 6 + Math.ceil(n * 0.75));
  }

  if (n === 5) showBanner('ONDA 05 — CHEFE', 'CHEFE', 'MULA SEM CABEÇA', 3000);
  else if (n === 10) showBanner('ONDA 10 — CHEFE FINAL', 'CUCA', 'A BRUXA JACARÉ DESPERTOU', 3200);
  else showBanner(n === 1 ? 'A NOITE COMEÇOU' : `ONDA ${String(n).padStart(2, '0')}`, `ONDA ${n}`, WAVE_LABELS[n] || 'A VILA RESISTE', 2300);

  audio.waveStart(n);
  if (n === 3) {
    setTimeout(() => { if (state.mode === 'playing') showToast('METRALHADORA DE AÇAÍ LIBERADA — ARMA 3'); }, 900);
  }
  updateHudStatic();
}

function completeWave() {
  if (!state.waveActive) return;
  state.waveActive = false;
  const bonus = 200 + state.wave * 120;
  state.score += bonus;
  state.health = Math.min(state.maxHealth, state.health + 14);
  state.grenades = Math.min(4, state.grenades + 1);
  state.ammo = WEAPONS.map((w) => w.mag);
  state.reloadTimer = 0;
  weaponRig.cancelReload();
  audio.pickup('heal');
  showToast(`ONDA ${state.wave} LIMPA +${formatNumber(bonus)} · VIDA +14`);
  state.intermission = 6.5;
  dom.bossBar.classList.add('is-hidden');
  updateHudStatic();
}

function endRun(victory) {
  if (state.mode === 'gameover' || state.mode === 'victory') return;
  state.mode = victory ? 'victory' : 'gameover';
  input.setMode('paused');
  dom.bossBar.classList.add('is-hidden');
  setHudVisible(false);
  dom.rotateHint.classList.add('is-hidden');
  const finalScore = Math.round(state.score);
  state.best = Math.max(state.best, finalScore);
  try { localStorage.setItem('folclore_best', String(state.best)); } catch { /* noop */ }
  dom.menuBest.textContent = formatNumber(state.best);
  const acc = state.shotsFired > 0 ? Math.min(100, Math.round((state.shotsHit / state.shotsFired) * 100)) : 0;

  if (victory) {
    setText(dom.winScore, formatNumber(finalScore));
    setText(dom.winBest, `RECORDE ${formatNumber(state.best)}`);
    setText(dom.winKills, formatNumber(state.kills));
    setText(dom.winTime, formatTime(state.playTime));
    setText(dom.winAccuracy, `${acc}%`);
    dom.victory.classList.remove('is-hidden');
    state.victoryDawn = 0;
    audio.victory();
    vibrate([30, 40, 30, 40, 100]);
  } else {
    setText(dom.overScore, formatNumber(finalScore));
    setText(dom.overBest, `RECORDE ${formatNumber(state.best)}`);
    setText(dom.overWave, String(Math.max(1, state.wave)).padStart(2, '0'));
    setText(dom.overKills, formatNumber(state.kills));
    setText(dom.overTime, formatTime(state.playTime));
    dom.gameover.classList.remove('is-hidden');
    audio.gameOver();
    vibrate([80, 60, 120]);
  }
}

function quitToMenu() {
  clearGrenades();
  manager.clear();
  hideAllOverlays();
  setHudVisible(false);
  dom.menu.classList.remove('is-hidden');
  dom.bossBar.classList.add('is-hidden');
  state.mode = 'menu';
  input.setMode('menu');
  weaponRig.root.visible = false;
  world.setDawn(0);
  dom.menuBest.textContent = formatNumber(state.best);
  dom.lowHealth.classList.remove('on');
  camera.position.set(0, 6.8, 23);
  camera.lookAt(0, 2.4, -6);
}

function togglePause() {
  if (state.mode === 'playing') {
    state.mode = 'paused';
    input.setMode('paused');
    setText(dom.pauseWave, String(Math.max(1, state.wave)).padStart(2, '0'));
    setText(dom.pauseScore, formatNumber(state.score));
    setText(dom.pauseKills, formatNumber(state.kills));
    dom.pause.classList.remove('is-hidden');
    dom.rotateHint.classList.add('is-hidden');
    audio.ui();
  } else if (state.mode === 'paused') {
    resumeRun();
  }
}

function resumeRun() {
  if (state.mode !== 'paused') return;
  state.mode = 'playing';
  input.setMode('playing');
  dom.pause.classList.add('is-hidden');
  audio.ui();
  if (!isTouch) canvas.requestPointerLock?.();
}

// ---------------------------------------------------------------------------
// Weapons
// ---------------------------------------------------------------------------
const upVec = new THREE.Vector3(0, 1, 0);

function findAimTarget(origin, dir) {
  const cone = isTouch ? 0.14 : 0.075;
  const cosCone = Math.cos(cone);
  let best = null;
  let bestScore = Infinity;
  for (const e of manager.enemies) {
    if (e.state === 'dying' || e.state === 'dead' || e.state === 'spawn') continue;
    const target = new THREE.Vector3(e.pos.x, e.pos.y + e.height * 0.62 + e.yOffset, e.pos.z);
    const to = new THREE.Vector3().subVectors(target, origin);
    const distance = to.length();
    if (distance > 72) continue;
    to.normalize();
    const dot = dir.dot(to);
    if (dot < cosCone) continue;
    if (world.segmentBlocked(origin, target, 0)) continue;
    const score = (1 - dot) + distance * 0.0006;
    if (score < bestScore) { bestScore = score; best = { dir: to, distance, enemy: e }; }
  }
  return best;
}

function spreadDirection(dir, spread) {
  if (spread <= 0) return dir.clone();
  const up = Math.abs(dir.y) > 0.95 ? new THREE.Vector3(1, 0, 0) : upVec;
  const right = new THREE.Vector3().crossVectors(dir, up).normalize();
  const trueUp = new THREE.Vector3().crossVectors(right, dir).normalize();
  const a = rand(Math.PI * 2);
  const r = Math.sqrt(Math.random()) * spread;
  return dir.clone()
    .addScaledVector(right, Math.cos(a) * r)
    .addScaledVector(trueUp, Math.sin(a) * r)
    .normalize();
}

function currentWeapon() { return WEAPONS[state.currentWeapon]; }

function tryShoot() {
  const w = currentWeapon();
  if (state.reloadTimer > 0 || weaponRig.switchState) return;
  if (state.ammo[state.currentWeapon] <= 0) {
    audio.dryFire();
    startReload();
    state.fireTimer = 0.25;
    return;
  }
  state.ammo[state.currentWeapon]--;
  state.shotsFired++;
  state.fireTimer = w.fireDelay;

  camera.updateMatrixWorld(true);
  const origin = new THREE.Vector3();
  camera.getWorldPosition(origin);
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  const assist = findAimTarget(origin, dir);
  if (assist) dir.lerp(assist.dir, isTouch ? 0.92 : 0.6).normalize();

  const muzzle = weaponRig.getMuzzleWorld(new THREE.Vector3());
  let hitAny = false;
  let headshot = false;

  for (let p = 0; p < w.pellets; p++) {
    const pelletDir = spreadDirection(dir, w.spread);
    const hit = manager.raycast(origin, pelletDir, 90);
    const end = new THREE.Vector3();
    if (hit) {
      hitAny = true;
      headshot = headshot || hit.headshot;
      end.copy(hit.point);
      const distFactor = w.pellets > 1 ? 1 - clamp(hit.distance / 42, 0, 0.45) : 1;
      manager.damage(hit.enemy, w.damage * distFactor, hit.point, hit.headshot, true);
    } else {
      end.copy(origin).addScaledVector(pelletDir, 65);
    }
    effects.tracer(muzzle, end, w.color);
    if (hit) effects.impact(end.x, end.y, end.z, hit.enemy.cfg.color, w.pellets > 1 ? 3 : 5);
  }

  if (hitAny) {
    state.shotsHit++;
    hitMarker(false);
    audio.hit(headshot);
  }
  effects.muzzle(muzzle, w.color);
  weaponRig.playShoot(w.recoil);
  audio.shot(w.sound);
  kickCrosshair();

  state.recoilPitch += w.recoil * 0.0038;
  state.recoilYaw += rand(0.0035, -0.0035) * w.recoil;
  state.shake = Math.max(state.shake, w.recoil * 0.004);

  if (state.ammo[state.currentWeapon] <= 0) startReload();
  updateHudStatic();
}

function startReload() {
  const w = currentWeapon();
  if (state.reloadTimer > 0) return;
  if (state.ammo[state.currentWeapon] >= w.mag) return;
  state.reloadDuration = w.reload;
  state.reloadTimer = w.reload;
  weaponRig.startReload(w.reload);
  audio.reloadStart(w.reload);
  updateHudStatic();
}

function finishReload() {
  const w = currentWeapon();
  state.ammo[state.currentWeapon] = w.mag;
  state.reloadTimer = 0;
  weaponRig.cancelReload();
  audio.ui();
  updateHudStatic();
}

function selectWeapon(index) {
  if (index === state.currentWeapon || state.mode !== 'playing') return;
  const w = WEAPONS[index];
  if (!w) return;
  if (state.wave < w.unlockWave) {
    showToast(`${w.name} CHEGA NA ONDA ${w.unlockWave}`);
    audio.ui();
    return;
  }
  state.reloadTimer = 0;
  weaponRig.cancelReload();
  state.currentWeapon = index;
  weaponRig.requestSwitch(index);
  audio.ui();
  showToast(w.name);
  updateHudStatic();
}

function cycleWeapon() {
  let idx = state.currentWeapon;
  for (let i = 1; i <= WEAPONS.length; i++) {
    const next = (state.currentWeapon + i) % WEAPONS.length;
    if (state.wave >= WEAPONS[next].unlockWave) { idx = next; break; }
  }
  selectWeapon(idx);
}

// ---------------------------------------------------------------------------
// Grenades (foguetes de São João)
// ---------------------------------------------------------------------------
function throwGrenade() {
  if (state.mode !== 'playing' || state.grenadeCooldown > 0) return;
  if (state.grenades <= 0) {
    showToast('SEM FOGUETES — DERROTE CRIATURAS PARA GANHAR');
    audio.dryFire();
    return;
  }
  state.grenades--;
  state.grenadeCooldown = 0.45;
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  const origin = camera.position.clone().addScaledVector(dir, 0.65);
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.3, 8),
    new THREE.MeshStandardMaterial({ color: 0xd94437, roughness: 0.6, emissive: 0x4a0d08, emissiveIntensity: 0.4 })
  );
  group.add(body);
  const tip = new THREE.Mesh(
    new THREE.ConeGeometry(0.075, 0.14, 8),
    new THREE.MeshStandardMaterial({ color: 0xffd23f, emissive: 0xff9b1f, emissiveIntensity: 1.2, roughness: 0.4 })
  );
  tip.position.y = 0.22;
  group.add(tip);
  const stick = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.014, 0.38, 4),
    new THREE.MeshStandardMaterial({ color: 0xbfa070, roughness: 0.9 })
  );
  stick.position.y = -0.33;
  group.add(stick);
  group.position.copy(origin);
  scene.add(group);
  state.grenadesLive.push({
    group,
    pos: origin.clone(),
    vel: dir.multiplyScalar(15).add(new THREE.Vector3(0, 4.6, 0)),
    fuse: 1.55,
    spin: new THREE.Vector3(rand(9, -9), rand(9, -9), rand(9, -9)),
  });
  audio.grenadeThrow();
  updateHudStatic();
}

function explodeGrenade(g) {
  effects.explosion(g.pos.x, Math.max(0.4, g.pos.y), g.pos.z, 1.25);
  screenFlash();
  audio.explosion();
  state.shake = Math.max(state.shake, 0.55);
  vibrate([25, 30, 50]);
  for (const e of manager.enemies) {
    if (e.state === 'dying' || e.state === 'dead') continue;
    const d = Math.hypot(e.pos.x - g.pos.x, e.pos.z - g.pos.z);
    if (d < 6.2) {
      const falloff = 1 - (d / 6.2) * 0.55;
      const point = new THREE.Vector3(e.pos.x, e.pos.y + e.height * 0.5 + e.yOffset, e.pos.z);
      manager.damage(e, 120 * falloff, point, false, true);
    }
  }
}

function updateGrenades(dt) {
  for (const g of state.grenadesLive) {
    g.fuse -= dt;
    g.vel.y -= 18 * dt;
    g.pos.addScaledVector(g.vel, dt);
    if (g.pos.y < 0.2) {
      g.pos.y = 0.2;
      if (g.vel.y < 0) g.vel.y *= -0.36;
      g.vel.x *= 0.72;
      g.vel.z *= 0.72;
    }
    g.group.position.copy(g.pos);
    g.group.rotation.x += g.spin.x * dt;
    g.group.rotation.y += g.spin.y * dt;
    g.group.rotation.z += g.spin.z * dt;
    if (chance(0.5)) {
      effects.particles.spawn({
        x: g.pos.x, y: g.pos.y + 0.25, z: g.pos.z, count: 1, speed: 0.4, up: 0.8,
        spread: 0.05, gravity: -0.4, drag: 1.2, life: 0.4, size: 0.16, colors: [0xffd23f, 0xff8a3a],
      });
    }
    if (g.fuse <= 0) g.dead = true;
  }
  state.grenadesLive = state.grenadesLive.filter((g) => {
    if (g.dead) {
      explodeGrenade(g);
      g.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      scene.remove(g.group);
      return false;
    }
    return true;
  });
}

function clearGrenades() {
  for (const g of state.grenadesLive) {
    g.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    scene.remove(g.group);
  }
  state.grenadesLive = [];
}

// ---------------------------------------------------------------------------
// Player update
// ---------------------------------------------------------------------------
function updatePlaying(dt) {
  state.playTime += dt;
  state.timeSinceDamage += dt;
  state.invuln = Math.max(0, state.invuln - dt);
  state.grenadeCooldown = Math.max(0, state.grenadeCooldown - dt);

  if (state.comboTimer > 0) {
    state.comboTimer -= dt;
    if (state.comboTimer <= 0) { state.comboTimer = 0; state.multiplier = 1; }
  }
  if (state.health < state.maxHealth && state.timeSinceDamage > 6.5) {
    state.health = Math.min(state.maxHealth, state.health + 2.4 * dt);
  }

  // Look + optional tilt.
  const look = input.consumeLook();
  player.yaw -= look.x * input.sensitivity;
  player.pitch -= look.y * input.sensitivity;
  if (input.tiltEnabled) {
    player.yaw += input.tiltYawRate * dt;
    player.pitch += input.tiltPitchRate * dt;
  }
  player.pitch = clamp(player.pitch, -1.35, 1.22);
  player.yaw = ((player.yaw + Math.PI) % (Math.PI * 2)) - Math.PI;

  // Movement.
  const mx = input.moveX;
  const my = input.moveY;
  const mag = Math.min(1, Math.hypot(mx, my));
  const sin = Math.sin(player.yaw);
  const cos = Math.cos(player.yaw);
  let dx = (-sin * my) + (cos * mx);
  let dz = (-cos * my) + (-sin * mx);
  const len = Math.hypot(dx, dz);
  if (len > 0.001) { dx /= len; dz /= len; }
  const moveSpeed = 5.35 * (input.keys.has('shift') ? 1.28 : 1);
  if (mag > 0.02) {
    player.pos.x += dx * moveSpeed * mag * dt;
    player.pos.z += dz * moveSpeed * mag * dt;
    world.resolveCollision(player.pos, player.radius);
    const r = Math.hypot(player.pos.x, player.pos.z);
    if (r > world.playRadius) {
      player.pos.x = (player.pos.x / r) * world.playRadius;
      player.pos.z = (player.pos.z / r) * world.playRadius;
    }
    if (player.grounded) {
      player.stepAccum += moveSpeed * mag * dt;
      if (player.stepAccum > 2.15) { player.stepAccum = 0; audio.step(); }
      player.bobPhase += dt * (6.5 + moveSpeed * 0.7);
    }
  }
  player.bob = damp(player.bob, Math.sin(player.bobPhase) * 0.02 * mag, 10, dt);

  // Jump.
  if (!player.grounded) {
    player.velY -= 18 * dt;
    player.jumpY += player.velY * dt;
    if (player.jumpY <= 0) { player.jumpY = 0; player.velY = 0; player.grounded = true; }
  }
  player.pos.y = player.jumpY;

  // Camera recoil + shake.
  state.shake = damp(state.shake, 0, 9, dt);
  state.recoilPitch = damp(state.recoilPitch, 0, 7.5, dt);
  state.recoilYaw = damp(state.recoilYaw, 0, 7.5, dt);
  const shakeX = rand(state.shake, -state.shake) * 0.08;
  const shakeY = rand(state.shake, -state.shake) * 0.08;
  camera.position.set(
    player.pos.x + shakeX,
    player.pos.y + player.eye + player.bob + shakeY,
    player.pos.z
  );
  camera.rotation.set(
    player.pitch + state.recoilPitch + rand(state.shake, -state.shake) * 0.008,
    player.yaw + state.recoilYaw,
    rand(state.shake, -state.shake) * 0.006
  );
  camera.updateMatrixWorld(true);

  // Weapon.
  weaponRig.root.visible = true;
  weaponRig.update(dt, {
    speed: mag * moveSpeed, lookX: look.x, lookY: look.y,
    time: state.playTime, grounded: player.grounded,
  });

  // Firing / reloading.
  state.fireTimer = Math.max(0, state.fireTimer - dt);
  if (state.reloadTimer > 0) {
    state.reloadTimer -= dt;
    if (state.reloadTimer <= 0) finishReload();
  }
  if (input.firing && state.reloadTimer <= 0 && state.fireTimer <= 0) tryShoot();
  if (!input.firing) weaponRig.recoil = Math.max(weaponRig.recoil, 0);

  // World threats.
  manager.update(dt, player);
  updateGrenades(dt);

  // Waves.
  if (state.waveActive) {
    state.spawnTimer -= dt;
    if (state.spawnQueue.length > 0 && manager.alive.length < state.maxAlive && state.spawnTimer <= 0) {
      const type = state.spawnQueue.shift();
      manager.spawn(type, state.wave);
      state.spawnTimer = (type === 'mula' || type === 'cuca') ? 2.4 : rand(1.15, 0.45);
    }
    if (!state.pendingVictory && state.spawnQueue.length === 0 && manager.alive.length === 0) {
      completeWave();
    }
  } else if (state.intermission > 0) {
    state.intermission -= dt;
    if (state.intermission <= 0) startWave(state.wave + 1);
  }

  if (state.pendingVictory) {
    state.victoryTimer -= dt;
    const dawn = clamp((3.2 - state.victoryTimer) / 3.2, 0, 1) * 0.55;
    world.setDawn(dawn);
    if (state.victoryTimer <= 0) {
      state.pendingVictory = false;
      endRun(true);
      return;
    }
  }

  if (state.health <= 0) { endRun(false); return; }
}

// ---------------------------------------------------------------------------
// HUD
// ---------------------------------------------------------------------------
let hudCache = { health: -1, wave: -1, ammo: -1, weapon: -1, score: -1, grenades: -1, combo: -1 };

function updateHudStatic() {
  hudCache = { health: -1, wave: -1, ammo: -1, weapon: -1, score: -1, grenades: -1, combo: -1 };
}

function updateHud(dt) {
  if (state.mode === 'menu') return;

  const hp = Math.round(state.health);
  if (hp !== hudCache.health) {
    hudCache.health = hp;
    setText(dom.healthText, String(hp));
    dom.healthFill.style.width = `${(state.health / state.maxHealth) * 100}%`;
    dom.healthFill.classList.toggle('warn', state.health <= 60 && state.health > 30);
    dom.healthFill.classList.toggle('danger', state.health <= 30);
    dom.lowHealth.classList.toggle('on', state.health <= 28 && state.mode === 'playing');
  }
  if (state.wave !== hudCache.wave) {
    hudCache.wave = state.wave;
    setText(dom.waveNum, String(Math.max(1, state.wave)).padStart(2, '0'));
    dom.dawnFill.style.width = `${clamp((state.wave / 10) * 100, 0, 100)}%`;
  }
  const label = state.waveActive ? (WAVE_LABELS[state.wave] || 'A VILA RESISTE') : 'ARRAIÁ LIVRE · PRÓXIMA ONDA';
  if (label !== state.lastWaveLabel) {
    state.lastWaveLabel = label;
    setText(dom.waveName, label);
  }

  const score = Math.round(state.score);
  if (score !== hudCache.score) {
    hudCache.score = score;
    setText(dom.score, formatNumber(score));
  }
  if (state.multiplier !== hudCache.combo) {
    hudCache.combo = state.multiplier;
    dom.combo.classList.toggle('is-hidden', state.multiplier <= 1 || state.mode !== 'playing');
    const span = dom.combo.querySelector('span');
    if (span) setText(span, String(state.multiplier));
  }

  const ammo = state.ammo[state.currentWeapon];
  if (ammo !== hudCache.ammo || state.currentWeapon !== hudCache.weapon) {
    hudCache.ammo = ammo;
    hudCache.weapon = state.currentWeapon;
    setText(dom.ammoMag, String(ammo));
    const w = currentWeapon();
    setText(dom.weaponName, w.name);
    setText(dom.weaponSlot, `ARMA ${w.slot}${state.wave < w.unlockWave ? ' · BLOQUEADA' : ''}`);
    dom.ammoBox.classList.toggle('low', ammo <= Math.ceil(w.mag * 0.22));
    dom.ammoBox.classList.toggle('reloading', state.reloadTimer > 0);
  }
  if (state.reloadTimer > 0 !== dom.ammoBox.classList.contains('reloading')) {
    dom.ammoBox.classList.toggle('reloading', state.reloadTimer > 0);
  }

  if (state.grenades !== hudCache.grenades) {
    hudCache.grenades = state.grenades;
    setText(dom.grenadeCount, String(state.grenades));
    dom.grenadeCount.classList.toggle('zero', state.grenades <= 0);
  }

  if (manager.boss && state.mode === 'playing') {
    dom.bossBar.classList.remove('is-hidden');
    const frac = clamp(manager.boss.hp / manager.boss.maxHp, 0, 1);
    dom.bossFill.style.width = `${(frac * 100).toFixed(1)}%`;
    setText(dom.bossHpText, `${Math.ceil(frac * 100)}%`);
  } else {
    dom.bossBar.classList.add('is-hidden');
  }

  const showTilt = input.tiltEnabled && state.mode === 'playing';
  dom.tiltBadge.classList.toggle('is-hidden', !showTilt);
  if (showTilt) setText(dom.tiltBadge, input.hasTiltData ? 'TILT ATIVO' : 'INCLINE O APARELHO');
}

// ---------------------------------------------------------------------------
// Input wiring
// ---------------------------------------------------------------------------
const input = new Input(canvas, {
  onPause: togglePause,
  onReload: startReload,
  onSwitch: cycleWeapon,
  onSelectWeapon: selectWeapon,
  onGrenade: throwGrenade,
  onJump: () => {
    if (state.mode === 'playing' && player.grounded) {
      player.grounded = false;
      player.velY = 6.2;
      player.jumpY = 0.01;
      audio.ui();
    }
  },
});

// ---------------------------------------------------------------------------
// Buttons / menus
// ---------------------------------------------------------------------------
$('playBtn').addEventListener('click', () => {
  audio.init();
  startRun();
});
document.querySelectorAll('[data-setting="sound"]').forEach((btn) => btn.addEventListener('click', toggleSound));
document.querySelectorAll('[data-setting="quality"]').forEach((btn) => {
  btn.addEventListener('click', () => { applyQuality(!state.qualityHigh); audio.ui(); });
});
document.querySelectorAll('.tilt-toggle').forEach((btn) => btn.addEventListener('click', toggleTilt));
$('resumeBtn').addEventListener('click', resumeRun);
$('restartBtn').addEventListener('click', startRun);
$('quitBtn').addEventListener('click', quitToMenu);
$('overRestart').addEventListener('click', startRun);
$('overMenu').addEventListener('click', quitToMenu);
$('winRestart').addEventListener('click', startRun);
$('winMenu').addEventListener('click', quitToMenu);
$('fullscreenBtn').addEventListener('click', async () => {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  } catch { /* iPhone Safari */ }
  audio.ui();
});
$('pauseBtn').addEventListener('click', () => {
  /* Pointer handling lives in Input; keep a keyboard/AT fallback. */
}, { passive: true });

window.addEventListener('keydown', (e) => {
  if (state.mode === 'menu' && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    audio.init();
    startRun();
  }
});
window.addEventListener('resize', onResize);
function onResize() {
  updateHandheldClass();
  camera.aspect = innerWidth / innerHeight;
  camera.fov = innerWidth / innerHeight < 0.8 ? 82 : 72;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, state.qualityHigh ? (isTouch ? 1.5 : 1.75) : 1));
  renderer.setSize(innerWidth, innerHeight, false);
}
onResize();

document.addEventListener('visibilitychange', () => {
  if (document.hidden && state.mode === 'playing') togglePause();
});

// ---------------------------------------------------------------------------
// Menu camera + main loop
// ---------------------------------------------------------------------------
function updateMenuCamera(time) {
  const a = time * 0.045 + 0.1;
  const radius = 19 + Math.sin(time * 0.11) * 1.4;
  camera.position.set(Math.sin(a) * radius, 6.6 + Math.sin(time * 0.17) * 0.7, Math.cos(a) * radius);
  camera.lookAt(0, 2.2 + Math.sin(time * 0.23) * 0.15, -5);
  camera.updateMatrixWorld(true);
}

const clock = new THREE.Clock();
let elapsed = 0;

function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, clock.getDelta());
  elapsed += dt;
  world.update(dt, elapsed);
  effects.update(dt);
  if (state.mode !== 'playing' && state.mode !== 'paused') updateGrenades(dt);

  if (state.mode === 'playing') {
    updatePlaying(dt);
    updateHud(dt);
  } else if (state.mode === 'menu') {
    updateMenuCamera(elapsed);
    weaponRig.root.visible = false;
  } else if (state.mode === 'paused') {
    weaponRig.root.visible = true;
    weaponRig.update(dt, { speed: 0, lookX: 0, lookY: 0, time: elapsed, grounded: true });
    updateHud(dt);
  } else if (state.mode === 'victory') {
    weaponRig.root.visible = false;
    state.victoryDawn = Math.min(1, state.victoryDawn + dt / 3.2);
    world.setDawn(state.victoryDawn);
  } else {
    weaponRig.root.visible = false;
  }

  renderer.render(scene, camera);
}

applySettings();
updateMenuCamera(0);
renderer.setSize(innerWidth, innerHeight, false);
renderer.render(scene, camera);
frame();

requestAnimationFrame(() => {
  setTimeout(() => {
    dom.loading.classList.add('done');
    setTimeout(() => { dom.loading.style.display = 'none'; }, 600);
  }, 420);
});

// Optional development harness (enabled only with ?debug=1).
if (new URLSearchParams(location.search).has('debug')) {
  window.__furia = {
    state, player, manager, world, camera, THREE, input,
    startRun, startWave, endRun, togglePause, quitToMenu,
    tryShoot, selectWeapon, throwGrenade, updateHudStatic,
  };
}

// Auto-fade the rotate hint if user rotates.
window.addEventListener('orientationchange', () => {
  if (innerWidth > innerHeight) dom.rotateHint.classList.add('is-hidden');
});
