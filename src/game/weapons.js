import * as THREE from 'three';
import { clamp, hashString, normalizeText, hexToCss } from './utils.js';

/* ============================================================
   Weapon archetypes
   ============================================================ */
export const ARCHETYPES = {
  pulse: {
    id: 'pulse', label: 'PULSO', tag: 'AUTO', effect: 'none', effectLabel: 'CADÊNCIA ESTÁVEL',
    color: 0x3ef3ff, damage: 12, rpm: 560, ammo: 70, spread: 0.013, pellets: 1,
    projectile: false, speed: 0, splash: 0, chain: 0, range: 110,
    blurb: 'Rifle de frequência. Versátil, rápido, letal de perto a médio alcance.'
  },
  scatter: {
    id: 'scatter', label: 'ESTILHAÇO', tag: 'SPREAD', effect: 'none', effectLabel: 'LEQUE DE 8 PROJÉTEIS',
    color: 0xff8a3d, damage: 9, rpm: 92, ammo: 12, spread: 0.115, pellets: 8,
    projectile: false, speed: 0, splash: 0, chain: 0, range: 52,
    blurb: 'Cano duplo vocal. Transforma uma sílaba curta em oito estilhaços.'
  },
  beam: {
    id: 'beam', label: 'FEIXE', tag: 'PRECISÃO', effect: 'pierce', effectLabel: 'PERFURA ATÉ 4 ALVOS',
    color: 0xb06bff, damage: 55, rpm: 132, ammo: 30, spread: 0.002,
    projectile: false, speed: 0, splash: 0, chain: 0, range: 160,
    blurb: 'Um vetor de luz coerente. Atravessa a formação inimiga inteira.'
  },
  arc: {
    id: 'arc', label: 'ARCO', tag: 'CADEIA', effect: 'chain', effectLabel: 'SALTA ENTRE 3 ALVOS',
    color: 0x6ce6ff, damage: 34, rpm: 216, ammo: 36, spread: 0.008,
    projectile: false, speed: 0, splash: 0, chain: 3, range: 95,
    blurb: 'Eletricidade ressonante. O raio procura o próximo alvo sozinho.'
  },
  havoc: {
    id: 'havoc', label: 'CATACLISMA', tag: 'EXPLOSIVO', effect: 'splash', effectLabel: 'ONDA DE CHOQUE',
    color: 0xff5a36, damage: 90, rpm: 72, ammo: 7, spread: 0.014, pellets: 1,
    projectile: true, speed: 27, splash: 4.2, chain: 0, range: 130,
    blurb: 'Matéria instável comprimida em uma palavra. Não atire perto de você.'
  },
  frost: {
    id: 'frost', label: 'GEADA', tag: 'CONTROLE', effect: 'slow', effectLabel: 'CONGELA E DESACELERA',
    color: 0x9fefff, damage: 22, rpm: 300, ammo: 42, spread: 0.028, pellets: 1,
    projectile: true, speed: 46, splash: 1.2, chain: 0, range: 90,
    blurb: 'Estilhaços de silêncio. Reduz a velocidade de tudo que toca.'
  },
  venom: {
    id: 'venom', label: 'TOXINA', tag: 'DANO CONTÍNUO', effect: 'venom', effectLabel: 'CORRÓI COM O TEMPO',
    color: 0x8dff5b, damage: 16, rpm: 270, ammo: 46, spread: 0.035, pellets: 1,
    projectile: true, speed: 38, splash: 1.4, chain: 0, range: 95,
    blurb: 'Uma palavra ácida. O dano continua sussurrando depois do impacto.'
  },
  vampire: {
    id: 'vampire', label: 'SANGUE', tag: 'DRENAGEM', effect: 'leech', effectLabel: 'ROUBA VIDA AO ACERTAR',
    color: 0xff3b6b, damage: 30, rpm: 186, ammo: 34, spread: 0.016, pellets: 1,
    projectile: false, speed: 0, splash: 0, chain: 0, range: 100,
    blurb: 'Ferida que se alimenta. Cada acerto devolve integridade à sua voz.'
  },
  bloom: {
    id: 'bloom', label: 'ORVALHO', tag: 'GUIADO', effect: 'homing', effectLabel: 'PROJÉTEIS PERSEGUEM',
    color: 0xffd166, damage: 26, rpm: 200, ammo: 30, spread: 0.02, pellets: 1,
    projectile: true, speed: 30, splash: 1.6, chain: 0, range: 120,
    blurb: 'Pétalas de frequência doce. Elas encontram o alvo por conta própria.'
  }
};

