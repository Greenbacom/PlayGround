import * as THREE from 'three'

const TAU = Math.PI * 2
const textureCache = new Map()
const geometryCache = new Map()

export const PALETTE = {
  cyan: '#6df6ff',
  magenta: '#ff4bd8',
  violet: '#9c73ff',
  amber: '#ffc85c',
  red: '#ff526d',
  green: '#63ffb4'
}

export function glowTexture(color = '#6df6ff') {
  const key = `glow-${color}`
  if (textureCache.has(key)) return textureCache.get(key)
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')
  const c = new THREE.Color(color)
  const r = Math.round(c.r * 255)
  const g = Math.round(c.g * 255)
  const b = Math.round(c.b * 255)
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(.12, `rgba(${r},${g},${b},.98)`)
  grad.addColorStop(.38, `rgba(${r},${g},${b},.42)`)
  grad.addColorStop(.72, `rgba(${r},${g},${b},.08)`)
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  textureCache.set(key, tex)
  return tex
}

function makeCanvas(size, draw) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  draw(ctx, size)
  return canvas
}

function canvasTexture(canvas, { repeat = false, colorSpace = true } = {}) {
  const tex = new THREE.CanvasTexture(canvas)
  if (repeat) tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  if (colorSpace) tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

export function makeFloorTexture() {
  const canvas = makeCanvas(1024, (ctx, size) => {
    const base = ctx.createRadialGradient(size * .5, size * .48, 20, size * .5, size * .5, size * .7)
    base.addColorStop(0, '#0c1626')
    base.addColorStop(.34, '#080f1d')
    base.addColorStop(.74, '#060a14')
    base.addColorStop(1, '#03060d')
    ctx.fillStyle = base
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 9000; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const a = Math.random() * .055
      ctx.fillStyle = `rgba(${120 + Math.random() * 90},${190 + Math.random() * 60},255,${a})`
      ctx.fillRect(x, y, Math.random() * 2 + .4, Math.random() * 2 + .4)
    }
    ctx.strokeStyle = 'rgba(104, 190, 220, .055)'
    ctx.lineWidth = 2
    for (let i = 0; i <= size; i += 128) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(2, 4, 10, .7)'
    ctx.lineWidth = 5
    for (let i = 0; i <= size; i += 256) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke()
    }
    const vignette = ctx.createRadialGradient(size / 2, size / 2, size * .1, size / 2, size / 2, size * .55)
    vignette.addColorStop(0, 'rgba(0,0,0,0)')
    vignette.addColorStop(1, 'rgba(0,0,0,.55)')
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, size, size)
  })
  return canvasTexture(canvas)
}

export function makeGridTexture() {
  const canvas = makeCanvas(1024, (ctx, size) => {
    const cx = size / 2
    const cy = size / 2
    ctx.clearRect(0, 0, size, size)
    ctx.translate(cx, cy)
    ctx.strokeStyle = 'rgba(109, 246, 255, .34)'
    ctx.shadowColor = 'rgba(109, 246, 255, .8)'
    ctx.shadowBlur = 7
    ctx.lineWidth = 1.6
    for (let r = 90; r < 500; r += 82) {
      ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke()
    }
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * TAU
      ctx.beginPath()
      ctx.moveTo(Math.cos(a) * 36, Math.sin(a) * 36)
      ctx.lineTo(Math.cos(a) * 500, Math.sin(a) * 500)
      ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(255, 75, 216, .28)'
    ctx.shadowColor = 'rgba(255, 75, 216, .7)'
    ctx.lineWidth = 2.4
    for (const r of [164, 330, 492]) {
      ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke()
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    const fade = ctx.createRadialGradient(cx, cy, 200, cx, cy, 510)
    fade.addColorStop(0, 'rgba(0,0,0,0)')
    fade.addColorStop(.72, 'rgba(0,0,0,0)')
    fade.addColorStop(1, 'rgba(0,0,0,1)')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = fade
    ctx.fillRect(0, 0, size, size)
    ctx.globalCompositeOperation = 'source-over'
  })
  return canvasTexture(canvas)
}

export function makeRuneTexture() {
  const canvas = makeCanvas(512, (ctx, size) => {
    const c = size / 2
    ctx.clearRect(0, 0, size, size)
    ctx.translate(c, c)
    ctx.strokeStyle = 'rgba(109, 246, 255, .48)'
    ctx.shadowColor = 'rgba(109, 246, 255, .9)'
    ctx.shadowBlur = 12
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(0, 0, 212, 0, TAU); ctx.stroke()
    ctx.beginPath(); ctx.arc(0, 0, 174, .2, TAU - .2); ctx.stroke()
    ctx.strokeStyle = 'rgba(255, 75, 216, .35)'
    ctx.beginPath(); ctx.arc(0, 0, 126, 0, TAU); ctx.stroke()
    ctx.strokeStyle = 'rgba(109, 246, 255, .42)'
    ctx.lineWidth = 3
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU - Math.PI / 2
      const b = ((i + 2) / 6) * TAU - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(Math.cos(a) * 205, Math.sin(a) * 205)
      ctx.lineTo(Math.cos(b) * 205, Math.sin(b) * 205)
      ctx.stroke()
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  })
  return canvasTexture(canvas)
}

export function makeNebulaTexture(color = '#6df6ff') {
  const key = `nebula-${color}`
  if (textureCache.has(key)) return textureCache.get(key)
  const canvas = makeCanvas(512, (ctx, size) => {
    ctx.clearRect(0, 0, size, size)
    const c = new THREE.Color(color)
    const r = Math.round(c.r * 255), g = Math.round(c.g * 255), b = Math.round(c.b * 255)
    for (let i = 0; i < 16; i++) {
      const x = size * (.2 + Math.random() * .6)
      const y = size * (.2 + Math.random() * .6)
      const rad = size * (.08 + Math.random() * .28)
      const grad = ctx.createRadialGradient(x, y, 0, x, y, rad)
      grad.addColorStop(0, `rgba(${r},${g},${b},${.05 + Math.random() * .1})`)
      grad.addColorStop(.45, `rgba(${r},${g},${b},.035)`)
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, size, size)
    }
  })
  const tex = canvasTexture(canvas)
  textureCache.set(key, tex)
  return tex
}

