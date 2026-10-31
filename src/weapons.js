import * as THREE from 'three'

export const WEAPON_TYPES = {
  pulse: {
    id: 'pulse',
    label: 'PULSO',
    title: 'REPETIDOR',
    color: '#62f4ff',
    accent: '#c7ff4a',
    behavior: 'bolt',
    damage: 15,
    rate: 7.2,
    speed: 58,
    spread: 0.012,
    pellets: 1,
    ammo: 42,
    range: 90,
    bars: [54, 78, 66],
    tagline: 'EQUILÍBRIO. IMPREVISÍVEL.',
    keywords: ['pulso', 'pulse', 'laser', 'luz', 'light', 'feixe', 'beam', 'som', 'voz', 'voice', 'eco', 'echo', 'palavra', 'word'],
  },
  flame: {
    id: 'flame',
    label: 'CHAMA',
    title: 'LANÇA-CHAMAS',
    color: '#ff6a2b',
    accent: '#ffd24a',
    behavior: 'flame',
    damage: 6.5,
    rate: 18,
    speed: 23,
    spread: 0.065,
    pellets: 1,
    ammo: 110,
    range: 8,
    bars: [62, 96, 22],
    tagline: 'PERTO DEMAIS PARA FUGIR.',
    keywords: ['fogo', 'chama', 'dragão', 'dragao', 'inferno', 'lava', 'sol', 'calor', 'queimar', 'queimadura', 'flame', 'fire', 'dragon', 'hell', 'burn', 'hot', 'phoenix', 'fênix'],
  },
  frost: {
    id: 'frost',
    label: 'CRIO',
    title: 'FRAGMENTADOR',
    color: '#8fe8ff',
    accent: '#ffffff',
    behavior: 'pellet',
    damage: 8,
    rate: 1.65,
    speed: 52,
    spread: 0.11,
    pellets: 8,
    ammo: 18,
    range: 40,
    bars: [70, 28, 38],
    tagline: 'O SILÊNCIO CONGELA.',
    keywords: ['gelo', 'frio', 'neve', 'inverno', 'cristal', 'congelar', 'congelado', 'geada', 'ice', 'cold', 'snow', 'freeze', 'frost', 'winter', 'crystal', 'zero'],
  },
  lightning: {
    id: 'lightning',
    label: 'RAIO',
    title: 'BOBINA',
    color: '#b18cff',
    accent: '#62f4ff',
    behavior: 'chain',
    damage: 24,
    rate: 2.6,
    speed: 0,
    spread: 0,
    pellets: 1,
    ammo: 22,
    range: 55,
    bars: [76, 46, 72],
    tagline: 'A RESPOSTA VEM EM CADEIA.',
    keywords: ['raio', 'trovão', 'trovao', 'elétrico', 'eletrico', 'choque', 'tempestade', 'energia', 'lightning', 'thunder', 'electric', 'shock', 'storm', 'voltage', 'relâmpago', 'relampago'],
  },
  rocket: {
    id: 'rocket',
    label: 'FOGUETE',
    title: 'LANÇA-FOGUETES',
    color: '#ffb545',
    accent: '#ff3d7f',
    behavior: 'rocket',
    damage: 64,
    rate: 0.85,
    speed: 28,
    spread: 0.006,
    pellets: 1,
    ammo: 9,
    range: 80,
    bars: [96, 18, 70],
    tagline: 'UMA FRASE. UM CRATERA.',
    keywords: ['foguete', 'míssil', 'missil', 'explosão', 'explosao', 'bomba', 'guerra', 'morte', 'destruir', 'destruição', 'rocket', 'missile', 'boom', 'explode', 'bomb', 'war', 'death', 'destroy', 'metralhadora', 'gun'],
  },
  void: {
    id: 'void',
    label: 'VÓRTICE',
    title: 'SINGULARIDADE',
    color: '#d45cff',
    accent: '#62f4ff',
    behavior: 'void',
    damage: 12,
    rate: 0.72,
    speed: 15,
    spread: 0,
    pellets: 1,
    ammo: 8,
    range: 65,
    bars: [88, 14, 58],
    tagline: 'O VAZIO TAMBÉM ESCUTA.',
    keywords: ['buraco negro', 'vazio', 'universo', 'espaço', 'espaco', 'galáxia', 'galaxia', 'cosmos', 'gravidade', 'abismo', 'void', 'black hole', 'space', 'galaxy', 'gravity', 'abyss', 'buraco'],
  },
  swarm: {
    id: 'swarm',
    label: 'ENXAME',
    title: 'NINHO',
    color: '#5bffb0',
    accent: '#c7ff4a',
    behavior: 'swarm',
    damage: 5.5,
    rate: 3.1,
    speed: 34,
    spread: 0.05,
    pellets: 4,
    ammo: 30,
    range: 60,
    bars: [44, 82, 58],
    tagline: 'ELES OUVEM O SEU CHAMADO.',
    keywords: ['abelha', 'enxame', 'inseto', 'pássaro', 'passaro', 'nuvem', 'vespa', 'mosquito', 'formiga', 'swarm', 'bee', 'insect', 'bird', 'cloud', 'wasp', 'locust', 'hive'],
  },
  blade: {
    id: 'blade',
    label: 'GUME',
    title: 'LÂMINA',
    color: '#ff4f8b',
    accent: '#ffffff',
    behavior: 'blade',
    damage: 42,
    rate: 1.35,
    speed: 0,
    spread: 0,
    pellets: 1,
    ammo: 26,
    range: 6.2,
    bars: [82, 52, 12],
    tagline: 'CURTA. DIRETA. DEFINITIVA.',
    keywords: ['lâmina', 'lamina', 'faca', 'espada', 'corte', 'afiado', 'serra', 'sangue', 'garra', 'unha', 'blade', 'knife', 'sword', 'slash', 'sharp', 'blood', 'claw'],
  },
}

