const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.sfx = null
    this.ambient = null
    this.muted = false
    this.started = false
    this.musicTimer = null
    this.musicStep = 0
    this.noiseBuffer = null
  }

  async unlock() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!Ctx) return false
      this.ctx = new Ctx()
      this.master = this.ctx.createGain()
      this.master.gain.value = this.muted ? 0 : .78
      this.master.connect(this.ctx.destination)
      this.sfx = this.ctx.createGain()
      this.sfx.gain.value = .85
      this.sfx.connect(this.master)
      this.ambient = this.ctx.createGain()
      this.ambient.gain.value = .24
      this.ambient.connect(this.master)
      this.noiseBuffer = this.makeNoise(1.2)
    }
    if (this.ctx.state === 'suspended') await this.ctx.resume().catch(() => {})
    if (!this.started) {
      this.started = true
      this.startAmbient()
    }
    return true
  }

  makeNoise(seconds = 1) {
    const rate = this.ctx.sampleRate
    const buffer = this.ctx.createBuffer(1, Math.max(1, Math.floor(rate * seconds)), rate)
    const data = buffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1
      last = last * .75 + white * .25
      data[i] = last * .65 + white * .35
    }
    return buffer
  }

  setMuted(muted) {
    this.muted = muted
    if (this.master) this.master.gain.setTargetAtTime(muted ? 0 : .78, this.ctx.currentTime, .04)
  }

  setPaused(paused) {
    if (!this.ctx || !this.ambient) return
    this.ambient.gain.setTargetAtTime(paused ? .06 : .24, this.ctx.currentTime, .2)
  }

  tone(freq, duration, opts = {}) {
    if (!this.ctx) return
    const t = this.ctx.currentTime + (opts.delay || 0)
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()
    filter.type = opts.filter || 'lowpass'
    filter.frequency.setValueAtTime(opts.cutoff || 4200, t)
    osc.type = opts.type || 'sine'
    osc.frequency.setValueAtTime(Math.max(20, freq), t)
    if (opts.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, opts.slide), t + duration)
    const peak = opts.gain ?? .06
    const attack = opts.attack ?? .006
    gain.gain.setValueAtTime(.0001, t)
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002, peak), t + attack)
    gain.gain.exponentialRampToValueAtTime(.0001, t + duration)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(opts.destination || this.sfx)
    osc.start(t)
    osc.stop(t + duration + .04)
  }

  noise(duration, opts = {}) {
    if (!this.ctx || !this.noiseBuffer) return
    const t = this.ctx.currentTime + (opts.delay || 0)
    const src = this.ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    src.loop = true
    const filter = this.ctx.createBiquadFilter()
    filter.type = opts.filter || 'bandpass'
    filter.frequency.setValueAtTime(opts.freq || 1200, t)
    if (opts.slide) filter.frequency.exponentialRampToValueAtTime(Math.max(30, opts.slide), t + duration)
    filter.Q.value = opts.q || .9
    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(.0001, t)
    gain.gain.exponentialRampToValueAtTime(Math.max(.0002, opts.gain ?? .07), t + (opts.attack ?? .004))
    gain.gain.exponentialRampToValueAtTime(.0001, t + duration)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(opts.destination || this.sfx)
    src.start(t)
    src.stop(t + duration + .04)
  }

  startAmbient() {
    if (!this.ctx) return
    const t = this.ctx.currentTime
    const humGain = this.ctx.createGain()
    humGain.gain.value = .028
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 260
    filter.Q.value = 3
    const oscA = this.ctx.createOscillator()
    const oscB = this.ctx.createOscillator()
    oscA.type = 'sawtooth'
    oscB.type = 'sine'
    oscA.frequency.value = 55
    oscB.frequency.value = 82.4
    const lfo = this.ctx.createOscillator()
    const lfoGain = this.ctx.createGain()
    lfo.frequency.value = .08
    lfoGain.gain.value = 14
    lfo.connect(lfoGain)
    lfoGain.connect(oscB.frequency)
    oscA.connect(filter)
    oscB.connect(filter)
    filter.connect(humGain)
    humGain.connect(this.ambient)
    oscA.start(t)
    oscB.start(t)
    lfo.start(t)

    const wind = this.ctx.createBufferSource()
    wind.buffer = this.noiseBuffer
    wind.loop = true
    const windFilter = this.ctx.createBiquadFilter()
    windFilter.type = 'lowpass'
    windFilter.frequency.value = 380
    const windGain = this.ctx.createGain()
    windGain.gain.value = .024
    wind.connect(windFilter)
    windFilter.connect(windGain)
    windGain.connect(this.ambient)
    wind.start(t)

    if (this.musicTimer) clearInterval(this.musicTimer)
    this.musicTimer = setInterval(() => this.ambientPulse(), 460)
  }

  ambientPulse() {
    if (!this.ctx || this.muted || this.ctx.state !== 'running') return
    this.musicStep++
    const pattern = [55, 55, 65.4, 55, 49, 49, 58.3, 49]
    const note = pattern[this.musicStep % pattern.length]
    this.tone(note, .36, { type: 'triangle', gain: .018, cutoff: 190, destination: this.ambient })
    if (this.musicStep % 4 === 0) {
      this.noise(.06, { freq: 180, q: .5, gain: .012, destination: this.ambient })
    }
    if (this.musicStep % 8 === 3) {
      this.tone(220, .9, { type: 'sine', gain: .009, cutoff: 1400, destination: this.ambient, slide: 330 })
    }
  }

  ui() { this.tone(880, .055, { type: 'sine', gain: .025, cutoff: 3000 }); this.tone(1320, .04, { type: 'sine', gain: .014, delay: .035 }) }
  voiceStart() { this.tone(540, .12, { type: 'sine', gain: .03, slide: 760 }); this.tone(810, .09, { type: 'triangle', gain: .018, delay: .06 }) }
  voiceEnd() { this.tone(720, .13, { type: 'sine', gain: .025, slide: 420 }) }
  empty() { this.tone(140, .045, { type: 'square', gain: .025, cutoff: 800 }); this.noise(.025, { freq: 500, gain: .02 }) }
  reload() {
    this.noise(.04, { freq: 1600, q: 2, gain: .035 })
    this.tone(210, .06, { type: 'square', gain: .02, delay: .08 })
    this.noise(.05, { freq: 900, q: 2, gain: .028, delay: .32 })
    this.tone(360, .05, { type: 'square', gain: .016, delay: .36 })
  }
  dash() {
    this.noise(.26, { freq: 1800, slide: 180, q: .5, gain: .07 })
    this.tone(130, .28, { type: 'sawtooth', gain: .03, slide: 55, cutoff: 600 })
  }
  hurt() {
    this.noise(.18, { freq: 420, slide: 120, q: .6, gain: .11 })
    this.tone(92, .22, { type: 'sawtooth', gain: .055, slide: 48, cutoff: 500 })
  }
  hit(crit = false) {
    this.noise(.028, { freq: crit ? 2500 : 1700, q: 2.4, gain: crit ? .04 : .028 })
    this.tone(crit ? 1480 : 1100, .04, { type: 'square', gain: .012 })
  }
  kill() {
    this.noise(.25, { freq: 1000, slide: 180, q: .8, gain: .08 })
    this.tone(320, .24, { type: 'triangle', gain: .045, slide: 90 })
    this.tone(880, .12, { type: 'sine', gain: .016, delay: .03, slide: 500 })
  }
  explosion(size = 1) {
    this.noise(.55 * size, { freq: 700, slide: 55, q: .4, gain: .16 })
    this.tone(64, .48 * size, { type: 'sawtooth', gain: .075, slide: 27, cutoff: 320 })
    this.noise(.18, { freq: 2200, slide: 500, q: .5, gain: .05, delay: .02 })
  }
  enemyShot() {
    this.tone(310, .16, { type: 'sawtooth', gain: .024, slide: 150, cutoff: 1100 })
    this.noise(.08, { freq: 700, q: 1.5, gain: .025 })
  }
  wave() {
    [110, 138.6, 164.8, 220].forEach((f, i) => this.tone(f, .5, { type: 'sawtooth', gain: .025, cutoff: 850, delay: i * .09 }))
    this.noise(.5, { freq: 1200, slide: 300, q: .4, gain: .03 })
  }
  forge() {
    const notes = [220, 277.2, 329.6, 440, 554.4, 659.3, 880]
    notes.forEach((f, i) => {
      this.tone(f, .38, { type: i < 4 ? 'triangle' : 'sine', gain: .032, delay: i * .055, cutoff: 4200 })
      this.tone(f * 2, .2, { type: 'sine', gain: .009, delay: i * .055 + .03 })
    })
    this.noise(.6, { freq: 3000, slide: 300, q: .4, gain: .035 })
  }
  weaponShot(weapon) {
    if (!weapon) return
    const el = weapon.elementKey
    const heavy = weapon.archetypeKey === 'cannon' || weapon.archetypeKey === 'launcher' || weapon.archetypeKey === 'shotgun'
    const laser = el === 'plasma' || el === 'cosmic' || weapon.archetypeKey === 'sniper'
    const bright = el === 'lightning' || el === 'holy' || el === 'sonic'
    if (laser) {
      this.tone(heavy ? 180 : 620, heavy ? .2 : .11, { type: 'sawtooth', gain: heavy ? .06 : .035, slide: heavy ? 70 : 210, cutoff: 4200 })
      this.tone(heavy ? 900 : 1760, .08, { type: 'sine', gain: .018, slide: 320 })
      this.noise(.06, { freq: 3400, slide: 900, q: 1.2, gain: .025 })
    } else if (bright) {
      this.tone(1240, .1, { type: 'square', gain: .025, slide: 380 })
      this.noise(.05, { freq: 2600, slide: 1000, q: 1.8, gain: .03 })
    } else {
      this.noise(heavy ? .14 : .07, { freq: heavy ? 900 : 1600, slide: 220, q: .7, gain: heavy ? .09 : .04 })
      this.tone(heavy ? 86 : 190, heavy ? .18 : .08, { type: 'triangle', gain: heavy ? .05 : .025, slide: heavy ? 44 : 95 })
    }
    if (weapon.elementKey === 'ice') this.tone(1680, .15, { type: 'sine', gain: .014, slide: 2500 })
    if (weapon.elementKey === 'fire') this.noise(.18, { freq: 600, slide: 140, q: .5, gain: .025 })
    if (weapon.elementKey === 'void') this.tone(70, .26, { type: 'sine', gain: .04, slide: 38 })
  }
  freeze() { this.tone(2100, .22, { type: 'sine', gain: .02, slide: 900 }); this.noise(.16, { freq: 5000, slide: 2000, q: 2, gain: .016 }) }
  chain() { this.noise(.1, { freq: 3800, q: 3, gain: .04 }); this.tone(1400, .12, { type: 'square', gain: .015, slide: 420 }) }
  pickup() { this.tone(660, .16, { type: 'sine', gain: .03, slide: 990 }); this.tone(1320, .14, { type: 'sine', gain: .014, delay: .06 }) }
}