export function makeHoloTexture(text, color = '#6df6ff') {
  const key = `holo-${text}-${color}`
  if (textureCache.has(key)) return textureCache.get(key)
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 512, 256)
  const c = new THREE.Color(color)
  const r = Math.round(c.r * 255), g = Math.round(c.g * 255), b = Math.round(c.b * 255)
  ctx.strokeStyle = `rgba(${r},${g},${b},.55)`
  ctx.lineWidth = 2
  ctx.strokeRect(12, 12, 488, 232)
  ctx.strokeStyle = `rgba(${r},${g},${b},.2)`
  ctx.strokeRect(24, 24, 464, 208)
  ctx.font = '700 58px Orbitron, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = `rgba(${r},${g},${b},.9)`
  ctx.shadowColor = `rgba(${r},${g},${b},1)`
  ctx.shadowBlur = 24
  ctx.fillText(text, 256, 128)
  ctx.shadowBlur = 0
  ctx.font = '500 14px Rajdhani, sans-serif'
  ctx.fillStyle = `rgba(${r},${g},${b},.55)`
  ctx.fillText('VOX ARSENAL // TRANSMISSÃO', 256, 205)
  for (let y = 30; y < 230; y += 5) {
    ctx.fillStyle = `rgba(${r},${g},${b},.06)`
    ctx.fillRect(18, y, 476, 1)
  }
  const tex = canvasTexture(canvas)
  textureCache.set(key, tex)
  return tex
}

export function makeBeamTexture(color = '#6df6ff') {
  const key = `beam-${color}`
  if (textureCache.has(key)) return textureCache.get(key)
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  const c = new THREE.Color(color)
  const r = Math.round(c.r * 255), g = Math.round(c.g * 255), b = Math.round(c.b * 255)
  const grad = ctx.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, `rgba(${r},${g},${b},0)`)
  grad.addColorStop(.2, `rgba(${r},${g},${b},.45)`)
  grad.addColorStop(.5, `rgba(${r},${g},${b},.9)`)
  grad.addColorStop(.8, `rgba(${r},${g},${b},.45)`)
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = grad
  ctx.fillRect(18, 0, 28, 256)
  const tex = canvasTexture(canvas)
  textureCache.set(key, tex)
  return tex
}

export function createSky(scene) {
  const group = new THREE.Group()
  group.name = 'sky'
  const skyGeo = new THREE.SphereGeometry(180, 40, 24)
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color('#01020a') },
      midColor: { value: new THREE.Color('#081329') },
      bottomColor: { value: new THREE.Color('#170a2b') },
      glowColor: { value: new THREE.Color('#3c1d68') }
    },
    vertexShader: `
      varying vec3 vWorld;
      void main() {
        vWorld = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 bottomColor;
      uniform vec3 glowColor;
      varying vec3 vWorld;
      void main() {
        vec3 n = normalize(vWorld);
        float h = n.y;
        vec3 col = mix(bottomColor, midColor, smoothstep(-0.28, 0.18, h));
        col = mix(col, topColor, smoothstep(0.08, 0.78, h));
        float horizon = exp(-pow((h + 0.03) * 5.0, 2.0));
        col += glowColor * horizon * 0.45;
        float band = sin(n.x * 3.2 + n.z * 2.0) * 0.5 + 0.5;
        col += vec3(0.015, 0.03, 0.06) * band * smoothstep(-0.2, 0.3, h);
        gl_FragColor = vec4(col, 1.0);
      }
    `
  })
  group.add(new THREE.Mesh(skyGeo, skyMat))

  const starCount = 1700
  const positions = new Float32Array(starCount * 3)
  const colors = new Float32Array(starCount * 3)
  const starColor = new THREE.Color()
  for (let i = 0; i < starCount; i++) {
    const r = 120 + Math.random() * 55
    const theta = Math.random() * TAU
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.cos(phi)
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    starColor.setHSL(.52 + Math.random() * .18, .45 + Math.random() * .35, .62 + Math.random() * .35)
    colors[i * 3] = starColor.r
    colors[i * 3 + 1] = starColor.g
    colors[i * 3 + 2] = starColor.b
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: .62, vertexColors: true, transparent: true, opacity: .92,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
  }))
  group.add(stars)

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(17, 48, 32),
    new THREE.MeshStandardMaterial({
      color: '#15102f', emissive: '#271b58', emissiveIntensity: .34,
      roughness: .88, metalness: .15
    })
  )
  planet.position.set(-55, 35, -102)
  group.add(planet)

  const planetGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture('#7b5cff'), color: '#6f51ff', transparent: true,
    opacity: .26, depthWrite: false, blending: THREE.AdditiveBlending
  }))
  planetGlow.scale.set(60, 60, 1)
  planetGlow.position.copy(planet.position)
  group.add(planetGlow)

  const ringMat = new THREE.MeshBasicMaterial({
    color: '#8f76ff', transparent: true, opacity: .22,
    side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending
  })
  const ring1 = new THREE.Mesh(new THREE.RingGeometry(23, 28, 96), ringMat)
  ring1.position.copy(planet.position)
  ring1.rotation.set(1.15, -.2, .25)
  group.add(ring1)
  const ring2 = new THREE.Mesh(new THREE.RingGeometry(29.5, 30.2, 96), ringMat.clone())
  ring2.material.opacity = .12
  ring2.position.copy(planet.position)
  ring2.rotation.set(1.15, -.2, .25)
  group.add(ring2)

  const nebulaSpecs = [
    { color: '#ff4bd8', pos: [-82, 26, -82], scale: 80, opacity: .3 },
    { color: '#6df6ff', pos: [72, 18, -98], scale: 100, opacity: .22 },
    { color: '#8a5cff', pos: [10, 44, -125], scale: 120, opacity: .25 }
  ]
  for (const spec of nebulaSpecs) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeNebulaTexture(spec.color), color: spec.color, transparent: true,
      opacity: spec.opacity, depthWrite: false, blending: THREE.AdditiveBlending
    }))
    sprite.position.set(...spec.pos)
    sprite.scale.set(spec.scale, spec.scale, 1)
    group.add(sprite)
  }

  const cityMat = new THREE.MeshStandardMaterial({ color: '#060b17', roughness: .78, metalness: .3 })
  const city = new THREE.Group()
  for (let i = 0; i < 38; i++) {
    const angle = (i / 38) * TAU + Math.random() * .07
    const radius = 67 + Math.random() * 48
    const height = 8 + Math.random() * 48
    const width = 2 + Math.random() * 5
    const tower = new THREE.Mesh(new THREE.BoxGeometry(width, height, width), cityMat)
    tower.position.set(Math.cos(angle) * radius, height / 2 - 2, Math.sin(angle) * radius)
    tower.rotation.y = Math.random() * TAU
    city.add(tower)
    if (i % 3 === 0) {
      const stripMat = new THREE.MeshBasicMaterial({
        color: i % 2 ? '#2e7f9e' : '#7b2c75', transparent: true, opacity: .28
      })
      const strip = new THREE.Mesh(new THREE.BoxGeometry(.08, height * .7, .08), stripMat)
      strip.position.set(tower.position.x + width * .5, height * .45, tower.position.z)
      city.add(strip)
    }
  }
  group.add(city)

  const debrisGeo = new THREE.IcosahedronGeometry(1, 0)
  const debrisMat = new THREE.MeshStandardMaterial({ color: '#10172b', roughness: .62, metalness: .5 })
  const debris = new THREE.Group()
  for (let i = 0; i < 26; i++) {
    const rock = new THREE.Mesh(debrisGeo, debrisMat)
    const angle = Math.random() * TAU
    const radius = 39 + Math.random() * 34
    const s = .25 + Math.random() * 1.4
    rock.position.set(Math.cos(angle) * radius, 4 + Math.random() * 25, Math.sin(angle) * radius)
    rock.scale.set(s, s * (.6 + Math.random()), s)
    rock.rotation.set(Math.random() * TAU, Math.random() * TAU, Math.random() * TAU)
    rock.userData.spin = new THREE.Vector3((Math.random() - .5) * .12, (Math.random() - .5) * .15, (Math.random() - .5) * .12)
    debris.add(rock)
  }
  group.add(debris)
  group.userData.debris = debris
  scene.add(group)
  return group
}

