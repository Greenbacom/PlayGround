const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

function rmsToEnergy (rms) {
  return clamp((rms - 0.008) / 0.16, 0, 1)
}

export class SoundEngine {
  constructor () {
    this.ctx = null
    this.master = null
    this.music = null
    this.sfx = null
    this.noise = null
    this.muted = false
    this.ready = false
  }

  async init () {
    if (this.ready) {
      if (this.ctx?.state === 'suspended') await this.ctx.resume()
      return
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    this.ctx = new AudioCtx()
    const ctx = this.ctx
    this.master = ctx.createGain()
    this.master.gain.value = this.muted ? 0 : 0.72
    const compressor = ctx.createDynamicsCompressor()
    compressor.threshold.value = -16
    compressor.knee.value = 18
    compressor.ratio.value = 4
    compressor.attack.value = 0.004
    compressor.release.value = 0.18
    this.master.connect(compressor).connect(ctx.destination)

    this.music = ctx.createGain()
    this.music.gain.value = 0.2
    this.music.connect(this.master)
    this.sfx = ctx.createGain()
    this.sfx.gain.value = 0.75
    this.sfx.connect(this.master)

    this.noise = this.createNoiseBuffer(1.2)
    this.ready = true
    this.startAmbient()
    if (ctx.state === 'suspended') await ctx.resume()
  }

  createNoiseBuffer (seconds) {
    const ctx = this.ctx
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1
      last = last * 0.86 + white * 0.14
      data[i] = last * 0.7
    }
    return buffer
  }

