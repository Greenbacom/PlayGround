import { pick, rand, chance } from './utils.js';

/**
 * Every sound in the game is synthesized at runtime with WebAudio.
 * No audio files, no downloads. Samba-flavoured menu loop + punchy SFX.
 */
export class GameAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.ready = false;
    this.master = null;
    this.musicBus = null;
    this.sfxBus = null;
    this.noiseBuffer = null;
    this.timer = null;
    this.ambientTimer = null;
    this.step = 0;
    this.nextStepTime = 0;
    this.bpm = 98;
    this.lastStepAt = 0;
  }

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    const ctx = this.ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.enabled ? 0.82 : 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 22;
    comp.ratio.value = 4;
    comp.attack.value = 0.004;
    comp.release.value = 0.24;
    this.master.connect(comp);
    comp.connect(ctx.destination);
    this.musicBus = ctx.createGain();
    this.musicBus.gain.value = 0.15;
    this.musicBus.connect(this.master);
    this.sfxBus = ctx.createGain();
    this.sfxBus.gain.value = 0.72;
    this.sfxBus.connect(this.master);
    this.noiseBuffer = this.makeNoise(2.2);
    this.ready = true;
    this.startAmbience();
    this.startMusic();
    if (ctx.state === 'suspended') await ctx.resume();
  }

  makeNoise(seconds) {
    const ctx = this.ctx;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  setEnabled(on) {
    this.enabled = on;
    if (this.master && this.ctx) {
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setTargetAtTime(on ? 0.82 : 0, t, 0.04);
    }
  }

  resume() {
    if (this.ctx?.state === 'suspended') this.ctx.resume();
  }

  // ------------------------------------------------------------------ utils
  now() { return this.ctx ? this.ctx.currentTime : 0; }

  tone({ freq = 440, endFreq = null, dur = 0.15, gain = 0.12, type = 'sine', when = 0, attack = 0.003, curve = 0.0001, bus = null, detune = 0 }) {
    if (!this.ctx) return;
    const t = this.now() + when;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (endFreq !== null) osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), t + dur);
    if (detune) osc.detune.value = detune;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, curve), t + dur);
    osc.connect(g); g.connect(bus || this.sfxBus);
    osc.start(t); osc.stop(t + dur + 0.04);
  }

  noise({ dur = 0.12, gain = 0.18, type = 'highpass', freq = 1000, endFreq = null, q = 0.8, when = 0, attack = 0.002, bus = null }) {
    if (!this.ctx) return;
    const t = this.now() + when;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    f.Q.value = q;
    if (endFreq) f.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); g.connect(bus || this.sfxBus);
    src.start(t, rand(1.6)); src.stop(t + dur + 0.03);
  }

  // ------------------------------------------------------------------- sfx
  shot(kind) {
    if (!this.ready) return;
    if (kind === 'shotgun') {
      this.noise({ dur: 0.3, gain: 0.46, type: 'lowpass', freq: 1700, endFreq: 300, when: 0 });
      this.tone({ freq: 115, endFreq: 36, dur: 0.26, gain: 0.38, type: 'triangle' });
      this.noise({ dur: 0.06, gain: 0.14, type: 'highpass', freq: 2800, when: 0.03 });
    } else if (kind === 'smg') {
      this.noise({ dur: 0.055, gain: 0.2, type: 'bandpass', freq: 1900, q: 0.7 });
      this.tone({ freq: 220, endFreq: 70, dur: 0.06, gain: 0.16, type: 'square' });
    } else {
      this.noise({ dur: 0.085, gain: 0.3, type: 'highpass', freq: 900, endFreq: 1700 });
      this.tone({ freq: 170, endFreq: 48, dur: 0.1, gain: 0.3, type: 'triangle' });
      this.tone({ freq: 2100, endFreq: 900, dur: 0.03, gain: 0.035, type: 'square' });
    }
  }

  dryFire() {
    if (!this.ready) return;
    this.tone({ freq: 1300, endFreq: 700, dur: 0.03, gain: 0.08, type: 'square' });
  }

  reloadStart(time = 1.4) {
    if (!this.ready) return;
    this.noise({ dur: 0.03, gain: 0.12, type: 'bandpass', freq: 2200, q: 2 });
    this.tone({ freq: 700, endFreq: 420, dur: 0.04, gain: 0.05, type: 'square' });
    if (time > 1) {
      this.noise({ dur: 0.04, gain: 0.14, type: 'bandpass', freq: 1500, q: 2, when: Math.min(time * 0.55, 1.1) });
      this.tone({ freq: 420, endFreq: 300, dur: 0.05, gain: 0.06, type: 'square', when: Math.min(time * 0.55, 1.1) });
      this.noise({ dur: 0.04, gain: 0.17, type: 'bandpass', freq: 2600, q: 3, when: time * 0.86 });
      this.tone({ freq: 900, endFreq: 520, dur: 0.05, gain: 0.07, type: 'square', when: time * 0.86 });
    }
  }

  hit(headshot = false) {
    if (!this.ready) return;
    this.noise({ dur: 0.04, gain: 0.1, type: 'highpass', freq: headshot ? 3200 : 2000 });
    this.tone({ freq: headshot ? 1500 : 900, endFreq: headshot ? 700 : 420, dur: 0.05, gain: 0.055, type: 'square' });
  }

  kill() {
    if (!this.ready) return;
    this.noise({ dur: 0.18, gain: 0.16, type: 'lowpass', freq: 1200, endFreq: 200 });
    this.tone({ freq: 260, endFreq: 55, dur: 0.24, gain: 0.12, type: 'sawtooth' });
  }

  hurt() {
    if (!this.ready) return;
    this.noise({ dur: 0.2, gain: 0.24, type: 'lowpass', freq: 600, endFreq: 130 });
    this.tone({ freq: 95, endFreq: 44, dur: 0.28, gain: 0.24, type: 'sine' });
  }

  pickup(kind = 'heal') {
    if (!this.ready) return;
    const notes = kind === 'grenade' ? [523, 784, 1046] : [660, 880];
    notes.forEach((f, i) => this.tone({ freq: f, dur: 0.18, gain: 0.08, type: 'triangle', when: i * 0.075 }));
  }

  enemyShoot() {
    if (!this.ready) return;
    this.noise({ dur: 0.22, gain: 0.12, type: 'bandpass', freq: 500, endFreq: 1600, q: 3 });
    this.tone({ freq: 180, endFreq: 620, dur: 0.2, gain: 0.05, type: 'sawtooth' });
  }

  explosion() {
    if (!this.ready) return;
    this.noise({ dur: 0.7, gain: 0.4, type: 'lowpass', freq: 1400, endFreq: 120 });
    this.tone({ freq: 68, endFreq: 24, dur: 0.65, gain: 0.38, type: 'sine' });
    for (let i = 0; i < 7; i++) {
      this.noise({ dur: 0.05, gain: 0.05, type: 'highpass', freq: rand(3000, 6500), when: rand(0.5, 0.05) });
    }
  }

  grenadeThrow() {
    if (!this.ready) return;
    this.noise({ dur: 0.24, gain: 0.1, type: 'bandpass', freq: 800, endFreq: 300, q: 1 });
  }

  waveStart(num) {
    if (!this.ready) return;
    // Berimbau-like twang + surdo hit.
    this.tone({ freq: 150, endFreq: 138, dur: 0.65, gain: 0.15, type: 'triangle', attack: 0.005 });
    this.tone({ freq: 151.8, endFreq: 139, dur: 0.6, gain: 0.09, type: 'sine', detune: 5 });
    this.tone({ freq: 92, endFreq: 40, dur: 0.32, gain: 0.26, type: 'sine' });
    this.noise({ dur: 0.1, gain: 0.08, type: 'highpass', freq: 3200, when: 0.01 });
    if (num > 1) this.tone({ freq: 110, endFreq: 55, dur: 0.4, gain: 0.2, type: 'sine', when: 0.24 });
  }

  bossRoar() {
    if (!this.ready) return;
    for (let i = 0; i < 3; i++) {
      this.tone({ freq: 78 - i * 7, endFreq: 38, dur: 1.0, gain: 0.17, type: 'sawtooth', when: i * 0.05, attack: 0.08 });
    }
    this.noise({ dur: 1.1, gain: 0.2, type: 'lowpass', freq: 380, endFreq: 80, q: 2 });
  }

  victory() {
    if (!this.ready) return;
    const seq = [392, 523, 659, 784, 1046];
    seq.forEach((f, i) => this.tone({ freq: f, dur: 0.5, gain: 0.1, type: 'triangle', when: i * 0.12 }));
    this.noise({ dur: 0.4, gain: 0.05, type: 'highpass', freq: 5000, when: 0.6 });
  }

  gameOver() {
    if (!this.ready) return;
    const seq = [392, 349, 294, 196];
    seq.forEach((f, i) => this.tone({ freq: f, dur: 0.55, gain: 0.1, type: 'triangle', when: i * 0.16 }));
  }

  ui() {
    if (!this.ready) return;
    this.tone({ freq: 740, endFreq: 860, dur: 0.05, gain: 0.05, type: 'square' });
  }

  step() {
    if (!this.ready) return;
    this.noise({ dur: 0.06, gain: 0.035, type: 'lowpass', freq: rand(520, 280) });
  }

  // ------------------------------------------------------------- ambience
  startAmbience() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const wind = ctx.createBufferSource();
    wind.buffer = this.noiseBuffer;
    wind.loop = true;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 420;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.013;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.09;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.006;
    lfo.connect(lfoGain); lfoGain.connect(windGain.gain);
    wind.connect(windFilter); windFilter.connect(windGain); windGain.connect(this.master);
    wind.start(); lfo.start();

    this.ambientTimer = setInterval(() => {
      if (!this.ready || !this.enabled) return;
      if (chance(0.55)) {
        const base = rand(3600, 2800);
        for (let i = 0; i < 4; i++) {
          this.tone({ freq: base + rand(120, -60), dur: 0.018, gain: 0.0045, type: 'sine', when: i * 0.042, bus: this.master });
        }
      }
      if (chance(0.3)) {
        this.tone({ freq: 196, endFreq: 190, dur: 0.35, gain: 0.008, type: 'sine', bus: this.master });
      }
    }, 2400);
  }

  // --------------------------------------------------------------- music
  startMusic() {
    if (!this.ctx) return;
    this.nextStepTime = this.ctx.currentTime + 0.15;
    this.timer = setInterval(() => this.scheduleMusic(), 25);
  }

  scheduleMusic() {
    if (!this.ctx || !this.ready) return;
    const ctx = this.ctx;
    if (ctx.state === 'suspended') return;
    const dur = 60 / this.bpm / 4;
    const lookahead = 0.13;
    while (this.nextStepTime < ctx.currentTime + lookahead) {
      this.playStep(this.step, this.nextStepTime - ctx.currentTime, dur);
      this.step = (this.step + 1) % 64;
      this.nextStepTime += dur;
    }
  }

  playStep(step, when, dur) {
    const s = step % 16;
    const bar = Math.floor(step / 16);
    const bus = this.musicBus;
    const t = when;

    // Surdo — heartbeat of the forró.
    if (s === 0 || s === 8) {
      this.tone({ freq: s === 0 ? 76 : 68, endFreq: 38, dur: 0.26, gain: s === 0 ? 0.24 : 0.17, type: 'sine', when: t, bus });
      this.noise({ dur: 0.07, gain: 0.025, type: 'lowpass', freq: 400, when: t, bus });
    }
    if (s === 6 || s === 14) {
      this.tone({ freq: 105, endFreq: 52, dur: 0.14, gain: 0.15, type: 'triangle', when: t, bus });
    }

    // Agogô.
    if ([2, 3, 6, 10, 11, 14].includes(s)) {
      const f = s === 3 || s === 11 ? 1180 : 880;
      this.tone({ freq: f, endFreq: f * 0.92, dur: 0.08, gain: 0.035, type: 'triangle', when: t, bus });
      this.tone({ freq: f * 1.5, dur: 0.05, gain: 0.014, type: 'sine', when: t, bus });
    }

    // Shaker.
    if (s % 2 === 0) {
      this.noise({ dur: 0.035, gain: s % 4 === 0 ? 0.036 : 0.022, type: 'highpass', freq: 6200, when: t, bus });
    }

    // Cavaquinho-ish plucks, sparse.
    const chords = [
      [261.6, 329.6, 392.0],
      [220.0, 261.6, 329.6],
      [174.6, 220.0, 261.6],
      [196.0, 246.9, 293.7],
    ];
    const chord = chords[bar % 4];
    if (s === 0 || s === 3 || s === 10 || (s === 12 && chance(0.6))) {
      chord.forEach((f, i) => {
        this.tone({ freq: f * 2, endFreq: f * 1.98, dur: 0.16, gain: 0.018 + i * 0.003, type: 'triangle', when: t + i * 0.008, bus });
      });
    }
    // Tiny flute answer every other bar.
    if (bar % 2 === 1 && s === 13) {
      const notes = [784, 880, 1046, 880];
      this.tone({ freq: pick(notes), dur: 0.22, gain: 0.025, type: 'sine', when: t, bus });
    }
  }
}
