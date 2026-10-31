import './style.css';
import * as THREE from 'three';
import { World } from './game/world.js';
import { HUD } from './game/hud.js';
import { AudioEngine } from './game/audio.js';
import { VoiceSystem } from './game/voice.js';
import { Player } from './game/player.js';
import { EnemyManager, ENEMY_TYPES } from './game/enemies.js';
import {
  forgeWeapon, makeFallbackWeapon, createWeaponModel, updateWeaponModel,
  disposeWeaponModel, spokenCount
} from './game/weapons.js';
import { clamp, rand, choice, isTouchDevice, vibrate, TAU, pad } from './game/utils.js';

const $ = (id) => document.getElementById(id);
const canvas = $('view');

/* ------------------------------------------------------------
   Persisted settings
   ------------------------------------------------------------ */
const DEFAULTS = { lang: 'pt-BR', sens: 1, sound: true, haptics: true, tilt: false };
function loadSettings() {
  try {
    const raw = JSON.parse(localStorage.getItem('vox-arena-settings') || '{}');
    return { ...DEFAULTS, ...raw, tilt: false };
  } catch { return { ...DEFAULTS }; }
}
const settings = loadSettings();
function saveSettings() {
  try { localStorage.setItem('vox-arena-settings', JSON.stringify(settings)); } catch { /* ignore */ }
}

const isTouch = isTouchDevice();
document.body.classList.toggle('touch', isTouch);
document.body.classList.add('is-menu');

let world;
let hud;
let audio;
let voice;
let player;
let enemies;
let weaponModel = null;
let recoilAnim = 0;
let lastFrame = performance.now();
let time = 0;
let frameCount = 0;
let perfTimer = 0;
let qualityChecked = false;
let rotateTimer = null;

const state = {
  mode: 'menu',
  wave: 0,
  score: 0,
  kills: 0,
  health: 100,
  combo: 1,
  comboTime: 0,
  waveActive: false,
  spawnQueue: [],
  spawnTimer: 0,
  maxAlive: 6,
  intermission: 0,
  weapon: null,
  ammo: 0,
  maxAmmo: 0,
  nextFire: 0,
  emptyCooldown: 0,
  lastDamage: -99,
  invulnUntil: 0,
  time: 0,
  favorite: '—',
  voiceHeld: false,
  micReady: false,
  emptyTimer: null,
  overTimer: null,
  waveStartTimer: null,
  sawNoSpeech: false,
  hintShown: false,
  lastVoiceError: 0
};

let mouseFiring = false;
let touchFiring = false;
let keyFiring = false;
const isFiring = () => mouseFiring || touchFiring || keyFiring;

/* ------------------------------------------------------------ */
function boot() {
  try { awaitFonts().then(init); } catch { init(); }
}
async function awaitFonts() {
  try { await document.fonts.ready; } catch { /* fonts still fall back */ }
}
function init() {
  world = new World(canvas);

  hud = new HUD();
  hud.setVisible(false);
  hud.setMicState('idle', { lang: settings.lang === 'en-US' ? 'EN-US' : 'PT-BR' });

  audio = new AudioEngine();
  audio.enabled = Boolean(settings.sound);

  player = new Player({ camera: world.camera, world, audio, settings: { sensitivity: settings.sens } });
  player.bindCanvas(canvas);
  player.bindKeyboard();
  player.bindJoystick($('joystick'), $('joystick-stick'));

  voice = new VoiceSystem({
    audio,
    lang: settings.lang,
    onState: onVoiceState,
    onPartial: (text) => {
      if (text) hud.setTranscript(text);
    },
    onFinal: onVoiceFinal,
    onLevel: (level, pitch) => {
      hud.setVoiceLevel(level, pitch);
      if (Math.random() < 0.12) vibrate(4);
    },
    onError: onVoiceError
  });

  enemies = new EnemyManager({
    scene: world.scene,
    world,
    audio,
    callbacks: {
      onDamageNumber: (pos, amount, type) => hud.damageNumber(pos, amount, type, world.camera),
      onHit: () => hud.hit(false),
      onKill: handleKill,
      onDamagePlayer: (amount, source) => damagePlayer(amount, source),
      onPickup: (kind) => {
        if (kind === 'health') healPlayer(30);
      },
      onShake: (v) => player.addShake(v),
      playerX: () => player.position.x
    }
  });

  enemies.spawnDecor(5);
  world.menuCamera(0);
  bindUI();
  // Read-only-ish debug handle for QA and capture tooling.
  window.__VOX__ = { world, player, enemies, state, hud, audio, voice };
  world.render();
  document.body.dataset.ready = '1';
  requestAnimationFrame(() => {
    $('boot')?.classList.add('is-done');
    hud.setMenuVisible(true);
  });
  lastFrame = performance.now();
  requestAnimationFrame(loop);
}

/* ------------------------------------------------------------
   Main loop
   ------------------------------------------------------------ */