export function createArena(scene) {
  const group = new THREE.Group()
  group.name = 'arena'
  const colliders = []

  const floorTex = makeFloorTexture()
  const floorMat = new THREE.MeshStandardMaterial({
    map: floorTex, color: '#b9d7e8', roughness: .34, metalness: .62,
    emissive: '#071727', emissiveIntensity: .38
  })
  const floor = new THREE.Mesh(new THREE.CircleGeometry(30.5, 128), floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  group.add(floor)

  const grid = new THREE.Mesh(
    new THREE.CircleGeometry(30.4, 128),
    new THREE.MeshBasicMaterial({
      map: makeGridTexture(), transparent: true, opacity: .5,
      depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    })
  )
  grid.rotation.x = -Math.PI / 2
  grid.position.y = .018
  group.add(grid)

  const rune = new THREE.Mesh(
    new THREE.CircleGeometry(5.2, 96),
    new THREE.MeshBasicMaterial({
      map: makeRuneTexture(), transparent: true, opacity: .42,
      depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    })
  )
  rune.rotation.x = -Math.PI / 2
  rune.position.y = .026
  group.add(rune)

  for (const [radius, color, opacity] of [[8.5, '#6df6ff', .34], [17.2, '#ff4bd8', .18], [26.7, '#6df6ff', .32], [30.1, '#ff4bd8', .42]]) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(radius - .045, radius + .045, 160),
      new THREE.MeshBasicMaterial({
        color, transparent: true, opacity, depthWrite: false,
        blending: THREE.AdditiveBlending, side: THREE.DoubleSide
      })
    )
    ring.rotation.x = -Math.PI / 2
    ring.position.y = .03
    group.add(ring)
  }

  const wallMat = new THREE.MeshStandardMaterial({
    color: '#050a14', roughness: .3, metalness: .86, side: THREE.DoubleSide
  })
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(31.1, 31.4, 1.5, 128, 1, true), wallMat)
  wall.position.y = .75
  wall.receiveShadow = true
  group.add(wall)

  const wallTrimMat = new THREE.MeshBasicMaterial({ color: '#6df6ff', transparent: true, opacity: .5 })
  const wallTrim = new THREE.Mesh(new THREE.TorusGeometry(31.12, .035, 8, 160), wallTrimMat)
  wallTrim.rotation.x = Math.PI / 2
  wallTrim.position.y = 1.52
  group.add(wallTrim)
  const wallTrim2 = new THREE.Mesh(new THREE.TorusGeometry(31.25, .025, 8, 160), new THREE.MeshBasicMaterial({ color: '#ff4bd8', transparent: true, opacity: .38 }))
  wallTrim2.rotation.x = Math.PI / 2
  wallTrim2.position.y = .18
  group.add(wallTrim2)

  const pillarMat = new THREE.MeshStandardMaterial({ color: '#080f1e', roughness: .28, metalness: .88 })
  const beaconMats = [
    new THREE.MeshBasicMaterial({ color: '#6df6ff' }),
    new THREE.MeshBasicMaterial({ color: '#ff4bd8' }),
    new THREE.MeshBasicMaterial({ color: '#9c73ff' })
  ]
  const pylons = new THREE.Group()
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * TAU + .1
    const height = 5 + ((i * 7) % 9)
    const x = Math.cos(angle) * 30.2
    const z = Math.sin(angle) * 30.2
    const pylon = new THREE.Group()
    pylon.position.set(x, 0, z)
    pylon.rotation.y = -angle + Math.PI / 2
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.1, 1.8), pillarMat)
    base.position.y = .55
    base.castShadow = true
    pylon.add(base)
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(.92, height, .92), pillarMat)
    shaft.position.y = height / 2 + 1
    shaft.castShadow = true
    pylon.add(shaft)
    const strip = new THREE.Mesh(new THREE.BoxGeometry(.08, height * .8, .08), beaconMats[i % 3])
    strip.position.set(0, height * .55 + 1, -.5)
    pylon.add(strip)
    const cap = new THREE.Mesh(new THREE.OctahedronGeometry(.3, 0), beaconMats[i % 3])
    cap.position.y = height + 1.15
    pylon.add(cap)
    if (i % 3 === 0) {
      const light = new THREE.PointLight(i % 2 ? '#ff4bd8' : '#6df6ff', 22, 25, 2)
      light.position.set(x * .93, 3.2, z * .93)
      pylon.add(light)
    }
    pylons.add(pylon)
  }
  group.add(pylons)
  group.userData.pylons = pylons

  const coverMat = new THREE.MeshStandardMaterial({ color: '#0a1322', roughness: .36, metalness: .74 })
  const coverSpecs = [
    { x: -7.5, z: 2.2, w: 3.4, h: 1.35, d: 1.7, r: .32, c: '#6df6ff' },
    { x: 8.1, z: -.8, w: 2.3, h: 1.9, d: 3.2, r: -.38, c: '#ff4bd8' },
    { x: -10.6, z: -7.8, w: 3.8, h: 1.1, d: 1.5, r: .72, c: '#ff4bd8' },
    { x: 11.8, z: -9.1, w: 1.7, h: 2.2, d: 2.5, r: .18, c: '#6df6ff' },
    { x: -3.8, z: -13.2, w: 2.8, h: 1.25, d: 2.2, r: -.28, c: '#9c73ff' },
    { x: 5.6, z: 9.8, w: 2.1, h: 1.05, d: 2.6, r: .44, c: '#6df6ff' },
    { x: -15.4, z: 8.1, w: 2.6, h: 1.6, d: 2.0, r: -.55, c: '#ff4bd8' },
    { x: 17.1, z: 6.2, w: 2.0, h: 1.35, d: 3.5, r: .28, c: '#6df6ff' }
  ]
  for (const spec of coverSpecs) {
    const cover = new THREE.Group()
    cover.position.set(spec.x, 0, spec.z)
    cover.rotation.y = spec.r
    const block = new THREE.Mesh(new THREE.BoxGeometry(spec.w, spec.h, spec.d), coverMat)
    block.position.y = spec.h / 2
    block.castShadow = true
    block.receiveShadow = true
    cover.add(block)
    const trim = new THREE.Mesh(new THREE.BoxGeometry(spec.w * .82, .035, .04), new THREE.MeshBasicMaterial({ color: spec.c, transparent: true, opacity: .72 }))
    trim.position.set(0, spec.h + .02, spec.d * .5)
    cover.add(trim)
    const trim2 = new THREE.Mesh(new THREE.BoxGeometry(.04, .035, spec.d * .78), new THREE.MeshBasicMaterial({ color: spec.c, transparent: true, opacity: .45 }))
    trim2.position.set(spec.w * .5, spec.h + .02, 0)
    cover.add(trim2)
    group.add(cover)
    colliders.push({ x: spec.x, z: spec.z, radius: Math.max(spec.w, spec.d) * .46 })
  }

  const holoTexts = [
    { text: 'FALE', color: '#6df6ff', angle: .25, y: 5.5 },
    { text: 'FORJE', color: '#ff4bd8', angle: 2.35, y: 6.5 },
    { text: 'SOBREVIVA', color: '#6df6ff', angle: 4.2, y: 5.9 }
  ]
  const holoPanels = []
  for (const spec of holoTexts) {
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 4),
      new THREE.MeshBasicMaterial({
        map: makeHoloTexture(spec.text, spec.color), color: spec.color, transparent: true,
        opacity: .2, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
      })
    )
    panel.position.set(Math.cos(spec.angle) * 26.5, spec.y, Math.sin(spec.angle) * 26.5)
    panel.lookAt(0, spec.y, 0)
    panel.userData.baseY = spec.y
    panel.userData.phase = Math.random() * TAU
    group.add(panel)
    holoPanels.push(panel)
  }
  group.userData.holoPanels = holoPanels

  const crystalMat = new THREE.MeshStandardMaterial({
    color: '#6df6ff', emissive: '#6df6ff', emissiveIntensity: 1.8,
    transparent: true, opacity: .7, roughness: .15, metalness: .3
  })
  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * TAU + .2
    const radius = 20 + (i % 4) * 2
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(.16 + (i % 3) * .07, 0), crystalMat)
    crystal.position.set(Math.cos(angle) * radius, .2 + (i % 5) * .18, Math.sin(angle) * radius)
    crystal.rotation.set(Math.random() * TAU, Math.random() * TAU, Math.random() * TAU)
    crystal.userData.baseY = crystal.position.y
    crystal.userData.phase = Math.random() * TAU
    group.add(crystal)
  }

  const hemi = new THREE.HemisphereLight('#7ab9dd', '#120724', .9)
  scene.add(hemi)
  const key = new THREE.DirectionalLight('#a9d5ff', 1.7)
  key.position.set(14, 22, 12)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.near = 1
  key.shadow.camera.far = 80
  key.shadow.camera.left = -36
  key.shadow.camera.right = 36
  key.shadow.camera.top = 36
  key.shadow.camera.bottom = -36
  key.shadow.bias = -.0004
  scene.add(key)
  const rim = new THREE.DirectionalLight('#7c4bff', .85)
  rim.position.set(-16, 8, -18)
  scene.add(rim)
  const fill = new THREE.PointLight('#ff4bd8', 35, 38, 2)
  fill.position.set(18, 5, 8)
  scene.add(fill)
  const fill2 = new THREE.PointLight('#6df6ff', 30, 32, 2)
  fill2.position.set(-18, 4, -9)
  scene.add(fill2)

  scene.add(group)
  group.userData.colliders = colliders
  return group
}

