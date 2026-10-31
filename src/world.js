import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

/* ─────────────────────────────────────────────────────────────
   BRASA — procedural world
   Every texture, mesh, and shader below is generated at runtime.
   ───────────────────────────────────────────────────────────── */

const TAU = Math.PI * 2

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function canvas2d(w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return { c, x: c.getContext('2d') }
}

function textureFrom(canvas, { repeat = [1, 1], srgb = true } = {}) {
  const t = new THREE.CanvasTexture(canvas)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(repeat[0], repeat[1])
  t.anisotropy = 8
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  t.needsUpdate = true
  return t
}

function glowTexture() {
  const { c, x } = canvas2d(128, 128)
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 62)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.18, 'rgba(255,255,255,0.85)')
  g.addColorStop(0.5, 'rgba(255,255,255,0.2)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g
  x.fillRect(0, 0, 128, 128)
  return textureFrom(c, { srgb: false })
}

/* ── Copacabana calçada ─────────────────────────────────────── */
function calcadaTexture() {
  const S = 512
  const { c, x } = canvas2d(S, S)
  x.fillStyle = '#e7ddc6'
  x.fillRect(0, 0, S, S)
  // stone grain
  for (let i = 0; i < 2200; i++) {
    const v = Math.random() * 22
    x.fillStyle = `rgba(${70 + v},${62 + v},${48 + v},${0.025 + Math.random() * 0.04})`
    x.fillRect(Math.random() * S, Math.random() * S, 1.4, 1.4)
  }

  // tileable wave bands (each band is stroked three times so the seam wraps)
  const ink = '#241f17'
  function band(base, amp, width, phase, freq) {
    x.strokeStyle = ink
    x.lineWidth = width
    x.lineCap = 'butt'
    for (const oy of [-S, 0, S]) {
      x.beginPath()
      for (let px = 0; px <= S; px += 3) {
        const py = base + oy + Math.sin((px / S) * TAU * freq + phase) * amp
        if (px === 0) x.moveTo(px, py)
        else x.lineTo(px, py)
      }
      x.stroke()
    }
  }
  band(104, 30, 42, 0, 1)
  band(104, 30, 10, 1.35, 2)
  band(300, 24, 36, Math.PI, 1)
  band(300, 24, 9, Math.PI + 1.2, 2)

  // stone joints
  x.strokeStyle = 'rgba(20,17,14,0.16)'
  x.lineWidth = 1.2
  for (let i = 0; i <= 8; i++) {
    x.beginPath()
    x.moveTo(0, (S / 8) * i)
    x.lineTo(S, (S / 8) * i)
    x.stroke()
    x.beginPath()
    x.moveTo((S / 8) * i, 0)
    x.lineTo((S / 8) * i, S)
    x.stroke()
  }
  return textureFrom(c, { repeat: [14, 13] })
}

function sandTexture() {
  const { c, x } = canvas2d(256, 256)
  x.fillStyle = '#b9a078'
  x.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 3200; i++) {
    const v = Math.random()
    x.fillStyle = v > 0.6 ? `rgba(90,72,48,${0.06 + Math.random() * 0.15})` : `rgba(255,240,205,${0.05 + Math.random() * 0.16})`
    x.fillRect(Math.random() * 256, Math.random() * 256, 1, 1)
  }
  return textureFrom(c, { repeat: [22, 22] })
}

function asphaltTexture() {
  const { c, x } = canvas2d(256, 256)
  x.fillStyle = '#2b2c27'
  x.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 5000; i++) {
    const v = Math.random() * 40
    x.fillStyle = `rgba(${v + 20},${v + 20},${v + 17},${0.12 + Math.random() * 0.2})`
    x.fillRect(Math.random() * 256, Math.random() * 256, 1.2, 1.2)
  }
  x.strokeStyle = 'rgba(230,220,190,0.15)'
  x.lineWidth = 2
  x.setLineDash([14, 18])
  x.beginPath()
  x.moveTo(128, 0)
  x.lineTo(128, 256)
  x.stroke()
  return textureFrom(c, { repeat: [3, 12] })
}

/* ── Graffiti mural ─────────────────────────────────────────── */
function graffitiTexture() {
  const W = 1024
  const H = 512
  const { c, x } = canvas2d(W, H)
  const bg = x.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#12231d')
  bg.addColorStop(0.55, '#1b2e28')
  bg.addColorStop(1, '#101d19')
  x.fillStyle = bg
  x.fillRect(0, 0, W, H)

  // spray texture
  for (let i = 0; i < 2600; i++) {
    x.fillStyle = `rgba(255,255,255,${Math.random() * 0.035})`
    x.beginPath()
    x.arc(Math.random() * W, Math.random() * H, Math.random() * 1.8, 0, TAU)
    x.fill()
  }

  // big sun
  const sunGrad = x.createRadialGradient(215, 210, 10, 215, 210, 150)
  sunGrad.addColorStop(0, '#ffe08a')
  sunGrad.addColorStop(0.55, '#ffb703')
  sunGrad.addColorStop(1, 'rgba(255,93,58,0)')
  x.fillStyle = sunGrad
  x.beginPath()
  x.arc(215, 210, 150, 0, TAU)
  x.fill()
  x.strokeStyle = '#ffb703'
  x.lineWidth = 10
  x.beginPath()
  x.arc(215, 210, 118, 0, TAU)
  x.stroke()

  // stylized toucan silhouette
  x.save()
  x.translate(640, 270)
  x.fillStyle = '#0a100d'
  x.beginPath()
  x.ellipse(0, 0, 112, 86, -0.25, 0, TAU)
  x.fill()
  x.beginPath()
  x.arc(80, -80, 58, 0, TAU)
  x.fill()
  x.beginPath()
  x.moveTo(122, -100)
  x.quadraticCurveTo(225, -78, 180, -24)
  x.quadraticCurveTo(142, -20, 120, -52)
  x.closePath()
  x.fillStyle = '#ff8a1f'
  x.fill()
  x.beginPath()
  x.moveTo(130, -98)
  x.quadraticCurveTo(192, -86, 174, -48)
  x.quadraticCurveTo(148, -50, 130, -68)
  x.closePath()
  x.fillStyle = '#ffd166'
  x.fill()
  x.fillStyle = '#f4ecd8'
  x.beginPath()
  x.arc(88, -94, 17, 0, TAU)
  x.fill()
  x.fillStyle = '#0a100d'
  x.beginPath()
  x.arc(91, -96, 8, 0, TAU)
  x.fill()
  x.fillStyle = 'rgba(39,224,184,0.9)'
  x.beginPath()
  x.ellipse(10, 4, 60, 46, -0.25, 0, TAU)
  x.fill()
  x.restore()

  // waves
  x.strokeStyle = '#27e0b8'
  x.lineWidth = 8
  x.lineCap = 'round'
  for (let i = 0; i < 4; i++) {
    x.beginPath()
    const y = 396 + i * 22
    x.moveTo(400, y)
    x.bezierCurveTo(470, y - 26, 530, y + 24, 600, y)
    x.bezierCurveTo(670, y - 26, 730, y + 24, 800, y)
    x.strokeStyle = i % 2 ? '#ff5d3a' : '#27e0b8'
    x.stroke()
  }

  // typography
  x.save()
  x.translate(72, 372)
  x.rotate(-0.045)
  x.font = '900 82px "Arial Black", Impact, sans-serif'
  x.fillStyle = '#f4ecd8'
  x.shadowColor = 'rgba(255,183,3,0.7)'
  x.shadowBlur = 22
  x.fillText('A PRAÇA', 0, 0)
  x.fillStyle = '#ffb703'
  x.fillText('RESISTE', 0, 78)
  x.restore()

  // tag
  x.save()
  x.translate(770, 90)
  x.rotate(0.12)
  x.font = 'italic 700 54px "Arial Black", Impact, sans-serif'
  x.fillStyle = 'rgba(39,224,184,0.9)'
  x.fillText('BRASA', 0, 0)
  x.font = '600 20px Arial, sans-serif'
  x.fillStyle = 'rgba(244,236,216,0.6)'
  x.fillText('PRAÇA DO SOL · 2126', 4, 30)
  x.restore()

  // splashes
  const cols = ['#ffb703', '#ff5d3a', '#27e0b8', '#f4ecd8']
  for (let i = 0; i < 26; i++) {
    x.fillStyle = cols[i % cols.length]
    x.globalAlpha = 0.25 + Math.random() * 0.5
    x.beginPath()
    x.arc(Math.random() * W, Math.random() * H, Math.random() * 9, 0, TAU)
    x.fill()
  }
  x.globalAlpha = 1
  return textureFrom(c)
}

