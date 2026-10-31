import { clamp, damp } from './util.js';

const DEADZONE = 0.14;

export class Controls {
  constructor({ canvas, stickZone, stickBase, stickKnob, lookZone, fireBtn, dashBtn, onDash, onPause }) {
    this.canvas = canvas;
    this.stickZone = stickZone;
    this.stickBase = stickBase;
    this.stickKnob = stickKnob;
    this.lookZone = lookZone;
    this.fireBtn = fireBtn;
    this.dashBtn = dashBtn;
    this.onDash = onDash;
    this.onPause = onPause;

    this.move = { x: 0, y: 0 };
    this.lookDelta = { x: 0, y: 0 };
    this.firing = false;
    this.enabled = false;
    this.sensitivity = Number(localStorage.getItem('morrovivo.sens') || 1);
    this.keys = new Set();
    this.isTouch = window.matchMedia('(pointer: coarse)').matches;

    this._stickId = null;
    this._stickOrigin = { x: 0, y: 0 };
    this._lookId = null;
    this._lookLast = { x: 0, y: 0 };
    this._stickRect = null;

    this.tilt = new TiltAim();

    this._bind();
  }

  _bind() {
    const zone = this.stickZone;
    zone.addEventListener('pointerdown', (e) => {
      if (!this.enabled || this._stickId !== null) return;
      e.preventDefault();
      this._stickId = e.pointerId;
      const rect = zone.getBoundingClientRect();
      this._stickRect = rect;
      this._stickOrigin.x = e.clientX - rect.left;
      this._stickOrigin.y = e.clientY - rect.top;
      this.stickBase.classList.remove('hidden');
      this.stickBase.style.left = `${this._stickOrigin.x}px`;
      this.stickBase.style.top = `${this._stickOrigin.y}px`;
      this._updateStick(e.clientX - rect.left, e.clientY - rect.top);
      zone.classList.add('active');
      try { zone.setPointerCapture?.(e.pointerId); } catch {}
    });
    zone.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this._stickId || !this._stickRect) return;
      e.preventDefault();
      this._updateStick(e.clientX - this._stickRect.left, e.clientY - this._stickRect.top);
    });
    const endStick = (e) => {
      if (e.pointerId !== this._stickId) return;
      this._stickId = null;
      this.move.x = 0;
      this.move.y = 0;
      this.stickBase.classList.add('hidden');
      zone.classList.remove('active');
    };
    zone.addEventListener('pointerup', endStick);
    zone.addEventListener('pointercancel', endStick);
    zone.addEventListener('pointerleave', (e) => { if (e.pointerId === this._stickId) endStick(e); });

    const look = this.lookZone;
    look.addEventListener('pointerdown', (e) => {
      if (!this.enabled || this._lookId !== null) return;
      e.preventDefault();
      this._lookId = e.pointerId;
      this._lookLast.x = e.clientX;
      this._lookLast.y = e.clientY;
      try { look.setPointerCapture?.(e.pointerId); } catch {}
      if (e.pointerType === 'mouse' && e.button === 0) this.firing = true;
    });
    look.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this._lookId) return;
      e.preventDefault();
      const dx = e.clientX - this._lookLast.x;
      const dy = e.clientY - this._lookLast.y;
      this._lookLast.x = e.clientX;
      this._lookLast.y = e.clientY;
      const s = 0.0042 * this.sensitivity;
      this.lookDelta.x += dx * s;
      this.lookDelta.y += dy * s;
    });
    const endLook = (e) => {
      if (e.pointerId !== this._lookId) return;
      this._lookId = null;
      if (e.pointerType === 'mouse') this.firing = false;
    };
    look.addEventListener('pointerup', endLook);
    look.addEventListener('pointercancel', endLook);
    look.addEventListener('contextmenu', (e) => e.preventDefault());

    const fire = this.fireBtn;
    const startFire = (e) => {
      if (!this.enabled) return;
      e.preventDefault();
      try { fire.setPointerCapture?.(e.pointerId); } catch {}
      this.firing = true;
      fire.classList.add('firing');
    };
    const stopFire = () => {
      this.firing = false;
      fire.classList.remove('firing');
    };
    fire.addEventListener('pointerdown', startFire);
    fire.addEventListener('pointerup', stopFire);
    fire.addEventListener('pointercancel', stopFire);
    fire.addEventListener('pointerleave', stopFire);

    const dash = this.dashBtn;
    dash.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      e.preventDefault();
      try { dash.setPointerCapture?.(e.pointerId); } catch {}
      this.onDash?.();
    });

    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      this.keys.add(e.code);
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
      if (e.code === 'Space') this.onDash?.();
      if (e.code === 'KeyP' || e.code === 'Escape') this.onPause?.();
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.firing = false;
      this._stickId = null;
      this._lookId = null;
      this.move.x = 0;
      this.move.y = 0;
      this.stickBase.classList.add('hidden');
    });
  }

  _updateStick(x, y) {
    const dx = x - this._stickOrigin.x;
    const dy = y - this._stickOrigin.y;
    const len = Math.hypot(dx, dy);
    const max = 42;
    const k = len > max ? max / len : 1;
    const kx = dx * k;
    const ky = dy * k;
    this.stickKnob.style.transform = `translate(${kx}px, ${ky}px)`;
    let mx = kx / max;
    let my = -ky / max;
    const mag = Math.hypot(mx, my);
    if (mag < DEADZONE) {
      this.move.x = 0;
      this.move.y = 0;
      return;
    }
    const norm = (mag - DEADZONE) / (1 - DEADZONE) / mag;
    this.move.x = clamp(mx * norm, -1, 1);
    this.move.y = clamp(my * norm, -1, 1);
  }

  setEnabled(value) {
    this.enabled = value;
    if (!value) {
      this.firing = false;
      this.move.x = 0;
      this.move.y = 0;
      this._stickId = null;
      this._lookId = null;
      this.stickBase.classList.add('hidden');
      this.fireBtn.classList.remove('firing');
    }
  }

  consumeLook() {
    const out = { x: this.lookDelta.x, y: this.lookDelta.y };
    this.lookDelta.x = 0;
    this.lookDelta.y = 0;
    return out;
  }

  update(dt) {
    // keyboard movement merges into the virtual stick
    let kx = 0;
    let ky = 0;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) ky += 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) ky -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) kx += 1;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) kx -= 1;
    if (kx || ky) {
      const len = Math.hypot(kx, ky);
      this.move.x = kx / len;
      this.move.y = ky / len;
    } else if (this._stickId === null) {
      this.move.x = 0;
      this.move.y = 0;
    }
    this.tilt.update(dt);
  }

  setSensitivity(value) {
    this.sensitivity = value;
    localStorage.setItem('morrovivo.sens', String(value));
  }
}