  startAmbient () {
    const ctx = this.ctx
    const t = ctx.currentTime
    const drone = ctx.createGain()
    drone.gain.value = 0.11
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 280
    filter.Q.value = 4
    drone.connect(filter).connect(this.music)

    const freqs = [42, 63, 84.5]
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = i === 2 ? 'triangle' : 'sine'
      osc.frequency.value = freq
      osc.detune.value = (i - 1) * 7
      const g = ctx.createGain()
      g.gain.value = i === 0 ? 0.5 : 0.18
      osc.connect(g).connect(drone)
      osc.start(t)
    })

    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.06
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 90
    lfo.connect(lfoGain).connect(filter.frequency)
    lfo.start(t)

    // distant electric wind
    const wind = ctx.createBufferSource()
    wind.buffer = this.noise
    wind.loop = true
    const windFilter = ctx.createBiquadFilter()
    windFilter.type = 'bandpass'
    windFilter.frequency.value = 620
    windFilter.Q.value = 0.55
    const windGain = ctx.createGain()
    windGain.gain.value = 0.035
    wind.connect(windFilter).connect(windGain).connect(this.music)
    wind.start(t)
  }

  setMuted (muted) {
    this.muted = muted
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : 0.72, this.ctx.currentTime, 0.03)
    }
  }

  toggleMute () {
    this.setMuted(!this.muted)
    return this.muted
  }

  noiseBurst ({ duration = 0.1, freq = 900, q = 1.1, gain = 0.2, type = 'bandpass', pan = 0 } = {}) {
    if (!this.ready) return
    const ctx = this.ctx
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    src.playbackRate.value = 0.9 + Math.random() * 0.25
    const filter = ctx.createBiquadFilter()
    filter.type = type
    filter.frequency.value = freq
    filter.Q.value = q
    const g = ctx.createGain()
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    const t = ctx.currentTime
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    src.connect(filter).connect(g)
    if (p) {
      p.pan.value = pan
      g.connect(p).connect(this.sfx)
    } else {
      g.connect(this.sfx)
    }
    src.start(t)
    src.stop(t + duration + 0.03)
  }

  tone ({ freq = 220, endFreq = freq, duration = 0.15, gain = 0.12, type = 'sine', pan = 0 } = {}) {
    if (!this.ready) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    if (endFreq !== freq) osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration)
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    osc.connect(g)
    if (p) {
      p.pan.value = pan
      g.connect(p).connect(this.sfx)
    } else {
      g.connect(this.sfx)
    }
    osc.start(t)
    osc.stop(t + duration + 0.03)
  }

  shoot (weapon, energy = 0.5) {
    if (!this.ready) return
    const pan = (Math.random() - 0.5) * 0.2
    const id = weapon?.typeId || 'pulse'
    if (id === 'flame') {
      this.noiseBurst({ duration: 0.16, freq: 460 + Math.random() * 140, q: 0.6, gain: 0.1, pan })
      return
    }
    if (id === 'frost') {
      this.noiseBurst({ duration: 0.2, freq: 1900, q: 1.5, gain: 0.18, pan })
      this.tone({ freq: 240, endFreq: 90, duration: 0.18, gain: 0.1, type: 'triangle' })
      return
    }
    if (id === 'lightning') {
      this.noiseBurst({ duration: 0.22, freq: 2800, q: 0.8, gain: 0.2, pan })
      this.tone({ freq: 110, endFreq: 50, duration: 0.22, gain: 0.16, type: 'sawtooth' })
      return
    }
    if (id === 'rocket') {
      this.noiseBurst({ duration: 0.3, freq: 340, q: 0.7, gain: 0.22, pan })
      this.tone({ freq: 80, endFreq: 44, duration: 0.32, gain: 0.18, type: 'sine' })
      return
    }
    if (id === 'void') {
      this.tone({ freq: 140, endFreq: 42, duration: 0.5, gain: 0.16, type: 'sine' })
      this.noiseBurst({ duration: 0.35, freq: 240, q: 1.8, gain: 0.09, pan })
      return
    }
    if (id === 'swarm') {
      this.noiseBurst({ duration: 0.07, freq: 1200, q: 1.2, gain: 0.1, pan })
      this.tone({ freq: 540, endFreq: 300, duration: 0.06, gain: 0.06, type: 'square' })
      return
    }
    if (id === 'blade') {
      this.noiseBurst({ duration: 0.18, freq: 2600, q: 2, gain: 0.12, pan })
      this.tone({ freq: 620, endFreq: 180, duration: 0.16, gain: 0.08, type: 'sawtooth' })
      return
    }
    this.tone({ freq: 420 + energy * 160, endFreq: 110, duration: 0.11, gain: 0.12, type: 'square', pan })
    this.noiseBurst({ duration: 0.06, freq: 1700, q: 1.2, gain: 0.07, pan })
  }

  hit (critical = false) {
    this.tone({ freq: critical ? 980 : 720, endFreq: critical ? 480 : 390, duration: 0.06, gain: critical ? 0.11 : 0.065, type: 'triangle' })
  }

  kill () {
    this.noiseBurst({ duration: 0.35, freq: 260, q: 0.7, gain: 0.18 })
    this.tone({ freq: 130, endFreq: 38, duration: 0.4, gain: 0.14, type: 'sawtooth' })
    this.tone({ freq: 700, endFreq: 220, duration: 0.16, gain: 0.05, type: 'sine' })
  }

  hurt () {
    this.noiseBurst({ duration: 0.25, freq: 180, q: 0.6, gain: 0.25 })
    this.tone({ freq: 76, endFreq: 42, duration: 0.3, gain: 0.16, type: 'sine' })
  }

  forge () {
    if (!this.ready) return
    const t = this.ctx.currentTime
    this.noiseBurst({ duration: 0.5, freq: 1800, q: 0.8, gain: 0.09 })
    ;[220, 330, 495, 660].forEach((freq, i) => {
      const osc = this.ctx.createOscillator()
      const g = this.ctx.createGain()
      osc.type = i % 2 ? 'triangle' : 'sine'
      osc.frequency.setValueAtTime(freq * 0.6, t + i * 0.045)
      osc.frequency.exponentialRampToValueAtTime(freq, t + 0.16 + i * 0.045)
      g.gain.setValueAtTime(0.0001, t + i * 0.045)
      g.gain.exponentialRampToValueAtTime(0.09, t + 0.07 + i * 0.045)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65 + i * 0.045)
      osc.connect(g).connect(this.sfx)
      osc.start(t + i * 0.045)
      osc.stop(t + 0.75 + i * 0.045)
    })
  }

  empty () {
    this.tone({ freq: 180, endFreq: 120, duration: 0.05, gain: 0.06, type: 'square' })
  }

  wave () {
    if (!this.ready) return
    this.tone({ freq: 110, endFreq: 220, duration: 0.5, gain: 0.1, type: 'sawtooth' })
    this.tone({ freq: 440, endFreq: 880, duration: 0.5, gain: 0.05, type: 'sine' })
  }

  gameOver () {
    if (!this.ready) return
    this.tone({ freq: 220, endFreq: 40, duration: 1.4, gain: 0.18, type: 'sawtooth' })
    this.noiseBurst({ duration: 1.2, freq: 320, q: 0.5, gain: 0.14 })
  }

  ui () {
    this.tone({ freq: 520, endFreq: 640, duration: 0.05, gain: 0.04, type: 'triangle' })
  }
}

export class VoiceEngine {
  constructor ({ onLevel, onTranscript, onState } = {}) {
    this.onLevel = onLevel || (() => {})
    this.onTranscript = onTranscript || (() => {})
    this.onState = onState || (() => {})
    this.stream = null
    this.analyser = null
    this.source = null
    this.timeData = null
    this.freqData = null
    this.micError = null
    this.micReady = false
    this.capturing = false
    this.captureStart = 0
    this.recognition = null
    this.finalText = ''
    this.interimText = ''
    this.samples = []
    this.sampleTimer = null
    this.resolveCapture = null
    this.captureResolved = false
    this.recognitionEnded = false
    this.recognitionSupported = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
    this.lastEnergy = 0.5
    this.lastPitch = 0.5
    this.lastLevel = 0
  }