function getGeo(key, factory) {
  if (!geometryCache.has(key)) geometryCache.set(key, factory())
  return geometryCache.get(key)
}

export function createWeaponModel(weapon, { display = false } = {}) {
  const group = new THREE.Group()
  const body = new THREE.Group()
  group.add(body)
  const materials = []
  const makeMat = options => {
    const mat = new THREE.MeshStandardMaterial(options)
    materials.push(mat)
    return mat
  }
  const dark = makeMat(display
    ? { color: '#4d6f95', metalness: .2, roughness: .58 }
    : { color: '#18293f', metalness: .32, roughness: .5 })
  const metal = makeMat(display
    ? { color: '#7fa2c4', metalness: .2, roughness: .55 }
    : { color: '#35506f', metalness: .28, roughness: .52 })
  const grip = makeMat({ color: '#0b111b', metalness: .3, roughness: .78 })
  const accent = makeMat({
    color: weapon.color, emissive: weapon.color, emissiveIntensity: display ? 1.8 : 1.35,
    metalness: .25, roughness: .16
  })
  const accentDim = makeMat({
    color: weapon.color, emissive: weapon.color, emissiveIntensity: display ? .8 : .6,
    metalness: .4, roughness: .28, transparent: true, opacity: .85
  })
  const add = (geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => {
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(x, y, z)
    mesh.rotation.set(rx, ry, rz)
    body.add(mesh)
    return mesh
  }
  const box = (w, h, d, x, y, z, mat = dark, rx = 0, ry = 0, rz = 0) =>
    add(new THREE.BoxGeometry(w, h, d), mat, x, y, z, rx, ry, rz)
  const cyl = (r1, r2, len, x, y, z, mat = metal, rx = Math.PI / 2) =>
    add(new THREE.CylinderGeometry(r1, r2, len, 16), mat, x, y, z, rx)
  const torus = (radius, tube, x, y, z, mat = accent, rx = 0, ry = 0, rz = 0) =>
    add(new THREE.TorusGeometry(radius, tube, 8, 32), mat, x, y, z, rx, ry, rz)
  const crystal = (x, y, z, s = .11, mat = accent) =>
    add(new THREE.OctahedronGeometry(s, 0), mat, x, y, z, .1, .4, 0)

  const model = weapon.archetypeKey || weapon.archetype?.key || 'rifle'
  const s = weapon.size || 1
  let muzzleZ = -.8
  let corePos = new THREE.Vector3(0, .12, -.15)

  if (model === 'pistol') {
    box(.19 * s, .16 * s, .43 * s, 0, 0, -.12)
    box(.15 * s, .2 * s, .12 * s, 0, -.13 * s, .09, grip, -.24)
    box(.11 * s, .14 * s, .1 * s, 0, -.13 * s, -.08, metal, -.05)
    cyl(.033, .036, .46 * s, 0, .018, -.5 * s)
    box(.04, .04, .24, 0, .11 * s, -.12, metal)
    crystal(0, .13 * s, -.12, .08 * s)
    torus(.1 * s, .009, 0, .13 * s, -.12, accent, Math.PI / 2)
    muzzleZ = -.77 * s
  } else if (model === 'rifle' || model === 'default') {
    box(.22 * s, .19 * s, .82 * s, 0, 0, -.1)
    box(.16 * s, .15 * s, .32 * s, 0, -.01, .38, metal)
    box(.11 * s, .21 * s, .13 * s, 0, -.16 * s, -.08, grip, -.18)
    box(.1 * s, .22 * s, .16 * s, 0, -.15 * s, -.3, metal, .18)
    cyl(.028, .032, .78 * s, 0, .022, -.78 * s)
    box(.06 * s, .045 * s, .3 * s, 0, .13 * s, -.1, metal)
    box(.07 * s, .055 * s, .26 * s, 0, .17 * s, -.04, accentDim)
    crystal(0, .135 * s, -.16, .1 * s)
    torus(.12 * s, .009, 0, .135 * s, -.16, accent, Math.PI / 2)
    box(.015, .035, .62, .115 * s, 0, -.22, accent)
    box(.015, .035, .45, -.115 * s, 0, -.28, accentDim)
    muzzleZ = -1.18 * s
  } else if (model === 'smg') {
    box(.21 * s, .17 * s, .52 * s, 0, 0, -.05)
    box(.09 * s, .19 * s, .12 * s, 0, -.15 * s, .02, grip, -.2)
    box(.09 * s, .25 * s, .13 * s, 0, -.16 * s, -.17, metal, .12)
    cyl(.028, .03, .3 * s, 0, .02, -.47 * s)
    box(.14 * s, .05 * s, .24 * s, 0, .11 * s, -.03, accentDim)
    crystal(0, .13 * s, -.08, .08 * s)
    muzzleZ = -.66 * s
  } else if (model === 'shotgun') {
    box(.26 * s, .19 * s, .65 * s, 0, 0, -.04)
    box(.18 * s, .16 * s, .32 * s, 0, -.02, .4, grip)
    cyl(.042, .045, .72 * s, -.065, .035, -.7 * s)
    cyl(.042, .045, .72 * s, .065, .035, -.7 * s)
    box(.22 * s, .07 * s, .24 * s, 0, -.06 * s, -.38, metal)
    box(.16 * s, .05 * s, .34 * s, 0, .11 * s, -.14, accentDim)
    crystal(0, .145 * s, -.13, .09 * s)
    torus(.15 * s, .01, 0, .145 * s, -.13, accent, Math.PI / 2)
    muzzleZ = -1.1 * s
  } else if (model === 'sniper') {
    box(.2 * s, .18 * s, .9 * s, 0, 0, -.02)
    box(.16 * s, .16 * s, .38 * s, 0, -.02, .46, grip)
    box(.1 * s, .2 * s, .14 * s, 0, -.16 * s, .04, grip, -.18)
    cyl(.026, .03, 1.02 * s, 0, .02, -.94 * s)
    cyl(.06, .06, .36 * s, 0, .16 * s, -.1, metal)
    cyl(.075, .075, .04 * s, 0, .16 * s, -.3, accentDim)
    cyl(.075, .075, .04 * s, 0, .16 * s, .1, accentDim)
    box(.05 * s, .05 * s, .48 * s, 0, .13 * s, -.55, metal)
    crystal(0, .13 * s, -.5, .075 * s)
    muzzleZ = -1.48 * s
  } else if (model === 'cannon' || model === 'launcher') {
    cyl(.16 * s, .19 * s, .9 * s, 0, .02, -.24, metal)
    cyl(.13 * s, .14 * s, .4 * s, 0, .02, -.75 * s, dark)
    torus(.18 * s, .028, 0, .02, -.94 * s, accent)
    box(.3 * s, .14 * s, .32 * s, 0, -.13 * s, -.02, dark)
    box(.1 * s, .2 * s, .14 * s, 0, -.18 * s, .16, grip, -.2)
    box(.12 * s, .12 * s, .4 * s, -.22 * s, .04, -.2, accentDim)
    box(.12 * s, .12 * s, .4 * s, .22 * s, .04, -.2, accentDim)
    crystal(0, .2 * s, -.3, .13 * s)
    torus(.2 * s, .012, 0, .2 * s, -.3, accent, Math.PI / 2)
    muzzleZ = -1.16 * s
  } else if (model === 'bow') {
    box(.1 * s, .26 * s, .14 * s, 0, -.02, -.02, grip)
    box(.18 * s, .05 * s, .18 * s, 0, .08 * s, -.02, metal)
    add(new THREE.TorusGeometry(.62 * s, .025, 8, 32, Math.PI * 1.08), accent, 0, .25 * s, -.22, 0, 0, Math.PI * .46)
    add(new THREE.TorusGeometry(.62 * s, .025, 8, 32, Math.PI * 1.08), accentDim, 0, -.25 * s, -.22, 0, 0, -Math.PI * .46)
    const stringGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, .8 * s, -.22), new THREE.Vector3(0, -.8 * s, -.22)
    ])
    const string = new THREE.Line(stringGeo, new THREE.LineBasicMaterial({ color: weapon.color, transparent: true, opacity: .55 }))
    body.add(string)
    crystal(0, 0, -.3, .1 * s)
    muzzleZ = -.8 * s
  } else if (model === 'staff') {
    cyl(.025, .035, 1.25 * s, 0, 0, -.25, metal)
    box(.12 * s, .12 * s, .2 * s, 0, 0, .22, grip)
    crystal(0, 0, -.98 * s, .16 * s)
    torus(.22 * s, .012, 0, 0, -.98 * s, accent, Math.PI / 2)
    torus(.28 * s, .008, 0, 0, -.98 * s, accentDim, Math.PI / 2)
    for (let i = 0; i < 3; i++) {
      const ring = torus(.18 * s + i * .03, .006, 0, 0, -.98 * s, accentDim, Math.PI / 2 + i * .35, i * .5, 0)
      ring.rotation.z = i * .4
    }
    muzzleZ = -1.2 * s
  } else if (model === 'gauntlet') {
    box(.29 * s, .23 * s, .28 * s, 0, -.02, -.12, metal)
    box(.31 * s, .1 * s, .3 * s, 0, .09 * s, -.12, dark)
    box(.08 * s, .08 * s, .1 * s, -.11 * s, .02, -.3, accent)
    box(.08 * s, .08 * s, .1 * s, 0, .02, -.32, accent)
    box(.08 * s, .08 * s, .1 * s, .11 * s, .02, -.3, accentDim)
    crystal(0, .13 * s, -.1, .1 * s)
    muzzleZ = -.46 * s
  } else if (model === 'blade') {
    box(.07 * s, .07 * s, .3 * s, 0, -.02, .08, grip)
    box(.26 * s, .05 * s, .07 * s, 0, .02, -.1, metal)
    box(.07 * s, .015 * s, .9 * s, 0, .02, -.58, accentDim)
    box(.025 * s, .012 * s, .9 * s, 0, .03, -.58, accent)
    crystal(0, .03, -.1, .075 * s)
    muzzleZ = -1.0 * s
  } else {
    box(.22, .19, .7, 0, 0, -.1)
    cyl(.03, .034, .6, 0, .02, -.65)
    crystal(0, .13, -.1, .1)
    muzzleZ = -.98
  }

  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, .02, muzzleZ)
  group.add(muzzle)

  const flashMat = new THREE.SpriteMaterial({
    map: glowTexture(weapon.color), color: weapon.color, transparent: true,
    opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
  })
  const flash = new THREE.Sprite(flashMat)
  flash.scale.set(.65, .65, 1)
  flash.position.copy(muzzle.position)
  flash.visible = false
  group.add(flash)

  const light = new THREE.PointLight(weapon.color, 0, 4.5, 2)
  light.position.copy(muzzle.position)
  group.add(light)

  const viewLight = new THREE.PointLight('#c8f4ff', 1.0, 2.6, 2)
  viewLight.position.set(0, .5, .55)
  group.add(viewLight)

  const spinRing = new THREE.Group()
  spinRing.position.copy(corePos)
  group.add(spinRing)
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(.11 * s, .005, 6, 32), accent)
  spinRing.add(ringA)
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(.135 * s, .0035, 6, 32), accentDim)
  ringB.rotation.set(Math.PI / 2.4, 0, .4)
  spinRing.add(ringB)

  const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(weapon.color), color: weapon.color, transparent: true,
    opacity: .16, depthWrite: false, blending: THREE.AdditiveBlending
  }))
  coreGlow.position.copy(corePos)
  coreGlow.scale.set(.1 * s, .1 * s, 1)
  group.add(coreGlow)

  group.userData = {
    muzzle,
    muzzleFlash: flash,
    muzzleLight: light,
    spinRing,
    coreGlow,
    accentMat: accent,
    materials,
    model,
    baseZ: muzzleZ
  }
  group.traverse(obj => {
    if (obj.isMesh) obj.frustumCulled = false
  })
  return group
}

