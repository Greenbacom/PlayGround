/* BRASA — procedural audio. Everything is synthesized with WebAudio. */

export class AudioEngine {
  constructor() {
    this.ctx = null
    this.enabled = true
    this.started = false
    this.musicOn = false
    this.intensity = 0
    this.nextNoteTime = 0
    this.step = 0
    this.timer = null
    this.master = null
    this.musicGain = null
    this.sfxGain = null
    this.ambienceGain = null
    this.noiseBuffer = null
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
    this.master.gain.value = 0.75
    this.master.connect(this.ctx.destination)

    this.musicGain = this.ctx.createGain()
    this.musicGain.gain.value = 0.0
    this.musicGain.connect(this.master)

    this.sfxGain = this.ctx.createGain()
    this.sfxGain.gain.value = 0.9
    this.sfxGain.connect(this.master)

    this.ambienceGain = this.ctx.createGain()
    this.ambienceGain.gain.value = 0.0
    this.ambienceGain.connect(this.master)

    this.noiseBuffer = this.makeNoise(2.5)
    this.startAmbience()
    this.started = true
  }

  makeNoise(seconds) {
    const len = Math.floor(this.ctx.sampleRate * seconds)
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    return buf
  }

  setEnabled(on) {
    this.enabled = on
    if (!this.ctx) return
    this.master.gain.setTargetAtTime(on ? 0.75 : 0, this.ctx.currentTime, 0.05)
  }

  startAmbience() {
    if (!this.ctx) return
    const ctx = this.ctx
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    src.loop = true
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 520
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 120
    const g = ctx.createGain()
    g.gain.value = 0.12
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.13
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.055
    lfo.connect(lfoGain)
    lfoGain.connect(g.gain)
    src.connect(hp)
    hp.connect(lp)
    lp.connect(g)
    g.connect(this.ambienceGain)
    src.start()
    lfo.start()
    this.ambienceGain.gain.setTargetAtTime(0.7, ctx.currentTime, 1.4)
  }

  now() {
    return this.ctx ? this.ctx.currentTime : 0
  }

