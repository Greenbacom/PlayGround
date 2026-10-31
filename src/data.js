const ARCHETYPES = {
  pistol: {
    key: 'pistol', label: 'PISTOLA', adj: 'TÁTICA', glyph: '⌐', model: 'pistol',
    damage: 18, rate: 3.4, speed: 48, spread: 0.009, pellets: 1, mag: 12, reload: 1.0,
    recoil: 0.015, range: 62, size: 1, projectile: 'bolt', desc: 'PRECISÃO'
  },
  rifle: {
    key: 'rifle', label: 'FUZIL', adj: 'DE ASSALTO', glyph: '⌁', model: 'rifle',
    damage: 11, rate: 8.2, speed: 54, spread: 0.021, pellets: 1, mag: 30, reload: 1.55,
    recoil: 0.008, range: 72, size: 1, projectile: 'bolt', desc: 'CADÊNCIA'
  },
  smg: {
    key: 'smg', label: 'SUBMETRALHADORA', adj: 'COMPACTA', glyph: '≋', model: 'smg',
    damage: 7.5, rate: 13.5, speed: 44, spread: 0.036, pellets: 1, mag: 40, reload: 1.35,
    recoil: 0.006, range: 45, size: .85, projectile: 'bolt', desc: 'ENXAME'
  },
  shotgun: {
    key: 'shotgun', label: 'ESPINGARDA', adj: 'DE COMBATE', glyph: '⋔', model: 'shotgun',
    damage: 8.5, rate: 1.35, speed: 38, spread: 0.085, pellets: 8, mag: 6, reload: 1.85,
    recoil: 0.038, range: 34, size: 1.08, projectile: 'pellet', desc: 'IMPACTO'
  },
  sniper: {
    key: 'sniper', label: 'FUZIL DE PRECISÃO', adj: 'LONGO ALCANCE', glyph: '✛', model: 'sniper',
    damage: 72, rate: .78, speed: 130, spread: .0012, pellets: 1, mag: 4, reload: 2.15,
    recoil: .055, range: 140, size: 1.1, projectile: 'beam', desc: 'LETAL'
  },
  cannon: {
    key: 'cannon', label: 'CANHÃO', adj: 'PESADO', glyph: '◉', model: 'cannon',
    damage: 40, rate: .92, speed: 28, spread: .017, pellets: 1, mag: 3, reload: 2.35,
    recoil: .06, range: 70, size: 1.25, projectile: 'rocket', explosive: 1.25, desc: 'DEMOLIÇÃO'
  },
  launcher: {
    key: 'launcher', label: 'LANÇADOR', adj: 'ORBITAL', glyph: '⊚', model: 'cannon',
    damage: 34, rate: 1.15, speed: 31, spread: .012, pellets: 1, mag: 4, reload: 2.1,
    recoil: .05, range: 80, size: 1.16, projectile: 'rocket', explosive: 1.05, desc: 'ÁREA'
  },
  bow: {
    key: 'bow', label: 'ARCO', adj: 'ESPECTRAL', glyph: '⌒', model: 'bow',
    damage: 32, rate: 1.7, speed: 66, spread: .006, pellets: 1, mag: 8, reload: 1.15,
    recoil: .022, range: 110, size: 1.05, projectile: 'arrow', pierce: 1, desc: 'PERFURAÇÃO'
  },
  staff: {
    key: 'staff', label: 'CAJADO', adj: 'ARCANO', glyph: '†', model: 'staff',
    damage: 24, rate: 2.1, speed: 31, spread: .008, pellets: 1, mag: 9, reload: 1.7,
    recoil: .02, range: 85, size: 1.02, projectile: 'orb', homing: .55, desc: 'ARCANO'
  },
  gauntlet: {
    key: 'gauntlet', label: 'MANOPLA', adj: 'DE PULSO', glyph: '◧', model: 'gauntlet',
    damage: 15, rate: 4.3, speed: 25, spread: .04, pellets: 1, mag: 20, reload: 1.25,
    recoil: .018, range: 38, size: .88, projectile: 'orb', desc: 'PROXIMIDADE'
  },
  blade: {
    key: 'blade', label: 'LÂMINA', adj: 'DE ENERGIA', glyph: '⟡', model: 'blade',
    damage: 27, rate: 2.5, speed: 39, spread: .018, pellets: 1, mag: 14, reload: 1.3,
    recoil: .025, range: 48, size: .98, projectile: 'disc', pierce: 1, desc: 'CORTE'
  },
  default: {
    key: 'default', label: 'PULSO', adj: 'ADAPTATIVO', glyph: '✦', model: 'rifle',
    damage: 14, rate: 4.6, speed: 46, spread: .015, pellets: 1, mag: 20, reload: 1.3,
    recoil: .012, range: 65, size: 1, projectile: 'orb', desc: 'ADAPTÁVEL'
  }
}