function loop(now) {
  requestAnimationFrame(loop);
  const rawDt = (now - lastFrame) / 1000;
  lastFrame = now;
  const dt = Math.min(Math.max(rawDt, 0.0001), 0.05);
  time += dt;
  state.time = time;
  frameCount++;

  if (state.mode === 'menu') {
    world.menuCamera(time);
    enemies.update(dt, time, null);
    world.update(dt, time);
    hud.updateRadar(player, enemies.enemies, dt);
  } else if (state.mode === 'playing') {
    player.update(dt, time);
    enemies.update(dt, time, player);
    updateGame(dt, time);
    updateWeapon(dt, time);
    if (voice.analyser) {
      voice.update();
      if (voice.listening) hud.setVoiceLevel(voice.level, voice.pitch);
    }
    world.update(dt, time);
    hud.updateRadar(player, enemies.enemies, dt);
    monitorPerf(dt);
  } else {
    // paused / game over / typing
    if (voice.analyser) voice.update();
    updateWeapon(dt, time, true);
    world.update(dt, time);
    hud.updateRadar(player, enemies.enemies, dt);
  }

  world.render();
}

function monitorPerf(dt) {
  if (qualityChecked) return;
  perfTimer += dt;
  if (perfTimer > 4.5) {
    qualityChecked = true;
    const fps = frameCount / perfTimer;
    if (fps < 32 && world.quality > 0) {
      world.lowerQuality();
      hud.toast('QUALIDADE ADAPTATIVA ATIVADA', 'is-warn');
    }
  }
}

/* ------------------------------------------------------------
   Game lifecycle
   ------------------------------------------------------------ */
function startGame() {
  if (state.waveStartTimer) clearTimeout(state.waveStartTimer);
  if (state.overTimer) clearTimeout(state.overTimer);
  if (state.emptyTimer) clearTimeout(state.emptyTimer);

  audio.ensure();
  audio.setEnabled(settings.sound);

  state.mode = 'playing';
  document.body.classList.remove('is-menu');
  document.body.classList.add('is-playing');
  hud.setMenuVisible(false);
  hud.setVisible(true);
  $('pause').classList.add('is-hidden');
  $('gameover').classList.add('is-hidden');
  $('settings').classList.add('is-hidden');
  $('forge-modal').classList.add('is-hidden');

  resetRun();
  player.setEnabled(true);
  startWave(1);
  if (isTouch) scheduleRotateHint();
  hud.hint('SEGURE O MIC E FALE UMA PALAVRA', 5);
  state.waveStartTimer = setTimeout(() => {
    if (state.mode === 'playing') hud.toast('MIC: SEGURE O BOTÃO E FALE — OU DIGITE NA FORJA');
  }, 2400);
}

function resetRun() {
  if (state.emptyTimer) clearTimeout(state.emptyTimer);
  state.wave = 0;
  state.score = 0;
  state.kills = 0;
  state.health = 100;
  state.combo = 1;
  state.comboTime = 0;
  state.waveActive = false;
  state.spawnQueue = [];
  state.spawnTimer = 0;
  state.intermission = 0;
  state.maxAlive = 6;
  state.lastDamage = -99;
  state.invulnUntil = 0;
  state.favorite = '—';
  state.sawNoSpeech = false;

  enemies.clear();
  enemies.wave = 1;
  enemies.clearProjectiles();
  player.reset();
  player.setEnabled(true);
  mouseFiring = false;
  touchFiring = false;
  keyFiring = false;
  $('btn-fire')?.classList.remove('is-down');

  hud.setHealth(100);
  hud.setWave(1);
  hud.setScore(0);
  hud.setKills(0);
  hud.setMicState('idle', { live: state.micReady, lang: voice.langLabel });
  hud.setTranscript('');
  hud.setEmpty(false);
  hud.hint('');

  const starter = forgeWeapon({ word: 'TROVÃO', level: 0.7, pitch: 0.58, duration: 1.1, source: 'starter' });
  equipWeapon(starter);
  world.setHurt(0);
  world.setForge(0);
  $('side-weapons').textContent = String(spokenCount());
}

function startWave(n) {
  state.wave = n;
  state.waveActive = true;
  state.spawnQueue = [];
  state.spawnTimer = 0.55;
  state.maxAlive = Math.min(5 + Math.ceil(n * 0.8), 11);
  enemies.wave = n;
  hud.setWave(n);
  hud.showWave(n, n === 1 ? 'SINTA A FREQUÊNCIA' : n % 5 === 0 ? 'PRESSÃO MÁXIMA' : 'MANTENHA A RESSONÂNCIA');
  audio.wave();

  const total = Math.min(4 + Math.round(n * 1.9), 22);
  for (let i = 0; i < total; i++) state.spawnQueue.push(pickType(n));

  if (n === 1) {
    const showcase = [
      { x: 3.4, z: 10.4 },
      { x: -4.7, z: 7.4 },
      { x: 0.7, z: 2.2 }
    ];
    for (const p of showcase) {
      const type = state.spawnQueue.shift() || 'drone';
      spawnEnemy(type, p);
    }
  } else {
    for (let i = 0; i < 2; i++) {
      const type = state.spawnQueue.shift();
      if (type) spawnEnemy(type, randomSpawnPoint());
    }
  }
}

function pickType(n) {
  const r = Math.random();
  if (n >= 5 && r < 0.12) return 'brute';
  if (n >= 3 && r < 0.35) return 'spitter';
  if (n >= 2 && r < 0.63) return 'seeker';
  return 'drone';
}

