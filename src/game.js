import * as THREE from "three";
import { buildWorld, updateWorld } from "./world.js";
import { createWeapon } from "./weapon.js";
import { AudioEngine } from "./audio.js";
import { ENEMY_TYPES, createEnemyVisual, disposeObject3D } from "./enemies.js";
import { Particles, Tracers, createHealthPickup } from "./fx.js";

const MAG_SIZE = 30;
const MAX_HEALTH = 100;
const PLAY_RADIUS = 21.25;
const EYE_HEIGHT = 1.68;
const STORAGE_BEST = "praca-do-sol-best";
const STORAGE_SENS = "praca-do-sol-sens";

const WAVE_TEXT = {
  1: ["A NÉVOA CHEGA", "PROTEJA O CORETO"],
  2: ["ELAS OUVIRAM O RITMO", "NÃO PARE DE ATIRAR"],
  3: ["TAMBORES NA PRAÇA", "A NÉVOA ESTÁ MAIS FORTE"],
  4: ["ÚLTIMO REFRÃO", "ANTES DO SILÊNCIO"],
  5: ["A NÉVOA-MÃE", "ACENDA O CORETO"],
};

const WAVE_QUEUES = {
  1: ["vespa", "vespa", "olho", "vespa"],
  2: ["vespa", "olho", "vespa", "vespa", "olho", "vespa"],
  3: ["olho", "vespa", "tambor", "vespa", "olho", "vespa", "tambor", "vespa"],
  4: ["vespa", "tambor", "olho", "olho", "vespa", "tambor", "vespa", "olho", "vespa", "tambor"],
  5: ["mother", "vespa", "olho", "vespa", "tambor", "olho", "vespa"],
};