const ELEMENTS = {
  plasma: { key: 'plasma', label: 'PLASMA', adj: 'PLASMÁTICO', color: '#6df6ff', rgb: '109,246,255', glyph: '✦', damage: 1, effect: 'plasma', trail: 'cyan' },
  fire: { key: 'fire', label: 'FOGO', adj: 'INCENDIÁRIO', color: '#ff7a3c', rgb: '255,122,60', glyph: '△', damage: 1.06, effect: 'burn', trail: 'fire' },
  ice: { key: 'ice', label: 'GELO', adj: 'CRIOGÊNICO', color: '#8cecff', rgb: '140,236,255', glyph: '❄', damage: .94, effect: 'freeze', trail: 'ice' },
  lightning: { key: 'lightning', label: 'TROVÃO', adj: 'ELÉTRICO', color: '#c29bff', rgb: '194,155,255', glyph: 'ϟ', damage: .97, effect: 'chain', trail: 'volt' },
  void: { key: 'void', label: 'VAZIO', adj: 'DO VAZIO', color: '#b06bff', rgb: '176,107,255', glyph: '◈', damage: 1.1, effect: 'void', trail: 'void' },
  toxic: { key: 'toxic', label: 'TÓXICO', adj: 'TÓXICO', color: '#84ff77', rgb: '132,255,119', glyph: '☣', damage: .9, effect: 'poison', trail: 'toxic' },
  holy: { key: 'holy', label: 'SAGRADO', adj: 'SAGRADO', color: '#ffe391', rgb: '255,227,145', glyph: '✧', damage: 1.02, effect: 'holy', trail: 'holy' },
  blood: { key: 'blood', label: 'SANGUE', adj: 'SANGUINÁRIO', color: '#ff4e6f', rgb: '255,78,111', glyph: '♦', damage: 1.08, effect: 'leech', trail: 'blood' },
  cosmic: { key: 'cosmic', label: 'CÓSMICO', adj: 'ESTELAR', color: '#a9b8ff', rgb: '169,184,255', glyph: '✺', damage: 1.04, effect: 'cosmic', trail: 'cosmic' },
  sonic: { key: 'sonic', label: 'SÔNICO', adj: 'SÔNICO', color: '#ff9ee8', rgb: '255,158,232', glyph: '≈', damage: .96, effect: 'sonic', trail: 'sonic' },
  nature: { key: 'nature', label: 'NATUREZA', adj: 'SILVESTRE', color: '#9dffa9', rgb: '157,255,169', glyph: '❧', damage: .93, effect: 'poison', trail: 'nature' },
  shadow: { key: 'shadow', label: 'SOMBRA', adj: 'ESPECTRAL', color: '#8d73ff', rgb: '141,115,255', glyph: '◐', damage: 1.03, effect: 'void', trail: 'shadow' }
}

