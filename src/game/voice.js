import { clamp } from './utils.js';
import { fallbackWordFor } from './weapons.js';

const SpeechRecognitionCtor = typeof window !== 'undefined'
  ? (window.SpeechRecognition || window.webkitSpeechRecognition)
  : null;

/**
 * Microphone + speech recognition. Two independent channels:
 *  1. Web Speech API (best effort, needs network on some browsers)
 *  2. Raw acoustics (loudness + spectral centroid) as a universal fallback
 * If neither yields words, the HUD offers typed input — the forge always works.
 */
export class VoiceSystem {
  constructor({ audio, lang = 'pt-BR', onState = () => {}, onPartial = () => {}, onFinal = () => {}, onLevel = () => {}, onError = () => {} } = {}) {
    this.audio = audio;
    this.lang = lang;
    this.onState = onState;
    this.onPartial = onPartial;
    this.onFinal = onFinal;
    this.onLevel = onLevel;
    this.onError = onError;

    this.supported = Boolean(SpeechRecognitionCtor);
    this.recognition = null;
    this.stream = null;
    this.source = null;
    this.analyser = null;
    this.freqData = null;
    this.timeData = null;

    this.micState = 'idle';
    this.listening = false;
    this.startAt = 0;
    this.level = 0;
    this.pitch = 0.5;
    this.peakLevel = 0;
    this.levelSum = 0;
    this.levelSamples = 0;
    this.pitchSum = 0;
    this.pitchSamples = 0;

    this.interim = '';
    this.finalText = '';
    this.error = null;
    this._finalizeTimer = null;
    this._finalized = true;
    this._startPromise = null;
    this._pendingStart = false;
  }

  get langLabel() { return this.lang === 'en-US' ? 'EN-US' : 'PT-BR'; }

  setLang(lang) {
    this.lang = lang;
    this.stopRecognition();
  }