export class TiltAim {
  constructor() {
    this.enabled = false;
    this.available = false;
    this.neutral = null;
    this.raw = null;
    this.offset = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this._gotEvent = false;
    this._handler = this._onOrientation.bind(this);
    this._permission = null;
    this.orientationAngle = 0;
  }

  get needsPermission() {
    return typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function';
  }

  async enable() {
    if (this.enabled) return { ok: true, reason: 'already' };
    if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) {
      return { ok: false, reason: 'unsupported' };
    }
    if (this.needsPermission) {
      try {
        this._permission = await DeviceOrientationEvent.requestPermission();
        if (this._permission !== 'granted') return { ok: false, reason: 'denied' };
      } catch (error) {
        return { ok: false, reason: 'denied' };
      }
    }
    this._gotEvent = false;
    this.enabled = true;
    this.neutral = null;
    this.orientationAngle = this._screenAngle();
    window.addEventListener('deviceorientation', this._handler, true);
    const got = await new Promise((resolve) => {
      let waited = 0;
      const timer = setInterval(() => {
        waited += 100;
        if (this._gotEvent) {
          clearInterval(timer);
          resolve(true);
        } else if (waited >= 2200) {
          clearInterval(timer);
          resolve(false);
        }
      }, 100);
    });
    if (!got) {
      this.disable();
      return { ok: false, reason: 'nosensor' };
    }
    this.available = true;
    return { ok: true, reason: 'ok' };
  }

  disable() {
    this.enabled = false;
    this.available = false;
    this.offset.x = 0;
    this.offset.y = 0;
    this.target.x = 0;
    this.target.y = 0;
    window.removeEventListener('deviceorientation', this._handler, true);
  }

  calibrate() {
    if (this.raw) {
      this.neutral = { beta: this.raw.beta, gamma: this.raw.gamma };
      this.target.x = 0;
      this.target.y = 0;
      this.offset.x = 0;
      this.offset.y = 0;
      this.orientationAngle = this._screenAngle();
    }
  }

  _screenAngle() {
    if (screen.orientation && typeof screen.orientation.angle === 'number') return screen.orientation.angle;
    return typeof window.orientation === 'number' ? window.orientation : 0;
  }

  _onOrientation(e) {
    if (typeof e.beta !== 'number' || typeof e.gamma !== 'number') return;
    if (e.beta === null || e.gamma === null) return;
    this.raw = { beta: e.beta, gamma: e.gamma };
    this._gotEvent = true;
    if (!this.neutral) {
      this.neutral = { beta: e.beta, gamma: e.gamma };
    }
  }

  update(dt) {
    if (!this.enabled || !this.raw || !this.neutral) {
      this.offset.x = damp(this.offset.x, 0, 10, dt);
      this.offset.y = damp(this.offset.y, 0, 10, dt);
      return;
    }
    const dBeta = this.raw.beta - this.neutral.beta;
    const dGamma = this.raw.gamma - this.neutral.gamma;
    let x;
    let y;
    const angle = this.orientationAngle;
    if (angle === 90) { x = -dBeta; y = dGamma; }
    else if (angle === 180) { x = -dGamma; y = -dBeta; }
    else if (angle === 270) { x = dBeta; y = -dGamma; }
    else { x = dGamma; y = dBeta; }

    const dead = 1.6;
    x = Math.abs(x) < dead ? 0 : x - Math.sign(x) * dead;
    y = Math.abs(y) < dead ? 0 : y - Math.sign(y) * dead;

    this.target.x = clamp(x * 0.0125, -0.5, 0.5);
    this.target.y = clamp(y * 0.009, -0.34, 0.34);
    this.offset.x = damp(this.offset.x, this.target.x, 11, dt);
    this.offset.y = damp(this.offset.y, this.target.y, 11, dt);
  }
}