const ARCHETYPE_WORDS = {
  shotgun: ['espingarda', 'shotgun', 'escopeta', 'calibre 12', 'calibre doze', 'pump', 'devastadora'],
  sniper: ['sniper', 'precisao', 'precisão', 'franco atirador', 'ferrolho', 'longa distancia', 'longa distância', 'antimaterial'],
  cannon: ['canhao', 'canhão', 'obus', 'obuseiro', 'bazuca', 'lancador', 'lançador', 'foguete', 'rocket', 'missil', 'míssil', 'granada', 'torpedo', 'morteiro'],
  bow: ['arco', 'flecha', 'besta', 'arqueiro', 'bow', 'arrow', 'ballesta'],
  staff: ['cajado', 'cetro', 'staff', 'varinha', 'mago', 'magia', 'feiticeiro', 'bruxa', 'orbe'],
  gauntlet: ['manopla', 'luva', 'punho', 'gauntlet', 'soqueira', 'bracelete'],
  blade: ['espada', 'lamina', 'lâmina', 'sabre', 'katana', 'foice', 'machado', 'blade', 'sword', 'adaga', 'glaive'],
  smg: ['submetralhadora', 'smg', 'uzi', 'mp5', 'p90', 'compacta', 'metralhadora leve'],
  rifle: ['rifle', 'fuzil', 'metralhadora', 'ak', 'm4', 'ar15', 'assalto', 'carabina', 'repetidora'],
  pistol: ['pistola', 'revolver', 'revólver', 'handgun', 'pistol', 'glock', 'derringer', 'deagle', 'magnum']
}

const ELEMENT_WORDS = {
  fire: ['fogo', 'chama', 'flamejante', 'incendio', 'incêndio', 'inferno', 'lava', 'magma', 'dragao', 'dragão', 'solar', 'sol', 'brasa', 'vulcao', 'vulcão', 'quente', 'fênix', 'fenix', 'prometeu'],
  ice: ['gelo', 'congelante', 'glacial', 'frio', 'nevasca', 'inverno', 'cristal', 'geada', 'zero absoluto', 'crio', 'neve', 'polar', 'frost'],
  lightning: ['trovao', 'trovão', 'raio', 'eletrico', 'elétrico', 'eletrica', 'elétrica', 'tempestade', 'choque', 'relampago', 'relâmpago', 'volts', 'volt', 'storm', 'lightning', 'thunder', 'zeus'],
  void: ['vazio', 'buraco negro', 'sombrio', 'abismo', 'caos', 'negro', 'escuridao', 'escuridão', 'eclipse', 'void', 'singularidade', 'antimateria', 'antimatéria', 'colapso'],
  plasma: ['plasma', 'neon', 'laser', 'energia', 'ionico', 'iônico', 'foton', 'fóton', 'pulsar', 'cyber', 'quantico', 'quântico', 'fusao', 'fusão'],
  toxic: ['veneno', 'toxico', 'tóxico', 'acido', 'ácido', 'radioativo', 'nuclear', 'peste', 'corrosivo', 'venenoso', 'bio', 'contaminado', 'virus', 'vírus'],
  holy: ['sagrado', 'santo', 'divino', 'anjo', 'luz', 'celestial', 'dourado', 'ouro', 'prata', 'abencoado', 'abençoado', 'holy', 'angelical'],
  blood: ['sangue', 'vampiro', 'carmesim', 'rubi', 'vermelho', 'sanguinario', 'sanguinário', 'carnificina', 'crimson', 'hemorragia', 'sanguessuga'],
  cosmic: ['cosmos', 'cosmico', 'cósmico', 'estelar', 'estrela', 'galaxia', 'galáxia', 'astral', 'meteorito', 'espacial', 'universo', 'nebulosa', 'asteroide', 'astro'],
  sonic: ['sonico', 'sônico', 'som', 'grito', 'eco', 'voz', 'ruido', 'ruído', 'frequencia', 'frequência', 'bass', 'musical', 'ressonancia', 'ressonância', 'sussurro'],
  nature: ['natureza', 'floresta', 'terra', 'pedra', 'espinho', 'raiz', 'druida', 'druida', 'biologico', 'biológico', 'selvagem', 'venus', 'vênus', 'carnivora', 'carnívora'],
  shadow: ['sombra', 'espectral', 'fantasma', 'assombrado', 'maldito', 'demonio', 'demônio', 'infernal', 'trevas', 'nightmare', 'pesadelo', 'espectro']
}