const TYPE_IDS = Object.keys(WEAPON_TYPES)
const STOP_WORDS = new Set([
  'a', 'o', 'as', 'os', 'um', 'uma', 'uns', 'umas', 'de', 'da', 'do', 'das', 'dos', 'e', 'ou', 'que',
  'para', 'pra', 'com', 'sem', 'no', 'na', 'nos', 'nas', 'em', 'por', 'é', 'eh', 'eu', 'você', 'voce',
  'meu', 'minha', 'seu', 'sua', 'isso', 'isto', 'aquele', 'aquela', 'the', 'of', 'and', 'to', 'my',
  'a', 'an', 'is', 'it', 'this', 'that', 'with', 'for', 'in', 'on', 'you', 'i',
])

function normalize (text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function hashString (text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function clamp (v, min, max) {
  return Math.max(min, Math.min(max, v))
}

function pickArchetype (normalized, seed, voice) {
  let best = null
  let bestScore = 0
  for (const id of TYPE_IDS) {
    const type = WEAPON_TYPES[id]
    let score = 0
    for (const rawKeyword of type.keywords) {
      const keyword = normalize(rawKeyword)
      if (!keyword) continue
      if (normalized === keyword) score += 8
      else if (normalized.includes(keyword)) score += 2 + keyword.length * 0.12
    }
    if (score > bestScore) {
      bestScore = score
      best = id
    }
  }
  if (best) return best

  // No literal match: let the voice signature and the phrase itself choose.
  const energy = voice?.energy ?? 0.5
  const pitch = voice?.pitch ?? 0.5
  const weighted = [
    'pulse', 'pulse', 'flame', 'frost', 'lightning', 'rocket',
    energy > 0.62 ? 'rocket' : 'swarm',
    pitch > 0.62 ? 'lightning' : 'void',
    'blade', 'frost',
  ]
  return weighted[seed % weighted.length]
}

function callSignFrom (transcript) {
  const clean = String(transcript || '')
    .replace(/[“”"']/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (!clean) return 'SEM NOME'
  const words = normalize(clean)
    .split(' ')
    .filter(word => word.length > 1 && !STOP_WORDS.has(word))
  const chosen = (words.length ? words : normalize(clean).split(' ')).slice(0, 2).join(' ')
  const upper = chosen.toUpperCase()
  return upper.length > 20 ? upper.slice(0, 20).trim() : upper || 'SEM NOME'
}

function hexToRgb (hex) {
  const color = new THREE.Color(hex)
  return [color.r, color.g, color.b]
}

export function forgeWeapon (transcript = '', voice = {}) {
  const cleanTranscript = String(transcript || '').replace(/\s+/g, ' ').trim().slice(0, 120)
  const normalized = normalize(cleanTranscript)
  const seed = hashString(normalized || `voice-${voice.energy ?? 0.5}-${voice.pitch ?? 0.5}`)
  const typeId = pickArchetype(normalized, seed, voice)
  const type = WEAPON_TYPES[typeId]
  const energy = clamp(voice.energy ?? 0.52, 0, 1)
  const pitch = clamp(voice.pitch ?? 0.5, 0, 1)
  const duration = clamp(voice.duration ?? 1.2, 0.2, 8)
  const wordCount = normalized ? normalized.split(' ').length : 1

  const damage = type.damage * (0.88 + energy * 0.32 + (pitch - 0.5) * 0.1)
  const rate = type.rate * (1.12 - energy * 0.2)
  const spread = type.spread * (1.28 - energy * 0.5)
  const speed = type.speed * (0.9 + pitch * 0.22)
  const ammo = Math.max(6, Math.round(type.ammo * (0.86 + Math.min(cleanTranscript.length, 42) / 56 + duration * 0.012)))
  const scale = 0.93 + energy * 0.14
  const bars = [
    clamp(Math.round(type.bars[0] * (0.82 + energy * 0.25)), 4, 100),
    clamp(Math.round(type.bars[1] * (1.08 - energy * 0.16)), 4, 100),
    clamp(Math.round(type.bars[2] * (0.86 + pitch * 0.2)), 4, 100),
  ]

  const color = new THREE.Color(type.color)
  color.offsetHSL(0, 0, (pitch - 0.5) * 0.06)
  const accent = new THREE.Color(type.accent)

  const callSign = callSignFrom(cleanTranscript)
  const name = `${type.title} // ${callSign}`

  return {
    id: `${typeId}-${seed}-${Date.now()}`,
    typeId,
    type,
    behavior: type.behavior,
    label: type.label,
    title: type.title,
    name,
    callSign,
    quote: cleanTranscript || 'SINAL VOCAL',
    transcript: cleanTranscript,
    color: `#${color.getHexString()}`,
    colorRgb: hexToRgb(`#${color.getHexString()}`),
    accent: `#${accent.getHexString()}`,
    stats: {
      damage,
      rate,
      speed,
      spread,
      pellets: type.pellets,
      ammo,
      maxAmmo: ammo,
      range: type.range,
      behavior: type.behavior,
      energy,
      pitch,
      scale,
    },
    bars,
    tagline: type.tagline,
    wordCount,
  }
}

/* ───────────────────────────── view models ───────────────────────────── */

const metal = () => new THREE.MeshStandardMaterial({
  color: 0x69768f,
  metalness: 0.38,
  roughness: 0.3,
  emissive: 0x101a26,
  emissiveIntensity: 1,
  depthTest: false,
  depthWrite: false,
})

const matte = () => new THREE.MeshStandardMaterial({
  color: 0x252c3b,
  metalness: 0.25,
  roughness: 0.5,
  emissive: 0x080c12,
  emissiveIntensity: 0.8,
  depthTest: false,
  depthWrite: false,
})

function addHands (g) {
  const sleeve = new THREE.MeshStandardMaterial({
    color: 0x1a1e2a,
    metalness: 0.35,
    roughness: 0.72,
    emissive: 0x05070b,
    depthTest: false,
    depthWrite: false,
  })
  const glove = new THREE.MeshStandardMaterial({
    color: 0x2d3342,
    metalness: 0.5,
    roughness: 0.46,
    emissive: 0x080d14,
    depthTest: false,
    depthWrite: false,
  })
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.1, 0.38, 8), sleeve)
  arm.rotation.x = Math.PI / 2.5
  arm.rotation.z = -0.12
  arm.position.set(0.05, -0.19, 0.19)
  g.add(arm)
  const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.078, 0.012, 5, 14), neon('#62f4ff', 0.8))
  cuff.rotation.x = Math.PI / 2.5
  cuff.position.set(0.055, -0.16, 0.09)
  g.add(cuff)
  const hand = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.15), glove)
  hand.rotation.x = -0.18
  hand.position.set(0.015, -0.115, 0.07)
  g.add(hand)
  for (let i = 0; i < 3; i++) {
    const finger = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.035, 0.09), glove)
    finger.position.set(-0.025 + i * 0.028, -0.08, 0.005)
    finger.rotation.x = -0.55
    g.add(finger)
  }
}