function neonTexture(text, color = '#ffb703', sub = '') {
  const W = 1024
  const H = 256
  const { c, x } = canvas2d(W, H)
  x.clearRect(0, 0, W, H)
  x.textAlign = 'center'
  x.textBaseline = 'middle'
  const draw = (fill) => {
    x.shadowColor = color
    x.shadowBlur = 34
    x.fillStyle = fill
    x.font = '900 112px "Arial Black", Impact, sans-serif'
    x.fillText(text, W / 2, sub ? 104 : 128)
    if (sub) {
      x.shadowBlur = 16
      x.font = '600 28px Arial, sans-serif'
      x.fillText(sub, W / 2, 190)
    }
  }
  draw(color)
  draw('#fff8e0')
  x.shadowBlur = 0
  return textureFrom(c)
}

function glowSprite(color, scale, opacity = 1) {
  const map = glowTexture()
  const mat = new THREE.SpriteMaterial({
    map,
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  })
  const s = new THREE.Sprite(mat)
  s.scale.set(scale, scale, 1)
  return s
}

/* ── Sky shader ─────────────────────────────────────────────── */
const skyVert = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const skyFrag = /* glsl */ `
  precision highp float;
  varying vec3 vWorld;
  uniform vec3 uSun;
  uniform float uTime;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 dir = normalize(vWorld - cameraPosition);
    float h = clamp(dir.y, -0.12, 1.0);
    float up = smoothstep(-0.02, 0.55, h);
    float horizon = smoothstep(0.0, 0.22, h);

    vec3 low = vec3(0.98, 0.43, 0.22);
    vec3 mid = vec3(0.85, 0.29, 0.28);
    vec3 high = vec3(0.16, 0.11, 0.24);
    vec3 top = vec3(0.025, 0.075, 0.105);

    vec3 col = mix(low, mid, smoothstep(0.0, 0.24, h));
    col = mix(col, high, smoothstep(0.18, 0.5, h));
    col = mix(col, top, smoothstep(0.45, 0.95, h));
    col = mix(col, vec3(0.52, 0.26, 0.26), (1.0 - horizon) * 0.32);

    // sun
    float sd = max(dot(dir, uSun), 0.0);
    float disc = smoothstep(0.99965, 0.9999, sd);
    float glow = pow(sd, 22.0) * 0.55 + pow(sd, 4.0) * 0.13;
    vec3 sunCol = mix(vec3(1.0, 0.55, 0.2), vec3(1.0, 0.93, 0.72), disc);
    col += sunCol * glow;
    col += vec3(1.0, 0.9, 0.68) * disc * 1.15;

    // clouds near horizon
    float cloudMask = smoothstep(-0.02, 0.08, dir.y) * (1.0 - smoothstep(0.28, 0.6, dir.y));
    vec3 cp = vec3(dir.x * 2.4, dir.y * 5.5, dir.z * 2.4);
    cp.x += uTime * 0.0035;
    float cl = fbm(cp + vec3(0.0, 0.0, 1.0));
    cl = smoothstep(0.48, 0.72, cl);
    vec3 cloudCol = mix(vec3(0.27, 0.14, 0.21), vec3(1.0, 0.54, 0.3), pow(sd, 2.0));
    cloudCol = mix(cloudCol, vec3(0.78, 0.42, 0.34), horizon * 0.4);
    col = mix(col, cloudCol, cl * cloudMask * 0.92);

    // thin high clouds
    float hi = fbm(vec3(dir.x * 4.5, dir.y * 10.0 + 2.0, dir.z * 4.5));
    hi = smoothstep(0.6, 0.8, hi) * smoothstep(0.18, 0.45, dir.y) * (1.0 - smoothstep(0.65, 0.95, dir.y));
    col += vec3(0.8, 0.42, 0.43) * hi * 0.18;

    // stars
    vec3 sp = dir * 260.0;
    float star = step(0.9975, hash(floor(sp)));
    star *= smoothstep(0.22, 0.7, dir.y);
    col += vec3(0.9, 0.95, 1.0) * star * 0.75;

    // haze over ocean
    col = mix(col, vec3(0.62, 0.3, 0.24), (1.0 - smoothstep(-0.03, 0.06, h)) * 0.45);

    gl_FragColor = vec4(col, 1.0);
  }
`

/* ── Ocean shader ───────────────────────────────────────────── */
const oceanVert = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`
const oceanFrag = /* glsl */ `
  precision highp float;
  varying vec3 vWorld;
  uniform float uTime;
  uniform vec3 uSun;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 p = vWorld.xz;
    float t = uTime;
    float w = sin(p.x * 0.34 + t * 0.55) * 0.5
            + sin(p.y * 0.52 - t * 0.72) * 0.28
            + sin((p.x + p.y) * 0.19 + t * 0.31) * 0.22;
    float w2 = sin(p.x * 1.6 - p.y * 0.8 + t * 1.15)
             + sin(p.y * 1.9 + p.x * 0.6 - t * 0.9);
    w += w2 * 0.05;

    vec3 deep = vec3(0.015, 0.13, 0.16);
    vec3 shallow = vec3(0.06, 0.36, 0.37);
    vec3 col = mix(deep, shallow, smoothstep(-0.5, 0.8, w));

    // warm horizon glow, stronger toward the sun side (west)
    float dist = length(cameraPosition - vWorld);
    float horizon = smoothstep(30.0, 340.0, dist);
    col = mix(col, vec3(0.47, 0.27, 0.26), horizon * 0.62);
    col += vec3(0.85, 0.38, 0.18) * pow(horizon, 3.0) * 0.35;

    // sun path on the water
    float sunPath = exp(-pow((vWorld.z - 24.0) * 0.018, 2.0)) * smoothstep(-30.0, -260.0, vWorld.x);
    float sparkleN = noise(p * 0.9 + vec2(t * 0.35, -t * 0.2));
    float sparkle = pow(sparkleN, 9.0) * sunPath * (0.45 + 0.55 * sin(t * 2.0 + p.x));
    col += vec3(1.0, 0.63, 0.28) * sunPath * 0.3;
    col += vec3(1.0, 0.86, 0.55) * sparkle * 1.6;

    // shore foam
    float shore = smoothstep(-25.6, -27.6, vWorld.x);
    float foam = sin(vWorld.x * 4.0 + sin(vWorld.z * 0.6 + t * 0.7) * 1.8 + t * 1.3);
    foam = smoothstep(0.82, 1.0, foam) * shore;
    col = mix(col, vec3(0.92, 0.86, 0.72), foam * 0.65);

    gl_FragColor = vec4(col, 1.0);
  }
