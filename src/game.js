import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import {
  buildWeaponModel,
  createWeaponFromPhrase,
  disposeWeaponModel,
} from './weapons.js';

/* ============================================================
   Small utilities
   ============================================================ */

const TAU = Math.PI * 2;
const tempV = new THREE.Vector3();
const tempV2 = new THREE.Vector3();
const tempQ = new THREE.Quaternion();
const tempSphere = new THREE.Sphere();
const harvestDummy = new THREE.Object3D();
const rayOrigin = new THREE.Vector3();
const rayDirection = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);
const rand = (min, max) => min + Math.random() * (max - min);
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function createSoftDotTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  gradient.addColorStop(0.65, 'rgba(255,255,255,0.18)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createGridTexture() {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#060a11';
  ctx.fillRect(0, 0, size, size);

  // Subtle panel variation.
  for (let i = 0; i < 30; i += 1) {
    const x = Math.floor(Math.random() * 8) * 128;
    const y = Math.floor(Math.random() * 8) * 128;
    ctx.fillStyle = `rgba(24, 47, 58, ${0.06 + Math.random() * 0.05})`;
    ctx.fillRect(x + 2, y + 2, 124, 124);
  }

  ctx.strokeStyle = 'rgba(72, 169, 174, 0.18)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= size; i += 128) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(103, 235, 241, 0.35)';
  ctx.lineWidth = 2;
  for (let i = 0; i <= size; i += 256) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(215,255,69,0.8)';
  for (let x = 64; x < size; x += 256) {
    for (let y = 64; y < size; y += 256) {
      ctx.fillRect(x - 3, y - 3, 6, 6);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(7, 7);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function makeTextTexture(text, subtext = '') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 256);
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(215,255,69,0.95)';
  ctx.font = '700 74px "Chakra Petch", Arial, sans-serif';
  ctx.fillText(text, 256, 120);
  if (subtext) {
    ctx.fillStyle = 'rgba(119,245,255,0.65)';
    ctx.font = '500 21px "Chakra Petch", Arial, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText(subtext, 256, 168);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const BLOCKS_PER_WORD = 10;

function harvestWords(phrase) {
  const words = String(phrase || '')
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
    .filter(Boolean);
  return words.length > 0 ? words : ['ARMA'];
}

function makeWordLabelTexture(word, color = '#d7ff45') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 160);

  // A dark, clipped plate keeps the word readable over neon and bloom.
  const x = 10;
  const y = 12;
  const w = 492;
  const h = 136;
  const cut = 18;
  ctx.beginPath();
  ctx.moveTo(x + cut, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h - cut);
  ctx.lineTo(x + w - cut, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + cut);
  ctx.closePath();
  ctx.fillStyle = 'rgba(4, 9, 14, 0.78)';
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.globalAlpha = 1;

  let fontSize = Math.min(62, 430 / Math.max(1, word.length * 0.56));
  ctx.textAlign = 'center';
  ctx.font = `700 ${fontSize}px "Chakra Petch", "Arial Narrow", Arial, sans-serif`;
  while (ctx.measureText(word).width > 430 && fontSize > 20) {
    fontSize -= 2;
    ctx.font = `700 ${fontSize}px "Chakra Petch", "Arial Narrow", Arial, sans-serif`;
  }
  ctx.fillStyle = '#f3f7f1';
  ctx.fillText(word, 256, 82);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.72;
  ctx.font = '600 19px "Chakra Petch", Arial, sans-serif';
  ctx.fillText(`${BLOCKS_PER_WORD} BLOQUINHOS`, 256, 118);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/* ============================================================
   Game
   ============================================================ */

export class Game {
  constructor(canvas, callbacks = {}, audio = null) {
    this.canvas = canvas;
    this.callbacks = callbacks;
    this.audio = audio;
    this.mode = 'menu';
    this.time = 0;
    this.menuTime = 0;
    this.score = 0;
    this.kills = 0;
    this.wave = 0;
    this.pendingSpawns = [];
    this.enemies = [];
    this.projectiles = [];
    this.beams = [];
    this.effects = [];
    this.bursts = [];
    this.rings = [];
    this.obstacles = [];
    this.combo = 0;
    this.comboTimer = 0;
    this.shake = 0;
    this.shakeSeed = Math.random() * 100;
    this.recoil = 0;
    this.bobTime = 0;
    this.nextShotAt = 0;
    this.weapon = null;
    this.weaponModel = null;
    this.weaponHistory = [];
    this.harvest = null;
    this.fireHeld = false;
    this.waveState = 'idle';
    this.waveTimer = 0;
    this.runStartedAt = 0;
    this.lastHealth = -1;
    this.lastEnemyCount = -1;
    this.spawnTimer = 0;
    this.aimAssist = matchMedia('(pointer: coarse)').matches;
    this.controls = { forward: 0, strafe: 0, fire: false, tiltYaw: 0, tiltPitch: 0 };
    this.player = this.createPlayerState();
    this.reducedQuality = false;

    this.initRenderer();
    this.initScene();
    this.buildArena();
    this.buildWeaponRig();
    this.buildMenuDisplay();
    this.setMenuCamera(true);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.setWeapon(createWeaponFromPhrase('pistola de acesso'), false);
  }

  createPlayerState() {
    return {
      x: 0,
      z: 10,
      yaw: 0,
      pitch: 0,
      height: 1.65,
      health: 100,
      maxHealth: 100,
      radius: 0.48,
      invulnerable: 0,
      speed: 5.2,
    };
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
    });
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, matchMedia('(pointer: coarse)').matches ? 1.55 : 1.85);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;

    const gl = this.renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererName = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    this.reducedQuality = /swiftshader|software|llvmpipe/i.test(String(rendererName));

    // The real composer is wired once the scene exists (see initScene).
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x04070c);
    this.scene.fog = new THREE.FogExp2(0x05080e, 0.0185);

    this.camera = new THREE.PerspectiveCamera(76, window.innerWidth / window.innerHeight, 0.05, 220);
    this.camera.rotation.order = 'YXZ';
    this.camera.position.set(0, 1.65, 10);
    this.scene.add(this.camera);

    this.scene.add(new THREE.HemisphereLight(0x6887a8, 0x05060a, 0.74));

    const key = new THREE.DirectionalLight(0xa8d9ff, 1.25);
    key.position.set(-8, 16, 9);
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0xff6144, 0.65);
    rim.position.set(12, 6, -14);
    this.scene.add(rim);

    const centerLight = new THREE.PointLight(0x54f4ff, 16, 34, 2);
    centerLight.position.set(0, 4.4, 0);
    this.scene.add(centerLight);
    this.centerLight = centerLight;

    const acidLight = new THREE.PointLight(0xd7ff45, 6, 17, 2);
    acidLight.position.set(0, 1.4, 0);
    this.scene.add(acidLight);

    const emberLight = new THREE.PointLight(0xff5536, 10, 20, 2);
    emberLight.position.set(-13, 3.4, -8);
    this.scene.add(emberLight);

    const coolLight = new THREE.PointLight(0x4ca9ff, 8, 20, 2);
    coolLight.position.set(14, 3.4, 5);
    this.scene.add(coolLight);

    this.buildSky();
    this.buildDust();

    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(this.pixelRatio);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.reducedQuality ? 0.32 : 0.7,
      0.5,
      0.82,
    );
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  buildSky() {
    const skyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x01030a) },
        horizonColor: { value: new THREE.Color(0x0a2030) },
        glowColor: { value: new THREE.Color(0x1b6b74) },
      },
      vertexShader: `
        varying vec3 vWorld;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vWorld = world.xyz;
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 glowColor;
        varying vec3 vWorld;
        void main() {
          vec3 dir = normalize(vWorld);
          float h = smoothstep(-0.08, 0.72, dir.y);
          vec3 color = mix(horizonColor, topColor, h);
          float horizon = pow(1.0 - abs(dir.y), 6.0);
          color += glowColor * horizon * 0.55;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(130, 32, 20), skyMaterial);
    sky.renderOrder = -10;
    this.scene.add(sky);

    const starGeometry = new THREE.BufferGeometry();
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = rand(55, 105);
      const theta = rand(0, TAU);
      const phi = Math.acos(rand(-0.1, 1));
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.cos(phi) * radius + 5;
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: 0x9fd7ff,
        size: 0.55,
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
        fog: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    );
    this.scene.add(stars);
    this.stars = stars;
  }

  buildDust() {
    const count = 650;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const radius = Math.sqrt(Math.random()) * 27;
      const angle = rand(0, TAU);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = rand(0.05, 9);
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      speeds[i] = rand(0.05, 0.28);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x8df4e8,
      size: 0.038,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    this.dust = new THREE.Points(geometry, material);
    this.dust.userData.speeds = speeds;
    this.scene.add(this.dust);
  }

  buildArena() {
    const gridTexture = createGridTexture();
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(29, 96),
      new THREE.MeshStandardMaterial({
        color: 0x111820,
        map: gridTexture,
        metalness: 0.7,
        roughness: 0.42,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    this.scene.add(floor);
    this.floor = floor;

    const grid = new THREE.GridHelper(58, 58, 0x58f2e4, 0x18333c);
    grid.position.y = 0.015;
    grid.material.transparent = true;
    grid.material.opacity = 0.19;
    grid.material.depthWrite = false;
    this.scene.add(grid);

    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x5ceadf,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    for (const radius of [7.6, 14.5, 21.8, 27.5]) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(radius - 0.035, radius + 0.035, 96), ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.025;
      this.scene.add(ring);
    }

    const dangerRing = new THREE.Mesh(
      new THREE.RingGeometry(23.8, 24.05, 96),
      new THREE.MeshBasicMaterial({
        color: 0xff5736,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    dangerRing.rotation.x = -Math.PI / 2;
    dangerRing.position.y = 0.03;
    this.scene.add(dangerRing);

    // Arena wall
    const wall = new THREE.Mesh(
      new THREE.CylinderGeometry(29.2, 29.2, 11, 72, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x080d15,
        metalness: 0.72,
        roughness: 0.64,
        side: THREE.BackSide,
      }),
    );
    wall.position.y = 5.5;
    this.scene.add(wall);

    const wallLineMat = new THREE.MeshBasicMaterial({
      color: 0x2f8b96,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (const y of [0.25, 3.2, 6.2, 9.4]) {
      const line = new THREE.Mesh(new THREE.TorusGeometry(29.05, 0.025, 6, 72), wallLineMat);
      line.rotation.x = Math.PI / 2;
      line.position.y = y;
      this.scene.add(line);
    }

    // Vertical ribs and pylons
    const ribMat = new THREE.MeshStandardMaterial({
      color: 0x0e1621,
      metalness: 0.8,
      roughness: 0.4,
      emissive: 0x123944,
      emissiveIntensity: 0.25,
    });
    const neonMat = new THREE.MeshBasicMaterial({
      color: 0x57e2ea,
      transparent: true,
      opacity: 0.62,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (let i = 0; i < 18; i += 1) {
      const angle = (i / 18) * TAU;
      const radius = 28.7;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.34, 10.4, 0.34), ribMat);
      rib.position.set(x, 5.2, z);
      this.scene.add(rib);
      const glow = new THREE.Mesh(new THREE.BoxGeometry(0.045, 4.8, 0.045), neonMat);
      glow.position.set(x * 0.992, 3.4, z * 0.992);
      this.scene.add(glow);
    }

    // Short cover pylons: visual rhythm and actual movement collision.
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x111923,
      metalness: 0.72,
      roughness: 0.4,
    });
    const coverGlow = new THREE.MeshBasicMaterial({
      color: 0xff5b38,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const coverSpots = [
      { angle: 0.48, radius: 14.7, w: 3.2, h: 1.2, d: 0.55 },
      { angle: 2.3, radius: 16.2, w: 2.3, h: 1.6, d: 0.55 },
      { angle: 3.65, radius: 13.8, w: 3.8, h: 0.9, d: 0.55 },
      { angle: 5.25, radius: 16.8, w: 2.8, h: 1.4, d: 0.55 },
    ];
    for (const spot of coverSpots) {
      const x = Math.cos(spot.angle) * spot.radius;
      const z = Math.sin(spot.angle) * spot.radius;
      const group = new THREE.Group();
      group.position.set(x, 0, z);
      group.rotation.y = -spot.angle + Math.PI / 2;
      const block = new THREE.Mesh(new THREE.BoxGeometry(spot.w, spot.h, spot.d), coverMat);
      block.position.y = spot.h / 2;
      group.add(block);
      const strip = new THREE.Mesh(new THREE.BoxGeometry(spot.w * 0.86, 0.03, 0.035), coverGlow);
      strip.position.set(0, spot.h + 0.01, -spot.d * 0.32);
      group.add(strip);
      const strip2 = strip.clone();
      strip2.position.y = 0.18;
      group.add(strip2);
      this.scene.add(group);
      this.obstacles.push({ x, z, radius: Math.max(spot.w, spot.d) * 0.54 });
    }

    this.buildObelisk();
    this.buildArenaDetails();
  }

  buildObelisk() {
    const group = new THREE.Group();
    group.position.set(0, 0, 0);
    this.scene.add(group);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(2.25, 2.55, 0.35, 8),
      new THREE.MeshStandardMaterial({ color: 0x0b1118, metalness: 0.85, roughness: 0.32 }),
    );
    base.position.y = 0.17;
    group.add(base);

    const baseGlow = new THREE.Mesh(
      new THREE.TorusGeometry(2.32, 0.025, 6, 64),
      new THREE.MeshBasicMaterial({
        color: 0xd7ff45,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    baseGlow.rotation.x = Math.PI / 2;
    baseGlow.position.y = 0.36;
    group.add(baseGlow);

    const column = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.88, 4.1, 6),
      new THREE.MeshStandardMaterial({
        color: 0x0c131d,
        metalness: 0.8,
        roughness: 0.36,
        emissive: 0x0b2530,
        emissiveIntensity: 0.7,
      }),
    );
    column.position.y = 2.4;
    group.add(column);

    const stripMat = new THREE.MeshBasicMaterial({
      color: 0x62f5ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (let i = 0; i < 6; i += 1) {
      const angle = (i / 6) * TAU;
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.035, 3.2, 0.035), stripMat);
      strip.position.set(Math.cos(angle) * 0.62, 2.5, Math.sin(angle) * 0.62);
      group.add(strip);
    }

    const ringA = new THREE.Mesh(
      new THREE.TorusGeometry(1.45, 0.025, 8, 48),
      new THREE.MeshBasicMaterial({
        color: 0xd7ff45,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    ringA.rotation.x = Math.PI / 2;
    ringA.position.y = 3.2;
    group.add(ringA);

    const ringB = ringA.clone();
    ringB.scale.setScalar(0.68);
    ringB.position.y = 4.2;
    group.add(ringB);

    this.obeliskCrystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.42, 0),
      new THREE.MeshStandardMaterial({
        color: 0xd7ff45,
        emissive: 0xd7ff45,
        emissiveIntensity: 2.4,
        metalness: 0.2,
        roughness: 0.2,
      }),
    );
    this.obeliskCrystal.position.y = 5.0;
    group.add(this.obeliskCrystal);

    const crystalGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createSoftDotTexture(),
        color: 0xd7ff45,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    crystalGlow.scale.set(2.8, 2.8, 1);
    crystalGlow.position.y = 5;
    group.add(crystalGlow);

    const sign = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 1.1),
      new THREE.MeshBasicMaterial({
        map: makeTextTexture('VOX', 'ARENA 07 / LIVE'),
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    );
    sign.position.set(0, 3.45, 0.9);
    // Keep the plaque readable from the menu camera side.
    sign.lookAt(new THREE.Vector3(11, 3.45, 8));
    group.add(sign);

    this.obelisk = group;
    this.obeliskRings = [ringA, ringB];
  }

  buildArenaDetails() {
    // Floating fragments make the arena feel alive without high-poly meshes.
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x1a2d38,
      metalness: 0.8,
      roughness: 0.35,
      emissive: 0x0a3f4a,
      emissiveIntensity: 0.5,
    });
    this.shards = [];
    for (let i = 0; i < 14; i += 1) {
      const angle = rand(0, TAU);
      const radius = rand(9, 26);
      const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(rand(0.12, 0.4), 0), shardMat);
      mesh.position.set(Math.cos(angle) * radius, rand(2.5, 8), Math.sin(angle) * radius);
      mesh.userData = {
        baseY: mesh.position.y,
        phase: rand(0, TAU),
        speed: rand(0.2, 0.6),
        spin: rand(-0.5, 0.5),
      };
      this.scene.add(mesh);
      this.shards.push(mesh);
    }

    // Holographic gates around the wall.
    const gateMat = new THREE.MeshBasicMaterial({
      color: 0xff5937,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    for (let i = 0; i < 4; i += 1) {
      const angle = (i / 4) * TAU + Math.PI / 4;
      const gate = new THREE.Group();
      gate.position.set(Math.cos(angle) * 28.6, 0, Math.sin(angle) * 28.6);
      gate.rotation.y = -angle + Math.PI / 2;
      const frameTop = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 0.08), gateMat);
      frameTop.position.y = 3.9;
      gate.add(frameTop);
      const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.9, 0.08), gateMat);
      frameLeft.position.set(-1.4, 1.95, 0);
      gate.add(frameLeft);
      const frameRight = frameLeft.clone();
      frameRight.position.x = 1.4;
      gate.add(frameRight);
      this.scene.add(gate);
    }
  }

  buildWeaponRig() {
    this.viewRig = new THREE.Group();
    this.viewRig.position.set(0.43, -0.35, -1.32);
    this.viewRig.rotation.set(0.035, -0.17, -0.02);
    this.camera.add(this.viewRig);
    this.viewRig.visible = false;

    // A tiny local fill light keeps the procedural gun readable against the dark arena.
    const viewLight = new THREE.PointLight(0xd9f4ff, 2.1, 3.4, 2);
    viewLight.position.set(0.55, 0.32, 0.45);
    this.viewRig.add(viewLight);
    this.viewLight = viewLight;
  }

  buildMenuDisplay() {
    this.menuRig = new THREE.Group();
    this.menuRig.position.set(1.92, -0.62, -7.4);
    this.menuRig.rotation.set(0.04, -0.24, 0);
    this.camera.add(this.menuRig);

    const showcase = createWeaponFromPhrase('canhão de plasma ancestral');
    const model = buildWeaponModel(showcase);
    model.group.scale.setScalar(1.92);
    model.group.position.set(0, 0, 0);
    model.group.rotation.y = -1.12;
    this.menuRig.add(model.group);

    const coolKey = new THREE.PointLight(0xbdefff, 8.5, 5.4, 2);
    coolKey.position.set(0.8, 0.75, 2.2);
    this.menuRig.add(coolKey);
    const magentaRim = new THREE.PointLight(0xff56c9, 7.5, 4.8, 2);
    magentaRim.position.set(-1.2, -0.3, -0.9);
    this.menuRig.add(magentaRim);
    this.menuKeyLight = coolKey;
    this.menuWeaponModel = model;
    this.menuShowcase = showcase;

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createSoftDotTexture(),
        color: showcase.element.color,
        transparent: true,
        opacity: 0.17,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    glow.scale.set(4.6, 2.8, 1);
    glow.position.set(0, 0, -0.75);
    this.menuRig.add(glow);
    this.menuGlow = glow;

    const ringMat = new THREE.MeshBasicMaterial({
      color: showcase.element.color,
      transparent: true,
      opacity: 0.27,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.008, 4, 64), ringMat);
    ring1.rotation.set(1.1, 0.25, 0.4);
    this.menuRig.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.006, 4, 64), ringMat.clone());
    ring2.material.opacity = 0.13;
    ring2.rotation.set(0.5, 1.1, -0.3);
    this.menuRig.add(ring2);
    this.menuRings = [ring1, ring2];

    this.menuRig.visible = true;
    this.viewRig.visible = false;
  }

  previewWeapon(weapon) {
    if (!weapon || !this.menuRig) return;
    if (this.menuShowcase?.id === weapon.id) {
      this.menuShowcase = weapon;
      return;
    }

    if (this.menuWeaponModel) {
      disposeWeaponModel(this.menuWeaponModel);
      this.menuWeaponModel = null;
    }

    const model = buildWeaponModel(weapon);
    model.group.scale.setScalar(1.92);
    model.group.position.set(0, 0, 0);
    model.group.rotation.y = -1.12;
    this.menuRig.add(model.group);
    this.menuWeaponModel = model;
    this.menuShowcase = weapon;

    const color = new THREE.Color(weapon.element.color);
    if (this.menuGlow) this.menuGlow.material.color.copy(color);
    if (this.menuKeyLight) {
      const keyColor = color.clone().lerp(new THREE.Color(0xffffff), 0.55);
      this.menuKeyLight.color.copy(keyColor);
    }
    if (this.menuRings) {
      for (const ring of this.menuRings) ring.material.color.copy(color);
    }
  }

  setMenuCamera(instant = false) {
    const angle = 0.68 + Math.sin(this.menuTime * 0.045) * 0.11;
    const radius = instant ? 16.2 : 16.2;
    this.camera.position.set(Math.cos(angle) * radius, 3.45, Math.sin(angle) * radius);
    this.camera.rotation.order = 'YXZ';
    this.camera.lookAt(0, 2.45, 0);
  }

  /* ============================================================
     Run lifecycle
     ============================================================ */

  startRun(starterWeapon = null) {
    this.clearRunEntities();
    this.mode = 'playing';
    this.score = 0;
    this.kills = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.wave = 0;
    this.waveState = 'idle';
    this.waveTimer = 1.2;
    this.player = this.createPlayerState();
    this.player.x = 0;
    this.player.z = 10;
    this.player.yaw = 0;
    this.player.pitch = 0;
    this.player.invulnerable = 0;
    this.controls = { forward: 0, strafe: 0, fire: false, tiltYaw: 0, tiltPitch: 0 };
    this.fireHeld = false;
    this.recoil = 0;
    this.shake = 0;
    this.nextShotAt = 0;
    this.lastHealth = -1;
    this.lastEnemyCount = -1;
    this.runStartedAt = this.time;
    this.menuRig.visible = false;
    this.viewRig.visible = true;
    this.camera.fov = matchMedia('(pointer: coarse)').matches ? 79 : 76;
    this.camera.updateProjectionMatrix();
    this.camera.rotation.set(0, 0, 0);
    this.camera.position.set(0, 1.65, 10);
    const starter = starterWeapon || this.weapon || createWeaponFromPhrase('pistola de acesso');
    this.setWeapon(starter, false);
    this.emitHealth(true);
    this.emitScore();
    this.emitEnemyCount();
    this.audio?.ui(true);
  }

  showMenu() {
    this.mode = 'menu';
    this.clearRunEntities();
    this.menuRig.visible = true;
    this.viewRig.visible = false;
    this.player = this.createPlayerState();
    this.setMenuCamera(true);
    this.camera.fov = 76;
    this.camera.updateProjectionMatrix();
    this.scene.fog.density = 0.0185;
  }

  pause() {
    if (this.mode !== 'playing') return;
    this.mode = 'paused';
    this.controls.forward = 0;
    this.controls.strafe = 0;
    this.controls.fire = false;
    this.fireHeld = false;
  }

  resume() {
    if (this.mode !== 'paused') return;
    this.mode = 'playing';
  }

  endRun() {
    if (this.mode === 'over') return;
    this.mode = 'over';
    this.overAt = this.time;
    this.fireHeld = false;
    this.controls.fire = false;
    this.shake = 0.9;
    this.clearHarvest(true);
    this.callbacks.onGameOver?.({
      score: this.score,
      wave: Math.max(1, this.wave),
      kills: this.kills,
      weapon: this.weapon,
    });
  }

  clearRunEntities() {
    this.clearHarvest(false);
    while (this.enemies.length > 0) this.removeEnemy(this.enemies[0], false);
    for (const projectile of this.projectiles) this.disposeMesh(projectile.mesh);
    this.projectiles.length = 0;
    for (const beam of this.beams) this.disposeMesh(beam.mesh);
    this.beams.length = 0;
    for (const ring of this.rings) this.disposeMesh(ring.mesh);
    this.rings.length = 0;
    for (const burst of this.bursts) this.disposeBurst(burst);
    this.bursts.length = 0;
    for (const effect of this.effects) {
      this.scene.remove(effect);
      effect.geometry?.dispose();
      effect.material?.dispose();
    }
    this.effects.length = 0;
    this.pendingSpawns.length = 0;
  }

  /* ============================================================
     Weapon
     ============================================================ */

  setWeapon(weapon, animate = true) {
    this.weapon = weapon;
    if (this.weaponModel) {
      disposeWeaponModel(this.weaponModel);
      this.weaponModel = null;
    }
    if (this.viewRig) {
      const model = buildWeaponModel(weapon);
      model.group.scale.setScalar(0.62 * model.scale);
      model.group.position.set(0, 0, 0);
      model.group.rotation.set(0.01, 0, -0.015);
      this.viewRig.add(model.group);
      this.weaponModel = model;
      this.weaponFlash = 0;
      if (animate) {
        this.forgePulse = 1;
        this.spawnForgeRing(weapon);
      }
    }
    this.weaponHistory.unshift(weapon);
    this.weaponHistory = this.weaponHistory.slice(0, 8);
    this.callbacks.onWeapon?.(weapon, animate);
  }

  forgeWeapon(phrase, options = {}) {
    const weapon = createWeaponFromPhrase(phrase);
    if (options.instant || this.mode !== 'playing') {
      this.clearHarvest(false);
      this.setWeapon(weapon, true);
      this.callbacks.onForge?.(weapon);
      this.audio?.materialize();
      return weapon;
    }

    this.beginHarvest(weapon);
    return weapon;
  }

  /* ============================================================
     Block harvest: every word of the phrase costs 10 map blocks.
     ============================================================ */

  beginHarvest(weapon) {
    this.clearHarvest(true);
    const words = harvestWords(weapon.phrase);
    const total = words.length * BLOCKS_PER_WORD;
    const color = weapon.element.color;

    const group = new THREE.Group();
    this.scene.add(group);

    const blockGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const blockMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d1a22,
      emissive: color,
      emissiveIntensity: 0.88,
      metalness: 0.38,
      roughness: 0.3,
    });
    const mesh = new THREE.InstancedMesh(blockGeometry, blockMaterial, total);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    group.add(mesh);

    const beamGeometry = new THREE.CylinderGeometry(0.035, 0.11, 5, 6, 1, true);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.19,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ringGeometry = new THREE.RingGeometry(1.42, 1.5, 34);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const blocks = [];
    const labels = [];
    const anchors = [];
    const ringCount = Math.min(3, Math.max(1, Math.ceil(words.length / 10)));
    const baseAngle = rand(0, TAU);

    for (let i = 0; i < words.length; i += 1) {
      const ring = i % ringCount;
      const lane = Math.floor(i / ringCount);
      const laneCount = Math.ceil((words.length - ring) / ringCount);
      const angle = baseAngle + (lane / laneCount) * TAU + ring * 0.24 + rand(-0.08, 0.08);
      const radius = (ringCount === 1 ? 14.2 : 10.8 + ring * 4.2) + rand(-0.9, 0.9);
      let x = Math.cos(angle) * radius;
      let z = Math.sin(angle) * radius;

      for (let attempt = 0; attempt < 12; attempt += 1) {
        const a = angle + (attempt % 2 ? 1 : -1) * Math.ceil(attempt / 2) * 0.22;
        const r = radius + (attempt % 3) * 0.55;
        x = Math.cos(a) * r;
        z = Math.sin(a) * r;
        const clearOfProps = this.obstacles.every((obstacle) => Math.hypot(x - obstacle.x, z - obstacle.z) > obstacle.radius + 2.1);
        const clearOfGroups = anchors.every((anchor) => Math.hypot(x - anchor.x, z - anchor.z) > 3.1);
        if (clearOfProps && clearOfGroups && Math.hypot(x, z) > 5.2) break;
      }

      anchors.push({ x, z });

      const labelTexture = makeWordLabelTexture(words[i].toUpperCase(), weapon.element.hex);
      const label = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: labelTexture, transparent: true, depthWrite: false, depthTest: false }),
      );
      label.position.set(x, 3, z);
      label.scale.set(3, 0.94, 1);
      label.renderOrder = 6;
      group.add(label);
      labels.push({ sprite: label, phase: rand(0, TAU), x, z });

      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.set(x, 2.5, z);
      group.add(beam);

      const floorRing = new THREE.Mesh(ringGeometry, ringMaterial);
      floorRing.rotation.x = -Math.PI / 2;
      floorRing.position.set(x, 0.035, z);
      group.add(floorRing);

      for (let n = 0; n < BLOCKS_PER_WORD; n += 1) {
        const outer = n >= BLOCKS_PER_WORD / 2;
        const slot = n % (BLOCKS_PER_WORD / 2);
        const localAngle = (slot / (BLOCKS_PER_WORD / 2)) * TAU + (outer ? Math.PI / 5 : 0);
        const localRadius = outer ? 1.32 : 0.72;
        blocks.push({
          x: x + Math.cos(localAngle) * localRadius,
          z: z + Math.sin(localAngle) * localRadius,
          baseY: rand(0.48, 0.68),
          phase: rand(0, TAU),
          spin: rand(0.75, 1.75),
          scale: rand(0.82, 1.12),
          collected: false,
        });
      }
    }

    this.harvest = {
      phrase: weapon.phrase,
      weapon,
      words,
      total,
      collected: 0,
      blocks,
      labels,
      group,
      mesh,
      color,
      completed: false,
    };

    // Paint the first frame immediately so the blocks never flash at the origin.
    for (let i = 0; i < blocks.length; i += 1) {
      const block = blocks[i];
      harvestDummy.position.set(block.x, block.baseY, block.z);
      harvestDummy.rotation.set(block.phase, block.phase, 0);
      harvestDummy.scale.setScalar(block.scale);
      harvestDummy.updateMatrix();
      mesh.setMatrixAt(i, harvestDummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    this.callbacks.onHarvestStart?.(this.harvestSnapshot());
    this.audio?.ui(true);
    return this.harvest;
  }

  harvestSnapshot() {
    if (!this.harvest) return null;
    const harvest = this.harvest;
    return {
      phrase: harvest.phrase,
      words: harvest.words.slice(),
      total: harvest.total,
      collected: harvest.collected,
      remaining: harvest.total - harvest.collected,
      weapon: harvest.weapon,
      completed: harvest.completed,
    };
  }

  getHarvestState() {
    return this.harvestSnapshot();
  }

  clearHarvest(notify = false) {
    const harvest = this.harvest;
    if (!harvest) return;
    this.harvest = null;

    const snapshot = {
      phrase: harvest.phrase,
      words: harvest.words.slice(),
      total: harvest.total,
      collected: harvest.collected,
      remaining: harvest.total - harvest.collected,
      weapon: harvest.weapon,
      completed: harvest.completed,
    };

    if (harvest.group) {
      this.scene.remove(harvest.group);
      const geometries = new Set();
      const materials = new Set();
      harvest.group.traverse((child) => {
        if (child.geometry) geometries.add(child.geometry);
        if (child.material) {
          const list = Array.isArray(child.material) ? child.material : [child.material];
          for (const material of list) {
            materials.add(material);
            material.map?.dispose();
          }
        }
      });
      harvest.mesh?.dispose?.();
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
    }

    if (notify) this.callbacks.onHarvestCancel?.(snapshot);
  }

  updateHarvest(dt) {
    const harvest = this.harvest;
    if (!harvest || harvest.completed || this.mode !== 'playing') return;

    const px = this.player.x;
    const pz = this.player.z;
    let collectedAny = false;

    for (let i = 0; i < harvest.blocks.length; i += 1) {
      const block = harvest.blocks[i];
      if (block.collected) continue;

      const dx = px - block.x;
      const dz = pz - block.z;
      const distance = Math.hypot(dx, dz);

      // Nearby blocks are pulled toward the operator, so walking through a
      // cluster feels magnetic instead of pixel-perfect.
      if (distance < 3.1 && distance > 0.001) {
        const pull = Math.min(1, dt * (distance < 1.4 ? 15 : 6.5));
        block.x += dx * pull;
        block.z += dz * pull;
        block.baseY += (1.05 - block.baseY) * Math.min(1, dt * 5.5);
      }

      if (Math.hypot(px - block.x, pz - block.z) < 0.78) {
        block.collected = true;
        harvest.collected += 1;
        collectedAny = true;
        harvestDummy.position.set(block.x, block.baseY, block.z);
        harvestDummy.rotation.set(0, 0, 0);
        harvestDummy.scale.setScalar(0);
        harvestDummy.updateMatrix();
        harvest.mesh.setMatrixAt(i, harvestDummy.matrix);
        this.burstAt(
          new THREE.Vector3(block.x, block.baseY, block.z),
          harvest.color,
          4,
          { speed: 2.6, size: 0.08, life: 0.32, upward: 0.12 },
        );
        this.audio?.pickup?.(harvest.collected / harvest.total);
        this.callbacks.onHarvestProgress?.(this.harvestSnapshot());

        if (harvest.collected >= harvest.total) {
          this.finishHarvest();
          return;
        }
        continue;
      }

      const bob = block.baseY + Math.sin(this.time * 2.15 + block.phase) * 0.075;
      harvestDummy.position.set(block.x, bob, block.z);
      harvestDummy.rotation.set(
        this.time * block.spin * 0.55 + block.phase,
        this.time * block.spin + block.phase,
        0,
      );
      harvestDummy.scale.setScalar(block.scale);
      harvestDummy.updateMatrix();
      harvest.mesh.setMatrixAt(i, harvestDummy.matrix);
    }

    if (collectedAny) harvest.mesh.instanceMatrix.needsUpdate = true;

    for (const label of harvest.labels) {
      label.sprite.position.y = 3 + Math.sin(this.time * 1.45 + label.phase) * 0.09;
      const breathe = 1 + Math.sin(this.time * 1.8 + label.phase) * 0.025;
      label.sprite.scale.set(3 * breathe, 0.94 * breathe, 1);
      const distance = Math.hypot(this.player.x - label.x, this.player.z - label.z);
      label.sprite.material.opacity = clamp((distance - 4.5) / 4.5, 0, 1);
    }
  }

  finishHarvest() {
    const harvest = this.harvest;
    if (!harvest || harvest.completed) return;
    harvest.completed = true;
    harvest.collected = harvest.total;

    const snapshot = {
      phrase: harvest.phrase,
      words: harvest.words.slice(),
      total: harvest.total,
      collected: harvest.total,
      remaining: 0,
      weapon: harvest.weapon,
      completed: true,
    };

    this.clearHarvest(false);
    this.setWeapon(harvest.weapon, true);
    this.callbacks.onForge?.(harvest.weapon);
    this.callbacks.onHarvestComplete?.(snapshot);
    this.audio?.materialize();
  }

  spawnForgeRing(weapon) {
    if (this.mode !== 'playing') return;
    const color = weapon.element.color;
    for (let i = 0; i < 2; i += 1) {
      const mesh = new THREE.Mesh(
        new THREE.RingGeometry(0.45, 0.48, 40),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      mesh.position.set(this.player.x, 1.1 + i * 0.45, this.player.z);
      mesh.lookAt(this.player.x, 1.2, this.player.z - 8);
      this.scene.add(mesh);
      this.rings.push({ mesh, life: 0, maxLife: 0.55 + i * 0.16, expand: 2.6 + i * 1.3, spin: i ? -1 : 1 });
    }
    this.burstAt(
      new THREE.Vector3(this.player.x, 1.4, this.player.z - 0.6),
      color,
      18,
      { speed: 2.2, size: 0.12, life: 0.55, upward: 0.3 },
    );
  }

  getAimDirection(out, spread = 0) {
    this.camera.getWorldDirection(out);
    if (spread > 0) {
      const right = tempV2.set(1, 0, 0).applyQuaternion(this.camera.quaternion);
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
      const angle = Math.random() * TAU;
      const radius = Math.sqrt(Math.random()) * spread;
      out.addScaledVector(right, Math.cos(angle) * radius);
      out.addScaledVector(up, Math.sin(angle) * radius);
      out.normalize();
    }
    return out;
  }

  tryFire() {
    if (this.mode !== 'playing' || !this.weapon) return;
    if (this.time < this.nextShotAt) return;

    const weapon = this.weapon;
    const rate = Math.max(0.5, weapon.stats.rate);
    this.nextShotAt = this.time + 1 / rate;

    if (!this.weaponModel) return;
    this.camera.updateMatrixWorld(true);
    const muzzleWorld = this.weaponModel.muzzle.getWorldPosition(new THREE.Vector3());
    const origin = this.camera.getWorldPosition(new THREE.Vector3());
    const dir = new THREE.Vector3();
    this.getAimDirection(dir);

    const pellets = weapon.stats.pellets;
    let anyHit = false;
    let anyCrit = false;
    let lastHitPoint = null;
    let lastEnemy = null;

    for (let pellet = 0; pellet < pellets; pellet += 1) {
      const pelletDir = dir.clone();
      if (pellets > 1) {
        const right = tempV2.set(1, 0, 0).applyQuaternion(this.camera.quaternion).clone();
        const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
        const angle = Math.random() * TAU;
        const radius = Math.sqrt(Math.random()) * weapon.stats.spread;
        pelletDir.addScaledVector(right, Math.cos(angle) * radius);
        pelletDir.addScaledVector(up, Math.sin(angle) * radius);
        pelletDir.normalize();
      } else if (weapon.stats.spread > 0) {
        const right = tempV2.set(1, 0, 0).applyQuaternion(this.camera.quaternion).clone();
        const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
        const angle = Math.random() * TAU;
        const radius = Math.sqrt(Math.random()) * weapon.stats.spread;
        pelletDir.addScaledVector(right, Math.cos(angle) * radius);
        pelletDir.addScaledVector(up, Math.sin(angle) * radius);
        pelletDir.normalize();
      }

      const hit = this.castAtEnemies(origin, pelletDir, weapon.stats.range);
      let endpoint;
      let crit = false;

      if (hit) {
        crit = Math.random() < weapon.stats.crit;
        const damage = hit.enemy.type === 'brute' ? weapon.stats.damage * 1.02 : weapon.stats.damage;
        endpoint = hit.point.clone();
        this.damageEnemy(hit.enemy, damage, crit, hit.point, weapon);
        anyHit = true;
        anyCrit = anyCrit || crit;
        lastHitPoint = endpoint;
        lastEnemy = hit.enemy;

        if (weapon.stats.splash > 0) {
          this.applySplash(hit.point, weapon.stats.splash, damage * 0.56, hit.enemy);
        }
      } else {
        endpoint = origin.clone().addScaledVector(pelletDir, Math.min(weapon.stats.range, 48));
      }

      const beamColor = weapon.element.color;
      const beamWidth = weapon.archetype.id === 'cannon' ? 0.042 : weapon.archetype.id === 'rail' ? 0.021 : 0.012;
      this.spawnBeam(muzzleWorld, endpoint, beamColor, beamWidth, weapon.archetype.id === 'rail' ? 0.2 : 0.085);

      if (!hit) {
        if (endpoint.y < 0.15 && Math.abs(endpoint.x) < 28 && Math.abs(endpoint.z) < 28) {
          this.spawnImpact(endpoint.clone().setY(0.06), beamColor, 5);
        } else if (Math.random() > 0.55) {
          this.spawnImpact(endpoint, beamColor, 3);
        }
      } else {
        this.spawnImpact(hit.point, beamColor, weapon.archetype.id === 'shotgun' ? 5 : 8);
      }
    }

    this.weaponFlash = 1;
    this.recoil = Math.min(1.3, this.recoil + (weapon.archetype.id === 'cannon' ? 1 : weapon.archetype.id === 'rail' ? 0.8 : 0.34));
    this.shake = Math.min(0.9, this.shake + (weapon.archetype.id === 'cannon' ? 0.33 : 0.09));
    this.audio?.shoot(weapon);
    if (anyHit) {
      this.audio?.hit(anyCrit);
      this.callbacks.onHit?.(anyCrit, lastHitPoint, lastEnemy);
    }
  }

  castAtEnemies(origin, direction, maxRange) {
    let closest = null;
    let closestDistance = Infinity;

    for (const enemy of this.enemies) {
      if (!enemy.alive) continue;
      const center = enemy.group.position;
      tempSphere.center.copy(center);
      tempSphere.radius = enemy.hitRadius;

      const hit = this.raySphere(origin, direction, tempSphere, maxRange);
      if (hit && hit.distance < closestDistance) {
        closestDistance = hit.distance;
        closest = { enemy, point: hit.point };
      }
    }

    // Subtle mobile-friendly magnetism: only when the crosshair is very close.
    if (!closest && this.aimAssist) {
      const cameraDir = new THREE.Vector3();
      this.camera.getWorldDirection(cameraDir);
      let bestDot = 0.985;
      let bestEnemy = null;
      for (const enemy of this.enemies) {
        if (!enemy.alive) continue;
        tempV.copy(enemy.group.position).sub(origin);
        const distance = tempV.length();
        if (distance > maxRange) continue;
        tempV.normalize();
        const dot = tempV.dot(cameraDir);
        if (dot > bestDot) {
          bestDot = dot;
          bestEnemy = enemy;
        }
      }
      if (bestEnemy) {
        const sphere = new THREE.Sphere(bestEnemy.group.position, bestEnemy.hitRadius * 1.5);
        const hit = this.raySphere(origin, direction, sphere, maxRange);
        if (hit) closest = { enemy: bestEnemy, point: hit.point };
      }
    }

    return closest;
  }

  raySphere(origin, direction, sphere, maxDistance) {
    const oc = tempV2.copy(origin).sub(sphere.center);
    const b = oc.dot(direction);
    const c = oc.dot(oc) - sphere.radius * sphere.radius;
    const discriminant = b * b - c;
    if (discriminant < 0) return null;
    const sqrt = Math.sqrt(discriminant);
    let t = -b - sqrt;
    if (t < 0) t = -b + sqrt;
    if (t < 0.2 || t > maxDistance) return null;
    return { distance: t, point: origin.clone().addScaledVector(direction, t) };
  }

  applySplash(position, radius, damage, primary) {
    for (const enemy of this.enemies) {
      if (!enemy.alive || enemy === primary) continue;
      const distance = enemy.group.position.distanceTo(position);
      if (distance > radius) continue;
      const falloff = 1 - distance / radius;
      this.damageEnemy(enemy, damage * (0.45 + falloff * 0.55), false, enemy.group.position.clone(), this.weapon);
    }
    const color = this.weapon?.element?.color ?? 0xff6138;
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.1, 0.28, 32),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    ring.position.copy(position);
    ring.lookAt(this.camera.position);
    this.scene.add(ring);
    this.rings.push({ mesh: ring, life: 0, maxLife: 0.38, expand: radius * 2.2, spin: 1 });
    this.burstAt(position, color, 22, { speed: 4.2, size: 0.13, life: 0.55, upward: 0.2 });
  }

  damageEnemy(enemy, damage, crit, point, weapon) {
    if (!enemy.alive) return;
    const finalDamage = Math.max(1, Math.round(damage * 10) / 10);
    enemy.hp -= finalDamage;
    enemy.hitFlash = 1;
    enemy.hitOffset = Math.min(0.22, enemy.hitOffset + finalDamage * 0.004);
    enemy.healthFill.scale.x = Math.max(0, enemy.hp / enemy.maxHp);
    enemy.healthFill.position.x = -0.43 + (0.86 * Math.max(0, enemy.hp / enemy.maxHp)) / 2;
    enemy.healthFill.material.color.setHex(enemy.hp / enemy.maxHp < 0.35 ? 0xff4b58 : enemy.color);
    this.callbacks.onDamageNumber?.({
      position: point,
      amount: finalDamage,
      crit,
      color: weapon?.element?.hex || '#d7ff45',
    });
    if (enemy.hp <= 0) {
      this.killEnemy(enemy, crit);
    }
  }

  killEnemy(enemy, crit) {
    if (!enemy.alive) return;
    enemy.alive = false;
    this.combo = Math.min(9, this.combo + 1);
    this.comboTimer = 3.2;
    const base = enemy.type === 'brute' ? 170 : enemy.type === 'weaver' ? 110 : 90;
    const gained = Math.round(base * this.combo * (crit ? 1.25 : 1));
    this.score += gained;
    this.kills += 1;
    this.callbacks.onScore?.(this.score, this.combo, gained);
    this.callbacks.onKill?.({
      type: enemy.typeLabel,
      score: gained,
      crit,
      combo: this.combo,
    });

    const color = enemy.color;
    this.burstAt(enemy.group.position.clone(), color, 34, { speed: 5.2, size: 0.17, life: 0.85, upward: 0.5 });
    this.burstAt(enemy.group.position.clone(), 0xffffff, 12, { speed: 6.8, size: 0.08, life: 0.45, upward: 0.2 });

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.2, 0.32, 32),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    ring.position.copy(enemy.group.position);
    ring.lookAt(this.camera.position);
    this.scene.add(ring);
    this.rings.push({ mesh: ring, life: 0, maxLife: 0.5, expand: 4.4, spin: 1 });

    this.audio?.kill();
    this.removeEnemy(enemy, true);
    this.emitEnemyCount();
  }

  removeEnemy(enemy, explode) {
    if (!enemy) return;
    enemy.alive = false;
    if (enemy.group.parent) this.scene.remove(enemy.group);
    enemy.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    });
    const index = this.enemies.indexOf(enemy);
    if (index >= 0) this.enemies.splice(index, 1);
  }

  /* ============================================================
     FX
     ============================================================ */

  spawnBeam(start, end, color, width, life) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    if (length < 0.1) return;
    const geometry = new THREE.CylinderGeometry(width, width * 0.45, length, 5, 1, true);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(UP, direction.clone().normalize());
    this.scene.add(mesh);
    this.beams.push({ mesh, life: 0, maxLife: life });
  }

  spawnImpact(position, color, count = 5) {
    this.burstAt(position, color, count, { speed: 4.4, size: 0.09, life: 0.36, upward: 0.15 });
  }

  burstAt(position, color, count, opts = {}) {
    const {
      speed = 4,
      size = 0.12,
      life = 0.6,
      upward = 0.2,
      gravity = 3,
    } = opts;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      const theta = Math.random() * TAU;
      const phi = Math.acos(rand(-1, 1));
      const scalar = Math.pow(Math.random(), 0.35) * speed;
      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * scalar;
      velocities[i * 3 + 1] = Math.cos(phi) * scalar + upward * speed * 0.25;
      velocities[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * scalar;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color,
      size,
      map: this.getDotTexture(),
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    points.position.copy(position);
    points.frustumCulled = false;
    this.scene.add(points);
    this.bursts.push({
      points,
      velocities,
      life: 0,
      maxLife: life,
      gravity,
      baseSize: size,
    });
  }

  getDotTexture() {
    if (!this.dotTexture) this.dotTexture = createSoftDotTexture();
    return this.dotTexture;
  }

  disposeBurst(burst) {
    if (burst.points.parent) this.scene.remove(burst.points);
    burst.points.geometry.dispose();
    burst.points.material.dispose();
  }

  disposeMesh(mesh) {
    if (!mesh) return;
    if (mesh.parent) mesh.parent.remove(mesh);
    mesh.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    });
  }

  /* ============================================================
     Spawning / enemies
     ============================================================ */

  makeWave(wave) {
    const count = Math.min(19, 3 + wave * 2);
    const queue = [];
    for (let i = 0; i < count; i += 1) {
      let type = 'drone';
      if (wave >= 2 && i % 4 === 3) type = 'brute';
      if (wave >= 3 && i % 3 === 2 && type !== 'brute') type = 'weaver';
      if (wave >= 6 && i % 7 === 5) type = 'brute';
      queue.push(type);
    }
    return queue;
  }

  startWave(wave) {
    this.wave = wave;
    this.waveState = 'active';
    this.pendingSpawns = this.makeWave(wave);
    this.spawnTimer = 0.1;
    this.callbacks.onWave?.(wave, this.pendingSpawns.length);
    this.callbacks.onWaveStart?.(wave, this.pendingSpawns.length);
    this.emitEnemyCount();
    this.audio?.wave();
  }

  spawnEnemy(type) {
    const cfg = {
      drone: {
        hp: 58 + this.wave * 7,
        speed: 2.35 + Math.min(2.0, this.wave * 0.09),
        color: 0xff536f,
        scale: 1,
        damage: 8,
        fireDelay: 2.4,
        radius: 0.78,
        label: 'SENTINELA',
        hover: 1.55,
      },
      brute: {
        hp: 150 + this.wave * 17,
        speed: 1.35 + Math.min(1.2, this.wave * 0.04),
        color: 0xffa33b,
        scale: 1.55,
        damage: 17,
        fireDelay: 3.1,
        radius: 1.18,
        label: 'BRUTO',
        hover: 1.95,
      },
      weaver: {
        hp: 35 + this.wave * 4,
        speed: 4.1 + Math.min(1.8, this.wave * 0.08),
        color: 0xff7bdf,
        scale: 0.76,
        damage: 6,
        fireDelay: 1.9,
        radius: 0.58,
        label: 'TECELÃ',
        hover: 1.45,
      },
    }[type] || {};

    let x;
    let z;
    let attempts = 0;
    do {
      // Spawn in the player's forward hemisphere so every wave is immediately readable.
      const spread = rand(-1.18, 1.18);
      const angle = this.player.yaw + spread;
      const radius = rand(14.5, 22);
      x = this.player.x - Math.sin(angle) * radius;
      z = this.player.z - Math.cos(angle) * radius;
      const radial = Math.hypot(x, z);
      if (radial > 24.6) {
        x *= 24.6 / radial;
        z *= 24.6 / radial;
      }
      attempts += 1;
    } while (
      (Math.hypot(x - this.player.x, z - this.player.z) < 10 || Math.hypot(x, z) > 24.8)
      && attempts < 18
    );

    const group = new THREE.Group();
    group.position.set(x, cfg.hover, z);
    group.scale.setScalar(0.01);
    this.scene.add(group);

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1b1016,
      emissive: cfg.color,
      emissiveIntensity: 1.25,
      metalness: 0.72,
      roughness: 0.3,
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 0), coreMat);
    group.add(core);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.62, 1),
      new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    group.add(shell);

    const aura = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.getDotTexture(),
        color: cfg.color,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    aura.scale.set(1.34, 1.34, 1);
    group.add(aura);

    const ringMat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.018, 5, 36), ringMat);
    ring1.rotation.x = Math.PI / 2.2;
    group.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.012, 5, 30), ringMat);
    ring2.rotation.set(0.6, 0.2, 0.8);
    group.add(ring2);

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.095, 8, 6), eyeMat);
    eye.position.set(0, 0.02, 0.48);
    group.add(eye);

    // Charge indicator appears before an attack.
    const chargeRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.05, 0.02, 4, 36),
      new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    chargeRing.rotation.x = Math.PI / 2;
    chargeRing.visible = false;
    group.add(chargeRing);

    // Health bar (billboarded every frame).
    const bar = new THREE.Group();
    bar.position.y = 1.05;
    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(0.92, 0.062),
      new THREE.MeshBasicMaterial({
        color: 0x05080e,
        transparent: true,
        opacity: 0.7,
        depthTest: false,
        depthWrite: false,
      }),
    );
    const fill = new THREE.Mesh(
      new THREE.PlaneGeometry(0.86, 0.038),
      new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.95,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    fill.position.z = 0.001;
    bar.add(bg);
    bar.add(fill);
    group.add(bar);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(cfg.radius * 0.65, 18),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -cfg.hover + 0.025;
    group.add(shadow);

    const enemy = {
      group,
      core,
      coreMat,
      shell,
      ring1,
      ring2,
      eye,
      chargeRing,
      healthBar: bar,
      healthFill: fill,
      color: cfg.color,
      type,
      typeLabel: cfg.label,
      maxHp: cfg.hp,
      hp: cfg.hp,
      speed: cfg.speed,
      damage: cfg.damage,
      fireDelay: cfg.fireDelay,
      fireTimer: rand(1.2, 2.6),
      attackTimer: rand(2.2, 3.8),
      charge: 0,
      charging: false,
      hitRadius: cfg.radius,
      scaleBase: cfg.scale,
      hoverBase: cfg.hover,
      age: 0,
      phase: rand(0, TAU),
      alive: true,
      hitFlash: 0,
      hitOffset: 0,
      preferred: rand(9.5, 13.5),
      strafeDir: Math.random() > 0.5 ? 1 : -1,
      barrelSpin: 0,
    };

    group.scale.setScalar(0.01 * cfg.scale);
    bar.position.y = 1.05;
    this.enemies.push(enemy);
    this.spawnEffect(x, z, cfg.color);
    this.emitEnemyCount();
    return enemy;
  }

  spawnEffect(x, z, color) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.25, 0.38, 40),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, 0.04, z);
    this.scene.add(ring);
    this.rings.push({ mesh: ring, life: 0, maxLife: 0.7, expand: 3.4, spin: 1 });

    // Vertical spawn column.
    const column = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.62, 3.9, 16, 1, true),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.13,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    column.position.set(x, 1.95, z);
    this.scene.add(column);
    this.effects.push(column);
    column.userData.life = 0;
    column.userData.maxLife = 0.48;
  }

  updateEnemy(enemy, dt) {
    if (!enemy.alive) return;
    enemy.age += dt;

    const spawnProgress = Math.min(1, enemy.age / 0.55);
    const eased = 1 - Math.pow(1 - spawnProgress, 3);
    enemy.group.scale.setScalar(eased * enemy.scaleBase);

    const dx = this.player.x - enemy.group.position.x;
    const dz = this.player.z - enemy.group.position.z;
    const distance = Math.hypot(dx, dz);
    const dirX = distance > 0.001 ? dx / distance : 0;
    const dirZ = distance > 0.001 ? dz / distance : 0;

    if (spawnProgress >= 1) {
      if (distance > enemy.preferred + 1.4) {
        enemy.group.position.x += dirX * enemy.speed * dt;
        enemy.group.position.z += dirZ * enemy.speed * dt;
      } else if (distance < enemy.preferred - 2.5) {
        enemy.group.position.x -= dirX * enemy.speed * 0.68 * dt;
        enemy.group.position.z -= dirZ * enemy.speed * 0.68 * dt;
      }
      const strafe = Math.sin(enemy.age * 0.85 + enemy.phase) * enemy.speed * 0.48 * enemy.strafeDir;
      enemy.group.position.x += -dirZ * strafe * dt;
      enemy.group.position.z += dirX * strafe * dt;

      const radial = Math.hypot(enemy.group.position.x, enemy.group.position.z);
      if (radial > 25.6) {
        enemy.group.position.x *= 25.6 / radial;
        enemy.group.position.z *= 25.6 / radial;
      }
    }

    const hover = enemy.hoverBase + Math.sin(enemy.age * 1.55 + enemy.phase) * 0.16;
    enemy.group.position.y = hover + enemy.hitOffset;
    enemy.hitOffset *= Math.pow(0.001, dt);

    enemy.group.rotation.y += dt * 0.35;
    enemy.ring1.rotation.z += dt * 1.8;
    enemy.ring2.rotation.y += dt * 1.1;
    enemy.shell.rotation.y -= dt * 0.7;
    enemy.shell.rotation.x += dt * 0.3;

    // Billboard health bar.
    enemy.group.getWorldQuaternion(tempQ);
    enemy.healthBar.quaternion.copy(tempQ).invert().multiply(this.camera.quaternion);
    enemy.healthBar.visible = enemy.age > 0.45;

    const flash = enemy.hitFlash;
    enemy.coreMat.emissiveIntensity = 1.15 + flash * 4.5 + (enemy.charging ? 2.2 : 0);
    enemy.hitFlash = Math.max(0, enemy.hitFlash - dt * 6);
    enemy.chargeRing.visible = enemy.charging;
    if (enemy.charging) {
      const pulse = 1 + Math.sin(this.time * 24) * 0.08;
      enemy.chargeRing.scale.setScalar(pulse);
      enemy.chargeRing.material.opacity = 0.45 + enemy.charge * 0.7;
    }

    if (spawnProgress < 1 || this.player.health <= 0) return;
    enemy.attackTimer -= dt;
    if (enemy.attackTimer <= 0 && distance < 24) {
      enemy.charging = true;
      enemy.charge += dt;
      if (enemy.charge >= 0.68) {
        this.enemyShoot(enemy, dirX, dirZ);
        enemy.charging = false;
        enemy.charge = 0;
        enemy.attackTimer = enemy.fireDelay + rand(-0.25, 0.5);
      }
    } else {
      enemy.charging = false;
      enemy.charge = 0;
    }
  }

  enemyShoot(enemy, dirX, dirZ) {
    const color = enemy.color;
    const radius = enemy.type === 'brute' ? 0.105 : 0.075;
    const projectile = new THREE.Group();

    // A compact hot core with a short tracer: clearly a projectile, not a second enemy.
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(radius, 0),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    core.scale.set(0.8, 0.8, 2.1);
    projectile.add(core);

    const hot = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 0.42, 6, 4),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.88, depthWrite: false }),
    );
    projectile.add(hot);

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.getDotTexture(),
        color,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    glow.scale.set(radius * 3.3, radius * 3.3, 1);
    projectile.add(glow);

    const trail = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.1, radius * 0.58, 0.66, 6, 1, true),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    trail.rotation.x = Math.PI / 2;
    trail.position.z = 0.34;
    projectile.add(trail);

    const start = enemy.group.position.clone();
    start.y += 0.15;
    projectile.position.copy(start);

    const target = new THREE.Vector3(this.player.x, this.player.height - 0.12, this.player.z);
    const direction = target.sub(start).normalize();
    direction.x += rand(-0.035, 0.035);
    direction.y += rand(-0.018, 0.018);
    direction.z += rand(-0.035, 0.035);
    direction.normalize();
    const speed = enemy.type === 'weaver' ? 17 : 13.5 + this.wave * 0.12;
    projectile.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), direction);
    this.scene.add(projectile);

    this.projectiles.push({
      mesh: projectile,
      velocity: direction.multiplyScalar(speed),
      damage: enemy.damage,
      life: 0,
      maxLife: 5,
      color,
      size: radius * 2.1,
    });
    this.audio?.tone?.({ from: 160, to: 80, duration: 0.12, gain: 0.03, type: 'sawtooth' });
  }

  updateProjectiles(dt) {
    for (let i = this.projectiles.length - 1; i >= 0; i -= 1) {
      const projectile = this.projectiles[i];
      projectile.life += dt;
      projectile.mesh.position.addScaledVector(projectile.velocity, dt);
      projectile.mesh.rotation.x += dt * 4;
      projectile.mesh.rotation.y += dt * 6;

      const playerPos = tempV.set(this.player.x, this.player.height - 0.15, this.player.z);
      const distance = projectile.mesh.position.distanceTo(playerPos);
      if (distance < 0.68) {
        this.damagePlayer(projectile.damage, projectile.mesh.position.clone());
        this.burstAt(projectile.mesh.position.clone(), projectile.color, 12, { speed: 3.6, size: 0.1, life: 0.35 });
        this.disposeMesh(projectile.mesh);
        this.projectiles.splice(i, 1);
      } else if (projectile.life > projectile.maxLife || projectile.mesh.position.y < 0.03) {
        this.disposeMesh(projectile.mesh);
        this.projectiles.splice(i, 1);
      }
    }
  }

  damagePlayer(amount, source) {
    if (this.mode !== 'playing' || this.player.invulnerable > 0) return;
    this.player.health = Math.max(0, this.player.health - amount);
    this.player.invulnerable = 0.45;
    this.shake = Math.min(1, this.shake + 0.55);
    this.callbacks.onPlayerHit?.(amount, this.player.health);
    this.audio?.playerHit();
    this.emitHealth();
    if (this.player.health <= 0) {
      this.audio?.gameOver();
      this.endRun();
    }
  }

  heal(amount) {
    const before = this.player.health;
    this.player.health = Math.min(this.player.maxHealth, this.player.health + amount);
    if (this.player.health !== before) this.emitHealth();
  }

  /* ============================================================
     Input
     ============================================================ */

  addLook(dx, dy, sensitivity = 0.0022) {
    if (this.mode !== 'playing') return;
    this.player.yaw -= dx * sensitivity;
    this.player.pitch = clamp(this.player.pitch - dy * sensitivity, -1.12, 1.08);
  }

  setTilt(yaw, pitch) {
    this.controls.tiltYaw = clamp(yaw, -0.9, 0.9);
    this.controls.tiltPitch = clamp(pitch, -0.55, 0.55);
  }

  /* ============================================================
     Update
     ============================================================ */

  emitHealth(force = false) {
    if (!force && this.player.health === this.lastHealth) return;
    this.lastHealth = this.player.health;
    this.callbacks.onHealth?.(this.player.health, this.player.maxHealth);
  }

  emitEnemyCount() {
    const count = this.enemies.length + this.pendingSpawns.length;
    if (count === this.lastEnemyCount) return;
    this.lastEnemyCount = count;
    this.callbacks.onEnemyCount?.(count, this.wave);
  }

  emitScore() {
    this.callbacks.onScore?.(this.score, this.combo, 0);
  }

  update(dt, absoluteTime) {
    this.time += dt;
    const currentTime = this.time;

    if (this.mode === 'menu') {
      this.menuTime += dt;
      this.setMenuCamera();
      this.animateMenu(dt);
      this.animateAmbient(dt);
      this.updateEffects(dt);
      return;
    }

    if (this.mode === 'paused') {
      this.animateAmbient(dt);
      return;
    }

    if (this.mode === 'over') {
      this.animateAmbient(dt);
      this.updateEffects(dt);
      this.applyCamera(dt, true);
      this.animateWeapon(dt);
      return;
    }

    this.player.invulnerable = Math.max(0, this.player.invulnerable - dt);
    this.updatePlayer(dt);
    this.updateHarvest(dt);
    this.updateWave(dt);
    this.updateEnemies(dt);
    this.updateProjectiles(dt);
    this.updateEffects(dt);
    this.animateAmbient(dt);
    this.animateWeapon(dt);
    this.applyCamera(dt);

    if (this.controls.fire) this.tryFire();

    if (this.combo > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        this.callbacks.onCombo?.(0);
      }
    }

    this.audio?.setIntensity(this.enemies.length / 8);
  }

  updatePlayer(dt) {
    const f = this.controls.forward;
    const s = this.controls.strafe;
    const magnitude = Math.min(1, Math.hypot(f, s));
    if (magnitude > 0.01) {
      const forwardX = -Math.sin(this.player.yaw);
      const forwardZ = -Math.cos(this.player.yaw);
      const rightX = Math.cos(this.player.yaw);
      const rightZ = -Math.sin(this.player.yaw);
      const speed = this.player.speed * (magnitude > 0.85 ? 1 : 0.7 + magnitude * 0.3);
      this.player.x += (forwardX * f + rightX * s) * speed * dt;
      this.player.z += (forwardZ * f + rightZ * s) * speed * dt;
      this.bobTime += dt * (9 + magnitude * 3);
    } else {
      this.bobTime += dt * 1.8;
    }

    this.constrainPlayer();
  }

  constrainPlayer() {
    const radius = Math.hypot(this.player.x, this.player.z);
    if (radius > 25.1) {
      this.player.x *= 25.1 / radius;
      this.player.z *= 25.1 / radius;
    }
    if (radius < 2.65) {
      const stretch = radius > 0.001 ? 2.65 / radius : 1;
      this.player.x *= stretch;
      this.player.z *= stretch;
    }
    for (const obstacle of this.obstacles) {
      const dx = this.player.x - obstacle.x;
      const dz = this.player.z - obstacle.z;
      const distance = Math.hypot(dx, dz);
      const minDistance = obstacle.radius + 0.55;
      if (distance < minDistance && distance > 0.001) {
        this.player.x = obstacle.x + (dx / distance) * minDistance;
        this.player.z = obstacle.z + (dz / distance) * minDistance;
      }
    }
  }

  updateWave(dt) {
    if (this.waveState === 'idle') {
      this.waveTimer -= dt;
      if (this.waveTimer <= 0) this.startWave(1);
      return;
    }

    if (this.waveState === 'intermission') {
      this.waveTimer -= dt;
      if (this.waveTimer <= 0) this.startWave(this.wave + 1);
      return;
    }

    if (this.waveState === 'active') {
      if (this.pendingSpawns.length > 0) {
        this.spawnTimer -= dt;
        if (this.spawnTimer <= 0 && this.enemies.length < 8) {
          const type = this.pendingSpawns.shift();
          this.spawnEnemy(type);
          this.spawnTimer = rand(0.33, 0.7);
        }
      } else if (this.enemies.length === 0) {
        this.waveState = 'intermission';
        this.waveTimer = 3.4;
        this.heal(10);
        this.combo = 0;
        this.callbacks.onCombo?.(0);
        this.callbacks.onWaveClear?.(this.wave);
        this.audio?.wave();
      }
    }
  }

  updateEnemies(dt) {
    for (let i = this.enemies.length - 1; i >= 0; i -= 1) {
      this.updateEnemy(this.enemies[i], dt);
    }
  }

  updateEffects(dt) {
    for (let i = this.beams.length - 1; i >= 0; i -= 1) {
      const beam = this.beams[i];
      beam.life += dt;
      const t = beam.life / beam.maxLife;
      beam.mesh.material.opacity = Math.max(0, 0.92 * (1 - t));
      beam.mesh.scale.x = 1 + t * 0.6;
      beam.mesh.scale.z = 1 + t * 0.6;
      if (beam.life >= beam.maxLife) {
        this.disposeMesh(beam.mesh);
        this.beams.splice(i, 1);
      }
    }

    for (let i = this.rings.length - 1; i >= 0; i -= 1) {
      const ring = this.rings[i];
      ring.life += dt;
      const t = ring.life / ring.maxLife;
      const scale = 1 + t * ring.expand;
      ring.mesh.scale.setScalar(scale);
      ring.mesh.material.opacity = Math.max(0, 0.8 * (1 - t));
      ring.mesh.rotation.z += dt * ring.spin;
      if (ring.life >= ring.maxLife) {
        this.disposeMesh(ring.mesh);
        this.rings.splice(i, 1);
      }
    }

    for (let i = this.bursts.length - 1; i >= 0; i -= 1) {
      const burst = this.bursts[i];
      burst.life += dt;
      const t = burst.life / burst.maxLife;
      const positions = burst.points.geometry.attributes.position.array;
      const velocities = burst.velocities;
      for (let p = 0; p < positions.length / 3; p += 1) {
        velocities[p * 3 + 1] -= burst.gravity * dt;
        positions[p * 3] += velocities[p * 3] * dt;
        positions[p * 3 + 1] += velocities[p * 3 + 1] * dt;
        positions[p * 3 + 2] += velocities[p * 3 + 2] * dt;
      }
      burst.points.geometry.attributes.position.needsUpdate = true;
      burst.points.material.opacity = Math.max(0, 1 - t);
      burst.points.material.size = burst.baseSize * (1 + t * 0.5);
      if (burst.life >= burst.maxLife) {
        this.disposeBurst(burst);
        this.bursts.splice(i, 1);
      }
    }

    for (let i = this.effects.length - 1; i >= 0; i -= 1) {
      const effect = this.effects[i];
      effect.userData.life += dt;
      const t = effect.userData.life / effect.userData.maxLife;
      effect.material.opacity = Math.max(0, 0.13 * (1 - t));
      effect.scale.x = 1 + t * 0.8;
      effect.scale.z = 1 + t * 0.8;
      if (effect.userData.life >= effect.userData.maxLife) {
        this.scene.remove(effect);
        effect.geometry.dispose();
        effect.material.dispose();
        this.effects.splice(i, 1);
      }
    }
  }

  animateAmbient(dt) {
    if (this.dust) {
      const positions = this.dust.geometry.attributes.position.array;
      const speeds = this.dust.userData.speeds;
      for (let i = 0; i < speeds.length; i += 1) {
        positions[i * 3 + 1] += speeds[i] * dt;
        if (positions[i * 3 + 1] > 9.2) positions[i * 3 + 1] = 0.05;
      }
      this.dust.geometry.attributes.position.needsUpdate = true;
      this.dust.rotation.y += dt * 0.007;
    }
    if (this.stars) this.stars.rotation.y += dt * 0.002;
    if (this.obeliskCrystal) {
      this.obeliskCrystal.rotation.y += dt * 0.65;
      this.obeliskCrystal.position.y = 5 + Math.sin(this.time * 1.5) * 0.08;
    }
    if (this.obeliskRings) {
      this.obeliskRings[0].rotation.z += dt * 0.18;
      this.obeliskRings[1].rotation.z -= dt * 0.26;
    }
    if (this.shards) {
      for (const shard of this.shards) {
        shard.rotation.x += shard.userData.spin * dt;
        shard.rotation.y += shard.userData.spin * dt * 0.8;
        shard.position.y = shard.userData.baseY + Math.sin(this.time * shard.userData.speed + shard.userData.phase) * 0.35;
      }
    }
    if (this.centerLight) {
      this.centerLight.intensity = 14 + Math.sin(this.time * 2.1) * 2.2;
    }
  }

  animateMenu(dt) {
    if (!this.menuRig.visible) return;
    this.menuRig.position.y = -0.62 + Math.sin(this.menuTime * 1.25) * 0.06;
    this.menuRig.rotation.y = -0.24 + Math.sin(this.menuTime * 0.55) * 0.08;
    if (this.menuWeaponModel) {
      this.menuWeaponModel.group.rotation.z = Math.sin(this.menuTime * 0.5) * 0.02;
      this.menuWeaponModel.group.rotation.y = -1.12 + Math.sin(this.menuTime * 0.34) * 0.055;
      if (this.menuWeaponModel.muzzleGlow) {
        this.menuWeaponModel.muzzleGlow.material.opacity = 0.25 + Math.sin(this.menuTime * 2.2) * 0.08;
      }
    }
    this.menuRings[0].rotation.z += dt * 0.12;
    this.menuRings[1].rotation.x += dt * 0.09;
  }

  animateWeapon(dt) {
    if (!this.weaponModel) return;
    const model = this.weaponModel;
    this.recoil = Math.max(0, this.recoil - dt * 7.2);
    this.weaponFlash = Math.max(0, this.weaponFlash - dt * 15);
    this.forgePulse = Math.max(0, (this.forgePulse || 0) - dt * 1.8);

    const moving = Math.hypot(this.controls.forward, this.controls.strafe);
    const bobX = Math.sin(this.bobTime * 0.5) * 0.006 * (0.4 + moving);
    const bobY = Math.abs(Math.cos(this.bobTime * 0.5)) * 0.007 * (0.3 + moving);
    const recoilZ = this.recoil * 0.09;
    const recoilRot = this.recoil * 0.065;
    // Portrait screens are narrow: pull the view model inward so the weapon is not clipped.
    const portrait = this.camera.aspect < 0.82;
    const weaponX = portrait ? 0.32 : 0.43;
    this.viewRig.position.set(
      weaponX + bobX,
      (portrait ? -0.33 : -0.35) + bobY - this.recoil * 0.006,
      (portrait ? -1.28 : -1.32) + recoilZ,
    );
    this.viewRig.rotation.set(0.035 - recoilRot, -0.17 + this.recoil * 0.014, -0.02 + bobX * 0.7);
    this.viewRig.visible = this.mode !== 'menu';

    for (const part of model.animated) {
      part.object.rotation.y += dt * part.spin;
    }
    for (const spinner of model.spinners) {
      spinner.rotation.z += dt * (5 + this.recoil * 18);
    }

    if (model.muzzleGlow) {
      const flash = this.weaponFlash;
      const base = 0.24 + Math.sin(this.time * 3) * 0.05;
      model.muzzleGlow.material.opacity = base + flash * 0.65;
      const scale = 0.5 + flash * 0.6 + this.forgePulse * 0.5;
      model.muzzleGlow.scale.set(scale, scale, 1);
      model.muzzleLight.intensity = 0.38 + flash * 3.6;
    }
  }

  applyCamera(dt, freeze = false) {
    this.shake = Math.max(0, this.shake - dt * 2.4);
    this.shakeSeed += dt * 40;
    const shakeStrength = this.shake * (this.mode === 'over' ? 0.5 : 0.09);
    const shakeX = Math.sin(this.shakeSeed * 1.7) * shakeStrength;
    const shakeY = Math.cos(this.shakeSeed * 2.1) * shakeStrength * 0.8;
    const shakeRoll = Math.sin(this.shakeSeed * 1.3) * shakeStrength * 0.16;
    const bob = Math.sin(this.bobTime) * 0.022 * (Math.hypot(this.controls.forward, this.controls.strafe) > 0.1 ? 1 : 0.2);
    const overLift = this.mode === 'over' ? Math.min(0.9, (this.time - (this.overAt ?? this.time)) * 0.32) : 0;

    const yaw = this.player.yaw + this.controls.tiltYaw;
    const pitch = this.player.pitch + this.controls.tiltPitch;
    this.camera.position.set(
      this.player.x + shakeX,
      this.player.height + bob + shakeY - overLift,
      this.player.z,
    );
    this.camera.rotation.set(pitch + this.recoil * 0.006, yaw, shakeRoll, 'YXZ');
  }

  /* ============================================================
     Render
     ============================================================ */

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, matchMedia('(pointer: coarse)').matches ? 1.55 : 1.85);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(width, height, false);
    this.composer.setPixelRatio(this.pixelRatio);
    this.composer.setSize(width, height);
    if (this.bloom) this.bloom.setSize(width, height);
    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  render() {
    if (this.reducedQuality) this.renderer.render(this.scene, this.camera);
    else this.composer.render();
  }
}
