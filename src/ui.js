const $ = (id) => document.getElementById(id)

export class UI {
  constructor () {
    this.screens = {
      menu: $('menu'),
      hud: $('hud'),
      pause: $('pause'),
      gameover: $('gameover'),
      help: $('help'),
      typeforge: $('typeforge'),
    }
    this.el = {
      waveValue: $('wave-value'),
      waveTotal: $('wave-total'),
      waveProgress: $('wave-progress-fill'),
      healthFill: $('health-fill'),
      healthValue: $('health-value'),
      healthBlock: document.querySelector('.health-block'),
      scoreValue: $('score-value'),
      weaponType: $('weapon-type'),
      weaponAmmo: $('weapon-ammo'),
      weaponName: $('weapon-name'),
      weaponCharge: $('weapon-charge'),
      weaponHint: $('weapon-hint'),
      weaponPanel: document.querySelector('.weapon-panel'),
      forgeToast: $('forge-toast'),
      forgeType: $('forge-type'),
      forgeName: $('forge-name'),
      forgeQuote: $('forge-quote'),
      forgeDano: $('forge-dano'),
      forgeCad: $('forge-cad'),
      forgeAlc: $('forge-alc'),
      forgeFlash: $('forge-flash'),
      waveBanner: $('wave-banner'),
      waveBannerValue: $('wave-banner-value'),
      waveBannerSub: $('wave-banner-sub'),
      killFeed: $('kill-feed'),
      hitmarker: $('hitmarker'),
      damageFlash: $('damage-flash'),
      micLive: $('mic-live'),
      micLiveLabel: $('mic-live-label'),
      micWave: $('mic-wave'),
      liveTranscript: $('live-transcript'),
      voxBtn: $('vox-btn'),
      lowHint: $('low-hint'),
      menuMicState: $('menu-mic-state'),
      toast: $('toast'),
      pauseWave: $('pause-wave'),
      pauseScore: $('pause-score'),
      pauseKills: $('pause-kills'),
      overWave: $('over-wave'),
      overKills: $('over-kills'),
      overScore: $('over-score'),
      overBest: $('over-best'),
      overLine: $('over-line'),
      tiltBtn: $('tilt-btn'),
      muteGame: $('mute-game'),
      muteMenu: $('mute-menu'),
      muteMenuLabel: $('mute-menu-label'),
    }
    this.waveBannerTimer = null
    this.toastTimer = null
    this.forgeTimer = null
    this.killTimers = new Set()
    this.waveBars = []
    for (let i = 0; i < 12; i++) {
      const bar = document.createElement('i')
      this.el.micWave.appendChild(bar)
      this.waveBars.push(bar)
    }
  }

  showScreen (name) {
    for (const [key, element] of Object.entries(this.screens)) {
      element.classList.toggle('is-active', key === name)
    }
    document.body.classList.toggle('in-game', name === 'hud')
  }

  showMenu () {
    this.showScreen('menu')
  }

  showHUD () {
    this.showScreen('hud')
  }

  showPause () {
    this.showScreen('pause')
  }

  showGameOver () {
    this.showScreen('gameover')
  }

  showHelp () {
    this.showScreen('help')
  }

  showTypeforge () {
    this.showScreen('typeforge')
    setTimeout(() => document.getElementById('typeforge-input')?.focus(), 80)
  }

  hideModals () {
    this.showHUD()
  }

  setMicState (state, label) {
    const node = this.el.menuMicState
    node.classList.remove('live', 'denied')
    if (state === 'ready' || state === 'listening') node.classList.add('live')
    if (state === 'denied') node.classList.add('denied')
    const text = label || (state === 'ready' ? 'MIC ATIVO' : state === 'listening' ? 'OUVINDO VOCÊ' : state === 'requesting' ? 'PEDINDO PERMISSÃO' : state === 'denied' ? 'MIC BLOQUEADO' : 'MIC AGUARDANDO')
    node.querySelector('span').textContent = text
  }

  updateStats ({ wave, health, score, kills }) {
    if (wave != null) {
      this.el.waveValue.textContent = String(wave).padStart(2, '0')
      this.el.pauseWave.textContent = String(wave).padStart(2, '0')
      this.el.overWave.textContent = String(wave).padStart(2, '0')
    }
    if (health != null) {
      const h = Math.max(0, Math.round(health))
      this.el.healthValue.textContent = String(h)
      this.el.healthFill.style.width = `${Math.max(0, Math.min(100, h))}%`
      this.el.healthBlock.classList.toggle('low', h <= 30)
    }
    if (score != null) {
      const formatted = String(Math.max(0, Math.round(score))).padStart(6, '0')
      this.el.scoreValue.textContent = formatted
      this.el.pauseScore.textContent = formatted
      this.el.overScore.textContent = formatted
    }
    if (kills != null) {
      this.el.pauseKills.textContent = String(kills)
      this.el.overKills.textContent = String(kills)
    }
  }

  setWaveProgress (ratio) {
    this.el.waveProgress.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`
  }

  updateWeapon (weapon, ammo, ratio) {
    if (!weapon) return
    const color = weapon.color
    document.documentElement.style.setProperty('--weapon-color', color)
    this.el.weaponType.textContent = weapon.label
    this.el.weaponAmmo.textContent = ammo > 0 ? String(Math.ceil(ammo)) : '0'
    this.el.weaponName.textContent = weapon.name
    this.el.weaponCharge.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`
    this.el.weaponPanel.classList.toggle('empty', ammo <= 0)
    this.el.weaponHint.textContent = ammo > 0
      ? (window.__touch ? 'SEGURE FALAR PARA FORJAR' : 'SEGURE V E FALE PARA FORJAR')
      : 'SEM CARGA — FALE PARA FORJAR'
  }