`

function buildSky(scene, sunDir) {
  const geo = new THREE.SphereGeometry(420, 48, 32)
  const mat = new THREE.ShaderMaterial({
    vertexShader: skyVert,
    fragmentShader: skyFrag,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uSun: { value: sunDir.clone() },
      uTime: { value: 0 },
    },
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.frustumCulled = false
  mesh.renderOrder = -10
  scene.add(mesh)
  return mat
}

function buildOcean(scene, sunDir) {
  const geo = new THREE.PlaneGeometry(340, 520, 1, 1)
  const mat = new THREE.ShaderMaterial({
    vertexShader: oceanVert,
    fragmentShader: oceanFrag,
    fog: false,
    uniforms: {
      uTime: { value: 0 },
      uSun: { value: sunDir.clone() },
    },
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.x = -Math.PI / 2
  mesh.position.set(-195, -0.38, -25)
  scene.add(mesh)
  return mat
}

/* ── texts & signs ──────────────────────────────────────────── */
function addNeonSign(parent, { text, sub, color, x, y, z, w, h, rotY = 0 }) {
  const tex = neonTexture(text, color, sub)
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat)
  mesh.position.set(x, y, z)
  mesh.rotation.y = rotY
  parent.add(mesh)
  return mesh
}

/* ── palm trees ─────────────────────────────────────────────── */
function frondGeometry() {
  const segs = 5
  const pos = []
  const uvs = []
  const idx = []
  for (let i = 0; i <= segs; i++) {
    const t = i / segs
    const width = Math.sin(t * Math.PI) * 0.42 + 0.03
    const y = -t * t * 2.25 + t * 0.35
    const z = t * 3.4
    pos.push(-width, y, z, width, y, z)
    uvs.push(0, t, 1, t)
    if (i < segs) {
      const a = i * 2
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  g.setIndex(idx)
  g.computeVertexNormals()
  return g
}

const frondGeo = frondGeometry()

function makePalm(scale = 1, tint = 0x2e6b3f) {
  const group = new THREE.Group()
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5b4630, roughness: 0.95 })
  const trunkSegs = 7
  let x = 0
  let z = 0
  const curve = new THREE.Vector3(0.5, 0, -0.35)
  for (let i = 0; i < trunkSegs; i++) {
    const t = i / trunkSegs
    const h = 1.3 * scale
    const r0 = (0.26 - t * 0.1) * scale
    const r1 = (0.23 - t * 0.1) * scale
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, h * 1.03, 7), trunkMat)
    x = curve.x * t * t * scale
    z = curve.z * t * t * scale
    seg.position.set(x, i * h + h / 2, z)
    seg.rotation.z = -curve.x * 0.06
    group.add(seg)
  }
  const crown = new THREE.Group()
  crown.position.set(curve.x * scale, trunkSegs * 1.3 * scale, curve.z * scale)
  const leafMat = new THREE.MeshStandardMaterial({
    color: tint,
    roughness: 0.75,
    side: THREE.DoubleSide,
    emissive: 0x0a2a18,
    emissiveIntensity: 0.4,
  })
  const fronds = []
  for (let i = 0; i < 9; i++) {
    const f = frondGeo.clone()
    f.scale(scale * 1.05, scale * 1.05, scale * 1.05)
    f.rotateX((i % 3) * 0.1 - 0.1)
    f.rotateY((i / 9) * TAU + 0.2)
    fronds.push(f)
  }
  const crownMesh = new THREE.Mesh(mergeGeometries(fronds), leafMat)
  crownMesh.castShadow = true
  crown.add(crownMesh)
  // coconuts
  const nutGeo = new THREE.SphereGeometry(0.11 * scale, 6, 5)
  const nutMat = new THREE.MeshStandardMaterial({ color: 0x4b3a1f, roughness: 0.9 })
  for (let i = 0; i < 4; i++) {
    const n = new THREE.Mesh(nutGeo, nutMat)
    const a = (i / 4) * TAU
    n.position.set(Math.cos(a) * 0.23 * scale, -0.14 * scale, Math.sin(a) * 0.23 * scale)
    crown.add(n)
  }
  group.add(crown)
  group.userData.crown = crown
  return group
}

/* ── carnival bunting ───────────────────────────────────────── */
function addBunting(parent, rng, from, to, height, count, colors) {
  const group = new THREE.Group()
  const pts = []
  const sag = 1.1
  for (let i = 0; i <= 20; i++) {
    const t = i / 20
    pts.push(
      new THREE.Vector3(
        from.x + (to.x - from.x) * t,
        height - Math.sin(t * Math.PI) * sag,
        from.z + (to.z - from.z) * t
      )
    )
  }
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color: 0x6b5c48, transparent: true, opacity: 0.8 })
  )
  group.add(line)

  const pos = []
  const col = []
  const base = []
  const phase = []
  const c = new THREE.Color()
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count
    const p = new THREE.Vector3(
      from.x + (to.x - from.x) * t,
      height - Math.sin(t * Math.PI) * sag,
      from.z + (to.z - from.z) * t
    )
    c.set(colors[i % colors.length])
    const w = 0.28
    const h = 0.5
    const verts = [
      [-w / 2, 0, 0],
      [w / 2, 0, 0],
      [0, -h, 0],
    ]
    for (const v of verts) {
      pos.push(p.x + v[0], p.y + v[1], p.z + v[2])
      col.push(c.r, c.g, c.b)
      base.push(p.x + v[0], p.y + v[1], p.z + v[2])
      phase.push(t * 6 + (from.z + to.z) * 0.1)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
  const mesh = new THREE.Mesh(
    g,
    new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      toneMapped: false,
    })
  )
  group.add(mesh)
  parent.add(group)
  return { group, mesh, base, phase }
}

/* ── buildings ──────────────────────────────────────────────── */
const PALETTE = [0xd95f3b, 0x2a9d8f, 0xe9b949, 0x5c8db8, 0xc97c8f, 0x6a994e, 0xdb8b45, 0x3f7f78]

function addBuilding(parent, rng, { x, z, w, h, d, rotY = 0, color, windows = 8, balcony = false, neon = false }) {
  const group = new THREE.Group()
  group.position.set(x, 0, z)
  group.rotation.y = rotY
  const wallMat = new THREE.MeshStandardMaterial({ color, roughness: 0.88, metalness: 0.03 })
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat)
  body.position.y = h / 2
  body.castShadow = true
  body.receiveShadow = true
  group.add(body)

  const trimMat = new THREE.MeshStandardMaterial({ color: 0xe6dcc4, roughness: 0.8 })
  const roof = new THREE.Mesh(new THREE.BoxGeometry(w * 1.04, 0.22, d * 1.04), trimMat)
  roof.position.y = h + 0.11
  roof.castShadow = true
  group.add(roof)

  const winGeos = []
  const winLitGeos = []
  const cols = Math.max(2, Math.floor(w / 2.2))
  const rows = Math.max(1, Math.floor(h / 2.6))
  const facadeZ = d / 2 + 0.02
  for (let r = 0; r < rows; r++) {
    for (let cc = 0; cc < cols; cc++) {
      if (rng() < 0.18) continue
      const ww = 0.65
      const wh = 0.9
      const px = -w / 2 + 1.0 + (cc * (w - 2)) / Math.max(1, cols - 1)
      const py = 1.35 + (r * (h - 2.4)) / Math.max(1, rows - 1)
      const plane = new THREE.PlaneGeometry(ww, wh)
      plane.translate(px, py, facadeZ)
      if (rng() < 0.52) winLitGeos.push(plane)
      else winGeos.push(plane)
    }
  }
  if (winLitGeos.length) {
    const m = new THREE.Mesh(
      mergeGeometries(winLitGeos),
      new THREE.MeshBasicMaterial({ color: 0xffca70, toneMapped: false })
    )
    group.add(m)
  }
  if (winGeos.length) {
    const m = new THREE.Mesh(
      mergeGeometries(winGeos),
      new THREE.MeshBasicMaterial({ color: 0x1c2a2b, toneMapped: false })
    )
    group.add(m)
  }

  // rooftop details
  if (rng() < 0.65) {
    const tank = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 1.1, 8),
      new THREE.MeshStandardMaterial({ color: 0x4b6f7a, roughness: 0.6, metalness: 0.3 })
    )
    tank.position.set((rng() - 0.5) * w * 0.5, h + 0.68, (rng() - 0.5) * d * 0.4)
    group.add(tank)
  }
  if (rng() < 0.55) {
    const ant = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.05, 2.2, 5),
      new THREE.MeshStandardMaterial({ color: 0x2b2b28, roughness: 0.7 })
    )
    ant.position.set((rng() - 0.5) * w * 0.6, h + 1.1, 0)
    group.add(ant)
  }
  if (balcony) {
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.82, 0.12, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xd8cfb8, roughness: 0.9 })
    )
    b.position.set(0, h * 0.55, d / 2 + 0.35)
    group.add(b)
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.82, 0.55, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x383c35, roughness: 0.8, transparent: true, opacity: 0.75 })
    )
    rail.position.set(0, h * 0.55 + 0.35, d / 2 + 0.72)
    group.add(rail)
  }
  parent.add(group)
  return group
}

/* ── props ──────────────────────────────────────────────────── */
function makeLamp(parent, x, z, height = 4.6) {
  const group = new THREE.Group()
  group.position.set(x, 0, z)
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x1f2b27, roughness: 0.55, metalness: 0.5 })
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, height, 8), poleMat)
  pole.position.y = height / 2
  pole.castShadow = true
  group.add(pole)
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6), poleMat)
  arm.rotation.z = Math.PI / 2
  arm.position.set(0.25, height - 0.08, 0)
  group.add(arm)
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffd28a, toneMapped: false })
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), bulbMat)
  bulb.position.set(0.5, height - 0.2, 0)
  group.add(bulb)
  const halo = glowSprite(0xffb15e, 1.9, 0.5)
  halo.position.copy(bulb.position)
  group.add(halo)
  const light = new THREE.PointLight(0xffb46b, 13, 16, 2)
  light.position.set(0.5, height - 0.3, 0)
  group.add(light)
  parent.add(group)
  return group
}

function makeCrate(x, z, s = 1.05, rot = 0) {
  const group = new THREE.Group()
  group.position.set(x, 0, z)
  group.rotation.y = rot
  const mat = new THREE.MeshStandardMaterial({ color: 0x8a6a3d, roughness: 0.93 })
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0x3f3120, roughness: 0.9 })
  const box = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), mat)
  box.position.y = s / 2
  box.castShadow = true
  box.receiveShadow = true
  group.add(box)
  const band = new THREE.Mesh(new THREE.BoxGeometry(s * 1.02, s * 0.09, s * 1.02), edgeMat)
  band.position.y = s * 0.25
  group.add(band)
  const band2 = band.clone()
  band2.position.y = s * 0.75
  group.add(band2)
  return group
}

function makeUmbrella(parent, x, z, color = 0xffb703) {
  const group = new THREE.Group()
  group.position.set(x, 0, z)
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.05, 2.9, 6),
    new THREE.MeshStandardMaterial({ color: 0xd7cdb4, roughness: 0.6 })
  )
  pole.position.y = 1.45
  group.add(pole)
  const canopy = new THREE.Mesh(
    new THREE.ConeGeometry(1.7, 0.65, 12, 1, true),
    new THREE.MeshStandardMaterial({ color, roughness: 0.75, side: THREE.DoubleSide })
  )
  canopy.position.y = 2.85
  canopy.castShadow = true
  group.add(canopy)
  const tip = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 6, 5),
    new THREE.MeshBasicMaterial({ color: 0xf4ecd8 })
  )
  tip.position.y = 3.2
  group.add(tip)
  parent.add(group)
  return group
}

function makeFoodCart(parent) {
  const group = new THREE.Group()
  group.position.set(15.5, 0, 11.5)
  group.rotation.y = -0.55
  const wood = new THREE.MeshStandardMaterial({ color: 0x6d4c2f, roughness: 0.9 })
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.15, 1.1), wood)
  body.position.y = 0.85
  body.castShadow = true
  group.add(body)
  const counter = new THREE.Mesh(
    new THREE.BoxGeometry(2.55, 0.1, 1.25),
    new THREE.MeshStandardMaterial({ color: 0xeee2c6, roughness: 0.7 })
  )
  counter.position.y = 1.45
  counter.castShadow = true
  group.add(counter)
  const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.12, 10)
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1b1b18, roughness: 0.9 })
  for (const sx of [-0.8, 0.8]) {
    const w = new THREE.Mesh(wheelGeo, wheelMat)
    w.rotation.z = Math.PI / 2
    w.position.set(sx, 0.32, 0.56)
    group.add(w)
  }
  // bottles
  const bottleMat = new THREE.MeshStandardMaterial({ color: 0x3c8f56, roughness: 0.3, metalness: 0.1 })
  for (let i = 0; i < 4; i++) {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.3, 6), bottleMat)
    b.position.set(-0.6 + i * 0.4, 1.65, 0.1)
    group.add(b)
  }
  addNeonSign(group, {
    text: 'AÇAÍ',
    sub: 'DO ZÉ · GELADO',
    color: '#27e0b8',
    x: 0,
    y: 2.25,
    z: 0.05,
    w: 2.4,
    h: 0.8,
  })
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 1.0, 5),
    new THREE.MeshStandardMaterial({ color: 0x40352a })
  )
  pole.position.set(0, 1.95, 0)
  group.add(pole)
  parent.add(group)
  makeUmbrella(parent, 15.5, 11.5, 0x2a9d8f).position.set(15.5, 0, 11.5)
  return group
}

/* ── main build ─────────────────────────────────────────────── */
export function createWorld(scene, renderer, { mobile = false } = {}) {
  const rng = mulberry32(2126)
  const root = new THREE.Group()
  scene.add(root)

  const sunDir = new THREE.Vector3(-0.8, 0.115, -0.44).normalize()
  scene.fog = new THREE.FogExp2(0x2c2329, 0.0062)

  const sky = buildSky(scene, sunDir)
  const ocean = buildOcean(scene, sunDir)

  /* lights */
  const hemi = new THREE.HemisphereLight(0xff9e63, 0x14342b, 1.05)
  scene.add(hemi)

  const sun = new THREE.DirectionalLight(0xffb877, 3.1)
  sun.position.copy(sunDir).multiplyScalar(90)
  sun.castShadow = true
  sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048)
  sun.shadow.camera.left = -40
  sun.shadow.camera.right = 40
  sun.shadow.camera.top = 42
  sun.shadow.camera.bottom = -32
  sun.shadow.camera.near = 20
  sun.shadow.camera.far = 190
  sun.shadow.bias = -0.0008
  sun.shadow.normalBias = 0.035
  sun.target.position.set(0, 0, -4)
  scene.add(sun)
  scene.add(sun.target)

  const fill = new THREE.DirectionalLight(0x3f7896, 0.75)
  fill.position.set(40, 20, 30)
  scene.add(fill)

  const rim = new THREE.DirectionalLight(0xff8a5c, 0.55)
  rim.position.set(-60, 8, -20)
  scene.add(rim)

  /* ground */
  const calcada = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 46),
    new THREE.MeshStandardMaterial({ map: calcadaTexture(), roughness: 0.93, color: 0xffffff })
  )
  calcada.rotation.x = -Math.PI / 2
  calcada.position.set(0, 0.02, -1)
  calcada.receiveShadow = true
  root.add(calcada)

  // sidewalk border
  const borderMat = new THREE.MeshStandardMaterial({ color: 0x9e8f72, roughness: 0.9 })
  const borderGeo = new THREE.BoxGeometry(52, 0.24, 2.0)
  for (const [z, rot] of [[-25.0, 0], [23.0, 0]]) {
    const b = new THREE.Mesh(borderGeo, borderMat)
    b.position.set(0, 0.1, z)
    b.rotation.y = rot
    b.receiveShadow = true
    root.add(b)
  }
  const sideBorder = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.24, 48), borderMat)
  sideBorder.position.set(25, 0.1, -1)
  root.add(sideBorder)

  // sand + ocean
  const sand = new THREE.Mesh(
    new THREE.PlaneGeometry(34, 140),
    new THREE.MeshStandardMaterial({ map: sandTexture(), roughness: 1, color: 0xd8c29a })
  )
  sand.rotation.x = -Math.PI / 2
  sand.position.set(-40, -0.04, -8)
  sand.receiveShadow = true
  root.add(sand)

  // beach walkway
  const walk = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 80),
    new THREE.MeshStandardMaterial({ map: asphaltTexture(), roughness: 0.92 })
  )
  walk.rotation.x = -Math.PI / 2
  walk.position.set(-25.3, 0.03, -4)
  root.add(walk)

  /* mountains */
  const mountainMat = new THREE.MeshStandardMaterial({ color: 0x17352f, roughness: 1, flatShading: true })
  const mountainFarMat = new THREE.MeshStandardMaterial({ color: 0x1e2f35, roughness: 1, flatShading: true })
  function peakGeometry(r, h, seed) {
    const g = new THREE.CylinderGeometry(r * 0.035, r, h, 20, 8, false)
    g.translate(0, h / 2, 0)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i)
      const py = pos.getY(i)
      const pz = pos.getZ(i)
      const t = Math.min(1, Math.max(0, py / h))
      const ang = Math.atan2(pz, px)
      const ridge =
        1 +
        Math.sin(ang * 3.0 + seed) * 0.12 +
        Math.sin(ang * 5.7 + seed * 1.7) * 0.055 +
        Math.sin(ang * 10.3 + seed * 2.3) * 0.025
      const flare = 1 + (1 - t) * 0.16
      const nx = px * ridge * flare + Math.sin(seed) * (1 - t) * r * 0.09 + Math.sin(t * 7 + seed) * r * 0.018
      const nz = pz * ridge * flare + Math.cos(seed * 1.3) * (1 - t) * r * 0.09 + Math.cos(t * 5 + seed) * r * 0.018
      pos.setXYZ(i, nx, py, nz)
    }
    g.computeVertexNormals()
    return g
  }
  function mountain(x, z, r, h, mat = mountainMat, sx = 1) {
    const seed = rng() * TAU
    const massif = new THREE.Group()
    const main = new THREE.Mesh(peakGeometry(r, h, seed), mat)
    massif.add(main)
    // shoulder peaks break up the silhouette into a ridge line
    const shoulders = 1 + Math.floor(rng() * 2)
    for (let i = 0; i < shoulders; i++) {
      const sr = r * (0.42 + rng() * 0.3)
      const sh = h * (0.42 + rng() * 0.34)
      const shoulder = new THREE.Mesh(peakGeometry(sr, sh, seed + 1.7 + i * 2.1), mat)
      shoulder.position.set((rng() - 0.5) * r * 1.25, 0, (rng() - 0.5) * r * 0.9)
      massif.add(shoulder)
    }
    massif.position.set(x, -1, z)
    massif.scale.x = sx
    massif.rotation.y = rng() * TAU
    massif.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = false
        o.receiveShadow = false
      }
    })
    root.add(massif)
    return massif
  }
  mountain(-55, -165, 55, 55, mountainMat, 1.3)
  mountain(-120, -210, 75, 70, mountainFarMat, 1.25)
  mountain(45, -195, 65, 48, mountainFarMat, 1.5)
  mountain(135, -230, 85, 62, mountainFarMat, 1.3)
  mountain(-210, -195, 80, 55, mountainFarMat, 1.1)

  // Corcovado + Cristo silhouette
  mountain(-38, -125, 26, 52, mountainMat, 1)
  const cristoMat = new THREE.MeshStandardMaterial({
    color: 0xd8d6c9,
    emissive: 0x857b64,
    emissiveIntensity: 0.5,
    roughness: 0.8,
  })
  const cristo = new THREE.Group()
  cristo.position.set(-38, 49.6, -125)
  const body = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 2.0, 8.5, 7), cristoMat)
  body.position.y = 4.2
  cristo.add(body)
  const arms = new THREE.Mesh(new THREE.BoxGeometry(14, 0.9, 1.0), cristoMat)
  arms.position.y = 7.8
  cristo.add(arms)
  const head = new THREE.Mesh(new THREE.SphereGeometry(1.1, 8, 6), cristoMat)
  head.position.y = 9.0
  cristo.add(head)
  const pedestal = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 3.2), mountainMat)
  pedestal.position.y = -0.5
  cristo.add(pedestal)
  cristo.rotation.y = 0.25
  root.add(cristo)

  // distant city silhouettes
  const silhouetteMat = new THREE.MeshStandardMaterial({ color: 0x162721, roughness: 1 })
  for (let i = 0; i < 18; i++) {
    const w = 4 + rng() * 9
    const h = 3 + rng() * 18
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 4 + rng() * 6), silhouetteMat)
    b.position.set(-110 + rng() * 250, h / 2 - 1, -95 - rng() * 55)
    root.add(b)
    if (rng() < 0.35) {
      const win = new THREE.Mesh(
        new THREE.PlaneGeometry(w * 0.7, h * 0.55),
        new THREE.MeshBasicMaterial({ color: 0xffb35e, transparent: true, opacity: 0.12, toneMapped: false })
      )
      win.position.set(b.position.x, h * 0.55, b.position.z + 2.6)
      root.add(win)
    }
  }

  /* favela hillside */
  const hill = new THREE.Mesh(
    new THREE.SphereGeometry(38, 16, 8, 0, TAU, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x1c3a2a, roughness: 1, flatShading: true })
  )
  hill.scale.set(1.5, 0.38, 0.75)
  hill.position.set(14, -3, -55)
  root.add(hill)

  const favelaBuildings = []
  for (let i = 0; i < 14; i++) {
    const w = 3.2 + rng() * 3.2
    const h = 3.5 + rng() * 6
    const d = 3 + rng() * 2.5
    const row = i % 3
    const x = -20 + (i % 7) * 6.2 + rng() * 2
    const z = -34 - row * 7 - rng() * 3
    const y = row * 2.4
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color: PALETTE[i % PALETTE.length], roughness: 0.93 })
    )
    b.position.set(x, y + h / 2, z)
    b.rotation.y = (rng() - 0.5) * 0.2
    root.add(b)
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(w * 1.05, 0.16, d * 1.05),
      new THREE.MeshStandardMaterial({ color: 0xded2b6, roughness: 0.9 })
    )
    roof.position.set(x, y + h + 0.08, z)
    root.add(roof)
    // lit windows
    const winCount = 1 + Math.floor(rng() * 3)
    for (let k = 0; k < winCount; k++) {
      const win = new THREE.Mesh(
        new THREE.PlaneGeometry(0.4, 0.55),
        new THREE.MeshBasicMaterial({ color: rng() < 0.5 ? 0xffc46b : 0x9fe7d2, toneMapped: false })
      )
      win.position.set(x + (rng() - 0.5) * w * 0.6, y + 1.2 + rng() * (h - 2), z + d / 2 + 0.06)
      root.add(win)
    }
    favelaBuildings.push(b)
  }
  // stairs hint
  const stairMat = new THREE.MeshStandardMaterial({ color: 0x8d806a, roughness: 0.95 })
  for (let i = 0; i < 9; i++) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.24, 0.8), stairMat)
    s.position.set(-4 + i * 0.55, 0.15 + i * 0.34, -32 - i * 0.55)
    root.add(s)
  }

  /* courtyard buildings around north / east / south */
  const buildings = []
  const northRow = [
    { x: -17, z: -27, w: 7.5, h: 10.5, d: 5.5, color: PALETTE[0] },
    { x: -8, z: -28.5, w: 6.2, h: 7.2, d: 5, color: PALETTE[2] },
    { x: 1, z: -27.5, w: 6.8, h: 12.0, d: 5.5, color: PALETTE[3] },
    { x: 10, z: -28.3, w: 7.2, h: 8.6, d: 5, color: PALETTE[1] },
    { x: 19, z: -27, w: 6.6, h: 11.2, d: 5.5, color: PALETTE[4] },
  ]
  for (const cfg of northRow) {
    const b = addBuilding(root, rng, { ...cfg, windows: 10, balcony: rng() < 0.5 })
    buildings.push(b)
  }
  // east buildings
  for (let i = 0; i < 3; i++) {
    const b = addBuilding(root, rng, {
      x: 30.5,
      z: 1 + i * 9,
      w: 5,
      h: 7 + rng() * 4,
      d: 6.5,
      rotY: Math.PI / 2,
      color: PALETTE[(i + 3) % PALETTE.length],
      windows: 6,
    })
    buildings.push(b)
  }
  // south-east corners
  addBuilding(root, rng, { x: 29, z: 20, w: 6, h: 9, d: 5, rotY: Math.PI / 2, color: PALETTE[6], windows: 5 })
  addBuilding(root, rng, { x: -27.5, z: 20.5, w: 5, h: 8, d: 5, color: PALETTE[5], windows: 4 })

  /* neon signs */
  addNeonSign(root, {
    text: 'PRAÇA DO SOL',
    sub: 'COMUNIDADE · DESDE 2041',
    color: '#ffb703',
    x: 1,
    y: 7.6,
    z: -24.6,
    w: 10,
    h: 2.5,
  })
  addNeonSign(root, {
    text: 'BRASA',
    color: '#ff5d3a',
    x: 26.8,
    y: 6.5,
    z: 5,
    w: 5,
    h: 1.7,
    rotY: -Math.PI / 2,
  })
  addNeonSign(root, {
    text: 'SAMBAR',
    sub: 'RÁDIO COMUNITÁRIA 87.5',
    color: '#27e0b8',
    x: -17,
    y: 4.8,
    z: -24.4,
    w: 5.5,
    h: 1.4,
  })

  /* graffiti wall */
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x2a332f, roughness: 0.95 })
  const graffWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 4.6, 13), wallMat)
  graffWall.position.set(24.2, 2.3, 6)
  graffWall.receiveShadow = true
  root.add(graffWall)
  const mural = new THREE.Mesh(
    new THREE.PlaneGeometry(12.4, 4.2),
    new THREE.MeshStandardMaterial({ map: graffitiTexture(), roughness: 0.9 })
  )
  mural.rotation.y = -Math.PI / 2
  mural.position.set(23.97, 2.35, 6)
  root.add(mural)

  /* stage + core */
  const stage = new THREE.Group()
  stage.position.set(0, 0, -7.5)
  const stageMat = new THREE.MeshStandardMaterial({ color: 0x1a2320, roughness: 0.55, metalness: 0.35 })
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.7, 0.42, 32), stageMat)
  platform.position.y = 0.21
  platform.castShadow = true
  platform.receiveShadow = true
  stage.add(platform)
  const stageRing = new THREE.Mesh(
    new THREE.RingGeometry(3.44, 3.62, 48),
    new THREE.MeshBasicMaterial({ color: 0x27e0b8, transparent: true, opacity: 0.65, side: THREE.DoubleSide, toneMapped: false })
  )
  stageRing.rotation.x = -Math.PI / 2
  stageRing.position.y = 0.44
  stage.add(stageRing)
  const stageRing2 = new THREE.Mesh(
    new THREE.RingGeometry(2.9, 2.95, 48),
    new THREE.MeshBasicMaterial({ color: 0xffb703, transparent: true, opacity: 0.4, side: THREE.DoubleSide, toneMapped: false })
  )
  stageRing2.rotation.x = -Math.PI / 2
  stageRing2.position.y = 0.45
  stage.add(stageRing2)

  // speaker stacks
  const spkMat = new THREE.MeshStandardMaterial({ color: 0x101614, roughness: 0.7, metalness: 0.2 })
  const coneMat = new THREE.MeshStandardMaterial({ color: 0x39433e, roughness: 0.6, metalness: 0.3, emissive: 0x0b1714 })
  for (const sx of [-2.65, 2.65]) {
    const stack = new THREE.Group()
    stack.position.set(sx, 0.43, 0.1)
    for (let i = 0; i < 3; i++) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.25, 0.8), spkMat)
      box.position.y = 0.63 + i * 1.3
      box.castShadow = true
      stack.add(box)
      const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.33, 0.1, 16), coneMat)
      cone.rotation.x = Math.PI / 2
      cone.position.set(0, 0.64 + i * 1.3, 0.43)
      stack.add(cone)
      const cone2 = cone.clone()
      cone2.scale.set(0.55, 1, 0.55)
      cone2.position.z = 0.46
      stack.add(cone2)
    }
    stage.add(stack)
  }

  // DJ booth
  const booth = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.95, 0.75), spkMat)
  booth.position.set(0, 0.9, 0.15)
  booth.castShadow = true
  stage.add(booth)
  const boothTop = new THREE.Mesh(
    new THREE.BoxGeometry(2.3, 0.06, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x27e0b8, emissive: 0x0f6b55, emissiveIntensity: 1.4, roughness: 0.35 })
  )
  boothTop.position.set(0, 1.4, 0.15)
  stage.add(boothTop)

  // core
  const coreGroup = new THREE.Group()
  coreGroup.position.set(0, 2.05, -0.1)
  const corePedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.8, 0.9, 12),
    new THREE.MeshStandardMaterial({ color: 0x2c3a34, roughness: 0.4, metalness: 0.6 })
  )
  corePedestal.position.y = -0.45
  coreGroup.add(corePedestal)
  const orbMat = new THREE.MeshPhysicalMaterial({
    color: 0x75ffe0,
    emissive: 0x27e0b8,
    emissiveIntensity: 1.15,
    roughness: 0.18,
    metalness: 0.1,
    transmission: 0,
    toneMapped: true,
  })
  const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.58, 2), orbMat)
  coreGroup.add(orb)
  const orbInner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.3, 1),
    new THREE.MeshBasicMaterial({ color: 0x5cf2cf, toneMapped: true })
  )
  coreGroup.add(orbInner)
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x27e0b8,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide,
    toneMapped: false,
  })
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.018, 6, 64), ringMat)
  ring1.rotation.x = Math.PI / 2.2
  coreGroup.add(ring1)
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.012, 6, 64), ringMat.clone())
  ring2.material.color.set(0xffb703)
  ring2.material.opacity = 0.55
  ring2.rotation.set(Math.PI / 3, 0.4, 0)
  coreGroup.add(ring2)
  const coreGlow = glowSprite(0x27e0b8, 2.4, 0.32)
  coreGroup.add(coreGlow)
  const coreLight = new THREE.PointLight(0x27e0b8, 14, 18, 2)
  coreLight.position.set(0, 0.6, 0)
  coreGroup.add(coreLight)
  stage.add(coreGroup)

  // beam under core
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 1.4, 5.5, 20, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0x27e0b8,
      transparent: true,
      opacity: 0.075,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false,
    })
  )
  beam.position.set(0, 2.7, -0.1)
  stage.add(beam)

  root.add(stage)

  // floor halo around stage
  const halo = new THREE.Mesh(
    new THREE.RingGeometry(3.8, 4.4, 64),
    new THREE.MeshBasicMaterial({
      color: 0x27e0b8,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
  )
  halo.rotation.x = -Math.PI / 2
  halo.position.set(0, 0.05, -7.5)
  root.add(halo)

  // drums near stage
  const drumMat = new THREE.MeshStandardMaterial({ color: 0xc8923f, roughness: 0.7 })
  const drumSkin = new THREE.MeshStandardMaterial({ color: 0xf0e7d0, roughness: 0.6 })
  for (let i = 0; i < 3; i++) {
    const drum = new THREE.Group()
    const d = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.3, 0.85, 12), drumMat)
    d.position.y = 0.43
    drum.add(d)
    const skin = new THREE.Mesh(new THREE.CircleGeometry(0.32, 12), drumSkin)
    skin.rotation.x = -Math.PI / 2
    skin.position.y = 0.86
    drum.add(skin)
    drum.position.set(-4.6 + i * 0.9, 0, -4.8)
    drum.rotation.z = 0.08
    root.add(drum)
  }

  /* cover props */
  const covers = [
    { x: -9, z: 1.5, r: 0.75, s: 1.2, rot: 0.2 },
    { x: 8.5, z: 0.5, r: 0.7, s: 1.1, rot: -0.3 },
    { x: -13, z: 9, r: 0.7, s: 1.0, rot: 0.5 },
    { x: 11, z: 9.5, r: 0.8, s: 1.3, rot: 0.1 },
    { x: -3.5, z: 15, r: 0.65, s: 0.9, rot: 0.8 },
    { x: 3.5, z: -14.5, r: 0.7, s: 1.1, rot: -0.2 },
    { x: -17, z: -12, r: 0.75, s: 1.2, rot: 0.4 },
    { x: 16, z: -12, r: 0.7, s: 1.0, rot: 0.6 },
  ]
  for (const c of covers) root.add(makeCrate(c.x, c.z, c.s, c.rot))
  const obstacles = covers.map((c) => ({ type: 'circle', x: c.x, z: c.z, r: c.r }))

  // stage collision
  obstacles.push({ type: 'circle', x: 0, z: -7.5, r: 3.75 })

  /* food cart + umbrella */
  makeFoodCart(root)
  obstacles.push({ type: 'circle', x: 15.5, z: 11.5, r: 1.6 })

  /* street lamps */
  makeLamp(root, -20.5, 18, 4.4)
  makeLamp(root, 20.5, 18, 4.4)
  makeLamp(root, -20.5, -18, 4.6)
  makeLamp(root, 20.5, -18, 4.6)

  /* palms */
  const palms = []
  const palmSpots = [
    [-22, 16, 1.05],
    [-22, 7, 0.9],
    [-22.5, -3, 1.15],
    [-22, -15, 0.95],
    [22, 17.5, 1.0],
    [22.5, -16, 1.1],
    [-19, -21, 0.85],
    [19.8, 6, 0.78],
    [23, 24, 1.0],
    [-24.5, 26, 0.9],
  ]
  for (const [x, z, s] of palmSpots) {
    const p = makePalm(s, 0x2f6d40)
    p.position.set(x, 0, z)
    p.rotation.y = rng() * TAU
    p.traverse((o) => {
      if (o.isMesh) o.castShadow = true
    })
    root.add(p)
    palms.push(p)
    obstacles.push({ type: 'circle', x, z, r: 0.35 })
  }

  /* beach net + umbrellas */
  const netGroup = new THREE.Group()
  netGroup.position.set(-27.5, 0, 8)
  netGroup.rotation.y = Math.PI / 2
  const netPoleMat = new THREE.MeshStandardMaterial({ color: 0xd7cdb4, roughness: 0.6 })
  for (const sx of [-2.2, 2.2]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.3, 6), netPoleMat)
    p.position.set(sx, 1.15, 0)
    netGroup.add(p)
  }
  const netMat = new THREE.MeshBasicMaterial({ color: 0xe8dfc9, wireframe: true, transparent: true, opacity: 0.25 })
  const net = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 0.8, 14, 3), netMat)
  net.position.y = 1.8
  netGroup.add(net)
  root.add(netGroup)
  makeUmbrella(root, -32, -2, 0xff5d3a)
  makeUmbrella(root, -34, 14, 0xffb703)

  /* bunting */
  const bunts = []
  const buntColors = [0xffb703, 0x27e0b8, 0xff5d3a, 0xf4ecd8, 0x5c8db8, 0xd98ba6]
  bunts.push(addBunting(root, rng, new THREE.Vector3(-21, 0, 3), new THREE.Vector3(21, 0, 3), 6.2, 22, buntColors))
  bunts.push(addBunting(root, rng, new THREE.Vector3(-21, 0, -12), new THREE.Vector3(21, 0, -12), 6.6, 22, buntColors))
  bunts.push(addBunting(root, rng, new THREE.Vector3(-17, 0, 18), new THREE.Vector3(17, 0, 18), 5.4, 18, buntColors))
  bunts.push(addBunting(root, rng, new THREE.Vector3(-20, 0, -2), new THREE.Vector3(-20, 0, 14), 5.8, 10, buntColors))
  bunts.push(addBunting(root, rng, new THREE.Vector3(20, 0, -2), new THREE.Vector3(20, 0, 14), 5.8, 10, buntColors))

  /* benches */
  const benchMat = new THREE.MeshStandardMaterial({ color: 0x6f5335, roughness: 0.9 })
  const legMat = new THREE.MeshStandardMaterial({ color: 0x232a26, roughness: 0.7, metalness: 0.4 })
  function bench(x, z, rotY = 0) {
    const g = new THREE.Group()
    g.position.set(x, 0, z)
    g.rotation.y = rotY
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.55), benchMat)
    seat.position.y = 0.52
    seat.castShadow = true
    g.add(seat)
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 0.09), benchMat)
    back.position.set(0, 0.82, -0.24)
    g.add(back)
    for (const sx of [-0.85, 0.85]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.5, 0.46), legMat)
      leg.position.set(sx, 0.26, 0)
      g.add(leg)
    }
    root.add(g)
  }
  bench(-6, 20, 0)
  bench(6, 20, 0)
  bench(-21, 10.5, Math.PI / 2)
  bench(21, 1, -Math.PI / 2)

  /* fireworks / birds? distant helicopter lights */
  const heli = new THREE.Group()
  const heliBody = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 8, 6),
    new THREE.MeshStandardMaterial({ color: 0x1c2321, roughness: 0.6 })
  )
  heliBody.scale.set(1.6, 0.8, 0.8)
  heli.add(heliBody)
  const heliLight = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 6, 4),
    new THREE.MeshBasicMaterial({ color: 0xff3b2f, toneMapped: false })
  )
  heliLight.position.set(0, -0.2, 0.5)
  heli.add(heliLight)
  const heliGlow = glowSprite(0xff3b2f, 2.0, 0.8)
  heliGlow.position.copy(heliLight.position)
  heli.add(heliGlow)
  heli.position.set(-60, 32, -80)
  root.add(heli)

  /* ambient embers / fireflies */
  const particleCount = mobile ? 160 : 280
  const pPos = new Float32Array(particleCount * 3)
  const pPhase = new Float32Array(particleCount)
  const pSpeed = new Float32Array(particleCount)
  for (let i = 0; i < particleCount; i++) {
    pPos[i * 3] = (rng() - 0.5) * 56
    pPos[i * 3 + 1] = 0.4 + rng() * 9
    pPos[i * 3 + 2] = -20 + rng() * 48
    pPhase[i] = rng() * TAU
    pSpeed[i] = 0.15 + rng() * 0.5
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
  const pMat = new THREE.PointsMaterial({
    map: glowTexture(),
    color: 0xffc46b,
    size: 0.07,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
    toneMapped: false,
  })
  const particles = new THREE.Points(pGeo, pMat)
  root.add(particles)

  // second layer of teal sparks near stage
  const sparkCount = mobile ? 50 : 90
  const sPos = new Float32Array(sparkCount * 3)
  for (let i = 0; i < sparkCount; i++) {
    const a = rng() * TAU
    const r = 1 + rng() * 5
    sPos[i * 3] = Math.cos(a) * r
    sPos[i * 3 + 1] = 0.2 + rng() * 4.5
    sPos[i * 3 + 2] = -7.5 + Math.sin(a) * r
  }
  const sGeo = new THREE.BufferGeometry()
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3))
  const sMat = new THREE.PointsMaterial({
    map: glowTexture(),
    color: 0x27e0b8,
    size: 0.06,
    transparent: true,
    opacity: 0.34,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
    toneMapped: false,
  })
  const sparks = new THREE.Points(sGeo, sMat)
  root.add(sparks)

  /* moon? subtle planet */
  const moonMat = new THREE.SpriteMaterial({
    map: glowTexture(),
    color: 0xffd9a0,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  })
  const moon = new THREE.Sprite(moonMat)
  moon.position.set(55, 65, -160)
  moon.scale.set(16, 16, 1)
  scene.add(moon)

  /* world bounds */
  const bounds = { minX: -23.5, maxX: 23.5, minZ: -18.5, maxZ: 21.5 }

  /* update */
  let elapsed = 0
  function update(dt, time) {
    elapsed = time
    sky.uniforms.uTime.value = time
    ocean.uniforms.uTime.value = time

    // core animation
    orb.rotation.y += dt * 0.6
    orb.rotation.x += dt * 0.18
    orbInner.rotation.y -= dt * 1.2
    orbInner.rotation.z += dt * 0.7
    ring1.rotation.z += dt * 0.5
    ring2.rotation.z -= dt * 0.35
    ring2.rotation.x = Math.PI / 3 + Math.sin(time * 0.4) * 0.18
    const pulse = 1 + Math.sin(time * 1.7) * 0.045
    coreGlow.scale.setScalar(2.4 * pulse)
    coreLight.intensity = 13 + Math.sin(time * 2.1) * 2
    beam.material.opacity = 0.04 + Math.sin(time * 1.2) * 0.012

    // bunting sway
    for (const b of bunts) {
      const arr = b.mesh.geometry.attributes.position.array
      for (let i = 0; i < b.base.length / 3; i++) {
        const bx = b.base[i * 3]
        const by = b.base[i * 3 + 1]
        const bz = b.base[i * 3 + 2]
        const ph = b.phase[i]
        arr[i * 3] = bx + Math.sin(time * 1.6 + ph) * 0.09
        arr[i * 3 + 1] = by + Math.sin(time * 1.1 + ph * 1.3) * 0.05
        arr[i * 3 + 2] = bz + Math.cos(time * 1.3 + ph) * 0.05
      }
      b.mesh.geometry.attributes.position.needsUpdate = true
    }

    // palm sway
    for (let i = 0; i < palms.length; i++) {
      const p = palms[i]
      const crown = p.userData.crown
      if (crown) {
        crown.rotation.z = Math.sin(time * 0.8 + i) * 0.035
        crown.rotation.x = Math.cos(time * 0.65 + i * 1.7) * 0.028
      }
    }

    // embers drift
    const pos = pGeo.attributes.position.array
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 1] += pSpeed[i] * dt * 0.35
      pos[i * 3] += Math.sin(time * 0.35 + pPhase[i]) * dt * 0.11
      if (pos[i * 3 + 1] > 10.5) {
        pos[i * 3 + 1] = 0.3
        pos[i * 3] = (Math.random() - 0.5) * 56
        pos[i * 3 + 2] = -20 + Math.random() * 48
      }
    }
    pGeo.attributes.position.needsUpdate = true
    pMat.opacity = 0.65 + Math.sin(time * 2.2) * 0.15

    const spos = sGeo.attributes.position.array
    for (let i = 0; i < sparkCount; i++) {
      spos[i * 3 + 1] += dt * (0.3 + (i % 5) * 0.06)
      if (spos[i * 3 + 1] > 5.2) spos[i * 3 + 1] = 0.2
    }
    sGeo.attributes.position.needsUpdate = true
    sMat.opacity = 0.45 + Math.sin(time * 3.1) * 0.2

    // helicopter patrol
    heli.position.x = -60 + Math.sin(time * 0.06) * 45
    heli.position.z = -80 + Math.cos(time * 0.05) * 25
    heli.position.y = 30 + Math.sin(time * 0.3) * 2
    heliLight.material.color.setHex(Math.sin(time * 5) > 0 ? 0xff3b2f : 0x2bff80)
    heliGlow.material.color.copy(heliLight.material.color)

    stageRing.material.opacity = 0.5 + Math.sin(time * 2) * 0.18
    halo.material.opacity = 0.12 + Math.sin(time * 1.4) * 0.05
  }

  return {
    root,
    update,
    bounds,
    obstacles,
    core: {
      group: coreGroup,
      orb,
      position: new THREE.Vector3(0, 2.55, -7.6),
    },
    sun,
    sky,
    ocean,
    stage,
  }
}