function addSight (g, color) {
  const sight = new THREE.Group()
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.007, 4, 14), neon(color, 0.9))
  sight.add(ring)
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.009, 6, 6), neon('#ffffff'))
  dot.position.z = 0.01
  sight.add(dot)
  sight.position.set(0, 0.13, -0.1)
  g.add(sight)
}

function neon (color, opacity = 1) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  })
}

function box (w, h, d, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
  mesh.position.set(x, y, z)
  return mesh
}

function cyl (rt, rb, h, material, x = 0, y = 0, z = 0, segments = 12) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segments), material)
  mesh.rotation.x = Math.PI / 2
  mesh.position.set(x, y, z)
  return mesh
}

function torus (r, tube, material, x = 0, y = 0, z = 0, rx = 0, ry = 0) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 8, 28), material)
  mesh.position.set(x, y, z)
  mesh.rotation.x = rx
  mesh.rotation.y = ry
  return mesh
}

function buildPulse (colors) {
  const g = new THREE.Group()
  const m = metal()
  const d = matte()
  g.add(box(0.18, 0.125, 0.36, m, 0, 0, -0.01))
  g.add(box(0.125, 0.052, 0.32, m, 0, 0.086, -0.04))
  const grip = box(0.1, 0.19, 0.13, d, 0, -0.145, 0.105)
  grip.rotation.x = -0.2
  g.add(grip)
  g.add(box(0.13, 0.035, 0.13, d, 0, -0.065, 0.04))
  g.add(cyl(0.03, 0.043, 0.46, m, 0, 0.01, -0.27, 10))
  const muzzleRing = torus(0.042, 0.009, neon(colors.accent, 0.95), 0, 0.01, -0.525)
  g.add(muzzleRing)
  g.add(cyl(0.03, 0.03, 0.018, neon(colors.color, 0.6), 0, 0.01, -0.523, 10))
  g.add(box(0.026, 0.012, 0.23, neon(colors.accent, 0.6), 0, 0.116, -0.04))
  g.add(box(0.014, 0.018, 0.22, neon(colors.color, 0.8), -0.092, 0.012, -0.06))
  g.add(box(0.014, 0.018, 0.22, neon(colors.color, 0.8), 0.092, 0.012, -0.06))
  g.add(box(0.055, 0.03, 0.07, neon(colors.color, 0.85), 0, -0.05, -0.17))
  g.add(box(0.035, 0.055, 0.02, m, 0, 0.14, -0.36))
  const guard = torus(0.055, 0.009, d, 0, -0.09, 0.02, 0, Math.PI / 2)
  guard.scale.y = 0.7
  g.add(guard)
  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, 0.01, -0.56)
  g.add(muzzle)
  return { group: g, muzzle, glow: [0.9] }
}