export function createEnemyModel(type = 'drone', color = '#ff526d', scale = 1) {
  const group = new THREE.Group()
  const body = new THREE.Group()
  group.add(body)
  const coreMat = new THREE.MeshStandardMaterial({
    color: '#1a0710', emissive: color, emissiveIntensity: 2.4,
    roughness: .25, metalness: .45
  })
  const shellMat = new THREE.MeshStandardMaterial({
    color: '#0a0d18', metalness: .9, roughness: .22
  })
  const trimMat = new THREE.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: 1.2, metalness: .3, roughness: .25,
    transparent: true, opacity: .8
  })
  const topGeo = getGeo('enemy-top', () => new THREE.ConeGeometry(.78, 1.15, 4, 1, false))
  const bottomGeo = getGeo('enemy-bottom', () => new THREE.ConeGeometry(.78, 1.15, 4, 1, false))
  const coreGeo = getGeo('enemy-core', () => new THREE.IcosahedronGeometry(.52, 1))
  const ringGeo = getGeo('enemy-ring', () => new THREE.TorusGeometry(1.04, .026, 6, 48))
  const shardGeo = getGeo('enemy-shard', () => new THREE.TetrahedronGeometry(.23, 0))
  const eyeGeo = getGeo('enemy-eye', () => new THREE.SphereGeometry(.1, 8, 8))

  const top = new THREE.Mesh(topGeo, shellMat)
  top.position.y = .8
  top.rotation.y = Math.PI / 4
  body.add(top)
  const bottom = new THREE.Mesh(bottomGeo, shellMat)
  bottom.position.y = -.8
  bottom.rotation.set(Math.PI, Math.PI / 4, 0)
  body.add(bottom)
  const core = new THREE.Mesh(coreGeo, coreMat)
  body.add(core)
  const ring = new THREE.Mesh(ringGeo, trimMat)
  ring.rotation.x = Math.PI / 2
  body.add(ring)
  const ring2 = new THREE.Mesh(ringGeo, trimMat)
  ring2.rotation.set(Math.PI / 2, 0, Math.PI / 2)
  ring2.scale.setScalar(.78)
  body.add(ring2)
  const eye = new THREE.Mesh(eyeGeo, new THREE.MeshBasicMaterial({ color: '#fff2f5' }))
  eye.position.set(0, 0, .48)
  body.add(eye)
  const shards = []
  for (let i = 0; i < 4; i++) {
    const shard = new THREE.Mesh(shardGeo, trimMat)
    const a = (i / 4) * TAU
    shard.position.set(Math.cos(a) * 1.25, Math.sin(a) * .2, Math.sin(a) * 1.25)
    shard.userData.phase = a
    body.add(shard)
    shards.push(shard)
  }
  if (type === 'boss') {
    const outer = new THREE.Mesh(ringGeo, trimMat)
    outer.scale.setScalar(1.45)
    outer.rotation.set(Math.PI / 3, .2, .5)
    body.add(outer)
    for (let i = 0; i < 6; i++) {
      const spike = new THREE.Mesh(getGeo('enemy-spike', () => new THREE.ConeGeometry(.12, .9, 4)), shellMat)
      const a = (i / 6) * TAU
      spike.position.set(Math.cos(a) * 1.45, 0, Math.sin(a) * 1.45)
      spike.rotation.set(Math.PI / 2, 0, -a)
      body.add(spike)
    }
  }
  group.scale.setScalar(scale)
  group.userData = { type, core, coreMat, shellMat, trimMat, ring, ring2, shards, eye, body, radius: 1.05 * scale, color }
  return group
}

