import { clamp, rand } from './utils.js';

/**
 * Fully procedural audio: no samples, no network. Synthwave ambience and
 * weapon-specific synthesized gunfire keep the experience self-contained.
 */
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.ready = false;
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
    } catch {
      return null;
    }
    const ctx = this.ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.enabled ? 0.72 : 0;
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -16;
    this.comp.knee.value = 22;
    this.comp.ratio.value = 5;
    this.comp.attack.value = 0.003;
    this.comp.release.value = 0.2;
    this.master.connect(this.comp);
    this.comp.connect(ctx.destination);

    const len = Math.floor(ctx.sampleRate * 1.2);
    this.noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    this.ready = true;
    this.startAmbient();
    return ctx;
  }

  setEnabled(on) {
    this.enabled = Boolean(on);
    if (this.master) {
      this.master.gain.setTargetAtTime(this.enabled ? 0.72 : 0, this.ctx.currentTime, 0.08);
    }
  }

  startAmbient() {
    if (!this.ctx || this.ambient) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const bus = ctx.createGain();
    bus.gain.value = 0;
    bus.connect(this.master);
    bus.gain.setTargetAtTime(0.22, t, 2.2);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 340;
    filter.Q.value = 1.8;
    filter.connect(bus);

    const freqs = [55, 82.41, 110, 164.81];
    const oscs = [];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 ? 'triangle' : 'sawtooth';
      osc.frequency.value = f;
      osc.detune.value = (i - 1.5) * 7;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.09 : 0.035;
      osc.connect(g);
      g.connect(filter);
      osc.start(t);
      oscs.push(osc);
    });

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 130;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(t);

    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    noise.loop = true;
    const nf = ctx.createBiquadFilter();
    nf.type = 'bandpass';
    nf.frequency.value = 520;
    nf.Q.value = 0.6;
    const ng = ctx.createGain();
    ng.gain.value = 0.018;
    noise.connect(nf);
    nf.connect(ng);
    ng.connect(bus);
    noise.start(t);

    const shimmer = ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.value = 1318.5;
    const sg = ctx.createGain();
    sg.gain.value = 0.006;
    const trem = ctx.createOscillator();
    trem.frequency.value = 0.17;
    const tg = ctx.createGain();
    tg.gain.value = 0.006;
    trem.connect(tg);
    tg.connect(sg.gain);
    shimmer.connect(sg);
    sg.connect(bus);
    shimmer.start(t);
    trem.start(t);

    this.ambient = { bus, oscs, noise, shimmer, lfo, trem, filter };
  }

  duck(amount = 0.3, time = 0.3) {
    if (!this.ctx || !this.ambient) return;
    const g = this.ambient.bus.gain;
    const t = this.ctx.currentTime;
    g.cancelScheduledValues(t);
    g.setTargetAtTime(amount, t, 0.02);
    g.setTargetAtTime(0.22, t + time, 0.4);
  }

  tone({ freq = 440, end = 80, dur = 0.2, type = 'sine', gain = 0.12, attack = 0.004, detune = 0, pan = 0 }) {
    if (!this.ready || !this.enabled) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, freq), t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, end), t + dur);
    osc.detune.value = detune;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    osc.connect(g);
    if (p) { p.pan.value = clamp(pan, -1, 1); g.connect(p); p.connect(this.master); }
    else g.connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  noise({ dur = 0.12, freq = 900, endFreq = 200, q = 1, gain = 0.16, type = 'bandpass', pan = 0, attack = 0.002 }) {
    if (!this.ready || !this.enabled) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    f.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), t + dur);
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    src.connect(f);
    f.connect(g);
    if (p) { p.pan.value = clamp(pan, -1, 1); g.connect(p); p.connect(this.master); }
    else g.connect(this.master);
    src.start(t);
    src.stop(t + dur + 0.03);
  }

  shot(weapon, pan = 0) {
    if (!this.ready || !this.enabled) return;
    const now = this.ctx.currentTime;
    if (now - this.lastShot < 0.045) return;
    this.lastShot = now;
    const type = weapon.type;
    const pitch = 0.86 + Math.random() * 0.28;
    this.duck(0.12, 0.2);

    if (type === 'pulse') {
      this.tone({ freq: 420 * pitch, end: 70, dur: 0.14, type: 'square', gain: 0.055, pan });
      this.noise({ dur: 0.09, freq: 3200, endFreq: 700, q: 0.9, gain: 0.13, pan });
    } else if (type === 'scatter') {
      this.tone({ freq: 130 * pitch, end: 42, dur: 0.3, type: 'sawtooth', gain: 0.16, pan });
      this.noise({ dur: 0.26, freq: 2100, endFreq: 220, q: 0.5, gain: 0.26, pan });
      this.tone({ freq: 800, end: 120, dur: 0.18, type: 'square', gain: 0.04, pan });
    } else if (type === 'beam') {
      this.tone({ freq: 1750 * pitch, end: 420, dur: 0.22, type: 'sawtooth', gain: 0.06, pan });
      this.tone({ freq: 340, end: 1300, dur: 0.14, type: 'sine', gain: 0.09, pan });
      this.noise({ dur: 0.14, freq: 5000, endFreq: 1400, q: 2, gain: 0.07, pan });
    } else if (type === 'arc') {
      this.noise({ dur: 0.22, freq: 4200, endFreq: 500, q: 1.6, gain: 0.16, pan });
      this.tone({ freq: 900 * pitch, end: 120, dur: 0.19, type: 'square', gain: 0.055, pan, detune: rand(-18, 18) });
    } else if (type === 'havoc') {
      this.tone({ freq: 110 * pitch, end: 36, dur: 0.4, type: 'sine', gain: 0.22, pan });
      this.noise({ dur: 0.16, freq: 1400, endFreq: 300, q: 0.7, gain: 0.18, pan });
      this.tone({ freq: 640, end: 80, dur: 0.3, type: 'triangle', gain: 0.05, pan });
    } else if (type === 'frost') {
      this.tone({ freq: 1400 * pitch, end: 620, dur: 0.2, type: 'sine', gain: 0.08, pan });
      this.noise({ dur: 0.16, freq: 6200, endFreq: 2400, q: 3, gain: 0.09, pan });
      this.tone({ freq: 2200, end: 1800, dur: 0.32, type: 'triangle', gain: 0.03, pan });
    } else if (type === 'venom') {
      this.tone({ freq: 240 * pitch, end: 90, dur: 0.25, type: 'sawtooth', gain: 0.08, pan });
      this.noise({ dur: 0.2, freq: 900, endFreq: 300, q: 4, gain: 0.12, pan });
    } else if (type === 'vampire') {
      this.tone({ freq: 520 * pitch, end: 55, dur: 0.34, type: 'sawtooth', gain: 0.09, pan });
      this.noise({ dur: 0.1, freq: 2400, endFreq: 400, gain: 0.1, pan });
      this.tone({ freq: 90, end: 40, dur: 0.28, type: 'sine', gain: 0.14, pan });
    } else if (type === 'bloom') {
      this.tone({ freq: 780 * pitch, end: 520, dur: 0.3, type: 'triangle', gain: 0.07, pan });
      this.tone({ freq: 1170, end: 1560, dur: 0.24, type: 'sine', gain: 0.035, pan });
      this.noise({ dur: 0.1, freq: 4200, endFreq: 1600, q: 2, gain: 0.05, pan });
    } else {
      this.noise({ dur: 0.1, freq: 2400, endFreq: 500, q: 1, gain: 0.14, pan });
    }
  }

  hit(pan = 0) {
    this.tone({ freq: 1500, end: 640, dur: 0.06, type: 'square', gain: 0.035, pan });
    this.noise({ dur: 0.04, freq: 5500, endFreq: 2200, q: 2, gain: 0.05, pan });
  }

  crit(pan = 0) {
    this.tone({ freq: 2100, end: 1300, dur: 0.09, type: 'triangle', gain: 0.06, pan });
  }

  kill(pan = 0) {
    this.tone({ freq: 180, end: 42, dur: 0.34, type: 'sine', gain: 0.16, pan });
    this.noise({ dur: 0.28, freq: 1500, endFreq: 180, q: 0.8, gain: 0.13, pan });
    this.tone({ freq: 880, end: 300, dur: 0.18, type: 'square', gain: 0.03, pan });
  }

  explosion(pan = 0, big = false) {
    this.tone({ freq: big ? 90 : 130, end: 30, dur: big ? 0.7 : 0.46, type: 'sine', gain: big ? 0.34 : 0.22, pan });
    this.noise({ dur: big ? 0.7 : 0.42, freq: 1600, endFreq: 90, q: 0.4, gain: big ? 0.36 : 0.24, pan, type: 'lowpass' });
    this.duck(0.08, 0.5);
  }

  hurt() {
    this.tone({ freq: 160, end: 50, dur: 0.3, type: 'sawtooth', gain: 0.15 });
    this.noise({ dur: 0.18, freq: 700, endFreq: 160, q: 0.6, gain: 0.15 });
  }

  heal() {
    this.tone({ freq: 520, end: 980, dur: 0.35, type: 'sine', gain: 0.06 });
    this.tone({ freq: 780, end: 1560, dur: 0.42, type: 'sine', gain: 0.035 });
  }

  pickup() {
    this.tone({ freq: 660, end: 990, dur: 0.12, type: 'triangle', gain: 0.06 });
    this.tone({ freq: 990, end: 1480, dur: 0.16, type: 'sine', gain: 0.04 });
  }

  empty() {
    this.tone({ freq: 120, end: 90, dur: 0.05, type: 'square', gain: 0.035 });
    this.noise({ dur: 0.03, freq: 3000, endFreq: 1800, gain: 0.03 });
  }

  forge() {
    this.duck(0.1, 0.9);
    this.tone({ freq: 110, end: 440, dur: 0.7, type: 'sawtooth', gain: 0.07 });
    this.tone({ freq: 220, end: 880, dur: 0.55, type: 'triangle', gain: 0.05 });
    this.tone({ freq: 880, end: 1760, dur: 0.4, type: 'sine', gain: 0.035 });
    this.noise({ dur: 0.7, freq: 400, endFreq: 5200, q: 1.2, gain: 0.09, type: 'bandpass' });
  }

  wave() {
    this.tone({ freq: 55, end: 110, dur: 1.4, type: 'sawtooth', gain: 0.08 });
    this.tone({ freq: 440, end: 660, dur: 0.8, type: 'triangle', gain: 0.04 });
    this.tone({ freq: 660, end: 990, dur: 0.9, type: 'sine', gain: 0.028 });
    this.noise({ dur: 1.1, freq: 200, endFreq: 3000, q: 0.8, gain: 0.05, type: 'bandpass' });
  }

  waveClear() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      setTimeout(() => this.tone({ freq: f, end: f, dur: 0.6, type: 'sine', gain: 0.045 }), i * 90);
    });
  }

  ui() {
    this.tone({ freq: 1200, end: 1600, dur: 0.05, type: 'sine', gain: 0.025 });
  }

  listenStart() {
    this.tone({ freq: 380, end: 620, dur: 0.09, type: 'sine', gain: 0.045 });
    this.tone({ freq: 1500, end: 1900, dur: 0.06, type: 'sine', gain: 0.02 });
  }

  listenEnd() {
    this.tone({ freq: 620, end: 340, dur: 0.1, type: 'sine', gain: 0.04 });
  }

  denied() {
    this.tone({ freq: 220, end: 150, dur: 0.18, type: 'square', gain: 0.05 });
    this.tone({ freq: 170, end: 110, dur: 0.22, type: 'square', gain: 0.045 });
  }
}
