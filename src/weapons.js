import * as THREE from 'three';

/* ============================================================
   Semantic weapon forge
   ============================================================ */

const ELEMENTS = [
  {
    id: 'fire',
    label: 'FOGO',
    color: 0xff6138,
    hex: '#ff6138',
    words: ['fogo', 'chama', 'chamas', 'flamejante', 'incendio', 'incendiaria', 'brasa', 'brasas', 'inferno', 'infernal', 'solar', 'sol', 'magma', 'lava', 'calor', 'explosao', 'explosiva'],
  },
  {
    id: 'ice',
    label: 'CRIO',
    color: 0x70eaff,
    hex: '#70eaff',
    words: ['gelo', 'congelante', 'congelada', 'congelado', 'glacial', 'frost', 'neve', 'nevasca', 'criogenico', 'criogenica', 'zero absoluto', 'frio', 'tempestade de gelo'],
  },
  {
    id: 'storm',
    label: 'ELETRO',
    color: 0xb08cff,
    hex: '#b08cff',
    words: ['raio', 'raios', 'eletrico', 'eletrica', 'eletro', 'trovao', 'tempestade', 'choque', 'relampago', 'voltagem', 'ionico', 'ionica', 'tesla'],
  },
  {
    id: 'plasma',
    label: 'PLASMA',
    color: 0xff56c9,
    hex: '#ff56c9',
    words: ['plasma', 'quantico', 'quantica', 'nuclear', 'estelar', 'estrela', 'cosmico', 'cosmica', 'galaxia', 'galatico', 'galactica', 'neutron', 'fusao'],
  },
  {
    id: 'toxic',
    label: 'ÁCIDO',
    color: 0xa5ff4f,
    hex: '#a5ff4f',
    words: ['acido', 'acida', 'veneno', 'venenosa', 'toxico', 'toxica', 'corrosivo', 'corrosiva', 'radioativo', 'radioativa', 'peste', 'podre', 'biologico'],
  },
  {
    id: 'void',
    label: 'VAZIO',
    color: 0xbc6bff,
    hex: '#bc6bff',
    words: ['sombra', 'sombras', 'vazio', 'caos', 'caotico', 'caotica', 'morte', 'mortal', 'demonio', 'demoniaco', 'trevas', 'abismo', 'escuridao', 'sangue', 'maligna'],
  },
  {
    id: 'prism',
    label: 'PRISMA',
    color: 0x69ffd5,
    hex: '#69ffd5',
    words: ['prisma', 'arco-iris', 'arco iris', 'cristal', 'cristalina', 'luz', 'sagrado', 'sagrada', 'divino', 'divina', 'anjo', 'angelical', 'arcano', 'arcana', 'espectro'],
  },
  {
    id: 'neutral',
    label: 'NEUTRO',
    color: 0xd7ff45,
    hex: '#d7ff45',
    words: [],
  },
];