  showForge (weapon) {
    const node = this.el.forgeToast
    const color = weapon.color
    node.style.setProperty('--forge-color', color)
    this.el.forgeType.textContent = weapon.label
    this.el.forgeName.textContent = weapon.name
    this.el.forgeQuote.textContent = `“${weapon.quote}”`
    this.el.forgeDano.style.width = `${weapon.bars[0]}%`
    this.el.forgeCad.style.width = `${weapon.bars[1]}%`
    this.el.forgeAlc.style.width = `${weapon.bars[2]}%`
    node.classList.remove('show')
    void node.offsetWidth
    node.classList.add('show')
    clearTimeout(this.forgeTimer)
    this.forgeTimer = setTimeout(() => node.classList.remove('show'), 3800)

    this.el.forgeFlash.style.setProperty('--forge-color', color)
    this.el.forgeFlash.classList.remove('flash')
    void this.el.forgeFlash.offsetWidth
    this.el.forgeFlash.classList.add('flash')
    setTimeout(() => this.el.forgeFlash.classList.remove('flash'), 130)
  }

  showWave (wave, sub = 'SINTA O PESO DO SILÊNCIO') {
    this.el.waveBannerValue.textContent = String(wave).padStart(2, '0')
    this.el.waveBannerSub.textContent = sub
    this.el.waveBanner.classList.remove('show')
    void this.el.waveBanner.offsetWidth
    this.el.waveBanner.classList.add('show')
    clearTimeout(this.waveBannerTimer)
    this.waveBannerTimer = setTimeout(() => this.el.waveBanner.classList.remove('show'), 3300)
  }

  showKill (label, points) {
    const item = document.createElement('div')
    item.className = 'kill-item'
    item.innerHTML = `${label} <b>+${points}</b>`
    this.el.killFeed.appendChild(item)
    const timer = setTimeout(() => {
      item.remove()
      this.killTimers.delete(timer)
    }, 2400)
    this.killTimers.add(timer)
    while (this.el.killFeed.children.length > 4) this.el.killFeed.firstChild.remove()
  }

  hitmarker (kill = false) {
    const node = this.el.hitmarker
    node.classList.toggle('kill', kill)
    node.classList.remove('show')
    void node.offsetWidth
    node.classList.add('show')
  }

  crosshairFire () {
    const ch = document.getElementById('crosshair')
    ch.classList.add('fire')
    setTimeout(() => ch.classList.remove('fire'), 90)
  }

  damage () {
    const node = this.el.damageFlash
    node.classList.add('hit')
    clearTimeout(this.damageTimer)
    this.damageTimer = setTimeout(() => node.classList.remove('hit'), 120)
  }

  setListening (listening, transcript = '') {
    this.el.voxBtn.classList.toggle('listening', listening)
    this.el.micLive.classList.toggle('show', listening)
    this.el.liveTranscript.classList.toggle('show', listening && Boolean(transcript))
    if (transcript) this.el.liveTranscript.textContent = transcript
    if (!listening) {
      this.el.liveTranscript.classList.remove('show')
      this.el.micLiveLabel.textContent = 'OUVINDO'
    }
  }

  setTranscript (text) {
    if (text) {
      this.el.liveTranscript.textContent = text
      this.el.liveTranscript.classList.add('show')
    } else {
      this.el.liveTranscript.classList.remove('show')
    }
  }

  setLevel (level) {
    const n = this.waveBars.length
    for (let i = 0; i < n; i++) {
      const center = 1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2)
      const h = 2 + level * 14 * (0.25 + center * 0.75) * (0.6 + Math.random() * 0.6)
      this.waveBars[i].style.height = `${Math.min(16, h)}px`
      this.waveBars[i].style.opacity = String(0.35 + level * 0.65)
    }
  }

  showLowHint (show, text) {
    this.el.lowHint.classList.toggle('show', show)
    if (text) this.el.lowHint.querySelector('b').textContent = text
  }

  toast (text, duration = 2400) {
    const node = this.el.toast
    node.textContent = text
    node.classList.add('show')
    clearTimeout(this.toastTimer)
    this.toastTimer = setTimeout(() => node.classList.remove('show'), duration)
  }

  setMuted (muted) {
    document.querySelectorAll('#mute-menu, #mute-game').forEach(node => node.classList.toggle('muted', muted))
    this.el.muteMenuLabel.textContent = muted ? 'SOM OFF' : 'SOM ON'
  }

  setTilt (enabled, available = true) {
    this.el.tiltBtn.classList.toggle('on', enabled)
    this.el.tiltBtn.classList.toggle('available', available)
    const label = this.el.tiltBtn.querySelector('span')
    if (label) label.textContent = enabled ? 'TILT ON' : 'TILT'
    const pauseTilt = document.getElementById('tilt-pause-btn')
    if (pauseTilt) pauseTilt.textContent = enabled ? 'DESATIVAR INCLINAÇÃO' : 'ATIVAR INCLINAÇÃO'
  }

  gameOver (stats, best) {
    this.el.overLine.textContent = stats.wave >= 5 ? 'Você fez o campo tremer. Mas o silêncio venceu.' : 'O campo ficou em silêncio.'
    this.el.overBest.classList.toggle('off', !best)
    this.showGameOver()
  }
}
