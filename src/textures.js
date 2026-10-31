import * as THREE from '../vendor/three.module.js';

/* ------------------------------------------------------------------ *
 *  Procedural texture atelier — every surface in MANDACARU is painted
 *  at runtime, so the game ships with zero external art dependencies.
 * ------------------------------------------------------------------ */

const cache = new Map();

function canvas(size = 512, h = size) {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = h;
  return c;
}

function finish(c, { repeat = [1, 1], srgb = true, aniso = 8, clamp = false } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = aniso;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

function noise(ctx, w, h, amount, alpha = 0.08, seed = 7) {
  const r = rng(seed);
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (r() - 0.5) * amount;
    d[i] += n; d[i + 1] += n; d[i + 2] += n;
    if (alpha < 0.08) d[i + 3] = Math.min(255, d[i + 3] + (r() * 18 | 0));
  }
  ctx.putImageData(img, 0, 0);
}

function grime(ctx, w, h, count, color = 'rgba(38,26,28,0.12)', seed = 3) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const x = r() * w, y = r() * h, rad = 6 + r() * 46;
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  }
}

function cracks(ctx, w, h, count, color = 'rgba(40,30,32,0.35)', seed = 11) {
  const r = rng(seed);
  ctx.strokeStyle = color;
  for (let i = 0; i < count; i++) {
    ctx.lineWidth = 0.7 + r() * 1.6;
    let x = r() * w, y = r() * h;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const seg = 3 + (r() * 5 | 0);
    for (let s = 0; s < seg; s++) {
      x += (r() - 0.5) * 70;
      y += (r() - 0.5) * 70;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

export function concreteTexture(seed = 1, base = '#7d7268', repeat = [4, 4]) {
  const key = `concrete${seed}${base}${repeat}`;
  if (cache.has(key)) return cache.get(key);
  const S = 512;
  const c = canvas(S);
  const x = c.getContext('2d');
  x.fillStyle = base;
  x.fillRect(0, 0, S, S);
  noise(x, S, S, 34, 0.06, seed * 13);
  grime(x, S, S, 40, 'rgba(40,30,32,0.13)', seed);
  cracks(x, S, S, 7, 'rgba(40,30,32,0.3)', seed + 3);
  // faint form-work seams
  x.strokeStyle = 'rgba(0,0,0,0.08)';
  x.lineWidth = 2;
  for (let i = 1; i < 4; i++) {
    x.beginPath(); x.moveTo(0, i * S / 4); x.lineTo(S, i * S / 4); x.stroke();
  }
  const t = finish(c, { repeat });
  cache.set(key, t);
  return t;
}

export function azulejoTexture(repeat = [3, 2], variant = 0) {
  const key = `azulejo${repeat}${variant}`;
  if (cache.has(key)) return cache.get(key);
  const S = 512, N = 4, T = S / N;
  const c = canvas(S);
  const x = c.getContext('2d');
  const palettes = [
    ['#0e5b78', '#1c88a4', '#f6efe0'],
    ['#b23a48', '#e0674f', '#f7e8d0'],
    ['#2d7a5f', '#58b98c', '#f7f0dc'],
  ];
  const [deep, mid, cream] = palettes[variant % palettes.length];
  x.fillStyle = cream;
  x.fillRect(0, 0, S, S);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const px = i * T, py = j * T;
      x.fillStyle = (i + j) % 2 ? mid : deep;
      x.fillRect(px + 5, py + 5, T - 10, T - 10);
      x.save();
      x.translate(px + T / 2, py + T / 2);
      x.strokeStyle = cream;
      x.lineWidth = 4;
      x.beginPath();
      for (let k = 0; k < 4; k++) {
        const a = k * Math.PI / 2;
        x.moveTo(0, 0);
        x.quadraticCurveTo(Math.cos(a + 0.5) * T * 0.3, Math.sin(a + 0.5) * T * 0.3, Math.cos(a) * T * 0.36, Math.sin(a) * T * 0.36);
      }
      x.stroke();
      x.fillStyle = cream;
      x.beginPath(); x.arc(0, 0, 7, 0, Math.PI * 2); x.fill();
      x.restore();
    }
  }
  noise(x, S, S, 22, 0.05, 21 + variant);
  grime(x, S, S, 14, 'rgba(30,24,26,0.1)', 5 + variant);
  const t = finish(c, { repeat });
  cache.set(key, t);
  return t;
}

export function muralTexture() {
  const key = 'mural';
  if (cache.has(key)) return cache.get(key);
  const W = 1024, H = 512;
  const c = canvas(W, H);
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#f6c453');
  g.addColorStop(0.45, '#ef6b4a');
  g.addColorStop(1, '#b23a6a');
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);

  // geometric sun + hills
  x.fillStyle = '#ffd978';
  x.beginPath(); x.arc(760, 150, 110, 0, Math.PI * 2); x.fill();
  x.fillStyle = 'rgba(20,40,50,0.85)';
  x.beginPath();
  x.moveTo(0, 430);
  x.bezierCurveTo(180, 320, 300, 390, 450, 350);
  x.bezierCurveTo(620, 300, 760, 420, 1024, 330);
  x.lineTo(1024, 512); x.lineTo(0, 512); x.closePath(); x.fill();

  // capoeira silhouettes
  x.fillStyle = '#101820';
  x.save();
  x.translate(250, 300);
  // figure doing a kick
  x.beginPath(); x.arc(0, -80, 24, 0, Math.PI * 2); x.fill();
  x.lineWidth = 20; x.strokeStyle = '#101820'; x.lineCap = 'round';
  x.beginPath(); x.moveTo(0, -54); x.lineTo(-10, 10); x.stroke();
  x.beginPath(); x.moveTo(-10, 10); x.lineTo(-64, 62); x.stroke();
  x.beginPath(); x.moveTo(-10, 10); x.lineTo(58, -8); x.stroke();
  x.beginPath(); x.moveTo(-6, -40); x.lineTo(-56, -8); x.stroke();
  x.beginPath(); x.moveTo(-6, -40); x.lineTo(38, -66); x.stroke();
  x.restore();

  x.save();
  x.translate(520, 320);
  x.beginPath(); x.arc(0, -70, 22, 0, Math.PI * 2); x.fill();
  x.beginPath(); x.moveTo(0, -48); x.lineTo(8, 12); x.stroke();
  x.beginPath(); x.moveTo(8, 12); x.lineTo(-34, 70); x.stroke();
  x.beginPath(); x.moveTo(8, 12); x.lineTo(50, 56); x.stroke();
  x.beginPath(); x.moveTo(0, -32); x.lineTo(-52, -54); x.stroke();
  x.beginPath(); x.moveTo(0, -32); x.lineTo(54, -42); x.stroke();
  x.restore();

  // bold lettering
  x.fillStyle = '#fff5df';
  x.font = '900 92px "Archivo Black", Impact, sans-serif';
  x.textAlign = 'left';
  x.fillText('MANDACARU', 60, 140);
  x.fillStyle = '#101820';
  x.font = '800 30px Manrope, sans-serif';
  x.fillText('A LAJE É NOSSA', 66, 188);

  // graphic stripes
  x.globalAlpha = 0.5;
  for (let i = 0; i < 7; i++) {
    x.fillStyle = i % 2 ? '#1fd1b2' : '#fff5df';
    x.fillRect(820 + i * 22, 300, 12, 210);
  }
  x.globalAlpha = 1;
  grime(x, W, H, 24, 'rgba(30,20,24,0.16)', 9);
  noise(x, W, H, 16, 0.04, 31);
  const t = finish(c, { repeat: [1, 1] });
  cache.set(key, t);
  return t;
}

