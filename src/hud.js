const COMPASS = [
  { text: 'N', deg: 0, major: true },
  { text: 'NE', deg: 45 },
  { text: 'L', deg: 90 },
  { text: 'SE', deg: 135 },
  { text: 'S', deg: 180, major: true },
  { text: 'SO', deg: 225 },
  { text: 'O', deg: 270 },
  { text: 'NO', deg: 315 },
]

const $ = (id) => document.getElementById(id)
const fmt = (n) => Math.round(n).toLocaleString('pt-BR')

export class HUD {
  constructor() {
    this.r = {
      hud: $('hud'),
      coreHpText: $('coreHpText'),
      coreBar: $('coreBar'),
      coreBarWrap: document.querySelector('.core-bar'),
      waveLabel: $('waveLabel'),
      enemyCount: $('enemyCount'),
      scoreValue: $('scoreValue'),
      comboValue: $('comboValue'),
      crosshair: $('crosshair'),
      hitMarker: $('hitMarker'),
      radar: $('radar'),
      compass: $('compassStrip'),
      healthText: $('healthText'),
      healthBar: $('healthBar'),
      healthWrap: document.querySelector('.health-bar'),
      dashState: $('dashState'),
      tiltBadge: $('tiltBadge'),
      weaponName: $('weaponName'),
      weaponType: $('weaponType'),
      ammoValue: $('ammoValue'),
      ammoReserve: $('ammoReserve'),
      ammoPips: $('ammoPips'),
      ammoWrap: document.querySelector('.ammo'),
      reloadBar: $('reloadBar'),
      killfeed: $('killfeed'),
      scorePops: $('scorePops'),
      statusToast: $('statusToast'),
      permissionToast: $('permissionToast'),
      waveBanner: $('waveBanner'),
      wbKicker: $('wbKicker'),
      wbTitle: $('wbTitle'),
      wbSub: $('wbSub'),
      tutorial: $('tutorial'),
      tutorialTitle: $('tutorialTitle'),
      tutorialText: $('tutorialText'),
      interactHint: $('interactHint'),
      damageDir: $('damageDir'),
      damageFlash: $('damageFlash'),
      healFlash: $('healFlash'),
      targetTag: $('targetTag'),
      bossBar: $('bossBar'),
      bossBarFill: $('bossBarFill'),
      bossHpText: $('bossHpText'),
    }
    this.last = {}
    this.radarCtx = this.r.radar?.getContext('2d')
    this.radarAccum = 0
    this.compassSpans = []
    this.feedItems = []
    this.bannerTimer = null
    this.toastTimer = null
    this.permTimer = null
    this.tutorialTimer = null
    this.hitTimer = null
    this.damageTimer = null
    this.pipMag = -1

    this.buildCompass()
    this.buildAmmoPips(30)
  }

  buildCompass() {
    if (!this.r.compass) return
    this.r.compass.innerHTML = ''
    for (let set = 0; set < 3; set++) {
      for (const c of COMPASS) {
        const span = document.createElement('span')
        span.textContent = c.text
        span.dataset.deg = String(c.deg + set * 360)
        if (c.major) span.classList.add('major')
        this.r.compass.appendChild(span)
        this.compassSpans.push(span)
      }
    }
  }

  setHudVisible(v) {
    this.r.hud?.classList.toggle('hidden', !v)
  }

  updateCompass(yaw) {
    if (!this.compassSpans.length) return
    const heading = ((-yaw * 180) / Math.PI) % 360
    for (const span of this.compassSpans) {
      const deg = Number(span.dataset.deg)
      let rel = ((deg - heading + 540) % 360) - 180
      const x = rel * 1.05
      span.style.left = `calc(50% + ${x}px)`
      span.style.opacity = Math.abs(x) > 150 ? '0' : String(1 - Math.abs(x) / 175)
    }
  }

  buildAmmoPips(mag) {
    if (!this.r.ammoPips || mag === this.pipMag) return
    this.pipMag = mag
    this.r.ammoPips.innerHTML = ''
    for (let i = 0; i < mag; i++) {
      const i2 = document.createElement('i')
      this.r.ammoPips.appendChild(i2)
    }
    this.pips = [...this.r.ammoPips.children]
  }

