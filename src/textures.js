import * as THREE from 'three'

const textureCache = new Map()

function canvasTexture(key, width, height, draw, options = {}) {
  if (textureCache.has(key)) return textureCache.get(key)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  draw(ctx, width, height)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.anisotropy = options.anisotropy || 4
  if (options.repeat) texture.repeat.set(options.repeat[0], options.repeat[1])
  texture.needsUpdate = true
  textureCache.set(key, texture)
  return texture
}

function noise(ctx, width, height, amount, alpha = 0.14, light = true) {
  const count = Math.floor(width * height * amount)
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const a = Math.random() * alpha
    ctx.fillStyle = light ? `rgba(255,248,220,${a})` : `rgba(0,0,0,${a})`
    ctx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 2)
  }
}

export function groundTexture() {
  return canvasTexture('ground', 512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#26251f'
    ctx.fillRect(0, 0, w, h)
    for (let y = 0; y < 18; y++) {
      for (let x = 0; x < 18; x++) {
        const px = x * 29 + (y % 2) * 14
        const py = y * 29
        const shade = 38 + Math.floor(Math.random() * 22)
        ctx.fillStyle = `rgb(${shade},${shade - 2},${shade - 7})`
        ctx.beginPath()
        ctx.roundRect(px + 1, py + 1, 27, 27, 4)
        ctx.fill()
        ctx.strokeStyle = 'rgba(8,8,5,.32)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
    noise(ctx, w, h, 0.045, 0.18, true)
    noise(ctx, w, h, 0.025, 0.24, false)
    ctx.strokeStyle = 'rgba(10,8,6,.55)'
    ctx.lineWidth = 2
    for (let i = 0; i < 10; i++) {
      ctx.beginPath()
      let x = Math.random() * w
      let y = Math.random() * h
      ctx.moveTo(x, y)
      for (let j = 0; j < 4; j++) {
        x += (Math.random() - 0.5) * 50
        y += Math.random() * 40
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    ctx.globalAlpha = 0.13
    ctx.fillStyle = '#c7ff3d'
    ctx.beginPath()
    ctx.arc(80, 380, 60, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ff3f80'
    ctx.beginPath()
    ctx.arc(410, 120, 50, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }, { repeat: [7, 7], anisotropy: 8 })
}

export function wallTexture(base = '#b75d3d', trim = '#743c2e') {
  return canvasTexture(`wall-${base}-${trim}`, 256, 256, (ctx, w, h) => {
    ctx.fillStyle = base
    ctx.fillRect(0, 0, w, h)
    const grad = ctx.createLinearGradient(0, 0, w, 0)
    grad.addColorStop(0, 'rgba(255,255,255,.06)')
    grad.addColorStop(0.55, 'rgba(0,0,0,0)')
    grad.addColorStop(1, 'rgba(0,0,0,.16)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
    noise(ctx, w, h, 0.06, 0.16, true)
    noise(ctx, w, h, 0.04, 0.22, false)
    ctx.strokeStyle = trim
    ctx.globalAlpha = 0.24
    ctx.lineWidth = 2
    for (let y = 38; y < h; y += 54) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }
    ctx.globalAlpha = 0.12
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 ? '#1a0d08' : '#ffd16e'
      ctx.fillRect(Math.random() * w, Math.random() * h, 10 + Math.random() * 42, 3 + Math.random() * 15)
    }
    ctx.globalAlpha = 1
  })
}

export function roofTexture() {
  return canvasTexture('roof', 256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#35322a'
    ctx.fillRect(0, 0, w, h)
    for (let x = 0; x < w; x += 16) {
      ctx.fillStyle = x % 32 ? '#3b382e' : '#2c2a23'
      ctx.fillRect(x, 0, 15, h)
      ctx.strokeStyle = 'rgba(0,0,0,.22)'
      ctx.strokeRect(x, 0, 15, h)
    }
    noise(ctx, w, h, 0.05, 0.18, true)
  })
}

export function awningTexture(colorA = '#e54b45', colorB = '#f3e8c5') {
  return canvasTexture(`awning-${colorA}-${colorB}`, 256, 128, (ctx, w, h) => {
    for (let x = 0; x < w; x += 32) {
      ctx.fillStyle = Math.floor(x / 32) % 2 ? colorA : colorB
      ctx.fillRect(x, 0, 32, h)
    }
    noise(ctx, w, h, 0.025, 0.14, false)
  }, { repeat: [3, 1] })
}

export function signTexture(text, color = '#d9ff45', sub = '') {
  return canvasTexture(`sign-${text}-${color}-${sub}`, 512, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(4,10,7,.78)'
    ctx.fillRect(8, 8, w - 16, h - 16)
    ctx.strokeStyle = color
    ctx.globalAlpha = 0.55
    ctx.lineWidth = 3
    ctx.strokeRect(16, 16, w - 32, h - 32)
    ctx.globalAlpha = 1
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = color
    ctx.shadowBlur = 22
    ctx.fillStyle = color
    ctx.font = `700 ${text.length > 8 ? 88 : 118}px Impact, "Arial Black", sans-serif`
    ctx.fillText(text, w / 2, h / 2 - (sub ? 16 : 0))
    if (sub) {
      ctx.shadowBlur = 8
      ctx.font = '600 26px "Arial Narrow", sans-serif'
      ctx.letterSpacing = '8px'
      ctx.fillText(sub, w / 2, h / 2 + 64)
    }
  })
}

export function graffitiTexture(text, color = '#ff3f80') {
  return canvasTexture(`graffiti-${text}-${color}`, 512, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    ctx.save()
    ctx.translate(w / 2, h / 2)
    ctx.rotate(-0.08)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'italic 900 104px Impact, "Arial Black", sans-serif'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 18
    ctx.strokeStyle = 'rgba(6,9,7,.7)'
    ctx.strokeText(text, 0, 0)
    ctx.lineWidth = 10
    ctx.strokeStyle = color
    ctx.globalAlpha = 0.92
    ctx.strokeText(text, 0, 0)
    ctx.globalAlpha = 1
    ctx.fillStyle = '#f4f1dc'
    ctx.fillText(text, 0, 0)
    ctx.restore()
    for (let i = 0; i < 18; i++) {
      ctx.fillStyle = color
      ctx.globalAlpha = Math.random() * 0.6
      const x = Math.random() * w
      const y = Math.random() * h
      ctx.beginPath()
      ctx.arc(x, y, Math.random() * 5, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  })
}

export function glowTexture() {
  return canvasTexture('glow', 128, 128, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.16, 'rgba(255,255,255,.85)')
    grad.addColorStop(0.42, 'rgba(255,255,255,.24)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  })
}

export function cloudTexture() {
  return canvasTexture('cloud', 512, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    for (let i = 0; i < 18; i++) {
      const x = 50 + Math.random() * (w - 100)
      const y = h * 0.5 + (Math.random() - 0.5) * 24
      const r = 24 + Math.random() * 52
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
      grad.addColorStop(0, 'rgba(255,218,196,.24)')
      grad.addColorStop(1, 'rgba(255,180,154,0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  })
}

export function stripeTexture(a = '#d9ff45', b = '#102117') {
  return canvasTexture(`stripe-${a}-${b}`, 128, 128, (ctx, w, h) => {
    ctx.fillStyle = b
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = a
    ctx.save()
    ctx.translate(-w, 0)
    for (let i = 0; i < 8; i++) {
      ctx.beginPath()
      ctx.moveTo(i * 32, 0)
      ctx.lineTo(i * 32 + 18, 0)
      ctx.lineTo(i * 32 + 18 + h, h)
      ctx.lineTo(i * 32 + h, h)
      ctx.closePath()
      ctx.fill()
    }
    ctx.restore()
  }, { repeat: [2, 2] })
}

export function brazilPatchTexture() {
  return canvasTexture('brazil-patch', 128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#0f8a47'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#ffd23c'
    ctx.beginPath()
    ctx.moveTo(w / 2, 20)
    ctx.lineTo(w - 18, h / 2)
    ctx.lineTo(w / 2, h - 20)
    ctx.lineTo(18, h / 2)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#1745a5'
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, 24, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#f4f7e8'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, 24, 0.3, Math.PI - 0.6)
    ctx.stroke()
    ctx.fillStyle = 'rgba(255,255,255,.12)'
    ctx.fillRect(0, 0, w, 2)
  })
}