export function graffitiTexture(seed = 1) {
  const key = `graffiti${seed}`;
  if (cache.has(key)) return cache.get(key);
  const W = 512, H = 256;
  const c = canvas(W, H);
  const x = c.getContext('2d');
  x.fillStyle = '#6d6259';
  x.fillRect(0, 0, W, H);
  noise(x, W, H, 26, 0.06, seed + 4);
  const words = ['LAJE 9', 'RESISTE', 'SAMBA', 'MANDACARU', 'AXÉ'];
  const word = words[seed % words.length];
  x.save();
  x.translate(W / 2, H / 2);
  x.rotate(-0.06);
  x.textAlign = 'center';
  x.font = '900 84px "Archivo Black", Impact, sans-serif';
  x.lineWidth = 12;
  x.strokeStyle = 'rgba(12,18,22,0.85)';
  x.strokeText(word, 0, 22);
  const cols = ['#ffd24a', '#ff5d7a', '#1fd1b2', '#fff3d6'];
  x.fillStyle = cols[seed % cols.length];
  x.fillText(word, 0, 22);
  x.restore();
  // drips
  const r = rng(seed + 2);
  x.strokeStyle = 'rgba(255,210,74,0.5)';
  x.lineWidth = 4;
  for (let i = 0; i < 6; i++) {
    const px = 60 + r() * 390;
    x.beginPath(); x.moveTo(px, 150 + r() * 30); x.lineTo(px, 150 + r() * 90); x.stroke();
  }
  grime(x, W, H, 10, 'rgba(20,18,20,0.15)', seed);
  const t = finish(c);
  cache.set(key, t);
  return t;
}

