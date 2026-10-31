const BPM = 108;
const STEP = 60 / BPM / 4;

function midi(n) {
  return 440 * Math.pow(2, (n - 69) / 12);
}

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.noiseBuffer = null;
    this.muted = false;
    this.musicPlaying = false;
    this.intensity = 1;
    this.nextStepTime = 0;
    this.step = 0;
    this.timer = null;
    this.ducked = false;
  }

  init() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    this.ctx = ctx;
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -20;
    compressor.knee.value = 18;
    compressor.ratio.value = 5;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.18;
    compressor.connect(ctx.destination);

    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.72;
    this.master.connect(compressor);

    this.musicGain = ctx.createGain();
    this.musicGain.gain.value = 0.32;
    this.musicGain.connect(this.master);

    this.sfxGain = ctx.createGain();
    this.sfxGain.gain.value = 0.82;
    this.sfxGain.connect(this.master);

    const length = ctx.sampleRate * 1.2;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuffer = buffer;

    this.timer = setInterval(() => this.scheduler(), 25);
  }

  async unlock() {
    this.init();
    if (!this.ctx) return false;
    if (this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch {
        return false;
      }
    }
    return this.ctx.state === "running";
  }

  setMuted(muted) {
    this.muted = muted;
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(muted ? 0 : 0.72, now, 0.03);
  }

  startMusic() {
    if (!this.ctx) return;
    if (this.musicPlaying) return;
    this.musicPlaying = true;
    this.nextStepTime = this.ctx.currentTime + 0.08;
    this.step = 0;
    this.musicGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.musicGain.gain.setTargetAtTime(this.ducked ? 0.12 : 0.32, this.ctx.currentTime, 0.25);
  }

  stopMusic(fade = 0.8) {
    this.musicPlaying = false;
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;
    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.setTargetAtTime(0.0001, now, fade / 3);
  }

  duck(on) {
    this.ducked = on;
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;
    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.setTargetAtTime(on ? 0.12 : 0.32, now, 0.12);
  }

  setIntensity(value) {
    this.intensity = Math.max(0, Math.min(3, value));
  }

  scheduler() {
    if (!this.ctx || !this.musicPlaying) return;
    const now = this.ctx.currentTime;
    while (this.nextStepTime < now + 0.12) {
      this.scheduleStep(this.step, this.nextStepTime);
      this.step = (this.step + 1) % 32;
      this.nextStepTime += STEP;
      if (this.nextStepTime < now - 0.5) this.nextStepTime = now + 0.05;
    }
  }

  scheduleStep(step, time) {
    const s = step % 16;
    const phrase = Math.floor(step / 16) % 2;
    const intense = this.intensity;
    const swing = s % 2 === 1 ? 0.018 : 0;

    // Surdo / low drum
    if (s === 0 || s === 7 || s === 8 || s === 15) {
      this.kick(time, s === 0 ? 58 : 52, s === 0 ? 0.42 : 0.22, 0.24);
    }
    // Kick pulse
    if (s === 0 || s === 6 || s === 10 || (intense > 1.6 && s === 13)) {
      this.kick(time + 0.002, 90, 0.2, 0.13);
    }
    // Shaker / caixa
    if (s % 2 === 0) {
      this.shaker(time + swing, s === 2 || s === 6 || s === 10 || s === 14 ? 0.075 : 0.035);
    }
    if (intense > 1.3 && s % 4 === 3) this.shaker(time + 0.03, 0.022);
    // Agogô
    if ([2, 4, 7, 11, 13].includes(s)) {
      this.agogo(time + swing, s === 4 || s === 11 ? 620 : 780, 0.05 + intense * 0.008);
    }
    // Bass
    const bassPattern = phrase === 0
      ? [-24, null, null, -19, null, -24, -17, null, -24, null, -22, -17, null, -19, -24, null]
      : [-24, null, -17, null, -21, null, -19, null, -24, -27, null, -22, -19, null, -24, null];
    if (bassPattern[s] !== null) {
      this.bass(time + 0.01, midi(bassPattern[s]), 0.22 + intense * 0.025);
    }
    // Marimba / pluck melody
    const melodyA = [64, null, 67, 69, null, 71, 69, 67, 64, null, 62, 64, null, 67, 71, null];
    const melodyB = [69, 71, null, 74, 71, 69, 67, null, 64, 67, 69, null, 71, 69, 67, 64];
    const melody = phrase === 0 ? melodyA : melodyB;
    if (melody[s] !== null && (s % 2 === 0 || intense > 1.8)) {
      this.pluck(time + (s % 2 ? 0.02 : 0), midi(melody[s] + 12), 0.075 + intense * 0.012);
    }
    // High sparkle on phrase turn
    if (s === 0 && phrase === 1) {
      this.pluck(time + 0.01, midi(88), 0.04);
      this.pluck(time + 0.06, midi(91), 0.03);
    }
    // Tamborim accents
    if (intense > 2.1 && [3, 9, 12].includes(s)) this.shaker(time + 0.012, 0.06, 1100);
  }

  kick(time, freq, gain, dur) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq * 1.6, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.06);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(gain, time + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(g).connect(this.musicGain);
    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  shaker(time, gain, hp = 4200) {
    if (!this.ctx) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = hp;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);
    src.connect(filter).connect(g).connect(this.musicGain);
    src.start(time, Math.random() * 0.5, 0.08);
  }

  agogo(time, freq, gain) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "triangle";
    osc2.type = "sine";
    osc.frequency.value = freq;
    osc2.frequency.value = freq * 1.52;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(gain, time + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.19);
    osc.connect(g);
    osc2.connect(g);
    g.connect(this.musicGain);
    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.21);
    osc2.stop(time + 0.21);
  }

  bass(time, freq, gain) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const g = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, time);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(260, time);
    filter.frequency.exponentialRampToValueAtTime(120, time + 0.2);
    filter.Q.value = 6;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(gain, time + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.24);
    osc.connect(filter).connect(g).connect(this.musicGain);
    osc.start(time);
    osc.stop(time + 0.26);
  }

  pluck(time, freq, gain) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    osc.type = "triangle";
    osc2.type = "sine";
    osc.frequency.value = freq;
    osc2.frequency.value = freq * 2.01;
    filter.type = "lowpass";
    filter.frequency.value = 3200;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(gain, time + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(g).connect(this.musicGain);
    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.3);
    osc2.stop(time + 0.3);
  }

  sfxNoise(duration, gain, filterType, freq, q = 1, time = null) {
    if (!this.ctx) return;
    const t = time ?? this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    src.connect(filter).connect(g).connect(this.sfxGain);
    src.start(t, Math.random() * 0.5, duration + 0.02);
  }

  tone(freq, endFreq, duration, gain, type = "sine", delay = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), t + duration);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(g).connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + duration + 0.03);
  }

  shoot() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.sfxNoise(0.09, 0.17, "bandpass", 1500, 0.8, t);
    this.tone(330, 90, 0.105, 0.12, "square");
    this.tone(140, 50, 0.16, 0.08, "sine");
  }

  hit(crit = false) {
    if (!this.ctx) return;
    this.tone(crit ? 1200 : 880, crit ? 680 : 520, 0.07, 0.075, "triangle");
    this.sfxNoise(0.04, 0.045, "highpass", 3000);
  }

  kill() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.sfxNoise(0.28, 0.18, "lowpass", 1100, 0.5, t);
    this.tone(180, 50, 0.35, 0.11, "sawtooth");
    this.tone(660, 990, 0.18, 0.07, "triangle", 0.02);
  }

  reload() {
    if (!this.ctx) return;
    this.tone(440, 320, 0.035, 0.06, "square");
    this.tone(280, 180, 0.045, 0.06, "square", 0.15);
    this.tone(700, 520, 0.04, 0.04, "triangle", 0.36);
  }

  empty() {
    if (!this.ctx) return;
    this.tone(150, 100, 0.05, 0.08, "square");
  }

  jump() {
    if (!this.ctx) return;
    this.tone(200, 380, 0.12, 0.04, "sine");
  }

  damage() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.tone(120, 40, 0.32, 0.16, "sawtooth");
    this.sfxNoise(0.22, 0.1, "lowpass", 520, 0.5, t);
  }

  pickup() {
    if (!this.ctx) return;
    this.tone(660, 880, 0.13, 0.07, "triangle");
    this.tone(990, 1320, 0.18, 0.05, "sine", 0.1);
  }

  wave() {
    if (!this.ctx) return;
    this.tone(220, 440, 0.4, 0.08, "triangle");
    this.tone(330, 660, 0.45, 0.06, "triangle", 0.08);
    this.sfxNoise(0.5, 0.05, "highpass", 2200);
  }

  victory() {
    if (!this.ctx) return;
    [0, 4, 7, 12].forEach((n, i) => this.tone(midi(64 + n), midi(64 + n), 0.65, 0.08, "triangle", i * 0.13));
    this.sfxNoise(0.8, 0.04, "highpass", 2800);
  }

  defeat() {
    if (!this.ctx) return;
    [0, -3, -7, -12].forEach((n, i) => this.tone(midi(60 + n), midi(60 + n - 1), 0.55, 0.08, "sine", i * 0.16));
  }

  boss() {
    if (!this.ctx) return;
    this.tone(74, 42, 1.2, 0.14, "sawtooth");
    this.sfxNoise(1.1, 0.07, "lowpass", 380);
  }
}
