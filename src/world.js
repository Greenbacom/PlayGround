import * as THREE from '../vendor/three.module.js';
import {
  concreteTexture, azulejoTexture, muralTexture, graffitiTexture, crateTexture,
  barrelTexture, clothTexture, woodTexture, neonTexture, capoeiraDecal,
  stencilText, posterTexture, cityFacadeTexture, glowSprite, maskPaintTexture,
  favelaFacadeTexture,
} from './textures.js';

const TAU = Math.PI * 2;
const rand = (() => {
  let s = 90210;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
})();

function box(w, h, d, mat, x, y, z, { cast = true, receive = true, rot = null } = {}) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  if (rot) m.rotation.set(rot[0] || 0, rot[1] || 0, rot[2] || 0);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

function cyl(rTop, rBot, h, mat, x, y, z, seg = 16, { cast = true, receive = true } = {}) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

function leafGeometry(len = 2.4, width = 0.55, segs = 7) {
  const pos = [];
  const idx = [];
  const uv = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const w = width * Math.sin(Math.PI * Math.pow(t, 0.65)) * (1 - t * 0.55);
    const y = len * t;
    const z = -Math.pow(t, 2.2) * len * 0.55;
    pos.push(-w, y, z, w, y, z);
    uv.push(0, t, 1, t);
    if (i < segs) {
      const a = i * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* Merge a list of already-transformed geometries into one buffer. This keeps
 * the visual density of the favela while collapsing hundreds of draw calls. */
function mergeBufferGeometries(geoms) {
  let vertexCount = 0;
  let indexCount = 0;
  for (const g of geoms) {
    const p = g.attributes.position;
    if (!p) continue;
    vertexCount += p.count;
    indexCount += g.index ? g.index.count : p.count;
  }
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices = new Uint32Array(indexCount);
  let vo = 0;
  let io = 0;
  for (const g of geoms) {
    const p = g.attributes.position;
    if (!p) continue;
    const n = g.attributes.normal;
    const u = g.attributes.uv;
    for (let i = 0; i < p.count; i++) {
      positions[vo * 3] = p.getX(i);
      positions[vo * 3 + 1] = p.getY(i);
      positions[vo * 3 + 2] = p.getZ(i);
      if (n) {
        normals[vo * 3] = n.getX(i);
        normals[vo * 3 + 1] = n.getY(i);
        normals[vo * 3 + 2] = n.getZ(i);
      } else {
        normals[vo * 3 + 1] = 1;
      }
      if (u) {
        uvs[vo * 2] = u.getX(i);
        uvs[vo * 2 + 1] = u.getY(i);
      }
      vo++;
    }
    if (g.index) {
      for (let i = 0; i < g.index.count; i++) indices[io++] = g.index.getX(i) + (vo - p.count);
    } else {
      for (let i = 0; i < p.count; i++) indices[io++] = i + (vo - p.count);
    }
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  out.setIndex(new THREE.BufferAttribute(indices, 1));
  out.computeBoundingSphere();
  return out;
}

function palmTree(x, z, height = 6, scale = 1, materials) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  const segs = 7;
  const trunkGeos = [];
  for (let i = 0; i < segs; i++) {
    const t = i / segs;
    const h = height / segs;
    const r = 0.28 * scale * (1 - t * 0.55);
    const seg = cyl(r * 0.85, r, h * 1.05, materials.bark, Math.sin(t * 2.4) * 0.45 * scale, h * (i + 0.5), 0, 9);
    seg.rotation.z = Math.sin(t * 2.4) * 0.09;
    seg.updateMatrix();
    trunkGeos.push(seg.geometry.clone().applyMatrix4(seg.matrix));
  }
  const trunk = new THREE.Mesh(mergeBufferGeometries(trunkGeos), materials.bark);
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  g.add(trunk);

  const crown = new THREE.Group();
  crown.position.set(Math.sin(2.4) * 0.45 * scale, height, 0);
  const leafMat = materials.palmLeaf;
  const leafGeos = [];
  for (let i = 0; i < 8; i++) {
    const leaf = new THREE.Mesh(leafGeometry(2.6 * scale, 0.46 * scale, 6), leafMat);
    leaf.rotation.y = (i / 8) * TAU + rand() * 0.2;
    leaf.rotation.x = -0.28 - rand() * 0.18;
    leaf.rotation.z = 0.18;
    leaf.updateMatrix();
    leafGeos.push(leaf.geometry.clone().applyMatrix4(leaf.matrix));
  }
  const leaves = new THREE.Mesh(mergeBufferGeometries(leafGeos), leafMat);
  leaves.castShadow = true;
  crown.add(leaves);

  const coconutGeos = [];
  for (let i = 0; i < 4; i++) {
    const coconut = new THREE.Mesh(new THREE.SphereGeometry(0.16 * scale, 8, 6), materials.coconut);
    coconut.position.set(Math.cos(i * 1.7) * 0.25, -0.18, Math.sin(i * 1.7) * 0.25);
    coconut.updateMatrix();
    coconutGeos.push(coconut.geometry.clone().applyMatrix4(coconut.matrix));
  }
  const coconuts = new THREE.Mesh(mergeBufferGeometries(coconutGeos), materials.coconut);
  crown.add(coconuts);
  g.add(crown);
  g.userData.crown = crown;
  g.userData.dynamic = true;
  return g;
}

function monstera(x, z, potMat, leafMat, scale = 1) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  const pot = cyl(0.42 * scale, 0.32 * scale, 0.55 * scale, potMat, 0, 0.28 * scale, 0, 12);
  g.add(pot);
  const soil = cyl(0.37 * scale, 0.37 * scale, 0.05, new THREE.MeshStandardMaterial({ color: 0x2b1c14, roughness: 1 }), 0, 0.55 * scale, 0, 10);
  g.add(soil);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU + rand() * 0.4;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02 * scale, 0.03 * scale, 0.8 * scale, 5), leafMat);
    stem.position.set(Math.cos(a) * 0.12 * scale, 0.85 * scale, Math.sin(a) * 0.12 * scale);
    stem.rotation.z = Math.cos(a) * 0.28;
    stem.rotation.x = Math.sin(a) * 0.28;
    g.add(stem);
    const leaf = new THREE.Mesh(leafGeometry(0.75 * scale, 0.38 * scale, 5), leafMat);
    leaf.position.set(Math.cos(a) * 0.28 * scale, 1.15 * scale, Math.sin(a) * 0.28 * scale);
    leaf.rotation.y = -a + Math.PI / 2;
    leaf.rotation.x = -0.9 + rand() * 0.3;
    leaf.castShadow = true;
    g.add(leaf);
  }
  return g;
}

function capybara() {
  const g = new THREE.Group();
  const fur = new THREE.MeshStandardMaterial({ color: 0x7d5432, roughness: 0.92 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x4a2f1b, roughness: 0.95 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.62, 6, 12), fur);
  body.rotation.z = Math.PI / 2;
  body.position.y = 0.42;
  body.castShadow = true;
  g.add(body);
  const head = new THREE.Mesh(new THREE.CapsuleGeometry(0.25, 0.18, 5, 10), fur);
  head.position.set(0.58, 0.55, 0);
  head.rotation.z = 0.22;
  head.castShadow = true;
  g.add(head);
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.28), fur);
  snout.position.set(0.8, 0.48, 0);
  snout.castShadow = true;
  g.add(snout);
  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.2), dark);
  nose.position.set(0.93, 0.5, 0);
  g.add(nose);
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), dark);
    ear.position.set(0.48, 0.76, s * 0.15);
    g.add(ear);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 5), new THREE.MeshBasicMaterial({ color: 0x111111 }));
    eye.position.set(0.78, 0.63, s * 0.18);
    g.add(eye);
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.18, 4, 6), dark);
    leg.position.set(0.28 + (s > 0 ? 0.06 : 0), 0.14, s * 0.24);
    g.add(leg);
    const leg2 = leg.clone();
    leg2.position.x = -0.3;
    g.add(leg2);
  }
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.06, 5, 4), dark);
  tail.position.set(-0.58, 0.55, 0);
  g.add(tail);
  g.userData = { scared: false, vel: new THREE.Vector3(), t: 0 };
  return g;
}

function toucan() {
  const g = new THREE.Group();
  const black = new THREE.MeshStandardMaterial({ color: 0x15131c, roughness: 0.7 });
  const white = new THREE.MeshStandardMaterial({ color: 0xfff1cf, roughness: 0.8 });
  const yellow = new THREE.MeshStandardMaterial({ color: 0xffc531, roughness: 0.8 });
  const orange = new THREE.MeshStandardMaterial({ color: 0xff7a24, roughness: 0.7 });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), black);
  body.scale.set(1, 1.35, 0.9);
  g.add(body);
  const chest = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), white);
  chest.position.set(0, -0.04, 0.14);
  chest.scale.set(0.85, 1.1, 0.5);
  g.add(chest);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), black);
  head.position.set(0, 0.36, 0.05);
  g.add(head);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 8), orange);
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0.36, 0.3);
  g.add(beak);
  const beakTip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 8), yellow);
  beakTip.rotation.x = Math.PI / 2;
  beakTip.position.set(0, 0.32, 0.52);
  g.add(beakTip);
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  eye.position.set(0.1, 0.4, 0.16);
  g.add(eye);
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.5, 6), black);
  tail.rotation.x = -0.7;
  tail.position.set(0, -0.22, -0.2);
  g.add(tail);
  g.userData = { t: rand() * 10 };
  return g;
}

