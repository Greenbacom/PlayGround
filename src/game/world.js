import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { clamp, damp, rand, TAU, choice } from './utils.js';

const FOG_COLOR = 0x070312;
const ARENA_RADIUS = 33;
const EYE_HEIGHT = 1.7;

function radialTexture(size = 128, inner = 0.95) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, `rgba(255,255,255,${inner})`);
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.1)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function shadowTexture(size = 128) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(0,0,0,0.72)');
  g.addColorStop(0.55, 'rgba(0,0,0,0.28)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function emblemTexture() {
  const size = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const ctr = size / 2;
  ctx.clearRect(0, 0, size, size);
  ctx.translate(ctr, ctr);

  ctx.strokeStyle = 'rgba(62,243,255,0.55)';
  ctx.lineWidth = 3;
  for (const r of [430, 360, 250]) {
    ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(255,46,154,0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(0, 0, 300, 0, TAU); ctx.stroke();
  ctx.setLineDash([4, 22]);
  ctx.beginPath(); ctx.arc(0, 0, 400, 0, TAU); ctx.stroke();
  ctx.setLineDash([]);

  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * TAU;
    const long = i % 4 === 0;
    const r1 = long ? 330 : 345;
    const r2 = 372;
    ctx.strokeStyle = long ? 'rgba(255,46,154,0.8)' : 'rgba(62,243,255,0.5)';
    ctx.lineWidth = long ? 4 : 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
    ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
    ctx.stroke();
  }
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU;
    ctx.strokeStyle = 'rgba(62,243,255,0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * 250, Math.sin(a) * 250);
    ctx.lineTo(Math.cos(a) * 430, Math.sin(a) * 430);
    ctx.stroke();
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 168px Orbitron, sans-serif';
  ctx.fillStyle = 'rgba(235,255,255,0.9)';
  ctx.shadowColor = 'rgba(62,243,255,0.9)';
  ctx.shadowBlur = 38;
  ctx.fillText('VOX', 0, -18);
  ctx.font = '700 36px Rajdhani, sans-serif';
  ctx.fillStyle = 'rgba(255,46,154,0.92)';
  ctx.shadowColor = 'rgba(255,46,154,0.8)';
  ctx.shadowBlur = 20;
  ctx.letterSpacing = '18px';
  ctx.fillText('A R E N A', 0, 108);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function boxGeo(w, h, d, x, y, z, ry = 0) {
  const g = new THREE.BoxGeometry(w, h, d);
  const m = new THREE.Matrix4();
  m.makeRotationY(ry);
  m.setPosition(x, y, z);
  g.applyMatrix4(m);
  return g;
}

function buildMerged(geos, material) {
  if (!geos.length) return null;
  const merged = mergeGeometries(geos, false);
  geos.forEach((g) => g.dispose());
  const mesh = new THREE.Mesh(merged, material);
  mesh.frustumCulled = true;
  return mesh;
}

/* ------------------------------------------------------------
   Post FX: grade, vignette, chromatic edges, grain, hurt pulse
   ------------------------------------------------------------ */
const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uHurt: { value: 0 },
    uForge: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) }
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uHurt;
    uniform float uForge;
    uniform vec2 uResolution;
    varying vec2 vUv;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    void main() {
      vec2 uv = vUv;
      vec2 c = uv - 0.5;
      float r2 = dot(c, c);
      float ca = (0.0011 + r2 * 0.006) * (1.0 + uHurt * 2.5);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + c * ca).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - c * ca).b;

      // punchy grade
      col = pow(max(col, 0.0), vec3(0.96));
      col = (col - 0.5) * 1.055 + 0.5;
      col.rgb += vec3(0.006, 0.0, 0.016);

      // forged flash
      col += vec3(0.15, 0.62, 0.72) * uForge * 0.5;

      // damage pulse
      float edge = smoothstep(0.18, 0.72, r2);
      col = mix(col, vec3(0.72, 0.02, 0.12), edge * uHurt * 0.7);

      // vignette
      float vig = smoothstep(0.84, 0.24, length(c * vec2(1.06, 1.0)));
      col *= 0.72 + vig * 0.28;

      // scanlines + grain
      float scan = 0.985 + 0.015 * sin(uv.y * uResolution.y * 1.4);
      col *= scan;
      float grain = hash(uv * uResolution + uTime * 60.0) - 0.5;
      col += grain * 0.022;

      gl_FragColor = vec4(col, 1.0);
    }
  `
};

/* ------------------------------------------------------------
   Particles
   ------------------------------------------------------------ */
class SparkField {
  constructor(scene, max = 900) {
    this.max = max;
    this.count = 0;
    this.cursor = 0;
    this.positions = new Float32Array(max * 3);
    this.colors = new Float32Array(max * 3);
    this.sizes = new Float32Array(max);
    this.alphas = new Float32Array(max);
    this.vel = new Float32Array(max * 3);
    this.life = new Float32Array(max);
    this.maxLife = new Float32Array(max);
    this.drag = new Float32Array(max);
    this.grav = new Float32Array(max);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1));
    this.geo = geo;

    this.material = new THREE.ShaderMaterial({
      uniforms: { uScale: { value: 420 }, uPixel: { value: 1 } },
      vertexShader: /* glsl */`
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uScale;
        uniform float uPixel;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uScale * uPixel / max(1.0, -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */`
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float d = length(p);
          float a = smoothstep(0.5, 0.0, d);
          a *= a;
          gl_FragColor = vec4(vColor, a * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
    scene.add(this.points);
    this.scene = scene;
  }

  spawn(pos, color, count, power = 1, spread = 1, size = 0.06, life = 0.7, grav = 3) {
    const c = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const idx = this.cursor;
      this.cursor = (this.cursor + 1) % this.max;
      const dir = new THREE.Vector3(rand(-1, 1), rand(-0.35, 1), rand(-1, 1)).normalize();
      const sp = rand(0.3, 1) * power * 3.2;
      this.positions[idx * 3] = pos.x + rand(-0.08, 0.08) * spread;
      this.positions[idx * 3 + 1] = pos.y + rand(-0.08, 0.08) * spread;
      this.positions[idx * 3 + 2] = pos.z + rand(-0.08, 0.08) * spread;
      this.vel[idx * 3] = dir.x * sp;
      this.vel[idx * 3 + 1] = dir.y * sp + rand(0.2, 1.4);
      this.vel[idx * 3 + 2] = dir.z * sp;
      const tint = c.clone().offsetHSL(rand(-0.03, 0.03), 0, rand(-0.06, 0.18));
      this.colors[idx * 3] = tint.r;
      this.colors[idx * 3 + 1] = tint.g;
      this.colors[idx * 3 + 2] = tint.b;
      this.sizes[idx] = size * rand(0.5, 1.7);
      this.alphas[idx] = 1;
      this.life[idx] = this.maxLife[idx] = life * rand(0.5, 1.3);
      this.drag[idx] = rand(1.2, 3.2);
      this.grav[idx] = grav * rand(0.4, 1.4);
    }
  }

  update(dt) {
    for (let i = 0; i < this.max; i++) {
      if (this.life[i] <= 0) { this.alphas[i] = 0; continue; }
      this.life[i] -= dt;
      const k = clamp(this.life[i] / this.maxLife[i], 0, 1);
      this.alphas[i] = k * k;
      const drag = Math.exp(-this.drag[i] * dt);
      this.vel[i * 3] *= drag;
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * drag - this.grav[i] * dt;
      this.vel[i * 3 + 2] *= drag;
      this.positions[i * 3] += this.vel[i * 3] * dt;
      this.positions[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.positions[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      if (this.positions[i * 3 + 1] < 0.03) {
        this.positions[i * 3 + 1] = 0.03;
        this.vel[i * 3 + 1] *= -0.32;
      }
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.aColor.needsUpdate = true;
    this.geo.attributes.aSize.needsUpdate = true;
    this.geo.attributes.aAlpha.needsUpdate = true;
  }
}

/* ------------------------------------------------------------
   World
   ------------------------------------------------------------ */
export class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 820;
    this.time = 0;
    this.solidMeshes = [];
    this.colliders = [];
    this.spawnPoints = [];
    this.hurt = 0;
    this.forge = 0;
    this.quality = this.isMobile ? 1 : 2;
    this.frameCount = 0;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
      preserveDrawingBuffer: true
    });
    // Software rasterizers (SwiftShader/llvmpipe) cannot carry the full post stack.
    // Detect them so CI captures and low-end VMs stay interactive.
    let rendererName = '';
    try {
      const gl = this.renderer.getContext();
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      rendererName = String(dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    } catch { /* ignore */ }
    this.softwareRenderer = /swiftshader|llvmpipe|softpipe|software/i.test(rendererName);
    if (this.softwareRenderer) {
      this.isMobile = true;
      this.quality = 0;
      document.body.classList.add('is-software');
    }
    this.renderer.setClearColor(FOG_COLOR, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    const dpr = this.softwareRenderer
      ? 0.62
      : Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.55 : 1.7);
    this.pixelRatio = dpr;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(FOG_COLOR, 0.017);
    this.camera = new THREE.PerspectiveCamera(this.fovFor(), window.innerWidth / window.innerHeight, 0.02, 280);
    this.camera.rotation.order = 'YXZ';
    this.camera.position.set(0, EYE_HEIGHT, 16);
    this.scene.add(this.camera);

    this.glowTexture = radialTexture(128, 0.9);
    this.shadowTexture = shadowTexture(128);

    this.setupPost();
    this.buildSky();
    this.buildLighting();
    this.buildArena();
    this.buildStructures();
    this.buildGates();
    this.buildDistant();
    this.buildFx();
    this.buildParticles();
    this.resize();
    if (this.softwareRenderer) this.simplifyMaterials();
  }

  // llvmpipe compiles the full lit-material permutation set very slowly. Swap the
  // arena to unlit equivalents so software captures stay interactive without
  // changing the authored look on real GPUs.
  simplifyMaterials() {
    const cache = new Map();
    const swap = (mat) => {
      if (!mat || !mat.isMeshStandardMaterial) return mat;
      if (cache.has(mat)) return cache.get(mat);
      const tint = mat.emissive && mat.emissive.getHex() !== 0
        ? mat.color.clone().lerp(mat.emissive, 0.5)
        : mat.color.clone();
      const basic = new THREE.MeshBasicMaterial({
        color: tint,
        map: mat.map || null,
        transparent: mat.transparent,
        opacity: mat.opacity,
        side: mat.side,
        vertexColors: mat.vertexColors,
        toneMapped: false,
        fog: mat.fog
      });
      cache.set(mat, basic);
      return basic;
    };
    this.scene.traverse((obj) => {
      if (!obj.isMesh && !obj.isPoints && !obj.isLine) return;
      if (Array.isArray(obj.material)) obj.material = obj.material.map(swap);
      else obj.material = swap(obj.material);
    });
    this.scene.traverse((obj) => {
      if (obj.isLight) obj.visible = false;
    });
  }

  fovFor() {
    const aspect = window.innerWidth / window.innerHeight;
    return aspect < 0.72 ? 86 : aspect < 1 ? 80 : 72;
  }

  setupPost() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(this.pixelRatio);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.isMobile ? 0.62 : 0.8, 0.62, 0.62);
    if (this.softwareRenderer) this.bloom.enabled = false;
    this.composer.addPass(this.bloom);
    this.grade = new ShaderPass(GradeShader);
    this.composer.addPass(this.grade);
    this.output = new OutputPass();
    this.composer.addPass(this.output);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  buildSky() {
    const geo = new THREE.SphereGeometry(210, this.softwareRenderer ? 28 : 48, this.softwareRenderer ? 18 : 32);
    this.skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        varying vec3 vDir;
        uniform float uTime;
        float hash21(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }
        void main() {
          vec3 d = normalize(vDir);
          float y = d.y;
          vec3 top = vec3(0.012, 0.008, 0.042);
          vec3 mid = vec3(0.10, 0.022, 0.19);
          vec3 horizon = vec3(0.62, 0.035, 0.30);
          vec3 col = mix(mid, top, smoothstep(0.0, 0.72, y));
          col = mix(horizon, col, smoothstep(-0.025, 0.25, y));

          // thin haze bands above the horizon
          float haze = sin(y * 120.0 + uTime * 0.12) * 0.5 + 0.5;
          col += vec3(0.32, 0.03, 0.18) * smoothstep(0.28, 0.0, abs(y - 0.035)) * (0.16 + haze * 0.12);

          // stars
          vec2 suv = vec2(atan(d.x, d.z) * 2.2, y * 7.0);
          vec2 cell = floor(suv * vec2(88.0, 58.0));
          float h = hash21(cell);
          float twinkle = 0.55 + 0.45 * sin(uTime * 1.6 + h * 40.0);
          float star = step(0.9987, h) * smoothstep(0.02, 0.32, y) * twinkle;
          col += vec3(0.6, 0.82, 1.0) * star * (0.5 + h * 1.4);

          // aurora curtains
          float aur = sin(d.x * 5.0 + uTime * 0.1) * sin(d.z * 3.6 - uTime * 0.07 + y * 3.0);
          aur = smoothstep(0.35, 0.9, aur) * smoothstep(0.12, 0.55, y) * (1.0 - smoothstep(0.6, 0.85, y));
          col += mix(vec3(0.02, 0.34, 0.42), vec3(0.32, 0.05, 0.42), smoothstep(0.0, 0.6, y)) * aur * 0.5;

          // the sun
          vec3 sunDir = normalize(vec3(0.0, 0.075, -1.0));
          float sd = dot(d, sunDir);
          float disc = smoothstep(0.983, 0.9875, sd);
          float glow = pow(max(sd, 0.0), 90.0);
          float glow2 = pow(max(sd, 0.0), 12.0);
          float stripes = step(0.44, fract((sd - 0.98) * 780.0 + uTime * 0.22));
          vec3 sunCol = mix(vec3(2.6, 0.32, 1.15), vec3(4.4, 1.65, 0.55), smoothstep(0.983, 1.0, sd));
          col += sunCol * disc * (0.42 + 0.58 * stripes);
          col += vec3(1.25, 0.11, 0.55) * glow * 0.8;
          col += vec3(0.45, 0.02, 0.2) * glow2 * 0.34;

          // horizon silhouette glow
          col += vec3(0.5, 0.04, 0.3) * smoothstep(0.12, -0.04, y) * 0.12;

          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
    this.sky = new THREE.Mesh(geo, this.skyMat);
    this.sky.frustumCulled = false;
    this.sky.renderOrder = -10;
    this.scene.add(this.sky);
  }

  buildLighting() {
    const hemi = new THREE.HemisphereLight(0x8f6dff, 0x07030f, 1.15);
    this.scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xff4d9e, 2.2);
    sun.position.set(0, 9, -30);
    this.scene.add(sun);

    const rim = new THREE.DirectionalLight(0x3ef3ff, 1.55);
    rim.position.set(-18, 14, 20);
    this.scene.add(rim);

    const violet = new THREE.DirectionalLight(0x6d48ff, 0.9);
    violet.position.set(22, 7, 12);
    this.scene.add(violet);

    this.gateLights = [];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * TAU;
      const l = new THREE.PointLight(i % 2 ? 0xff2e9a : 0x3ef3ff, 14, 34, 1.8);
      l.position.set(Math.sin(a) * 29, 4.4, Math.cos(a) * 29);
      this.scene.add(l);
      this.gateLights.push(l);
    }

    this.centerLight = new THREE.PointLight(0x3ef3ff, 8, 20, 2);
    this.centerLight.position.set(0, 2.2, 0);
    this.scene.add(this.centerLight);
  }

  buildArena() {
    // ground
    const groundMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */`
        varying vec3 vWorld;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: /* glsl */`
        varying vec3 vWorld;
        uniform float uTime;
        float gridLine(vec2 p, float scale, float width) {
          vec2 q = p / scale;
          vec2 g = abs(fract(q - 0.5) - 0.5) / (fwidth(q) + 0.0001);
          float line = 1.0 - clamp(min(g.x, g.y) / width, 0.0, 1.0);
          return line;
        }
        void main() {
          vec2 p = vWorld.xz;
          float r = length(p);
          float minor = gridLine(p, 0.75, 1.4);
          float major = gridLine(p, 3.0, 1.7);
          float rings = 1.0 - clamp(abs(fract(r / 9.0 - 0.5) - 0.5) / (fwidth(r / 9.0) + 0.0001), 0.0, 1.0);
          rings *= 0.55;

          vec3 base = vec3(0.011, 0.006, 0.032);
          vec3 gridCol = mix(vec3(0.05, 0.62, 0.72), vec3(0.72, 0.06, 0.42), smoothstep(4.0, 30.0, r));
          vec3 col = base;
          col += gridCol * minor * 0.16;
          col += gridCol * major * 0.62;
          col += vec3(0.9, 0.12, 0.58) * rings * 0.26;

          // central sigil light
          col += vec3(0.06, 0.55, 0.7) * exp(-r * r * 0.028) * 0.14;

          // pulsing rings
          float pulse = smoothstep(0.75, 1.0, sin(r * 0.55 - uTime * 1.2) * 0.5 + 0.5);
          col += vec3(0.15, 0.5, 0.65) * pulse * smoothstep(2.0, 14.0, r) * smoothstep(31.0, 12.0, r) * 0.06;

          // rim glow
          float rim = smoothstep(30.0, 34.0, r) * (1.0 - smoothstep(34.0, 34.4, r));
          col += mix(vec3(0.8, 0.08, 0.5), vec3(0.05, 0.72, 0.85), 0.5) * rim * 1.4;

          // atmospheric fade
          float fog = 1.0 - exp(-pow(max(r - 6.0, 0.0) * 0.038, 2.0));
          col = mix(col, vec3(0.02, 0.009, 0.04), clamp(fog, 0.0, 0.92));

          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
    this.groundMat = groundMat;
    const groundGeo = new THREE.CircleGeometry(34, 128);
    groundGeo.rotateX(-Math.PI / 2);
    this.ground = new THREE.Mesh(groundGeo, groundMat);
    this.ground.position.y = 0;
    this.ground.receiveShadow = false;
    this.scene.add(this.ground);
    this.solidMeshes.push(this.ground);

    // void grid far below (adds depth beyond the platform edge)
    const voidGeo = new THREE.CircleGeometry(170, 96);
    voidGeo.rotateX(-Math.PI / 2);
    const voidMat = new THREE.MeshBasicMaterial({ color: 0x04020a, fog: false });
    const voidMesh = new THREE.Mesh(voidGeo, voidMat);
    voidMesh.position.y = -1.4;
    this.scene.add(voidMesh);

    // edge rings
    const ringMatC = new THREE.MeshBasicMaterial({ color: 0x3ef3ff, toneMapped: false, fog: false });
    const ringMatP = new THREE.MeshBasicMaterial({ color: 0xff2e9a, toneMapped: false, fog: false });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(34.15, 0.055, 6, 160), ringMatC);
    ring1.rotation.x = -Math.PI / 2; ring1.position.y = 0.06;
    this.scene.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(34.85, 0.035, 6, 160), ringMatP);
    ring2.rotation.x = -Math.PI / 2; ring2.position.y = 0.035;
    this.scene.add(ring2);

    // emblem
    this.emblem = new THREE.Mesh(
      new THREE.PlaneGeometry(13, 13),
      new THREE.MeshBasicMaterial({
        map: emblemTexture(),
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        fog: false
      })
    );
    this.emblem.rotation.x = -Math.PI / 2;
    this.emblem.position.set(0, 0.035, 0);
    this.emblem.rotation.z = 0;
    this.scene.add(this.emblem);

    // soft ground glow around emblem
    const glowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshBasicMaterial({
        map: this.glowTexture,
        transparent: true,
        opacity: 0.16,
        color: 0x2b8fa0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false
      })
    );
    glowPlane.rotation.x = -Math.PI / 2;
    glowPlane.position.y = 0.02;
    this.scene.add(glowPlane);
  }

  buildStructures() {
    const darkGeos = [];
    const cyanGeos = [];
    const pinkGeos = [];
    const violetGeos = [];

    // Outer wall segments
    const segs = 18;
    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * TAU;
      if (i % 4 === 0) continue; // gates
      const x = Math.sin(a) * 36.4;
      const z = Math.cos(a) * 36.4;
      const h = 2.1 + (i % 3) * 0.55;
      darkGeos.push(boxGeo(9.2, h, 0.9, x, h / 2, z, a));
      const gx = Math.sin(a) * 35.9;
      const gz = Math.cos(a) * 35.9;
      const strip = (i % 3 === 0 ? pinkGeos : cyanGeos);
      strip.push(boxGeo(9.2, 0.07, 0.06, gx, h - 0.12, gz, a));
      if (i % 2 === 0) {
        darkGeos.push(boxGeo(0.55, 1.1, 0.65, Math.sin(a + 0.14) * 36.1, 0.55, Math.cos(a + 0.14) * 36.1, a));
      }
    }

    // Pillars + neon strips
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU + 0.13;
      if (i % 3 === 0) continue;
      const x = Math.sin(a) * 35.6;
      const z = Math.cos(a) * 35.6;
      const h = 6.4 + (i % 4) * 1.25;
      darkGeos.push(boxGeo(1.7, 0.6, 1.7, x, 0.3, z, a));
      darkGeos.push(boxGeo(1.05, h, 1.05, x, h / 2 + 0.4, z, a));
      darkGeos.push(boxGeo(1.75, 0.32, 1.75, x, h + 0.55, z, a));
      const inward = Math.atan2(-x, -z);
      for (const off of [-0.5, 0.5]) {
        const ox = x + Math.cos(inward) * off;
        const oz = z - Math.sin(inward) * off;
        cyanGeos.push(boxGeo(0.07, h * 0.9, 0.05, ox, h * 0.5 + 0.5, oz, inward));
      }
      const capLight = (i % 4 === 0 ? pinkGeos : violetGeos);
      capLight.push(boxGeo(1.6, 0.06, 1.6, x, h + 0.73, z, a));
    }

    // Arena cover blocks
    const obstacles = [
      { x: -8.5, z: 6.0, w: 3.4, h: 1.55, d: 2.2, ry: 0.35 },
      { x: 8.9, z: 4.6, w: 2.8, h: 1.25, d: 2.8, ry: -0.2 },
      { x: -6.2, z: -7.4, w: 4.2, h: 1.8, d: 1.6, ry: -0.15 },
      { x: 7.4, z: -9.2, w: 3.1, h: 1.45, d: 2.1, ry: 0.5 },
      { x: -13.2, z: 13.4, w: 2.4, h: 2.6, d: 2.4, ry: 0.1 },
      { x: 15.6, z: 10.2, w: 2.2, h: 3.1, d: 2.2, ry: -0.35 },
      { x: 13.8, z: -4.2, w: 1.8, h: 2.2, d: 1.8, ry: 0.2 },
      { x: -15.4, z: -6.0, w: 1.8, h: 2.5, d: 1.8, ry: -0.15 }
    ];
    for (const o of obstacles) {
      darkGeos.push(boxGeo(o.w, o.h, o.d, o.x, o.h / 2, o.z, o.ry));
      cyanGeos.push(boxGeo(o.w * 0.86, 0.045, o.d * 0.86, o.x, o.h - 0.06, o.z, o.ry));
      pinkGeos.push(boxGeo(o.w * 0.55, 0.035, 0.05, o.x, o.h * 0.62, o.z + o.d / 2 + 0.02, o.ry));
      this.colliders.push({ x: o.x, z: o.z, r: Math.max(o.w, o.d) * 0.52 });
    }

    // spawn points around the arena
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU + 0.28;
      this.spawnPoints.push(new THREE.Vector3(Math.sin(a) * 27.5, 0, Math.cos(a) * 27.5));
    }

    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0c0a18, metalness: 0.72, roughness: 0.42, emissive: 0x06030f, emissiveIntensity: 0.8 });
    const cyanMat = new THREE.MeshBasicMaterial({ color: 0x66f7ff, toneMapped: false, fog: false });
    const pinkMat = new THREE.MeshBasicMaterial({ color: 0xff4fa8, toneMapped: false, fog: false });
    const violetMat = new THREE.MeshBasicMaterial({ color: 0x9a6cff, toneMapped: false, fog: false });

    const dark = buildMerged(darkGeos, darkMat);
    const cyan = buildMerged(cyanGeos, cyanMat);
    const pink = buildMerged(pinkGeos, pinkMat);
    const violet = buildMerged(violetGeos, violetMat);
    [dark, cyan, pink, violet].forEach((m) => {
      if (!m) return;
      this.scene.add(m);
      if (m === dark) this.solidMeshes.push(m);
    });
    this.structureCyan = cyanMat;
    this.structurePink = pinkMat;

    // Floating monoliths
    this.monoliths = [];
    const monoDefs = [
      { x: -20, y: 12.5, z: -14, w: 8.5, h: 0.42, d: 3.2, color: 0xff2e9a },
      { x: 23, y: 15.5, z: -8, w: 6.4, h: 0.35, d: 2.4, color: 0x3ef3ff },
      { x: 4, y: 19, z: -26, w: 11, h: 0.5, d: 3.6, color: 0x9165ff }
    ];
    for (const m of monoDefs) {
      const group = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({ color: 0x0a0816, metalness: 0.8, roughness: 0.35, emissive: m.color, emissiveIntensity: 0.08 });
      const body = new THREE.Mesh(new THREE.BoxGeometry(m.w, m.h, m.d), mat);
      group.add(body);
      const edgeMat = new THREE.MeshBasicMaterial({ color: m.color, toneMapped: false, fog: false });
      const edge = new THREE.Mesh(new THREE.BoxGeometry(m.w + 0.06, 0.035, m.d + 0.06), edgeMat);
      edge.position.y = m.h / 2;
      group.add(edge);
      const under = new THREE.Mesh(new THREE.PlaneGeometry(m.w * 0.9, m.d * 0.8), new THREE.MeshBasicMaterial({ map: this.glowTexture, color: m.color, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
      under.rotation.x = Math.PI / 2;
      under.position.y = -m.h / 2 - 0.02;
      group.add(under);
      group.position.set(m.x, m.y, m.z);
      group.rotation.y = rand(-0.5, 0.5);
      group.userData = { baseY: m.y, speed: rand(0.02, 0.06), phase: rand(0, TAU) };
      this.scene.add(group);
      this.monoliths.push(group);
    }

    // Halo rings in the distant sky
    this.halo = new THREE.Group();
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xff7bbd, toneMapped: false, transparent: true, opacity: 0.65, fog: false });
    const halo1 = new THREE.Mesh(new THREE.TorusGeometry(17.5, 0.075, 6, 120), haloMat);
    halo1.position.set(0, 13, -98);
    this.halo.add(halo1);
    const halo2 = new THREE.Mesh(new THREE.TorusGeometry(23.5, 0.04, 6, 120), new THREE.MeshBasicMaterial({ color: 0x7af7ff, toneMapped: false, transparent: true, opacity: 0.4, fog: false }));
    halo2.position.set(0, 13, -100);
    this.halo.add(halo2);
    this.scene.add(this.halo);
    this.halo1 = halo1;
    this.halo2 = halo2;
  }

  buildGates() {
    this.portals = [];
    const archMat = new THREE.MeshStandardMaterial({ color: 0x0d0b1a, metalness: 0.8, roughness: 0.36, emissive: 0x0a0314, emissiveIntensity: 0.7 });
    const neonMat = new THREE.MeshBasicMaterial({ color: 0x3ef3ff, toneMapped: false, fog: false });
    const pinkMat = new THREE.MeshBasicMaterial({ color: 0xff2e9a, toneMapped: false, fog: false });

    const portalMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0x3ef3ff) } },
      vertexShader: /* glsl */`
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */`
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main() {
          vec2 p = vUv - 0.5;
          float r = length(p * vec2(1.0, 1.25));
          float swirl = sin(atan(p.y, p.x) * 5.0 + r * 22.0 - uTime * 2.2) * 0.5 + 0.5;
          float mask = smoothstep(0.5, 0.16, r);
          float edge = smoothstep(0.5, 0.4, r) * smoothstep(0.3, 0.42, r);
          float noise = hash(floor(vUv * 22.0 + uTime * 0.4));
          vec3 col = mix(vec3(0.03, 0.5, 0.65), vec3(0.85, 0.08, 0.5), vUv.y * 0.7 + swirl * 0.3);
          col += uColor * swirl * 0.7;
          float a = mask * (0.32 + swirl * 0.36) + edge * 0.7 + noise * 0.03;
          gl_FragColor = vec4(col, a * 0.9);
        }
      `
    });
    this.portalMat = portalMat;

    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * TAU;
      const x = Math.sin(a) * 33.4;
      const z = Math.cos(a) * 33.4;
      const group = new THREE.Group();
      group.position.set(x, 0, z);
      group.rotation.y = a;

      const colL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 8.4, 0.8), archMat);
      colL.position.set(-3.1, 4.2, 0);
      const colR = colL.clone();
      colR.position.x = 3.1;
      const top = new THREE.Mesh(new THREE.BoxGeometry(7, 0.7, 0.9), archMat);
      top.position.y = 8.1;
      group.add(colL, colR, top);

      const stripL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 7.6, 0.07), i % 2 ? pinkMat : neonMat);
      stripL.position.set(-2.66, 4.0, 0.42);
      const stripR = stripL.clone();
      stripR.position.x = 2.66;
      const stripT = new THREE.Mesh(new THREE.BoxGeometry(6.1, 0.06, 0.07), i % 2 ? neonMat : pinkMat);
      stripT.position.set(0, 7.78, 0.42);
      group.add(stripL, stripR, stripT);

      const portal = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 7.4), portalMat);
      portal.position.set(0, 3.9, 0.15);
      group.add(portal);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.045, 6, 48), i % 2 ? neonMat : pinkMat);
      ring.position.set(0, 3.9, 0.22);
      group.add(ring);

      const base = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.3, 1.6), archMat);
      base.position.y = 0.15;
      group.add(base);

      this.scene.add(group);
      this.portals.push({ group, portal, ring });
    }
  }

  buildDistant() {
    const geos = [];
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * TAU + rand(-0.06, 0.06);
      const r = rand(54, 86);
      const h = rand(6, 34) * (Math.sin(a) > 0.2 ? 1 : 0.6);
      const w = rand(2, 6);
      geos.push(boxGeo(w, h, w, Math.sin(a) * r, h / 2 - 2, Math.cos(a) * r, a));
      if (i % 3 === 0) {
        geos.push(boxGeo(w * 0.4, h * 0.5, w * 0.4, Math.sin(a + 0.05) * (r + 4), h * 0.28 - 2, Math.cos(a + 0.05) * (r + 4), a));
      }
    }
    const mat = new THREE.MeshStandardMaterial({ color: 0x070510, metalness: 0.4, roughness: 0.9, emissive: 0x140520, emissiveIntensity: 0.6 });
    const mesh = buildMerged(geos, mat);
    if (mesh) this.scene.add(mesh);

    // A few distant neon accents
    const accents = [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * TAU + 0.11;
      const r = 60 + (i % 3) * 7;
      const h = 5 + (i % 5) * 4;
      accents.push(boxGeo(0.16, h, 0.16, Math.sin(a) * r, h / 2 + 1, Math.cos(a) * r, a));
    }
    const accentsMesh = buildMerged(accents, new THREE.MeshBasicMaterial({ color: 0xff2e9a, toneMapped: false, fog: false, transparent: true, opacity: 0.45 }));
    if (accentsMesh) this.scene.add(accentsMesh);

    // atmospheric glow sprites at the horizon
    const spriteMat = new THREE.SpriteMaterial({
      map: this.glowTexture,
      color: 0xff2e9a,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false
    });
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU;
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(Math.sin(a) * 48, 4 + (i % 2) * 3, Math.cos(a) * 48);
      sprite.scale.set(38, 22, 1);
      this.scene.add(sprite);
    }

    // light shafts above each gate
    const shaftMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0x3ef3ff) } },
      vertexShader: /* glsl */`
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */`
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        void main() {
          float fadeY = smoothstep(0.0, 0.55, vUv.y) * smoothstep(1.0, 0.45, vUv.y);
          float edge = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
          float flow = 0.65 + 0.35 * sin(vUv.y * 22.0 - uTime * 1.4);
          gl_FragColor = vec4(uColor, fadeY * edge * flow * 0.11);
        }
      `
    });
    this.shaftMat = shaftMat;
    this.shafts = [];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * TAU;
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 5.2, 15, 24, 1, true), shaftMat);
      shaft.position.set(Math.sin(a) * 31.5, 7.5, Math.cos(a) * 31.5);
      this.scene.add(shaft);
      this.shafts.push(shaft);
    }
  }

  buildFx() {
    this.motes = new THREE.Group();
    const geo = new THREE.BufferGeometry();
    const count = 420;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = rand(0, TAU);
      const r = Math.sqrt(rand(0, 1)) * 33;
      pos[i * 3] = Math.sin(a) * r;
      pos[i * 3 + 1] = rand(0.2, 14);
      pos[i * 3 + 2] = Math.cos(a) * r;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.075,
      map: this.glowTexture,
      color: 0x8ff7ff,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      fog: false
    });
    this.motePoints = new THREE.Points(geo, mat);
    this.motePoints.frustumCulled = false;
    this.motes.add(this.motePoints);
    this.scene.add(this.motes);

    this.motePoints2 = new THREE.Points(geo.clone(), new THREE.PointsMaterial({
      size: 0.045,
      map: this.glowTexture,
      color: 0xff5fae,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false
    }));
    this.motePoints2.position.y = 3;
    this.motePoints2.scale.setScalar(0.7);
    this.scene.add(this.motePoints2);
  }

  buildParticles() {
    this.sparks = new SparkField(this.scene, 1100);
    this.rings = [];
    this.ringGeo = new THREE.RingGeometry(0.86, 1, 56);
    this.tracers = [];
    this.impacts = [];
    this.impactPool = [];
    this.tracerPool = [];

    // muzzle flash sprite + light
    this.muzzleSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.glowTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      fog: false
    }));
    this.muzzleSprite.scale.set(1, 1, 1);
    this.scene.add(this.muzzleSprite);
    this.muzzleLight = new THREE.PointLight(0x3ef3ff, 0, 10, 2);
    this.scene.add(this.muzzleLight);
    this.muzzleLife = 0;

    // shared shockwave pool
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0x3ef3ff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        fog: false
      });
      const mesh = new THREE.Mesh(this.ringGeo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.visible = false;
      this.scene.add(mesh);
      this.rings.push({ mesh, life: 0, maxLife: 1, radius: 1, vertical: false });
    }

    // glow decals pool (impact blooms)
    for (let i = 0; i < 22; i++) {
      const mat = new THREE.SpriteMaterial({
        map: this.glowTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        fog: false
      });
      const sprite = new THREE.Sprite(mat);
      sprite.visible = false;
      this.scene.add(sprite);
      this.impactPool.push({ sprite, life: 0, maxLife: 1, scale: 1 });
    }

    // tracer lines pool
    for (let i = 0; i < 36; i++) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const mat = new THREE.LineBasicMaterial({
        color: 0x3ef3ff,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        fog: false
      });
      const line = new THREE.Line(geo, mat);
      line.visible = false;
      line.frustumCulled = false;
      this.scene.add(line);
      this.tracerPool.push({ line, life: 0, maxLife: 0.1 });
    }

    // wide energy beams (cylinder)
    this.beamPool = [];
    for (let i = 0; i < 10; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        fog: false
      });
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 5, 1, true), mat);
      mesh.visible = false;
      this.scene.add(mesh);
      this.beamPool.push({ mesh, life: 0, maxLife: 0.16 });
    }

    this.dustSpawnTimer = 0;
  }

  tunnelBurst(pos, color, power = 1) {
    this.sparks.spawn(pos, color, Math.floor(16 * power), power, 1, 0.07, 0.8, 2.2);
  }

  spark(pos, color, count = 10, power = 1, size = 0.055, life = 0.6) {
    this.sparks.spawn(pos, color, count, power, 1, size, life, 6);
  }

  shockwave(pos, color, radius = 4, duration = 0.55, vertical = false) {
    for (const r of this.rings) {
      if (r.life > 0) continue;
      r.life = r.maxLife = duration;
      r.radius = radius;
      r.vertical = vertical;
      r.mesh.position.copy(pos);
      r.mesh.rotation.x = vertical ? 0 : -Math.PI / 2;
      r.mesh.rotation.z = 0;
      r.mesh.material.color.set(color);
      r.mesh.material.opacity = 1;
      r.mesh.scale.setScalar(0.2);
      r.mesh.visible = true;
      return;
    }
  }

  tracer(from, to, color = 0x3ef3ff, life = 0.09, wide = false) {
    const pool = wide ? this.beamPool : this.tracerPool;
    const item = pool.find((p) => p.life <= 0);
    if (!item) return;
    if (wide) {
      const { mesh } = item;
      const dir = new THREE.Vector3().subVectors(to, from);
      const len = dir.length();
      mesh.position.copy(from).addScaledVector(dir, 0.5);
      mesh.scale.set(1, len, 1);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      mesh.material.color.set(color);
      mesh.material.opacity = 1;
      mesh.visible = true;
      item.life = item.maxLife = life;
    } else {
      const { line } = item;
      const arr = line.geometry.attributes.position.array;
      arr[0] = from.x; arr[1] = from.y; arr[2] = from.z;
      arr[3] = to.x; arr[4] = to.y; arr[5] = to.z;
      line.geometry.attributes.position.needsUpdate = true;
      line.material.color.set(color);
      line.material.opacity = 1;
      line.visible = true;
      item.life = item.maxLife = life;
    }
  }

  impact(pos, color = 0x3ef3ff, scale = 0.5) {
    const item = this.impactPool.find((p) => p.life <= 0) || this.impactPool[0];
    item.sprite.position.copy(pos);
    item.sprite.material.color.set(color);
    item.sprite.material.opacity = 1;
    item.sprite.scale.setScalar(scale);
    item.sprite.visible = true;
    item.life = item.maxLife = 0.18;
    item.scale = scale;
    this.spark(pos, color, 5, 0.7, 0.04, 0.4);
  }

  muzzleFlash(pos, color = 0x3ef3ff, scale = 1) {
    this.muzzleSprite.position.copy(pos);
    this.muzzleSprite.material.color.set(color);
    this.muzzleSprite.material.opacity = 0.95;
    this.muzzleSprite.scale.setScalar(0.55 * scale);
    this.muzzleLight.position.copy(pos);
    this.muzzleLight.color.set(color);
    this.muzzleLight.intensity = 22 * scale;
    this.muzzleLife = 0.06;
  }

  /* ---------------------------------------------------------- */

  raycast(origin, direction, far = 120) {
    const ray = new THREE.Raycaster(origin, direction.clone().normalize(), 0.01, far);
    const hits = ray.intersectObjects(this.solidMeshes, false);
    if (!hits.length) return null;
    const h = hits[0];
    return { point: h.point, distance: h.distance, normal: h.face?.normal?.clone() || new THREE.Vector3(0, 1, 0), object: h.object };
  }

  pushOut(pos, radius = 0.45) {
    const maxR = ARENA_RADIUS - 0.8;
    const len = Math.hypot(pos.x, pos.z);
    if (len > maxR) {
      pos.x = (pos.x / len) * maxR;
      pos.z = (pos.z / len) * maxR;
    }
    for (const c of this.colliders) {
      const dx = pos.x - c.x;
      const dz = pos.z - c.z;
      const d = Math.hypot(dx, dz);
      const min = c.r + radius;
      if (d < min && d > 0.0001) {
        pos.x = c.x + (dx / d) * min;
        pos.z = c.z + (dz / d) * min;
      }
    }
  }

  menuCamera(t) {
    const a = 2.35 + t * 0.035;
    const y = 10.5 + Math.sin(t * 0.13) * 1.3;
    this.camera.position.set(Math.cos(a) * 30, y, Math.sin(a) * 30);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(0, 2.6, 0);
  }

  setHurt(v) { this.hurt = v; }
  setForge(v) { this.forge = v; }

  update(dt, t) {
    this.time = t;
    this.sky.position.copy(this.camera.position);
    this.skyMat.uniforms.uTime.value = t;
    this.groundMat.uniforms.uTime.value = t;
    this.portalMat.uniforms.uTime.value = t;
    this.shaftMat.uniforms.uTime.value = t;

    this.emblem.rotation.z = Math.sin(t * 0.13) * 0.04;
    this.emblem.material.opacity = 0.72 + Math.sin(t * 1.4) * 0.08;

    for (const m of this.monoliths) {
      m.position.y = m.userData.baseY + Math.sin(t * 0.5 + m.userData.phase) * 0.45;
      m.rotation.y += dt * m.userData.speed;
    }
    this.halo1.rotation.z += dt * 0.015;
    this.halo2.rotation.z -= dt * 0.01;
    this.motes.rotation.y += dt * 0.006;
    this.motePoints2.rotation.y -= dt * 0.004;
    this.motePoints.position.y = Math.sin(t * 0.3) * 0.35;

    for (let i = 0; i < this.portals.length; i++) {
      const p = this.portals[i];
      p.ring.rotation.z += dt * (0.35 + i * 0.07);
      p.portal.material.opacity = 0.8 + Math.sin(t * 1.3 + i) * 0.1;
    }
    for (let i = 0; i < this.gateLights.length; i++) {
      const l = this.gateLights[i];
      l.intensity = 12 + Math.sin(t * 2.1 + i * 1.7) * 3.5;
    }
    this.centerLight.intensity = 7 + Math.sin(t * 1.8) * 1.6;

    this.sparks.update(dt);

    for (const r of this.rings) {
      if (r.life <= 0) continue;
      r.life -= dt;
      const k = clamp(r.life / r.maxLife, 0, 1);
      const grow = (1 - k) * 0.85 + 0.15;
      r.mesh.scale.setScalar(0.18 + grow * r.radius);
      r.mesh.material.opacity = k * k * 0.9;
      if (r.life <= 0) r.mesh.visible = false;
    }

    for (const tr of this.tracerPool) {
      if (tr.life <= 0) continue;
      tr.life -= dt;
      tr.line.material.opacity = clamp(tr.life / tr.maxLife, 0, 1);
      if (tr.life <= 0) tr.line.visible = false;
    }
    for (const b of this.beamPool) {
      if (b.life <= 0) continue;
      b.life -= dt;
      b.mesh.material.opacity = clamp(b.life / b.maxLife, 0, 1);
      if (b.life <= 0) b.mesh.visible = false;
    }
    for (const im of this.impactPool) {
      if (im.life <= 0) continue;
      im.life -= dt;
      const k = clamp(im.life / im.maxLife, 0, 1);
      im.sprite.material.opacity = k;
      im.sprite.scale.setScalar(im.scale * (1.2 - k * 0.35));
      if (im.life <= 0) im.sprite.visible = false;
    }

    if (this.muzzleLife > 0) {
      this.muzzleLife -= dt;
      this.muzzleLight.intensity = Math.max(0, this.muzzleLight.intensity - dt * 380);
      this.muzzleSprite.material.opacity = Math.max(0, this.muzzleLife / 0.06) * 0.95;
      if (this.muzzleLife <= 0) {
        this.muzzleSprite.material.opacity = 0;
        this.muzzleLight.intensity = 0;
      }
    }

    // camera-driven dust in the air
    this.dustSpawnTimer -= dt;
    if (this.dustSpawnTimer <= 0) {
      this.dustSpawnTimer = 0.12;
      const p = new THREE.Vector3(
        this.camera.position.x + rand(-9, 9),
        rand(0.4, 6.5),
        this.camera.position.z + rand(-9, 9)
      );
      this.sparks.spawn(p, choice([0x3ef3ff, 0xff2e9a, 0x9165ff]), 1, 0.15, 1.5, 0.035, 3.5, 0.05);
    }

    this.grade.uniforms.uTime.value = t;
    this.grade.uniforms.uHurt.value = damp(this.grade.uniforms.uHurt.value, this.hurt, 8, dt);
    this.grade.uniforms.uForge.value = damp(this.grade.uniforms.uForge.value, this.forge, 7, dt);
    this.grade.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  }

  render() {
    this.composer.render();
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.fov = this.fovFor();
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(w, h, false);
    this.composer.setPixelRatio(this.pixelRatio);
    this.composer.setSize(w, h);
    this.bloom.resolution.set(w, h);
    this.grade.uniforms.uResolution.value.set(w, h);
    this.sparks.material.uniforms.uPixel.value = this.pixelRatio;
  }

  lowerQuality() {
    if (this.quality === 0) return;
    this.quality = 0;
    this.pixelRatio = 0.85;
    this.bloom.enabled = false;
    this.resize();
  }
}