const MODIFIER_WORDS = {
  rapid: ['rapido', 'rápido', 'veloz', 'agil', 'ágil', 'frenetico', 'frenético', 'acelerado', 'turbo', 'relampago', 'relâmpago'],
  heavy: ['gigante', 'colossal', 'pesado', 'brutal', 'devastador', 'titanico', 'titânico', 'enorme', 'massivo', 'monstro'],
  mini: ['mini', 'pequeno', 'micro', 'compacto', 'minusculo', 'minúsculo', 'pocket'],
  triple: ['triplo', 'tripla', 'tres', 'três', 'tridente', 'triad'],
  double: ['duplo', 'dupla', 'gemeo', 'gêmeo', 'duas', 'dois'],
  precise: ['preciso', 'precisa', 'certeiro', 'cirurgico', 'cirúrgico', 'milimetrico', 'milimétrico'],
  explosive: ['explosivo', 'explosao', 'explosão', 'boom', 'detonante', 'fragmentacao', 'fragmentação'],
  piercing: ['perfurante', 'penetrante', 'atravessa', 'perfura', 'piercing'],
  homing: ['guiado', 'teleguiado', 'perseguidor', 'inteligente', 'caçador', 'cacador', 'rastreador'],
  vampiric: ['vampiro', 'drenante', 'sugador', 'sanguessuga', 'dreno'],
  eternal: ['eterno', 'eterna', 'infinito', 'infinita', 'sem fim', 'ilimitado', 'ilimitada'],
  lucky: ['sorte', 'sortudo', 'aleatorio', 'aleatório', 'caos', 'maluco', 'imprevisivel', 'imprevisível', 'wild'],
  echo: ['eco', 'repetidor', 'repetidora', 'duplicado', 'clone'],
  swift: ['leve', 'leveza', 'aerodinamico', 'aerodinâmico', 'sutil']
}

const RARITIES = [
  { key: 'common', label: 'COMUM', color: '#a7c2d2', mult: 1.0, min: 0 },
  { key: 'rare', label: 'RARA', color: '#6df6ff', mult: 1.12, min: 1 },
  { key: 'epic', label: 'ÉPICA', color: '#c49bff', mult: 1.27, min: 2 },
  { key: 'legendary', label: 'LENDÁRIA', color: '#ffc85c', mult: 1.46, min: 3 },
  { key: 'mythic', label: 'MÍTICA', color: '#ff6b9d', mult: 1.72, min: 5 }
]

const FILLERS = ['quero', 'queria', 'me da', 'me dê', 'crie', 'cria', 'faca', 'faça', 'uma', 'um', 'arma', 'que', 'atire', 'atira', 'por favor', 'para mim', 'tipo', 'chamada', 'chamado']