export function crateTexture() {
  const key = 'crate';
  if (cache.has(key)) return cache.get(key);
  const S = 512;
  const c = canvas(S);
  const x = c.getContext('2d');
  x.fillStyle = '#a8793f';
  x.fillRect(0, 0, S, S);
  const r = rng(77);
  for (let i = 0; i < 9; i++) {
    x.fillStyle = i % 2 ? '#9c6c36' : '#b5854a';
    x.fillRect(0, i * S / 9, S, S / 9 - 3);
  }
  x.strokeStyle = 'rgba(60,38,20,0.4)';
  x.lineWidth = 3;
  for (let i = 0; i < 40; i++) {
    const y = r() * S;
    x.beginPath(); x.moveTo(r() * S, y); x.lineTo(r() * S, y + (r() - 0.5) * 10); x.stroke();
  }
  // frame
  x.strokeStyle = '#6f4a22';
  x.lineWidth = 22;
  x.strokeRect(11, 11, S - 22, S - 22);
  x.strokeStyle = 'rgba(255,235,190,0.25)';
  x.lineWidth = 4;
  x.strokeRect(24, 24, S - 48, S - 48);
  // stencil
  x.save();
  x.translate(S / 2, S / 2);
  x.rotate(-0.04);
  x.textAlign = 'center';
  x.fillStyle = 'rgba(30,50,50,0.8)';
  x.font = '900 54px "Archivo Black", Impact, sans-serif';
  x.fillText('MANDACARU', 0, 6);
  x.font = '800 26px Manrope, sans-serif';
  x.fillText('FRUTAS DA LAJE', 0, 46);
  x.strokeStyle = 'rgba(30,50,50,0.65)';
  x.lineWidth = 5;
  x.strokeRect(-120, -54, 240, 110);
  x.restore();
  grime(x, S, S, 20, 'rgba(40,24,14,0.2)', 4);
  const t = finish(c);
  cache.set(key, t);
  return t;
}

export function barrelTexture() {
  const key = 'barrel';
  if (cache.has(key)) return cache.get(key);
  const S = 512;
  const c = canvas(S);
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, S, 0);
  g.addColorStop(0, '#1c7d7c');
  g.addColorStop(0.5, '#25a49b');
  g.addColorStop(1, '#166a6b');
  x.fillStyle = g;
  x.fillRect(0, 0, S, S);
  x.fillStyle = 'rgba(255,220,120,0.9)';
  x.fillRect(0, 80, S, 26);
  x.fillRect(0, 330, S, 26);
  x.fillStyle = 'rgba(12,24,26,0.55)';
  x.font = '900 44px "Archivo Black", Impact, sans-serif';
  x.textAlign = 'center';
  x.fillText('FAROL', S / 2, 210);
  x.font = '800 22px Manrope, sans-serif';
  x.fillText('ÁGUA DA COMUNIDADE', S / 2, 250);
  grime(x, S, S, 30, 'rgba(20,18,14,0.25)', 8);
  cracks(x, S, S, 4, 'rgba(20,18,14,0.25)', 9);
  const t = finish(c);
  cache.set(key, t);
  return t;
}