function randomSpawnPoint() {
  let point = choice(world.spawnPoints);
  for (let tries = 0; tries < 8; tries++) {
    const d = Math.hypot(point.x - player.position.x, point.z - player.position.z);
    if (d > 9) break;
    point = choice(world.spawnPoints);
  }
  return { x: point.x + rand(-1.6, 1.6), z: point.z + rand(-1.6, 1.6) };
}

function spawnEnemy(type, point) {
  const cfg = ENEMY_TYPES[type] || ENEMY_TYPES.drone;
  const e = enemies.spawn(type, new THREE.Vector3(point.x, cfg.hover, point.z));
  const scale = 1 + Math.max(0, state.wave - 1) * 0.13;
  e.maxHp = e.hp = Math.round(cfg.hp * scale);
  e.shadow.position.set(point.x, 0.045, point.z);
  return e;
}

function completeWave() {
  if (!state.waveActive) return;
  state.waveActive = false;
  state.intermission = 3.7;
  const bonus = 120 * state.wave;
  state.score += bonus;
  hud.setScore(state.score);
  hud.waveClear(state.wave, bonus);
  audio.waveClear();
  healPlayer(16, true);
  hud.toast(`ONDA ${pad(state.wave)} LIMPA · +${bonus} PTS`);
}

/* ------------------------------------------------------------
   Per-frame game logic
   ------------------------------------------------------------ */
function updateGame(dt, t) {
  // combo decay
  if (state.comboTime > 0) {
    state.comboTime -= dt;
    if (state.comboTime <= 0) state.combo = 1;
  }

  // health regeneration
  if (state.health > 0 && state.health < 100 && t - state.lastDamage > 5.4) {
    const before = Math.ceil(state.health);
    state.health = Math.min(100, state.health + 9 * dt);
    if (Math.ceil(state.health) !== before) hud.setHealth(state.health);
  }

  // wave spawning
  if (state.waveActive) {
    if (state.spawnQueue.length && enemies.aliveCount < state.maxAlive) {
      state.spawnTimer -= dt;
      if (state.spawnTimer <= 0) {
        const type = state.spawnQueue.shift();
        spawnEnemy(type, randomSpawnPoint());
        state.spawnTimer = Math.max(0.5, 1.15 - state.wave * 0.035) * rand(0.8, 1.15);
      }
    }
    if (!state.spawnQueue.length && enemies.aliveCount === 0) completeWave();
  } else if (state.intermission > 0) {
    state.intermission -= dt;
    if (state.intermission <= 0) startWave(state.wave + 1);
  }

  // firing
  if (isFiring()) tryFire(t);

  // crosshair
  const w = state.weapon;
  if (w) hud.setCrosshairSpread(w.stats.spread, isFiring());

  if (state.health <= 0 && state.mode === 'playing') die();
}

/* ------------------------------------------------------------
   Weapon handling
   ------------------------------------------------------------ */
function placeWeaponModel() {
  if (!weaponModel) return;
  const portrait = window.innerWidth < 820;
  weaponModel.position.set(portrait ? 0.31 : 0.42, portrait ? -0.23 : -0.27, portrait ? -0.95 : -1.0);
  weaponModel.rotation.set(0.02, portrait ? 0.26 : 0.3, 0);
  weaponModel.scale.setScalar(portrait ? 0.7 : 0.68);
}

function equipWeapon(weapon, { toast = false } = {}) {
  if (weaponModel) {
    world.camera.remove(weaponModel);
    disposeWeaponModel(weaponModel);
    weaponModel = null;
  }
  state.weapon = weapon;
  state.ammo = weapon.stats.ammo;
  state.maxAmmo = weapon.stats.maxAmmo;
  state.nextFire = 0;
  state.favorite = weapon.word;
  if (state.emptyTimer) { clearTimeout(state.emptyTimer); state.emptyTimer = null; }

  weaponModel = createWeaponModel(weapon);
  world.camera.add(weaponModel);
  placeWeaponModel();
  recoilAnim = 0;

  hud.setWeapon(weapon, state.ammo, state.maxAmmo);
  hud.setAmmo(state.ammo, state.maxAmmo);
  hud.setEmpty(false);
  if (toast) hud.toast(`${weapon.rarity} · ${weapon.label} · ${weapon.stats.damage} DANO`);
}

function forgeWord(word, source = 'typed') {
  const w = forgeWeapon({
    word,
    level: state.voiceHeld ? 0.7 : 0.58,
    pitch: 0.5,
    duration: 1,
    source
  });
  equipWeapon(w);
  hud.forge(w.word);
  hud.setTranscript('');
  audio.forge();
  vibrate([12, 35, 18]);
  world.setForge(1);
  setTimeout(() => world.setForge(0), 260);
  hud.toast(`${w.rarity} · ${w.label} · ${w.stats.damage} DANO · ${w.stats.rpm} RPM`, w.rarity === 'LENDÁRIA' ? '' : '');
  $('side-weapons').textContent = String(spokenCount());
}