export function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function hashString(value) {
  let h = 2166136261
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed) {
  return function () {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function findWord(normalized, table) {
  const found = []
  for (const [key, words] of Object.entries(table)) {
    for (const word of words) {
      if (normalized.includes(normalizeText(word))) found.push({ key, word })
    }
  }
  return found
}

function titleCase(value) {
  const small = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'com', 'sem', 'que', 'a', 'o', 'em', 'para', 'por'])
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => {
      const lower = word.toLowerCase()
      if (i > 0 && small.has(lower)) return lower
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(' ')
}

function cleanPhrase(raw) {
  const value = String(raw || '').replace(/[“”"']/g, '').replace(/\s+/g, ' ').trim()
  if (!value) return ''
  const words = value.split(' ')
  const normalizedWords = words.map(word => normalizeText(word))
  let start = 0
  let stripped = true
  while (stripped) {
    stripped = false
    for (const filler of FILLERS) {
      const fillerWords = normalizeText(filler).split(' ').filter(Boolean)
      if (!fillerWords.length) continue
      const matches = fillerWords.every((part, i) => normalizedWords[start + i] === part)
      if (matches) {
        start += fillerWords.length
        stripped = true
        break
      }
    }
  }
  const kept = words.slice(start).filter(word => normalizeText(word))
  const source = kept.join(' ').trim() || normalizeText(value)
  return titleCase(source).slice(0, 42)
}

export function forgeWeapon(rawPhrase, options = {}) {
  const phrase = cleanPhrase(rawPhrase)
  const seedText = phrase || `voz-${Date.now()}`
  const seed = hashString(seedText)
  const rand = mulberry32(seed)
  const normalized = normalizeText(seedText)

  const archetypeHits = findWord(normalized, ARCHETYPE_WORDS)
  const elementHits = findWord(normalized, ELEMENT_WORDS)
  const modifierHits = findWord(normalized, MODIFIER_WORDS)

  let archetypeKey = archetypeHits[0]?.key
  if (!archetypeKey) {
    const keys = ['pistol', 'rifle', 'smg', 'shotgun', 'sniper', 'cannon', 'bow', 'staff', 'gauntlet', 'blade']
    archetypeKey = keys[Math.floor(rand() * keys.length)]
  }

  let elementKey = elementHits[0]?.key
  if (!elementKey) {
    const keys = Object.keys(ELEMENTS)
    elementKey = keys[Math.floor(rand() * keys.length)]
  }

  const archetype = ARCHETYPES[archetypeKey] || ARCHETYPES.default
  const element = ELEMENTS[elementKey] || ELEMENTS.plasma
  const mods = new Set(modifierHits.map(hit => hit.key))

  let rarityScore = Math.max(0, archetypeHits.length - 1) + Math.max(0, elementHits.length - 1) + mods.size
  if (phrase.length > 24) rarityScore += 1
  if (phrase.length > 36) rarityScore += 1
  if (options.forceRarity) rarityScore = Math.max(rarityScore, options.forceRarity)
  const rarity = [...RARITIES].reverse().find(r => rarityScore >= r.min) || RARITIES[0]

  let damage = archetype.damage * element.damage * rarity.mult
  let rate = archetype.rate
  let spread = archetype.spread
  let pellets = archetype.pellets
  let mag = archetype.mag
  let reload = archetype.reload
  let speed = archetype.speed
  let recoil = archetype.recoil
  let range = archetype.range
  let size = archetype.size
  let pierce = archetype.pierce || 0
  let explosive = archetype.explosive || 0
  let homing = archetype.homing || 0
  let lifesteal = 0
  let infinite = false
  let chain = element.effect === 'chain' ? 1 : 0
  let freeze = element.effect === 'freeze' ? 1 : 0
  let burn = element.effect === 'burn' ? 1 : 0
  let poison = element.effect === 'poison' ? 1 : 0
  let voidPull = element.effect === 'void' ? 1 : 0
  let holy = element.effect === 'holy' ? 1 : 0
  let extraNote = ''

  if (mods.has('rapid') || mods.has('swift')) { rate *= 1.42; damage *= .84; recoil *= .82; extraNote = 'TURBO' }
  if (mods.has('heavy')) { damage *= 1.38; rate *= .78; size *= 1.22; recoil *= 1.25; extraNote = 'PESADA' }
  if (mods.has('mini')) { rate *= 1.3; damage *= .78; size *= .78; spread *= .8; extraNote = 'COMPACTA' }
  if (mods.has('triple')) { pellets += 2; spread += .026; damage *= .84 }
  if (mods.has('double')) { pellets += 1; spread += .014; damage *= .92 }
  if (mods.has('precise')) { spread *= .32; damage *= 1.12; extraNote = 'PRECISA' }
  if (mods.has('explosive')) { explosive += .85; damage *= 1.1; extraNote = 'EXPLOSIVA' }
  if (mods.has('piercing')) { pierce += 1; extraNote = 'PERFURANTE' }
  if (mods.has('homing')) { homing = Math.max(homing, 1.3); extraNote = 'GUIADA' }
  if (mods.has('vampiric')) { lifesteal = .13; extraNote = 'DRENANTE' }
  if (mods.has('eternal')) { infinite = true; extraNote = 'ETERNA' }
  if (mods.has('echo')) { pellets += 1; spread += .01; extraNote = 'RESSONANTE' }
  if (mods.has('lucky')) {
    const bonus = Math.floor(rand() * 3)
    if (bonus === 0) { damage *= 1.2; extraNote = 'CAÓTICA' }
    if (bonus === 1) { rate *= 1.22; extraNote = 'CAÓTICA' }
    if (bonus === 2) { pellets += 1; spread += .012; extraNote = 'CAÓTICA' }
  }

  if (archetypeKey === 'blade' && !pellets) pellets = 1
  if (archetypeKey === 'sniper') { pierce = Math.max(pierce, 1); explosive = 0 }
  if (archetypeKey === 'cannon' || archetypeKey === 'launcher') explosive = Math.max(explosive, 1)
  if (archetypeKey === 'shotgun') damage *= 1.02
  if (archetypeKey === 'staff' && homing > 0) homing = Math.max(homing, .85)

  damage = Math.max(3, Math.round(damage * 10) / 10)
  rate = Math.max(.55, Math.round(rate * 100) / 100)
  spread = Math.max(.0008, spread)
  mag = Math.max(1, Math.round(mag * (mods.has('eternal') ? 1.2 : 1)))
  speed = Math.max(16, speed)
  recoil = Math.max(.002, recoil)
  range = Math.max(24, range)
  size = Math.max(.6, Math.min(1.65, size))

  const name = phrase || `VOZ ${['GRAVE', 'AGUDA', 'RESSONANTE', 'SOMBRIA', 'LUMINOSA'][Math.floor(rand() * 5)]}`
  const subtitle = `${archetype.label} ${element.adj} // ${element.label}${extraNote ? ` · ${extraNote}` : ''}`

  const damageScore = Math.min(100, Math.round((damage / 1.7) + 8))
  const rateScore = Math.min(100, Math.round((rate / 15) * 100))
  const rangeScore = Math.min(100, Math.round((range / 140) * 100))

  return {
    id: `w-${seed.toString(36)}-${Math.floor(rand() * 9999).toString(36)}`,
    seed,
    phrase,
    name,
    subtitle,
    archetype,
    archetypeKey,
    element,
    elementKey,
    rarity,
    modifiers: [...mods],
    extraNote,
    damage,
    rate,
    spread,
    pellets,
    mag,
    reload,
    speed,
    recoil,
    range,
    size,
    pierce,
    explosive,
    homing,
    lifesteal,
    infinite,
    chain,
    freeze,
    burn,
    poison,
    voidPull,
    holy,
    projectile: archetype.projectile,
    scores: { damage: damageScore, rate: rateScore, range: rangeScore },
    color: element.color,
    rgb: element.rgb,
    glyph: element.glyph,
    archetypeGlyph: archetype.glyph
  }
}

export function createStarterWeapon() {
  const weapon = forgeWeapon('sussurro de plasma', { forceRarity: 0 })
  return {
    ...weapon,
    name: 'SUSSURRO',
    subtitle: 'PULSO DE INICIAÇÃO // PLASMA',
    rarity: RARITIES[0],
    archetype: ARCHETYPES.rifle,
    archetypeKey: 'rifle',
    archetypeGlyph: ARCHETYPES.rifle.glyph,
    damage: 16,
    rate: 3.2,
    spread: .008,
    pellets: 1,
    mag: 12,
    reload: 1.0,
    speed: 52,
    range: 70,
    recoil: .012,
    size: 1,
    projectile: 'bolt',
    explosive: 0,
    pierce: 0,
    homing: 0,
    infinite: false,
    color: ELEMENTS.plasma.color,
    rgb: ELEMENTS.plasma.rgb,
    glyph: ELEMENTS.plasma.glyph,
    scores: { damage: 42, rate: 34, range: 50 }
  }
}

export function rarityLabel(weapon) {
  return weapon?.rarity?.label || 'COMUM'
}

export { ARCHETYPES, ELEMENTS, RARITIES, MODIFIER_WORDS }
