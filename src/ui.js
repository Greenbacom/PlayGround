import { clamp } from './util.js';

const $ = (id) => document.getElementById(id);

export class UI {
  constructor() {
    this.el = {
      hud: $('hud'),
      menu: $('menu'),
      pause: $('pause'),
      gameover: $('gameover'),
      help: $('help'),
      health: document.querySelector('.hud-health'),
      healthFill: $('healthFill'),
      healthGhost: $('healthGhost'),
      healthNum: $('healthNum'),
      waveLabel: $('waveLabel'),
      waveSub: $('waveSub'),
      scoreNum: $('scoreNum'),
      bossBar: $('bossBar'),
      bossFill: $('bossFill'),
      bossHp: $('bossHp'),
      crosshair: $('crosshair'),
      hitmarker: $('hitmarker'),
      combo: $('combo'),
      comboNum: $('comboNum'),
      waveBanner: $('waveBanner'),
      toast: $('toast'),
      damageVignette: $('damageVignette'),
      healVignette: $('healVignette'),
      fireBtn: $('fireBtn'),
      heatRing: $('heatRing'),
      dashCd: $('dashCd'),
      dashBtn: $('dashBtn'),
      tiltChip: $('tiltChip'),
      tiltState: $('tiltState'),
      tiltHint: $('tiltHint'),
      tiltToggle: $('tiltToggle'),
      pauseTiltBtn: $('pauseTiltBtn'),
      soundToggle: $('soundToggle'),
      soundState: $('soundState'),
      pauseSoundBtn: $('pauseSoundBtn'),
      bestLine: $('bestLine'),
      pauseWave: $('pauseWave'),
      pauseScore: $('pauseScore'),
      pauseKills: $('pauseKills'),
      goWave: $('goWave'),
      goScore: $('goScore'),
      goKills: $('goKills'),
      goSub: $('goSub'),
      recordLine: $('recordLine'),
      boot: $('boot'),
      rotateToast: $('rotateToast'),
      scoreLayer: null,
    };
    this.best = Number(localStorage.getItem('morrovivo.best') || 0);
    this._toastTimer = 0;
    this._hitTimer = 0;
    this._comboTimer = 0;

    const layer = document.createElement('div');
    layer.className = 'score-layer';
    this.el.hud.appendChild(layer);
    this.el.scoreLayer = layer;

    this.setBest(this.best);
    this.updateSoundLabel(true);
  }

  hideBoot() {
    this.el.boot.classList.add('done');
    setTimeout(() => this.el.boot.remove(), 900);
  }

  hideAllScreens() {
    for (const key of ['menu', 'pause', 'gameover', 'help']) {
      this.el[key].classList.add('hidden');
      this.el[key].setAttribute('aria-hidden', 'true');
    }
  }

  showMenu() {
    this.hideAllScreens();
    this.el.menu.classList.remove('hidden');
    this.el.menu.setAttribute('aria-hidden', 'false');
    this.el.hud.classList.add('hidden');
    this.el.hud.setAttribute('aria-hidden', 'true');
    this.el.rotateToast.classList.add('hidden');
    this.setBest(this.best);
  }

  showHud() {
    this.el.hud.classList.remove('hidden');
    this.el.hud.setAttribute('aria-hidden', 'false');
    this.el.rotateToast.classList.add('hidden');
  }

  showPause(stats) {
    this.el.pause.classList.remove('hidden');
    this.el.pause.setAttribute('aria-hidden', 'false');
    this.el.pauseWave.textContent = String(stats.wave).padStart(2, '0');
    this.el.pauseScore.textContent = this.format(stats.score);
    this.el.pauseKills.textContent = stats.kills;
  }

  hidePause() {
    this.el.pause.classList.add('hidden');
    this.el.pause.setAttribute('aria-hidden', 'true');
  }

  showHelp() {
    this.el.help.classList.remove('hidden');
    this.el.help.setAttribute('aria-hidden', 'false');
  }

  hideHelp() {
    this.el.help.classList.add('hidden');
    this.el.help.setAttribute('aria-hidden', 'true');
  }

  showGameOver(stats) {
    this.hideAllScreens();
    this.el.hud.classList.add('hidden');
    this.el.gameover.classList.remove('hidden');
    this.el.gameover.setAttribute('aria-hidden', 'false');
    this.el.goWave.textContent = String(stats.wave).padStart(2, '0');
    this.el.goScore.textContent = this.format(stats.score);
    this.el.goKills.textContent = stats.kills;
    const isRecord = stats.score > this.best;
    if (isRecord) {
      this.best = stats.score;
      localStorage.setItem('morrovivo.best', String(this.best));
      this.el.goSub.textContent = 'Novo recorde. O morro inteiro viu.';
    } else {
      this.el.goSub.textContent = 'Mas o morro lembra de quem lutou.';
    }
    this.el.recordLine.textContent = `RECORDE PESSOAL: ${this.format(this.best)}`;
    this.setBest(this.best);
    this.el.combo.classList.remove('on');
  }

  setBest(value) {
    this.best = value;
    this.el.bestLine.innerHTML = `RECORDE <b>${this.format(value)}</b>`;
  }

  format(n) {
    return Math.round(n).toLocaleString('pt-BR');
  }