const SEMANTICS = [
  ['arc', ['trovao', 'trovoada', 'relampago', 'raio', 'tempestade', 'eletricidade', 'choque', 'tesla', 'storm', 'thunder', 'lightning', 'shock', 'electric', 'zap', 'voltagem']],
  ['havoc', ['fogo', 'fogueira', 'chama', 'brasa', 'lava', 'vulcao', 'meteoro', 'bomba', 'explosao', 'foguete', 'granada', 'dinamite', 'dragão', 'dragao', 'fire', 'flame', 'meteor', 'bomb', 'rocket', 'explosion', 'boom', 'sol', 'sun', 'furnace']],
  ['frost', ['gelo', 'neve', 'frio', 'geada', 'inverno', 'congelar', 'iceberg', 'cristal', 'ice', 'snow', 'frost', 'freeze', 'winter', 'crystal', 'glacier']],
  ['venom', ['veneno', 'toxico', 'toxina', 'acido', 'cobra', 'serpente', 'peste', 'poison', 'toxic', 'acid', 'venom', 'snake', 'plague', 'slime']],
  ['beam', ['laser', 'feixe', 'luz', 'brilho', 'estrela', 'foton', 'prisma', 'light', 'beam', 'star', 'photon', 'prism', 'glow', 'raio laser']],
  ['scatter', ['agua', 'chuva', 'oceano', 'mar', 'splash', 'estilaco', 'vidro', 'water', 'rain', 'ocean', 'sea', 'banana', 'uva', 'comida', 'pizza', 'cafe', 'coffee', 'food', 'milkshake', 'suco']],
  ['vampire', ['sangue', 'morte', 'sombra', 'escuro', 'demonio', 'vampiro', 'noite', 'abismo', 'blood', 'death', 'shadow', 'dark', 'demon', 'vampire', 'night', 'abyss', 'cruel']],
  ['bloom', ['amor', 'coracao', 'beijo', 'flor', 'rosa', 'paixao', 'aurora', 'sonho', 'love', 'heart', 'kiss', 'flower', 'rose', 'dream', 'doce', 'sweet', 'anjo', 'angel']],
  ['pulse', ['vento', 'brisa', 'tornado', 'furacao', 'ar', 'voz', 'sussurro', 'eco', 'som', 'wind', 'breeze', 'tornado', 'hurricane', 'voice', 'whisper', 'echo', 'sound']]
];

const FALLBACK_WORDS = {
  grave: ['TROVÃO', 'VULCÃO', 'ABISMO', 'COLOSSO', 'MURMÚRIO'],
  medio: ['SUSSURRO', 'ECO', 'VÉU', 'PRISMA', 'MARÉ'],
  agudo: ['FAÍSCA', 'AGULHA', 'CRISTAL', 'ALVORADA', 'ZUMBIDO']
};

const RARITIES = [
  { name: 'COMUM', color: '#9db4c0', min: 0 },
  { name: 'RARA', color: '#3ef3ff', min: 105 },
  { name: 'ÉPICA', color: '#b06bff', min: 128 },
  { name: 'MÍTICA', color: '#ff2e9a', min: 154 },
  { name: 'LENDÁRIA', color: '#ffbf47', min: 190 }
];

const memory = new Set();
let serial = 0;

function chooseArchetype(norm, hash) {
  const tokens = norm.split(' ').filter(Boolean);
  for (const [type, words] of SEMANTICS) {
    for (const token of tokens) {
      if (words.includes(token)) return type;
    }
  }
  for (const [type, words] of SEMANTICS) {
    for (const word of words) {
      if (word.length > 3 && norm.includes(word)) return type;
    }
  }
  const order = ['pulse', 'scatter', 'beam', 'arc', 'havoc', 'frost', 'venom', 'vampire', 'bloom'];
  return order[hash % order.length];
}

function rarityFor(score) {
  let out = RARITIES[0];
  for (const r of RARITIES) if (score >= r.min) out = r;
  return out;
}

