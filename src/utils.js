// Small shared helpers and procedural textures.
import * as THREE from 'three'

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a)
export const randInt = (a, b) => Math.floor(rand(a, b + 1))
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt))
export const TAU = Math.PI * 2

export function angleLerp(a, b, t) {
  let d = ((b - a + Math.PI) % TAU + TAU) % TAU - Math.PI
  return a + d * t
}

export function canvasTexture(w, h, draw, { repeat = 1, srgb = true } = {}) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  draw(ctx, w, h)
  const tex = new THREE.CanvasTexture(c)
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(repeat, repeat)
  tex.anisotropy = 4
  return tex
}

export function glowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  return canvasTexture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2)
    g.addColorStop(0, inner)
    g.addColorStop(0.35, inner.replace(/[\d.]+\)$/, '0.55)'))
    g.addColorStop(1, outer)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  })
}

export function groundTexture() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#2f2c37'
    ctx.fillRect(0, 0, w, h)
    // Portuguese pavement: light wave bands over dark stones.
    for (let band = 0; band < 4; band++) {
      const baseY = 34 + band * 128
      ctx.beginPath()
      for (let x = 0; x <= w; x += 4) {
        const y = baseY + Math.sin((x / w) * Math.PI * 2 + band) * 26
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(210, 199, 176, 0.5)'
      ctx.lineWidth = 14
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.strokeStyle = 'rgba(24, 22, 28, 0.9)'
      ctx.lineWidth = 3
      ctx.stroke()
    }
    // stone joints + grain
    ctx.strokeStyle = 'rgba(0,0,0,0.20)'
    ctx.lineWidth = 1
    for (let y = 0; y < h; y += 16) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }
    for (let i = 0; i < 1600; i++) {
      ctx.fillStyle = `rgba(${randInt(140, 255)},${randInt(130, 230)},${randInt(120, 210)},${rand(0.01, 0.07)})`
      ctx.fillRect(rand(0, w), rand(0, h), rand(1, 3), rand(1, 2))
    }
  }, { repeat: 12 })
}

export function facadeTextures(wall, windowColor) {
  const winPositions = []
  const cols = 4
  const rows = 5
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.18) continue
      winPositions.push([18 + c * 56 + rand(-2, 2), 26 + r * 58, rand(0.55, 1)])
    }
  }
  const map = canvasTexture(256, 320, (ctx, w, h) => {
    ctx.fillStyle = wall
    ctx.fillRect(0, 0, w, h)
    // plaster grain
    for (let i = 0; i < 700; i++) {
      ctx.fillStyle = `rgba(255,255,255,${rand(0.01, 0.05)})`
      ctx.fillRect(rand(0, w), rand(0, h), rand(1, 3), rand(1, 3))
    }
    // roof band
    ctx.fillStyle = 'rgba(0,0,0,0.25)'
    ctx.fillRect(0, 0, w, 10)
    // door
    ctx.fillStyle = 'rgba(25,16,24,0.9)'
    ctx.fillRect(w / 2 - 22, h - 44, 44, 44)
    ctx.fillStyle = 'rgba(255,190,110,0.35)'
    ctx.fillRect(w / 2 - 18, h - 40, 36, 4)
    for (const [x, y, s] of winPositions) {
      ctx.fillStyle = 'rgba(20,14,24,0.92)'
      ctx.fillRect(x, y, 32, 34)
      ctx.fillStyle = windowColor
      ctx.globalAlpha = 0.55 + s * 0.4
      ctx.fillRect(x + 3, y + 3, 26, 28)
      ctx.globalAlpha = 1
      ctx.strokeStyle = 'rgba(15,10,18,0.9)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x + 16, y + 3)
      ctx.lineTo(x + 16, y + 31)
      ctx.moveTo(x + 3, y + 17)
      ctx.lineTo(x + 29, y + 17)
      ctx.stroke()
    }
  })
  const emissive = canvasTexture(256, 320, (ctx, w, h) => {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, w, h)
    for (const [x, y, s] of winPositions) {
      const g = ctx.createRadialGradient(x + 16, y + 17, 2, x + 16, y + 17, 24)
      g.addColorStop(0, `rgba(255,205,130,${0.5 + s * 0.5})`)
      g.addColorStop(1, 'rgba(255,150,60,0)')
      ctx.fillStyle = g
      ctx.fillRect(x - 8, y - 7, 48, 48)
      ctx.fillStyle = `rgba(255,214,150,${0.55 + s * 0.45})`
      ctx.fillRect(x + 3, y + 3, 26, 28)
    }
    ctx.fillStyle = 'rgba(255,170,90,0.5)'
    ctx.fillRect(w / 2 - 18, h - 40, 36, 4)
  })
  return { map, emissive }
}

export function buntingFlagGeometry() {
  const shape = new THREE.Shape()
  shape.moveTo(-0.22, 0)
  shape.lineTo(0.22, 0)
  shape.lineTo(0, -0.42)
  shape.closePath()
  return new THREE.ShapeGeometry(shape)
}

export function textTexture(lines, { w = 512, h = 256, bg = 'transparent', color = '#fff', font = 'bold 64px sans-serif' } = {}) {
  return canvasTexture(w, h, (ctx) => {
    if (bg !== 'transparent') {
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)
    }
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = font
    ctx.fillStyle = color
    const step = h / (lines.length + 0.4)
    lines.forEach((line, i) => ctx.fillText(line, w / 2, step * (i + 0.75)))
  })
}
