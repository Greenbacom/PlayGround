/**
 * Fully procedural soundtrack + SFX. No audio files, no autoplay.
 * Samba-funk percussion layered with a low, tense synth bed.
 */
export class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.musicGain = null
    this.sfxGain = null
    this.compressor = null
    this.noise = null
    this.muted = false
    this.started = false
    this.paused = false
    this.intensity = 0.5
    this.step = 0
    this.nextStep = 0
    this.timer = null
    this.tempo = 104
    this.stepDur = 60 / this.tempo / 4
    this._lastShot = 0
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume()
      return
    }
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    this.ctx = new AC()
    this.master = this.ctx.createGain()
    this.master.gain.value = this.muted ? 0 : 0.72
    this.compressor = this.ctx.createDynamicsCompressor()
    this.compressor.threshold.value = -18
    this.compressor.knee.value = 24
    this.compressor.ratio.value = 4
    this.compressor.attack.value = 0.004
    this.compressor.release.value = 0.2
    this.musicGain = this.ctx.createGain()
    this.musicGain.gain.value = 0.32
    this.sfxGain = this.ctx.createGain()
    this.sfxGain.gain.value = 0.62
    this.musicGain.connect(this.compressor)
    this.sfxGain.connect(this.compressor)
    this.compressor.connect(this.master)
    this.master.connect(this.ctx.destination)
    this.noise = this.makeNoiseBuffer(2)
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {})
  }

  makeNoiseBuffer(seconds) {
    const length = Math.floor(this.ctx.sampleRate * seconds)
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1
    return buffer
  }

  setMuted(muted) {
    this.muted = muted
    if (!this.ctx) return
    const t = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(t)
    this.master.gain.setTargetAtTime(muted ? 0 : 0.72, t, 0.03)
  }

  toggleMute() {
    this.setMuted(!this.muted)
    return this.muted
  }

  setPaused(paused) {
    this.paused = paused
    if (!this.ctx) return
    const target = paused ? 0.08 : 0.32
    this.musicGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.18)
  }

  setIntensity(value) {
    this.intensity = Math.max(0, Math.min(1, value))
  }

  startMusic() {
    this.init()
    if (!this.ctx || this.started) return
    this.started = true
    this.nextStep = this.ctx.currentTime + 0.1
    this.step = 0
    this.timer = window.setInterval(() => this.schedule(), 25)
  }

  stopMusic() {
    if (this.timer) window.clearInterval(this.timer)
    this.timer = null
    this.started = false
  }

  schedule() {
    if (!this.ctx || this.paused) return
    while (this.nextStep < this.ctx.currentTime + 0.14) {
      this.playStep(this.step, this.nextStep)
      this.step = (this.step + 1) % 32
      this.nextStep += this.stepDur
    }
  }

  playStep(step, when) {
    const s = step % 16
    const bar = Math.floor(step / 16)
    // Surdo / kick: syncopated samba-funk foundation.
    if ([0, 3, 6, 8, 11, 14].includes(s)) this.kick(when, s === 0 ? 0.9 : 0.55)
    // Shaker: constant 16th-note motion.
    this.shaker(when, s % 4 === 0 ? 0.16 : 0.09)
    // Tamborim accents.
    if ([2, 5, 7, 10, 13, 15].includes(s)) this.tamborim(when, 0.14 + this.intensity * 0.12)
    // Agogô melody.
    const agogo = [0, 2, 4, 6, 8, 10, 12, 14]
    if (agogo.includes(s)) {
      const notes = [660, 880, 740, 990, 660, 880, 1100, 990]
      this.agogo(when, notes[(s / 2) % notes.length], 0.07 + this.intensity * 0.06)
    }
    // Low bass line every 8th note.
    if (s % 2 === 0) {
      const bass = [55, 55, 65.4, 73.4, 55, 49, 55, 82.4]
      this.bass(when, bass[(s / 2) % bass.length], this.stepDur * 1.5)
    }
    // Airy pad each bar.
    if (s === 0 && bar % 2 === 0) this.pad(when, [110, 130.8, 164.8])
    // Alarm-like high lead in the boss phase.
    if (this.intensity > 0.82 && [4, 12].includes(s)) this.lead(when, s === 4 ? 440 : 523.25)
  }

  kick(when, gain = 0.7) {
    const ctx = this.ctx
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(135, when)
    osc.frequency.exponentialRampToValueAtTime(42, when + 0.13)
    g.gain.setValueAtTime(0.0001, when)
    g.gain.exponentialRampToValueAtTime(gain, when + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.22)
    osc.connect(g).connect(this.musicGain)
    osc.start(when)
    osc.stop(when + 0.24)
  }

  shaker(when, gain) {
    const src = this.ctx.createBufferSource()
    src.buffer = this.noise
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 6200
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, when)
    g.gain.exponentialRampToValueAtTime(gain, when + 0.003)
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.055)
    src.connect(filter).connect(g).connect(this.musicGain)
    src.start(when, Math.random() * 1.4, 0.07)
  }

  tamborim(when, gain) {
    const src = this.ctx.createBufferSource()
    src.buffer = this.noise
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 2100
    filter.Q.value = 1.5
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, when)
    g.gain.exponentialRampToValueAtTime(gain, when + 0.002)
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.085)
    src.connect(filter).connect(g).connect(this.musicGain)
    src.start(when, Math.random() * 1.4, 0.1)
  }

  agogo(when, freq, gain) {
    const osc = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = freq
    g.gain.setValueAtTime(0.0001, when)
    g.gain.exponentialRampToValueAtTime(gain, when + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.11)
    osc.connect(g).connect(this.musicGain)
    osc.start(when)
    osc.stop(when + 0.12)
  }

  bass(when, freq, duration) {
    const osc = this.ctx.createOscillator()
    const filter = this.ctx.createBiquadFilter()
    const g = this.ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.value = freq
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(420, when)
    filter.frequency.exponentialRampToValueAtTime(150, when + duration)
    g.gain.setValueAtTime(0.0001, when)
    g.gain.exponentialRampToValueAtTime(0.09 + this.intensity * 0.06, when + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, when + duration)
    osc.connect(filter).connect(g).connect(this.musicGain)
    osc.start(when)
    osc.stop(when + duration + 0.02)
  }

  pad(when, notes) {
    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator()
      const g = this.ctx.createGain()
      osc.type = index === 1 ? 'triangle' : 'sine'
      osc.frequency.value = freq
      osc.detune.value = index * 5 - 5
      g.gain.setValueAtTime(0.0001, when)
      g.gain.linearRampToValueAtTime(0.016 + this.intensity * 0.008, when + 0.6)
      g.gain.linearRampToValueAtTime(0.0001, when + 2.2)
      osc.connect(g).connect(this.musicGain)
      osc.start(when)
      osc.stop(when + 2.3)
    })
  }

  lead(when, freq) {
    const osc = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(freq, when)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.75, when + 0.18)
    g.gain.setValueAtTime(0.0001, when)
    g.gain.exponentialRampToValueAtTime(0.025, when + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.2)
    osc.connect(g).connect(this.musicGain)
    osc.start(when)
    osc.stop(when + 0.22)
  }

  noiseBurst({ duration = 0.12, gain = 0.25, freq = 1400, type = 'lowpass', q = 0.8, when = 0 } = {}) {
    if (!this.ctx) return
    const t = when || this.ctx.currentTime
    const src = this.ctx.createBufferSource()
    src.buffer = this.noise
    const filter = this.ctx.createBiquadFilter()
    filter.type = type
    filter.frequency.setValueAtTime(freq, t)
    filter.frequency.exponentialRampToValueAtTime(Math.max(120, freq * 0.35), t + duration)
    filter.Q.value = q
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    src.connect(filter).connect(g).connect(this.sfxGain)
    src.start(t, Math.random() * 1.2, duration + 0.02)
  }

  tone({ freq = 440, endFreq = freq, duration = 0.12, gain = 0.1, type = 'sine', when = 0 } = {}) {
    if (!this.ctx) return
    const t = when || this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    osc.connect(g).connect(this.sfxGain)
    osc.start(t)
    osc.stop(t + duration + 0.02)
  }

  play(name, options = {}) {
    if (!this.ctx) return
    const now = this.ctx.currentTime
    switch (name) {
      case 'rifle':
        if (now - this._lastShot < 0.035) return
        this._lastShot = now
        this.noiseBurst({ duration: 0.11, gain: 0.36, freq: 2600, type: 'lowpass' })
        this.tone({ freq: 150, endFreq: 42, duration: 0.13, gain: 0.24, type: 'triangle' })
        this.noiseBurst({ duration: 0.035, gain: 0.15, freq: 5400, type: 'highpass' })
        break
      case 'shotgun':
        this.noiseBurst({ duration: 0.28, gain: 0.5, freq: 1900, type: 'lowpass' })
        this.tone({ freq: 105, endFreq: 32, duration: 0.3, gain: 0.34, type: 'triangle' })
        break
      case 'empty':
        this.tone({ freq: 620, endFreq: 430, duration: 0.04, gain: 0.07, type: 'square' })
        break
      case 'reload':
        this.tone({ freq: 480, endFreq: 300, duration: 0.04, gain: 0.05, type: 'square' })
        window.setTimeout(() => this.tone({ freq: 340, endFreq: 210, duration: 0.05, gain: 0.05, type: 'square' }), 280)
        break
      case 'reloadDone':
        this.tone({ freq: 760, endFreq: 920, duration: 0.06, gain: 0.06, type: 'triangle' })
        break
      case 'hit':
        this.tone({ freq: 1560, endFreq: 1320, duration: 0.035, gain: 0.09, type: 'sine' })
        break
      case 'headshot':
        this.tone({ freq: 1900, endFreq: 2400, duration: 0.05, gain: 0.12, type: 'sine' })
        this.tone({ freq: 2800, endFreq: 3100, duration: 0.04, gain: 0.06, type: 'sine' })
        break
      case 'kill':
        this.tone({ freq: 660, endFreq: 990, duration: 0.08, gain: 0.08, type: 'triangle' })
        break
      case 'hurt':
        this.noiseBurst({ duration: 0.22, gain: 0.24, freq: 320, type: 'lowpass' })
        this.tone({ freq: 90, endFreq: 48, duration: 0.22, gain: 0.16, type: 'sine' })
        break
      case 'enemyShot':
        this.tone({ freq: 280, endFreq: 880, duration: 0.18, gain: 0.045, type: 'sawtooth' })
        break
      case 'spawn':
        this.tone({ freq: 110, endFreq: 440, duration: 0.5, gain: 0.06, type: 'triangle' })
        this.noiseBurst({ duration: 0.35, gain: 0.06, freq: 900, type: 'bandpass', q: 2 })
        break
      case 'wave':
        this.tone({ freq: 196, endFreq: 294, duration: 0.4, gain: 0.08, type: 'triangle' })
        this.noiseBurst({ duration: 0.5, gain: 0.12, freq: 2400, type: 'bandpass', q: 0.7 })
        break
      case 'pickup':
        this.tone({ freq: 740, endFreq: 1180, duration: 0.09, gain: 0.1, type: 'sine' })
        window.setTimeout(() => this.tone({ freq: 1180, endFreq: 1560, duration: 0.1, gain: 0.08, type: 'sine' }), 70)
        break
      case 'boss':
        this.tone({ freq: 65, endFreq: 43, duration: 1.1, gain: 0.3, type: 'sawtooth' })
        this.noiseBurst({ duration: 0.8, gain: 0.16, freq: 500, type: 'lowpass' })
        break
      case 'victory':
        [392, 494, 587, 784].forEach((freq, i) => {
          window.setTimeout(() => this.tone({ freq, endFreq: freq * 1.01, duration: 0.5, gain: 0.1, type: 'triangle' }), i * 120)
        })
        break
      case 'defeat':
        [392, 330, 262, 196].forEach((freq, i) => {
          window.setTimeout(() => this.tone({ freq, endFreq: freq * 0.8, duration: 0.4, gain: 0.1, type: 'triangle' }), i * 150)
        })
        break
      case 'ui':
        this.tone({ freq: 720, endFreq: 880, duration: 0.04, gain: 0.04, type: 'sine' })
        break
      default:
        break
    }
  }
}