function sanitizeWord(word) {
  return String(word || '')
    .replace(/[<>{}[\]\\/|`~^*_=+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 30);
}

/**
 * The heart of the game: turn any spoken (or typed) phrase plus acoustic
 * measurements into a deterministic, playable weapon.
 */
export function forgeWeapon({ word = '', level = 0.55, pitch = 0.5, duration = 0.9, source = 'voice' } = {}) {
  const display = sanitizeWord(word).toUpperCase() || 'SUSSURRO';
  const norm = normalizeText(display) || 'sussurro';
  const hash = hashString(norm + ':' + source);
  const type = chooseArchetype(norm, hash);
  const base = ARCHETYPES[type];

  const loud = clamp(Number(level) || 0.55, 0, 1);
  const high = clamp(Number(pitch) || 0.5, 0, 1);
  const held = clamp(Number(duration) || 0.8, 0.15, 4);

  let damage = base.damage * (0.86 + loud * 0.52);
  let rpm = base.rpm * (1.16 - high * 0.3);
  let ammo = base.ammo * (0.82 + Math.min(held, 3.2) / 3.2 * 0.38 + display.length * 0.012);
  let pellets = base.pellets;
  let spread = base.spread;
  let effect = base.effect;
  let splash = base.splash;
  let chain = base.chain;
  let projectile = base.projectile;
  let speed = base.speed;
  let recoil = 1;

  const has = (...words) => words.some((w) => norm.includes(w));

  if (has('mega', 'super', 'ultra', 'giga', 'titan', 'hyper', 'supremo', 'lendari', 'divino')) {
    damage *= 1.52; ammo *= 0.82; rpm *= 0.92; recoil *= 1.3;
  }
  if (has('mini', 'micro', 'pequen', 'tiny', 'little')) {
    rpm *= 1.55; damage *= 0.68; ammo *= 1.16; recoil *= 0.65;
  }
  if (has('infinit', 'eterno', 'eternal', 'infinite')) {
    ammo = 999;
  }
  if (has('silencios', 'silent', 'quiet', 'sussurr')) {
    recoil *= 0.35; damage *= 1.1;
  }
  if (has('duplo', 'dupla', 'double', 'dual')) {
    pellets = Math.max(2, pellets * 2); damage *= 0.72; spread *= 1.25;
  }
  if (has('triplo', 'tripla', 'triple')) {
    pellets = Math.max(3, pellets * 3); damage *= 0.58; spread *= 1.35;
  }
  if (has('lento', 'slow', 'pesado', 'heavy')) {
    rpm *= 0.58; damage *= 1.7; recoil *= 1.4; ammo *= 0.85;
  }
  if (has('rapido', 'fast', 'veloz', 'speed')) {
    rpm *= 1.42; damage *= 0.82; recoil *= 0.8;
  }
  if (has('venen', 'acid', 'toxico')) effect = 'venom';
  if (has('gelo', 'frost', 'freeze', 'congel')) effect = 'slow';
  if (has('fogo', 'fire', 'flame', 'queim')) effect = 'burn';

  const variance = ((hash % 1000) / 1000 - 0.5);
  damage *= 1 + variance * 0.18;
  rpm *= 1 - variance * 0.12;
  ammo *= 1 + ((hash >>> 10) % 100) / 100 * 0.25 - 0.1;

  damage = clamp(Math.round(damage), 3, 240);
  rpm = clamp(Math.round(rpm / 5) * 5, 40, 900);
  ammo = clamp(Math.round(ammo), 3, 999);
  spread = clamp(spread * (0.85 + loud * 0.3), 0.0008, 0.2);
  if (ammo === 999) pellets = Math.max(1, pellets);

  const dps = damage * pellets * (rpm / 60) * (effect !== 'none' ? 1.12 : 1);
  const score = dps + (splash ? 14 : 0) + (chain ? chain * 4 : 0) + (projectile ? 3 : 0);
  const rarity = rarityFor(score);

  const color = new THREE.Color(base.color);
  color.offsetHSL((hash % 100) / 100 * 0.06 - 0.03, 0, ((hash >>> 4) % 100) / 100 * 0.08 - 0.04);
  const css = `#${color.getHexString()}`;
  const bright = color.clone().offsetHSL(0, 0, 0.16);

  const id = ++serial;
  memory.add(display);

  return {
    id,
    source,
    word: display,
    norm,
    type,
    archetype: base,
    label: base.label,
    tag: base.tag,
    effect,
    effectLabel: base.effectLabel,
    blurb: base.blurb,
    color: color.getHex(),
    css,
    glow: `#${bright.getHexString()}`,
    rarity: rarity.name,
    rarityColor: rarity.color,
    stats: {
      damage,
      rpm,
      ammo,
      maxAmmo: ammo,
      spread,
      pellets,
      projectile,
      speed,
      splash,
      chain,
      range: base.range,
      recoil,
      fireInterval: 60 / rpm,
      dps: Math.round(dps)
    },
    metrics: { level: loud, pitch: high, duration: held }
  };
}

export function makeFallbackWeapon() {
  const base = ARCHETYPES.pulse;
  return {
    id: 0,
    source: 'fallback',
    word: 'SUSSURRO',
    norm: 'sussurro',
    type: 'pulse',
    archetype: base,
    label: 'PULSO',
    tag: 'BACKUP',
    effect: 'none',
    effectLabel: 'PULSO DE EMERGÊNCIA',
    blurb: 'Sua voz de reserva. Infinita, silenciosa, sempre com você.',
    color: base.color,
    css: hexToCss(base.color),
    glow: '#affcff',
    rarity: 'COMUM',
    rarityColor: '#9db4c0',
    stats: {
      damage: 9, rpm: 420, ammo: Infinity, maxAmmo: Infinity, spread: 0.018,
      pellets: 1, projectile: false, speed: 0, splash: 0, chain: 0,
      range: 90, recoil: 0.55, fireInterval: 60 / 420, dps: 63
    },
    metrics: { level: 0.3, pitch: 0.5, duration: 1 }
  };
}

export function fallbackWordFor(level = 0.5, pitch = 0.5) {
  const bucket = pitch < 0.38 ? 'grave' : pitch > 0.62 ? 'agudo' : 'medio';
  const list = FALLBACK_WORDS[bucket];
  const word = list[Math.floor(Math.random() * list.length)];
  return level > 0.78 ? `MEGA ${word}` : level < 0.18 ? `MINI ${word}` : word;
}

export function spokenCount() { return memory.size; }

/* ============================================================
   3D viewmodel — one bespoke silhouette per archetype
   ============================================================ */
function mat(color, emissive = 0x000000, emissiveIntensity = 0, extra = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity,
    metalness: 0.25,
    roughness: 0.45,
    fog: false,
    ...extra
  });
}

