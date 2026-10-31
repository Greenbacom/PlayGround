import { clamp, shortestAngle } from './utils.js';

/**
 * Touch-first input:
 * - left virtual stick for movement
 * - right thumb drag to look
 * - optional device tilt (iOS permission is requested inside a user gesture)
 * - full WASD + pointer-lock fallback on desktop
 */
export class Input {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas;
    this.cb = callbacks;
    this.isTouch = (navigator.maxTouchPoints || 0) > 0 || 'ontouchstart' in window;
    this.mode = 'menu';
    this.keys = new Set();
    this.joy = { x: 0, y: 0, active: false, pointerId: null, cx: 0, cy: 0 };
    this.lookDX = 0;
    this.lookDY = 0;
    this.lookPointer = null;
    this.firing = false;
    this.pointerLocked = false;
    this.tiltEnabled = false;
    this.tiltAvailable = 'DeviceOrientationEvent' in window;
    this.tiltYawRate = 0;
    this.tiltPitchRate = 0;
    this.tiltBaseline = null;
    this.tiltCalibrating = false;
    this.hasTiltData = false;
    this.sensitivity = this.isTouch ? 0.0026 : 0.0021;
    this.tiltSensitivity = 1.0;
    this.stepDistance = 0;
    this._lastJoy = { x: 0, y: 0 };

