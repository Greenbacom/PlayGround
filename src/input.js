import * as THREE from 'three'

export const isTouchDevice = () => {
  if (new URLSearchParams(location.search).has('touch')) return true
  return (
    window.matchMedia?.('(pointer: coarse)').matches ||
    (navigator.maxTouchPoints > 0 && window.innerWidth < 1200) ||
    'ontouchstart' in window
  )
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

const _zee = new THREE.Vector3(0, 0, 1)
const _euler = new THREE.Euler()
const _q0 = new THREE.Quaternion()
const _q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5))
const _quat = new THREE.Quaternion()
const _forward = new THREE.Vector3()

function deviceQuaternion(alpha, beta, gamma, orient, out) {
  _euler.set(beta, alpha, -gamma, 'YXZ')
  out.setFromEuler(_euler)
  out.multiply(_q1)
  out.multiply(_q0.setFromAxisAngle(_zee, -orient))
  return out
}

export class InputManager {
  constructor({ canvas, joystick, joystickKnob, fireBtn, reloadBtn, swapBtn, dashBtn, onPause, onAction, canLock }) {
    this.canvas = canvas
    this.joystickEl = joystick
    this.joystickKnob = joystickKnob
    this.fireBtn = fireBtn
    this.reloadBtn = reloadBtn
    this.swapBtn = swapBtn
    this.dashBtn = dashBtn
    this.onPause = onPause
    this.onAction = onAction
    this.canLock = canLock

    this.touch = isTouchDevice()
    this.active = false
    this.firing = false
    this.keys = new Set()
    this.lookX = 0
    this.lookY = 0
    this.moveX = 0
    this.moveY = 0
    this.joystickValue = { x: 0, y: 0 }
    this.sensitivity = 1
    this.invertY = false
    this.haptics = true

    this.desktopLocked = false
    this.lookPointerId = null
    this.lastLook = { x: 0, y: 0 }
    this.joyPointerId = null
    this.joyStart = { x: 0, y: 0 }
    this.joyRadius = 46

    this.actions = { dash: false, reload: false, swap: false }

    this.tiltEnabled = false
    this.tiltSupported = typeof DeviceOrientationEvent !== 'undefined'
    this.tiltPermission = 'unknown'
    this.tiltSensitivity = 1
    this.tiltPrimed = false
    this.tiltLastForward = new THREE.Vector3(0, 0, -1)
    this.tiltFwd = new THREE.Vector3()
    this.tiltDeltaFrames = 0
    this.tiltEventSeen = false

    this._bind()
  }

  _bind() {
    window.addEventListener('keydown', (e) => this._onKeyDown(e))
    window.addEventListener('keyup', (e) => this._onKeyUp(e))
    window.addEventListener('blur', () => {
      this.keys.clear()
      this.firing = false
      this.moveX = this.moveY = 0
      this.joystickValue.x = this.joystickValue.y = 0
      this._resetKnob()
      this.fireBtn?.classList.remove('pressed')
    })

    this.canvas.addEventListener('pointerdown', (e) => this._onCanvasDown(e))
    window.addEventListener('pointermove', (e) => this._onPointerMove(e))
    window.addEventListener('pointerup', (e) => this._onPointerUp(e))
    window.addEventListener('pointercancel', (e) => this._onPointerUp(e))
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault())

    document.addEventListener('pointerlockchange', () => {
      this.desktopLocked = document.pointerLockElement === this.canvas
      if (!this.desktopLocked) {
        this.firing = false
      }
      this.onAction?.('lockchange', this.desktopLocked)
    })
    document.addEventListener('pointerlockerror', () => this.onAction?.('lockerror'))

    if (this.joystickEl) {
      this.joystickEl.addEventListener('pointerdown', (e) => this._onJoystickDown(e))
      this.joystickEl.addEventListener('pointermove', (e) => this._onJoystickMove(e))
      this.joystickEl.addEventListener('pointerup', (e) => this._onJoystickUp(e))
      this.joystickEl.addEventListener('pointercancel', (e) => this._onJoystickUp(e))
    }
    this._bindHoldButton(this.fireBtn, () => {
      this.firing = true
      this.fireBtn.classList.add('pressed')
    }, () => {
      this.firing = false
      this.fireBtn.classList.remove('pressed')
    })
    this._bindTapButton(this.reloadBtn, 'reload')
    this._bindTapButton(this.swapBtn, 'swap')
    this._bindTapButton(this.dashBtn, 'dash')