function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  return m;
}

function cyl(radiusTop, radiusBottom, height, material, x = 0, y = 0, z = 0, radial = 12) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radial), material);
  m.rotation.x = Math.PI / 2;
  m.position.set(x, y, z);
  return m;
}

function torus(radius, tube, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, 28), material);
  m.position.set(x, y, z);
  return m;
}

function hands(gun, M, accentM) {
  const glove = mat(0x2a2744, 0x1a1636, 0.55, { metalness: 0.2, roughness: 0.7 });
  const cuff = mat(0x39335c, 0x261e4a, 0.7, { metalness: 0.25, roughness: 0.6 });

  const right = new THREE.Group();
  const palmR = box(0.085, 0.1, 0.11, glove, 0, -0.02, 0);
  const thumbR = box(0.028, 0.055, 0.075, glove, -0.05, 0.01, -0.018);
  thumbR.rotation.z = 0.55;
  const sleeveR = box(0.11, 0.13, 0.2, cuff, 0.012, -0.06, 0.13);
  sleeveR.rotation.x = -0.22;
  const trimR = box(0.113, 0.012, 0.2, accentM, 0.012, 0.006, 0.13);
  trimR.rotation.x = -0.22;
  right.add(palmR, thumbR, sleeveR, trimR);
  right.position.set(0.015, -0.115, 0.02);
  right.rotation.x = 0.16;
  gun.add(right);

  const left = new THREE.Group();
  const palmL = box(0.1, 0.075, 0.13, glove, 0, 0, 0);
  const thumbL = box(0.07, 0.03, 0.04, glove, 0.035, 0.045, -0.055);
  const sleeveL = box(0.13, 0.11, 0.2, cuff, -0.03, -0.055, 0.11);
  sleeveL.rotation.x = -0.14;
  sleeveL.rotation.z = -0.24;
  const trimL = box(0.132, 0.012, 0.2, accentM, -0.03, 0.001, 0.11);
  trimL.rotation.x = -0.14;
  trimL.rotation.z = -0.24;
  left.add(palmL, thumbL, sleeveL, trimL);
  left.position.set(-0.035, -0.075, -0.32);
  left.rotation.z = -0.08;
  gun.add(left);
}

