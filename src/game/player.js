import * as THREE from 'three';
import { clamp, damp, rand, DEG, TAU } from './utils.js';

const EYE = 1.7;

export class Player {
  constructor({ camera, world, audio, settings = {} }) {
    this.camera = camera;
    this.world = world;
    this.audio = audio;
    this.position = new THREE.Vector3(0, EYE, 16);
    this.velocity = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.roll = 0;
    this.moveInput = new THREE.Vector2();
    this.touchMove = new THREE.Vector2();
    this.keys = new Set();
    this.sensitivity = settings.sensitivity ?? 1;
    this.enabled = false;
    this.isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 820;
    this.bobPhase = 0;
    this.bob = 0;
    this.speed = 0;
    this.sprint = 0;
    this.shake = 0;
    this.tiltEnabled = false;
    this.tiltCalibrated = false;
    this.tiltBase = { beta: 0, gamma: 0 };
    this.tiltLast = { beta: 0, gamma: 0 };
    this.tiltReady = false;
    this._lookPointer = null;
    this._lookLast = { x: 0, y: 0 };
    this._joystickPointer = null;
    this._joystickCenter = { x: 0, y: 0 };
    this._onMotion = this._onMotion.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._lastPointerFire = 0;
    this.fovBoost = 0;
  }

  setSensitivity(v) { this.sensitivity = clamp(Number(v) || 1, 0.3, 2.5); }

  setEnabled(on) {
    this.enabled = Boolean(on);
    if (!on) {
      this.touchMove.set(0, 0);
      this.keys.clear();
      if (document.pointerLockElement) document.exitPointerLock?.();
    }
  }

