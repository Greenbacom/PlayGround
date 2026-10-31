import * as THREE from 'three';
import { clamp, pad, shortNumber } from './utils.js';

const $ = (id) => document.getElementById(id);

export class HUD {
  constructor() {
    this.root = $('hud');
    this.menu = $('menu');
    this.el = {
      hpFill: $('hp-fill'),
      hpValue: $('hp-value'),
      hpStatus: $('hp-status'),
      wave: $('stat-wave'),
      score: $('stat-score'),
      kills: $('stat-kills'),
      weaponPanel: $('weapon-panel'),
      weaponName: $('weapon-name'),
      weaponType: $('weapon-type'),
      weaponRarity: $('weapon-rarity'),
      weaponEffect: $('weapon-effect'),
      weaponAmp: $('weapon-amp'),
      ammoValue: $('ammo-value'),
      ammoMax: $('ammo-max'),
      ammoPips: $('ammo-pips'),
      voiceStrip: $('voice-strip'),
      voiceLabel: $('voice-label'),
      voiceLang: $('voice-lang'),
      voiceMeter: $('voice-meter'),
      voiceBars: [...document.querySelectorAll('#voice-bars i')],
      micChip: $('mic-chip'),
      transcript: $('transcript'),
      toast: $('toast-stack'),
      banner: $('banner'),
      bannerKicker: $('banner-kicker'),
      bannerTitle: $('banner-title'),
      bannerSub: $('banner-sub'),
      forge: $('forge-flash'),
      forgeWord: $('forge-word'),
      crosshair: $('crosshair'),
      hitmarker: $('hitmarker'),
      damageLayer: $('damage-layer'),
      damageVignette: $('damage-vignette'),
      radar: $('radar'),
      reticleHint: $('reticle-hint'),
      pauseWave: $('pause-wave'),
      pauseScore: $('pause-score'),
      pauseKills: $('pause-kills'),
      overWave: $('over-wave'),
      overScore: $('over-score'),
      overKills: $('over-kills'),
      overWeapon: $('over-weapon')
    };
    this.weaponCss = '#3ef3ff';
    this.ammoPips = [];
    this.buildPips(16);
    this.radarCtx = this.el.radar.getContext('2d');
    this.radarT = 0;
    this.dmgPool = [];
    this.vignetteTimer = 0;
    this.hitTimer = 0;
    this.lastHealth = 100;
    this.currentWeapon = null;
    this.radarAccum = 0;
    this.healthShown = 100;
  }

  buildPips(n) {
    this.el.ammoPips.innerHTML = '';
    this.ammoPips = [];
    for (let i = 0; i < n; i++) {
      const p = document.createElement('i');
      this.el.ammoPips.appendChild(p);
      this.ammoPips.push(p);
    }
  }

  setVisible(on) {
    this.root.classList.toggle('is-hidden', !on);
  }

  setMenuVisible(on) {
    this.menu.classList.toggle('is-hidden', !on);
    document.body.classList.toggle('is-menu', on);
  }

  setHealth(v, max = 100) {
    const pct = clamp(v / max, 0, 1) * 100;
    this.healthShown = v;
    this.el.hpFill.style.width = `${pct}%`;
    this.el.hpFill.classList.toggle('is-low', pct <= 30);
    this.el.hpValue.textContent = String(Math.max(0, Math.ceil(v)));
    this.el.hpValue.style.color = pct <= 30 ? '#ff7b90' : '';
    const status = pct > 65 ? 'ESTÁVEL' : pct > 30 ? 'CRÍTICO' : 'COLAPSO';
    this.el.hpStatus.textContent = status;
    this.el.hpStatus.classList.toggle('is-hurt', pct <= 65);
  }

  setWave(n) { this.el.wave.textContent = pad(n); }
  setScore(n) { this.el.score.textContent = String(Math.floor(n)).padStart(6, '0'); }
  setKills(n) { this.el.kills.textContent = String(n); }

  setWeapon(weapon, ammo, maxAmmo) {
    this.currentWeapon = weapon;
    this.weaponCss = weapon.css || '#3ef3ff';
    this.el.weaponPanel.style.setProperty('--weapon-accent', this.weaponCss);
    this.el.weaponName.textContent = weapon.word;
    this.el.weaponName.style.color = '#fff';
    this.el.weaponType.textContent = weapon.label;
    this.el.weaponRarity.textContent = `SINTONIA ${weapon.rarity}`;
    this.el.weaponRarity.style.color = weapon.rarityColor || this.weaponCss;
    this.el.weaponEffect.textContent = `${weapon.tag} · ${weapon.effectLabel}`;
    this.el.weaponAmp.textContent = `${weapon.stats?.dps ?? '—'} DPS`;
    this.el.weaponAmp.style.color = this.weaponCss;
    this.setAmmo(ammo, maxAmmo);
  }