    this.bindKeyboard();
    this.bindMouse();
    this.bindTouch();
    this.bindTilt();
    if (this.isTouchMode()) document.body.classList.add('touch');
    this.bindButtons();
  }

  bindButtons() {
    const fire = document.getElementById('btnFire');
    const bindHold = (el, down, up) => {
      if (!el) return;
      const onDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        el.classList.add('pressed');
        try { el.setPointerCapture?.(e.pointerId); } catch { /* noop */ }
        down?.();
      };
      const onUp = (e) => {
        e?.preventDefault?.();
        el.classList.remove('pressed');
        try { el.releasePointerCapture?.(e.pointerId); } catch { /* noop */ }
        up?.();
      };
      el.addEventListener('pointerdown', onDown);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onUp);
      el.addEventListener('lostpointercapture', onUp);
      el.addEventListener('contextmenu', (e) => e.preventDefault());
    };
    bindHold(fire, () => { this.firing = true; }, () => { this.firing = false; });
    bindHold(document.getElementById('btnJump'), () => this.cb.onJump?.());
    bindHold(document.getElementById('btnReload'), () => this.cb.onReload?.());
    bindHold(document.getElementById('btnSwap'), () => this.cb.onSwitch?.());
    bindHold(document.getElementById('btnGrenade'), () => this.cb.onGrenade?.());
    bindHold(document.getElementById('pauseBtn'), () => this.cb.onPause?.());
  }

  bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      const k = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'].includes(k)) {
        this.keys.add(k);
        if (k.startsWith('arrow')) e.preventDefault();
      }
      if (this.mode !== 'playing') {
        if (k === 'escape') this.cb.onPause?.();
        return;
      }
      switch (k) {
        case 'r': this.cb.onReload?.(); break;
        case 'q': this.cb.onSwitch?.(); break;
        case '1': this.cb.onSelectWeapon?.(0); break;
        case '2': this.cb.onSelectWeapon?.(1); break;
        case '3': this.cb.onSelectWeapon?.(2); break;
        case 'f':
        case 'g': this.cb.onGrenade?.(); break;
        case ' ': if (!e.repeat) this.cb.onJump?.(); e.preventDefault(); break;
        case 'escape':
        case 'p': this.cb.onPause?.(); break;
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
    });
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.firing = false;
      this.resetJoystick();
    });
  }

  isTouchMode() {
    return this.isTouch || innerWidth <= 900 || matchMedia('(pointer: coarse)').matches;
  }

  bindMouse() {
    const canvas = this.canvas;
    canvas.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || this.isTouchMode()) return;
      if (this.mode !== 'playing') return;
      if (document.pointerLockElement !== canvas && canvas.requestPointerLock) {
        canvas.requestPointerLock();
      } else {
        this.firing = true;
      }
    });
    window.addEventListener('pointerup', (e) => {
      if (e.pointerType === 'mouse') this.firing = false;
    });
    window.addEventListener('mousemove', (e) => {
      if (this.mode !== 'playing' || this.isTouchMode()) return;
      if (document.pointerLockElement === canvas) {
        this.lookDX += e.movementX;
        this.lookDY += e.movementY;
      }
    });
    document.addEventListener('pointerlockchange', () => {
      const wasLocked = this.pointerLocked;
      this.pointerLocked = document.pointerLockElement === canvas;
      if (!this.pointerLocked && wasLocked && this.mode === 'playing') this.cb.onPause?.();
    });
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  bindTouch() {
    const joystick = document.getElementById('joystick');
    const knob = document.getElementById('joyKnob');
    if (joystick && knob) {
      const down = (e) => {
        if (this.mode !== 'playing') return;
        e.preventDefault();
        this.joy.active = true;
        this.joy.pointerId = e.pointerId;
        const rect = joystick.getBoundingClientRect();
        this.joy.cx = rect.left + rect.width / 2;
        this.joy.cy = rect.top + rect.height / 2;
        joystick.classList.add('active');
        joystick.setPointerCapture?.(e.pointerId);
        this.updateJoystick(e.clientX, e.clientY, knob);
      };
      const move = (e) => {
        if (!this.joy.active || e.pointerId !== this.joy.pointerId) return;
        e.preventDefault();
        this.updateJoystick(e.clientX, e.clientY, knob);
      };
      const up = (e) => {
        if (e && e.pointerId !== this.joy.pointerId) return;
        this.resetJoystick();
      };
      joystick.addEventListener('pointerdown', down);
      joystick.addEventListener('pointermove', move);
      joystick.addEventListener('pointerup', up);
      joystick.addEventListener('pointercancel', up);
      joystick.addEventListener('lostpointercapture', up);
    }

    const canvas = this.canvas;
    const down = (e) => {
      if (e.pointerType === 'mouse' && !this.isTouchMode()) return;
      if (this.mode !== 'playing') return;
      if (this.lookPointer !== null) return;
      this.lookPointer = e.pointerId;
      this.lookLastX = e.clientX;
      this.lookLastY = e.clientY;
      canvas.setPointerCapture?.(e.pointerId);
    };
    const move = (e) => {
      if (this.lookPointer !== e.pointerId) return;
      e.preventDefault();
      this.lookDX += e.clientX - this.lookLastX;
      this.lookDY += e.clientY - this.lookLastY;
      this.lookLastX = e.clientX;
      this.lookLastY = e.clientY;
    };
    const up = (e) => {
      if (this.lookPointer === e.pointerId) this.lookPointer = null;
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('lostpointercapture', up);
  }

  updateJoystick(cx, cy, knob) {
    const dx = cx - this.joy.cx;
    const dy = cy - this.joy.cy;
    const max = 48;
    const len = Math.hypot(dx, dy);
    const clamped = Math.min(len, max);
    const nx = len > 0 ? (dx / len) * (clamped / max) : 0;
    const ny = len > 0 ? (dy / len) * (clamped / max) : 0;
    const dead = 0.13;
    let mx = nx;
    let my = ny;
    const mag = Math.hypot(mx, my);
    if (mag < dead) { mx = 0; my = 0; }
    else {
      const scaled = (mag - dead) / (1 - dead);
      mx = (mx / mag) * scaled;
      my = (my / mag) * scaled;
    }
    this.joy.x = mx;
    this.joy.y = -my;
    if (knob) knob.style.transform = `translate(${nx * max}px, ${ny * max}px)`;
  }

  resetJoystick() {
    this.joy.active = false;
    this.joy.pointerId = null;
    this.joy.x = 0;
    this.joy.y = 0;
    const joystick = document.getElementById('joystick');
    const knob = document.getElementById('joyKnob');
    joystick?.classList.remove('active');
    if (knob) knob.style.transform = 'translate(0px, 0px)';
  }

  bindTilt() {
    this.orientationHandler = (ev) => {
      if (!this.tiltEnabled) return;
      if (ev.gamma === null || ev.beta === null) return;
      this.hasTiltData = true;
      if (this.tiltCalibrating || !this.tiltBaseline) {
        this.tiltBaseline = { gamma: ev.gamma, beta: ev.beta };
        this.tiltCalibrating = false;
        return;
      }
      let dg = ev.gamma - this.tiltBaseline.gamma;
      let db = ev.beta - this.tiltBaseline.beta;
      while (dg > 180) dg -= 360;
      while (dg < -180) dg += 360;
      while (db > 180) db -= 360;
      while (db < -180) db += 360;

      // Map device axes to screen axes so tilt feels right in portrait and landscape.
      const rawAngle = (screen.orientation && typeof screen.orientation.angle === 'number')
        ? screen.orientation.angle
        : (typeof window.orientation === 'number' ? window.orientation : 0);
      const angle = ((rawAngle % 360) + 360) % 360;
      let yawIn = dg;
      let pitchIn = db;
      if (angle === 90) { yawIn = db; pitchIn = -dg; }
      else if (angle === 270) { yawIn = -db; pitchIn = dg; }
      else if (angle === 180) { yawIn = -dg; pitchIn = -db; }

      const dead = 2.5;
      const yawAdj = Math.abs(yawIn) < dead ? 0 : yawIn - Math.sign(yawIn) * dead;
      const pitchAdj = Math.abs(pitchIn) < dead ? 0 : pitchIn - Math.sign(pitchIn) * dead;
      this.tiltYawRate = clamp(-yawAdj * 0.052, -1.9, 1.9) * this.tiltSensitivity;
      this.tiltPitchRate = clamp(pitchAdj * 0.035, -1.25, 1.25) * this.tiltSensitivity;
    };
    window.addEventListener('deviceorientation', this.orientationHandler, true);
    window.addEventListener('orientationchange', () => {
      if (this.tiltEnabled) this.calibrateTilt();
    });
  }

  async enableTilt() {
    if (!this.tiltAvailable) return { ok: false, reason: 'unsupported' };
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response !== 'granted') return { ok: false, reason: 'denied' };
      }
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        try { await DeviceMotionEvent.requestPermission(); } catch { /* orientation is enough */ }
      }
      this.tiltEnabled = true;
      this.tiltBaseline = null;
      this.tiltCalibrating = true;
      this.tiltYawRate = 0;
      this.tiltPitchRate = 0;
      this.hasTiltData = false;
      return { ok: true };
    } catch (err) {
      return { ok: false, reason: 'error' };
    }
  }

  disableTilt() {
    this.tiltEnabled = false;
    this.tiltYawRate = 0;
    this.tiltPitchRate = 0;
    this.tiltBaseline = null;
  }

  calibrateTilt() {
    this.tiltCalibrating = true;
  }

  get moveX() {
    let x = 0;
    if (this.keys.has('a') || this.keys.has('arrowleft')) x -= 1;
    if (this.keys.has('d') || this.keys.has('arrowright')) x += 1;
    return clamp(x + this.joy.x, -1, 1);
  }

  get moveY() {
    let y = 0;
    if (this.keys.has('w') || this.keys.has('arrowup')) y += 1;
    if (this.keys.has('s') || this.keys.has('arrowdown')) y -= 1;
    return clamp(y + this.joy.y, -1, 1);
  }

  get moveMagnitude() {
    return Math.min(1, Math.hypot(this.moveX, this.moveY));
  }

  consumeLook() {
    const out = { x: this.lookDX, y: this.lookDY };
    this.lookDX = 0;
    this.lookDY = 0;
    return out;
  }

  setMode(mode) {
    this.mode = mode;
    if (mode !== 'playing') {
      this.firing = false;
      this.resetJoystick();
      this.keys.clear();
      if (document.pointerLockElement) document.exitPointerLock?.();
    }
  }
}