const ARCHETYPES = [
  {
    id: 'cannon',
    label: 'CANHÃO',
    mode: 'EXPLOSIVO',
    words: ['canhao', 'canhoes', 'lancador', 'bazuca', 'morteiro', 'foguete', 'misil', 'bomba', 'torpedo', 'artilharia'],
    damage: 48,
    rate: 1.15,
    pellets: 1,
    spread: 0.008,
    splash: 3.4,
    range: 80,
    size: 1.06,
  },
  {
    id: 'shotgun',
    label: 'ESPINGARDA',
    mode: 'DISPARO DUPLO',
    words: ['espingarda', 'escopeta', 'shotgun', 'cartucheira', 'calibre 12', 'dispersao'],
    damage: 9,
    rate: 1.65,
    pellets: 7,
    spread: 0.095,
    splash: 0,
    range: 42,
    size: 1,
  },
  {
    id: 'rail',
    label: 'RAILGUN',
    mode: 'PERFURAÇÃO',
    words: ['sniper', 'precisao', 'railgun', 'rail gun', 'ferro', 'perfurante', 'magnetico', 'magnetica', 'anti-materia', 'antimateria'],
    damage: 68,
    rate: 0.82,
    pellets: 1,
    spread: 0.0015,
    splash: 0,
    range: 120,
    size: 1.08,
  },
  {
    id: 'minigun',
    label: 'MINIGUN',
    mode: 'SUPERSÔNICO',
    words: ['minigun', 'gatling', 'metralha', 'enxame', 'tempestade de balas'],
    damage: 5.5,
    rate: 15,
    pellets: 1,
    spread: 0.038,
    splash: 0,
    range: 60,
    size: 1.02,
  },
  {
    id: 'rifle',
    label: 'RIFLE',
    mode: 'AUTOMÁTICO',
    words: ['metralhadora', 'ametralhadora', 'rifle', 'fuzil', 'smg', 'uzi', 'submetralhadora', 'assalto', 'automática', 'automatica', 'metralhador'],
    damage: 12,
    rate: 7.2,
    pellets: 1,
    spread: 0.014,
    splash: 0,
    range: 70,
    size: 1,
  },
  {
    id: 'beam',
    label: 'EMISSOR',
    mode: 'FEIXE CONTÍNUO',
    words: ['laser', 'feixe', 'beam', 'pulso', 'foton', 'fotonico', 'fotonica', 'energia', 'disruptor', 'raios laser'],
    damage: 9.5,
    rate: 8.5,
    pellets: 1,
    spread: 0.006,
    splash: 0,
    range: 85,
    size: 0.99,
  },
  {
    id: 'pistol',
    label: 'PISTOLA',
    mode: 'SEMI-AUTO',
    words: ['pistola', 'revolver', 'handgun', 'derringer', 'calibre 45', 'calibre .45'],
    damage: 25,
    rate: 2.9,
    pellets: 1,
    spread: 0.005,
    splash: 0,
    range: 65,
    size: 0.92,
  },
];

const RARITIES = [
  { id: 'common', label: 'COMUM', color: '#9eafb6', multiplier: 1 },
  { id: 'rare', label: 'RARO', color: '#6de7ff', multiplier: 1.1 },
  { id: 'epic', label: 'ÉPICO', color: '#c083ff', multiplier: 1.22 },
  { id: 'legendary', label: 'LENDÁRIO', color: '#ffbd5a', multiplier: 1.38 },
  { id: 'mythic', label: 'MÍTICO', color: '#ff5c78', multiplier: 1.58 },
];

const SPECIAL_WORDS = [
  'supersonico', 'supersonica', 'hipersonico', 'hipersonica', 'quantico', 'quantica',
  'apocaliptico', 'apocaliptica', 'lendario', 'lendaria', 'divino', 'divina',
  'infinito', 'infinita', 'supremo', 'suprema', 'definitivo', 'definitiva',
  'cosmico', 'cosmica', 'invocado', 'invocada', 'proibido', 'proibida',
  'ancestral', 'imortal', 'absoluto', 'absoluta', 'perfeito', 'perfeita',
];

const FAST_WORDS = ['rapido', 'rapida', 'veloz', 'supersonico', 'supersonica', 'agil', 'frenetico', 'frenetica', 'instantaneo', 'instantanea'];
const HEAVY_WORDS = ['pesado', 'pesada', 'bruto', 'bruta', 'massivo', 'massiva', 'gigante', 'colossal', 'devastador', 'devastadora', 'apocaliptico', 'apocaliptica'];
const STABLE_WORDS = ['preciso', 'precisa', 'estavel', 'cirurgico', 'cirurgica', 'perfeito', 'perfeita'];
const CHAOS_WORDS = ['caotico', 'caotica', 'instavel', 'maluco', 'maluca', 'imprevisivel', 'selvagem'];
const TINY_WORDS = ['mini', 'miniatura', 'compacto', 'compacta', 'pequeno', 'pequena'];

