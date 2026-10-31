// Unified keyboard / mouse / touch / gyro input.
import { clamp } from './utils.js'

const DEG = Math.PI / 180

export class Input {
  constructor(canvas, { onPause, onTiltStatus } = {}) {
    this.canvas = canvas
    this.onPause = onPause
    this.onTiltStatus = onTiltStatus
    this.keys = new Set()
    this.lookX = 0
    this.lookY = 0
    this.move = { x: 0, y: 0 }
    this.firing = false
    this.dashQueued = false
    this.switchQueued = false
    this.sensitivity = 1
    this.enabled = false
    this.touch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || matchMedia('(pointer: coarse)').matches
    this.lookPointer = null
    this.stickPointer = null
    this.stick = { active: false, ox: 0, oy: 0, radius: 46, dx: 0, dy: 0 }
    this.tiltEnabled = false
    this.tiltAvailable = typeof DeviceMotionEvent !== 'undefined'
    this.tiltSeen = false
    this.tiltStatusTimer = null
    this.rot = { a: 0, b: 0, g: 0 }
    this.lastTiltEvent = 0
    this.gyroGain = 1.1
    this.pointerLocked = false

    this.bindKeyboard()
    this.bindMouse()
    this.bindTouch()
    this.bindTilt()
  }

  /* ------------------------------------------------------- keyboard */
  bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase()
      this.keys.add(k)
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault()
      if (!this.enabled) return
      if (k === 'escape') this.onPause?.()
      if (k === 'shift') this.dashQueued = true
      if (k === 'q' || k === 'tab') { e.preventDefault(); this.switchQueued = true }
      if (k === '1' || k === '2') this.switchQueued = true
    })
    window.addEventListener('keyup', (e) => this.keys.delete(e.key.toLowerCase()))
    window.addEventListener('blur', () => { this.keys.clear(); this.firing = false })
  }

  /* ---------------------------------------------------------- mouse */
  bindMouse() {
    this.canvas.addEventListener('mousedown', (e) => {
      if (!this.enabled || this.touch || e.button !== 0) return
      if (!this.pointerLocked) {
        this.canvas.requestPointerLock?.()
        return
      }
      this.firing = true
    })
    window.addEventListener('mouseup', () => { this.firing = false })
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === this.canvas
      if (!this.pointerLocked && this.enabled && !this.touch) this.onPause?.()
    })
    document.addEventListener('mousemove', (e) => {
      if (!this.enabled || this.touch) return
      if (this.pointerLocked) {
        this.lookX += e.movementX * 0.0023 * this.sensitivity
        this.lookY += e.movementY * 0.0023 * this.sensitivity
      }
    })
    // drag-look fallback when pointer lock is unavailable
    let dragging = false
    this.canvas.addEventListener('pointerdown', (e) => {
      if (!this.enabled || this.touch || e.pointerType === 'mouse' && this.pointerLocked) return
      if (e.pointerType === 'mouse' && e.button === 0) dragging = true
    })
    window.addEventListener('pointermove', (e) => {
      if (dragging && !this.pointerLocked && this.enabled) {
        this.lookX += e.movementX * 0.0023 * this.sensitivity
        this.lookY += e.movementY * 0.0023 * this.sensitivity
      }
    })
    window.addEventListener('pointerup', () => { dragging = false })
  }

  /* ---------------------------------------------------------- touch */
  bindTouch() {
    // Look drag anywhere on the canvas.
    this.canvas.addEventListener('pointerdown', (e) => {
      if (!this.enabled || e.pointerType === 'mouse') return
      if (this.lookPointer !== null) return
      this.lookPointer = e.pointerId
      this.lastLook = { x: e.clientX, y: e.clientY }
      this.canvas.setPointerCapture?.(e.pointerId)
    })
    this.canvas.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this.lookPointer) return
      const dx = e.clientX - this.lastLook.x
      const dy = e.clientY - this.lastLook.y
      this.lastLook = { x: e.clientX, y: e.clientY }
      this.lookX += dx * 0.0042 * this.sensitivity
      this.lookY += dy * 0.0042 * this.sensitivity
    })
    const endLook = (e) => {
      if (e.pointerId === this.lookPointer) this.lookPointer = null
    }
    this.canvas.addEventListener('pointerup', endLook)
    this.canvas.addEventListener('pointercancel', endLook)

    // Dynamic joystick.
    const zone = document.getElementById('stick-zone')
    const base = document.getElementById('stick-base')
    const knob = document.getElementById('stick-knob')
    if (!zone || !base || !knob) return
    const setKnob = (dx, dy) => {
      knob.style.transform = `translate(${dx}px, ${dy}px)`
    }
    zone.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return
      e.preventDefault()
      this.stickPointer = e.pointerId
      const zr = zone.getBoundingClientRect()
      const lx = clamp(e.clientX - zr.left, 66, zr.width - 66)
      const lb = clamp(zr.bottom - e.clientY, 66, zr.height - 66)
      base.style.left = `${lx}px`
      base.style.bottom = `${lb}px`
      base.classList.add('active')
      this.stick = { active: true, ox: e.clientX, oy: e.clientY, radius: 46, dx: 0, dy: 0 }
      setKnob(0, 0)
      zone.setPointerCapture?.(e.pointerId)
    })
    zone.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this.stickPointer || !this.stick.active) return
      let dx = e.clientX - this.stick.ox
      let dy = e.clientY - this.stick.oy
      const len = Math.hypot(dx, dy)
      const r = this.stick.radius
      if (len > r) { dx = (dx / len) * r; dy = (dy / len) * r }
      this.stick.dx = dx / r
      this.stick.dy = dy / r
      setKnob(dx, dy)
      this.move.x = dx / r
      this.move.y = -dy / r
    })
    const endStick = (e) => {
      if (e.pointerId !== this.stickPointer) return
      this.stickPointer = null
      this.stick.active = false
      this.move.x = 0
      this.move.y = 0
      setKnob(0, 0)
      base.classList.remove('active')
    }
    zone.addEventListener('pointerup', endStick)
    zone.addEventListener('pointercancel', endStick)

    // Fire button.
    const fire = document.getElementById('btn-fire')
    if (fire) {
      fire.addEventListener('pointerdown', (e) => {
        if (!this.enabled) return
        e.preventDefault()
        e.stopPropagation()
        this.firing = true
        fire.classList.add('pressed')
        fire.setPointerCapture?.(e.pointerId)
      })
      const stopFire = (e) => {
        e.preventDefault()
        this.firing = false
        fire.classList.remove('pressed')
      }
      fire.addEventListener('pointerup', stopFire)
      fire.addEventListener('pointercancel', stopFire)
      fire.addEventListener('pointerleave', (e) => {
        if (e.buttons === 0) { this.firing = false; fire.classList.remove('pressed') }
      })
    }
    const dash = document.getElementById('btn-dash')
    dash?.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return
      e.preventDefault(); e.stopPropagation()
      this.dashQueued = true
    })
    const swap = document.getElementById('btn-switch')
    swap?.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return
      e.preventDefault(); e.stopPropagation()
      this.switchQueued = true
    })
  }

  /* ----------------------------------------------------------- tilt */
  bindTilt() {
    this.tiltHandler = (e) => {
      if (!this.tiltEnabled) return
      const rr = e.rotationRate
      if (!rr || (rr.alpha == null && rr.beta == null && rr.gamma == null)) return
      this.tiltSeen = true
      this.lastTiltEvent = performance.now()
      const a = rr.alpha || 0
      const b = rr.beta || 0
      const g = rr.gamma || 0
      // smooth gyro
      this.rot.a += (a - this.rot.a) * 0.35
      this.rot.b += (b - this.rot.b) * 0.35
      this.rot.g += (g - this.rot.g) * 0.35
    }
    window.addEventListener('devicemotion', this.tiltHandler)
    this.recalibrate = () => {
      this.rot.a = this.rot.b = this.rot.g = 0
      this.lastTiltEvent = 0
    }
    window.addEventListener('orientationchange', () => setTimeout(() => this.recalibrate(), 300))
    screen.orientation?.addEventListener?.('change', () => setTimeout(() => this.recalibrate(), 300))
  }

  async enableTilt() {
    if (this.tiltEnabled) {
      this.recalibrate()
      return true
    }
    if (typeof DeviceMotionEvent === 'undefined') {
      this.onTiltStatus?.('unsupported')
      return false
    }
    try {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        const res = await DeviceMotionEvent.requestPermission()
        if (res !== 'granted') {
          this.onTiltStatus?.('denied')
          return false
        }
      }
    } catch {
      this.onTiltStatus?.('denied')
      return false
    }
    this.tiltEnabled = true
    this.tiltSeen = false
    this.recalibrate()
    this.onTiltStatus?.('enabled')
    clearTimeout(this.tiltStatusTimer)
    this.tiltStatusTimer = setTimeout(() => {
      if (!this.tiltSeen) {
        this.tiltEnabled = false
        this.onTiltStatus?.('silent')
      }
    }, 1600)
    return true
  }

  disableTilt() {
    this.tiltEnabled = false
    this.onTiltStatus?.('disabled')
  }

  /* --------------------------------------------------------- update */
  update(dt) {
    if (!this.enabled) return
    if (this.tiltEnabled) {
      const angle = screen.orientation?.angle ?? window.orientation ?? 0
      let up, right
      if (angle === 90) { up = [1, 0, 0]; right = [0, -1, 0] }
      else if (angle === 270 || angle === -90) { up = [-1, 0, 0]; right = [0, 1, 0] }
      else if (angle === 180) { up = [0, -1, 0]; right = [-1, 0, 0] }
      else { up = [0, 1, 0]; right = [1, 0, 0] }
      const { a, b, g } = this.rot
      // Device rotation axes are x=beta, y=gamma, z=alpha.
      const yawRate = b * up[0] + g * up[1] + a * up[2]
      const pitchRate = b * right[0] + g * right[1] + a * right[2]
      const dead = (v) => Math.abs(v) < 0.8 ? 0 : v
      const gain = this.gyroGain * this.sensitivity * dt * DEG
      this.lookX += dead(yawRate) * gain
      this.lookY += dead(pitchRate) * gain
      // If sensor events stop entirely, fade the last rate so the view settles.
      if (performance.now() - this.lastTiltEvent > 180) {
        const decay = Math.exp(-dt * 10)
        this.rot.a *= decay
        this.rot.b *= decay
        this.rot.g *= decay
      }
    }
  }

  consumeLook() {
    const x = this.lookX
    const y = this.lookY
    this.lookX = 0
    this.lookY = 0
    return [x, y]
  }

  consumeDash() {
    const v = this.dashQueued
    this.dashQueued = false
    return v
  }

  consumeSwitch() {
    const v = this.switchQueued
    this.switchQueued = false
    return v
  }

  getMove() {
    let x = this.move.x
    let y = this.move.y
    if (this.keys.has('w') || this.keys.has('arrowup')) y += 1
    if (this.keys.has('s') || this.keys.has('arrowdown')) y -= 1
    if (this.keys.has('a') || this.keys.has('arrowleft')) x -= 1
    if (this.keys.has('d') || this.keys.has('arrowright')) x += 1
    const len = Math.hypot(x, y)
    if (len > 1) { x /= len; y /= len }
    return { x, y }
  }

  isFiring() {
    return this.firing || (this.keys.has(' ') && this.enabled)
  }

  setEnabled(v) {
    this.enabled = v
    if (!v) {
      this.firing = false
      this.move.x = 0
      this.move.y = 0
      this.keys.clear()
      this.dashQueued = false
      this.switchQueued = false
      document.getElementById('stick-base')?.classList.remove('active')
    }
  }

  releasePointerLock() {
    if (document.pointerLockElement) document.exitPointerLock?.()
  }
}