export function createMenuDisplay(weapon) {
  const group = new THREE.Group()
  group.position.set(7.2, 2.9, 0)
  const weaponModel = createWeaponModel(weapon, { display: true })
  weaponModel.scale.setScalar(2.7)
  weaponModel.rotation.set(.15, -.55, .08)
  group.add(weaponModel)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(weapon.color), color: weapon.color, transparent: true,
    opacity: .15, depthWrite: false, blending: THREE.AdditiveBlending
  }))
  glow.scale.set(6.5, 6.5, 1)
  group.add(glow)
  const rings = new THREE.Group()
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i === 1 ? '#ff4bd8' : weapon.color, transparent: true,
      opacity: .28 - i * .05, depthWrite: false, blending: THREE.AdditiveBlending
    })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.6 + i * .55, .018, 6, 96), mat)
    ring.rotation.set(Math.PI / 2 + i * .3, i * .5, i * .2)
    rings.add(ring)
  }
  group.add(rings)
  const pedestal = new THREE.Mesh(
    new THREE.TorusGeometry(3.1, .03, 8, 96),
    new THREE.MeshBasicMaterial({ color: weapon.color, transparent: true, opacity: .5, depthWrite: false, blending: THREE.AdditiveBlending })
  )
  pedestal.rotation.x = Math.PI / 2
  pedestal.position.y = -2.8
  group.add(pedestal)
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(1.3, 2.8, 6.2, 32, 1, true),
    new THREE.MeshBasicMaterial({
      map: makeBeamTexture(weapon.color), color: weapon.color, transparent: true,
      opacity: .09, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    })
  )
  beam.position.y = -.5
  group.add(beam)
  const light = new THREE.PointLight(weapon.color, 9, 12, 2)
  light.position.set(0, .4, 0)
  group.add(light)
  group.userData = { weaponModel, rings, glow, beam, pedestal }
  return group
}