export function buildWorld(scene, renderer) {
  const colliders = [];
  const obstacles = [];
  const spawnPoints = { ground: [], air: [] };
  const animations = [];
  const disposables = [];
  const glows = [];

  scene.fog = new THREE.FogExp2(0x3a1d3f, 0.0048);

  /* ---------------------------------------------------------------- sky */
  const sunDir = new THREE.Vector3(-0.52, 0.22, -0.82).normalize();
  const skyUniforms = {
    uSun: { value: sunDir },
    uTime: { value: 0 },
    uTop: { value: new THREE.Color(0x111a4a) },
    uMid: { value: new THREE.Color(0x8f2868) },
    uHorizon: { value: new THREE.Color(0xff6335) },
    uHaze: { value: new THREE.Color(0xff8452) },
    uSunColor: { value: new THREE.Color(0xffd07a) },
    uCloud: { value: new THREE.Color(0xff9a86) },
  };
  const skyMat = new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: /* glsl */`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uSun, uTop, uMid, uHorizon, uHaze, uSunColor, uCloud;
      uniform float uTime;
      varying vec3 vDir;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
                   mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + 17.0; a *= 0.5; }
        return v;
      }

      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.34, h));
        col = mix(col, uTop, smoothstep(0.18, 0.85, h));
        if (h < 0.0) col = mix(uHorizon * 0.5, vec3(0.09, 0.07, 0.12), smoothstep(0.0, -0.35, h));

        float sd = max(dot(d, uSun), 0.0);
        col += uSunColor * pow(sd, 1500.0) * 7.0;
        col += uSunColor * pow(sd, 26.0) * 0.3;
        col += uSunColor * pow(sd, 5.0) * 0.075;

        vec2 uv = d.xz / (max(h, 0.015) + 0.22);
        float n = fbm(uv * 1.15 + vec2(uTime * 0.003, uTime * 0.0015));
        n += 0.45 * fbm(uv * 3.1 - vec2(uTime * 0.004, 0.0));
        float cloudMask = smoothstep(0.52, 0.78, n) * smoothstep(0.02, 0.12, h) * (1.0 - smoothstep(0.5, 0.9, h));
        vec3 cloudCol = mix(uCloud, uSunColor, 0.3 + 0.45 * pow(sd, 2.0));
        col = mix(col, cloudCol, cloudMask * 0.64);

        float haze = pow(1.0 - clamp(h, 0.0, 1.0), 8.0);
        col = mix(col, uHaze, haze * 0.18);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(420, 48, 24), skyMat);
  sky.renderOrder = -10;
  sky.userData.dynamic = true;
  scene.add(sky);
  animations.push((t) => { skyUniforms.uTime.value = t; });

  // environment reflection
  const envScene = new THREE.Scene();
  const envSky = new THREE.Mesh(new THREE.SphereGeometry(60, 32, 16), skyMat.clone());
  envScene.add(envSky);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(envScene, 0.02);
  scene.environment = envRT.texture;
  pmrem.dispose();

  // sun disc glow
  const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowSprite('rgba(255,238,190,1)', 'rgba(255,150,80,0)'),
    color: 0xffdca0, transparent: true, blending: THREE.AdditiveBlending,
    depthWrite: false, toneMapped: false, opacity: 0.9,
  }));
  sunGlow.position.copy(sunDir).multiplyScalar(360);
  sunGlow.scale.setScalar(84);
  sunGlow.material.opacity = 0.62;
  scene.add(sunGlow);

  /* ------------------------------------------------------------- lights */
  const hemi = new THREE.HemisphereLight(0x87b4e6, 0x2a1428, 0.52);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xffb06a, 3.35);
  sun.position.copy(sunDir).multiplyScalar(55);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 130;
  sun.shadow.camera.left = -39;
  sun.shadow.camera.right = 39;
  sun.shadow.camera.top = 39;
  sun.shadow.camera.bottom = -39;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.035;
  scene.add(sun);
  scene.add(sun.target);

  const rim = new THREE.DirectionalLight(0x527dff, 0.9);
  rim.position.set(30, 18, 30);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xff6a4a, 0.36);
  fill.position.set(-20, 10, 30);
  scene.add(fill);

  /* ----------------------------------------------------------- mountains */
  const mountainMat = new THREE.MeshStandardMaterial({ color: 0x3a2b4c, roughness: 1, metalness: 0, flatShading: true });
  const mountainFar = new THREE.MeshStandardMaterial({ color: 0x503a5c, roughness: 1, flatShading: true });

  function mountain(x, z, radius, height, mat = mountainMat, rot = 0) {
    const pts = [];
    const n = 10;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const r = radius * (1 - Math.pow(t, 1.4)) * (0.9 + rand() * 0.2);
      pts.push(new THREE.Vector2(Math.max(0.1, r), height * t));
    }
    pts[0].x = radius;
    const geo = new THREE.LatheGeometry(pts, 14);
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, -14, z);
    m.rotation.y = rot;
    m.receiveShadow = false;
    scene.add(m);
    return m;
  }

  mountain(-95, -165, 55, 62, mountainMat, 0.4);
  mountain(-45, -185, 42, 40, mountainFar, 1.2);
  mountain(30, -195, 60, 34, mountainFar, 0.7);
  mountain(105, -160, 38, 48, mountainMat, 2.0);
  mountain(-150, -120, 60, 30, mountainFar, 0.2);

  // Sugarloaf silhouette
  const sugarloafPts = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const r = 26 * Math.pow(1 - t, 0.7) * (0.92 + Math.sin(t * 8) * 0.03);
    sugarloafPts.push(new THREE.Vector2(Math.max(0.2, r), 52 * t));
  }
  const sugarloaf = new THREE.Mesh(new THREE.LatheGeometry(sugarloafPts, 18), mountainMat);
  sugarloaf.position.set(-115, -15, -105);
  scene.add(sugarloaf);

  // Christ the Redeemer on the far ridge
  mountain(100, -200, 34, 50, mountainMat, 0.6);
  const cristo = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({ color: 0xcfc5c9, roughness: 0.85, emissive: 0x33251f, emissiveIntensity: 0.35 });
  const pedestal = box(8, 4, 8, stone, 0, 2, 0);
  const body = box(6, 20, 5, stone, 0, 14, 0);
  const robe = box(7.6, 12, 6.2, stone, 0, 9, 0);
  const arms = box(32, 2.6, 3.4, stone, 0, 22, 0);
  const head = new THREE.Mesh(new THREE.SphereGeometry(2.2, 12, 10), stone);
  head.position.y = 26.5;
  const halo = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.25, 6, 18), new THREE.MeshBasicMaterial({ color: 0xffe0a0, toneMapped: false }));
  halo.position.y = 26.5;
  halo.rotation.x = Math.PI / 2;
  cristo.add(pedestal, robe, body, arms, head, halo);
  cristo.position.set(100, 36, -200);
  cristo.scale.setScalar(0.72);
  scene.add(cristo);
  const cristoGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowSprite('rgba(255,220,150,0.8)', 'rgba(255,150,60,0)'),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0.42,
  }));
  cristoGlow.position.set(100, 51, -198);
  cristoGlow.scale.setScalar(26);
  scene.add(cristoGlow);

  /* --------------------------------------------------------------- water */
  const waterUniforms = {
    uTime: { value: 0 },
    uSun: { value: sunDir },
    uDeep: { value: new THREE.Color(0x0b3444) },
    uShallow: { value: new THREE.Color(0x2c7a86) },
    uSunCol: { value: new THREE.Color(0xffc078) },
    uFog: { value: new THREE.Color(0x3d2a42) },
  };
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 900, 1, 1),
    new THREE.ShaderMaterial({
      uniforms: waterUniforms,
      vertexShader: /* glsl */`
        varying vec3 vWorld;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: /* glsl */`
        uniform float uTime;
        uniform vec3 uSun, uDeep, uShallow, uSunCol, uFog;
        varying vec3 vWorld;
        void main() {
          vec2 p = vWorld.xz * 0.045;
          float w1 = sin(p.x * 2.7 + uTime * 0.9) + sin(p.y * 3.3 - uTime * 0.7);
          float w2 = sin((p.x + p.y) * 1.9 + uTime * 1.3);
          float w3 = sin((p.x - p.y) * 4.2 - uTime * 1.7);
          vec3 n = normalize(vec3((w1 + w3) * 0.045, 1.0, (w2 + w3) * 0.045));
          vec3 view = normalize(cameraPosition - vWorld);
          float fres = pow(1.0 - clamp(dot(n, view), 0.0, 1.0), 2.4);
          float spec = pow(max(dot(reflect(-view, n), uSun), 0.0), 90.0);
          float glint = pow(max(dot(reflect(-view, n), uSun), 0.0), 12.0) * 0.18;
          vec3 col = mix(uDeep, uShallow, fres * 0.85 + 0.12);
          col += uSunCol * spec * 1.6;
          col += uSunCol * glint;
          float d = length(cameraPosition - vWorld);
          float fogF = 1.0 - exp(-pow(d * 0.0072, 2.0));
          col = mix(col, uFog, clamp(fogF, 0.0, 0.94));
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    })
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -15.5;
  water.userData.dynamic = true;
  scene.add(water);
  animations.push((t) => { waterUniforms.uTime.value = t; });

  /* ---------------------------------------------------------------- city */
  const facadeMats = [];
  for (let i = 0; i < 6; i++) {
    const tex = cityFacadeTexture(i);
    tex.repeat.set(1.3, 2.2);
    facadeMats.push(new THREE.MeshStandardMaterial({
      map: tex, roughness: 0.92, metalness: 0.02,
      emissiveMap: tex, emissive: 0x4a2c14, emissiveIntensity: 0.32,
    }));
  }
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x5c4a4c, roughness: 0.95 });
  const cityTankMat = new THREE.MeshStandardMaterial({ color: 0x4f6f8a, roughness: 0.8 });
  const cityAntMat = new THREE.MeshStandardMaterial({ color: 0x2a2a33, roughness: 0.7 });
  const buildingGeos = [];
  for (let i = 0; i < 150; i++) {
    const a = rand() * TAU;
    const r = 32 + Math.pow(rand(), 0.72) * 90;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const w = 4 + rand() * 10;
    const d = 4 + rand() * 10;
    const h = 5 + rand() * 26 + Math.max(0, 1 - r / 120) * 6;
    const base = -15 + rand() * 3;
    const mat = facadeMats[(rand() * facadeMats.length) | 0];
    const geo = new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, base + h / 2, z);
    m.rotation.y = (rand() - 0.5) * 0.3;
    m.castShadow = false;
    m.receiveShadow = false;
    scene.add(m);
    buildingGeos.push(geo);

    // rooftop water tank / antenna on some
    if (rand() > 0.55) {
      const tank = cyl(1.1, 1.1, 1.8, cityTankMat, x + (rand() - 0.5) * w * 0.4, base + h + 1.0, z + (rand() - 0.5) * d * 0.4, 10);
      tank.castShadow = false;
      scene.add(tank);
    }
    if (rand() > 0.7) {
      const ant = cyl(0.04, 0.05, 2 + rand() * 3, cityAntMat, x, base + h + 1.5, z, 4);
      scene.add(ant);
    }
  }

  // near favela rooftops framing the arena
  const nearRoofMat = new THREE.MeshStandardMaterial({ color: 0x4a3a3d, roughness: 0.95 });
  const nearTankMat = new THREE.MeshStandardMaterial({ color: 0x4a7d8a, roughness: 0.7, metalness: 0.2 });
  const nearMetalMat = new THREE.MeshStandardMaterial({ color: 0x2e2e35, roughness: 0.8 });
  function nearBuilding(x, z, w, h, d, ry, facadeIndex, mural = false, color = null) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = ry;
    const tex = color
      ? favelaFacadeTexture(facadeIndex, color)
      : cityFacadeTexture(facadeIndex).clone();
    tex.repeat.set(w / 4.5, h / 4.5);
    tex.needsUpdate = true;
    const mat = new THREE.MeshStandardMaterial({
      map: tex, roughness: 0.92, emissiveMap: tex, emissive: color ? 0x170a0a : 0x3a2412, emissiveIntensity: color ? 0.1 : 0.3,
    });
    const b = box(w, h, d, mat, 0, h / 2 - 3, 0);
    g.add(b);
    colliders.push(b);
    const roof = box(w + 0.5, 0.4, d + 0.5, nearRoofMat, 0, h - 3 + 0.2, 0);
    g.add(roof);
    // water tank
    const tank = cyl(1.15, 1.15, 1.9, nearTankMat, w * 0.22, h - 3 + 1.3, d * 0.12, 12);
    g.add(tank);
    for (const [lx, lz] of [[-0.7, -0.7], [0.7, -0.7], [-0.7, 0.7], [0.7, 0.7]]) {
      g.add(cyl(0.06, 0.06, 1.1, nearMetalMat, w * 0.22 + lx, h - 3 + 0.5, d * 0.12 + lz, 5));
    }
    // balcony
    if (w > 9) {
      const bal = box(w * 0.5, 0.18, 1.2, woodTextureMat, 0, h * 0.45 - 3, d / 2 + 0.55);
      g.add(bal);
      for (let i = 0; i < 7; i++) {
        g.add(box(0.06, 0.9, 0.06, nearMetalMat, -w * 0.22 + i * w * 0.073, h * 0.45 - 3 + 0.5, d / 2 + 1.1));
      }
      g.add(box(w * 0.5, 0.07, 0.07, nearMetalMat, 0, h * 0.45 - 3 + 0.95, d / 2 + 1.1));
    }
    if (mural) {
      const mp = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(w * 0.78, 18), Math.min(h * 0.44, 5.4)), new THREE.MeshStandardMaterial({ map: muralTexture(), roughness: 0.92 }));
      mp.position.set(0, h * 0.54 - 2.3, d / 2 + 0.03);
      g.add(mp);
    }
    scene.add(g);
    return g;
  }

  const woodTextureMat = new THREE.MeshStandardMaterial({ map: woodTexture([1, 1]), roughness: 0.9 });

  /* ---------------------------------------------------------- favela houses */
  const favelaPalette = ['#d95b4a', '#e8a23a', '#1f9e8f', '#3f7fc4', '#8a5cc2', '#e9803f', '#d94f7a', '#5a9e5c'];
  const favelaWallMats = favelaPalette.map((color, i) => {
    const tex = favelaFacadeTexture(90 + i * 7, color);
    tex.repeat.set(1.35, 2.1);
    tex.needsUpdate = true;
    return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.94, emissive: 0x120808, emissiveIntensity: 0.08 });
  });
  const favelaRoofMats = [
    new THREE.MeshStandardMaterial({ color: 0x633b38, roughness: 0.92 }),
    new THREE.MeshStandardMaterial({ color: 0x3b4550, roughness: 0.72, metalness: 0.25 }),
    new THREE.MeshStandardMaterial({ color: 0x8c5a3c, roughness: 0.9 }),
  ];
  const favelaDark = new THREE.MeshStandardMaterial({ color: 0x17222b, roughness: 0.28, metalness: 0.25 });
  const favelaFrame = new THREE.MeshStandardMaterial({ color: 0xeadfc9, roughness: 0.8 });
  const favelaShutters = [
    new THREE.MeshStandardMaterial({ color: 0x1f8f8a, roughness: 0.82 }),
    new THREE.MeshStandardMaterial({ color: 0xe8a23a, roughness: 0.82 }),
    new THREE.MeshStandardMaterial({ color: 0x315d99, roughness: 0.82 }),
    new THREE.MeshStandardMaterial({ color: 0xc4473d, roughness: 0.82 }),
  ];
  const favelaGreen = new THREE.MeshStandardMaterial({ color: 0x2c7a4a, roughness: 0.85, side: THREE.DoubleSide });
  const favelaGreen2 = new THREE.MeshStandardMaterial({ color: 0x59a86a, roughness: 0.85, side: THREE.DoubleSide });
  const favelaCloth = [
    new THREE.MeshStandardMaterial({ map: clothTexture('#ef5b4c', '#f6e7c8', 1), roughness: 0.92, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ map: clothTexture('#1fd1b2', '#fff3d6', 2), roughness: 0.92, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ map: clothTexture('#ffd24a', '#ff4f9a', 3), roughness: 0.92, side: THREE.DoubleSide }),
  ];
  const favelaTankMat = new THREE.MeshStandardMaterial({ color: 0x4a7d8a, roughness: 0.7, metalness: 0.25 });
  const favelaShackMat = new THREE.MeshStandardMaterial({ color: 0x8f4d42, roughness: 0.9 });
  const favelaPotMat = new THREE.MeshStandardMaterial({ color: 0xb45d3c, roughness: 0.9 });

  function favelaHouse(x, z, w, h, d, ry, colorIndex = 0, base = -2.1, rich = true) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = ry;
    const color = favelaPalette[colorIndex % favelaPalette.length];
    const wallMat = favelaWallMats[colorIndex % favelaWallMats.length];
    const body = box(w, h, d, wallMat, 0, base + h / 2, 0);
    g.add(body);

    // concrete roof slab with a corrugated lip
    const roofMat = favelaRoofMats[colorIndex % favelaRoofMats.length];
    g.add(box(w + 0.55, 0.26, d + 0.55, roofMat, 0, base + h + 0.13, 0));
    g.add(box(w + 0.1, 0.13, d + 0.1, favelaFrame, 0, base + h + 0.31, 0));

    // façade details: door, awning, balcony and laundry
    const front = d / 2 + 0.03;
    const doorX = (colorIndex % 2 ? -1 : 1) * (w * 0.24);
    g.add(box(0.95, 1.95, 0.08, favelaDark, doorX, base + 0.98, front));
    g.add(box(1.08, 2.08, 0.05, favelaFrame, doorX, base + 1.0, front - 0.02));
    const awningMat = favelaCloth[colorIndex % favelaCloth.length];
    const awning = box(1.8, 0.06, 0.9, awningMat, doorX, base + 2.3, front + 0.35, { rot: [-0.24, 0, 0] });
    g.add(awning);
    g.add(box(0.06, 0.06, 0.95, favelaDark, doorX - 0.78, base + 2.12, front + 0.3));
    g.add(box(0.06, 0.06, 0.95, favelaDark, doorX + 0.78, base + 2.12, front + 0.3));

    if (rich) {
      const balY = base + h * 0.6;
      const balW = w * 0.56;
      g.add(box(balW, 0.12, 0.72, favelaFrame, -doorX * 0.25, balY, front + 0.35));
      for (let i = 0; i < 6; i++) {
        g.add(box(0.045, 0.7, 0.045, favelaDark, -doorX * 0.25 - balW / 2 + 0.1 + i * (balW - 0.2) / 5, balY + 0.4, front + 0.7));
      }
      g.add(box(balW, 0.06, 0.06, favelaDark, -doorX * 0.25, balY + 0.75, front + 0.7));
      // clothes hanging off the balcony
      for (let i = 0; i < 2; i++) {
        const c = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.62), favelaCloth[(colorIndex + i) % favelaCloth.length]);
        c.position.set(-doorX * 0.25 - balW * 0.25 + i * 0.6, balY - 0.35, front + 0.55);
        c.rotation.y = 0.1;
        g.add(c);
      }
      // potted plants
      for (let i = 0; i < 3; i++) {
        const pot = cyl(0.13, 0.1, 0.24, favelaPotMat, -balW / 2 + 0.3 + i * 0.45, balY + 0.16, front + 0.28, 7);
        g.add(pot);
        for (let k = 0; k < 4; k++) {
          const leaf = new THREE.Mesh(leafGeometry(0.4, 0.18, 4), k % 2 ? favelaGreen : favelaGreen2);
          leaf.position.set(pot.position.x, balY + 0.3, front + 0.28);
          leaf.rotation.y = (k / 4) * TAU;
          leaf.rotation.x = -0.7;
          g.add(leaf);
        }
      }
    }

    // rooftop clutter: tank, antenna, little shack, satellite dish
    if (rich) {
      if (colorIndex % 3 === 0) {
        const tank = cyl(0.68, 0.68, 1.2, favelaTankMat, w * 0.2, base + h + 0.95, 0, 12);
        g.add(tank);
        for (const [lx, lz] of [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]]) {
          g.add(cyl(0.045, 0.045, 0.7, favelaDark, w * 0.2 + lx, base + h + 0.42, lz, 4));
        }
      }
      if (colorIndex % 4 === 1) {
        g.add(cyl(0.035, 0.045, 2.2, favelaDark, -w * 0.22, base + h + 1.3, d * 0.1, 4));
        g.add(box(0.02, 0.02, 1.1, favelaDark, -w * 0.22, base + h + 2.1, d * 0.1));
      }
      if (colorIndex % 5 === 2) {
        g.add(box(1.5, 0.95, 1.4, favelaShackMat, -w * 0.25, base + h + 0.72, -d * 0.12));
        g.add(box(1.6, 0.1, 1.5, favelaRoofMats[0], -w * 0.25, base + h + 1.2, -d * 0.12));
      }
      if (colorIndex % 3 === 2) {
        g.add(box(0.42, 0.3, 0.22, favelaFrame, w * 0.3, base + h * 0.72, front));
        g.add(box(0.46, 0.04, 0.26, favelaDark, w * 0.3, base + h * 0.72 + 0.17, front));
      }
      // exposed downpipe
      g.add(cyl(0.035, 0.045, h * 0.9, favelaDark, w / 2 - 0.08, base + h * 0.47, front + 0.02, 5));
    }

    // a little side staircase on some houses
    if (rich && colorIndex % 2 === 0) {
      for (let i = 0; i < 5; i++) {
        g.add(box(0.75, 0.18, 0.5, favelaFrame, -w / 2 - 0.2, base + 0.45 + i * 0.45, -d * 0.2 + i * 0.38));
      }
    }

    scene.add(g);
    return g;
  }

  // back row: colourful houses framing the mural
  favelaHouse(-17.4, -23.7, 6.4, 8.6, 5.6, 0, 0, -2.1);
  favelaHouse(-10.7, -24.2, 6.8, 6.6, 5.2, 0, 3, -2.1);
  favelaHouse(10.8, -24.2, 6.6, 7.7, 5.2, 0, 2, -2.1);
  favelaHouse(17.2, -23.7, 5.9, 9.4, 5.6, 0, 4, -2.1);
  favelaHouse(-14.0, -29.5, 7.2, 12.2, 6.0, 0, 5, -1.7, false);
  favelaHouse(-1.5, -30.5, 7.6, 13.8, 6.0, 0, 1, -1.7, false);
  favelaHouse(13.8, -29.3, 7.0, 11.4, 6.0, 0, 6, -1.7, false);

  // side rows
  favelaHouse(-22.3, -10.5, 7.0, 8.2, 5.2, Math.PI / 2, 2, -2.1);
  favelaHouse(-22.5, -2.0, 7.2, 10.4, 5.2, Math.PI / 2, 5, -2.1);
  favelaHouse(-22.2, 7.0, 6.8, 7.8, 5.2, Math.PI / 2, 0, -2.1);
  favelaHouse(-22.4, 14.0, 6.2, 9.2, 5.0, Math.PI / 2, 7, -2.1, false);
  favelaHouse(22.3, -11.0, 7.0, 8.8, 5.2, -Math.PI / 2, 3, -2.1);
  favelaHouse(22.5, -2.5, 7.2, 7.6, 5.2, -Math.PI / 2, 6, -2.1);
  favelaHouse(22.2, 6.5, 6.8, 9.8, 5.2, -Math.PI / 2, 1, -2.1);
  favelaHouse(22.4, 14.0, 6.2, 8.4, 5.0, -Math.PI / 2, 4, -2.1, false);

  // front row behind the player
  favelaHouse(-15.2, 23.4, 7.0, 7.4, 5.2, Math.PI, 4, -2.1);
  favelaHouse(-7.6, 23.8, 6.2, 8.6, 5.2, Math.PI, 1, -2.1);
  favelaHouse(7.6, 23.8, 6.2, 7.8, 5.2, Math.PI, 5, -2.1);
  favelaHouse(15.2, 23.4, 7.0, 8.8, 5.2, Math.PI, 3, -2.1);

  // north wall with mural (behind the beacon)
  nearBuilding(0, -26.2, 26, 11.5, 6, 0, 2, true, '#d95b4a');
  nearBuilding(-26.5, -15, 13, 12, 13, Math.PI / 2, 1, false, '#1f9e8f');
  nearBuilding(26.5, -13, 13, 11, 13, -Math.PI / 2, 4, false, '#e8a23a');
  nearBuilding(-27.5, 6, 13, 10, 15, Math.PI / 2, 3, false, '#8a5cc2');
  nearBuilding(27.5, 7, 13, 12, 15, -Math.PI / 2, 0, false, '#3f7fc4');
  nearBuilding(0, 25.2, 30, 12, 5, Math.PI, 5, false, '#e9803f');

  // windows lit on the mural wall (emissive planes)
  const winMat = new THREE.MeshBasicMaterial({ color: 0xffc46a, toneMapped: false });
  const winGeo = new THREE.PlaneGeometry(0.8, 1.1);
  const winCount = 20;
  const winInst = new THREE.InstancedMesh(winGeo, winMat, winCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < winCount; i++) {
    const x = -12 + rand() * 24;
    const y = 1.8 + rand() * 5.0;
    const z = -23.13;
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    winInst.setMatrixAt(i, dummy.matrix);
  }
  winInst.instanceMatrix.needsUpdate = true;
  scene.add(winInst);

  /* --------------------------------------------------------------- arena */
  const concrete = concreteTexture(1, '#7d7268', [8, 8]);
  const floorMat = new THREE.MeshStandardMaterial({ map: concrete, roughness: 0.9, metalness: 0.02 });
  const floor = new THREE.Mesh(new THREE.BoxGeometry(40, 1.2, 40), floorMat);
  floor.position.y = -0.6;
  floor.receiveShadow = true;
  floor.castShadow = false;
  scene.add(floor);
  colliders.push(floor);

  // painted capoeira circle
  const circle = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshBasicMaterial({ map: capoeiraDecal(), transparent: true, depthWrite: false, opacity: 0.92, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2 })
  );
  circle.rotation.x = -Math.PI / 2;
  circle.position.set(0, 0.012, -2.5);
  scene.add(circle);

  const stencil = new THREE.Mesh(
    new THREE.PlaneGeometry(7.5, 1.9),
    new THREE.MeshBasicMaterial({ map: stencilText('MANDACARU', 'rgba(255,238,205,0.35)'), transparent: true, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2 })
  );
  stencil.rotation.x = -Math.PI / 2;
  stencil.position.set(0, 0.014, 9.5);
  scene.add(stencil);

  // parapets
  const parapetMat = new THREE.MeshStandardMaterial({ map: concreteTexture(3, '#8a7b6c', [4, 1]), roughness: 0.92 });
  const paintMat = new THREE.MeshStandardMaterial({ color: 0x1c8b84, roughness: 0.8 });
  const paintMat2 = new THREE.MeshStandardMaterial({ color: 0xf0a83c, roughness: 0.8 });
  function parapet(x, z, w, d, h = 0.95) {
    const p = box(w, h, d, parapetMat, x, h / 2, z);
    scene.add(p);
    colliders.push(p);
    const stripe = box(w + 0.02, 0.16, d + 0.02, paintMat, x, h - 0.16, z);
    scene.add(stripe);
    return p;
  }
  parapet(0, -18.6, 38, 0.7, 0.9);
  parapet(0, 18.6, 38, 0.7, 0.9);
  parapet(-18.6, 0, 0.7, 38, 0.9);
  parapet(18.6, 0, 0.7, 38, 0.9);

  // painted stripes on side walls
  for (const s of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      scene.add(box(0.74, 0.5, 2.4, i % 2 ? paintMat2 : paintMat, s * 18.58, 0.32, -12 + i * 5.4));
    }
  }

  // add movement bounds obstacle helper
  function obstacle(x, z, w, d, h = 1.2, label = '') {
    obstacles.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, h, label });
  }

  /* ---------------------------------------------------------- beacon/farol */
  const beacon = new THREE.Group();
  beacon.position.set(0, 0, -13);
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x26333a, roughness: 0.45, metalness: 0.8 });
  const brass = new THREE.MeshStandardMaterial({ color: 0xc99a4a, roughness: 0.32, metalness: 0.9 });
  const beaconBase = cyl(1.5, 1.75, 0.5, darkMetal, 0, 0.25, 0, 20);
  const beaconCol = cyl(0.42, 0.62, 2.4, new THREE.MeshStandardMaterial({ color: 0x1b7b78, roughness: 0.4, metalness: 0.55 }), 0, 1.7, 0, 14);
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.07, 8, 24), brass);
  ring1.rotation.x = Math.PI / 2; ring1.position.y = 2.75;
  const ring2 = ring1.clone(); ring2.position.y = 0.9; ring2.scale.setScalar(1.2);
  const glassMat = new THREE.MeshStandardMaterial({ color: 0xffc766, emissive: 0xff9d3a, emissiveIntensity: 2.4, roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.92 });
  const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.62, 16, 12), glassMat);
  lantern.position.y = 3.3;
  const lanternCage = new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 0), new THREE.MeshBasicMaterial({ color: 0x2a3438, wireframe: true, toneMapped: false }));
  lanternCage.position.y = 3.3;
  const cap = new THREE.Mesh(new THREE.ConeGeometry(1.0, 0.8, 16), darkMetal);
  cap.position.y = 4.15;
  const beaconRing = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.06, 8, 30), new THREE.MeshBasicMaterial({ color: 0xffcf70, toneMapped: false }));
  beaconRing.rotation.x = Math.PI / 2;
  beaconRing.position.y = 3.3;
  beacon.add(beaconBase, beaconCol, ring1, ring2, lantern, lanternCage, cap, beaconRing);
  const beaconGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowSprite('rgba(255,220,140,1)', 'rgba(255,120,30,0)'),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0.85,
  }));
  beaconGlow.position.y = 3.3;
  beaconGlow.scale.setScalar(5.5);
  beacon.add(beaconGlow);
  const beaconLight = new THREE.PointLight(0xffb35a, 32, 22, 2);
  beaconLight.position.y = 3.4;
  beacon.add(beaconLight);
  scene.add(beacon);
  beacon.userData.dynamic = true;
  obstacle(0, -13, 3.2, 3.2, 4.5, 'beacon');
  colliders.push(beaconCol, beaconBase);

  animations.push((t) => {
    beaconRing.rotation.z = t * 0.8;
    ring1.rotation.z = t * 0.4;
    ring2.rotation.z = -t * 0.3;
    beaconGlow.material.opacity = 0.72 + Math.sin(t * 2.2) * 0.12;
    beaconLight.intensity = 30 + Math.sin(t * 2.2) * 6;
    lantern.material.emissiveIntensity = 2.1 + Math.sin(t * 2.2) * 0.35;
  });

  /* --------------------------------------------------------------- props */
  const crateMat = new THREE.MeshStandardMaterial({ map: crateTexture(), roughness: 0.88 });
  const barrelMat = new THREE.MeshStandardMaterial({ map: barrelTexture(), roughness: 0.72, metalness: 0.25 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x26242c, roughness: 0.7, metalness: 0.4 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x1f7a4d, roughness: 0.82, side: THREE.DoubleSide });
  const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x2f9a5a, roughness: 0.82, side: THREE.DoubleSide });
  const potMat = new THREE.MeshStandardMaterial({ color: 0xc06a3d, roughness: 0.9 });
  const barkMat = new THREE.MeshStandardMaterial({ color: 0x6b4a32, roughness: 0.95 });

  function crateStack(x, z, n = 3, ry = 0) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = ry;
    for (let i = 0; i < n; i++) {
      const s = 1.05 - i * 0.06;
      const c = box(s, s, s, crateMat, (i % 2 ? 0.22 : -0.14) * i, s / 2 + i * s * 0.96, (i % 2 ? -0.18 : 0.1) * i);
      g.add(c);
      colliders.push(c);
    }
    scene.add(g);
    obstacle(x, z, 1.5, 1.5, 2.4, 'crate');
    return g;
  }
  crateStack(-7.2, 3.6, 3, 0.18);
  crateStack(7.6, 4.8, 2, -0.35);
  crateStack(5.2, -8.2, 3, 0.5);
  crateStack(-11.8, -8.4, 2, 0.1);

  function barrel(x, z) {
    const b = cyl(0.45, 0.45, 1.15, barrelMat, x, 0.58, z, 14);
    scene.add(b);
    const rim1 = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.035, 6, 16), darkMat);
    rim1.rotation.x = Math.PI / 2; rim1.position.set(x, 0.95, z);
    const rim2 = rim1.clone(); rim2.position.y = 0.22;
    scene.add(rim1, rim2);
    colliders.push(b);
    obstacle(x, z, 1.0, 1.0, 1.2, 'barrel');
  }
  barrel(-4.6, 8.2);
  barrel(-3.4, 8.9);
  barrel(10.4, -4.2);
  barrel(9.7, -3.2);
  barrel(13.2, 9.4);

  // planters with palms / monstera
  function planter(x, z, size = 1.3, palm = false) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const p = box(size, 0.62, size, potMat, 0, 0.31, 0);
    g.add(p);
    const soil = box(size - 0.12, 0.05, size - 0.12, new THREE.MeshStandardMaterial({ color: 0x2a1b12, roughness: 1 }), 0, 0.63, 0);
    g.add(soil);
    if (palm) {
      const p2 = palmTree(0, 0, 2.6, 0.55, { bark: barkMat, palmLeaf: leafMat, coconut: barkMat });
      p2.position.y = 0.62;
      g.add(p2);
      animations.push((t) => { p2.userData.crown.rotation.z = Math.sin(t * 0.8 + x) * 0.035; p2.userData.crown.rotation.x = Math.cos(t * 0.65 + z) * 0.03; });
    } else {
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * TAU;
        const leaf = new THREE.Mesh(leafGeometry(0.9 + rand() * 0.4, 0.3, 5), i % 2 ? leafMat : leafMat2);
        leaf.position.set(Math.cos(a) * 0.18, 1.15, Math.sin(a) * 0.18);
        leaf.rotation.y = -a + Math.PI / 2;
        leaf.rotation.x = -0.7 + rand() * 0.3;
        leaf.castShadow = true;
        g.add(leaf);
      }
    }
    scene.add(g);
    colliders.push(p);
    obstacle(x, z, size, size, 1.0, 'planter');
    return g;
  }
  planter(-13.4, 7.8, 1.5, true);
  planter(13.8, 1.6, 1.4, false);
  planter(-14.6, -2.8, 1.3, true);
  planter(11.4, 12.2, 1.6, false);
  planter(-6.4, -16.4, 1.2, false);
  planter(6.8, -16.2, 1.2, true);

  // big palms outside arena
  for (const [x, z, h, s] of [[-23, 13, 9, 1.3], [23, -2, 8, 1.15], [-23, -6, 10, 1.4], [26, 13, 7, 1.0], [-27, 20, 8, 1.2]]) {
    const p = palmTree(x, z, h, s, { bark: barkMat, palmLeaf: leafMat, coconut: barkMat });
    p.position.y = -1.5;
    scene.add(p);
    animations.push((t) => { p.userData.crown.rotation.z = Math.sin(t * 0.55 + x * 0.3) * 0.05; });
  }

  // market stall
  const stall = new THREE.Group();
  stall.position.set(11.6, 0, -10.2);
  stall.rotation.y = -0.18;
  const stallWood = new THREE.MeshStandardMaterial({ map: woodTexture([2, 1]), roughness: 0.9 });
  stall.add(box(3.6, 0.18, 1.6, stallWood, 0, 1.0, 0));
  for (const [x, z] of [[-1.6, -0.6], [1.6, -0.6], [-1.6, 0.6], [1.6, 0.6]]) {
    stall.add(cyl(0.06, 0.07, 2.4, darkMat, x, 1.2, z, 6));
  }
  const canopyMat = new THREE.MeshStandardMaterial({ map: clothTexture('#f05a4c', '#f7e7c8', 4), roughness: 0.9, side: THREE.DoubleSide });
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(2.7, 0.85, 4), canopyMat);
  canopy.position.y = 2.55;
  canopy.rotation.y = Math.PI / 4;
  stall.add(canopy);
  for (let i = 0; i < 5; i++) {
    const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), new THREE.MeshStandardMaterial({ color: [0xffb31a, 0xe94b3c, 0x7a3c9c, 0x4caf50, 0xff7a24][i], roughness: 0.6 }));
    fruit.position.set(-1.1 + i * 0.55, 1.22, (i % 2 ? 0.2 : -0.2));
    stall.add(fruit);
  }
  const crate = box(0.9, 0.65, 0.9, crateMat, -2.4, 0.33, 0.4);
  stall.add(crate);
  scene.add(stall);
  colliders.push(crate);
  obstacle(11.6, -10.2, 4.4, 2.2, 2.4, 'stall');

  // water tank on stilts
  const tankGroup = new THREE.Group();
  tankGroup.position.set(-14.2, 0, -13.2);
  for (const [x, z] of [[-1.1, -1.1], [1.1, -1.1], [-1.1, 1.1], [1.1, 1.1]]) {
    tankGroup.add(cyl(0.09, 0.11, 2.4, darkMat, x, 1.2, z, 6));
  }
  const tankBody = cyl(1.35, 1.35, 2.1, new THREE.MeshStandardMaterial({ color: 0x3f7e94, roughness: 0.55, metalness: 0.35 }), 0, 3.45, 0, 18);
  tankGroup.add(tankBody);
  const tankTop = cyl(0.25, 1.4, 0.45, new THREE.MeshStandardMaterial({ color: 0x2d5e72, roughness: 0.6 }), 0, 4.7, 0, 18);
  tankGroup.add(tankTop);
  tankGroup.add(cyl(0.03, 0.03, 1.4, darkMat, 0, 5.5, 0, 4));
  scene.add(tankGroup);
  colliders.push(tankBody);
  obstacle(-14.2, -13.2, 3.0, 3.0, 4.8, 'tank');

  // satellite dish
  const dishGroup = new THREE.Group();
  dishGroup.position.set(15.4, 0, 6.4);
  dishGroup.rotation.y = -0.7;
  dishGroup.add(cyl(0.05, 0.06, 1.8, darkMat, 0, 0.9, 0, 5));
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.85, 14, 8, 0, TAU, 0, Math.PI / 2.6), new THREE.MeshStandardMaterial({ color: 0xd8d2c2, roughness: 0.65, metalness: 0.3, side: THREE.DoubleSide }));
  dish.position.set(0, 1.85, 0);
  dish.rotation.x = Math.PI * 0.68;
  dish.rotation.z = 0.2;
  dishGroup.add(dish);
  dishGroup.add(cyl(0.02, 0.02, 1.2, darkMat, 0, 1.85, 0.4, 4, { cast: false }));
  scene.add(dishGroup);
  obstacle(15.4, 6.4, 1.4, 1.4, 2.2, 'dish');

  // umbrella + table (rooftop bar vibe)
  const bar = new THREE.Group();
  bar.position.set(12.6, 0, 8.8);
  const tableTop = cyl(0.72, 0.72, 0.08, woodTextureMat, 0, 0.78, 0, 16);
  bar.add(tableTop);
  bar.add(cyl(0.05, 0.07, 0.78, darkMat, 0, 0.39, 0, 6));
  const umbMat = new THREE.MeshStandardMaterial({ map: clothTexture('#ffd24a', '#f7e7c8', 7), roughness: 0.9, side: THREE.DoubleSide });
  const umb = new THREE.Mesh(new THREE.ConeGeometry(1.75, 0.55, 12, 1, true), umbMat);
  umb.position.y = 2.45;
  bar.add(umb);
  bar.add(cyl(0.035, 0.035, 2.4, darkMat, 0, 1.25, 0, 5));
  for (const [x, z, ry] of [[-1.1, 0.2, 0.4], [0.9, -0.6, -0.5]]) {
    const chair = new THREE.Group();
    chair.position.set(x, 0, z);
    chair.rotation.y = ry;
    chair.add(box(0.55, 0.07, 0.55, new THREE.MeshStandardMaterial({ color: 0xe8e0cc, roughness: 0.7 }), 0, 0.45, 0));
    chair.add(box(0.55, 0.55, 0.07, new THREE.MeshStandardMaterial({ color: 0xe8e0cc, roughness: 0.7 }), 0, 0.7, -0.25, { rot: [-0.15, 0, 0] }));
    for (const [lx, lz] of [[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]]) chair.add(cyl(0.025, 0.025, 0.45, darkMat, lx, 0.22, lz, 4));
    bar.add(chair);
  }
  scene.add(bar);
  obstacle(12.6, 8.8, 2.6, 2.6, 2.2, 'bar');

  // berimbau prop near the circle
  const berimbau = new THREE.Group();
  berimbau.position.set(-4.2, 0, -3.4);
  berimbau.rotation.y = 0.8;
  const bow = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.7, 6), woodTextureMat);
  bow.rotation.z = 0.42;
  bow.position.y = 0.85;
  berimbau.add(bow);
  const gourd = new THREE.Mesh(new THREE.SphereGeometry(0.19, 10, 8), new THREE.MeshStandardMaterial({ color: 0x8a6a3a, roughness: 0.9 }));
  gourd.position.set(-0.22, 0.52, 0);
  berimbau.add(gourd);
  berimbau.add(cyl(0.006, 0.006, 1.2, new THREE.MeshStandardMaterial({ color: 0xd8d2c2 }), 0.1, 0.95, 0, 4));
  scene.add(berimbau);

  /* ---------------------------------------------------- churrasco + sound */
  const grill = new THREE.Group();
  grill.position.set(-13.1, 0, 11.4);
  grill.rotation.y = 0.45;
  const brickMat = new THREE.MeshStandardMaterial({ color: 0x7d4638, roughness: 0.96 });
  grill.add(box(2.0, 0.72, 1.05, brickMat, 0, 0.36, 0));
  grill.add(box(2.2, 0.1, 1.16, darkMat, 0, 0.76, 0));
  grill.add(box(2.12, 0.06, 1.06, new THREE.MeshStandardMaterial({ color: 0x4a4a4c, roughness: 0.45, metalness: 0.8 }), 0, 0.83, 0));
  const coalMatA = new THREE.MeshBasicMaterial({ color: 0xff5a1e, toneMapped: false });
  const coalMatB = new THREE.MeshBasicMaterial({ color: 0xffb23a, toneMapped: false });
  for (let i = 0; i < 10; i++) {
    const coal = new THREE.Mesh(new THREE.SphereGeometry(0.065, 6, 5), i % 3 ? coalMatA : coalMatB);
    coal.position.set(-0.8 + (i % 5) * 0.4, 0.88, -0.3 + ((i / 5) | 0) * 0.6);
    grill.add(coal);
  }
  const skewerMat = new THREE.MeshStandardMaterial({ color: 0xc9c1b1, roughness: 0.4, metalness: 0.8 });
  const meatMats = [0x8a3a26, 0xb4542e, 0x6e2c20, 0xc96a36].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.8 }));
  for (let i = 0; i < 4; i++) {
    const skewer = cyl(0.012, 0.012, 1.55, skewerMat, 0, 0.98, -0.3 + i * 0.2, 4, { cast: false });
    skewer.rotation.z = Math.PI / 2;
    grill.add(skewer);
    for (let k = 0; k < 4; k++) {
      const meat = box(0.16, 0.13, 0.13, meatMats[k], -0.45 + k * 0.28, 1.0, -0.3 + i * 0.2);
      grill.add(meat);
    }
  }
  const grillLight = new THREE.PointLight(0xff5a24, 6, 6, 2);
  grillLight.position.set(0, 1.15, 0);
  grill.add(grillLight);
  scene.add(grill);
  obstacle(-13.1, 11.4, 2.5, 1.7, 1.1, 'grill');
  colliders.push(grill.children[0]);

  const sound = new THREE.Group();
  sound.position.set(14.7, 0, 14.6);
  sound.rotation.y = -0.55;
  const cabMat = new THREE.MeshStandardMaterial({ color: 0x1b1b22, roughness: 0.62, metalness: 0.25 });
  const coneMat = new THREE.MeshStandardMaterial({ color: 0x30323c, roughness: 0.5, metalness: 0.5 });
  const coneRim = new THREE.MeshStandardMaterial({ color: 0x1fd1b2, roughness: 0.35, metalness: 0.4, emissive: 0x0c6b5c, emissiveIntensity: 0.8 });
  for (let s = 0; s < 2; s++) {
    const y = 0.72 + s * 1.15;
    sound.add(box(1.15, 1.05, 0.68, cabMat, 0, y, 0));
    for (const [cx, cy] of [[-0.26, 0.05], [0.26, 0.05]]) {
      const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.16, 0.1, 16), coneMat);
      cone.rotation.x = Math.PI / 2;
      cone.position.set(cx, y + cy, 0.36);
      sound.add(cone);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.022, 6, 18), coneRim);
      rim.position.set(cx, y + cy, 0.415);
      sound.add(rim);
    }
  }
  const deck = box(1.35, 0.12, 0.9, darkMat, 0, 1.92, 0);
  sound.add(deck);
  const vinyl = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.03, 24), new THREE.MeshStandardMaterial({ color: 0x101014, roughness: 0.3, metalness: 0.4 }));
  vinyl.position.set(-0.3, 2.0, 0);
  sound.add(vinyl);
  const label = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.035, 16), new THREE.MeshBasicMaterial({ color: 0xffd24a, toneMapped: false }));
  label.position.set(-0.3, 2.02, 0);
  sound.add(label);
  const soundLight = new THREE.PointLight(0x1fd1b2, 4, 5, 2);
  soundLight.position.set(0, 1.8, 0.8);
  sound.add(soundLight);
  sound.userData.dynamic = true;
  scene.add(sound);
  obstacle(14.7, 14.6, 1.6, 1.3, 2.2, 'sound');
  animations.push((t) => { vinyl.rotation.y = t * 1.6; label.rotation.y = t * 1.6; soundLight.intensity = 3.5 + Math.sin(t * 5.2) * 1.2; });

  const football = new THREE.Mesh(new THREE.SphereGeometry(0.23, 16, 12), new THREE.MeshStandardMaterial({ color: 0xf2e9d8, roughness: 0.62 }));
  football.position.set(3.6, 0.23, 6.2);
  football.userData.dynamic = true;
  scene.add(football);
  const patchMat = new THREE.MeshStandardMaterial({ color: 0x1b1b22, roughness: 0.7 });
  for (let i = 0; i < 8; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / 8);
    const theta = i * 2.4;
    const p = new THREE.Vector3(0.235 * Math.sin(phi) * Math.cos(theta), 0.235 * Math.cos(phi), 0.235 * Math.sin(phi) * Math.sin(theta));
    const patch = new THREE.Mesh(new THREE.CircleGeometry(0.072, 5), patchMat);
    patch.position.copy(p);
    patch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.clone().normalize());
    football.add(patch);
  }
  animations.push((t) => { football.rotation.y = t * 0.18; football.position.y = 0.23 + Math.abs(Math.sin(t * 1.4)) * 0.02; });

  // capybara + sign
  const capy = capybara();
  capy.position.set(-9.8, 1.1, 3.2);
  capy.rotation.y = -1.1;
  capy.userData.dynamic = true;
  scene.add(capy);
  capy.traverse((o) => { if (o.isMesh) { o.userData.capybara = true; o.castShadow = true; } });

  const capySign = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 0.42),
    new THREE.MeshBasicMaterial({ map: stencilText('NÃO ATIRE', 'rgba(255,240,210,0.85)', 512, 160, 76), transparent: true, toneMapped: false, side: THREE.DoubleSide })
  );
  capySign.position.set(-9.1, 1.95, 3.7);
  capySign.rotation.y = -0.6;
  scene.add(capySign);

  // toucan on the back wall ledge
  const bird = toucan();
  bird.position.set(8.4, 3.6, -20.1);
  bird.rotation.y = 0.4;
  bird.scale.setScalar(1.15);
  scene.add(bird);
  animations.push((t) => {
    bird.rotation.y = 0.4 + Math.sin(t * 0.4) * 0.12;
    bird.position.y = 3.6 + Math.sin(t * 1.1) * 0.02;
  });

  // posters on the back wall
  for (let i = 0; i < 3; i++) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.55), new THREE.MeshStandardMaterial({ map: posterTexture(i), roughness: 0.9 }));
    p.position.set(-14 + i * 2.2, 2.4 + (i % 2) * 0.5, -22.9);
    p.rotation.z = (rand() - 0.5) * 0.12;
    scene.add(p);
  }

  /* --------------------------------------------------------- string lights */
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffd58a, toneMapped: false });
  const bulbGeo = new THREE.SphereGeometry(0.07, 6, 5);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x1b1720, toneMapped: false });
  function stringLights(a, b, sag, bulbs = 22) {
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.y -= sag;
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const pts = curve.getPoints(30);
    const wire = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x1b1720 }));
    scene.add(wire);
    const inst = new THREE.InstancedMesh(bulbGeo, bulbMat, bulbs);
    const d = new THREE.Object3D();
    for (let i = 0; i < bulbs; i++) {
      const p = curve.getPoint((i + 0.5) / bulbs);
      d.position.copy(p);
      d.position.y -= 0.09;
      d.updateMatrix();
      inst.setMatrixAt(i, d.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
    scene.add(inst);
    animations.push((t) => { inst.material.color.setHSL(0.11, 0.85, 0.68 + Math.sin(t * 2 + a.x) * 0.03); });
    return curve;
  }
  stringLights(new THREE.Vector3(-18, 5.6, -4), new THREE.Vector3(18, 6.0, -8), 1.1, 26);
  stringLights(new THREE.Vector3(-18, 6.4, 7), new THREE.Vector3(18, 6.1, 3), 1.3, 26);
  stringLights(new THREE.Vector3(-18, 6.0, -8), new THREE.Vector3(18, 5.7, -4), 1.0, 24);

  const lightA = new THREE.PointLight(0xffb35a, 12, 14, 2);
  lightA.position.set(-6, 5, -5);
  scene.add(lightA);
  const lightB = new THREE.PointLight(0xffb35a, 12, 14, 2);
  lightB.position.set(8, 5.2, 4);
  scene.add(lightB);

  /* -------------------------------------------------------------- bunting */
  const flagCols = [0xffd24a, 0x1fd1b2, 0xff4f9a, 0xff7a24, 0xfff3d6, 0x3f6bff];
  function bunting(a, b, sag, count = 18) {
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.y -= sag;
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute([-0.22, 0, 0, 0.22, 0, 0, 0, -0.55, 0], 3));
    geo.computeVertexNormals();
    const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false });
    const inst = new THREE.InstancedMesh(geo, mat, count);
    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count;
      const p = curve.getPoint(t);
      const next = curve.getPoint(Math.min(1, t + 0.01));
      dummy.position.copy(p);
      dummy.lookAt(next);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
      inst.setColorAt(i, col.setHex(flagCols[i % flagCols.length]));
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    scene.add(inst);
  }
  bunting(new THREE.Vector3(-17, 7.6, 0), new THREE.Vector3(17, 7.8, -2), 1.4, 22);
  bunting(new THREE.Vector3(-17, 8.2, 12), new THREE.Vector3(17, 8.0, 10), 1.2, 18);

  /* ------------------------------------------------------------ laundry */
  const clothMats = [
    new THREE.MeshStandardMaterial({ map: clothTexture('#ef5b4c', '#f6e7c8', 1), roughness: 0.92, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ map: clothTexture('#1fd1b2', '#fff3d6', 2), roughness: 0.92, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ map: clothTexture('#ffd24a', '#ff4f9a', 3), roughness: 0.92, side: THREE.DoubleSide }),
  ];
  const laundry = new THREE.Group();
  laundry.position.set(-16.8, 0, 12);
  laundry.rotation.y = Math.PI / 2;
  laundry.userData.dynamic = true;
  const line1 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.2, 3.6, 0), new THREE.Vector3(2.2, 3.4, 0)]), new THREE.LineBasicMaterial({ color: 0x1b1720 }));
  laundry.add(line1);
  for (let i = 0; i < 5; i++) {
    const c = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 1.05), clothMats[i % clothMats.length]);
    c.position.set(-1.7 + i * 0.85, 3.0, 0);
    c.rotation.y = 0.1;
    laundry.add(c);
    const base = c.rotation.z;
    animations.push((t) => { c.rotation.z = base + Math.sin(t * 1.6 + i) * 0.05; });
  }
  scene.add(laundry);

  /* --------------------------------------------------------------- neon */
  const neon = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 2.6),
    new THREE.MeshBasicMaterial({ map: neonTexture('LAJE 9', '#ff4f9a'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  );
  neon.position.set(12.2, 8.4, -22.85);
  neon.userData.dynamic = true;
  scene.add(neon);
  const neonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowSprite('rgba(255,90,160,0.8)', 'rgba(255,50,120,0)'),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0.5,
  }));
  neonGlow.position.set(12.2, 8.4, -22.7);
  neonGlow.scale.set(9, 5, 1);
  scene.add(neonGlow);
  animations.push((t) => {
    const flicker = Math.sin(t * 18) > 0.96 ? 0.25 : 1;
    neon.material.opacity = flicker;
    neonGlow.material.opacity = 0.4 * flicker;
  });

  const neon2 = new THREE.Mesh(
    new THREE.PlaneGeometry(4.2, 2.1),
    new THREE.MeshBasicMaterial({ map: neonTexture('AXÉ', '#1fd1b2'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  );
  neon2.position.set(-11, 7.6, 21.85);
  neon2.rotation.y = Math.PI;
  neon2.userData.dynamic = true;
  scene.add(neon2);
  animations.push((t) => { neon2.material.opacity = 0.85 + Math.sin(t * 1.7) * 0.1; });

  /* ------------------------------------------------------- cable car + birds */
  const cableGroup = new THREE.Group();
  const towerMat = new THREE.MeshStandardMaterial({ color: 0x3c3a48, roughness: 0.8 });
  const cablePts = [];
  const cableStart = new THREE.Vector3(-90, 10, -55);
  const cableEnd = new THREE.Vector3(90, 12, -70);
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const p = cableStart.clone().lerp(cableEnd, t);
    p.y += Math.sin(t * Math.PI) * 3.5;
    cablePts.push(p);
  }
  const cableLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(cablePts), new THREE.LineBasicMaterial({ color: 0x1c1b24 }));
  scene.add(cableLine);
  for (const [p, h] of [[cableStart, 24], [cableEnd, 26]]) {
    cableGroup.add(cyl(0.5, 0.9, h, towerMat, p.x, p.y - h / 2, p.z, 6));
  }
  const cabin = new THREE.Group();
  const cabinBody = box(3.4, 2.6, 3.0, new THREE.MeshStandardMaterial({ color: 0x2f7f8f, roughness: 0.5, metalness: 0.3 }), 0, 0, 0);
  const cabinGlass = box(3.0, 1.4, 3.05, new THREE.MeshBasicMaterial({ color: 0xffd27a, toneMapped: false }), 0, 0.2, 0);
  const cabinTop = box(3.6, 0.2, 3.2, towerMat, 0, 1.4, 0);
  cabin.add(cabinBody, cabinGlass, cabinTop);
  const cable = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1.8, 0)]), new THREE.LineBasicMaterial({ color: 0x1c1b24 }));
  cabin.add(cable);
  cableGroup.add(cabin);
  cableGroup.userData.dynamic = true;
  scene.add(cableGroup);
  const cableCurve = new THREE.CatmullRomCurve3(cablePts);
  animations.push((t) => {
    const p = cableCurve.getPoint((t * 0.012) % 1);
    cabin.position.copy(p);
    cabin.position.y -= 2.2;
    cabin.rotation.z = Math.sin(t * 0.6) * 0.02;
  });

  // birds
  const birdMat = new THREE.MeshBasicMaterial({ color: 0x1a1420, side: THREE.DoubleSide });
  const birds = [];
  for (let i = 0; i < 7; i++) {
    const g = new THREE.Group();
    const wingGeo = new THREE.BufferGeometry();
    wingGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1.2, 0.1, 0, 0, 0, 0.5], 3));
    wingGeo.computeVertexNormals();
    const w1 = new THREE.Mesh(wingGeo, birdMat);
    const w2 = new THREE.Mesh(wingGeo, birdMat);
    w2.scale.x = -1;
    g.add(w1, w2);
    g.userData = { w1, w2, r: 25 + rand() * 30, a: rand() * TAU, speed: 0.04 + rand() * 0.04, y: 18 + rand() * 14, cx: (rand() - 0.5) * 60, cz: -40 - rand() * 40 };
    g.userData.dynamic = true;
    scene.add(g);
    birds.push(g);
  }
  animations.push((t) => {
    for (const b of birds) {
      const u = b.userData;
      const a = u.a + t * u.speed;
      b.position.set(u.cx + Math.cos(a) * u.r, u.y + Math.sin(a * 2) * 1.4, u.cz + Math.sin(a) * u.r * 0.6);
      b.rotation.y = -a + Math.PI / 2;
      const flap = Math.sin(t * 7 + u.a) * 0.5;
      u.w1.rotation.z = flap;
      u.w2.rotation.z = -flap;
    }
  });

  // dust motes in the sun
  const moteCount = 220;
  const moteGeo = new THREE.BufferGeometry();
  const motePos = new Float32Array(moteCount * 3);
  for (let i = 0; i < moteCount; i++) {
    motePos[i * 3] = (rand() - 0.5) * 38;
    motePos[i * 3 + 1] = rand() * 9;
    motePos[i * 3 + 2] = (rand() - 0.5) * 38;
  }
  moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
  const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({
    color: 0xffd9a0, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  }));
  scene.add(motes);
  animations.push((t) => {
    const p = moteGeo.attributes.position.array;
    for (let i = 0; i < moteCount; i++) {
      p[i * 3 + 1] += 0.0016;
      p[i * 3] += Math.sin(t * 0.3 + i) * 0.0008;
      if (p[i * 3 + 1] > 9) p[i * 3 + 1] = 0;
    }
    moteGeo.attributes.position.needsUpdate = true;
    motes.rotation.y = t * 0.01;
  });

  /* --------------------------------------------------------------- spawns */
  spawnPoints.ground.push(
    new THREE.Vector3(-14.8, 0, -7.6),
    new THREE.Vector3(14.8, 0, -7.0),
    new THREE.Vector3(-14.8, 0, 4.6),
    new THREE.Vector3(14.8, 0, 5.4),
    new THREE.Vector3(-8.6, 0, -16.2),
    new THREE.Vector3(8.6, 0, -16.2)
  );
  spawnPoints.air.push(
    new THREE.Vector3(-12, 6.5, -15),
    new THREE.Vector3(12, 7.2, -15),
    new THREE.Vector3(0, 8.2, -18),
    new THREE.Vector3(-15, 7.5, -4),
    new THREE.Vector3(15, 7.0, -4),
    new THREE.Vector3(0, 9.0, 6)
  );

  // spawn pads glow rings
  const padMat = new THREE.MeshBasicMaterial({ color: 0xff6a4a, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
  for (const p of spawnPoints.ground) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.6, 0.9, 24), padMat.clone());
    ring.rotation.x = -Math.PI / 2;
    ring.position.copy(p).setY(0.02);
    ring.userData.dynamic = true;
    scene.add(ring);
    animations.push((t) => { ring.material.opacity = 0.25 + Math.sin(t * 2 + p.x) * 0.12; ring.scale.setScalar(1 + Math.sin(t * 2 + p.z) * 0.05); });
  }

  /* --------------------------------------------------------------- return */
  // Collapse the static favela into a handful of batched meshes. The rooftop
  // is built from hundreds of little boxes; batching keeps it phone-friendly.
  const keepStatic = new Set(colliders);
  const staticBuckets = new Map();
  scene.updateMatrixWorld(true);
  scene.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh || o.isSkinnedMesh) return;
    if (keepStatic.has(o)) return;
    let p = o;
    while (p) {
      if (p.userData && p.userData.dynamic) return;
      p = p.parent;
    }
    if (!o.material || Array.isArray(o.material) || o.material.isShaderMaterial) return;
    if (o.material.transparent || o.material.blending === THREE.AdditiveBlending) return;
    const key = `${o.material.uuid}|${o.castShadow}|${o.receiveShadow}|${o.renderOrder}`;
    let bucket = staticBuckets.get(key);
    if (!bucket) {
      bucket = { material: o.material, cast: o.castShadow, receive: o.receiveShadow, order: o.renderOrder, meshes: [] };
      staticBuckets.set(key, bucket);
    }
    bucket.meshes.push(o);
  });
  for (const bucket of staticBuckets.values()) {
    if (bucket.meshes.length < 2) continue;
    const geoms = bucket.meshes.map((m) => m.geometry.clone().applyMatrix4(m.matrixWorld));
    const merged = new THREE.Mesh(mergeBufferGeometries(geoms), bucket.material);
    merged.castShadow = bucket.cast;
    merged.receiveShadow = bucket.receive;
    merged.renderOrder = bucket.order;
    scene.add(merged);
    for (const m of bucket.meshes) m.parent.remove(m);
  }

  const capybaraApi = {
    group: capy,
    scared: false,
    scare() {
      if (this.scared) return false;
      this.scared = true;
      capy.userData.vel.set(-4.5, 0, -2.5);
      return true;
    },
  };
  animations.push((t, dt) => {
    if (capy.userData.scared) {
      capy.position.addScaledVector(capy.userData.vel, dt);
      capy.userData.vel.multiplyScalar(0.985);
      capy.rotation.z = Math.min(0.4, capy.rotation.z + dt * 2);
      capy.position.y = Math.max(1.1, capy.position.y - dt * 0.15);
      if (capy.position.x < -19) capy.position.x = -19;
      if (capy.position.z < -19) capy.position.z = -19;
    } else {
      capy.rotation.z = Math.sin(t * 1.2) * 0.008;
      capy.position.y = 1.1 + Math.sin(t * 1.2) * 0.01;
    }
  });

  return {
    scene, colliders, obstacles, spawnPoints, beacon, sun, sunDir, skyMat, skyUniforms,
    waterUniforms, animations, capybara: capybaraApi, neon, neon2, lantern,
    floor, floorMat, sunGlow, cristo, ambientLights: [lightA, lightB],
  };
}
