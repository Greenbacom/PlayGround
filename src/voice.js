import { normalizeText } from './data.js'

const SpeechRecognition = typeof window !== 'undefined'
  ? (window.SpeechRecognition || window.webkitSpeechRecognition)
  : null

export class VoiceController {
  constructor({ onState = () => {}, onLevel = () => {}, onTranscript = () => {}, onResult = () => {}, onError = () => {}, audio = null } = {}) {
    this.onState = onState
    this.onLevel = onLevel
    this.onTranscript = onTranscript
    this.onResult = onResult
    this.onError = onError
    this.audio = audio
    this.stream = null
    this.ctx = null
    this.source = null
    this.analyser = null
    this.timeData = null
    this.freqData = null
    this.recognition = null
    this.listening = false
    this.completed = false
    this.state = 'idle'
    this.level = 0
    this.finalText = ''
    this.interimText = ''
    this.fallbackTimer = null
    this.startedAt = 0
    this.metrics = { sum: 0, max: 0, samples: 0, zcr: 0, centroid: 0, centroidSamples: 0 }
    this.raf = null
    this.lastFrame = 0
    this.supported = Boolean(navigator?.mediaDevices?.getUserMedia)
    this.recognitionSupported = Boolean(SpeechRecognition)
  }

  setState(state, detail = '') {
    this.state = state
    this.onState(state, detail)
  }