  async init() {
    if (this.micState === 'ready') return true;
    if (this._startPromise) return this._startPromise;
    if (!navigator.mediaDevices?.getUserMedia) {
      this.micState = 'unsupported';
      this.onState(this.micState);
      return false;
    }
    this.micState = 'pending';
    this.onState(this.micState);
    this._startPromise = (async () => {
      try {
        const audioCtx = this.audio.ensure();
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1
          }
        });
        this.stream = stream;
        if (!audioCtx) throw new Error('no-audio-context');
        this.source = audioCtx.createMediaStreamSource(stream);
        this.analyser = audioCtx.createAnalyser();
        this.analyser.fftSize = 1024;
        this.analyser.smoothingTimeConstant = 0.72;
        this.source.connect(this.analyser);
        this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
        this.timeData = new Uint8Array(this.analyser.fftSize);
        this.micState = 'ready';
        this.onState(this.micState);
        return true;
      } catch (err) {
        this.error = err?.name || 'error';
        this.micState = 'denied';
        this.onState(this.micState);
        this.onError(this.error);
        return false;
      } finally {
        this._startPromise = null;
      }
    })();
    return this._startPromise;
  }

  update() {
    if (!this.analyser) return;
    this.analyser.getByteTimeDomainData(this.timeData);
    let sum = 0;
    for (let i = 0; i < this.timeData.length; i++) {
      const v = (this.timeData[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / this.timeData.length);
    const scaled = clamp((rms - 0.005) * 9.2, 0, 1);
    this.level += (scaled - this.level) * 0.25;

    this.analyser.getByteFrequencyData(this.freqData);
    let weighted = 0;
    let total = 0;
    for (let i = 2; i < this.freqData.length; i++) {
      const v = this.freqData[i] / 255;
      weighted += i * v * v;
      total += v * v;
    }
    const centroidBin = total > 0.0001 ? weighted / total : 0;
    const hz = centroidBin * (this.audio.ctx?.sampleRate || 48000) / this.freqData.length;
    const pitchNorm = clamp((hz - 110) / 820, 0, 1);
    this.pitch += (pitchNorm - this.pitch) * 0.12;

    if (this.listening) {
      this.peakLevel = Math.max(this.peakLevel, this.level);
      this.levelSum += this.level;
      this.levelSamples++;
      this.pitchSum += this.pitch;
      this.pitchSamples++;
      this.onLevel(this.level, this.pitch);
    }
  }

  async startListening() {
    if (this.listening) return;
    this.audio.ensure();
    if (this._finalizeTimer) { clearTimeout(this._finalizeTimer); this._finalizeTimer = null; }

    this.listening = true;
    this.startAt = performance.now();
    this.interim = '';
    this.finalText = '';
    this.error = null;
    this._finalized = false;
    this.peakLevel = 0;
    this.levelSum = 0;
    this.levelSamples = 0;
    this.pitchSum = 0;
    this.pitchSamples = 0;
    this.onState('listening');
    this.audio.listenStart();

    if (this.micState !== 'ready') {
      const ok = await this.init();
      if (!this.listening) return;
      if (!ok) {
        this.onError('mic-denied');
        return;
      }
    }
    if (!this.supported) return;
    try {
      this.stopRecognition();
      const rec = new SpeechRecognitionCtor();
      rec.lang = this.lang;
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 3;
      rec.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0]?.transcript || '';
          if (result.isFinal) this.finalText = `${this.finalText} ${text}`.trim();
          else interim += text;
        }
        this.interim = interim.trim();
        this.onPartial((this.finalText || this.interim).trim());
      };
      rec.onerror = (event) => {
        this.error = event.error || 'speech-error';
        if (['not-allowed', 'service-not-allowed'].includes(this.error)) {
          this.onError('speech-denied');
        } else if (this.error !== 'no-speech' && this.error !== 'aborted') {
          this.onError(this.error);
        }
      };
      rec.onend = () => {
        if (this.listening) {
          // Some mobile browsers end the session after the first phrase.
          this.stopListening('recognition-end');
        }
      };
      this.recognition = rec;
      rec.start();
    } catch (err) {
      this.error = err?.message || 'start-failed';
      this.onError('recognition-start');
      this.recognition = null;
    }
  }

  stopListening(reason = 'release') {
    if (!this.listening) return;
    this.listening = false;
    this.stopRecognition();
    this.audio.listenEnd();
    this.onState('processing');

    const wait = this.recognitionTimeout || 780;
    if (this._finalizeTimer) clearTimeout(this._finalizeTimer);
    this._finalizeTimer = setTimeout(() => this.finalize(reason), wait);
  }

  stopRecognition() {
    if (!this.recognition) return;
    try { this.recognition.onend = null; this.recognition.stop(); } catch { /* already stopped */ }
    this.recognition = null;
  }

  finalize(reason = 'release') {
    if (this._finalized) return;
    this._finalized = true;
    if (this._finalizeTimer) { clearTimeout(this._finalizeTimer); this._finalizeTimer = null; }

    const text = (this.finalText || this.interim || '').replace(/\s+/g, ' ').trim();
    const duration = Math.max(0.2, (performance.now() - this.startAt) / 1000);
    const avgLevel = this.levelSamples ? this.levelSum / this.levelSamples : this.level;
    const maxLevel = Math.max(this.peakLevel, avgLevel, this.level);
    const avgPitch = this.pitchSamples ? this.pitchSum / this.pitchSamples : this.pitch;
    const metrics = {
      level: clamp(maxLevel * 0.7 + avgLevel * 0.55, 0, 1),
      pitch: clamp(avgPitch, 0, 1),
      duration
    };

    this.onState('idle');
    this.onPartial('');

    if (text) {
      this.onFinal({ text, ...metrics, source: 'voice' });
      return;
    }

    if (metrics.level > 0.12) {
      this.onFinal({
        text: fallbackWordFor(metrics.level, metrics.pitch),
        ...metrics,
        source: 'tone'
      });
      this.onError(this.supported ? 'no-words' : 'tone-fallback');
      return;
    }

    this.onError(this.micState === 'denied' ? 'mic-denied' : 'silence');
  }

  cancel() {
    this.listening = false;
    this._finalized = true;
    this.stopRecognition();
    if (this._finalizeTimer) { clearTimeout(this._finalizeTimer); this._finalizeTimer = null; }
    this.onState('idle');
  }
}