function onVoiceFinal({ text, level, pitch, duration, source }) {
  if (state.mode === 'paused' || state.mode === 'over') return;
  const w = forgeWeapon({ word: text, level, pitch, duration, source });
  equipWeapon(w);
  hud.forge(w.word);
  hud.setTranscript('');
  audio.forge();
  vibrate([14, 40, 16]);
  world.setForge(1);
  setTimeout(() => world.setForge(0), 260);
  hud.toast(`${w.word} · ${w.label} · ${w.stats.damage} DANO`, w.rarity === 'LENDÁRIA' ? '' : '');
  $('side-weapons').textContent = String(spokenCount());
}

function tryFire(t) {
  const weapon = state.weapon;
  if (!weapon || state.mode !== 'playing') return;
  if (t < state.nextFire) return;
  if (Number.isFinite(state.ammo) && state.ammo <= 0) {
    if (t > state.emptyCooldown) {
      audio.empty();
      hud.setEmpty(true);
      state.emptyCooldown = t + 0.45;
      hud.toast('SEM ENERGIA · FALE OU DIGITE UMA NOVA ARMA', 'is-warn');
      scheduleFallback();
    }
    return;
  }

  state.nextFire = t + weapon.stats.fireInterval;
  if (Number.isFinite(state.ammo)) {
    state.ammo = Math.max(0, state.ammo - 1);
    hud.setAmmo(state.ammo, state.maxAmmo);
    if (state.ammo <= 0) scheduleFallback();
  }

  recoilAnim = 1;
  player.applyRecoil(weapon.stats.recoil * (weapon.type === 'scatter' ? 1.7 : 1));
  audio.shot(weapon);
  vibrate(weapon.type === 'scatter' || weapon.type === 'havoc' ? 24 : 9);
  hud.setCrosshairSpread(weapon.stats.spread, true);
  addShake(weapon.type === 'havoc' ? 0.3 : 0.08);

  if (weapon.stats.projectile) {
    fireProjectile(weapon);
  } else {
    const pellets = Math.max(1, weapon.stats.pellets);
    for (let i = 0; i < pellets; i++) fireHitscan(weapon);
  }

  if (state.ammo <= 0 && Number.isFinite(state.ammo)) {
    hud.setEmpty(true);
    scheduleFallback();
  }
}

function scheduleFallback() {
  if (state.emptyTimer) return;
  state.emptyTimer = setTimeout(() => {
    state.emptyTimer = null;
    if (state.mode !== 'playing') return;
    if (!Number.isFinite(state.ammo) && state.ammo > 0) return;
    if (Number.isFinite(state.ammo) && state.ammo > 0) return;
    const fallback = makeFallbackWeapon();
    equipWeapon(fallback);
    hud.toast('SUSSURRO · PULSO INFINITO DE EMERGÊNCIA');
  }, 1400);
}

function shotDirection(spread = 0) {
  const dir = new THREE.Vector3();
  world.camera.getWorldDirection(dir);
  if (spread > 0) {
    const right = new THREE.Vector3().crossVectors(dir, world.camera.up).normalize();
    const up = new THREE.Vector3().crossVectors(right, dir).normalize();
    const a = Math.random() * TAU;
    const r = Math.sqrt(Math.random()) * spread;
    dir.addScaledVector(right, Math.cos(a) * r).addScaledVector(up, Math.sin(a) * r).normalize();
  }
  return dir;
}

function muzzleWorld() {
  if (!weaponModel) return world.camera.position.clone();
  world.camera.updateMatrixWorld(true);
  const muzzle = weaponModel.userData.muzzle;
  const v = new THREE.Vector3();
  muzzle.getWorldPosition(v);
  return v;
}

function muzzleFx(weapon) {
  const pos = muzzleWorld();
  const scale = weapon.type === 'scatter' ? 1.5 : weapon.type === 'havoc' ? 1.8 : weapon.type === 'beam' ? 1.2 : 1;
  world.muzzleFlash(pos, weapon.color, scale);
  world.spark(pos, weapon.color, 4, 0.55, 0.03, 0.18);
}

function fireHitscan(weapon) {
  const origin = world.camera.position.clone();
  const dir = shotDirection(weapon.stats.spread);
  const range = weapon.stats.range;
  const wall = world.raycast(origin, dir, range);
  const limit = wall ? wall.distance : range;
  const muzzle = muzzleWorld();
  muzzleFx(weapon);

  if (weapon.effect === 'pierce') {
    const all = enemies.raycastAll(origin, dir, limit);
    const targets = all.slice(0, 4);
    let end = wall ? wall.point.clone() : origin.clone().addScaledVector(dir, range);
    if (targets.length) end = targets[targets.length - 1].point.clone();
    for (const hit of targets) {
      const dmg = weapon.stats.damage * clamp(1 - hit.distance / range * 0.25, 0.6, 1);
      enemies.damage(hit.enemy, dmg, effectOpts(weapon, dir));
    }
    world.tracer(muzzle, end, weapon.color, 0.16, true);
    world.impact(end, weapon.color, 1.1);
    if (wall) world.spark(wall.point, 0xffffff, 5, 0.7, 0.04, 0.4);
    return;
  }

  let hit = enemies.raycast(origin, dir, limit);
  if (!hit && isTouch) {
    hit = aimAssist(origin, dir, limit);
  }

  if (hit) {
    let dmg = weapon.stats.damage * clamp(1 - hit.distance / range * 0.3, 0.6, 1);
    const crit = Math.random() < 0.12;
    if (crit) dmg *= 1.7;
    const killed = enemies.damage(hit.enemy, dmg, effectOpts(weapon, dir, crit));
    world.tracer(muzzle, hit.point, weapon.color, 0.1, weapon.type === 'beam');
    world.impact(hit.point, weapon.color, crit ? 1.5 : 0.9);
    if (weapon.effect === 'leech') {
      const heal = Math.max(1, Math.round(dmg * 0.16));
      healPlayer(heal, true);
      hud.damageNumber(hit.point, heal, 'heal', world.camera);
    }
    if (weapon.effect === 'chain') chainLightning(hit.enemy, weapon, dmg);
    if (killed) hud.hit(true);
  } else {
    const end = wall ? wall.point.clone() : origin.clone().addScaledVector(dir, range);
    world.tracer(muzzle, end, weapon.color, 0.08, false);
    if (wall) {
      world.impact(wall.point, weapon.color, 0.6);
      world.spark(wall.point, weapon.color, 4, 0.6, 0.035, 0.35);
    }
  }
}