function commonSight(gun, M, glowM, z = -0.18, y = 0.115) {
  gun.add(box(0.07, 0.024, 0.11, M, 0, y, z));
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 8), glowM);
  dot.position.set(0, y + 0.012, z - 0.06);
  gun.add(dot);
  return dot;
}

function energyCell(gun, glowM, x, y, z) {
  const cell = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.13, 10), glowM);
  cell.position.set(x, y, z);
  gun.add(cell);
  gun.add(torus(0.044, 0.007, mat(0x0b0c16, 0x000000, 0), x, y, z));
}

const BUILDERS = {
  pulse(gun, M, accentM, glowM, weapon) {
    gun.add(box(0.16, 0.15, 0.5, M, 0, 0, -0.16));
    gun.add(box(0.12, 0.05, 0.34, M, 0, 0.075, -0.25));
    gun.add(box(0.18, 0.1, 0.14, M, 0, -0.02, 0.1));
    gun.add(box(0.04, 0.03, 0.4, accentM, 0, -0.083, -0.18));
    gun.add(box(0.02, 0.02, 0.3, accentM, 0.072, 0.06, -0.24));
    gun.add(box(0.02, 0.02, 0.3, accentM, -0.072, 0.06, -0.24));
    const barrel = cyl(0.032, 0.038, 0.4, M, 0, 0.012, -0.58);
    gun.add(barrel);
    gun.add(cyl(0.046, 0.046, 0.05, accentM, 0, 0.012, -0.755));
    gun.add(box(0.09, 0.16, 0.065, M, 0, -0.12, -0.01));
    gun.add(box(0.075, 0.03, 0.05, accentM, 0, -0.185, -0.01));
    energyCell(gun, glowM, 0.1, -0.035, -0.02);
    gun.add(box(0.03, 0.04, 0.14, accentM, 0.048, 0.09, 0.06));
    const sightDot = commonSight(gun, M, glowM, -0.2, 0.112);
    hands(gun, M, accentM);
    return { muzzle: new THREE.Vector3(0, 0.012, -0.78), sightDot, glowM };
  },

  scatter(gun, M, accentM, glowM) {
    gun.add(box(0.22, 0.14, 0.42, M, 0, 0, -0.14));
    gun.add(box(0.17, 0.05, 0.2, accentM, 0, 0.055, -0.12));
    gun.add(cyl(0.043, 0.043, 0.34, M, 0.055, 0.02, -0.5, 10));
    gun.add(cyl(0.043, 0.043, 0.34, M, -0.055, 0.02, -0.5, 10));
    gun.add(cyl(0.052, 0.052, 0.04, accentM, 0.055, 0.02, -0.68, 10));
    gun.add(cyl(0.052, 0.052, 0.04, accentM, -0.055, 0.02, -0.68, 10));
    gun.add(box(0.26, 0.07, 0.07, M, 0, -0.055, -0.36));
    gun.add(box(0.2, 0.13, 0.1, M, 0, -0.055, 0.12));
    gun.add(box(0.07, 0.14, 0.08, M, 0, -0.16, 0.03));
    gun.add(box(0.165, 0.022, 0.08, accentM, 0, 0.082, -0.12));
    energyCell(gun, glowM, 0.1, -0.03, 0.02);
    const sightDot = commonSight(gun, M, glowM, -0.18, 0.1);
    hands(gun, M, accentM);
    return { muzzle: new THREE.Vector3(0, 0.02, -0.72), sightDot, glowM };
  },

  beam(gun, M, accentM, glowM) {
    gun.add(box(0.1, 0.1, 0.52, M, 0, 0, -0.12));
    gun.add(box(0.06, 0.06, 0.42, M, 0, 0.012, -0.5));
    gun.add(box(0.028, 0.028, 0.32, glowM, 0.034, 0.06, -0.42));
    gun.add(box(0.028, 0.028, 0.32, glowM, -0.034, 0.06, -0.42));
    const prong1 = box(0.026, 0.06, 0.28, accentM, 0.04, 0.045, -0.68);
    const prong2 = box(0.026, 0.06, 0.28, accentM, -0.04, 0.045, -0.68);
    prong1.rotation.x = -0.06; prong2.rotation.x = -0.06;
    gun.add(prong1, prong2);
    const tip = new THREE.Mesh(new THREE.OctahedronGeometry(0.055, 0), glowM);
    tip.position.set(0, 0.045, -0.83);
    tip.scale.set(0.65, 0.65, 2.3);
    gun.add(tip);
    gun.add(box(0.13, 0.11, 0.13, M, 0, -0.025, 0.1));
    gun.add(box(0.08, 0.03, 0.16, accentM, 0, -0.082, -0.16));
    gun.add(box(0.04, 0.14, 0.07, M, 0, -0.12, 0));
    energyCell(gun, glowM, 0.075, 0.03, 0.04);
    const sightDot = commonSight(gun, M, glowM, -0.2, 0.09);
    hands(gun, M, accentM);
    return { muzzle: new THREE.Vector3(0, 0.045, -0.92), sightDot, glowM };
  },

  arc(gun, M, accentM, glowM) {
    gun.add(box(0.17, 0.15, 0.42, M, 0, 0, -0.12));
    gun.add(cyl(0.045, 0.045, 0.38, M, 0, 0.015, -0.42));
    const coils = [];
    for (let i = 0; i < 3; i++) {
      const t = torus(0.082 + i * 0.006, 0.011, accentM, 0, 0.015, -0.27 - i * 0.1);
      gun.add(t);
      coils.push(t);
    }
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), glowM);
    core.position.set(0, 0.015, -0.77);
    gun.add(core);
    gun.add(box(0.025, 0.08, 0.01, accentM, 0.075, 0.06, -0.8));
    gun.add(box(0.025, 0.08, 0.01, accentM, -0.075, 0.06, -0.8));
    gun.add(box(0.17, 0.1, 0.14, M, 0, -0.01, 0.12));
    gun.add(box(0.07, 0.15, 0.07, M, 0, -0.11, 0));
    energyCell(gun, glowM, 0.1, -0.02, 0.02);
    const sightDot = commonSight(gun, M, glowM, -0.18, 0.11);
    hands(gun, M, accentM);
    return { muzzle: new THREE.Vector3(0, 0.015, -0.8), sightDot, glowM, spin: coils };
  },

  havoc(gun, M, accentM, glowM) {
    gun.add(cyl(0.1, 0.12, 0.5, M, 0, 0, -0.2));
    gun.add(cyl(0.125, 0.125, 0.06, M, 0, 0, 0.06));
    gun.add(cyl(0.117, 0.117, 0.04, accentM, 0, 0, -0.48));
    const cage = [];
    for (let i = 0; i < 3; i++) {
      const t = torus(0.085, 0.009, accentM, 0, 0, -0.58 - i * 0.045);
      t.rotation.z = i * 0.6;
      gun.add(t);
      cage.push(t);
    }
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.062, 1), glowM);
    orb.position.set(0, 0, -0.62);
    gun.add(orb);
    gun.add(box(0.08, 0.15, 0.09, M, 0, -0.14, -0.05));
    gun.add(box(0.12, 0.08, 0.2, M, 0, 0.1, -0.05));
    gun.add(box(0.03, 0.03, 0.18, accentM, 0.09, 0.06, -0.16));
    gun.add(box(0.03, 0.03, 0.18, accentM, -0.09, 0.06, -0.16));
    hands(gun, M, accentM);
    return { muzzle: new THREE.Vector3(0, 0, -0.72), glowM, spin: cage, core: orb };
  },

  frost(gun, M, accentM, glowM) {
    gun.add(box(0.13, 0.13, 0.44, M, 0, 0, -0.12));
    gun.add(box(0.19, 0.09, 0.16, M, 0, 0.02, 0.08));
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), glowM);
    core.position.set(0, 0.01, -0.42);
    core.scale.set(0.7, 0.7, 1.5);
    gun.add(core);
    for (let i = 0; i < 5; i++) {
      const shard = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.22 + i * 0.02, 5), i % 2 ? accentM : glowM);
      shard.rotation.x = -Math.PI / 2;
      const a = i / 5 * Math.PI * 2;
      shard.position.set(Math.cos(a) * 0.07, Math.sin(a) * 0.06 + 0.015, -0.62 - (i % 2) * 0.04);
      shard.rotation.z = a;
      gun.add(shard);
    }
    gun.add(box(0.06, 0.14, 0.07, M, 0, -0.12, 0));
    gun.add(box(0.02, 0.02, 0.34, accentM, 0.062, 0.05, -0.15));
    gun.add(box(0.02, 0.02, 0.34, accentM, -0.062, 0.05, -0.15));
    energyCell(gun, glowM, 0.075, 0.05, 0.05);
    hands(gun, M, accentM);
    return { muzzle: new THREE.Vector3(0, 0.015, -0.78), glowM, core };
  },

  venom(gun, M, accentM, glowM) {
    gun.add(box(0.15, 0.14, 0.4, M, 0, 0, -0.1));
    gun.add(box(0.18, 0.1, 0.13, M, 0, 0.01, 0.08));
    const tank = new THREE.Mesh(new THREE.SphereGeometry(0.088, 14, 10), glowM);
    tank.position.set(0.08, -0.03, -0.06);
    tank.scale.set(0.85, 1, 1);
    gun.add(tank);
    const tube = torus(0.075, 0.012, accentM, 0.08, -0.03, -0.06);
    gun.add(tube);
    gun.add(cyl(0.065, 0.038, 0.42, M, 0, 0.015, -0.48));
    gun.add(cyl(0.05, 0.05, 0.05, accentM, 0, 0.015, -0.71));
    for (let i = 0; i < 3; i++) {
      const fang = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.09, 5), glowM);
      fang.position.set(Math.cos(i / 3 * Math.PI * 2) * 0.055, 0.015 + Math.sin(i / 3 * Math.PI * 2) * 0.055, -0.73);
      fang.rotation.x = Math.PI / 2;
      gun.add(fang);
    }
    gun.add(box(0.07, 0.15, 0.07, M, 0, -0.12, 0));
    gun.add(box(0.03, 0.03, 0.3, accentM, 0.06, 0.07, -0.2));
    hands(gun, M, accentM);
    return { muzzle: new THREE.Vector3(0, 0.015, -0.78), glowM, core: tank };
  },

  vampire(gun, M, accentM, glowM) {
    gun.add(box(0.16, 0.14, 0.46, M, 0, 0, -0.12));
    gun.add(box(0.13, 0.17, 0.12, M, 0, -0.01, 0.1));
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.07, 0), glowM);
    core.position.set(0, 0.02, -0.4);
    gun.add(core);
    for (let i = 0; i < 4; i++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.22, 4), accentM);
      spike.rotation.x = -Math.PI / 2;
      spike.rotation.z = i / 4 * Math.PI * 2;
      spike.position.set(Math.cos(i / 4 * Math.PI * 2) * 0.075, 0.02 + Math.sin(i / 4 * Math.PI * 2) * 0.075, -0.62);
      gun.add(spike);
    }
    gun.add(cyl(0.028, 0.028, 0.3, M, 0.045, 0.01, -0.5));
    gun.add(cyl(0.028, 0.028, 0.3, M, -0.045, 0.01, -0.5));
    gun.add(box(0.09, 0.16, 0.07, M, 0, -0.12, 0));
    gun.add(box(0.03, 0.03, 0.32, accentM, 0, 0.09, -0.2));
    const sightDot = commonSight(gun, M, glowM, -0.18, 0.11);
    hands(gun, M, accentM);
    return { muzzle: new THREE.Vector3(0, 0.02, -0.68), glowM, core, sightDot };
  },

  bloom(gun, M, accentM, glowM) {
    gun.add(box(0.12, 0.12, 0.4, M, 0, 0, -0.1));
    gun.add(box(0.2, 0.08, 0.13, M, 0, 0.03, 0.07));
    const petals = [];
    for (let i = 0; i < 6; i++) {
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.048, 10, 8), accentM);
      const a = i / 6 * Math.PI * 2;
      petal.position.set(Math.cos(a) * 0.09, Math.sin(a) * 0.09, -0.48);
      petal.scale.set(1, 0.45, 0.18);
      petal.rotation.z = a;
      gun.add(petal);
      petals.push(petal);
    }
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), glowM);
    core.position.set(0, 0, -0.5);
    gun.add(core);
    gun.add(cyl(0.022, 0.03, 0.32, M, 0, 0, -0.6));
    gun.add(box(0.07, 0.14, 0.07, M, 0, -0.11, 0));
    gun.add(box(0.03, 0.03, 0.3, accentM, 0.052, 0.05, -0.16));
    gun.add(box(0.03, 0.03, 0.3, accentM, -0.052, 0.05, -0.16));
    hands(gun, M, accentM);
    return { muzzle: new THREE.Vector3(0, 0, -0.8), glowM, spin: petals, core };
  }
};

