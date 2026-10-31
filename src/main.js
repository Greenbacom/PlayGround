import * as THREE from 'three';
import './style.css';
import { buildWorld } from './world.js';
import { Controls } from './controls.js';
import { Weapon } from './weapon.js';
import { EnemyManager } from './enemies.js';
import { AudioEngine } from './audio.js';
import { UI } from './ui.js';
import { clamp, damp, rand, randInt, pick, TAU, lerp } from './util.js';

const EYE_HEIGHT = 1.66;
const MAX_HP = 100;
const BOUNDS = { x: 11.2, z: 8.6 };
const START = new THREE.Vector3(0, 0, 6.4);

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ui = new UI();
    this.audio = new AudioEngine();
    this.state = 'boot';
    this.time = 0;
    this.dt = 0;
    this.tmpVector = new THREE.Vector3();

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
    });
    this.pixelCap = window.matchMedia('(pointer: coarse)').matches ? 1.6 : 2;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.pixelCap));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.05, 700);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);

    this.world = buildWorld(this.scene, this.renderer);
    this.weapon = new Weapon(this.camera, this.audio);
    this.weapon.group.visible = false;
    this.enemies = new EnemyManager(this.scene, this.audio, {
      damagePlayer: (amount, source) => this.hurt(amount, source),
      onKill: (enemy, pos) => this.onKill(enemy, pos),
    });

    this.controls = new Controls({
      canvas,
      stickZone: document.getElementById('stickZone'),
      stickBase: document.getElementById('stickBase'),
      stickKnob: document.getElementById('stickKnob'),
      lookZone: document.getElementById('lookZone'),
      fireBtn: document.getElementById('fireBtn'),
      dashBtn: document.getElementById('dashBtn'),
      onDash: () => this.tryDash(),
      onPause: () => this.togglePause(),
    });
    if (!this.controls.isTouch) {
      const hint = document.querySelector('.stick-hint');
      if (hint) hint.textContent = 'WASD PARA ANDAR';
    }

    this.player = {
      pos: START.clone(),
      vel: new THREE.Vector3(),
      yaw: 0,
      pitch: -0.03,
      hp: MAX_HP,
      invuln: 0,
      dashTime: 0,
      dashCd: 0,
      dashDir: new THREE.Vector3(),
      walkPhase: 0,
      moveAmount: 0,
      shake: 0,
    };
    this.cameraBase = new THREE.Vector3();
    this.cameraPos = new THREE.Vector3(START.x, EYE_HEIGHT, START.z);

    this.threatLayer = document.getElementById('threats');
    this.threatEls = [];
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('div');
      el.className = 'threat';
      el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3.5 18 12 8 20.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      this.threatLayer.appendChild(el);
      this.threatEls.push(el);
    }
    this._threatFwd = new THREE.Vector3();
    this._threatRight = new THREE.Vector3();
    this._threatTmp = new THREE.Vector3();

    this.score = 0;
    this.kills = 0;
    this.wave = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.multiplier = 1;
    this.pending = [];
    this.spawnTimer = 0;
    this.intermission = 0;
    this.stateTimer = 0;
    this.dying = false;
    this.pickups = [];
    this.menuTime = 0;
    this.intro = null;
    this.fov = 72;
    this.quality = 1;
    this.weapon.setViewport(window.innerWidth / window.innerHeight);
    this.fpsSamples = [];
    this.lowFpsTime = 0;
    this.ui.setHealth(MAX_HP, MAX_HP);
    this.ui.setScore(0);
    this.ui.updateSoundLabel(this.audio.enabled);

    this._bindUI();
    this._bindResize();

    this.state = 'menu';
    this.weapon.group.visible = false;
    this.ui.showMenu();
    this.setMenuCamera(0);
    this.clock = new THREE.Clock();
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    window.__MORRO__ = this;
  }

  _bindUI() {
    document.getElementById('startBtn').addEventListener('click', () => this.startRun());
    document.getElementById('againBtn').addEventListener('click', () => this.startRun());
    document.getElementById('resumeBtn').addEventListener('click', () => this.resume());
    document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
    document.getElementById('restartBtn').addEventListener('click', () => this.startRun());
    document.getElementById('quitBtn').addEventListener('click', () => this.backToMenu());
    document.getElementById('menuBtn').addEventListener('click', () => this.backToMenu());
    document.getElementById('helpBtn').addEventListener('click', () => { this.audio.init(); this.audio.click(); this.ui.showHelp(); });
    document.getElementById('helpClose').addEventListener('click', () => this.ui.hideHelp());
    document.getElementById('helpPlay').addEventListener('click', () => { this.ui.hideHelp(); this.startRun(); });
    document.getElementById('tiltToggle').addEventListener('click', () => this.toggleTilt());
    document.getElementById('pauseTiltBtn').addEventListener('click', () => this.toggleTilt());
    document.getElementById('recalBtn').addEventListener('click', () => {
      this.controls.tilt.calibrate();
      this.audio.click();
      this.ui.toast('Inclinação recalibrada');
    });
    document.getElementById('soundToggle').addEventListener('click', () => this.toggleSound());
    document.getElementById('pauseSoundBtn').addEventListener('click', () => this.toggleSound());
    document.getElementById('rotateClose').addEventListener('click', () => this.ui.el.rotateToast.classList.add('hidden'));

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && (this.state === 'playing' || this.state === 'intro')) this.togglePause();
    });
    window.addEventListener('blur', () => {
      if (this.state === 'playing') this.togglePause();
    });
  }

  _bindResize() {
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.pixelCap) * this.quality);
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.weapon.setViewport(w / h);
    });
  }

  async toggleTilt() {
    this.audio.init();
    if (this.controls.tilt.enabled) {
      this.controls.tilt.disable();
      this.ui.updateTiltLabel(false);
      this.ui.setTiltActive(false);
      this.ui.toast('Inclinação desligada');
      return;
    }
    this.ui.updateTiltLabel(false);
    this.ui.el.tiltHint.textContent = 'Aguardando o sensor…';
    try {
      const result = await this.controls.tilt.enable();
      if (result.ok) {
        this.ui.updateTiltLabel(true);
        this.ui.setTiltActive(this.state === 'playing' || this.state === 'intro');
        this.audio.click();
        this.ui.toast('Inclinação ativa — vire o aparelho para mirar');
      } else {
        this.ui.updateTiltLabel(false, result.reason);
      }
    } catch (error) {
      this.ui.updateTiltLabel(false, 'error');
    }
  }

  toggleSound() {
    this.audio.init();
    this.audio.setEnabled(!this.audio.enabled);
    this.ui.updateSoundLabel(this.audio.enabled);
    this.audio.click();
  }

  setMenuCamera(t) {
    const cam = this.camera;
    const px = 7.8 + Math.sin(t * 0.05) * 1.5;
    const py = 3.9 + Math.sin(t * 0.12) * 0.2;
    const pz = 7.9 + Math.cos(t * 0.05) * 1.0;
    cam.position.set(px, py, pz);
    const look = this.tmpVector.set(-3.4 + Math.sin(t * 0.04) * 1.4, 2.35 + Math.sin(t * 0.09) * 0.18, -5.2);
    cam.lookAt(look);
    this.fov = 64;
    cam.fov = 64;
    cam.updateProjectionMatrix();
  }

  startRun() {
    this.audio.init();
    this.audio.setEnabled(this.audio.enabled);
    this.audio.update();
    try {
      if (document.fullscreenEnabled && !document.fullscreenElement && this.controls.isTouch) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      }
    } catch {}

    this.resetRun();
    this._clearThreats();
    this.ui.hideAllScreens();
    this.ui.showHud();
    this.weapon.group.visible = true;
    this.intro = {
      pos: this.camera.position.clone(),
      yaw: this._yawFromCamera(),
      pitch: this.camera.rotation.x,
      t: 0,
      duration: 0.5,
    };
    this.state = 'intro';
    this.stateTimer = 0;
    this.controls.setEnabled(true);
    this.audio.setIntensity(1.2);
    this.audio.waveStart(1);
    this.ui.banner('BEM-VINDO AO MORRO', 'DEFENDA O TERRITÓRIO');
    this.ui.setBoss(null);
    this.ui.updateTiltLabel(this.controls.tilt.enabled);
    this.ui.setTiltActive(this.controls.tilt.enabled);
    this.ui.hideCombo();
    this.ui.setHeat(0, false);
    this.ui.setDash(0);
    const touchHints = this.controls.isTouch || window.innerWidth < 820;
    this.ui.toast(touchHints ? 'Arraste para olhar · segure AÇAÍ para atirar' : 'WASD para andar · mouse para mirar · clique para atirar', 4200);
    if (window.innerHeight > window.innerWidth && this.controls.isTouch) this.ui.showRotateHint();
  }

  resetRun() {
    this.score = 0;
    this.kills = 0;
    this.wave = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.multiplier = 1;
    this.pending = [];
    this.intermission = 0;
    this.spawnTimer = 0;
    this.dying = false;
    this.player.pos.copy(START);
    this.player.vel.set(0, 0, 0);
    this.player.yaw = 0;
    this.player.pitch = -0.03;
    this.player.hp = MAX_HP;
    this.player.invuln = 0.6;
    this.player.dashTime = 0;
    this.player.dashCd = 0;
    this.player.shake = 0;
    this.player.walkPhase = 0;
    this.player.moveAmount = 0;
    this.cameraPos.set(START.x, EYE_HEIGHT, START.z);
    this.camera.fov = 72;
    this.camera.updateProjectionMatrix();
    this.fov = 72;
    this.weapon.reset();
    this.enemies.reset();
    this._clearPickups();
    this.ui.setHealth(MAX_HP, MAX_HP);
    this.ui.setScore(0);
    this.ui.setWave(1);
    this.ui.setBoss(null);
    this.ui.setHeat(0, false);
    this.ui.setDash(0);
    this.ui.hideCombo();
    this.audio.setIntensity(1.2);
  }

  _yawFromCamera() {
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    return Math.atan2(-dir.x, -dir.z);
  }

  backToMenu() {
    this.state = 'menu';
    this.controls.setEnabled(false);
    this.controls.tilt.available = this.controls.tilt.enabled;
    this.enemies.reset();
    this._clearPickups();
    this._clearThreats();
    this.weapon.group.visible = false;
    this.ui.showMenu();
    this.ui.setTiltActive(false);
    this.audio.setIntensity(1);
    this.setMenuCamera(this.menuTime);
  }

  togglePause() {
    if (this.state === 'playing' || this.state === 'intro') {
      this.pausedFrom = this.state;
      this.state = 'paused';
      this._clearThreats();
      this.controls.setEnabled(false);
      this.ui.showPause({ wave: this.wave || 1, score: this.score, kills: this.kills });
      this.audio.click();
    } else if (this.state === 'paused') {
      this.resume();
    }
  }

  resume() {
    if (this.state !== 'paused') return;
    this.state = this.pausedFrom || 'playing';
    this.controls.setEnabled(true);
    this.ui.hidePause();
    this.audio.click();
  }

  tryDash() {
    if (this.state !== 'playing' && this.state !== 'intro') return;
    const p = this.player;
    if (p.dashCd > 0 || p.dashTime > 0) return;
    const move = this.controls.move;
    const dir = new THREE.Vector3();
    if (Math.abs(move.x) + Math.abs(move.y) > 0.15) {
      const forward = new THREE.Vector3(-Math.sin(p.yaw), 0, -Math.cos(p.yaw));
      const right = new THREE.Vector3(Math.cos(p.yaw), 0, -Math.sin(p.yaw));
      dir.addScaledVector(forward, move.y).addScaledVector(right, move.x);
    } else {
      dir.set(-Math.sin(p.yaw), 0, -Math.cos(p.yaw));
    }
    if (dir.lengthSq() < 0.001) dir.set(0, 0, -1);
    p.dashDir.copy(dir.normalize());
    p.dashTime = 0.18;
    p.dashCd = 2.3;
    p.invuln = Math.max(p.invuln, 0.32);
    this.audio.dash();
    this.player.shake = Math.max(this.player.shake, 0.25);
    this.enemies.fx.burst(this.cameraPos.clone().setY(0.6), 0x38e08a, 14, { speed: 4, size: 0.12, life: 0.4, gravity: 0 });
  }

  hurt(amount, source) {
    if (this.state !== 'playing') return;
    const p = this.player;
    if (p.invuln > 0 || this.dying) return;
    p.hp -= amount;
    p.invuln = 0.42;
    p.shake = Math.min(1, p.shake + 0.55);
    this.audio.damage();
    this.ui.damage();
    this.ui.setHealth(Math.max(0, p.hp), MAX_HP);
    this.combo = 0;
    this.multiplier = 1;
    this.comboTimer = 0;
    this.ui.hideCombo();
    if (p.hp <= 0) this.die();
  }

  die() {
    if (this.dying) return;
    this.dying = true;
    this.state = 'dying';
    this.controls.setEnabled(false);
    this._clearThreats();
    this.stateTimer = 0;
    this.audio.gameOver();
    this.audio.setIntensity(1);
    this.ui.setHealth(0, MAX_HP);
    this.ui.setBoss(null);
    this.ui.banner('O MORRO CHORA', 'MAS NÃO SE ENTREGA');
    this.ui.hideCombo();
  }

  onKill(enemy, pos) {
    this.kills += 1;
    this.combo += 1;
    this.comboTimer = 3.2;
    this.multiplier = Math.min(6, 1 + Math.floor(this.combo / 3));
    const gained = Math.round(enemy.score * this.multiplier);
    this.score += gained;
    this.ui.setScore(this.score);
    this.ui.combo(this.multiplier);
    this.ui.hit(true);
    this._popupAt(pos, `+${gained}`, enemy.type === 'boss' ? '#ff9a2e' : '#ffe6b0', enemy.type === 'boss');
    if (enemy.type === 'boss') {
      this.ui.banner('BOITATÁ CAÍDO', 'O MORRO RESPIRA');
      this.ui.setBoss(null);
      this.spawnPickup('heal', this._safeDrop(pos));
      this.spawnPickup('acai', this._safeDrop(this._safeDrop(pos), 1.4));
      this.audio.setIntensity(2.4);
    } else {
      const roll = Math.random();
      if (roll < 0.1) this.spawnPickup('heal', this._safeDrop(pos));
      else if (roll < 0.16) this.spawnPickup('acai', this._safeDrop(pos));
    }
    this.world.capivaraHop();
  }

  _safeDrop(pos, offset = 0) {
    const x = clamp(pos.x + rand(-offset - 0.6, offset + 0.6), -BOUNDS.x + 1, BOUNDS.x - 1);
    const z = clamp(pos.z + rand(-offset - 0.6, offset + 0.6), -BOUNDS.z + 1, BOUNDS.z - 1);
    return new THREE.Vector3(x, 0.7, z);
  }

  _popupAt(pos, text, color, big = false) {
    const v = pos.clone().project(this.camera);
    if (v.z > 1) return;
    const x = (v.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
    this.ui.pop(text, x, y, color, big);
  }

  // ---------------- pickups ----------------
  spawnPickup(kind, pos) {
    const group = new THREE.Group();
    group.position.copy(pos);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.enemies.mat.lightGlow.map,
      color: kind === 'heal' ? 0x38e08a : 0xc084fc,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.85,
    }));
    glow.scale.set(2.2, 2.2, 1);
    group.add(glow);

    let mesh;
    if (kind === 'heal') {
      const can = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.42, 12), new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.3, metalness: 0.5, emissive: 0x0f7a35, emissiveIntensity: 0.5 }));
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.13, 12), new THREE.MeshStandardMaterial({ color: 0xffd400, roughness: 0.4, metalness: 0.2, emissive: 0xb38f00, emissiveIntensity: 0.6 }));
      can.add(body, band);
      mesh = can;
    } else {
      const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 8, 0, TAU, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x3b1450, roughness: 0.5 }));
      bowl.rotation.x = Math.PI;
      const acai = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 8, 0, TAU, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x6d28d9, emissiveIntensity: 0.9, roughness: 0.3 }));
      acai.rotation.x = Math.PI;
      acai.position.y = 0.02;
      mesh = new THREE.Group();
      mesh.add(bowl, acai);
    }
    mesh.position.y = 0;
    group.add(mesh);
    this.scene.add(group);
    this.pickups.push({ kind, group, mesh, life: 20, bob: rand(0, TAU), collected: false });
  }

  _clearPickups() {
    for (const p of this.pickups) this.scene.remove(p.group);
    this.pickups.length = 0;
  }

  _updatePickups(dt, time) {
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const p = this.pickups[i];
      p.life -= dt;
      p.group.rotation.y += dt * 1.6;
      p.mesh.rotation.y += dt * 2.2;
      p.group.position.y = 0.75 + Math.sin(time * 2.4 + p.bob) * 0.12;
      const dx = p.group.position.x - this.player.pos.x;
      const dz = p.group.position.z - this.player.pos.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 3.2) {
        const pull = (3.2 - dist) / 3.2;
        p.group.position.x -= dx * pull * dt * 4;
        p.group.position.z -= dz * pull * dt * 4;
      }
      if (dist < 0.85 && Math.abs(p.group.position.y - 1.1) < 1.2) {
        this.collectPickup(p);
        this.scene.remove(p.group);
        this.pickups.splice(i, 1);
        continue;
      }
      if (p.life <= 0) {
        this.scene.remove(p.group);
        this.pickups.splice(i, 1);
      }
    }
  }

  collectPickup(p) {
    if (p.kind === 'heal') {
      this.player.hp = Math.min(MAX_HP, this.player.hp + 30);
      this.ui.setHealth(this.player.hp, MAX_HP);
      this.ui.heal();
      this.ui.toast('GUARANÁ +30 DE VIDA', 1400);
      this.audio.pickup(false);
    } else {
      this.weapon.setOvercharge(9);
      this.ui.toast('AÇAÍ TURBINADO — CANO FRIO POR 9s', 1900);
      this.audio.pickup(true);
      this.player.shake = Math.max(this.player.shake, 0.15);
    }
  }

  // ---------------- waves ----------------
  startWave(n) {
    this.wave = n;
    this.ui.setWave(n, n % 5 === 0 ? 'BOITATÁ DESPERTO' : 'DEFENDA O MORRO');
    this.audio.waveStart(n);
    this.audio.setIntensity(n % 5 === 0 ? 3 : n >= 6 ? 2.5 : n >= 3 ? 2 : 1.3);
    this.pending = [];
    if (n % 5 === 0) {
      const bossIndex = Math.floor(n / 5);
      this.pending.push({ type: 'boss' });
      const extra = 2 + bossIndex;
      for (let i = 0; i < extra; i++) this.pending.push({ type: 'saci', delay: 1.4 + i * 0.5 });
      this.ui.banner('BOITATÁ', 'A SERPENTE DE FOGO DESPERTOU');
    } else {
      const sacis = 3 + Math.round(n * 1.25);
      const mulas = n >= 3 ? Math.min(4, Math.floor((n - 1) / 2)) : 0;
      for (let i = 0; i < sacis; i++) this.pending.push({ type: 'saci' });
      for (let i = 0; i < mulas; i++) this.pending.push({ type: 'mula' });
      // shuffle but never open with a mula
      for (let i = this.pending.length - 1; i > 0; i--) {
        const j = randInt(0, i);
        [this.pending[i], this.pending[j]] = [this.pending[j], this.pending[i]];
      }
      if (this.pending[0]?.type === 'mula') {
        const si = this.pending.findIndex((x) => x.type === 'saci');
        if (si > 0) [this.pending[0], this.pending[si]] = [this.pending[si], this.pending[0]];
      }
      this.ui.banner(`ONDA ${String(n).padStart(2, '0')}`, mulas ? 'SACIS E MULAS À VISTA' : 'SACIS À VISTA');
    }
    this.spawnTimer = n === 1 ? 0.9 : 1.15;
    this.intermission = 0;
    this.waveSpawned = 0;
    this.waveTotal = this.pending.length;
    if (n === 1 && this.pending.length > 0) {
      // Put the first target on screen the moment the run begins.
      this.spawnFromPlan(this.pending.shift());
    }
  }

  spawnFromPlan(entry) {
    const pts = this.world.spawnPoints;
    if (entry.type === 'boss') {
      const pos = new THREE.Vector3(0, 5.6, -17);
      this.enemies.spawnBoss(Math.floor(this.wave / 5), pos);
      this.ui.setBoss(1);
      return;
    }
    if (this.enemies.enemies.length >= 10) return false;
    if (entry.type === 'mula') {
      const angle = rand(0, TAU);
      const pos = new THREE.Vector3(Math.sin(angle) * rand(16, 21), 1.6 + rand(0, 2.5), Math.cos(angle) * rand(14, 19));
      this.enemies.spawnMula(this.wave, pos);
    } else {
      let pos;
      if (this.wave === 1 && this.waveSpawned === 0) {
        // Open the first wave with a clear target dead ahead.
        pos = new THREE.Vector3(rand(-1.4, 1.4), 3.9, -12.5);
      } else {
        pos = pick(pts).clone();
        pos.x += rand(-2.5, 2.5);
        pos.z += rand(-2.5, 2.5);
      }
      this.enemies.spawnSaci(this.wave, pos);
    }
    this.waveSpawned++;
    return true;
  }

  _updateWaves(dt) {
    if (this.intermission > 0) {
      this.intermission -= dt;
      const secs = Math.ceil(this.intermission);
      this.ui.el.waveSub.textContent = `PRÓXIMA EM ${secs}`;
      if (this.intermission <= 0) this.startWave(this.wave + 1);
      return;
    }
    this.spawnTimer -= dt;
    if (this.pending.length > 0 && this.spawnTimer <= 0) {
      const entry = this.pending[0];
      if (entry.type === 'boss' || this.enemies.enemies.length < 10) {
        this.pending.shift();
        this.spawnFromPlan(entry);
        this.spawnTimer = entry.type === 'boss' ? 1.6 : rand(0.55, 1.25);
      } else {
        this.spawnTimer = 0.4;
      }
    }
    if (this.pending.length === 0 && this.enemies.enemies.length === 0 && this.state === 'playing') {
      // wave cleared
      this.intermission = 5;
      this.ui.banner('ONDA LIMPA', 'RESPIRE. O MORRO É SEU.');
      this.ui.hideCombo();
      this.audio.setIntensity(1.4);
      this.combo = 0;
      this.multiplier = 1;
      this.world.capivaraHop();
      if (this.player.hp < MAX_HP) {
        this.player.hp = Math.min(MAX_HP, this.player.hp + 10);
        this.ui.setHealth(this.player.hp, MAX_HP);
        this.ui.heal();
      }
      this.spawnPickup('heal', this._safeDrop(new THREE.Vector3(this.player.pos.x, 0.7, this.player.pos.z), 2));
    }
  }

  // ---------------- player ----------------
  _updatePlayer(dt) {
    const p = this.player;
    const controls = this.controls;
    controls.update(dt);

    if (this.state === 'playing' || this.state === 'intro') {
      const look = controls.consumeLook();
      p.yaw -= look.x;
      p.pitch = clamp(p.pitch - look.y, -1.25, 1.15);
    }

    const tilt = controls.tilt;
    const yaw = p.yaw - tilt.offset.x;
    const pitch = clamp(p.pitch + tilt.offset.y, -1.3, 1.25);

    p.invuln = Math.max(0, p.invuln - dt);
    p.dashCd = Math.max(0, p.dashCd - dt);
    p.dashTime = Math.max(0, p.dashTime - dt);
    p.shake = Math.max(0, p.shake - dt * 2.4);

    const move = controls.move;
    const moveMag = Math.min(1, Math.hypot(move.x, move.y));
    p.moveAmount = damp(p.moveAmount, moveMag, 10, dt);

    const forward = this.tmpVector.set(-Math.sin(p.yaw), 0, -Math.cos(p.yaw));
    const right = new THREE.Vector3(Math.cos(p.yaw), 0, -Math.sin(p.yaw));
    const desired = new THREE.Vector3();
    desired.addScaledVector(forward, move.y).addScaledVector(right, move.x);
    if (desired.lengthSq() > 1) desired.normalize();
    const speed = 5.1;
    desired.multiplyScalar(speed);

    if (p.dashTime > 0) {
      desired.copy(p.dashDir).multiplyScalar(19);
      p.walkPhase += dt * 22;
    } else if (moveMag > 0.05) {
      p.walkPhase += dt * (6 + moveMag * 6);
    }

    p.vel.x = damp(p.vel.x, desired.x, 12, dt);
    p.vel.z = damp(p.vel.z, desired.z, 12, dt);
    p.pos.x += p.vel.x * dt;
    p.pos.z += p.vel.z * dt;

    // arena bounds
    p.pos.x = clamp(p.pos.x, -BOUNDS.x, BOUNDS.x);
    p.pos.z = clamp(p.pos.z, -BOUNDS.z, BOUNDS.z);

    // prop collision push-out
    for (const o of this.world.obstacles) {
      const dx = p.pos.x - o.x;
      const dz = p.pos.z - o.z;
      const d = Math.hypot(dx, dz);
      const min = o.r + 0.35;
      if (d < min && d > 0.0001) {
        const push = (min - d) / d;
        p.pos.x += dx * push;
        p.pos.z += dz * push;
      }
    }

    // camera
    const bob = Math.sin(p.walkPhase) * 0.028 * p.moveAmount + Math.sin(this.time * 1.3) * 0.004;
    const strafe = Math.cos(p.walkPhase * 0.5) * 0.01 * p.moveAmount;
    this.cameraPos.set(p.pos.x, EYE_HEIGHT + bob + (p.dashTime > 0 ? -0.06 : 0), p.pos.z);
    this.cameraPos.x += Math.cos(yaw) * strafe;
    this.cameraPos.z -= Math.sin(yaw) * strafe;
    if (p.shake > 0.001) {
      const s = p.shake * p.shake * 0.16;
      this.cameraPos.x += rand(-s, s);
      this.cameraPos.y += rand(-s, s) * 0.6;
      this.cameraPos.z += rand(-s, s);
    }
    this.camera.position.copy(this.cameraPos);
    this.camera.rotation.set(pitch + p.shake * 0.01 * rand(-1, 1), yaw + p.shake * 0.012 * rand(-1, 1), 0, 'YXZ');

    const targetFov = p.dashTime > 0 ? 79 : 72;
    this.fov = damp(this.fov, targetFov, 8, dt);
    if (Math.abs(this.camera.fov - this.fov) > 0.01) {
      this.camera.fov = this.fov;
      this.camera.updateProjectionMatrix();
    }
  }

  _tryFire() {
    if (this.state !== 'playing') return;
    if (!this.controls.firing) return;
    const now = this.time;
    if (!this.weapon.tryFire(now)) return;
    this.audio.shoot();

    const origin = this.camera.position.clone();
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);

    let assist = null;
    if (this.controls.isTouch) {
      assist = this.enemies.bestAssistTarget(origin, dir, 0.15);
    } else {
      assist = this.enemies.bestAssistTarget(origin, dir, 0.08);
    }
    if (assist) {
      const aimPoint = assist.root.position.clone();
      if (assist.type === 'boss') aimPoint.y += 0.2;
      dir.copy(aimPoint).sub(origin).normalize();
    }

    const hit = this.enemies.raycast(origin, dir, 90);
    const muzzle = this.weapon.muzzleWorld(new THREE.Vector3());
    let endPoint;
    if (hit) {
      endPoint = hit.point;
      const killed = this.enemies.damage(hit.enemy, 12, hit.point);
      this.audio.hit(false);
      this.ui.hit(killed);
      this.enemies.fx.burst(hit.point, this.weapon.overcharge > 0 ? 0xc084fc : 0xffd08a, 7, { speed: 3, size: 0.1, life: 0.3, gravity: 0 });
    } else {
      endPoint = origin.clone().addScaledVector(dir, 55);
      this.enemies.fx.spark(endPoint, null, 0x8b5cf6, 3);
    }
    this.enemies.fx.tracer(muzzle, endPoint, this.weapon.overcharge > 0 ? 0xd8b4fe : 0xc084fc);
    this.player.shake = Math.max(this.player.shake, 0.06);
  }

  _updateCombo(dt) {
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        this.multiplier = 1;
        this.ui.hideCombo();
      }
    }
  }

  _updateHud() {
    this.ui.setHeat(this.weapon.heat, this.weapon.overheated);
    this.ui.setDash(this.player.dashCd > 0 ? this.player.dashCd / 2.3 : 0);
    if (this.enemies.boss) this.ui.setBoss(this.enemies.bossHp);
    else if (!this.ui.el.bossBar.classList.contains('hidden') && !this.enemies.boss) this.ui.setBoss(null);
    this._updateThreats();
  }

  _clearThreats() {
    for (const el of this.threatEls) el.classList.remove('on', 'boss', 'pulse');
  }

  // Arrows on the screen edge point to enemies outside the camera view.
  _updateThreats() {
    const cam = this.camera;
    cam.updateMatrixWorld();
    const fwd = this._threatFwd.set(0, 0, -1).applyQuaternion(cam.quaternion);
    fwd.y = 0;
    if (fwd.lengthSq() < 0.0001) fwd.set(0, 0, -1);
    else fwd.normalize();
    const right = this._threatRight.set(-fwd.z, 0, fwd.x);

    const list = this.enemies.enemies
      .filter((e) => !e.dead && e.root.visible)
      .map((e) => ({ e, d: e.root.position.distanceToSquared(cam.position) }))
      .sort((a, b) => a.d - b.d);

    let n = 0;
    for (const { e } of list) {
      if (n >= this.threatEls.length) break;
      const p = this._threatTmp.copy(e.root.position);
      p.y += e.type === 'boss' ? 1.4 : 0.25;
      const dx = p.x - cam.position.x;
      const dz = p.z - cam.position.z;
      const dotF = dx * fwd.x + dz * fwd.z;
      const proj = p.project(cam);
      const onScreen = dotF > 0.4 && proj.z < 1 && Math.abs(proj.x) < 0.86 && Math.abs(proj.y) < 0.78;
      if (onScreen) continue; // already visible under the crosshair

      let nx;
      let ny;
      if (dotF > 0.4 && proj.z < 1) {
        nx = proj.x;
        ny = proj.y;
        const m = Math.max(Math.abs(nx) / 0.9, Math.abs(ny) / 0.8, 1);
        nx /= m;
        ny /= m;
      } else {
        // Behind the player: place the arrow at the edge matching the bearing.
        const bearing = Math.atan2(dx * right.x + dz * right.z, dotF);
        let sx = Math.sin(bearing);
        let sy = -Math.cos(bearing);
        const m = Math.max(Math.abs(sx) / 0.92, Math.abs(sy) / 0.82, 1);
        sx /= m;
        sy /= m;
        nx = sx;
        ny = -sy;
      }

      const angle = Math.atan2(-ny, nx);
      const el = this.threatEls[n++];
      el.classList.add('on');
      el.classList.toggle('boss', e.type === 'boss');
      el.classList.toggle('pulse', e.type === 'boss' || e.windup > 0.12);
      el.style.left = `${((nx * 0.5 + 0.5) * 100).toFixed(2)}%`;
      el.style.top = `${((-ny * 0.5 + 0.5) * 100).toFixed(2)}%`;
      el.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
    }
    for (let i = n; i < this.threatEls.length; i++) {
      this.threatEls[i].classList.remove('on', 'boss', 'pulse');
    }
  }

  update(dt) {
    this.time += dt;
    const playing = this.state === 'playing' || this.state === 'intro' || this.state === 'dying';
    if (this.state === 'menu') {
      this.menuTime += dt;
      this.world.update(dt);
      this.setMenuCamera(this.menuTime);
      this.enemies.update(dt, this.time, this.player.pos, this.cameraPos);
      return;
    }

    if (this.state === 'paused') {
      return;
    }

    this.world.update(dt);

    if (this.state === 'intro') {
      this._updatePlayer(dt);
      this.intro.t += this.dtRaw || dt;
      const k = clamp(this.intro.t / this.intro.duration, 0, 1);
      const e = k * k * (3 - 2 * k);
      const targetPos = new THREE.Vector3(this.player.pos.x, EYE_HEIGHT, this.player.pos.z);
      this.camera.position.lerpVectors(this.intro.pos, targetPos, e);
      const targetYaw = this.player.yaw;
      const yaw = this.intro.yaw + (targetYaw - this.intro.yaw) * e;
      const pitch = this.intro.pitch + (this.player.pitch - this.intro.pitch) * e;
      this.camera.rotation.set(pitch, yaw, 0, 'YXZ');
      this.fov = lerp(this.fov, 72, e);
      this.camera.fov = this.fov;
      this.camera.updateProjectionMatrix();
      this.weapon.group.visible = e > 0.55;
      this.ui.setHeat(this.weapon.heat, this.weapon.overheated);
      if (k >= 1) {
        this.state = 'playing';
        this.startWave(1);
      }
      this.enemies.update(dt, this.time, this.player.pos, new THREE.Vector3(this.player.pos.x, EYE_HEIGHT, this.player.pos.z));
      this.weapon.update(dt, this.player.moveAmount, false);
      this.enemies.fx.update(dt);
      return;
    }

    if (this.state === 'dying') {
      this.stateTimer += dt;
      this.player.shake = Math.max(0, this.player.shake - dt);
      this.camera.position.y = damp(this.camera.position.y, 0.7, 2.2, dt);
      this.camera.rotation.z = damp(this.camera.rotation.z, 0.32, 2.4, dt);
      this.enemies.update(dt * 0.35, this.time, this.player.pos, this.cameraPos);
      this.weapon.update(dt, 0, false);
      if (this.stateTimer > 1.5) {
        this.state = 'gameover';
        this.enemies.reset();
        this.ui.showGameOver({ wave: this.wave, score: this.score, kills: this.kills });
        this.weapon.group.visible = false;
      }
      return;
    }

    // playing
    this._updatePlayer(dt);
    this._tryFire();
    this.weapon.update(dt, this.player.moveAmount, this.controls.firing);
    this.enemies.update(dt, this.time, this.player.pos, new THREE.Vector3(this.player.pos.x, EYE_HEIGHT, this.player.pos.z));
    this._updatePickups(dt, this.time);
    this._updateWaves(dt);
    this._updateCombo(dt);
    this._updateHud();
    if (this.controls.tilt.enabled) this.ui.setTiltActive(true);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  _loop() {
    requestAnimationFrame(this._loop);
    const raw = this.clock.getDelta();
    this.dtRaw = Math.min(raw, 0.5);
    const dt = Math.min(raw, 0.05);
    this.dt = dt;
    this._trackQuality(raw);
    this.audio.update();
    try {
      this.update(dt);
      this.render();
    } catch (error) {
      console.error(error);
    }
  }

  _trackQuality(raw) {
    if (!raw) return;
    this.fpsSamples.push(1 / raw);
    if (this.fpsSamples.length > 90) this.fpsSamples.shift();
    this.qualityTimer = (this.qualityTimer || 0) + raw;
    if (this.qualityTimer < 3) return;
    this.qualityTimer = 0;
    const avg = this.fpsSamples.reduce((a, b) => a + b, 0) / this.fpsSamples.length;
    if (avg < 42 && this.quality > 0.65) {
      this.quality = Math.max(0.65, this.quality * 0.85);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.pixelCap) * this.quality);
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    } else if (avg > 57 && this.quality < 1) {
      this.quality = Math.min(1, this.quality + 0.1);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.pixelCap) * this.quality);
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    }
  }
}

function boot() {
  const canvas = document.getElementById('game');
  try {
    const game = new Game(canvas);
    game.ui.hideBoot();
    document.getElementById('boot')?.classList.add('done');
  } catch (error) {
    console.error(error);
    const bootEl = document.getElementById('boot');
    if (bootEl) {
      bootEl.innerHTML = `<div class="boot-logo">SEM SINAL</div><p style="max-width:280px;text-align:center;font-size:12px;color:#cdbbdd;line-height:1.6">Este navegador não conseguiu abrir o WebGL. Tente atualizar ou usar outro aparelho.</p>`;
    }
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') boot();
else window.addEventListener('DOMContentLoaded', boot);
