// WebAudio: samba-flavoured procedural soundtrack + berimbau SFX.
export class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.musicGain = null
    this.sfxGain = null
    this.muted = false
    this.musicTimer = null
    this.nextNote = 0
    this.step = 0
    this.bpm = 102
    this.noiseBuf = null
    this.bossDrone = null
    this.intensity = 1
  }

  init() {
    if (this.ctx) return
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    this.ctx = new AC()
    this.master = this.ctx.createGain()
    this.master.gain.value = this.muted ? 0 : 0.82
    this.master.connect(this.ctx.destination)

    this.musicGain = this.ctx.createGain()
    this.musicGain.gain.value = 0.3
    this.musicGain.connect(this.master)

    this.sfxGain = this.ctx.createGain()
    this.sfxGain.gain.value = 0.9
    this.sfxGain.connect(this.master)

    // white noise buffer
    const len = this.ctx.sampleRate * 1.2
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    this.noiseBuf = buf
  }

  async unlock() {
    this.init()
    if (!this.ctx) return
    if (this.ctx.state === 'suspended') {
      try { await this.ctx.resume() } catch { /* ignore */ }
    }
    this.startMusic()
  }

  setMuted(m) {
    this.muted = m
    if (this.master) {
      const t = this.ctx.currentTime
      this.master.gain.cancelScheduledValues(t)
      this.master.gain.setTargetAtTime(m ? 0 : 0.82, t, 0.03)
    }
  }

  startMusic() {
    if (!this.ctx || this.musicTimer) return
    this.nextNote = this.ctx.currentTime + 0.1
    this.step = 0
    this.musicTimer = setInterval(() => this.schedule(), 25)
  }

  stopMusic() {
    if (this.musicTimer) clearInterval(this.musicTimer)
    this.musicTimer = null
  }

  schedule() {
    if (!this.ctx || this.muted) return
    const stepDur = 60 / this.bpm / 4
    while (this.nextNote < this.ctx.currentTime + 0.16) {
      this.playStep(this.step, this.nextNote)
      this.nextNote += stepDur
      this.step = (this.step + 1) % 32
    }
  }

  playStep(step, t) {
    const m = this.musicGain
    // surdo — heartbeat of the festa
    if ([0, 6, 8, 14, 16, 22, 24, 30].includes(step)) {
      const o = this.ctx.createOscillator()
      const g = this.ctx.createGain()
      o.type = 'sine'
      o.frequency.setValueAtTime(step % 8 === 0 ? 84 : 70, t)
      o.frequency.exponentialRampToValueAtTime(42, t + 0.18)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.5, t + 0.008)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3)
      o.connect(g); g.connect(m)
      o.start(t); o.stop(t + 0.34)
    }
    // shaker
    if (step % 2 === 1) {
      const src = this.ctx.createBufferSource()
      src.buffer = this.noiseBuf
      const hp = this.ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 5200
      const g = this.ctx.createGain()
      const accent = step % 8 === 7 ? 0.09 : 0.045
      g.gain.setValueAtTime(accent, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)
      src.connect(hp); hp.connect(g); g.connect(m)
      src.start(t, Math.random() * 0.4, 0.08)
    }
    // agogô
    if ([3, 7, 10, 15, 19, 23, 27, 30].includes(step)) {
      const o = this.ctx.createOscillator()
      const g = this.ctx.createGain()
      o.type = 'triangle'
      o.frequency.setValueAtTime(step % 4 === 3 ? 980 : 740, t)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.1, t + 0.004)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16)
      o.connect(g); g.connect(m)
      o.start(t); o.stop(t + 0.18)
    }
    // bass
    if ([0, 8, 16, 24].includes(step)) {
      const notes = [55, 55, 73.42, 61.74]
      const o = this.ctx.createOscillator()
      const g = this.ctx.createGain()
      o.type = 'triangle'
      o.frequency.setValueAtTime(notes[step / 8], t)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.14, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42)
      o.connect(g); g.connect(m)
      o.start(t); o.stop(t + 0.45)
    }
    // cavaquinho-ish offbeat
    if ([2, 12, 18, 28].includes(step)) {
      const o = this.ctx.createOscillator()
      const g = this.ctx.createGain()
      o.type = 'square'
      o.frequency.setValueAtTime(step % 16 === 2 ? 293.66 : 392, t)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.035, t + 0.006)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13)
      o.connect(g); g.connect(m)
      o.start(t); o.stop(t + 0.15)
    }
  }

  noise(duration = 0.2, { type = 'lowpass', freq = 900, q = 0.7, gain = 0.2, sweep = 0 } = {}) {
    if (!this.ctx) return
    const t = this.ctx.currentTime
    const src = this.ctx.createBufferSource()
    src.buffer = this.noiseBuf
    const f = this.ctx.createBiquadFilter()
    f.type = type
    f.frequency.setValueAtTime(freq, t)
    if (sweep) f.frequency.exponentialRampToValueAtTime(Math.max(60, freq + sweep), t + duration)
    f.Q.value = q
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(gain, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    src.connect(f); f.connect(g); g.connect(this.sfxGain)
    src.start(t, Math.random() * 0.5, duration + 0.05)
  }

  tone(freq, dur, { type = 'sine', gain = 0.15, to = null, delay = 0, attack = 0.005 } = {}) {
    if (!this.ctx) return
    const t = this.ctx.currentTime + delay
    const o = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    o.type = type
    o.frequency.setValueAtTime(freq, t)
    if (to) o.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + dur)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + attack)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g); g.connect(this.sfxGain)
    o.start(t); o.stop(t + dur + 0.03)
  }

  shot() {
    this.tone(330, 0.12, { type: 'triangle', gain: 0.16, to: 150 })
    this.noise(0.07, { type: 'highpass', freq: 1800, gain: 0.1 })
  }
  rocket() {
    this.noise(0.45, { type: 'bandpass', freq: 600, q: 1.4, gain: 0.22, sweep: 900 })
    this.tone(160, 0.4, { type: 'sawtooth', gain: 0.09, to: 60 })
  }
  explosion() {
    this.noise(0.65, { type: 'lowpass', freq: 900, gain: 0.4, sweep: -700 })
    this.tone(70, 0.5, { type: 'sine', gain: 0.35, to: 32 })
  }
  hit() {
    this.tone(880, 0.05, { type: 'square', gain: 0.07, to: 620 })
  }
  kill() {
    this.tone(420, 0.18, { type: 'sawtooth', gain: 0.1, to: 120 })
    this.noise(0.14, { type: 'highpass', freq: 900, gain: 0.06 })
  }
  hurt() {
    this.tone(120, 0.24, { type: 'sine', gain: 0.28, to: 48 })
    this.noise(0.2, { type: 'lowpass', freq: 500, gain: 0.18 })
  }
  pickup() {
    this.tone(660, 0.12, { type: 'sine', gain: 0.13 })
    this.tone(990, 0.18, { type: 'sine', gain: 0.12, delay: 0.08 })
  }
  dash() {
    this.noise(0.26, { type: 'bandpass', freq: 700, q: 1.1, gain: 0.18, sweep: 1600 })
  }
  switchWeapon() {
    this.tone(520, 0.06, { type: 'square', gain: 0.07 })
    this.tone(780, 0.08, { type: 'triangle', gain: 0.08, delay: 0.05 })
  }
  wave() {
    this.tone(740, 0.16, { type: 'triangle', gain: 0.16 })
    this.tone(740, 0.16, { type: 'triangle', gain: 0.14, delay: 0.2 })
    this.tone(988, 0.34, { type: 'triangle', gain: 0.16, delay: 0.4 })
  }
  boss() {
    this.tone(110, 1.2, { type: 'sawtooth', gain: 0.16, to: 55, attack: 0.15 })
    this.noise(1.0, { type: 'lowpass', freq: 300, gain: 0.14 })
  }
  waveClear() {
    this.tone(523, 0.12, { type: 'sine', gain: 0.12 })
    this.tone(659, 0.12, { type: 'sine', gain: 0.12, delay: 0.1 })
    this.tone(784, 0.24, { type: 'sine', gain: 0.13, delay: 0.2 })
  }
  win() {
    const notes = [523, 659, 784, 1046, 1318]
    notes.forEach((n, i) => this.tone(n, 0.5, { type: 'triangle', gain: 0.14, delay: i * 0.13 }))
    this.tone(261, 1.4, { type: 'sine', gain: 0.12, delay: 0.1 })
  }
  gameOver() {
    const notes = [392, 329, 261, 196]
    notes.forEach((n, i) => this.tone(n, 0.6, { type: 'triangle', gain: 0.14, delay: i * 0.18 }))
  }
  setBossMode(on) {
    if (!this.ctx) return
    if (on && !this.bossDrone) {
      const o = this.ctx.createOscillator()
      const g = this.ctx.createGain()
      o.type = 'sawtooth'
      o.frequency.value = 48
      g.gain.value = 0.0001
      g.gain.setTargetAtTime(0.055, this.ctx.currentTime, 0.4)
      o.connect(g); g.connect(this.master)
      o.start()
      this.bossDrone = { o, g }
    } else if (!on && this.bossDrone) {
      const { o, g } = this.bossDrone
      g.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.2)
      o.stop(this.ctx.currentTime + 0.8)
      this.bossDrone = null
    }
  }
  reset() {
    this.setBossMode(false)
  }
}