export function createWeaponModel(weapon) {
  const root = new THREE.Group();
  const sway = new THREE.Group();
  const body = new THREE.Group();
  root.add(sway);
  sway.add(body);

  // Local fill so the metal viewmodel reads against the dark arena.
  const fill = new THREE.PointLight(0xbfefff, 1.9, 2.2, 2);
  fill.position.set(0.35, 0.32, 0.25);
  root.add(fill);
  const rim = new THREE.PointLight(0xff4fa8, 1.1, 2.0, 2);
  rim.position.set(-0.35, -0.1, 0.1);
  root.add(rim);

  const color = weapon.color;
  const accent = new THREE.Color(color);
  const glowColor = new THREE.Color(weapon.glow || weapon.css);

  const M = mat(0x3b3854, 0x201c3c, 1.15);
  const accentM = new THREE.MeshStandardMaterial({
    color: accent.clone().multiplyScalar(0.48),
    emissive: accent,
    emissiveIntensity: 1.5,
    metalness: 0.3,
    roughness: 0.3,
    fog: false
  });
  const glowM = new THREE.MeshBasicMaterial({ color: glowColor, toneMapped: false, fog: false });

  const builder = BUILDERS[weapon.type] || BUILDERS.pulse;
  const extra = builder(body, M, accentM, glowM, weapon) || {};

  // Shared greebles keep every silhouette readable as a weapon at viewmodel scale.
  body.add(box(0.026, 0.014, 0.3, accentM, 0, 0.087, -0.2));
  body.add(box(0.07, 0.032, 0.07, M, 0, 0.096, -0.02));
  body.add(box(0.01, 0.01, 0.3, glowM, 0.056, -0.055, -0.22));
  body.add(box(0.01, 0.01, 0.3, glowM, -0.056, -0.055, -0.22));
  body.add(box(0.045, 0.02, 0.28, M, 0, -0.095, -0.3));

  // Grip wrap, trigger guard, floating rune shards (shared styling).
  body.add(box(0.055, 0.11, 0.07, M, 0, -0.1, 0.02));
  const guard = torus(0.036, 0.006, accentM, 0, -0.095, -0.055);
  guard.rotation.x = Math.PI / 2;
  guard.rotation.z = Math.PI / 2;
  body.add(guard);

  const runes = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const shard = new THREE.Mesh(new THREE.TetrahedronGeometry(0.018, 0), accentM);
    const a = i / 3 * Math.PI * 2;
    shard.position.set(Math.cos(a) * 0.14, Math.sin(a) * 0.11 + 0.015, -0.3 - i * 0.09);
    runes.add(shard);
  }
  body.add(runes);

  const muzzle = new THREE.Object3D();
  muzzle.position.copy(extra.muzzle || new THREE.Vector3(0, 0, -0.72));
  body.add(muzzle);

  root.userData = {
    sway,
    body,
    muzzle,
    runes,
    spin: extra.spin || [],
    core: extra.core || null,
    sightDot: extra.sightDot || null,
    materials: [M, accentM, glowM],
    flash: 0
  };

  return root;
}