function effectOpts(weapon, dir, crit = false) {
  const opts = { crit };
  if (weapon.effect === 'slow') { opts.effect = 'slow'; opts.duration = 2.6; }
  if (weapon.effect === 'venom') { opts.effect = 'venom'; opts.dot = weapon.stats.damage * 0.45; opts.duration = 3.6; }
  if (weapon.effect === 'burn') { opts.effect = 'burn'; opts.dot = weapon.stats.damage * 0.7; opts.duration = 2.4; }
  if (dir) opts.knockback = dir.clone().setY(0).normalize().multiplyScalar(1.4);
  return opts;
}

function chainLightning(from, weapon, baseDamage) {
  let prev = from;
  const used = new Set([from]);
  const max = Math.max(2, weapon.stats.chain || 2);
  for (let i = 1; i < max; i++) {
    let next = null;
    let best = 9;
    for (const e of enemies.enemies) {
      if (!e.alive || used.has(e)) continue;
      const d = e.group.position.distanceTo(prev.group.position);
      if (d < best) { best = d; next = e; }
    }
    if (!next) break;
    const dmg = baseDamage * Math.pow(0.62, i);
    enemies.damage(next, dmg, {});
    const a = prev.group.position.clone();
    const b = next.group.position.clone();
    world.tracer(a, b, 0x9ff7ff, 0.12, false);
    world.spark(b, 0x9ff7ff, 8, 0.8, 0.05, 0.45);
    prev = next;
    used.add(next);
  }
}

function aimAssist(origin, dir, limit) {
  let best = null;
  let bestAngle = 0.055;
  for (const e of enemies.enemies) {
    if (!e.alive || e.spawnT < 0.5) continue;
    const to = e.group.position.clone().sub(origin);
    const dist = to.length();
    if (dist > Math.min(limit, 85)) continue;
    const angle = dir.angleTo(to.normalize());
    if (angle < bestAngle) {
      bestAngle = angle;
      best = { enemy: e, distance: dist, point: e.group.position.clone() };
    }
  }
  return best;
}

function fireProjectile(weapon) {
  const origin = muzzleWorld();
  const dir = shotDirection(weapon.stats.spread);
  muzzleFx(weapon);
  const count = Math.max(1, weapon.stats.pellets);
  for (let i = 0; i < count; i++) {
    const d = dir.clone();
    if (count > 1) {
      d.x += rand(-weapon.stats.spread, weapon.stats.spread);
      d.y += rand(-weapon.stats.spread, weapon.stats.spread);
      d.normalize();
    }
    enemies.spawnProjectile({
      from: origin.clone(),
      dir: d,
      speed: weapon.stats.speed || 30,
      color: weapon.color,
      owner: 'player',
      damage: weapon.stats.damage,
      radius: weapon.type === 'havoc' ? 0.32 : 0.2,
      splash: weapon.stats.splash,
      homing: weapon.effect === 'homing',
      slow: weapon.effect === 'slow',
      venom: weapon.effect === 'venom',
      burn: weapon.effect === 'burn',
      life: 4.2,
      size: weapon.type === 'havoc' ? 1.5 : 1
    });
  }
}

/* ------------------------------------------------------------
   Damage / score / voice
   ------------------------------------------------------------ */
function handleKill(e) {
  state.kills++;
  state.combo = Math.min(5, state.combo + 0.22);
  state.comboTime = 3.6;
  const pts = Math.round(e.cfg.score * state.combo);
  state.score += pts;
  hud.setScore(state.score);
  hud.setKills(state.kills);
  hud.hit(true);
  if (e.type === 'brute') {
    addShake(0.45);
    hud.toast('BRUTO DESINTEGRADO · +' + pts, '');
  } else if (state.combo >= 2 && Math.random() < 0.25) {
    hud.toast(`COMBO ×${state.combo.toFixed(1)} · +${pts}`);
  }
}

function addShake(v) { player.addShake(v); }