  setAmmo(ammo, maxAmmo) {
    const inf = !Number.isFinite(ammo);
    this.el.ammoValue.textContent = inf ? '∞' : String(ammo);
    this.el.ammoMax.textContent = !Number.isFinite(maxAmmo) ? '∞' : String(maxAmmo);
    this.el.ammoValue.classList.toggle('is-low', !inf && ammo <= Math.max(1, maxAmmo * 0.18));
    const ratio = !Number.isFinite(maxAmmo) ? 1 : clamp(ammo / maxAmmo, 0, 1);
    const lit = Math.ceil(ratio * this.ammoPips.length);
    const low = !inf && ratio <= 0.22;
    this.ammoPips.forEach((p, i) => {
      p.classList.toggle('is-on', i < lit);
      p.classList.toggle('is-low', low && i < lit);
    });
  }

  setMicState(state, detail = {}) {
    const chip = this.el.micChip;
    chip.className = 'mic-chip';
    const strip = this.el.voiceStrip;
    strip.classList.remove('is-live', 'is-processing', 'is-off');

    if (state === 'listening') {
      chip.classList.add('is-live');
      chip.textContent = 'AO VIVO';
      strip.classList.add('is-live');
      this.el.voiceLabel.textContent = 'OUVINDO… FALE AGORA';
    } else if (state === 'processing') {
      chip.textContent = 'FORJA';
      strip.classList.add('is-processing');
      this.el.voiceLabel.textContent = 'MOLDANDO SUA PALAVRA…';
    } else if (state === 'denied' || state === 'unsupported') {
      chip.classList.add('is-off');
      chip.textContent = 'MIC OFF';
      strip.classList.add('is-off');
      this.el.voiceLabel.textContent = 'MIC OFF · DIGITE UMA PALAVRA';
    } else if (state === 'pending') {
      chip.textContent = 'MIC…';
      this.el.voiceLabel.textContent = 'AGUARDANDO PERMISSÃO';
    } else {
      chip.textContent = detail.live ? 'MIC ON' : 'MIC';
      this.el.voiceLabel.textContent = detail.label || 'SEGURE E FALE';
    }
    this.el.voiceLang.textContent = detail.lang || this.el.voiceLang.textContent;
  }

  setVoiceLevel(level, pitch = 0.5) {
    this.el.voiceMeter.style.width = `${clamp(level * 100, 0, 100)}%`;
    const bars = this.el.voiceBars;
    for (let i = 0; i < bars.length; i++) {
      const v = Math.abs(Math.sin((pitch * 10 + i * 0.9) * 2.2)) * 0.55 + level * 1.1;
      bars[i].style.height = `${clamp(4 + v * 16, 4, 20)}px`;
      bars[i].style.opacity = String(clamp(0.45 + level, 0.45, 1));
    }
    const btn = document.getElementById('btn-voice');
    btn?.style.setProperty('--level', String(level));
  }

  setTranscript(text) {
    if (!text) {
      this.el.transcript.classList.remove('is-on');
      this.el.transcript.textContent = '';
      return;
    }
    this.el.transcript.textContent = text;
    this.el.transcript.classList.add('is-on');
  }

  toast(text, type = '') {
    const div = document.createElement('div');
    div.className = `toast ${type}`;
    div.textContent = text;
    this.el.toast.appendChild(div);
    while (this.el.toast.children.length > 3) this.el.toast.firstChild.remove();
    setTimeout(() => div.remove(), 3400);
  }

  banner(kicker, title, sub, duration = 2.8) {
    const b = this.el.banner;
    this.el.bannerKicker.textContent = kicker;
    this.el.bannerTitle.textContent = title;
    this.el.bannerSub.textContent = sub || '';
    b.classList.remove('is-on');
    void b.offsetWidth;
    b.style.setProperty('--banner-dur', `${duration}s`);
    b.classList.add('is-on');
  }

  forge(word) {
    this.el.forgeWord.textContent = word;
    const f = this.el.forge;
    f.classList.remove('is-on');
    void f.offsetWidth;
    f.classList.add('is-on');
    setTimeout(() => f.classList.remove('is-on'), 1250);
  }

  hit(kill = false) {
    const h = this.el.hitmarker;
    h.classList.remove('is-on', 'is-kill');
    void h.offsetWidth;
    if (kill) h.classList.add('is-kill');
    h.classList.add('is-on');
    this.el.crosshair.classList.add('is-hit');
    clearTimeout(this.hitTimer);
    this.hitTimer = setTimeout(() => this.el.crosshair.classList.remove('is-hit'), 90);
  }

  setCrosshairSpread(spread = 0.01, firing = false) {
    const gap = clamp(6 + spread * 260 + (firing ? 3 : 0), 6, 22);
    this.el.crosshair.style.setProperty('--gap', `${gap}px`);
  }