export function createProjectileMesh(weapon, type) {
  const group = new THREE.Group()
  const color = weapon.color
  const coreMat = new THREE.MeshBasicMaterial({ color: '#ffffff' })
  const tintMat = new THREE.MeshBasicMaterial({ color })
  let core
  if (type === 'rocket') {
    core = new THREE.Mesh(getGeo('proj-rocket', () => {
      const geo = new THREE.ConeGeometry(.11, .42, 10)
      geo.rotateX(Math.PI / 2)
      return geo
    }), tintMat)
    const ring = new THREE.Mesh(getGeo('proj-rocket-ring', () => new THREE.TorusGeometry(.13, .015, 6, 20)), coreMat)
    ring.position.z = -.18
    group.add(ring)
  } else if (type === 'arrow') {
    core = new THREE.Mesh(getGeo('proj-arrow', () => {
      const geo = new THREE.CylinderGeometry(.018, .018, .72, 8)
      geo.rotateX(Math.PI / 2)
      return geo
    }), tintMat)
    const tip = new THREE.Mesh(getGeo('proj-tip', () => new THREE.ConeGeometry(.06, .16, 8)), coreMat)
    tip.position.z = .42
    tip.rotation.x = Math.PI / 2
    group.add(tip)
  } else if (type === 'disc') {
    core = new THREE.Mesh(getGeo('proj-disc', () => new THREE.TorusGeometry(.17, .035, 8, 24)), tintMat)
  } else if (type === 'pellet') {
    core = new THREE.Mesh(getGeo('proj-pellet', () => new THREE.SphereGeometry(.055, 8, 8)), tintMat)
  } else if (type === 'beam') {
    core = new THREE.Mesh(getGeo('proj-beam', () => {
      const geo = new THREE.CylinderGeometry(.035, .035, 1.5, 8)
      geo.rotateX(Math.PI / 2)
      return geo
    }), tintMat)
  } else {
    core = new THREE.Mesh(getGeo('proj-orb', () => new THREE.SphereGeometry(.105, 12, 12)), tintMat)
  }
  group.add(core)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(color), color, transparent: true, opacity: .9,
    depthWrite: false, blending: THREE.AdditiveBlending
  }))
  glow.scale.setScalar(type === 'rocket' ? 1.05 : type === 'pellet' ? .32 : .62)
  group.add(glow)
  group.userData = { core, glow, color }
  return group
}