function damagePlayer(amount, source) {
  if (state.mode !== 'playing' || state.health <= 0) return;
  if (state.time < state.invulnUntil) return;
  state.invulnUntil = state.time + 0.32;
  state.health = Math.max(0, state.health - amount);
  state.lastDamage = state.time;
  hud.setHealth(state.health);
  hud.hurt(clamp(0.35 + amount / 55, 0.3, 1));
  player.hitShake();
  audio.hurt();
  vibrate([30, 20, 30]);
  world.setHurt(1);
  setTimeout(() => world.setHurt(0), 220);
  hud.damageNumber(player.chestPosition().add(new THREE.Vector3(rand(-0.4, 0.4), 0.5, rand(-0.4, 0.4))), Math.round(amount), 'player', world.camera);
  if (state.health <= 0) die();
}

function healPlayer(amount, quiet = false) {
  const before = state.health;
  state.health = Math.min(100, state.health + amount);
  if (state.health > before) {
    hud.setHealth(state.health);
    if (!quiet) {
      hud.hurt(0.22, true);
      audio.heal();
    }
  }
}

function die() {
  if (state.mode === 'over') return;
  state.mode = 'over';
  player.setEnabled(false);
  mouseFiring = false;
  touchFiring = false;
  keyFiring = false;
  voice.cancel();
  hud.setMicState('idle', { lang: voice.langLabel });
  hud.setHealth(0);
  hud.gameOverStats({
    wave: Math.max(1, state.wave),
    score: state.score,
    kills: state.kills,
    weapon: state.weapon?.word || '—'
  });
  hud.hurt(1);
  audio.denied();
  vibrate([80, 40, 120]);
  world.setHurt(1);
  setTimeout(() => world.setHurt(0), 800);
  state.overTimer = setTimeout(() => {
    hud.setVisible(false);
    $('gameover').classList.remove('is-hidden');
  }, 650);
}

/* ------------------------------------------------------------
   Voice
   ------------------------------------------------------------ */
function onVoiceState(s) {
  if (s === 'listening') { hud.setMicState('listening'); return; }
  if (s === 'processing') { hud.setMicState('processing'); return; }
  if (s === 'ready') {
    state.micReady = true;
    if (!state.voiceHeld) hud.setMicState('idle', { live: true, label: 'SEGURE E FALE', lang: voice.langLabel });
    return;
  }
  if (s === 'denied') {
    state.micReady = false;
    hud.setMicState('denied');
    hud.toast('MICROFONE BLOQUEADO · USE A FORJA MANUAL (⌨)', 'is-warn');
    return;
  }
  if (s === 'unsupported') {
    hud.setMicState('unsupported');
    return;
  }
  if (s === 'pending') {
    if (!state.voiceHeld) hud.setMicState('idle', { lang: voice.langLabel });
    return;
  }
  if (s === 'idle') {
    if (!state.voiceHeld) hud.setMicState('idle', { live: state.micReady, label: 'SEGURE E FALE', lang: voice.langLabel });
  }
}

function onVoiceError(code) {
  const now = performance.now();
  if (now - state.lastVoiceError < 900) return;
  state.lastVoiceError = now;
  if (code === 'mic-denied') {
    hud.setMicState('denied');
    hud.toast('MICROFONE NEGADO · DIGITE UMA PALAVRA NA FORJA', 'is-bad');
  } else if (code === 'silence') {
    hud.toast('NADA CAPTADO · SEGURE E FALE MAIS PERTO', 'is-warn');
  } else if (code === 'speech-denied') {
    hud.toast('DITADO BLOQUEADO · A VOZ AINDA FORJA PELO TIMBRE', 'is-warn');
  } else if (code === 'no-words' || code === 'tone-fallback') {
    hud.toast('SINTA O TIMBRE · ARMA FORJADA PELA SUA VOZ');
  } else if (code === 'network') {
    hud.toast('DITADO SEM REDE · FORJA PELO TIMBRE ATIVADA', 'is-warn');
  } else if (code === 'recognition-start' || code === 'speech-error') {
    if (!state.sawNoSpeech) {
      state.sawNoSpeech = true;
      hud.toast('DITADO INDISPONÍVEL · SUA VOZ AINDA VALE', 'is-warn');
    }
  }
}

function startVoice() {
  if (state.mode !== 'playing' || state.voiceHeld) return;
  state.voiceHeld = true;
  document.getElementById('btn-voice')?.classList.add('is-live', 'is-down');
  document.getElementById('desktop-voice')?.classList.add('is-live');
  hud.setMicState('listening');
  hud.setTranscript('');
  audio.ensure();
  vibrate([15, 25, 15]);
  if (!state.micReady && voice.micState !== 'denied') {
    hud.toast('PERMITA O MICROFONE E FALE', '');
  }
  voice.startListening();
}

function endVoice() {
  if (!state.voiceHeld) return;
  state.voiceHeld = false;
  document.getElementById('btn-voice')?.classList.remove('is-live', 'is-down');
  document.getElementById('desktop-voice')?.classList.remove('is-live');
  voice.stopListening();
}

/* ------------------------------------------------------------
   Model animation
   ------------------------------------------------------------ */
function updateWeapon(dt, t, idle = false) {
  if (!weaponModel) return;
  recoilAnim = Math.max(0, recoilAnim - dt * 9);
  const moving = idle ? 0 : player.getMovingIntensity() + player.sprint * 0.4;
  updateWeaponModel(weaponModel, t, dt, { moving, recoil: recoilAnim });
  const portrait = window.innerWidth < 820;
  const baseX = portrait ? 0.31 : 0.42;
  const baseY = portrait ? -0.23 : -0.27;
  weaponModel.position.x = baseX + Math.sin(t * 1.05) * 0.002;
  weaponModel.position.y = baseY - player.sprint * 0.024 + Math.sin(t * 1.35) * 0.002;
}