  get supported () {
    return this.recognitionSupported
  }

  async requestMic () {
    if (this.micReady) return { ok: true }
    if (this.micPromise) return this.micPromise
    if (!navigator.mediaDevices?.getUserMedia) {
      this.micError = 'API de microfone indisponível'
      this.onState({ state: 'denied', error: this.micError })
      return { ok: false, error: this.micError }
    }
    this.micPromise = this.openMic()
    const result = await this.micPromise
    this.micPromise = null
    return result
  }

  async openMic () {
    try {
      this.onState({ state: 'requesting' })
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
      })
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!this.audioCtx && AudioCtx) this.audioCtx = new AudioCtx()
      if (this.audioCtx?.state === 'suspended') await this.audioCtx.resume()
      this.source = this.audioCtx.createMediaStreamSource(this.stream)
      this.analyser = this.audioCtx.createAnalyser()
      this.analyser.fftSize = 1024
      this.analyser.smoothingTimeConstant = 0.65
      this.source.connect(this.analyser)
      this.timeData = new Float32Array(this.analyser.fftSize)
      this.freqData = new Uint8Array(this.analyser.frequencyBinCount)
      this.micReady = true
      this.micError = null
      this.onState({ state: 'ready', supported: this.recognitionSupported })
      return { ok: true }
    } catch (error) {
      this.micReady = false
      this.micError = error?.name === 'NotAllowedError' ? 'Permissão negada' : 'Microfone indisponível'
      this.onState({ state: 'denied', error: this.micError })
      return { ok: false, error: this.micError }
    }
  }

  setupRecognition () {
    if (!this.recognitionSupported) return null
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new Recognition()
    rec.lang = 'pt-BR'
    rec.continuous = true
    rec.interimResults = true
    rec.maxAlternatives = 1
    rec.onresult = event => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const text = result[0]?.transcript || ''
        if (result.isFinal) this.finalText += ` ${text}`
        else interim += ` ${text}`
      }
      this.interimText = interim.trim()
      const visible = `${this.finalText} ${this.interimText}`.trim()
      if (visible) this.onTranscript(visible, false)
    }
    rec.onerror = event => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        this.recognitionSupported = false
      }
    }
    rec.onend = () => {
      this.recognitionEnded = true
      this.tryResolveCapture()
    }
    return rec
  }

  sampleVoice () {
    if (!this.analyser) return
    this.analyser.getFloatTimeDomainData(this.timeData)
    let sum = 0
    for (let i = 0; i < this.timeData.length; i++) sum += this.timeData[i] * this.timeData[i]
    const rms = Math.sqrt(sum / this.timeData.length)
    const energy = rmsToEnergy(rms)
    this.lastEnergy = energy
    this.lastLevel = Math.min(1, energy * 1.4)

    this.analyser.getByteFrequencyData(this.freqData)
    let peak = 0
    let peakIndex = 0
    const nyquist = this.audioCtx.sampleRate / 2
    const binHz = nyquist / this.freqData.length
    const minBin = Math.max(2, Math.floor(80 / binHz))
    const maxBin = Math.min(this.freqData.length - 1, Math.floor(420 / binHz))
    for (let i = minBin; i < maxBin; i++) {
      if (this.freqData[i] > peak) {
        peak = this.freqData[i]
        peakIndex = i
      }
    }
    const hz = peakIndex * binHz
    const pitch = clamp((hz - 80) / 340, 0, 1)
    if (energy > 0.08) {
      this.lastPitch = this.lastPitch * 0.82 + pitch * 0.18
    }
    this.samples.push({ energy, pitch, level: this.lastLevel, weight: Math.max(0.05, energy) })
    if (this.samples.length > 180) this.samples.shift()
    this.onLevel(this.lastLevel, this.lastEnergy)
  }

  async beginCapture () {
    if (this.capturing) return false
    if (!this.micReady) {
      const result = await this.requestMic()
      if (!result.ok) return false
    }
    this.capturing = true
    this.captureStart = performance.now()
    this.finalText = ''
    this.interimText = ''
    this.samples = []
    this.captureResolved = false
    this.recognitionEnded = false
    this.lastEnergy = 0.4
    this.lastPitch = 0.5
    this.onTranscript('', true)
    this.onState({ state: 'listening', supported: this.recognitionSupported })
    this.sampleTimer = setInterval(() => this.sampleVoice(), 50)
    this.sampleVoice()

    if (this.recognitionSupported) {
      try {
        this.recognition = this.setupRecognition()
        this.recognition.start()
      } catch {
        this.recognition = null
      }
    }
    return true
  }

  endCapture () {
    if (!this.capturing) return Promise.resolve(null)
    this.capturing = false
    clearInterval(this.sampleTimer)
    this.sampleTimer = null
    const duration = Math.max(0.2, (performance.now() - this.captureStart) / 1000)
    this.sampleVoice()
    this.onLevel(0, this.lastEnergy)
    this.onState({ state: 'processing', supported: this.recognitionSupported })

    return new Promise(resolve => {
      this.resolveCapture = resolve
      const finish = () => {
        if (this.captureResolved) return
        this.captureResolved = true
        const transcript = `${this.finalText} ${this.interimText}`.replace(/\s+/g, ' ').trim()
        const weighted = this.samples.filter(s => s.weight > 0.05)
        const totalWeight = weighted.reduce((sum, s) => sum + s.weight, 0) || 1
        const energy = weighted.reduce((sum, s) => sum + s.energy * s.weight, 0) / totalWeight
        const pitch = weighted.reduce((sum, s) => sum + s.pitch * s.weight, 0) / totalWeight
        const result = {
          transcript,
          energy: clamp(energy * 1.55, 0, 1),
          pitch: clamp(pitch, 0, 1),
          duration,
          hadSpeech: energy > 0.06,
        }
        this.lastEnergy = result.energy
        this.lastPitch = result.pitch
        this.onState({ state: 'idle', supported: this.recognitionSupported })
        resolve(result)
      }

      if (this.recognition) {
        try {
          this.recognition.stop()
        } catch {
          this.recognitionEnded = true
        }
        const started = performance.now()
        const wait = () => {
          if (this.captureResolved) return
          if (this.recognitionEnded || performance.now() - started > 1100) {
            finish()
          } else {
            setTimeout(wait, 40)
          }
        }
        setTimeout(wait, 60)
        setTimeout(finish, 1400)
      } else {
        setTimeout(finish, 120)
      }
    })
  }

  tryResolveCapture () {
    // The pending promise's own waiter handles the actual completion.
  }

  stop () {
    clearInterval(this.sampleTimer)
    this.sampleTimer = null
    this.capturing = false
    try { this.recognition?.abort() } catch {}
    this.stream?.getTracks().forEach(track => track.stop())
    this.stream = null
    this.micReady = false
    this.source?.disconnect()
    this.source = null
    this.analyser = null
  }
}