  noiseBurst({ dur = 0.12, vol = 0.2, type = 'bandpass', freq = 1600, q = 0.9, decay = 0.08, pan = 0 }) {
    if (!this.ctx || !this.enabled) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    src.playbackRate.value = 0.9 + Math.random() * 0.2
    const filt = ctx.createBiquadFilter()
    filt.type = type
    filt.frequency.setValueAtTime(freq, t)
    filt.frequency.exponentialRampToValueAtTime(Math.max(60, freq * 0.35), t + decay)
    filt.Q.value = q
    const g = ctx.createGain()
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + dur)
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    if (panner) {
      panner.pan.value = pan
      src.connect(filt).connect(g).connect(panner).connect(this.sfxGain)
    } else {
      src.connect(filt).connect(g).connect(this.sfxGain)
    }
    src.start(t)
    src.stop(t + dur + 0.02)
  }

  tone({ freq = 440, dur = 0.2, vol = 0.12, type = 'sine', slide = 0, delay = 0, pan = 0, attack = 0.005 }) {
    if (!this.ctx || !this.enabled) return
    const ctx = this.ctx
    const t = ctx.currentTime + delay
    const o = ctx.createOscillator()
    o.type = type
    o.frequency.setValueAtTime(freq, t)
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(vol, t + attack)
    g.gain.exponentialRampToValueAtTime(0.001, t + dur)
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    if (panner) {
      panner.pan.value = pan
      o.connect(g).connect(panner).connect(this.sfxGain)
    } else {
      o.connect(g).connect(this.sfxGain)
    }
    o.start(t)
    o.stop(t + dur + 0.03)
  }

  shoot(kind = 'rifle') {
    if (!this.ctx) return
    if (kind === 'shotgun') {
      this.noiseBurst({ dur: 0.34, vol: 0.42, type: 'lowpass', freq: 2400, q: 0.6, decay: 0.26 })
      this.tone({ freq: 92, slide: -55, dur: 0.28, vol: 0.28, type: 'triangle' })
      this.noiseBurst({ dur: 0.5, vol: 0.1, type: 'highpass', freq: 3000, q: 0.5, decay: 0.4 })
    } else {
      this.noiseBurst({ dur: 0.09, vol: 0.22, type: 'bandpass', freq: 2200, q: 0.7, decay: 0.06 })
      this.tone({ freq: 148, slide: -90, dur: 0.11, vol: 0.23, type: 'square' })
      this.noiseBurst({ dur: 0.18, vol: 0.06, type: 'highpass', freq: 4200, q: 0.5, decay: 0.15 })
    }
  }

  hit(head = false) {
    this.tone({ freq: head ? 1500 : 1050, slide: 260, dur: 0.07, vol: 0.09, type: 'sine' })
    if (head) this.tone({ freq: 2200, dur: 0.05, vol: 0.05, delay: 0.02, type: 'triangle' })
  }

  kill() {
    this.noiseBurst({ dur: 0.42, vol: 0.24, type: 'lowpass', freq: 900, q: 0.7, decay: 0.3 })
    this.tone({ freq: 380, slide: -300, dur: 0.32, vol: 0.13, type: 'sawtooth' })
    this.tone({ freq: 900, slide: 500, dur: 0.12, vol: 0.05, type: 'sine', delay: 0.03 })
  }

  explosion(big = false) {
    this.noiseBurst({ dur: big ? 1.0 : 0.55, vol: big ? 0.42 : 0.25, type: 'lowpass', freq: big ? 1200 : 900, q: 0.5, decay: big ? 0.8 : 0.4 })
    this.tone({ freq: big ? 66 : 110, slide: -45, dur: big ? 0.8 : 0.4, vol: big ? 0.35 : 0.18, type: 'sine' })
  }

  reload(stage = 0) {
    const f = [620, 900, 1350][stage] || 800
    this.noiseBurst({ dur: 0.06, vol: 0.11, type: 'bandpass', freq: f, q: 2.2, decay: 0.04 })
    this.tone({ freq: f, slide: -120, dur: 0.05, vol: 0.05, type: 'square' })
  }

  empty() {
    this.noiseBurst({ dur: 0.05, vol: 0.08, type: 'highpass', freq: 2500, q: 1.2, decay: 0.03 })
  }

  swap() {
    this.noiseBurst({ dur: 0.08, vol: 0.09, type: 'bandpass', freq: 1200, q: 1.4, decay: 0.05 })
    this.tone({ freq: 300, slide: 400, dur: 0.1, vol: 0.05, type: 'triangle' })
  }

  dash() {
    this.noiseBurst({ dur: 0.34, vol: 0.2, type: 'bandpass', freq: 900, q: 0.6, decay: 0.3 })
    this.tone({ freq: 180, slide: 360, dur: 0.25, vol: 0.07, type: 'sine' })
  }

  coreHit() {
    this.tone({ freq: 74, slide: -24, dur: 0.5, vol: 0.28, type: 'sine' })
    this.tone({ freq: 310, slide: -80, dur: 0.3, vol: 0.06, type: 'triangle' })
    this.noiseBurst({ dur: 0.25, vol: 0.1, type: 'lowpass', freq: 460, q: 1, decay: 0.2 })
  }

  playerHit() {
    this.noiseBurst({ dur: 0.3, vol: 0.24, type: 'lowpass', freq: 700, q: 0.8, decay: 0.18 })
    this.tone({ freq: 120, slide: -60, dur: 0.3, vol: 0.16, type: 'sawtooth' })
  }

  waveHorn(boss = false) {
    if (!this.ctx) return
    const base = boss ? 110 : 146.83
    this.tone({ freq: base, dur: boss ? 1.2 : 0.8, vol: 0.13, type: 'sawtooth', attack: 0.15 })
    this.tone({ freq: base * 1.5, dur: boss ? 1.2 : 0.8, vol: 0.09, type: 'triangle', attack: 0.15 })
    this.tone({ freq: base * 2, dur: boss ? 1.25 : 0.85, vol: 0.035, type: 'sine', attack: 0.2 })
    if (boss) this.noiseBurst({ dur: 1.4, vol: 0.09, type: 'lowpass', freq: 300, q: 0.6, decay: 1.2 })
  }

  waveClear() {
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((f, i) => {
      this.tone({ freq: f, dur: 0.55, vol: 0.09, type: 'triangle', delay: i * 0.08 })
      this.tone({ freq: f * 2, dur: 0.4, vol: 0.025, type: 'sine', delay: i * 0.08 + 0.01 })
    })
  }

  victory() {
    const notes = [392, 523.25, 659.25, 783.99, 1046.5, 1318.5]
    notes.forEach((f, i) => {
      this.tone({ freq: f, dur: 1.1, vol: 0.11, type: 'triangle', delay: i * 0.12 })
      this.tone({ freq: f * 0.5, dur: 1.2, vol: 0.05, type: 'sine', delay: i * 0.12 })
    })
    this.noiseBurst({ dur: 1.2, vol: 0.07, type: 'highpass', freq: 4000, q: 0.5, decay: 1.0 })
  }

  fail() {
    ;[220, 174.61, 146.83, 110].forEach((f, i) => {
      this.tone({ freq: f, dur: 1.0, vol: 0.12, type: 'sawtooth', delay: i * 0.17 })
    })
    this.noiseBurst({ dur: 1.6, vol: 0.12, type: 'lowpass', freq: 400, q: 0.4, decay: 1.4 })
  }

  ui() {
    this.tone({ freq: 880, slide: 120, dur: 0.06, vol: 0.035, type: 'sine' })
  }

  pickup() {
    this.tone({ freq: 660, slide: 440, dur: 0.28, vol: 0.08, type: 'triangle' })
    this.tone({ freq: 990, slide: 300, dur: 0.2, vol: 0.04, type: 'sine', delay: 0.05 })
  }

  /* ── music ─────────────────────────────────────────────── */
  setMusic(on) {
    this.musicOn = on
    if (!this.ctx) return
    this.musicGain.gain.setTargetAtTime(on ? 0.9 : 0.0, this.ctx.currentTime, 0.8)
    if (on && !this.timer) {
      this.step = 0
      this.nextNoteTime = this.ctx.currentTime + 0.15
      this.timer = setInterval(() => this.schedule(), 60)
    }
    if (!on && this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  setIntensity(v) {
    this.intensity = Math.max(0, Math.min(1, v))
  }

  schedule() {
    if (!this.ctx || !this.musicOn) return
    const ctx = this.ctx
    const bpm = 94
    const stepDur = 60 / bpm / 4 // sixteenth
    while (this.nextNoteTime < ctx.currentTime + 0.18) {
      this.playStep(this.step, this.nextNoteTime, stepDur)
      this.nextNoteTime += stepDur
      this.step = (this.step + 1) % 64
    }
  }

  playStep(step, t, stepDur) {
    const ctx = this.ctx
    const I = this.intensity
    const s16 = step % 16
    const bar = Math.floor(step / 16)

    // kick / surdo
    if (s16 === 0 || s16 === 8 || (I > 0.45 && s16 === 11)) {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.setValueAtTime(130, t)
      o.frequency.exponentialRampToValueAtTime(48, t + 0.16)
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.3, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
      o.connect(g).connect(this.musicGain)
      o.start(t)
      o.stop(t + 0.32)
    }
    // shaker
    if (s16 % 2 === 1 || I > 0.5) {
      const src = ctx.createBufferSource()
      src.buffer = this.noiseBuffer
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 5500
      const g = ctx.createGain()
      const amp = s16 % 4 === 3 ? 0.05 : 0.022
      g.gain.setValueAtTime(amp * (0.6 + I * 0.7), t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
      src.connect(hp).connect(g).connect(this.musicGain)
      src.start(t)
      src.stop(t + 0.08)
    }
    // agogô pattern
    const agoPattern = [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0]
    if (agoPattern[s16] && (I > 0.15 || s16 === 2 || s16 === 10)) {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = s16 % 8 === 2 ? 1180 : 880
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.035 * (0.5 + I), t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.18)
      o.connect(g).connect(this.musicGain)
      o.start(t)
      o.stop(t + 0.2)
    }
    // berimbau pluck
    if (bar % 2 === 0 && (s16 === 0 || s16 === 6 || s16 === 10)) {
      const o = ctx.createOscillator()
      o.type = 'triangle'
      const base = [196, 174.61, 220, 146.83][bar % 4]
      o.frequency.setValueAtTime(base * 2, t)
      o.frequency.exponentialRampToValueAtTime(base, t + 0.22)
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.001, t)
      g.gain.linearRampToValueAtTime(0.035, t + 0.01)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.5)
      o.connect(g).connect(this.musicGain)
      o.start(t)
      o.stop(t + 0.52)
    }
    // warm pad chord every 2 bars
    if (step === 0 || step === 32) {
      const roots = step === 0 ? [146.83, 220, 293.66] : [130.81, 196, 261.63]
      for (const f of roots) {
        const o = ctx.createOscillator()
        o.type = 'sawtooth'
        o.frequency.value = f
        const lp = ctx.createBiquadFilter()
        lp.type = 'lowpass'
        lp.frequency.value = 620
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.001, t)
        g.gain.linearRampToValueAtTime(0.012, t + 0.9)
        g.gain.linearRampToValueAtTime(0.001, t + 3.4)
        o.connect(lp).connect(g).connect(this.musicGain)
        o.start(t)
        o.stop(t + 3.5)
      }
    }
  }
}