/* ------------------------------------------------------------
   UI
   ------------------------------------------------------------ */
function bindUI() {
  $('btn-play').addEventListener('click', () => {
    audio.ensure();
    startGame();
  });

  $('btn-pause').addEventListener('click', pauseGame);
  $('btn-resume').addEventListener('click', resumeGame);
  $('btn-restart').addEventListener('click', () => {
    $('pause').classList.add('is-hidden');
    startGame();
  });
  $('btn-again').addEventListener('click', () => {
    $('gameover').classList.add('is-hidden');
    startGame();
  });

  $('btn-menu-settings').addEventListener('click', () => openSettings('menu'));
  $('btn-pause-settings').addEventListener('click', () => openSettings('paused'));
  $('btn-close-settings').addEventListener('click', closeSettings);

  document.querySelectorAll('#lang-seg button').forEach((btn) => {
    btn.addEventListener('click', () => {
      settings.lang = btn.dataset.lang;
      saveSettings();
      voice.setLang(settings.lang);
      document.querySelectorAll('#lang-seg button').forEach((b) => b.classList.toggle('is-on', b === btn));
      hud.setMicState('idle', { live: state.micReady, lang: voice.langLabel });
      hud.toast(`DITADO EM ${settings.lang === 'en-US' ? 'INGLÊS' : 'PORTUGUÊS'}`);
      audio.ui();
    });
  });
  syncLangUI();

  const tiltBtn = $('btn-tilt');
  tiltBtn.addEventListener('click', async () => {
    if (player.tiltEnabled) {
      player.disableTilt();
      settings.tilt = false;
      saveSettings();
      updateTiltUI();
      hud.toast('INCLINAÇÃO DESATIVADA');
      audio.ui();
      return;
    }
    hud.toast('SOLICITANDO PERMISSÃO DE MOVIMENTO…');
    const ok = await player.enableTilt();
    if (!ok) {
      hud.toast('PERMISSÃO DE MOVIMENTO NEGADA', 'is-bad');
      audio.denied();
      return;
    }
    settings.tilt = true;
    saveSettings();
    updateTiltUI();
    audio.ui();
    hud.toast('INCLINAÇÃO ATIVADA · CENTRALIZE O APARELHO');
    setTimeout(() => {
      if (player.tiltEnabled && !player.tiltCalibrated) {
        player.disableTilt();
        settings.tilt = false;
        updateTiltUI();
        hud.toast('SENSOR DE MOVIMENTO NÃO DETECTADO', 'is-warn');
      }
    }, 1600);
  });

  $('btn-recal').addEventListener('click', () => {
    player.recalibrateTilt();
    audio.ui();
    hud.toast('MIRA CENTRALIZADA');
  });

  const sens = $('sens');
  sens.value = String(settings.sens);
  $('sens-value').textContent = `${Number(settings.sens).toFixed(2)}×`;
  sens.addEventListener('input', () => {
    settings.sens = Number(sens.value);
    player.setSensitivity(settings.sens);
    $('sens-value').textContent = `${settings.sens.toFixed(2)}×`;
    saveSettings();
  });

  const soundBtn = $('btn-sound');
  soundBtn.addEventListener('click', () => {
    settings.sound = !settings.sound;
    audio.ensure();
    audio.setEnabled(settings.sound);
    saveSettings();
    updateToggle(soundBtn, settings.sound);
    if (settings.sound) audio.ui();
  });
  updateToggle(soundBtn, settings.sound);

  const hapBtn = $('btn-haptics');
  hapBtn.addEventListener('click', () => {
    settings.haptics = !settings.haptics;
    saveSettings();
    updateToggle(hapBtn, settings.haptics);
    if (settings.haptics) vibrate(20);
    audio.ui();
  });
  updateToggle(hapBtn, settings.haptics);

  $('btn-fullscreen').addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.();
        hud.toast('TELA CHEIA ATIVADA');
      } else {
        await document.exitFullscreen?.();
      }
    } catch {
      hud.toast('TELA CHEIA INDISPONÍVEL NESTE NAVEGADOR', 'is-warn');
    }
  });

  // Fire controls
  const fireBtn = $('btn-fire');
  fireBtn.addEventListener('pointerdown', (e) => {
    if (state.mode !== 'playing') return;
    e.preventDefault();
    fireBtn.setPointerCapture?.(e.pointerId);
    touchFiring = true;
    fireBtn.classList.add('is-down');
    audio.ensure();
  });
  const stopFire = () => {
    touchFiring = false;
    fireBtn.classList.remove('is-down');
  };
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => fireBtn.addEventListener(ev, stopFire));

  window.addEventListener('mousedown', (e) => {
    if (state.mode !== 'playing' || e.button !== 0) return;
    if (e.target?.closest?.('button, input, .screen:not(.is-hidden)')) return;
    mouseFiring = true;
  });
  window.addEventListener('mouseup', () => { mouseFiring = false; });
  window.addEventListener('blur', () => { mouseFiring = false; touchFiring = false; keyFiring = false; });

  window.addEventListener('keydown', (e) => {
    if (isTypingTarget(e.target)) return;
    if (e.code === 'Space' && state.mode === 'playing') {
      e.preventDefault();
      keyFiring = true;
    }
    if (e.code === 'KeyV' && !e.repeat) {
      e.preventDefault();
      startVoice();
    }
    if (e.code === 'Escape') {
      if (state.mode === 'playing') pauseGame();
      else if (state.mode === 'paused') resumeGame();
      else if (!$('settings').classList.contains('is-hidden')) closeSettings();
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') keyFiring = false;
    if (e.code === 'KeyV') endVoice();
  });

  // Push to talk
  holdControl($('btn-voice'), startVoice, endVoice);
  holdControl($('desktop-voice'), startVoice, endVoice);

  // Desktop typed forge
  $('word-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('word-input');
    const value = input.value.trim();
    if (!value) return;
    forgeWord(value, 'typed');
    input.value = '';
    input.blur();
  });

  // Mobile typed forge
  $('btn-type').addEventListener('click', openForgeModal);
  $('btn-close-forge').addEventListener('click', closeForgeModal);
  $('forge-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('forge-input');
    const value = input.value.trim();
    if (!value) return;
    forgeWord(value, 'typed');
    input.value = '';
    closeForgeModal();
  });
  document.querySelectorAll('.forge-samples button').forEach((btn) => {
    btn.addEventListener('click', () => {
      forgeWord(btn.dataset.word, 'typed');
      closeForgeModal();
    });
  });

  window.addEventListener('resize', onResize);
  screen.orientation?.addEventListener?.('change', () => {
    if (player.tiltEnabled) player.recalibrateTilt();
    setTimeout(onResize, 180);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.mode === 'playing') pauseGame();
  });
}