    const onOrient = (e) => this._onOrientation(e)
    this._orientationHandler = onOrient
  }

  _onKeyDown(e) {
    const k = e.key.toLowerCase()
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) {
      e.preventDefault()
    }
    if (e.repeat) return
    this.keys.add(k)
    if (!this.active) return
    if (k === 'escape' || k === 'p') {
      this.onPause?.()
      return
    }
    if (k === 'r') this.actions.reload = true
    if (k === 'q') this.actions.swap = true
    if (k === 'e' || k === ' ') this.actions.dash = true
    if (k === '1' || k === '2') this.onAction?.('weapon', Number(k) - 1)
    if (k === 'm') this.onAction?.('mute')
  }

  _onKeyUp(e) {
    this.keys.delete(e.key.toLowerCase())
  }

  _onCanvasDown(e) {
    if (!this.active) return
    if (e.pointerType === 'mouse') {
      if (!this.desktopLocked) {
        if (this.canLock?.()) this.canvas.requestPointerLock?.()
        return
      }
      if (e.button === 0) {
        this.firing = true
      }
      return
    }
    // touch look — only if this pointer is not over a UI control
    if (this.lookPointerId !== null) return
    this.lookPointerId = e.pointerId
    this.lastLook.x = e.clientX
    this.lastLook.y = e.clientY
    try {
      this.canvas.setPointerCapture(e.pointerId)
    } catch {}
  }

  _onPointerMove(e) {
    if (e.pointerType === 'mouse') {
      if (!this.active || !this.desktopLocked) return
      const scale = 0.0021 * this.sensitivity
      this.lookX += e.movementX * scale
      this.lookY += e.movementY * scale * (this.invertY ? -1 : 1)
      return
    }
    if (e.pointerId === this.lookPointerId) {
      const dx = e.clientX - this.lastLook.x
      const dy = e.clientY - this.lastLook.y
      this.lastLook.x = e.clientX
      this.lastLook.y = e.clientY
      const scale = 0.0042 * this.sensitivity
      this.lookX += dx * scale
      this.lookY += dy * scale * (this.invertY ? -1 : 1)
    }
  }

  _onPointerUp(e) {
    if (e.pointerType === 'mouse') {
      if (e.button === 0) this.firing = false
      return
    }
    if (e.pointerId === this.lookPointerId) this.lookPointerId = null
  }

  _onJoystickDown(e) {
    if (!this.active) return
    if (this.joyPointerId !== null) return
    e.preventDefault()
    this.joyPointerId = e.pointerId
    const rect = this.joystickEl.getBoundingClientRect()
    this.joyStart.x = rect.left + rect.width / 2
    this.joyStart.y = rect.top + rect.height / 2
    this.joyRadius = rect.width * 0.38
    this.joystickEl.classList.add('active')
    try {
      this.joystickEl.setPointerCapture(e.pointerId)
    } catch {}
    this._updateJoystick(e.clientX, e.clientY)
  }

  _onJoystickMove(e) {
    if (e.pointerId !== this.joyPointerId) return
    e.preventDefault()
    this._updateJoystick(e.clientX, e.clientY)
  }

  _onJoystickUp(e) {
    if (e.pointerId !== this.joyPointerId) return
    this.joyPointerId = null
    this.joystickValue.x = 0
    this.joystickValue.y = 0
    this.moveX = 0
    this.moveY = 0
    this.joystickEl.classList.remove('active')
    this._resetKnob()
  }

  _updateJoystick(x, y) {
    const dx = x - this.joyStart.x
    const dy = y - this.joyStart.y
    const len = Math.hypot(dx, dy)
    const radius = this.joyRadius
    const clamped = Math.min(len, radius)
    const nx = len > 0 ? (dx / len) * (clamped / radius) : 0
    const ny = len > 0 ? (dy / len) * (clamped / radius) : 0
    this.joystickValue.x = nx
    this.joystickValue.y = ny
    this.moveX = nx
    this.moveY = -ny
    if (this.joystickKnob) {
      this.joystickKnob.style.transform = `translate(calc(-50% + ${nx * radius}px), calc(-50% + ${ny * radius}px))`
    }
    if (Math.hypot(nx, ny) > 0.95 && this.haptics) navigator.vibrate?.(4)
  }

  _resetKnob() {
    if (this.joystickKnob) this.joystickKnob.style.transform = 'translate(-50%, -50%)'
  }

  _bindHoldButton(el, down, up) {
    if (!el) return
    el.addEventListener('pointerdown', (e) => {
      if (!this.active) return
      e.preventDefault()
      try {
        el.setPointerCapture(e.pointerId)
      } catch {}
      down()
    })
    const end = (e) => {
      e?.preventDefault?.()
      up()
    }
    el.addEventListener('pointerup', end)
    el.addEventListener('pointercancel', end)
    el.addEventListener('lostpointercapture', up)
  }

  _bindTapButton(el, action) {
    if (!el) return
    el.addEventListener('pointerdown', (e) => {
      if (!this.active) return
      e.preventDefault()
      this.actions[action] = true
      el.classList.add('pressed')
      setTimeout(() => el.classList.remove('pressed'), 110)
    })
  }

  setActive(on) {
    this.active = on
    if (!on) {
      this.firing = false
      this.keys.clear()
      this.moveX = this.moveY = 0
      this.joystickValue.x = this.joystickValue.y = 0
      this._resetKnob()
      this.fireBtn?.classList.remove('pressed')
      if (document.pointerLockElement === this.canvas) document.exitPointerLock?.()
    }
  }

  getMove() {
    let x = this.moveX
    let y = this.moveY
    const keys = this.keys
    if (keys.has('w') || keys.has('arrowup')) y += 1
    if (keys.has('s') || keys.has('arrowdown')) y -= 1
    if (keys.has('d') || keys.has('arrowright')) x += 1
    if (keys.has('a') || keys.has('arrowleft')) x -= 1
    const len = Math.hypot(x, y)
    if (len > 1) {
      x /= len
      y /= len
    }
    return { x, y, magnitude: Math.min(1, len), sprint: keys.has('shift') || len > 0.94 }
  }

  consumeLook() {
    const out = { x: this.lookX, y: this.lookY }
    this.lookX = 0
    this.lookY = 0
    return out
  }

  consumeActions() {
    const a = { ...this.actions }
    this.actions.dash = false
    this.actions.reload = false
    this.actions.swap = false
    return a
  }

  requestLock() {
    if (this.touch) return
    this.canvas.requestPointerLock?.()
  }

  /* ── tilt / gyro ────────────────────────────────────────── */
  async requestTiltPermission() {
    if (!this.tiltSupported) {
      this.tiltPermission = 'unsupported'
      return false
    }
    try {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const res = await DeviceOrientationEvent.requestPermission()
        this.tiltPermission = res
        return res === 'granted'
      }
      this.tiltPermission = 'granted'
      return true
    } catch {
      this.tiltPermission = 'denied'
      return false
    }
  }

  async enableTilt(on) {
    if (on) {
      const ok = await this.requestTiltPermission()
      if (!ok) {
        this.tiltEnabled = false
        return { ok: false, reason: this.tiltPermission }
      }
      this.tiltEnabled = true
      this.tiltPrimed = false
      this.tiltDeltaFrames = 0
      this.tiltEventSeen = false
      window.addEventListener('deviceorientation', this._orientationHandler, true)
      return { ok: true }
    }
    this.tiltEnabled = false
    window.removeEventListener('deviceorientation', this._orientationHandler, true)
    return { ok: true }
  }

  calibrateTilt() {
    this.tiltPrimed = false
  }

  _onOrientation(e) {
    if (!this.tiltEnabled) return
    if (e.alpha === null || e.beta === null || e.gamma === null) return
    this.tiltEventSeen = true
    const orient = (screen.orientation?.angle ?? window.orientation ?? 0) * (Math.PI / 180)
    deviceQuaternion(
      THREE.MathUtils.degToRad(e.alpha),
      THREE.MathUtils.degToRad(e.beta),
      THREE.MathUtils.degToRad(e.gamma),
      orient,
      _quat
    )
    _forward.set(0, 0, -1).applyQuaternion(_quat)
    if (!this.tiltPrimed) {
      this.tiltLastForward.copy(_forward)
      this.tiltPrimed = true
      return
    }
    // derive small angular deltas from the forward vector
    const yawNow = Math.atan2(-_forward.x, -_forward.z)
    const yawPrev = Math.atan2(-this.tiltLastForward.x, -this.tiltLastForward.z)
    const pitchNow = Math.asin(clamp(_forward.y, -1, 1))
    const pitchPrev = Math.asin(clamp(this.tiltLastForward.y, -1, 1))
    let dyaw = yawNow - yawPrev
    if (dyaw > Math.PI) dyaw -= Math.PI * 2
    if (dyaw < -Math.PI) dyaw += Math.PI * 2
    let dpitch = pitchNow - pitchPrev
    // Ignore implausible jumps (screen rotation / sensor glitch)
    if (Math.abs(dyaw) < 0.25 && Math.abs(dpitch) < 0.25) {
      const scale = 1.15 * this.tiltSensitivity
      this.lookX += dyaw * scale
      this.lookY += dpitch * scale * (this.invertY ? -1 : 1)
    }
    this.tiltLastForward.copy(_forward)
  }

  haptic(pattern) {
    if (!this.haptics) return
    try {
      navigator.vibrate?.(pattern)
    } catch {}
  }

  setHaptics(on) {
    this.haptics = on
  }
}