export class TiltController {
  constructor () {
    this.supported = typeof window.DeviceOrientationEvent !== 'undefined'
    this.enabled = false
    this.baseline = null
    this.raw = { gamma: 0, beta: 0 }
    this.delta = { yaw: 0, pitch: 0 }
    this.handler = event => {
      if (event.gamma == null || event.beta == null) return
      this.raw.gamma = event.gamma
      this.raw.beta = event.beta
      if (!this.baseline) this.baseline = { gamma: event.gamma, beta: event.beta }
    }
  }

  async requestPermission () {
    if (!this.supported) return { ok: false, error: 'Sensor indisponível' }
    try {
      if (typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await window.DeviceOrientationEvent.requestPermission()
        if (permission !== 'granted') return { ok: false, error: 'Permissão negada' }
      }
      return { ok: true }
    } catch {
      return { ok: false, error: 'Permissão indisponível' }
    }
  }

  enable () {
    if (!this.supported) return false
    this.enabled = true
    this.baseline = null
    window.addEventListener('deviceorientation', this.handler, true)
    return true
  }

  disable () {
    this.enabled = false
    window.removeEventListener('deviceorientation', this.handler, true)
    this.delta.yaw = 0
    this.delta.pitch = 0
  }

  recalibrate () {
    this.baseline = { ...this.raw }
  }

  update (dt) {
    if (!this.enabled || !this.baseline) {
      this.delta.yaw = 0
      this.delta.pitch = 0
      return this.delta
    }
    const dead = 2.5
    let g = this.raw.gamma - this.baseline.gamma
    let b = this.raw.beta - this.baseline.beta
    if (Math.abs(g) < dead) g = 0
    else g -= Math.sign(g) * dead
    if (Math.abs(b) < dead) b = 0
    else b -= Math.sign(b) * dead
    const targetYaw = clamp(g / 32, -1, 1)
    const targetPitch = clamp(-b / 28, -1, 1)
    this.delta.yaw += (targetYaw - this.delta.yaw) * Math.min(1, dt * 10)
    this.delta.pitch += (targetPitch - this.delta.pitch) * Math.min(1, dt * 10)
    return this.delta
  }
}