function buildFlame (colors) {
  const g = new THREE.Group()
  const m = metal()
  const d = matte()
  g.add(cyl(0.085, 0.085, 0.38, m, 0, 0, -0.05, 14))
  g.add(cyl(0.07, 0.095, 0.16, d, 0, 0, -0.3, 12))
  g.add(cyl(0.09, 0.05, 0.1, m, 0, 0, -0.4, 12))
  g.add(cyl(0.075, 0.075, 0.28, d, 0, -0.13, -0.03, 12))
  g.add(torus(0.078, 0.014, neon(colors.accent), 0, -0.13, -0.18, Math.PI / 2, 0))
  g.add(box(0.04, 0.12, 0.2, m, -0.11, -0.04, -0.02))
  g.add(box(0.1, 0.03, 0.26, neon(colors.color, 0.8), 0, 0.09, -0.1))
  const pilot = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), neon(colors.accent))
  pilot.position.set(0, 0, -0.47)
  g.add(pilot)
  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, 0, -0.48)
  g.add(muzzle)
  return { group: g, muzzle, glow: [0.8] }
}

function buildFrost (colors) {
  const g = new THREE.Group()
  const m = metal()
  const d = matte()
  g.add(box(0.2, 0.16, 0.38, m, 0, 0, -0.02))
  g.add(cyl(0.06, 0.09, 0.34, d, -0.07, 0.02, -0.29, 8))
  g.add(cyl(0.06, 0.09, 0.34, d, 0.07, 0.02, -0.29, 8))
  g.add(box(0.08, 0.19, 0.13, d, 0, -0.14, 0.09))
  for (let i = 0; i < 4; i++) {
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), neon(colors.color, 0.9))
    crystal.position.set((i - 1.5) * 0.055, 0.07 + (i % 2) * 0.05, -0.42)
    crystal.scale.set(0.7, 1.9, 0.7)
    crystal.rotation.z = (i - 1.5) * 0.22
    g.add(crystal)
  }
  g.add(torus(0.105, 0.012, neon(colors.accent, 0.8), 0, 0.02, -0.12, 0, 0))
  g.add(box(0.16, 0.03, 0.2, neon(colors.color, 0.65), 0, 0.1, 0.01))
  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, 0.06, -0.48)
  g.add(muzzle)
  return { group: g, muzzle, glow: [0.9] }
}

