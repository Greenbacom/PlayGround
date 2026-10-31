// Procedural carnival-funk score and SFX — no audio files, all synthesized.
import { rand } from './util.js';

const BPM = 128;
const STEP = 60 / BPM / 4;
const PENTA = [110, 130.81, 146.83, 164.81, 196, 220, 261.63, 293.66];

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.started = false;
    this.enabled = localStorage.getItem('morrovivo.sound') !== 'off';
    this.intensity = 1;
    this.step = 0;
    this.nextStepTime = 0;
    this._noise = null;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = (this.ctx = new AC());
    this.master = ctx.createGain();
    this.master.gain.value = this.enabled ? 0.85 : 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 22;
    comp.ratio.value = 6;
    comp.attack.value = 0.004;
    comp.release.value = 0.22;
    this.master.connect(comp).connect(ctx.destination);

    this.musicBus = ctx.createGain();
    this.musicBus.gain.value = 0.42;
    this.musicBus.connect(this.master);

    this.sfxBus = ctx.createGain();
    this.sfxBus.gain.value = 0.8;
    this.sfxBus.connect(this.master);

    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this._impulse(1.9, 2.6);
    this.reverbGain = ctx.createGain();
    this.reverbGain.gain.value = 0.26;
    this.reverb.connect(this.reverbGain).connect(this.musicBus);

    this._noise = this._noiseBuffer(1.2);
    this.started = true;
    this.nextStepTime = ctx.currentTime + 0.08;
    this.step = 0;
  }

  _noiseBuffer(seconds) {
    const ctx = this.ctx;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = rand(-1, 1);
    return buffer;
  }

  _impulse(seconds, decay) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const data = buffer.getChannelData(c);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buffer;
  }

  setEnabled(value) {
    this.enabled = value;
    localStorage.setItem('morrovivo.sound', value ? 'on' : 'off');
    if (!this.ctx) return;
    this.master.gain.setTargetAtTime(value ? 0.85 : 0, this.ctx.currentTime, 0.08);
  }

  setIntensity(value) {
    this.intensity = value;
  }

  // ---------- transport ----------
  update() {
    if (!this.ctx || !this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    const now = this.ctx.currentTime;
    if (this.nextStepTime < now - 0.4) this.nextStepTime = now + 0.05;
    let guard = 0;
    while (this.nextStepTime < now + 0.16 && guard++ < 8) {
      this._scheduleStep(this.step, this.nextStepTime);
      this.step = (this.step + 1) % 32;
      this.nextStepTime += STEP;
    }
  }

  _scheduleStep(step, t) {
    const bar = Math.floor(step / 16);
    const s = step % 16;
    const intense = this.intensity;

    // tamborzão kick
    const kicks = bar === 0 ? [0, 3, 6, 8, 11, 14] : [0, 2, 6, 8, 10, 14];
    if (kicks.includes(s)) this._kick(t, s === 0 ? 1 : 0.72);

    // palm clap backbeat
    if (s === 4 || s === 12) this._clap(t, 0.42 + Math.min(0.3, intense * 0.07));

    // shaker
    if (s % 2 === 0) this._shaker(t, 0.08 + (s % 4 === 0 ? 0.04 : 0));
    if (intense > 2.2 && s % 2 === 1) this._shaker(t, 0.045);

    // agogô / bell
    if ([2, 7, 10, 15].includes(s)) this._agogo(t, s % 8 === 2 ? 1050 : 780, 0.1);
    if (intense > 2.6 && s === 13) this._agogo(t, 1310, 0.08);

    // low surdo
    if (s === 8 || s === 0) this._surdo(t, 0.35);

    // bass line: A minor pentatonic groove
    if (intense > 1.35) {
      const bassPattern = bar === 0 ? [0, 3, 6, 10, 12] : [0, 3, 7, 10, 14];
      if (bassPattern.includes(s)) {
        const notes = bar === 0 ? [55, 55, 65.4, 73.4, 82.4] : [55, 65.4, 73.4, 82.4, 65.4];
        const idx = bassPattern.indexOf(s);
        this._bass(t, notes[idx], 0.2);
      }
    }

    // pad chord every 2 bars
    if (s === 0 && bar === 0) {
      this._pad(t, [110, 130.81, 164.81, 196], 3.2);
    }
    if (intense > 2.8 && s === 0 && bar === 1) {
      this._pad(t + 1.8, [98, 130.81, 146.83, 196], 1.6);
    }
  }

  // ---------- instruments ----------
  _kick(t, vel = 1) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(43, t + 0.12);
    g.gain.setValueAtTime(0.9 * vel, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
    o.connect(g).connect(this.musicBus);
    o.start(t);
    o.stop(t + 0.26);

    const click = ctx.createBufferSource();
    click.buffer = this._noise;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1800;
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.16 * vel, t);
    cg.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    click.connect(hp).connect(cg).connect(this.musicBus);
    click.start(t, rand(0, 0.5), 0.04);
  }

  _clap(t, vel = 0.5) {
    const ctx = this.ctx;
    for (let i = 0; i < 3; i++) {
      const src = ctx.createBufferSource();
      src.buffer = this._noise;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1150 + i * 220;
      bp.Q.value = 1.4;
      const g = ctx.createGain();
      const at = t + i * 0.012;
      g.gain.setValueAtTime(0.001, at);
      g.gain.linearRampToValueAtTime(vel * 0.55, at + 0.004);
      g.gain.exponentialRampToValueAtTime(0.001, at + 0.11);
      src.connect(bp).connect(g).connect(this.musicBus);
      g.connect(this.reverb);
      src.start(at, rand(0, 0.4), 0.14);
    }
  }

  _shaker(t, vel = 0.08) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this._noise;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 6500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 0.055);
    src.connect(hp).connect(g).connect(this.musicBus);
    src.start(t, rand(0, 0.6), 0.07);
  }

  _agogo(t, freq, vel) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    const o1 = ctx.createOscillator();
    o1.type = 'triangle';
    o1.frequency.value = freq;
    const o2 = ctx.createOscillator();
    o2.type = 'sine';
    o2.frequency.value = freq * 1.47;
    const g2 = ctx.createGain();
    g2.gain.value = 0.35;
    o1.connect(g);
    o2.connect(g2).connect(g);
    g.connect(this.musicBus);
    g.connect(this.reverb);
    o1.start(t); o2.start(t);
    o1.stop(t + 0.32); o2.stop(t + 0.32);
  }

  _surdo(t, vel) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(92, t);
    o.frequency.exponentialRampToValueAtTime(58, t + 0.25);
    g.gain.setValueAtTime(vel, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    o.connect(g).connect(this.musicBus);
    o.start(t); o.stop(t + 0.42);
  }

  _bass(t, freq, vel) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(720, t);
    f.frequency.exponentialRampToValueAtTime(180, t + 0.22);
    f.Q.value = 5;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
    o.connect(f).connect(g).connect(this.musicBus);
    o.start(t); o.stop(t + 0.28);
  }

  _pad(t, freqs, duration = 2) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.035, t + 0.5);
    g.gain.setValueAtTime(0.035, t + duration * 0.55);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    freqs.forEach((freq, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? 'sine' : 'triangle';
      o.frequency.value = freq;
      o.detune.value = (i - 1.5) * 7;
      o.connect(g);
      o.start(t);
      o.stop(t + duration + 0.05);
    });
    g.connect(this.musicBus);
    g.connect(this.reverb);
  }

  // ---------- SFX ----------
  _env(duration, peak = 0.3, attack = 0.005) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    g.connect(this.sfxBus);
    return { g, t };
  }

  _tone(type, f0, f1, duration, peak, { filter = null, detune = 0 } = {}) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const { g, t } = this._env(duration, peak);
    const o = ctx.createOscillator();
    o.type = type;
    o.detune.value = detune;
    o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + duration * 0.85);
    if (filter) {
      const f = ctx.createBiquadFilter();
      f.type = filter.type || 'lowpass';
      f.frequency.value = filter.freq;
      f.Q.value = filter.q ?? 1;
      o.connect(f).connect(g);
    } else o.connect(g);
    o.start(t);
    o.stop(t + duration + 0.02);
  }

  _noiseBurst(duration, peak, { type = 'highpass', freq = 1200, sweep = null, q = 1 } = {}) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const { g, t } = this._env(duration, peak, 0.003);
    const src = ctx.createBufferSource();
    src.buffer = this._noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    if (sweep) f.frequency.exponentialRampToValueAtTime(Math.max(40, sweep), t + duration);
    f.Q.value = q;
    src.connect(f).connect(g);
    src.start(t, rand(0, 0.5), duration + 0.05);
  }

  shoot() {
    if (!this.ctx) return;
    this._tone('square', 420, 110, 0.075, 0.12, { filter: { type: 'lowpass', freq: 2400 } });
    this._noiseBurst(0.05, 0.06, { freq: 2600, sweep: 900 });
  }

  overheat() {
    this._noiseBurst(0.55, 0.18, { type: 'bandpass', freq: 2400, sweep: 420, q: 0.8 });
    this._tone('sawtooth', 180, 60, 0.5, 0.1);
  }

  hit(headshot = false) {
    this._tone('triangle', headshot ? 1500 : 980, headshot ? 900 : 700, 0.05, 0.07);
  }

  kill(big = false) {
    this._tone('sawtooth', big ? 380 : 520, 70, big ? 0.5 : 0.24, big ? 0.2 : 0.12, { filter: { type: 'lowpass', freq: 1800 } });
    this._noiseBurst(big ? 0.5 : 0.22, big ? 0.24 : 0.12, { freq: 1800, sweep: 200 });
    if (big) this._tone('sine', 90, 40, 0.7, 0.3);
  }

  damage() {
    this._tone('sine', 130, 50, 0.28, 0.32);
    this._noiseBurst(0.18, 0.16, { type: 'lowpass', freq: 900 });
  }

  dash() {
    this._noiseBurst(0.22, 0.14, { type: 'bandpass', freq: 500, sweep: 2600, q: 0.9 });
  }

  pickup(acai = false) {
    const base = acai ? 392 : 523.25;
    const notes = acai ? [base, base * 1.25, base * 1.5, base * 2] : [base, base * 1.5];
    notes.forEach((f, i) => {
      setTimeout(() => {
        if (this.ctx) this._tone('triangle', f, f, 0.14, 0.12);
      }, i * 55);
    });
  }

  waveStart(n = 1) {
    [0, 0.14, 0.28].forEach((delay, i) => {
      setTimeout(() => {
        if (!this.ctx) return;
        this._tone('triangle', 660 * (1 + i * 0.26), 660 * (1 + i * 0.26), 0.18, 0.12);
        this._tone('sine', 1320 * (1 + i * 0.26), 1320 * (1 + i * 0.26), 0.1, 0.05);
      }, delay * 1000);
    });
  }

  bossRoar() {
    if (!this.ctx) return;
    this._tone('sawtooth', 74, 34, 1.1, 0.32, { filter: { type: 'lowpass', freq: 420 } });
    this._tone('square', 111, 48, 1, 0.12, { filter: { type: 'lowpass', freq: 600 } });
    this._noiseBurst(1, 0.2, { type: 'bandpass', freq: 320, sweep: 90, q: 0.7 });
  }

  gameOver() {
    [220, 196, 164.81, 130.81].forEach((f, i) => {
      setTimeout(() => {
        if (this.ctx) this._tone('triangle', f, f * 0.99, 0.8, 0.12);
      }, i * 170);
    });
  }

  click() {
    this._tone('sine', 660, 520, 0.05, 0.06);
  }

  enemyShot() {
    this._tone('square', 300, 180, 0.09, 0.035, { filter: { type: 'lowpass', freq: 1200 } });
  }
}