  set(state, { core = 1, wave = 1, totalWaves = 5, enemies = 0, score = 0, combo = 0, boss = null, target = null } = {}) {
    const r = this.r
    const last = this.last

    if (state.health !== last.health) {
      const h = Math.max(0, state.health)
      if (r.healthText) r.healthText.textContent = String(Math.round(h))
      if (r.healthBar) r.healthBar.style.width = `${Math.max(0, h)}%`
      if (r.healthWrap) r.healthWrap.classList.toggle('low', h < 35)
      if (h < last.health) this.flashHeal(-1)
      last.health = h
    }
    if (r.weaponName && state.name !== last.name) {
      r.weaponName.textContent = state.name
      r.weaponType.textContent = state.type
      this.buildAmmoPips(state.mag)
      last.name = state.name
    }
    if (state.ammo !== last.ammo) {
      if (r.ammoValue) r.ammoValue.textContent = String(state.ammo)
      if (this.pips) {
        for (let i = 0; i < this.pips.length; i++) {
          this.pips[i].classList.toggle('spent', i >= state.ammo)
        }
      }
      if (r.ammoWrap) r.ammoWrap.classList.toggle('low', state.ammo <= Math.ceil(state.mag * 0.25))
      if (r.interactHint) {
        const empty = state.ammo === 0 && !state.reloading
        r.interactHint.textContent = empty ? 'SEM MUNIÇÃO · RECARREGUE' : ''
        r.interactHint.classList.toggle('show', empty)
      }
      last.ammo = state.ammo
    }
    if (state.reloading !== last.reloading) {
      r.crosshair?.classList.toggle('reloading', state.reloading)
      last.reloading = state.reloading
    }
    if (r.reloadBar) {
      r.reloadBar.style.width = `${(state.reloadProgress || 0) * 100}%`
    }
    if (state.dashCooldown !== last.dashCooldown) {
      const ready = state.dashCooldown <= 0
      if (r.dashState) {
        r.dashState.textContent = ready ? 'IMPULSO PRONTO' : `IMPULSO ${state.dashCooldown.toFixed(1)}s`
        r.dashState.classList.toggle('ready', ready)
      }
      last.dashCooldown = state.dashCooldown
    }

    if (core !== last.core) {
      const c = Math.max(0, Math.min(1, core))
      if (r.coreHpText) r.coreHpText.textContent = `${Math.round(c * 100)}%`
      if (r.coreBar) r.coreBar.style.width = `${c * 100}%`
      if (r.coreBarWrap) {
        r.coreBarWrap.classList.toggle('warn', c <= 0.55 && c > 0.25)
        r.coreBarWrap.classList.toggle('crit', c <= 0.25)
      }
      last.core = core
    }
    if (wave !== last.wave || totalWaves !== last.totalWaves) {
      if (r.waveLabel) r.waveLabel.textContent = `ONDA ${wave} / ${totalWaves}`
      last.wave = wave
      last.totalWaves = totalWaves
    }
    if (enemies !== last.enemies) {
      if (r.enemyCount) r.enemyCount.textContent = `${enemies} HOSTIS`
      last.enemies = enemies
    }
    if (score !== last.score) {
      if (r.scoreValue) r.scoreValue.textContent = fmt(score)
      last.score = score
    }
    if (combo !== last.combo) {
      if (r.comboValue) {
        r.comboValue.textContent = combo > 1 ? `COMBO ×${combo}` : ''
        r.comboValue.classList.toggle('on', combo > 1)
      }
      last.combo = combo
    }
    if (boss) {
      const frac = Math.max(0, boss.hp / boss.maxHp)
      r.bossBar?.classList.remove('hidden')
      if (r.bossBarFill) r.bossBarFill.style.width = `${frac * 100}%`
      if (r.bossHpText) r.bossHpText.textContent = `${Math.round(frac * 100)}%`
    } else {
      r.bossBar?.classList.add('hidden')
    }
    this.setTarget(target)
    this.updateCompass(state.yaw || 0)
    this.setCrosshairBloom(state.bloom || 0)
  }

  setCrosshairBloom(bloom) {
    if (!this.r.crosshair) return
    const gap = 7 + Math.min(20, bloom * 600)
    this.r.crosshair.style.setProperty('--gap', `${gap}px`)
  }

  setTarget(target) {
    const cross = this.r.crosshair
    const tag = this.r.targetTag
    if (!cross) return
    if (target) {
      cross.classList.add('enemy')
      if (tag) {
        const isBoss = target.type === 'colosso'
        tag.textContent = isBoss ? 'COLOSSO · ALVO CRÍTICO' : `${target.name} · ${Math.round(target.hp)} HP`
        tag.classList.add('show')
      }
    } else {
      cross.classList.remove('enemy')
      if (tag) tag.classList.remove('show')
    }
  }

  hitmarker(kill = false, head = false) {
    const el = this.r.hitMarker
    if (!el) return
    el.classList.remove('show', 'kill')
    void el.offsetWidth
    el.classList.add('show')
    if (kill) el.classList.add('kill')
    clearTimeout(this.hitTimer)
    this.hitTimer = setTimeout(() => el.classList.remove('show', 'kill'), 160)
  }