  setHealth(hp, max = 100) {
    const k = clamp(hp / max, 0, 1);
    this.el.healthFill.style.transform = `scaleX(${k})`;
    this.el.healthGhost.style.transform = `scaleX(${k})`;
    this.el.healthNum.textContent = Math.ceil(hp);
    this.el.health.classList.toggle('low', k < 0.3);
  }

  setWave(n, sub = '') {
    this.el.waveLabel.textContent = `ONDA ${String(n).padStart(2, '0')}`;
    this.el.waveSub.textContent = sub || (n % 5 === 0 ? 'BOITATÁ À VISTA' : 'DEFENDA O MORRO');
  }

  setScore(score) {
    this.el.scoreNum.textContent = this.format(score);
  }

  banner(text, sub = '') {
    const el = this.el.waveBanner;
    el.innerHTML = `${text}${sub ? `<small>${sub}</small>` : ''}`;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
  }

  toast(text, ms = 1800) {
    const el = this.el.toast;
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), ms);
  }

  combo(mult, kills) {
    if (mult <= 1) {
      this.el.combo.classList.remove('on');
      return;
    }
    this.el.comboNum.textContent = `x${mult}`;
    this.el.combo.classList.add('on');
    this.el.combo.classList.remove('pop');
    void this.el.combo.offsetWidth;
    this.el.combo.classList.add('pop');
    clearTimeout(this._comboTimer);
    this._comboTimer = setTimeout(() => this.el.combo.classList.remove('on'), 2600);
  }

  hideCombo() {
    this.el.combo.classList.remove('on');
  }

  hit(kill = false) {
    const el = this.el.hitmarker;
    el.classList.remove('show', 'kill');
    void el.offsetWidth;
    el.classList.add('show');
    if (kill) el.classList.add('kill');
    clearTimeout(this._hitTimer);
    this._hitTimer = setTimeout(() => el.classList.remove('show', 'kill'), 220);
  }

  setHeat(percent, overheated) {
    this.el.fireBtn.style.setProperty('--heat', String(Math.round(clamp(percent, 0, 100))));
    this.el.fireBtn.classList.toggle('overheated', Boolean(overheated));
    this.el.crosshair.classList.toggle('overheat', Boolean(overheated));
    this.el.crosshair.classList.toggle('hot', percent > 65 && !overheated);
  }

  setDash(k) {
    this.el.dashCd.style.height = `${Math.round(clamp(k, 0, 1) * 100)}%`;
    this.el.dashBtn.classList.toggle('ready', k <= 0.001);
  }

  setBoss(pct) {
    if (pct === null) {
      this.el.bossBar.classList.add('hidden');
      return;
    }
    this.el.bossBar.classList.remove('hidden');
    const k = clamp(pct, 0, 1);
    this.el.bossFill.style.transform = `scaleX(${k})`;
    this.el.bossHp.textContent = `${Math.ceil(k * 100)}%`;
    this.el.bossBar.classList.toggle('low', k < 0.35);
  }

  damage() {
    const el = this.el.damageVignette;
    el.style.opacity = '1';
    clearTimeout(this._dmgTimer);
    this._dmgTimer = setTimeout(() => { el.style.opacity = '0'; }, 220);
  }

  heal() {
    const el = this.el.healVignette;
    el.style.opacity = '1';
    clearTimeout(this._healTimer);
    this._healTimer = setTimeout(() => { el.style.opacity = '0'; }, 420);
  }

  pop(text, x, y, color = '#ffbf3c', big = false) {
    const el = document.createElement('div');
    el.className = `score-pop${big ? ' big' : ''}`;
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = color;
    this.el.scoreLayer.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }

  setTiltActive(active) {
    this.el.tiltChip.classList.toggle('hidden', !active);
  }

  updateTiltLabel(active, reason = '') {
    this.el.tiltState.textContent = active ? 'ON' : 'OFF';
    this.el.tiltToggle.setAttribute('aria-pressed', active ? 'true' : 'false');
    this.el.pauseTiltBtn.innerHTML = `Inclinação: <b>${active ? 'ON' : 'OFF'}</b>`;
    if (active) {
      this.el.tiltHint.className = 'tilt-hint ok';
      this.el.tiltHint.textContent = 'Inclinação ativa. Mire virando o aparelho — recalibre na pausa se precisar.';
    } else {
      this.el.tiltHint.className = 'tilt-hint';
      if (reason === 'denied') this.el.tiltHint.textContent = 'Permissão de movimento negada. Sem problema: o toque continua valendo.';
      else if (reason === 'nosensor') this.el.tiltHint.textContent = 'Nenhum sensor de movimento respondeu. Jogue no toque.';
      else if (reason === 'unsupported') this.el.tiltHint.textContent = 'Este navegador não oferece sensor de inclinação. Jogue no toque.';
      else if (reason === 'error') this.el.tiltHint.textContent = 'Não foi possível ativar o sensor. Jogue no toque.';
      else this.el.tiltHint.textContent = 'A inclinação é opcional — no iPhone o navegador pede permissão.';
    }
  }

  updateSoundLabel(enabled) {
    this.el.soundState.textContent = enabled ? 'ON' : 'OFF';
    this.el.soundToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    this.el.pauseSoundBtn.innerHTML = `Som: <b>${enabled ? 'ON' : 'OFF'}</b>`;
  }

  showRotateHint() {
    if (window.innerHeight > window.innerWidth) {
      this.el.rotateToast.classList.remove('hidden');
      setTimeout(() => this.el.rotateToast.classList.add('hidden'), 5200);
    }
  }
}
