/* ============================================================
   VOX//ARENA — tiny procedural audio engine
   No samples, no downloads: every sound is synthesized.
   ============================================================ */

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.noiseBuffer = null;
    this.muted = false;
    this.ambient = null;
    this.lastShot = 0;
  }

  ensure() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return this.ctx;
    }

    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;

    try {
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.58;
      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.value = -15;
      compressor.knee.value = 18;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.22;
      this.master.connect(compressor);
      compressor.connect(this.ctx.destination);
      this.noiseBuffer = this.makeNoise(1.2);
      this.startAmbient();
    } catch {
      this.ctx = null;
    }
    return this.ctx;
  }

  makeNoise(seconds) {
    const length = Math.floor(this.ctx.sampleRate * seconds);
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  setMuted(muted) {
    this.muted = muted;
    if (!this.master || !this.ctx) return;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(muted ? 0 : 0.58, this.ctx.currentTime, 0.03);
    if (!muted && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
  }

  startAmbient() {
    if (!this.ctx || this.ambient) return;
    const now = this.ctx.currentTime;
    const bus = this.ctx.createGain();
    bus.gain.value = 0;
    bus.connect(this.master);
    bus.gain.setTargetAtTime(0.032, now, 1.8);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 250;
    filter.Q.value = 0.7;
    filter.connect(bus);

    const oscA = this.ctx.createOscillator();
    oscA.type = 'sine';
    oscA.frequency.value = 46;

    const oscB = this.ctx.createOscillator();
    oscB.type = 'triangle';
    oscB.frequency.value = 69;
    oscB.detune.value = -8;

    const gainA = this.ctx.createGain();
    const gainB = this.ctx.createGain();
    gainA.gain.value = 0.55;
    gainB.gain.value = 0.16;
    oscA.connect(gainA).connect(filter);
    oscB.connect(gainB).connect(filter);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.085;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.1;
    lfo.connect(lfoGain).connect(bus.gain);

    const wind = this.ctx.createBufferSource();
    wind.buffer = this.noiseBuffer;
    wind.loop = true;
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 430;
    windFilter.Q.value = 0.4;
    const windGain = this.ctx.createGain();
    windGain.gain.value = 0.055;
    wind.connect(windFilter).connect(windGain).connect(bus);

    oscA.start(now);
    oscB.start(now);
    lfo.start(now);
    wind.start(now);

    this.ambient = { bus, oscA, oscB, lfo, wind };
  }

  setIntensity(value) {
    if (!this.ctx || !this.ambient) return;
    const clamped = Math.max(0, Math.min(1, value));
    this.ambient.bus.gain.setTargetAtTime(0.032 + clamped * 0.024, this.ctx.currentTime, 0.6);
  }

  noise({ duration = 0.1, gain = 0.2, type = 'bandpass', frequency = 1200, q = 0.8, rate = 1 } = {}) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    source.playbackRate.value = rate;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(frequency, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(60, frequency * 0.28), now + duration);
    filter.Q.value = q;
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.exponentialRampToValueAtTime(gain, now + 0.006);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    source.connect(filter).connect(amp).connect(this.master);
    source.start(now);
    source.stop(now + duration + 0.02);
  }

  tone({ from = 220, to = 80, duration = 0.18, gain = 0.12, type = 'sine', delay = 0 } = {}) {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(from, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(24, to), now + duration);
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.exponentialRampToValueAtTime(gain, now + 0.012);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(amp).connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  shoot(weapon) {
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    if (now - this.lastShot < 0.028) return;
    this.lastShot = now;

    const element = weapon?.element?.id || 'neutral';
    const kind = weapon?.archetype?.id || 'rifle';
    const elementPitch = { fire: 0.9, ice: 1.35, storm: 1.6, plasma: 1.2, toxic: 0.85, void: 0.7, prism: 1.45, neutral: 1 }[element] || 1;

    if (kind === 'rail' || kind === 'beam') {
      this.tone({ from: 1800 * elementPitch, to: 190, duration: 0.24, gain: 0.075, type: 'sawtooth' });
      this.tone({ from: 900 * elementPitch, to: 80, duration: 0.2, gain: 0.055, type: 'square' });
      this.noise({ duration: 0.12, gain: 0.055, type: 'highpass', frequency: 2300 });
    } else if (kind === 'cannon' || kind === 'launcher') {
      this.tone({ from: 150, to: 40, duration: 0.32, gain: 0.2, type: 'triangle' });
      this.noise({ duration: 0.24, gain: 0.16, type: 'lowpass', frequency: 900, rate: 0.7 });
    } else if (kind === 'shotgun') {
      this.noise({ duration: 0.25, gain: 0.19, type: 'bandpass', frequency: 950, q: 0.7 });
      this.tone({ from: 110, to: 42, duration: 0.22, gain: 0.16, type: 'triangle' });
    } else if (kind === 'minigun') {
      this.noise({ duration: 0.06, gain: 0.07, type: 'bandpass', frequency: 2000, rate: 1.2 });
      this.tone({ from: 180 * elementPitch, to: 70, duration: 0.055, gain: 0.055, type: 'sawtooth' });
    } else {
      this.noise({ duration: 0.07, gain: 0.085, type: 'bandpass', frequency: 1700 * elementPitch, q: 1.4, rate: 1.15 });
      this.tone({ from: 430 * elementPitch, to: 120, duration: 0.08, gain: 0.075, type: 'square' });
    }
  }

  hit(crit = false) {
    if (!this.ctx || this.muted) return;
    this.tone({ from: crit ? 1250 : 760, to: crit ? 560 : 360, duration: 0.055, gain: crit ? 0.055 : 0.035, type: 'square' });
  }

  impact() {
    if (!this.ctx || this.muted) return;
    this.noise({ duration: 0.06, gain: 0.03, type: 'highpass', frequency: 2800 });
  }

  kill() {
    if (!this.ctx || this.muted) return;
    this.tone({ from: 155, to: 42, duration: 0.5, gain: 0.16, type: 'triangle' });
    this.noise({ duration: 0.45, gain: 0.13, type: 'lowpass', frequency: 1500, q: 0.4 });
    setTimeout(() => this.tone({ from: 520, to: 1080, duration: 0.12, gain: 0.035, type: 'sine' }), 90);
  }

  playerHit() {
    if (!this.ctx || this.muted) return;
    this.tone({ from: 95, to: 33, duration: 0.4, gain: 0.25, type: 'sine' });
    this.noise({ duration: 0.22, gain: 0.11, type: 'lowpass', frequency: 480 });
  }

  pickup(progress = 0) {
    if (!this.ctx || this.muted) return;
    const pitch = 440 + Math.min(1, Math.max(0, progress)) * 560;
    this.tone({ from: pitch, to: pitch * 1.45, duration: 0.065, gain: 0.026, type: 'triangle' });
  }

  materialize() {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    [220, 330, 440, 660].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq * 1.8, now + i * 0.035);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.32 + i * 0.035);
      const amp = ctx.createGain();
      amp.gain.setValueAtTime(0.0001, now + i * 0.035);
      amp.gain.exponentialRampToValueAtTime(0.045, now + 0.07 + i * 0.035);
      amp.gain.exponentialRampToValueAtTime(0.0001, now + 0.75 + i * 0.035);
      osc.connect(amp).connect(this.master);
      osc.start(now + i * 0.035);
      osc.stop(now + 0.9);
    });
    this.noise({ duration: 0.55, gain: 0.065, type: 'bandpass', frequency: 2800, q: 2.2, rate: 1.4 });
  }

  wave() {
    if (!this.ctx || this.muted) return;
    this.tone({ from: 180, to: 160, duration: 0.5, gain: 0.07, type: 'sawtooth' });
    this.tone({ from: 330, to: 440, duration: 0.55, gain: 0.06, type: 'triangle', delay: 0.16 });
    this.tone({ from: 660, to: 880, duration: 0.65, gain: 0.035, type: 'sine', delay: 0.28 });
  }

  gameOver() {
    if (!this.ctx || this.muted) return;
    this.tone({ from: 170, to: 48, duration: 1.4, gain: 0.19, type: 'sawtooth' });
    this.noise({ duration: 1.2, gain: 0.06, type: 'lowpass', frequency: 700 });
  }

  ui(up = false) {
    if (!this.ctx || this.muted) return;
    this.tone({ from: up ? 420 : 280, to: up ? 620 : 180, duration: 0.06, gain: 0.032, type: 'sine' });
  }
}
