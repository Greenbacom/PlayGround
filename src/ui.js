// DOM HUD, screens, toasts and juice.
export class UI {
  constructor(game) {
    this.game = game
    this.$ = (id) => document.getElementById(id)
    this.el = {
      hud: this.$('hud'),
      touch: this.$('touch-ui'),
      menu: this.$('screen-menu'),
      pause: this.$('screen-pause'),
      over: this.$('screen-over'),
      win: this.$('screen-win'),
      wave: this.$('wave-num'),
      score: this.$('score'),
      health: this.$('health-fill'),
      shield: this.$('shield-fill'),
      shieldRow: document.querySelector('.shield-row'),
      weaponName: this.$('weapon-name'),
      weaponAmmo: this.$('weapon-ammo'),
      slots: document.querySelectorAll('.weapon-slots i'),
      dash: this.$('dash-fill'),
      dashMeter: this.$('dash-meter'),
      combo: this.$('combo'),
      comboNum: this.$('combo-num'),
      boss: this.$('boss-bar'),
      bossFill: this.$('boss-fill'),
      bossText: this.$('boss-hp-text'),
      announce: this.$('announce'),
      announceKicker: this.$('announce-kicker'),
      announceTitle: this.$('announce-title'),
      announceSub: this.$('announce-sub'),
      hitmarker: this.$('hitmarker'),
      crosshair: this.$('crosshair'),
      vignette: this.$('damage-vignette'),
      pickupFlash: this.$('pickup-flash'),
      toastStack: this.$('toast-stack'),
      fade: this.$('fade'),
      rotate: this.$('rotate-hint'),
      best: this.$('best-score'),
      soundHud: this.$('btn-sound-hud'),
      quality: this.$('quality-label'),
      tiltBtns: [this.$('btn-tilt'), this.$('btn-tilt-pause')],
      soundBtns: [this.$('btn-sound-pause')],
    }
    this.cache = {}
    this.announceTimer = null
    this.rotateTimer = null
    this.hitTimer = null
    this.damageTimer = null
    this.pickupTimer = null
    this.toasts = []
  }

  showScreen(name) {
    const screens = { menu: this.el.menu, pause: this.el.pause, over: this.el.over, win: this.el.win }
    for (const [k, s] of Object.entries(screens)) {
      if (!s) continue
      s.classList.toggle('hidden', k !== name)
    }
  }

  hideScreens() {
    this.showScreen(null)
  }

  setPlaying(playing) {
    this.el.hud.classList.toggle('hidden', !playing)
    this.el.touch.classList.toggle('hidden', !(playing && this.game.input.touch))
    if (!playing) {
      this.el.hud.classList.add('hidden')
      this.el.touch.classList.add('hidden')
      this.hideBoss()
    }
  }

  updateHUD() {
    const g = this.game
    const p = g.player
    const w = g.weapons

    const hp = Math.round(p.healthPct * 100)
    if (this.cache.hp !== hp) {
      this.cache.hp = hp
      this.el.health.style.width = `${hp}%`
      this.el.health.classList.toggle('low', hp <= 30)
    }
    const sh = Math.round(p.shieldPct * 100)
    if (this.cache.sh !== sh) {
      this.cache.sh = sh
      this.el.shield.style.width = `${sh}%`
      this.el.shieldRow.classList.toggle('on', p.shield > 0.5)
    }
    if (this.cache.score !== g.score) {
      this.cache.score = g.score
      this.el.score.textContent = g.score.toLocaleString('pt-BR')
    }
    if (this.cache.wave !== g.wave) {
      this.cache.wave = g.wave
      this.el.wave.textContent = Math.min(g.wave, 5)
    }
    if (this.cache.weapon !== w.current) {
      this.cache.weapon = w.current
      this.el.weaponName.textContent = w.name
      this.el.slots.forEach((s, i) => s.classList.toggle('on', i === w.current))
    }
    const ammoText = w.current === 0 ? '∞' : `${w.rocketAmmo}`
    if (this.cache.ammo !== ammoText) {
      this.cache.ammo = ammoText
      this.el.weaponAmmo.textContent = ammoText
    }
    const dash = Math.round(p.dashPct * 100)
    if (this.cache.dash !== dash) {
      this.cache.dash = dash
      this.el.dash.style.width = `${dash}%`
    }
    const btnDash = document.getElementById('btn-dash')
    btnDash?.classList.toggle('cooldown', !p.dashReady)

    const showCombo = g.combo >= 2 && g.state === 'playing'
    this.el.combo.classList.toggle('show', showCombo)
    if (showCombo && this.cache.combo !== g.combo) {
      this.cache.combo = g.combo
      this.el.comboNum.textContent = g.multiplier.toFixed(1)
    }

    // crosshair hot state when aiming at an enemy
    const origin = p.camera.position
    const dir = p.aimDirection
    const aim = g.enemies.findAimTarget(origin, dir, g.input.touch ? 0.09 : 0.04, 60)
    this.el.crosshair.classList.toggle('hot', !!aim)
  }