  bindCanvas(canvas) {
    this.canvas = canvas;
    canvas.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        if (this._lookPointer !== null) return;
        this._lookPointer = e.pointerId;
        this._lookLast.x = e.clientX;
        this._lookLast.y = e.clientY;
        canvas.setPointerCapture?.(e.pointerId);
        e.preventDefault();
      } else {
        if (document.pointerLockElement !== canvas && this.enabled) {
          canvas.requestPointerLock?.();
        }
      }
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!this.enabled) return;
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        if (e.pointerId !== this._lookPointer) return;
        const dx = e.clientX - this._lookLast.x;
        const dy = e.clientY - this._lookLast.y;
        this._lookLast.x = e.clientX;
        this._lookLast.y = e.clientY;
        this.lookBy(dx, dy, 0.0042);
      }
    });

    const endLook = (e) => {
      if (e.pointerId === this._lookPointer) {
        this._lookPointer = null;
        if (canvas.hasPointerCapture?.(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      }
    };
    canvas.addEventListener('pointerup', endLook);
    canvas.addEventListener('pointercancel', endLook);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    document.addEventListener('mousemove', (e) => {
      if (!this.enabled) return;
      if (document.pointerLockElement === canvas) {
        this.lookBy(e.movementX, e.movementY, 0.0022);
      }
    });

    document.addEventListener('pointerlockchange', () => {
      document.body.classList.toggle('is-locked', document.pointerLockElement === canvas);
    });
  }

  bindKeyboard() {
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('blur', this._onBlur);
  }

  _onKeyDown(e) {
    if (!this.enabled) return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    this.keys.add(e.code);
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  }

  _onKeyUp(e) { this.keys.delete(e.code); }
  _onBlur() { this.keys.clear(); this.touchMove.set(0, 0); }

  bindJoystick(element, stick) {
    const radius = () => element.clientWidth * 0.34;
    const update = (e) => {
      const dx = e.clientX - this._joystickCenter.x;
      const dy = e.clientY - this._joystickCenter.y;
      const max = radius();
      const len = Math.hypot(dx, dy);
      const k = len > max ? max / len : 1;
      const nx = dx * k;
      const ny = dy * k;
      this.touchMove.set(nx / max, -ny / max);
      stick.style.transform = `translate(${nx}px, ${ny}px)`;
    };
    element.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      this._joystickPointer = e.pointerId;
      const rect = element.getBoundingClientRect();
      this._joystickCenter.x = rect.left + rect.width / 2;
      this._joystickCenter.y = rect.top + rect.height / 2;
      element.setPointerCapture?.(e.pointerId);
      element.classList.add('is-active');
      update(e);
      e.preventDefault();
      e.stopPropagation();
    });
    element.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this._joystickPointer) return;
      update(e);
      e.preventDefault();
      e.stopPropagation();
    });
    const end = (e) => {
      if (e.pointerId !== this._joystickPointer) return;
      this._joystickPointer = null;
      this.touchMove.set(0, 0);
      stick.style.transform = 'translate(0px, 0px)';
      element.classList.remove('is-active');
      if (element.hasPointerCapture?.(e.pointerId)) element.releasePointerCapture(e.pointerId);
    };
    element.addEventListener('pointerup', end);
    element.addEventListener('pointercancel', end);
  }

  lookBy(dx, dy, scale) {
    const s = scale * this.sensitivity;
    this.yaw -= dx * s;
    this.pitch = clamp(this.pitch - dy * s, -1.35, 1.35);
    this.yaw = ((this.yaw + Math.PI) % TAU + TAU) % TAU - Math.PI;
  }

  applyRecoil(amount = 1, yawKick = 0) {
    this.recoilPitch += amount * 0.014;
    this.recoilYaw += yawKick * 0.01 + rand(-0.35, 0.35) * amount * 0.004;
    this.shake = Math.max(this.shake, amount * 0.12);
  }

  addShake(amount) { this.shake = Math.max(this.shake, amount); }

  hitShake() {
    this.shake = Math.max(this.shake, 0.62);
    this.recoilPitch += rand(0.02, 0.05);
    this.recoilYaw += rand(-0.03, 0.03);
  }

  async enableTilt() {
    try {
      const anyMotion = window.DeviceMotionEvent;
      const anyOrient = window.DeviceOrientationEvent;
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        const res = await anyMotion.requestPermission();
        if (res !== 'granted') return false;
      }
      if (anyOrient && typeof anyOrient.requestPermission === 'function') {
        const res = await anyOrient.requestPermission();
        if (res !== 'granted') return false;
      }
      if (!('DeviceOrientationEvent' in window)) return false;
      window.addEventListener('deviceorientation', this._onMotion);
      this.tiltEnabled = true;
      this.tiltReady = true;
      this.tiltCalibrated = false;
      return true;
    } catch {
      return false;
    }
  }

  disableTilt() {
    window.removeEventListener('deviceorientation', this._onMotion);
    this.tiltEnabled = false;
  }

  recalibrateTilt() {
    this.tiltBase.beta = this.tiltLast.beta;
    this.tiltBase.gamma = this.tiltLast.gamma;
    this.tiltCalibrated = true;
  }

  _onMotion(e) {
    if (e.beta == null || e.gamma == null) return;
    this.tiltLast.beta = e.beta;
    this.tiltLast.gamma = e.gamma;
    if (!this.tiltCalibrated) {
      this.tiltBase.beta = e.beta;
      this.tiltBase.gamma = e.gamma;
      this.tiltCalibrated = true;
      return;
    }
    if (!this.enabled) return;
    const angle = (screen.orientation?.angle ?? window.orientation ?? 0) % 360;
    let yawAxis;
    let pitchAxis;
    if (angle === 90) { yawAxis = -e.beta; pitchAxis = e.gamma; }
    else if (angle === 270 || angle === -90) { yawAxis = e.beta; pitchAxis = -e.gamma; }
    else if (angle === 180) { yawAxis = -e.gamma; pitchAxis = -e.beta; }
    else { yawAxis = e.gamma; pitchAxis = e.beta; }
    const baseYaw = this.tiltBase.gamma;
    const basePitch = this.tiltBase.beta;
    const dyaw = yawAxis - this.tiltBase.gamma;
    const dpitch = pitchAxis - this.tiltBase.beta;
    const dead = 0.55;
    if (Math.abs(dyaw) > dead) this.yaw -= (dyaw - Math.sign(dyaw) * dead) * 0.00115;
    if (Math.abs(dpitch) > dead) this.pitch = clamp(this.pitch - (dpitch - Math.sign(dpitch) * dead) * 0.00115, -1.35, 1.35);
  }

  reset() {
    this.position.set(0, EYE, 16);
    this.velocity.set(0, 0, 0);
    this.yaw = 0;
    this.pitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.shake = 0;
    this.moveInput.set(0, 0);
    this.touchMove.set(0, 0);
  }

  update(dt, t) {
    const keys = this.keys;
    let fwd = 0;
    let side = 0;
    if (this.enabled) {
      if (keys.has('KeyW') || keys.has('ArrowUp')) fwd += 1;
      if (keys.has('KeyS') || keys.has('ArrowDown')) fwd -= 1;
      if (keys.has('KeyD') || keys.has('ArrowRight')) side += 1;
      if (keys.has('KeyA') || keys.has('ArrowLeft')) side -= 1;
      fwd += this.touchMove.y;
      side += this.touchMove.x;
    }
    const mag = Math.min(1, Math.hypot(fwd, side));
    if (mag > 0.01) {
      const norm = 1 / Math.hypot(fwd, side);
      fwd *= norm;
      side *= norm;
    }
    const wantsSprint = keys.has('ShiftLeft') || keys.has('ShiftRight') || (this.touchMove.length() > 0.92);
    const targetSpeed = mag * (wantsSprint ? 7.4 : 5.2);
    this.sprint = damp(this.sprint, wantsSprint && mag > 0.4 ? 1 : 0, 6, dt);

    const sy = Math.sin(this.yaw);
    const cy = Math.cos(this.yaw);
    const dx = (-sy * fwd + cy * side);
    const dz = (-cy * fwd - sy * side);
    const targetVx = dx * targetSpeed;
    const targetVz = dz * targetSpeed;
    this.velocity.x = damp(this.velocity.x, targetVx, 11, dt);
    this.velocity.z = damp(this.velocity.z, targetVz, 11, dt);

    this.position.x += this.velocity.x * dt;
    this.position.z += this.velocity.z * dt;
    this.world.pushOut(this.position, 0.5);

    this.speed = Math.hypot(this.velocity.x, this.velocity.z);
    this.bobPhase += dt * (this.speed * 1.7 + 0.2);
    const bobTarget = this.speed > 0.4 ? Math.sin(this.bobPhase) * 0.035 + Math.abs(Math.cos(this.bobPhase)) * 0.018 : 0;
    this.bob = damp(this.bob, bobTarget, 9, dt);

    this.recoilPitch = damp(this.recoilPitch, 0, 13, dt);
    this.recoilYaw = damp(this.recoilYaw, 0, 13, dt);
    this.shake = damp(this.shake, 0, 7, dt);
    this.roll = damp(this.roll, -side * 0.022 - this.velocity.x * 0.002, 6, dt);

    const shakeX = this.shake ? rand(-1, 1) * this.shake * 0.045 : 0;
    const shakeY = this.shake ? rand(-1, 1) * this.shake * 0.045 : 0;

    this.camera.position.set(
      this.position.x + Math.cos(this.yaw) * shakeX,
      this.position.y + this.bob + shakeY,
      this.position.z - Math.sin(this.yaw) * shakeX
    );
    this.camera.rotation.set(
      clamp(this.pitch + this.recoilPitch + shakeY * 0.7, -1.5, 1.5),
      this.yaw + this.recoilYaw + shakeX * 0.5,
      this.roll + (this.shake ? rand(-1, 1) * this.shake * 0.03 : 0)
    );

    const aspect = window.innerWidth / window.innerHeight;
    const baseFov = aspect < 0.72 ? 86 : aspect < 1 ? 80 : 72;
    const fovTarget = baseFov + this.sprint * 6 + this.fovBoost;
    if (Math.abs(this.camera.fov - fovTarget) > 0.01) {
      this.camera.fov = damp(this.camera.fov, fovTarget, 4, dt);
      this.camera.updateProjectionMatrix();
    }
  }

  getMovingIntensity() { return clamp(this.speed / 6, 0, 1); }

  forwardVector(out = new THREE.Vector3()) {
    return out.set(
      -Math.sin(this.yaw) * Math.cos(this.pitch),
      Math.sin(this.pitch),
      -Math.cos(this.yaw) * Math.cos(this.pitch)
    ).normalize();
  }

  chestPosition(out = new THREE.Vector3()) {
    return out.set(this.position.x, this.position.y - 0.15, this.position.z);
  }
}