export function normalizePhrase(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s\-.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

const wordRegexCache = new Map();

function wordRegex(word) {
  let regex = wordRegexCache.get(word);
  if (!regex) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match whole tokens so "metralhadora" is not mistaken for "metralha".
    regex = new RegExp(`(?:^|\\s)${escaped}(?=$|\\s)`);
    wordRegexCache.set(word, regex);
  }
  return regex;
}

function includesAny(normalized, words) {
  return words.some((word) => wordRegex(word).test(normalized));
}

function countWords(normalized, words) {
  return words.reduce((count, word) => wordRegex(word).test(normalized) ? count + 1 : count, 0);
}

function detectElement(normalized, seed) {
  let best = ELEMENTS[ELEMENTS.length - 1];
  let bestScore = 0;
  for (const element of ELEMENTS) {
    let score = countWords(normalized, element.words);
    if (score === 0) continue;
    // Stable tie breaker so the same phrase always produces the same weapon.
    score = score * 10 + ((seed >> (element.id.length % 24)) & 3) * 0.01;
    if (score > bestScore) {
      best = element;
      bestScore = score;
    }
  }
  return best;
}

function detectArchetype(normalized) {
  for (const archetype of ARCHETYPES) {
    if (includesAny(normalized, archetype.words)) return archetype;
  }
  // Unknown phrases still become a real weapon: forge a compact energy sidearm.
  return ARCHETYPES.find((a) => a.id === 'pistol');
}

function rarityFor(normalized, element, archetype, seed) {
  let score = 0;
  if (element.id !== 'neutral') score += 1;
  if (archetype.id !== 'pistol') score += 1;
  if (normalized.length >= 24) score += 1;
  if (includesAny(normalized, SPECIAL_WORDS)) score += 1;
  if (normalized.split(' ').length >= 5) score += 1;
  if ((seed % 17) === 0) score += 1;
  score += (seed % 7 === 0 && score > 1) ? 1 : 0;
  const index = Math.max(0, Math.min(RARITIES.length - 1, score - 1));
  return RARITIES[index];
}

function titleFor(raw) {
  const cleaned = String(raw || '')
    .replace(/\s+/g, ' ')
    .replace(/^[\s.,;:!?—–-]+|[\s.,;:!?—–-]+$/g, '')
    .trim();
  if (!cleaned) return 'ARMA SEM NOME';
  return cleaned.length > 72 ? `${cleaned.slice(0, 69).trim()}…` : cleaned;
}

export function createWeaponFromPhrase(rawPhrase) {
  const phrase = titleFor(rawPhrase);
  const normalized = normalizePhrase(phrase);
  const seed = hashString(normalized || 'vazio');
  const element = detectElement(normalized, seed);
  const archetype = detectArchetype(normalized);
  const rarity = rarityFor(normalized, element, archetype, seed);
  const variance = 0.92 + ((seed % 16) / 100);

  let damage = archetype.damage * rarity.multiplier * variance;
  let rate = archetype.rate * (0.94 + ((seed >> 3) % 13) / 100);
  let spread = archetype.spread;
  const size = archetype.size;

  if (includesAny(normalized, FAST_WORDS)) {
    rate *= 1.18;
    damage *= 0.94;
  }
  if (includesAny(normalized, HEAVY_WORDS)) {
    damage *= 1.2;
    rate *= 0.9;
    spread *= 1.12;
  }
  if (includesAny(normalized, STABLE_WORDS)) {
    spread *= 0.45;
  }
  if (includesAny(normalized, CHAOS_WORDS)) {
    spread *= 1.65;
    rate *= 1.08;
  }
  if (includesAny(normalized, TINY_WORDS)) {
    rate *= 1.12;
  }

  const isPellets = archetype.pellets > 1;
  const displayedDamage = isPellets ? damage * archetype.pellets : damage;
  const displayKind = {
    cannon: 'CANHÃO',
    shotgun: 'ESPINGARDA',
    rail: 'RAILGUN',
    minigun: 'MINIGUN',
    rifle: 'RIFLE',
    beam: 'EMISSOR',
    pistol: 'PISTOLA',
  }[archetype.id];

  return {
    id: `w-${seed}`,
    seed,
    phrase,
    normalized,
    name: phrase.toUpperCase(),
    title: phrase,
    element,
    archetype,
    rarity,
    kind: element.id === 'neutral' ? displayKind : `${displayKind} DE ${element.label}`,
    mode: archetype.mode,
    stats: {
      damage: Math.round(damage * 10) / 10,
      displayedDamage: Math.round(displayedDamage),
      rate: Math.round(rate * 10) / 10,
      pellets: archetype.pellets,
      spread,
      splash: archetype.splash,
      range: archetype.range,
      crit: 0.13 + rarity.multiplier * 0.025,
      size,
      isPellets,
    },
    bars: {
      damage: Math.min(100, Math.max(9, (displayedDamage / 17) * 12)),
      rate: Math.min(100, Math.max(7, (rate / 15) * 100)),
    },
    accent: element.hex,
    accentRgb: hexToRgbTriplet(element.hex),
    createdAt: Date.now(),
  };
}