export function clothTexture(colorA = '#ef5b4c', colorB = '#f6e7c8', seed = 1) {
  const key = `cloth${colorA}${colorB}${seed}`;
  if (cache.has(key)) return cache.get(key);
  const W = 256, H = 256;
  const c = canvas(W, H);
  const x = c.getContext('2d');
  x.fillStyle = colorB;
  x.fillRect(0, 0, W, H);
  x.fillStyle = colorA;
  for (let i = 0; i < 8; i++) x.fillRect(0, i * 32 + 4, W, 18);
  x.fillStyle = 'rgba(255,255,255,0.18)';
  for (let i = 0; i < 8; i++) x.fillRect(0, i * 32 + 22, W, 4);
  noise(x, W, H, 14, 0.04, seed);
  const t = finish(c);
  cache.set(key, t);
  return t;
}

export function maskPaintTexture(seed = 1) {
  const key = `mask${seed}`;
  if (cache.has(key)) return cache.get(key);
  const S = 256;
  const c = canvas(S);
  const x = c.getContext('2d');
  const palettes = [
    ['#ff4f9a', '#ffd24a', '#1fd1b2', '#221a2e'],
    ['#ff8a3d', '#ffe9b0', '#5b5bff', '#1b1630'],
    ['#2bd9c4', '#f4f0d8', '#ff5d4e', '#21162b'],
  ];
  const p = palettes[seed % palettes.length];
  x.fillStyle = p[1];
  x.fillRect(0, 0, S, S);
  // radial rays
  for (let i = 0; i < 12; i++) {
    x.fillStyle = i % 2 ? p[0] : p[2];
    x.beginPath();
    x.moveTo(S / 2, S / 2);
    x.arc(S / 2, S / 2, S, i * Math.PI / 6, (i + 1) * Math.PI / 6);
    x.closePath();
    x.fill();
  }
  x.fillStyle = p[3];
  x.beginPath(); x.arc(S / 2, S / 2, 56, 0, Math.PI * 2); x.fill();
  x.fillStyle = p[1];
  x.beginPath(); x.arc(S / 2, S / 2, 24, 0, Math.PI * 2); x.fill();
  noise(x, S, S, 16, 0.04, seed);
  const t = finish(c, { repeat: [1, 1] });
  cache.set(key, t);
  return t;
}

export function woodTexture(repeat = [1, 1]) {
  const key = `wood${repeat}`;
  if (cache.has(key)) return cache.get(key);
  const W = 512, H = 512;
  const c = canvas(W, H);
  const x = c.getContext('2d');
  x.fillStyle = '#6d4226';
  x.fillRect(0, 0, W, H);
  const r = rng(19);
  for (let i = 0; i < 90; i++) {
    x.strokeStyle = `rgba(${30 + r() * 30 | 0},${18 + r() * 16 | 0},${8 + r() * 10 | 0},0.25)`;
    x.lineWidth = 1 + r() * 3;
    x.beginPath();
    const y = r() * H;
    x.moveTo(0, y);
    x.bezierCurveTo(W * 0.3, y + (r() - 0.5) * 18, W * 0.7, y + (r() - 0.5) * 18, W, y + (r() - 0.5) * 10);
    x.stroke();
  }
  noise(x, W, H, 20, 0.05, 12);
  const t = finish(c, { repeat });
  cache.set(key, t);
  return t;
}