function holdControl(el, onStart, onEnd) {
  if (!el) return;
  el.addEventListener('pointerdown', (e) => {
    if (state.mode !== 'playing') return;
    e.preventDefault();
    e.stopPropagation();
    el.setPointerCapture?.(e.pointerId);
    onStart();
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => {
    el.addEventListener(ev, (e) => {
      e.preventDefault?.();
      onEnd();
    });
  });
  el.addEventListener('contextmenu', (e) => e.preventDefault());
}

function isTypingTarget(el) {
  return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el?.isContentEditable;
}

function onResize() {
  world.resize();
  placeWeaponModel();
}

function updateToggle(btn, on) {
  btn.classList.toggle('is-on', Boolean(on));
  btn.setAttribute('aria-checked', String(Boolean(on)));
  const span = btn.querySelector('span');
  if (span) span.textContent = on ? 'ON' : 'OFF';
}

function updateTiltUI() {
  updateToggle($('btn-tilt'), player.tiltEnabled);
  $('recal-row').hidden = !player.tiltEnabled;
}

function syncLangUI() {
  document.querySelectorAll('#lang-seg button').forEach((b) => {
    b.classList.toggle('is-on', b.dataset.lang === settings.lang);
  });
}

function openSettings(from = 'menu') {
  closeForgeModal(true);
  $('settings').dataset.from = from;
  $('settings').classList.remove('is-hidden');
  audio.ensure();
  audio.ui();
}
function closeSettings() {
  $('settings').classList.add('is-hidden');
  audio.ui();
}

function openForgeModal() {
  if (state.mode !== 'playing') return;
  state.mode = 'forge';
  player.setEnabled(false);
  mouseFiring = false;
  touchFiring = false;
  keyFiring = false;
  $('forge-modal').classList.remove('is-hidden');
  audio.ensure();
  audio.ui();
  setTimeout(() => $('forge-input').focus(), 240);
}
function closeForgeModal(keepMode = false) {
  if ($('forge-modal').classList.contains('is-hidden')) return;
  $('forge-modal').classList.add('is-hidden');
  $('forge-input').blur();
  if (!keepMode && state.mode === 'forge') {
    state.mode = 'playing';
    player.setEnabled(true);
    lastFrame = performance.now();
  }
}

function pauseGame() {
  if (state.mode !== 'playing') return;
  state.mode = 'paused';
  player.setEnabled(false);
  mouseFiring = false;
  touchFiring = false;
  keyFiring = false;
  endVoice();
  hud.pauseStats(state.wave, state.score, state.kills);
  $('pause').classList.remove('is-hidden');
  hud.setVisible(true);
  audio.ui();
}
function resumeGame() {
  if (state.mode !== 'paused') return;
  state.mode = 'playing';
  player.setEnabled(true);
  $('pause').classList.add('is-hidden');
  $('settings').classList.add('is-hidden');
  lastFrame = performance.now();
  audio.ui();
}

function scheduleRotateHint() {
  if (rotateTimer) return;
  rotateTimer = setTimeout(() => {
    if (state.mode !== 'playing') return;
    if (window.innerHeight > window.innerWidth) {
      $('rotate-hint').classList.add('is-on');
      setTimeout(() => $('rotate-hint').classList.remove('is-on'), 9000);
    }
  }, 12000);
}

/* ------------------------------------------------------------ */
boot();