function hexToRgbTriplet(hex) {
  const value = hex.replace('#', '');
  const num = parseInt(value, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

/* ============================================================
   Procedural weapon models
   ============================================================ */

let glowTexture = null;

function getGlowTexture() {
  if (glowTexture) return glowTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.12, 'rgba(255,255,255,0.94)');
  gradient.addColorStop(0.36, 'rgba(255,255,255,0.32)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  glowTexture = new THREE.CanvasTexture(canvas);
  glowTexture.colorSpace = THREE.SRGBColorSpace;
  return glowTexture;
}

function box(group, material, size, position, rotation = null) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
  mesh.position.set(position[0], position[1], position[2]);
  if (rotation) mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  group.add(mesh);
  return mesh;
}

function cylinder(group, material, radiusTop, radiusBottom, height, position, rotation = null, segments = 12) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), material);
  mesh.position.set(position[0], position[1], position[2]);
  if (rotation) mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  group.add(mesh);
  return mesh;
}

function ring(group, material, radius, tube, position, rotation = [Math.PI / 2, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, 26), material);
  mesh.position.set(position[0], position[1], position[2]);
  mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  group.add(mesh);
  return mesh;
}

function glowSprite(group, color, scale, position) {
  const material = new THREE.SpriteMaterial({
    map: getGlowTexture(),
    color,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scale, scale, 1);
  sprite.position.set(position[0], position[1], position[2]);
  group.add(sprite);
  return sprite;
}

function accentMaterials(element, rarity) {
  const accent = new THREE.Color(element.color);
  const body = new THREE.MeshStandardMaterial({
    color: 0x2a3340,
    metalness: 0.52,
    roughness: 0.4,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x151a22,
    metalness: 0.45,
    roughness: 0.52,
  });
  const steel = new THREE.MeshStandardMaterial({
    color: 0x707b86,
    metalness: 0.6,
    roughness: 0.3,
  });
  const glow = new THREE.MeshStandardMaterial({
    color: accent,
    emissive: accent,
    emissiveIntensity: 2.1,
    metalness: 0.25,
    roughness: 0.26,
  });
  const glowSoft = new THREE.MeshBasicMaterial({
    color: accent,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const rarityMetal = new THREE.MeshStandardMaterial({
    color: new THREE.Color(rarity.color),
    metalness: 0.62,
    roughness: 0.26,
    emissive: new THREE.Color(rarity.color),
    emissiveIntensity: 0.13,
  });
  return { body, dark, steel, glow, glowSoft, rarityMetal, accent };
}

export function buildWeaponModel(weapon) {
  const group = new THREE.Group();
  const materials = accentMaterials(weapon.element, weapon.rarity);
  const { body, dark, steel, glow, glowSoft, rarityMetal } = materials;
  const animated = [];
  const spinners = [];
  let muzzlePosition = new THREE.Vector3(0, 0, -1.2);
  let core = null;

  switch (weapon.archetype.id) {
    case 'rifle': {
      box(group, body, [0.18, 0.2, 0.55], [0, 0, -0.22]);
      box(group, steel, [0.095, 0.095, 0.58], [0, 0.015, -0.7]);
      cylinder(group, dark, 0.034, 0.04, 0.36, [0, 0.015, -1.1], [Math.PI / 2, 0, 0], 10);
      box(group, dark, [0.055, 0.17, 0.075], [0, 0.08, -0.42]);
      box(group, body, [0.14, 0.21, 0.2], [0, -0.04, 0.11]);
      box(group, dark, [0.1, 0.24, 0.09], [0, -0.13, -0.18], [0.18, 0, 0]);
      box(group, dark, [0.09, 0.2, 0.14], [0, -0.14, 0.035], [-0.25, 0, 0]);
      box(group, glow, [0.026, 0.028, 0.48], [0.1, 0.055, -0.28]);
      box(group, glow, [0.026, 0.028, 0.36], [-0.1, 0.055, -0.32]);
      cylinder(group, rarityMetal, 0.056, 0.056, 0.19, [0, 0.15, -0.35], [Math.PI / 2, 0, 0], 12);
      cylinder(group, glow, 0.019, 0.019, 0.06, [0, 0.15, -0.45], [Math.PI / 2, 0, 0], 8);
      ring(group, glow, 0.075, 0.008, [0, 0.015, -0.93]);
      ring(group, glowSoft, 0.105, 0.019, [0, 0.015, -0.93]);
      muzzlePosition = new THREE.Vector3(0, 0.015, -1.31);
      break;
    }
    case 'minigun': {
      box(group, body, [0.26, 0.26, 0.42], [0, 0, -0.12]);
      cylinder(group, steel, 0.14, 0.14, 0.15, [0, 0, -0.37], [Math.PI / 2, 0, 0], 16);
      const barrelCluster = new THREE.Group();
      barrelCluster.position.set(0, 0, -0.63);
      group.add(barrelCluster);
      for (let i = 0; i < 7; i += 1) {
        const angle = (i / 7) * Math.PI * 2;
        const x = Math.cos(angle) * 0.075;
        const y = Math.sin(angle) * 0.075;
        cylinder(barrelCluster, i % 2 ? steel : dark, 0.021, 0.021, 0.75, [x, y, -0.25], [Math.PI / 2, 0, 0], 8);
      }
      ring(barrelCluster, glow, 0.112, 0.011, [0, 0, 0.03]);
      ring(barrelCluster, glow, 0.112, 0.011, [0, 0, -0.48]);
      spinners.push(barrelCluster);
      cylinder(group, dark, 0.09, 0.11, 0.19, [0, -0.19, -0.12], [0, 0, Math.PI / 2], 10);
      box(group, glow, [0.03, 0.03, 0.45], [0.145, 0.03, -0.1]);
      box(group, glow, [0.03, 0.03, 0.45], [-0.145, 0.03, -0.1]);
      muzzlePosition = new THREE.Vector3(0, 0, -1.3);
      break;
    }
    case 'shotgun': {
      box(group, body, [0.22, 0.22, 0.54], [0, -0.01, -0.18]);
      cylinder(group, steel, 0.055, 0.06, 0.94, [-0.065, 0.055, -0.77], [Math.PI / 2, 0, 0], 12);
      cylinder(group, dark, 0.055, 0.06, 0.94, [0.065, 0.055, -0.77], [Math.PI / 2, 0, 0], 12);
      box(group, dark, [0.22, 0.16, 0.24], [0, -0.04, -0.56]);
      box(group, rarityMetal, [0.035, 0.13, 0.22], [0, 0.14, -0.5]);
      box(group, body, [0.18, 0.22, 0.31], [0, -0.07, 0.16]);
      box(group, dark, [0.1, 0.23, 0.1], [0, -0.16, -0.02], [0.18, 0, 0]);
      box(group, glow, [0.03, 0.025, 0.58], [0.12, 0.01, -0.27]);
      box(group, glow, [0.03, 0.025, 0.58], [-0.12, 0.01, -0.27]);
      ring(group, glow, 0.09, 0.008, [0, 0.055, -0.95]);
      muzzlePosition = new THREE.Vector3(0, 0.055, -1.26);
      break;
    }
    case 'cannon': {
      box(group, body, [0.28, 0.28, 0.44], [0, 0, -0.1]);
      cylinder(group, dark, 0.13, 0.16, 0.72, [0, 0.02, -0.64], [Math.PI / 2, 0, 0], 14);
      cylinder(group, steel, 0.185, 0.185, 0.15, [0, 0.02, -0.34], [Math.PI / 2, 0, 0], 14);
      cylinder(group, steel, 0.185, 0.185, 0.15, [0, 0.02, -0.72], [Math.PI / 2, 0, 0], 14);
      cylinder(group, glow, 0.116, 0.116, 0.02, [0, 0.02, -1.01], [Math.PI / 2, 0, 0], 18);
      box(group, dark, [0.23, 0.22, 0.19], [0, -0.15, 0.14]);
      box(group, dark, [0.12, 0.26, 0.13], [0, -0.17, -0.02], [0.16, 0, 0]);
      box(group, glow, [0.03, 0.04, 0.44], [0.15, 0.09, -0.13]);
      box(group, glow, [0.03, 0.04, 0.44], [-0.15, 0.09, -0.13]);
      core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.12, 1), glow);
      core.position.set(0, 0.02, -1.03);
      group.add(core);
      glowSprite(group, weapon.element.color, 0.52, [0, 0.02, -1.04]);
      ring(group, glow, 0.22, 0.012, [0, 0.02, -1.02]);
      animated.push({ object: core, spin: 1.8 });
      muzzlePosition = new THREE.Vector3(0, 0.02, -1.2);
      break;
    }
    case 'rail': {
      box(group, body, [0.15, 0.17, 0.78], [0, 0, -0.34]);
      box(group, dark, [0.045, 0.13, 0.9], [-0.1, 0.02, -0.72]);
      box(group, dark, [0.045, 0.13, 0.9], [0.1, 0.02, -0.72]);
      box(group, steel, [0.2, 0.08, 0.24], [0, 0.055, -0.15]);
      box(group, dark, [0.085, 0.18, 0.11], [0, -0.13, -0.02], [0.2, 0, 0]);
      box(group, body, [0.16, 0.19, 0.28], [0, -0.02, 0.09]);
      cylinder(group, rarityMetal, 0.06, 0.06, 0.42, [0, 0.18, -0.38], [Math.PI / 2, 0, 0], 12);
      cylinder(group, glow, 0.019, 0.019, 0.45, [0, 0.18, -0.38], [Math.PI / 2, 0, 0], 10);
      for (let i = 0; i < 3; i += 1) {
        const coil = new THREE.Group();
        coil.position.z = -0.48 - i * 0.2;
        ring(coil, glow, 0.115, 0.009, [0, 0.02, 0], [0, 0, 0]);
        coil.rotation.x = Math.PI / 2;
        group.add(coil);
        animated.push({ object: coil, spin: i % 2 ? -2.4 : 2.4 });
      }
      box(group, glow, [0.024, 0.03, 0.99], [0.112, 0.035, -0.6]);
      box(group, glow, [0.024, 0.03, 0.99], [-0.112, 0.035, -0.6]);
      muzzlePosition = new THREE.Vector3(0, 0.02, -1.36);
      break;
    }
    case 'beam': {
      box(group, body, [0.18, 0.18, 0.48], [0, 0, -0.05]);
      cylinder(group, dark, 0.075, 0.095, 0.56, [0, 0, -0.46], [Math.PI / 2, 0, 0], 12);
      box(group, dark, [0.1, 0.21, 0.1], [0, -0.15, -0.02], [0.18, 0, 0]);
      box(group, body, [0.14, 0.18, 0.16], [0, -0.015, 0.13]);
      core = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), glow);
      core.position.set(0, 0, -0.82);
      group.add(core);
      glowSprite(group, weapon.element.color, 0.44, [0, 0, -0.82]);
      for (let i = 0; i < 4; i += 1) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        box(group, steel, [0.03, 0.03, 0.38], [Math.cos(angle) * 0.12, Math.sin(angle) * 0.12, -0.74]);
      }
      ring(group, glow, 0.145, 0.01, [0, 0, -0.78]);
      ring(group, glowSoft, 0.18, 0.02, [0, 0, -0.78]);
      box(group, glow, [0.025, 0.028, 0.4], [0.1, 0.055, -0.2]);
      box(group, glow, [0.025, 0.028, 0.4], [-0.1, 0.055, -0.2]);
      animated.push({ object: core, spin: 2.8 });
      muzzlePosition = new THREE.Vector3(0, 0, -1.08);
      break;
    }
    case 'pistol':
    default: {
      box(group, body, [0.17, 0.2, 0.4], [0, 0, -0.08]);
      box(group, steel, [0.085, 0.1, 0.34], [0, 0.04, -0.35]);
      cylinder(group, dark, 0.034, 0.038, 0.17, [0, 0.04, -0.6], [Math.PI / 2, 0, 0], 10);
      box(group, dark, [0.12, 0.28, 0.14], [0, -0.18, 0.02], [0.18, 0, 0]);
      box(group, glow, [0.025, 0.024, 0.31], [0.095, 0.015, -0.1]);
      box(group, glow, [0.025, 0.024, 0.31], [-0.095, 0.015, -0.1]);
      ring(group, glow, 0.064, 0.007, [0, 0.04, -0.68]);
      box(group, rarityMetal, [0.07, 0.03, 0.09], [0, 0.13, -0.2]);
      muzzlePosition = new THREE.Vector3(0, 0.04, -0.75);
      break;
    }
  }

  const muzzle = new THREE.Object3D();
  muzzle.position.copy(muzzlePosition);
  group.add(muzzle);

  const muzzleGlow = glowSprite(group, weapon.element.color, 0.5, muzzlePosition.toArray());
  muzzleGlow.material.opacity = 0.32;

  const muzzleLight = new THREE.PointLight(weapon.element.color, 0.55, 3.2, 2);
  muzzleLight.position.copy(muzzlePosition);
  group.add(muzzleLight);

  // A small holographic identity plate: motion in 3D even when the player stands still.
  const holo = new THREE.Group();
  holo.position.set(0, -0.19, -0.35);
  for (let i = 0; i < 3; i += 1) {
    const bar = new THREE.Mesh(
      new THREE.PlaneGeometry(0.055 + i * 0.016, 0.004),
      new THREE.MeshBasicMaterial({
        color: weapon.element.color,
        transparent: true,
        opacity: 0.4 - i * 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    bar.position.set(0, -i * 0.011, 0);
    bar.rotation.x = -Math.PI / 2;
    holo.add(bar);
  }
  group.add(holo);
  animated.push({ object: holo, spin: 0.45 });

  group.traverse((child) => {
    if (child.isMesh) {
      child.renderOrder = 3;
      child.frustumCulled = false;
    }
  });

  return {
    group,
    muzzle,
    muzzleGlow,
    muzzleLight,
    materials: Object.values(materials),
    animated,
    spinners,
    scale: weapon.stats.size,
    bodyMaterials: [body, dark, steel],
  };
}

export function disposeWeaponModel(model) {
  if (!model) return;
  model.group.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
      else if (!child.material.userData?.shared) child.material.dispose();
    }
  });
  if (model.group.parent) model.group.parent.remove(model.group);
}