  setEmpty(on) { this.el.crosshair.classList.toggle('is-empty', on); }

  damageNumber(worldPos, amount, type = 'normal', camera) {
    const v = worldPos.clone().project(camera);
    if (v.z > 1 || v.z < -1) return;
    const x = (v.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
    if (x < -40 || x > window.innerWidth + 40 || y < -40 || y > window.innerHeight + 40) return;
    const div = document.createElement('div');
    div.className = `dmg-num ${type === 'crit' ? 'is-crit' : type === 'heal' ? 'is-heal' : type === 'player' ? 'is-player' : ''}`;
    div.textContent = type === 'heal' ? `+${amount}` : String(amount);
    div.style.left = `${x + (Math.random() * 18 - 9)}px`;
    div.style.top = `${y}px`;
    this.el.damageLayer.appendChild(div);
    this.dmgPool.push(div);
    while (this.dmgPool.length > 26) {
      const old = this.dmgPool.shift();
      old?.remove();
    }
    setTimeout(() => div.remove(), 900);
  }

  hurt(strength = 1, heal = false) {
    const v = this.el.damageVignette;
    v.classList.toggle('is-heal', heal);
    v.style.opacity = String(clamp(strength, 0.18, 1));
    clearTimeout(this.vignetteTimer);
    this.vignetteTimer = setTimeout(() => {
      v.style.opacity = '0';
      v.classList.remove('is-heal');
    }, heal ? 420 : 260);
  }

  showWave(n, sub) {
    this.banner('PROTOCOLO DE ONDA', `ONDA ${pad(n)}`, sub || 'MANTENHA A FREQUÊNCIA');
  }

  waveClear(n, bonus) {
    this.banner('SETOR LIMPO', `ONDA ${pad(n)} CONCLUÍDA`, `+${bonus} PONTOS DE RESSONÂNCIA`);
  }

  hint(text, duration = 4) {
    this.el.reticleHint.textContent = text;
    this.el.reticleHint.classList.add('is-on');
    clearTimeout(this._hintTimer);
    this._hintTimer = setTimeout(() => this.el.reticleHint.classList.remove('is-on'), duration * 1000);
  }

  pauseStats(wave, score, kills) {
    this.el.pauseWave.textContent = pad(wave);
    this.el.pauseScore.textContent = String(Math.floor(score));
    this.el.pauseKills.textContent = String(kills);
  }

  gameOverStats({ wave, score, kills, weapon }) {
    this.el.overWave.textContent = pad(wave);
    this.el.overScore.textContent = String(Math.floor(score));
    this.el.overKills.textContent = String(kills);
    this.el.overWeapon.textContent = weapon || '—';
  }

  updateRadar(player, enemies, dt) {
    this.radarAccum += dt;
    if (this.radarAccum < 0.033) return;
    this.radarAccum = 0;
    this.radarT += 0.033;
    const ctx = this.radarCtx;
    const size = this.el.radar.width || 180;
    const c = size / 2;
    const r = c - 8;
    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.translate(c, c);
    ctx.strokeStyle = 'rgba(143,250,255,0.14)';
    ctx.lineWidth = 1;
    for (const rr of [r * 0.35, r * 0.68, r]) {
      ctx.beginPath(); ctx.arc(0, 0, rr, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -r); ctx.lineTo(0, r); ctx.stroke();

    const sweep = (this.radarT * 1.3) % (Math.PI * 2);
    const grad = ctx.createLinearGradient(0, 0, Math.cos(sweep) * r, Math.sin(sweep) * r);
    grad.addColorStop(0, 'rgba(62,243,255,0.45)');
    grad.addColorStop(1, 'rgba(62,243,255,0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(sweep) * r, Math.sin(sweep) * r); ctx.stroke();

    const scale = r / 30;
    const yaw = player.yaw;
    const sin = Math.sin(yaw);
    const cos = Math.cos(yaw);
    const blip = (wx, wz, color, radius = 3) => {
      const dx = wx - player.position.x;
      const dz = wz - player.position.z;
      const rx = dx * cos + dz * -sin;
      const rz = dx * -sin + dz * cos;
      const px = clamp(rx * scale, -r, r);
      const py = clamp(-rz * scale, -r, r);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(px, py, radius, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    };

    for (const e of enemies) {
      if (!e.alive) continue;
      const colors = { drone: '#ff3b8d', seeker: '#ff8a3d', brute: '#c46bff', spitter: '#5dffb0' };
      blip(e.group.position.x, e.group.position.z, colors[e.type] || '#ff3b8d', e.type === 'brute' ? 4.5 : 2.6);
    }

    // player
    ctx.fillStyle = '#eafcff';
    ctx.shadowColor = '#3ef3ff';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(5, 5);
    ctx.lineTo(0, 2);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