  updateBoss() {
    const boss = this.game.enemies.boss
    if (!boss || boss.dead) { this.hideBoss(); return }
    this.el.boss.classList.remove('hidden')
    const pct = Math.max(0, boss.hp / boss.maxHp)
    this.el.bossFill.style.width = `${pct * 100}%`
    this.el.bossText.textContent = `${Math.ceil(pct * 100)}%`
  }

  hideBoss() {
    this.el.boss.classList.add('hidden')
  }

  hit(kill = false) {
    const h = this.el.hitmarker
    h.classList.remove('show', 'kill')
    void h.offsetWidth
    h.classList.add('show')
    if (kill) h.classList.add('kill')
  }

  damage() {
    const v = this.el.vignette
    v.classList.add('hit')
    clearTimeout(this.damageTimer)
    this.damageTimer = setTimeout(() => v.classList.remove('hit'), 130)
  }

  pickupFlash() {
    const f = this.el.pickupFlash
    f.classList.add('on')
    clearTimeout(this.pickupTimer)
    this.pickupTimer = setTimeout(() => f.classList.remove('on'), 90)
  }

  announce(kicker, title, sub = '', duration = 2200) {
    const a = this.el.announce
    this.el.announceKicker.textContent = kicker
    this.el.announceTitle.textContent = title
    this.el.announceSub.textContent = sub
    a.classList.remove('hidden')
    requestAnimationFrame(() => a.classList.add('show'))
    clearTimeout(this.announceTimer)
    this.announceTimer = setTimeout(() => {
      a.classList.remove('show')
      setTimeout(() => a.classList.add('hidden'), 400)
    }, duration)
  }

  toast(text, tone = '', duration = 2.2) {
    const el = document.createElement('div')
    el.className = `toast ${tone}`
    el.innerHTML = text
    this.el.toastStack.appendChild(el)
    while (this.el.toastStack.children.length > 3) {
      this.el.toastStack.firstChild.remove()
    }
    setTimeout(() => {
      el.classList.add('out')
      setTimeout(() => el.remove(), 320)
    }, duration * 1000)
  }

  rotateHint(show) {
    if (!show) {
      this.el.rotate.classList.add('hidden')
      return
    }
    this.el.rotate.classList.remove('hidden')
    clearTimeout(this.rotateTimer)
    this.rotateTimer = setTimeout(() => this.el.rotate.classList.add('hidden'), 5500)
  }

  setTilt(on) {
    this.el.tiltBtns.forEach((b) => b?.setAttribute('aria-pressed', String(on)))
  }

  setSound(on) {
    this.el.soundBtns.forEach((b) => {
      b?.setAttribute('aria-pressed', String(on))
      const sw = b?.querySelector('.switch')
      sw?.classList.toggle('on', on)
    })
    this.el.soundHud?.classList.toggle('muted', !on)
  }

  setQuality(label) {
    if (this.el.quality) this.el.quality.textContent = label
  }

  setBest(score) {
    this.el.best.textContent = Number(score).toLocaleString('pt-BR')
  }

  fade(on) {
    this.el.fade.classList.toggle('on', on)
  }

  resetCache() {
    this.cache = {}
    this.el.combo.classList.remove('show')
    this.hideBoss()
  }
}