export class ParticleField {
  constructor(scene, max = 1400) {
    this.max = max
    this.cursor = 0
    this.positions = new Float32Array(max * 3)
    this.colors = new Float32Array(max * 3)
    this.sizes = new Float32Array(max)
    this.alphas = new Float32Array(max)
    this.velocities = new Float32Array(max * 3)
    this.life = new Float32Array(max)
    this.maxLife = new Float32Array(max)
    this.drag = new Float32Array(max)
    this.gravity = new Float32Array(max)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1))
    const mat = new THREE.ShaderMaterial({
      uniforms: { uMap: { value: glowTexture('#ffffff') } },
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (430.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec4 tex = texture2D(uMap, gl_PointCoord);
          gl_FragColor = vec4(vColor, tex.a * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
    this.points = new THREE.Points(geo, mat)
    this.points.frustumCulled = false
    this.geometry = geo
    scene.add(this.points)
    this._color = new THREE.Color()
  }

  spawnOne(position, color, velocity, options = {}) {
    const i = this.cursor
    this.cursor = (this.cursor + 1) % this.max
    const i3 = i * 3
    this.positions[i3] = position.x
    this.positions[i3 + 1] = position.y
    this.positions[i3 + 2] = position.z
    this._color.set(color)
    this.colors[i3] = this._color.r
    this.colors[i3 + 1] = this._color.g
    this.colors[i3 + 2] = this._color.b
    this.sizes[i] = options.size ?? .16
    this.alphas[i] = 1
    this.velocities[i3] = velocity.x
    this.velocities[i3 + 1] = velocity.y
    this.velocities[i3 + 2] = velocity.z
    this.life[i] = this.maxLife[i] = options.life ?? .65
    this.drag[i] = options.drag ?? .93
    this.gravity[i] = options.gravity ?? 0
  }

  spawn(position, color, count = 12, options = {}) {
    const speed = options.speed ?? 4
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * TAU
      const phi = Math.acos(2 * Math.random() - 1)
      const mag = speed * (.35 + Math.random() * .9)
      const velocity = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * mag,
        Math.cos(phi) * mag + (options.up ?? 0),
        Math.sin(phi) * Math.sin(theta) * mag
      )
      this.spawnOne(position, color, velocity, {
        ...options,
        size: (options.size ?? .16) * (.55 + Math.random() * .8),
        life: (options.life ?? .65) * (.55 + Math.random() * .8)
      })
    }
  }

  update(dt) {
    for (let i = 0; i < this.max; i++) {
      if (this.life[i] <= 0) {
        if (this.alphas[i] !== 0) this.alphas[i] = 0
        continue
      }
      this.life[i] -= dt
      const i3 = i * 3
      const drag = Math.pow(this.drag[i], dt * 60)
      this.velocities[i3] *= drag
      this.velocities[i3 + 1] = this.velocities[i3 + 1] * drag - this.gravity[i] * dt
      this.velocities[i3 + 2] *= drag
      this.positions[i3] += this.velocities[i3] * dt
      this.positions[i3 + 1] += this.velocities[i3 + 1] * dt
      this.positions[i3 + 2] += this.velocities[i3 + 2] * dt
      this.alphas[i] = Math.max(0, this.life[i] / this.maxLife[i])
    }
    this.geometry.attributes.position.needsUpdate = true
    this.geometry.attributes.aColor.needsUpdate = true
    this.geometry.attributes.aSize.needsUpdate = true
    this.geometry.attributes.aAlpha.needsUpdate = true
  }

  clear() {
    this.life.fill(0)
    this.alphas.fill(0)
    this.geometry.attributes.aAlpha.needsUpdate = true
  }
}

export function disposeObject(object, disposeGeometry = false) {
  if (!object) return
  object.traverse(obj => {
    if (obj.geometry && disposeGeometry) obj.geometry.dispose?.()
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      for (const mat of mats) {
        if (mat.map && mat.userData?.ownedTexture) mat.map.dispose?.()
        mat.dispose?.()
      }
    }
  })
}