function buildLightning (colors) {
  const g = new THREE.Group()
  const m = metal()
  const d = matte()
  g.add(box(0.18, 0.17, 0.4, m, 0, 0, -0.02))
  g.add(box(0.08, 0.22, 0.14, d, 0, -0.14, 0.1))
  for (let i = 0; i < 3; i++) {
    g.add(torus(0.085 + i * 0.02, 0.012, neon(colors.color, 0.9 - i * 0.18), 0, 0.02, -0.2 - i * 0.08, Math.PI / 2, 0))
  }
  g.add(cyl(0.025, 0.045, 0.46, m, 0, 0.02, -0.3, 10))
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.045, 1), neon(colors.accent))
  core.position.set(0, 0.02, -0.14)
  g.add(core)
  for (let i = 0; i < 3; i++) {
    const prong = box(0.012, 0.12, 0.02, neon(colors.accent), Math.cos(i * 2.1) * 0.07, 0.02 + Math.sin(i * 2.1) * 0.07, -0.5)
    prong.rotation.z = i * 2.1
    g.add(prong)
  }
  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, 0.02, -0.54)
  g.add(muzzle)
  return { group: g, muzzle, glow: [0.9] }
}

function buildRocket (colors) {
  const g = new THREE.Group()
  const m = metal()
  const d = matte()
  g.add(cyl(0.1, 0.1, 0.55, m, 0, 0.01, -0.12, 14))
  g.add(cyl(0.12, 0.08, 0.16, d, 0, 0.01, -0.44, 14))
  g.add(cyl(0.12, 0.12, 0.05, neon(colors.accent, 0.85), 0, 0.01, -0.28, 14))
  g.add(box(0.06, 0.16, 0.14, d, 0, -0.15, 0.06))
  g.add(box(0.05, 0.12, 0.2, m, 0, 0.13, -0.06))
  g.add(box(0.09, 0.02, 0.22, neon(colors.color, 0.85), 0, 0.2, -0.12))
  g.add(box(0.12, 0.025, 0.3, neon(colors.color, 0.5), 0, -0.07, -0.08))
  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, 0.01, -0.53)
  g.add(muzzle)
  return { group: g, muzzle, glow: [0.85] }
}