  damage(angle, amount) {
    const el = this.r.damageFlash
    if (el) {
      el.style.opacity = Math.min(0.9, 0.28 + amount / 70)
      clearTimeout(this.damageTimer)
      this.damageTimer = setTimeout(() => (el.style.opacity = '0'), 130)
    }
    const dir = this.r.damageDir
    if (dir && angle !== null) {
      dir.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`
      dir.classList.add('show')
      setTimeout(() => dir.classList.remove('show'), 420)
    }
  }

  flashHeal(dir) {
    if (dir < 0) return
    const el = this.r.healFlash
    if (!el) return
    el.style.opacity = '0.55'
    setTimeout(() => (el.style.opacity = '0'), 320)
  }

  feed(text, { teal = false, points = null } = {}) {
    const wrap = this.r.killfeed
    if (!wrap) return
    const item = document.createElement('div')
    item.className = 'feed-item' + (teal ? ' teal' : '')
    item.innerHTML = points ? `${text} <b>+${points}</b>` : text
    wrap.appendChild(item)
    this.feedItems.push(item)
    if (this.feedItems.length > 4) {
      const old = this.feedItems.shift()
      old?.remove()
    }
    setTimeout(() => {
      item.classList.add('out')
      setTimeout(() => {
        item.remove()
        this.feedItems = this.feedItems.filter((x) => x !== item)
      }, 400)
    }, 2600)
  }

  popScore(worldPos, camera, text, head = false) {
    const wrap = this.r.scorePops
    if (!wrap) return
    const v = worldPos.clone().project(camera)
    if (v.z > 1 || v.z < -1) return
    const x = (v.x * 0.5 + 0.5) * 100
    const y = (-v.y * 0.5 + 0.5) * 100
    if (x < 2 || x > 98 || y < 2 || y > 98) return
    const el = document.createElement('div')
    el.className = 'score-pop' + (head ? ' head' : '')
    el.textContent = text
    el.style.left = `${x}%`
    el.style.top = `${y}%`
    wrap.appendChild(el)
    setTimeout(() => el.remove(), 880)
  }

  waveBanner(kicker, title, sub, { boss = false, duration = 2200 } = {}) {
    const el = this.r.waveBanner
    if (!el) return
    this.r.wbKicker.textContent = kicker
    this.r.wbTitle.textContent = title
    this.r.wbSub.textContent = sub
    el.classList.toggle('boss', boss)
    el.classList.add('show')
    clearTimeout(this.bannerTimer)
    this.bannerTimer = setTimeout(() => el.classList.remove('show'), duration)
  }

  tutorial(title, text, duration = 6000) {
    const el = this.r.tutorial
    if (!el) return
    this.r.tutorialTitle.textContent = title
    this.r.tutorialText.textContent = text
    el.classList.add('show')
    clearTimeout(this.tutorialTimer)
    if (duration > 0) this.tutorialTimer = setTimeout(() => el.classList.remove('show'), duration)
  }

  hideTutorial() {
    this.r.tutorial?.classList.remove('show')
  }

  toast(text, { error = false, duration = 2600, permission = false } = {}) {
    const el = permission ? this.r.permissionToast : this.r.statusToast
    if (!el) return
    el.textContent = text
    el.classList.toggle('error', error)
    el.classList.add('show')
    const key = permission ? 'permTimer' : 'toastTimer'
    clearTimeout(this[key])
    this[key] = setTimeout(() => el.classList.remove('show'), duration)
  }

  setTilt(on) {
    if (!this.r.tiltBadge) return
    this.r.tiltBadge.textContent = on ? 'TILT ON' : 'TILT OFF'
    this.r.tiltBadge.classList.toggle('on', on)
  }

  drawRadar(player, enemies, core, yaw, time) {
    const ctx = this.radarCtx
    if (!ctx) return
    this.radarAccum += 1
    if (this.radarAccum % 3 !== 0) return
    const W = 220
    const C = W / 2
    ctx.clearRect(0, 0, W, W)
    ctx.save()
    ctx.beginPath()
    ctx.arc(C, C, C - 4, 0, Math.PI * 2)
    ctx.clip()

    const g = ctx.createRadialGradient(C, C, 8, C, C, C)
    g.addColorStop(0, 'rgba(10,48,36,0.55)')
    g.addColorStop(1, 'rgba(3,18,13,0.25)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, W)

    // range rings
    ctx.strokeStyle = 'rgba(39,224,184,0.14)'
    ctx.lineWidth = 1
    for (const r of [0.33, 0.66, 0.98]) {
      ctx.beginPath()
      ctx.arc(C, C, (C - 6) * r, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(39,224,184,0.1)'
    ctx.beginPath()
    ctx.moveTo(C, 8)
    ctx.lineTo(C, W - 8)
    ctx.moveTo(8, C)
    ctx.lineTo(W - 8, C)
    ctx.stroke()

    // sweep
    const sweep = (time * 1.15) % (Math.PI * 2)
    const sg = ctx.createConicGradient ? ctx.createConicGradient(sweep, C, C) : null
    if (sg) {
      sg.addColorStop(0, 'rgba(39,224,184,0.26)')
      sg.addColorStop(0.12, 'rgba(39,224,184,0)')
      sg.addColorStop(1, 'rgba(39,224,184,0)')
      ctx.fillStyle = sg
      ctx.beginPath()
      ctx.arc(C, C, C - 6, 0, Math.PI * 2)
      ctx.fill()
    }

    const heading = -yaw
    const sin = Math.sin(heading)
    const cos = Math.cos(heading)
    const scale = (C - 14) / 32
    const toRadar = (x, z) => {
      const rx = x * cos - z * sin
      const rz = x * sin + z * cos
      return { x: C + rx * scale, y: C - rz * scale }
    }

    // core
    const cp = toRadar(core.x - player.x, core.z - player.z)
    ctx.save()
    ctx.translate(cp.x, cp.y)
    ctx.rotate(Math.PI / 4)
    ctx.fillStyle = 'rgba(39,224,184,0.9)'
    ctx.shadowColor = '#27e0b8'
    ctx.shadowBlur = 8
    ctx.fillRect(-3, -3, 6, 6)
    ctx.restore()

    // enemies
    for (const e of enemies) {
      let px = e.position.x - player.x
      let pz = e.position.z - player.z
      const p = toRadar(px, pz)
      const dx = p.x - C
      const dy = p.y - C
      const d = Math.hypot(dx, dy)
      const maxD = C - 9
      const k = d > maxD ? maxD / d : 1
      const x = C + dx * k
      const y = C + dy * k
      const boss = e.type === 'colosso'
      ctx.fillStyle = boss ? 'rgba(255,183,3,1)' : 'rgba(255,93,58,0.95)'
      ctx.shadowColor = boss ? '#ffb703' : '#ff5d3a'
      ctx.shadowBlur = boss ? 12 : 6
      ctx.beginPath()
      ctx.arc(x, y, boss ? 4.5 : 2.6, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.shadowBlur = 0

    // player
    ctx.fillStyle = '#f4ecd8'
    ctx.beginPath()
    ctx.moveTo(C, C - 6)
    ctx.lineTo(C - 4.5, C + 5)
    ctx.lineTo(C + 4.5, C + 5)
    ctx.closePath()
    ctx.fill()

    // north marker
    const na = -heading
    const nx = C + Math.sin(na) * (C - 12)
    const ny = C - Math.cos(na) * (C - 12)
    ctx.fillStyle = 'rgba(255,183,3,0.8)'
    ctx.font = '600 11px "Barlow Condensed", Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('N', nx, ny)

    ctx.restore()
  }

  showEnd({ victory, score, waves, kills, accuracy }) {
    const end = $('gameover')
    const panel = end?.querySelector('.end-panel')
    if (!end) return
    panel?.classList.toggle('victory', victory)
    $('endKicker').textContent = victory ? 'PRAÇA PRESERVADA' : 'SINAL PERDIDO'
    $('endTitle').innerHTML = victory ? 'A PRAÇA<br /><em>continua acesa.</em>' : 'A PRAÇA<br /><em>escureceu.</em>'
    $('endCopy').textContent = victory
      ? 'O Colosso caiu. O Núcleo pulsa, o samba volta e a comunidade respira. Você segurou a noite.'
      : 'O Núcleo foi silenciado. Mas a maré sempre volta — e a praça vai precisar de você outra vez.'
    $('endScore').textContent = fmt(score)
    $('endWaves').textContent = String(waves)
    $('endKills').textContent = String(kills)
    $('endAcc').textContent = `${Math.round(accuracy)}%`
    end.classList.remove('hidden')
  }

  hideEnd() {
    $('gameover')?.classList.add('hidden')
  }

  reset() {
    this.last = {}
    this.feedItems.forEach((x) => x.remove())
    this.feedItems = []
    this.r.killfeed?.replaceChildren()
    this.r.scorePops?.replaceChildren()
    this.r.waveBanner?.classList.remove('show')
    this.r.interactHint?.classList.remove('show')
    this.r.crosshair?.classList.remove('enemy', 'reloading')
    this.r.targetTag?.classList.remove('show')
    this.r.bossBar?.classList.add('hidden')
    this.hideEnd()
  }
}