export function neonTexture(text = 'LAJE 9', color = '#ff4f9a', w = 512, h = 256) {
  const c = canvas(w, h);
  const x = c.getContext('2d');
  x.clearRect(0, 0, w, h);
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.font = `900 ${Math.floor(h * 0.46)}px "Archivo Black", Impact, sans-serif`;
  x.shadowColor = color;
  x.shadowBlur = 34;
  x.strokeStyle = color;
  x.lineWidth = 10;
  x.strokeText(text, w / 2, h / 2);
  x.shadowBlur = 12;
  x.fillStyle = '#fff8ea';
  x.fillText(text, w / 2, h / 2);
  x.shadowBlur = 0;
  const t = finish(c, { clamp: true });
  return t;
}

export function capoeiraDecal() {
  const key = 'capoeiraDecal';
  if (cache.has(key)) return cache.get(key);
  const S = 1024;
  const c = canvas(S);
  const x = c.getContext('2d');
  x.clearRect(0, 0, S, S);
  x.translate(S / 2, S / 2);
  x.strokeStyle = 'rgba(255,214,92,0.8)';
  x.lineWidth = 16;
  x.beginPath(); x.arc(0, 0, 420, 0, Math.PI * 2); x.stroke();
  x.strokeStyle = 'rgba(255,246,220,0.45)';
  x.lineWidth = 5;
  x.beginPath(); x.arc(0, 0, 392, 0, Math.PI * 2); x.stroke();
  x.beginPath(); x.arc(0, 0, 448, 0, Math.PI * 2); x.stroke();

  // circular lettering
  const label = '  RODA DE CAPOEIRA • MANDACARU • AXÉ • ';
  x.fillStyle = 'rgba(255,240,206,0.8)';
  x.font = '800 34px Manrope, sans-serif';
  x.textAlign = 'center';
  const chars = label.split('');
  const step = (Math.PI * 1.72) / chars.length;
  let a = Math.PI * 0.62;
  for (const ch of chars) {
    x.save();
    x.rotate(a);
    x.translate(0, -338);
    x.fillText(ch, 0, 0);
    x.restore();
    a += step;
  }

  // two silhouettes mid-kick
  const fig = (px, py, flip) => {
    x.save();
    x.translate(px, py);
    x.scale(flip ? -1 : 1, 1);
    x.fillStyle = 'rgba(20,26,28,0.55)';
    x.beginPath(); x.arc(0, -70, 18, 0, Math.PI * 2); x.fill();
    x.lineCap = 'round';
    x.strokeStyle = 'rgba(20,26,28,0.55)';
    x.lineWidth = 16;
    x.beginPath(); x.moveTo(0, -50); x.lineTo(4, 4); x.stroke();
    x.beginPath(); x.moveTo(4, 4); x.lineTo(-42, 58); x.stroke();
    x.beginPath(); x.moveTo(4, 4); x.lineTo(52, -14); x.stroke();
    x.beginPath(); x.moveTo(0, -38); x.lineTo(-46, -8); x.stroke();
    x.beginPath(); x.moveTo(0, -38); x.lineTo(44, -58); x.stroke();
    x.restore();
  };
  fig(-160, 40, false);
  fig(150, 20, true);
  x.strokeStyle = 'rgba(255,214,92,0.55)';
  x.lineWidth = 7;
  x.beginPath(); x.arc(0, 0, 250, 0.2, Math.PI * 1.1); x.stroke();
  const t = finish(c, { clamp: true });
  cache.set(key, t);
  return t;
}

export function stencilText(text = 'MANDACARU', color = 'rgba(255,240,210,0.55)', w = 1024, h = 256, size = 150) {
  const c = canvas(w, h);
  const x = c.getContext('2d');
  x.clearRect(0, 0, w, h);
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.font = `900 ${size}px "Archivo Black", Impact, sans-serif`;
  x.fillStyle = color;
  x.fillText(text, w / 2, h / 2);
  const t = finish(c, { clamp: true });
  return t;
}