function buildVoid (colors) {
  const g = new THREE.Group()
  const m = metal()
  const d = matte()
  g.add(box(0.16, 0.17, 0.34, m, 0, 0, 0.02))
  g.add(box(0.08, 0.2, 0.13, d, 0, -0.14, 0.1))
  g.add(box(0.035, 0.04, 0.3, m, -0.1, 0.02, -0.18))
  g.add(box(0.035, 0.04, 0.3, m, 0.1, 0.02, -0.18))
  g.add(torus(0.155, 0.018, neon(colors.color, 0.95), 0, 0.02, -0.28, 0, 0))
  g.add(torus(0.105, 0.008, neon(colors.accent, 0.6), 0, 0.02, -0.28, 0, 0))
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), neon(colors.accent))
  orb.position.set(0, 0.02, -0.28)
  orb.userData.orb = true
  g.add(orb)
  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, 0.02, -0.34)
  g.add(muzzle)
  return { group: g, muzzle, glow: [0.9] }
}

function buildSwarm (colors) {
  const g = new THREE.Group()
  const m = metal()
  const d = matte()
  g.add(box(0.22, 0.19, 0.36, m, 0, 0, 0))
  g.add(box(0.08, 0.2, 0.14, d, 0, -0.15, 0.1))
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) continue
      const tube = cyl(0.024, 0.03, 0.18, d, x * 0.065, y * 0.06, -0.26, 6)
      g.add(tube)
      const tip = new THREE.Mesh(new THREE.CircleGeometry(0.016, 6), neon(colors.color, 0.9))
      tip.position.set(x * 0.065, y * 0.06, -0.355)
      g.add(tip)
    }
  }
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.04, 0), neon(colors.accent))
  core.position.set(0, 0, -0.12)
  g.add(core)
  g.add(box(0.18, 0.02, 0.2, neon(colors.color, 0.65), 0, 0.1, 0.01))
  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, 0, -0.38)
  g.add(muzzle)
  return { group: g, muzzle, glow: [0.9] }
}

function buildBlade (colors) {
  const g = new THREE.Group()
  const m = metal()
  const d = matte()
  g.add(box(0.06, 0.07, 0.24, m, 0, 0, 0.02))
  g.add(box(0.12, 0.03, 0.16, d, 0, -0.05, 0.04))
  g.add(box(0.02, 0.03, 0.2, neon(colors.accent, 0.85), 0, 0.05, 0))
  const blade = box(0.018, 0.15, 0.72, neon(colors.color, 0.88), 0, 0.02, -0.5)
  blade.rotation.x = 0.04
  g.add(blade)
  const edge = box(0.008, 0.04, 0.78, neon(colors.accent, 0.95), 0.012, 0.02, -0.5)
  g.add(edge)
  g.add(box(0.11, 0.02, 0.05, m, 0, 0.02, -0.13))
  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, 0.02, -0.9)
  g.add(muzzle)
  return { group: g, muzzle, glow: [0.9] }
}

const BUILDERS = {
  pulse: buildPulse,
  flame: buildFlame,
  frost: buildFrost,
  lightning: buildLightning,
  rocket: buildRocket,
  void: buildVoid,
  swarm: buildSwarm,
  blade: buildBlade,
}

export function buildWeaponModel (weapon) {
  const colors = {
    color: new THREE.Color(weapon.color),
    accent: new THREE.Color(weapon.accent),
  }
  const built = (BUILDERS[weapon.typeId] || buildPulse)(colors)
  const group = built.group
  addHands(group)
  if (weapon.typeId !== 'blade') addSight(group, weapon.accent)
  group.position.set(0.22, -0.245, -0.62)
  group.rotation.set(0.02, -0.09, 0.015)
  group.scale.setScalar(0.47 * weapon.stats.scale)
  group.traverse(obj => {
    if (obj.isMesh) {
      obj.renderOrder = 1000
      obj.frustumCulled = false
    }
  })
  group.userData.basePosition = group.position.clone()
  group.userData.baseRotation = group.rotation.clone()
  group.userData.baseScale = group.scale.x
  group.userData.muzzle = built.muzzle
  group.userData.recoil = 0
  group.userData.glowParts = []
  group.traverse(obj => {
    if (obj.isMesh && obj.material?.isMeshBasicMaterial) group.userData.glowParts.push(obj)
  })
  return { group, muzzle: built.muzzle, colors }
}

export function disposeObject (root) {
  if (!root) return
  root.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
      else obj.material.dispose()
    }
  })
}

export const WEAPON_PREVIEW = forgeWeapon('pulso', { energy: 0.6, pitch: 0.55, duration: 1 })