export function updateWeaponModel(model, t, dt, { moving = 0, recoil = 0 } = {}) {
  if (!model) return;
  const u = model.userData;
  const sway = u.sway;
  const bob = moving * 0.018;
  sway.position.x = Math.sin(t * 2.4) * bob + Math.sin(t * 1.1) * 0.004;
  sway.position.y = Math.abs(Math.cos(t * 2.4)) * bob * 0.7 + Math.sin(t * 1.7) * 0.003;
  sway.rotation.z = Math.sin(t * 1.3) * 0.009;
  sway.rotation.x = Math.sin(t * 1.9) * 0.006;
  sway.position.z = recoil * 0.11;
  u.body.rotation.x = recoil * 0.16;
  u.runes.rotation.z = t * 0.7;
  u.runes.position.y = Math.sin(t * 2.2) * 0.004;
  for (let i = 0; i < u.spin.length; i++) {
    const o = u.spin[i];
    o.rotation.z += dt * (0.8 + i * 0.35);
  }
  if (u.core) {
    const s = 1 + Math.sin(t * 5.4) * 0.06;
    u.core.scale.setScalar(s);
  }
  if (u.sightDot) {
    u.sightDot.scale.setScalar(1 + Math.sin(t * 4) * 0.1);
  }
}

export function disposeWeaponModel(model) {
  if (!model) return;
  model.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material.dispose();
    }
  });
}