export function bulletHoleTexture() {
  const key = 'bulletHole';
  if (cache.has(key)) return cache.get(key);
  const S = 128;
  const c = canvas(S);
  const x = c.getContext('2d');
  x.clearRect(0, 0, S, S);
  const g = x.createRadialGradient(64, 64, 2, 64, 64, 56);
  g.addColorStop(0, 'rgba(8,6,8,0.95)');
  g.addColorStop(0.35, 'rgba(20,14,16,0.7)');
  g.addColorStop(0.7, 'rgba(40,30,30,0.18)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = g;
  x.beginPath(); x.arc(64, 64, 58, 0, Math.PI * 2); x.fill();
  x.strokeStyle = 'rgba(200,190,170,0.35)';
  x.lineWidth = 2;
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.3;
    x.beginPath();
    x.moveTo(64 + Math.cos(a) * 10, 64 + Math.sin(a) * 10);
    x.lineTo(64 + Math.cos(a) * (20 + (i % 3) * 8), 64 + Math.sin(a) * (20 + (i % 3) * 8));
    x.stroke();
  }
  const t = finish(c, { clamp: true });
  cache.set(key, t);
  return t;
}

export function glowSprite(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)', size = 128) {
  const key = `glow${inner}${outer}${size}`;
  if (cache.has(key)) return cache.get(key);
  const c = canvas(size);
  const x = c.getContext('2d');
  const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, inner.replace(/[\d.]+\)$/, '0.55)'));
  g.addColorStop(1, outer);
  x.fillStyle = g;
  x.fillRect(0, 0, size, size);
  const t = finish(c, { clamp: true, srgb: false });
  cache.set(key, t);
  return t;
}

export function sparkSprite() {
  const key = 'spark';
  if (cache.has(key)) return cache.get(key);
  const S = 64;
  const c = canvas(S);
  const x = c.getContext('2d');
  x.translate(32, 32);
  const g = x.createRadialGradient(0, 0, 0, 0, 0, 30);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,225,140,0.9)');
  g.addColorStop(1, 'rgba(255,120,40,0)');
  x.fillStyle = g;
  x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.fill();
  const t = finish(c, { clamp: true, srgb: false });
  cache.set(key, t);
  return t;
}

export function smokeSprite() {
  const key = 'smoke';
  if (cache.has(key)) return cache.get(key);
  const S = 128;
  const c = canvas(S);
  const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 2, 64, 64, 62);
  g.addColorStop(0, 'rgba(210,200,190,0.55)');
  g.addColorStop(0.55, 'rgba(170,160,155,0.22)');
  g.addColorStop(1, 'rgba(150,140,140,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, S, S);
  const t = finish(c, { clamp: true, srgb: false });
  cache.set(key, t);
  return t;
}

export function ringTexture() {
  const key = 'ring';
  if (cache.has(key)) return cache.get(key);
  const S = 256;
  const c = canvas(S);
  const x = c.getContext('2d');
  x.clearRect(0, 0, S, S);
  x.strokeStyle = 'rgba(255,255,255,1)';
  x.lineWidth = 14;
  x.beginPath(); x.arc(S / 2, S / 2, 96, 0, Math.PI * 2); x.stroke();
  x.strokeStyle = 'rgba(255,255,255,0.4)';
  x.lineWidth = 5;
  x.beginPath(); x.arc(S / 2, S / 2, 76, 0, Math.PI * 2); x.stroke();
  const t = finish(c, { clamp: true, srgb: false });
  cache.set(key, t);
  return t;
}