  async enable() {
    if (this.stream) {
      if (this.ctx?.state === 'suspended') await this.ctx.resume().catch(() => {})
      this.setState('ready')
      return true
    }
    if (!this.supported) {
      this.setState('unsupported', 'Microfone indisponível neste navegador.')
      return false
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1
        },
        video: false
      })
      this.stream = stream
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (Ctx) {
        this.ctx = new Ctx()
        if (this.ctx.state === 'suspended') await this.ctx.resume().catch(() => {})
        this.source = this.ctx.createMediaStreamSource(stream)
        this.analyser = this.ctx.createAnalyser()
        this.analyser.fftSize = 512
        this.analyser.smoothingTimeConstant = .72
        this.source.connect(this.analyser)
        this.timeData = new Uint8Array(this.analyser.fftSize)
        this.freqData = new Uint8Array(this.analyser.frequencyBinCount)
        this.loop()
      }
      this.setState('ready')
      return true
    } catch (error) {
      const message = error?.name === 'NotAllowedError'
        ? 'Permissão de microfone negada. Digite sua arma para continuar.'
        : 'Não foi possível abrir o microfone. Digite sua arma para continuar.'
      this.setState(error?.name === 'NotAllowedError' ? 'denied' : 'error', message)
      this.onError(error, message)
      return false
    }
  }

  loop = () => {
    if (!this.analyser) return
    this.raf = requestAnimationFrame(this.loop)
    const now = performance.now()
    if (now - this.lastFrame < 28) return
    this.lastFrame = now
    this.analyser.getByteTimeDomainData(this.timeData)
    this.analyser.getByteFrequencyData(this.freqData)
    let sum = 0
    let zc = 0
    let prev = 0
    for (let i = 0; i < this.timeData.length; i++) {
      const v = (this.timeData[i] - 128) / 128
      sum += v * v
      if ((v >= 0 && prev < 0) || (v < 0 && prev >= 0)) zc++
      prev = v
    }
    const rms = Math.sqrt(sum / this.timeData.length)
    const level = Math.min(1, Math.pow(rms * 3.4, .62))
    this.level = this.level * .65 + level * .35
    this.onLevel(this.level)
    if (this.listening) {
      this.metrics.sum += rms
      this.metrics.max = Math.max(this.metrics.max, rms)
      this.metrics.samples++
      this.metrics.zcr += zc
      let weighted = 0
      let total = 0
      for (let i = 1; i < this.freqData.length; i++) {
        const magnitude = this.freqData[i]
        weighted += i * magnitude
        total += magnitude
      }
      if (total > 0) {
        this.metrics.centroid += weighted / total
        this.metrics.centroidSamples++
      }
    }
  }

  setupRecognition() {
    if (this.recognition || !SpeechRecognition) return this.recognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'pt-BR'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    recognition.onstart = () => {
      if (!this.listening) return
      this.setState('listening')
    }
    recognition.onresult = event => {
      if (!this.listening) return
      let interim = ''
      let final = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0]?.transcript || ''
        if (event.results[i].isFinal) final += text
        else interim += text
      }
      if (interim) {
        this.interimText = interim
        this.onTranscript({ text: interim.trim(), final: false })
      }
      if (final.trim()) {
        this.finalText = final.trim()
        this.onTranscript({ text: this.finalText, final: true })
        this.finish(this.finalText, { source: 'speech' })
      }
    }
    recognition.onerror = event => {
      if (!this.listening) return
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        this.fail('Permissão de fala negada. Digite sua arma.')
        return
      }
      if (event.error === 'no-speech') {
        this.finishFallback('Nada foi captado. Sua assinatura vocal virou uma arma.', { source: 'fallback' })
        return
      }
      if (event.error === 'network' || event.error === 'audio-capture' || event.error === 'aborted') {
        if (this.metrics.samples > 8) {
          this.finishFallback('', { source: 'fallback' })
        } else {
          this.fail('Reconhecimento indisponível. Digite sua arma.')
        }
      }
    }
    recognition.onend = () => {
      if (!this.listening || this.completed) return
      if (this.finalText.trim()) {
        this.finish(this.finalText, { source: 'speech' })
      } else if (this.interimText.trim()) {
        this.finish(this.interimText, { source: 'speech' })
      } else if (this.metrics.samples > 10) {
        this.finishFallback('', { source: 'fallback' })
      } else {
        this.fail('Não ouvi nada. Tente de novo ou digite sua arma.')
      }
    }
    this.recognition = recognition
    return recognition
  }

  async startListening() {
    if (this.listening) return
    this.listening = true
    this.completed = false
    this.finalText = ''
    this.interimText = ''
    this.startedAt = performance.now()
    this.metrics = { sum: 0, max: 0, samples: 0, zcr: 0, centroid: 0, centroidSamples: 0 }
    this.setState('listening')
    this.onTranscript({ text: '', final: false })
    this.audio?.voiceStart()
    if (this.ctx?.state === 'suspended') await this.ctx.resume().catch(() => {})
    const recognition = this.setupRecognition()
    if (recognition) {
      try {
        recognition.start()
      } catch {
        // Safari throws if a recognition instance is still winding down. Let the
        // audio-signature fallback keep the forge usable.
        this.fallbackTimer = setTimeout(() => this.finishFallback('', { source: 'fallback' }), 2800)
      }
    } else {
      this.onState('fallback', 'Reconhecimento de fala indisponível. Capturando assinatura vocal…')
    }
    clearTimeout(this.fallbackTimer)
    this.fallbackTimer = setTimeout(() => {
      if (!this.listening || this.completed) return
      if (this.finalText) this.finish(this.finalText, { source: 'speech' })
      else this.finishFallback('', { source: 'fallback' })
    }, 6500)
  }

  stopListening() {
    if (!this.listening || this.completed) return
    if (this.finalText.trim()) {
      this.finish(this.finalText, { source: 'speech' })
      return
    }
    if (this.interimText.trim()) {
      this.finish(this.interimText, { source: 'speech' })
      return
    }
    if (this.metrics.samples > 5) {
      this.finishFallback('', { source: 'fallback' })
      return
    }
    this.fail('Nada foi captado. Tente de novo ou digite sua arma.')
  }

  finishFallback(message, meta = {}) {
    if (!this.listening || this.completed) return
    const samples = Math.max(1, this.metrics.samples)
    const rms = this.metrics.sum / samples
    const zcr = this.metrics.zcr / samples
    const centroid = this.metrics.centroid / Math.max(1, this.metrics.centroidSamples)
    const descriptor = describeVoice(rms, zcr, centroid)
    this.finish(descriptor.phrase, {
      source: 'fallback',
      descriptor,
      message: message || `Assinatura vocal capturada: ${descriptor.label.toLowerCase()}.`
    })
  }

  finish(text, meta = {}) {
    if (this.completed) return
    this.completed = true
    this.listening = false
    clearTimeout(this.fallbackTimer)
    try { this.recognition?.stop() } catch {}
    this.setState('processing')
    this.audio?.voiceEnd()
    this.onLevel(0)
    const clean = String(text || '').trim()
    setTimeout(() => {
      if (!clean) {
        this.fail('Não entendi. Tente outra palavra ou digite sua arma.')
        return
      }
      this.onResult(clean, meta)
    }, 260)
  }

  fail(message) {
    this.completed = true
    this.listening = false
    clearTimeout(this.fallbackTimer)
    try { this.recognition?.stop() } catch {}
    this.onLevel(0)
    this.setState('error', message)
    this.onError(new Error(message), message)
  }

  cancel() {
    this.listening = false
    this.completed = true
    clearTimeout(this.fallbackTimer)
    try { this.recognition?.stop() } catch {}
    this.onLevel(0)
    this.setState('ready')
  }

  getWaveform() {
    if (!this.analyser) return null
    return this.timeData
  }

  getLevel() {
    return this.level
  }
}

function describeVoice(rms, zcr, centroid) {
  const energy = Math.min(1, rms * 7)
  const pitch = Math.min(1, centroid / 180)
  const noisiness = Math.min(1, zcr / 120)
  let tone = 'GRAVE'
  if (pitch > .68) tone = 'CRISTALINA'
  else if (pitch > .48) tone = 'AGUDA'
  else if (noisiness > .62) tone = 'RASPANTE'
  let force = 'SUSSURRADA'
  if (energy > .66) force = 'TEMPESTUOSA'
  else if (energy > .34) force = 'RESSONANTE'
  else if (energy > .15) force = 'FIRME'
  const element = pitch > .7 ? 'gelo' : pitch < .3 ? 'fogo' : noisiness > .55 ? 'trovão' : energy > .55 ? 'sangue' : 'plasma'
  const archetype = energy > .62 ? 'canhão' : noisiness > .58 ? 'espingarda' : pitch > .62 ? 'arco' : 'pistola'
  return {
    phrase: `Voz ${tone} ${force}`.toLowerCase(),
    label: `Voz ${tone.toLowerCase()} ${force.toLowerCase()}`,
    element,
    archetype,
    energy,
    pitch,
    noisiness,
    normalized: normalizeText(`voz ${tone} ${force} ${element} ${archetype}`)
  }
}
