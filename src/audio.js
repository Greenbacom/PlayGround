/* ------------------------------------------------------------------ *
 *  MANDACARU — procedural audio. A tiny samba band, a very loud rifle
 *  and the sea, all synthesized in the browser.
 * ------------------------------------------------------------------ */

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.ready = false;
    this.muted = false;
    this.musicOn = true;
    this.musicVolume = 0.32;
    this.sfxVolume = 0.85;
    this._musicTimer = null;
    this._step = 0;
    this._nextNote = 0;
    this._noise = null;
    this._startedMusic = false;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = this.ctx = new AC();
    this.master = ctx.createGain();
    this.master.gain.value = 0.9;
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -16;
    this.comp.knee.value = 18;
    this.comp.ratio.value = 5;
    this.comp.attack.value = 0.004;
    this.comp.release.value = 0.22;
    this.master.connect(this.comp);
    this.comp.connect(ctx.destination);

    this.sfx = ctx.createGain();
    this.sfx.gain.value = this.sfxVolume;
    this.sfx.connect(this.master);

    this.music = ctx.createGain();
    this.music.gain.value = this.musicOn ? this.musicVolume : 0;
    this.music.connect(this.master);

    // generated plate reverb
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this._impulse(1.8, 2.6);
    this.reverbGain = ctx.createGain();
    this.reverbGain.gain.value = 0.18;
    this.reverb.connect(this.reverbGain);
    this.reverbGain.connect(this.master);

    this._noise = this._noiseBuffer(2.0);
    this.ready = true;
    this._ambience();
    this._scheduleMusic();
  }

  _impulse(seconds, decay) {
    const ctx = this.ctx;
    const rate = ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const buf = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  _noiseBuffer(seconds) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  _ambience() {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this._noise;
    src.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 420;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 70;
    const g = ctx.createGain();
    g.gain.value = 0.05;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.025;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(this.master);
    src.start();
    lfo.start();
    this._ambienceGain = g;
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master) this.master.gain.setTargetAtTime(muted ? 0 : 0.9, this.ctx.currentTime, 0.05);
  }

  setMusic(on) {
    this.musicOn = on;
    if (this.music) this.music.gain.setTargetAtTime(on ? this.musicVolume : 0, this.ctx.currentTime, 0.15);
    if (on && this.ready) this._scheduleMusic();
  }

  setMusicVolume(v) {
    this.musicVolume = v;
    if (this.music && this.musicOn) this.music.gain.setTargetAtTime(v, this.ctx.currentTime, 0.1);
  }

  setSfxVolume(v) {
    this.sfxVolume = v;
    if (this.sfx) this.sfx.gain.setTargetAtTime(v, this.ctx.currentTime, 0.1);
  }

  _tone({ freq = 440, type = 'sine', dur = 0.2, gain = 0.2, attack = 0.004, slideTo = null, filter = null, filterType = 'lowpass', pan = 0, bus = 'sfx', detune = 0, delay = 0 }) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t0 + dur);
    osc.detune.value = detune;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    let node = osc;
    if (filter) {
      const f = ctx.createBiquadFilter();
      f.type = filterType;
      f.frequency.value = filter;
      f.Q.value = 1.2;
      node.connect(f);
      node = f;
    }
    node.connect(g);
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    g.connect(p);
    p.connect(bus === 'music' ? this.music : this.sfx);
    if (bus === 'sfx') {
      const send = ctx.createGain();
      send.gain.value = 0.18;
      p.connect(send);
      send.connect(this.reverb);
    }
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  _noiseBurst({ dur = 0.15, gain = 0.4, filter = 1200, type = 'bandpass', q = 0.8, slideTo = null, pan = 0, delay = 0 }) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = this._noise;
    src.playbackRate.value = 1;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(filter, t0);
    if (slideTo) f.frequency.exponentialRampToValueAtTime(Math.max(60, slideTo), t0 + dur);
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    src.connect(f); f.connect(g); g.connect(p); p.connect(this.sfx);
    src.start(t0, Math.random() * 1.2, dur + 0.05);
  }

  shoot(kind = 'smg') {
    if (!this.ready) return;
    if (kind === 'shotgun') {
      this._noiseBurst({ dur: 0.34, gain: 0.75, filter: 1600, slideTo: 240, q: 0.7 });
      this._tone({ freq: 110, slideTo: 36, dur: 0.34, gain: 0.5, type: 'sine' });
      this._tone({ freq: 62, slideTo: 30, dur: 0.5, gain: 0.32, type: 'triangle' });
      this._noiseBurst({ dur: 0.09, gain: 0.35, filter: 4200, q: 0.6, delay: 0.01 });
    } else {
      this._noiseBurst({ dur: 0.11, gain: 0.34, filter: 2600, slideTo: 900, q: 0.9 });
      this._tone({ freq: 165, slideTo: 58, dur: 0.1, gain: 0.28, type: 'square', filter: 900 });
      this._tone({ freq: 90, slideTo: 44, dur: 0.16, gain: 0.22, type: 'sine' });
    }
  }

  empty() {
    this._tone({ freq: 900, dur: 0.035, gain: 0.1, type: 'square' });
    this._noiseBurst({ dur: 0.04, gain: 0.08, filter: 3200 });
  }

  reload(kind = 'smg') {
    if (!this.ready) return;
    const clicks = kind === 'shotgun' ? [0, 0.24, 0.52, 0.78] : [0, 0.16, 0.62, 0.84];
    clicks.forEach((d, i) => {
      this._noiseBurst({ dur: 0.05, gain: 0.13, filter: 1800 + i * 300, q: 1.4, delay: d });
      this._tone({ freq: 340 + i * 90, dur: 0.04, gain: 0.06, type: 'square', delay: d });
    });
    this._tone({ freq: 220, dur: 0.05, gain: 0.08, type: 'square', delay: 0.3 });
  }

  hit(head = false) {
    if (head) {
      this._tone({ freq: 1560, slideTo: 980, dur: 0.12, gain: 0.2, type: 'triangle' });
      this._tone({ freq: 2300, dur: 0.06, gain: 0.1, type: 'sine' });
      this._noiseBurst({ dur: 0.05, gain: 0.12, filter: 5000, q: 1.2 });
    } else {
      this._tone({ freq: 420, slideTo: 260, dur: 0.07, gain: 0.13, type: 'square', filter: 1100 });
      this._noiseBurst({ dur: 0.06, gain: 0.1, filter: 2200 });
    }
  }

  kill() {
    this._noiseBurst({ dur: 0.3, gain: 0.3, filter: 2800, slideTo: 700, q: 0.5 });
    this._tone({ freq: 320, slideTo: 90, dur: 0.4, gain: 0.14, type: 'triangle' });
    this._tone({ freq: 880, slideTo: 1320, dur: 0.18, gain: 0.07, type: 'sine', delay: 0.05 });
  }

  hurt() {
    this._tone({ freq: 120, slideTo: 50, dur: 0.3, gain: 0.32, type: 'sine' });
    this._noiseBurst({ dur: 0.2, gain: 0.16, filter: 800, slideTo: 200 });
    this._tone({ freq: 62, dur: 0.24, gain: 0.16, type: 'sine', delay: 0.12 });
  }

  pickup() {
    [660, 880, 1320].forEach((f, i) => this._tone({ freq: f, dur: 0.16, gain: 0.11, type: 'triangle', delay: i * 0.06 }));
  }

  ui(up = true) {
    this._tone({ freq: up ? 720 : 480, dur: 0.05, gain: 0.07, type: 'sine' });
  }

  jump() {
    this._noiseBurst({ dur: 0.18, gain: 0.08, filter: 900, slideTo: 2200, q: 0.6 });
  }

  land() {
    this._tone({ freq: 90, slideTo: 45, dur: 0.12, gain: 0.14, type: 'sine' });
    this._noiseBurst({ dur: 0.1, gain: 0.07, filter: 500, slideTo: 180 });
  }

  step(sprint = false) {
    if (!this.ready) return;
    this._noiseBurst({ dur: 0.075, gain: sprint ? 0.07 : 0.045, filter: 420, slideTo: 160, q: 0.7 });
    this._tone({ freq: sprint ? 74 : 62, slideTo: 40, dur: 0.07, gain: 0.06, type: 'sine' });
  }

  spawn() {
    if (!this.ready) return;
    this._noiseBurst({ dur: 0.32, gain: 0.08, filter: 900, slideTo: 3000, q: 0.8 });
    this._tone({ freq: 160, slideTo: 420, dur: 0.28, gain: 0.035, type: 'triangle' });
  }

  bossDeath() {
    if (!this.ready) return;
    this._tone({ freq: 220, slideTo: 40, dur: 1.5, gain: 0.35, type: 'sawtooth', filter: 700 });
    this._noiseBurst({ dur: 1.2, gain: 0.3, filter: 2400, slideTo: 200, q: 0.6 });
    [0, 0.15, 0.3, 0.45, 0.6].forEach((d, i) => this._tone({ freq: 880 * Math.pow(1.12, i), dur: 0.2, gain: 0.09, type: 'triangle', delay: d }));
  }

  wave(n) {
    if (!this.ready) return;
    const base = 196;
    [1, 1.25, 1.5].forEach((m, i) => this._tone({ freq: base * m, dur: 0.8, gain: 0.1, type: 'sawtooth', filter: 900, attack: 0.06, delay: i * 0.05 }));
    this._noiseBurst({ dur: 0.5, gain: 0.12, filter: 300, slideTo: 90, q: 0.7 });
    [0, 0.18, 0.36].forEach((d, i) => this._tone({ freq: 82, slideTo: 44, dur: 0.2, gain: 0.2 + i * 0.02, type: 'sine', delay: d }));
  }

  boss() {
    if (!this.ready) return;
    this._tone({ freq: 55, slideTo: 34, dur: 1.6, gain: 0.4, type: 'sawtooth', filter: 220 });
    this._tone({ freq: 58, slideTo: 36, dur: 1.6, gain: 0.3, type: 'sawtooth', filter: 180, detune: 14 });
    this._noiseBurst({ dur: 1.2, gain: 0.2, filter: 420, slideTo: 100, q: 0.6 });
  }

  beaconAlarm() {
    this._tone({ freq: 740, dur: 0.16, gain: 0.1, type: 'square', filter: 1800 });
    this._tone({ freq: 560, dur: 0.2, gain: 0.1, type: 'square', filter: 1800, delay: 0.2 });
  }

  shield() {
    this._noiseBurst({ dur: 0.6, gain: 0.15, filter: 1200, slideTo: 4200, q: 0.8 });
    this._tone({ freq: 220, slideTo: 880, dur: 0.6, gain: 0.1, type: 'triangle' });
  }

  /* ---- samba loop ------------------------------------------------ */
  _scheduleMusic() {
    if (!this.ready || !this.musicOn) return;
    if (this._musicTimer) return;
    this._nextNote = this.ctx.currentTime + 0.1;
    this._musicTimer = setInterval(() => this._musicTick(), 40);
  }

  _musicTick() {
    if (!this.ready || !this.musicOn) return;
    const ctx = this.ctx;
    const spb = 60 / 100;
    const stepDur = spb / 4;
    while (this._nextNote < ctx.currentTime + 0.16) {
      this._playStep(this._step, this._nextNote, stepDur);
      this._step = (this._step + 1) % 32;
      this._nextNote += stepDur;
    }
  }

  _playStep(step, t, stepDur) {
    const ctx = this.ctx;
    const s16 = step % 16;
    const bar = Math.floor(step / 16);
    const now = t;

    const tone = (freq, type, dur, gain, dest, filter) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(gain, now + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      let n = o;
      if (filter) {
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.value = filter;
        n.connect(f); n = f;
      }
      n.connect(g);
      g.connect(dest);
      o.start(now);
      o.stop(now + dur + 0.03);
    };
    const noise = (dur, gain, freq, q = 1) => {
      const src = ctx.createBufferSource();
      src.buffer = this._noise;
      src.playbackRate.value = 1;
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = freq;
      f.Q.value = q;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(gain, now + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      src.connect(f); f.connect(g); g.connect(this.music);
      src.start(now, Math.random(), dur + 0.03);
    };

    // surdo
    if (s16 === 0 || s16 === 6 || s16 === 8 || s16 === 14) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(s16 === 8 ? 92 : 74, now);
      o.frequency.exponentialRampToValueAtTime(42, now + 0.18);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.2, now + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
      o.connect(g); g.connect(this.music);
      o.start(now); o.stop(now + 0.27);
    }
    // tamborim / shaker
    if (s16 % 2 === 0) noise(0.05, s16 % 4 === 0 ? 0.05 : 0.028, 5200, 1.4);
    if (s16 === 3 || s16 === 7 || s16 === 11 || s16 === 15) noise(0.04, 0.045, 7600, 2);
    // agogô
    if (s16 === 2 || s16 === 6 || s16 === 10 || s16 === 13) tone(s16 === 13 ? 1245 : 830, 'triangle', 0.09, 0.035, this.music);
    // cavaquinho comping
    const chords = [
      [261.6, 329.6, 392.0, 523.3],
      [220.0, 261.6, 329.6, 440.0],
      [174.6, 220.0, 261.6, 349.2],
      [196.0, 246.9, 293.7, 392.0],
    ];
    const chord = chords[bar % 4];
    if (s16 === 0 || s16 === 7 || s16 === 12) {
      const note = chord[s16 === 7 ? 1 : s16 === 12 ? 2 : 0];
      tone(note, 'sawtooth', 0.22, 0.028, this.music, 2400);
      tone(note * 2, 'triangle', 0.12, 0.012, this.music, 3200);
    }
    if (s16 === 3 || s16 === 11) {
      tone(chord[2] * 1.5, 'triangle', 0.08, 0.012, this.music);
    }
    // occasional whistle / vocal-ish call
    if (bar === 1 && s16 === 14) {
      tone(1046, 'sine', 0.35, 0.02, this.music);
      tone(1318, 'sine', 0.4, 0.015, this.music);
    }
  }
}