export function posterTexture(i = 0) {
  const key = `poster${i}`;
  if (cache.has(key)) return cache.get(key);
  const W = 256, H = 360;
  const c = canvas(W, H);
  const x = c.getContext('2d');
  const bg = ['#f6e7c8', '#ffd24a', '#1fd1b2', '#ff8a6a'][i % 4];
  x.fillStyle = bg;
  x.fillRect(0, 0, W, H);
  x.fillStyle = '#161018';
  x.fillRect(14, 14, W - 28, H - 28);
  x.fillStyle = bg;
  x.font = '900 42px "Archivo Black", Impact, sans-serif';
  x.textAlign = 'center';
  const lines = [['FESTA', 'DA', 'LAJE'], ['SAMBA', 'ATÉ', 'CAIR'], ['AXÉ', 'SEMPRE'], ['FORÇA', 'DO', 'MORRO']][i % 4];
  lines.forEach((l, k) => x.fillText(l, W / 2, 90 + k * 52));
  x.fillStyle = '#ff4f9a';
  x.beginPath(); x.arc(W / 2, 270, 34, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#ffd24a';
  x.beginPath(); x.arc(W / 2 + 24, 300, 16, 0, Math.PI * 2); x.fill();
  x.font = '800 16px Manrope, sans-serif';
  x.fillStyle = '#f6e7c8';
  x.fillText('SÁBADO 19H • LAJE 9', W / 2, 334);
  const t = finish(c, { clamp: true });
  cache.set(key, t);
  return t;
}

export function cityFacadeTexture(seed = 0) {
  const key = `cityFacade${seed}`;
  if (cache.has(key)) return cache.get(key);
  const W = 256, H = 512;
  const c = canvas(W, H);
  const x = c.getContext('2d');
  const cols = ['#c8b39a', '#a9b8a0', '#c39a86', '#9ba6b8', '#d1c0a0', '#b48d93'];
  x.fillStyle = cols[seed % cols.length];
  x.fillRect(0, 0, W, H);
  noise(x, W, H, 30, 0.05, seed + 5);
  const r = rng(seed + 40);
  for (let y = 30; y < H - 30; y += 54) {
    for (let i = 0; i < 3; i++) {
      const px = 24 + i * 72 + (r() - 0.5) * 10;
      const lit = r() > 0.62;
      x.fillStyle = lit ? 'rgba(255,196,96,0.95)' : 'rgba(30,38,50,0.72)';
      x.fillRect(px, y, 42, 32);
      x.strokeStyle = 'rgba(40,32,30,0.5)';
      x.lineWidth = 3;
      x.strokeRect(px, y, 42, 32);
      if (r() > 0.6) {
        x.fillStyle = 'rgba(20,24,28,0.5)';
        x.fillRect(px + 4, y + 22, 34, 10);
      }
    }
  }
  grime(x, W, H, 24, 'rgba(24,20,18,0.14)', seed + 2);
  const t = finish(c, { repeat: [1, 1] });
  cache.set(key, t);
  return t;
}

/* Painted favela plaster: saturated walls, crooked windows, azulejo bands,
 * graffiti tags and the beautiful mess of a morro facade. */
export function favelaFacadeTexture(seed = 0, base = '#d95b4a') {
  const key = `favelaFacade${seed}${base}`;
  if (cache.has(key)) return cache.get(key);
  const W = 512, H = 512;
  const c = canvas(W, H);
  const x = c.getContext('2d');
  const r = rng(seed * 71 + 19);
  x.fillStyle = base;
  x.fillRect(0, 0, W, H);

  // hand-painted patches and sun-bleached areas
  const patchCols = ['rgba(255,246,215,0.16)', 'rgba(20,30,42,0.10)', 'rgba(255,196,90,0.13)', 'rgba(255,90,70,0.10)'];
  for (let i = 0; i < 7; i++) {
    x.fillStyle = patchCols[i % patchCols.length];
    x.fillRect(r() * W * 0.7, r() * H * 0.7, 60 + r() * 200, 40 + r() * 160);
  }

  // a band of azulejo tiles
  if (r() > 0.35) {
    const by = 330 + r() * 70;
    for (let i = 0; i < 14; i++) {
      x.fillStyle = i % 2 ? 'rgba(20,110,130,0.85)' : 'rgba(242,236,214,0.9)';
      x.fillRect(i * 38, by, 34, 26);
      x.strokeStyle = 'rgba(20,50,60,0.35)';
      x.lineWidth = 1;
      x.strokeRect(i * 38, by, 34, 26);
    }
  }

  // windows with shutters, frames and laundry poles
  const cols = 2 + (r() > 0.5 ? 1 : 0);
  const rows = 2 + (r() > 0.55 ? 1 : 0);
  const marginX = 50 + r() * 24;
  const marginY = 38 + r() * 20;
  const gapX = (W - marginX * 2) / cols;
  const gapY = (H - marginY - 120) / rows;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (r() > 0.9) continue;
      const px = marginX + i * gapX + 16 + (r() - 0.5) * 14;
      const py = marginY + j * gapY + 18 + (r() - 0.5) * 12;
      const ww = 44 + r() * 16;
      const wh = 54 + r() * 20;
      // recess shadow
      x.fillStyle = 'rgba(18,22,30,0.28)';
      x.fillRect(px - 6, py - 6, ww + 12, wh + 12);
      // glass
      const lit = r() > 0.62;
      x.fillStyle = lit ? 'rgba(255,190,92,0.95)' : 'rgba(24,38,52,0.9)';
      x.fillRect(px, py, ww, wh);
      // mullions
      x.strokeStyle = 'rgba(235,225,205,0.55)';
      x.lineWidth = 3;
      x.beginPath(); x.moveTo(px + ww / 2, py); x.lineTo(px + ww / 2, py + wh); x.stroke();
      x.beginPath(); x.moveTo(px, py + wh / 2); x.lineTo(px + ww, py + wh / 2); x.stroke();
      x.strokeStyle = 'rgba(30,26,24,0.8)';
      x.lineWidth = 5;
      x.strokeRect(px - 3, py - 3, ww + 6, wh + 6);
      // shutter
      if (r() > 0.42) {
        x.fillStyle = ['#1f8f8a', '#e8a23a', '#315d99', '#c4473d'][(r() * 4) | 0];
        x.fillRect(px - 20, py - 2, 15, wh + 4);
        x.fillRect(px + ww + 5, py - 2, 15, wh + 4);
      }
      // little laundry / plant on sill
      if (r() > 0.6) {
        x.fillStyle = '#2c7a4a';
        x.beginPath(); x.arc(px + 10 + r() * 20, py + wh + 3, 8 + r() * 7, 0, Math.PI * 2); x.fill();
      }
    }
  }

  // door with graffiti tag
  const dx = 40 + r() * (W - 160);
  x.fillStyle = 'rgba(20,24,28,0.9)';
  x.fillRect(dx, H - 104, 78, 104);
  x.strokeStyle = 'rgba(235,225,205,0.35)';
  x.lineWidth = 4;
  x.strokeRect(dx + 7, H - 96, 64, 88);
  x.strokeStyle = ['#ff4f9a', '#1fd1b2', '#ffd24a'][(r() * 3) | 0];
  x.lineWidth = 6;
  x.beginPath();
  x.moveTo(dx - 10, H - 150);
  x.bezierCurveTo(dx + 30, H - 180, dx + 80, H - 110, dx + 115, H - 158);
  x.stroke();

  // exposed brick / repair patches
  for (let i = 0; i < 2; i++) {
    if (r() < 0.5) continue;
    const bx = r() * W * 0.6, by = r() * H * 0.55;
    x.fillStyle = 'rgba(130,68,48,0.5)';
    x.fillRect(bx, by, 42 + r() * 46, 26 + r() * 30);
    x.strokeStyle = 'rgba(55,30,25,0.5)';
    x.lineWidth = 2;
    for (let k = 0; k < 4; k++) { x.beginPath(); x.moveTo(bx, by + k * 9); x.lineTo(bx + 70, by + k * 9); x.stroke(); }
  }

  grime(x, W, H, 32, 'rgba(28,18,20,0.16)', seed + 9);
  cracks(x, W, H, 5, 'rgba(38,24,24,0.28)', seed + 12);
  noise(x, W, H, 22, 0.05, seed + 31);
  const t = finish(c, { repeat: [1, 1] });
  cache.set(key, t);
  return t;
}

export function glowTextureForText() {
  return glowSprite();
}