const MAX_ALIVE = { 1: 3, 2: 4, 3: 5, 4: 6, 5: 6 };
const SPAWN_INTERVAL = { 1: 1.4, 2: 1.15, 3: 1.0, 4: 0.82, 5: 0.72 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function damp(current, target, lambda, dt) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

function padScore(value) {
  return String(Math.max(0, Math.floor(value))).padStart(6, "0");
}

function loadNumber(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw.trim() === "") return fallback;
    const value = Number(raw);
    return Number.isFinite(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function storeNumber(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // Storage can be disabled in private browsing. The game still works.
  }
}

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.state = "boot";
    this.time = 0;
    this.worldTime = 0;
    this.titleTime = 0;
    this.clock = new THREE.Clock();
    this.audio = new AudioEngine();
    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.damageFlash = 0;
    this.shake = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.crosshairFire = 0;
    this.tiltScreenAngle = 0;
    this.tilt = {
      on: false,
      calibrated: false,
      baseH: 0,
      baseV: 0,
      raw: { beta: 0, gamma: 0, alpha: 0 },
      lastEvent: 0,
    };
    this.input = {
      moveX: 0,
      moveY: 0,
      fire: false,
      lookId: null,
      lastX: 0,
      lastY: 0,
      lookDX: 0,
      lookDY: 0,
      keys: new Set(),
    };
    this.player = {
      x: 0,
      z: 17,
      yaw: 0,
      pitch: -0.03,
      jumpY: 0,
      jumpVel: 0,
      grounded: true,
      bob: 0,
      speed: 0,
      health: MAX_HEALTH,
      invuln: 0,
      landing: 0,
    };
    this.run = {
      wave: 0,
      waveActive: false,
      waveDelay: 0,
      queue: [],
      spawned: 0,
      spawnTimer: 0,
      score: 0,
      combo: 0,
      comboTimer: 0,
      shots: 0,
      hits: 0,
      kills: 0,
      ammo: MAG_SIZE,
      reloading: false,
      ended: false,
      startAt: 0,
    };
    this.sensitivity = clamp(loadNumber(STORAGE_SENS, 1), 0.55, 1.8);
    this.best = loadNumber(STORAGE_BEST, 0);
    this.isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    this.isFine = window.matchMedia("(pointer: fine)").matches;
    this.tmpV = new THREE.Vector3();
    this.tmpV2 = new THREE.Vector3();
    this.forward = new THREE.Vector3();
    this.rayOrigin = new THREE.Vector3();
    this.rayDir = new THREE.Vector3();
    this.lastHit = new THREE.Vector3();
    this.radarTimer = 0;
    this.aimTarget = null;
    this.bossEnemy = null;
    this.quality = { ratio: Math.min(window.devicePixelRatio || 1, this.isTouch ? 1.65 : 2), slowTime: 0, degraded: false };
    this.joyMax = 42;
    this._startHideTimer = null;
    this._toastTimer = null;
    this._feedTimers = [];
    this.setupRefs();
  }

  setupRefs() {
    const byId = (id) => document.getElementById(id);
    this.refs = {
      loading: byId("loading"),
      hud: byId("hud"),
      startScreen: byId("start-screen"),
      startBtn: byId("start-btn"),
      motionStart: byId("motion-toggle-start"),
      soundStart: byId("sound-toggle-start"),
      bestLine: byId("best-line"),
      waveNum: byId("wave-num"),
      score: byId("score"),
      combo: byId("combo"),
      bossWrap: byId("boss-wrap"),
      bossBar: byId("boss-bar"),
      bossPct: byId("boss-pct"),
      healthNum: byId("health-num"),
      healthBar: byId("health-bar"),
      vitals: document.querySelector(".vitals"),
      vitalNote: byId("vital-note"),
      radar: byId("radar"),
      crosshair: byId("crosshair"),
      hitmarker: byId("hitmarker"),
      banner: byId("wave-banner"),
      bannerKicker: byId("banner-kicker"),
      bannerTitle: byId("banner-title"),
      bannerSub: byId("banner-sub"),
      feed: byId("feed"),
      toast: byId("toast"),
      joystick: byId("joystick"),
      knob: byId("joystick-knob"),
      jumpBtn: byId("jump-btn"),
      reloadBtn: byId("reload-btn"),
      fireBtn: byId("fire-btn"),
      ammo: byId("ammo"),
      ammoPips: byId("ammo-pips"),
      ammoWrap: document.querySelector(".ammo-wrap"),
      reloadNote: byId("reload-note"),
      pauseBtn: byId("pause-btn"),
      soundBtn: byId("sound-btn"),
      tiltBadge: byId("tilt-badge"),
      hint: byId("hint"),
      pauseScreen: byId("pause-screen"),
      motionPause: byId("motion-toggle-pause"),
      soundPause: byId("sound-toggle-pause"),
      sensitivity: byId("sensitivity"),
      resumeBtn: byId("resume-btn"),
      restartBtn: byId("restart-btn"),
      endScreen: byId("end-screen"),
      endKicker: byId("end-kicker"),
      endTitle: byId("end-title"),
      endCopy: byId("end-copy"),
      endScore: byId("end-score"),
      endWave: byId("end-wave"),
      endAccuracy: byId("end-accuracy"),
      endBest: byId("end-best"),
      againBtn: byId("again-btn"),
      menuBtn: byId("menu-btn"),
      rotateTip: byId("rotate-tip"),
      rotateDismiss: byId("rotate-dismiss"),
      iosNote: byId("ios-note"),
      damageVignette: byId("damage-vignette"),
    };
  }

  async init() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !this.isTouch,
      alpha: false,
      powerPreference: "high-performance",
      stencil: false,
    });
    renderer.setClearColor(0x11142d, 1);
    renderer.setPixelRatio(this.quality.ratio);
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.shadowMap.enabled = !this.isTouch || window.devicePixelRatio < 2.5;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.autoClear = false;
    this.renderer = renderer;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x3a2749, 0.0085);
    this.scene = scene;

    const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.055, 320);
    camera.rotation.order = "YXZ";
    this.camera = camera;

    this.world = buildWorld(scene, renderer);
    this.weapon = createWeapon();
    this.weapon.resize(window.innerWidth / window.innerHeight);
    this.weapon.root.visible = false;

    this.particles = new Particles(scene, 380);
    this.tracers = new Tracers(scene);

    this.setupUI();
    this.setupInput();
    this.setupMotion();
    this.resize();

    this.enterTitleMode();
    this.render();

    try {
      await document.fonts.ready;
    } catch {
      // Fonts are decorative; proceed with fallbacks.
    }

    const loading = this.refs.loading;
    window.setTimeout(() => {
      loading.classList.add("done");
      window.setTimeout(() => loading.remove(), 900);
    }, 420);

    this.state = "title";
    this.clock.start();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  setupUI() {
    const r = this.refs;

    r.startBtn.addEventListener("click", () => this.beginGame());
    r.againBtn.addEventListener("click", () => this.beginGame());
    r.menuBtn.addEventListener("click", () => this.enterTitleMode());
    r.pauseBtn.addEventListener("click", () => this.pause());
    r.resumeBtn.addEventListener("click", () => this.resume());
    r.restartBtn.addEventListener("click", () => {
      this.refs.pauseScreen.hidden = true;
      this.audio.duck(false);
      this.beginGame(true);
    });

    r.soundBtn.addEventListener("click", () => this.toggleSound());
    r.soundStart.addEventListener("click", () => this.toggleSound());
    r.soundPause.addEventListener("click", () => this.toggleSound());

    r.motionStart.addEventListener("click", () => this.toggleMotion());
    r.motionPause.addEventListener("click", () => this.toggleMotion());
    r.tiltBadge.addEventListener("click", () => this.setMotion(false));

    r.sensitivity.value = String(this.sensitivity);
    r.sensitivity.addEventListener("input", () => {
      this.sensitivity = clamp(Number(r.sensitivity.value) || 1, 0.55, 1.8);
      storeNumber(STORAGE_SENS, this.sensitivity);
    });

    this.updateSoundButtons();
    this.updateMotionButtons();

    // Build the 15 little ammo pips once.
    for (let i = 0; i < 15; i++) {
      r.ammoPips.appendChild(document.createElement("i"));
    }

    this.updateHud(true);
    this.updateBestLine();

    const dismiss = r.rotateDismiss;
    dismiss.addEventListener("click", () => {
      r.rotateTip.classList.remove("show");
    });
  }

  setupInput() {
    const canvas = this.canvas;
    const lookSens = () => 0.00255 * this.sensitivity;

    const onCanvasPointerDown = (event) => {
      if (this.state !== "playing") return;
      if (event.pointerType === "mouse") {
        if (document.pointerLockElement === canvas) {
          if (event.button === 0) this.setFiring(true);
          return;
        }
        if (event.button !== 0) return;
        this.input.lookId = event.pointerId;
        this.input.lastX = event.clientX;
        this.input.lastY = event.clientY;
        try { canvas.setPointerCapture(event.pointerId); } catch { /* noop */ }
        return;
      }
      if (this.input.lookId !== null) return;
      this.input.lookId = event.pointerId;
      this.input.lastX = event.clientX;
      this.input.lastY = event.clientY;
      try { canvas.setPointerCapture(event.pointerId); } catch { /* noop */ }
    };

    const onCanvasPointerMove = (event) => {
      if (this.state !== "playing") return;
      if (event.pointerType === "mouse" && document.pointerLockElement === canvas) {
        this.addLook(event.movementX, event.movementY);
        return;
      }
      if (event.pointerId !== this.input.lookId) return;
      const dx = event.clientX - this.input.lastX;
      const dy = event.clientY - this.input.lastY;
      this.input.lastX = event.clientX;
      this.input.lastY = event.clientY;
      this.addLook(dx, dy);
    };

    const endLook = (event) => {
      if (event.pointerType === "mouse" && document.pointerLockElement === canvas) {
        this.setFiring(false);
      }
      if (event.pointerId !== this.input.lookId) return;
      this.input.lookId = null;
    };

    canvas.addEventListener("pointerdown", onCanvasPointerDown);
    canvas.addEventListener("pointermove", onCanvasPointerMove);
    canvas.addEventListener("pointerup", endLook);
    canvas.addEventListener("pointercancel", endLook);
    canvas.addEventListener("lostpointercapture", endLook);
    canvas.addEventListener("click", () => {
      if (this.state === "playing" && this.isFine && document.pointerLockElement !== canvas) {
        canvas.requestPointerLock?.();
      }
    });

    // Joystick
    const joy = this.refs.joystick;
    let joyId = null;
    let joyCenter = { x: 0, y: 0 };
    const updateJoy = (event) => {
      let dx = event.clientX - joyCenter.x;
      let dy = event.clientY - joyCenter.y;
      const dist = Math.hypot(dx, dy);
      const max = this.joyMax;
      if (dist > max) {
        dx = (dx / dist) * max;
        dy = (dy / dist) * max;
      }
      this.refs.knob.style.transform = `translate(${dx}px, ${dy}px)`;
      this.input.moveX = dx / max;
      this.input.moveY = -dy / max;
    };
    joy.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (this.state !== "playing") return;
      joyId = event.pointerId;
      const rect = joy.getBoundingClientRect();
      joyCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      this.joyMax = rect.width * 0.31;
      joy.classList.add("active");
      try { joy.setPointerCapture(event.pointerId); } catch { /* noop */ }
      updateJoy(event);
    });
    joy.addEventListener("pointermove", (event) => {
      if (event.pointerId !== joyId) return;
      event.preventDefault();
      updateJoy(event);
    });
    const endJoy = (event) => {
      if (event.pointerId !== joyId) return;
      joyId = null;
      joy.classList.remove("active");
      this.refs.knob.style.transform = "translate(0px, 0px)";
      this.input.moveX = 0;
      this.input.moveY = 0;
    };
    joy.addEventListener("pointerup", endJoy);
    joy.addEventListener("pointercancel", endJoy);
    joy.addEventListener("lostpointercapture", endJoy);

    const holdButton = (button, onDown, onUp) => {
      let id = null;
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        id = event.pointerId;
        button.classList.add("pressed");
        try { button.setPointerCapture(event.pointerId); } catch { /* noop */ }
        onDown?.();
      });
      const up = (event) => {
        if (id !== null && event.pointerId !== id) return;
        id = null;
        button.classList.remove("pressed");
        onUp?.();
      };
      button.addEventListener("pointerup", up);
      button.addEventListener("pointercancel", up);
      button.addEventListener("lostpointercapture", up);
    };

    holdButton(this.refs.fireBtn, () => this.setFiring(true), () => this.setFiring(false));
    holdButton(this.refs.jumpBtn, () => this.jump());
    holdButton(this.refs.reloadBtn, () => this.startReload());

    // Desktop keyboard
    window.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      if (this.state === "title" && (key === "enter" || key === " ")) {
        this.beginGame();
        return;
      }
      if (this.state === "ended" && (key === "enter" || key === " ")) {
        this.beginGame();
        return;
      }
      if (this.state !== "playing") return;
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", " ", "shift"].includes(key)) {
        event.preventDefault();
      }
      if (key === "escape") {
        this.pause();
        return;
      }
      if (key === "r") {
        this.startReload();
        return;
      }
      if (key === " " || key === "f") {
        this.setFiring(true);
        return;
      }
      this.input.keys.add(key);
    });
    window.addEventListener("keyup", (event) => {
      const key = event.key.toLowerCase();
      if (key === " " || key === "f") {
        this.setFiring(false);
        return;
      }
      this.input.keys.delete(key);
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.state === "playing") this.pause();
    });
    window.addEventListener("contextmenu", (event) => event.preventDefault());
    window.addEventListener("blur", () => {
      this.setFiring(false);
      this.input.keys.clear();
      this.input.moveX = 0;
      this.input.moveY = 0;
    });
    window.addEventListener("resize", () => this.resize());
  }

  addLook(dx, dy) {
    const s = 0.00255 * this.sensitivity;
    this.player.yaw -= dx * s;
    this.player.pitch = clamp(this.player.pitch - dy * s, -1.2, 1.2);
    this.weapon?.look(dx, dy);
  }

  setupMotion() {
    this.onOrientation = (event) => {
      if (event.beta === null || event.gamma === null) return;
      this.tilt.raw.beta = event.beta;
      this.tilt.raw.gamma = event.gamma;
      this.tilt.raw.alpha = event.alpha || 0;
      this.tilt.lastEvent = performance.now();
      if (!this.tilt.calibrated) {
        this.calibrateTilt();
      }
    };
  }

  calibrateTilt() {
    const mapped = this.mapTilt();
    this.tilt.baseH = mapped.h;
    this.tilt.baseV = mapped.v;
    this.tilt.calibrated = true;
  }

  mapTilt() {
    const angle = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
    this.tiltScreenAngle = angle;
    const beta = this.tilt.raw.beta;
    const gamma = this.tilt.raw.gamma;
    if (angle === 90) return { h: -beta, v: -gamma };
    if (angle === -90 || angle === 270) return { h: beta, v: gamma };
    if (angle === 180) return { h: -gamma, v: -beta };
    return { h: gamma, v: beta };
  }

  async toggleMotion() {
    this.setMotion(!this.tilt.on);
  }

  async setMotion(enabled) {
    if (enabled) {
      if (!window.DeviceOrientationEvent) {
        this.showToast("GIROSCÓPIO INDISPONÍVEL NESTE APARELHO");
        return;
      }
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        let response = "denied";
        try {
          // Must be called directly from the user gesture, before any timer.
          response = await DeviceOrientationEvent.requestPermission();
        } catch {
          response = "denied";
        }
        if (response !== "granted") {
          this.showToast("PERMISSÃO DE MOVIMENTO NEGADA");
          this.updateMotionButtons();
          return;
        }
        this.refs.iosNote.hidden = false;
        window.setTimeout(() => { this.refs.iosNote.hidden = true; }, 2600);
      }
      window.addEventListener("deviceorientation", this.onOrientation, true);
      this.tilt.on = true;
      this.tilt.calibrated = false;
      this.refs.tiltBadge.hidden = false;
      this.updateMotionButtons();
      this.showToast("GIROSCÓPIO ATIVO · INCLINE PARA MIRAR");
    } else {
      window.removeEventListener("deviceorientation", this.onOrientation, true);
      this.tilt.on = false;
      this.tilt.calibrated = false;
      this.refs.tiltBadge.hidden = true;
      this.updateMotionButtons();
      if (this.state === "playing") this.showToast("MIRA POR MOVIMENTO DESLIGADA");
    }
  }

  updateMotionButtons() {
    for (const button of [this.refs.motionStart, this.refs.motionPause]) {
      if (!button) continue;
      button.setAttribute("aria-pressed", String(this.tilt.on));
    }
    if (this.refs.tiltBadge) this.refs.tiltBadge.hidden = !this.tilt.on;
  }

  toggleSound() {
    this.audio.init();
    this.audio.setMuted(!this.audio.muted);
    this.updateSoundButtons();
    if (!this.audio.muted) this.audio.unlock();
  }

  updateSoundButtons() {
    const muted = this.audio.muted;
    for (const button of [this.refs.soundStart, this.refs.soundPause]) {
      if (button) button.setAttribute("aria-pressed", String(!muted));
    }
    if (this.refs.soundBtn) this.refs.soundBtn.classList.toggle("muted", muted);
  }

  resize() {
    if (!this.renderer) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setPixelRatio(this.quality.ratio);
    this.renderer.setSize(w, h, false);
    const aspect = w / h;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.weapon.resize(aspect);
  }

  enterTitleMode() {
    this.state = "title";
    this.titleTime = 0;
    this.setFiring(false);
    this.run.ended = false;
    this.clearEntities();
    this.refs.hud.classList.remove("active");
    this.refs.pauseScreen.hidden = true;
    this.refs.endScreen.hidden = true;
    this.refs.startScreen.hidden = false;
    this.refs.startScreen.classList.remove("out");
    this.refs.rotateTip.classList.remove("show");
    this.refs.bossWrap.hidden = true;
    this.weapon.root.visible = false;
    this.audio.stopMusic(0.6);
    this.audio.duck(false);
    this.audio.setIntensity(1);
    this.updateBestLine();
    this.updateHud(true);
    this.player.x = 0;
    this.player.z = 17;
    this.player.yaw = 0;
    this.player.pitch = -0.03;
    this.player.jumpY = 0;
    this.player.jumpVel = 0;
    this.player.health = MAX_HEALTH;
    this.player.invuln = 0;
    this.player.bob = 0;
    this.particles?.clear();
    this.tracers?.clear();
    this.camera.position.set(0, 2.75, 21);
    this.camera.rotation.set(0, 0, 0);
  }

  updateBestLine() {
    if (this.best > 0) {
      this.refs.bestLine.hidden = false;
      this.refs.bestLine.innerHTML = `SEU RECORDE: <b>${padScore(this.best)}</b>`;
    } else {
      this.refs.bestLine.hidden = true;
    }
  }

  beginGame(restart = false) {
    if (this.state === "playing") return;
    this.audio.init();
    this.audio.unlock();
    this.audio.setMuted(this.audio.muted);
    this.audio.startMusic();
    this.audio.setIntensity(1);
    this.requestFullscreen();

    if (!restart) {
      this.refs.startScreen.classList.add("out");
      clearTimeout(this._startHideTimer);
      this._startHideTimer = window.setTimeout(() => {
        if (this.state !== "title") this.refs.startScreen.hidden = true;
      }, 520);
    }
    this.refs.endScreen.hidden = true;
    this.refs.endScreen.classList.remove("win");
    this.refs.pauseScreen.hidden = true;
    this.refs.hud.classList.add("active");
    this.refs.hint.classList.remove("hide");

    this.resetRun();
    this.state = "playing";
    this.clock.getDelta();
    this.showToast("PROTEJA O CORETO · A NÉVOA ESTÁ CHEGANDO", 2300);

    if (this.isTouch && window.innerHeight > window.innerWidth) {
      window.setTimeout(() => {
        if (this.state === "playing") this.refs.rotateTip.classList.add("show");
      }, 2600);
      window.setTimeout(() => this.refs.rotateTip.classList.remove("show"), 11000);
    }
  }

  requestFullscreen() {
    if (!this.isTouch) return;
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
    }
  }

  resetRun() {
    this.clearEntities();
    this.particles.clear();
    this.tracers.clear();
    this.run = {
      wave: 0,
      waveActive: false,
      waveDelay: 1.25,
      queue: [],
      spawned: 0,
      spawnTimer: 0,
      score: 0,
      combo: 0,
      comboTimer: 0,
      shots: 0,
      hits: 0,
      kills: 0,
      ammo: MAG_SIZE,
      reloading: false,
      ended: false,
      victoryPending: false,
      startAt: performance.now(),
    };
    this.player.x = 0;
    this.player.z = 17;
    this.player.yaw = 0;
    this.player.pitch = -0.035;
    this.player.jumpY = 0;
    this.player.jumpVel = 0;
    this.player.grounded = true;
    this.player.health = MAX_HEALTH;
    this.player.invuln = 0;
    this.player.bob = 0;
    this.player.landing = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.shake = 0;
    this.damageFlash = 0;
    this.input.moveX = 0;
    this.input.moveY = 0;
    this.input.keys.clear();
    this.setFiring(false);
    this.weapon.root.visible = true;
    this.weapon.setReloading(false);
    this.refs.ammoWrap.classList.remove("reloading");
    this.refs.bossWrap.hidden = true;
    this.refs.endScreen.hidden = true;
    this.refs.pauseScreen.hidden = true;
    this.refs.hud.classList.add("active");
    this.refs.startScreen.classList.add("out");
    this.refs.rotateTip.classList.remove("show");
    this.refs.feed.innerHTML = "";
    this.refs.combo.textContent = "";
    this.refs.combo.classList.remove("hot");
    this.refs.hint.classList.remove("hide");
    this.updateHud(true);
    this.updateCamera(0);
    window.clearTimeout(this._hintTimer);
    this._hintTimer = window.setTimeout(() => this.refs.hint.classList.add("hide"), 6500);
    this.audio.duck(false);
  }

  clearEntities() {
    for (const enemy of this.enemies) {
      this.scene.remove(enemy.group);
      disposeObject3D(enemy.group);
    }
    this.enemies.length = 0;
    for (const projectile of this.projectiles) {
      this.scene.remove(projectile.group);
      disposeObject3D(projectile.group);
    }
    this.projectiles.length = 0;
    for (const pickup of this.pickups) {
      this.scene.remove(pickup.group);
      disposeObject3D(pickup.group);
    }
    this.pickups.length = 0;
    this.bossEnemy = null;
    if (this.refs) this.refs.bossWrap.hidden = true;
  }

  updateHud(force = false) {
    const r = this.refs;
    const run = this.run;
    if (!r) return;
    const health = Math.max(0, Math.round(this.player.health));
    r.healthNum.textContent = String(health);
    r.healthBar.style.width = `${clamp(health, 0, 100)}%`;
    r.vitals.classList.toggle("low", health <= 32);
    r.vitalNote.textContent = health <= 32 ? "RITMO CRÍTICO" : health <= 65 ? "CUIDADO" : "RITMO ESTÁVEL";
    r.score.textContent = padScore(run.score);
    r.waveNum.textContent = String(Math.max(1, run.wave || 1)).padStart(2, "0");
    r.ammo.textContent = String(run.ammo);
    r.ammoWrap.classList.toggle("reloading", run.reloading);
    r.reloadNote.textContent = run.reloading ? "RECARGA" : "AUTO";
    const filled = Math.ceil(run.ammo / 2);
    const pips = r.ammoPips.children;
    for (let i = 0; i < pips.length; i++) {
      pips[i].classList.toggle("empty", i >= filled);
    }
    if (run.combo > 1) {
      r.combo.textContent = `COMBO x${run.combo}`;
      r.combo.classList.toggle("hot", run.combo >= 4);
    } else {
      r.combo.textContent = "";
      r.combo.classList.remove("hot");
    }
    if (this.bossEnemy && this.bossEnemy.health > 0) {
      const pct = clamp((this.bossEnemy.health / this.bossEnemy.maxHealth) * 100, 0, 100);
      r.bossBar.style.width = `${pct}%`;
      r.bossPct.textContent = `${Math.ceil(pct)}%`;
      r.bossWrap.hidden = false;
    } else {
      r.bossWrap.hidden = true;
    }
    if (force) {
      r.hint.classList.remove("hide");
    }
  }

  startWave(wave) {
    this.run.wave = wave;
    this.run.waveActive = true;
    this.run.queue = [...(WAVE_QUEUES[wave] || WAVE_QUEUES[5])];
    this.run.spawned = 0;
    this.run.spawnTimer = 0.2;
    this.run.victoryPending = false;
    const [title, sub] = WAVE_TEXT[wave] || WAVE_TEXT[5];
    this.showBanner(`ONDA ${String(wave).padStart(2, "0")} / 05`, title, sub);
    this.audio.wave();
    this.audio.setIntensity(1 + wave * 0.32);
    this.updateHud(true);
  }

  spawnNextEnemy() {
    const type = this.run.queue.shift();
    if (!type) return;
    this.run.spawned++;
    this.spawnEnemy(type);
    this.run.spawnTimer = SPAWN_INTERVAL[this.run.wave] || 0.9;
  }

  spawnEnemy(type) {
    const cfg = ENEMY_TYPES[type];
    if (!cfg) return;
    // Spawn mostly in the player's forward hemisphere, so the action reads on
    // a phone screen while the radar keeps the occasional flank honest.
    const forwardAngle = Math.atan2(-Math.cos(this.player.yaw), -Math.sin(this.player.yaw));
    const angle = forwardAngle + (Math.random() - 0.5) * (Math.PI * 1.55);
    const radius = 19.5 + Math.random() * 3.5;
    const baseHeight = cfg.height[0] + Math.random() * (cfg.height[1] - cfg.height[0]);
    const group = createEnemyVisual(type, this.world.glowTexture);
    group.position.set(Math.cos(angle) * radius, baseHeight, Math.sin(angle) * radius);
    group.scale.setScalar(0.01);
    this.scene.add(group);
    const waveScale = 1 + Math.max(0, this.run.wave - 1) * 0.06;
    const maxHealth = cfg.hp * (cfg.boss ? 1 : waveScale);
    const enemy = {
      type,
      cfg,
      group,
      health: maxHealth,
      maxHealth,
      radius: cfg.radius,
      age: 0,
      spawnT: 0,
      orbitAngle: angle + Math.PI,
      orbitRadius: cfg.orbit[0] + Math.random() * (cfg.orbit[1] - cfg.orbit[0]),
      height: baseHeight,
      phase: Math.random() * Math.PI * 2,
      cooldown: 1.8 + Math.random() * 2,
      flash: 0,
      dead: false,
      charge: 0,
      isBoss: !!cfg.boss,
      score: cfg.score,
    };
    this.enemies.push(enemy);
    this.particles.burst(group.position, [cfg.color, cfg.accent, 0xfff2d4], 13, 2.6, 0.5, 1.2);
    if (enemy.isBoss) {
      this.bossEnemy = enemy;
      this.refs.bossWrap.hidden = false;
      this.updateHud();
      this.audio.boss();
      this.showToast("A NÉVOA-MÃE DESCEU AO CORETO", 2800);
      this.shake = Math.max(this.shake, 0.7);
    }
  }

  updateWave(dt) {
    const run = this.run;
    if (run.victoryPending) {
      run.waveDelay -= dt;
      if (run.waveDelay <= 0) this.endGame(true);
      return;
    }
    if (run.waveActive) {
      if (run.queue.length > 0) {
        if (run.spawnTimer > 0) run.spawnTimer -= dt;
        const maxAlive = MAX_ALIVE[run.wave] || 6;
        if (run.spawnTimer <= 0 && this.enemies.length < maxAlive) {
          this.spawnNextEnemy();
        }
      }
      if (run.queue.length === 0 && this.enemies.length === 0) {
        this.completeWave();
      }
    } else if (run.waveDelay > 0) {
      run.waveDelay -= dt;
      if (run.waveDelay <= 0 && run.wave < 5) {
        this.startWave(run.wave + 1);
      }
    }
  }

  completeWave() {
    const run = this.run;
    run.waveActive = false;
    if (run.wave >= 5) {
      run.victoryPending = true;
      run.waveDelay = 2.4;
      this.showBanner("A PRAÇA ESTÁ LIVRE", "O SOM VOLTOU", "VOCÊ REACENDEU O CORETO");
      this.audio.setIntensity(0.7);
      return;
    }
    const bonus = 250 * run.wave;
    run.score += bonus;
    run.waveDelay = 4.6;
    this.player.invuln = 2.2;
    this.clearProjectiles();
    this.player.health = Math.min(MAX_HEALTH, this.player.health + 12);
    run.ammo = MAG_SIZE;
    this.weapon.setReloading(false);
    run.reloading = false;
    this.refs.ammoWrap.classList.remove("reloading");
    this.showBanner(`ONDA ${String(run.wave).padStart(2, "0")} LIMPA`, "O RITMO VOLTOU", `BÔNUS +${bonus} · VIDA +12`);
    this.showToast("CORETO RECARREGADO · VIDA +12", 2000);
    this.audio.wave();
    this.updateHud();
  }

  clearProjectiles() {
    for (const projectile of this.projectiles) {
      this.scene.remove(projectile.group);
      disposeObject3D(projectile.group);
    }
    this.projectiles.length = 0;
  }

  showBanner(kicker, title, sub) {
    const r = this.refs;
    r.bannerKicker.textContent = kicker;
    r.bannerTitle.textContent = title;
    r.bannerSub.textContent = sub;
    r.banner.classList.remove("show");
    void r.banner.offsetWidth;
    r.banner.classList.add("show");
  }

  showToast(text, duration = 1900) {
    const r = this.refs;
    if (!r) return;
    r.toast.textContent = text;
    r.toast.classList.add("show");
    clearTimeout(this._toastTimer);
    this._toastTimer = window.setTimeout(() => r.toast.classList.remove("show"), duration);
  }

  addFeed(text, value, critical = false) {
    const item = document.createElement("div");
    item.className = `feed-item${critical ? " crit" : ""}`;
    const dot = document.createElement("i");
    const label = document.createElement("span");
    label.textContent = text;
    const amount = document.createElement("b");
    amount.textContent = `+${value}`;
    item.append(dot, label, amount);
    this.refs.feed.appendChild(item);
    while (this.refs.feed.children.length > 4) this.refs.feed.firstElementChild.remove();
    window.setTimeout(() => item.remove(), 2300);
  }

  updateRadar(dt) {
    this.radarTimer -= dt;
    if (this.radarTimer > 0) return;
    this.radarTimer = 0.08;
    const canvas = this.refs.radar;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, w / 2 - 6, 0, Math.PI * 2);
    ctx.clip();
    const bg = ctx.createRadialGradient(cx, cy, 5, cx, cy, w / 2);
    bg.addColorStop(0, "rgba(20,42,67,.52)");
    bg.addColorStop(1, "rgba(8,14,34,.72)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(255,245,222,.09)";
    ctx.lineWidth = 1;
    for (const rr of [0.34, 0.65, 0.96]) {
      ctx.beginPath();
      ctx.arc(cx, cy, (w / 2 - 8) * rr, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(cx, 8);
    ctx.lineTo(cx, h - 8);
    ctx.moveTo(8, cy);
    ctx.lineTo(w - 8, cy);
    ctx.stroke();

    const sweep = (this.worldTime * 0.7) % (Math.PI * 2) - Math.PI / 2;
    const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(sweep) * 100, cy + Math.sin(sweep) * 100);
    grad.addColorStop(0, "rgba(24,166,155,.22)");
    grad.addColorStop(1, "rgba(24,166,155,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweep) * 98, cy + Math.sin(sweep) * 98);
    ctx.stroke();

    const scale = (w / 2 - 12) / 27;
    const toRadar = (x, z) => {
      const dx = x - this.player.x;
      const dz = z - this.player.z;
      return { x: cx + dx * scale, y: cy + dz * scale };
    };

    // Coreto marker
    const coreto = toRadar(0, -13.5);
    ctx.strokeStyle = "rgba(255,197,82,.74)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(coreto.x, coreto.y, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,197,82,.18)";
    ctx.fill();

    // Health pickups
    for (const pickup of this.pickups) {
      const p = toRadar(pickup.group.position.x, pickup.group.position.z);
      ctx.fillStyle = "#58e2c5";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Enemies
    for (const enemy of this.enemies) {
      const p = toRadar(enemy.group.position.x, enemy.group.position.z);
      const r = enemy.isBoss ? 7 : enemy.type === "tambor" ? 4.5 : 3;
      ctx.fillStyle = enemy.isBoss ? "#ff3d86" : enemy.type === "vespa" ? "#a8e764" : "#ff8158";
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Player arrow
    const dirX = -Math.sin(this.player.yaw);
    const dirZ = -Math.cos(this.player.yaw);
    const px = cx;
    const py = cy;
    const nx = -dirZ;
    const nz = dirX;
    ctx.fillStyle = "#fff5de";
    ctx.beginPath();
    ctx.moveTo(px + dirX * 10, py + dirZ * 10);
    ctx.lineTo(px - dirX * 6 + nx * 5, py - dirZ * 6 + nz * 5);
    ctx.lineTo(px - dirX * 3, py - dirZ * 3);
    ctx.lineTo(px - dirX * 6 - nx * 5, py - dirZ * 6 - nz * 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  update(dt) {
    this.time += dt;
    const run = this.run;
    if (run.comboTimer > 0) {
      run.comboTimer -= dt;
      if (run.comboTimer <= 0) {
        run.combo = 0;
        this.updateHud();
      }
    }
    this.player.invuln = Math.max(0, this.player.invuln - dt);
    this.crosshairFire = Math.max(0, this.crosshairFire - dt);
    this.recoilPitch = damp(this.recoilPitch, 0, 11, dt);
    this.recoilYaw = damp(this.recoilYaw, 0, 11, dt);
    this.shake = Math.max(0, this.shake - dt * 2.4);
    this.fireCooldown = Math.max(0, (this.fireCooldown || 0) - dt);

    this.updateTilt(dt);
    this.updatePlayer(dt);
    this.updateCamera(dt);
    this.camera.updateMatrixWorld();

    if (this.input.fire) this.tryFire();

    this.updateWeapon(dt);
    this.updateEnemies(dt);
    this.updateProjectiles(dt);
    this.updatePickups(dt);
    this.updateWave(dt);
    this.updateAim();
    this.particles.update(dt);
    this.tracers.update(dt);
    this.updateRadar(dt);
    this.updateCrosshair();
  }

  updateTilt(dt) {
    if (!this.tilt.on || !this.tilt.calibrated || !this.tilt.raw) return;
    const angle = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
    if (angle !== this.tiltScreenAngle) {
      this.mapTilt();
      this.calibrateTilt();
      this.showToast("GIROSCÓPIO RECALIBRADO");
      return;
    }
    if (performance.now() - this.tilt.lastEvent > 2000) return;
    const mapped = this.mapTilt();
    let dh = mapped.h - this.tilt.baseH;
    let dv = mapped.v - this.tilt.baseV;
    if (Math.abs(dh) < 1.6) dh = 0;
    if (Math.abs(dv) < 1.6) dv = 0;
    dh = clamp(dh / 24, -1.5, 1.5);
    dv = clamp(dv / 24, -1.1, 1.1);
    this.player.yaw -= dh * 1.5 * dt * this.sensitivity;
    this.player.pitch = clamp(this.player.pitch - dv * 1.05 * dt * this.sensitivity, -1.2, 1.2);
  }

  updatePlayer(dt) {
    let moveX = this.input.moveX;
    let moveY = this.input.moveY;
    const keys = this.input.keys;
    if (keys.has("a") || keys.has("arrowleft")) moveX -= 1;
    if (keys.has("d") || keys.has("arrowright")) moveX += 1;
    if (keys.has("w") || keys.has("arrowup")) moveY += 1;
    if (keys.has("s") || keys.has("arrowdown")) moveY -= 1;
    const len = Math.hypot(moveX, moveY);
    if (len > 1) {
      moveX /= len;
      moveY /= len;
    }
    const forwardX = -Math.sin(this.player.yaw);
    const forwardZ = -Math.cos(this.player.yaw);
    const rightX = Math.cos(this.player.yaw);
    const rightZ = -Math.sin(this.player.yaw);
    const speed = 5.8;
    const vx = (forwardX * moveY + rightX * moveX) * speed;
    const vz = (forwardZ * moveY + rightZ * moveX) * speed;
    this.player.speed = Math.hypot(vx, vz);
    if (this.player.speed > 0.1) {
      this.movePlayer(vx * dt, vz * dt);
      if (this.player.grounded) {
        this.player.bob += dt * (7.4 + this.player.speed * 0.7);
      }
    } else {
      this.player.bob += dt * 1.2;
    }

    // Jump arc
    if (!this.player.grounded) {
      this.player.jumpVel -= 14.2 * dt;
      this.player.jumpY += this.player.jumpVel * dt;
      if (this.player.jumpY <= 0) {
        this.player.jumpY = 0;
        this.player.jumpVel = 0;
        this.player.grounded = true;
        this.player.landing = 1;
      }
    }
    this.player.landing = Math.max(0, this.player.landing - dt * 4);
  }

  movePlayer(dx, dz) {
    const p = this.player;
    let nx = p.x + dx;
    let nz = p.z + dz;
    // Arena boundary
    const d = Math.hypot(nx, nz);
    if (d > PLAY_RADIUS) {
      nx = (nx / d) * PLAY_RADIUS;
      nz = (nz / d) * PLAY_RADIUS;
    }
    // Cylindrical props
    for (const collider of this.world.colliders) {
      const cdx = nx - collider.x;
      const cdz = nz - collider.z;
      const dist = Math.hypot(cdx, cdz);
      const min = collider.r + 0.38;
      if (dist < min && dist > 0.0001) {
        nx = collider.x + (cdx / dist) * min;
        nz = collider.z + (cdz / dist) * min;
      }
    }
    const d2 = Math.hypot(nx, nz);
    if (d2 > PLAY_RADIUS) {
      nx = (nx / d2) * PLAY_RADIUS;
      nz = (nz / d2) * PLAY_RADIUS;
    }
    p.x = nx;
    p.z = nz;
  }

  updateCamera(dt) {
    const p = this.player;
    const shake = this.shake * this.shake;
    const shakeX = (Math.random() - 0.5) * shake * 0.08;
    const shakeY = (Math.random() - 0.5) * shake * 0.06;
    const bobAmount = p.grounded ? Math.min(1, p.speed / 5.8) : 0;
    const bob = Math.sin(p.bob) * 0.035 * bobAmount;
    const roll = (-this.input.moveX * 0.012 + Math.sin(p.bob * 0.5) * 0.003) * bobAmount;
    const pitch = clamp(p.pitch + this.recoilPitch, -1.24, 1.24);
    this.camera.position.set(
      p.x + shakeX,
      EYE_HEIGHT + p.jumpY + bob + shakeY - p.landing * 0.035,
      p.z
    );
    this.camera.rotation.set(
      pitch + (Math.random() - 0.5) * shake * 0.025,
      p.yaw + this.recoilYaw + (Math.random() - 0.5) * shake * 0.02,
      roll + (Math.random() - 0.5) * shake * 0.025
    );
    this.camera.updateMatrixWorld();
  }

  setFiring(on) {
    if (!on) {
      this.input.fire = false;
      this.refs?.fireBtn.classList.remove("pressed");
      return;
    }
    if (this.state !== "playing") return;
    this.input.fire = true;
  }

  tryFire() {
    const run = this.run;
    if (run.reloading || this.state !== "playing") return;
    if (this.fireCooldown > 0) return;
    if (run.ammo <= 0) {
      this.startReload();
      this.audio.empty();
      this.fireCooldown = 0.28;
      return;
    }
    run.ammo--;
    run.shots++;
    this.fireCooldown = 0.095;
    this.crosshairFire = 0.09;
    this.audio.shoot();
    this.weapon.fire();
    this.recoilPitch = Math.min(0.09, this.recoilPitch + 0.0085);
    this.recoilYaw += (Math.random() - 0.5) * 0.006;
    this.shake = Math.max(this.shake, 0.16);
    if (run.ammo === 0) {
      this.startReload();
    }
    this.updateHud();

    this.camera.updateMatrixWorld();
    const origin = this.rayOrigin.copy(this.camera.position);
    const dir = this.rayDir;
    this.camera.getWorldDirection(dir);

    // Gentle magnetism toward the closest enemy near the center. It makes
    // touch fire feel intentional without turning the weapon into a homing gun.
    let assist = null;
    let assistDot = this.isTouch ? 0.978 : 0.994;
    for (const enemy of this.enemies) {
      if (enemy.health <= 0) continue;
      this.tmpV.copy(enemy.group.position).sub(origin);
      const distance = this.tmpV.length();
      if (distance > 42 || distance < 0.1) continue;
      this.tmpV.multiplyScalar(1 / distance);
      const dot = this.tmpV.dot(dir);
      if (dot > assistDot) {
        assistDot = dot;
        assist = enemy;
      }
    }
    if (assist) {
      this.tmpV.copy(assist.group.position).sub(origin).normalize();
      dir.copy(this.tmpV);
    }

    let hitEnemy = null;
    let hitT = Infinity;
    for (const enemy of this.enemies) {
      if (enemy.health <= 0) continue;
      const oc = this.tmpV.copy(enemy.group.position).sub(origin);
      const t = oc.dot(dir);
      if (t <= 0 || t >= hitT) continue;
      const d2 = oc.lengthSq() - t * t;
      const r = enemy.radius * 1.12;
      if (d2 <= r * r) {
        hitT = t;
        hitEnemy = enemy;
      }
    }

    let endpoint;
    if (hitEnemy) {
      endpoint = origin.clone().addScaledVector(dir, hitT);
    } else {
      let t = 55;
      if (dir.y < -0.015) {
        const groundT = (0.08 - origin.y) / dir.y;
        if (groundT > 0 && groundT < t) t = groundT;
      }
      endpoint = origin.clone().addScaledVector(dir, t);
    }

    // Tracer starts just below and to the side of the eye line so it reads as
    // coming from the Lampião, not from the middle of the screen.
    const right = this.tmpV2.set(1, 0, 0).applyQuaternion(this.camera.quaternion);
    const start = origin.clone()
      .addScaledVector(right, 0.19)
      .add(new THREE.Vector3(0, -0.18, 0))
      .addScaledVector(dir, 0.5);
    this.tracers.spawn(start, endpoint, 0xffc169, 0.065);

    if (hitEnemy) {
      run.hits++;
      endpoint = endpoint.clone();
      this.particles.spark(endpoint, dir.clone().multiplyScalar(-1), 6, 0xffd28a);
      this.audio.hit(false);
      this.damageEnemy(hitEnemy, 17, endpoint);
    } else if (dir.y < -0.015) {
      this.particles.spark(endpoint, new THREE.Vector3(0, 1, 0), 4, 0xff9a5f);
    }
  }

  startReload() {
    const run = this.run;
    if (this.state !== "playing" || run.reloading || run.ammo >= MAG_SIZE) return;
    run.reloading = true;
    this.weapon.setReloading(true);
    this.audio.reload();
    this.updateHud();
  }

  updateWeapon(dt) {
    this.weapon.update(dt, {
      moving: this.player.grounded && this.player.speed > 0.4,
      speed: this.player.speed,
      jumpOffset: this.player.jumpY,
      landing: this.player.landing,
      onReloaded: () => {
        this.run.ammo = MAG_SIZE;
        this.run.reloading = false;
        this.weapon.setReloading(false);
        this.refs.ammoWrap.classList.remove("reloading");
        this.updateHud();
        this.showToast("LAMPIÃO RECARREGADO", 900);
      },
    });
  }

  updateAim() {
    this.aimTarget = null;
    let best = this.isTouch ? 0.985 : 0.995;
    this.camera.getWorldDirection(this.forward);
    for (const enemy of this.enemies) {
      this.tmpV.copy(enemy.group.position).sub(this.camera.position).normalize();
      const dot = this.tmpV.dot(this.forward);
      if (dot > best) {
        best = dot;
        this.aimTarget = enemy;
      }
    }
  }

  updateCrosshair() {
    const crosshair = this.refs.crosshair;
    crosshair.classList.toggle("target", !!this.aimTarget);
    crosshair.classList.toggle("fire", this.crosshairFire > 0);
  }

  flashHitmarker(kill = false) {
    const marker = this.refs.hitmarker;
    marker.classList.remove("pop", "kill");
    void marker.offsetWidth;
    if (kill) marker.classList.add("kill");
    marker.classList.add("pop");
    window.setTimeout(() => marker.classList.remove("pop", "kill"), 240);
  }

  damageEnemy(enemy, amount, hitPoint) {
    enemy.health -= amount;
    enemy.flash = 0.18;
    if (enemy.isBoss) this.updateHud();
    if (enemy.health <= 0) {
      this.killEnemy(enemy, hitPoint);
    } else {
      this.flashHitmarker(false);
    }
  }

  killEnemy(enemy, hitPoint) {
    const index = this.enemies.indexOf(enemy);
    if (index === -1) return;
    this.enemies.splice(index, 1);
    const cfg = enemy.cfg;
    const pos = enemy.group.position.clone();
    this.scene.remove(enemy.group);
    disposeObject3D(enemy.group);
    const reward = Math.round(enemy.score * Math.max(1, Math.min(5, this.run.combo + 1)));
    this.run.score += reward;
    this.run.kills++;
    this.run.combo = Math.min(9, this.run.combo + 1);
    this.run.comboTimer = 3;
    const label = enemy.isBoss ? "NÉVOA-MÃE DERROTADA" : `${cfg.name} ABATIDA`;
    this.addFeed(label, reward, enemy.isBoss);
    this.particles.burst(pos, [cfg.color, cfg.accent, 0xffd27b, 0xfff2d4], enemy.isBoss ? 70 : 32, enemy.isBoss ? 6.8 : 4.2, enemy.isBoss ? 1.1 : 0.7, 2.4);
    this.audio.kill();
    if (enemy.isBoss) {
      this.bossEnemy = null;
      this.refs.bossWrap.hidden = true;
      this.shake = 1;
      this.audio.boss();
      this.showBanner("A NÉVOA-MÃE CAIU", "O CORETO RESPIRA", "TERMINE O REFRÃO");
      this.updateHud();
      // Punish the remaining swarm with a bright shockwave.
      for (const projectile of this.projectiles) {
        this.particles.burst(projectile.group.position, [cfg.color, 0xffd27b], 5, 2, 0.35, 1);
      }
    }
    this.flashHitmarker(true);
    this.updateHud();
    this.maybeDropPickup(pos, enemy.isBoss);
  }

  maybeDropPickup(position, guaranteed = false) {
    if (!guaranteed && Math.random() > 0.15) return;
    const drops = guaranteed ? 2 : 1;
    for (let i = 0; i < drops; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = guaranteed ? 1.2 + i * 0.9 : 0;
      const p = new THREE.Vector3(
        clamp(position.x + Math.cos(angle) * distance, -19, 19),
        1.15 + i * 0.3,
        clamp(position.z + Math.sin(angle) * distance, -19, 19)
      );
      const group = createHealthPickup(p, this.world.glowTexture);
      group.userData.age = 0;
      this.scene.add(group);
      this.pickups.push({ group, age: 0 });
    }
  }

  updatePickups(dt) {
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const pickup = this.pickups[i];
      pickup.age += dt;
      const group = pickup.group;
      group.rotation.y += dt * 1.7;
      group.position.y = 1.05 + Math.sin(pickup.age * 2.4) * 0.12;
      group.userData.ring.rotation.z += dt * 0.8;
      group.userData.glow.material.opacity = 0.5 + Math.sin(pickup.age * 4) * 0.15;
      const dx = group.position.x - this.player.x;
      const dz = group.position.z - this.player.z;
      if (dx * dx + dz * dz < 1.35 * 1.35 && this.player.health < MAX_HEALTH) {
        this.player.health = Math.min(MAX_HEALTH, this.player.health + 20);
        this.audio.pickup();
        this.showToast("ÁGUA DE COCO · VIDA +20", 1300);
        this.particles.burst(group.position, [0x5ce0c6, 0xfff2d4, 0xffc552], 16, 2.8, 0.6, 2);
        this.scene.remove(group);
        disposeObject3D(group);
        this.pickups.splice(i, 1);
        this.updateHud();
        continue;
      }
      if (pickup.age > 22) {
        this.scene.remove(group);
        disposeObject3D(group);
        this.pickups.splice(i, 1);
      }
    }
  }

  updateEnemies(dt) {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      const cfg = enemy.cfg;
      enemy.age += dt;
      enemy.spawnT += dt;
      const spawnP = clamp(enemy.spawnT / 0.55, 0, 1);
      const ease = 1 - Math.pow(1 - spawnP, 3);
      enemy.group.scale.setScalar(0.01 + ease * 0.99);

      const orbitSpeed = (enemy.type === "vespa" ? 0.92 : enemy.type === "mother" ? 0.25 : 0.44);
      enemy.orbitAngle += dt * orbitSpeed;
      const targetX = this.player.x + Math.cos(enemy.orbitAngle) * enemy.orbitRadius;
      const targetZ = this.player.z + Math.sin(enemy.orbitAngle) * enemy.orbitRadius;
      const targetY = enemy.height + Math.sin(enemy.age * 1.5 + enemy.phase) * 0.24;
      const k = 1 - Math.exp(-cfg.speed * dt * 0.8);
      enemy.group.position.x += (targetX - enemy.group.position.x) * k;
      enemy.group.position.z += (targetZ - enemy.group.position.z) * k;
      enemy.group.position.y += (targetY - enemy.group.position.y) * k;
      enemy.group.lookAt(this.camera.position.x, this.camera.position.y - 0.15, this.camera.position.z);
      enemy.group.rotation.z += Math.sin(enemy.age * 1.7 + enemy.phase) * 0.06;

      const ud = enemy.group.userData;
      for (const ring of ud.rings) {
        if (ring.axis === "x") ring.mesh.rotation.x += dt * ring.speed;
        else ring.mesh.rotation.y += dt * ring.speed;
      }
      enemy.flash = Math.max(0, enemy.flash - dt * 4.5);
      if (ud.bodyMat) ud.bodyMat.emissiveIntensity = 0.45 + enemy.flash * 8;
      if (ud.trimMat) ud.trimMat.emissiveIntensity = 0.45 + enemy.flash * 5;

      let charge = 0;
      if (cfg.fire > 0) {
        if (enemy.cooldown > 0) enemy.cooldown -= dt;
        if (enemy.cooldown < 0.65) charge = clamp(1 - enemy.cooldown / 0.65, 0, 1);
        if (enemy.cooldown <= 0) {
          this.fireEnemyProjectile(enemy);
          const debuff = enemy.isBoss ? 1.1 : 1;
          enemy.cooldown = cfg.fire * debuff * (0.82 + Math.random() * 0.38);
          charge = 0;
        }
      }
      enemy.charge = charge;
      if (ud.glow) {
        ud.glow.material.opacity = 0.42 + charge * 0.6;
        const glowScale = (enemy.isBoss ? 2.6 : 1.3) * (1 + charge * 0.75);
        ud.glow.scale.setScalar(glowScale);
      }
      if (ud.eye) ud.eye.scale.set(1 + charge * 0.18, 0.86 + charge * 0.12, 0.5);
      if (ud.pupil) ud.pupil.scale.setScalar(1 + charge * 0.9);
    }
  }

  fireEnemyProjectile(enemy) {
    const cfg = enemy.cfg;
    const origin = enemy.group.position.clone();
    origin.y -= 0.04;
    const target = new THREE.Vector3(this.player.x, EYE_HEIGHT + this.player.jumpY - 0.1, this.player.z);
    const baseDir = target.clone().sub(origin).normalize();
    const count = enemy.isBoss ? 3 : enemy.type === "tambor" ? 2 : 1;
    const right = new THREE.Vector3().crossVectors(baseDir, new THREE.Vector3(0, 1, 0)).normalize();
    for (let i = 0; i < count; i++) {
      const spread = (i - (count - 1) / 2) * (enemy.isBoss ? 0.13 : 0.075);
      const dir = baseDir.clone().addScaledVector(right, spread).normalize();
      const group = new THREE.Group();
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(enemy.isBoss ? 0.21 : 0.14, 8, 6),
        new THREE.MeshBasicMaterial({ color: cfg.color })
      );
      group.add(core);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: this.world.glowTexture,
        color: cfg.color,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }));
      glow.scale.setScalar(enemy.isBoss ? 1.3 : 0.8);
      group.add(glow);
      group.position.copy(origin);
      this.scene.add(group);
      this.projectiles.push({
        group,
        velocity: dir.multiplyScalar(enemy.isBoss ? 7.4 : 8.8),
        age: 0,
        damage: enemy.isBoss ? 12 : enemy.type === "tambor" ? 10 : 8,
        boss: enemy.isBoss,
      });
    }
    this.audio.tone(340, 110, 0.14, 0.035, "square");
  }

  updateProjectiles(dt) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.age += dt;
      p.group.position.addScaledVector(p.velocity, dt);
      p.group.rotation.y += dt * 4;
      const dx = p.group.position.x - this.player.x;
      const dz = p.group.position.z - this.player.z;
      const dy = p.group.position.y - (EYE_HEIGHT + this.player.jumpY - 0.1);
      const hit = dx * dx + dy * dy + dz * dz < 0.62 * 0.62;
      if (hit) {
        this.takeDamage(p.damage);
        this.particles.burst(p.group.position, [0xff4d8d, 0xffd27b], 16, 3.2, 0.55, 2.4);
        this.scene.remove(p.group);
        disposeObject3D(p.group);
        this.projectiles.splice(i, 1);
        continue;
      }
      if (p.age > 6 || p.group.position.y < 0.1 || Math.hypot(p.group.position.x, p.group.position.z) > 31) {
        this.scene.remove(p.group);
        disposeObject3D(p.group);
        this.projectiles.splice(i, 1);
      }
    }
  }

  takeDamage(amount) {
    if (this.state !== "playing" || this.player.invuln > 0) return;
    this.player.health = Math.max(0, this.player.health - amount);
    this.player.invuln = 0.38;
    this.shake = Math.max(this.shake, 0.7);
    this.audio.damage();
    const v = this.refs.damageVignette;
    v.classList.remove("active");
    void v.offsetWidth;
    v.classList.add("active");
    window.setTimeout(() => v.classList.remove("active"), 460);
    this.updateHud();
    if (this.player.health <= 0) this.endGame(false);
  }

  jump() {
    if (this.state !== "playing" || !this.player.grounded) return;
    this.player.grounded = false;
    this.player.jumpVel = 5.15;
    this.player.jumpY = 0.001;
    this.audio.jump();
  }

  endGame(win) {
    if (this.state === "ended") return;
    this.state = "ended";
    this.run.ended = true;
    this.run.victoryPending = false;
    this.setFiring(false);
    this.input.moveX = 0;
    this.input.moveY = 0;
    this.input.keys.clear();
    this.refs.joystick.classList.remove("active");
    this.refs.knob.style.transform = "translate(0px, 0px)";
    this.refs.rotateTip.classList.remove("show");
    this.refs.bossWrap.hidden = true;
    this.weapon.root.visible = false;
    this.audio.stopMusic(0.9);
    this.audio.duck(false);
    if (win) {
      this.run.score += 3000;
      window.setTimeout(() => this.audio.victory(), 180);
    } else {
      window.setTimeout(() => this.audio.defeat(), 180);
    }
    this.updateHud();

    const accuracy = this.run.shots > 0 ? Math.round((this.run.hits / this.run.shots) * 100) : 0;
    const previousBest = this.best;
    const isRecord = this.run.score > this.best;
    if (isRecord) {
      this.best = this.run.score;
      storeNumber(STORAGE_BEST, this.best);
    }
    const r = this.refs;
    r.endScreen.classList.toggle("win", win);
    r.endKicker.textContent = win ? "VITÓRIA" : "FIM DA BATIDA";
    r.endTitle.innerHTML = win ? "A praça voltou<br>a cantar." : "A praça<br>silenciou.";
    r.endCopy.textContent = win
      ? "A Névoa se foi. O coreto ainda pulsa, e a cidade inteira pode ouvir a sua batida."
      : "A Névoa venceu desta vez. Mas o sol sempre volta — e a praça vai precisar de você outra vez.";
    r.endScore.textContent = padScore(this.run.score);
    r.endWave.textContent = win ? "05 / 05" : `${String(Math.max(1, this.run.wave)).padStart(2, "0")} / 05`;
    r.endAccuracy.textContent = `${accuracy}%`;
    r.endBest.textContent = isRecord
      ? "NOVO RECORDE DA PRAÇA"
      : `RECORDE DA PRAÇA: ${padScore(previousBest)}`;
    r.endBest.style.color = isRecord ? "var(--pink)" : "rgba(255,245,222,.42)";
    this.updateBestLine();

    window.setTimeout(() => {
      if (this.state !== "ended") return;
      r.endScreen.hidden = false;
      this.audio.duck(true);
    }, 920);
  }

  pause() {
    if (this.state !== "playing") return;
    this.state = "paused";
    this.setFiring(false);
    this.input.moveX = 0;
    this.input.moveY = 0;
    this.input.keys.clear();
    this.refs.joystick.classList.remove("active");
    this.refs.knob.style.transform = "translate(0px, 0px)";
    this.refs.pauseScreen.hidden = false;
    this.audio.duck(true);
    this.updateMotionButtons();
    if (document.pointerLockElement) document.exitPointerLock?.();
  }

  resume() {
    if (this.state !== "paused") return;
    this.state = "playing";
    this.refs.pauseScreen.hidden = true;
    this.audio.duck(false);
    this.clock.getDelta();
    if (this.tilt.on) this.calibrateTilt();
    this.showToast("DE VOLTA À PRAÇA", 1100);
  }

  updateTitle(dt) {
    this.titleTime += dt;
    const t = this.titleTime;
    this.camera.position.set(
      Math.sin(t * 0.11) * 2.7,
      2.72 + Math.sin(t * 0.31) * 0.055,
      20.6 + Math.cos(t * 0.09) * 1.9
    );
    this.camera.lookAt(0, 3.0, -13.5);
    this.camera.updateMatrixWorld();
  }

  loop() {
    requestAnimationFrame(this.loop);
    const rawDt = Math.min(0.05, this.clock.getDelta());
    let worldDt = rawDt;
    if (this.state === "paused") worldDt = 0;
    this.worldTime += worldDt;

    if (this.state === "title") {
      this.updateTitle(rawDt);
      updateWorld(this.world, this.worldTime, worldDt);
    } else if (this.state === "playing") {
      this.update(rawDt);
      updateWorld(this.world, this.worldTime, worldDt);
    } else {
      updateWorld(this.world, this.worldTime, worldDt);
    }

    this.render();
    this.measurePerformance(rawDt);
  }

  render() {
    if (!this.renderer) return;
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    if (this.weapon?.root.visible) {
      this.renderer.clearDepth();
      this.renderer.render(this.weapon.viewScene, this.weapon.viewCamera);
    }
  }

  measurePerformance(dt) {
    if (!this.perf) this.perf = { time: 0, frames: 0 };
    this.perf.time += dt;
    this.perf.frames++;
    if (this.perf.time < 4.5) return;
    const fps = this.perf.frames / this.perf.time;
    if (fps < 32 && !this.quality.degraded) {
      this.quality.degraded = true;
      this.quality.ratio = 1;
      this.renderer.setPixelRatio(1);
      this.renderer.shadowMap.enabled = false;
      this.resize();
    }
    this.perf.time = 0;
    this.perf.frames = 0;
  }
}
