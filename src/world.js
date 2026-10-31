import * as THREE from 'three'
import {
  groundTexture, wallTexture, roofTexture, awningTexture, signTexture,
  graffitiTexture, glowTexture, cloudTexture, stripeTexture,
} from './textures.js'

const HALF = 24
const ARENA = HALF * 2
const tmpColor = new THREE.Color()

const wallMatCache = new Map()
const stdCache = new Map()

function standard(color, options = {}) {
  const key = `${color}-${options.roughness ?? 0.9}-${options.metalness ?? 0}-${options.emissive ?? 0}-${options.emissiveIntensity ?? 1}`
  if (stdCache.has(key)) return stdCache.get(key)
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.9,
    metalness: options.metalness ?? 0,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 1,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    side: options.side ?? THREE.FrontSide,
  })
  stdCache.set(key, mat)
  return mat
}

function wallMaterial(base, trim) {
  const key = `${base}-${trim}`
  if (!wallMatCache.has(key)) {
    const tex = wallTexture(base, trim)
    wallMatCache.set(key, new THREE.MeshStandardMaterial({
      map: tex,
      color: 0xffffff,
      roughness: 0.95,
      metalness: 0.02,
    }))
  }
  return wallMatCache.get(key)
}

function box(w, h, d, mat, x = 0, y = 0, z = 0, group) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
  mesh.position.set(x, y, z)
  mesh.castShadow = true
  mesh.receiveShadow = true
  group?.add(mesh)
  return mesh
}

function cylinder(rt, rb, h, seg, mat, x = 0, y = 0, z = 0, group) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat)
  mesh.position.set(x, y, z)
  mesh.castShadow = true
  mesh.receiveShadow = true
  group?.add(mesh)
  return mesh
}

function plane(w, h, mat, x = 0, y = 0, z = 0, group) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat)
  mesh.position.set(x, y, z)
  group?.add(mesh)
  return mesh
}

function emissivePlane(w, h, color, x, y, z, group, intensity = 1.6) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0x0a0d0b,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.4,
    metalness: 0.1,
    transparent: true,
    opacity: 0.96,
  })
  const mesh = plane(w, h, mat, x, y, z, group)
  return mesh
}

export function buildWorld(scene, options = {}) {
  const isMobile = Boolean(options.isMobile)
  const quality = isMobile ? 'mobile' : 'desktop'
  const group = new THREE.Group()
  group.name = 'morro-world'
  scene.add(group)

  const colliders = []
  const hitMeshes = []
  const flags = []
  const smoke = []
  const animatedLights = []
  const palms = []
  const flickers = []
  const spawnPoints = []
  const hit = (mesh) => { hitMeshes.push(mesh); return mesh }
  const collide = (x, z, hx, hz) => colliders.push({ x, z, hx, hz })

  scene.fog = new THREE.FogExp2(0x281a24, 0.0095)
  scene.background = new THREE.Color(0x1a1120)

  // ---------------------------------------------------------------- SKY
  const sunDir = new THREE.Vector3(-0.52, 0.12, -1).normalize()
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uZenith: { value: new THREE.Color(0x0b1230) },
      uMid: { value: new THREE.Color(0x4d2c51) },
      uHorizon: { value: new THREE.Color(0xff805e) },
      uSun: { value: sunDir },
      uSunColor: { value: new THREE.Color(0xffd08a) },
    },
    vertexShader: /* glsl */`
      varying vec3 vWorld;
      void main() {
        vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      varying vec3 vWorld;
      uniform vec3 uZenith;
      uniform vec3 uMid;
      uniform vec3 uHorizon;
      uniform vec3 uSun;
      uniform vec3 uSunColor;
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + .1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      void main() {
        vec3 dir = normalize(vWorld - cameraPosition);
        float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 col = mix(uHorizon, uMid, smoothstep(0.46, 0.69, h));
        col = mix(col, uZenith, smoothstep(0.64, 0.98, h));
        float sun = max(dot(dir, uSun), 0.0);
        col += uSunColor * pow(sun, 420.0) * 2.2;
        col += uSunColor * pow(sun, 12.0) * 0.18;
        col += vec3(1.0, 0.36, 0.28) * pow(max(0.0, 1.0 - abs(dir.y - 0.015) * 8.0), 5.0) * 0.05;
        vec3 starCell = floor(dir * 520.0);
        float star = step(0.9975, hash(starCell)) * smoothstep(0.62, 0.9, h);
        col += vec3(star) * vec3(0.72, 0.84, 1.0) * 0.7;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
  const sky = new THREE.Mesh(new THREE.SphereGeometry(340, 40, 24), skyMat)
  group.add(sky)

  // Sun halo sprite.
  const sunSpriteMat = new THREE.SpriteMaterial({
    map: glowTexture(),
    color: 0xffc478,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fog: false,
  })
  const sunSprite = new THREE.Sprite(sunSpriteMat)
  sunSprite.position.copy(sunDir).multiplyScalar(280)
  sunSprite.scale.set(70, 70, 1)
  group.add(sunSprite)

  // Distant clouds.
  const cloudTex = cloudTexture()
  for (let i = 0; i < 9; i++) {
    const mat = new THREE.SpriteMaterial({
      map: cloudTex,
      color: i % 2 ? 0xffb18c : 0xd99b9b,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      fog: false,
    })
    const cloud = new THREE.Sprite(mat)
    const a = (i / 9) * Math.PI * 2
    cloud.position.set(Math.cos(a) * (110 + Math.random() * 80), 34 + Math.random() * 44, Math.sin(a) * (110 + Math.random() * 80) - 40)
    cloud.scale.set(80 + Math.random() * 70, 12 + Math.random() * 10, 1)
    group.add(cloud)
  }

  // ---------------------------------------------------------------- SEA & MOUNTAINS
  const waterGeo = new THREE.PlaneGeometry(520, 260, 1, 1)
  const waterMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color(0x071e2a) },
      uGlow: { value: new THREE.Color(0xbb5d56) },
      uSun: { value: sunDir },
    },
    vertexShader: /* glsl */`
      varying vec3 vWorld;
      void main() {
        vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      varying vec3 vWorld;
      uniform float uTime;
      uniform vec3 uDeep;
      uniform vec3 uGlow;
      void main() {
        float shimmer = sin(vWorld.x * 0.22 + uTime * 0.7) * sin(vWorld.z * 0.34 - uTime * 0.55);
        shimmer = pow(max(0.0, shimmer * 0.5 + 0.5), 10.0);
        float horizon = smoothstep(-90.0, -20.0, vWorld.z);
        vec3 col = mix(uDeep, uGlow * 0.28, horizon * 0.4);
        col += uGlow * shimmer * 0.1;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
  const water = new THREE.Mesh(waterGeo, waterMat)
  water.rotation.x = -Math.PI / 2
  water.position.set(0, -7, -135)
  group.add(water)

  const mountainMat = standard(0x1d202d, { roughness: 1 })
  const mountainMat2 = standard(0x252535, { roughness: 1 })
  const sugarloaf = new THREE.Mesh(new THREE.SphereGeometry(30, 18, 12), mountainMat)
  sugarloaf.position.set(52, -5, -120)
  sugarloaf.scale.set(1.15, 1.05, 0.72)
  group.add(sugarloaf)
  const sugarloaf2 = new THREE.Mesh(new THREE.SphereGeometry(24, 16, 10), mountainMat2)
  sugarloaf2.position.set(30, -8, -112)
  sugarloaf2.scale.set(1.2, 0.8, 0.7)
  group.add(sugarloaf2)
  const ridge = new THREE.Mesh(new THREE.SphereGeometry(44, 18, 10), mountainMat)
  ridge.position.set(-36, -13, -118)
  ridge.scale.set(1.7, 0.62, 0.55)
  group.add(ridge)

  // Christ the Redeemer silhouette on the far hill.
  const christGroup = new THREE.Group()
  christGroup.position.set(-25, 20, -96)
  const statueMat = standard(0x292432, { roughness: 0.9, emissive: 0x6b3e36, emissiveIntensity: 0.16 })
  const christBody = box(1.7, 13, 1.7, statueMat, 0, 5, 0, christGroup)
  christBody.castShadow = false
  const christArms = box(15, 1.6, 1.6, statueMat, 0, 10.1, 0, christGroup)
  christArms.castShadow = false
  const christHead = new THREE.Mesh(new THREE.SphereGeometry(1.15, 12, 8), statueMat)
  christHead.position.y = 12.4
  christGroup.add(christHead)
  const haloMat = new THREE.SpriteMaterial({ map: glowTexture(), color: 0xff9e72, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending })
  const halo = new THREE.Sprite(haloMat)
  halo.position.set(0, 12.6, -1.8)
  halo.scale.set(10, 10, 1)
  christGroup.add(halo)
  group.add(christGroup)
  const hill = new THREE.Mesh(new THREE.SphereGeometry(28, 16, 10), mountainMat2)
  hill.position.set(-25, -9, -98)
  hill.scale.set(1.3, 0.7, 0.7)
  group.add(hill)

  // Distant favela hills with lit windows.
  const distantWall = standard(0x1d1c29, { roughness: 1 })
  const windowColors = [0xffbd6c, 0xffdf91, 0x6edbcf, 0xff7c8d]
  for (let i = 0; i < 58; i++) {
    const side = i % 2 ? 1 : -1
    const x = side * (36 + Math.random() * 54)
    const z = -55 - Math.random() * 65
    const w = 2.2 + Math.random() * 5
    const h = 2.2 + Math.random() * 7
    const d = 2 + Math.random() * 4
    const b = box(w, h, d, distantWall, x, h / 2 - 2 + Math.random() * 4, z, group)
    b.castShadow = false
    b.receiveShadow = false
    if (Math.random() > 0.25) {
      const wm = new THREE.MeshBasicMaterial({ color: windowColors[i % windowColors.length], transparent: true, opacity: 0.8 })
      const win = plane(0.24 + Math.random() * 0.2, 0.3, wm, x + (side > 0 ? -w / 2 - 0.01 : w / 2 + 0.01), b.position.y + Math.random() * h * 0.32, z, group)
      win.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2
    }
  }

  // ---------------------------------------------------------------- GROUND
  const groundMat = new THREE.MeshStandardMaterial({
    map: groundTexture(),
    color: 0xffffff,
    roughness: 0.88,
    metalness: 0.04,
  })
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(ARENA + 4, ARENA + 4), groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  group.add(ground)
  hit(ground)

  // Painted roda circle.
  const paintMat = new THREE.MeshBasicMaterial({ color: 0xd9ff45, transparent: true, opacity: 0.33, depthWrite: false })
  const ring = new THREE.Mesh(new THREE.RingGeometry(5.8, 6.02, 80), paintMat)
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.021
  group.add(ring)
  const innerRing = new THREE.Mesh(new THREE.RingGeometry(2.2, 2.28, 64), new THREE.MeshBasicMaterial({ color: 0xff3e80, transparent: true, opacity: 0.32, depthWrite: false }))
  innerRing.rotation.x = -Math.PI / 2
  innerRing.position.y = 0.022
  group.add(innerRing)
  const crossMat = new THREE.MeshBasicMaterial({ color: 0xd9ff45, transparent: true, opacity: 0.17, depthWrite: false })
  for (let i = 0; i < 4; i++) {
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.16), crossMat)
    dash.rotation.x = -Math.PI / 2
    dash.rotation.z = (i / 4) * Math.PI * 2
    dash.position.set(Math.cos((i / 4) * Math.PI * 2) * 8.3, 0.022, Math.sin((i / 4) * Math.PI * 2) * 8.3)
    group.add(dash)
  }
  // Ground lettering.
  const groundText = document.createElement('canvas')
  groundText.width = 1024
  groundText.height = 256
  const gtx = groundText.getContext('2d')
  gtx.clearRect(0, 0, 1024, 256)
  gtx.textAlign = 'center'
  gtx.textBaseline = 'middle'
  gtx.font = '700 150px Impact, "Arial Black", sans-serif'
  gtx.fillStyle = 'rgba(217,255,69,.2)'
  gtx.fillText('LARGO DA ESPERANÇA', 512, 128)
  const gTex = new THREE.CanvasTexture(groundText)
  gTex.colorSpace = THREE.SRGBColorSpace
  const gMesh = new THREE.Mesh(new THREE.PlaneGeometry(15, 3.75), new THREE.MeshBasicMaterial({ map: gTex, transparent: true, depthWrite: false }))
  gMesh.rotation.x = -Math.PI / 2
  gMesh.position.set(0, 0.025, 10.5)
  group.add(gMesh)

  // Puddles.
  const puddleMat = new THREE.MeshStandardMaterial({ color: 0x0b1b20, metalness: 0.75, roughness: 0.18, transparent: true, opacity: 0.62 })
  for (const [x, z, r] of [[-4, 7, 1.4], [8, -4, 1.1], [-13, -2, 0.9], [13, 12, 1.3]]) {
    const p = new THREE.Mesh(new THREE.CircleGeometry(r, 24), puddleMat)
    p.rotation.x = -Math.PI / 2
    p.position.set(x, 0.018, z)
    group.add(p)
  }

  // ---------------------------------------------------------------- LIGHTS
  scene.add(new THREE.HemisphereLight(0x9ecfff, 0x3e1e14, 0.95))
  const sun = new THREE.DirectionalLight(0xffb076, 2.8)
  sun.position.set(-34, 38, -24)
  sun.castShadow = true
  sun.shadow.mapSize.set(quality === 'mobile' ? 1024 : 2048, quality === 'mobile' ? 1024 : 2048)
  sun.shadow.camera.left = -34
  sun.shadow.camera.right = 34
  sun.shadow.camera.top = 34
  sun.shadow.camera.bottom = -34
  sun.shadow.camera.near = 1
  sun.shadow.camera.far = 100
  sun.shadow.bias = -0.00045
  sun.shadow.normalBias = 0.035
  scene.add(sun)
  const fill = new THREE.DirectionalLight(0x5b5cff, 0.36)
  fill.position.set(24, 16, 20)
  scene.add(fill)

  const neonLights = []
  const addPointLight = (color, x, y, z, intensity, distance) => {
    const light = new THREE.PointLight(color, intensity, distance, 2)
    light.position.set(x, y, z)
    scene.add(light)
    neonLights.push(light)
    return light
  }
  addPointLight(0xff3e80, -10, 4.2, -8, 18, 13)
  addPointLight(0xd9ff45, 9, 4.5, -2, 15, 12)
  addPointLight(0x46f2d0, 0, 5.2, -18, 14, 13)
  addPointLight(0xffa24a, 12, 3.2, 10, 12, 11)

  // ---------------------------------------------------------------- BUILDINGS
  const palette = [
    ['#b65b3d', '#74392b'], ['#c98448', '#84502e'], ['#3f8c7b', '#245a52'],
    ['#8f5e9e', '#5b3968'], ['#cfb76d', '#8d7941'], ['#b74f67', '#733146'],
    ['#5b7f9e', '#365467'], ['#a66d3d', '#684124'],
  ]
  const windowPalette = [0xffc26b, 0xffe6a2, 0x74e4d4, 0xff8ca0, 0xa7e9ff]
  const signData = [
    { text: 'AÇAÍ', color: '#c792ff', sub: 'DO ZÉ' },
    { text: 'SAMBA', color: '#d9ff45', sub: 'ATÉ CAIR' },
    { text: 'BAR DO ZÉ', color: '#ff3e80', sub: 'GELADA' },
    { text: 'MORRO', color: '#46f2d0', sub: '2099' },
  ]

  function facadeBuilding(x, z, w, d, h, paletteIndex, face, opts = {}) {
    const [base, trim] = palette[paletteIndex % palette.length]
    const mat = wallMaterial(base, trim)
    const b = box(w, h, d, mat, x, h / 2, z, group)
    hit(b)
    // Roof slab and lip.
    const roof = box(w + 0.25, 0.22, d + 0.25, standard(0x302d28, { roughness: 1 }), x, h + 0.08, z, group)
    roof.castShadow = true
    hit(roof)
    const lip = box(w + 0.5, 0.22, 0.24, standard(0x1d1b1a, { roughness: 1 }), x, h + 0.27, z + d / 2, group)
    lip.castShadow = false

    // Face coordinate helper.
    const out = 0.012
    let fx = x, fz = z, rot = 0
    if (face === '+z') { fz = z + d / 2 + out; rot = 0 }
    if (face === '-z') { fz = z - d / 2 - out; rot = Math.PI }
    if (face === '+x') { fx = x + w / 2 + out; rot = Math.PI / 2 }
    if (face === '-x') { fx = x - w / 2 - out; rot = -Math.PI / 2 }
    const span = face.includes('z') ? w : d
    const tangent = face.includes('z') ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1)

    // Windows.
    const floors = Math.max(1, Math.floor(h / 2.9))
    const cols = Math.max(1, Math.floor(span / 2.6))
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.12) continue
        const offset = (c - (cols - 1) / 2) * (span / cols)
        const wy = 1.6 + f * 2.55
        if (wy + 0.55 > h) continue
        const wx = fx + tangent.x * offset
        const wz = fz + tangent.z * offset
        const frame = box(0.98, 1.28, 0.08, standard(0x241c1b, { roughness: 0.8 }), wx, wy, wz, group)
        frame.rotation.y = rot
        frame.castShadow = false
        const glow = emissivePlane(0.78, 1.06, windowPalette[(f + c + paletteIndex) % windowPalette.length], wx, wy, wz, group, 0.9 + Math.random() * 1.5)
        glow.rotation.y = rot
        glow.translateZ(0.05)
        if (Math.random() > 0.55) {
          const curtain = box(0.78, 1.02, 0.03, standard(0x17151a, { roughness: 1 }), wx, wy, wz, group)
          curtain.rotation.y = rot
          curtain.translateZ(0.065)
          curtain.castShadow = false
        }
        if (Math.random() > 0.82) {
          const ac = box(0.56, 0.34, 0.3, standard(0xaeb3a1, { roughness: 0.7, metalness: 0.2 }), wx + 0.8, wy - 0.62, wz, group)
          ac.rotation.y = rot
          ac.translateZ(0.15)
          ac.castShadow = false
        }
      }
    }

    // Door.
    const door = box(1.1, 2.2, 0.12, standard(0x2b1c18, { roughness: 0.85 }), fx, 1.1, fz, group)
    door.rotation.y = rot
    door.castShadow = false
    const doorFrame = box(1.38, 2.42, 0.08, standard(0x10100f, { roughness: 0.8 }), fx, 1.21, fz, group)
    doorFrame.rotation.y = rot
    doorFrame.translateZ(-0.03)

    // Awning / balcony.
    if (opts.awning) {
      const awnMat = new THREE.MeshStandardMaterial({ map: awningTexture(opts.awning[0], opts.awning[1]), roughness: 0.9, side: THREE.DoubleSide })
      const awn = plane(Math.min(span - 1, 4.4), 1.4, awnMat, fx, 2.65, fz, group)
      awn.rotation.y = rot
      awn.rotation.x = -0.22
      awn.translateZ(0.65)
      awn.castShadow = true
    }

    if (opts.balcony) {
      const balc = box(Math.min(span - 1.6, 4), 0.16, 1.1, standard(0x38322b, { roughness: 1 }), fx, 3.5, fz, group)
      balc.rotation.y = rot
      balc.translateZ(0.5)
      for (let i = 0; i < 5; i++) {
        const bar = box(0.04, 0.75, 0.04, standard(0x171716, { roughness: 0.7, metalness: 0.4 }), fx + tangent.x * (i - 2) * 0.78, 3.95, fz + tangent.z * (i - 2) * 0.78, group)
        bar.rotation.y = rot
        bar.translateZ(0.98)
        bar.castShadow = false
      }
      const rail = box(Math.min(span - 1.6, 4), 0.05, 0.05, standard(0x171716, { roughness: 0.7, metalness: 0.4 }), fx, 4.35, fz, group)
      rail.rotation.y = rot
      rail.translateZ(0.98)
      rail.castShadow = false
    }

    // Laundry.
    if (opts.laundry) {
      const line = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 3.4, 4), standard(0x1a1a18, { roughness: 1 }))
      line.rotation.z = Math.PI / 2
      line.rotation.y = rot
      line.position.set(fx, 4.7, fz)
      line.translateZ(0.45)
      group.add(line)
      const clothColors = [0xff4e7b, 0xf0e4c5, 0x49d6bf, 0xffcb45, 0xa78bfa]
      for (let i = 0; i < 5; i++) {
        const cloth = plane(0.62, 0.8, new THREE.MeshStandardMaterial({ color: clothColors[i % clothColors.length], roughness: 0.9, side: THREE.DoubleSide }), fx + tangent.x * (i - 2) * 0.7, 4.25, fz + tangent.z * (i - 2) * 0.7, group)
        cloth.rotation.y = rot
        cloth.translateZ(0.48)
        cloth.castShadow = false
      }
    }

    // Rooftop water tank.
    if (opts.tank) {
      const tank = cylinder(0.9, 0.9, 1.6, 12, standard(0x1f4a54, { roughness: 0.65, metalness: 0.25 }), x + w * 0.22, h + 1.15, z - d * 0.15, group)
      tank.castShadow = true
      for (let i = 0; i < 3; i++) {
        const leg = box(0.08, 0.55, 0.08, standard(0x161616, { roughness: 0.8 }), x + w * 0.22 + Math.cos(i * 2.1) * 0.65, h + 0.45, z - d * 0.15 + Math.sin(i * 2.1) * 0.65, group)
        leg.castShadow = false
      }
    }

    // Satellite dish.
    if (opts.dish) {
      const dish = new THREE.Mesh(new THREE.SphereGeometry(0.65, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.42), standard(0xb9b4a6, { roughness: 0.55, metalness: 0.3, side: THREE.DoubleSide }))
      dish.position.set(x - w * 0.2, h + 0.9, z + d * 0.2)
      dish.rotation.set(0.6, 0.5, 0)
      dish.castShadow = true
      group.add(dish)
      const pole = box(0.06, 1.2, 0.06, standard(0x222222, { roughness: 0.7 }), x - w * 0.2, h + 0.45, z + d * 0.2, group)
      pole.castShadow = false
    }

    // Antenna.
    if (opts.antenna) {
      const pole = cylinder(0.025, 0.04, 2.2, 4, standard(0x1b1b1a, { roughness: 0.8, metalness: 0.4 }), x + w * 0.3, h + 1.2, z + d * 0.25, group)
      pole.castShadow = false
      const cross = box(0.8, 0.04, 0.04, standard(0x1b1b1a, { roughness: 0.8 }), x + w * 0.3, h + 1.8, z + d * 0.25, group)
      cross.castShadow = false
    }

    return { b, fx, fz, rot, span, face }
  }

  // Back row.
  const back = [
    [-20, -28, 11, 7, 11, 0, true, true, false, ['#e04a4a', '#f2e8c8']],
    [-9, -29, 9, 7, 8, 2, true, false, true, null],
    [0.5, -30, 10, 8, 15, 3, true, true, false, null],
    [11, -29, 9, 7, 9, 5, true, false, true, ['#d9ff45', '#1a2a1e']],
    [21, -28, 10, 7, 12, 6, true, true, false, null],
  ]
  back.forEach((b, i) => facadeBuilding(b[0], b[1], b[2], b[3], b[4], b[5], '+z', {
    awning: b[9], balcony: b[6], laundry: b[7], tank: i % 2 === 0, dish: i % 3 === 0, antenna: i % 2 === 1,
  }))

  // Left row.
  const left = [
    [-29, -18, 7, 10, 10, 1, true, true, false, null],
    [-30, -6, 8, 9, 13, 4, true, false, true, ['#ff3e80', '#1b1019']],
    [-29, 5, 7, 9, 8, 7, true, true, false, null],
    [-30, 16, 8, 10, 12, 0, true, false, true, null],
  ]
  left.forEach((b, i) => facadeBuilding(b[0], b[1], b[2], b[3], b[4], b[5], '+x', {
    awning: b[9], balcony: b[6], laundry: b[7], tank: i % 2 === 1, dish: i % 2 === 0, antenna: i % 3 === 1,
  }))

  // Right row.
  const right = [
    [29, -19, 7, 9, 9, 5, true, false, true, null],
    [30, -8, 8, 9, 14, 2, true, true, false, ['#46f2d0', '#102a26']],
    [29, 3, 7, 10, 10, 6, true, false, true, null],
    [30, 15, 8, 9, 8, 3, true, true, false, null],
  ]
  right.forEach((b, i) => facadeBuilding(b[0], b[1], b[2], b[3], b[4], b[5], '-x', {
    awning: b[9], balcony: b[6], laundry: b[7], tank: i % 2 === 0, dish: i % 2 === 1, antenna: i % 3 === 0,
  }))

  // Front row (behind spawn).
  const front = [
    [-18, 29, 11, 7, 10, 4, true, false, true, null],
    [-5, 30, 10, 8, 14, 1, true, true, false, ['#ffb347', '#2b1b14']],
    [7, 29, 9, 7, 8, 7, true, false, true, null],
    [19, 30, 11, 8, 12, 2, true, true, false, null],
  ]
  front.forEach((b, i) => facadeBuilding(b[0], b[1], b[2], b[3], b[4], b[5], '-z', {
    awning: b[9], balcony: b[6], laundry: b[7], tank: i % 2 === 1, dish: i % 2 === 0, antenna: i % 3 === 0,
  }))

  // Neon signs on selected facades.
  const signPlacements = [
    { x: -9, y: 5.4, z: -25.35, rot: 0, data: signData[0], light: 0xc792ff },
    { x: 0.5, y: 8.2, z: -25.9, rot: 0, data: signData[3], light: 0x46f2d0 },
    { x: -25.4, y: 6.8, z: -6, rot: Math.PI / 2, data: signData[1], light: 0xd9ff45 },
    { x: 25.4, y: 6.6, z: -8, rot: -Math.PI / 2, data: signData[2], light: 0xff3e80 },
  ]
  signPlacements.forEach((s, i) => {
    const tex = signTexture(s.data.text, s.data.color, s.data.sub)
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide })
    const mesh = plane(i === 1 ? 4.4 : 3.4, i === 1 ? 2.2 : 1.7, mat, s.x, s.y, s.z, group)
    mesh.rotation.y = s.rot
    mesh.renderOrder = 2
    if (i === 1) flickers.push({ mesh, base: 1, phase: Math.random() * 10, speed: 9 })
    const glowMat = new THREE.SpriteMaterial({ map: glowTexture(), color: s.light, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending })
    const glow = new THREE.Sprite(glowMat)
    glow.position.set(s.x, s.y, s.z)
    glow.scale.set(6, 4, 1)
    group.add(glow)
  })

  // Graffiti on walls.
  const graffitiData = [
    { x: -15, y: 1.9, z: -25.42, rot: 0, text: 'MORRO VIVE', color: '#d9ff45' },
    { x: 17, y: 2.2, z: 25.42, rot: Math.PI, text: 'SAMBA', color: '#ff3e80' },
    { x: -25.42, y: 2.0, z: 10, rot: Math.PI / 2, text: 'RESISTE', color: '#46f2d0' },
  ]
  graffitiData.forEach((g) => {
    const mat = new THREE.MeshBasicMaterial({ map: graffitiTexture(g.text, g.color), transparent: true, depthWrite: false, side: THREE.DoubleSide })
    const mesh = plane(5.2, 2.6, mat, g.x, g.y, g.z, group)
    mesh.rotation.y = g.rot
    mesh.renderOrder = 1
  })

  // ---------------------------------------------------------------- STREET PROPS
  function addColliderFor(mesh, hx, hz) {
    collide(mesh.position.x, mesh.position.z, hx, hz)
    hit(mesh)
  }

  // Market stall — Açaí do Zé.
  const stall = new THREE.Group()
  stall.position.set(-8.5, 0, -6.2)
  stall.rotation.y = 0.16
  group.add(stall)
  const wood = standard(0x6b4227, { roughness: 0.88 })
  for (const [x, z] of [[-2.2, -1.2], [2.2, -1.2], [-2.2, 1.2], [2.2, 1.2]]) cylinder(0.07, 0.08, 3.0, 6, standard(0x3b2b1e, { roughness: 0.9 }), x, 1.5, z, stall)
  box(4.7, 0.18, 2.9, standard(0x2d2118, { roughness: 0.95 }), 0, 2.95, 0, stall)
  const awnMat = new THREE.MeshStandardMaterial({ map: awningTexture('#7a3c8f', '#f0dfb1'), roughness: 0.9, side: THREE.DoubleSide })
  const awn = plane(5.1, 3.3, awnMat, 0, 3.02, 0.25, stall)
  awn.rotation.x = -Math.PI / 2
  awn.rotation.z = 0.05
  awn.castShadow = true
  box(4.5, 0.95, 0.75, wood, 0, 0.52, 0.85, stall)
  box(4.3, 0.07, 0.86, standard(0x9b6a3b, { roughness: 0.8 }), 0, 1.03, 0.85, stall)
  for (let i = 0; i < 5; i++) {
    const bowl = cylinder(0.28, 0.2, 0.24, 10, standard(i % 2 ? 0x5d2c7e : 0x3d1f58, { roughness: 0.7 }), -1.5 + i * 0.72, 1.18, 0.84, stall)
    bowl.castShadow = false
    const top = cylinder(0.22, 0.22, 0.025, 10, standard(0x7a3e9c, { roughness: 0.55 }), -1.5 + i * 0.72, 1.31, 0.84, stall)
    top.castShadow = false
  }
  const stallSign = plane(2.7, 1.35, new THREE.MeshBasicMaterial({ map: signTexture('AÇAÍ', '#d5a6ff', 'DO ZÉ'), transparent: true }), 0, 3.55, 1.56, stall)
  stallSign.rotation.y = Math.PI
  const stallHit = box(4.7, 3.0, 2.9, new THREE.MeshBasicMaterial({ visible: false }), 0, 1.5, 0, stall)
  hit(stallHit)
  collide(stall.position.x, stall.position.z, 2.5, 1.7)

  // Speaker stack / soundsystem.
  const speaker = new THREE.Group()
  speaker.position.set(10, 0, -1.5)
  speaker.rotation.y = -0.25
  group.add(speaker)
  box(2.6, 0.35, 1.6, standard(0x151515, { roughness: 0.8 }), 0, 0.17, 0, speaker)
  box(2.4, 2.1, 1.4, standard(0x171918, { roughness: 0.7, metalness: 0.2 }), 0, 1.4, 0, speaker)
  for (const [x, y] of [[-0.65, 1.1], [0.65, 1.1], [0, 2.05]]) {
    const cone = cylinder(0.34, 0.42, 0.12, 16, standard(0x0a0a0a, { roughness: 0.55 }), x, y, 0.73, speaker)
    cone.rotation.x = Math.PI / 2
    const rim = cylinder(0.45, 0.45, 0.07, 20, standard(0xd9ff45, { roughness: 0.4, emissive: 0xd9ff45, emissiveIntensity: 1.5 }), x, y, 0.79, speaker)
    rim.rotation.x = Math.PI / 2
    rim.castShadow = false
  }
  box(2.6, 0.06, 0.05, standard(0xff3e80, { roughness: 0.3, emissive: 0xff3e80, emissiveIntensity: 2 }), 0, 2.53, 0.72, speaker)
  hit(box(2.5, 2.5, 1.5, new THREE.MeshBasicMaterial({ visible: false }), 0, 1.25, 0, speaker))
  collide(10, -1.5, 1.4, 0.9)

  // Food cart with umbrella.
  const cart = new THREE.Group()
  cart.position.set(10.5, 0, -12.5)
  cart.rotation.y = 0.5
  group.add(cart)
  box(2.4, 1.15, 1.2, standard(0x4b7d86, { roughness: 0.7, metalness: 0.25 }), 0, 0.82, 0, cart)
  box(2.6, 0.1, 1.35, standard(0xf0d566, { roughness: 0.75 }), 0, 1.43, 0, cart)
  for (const x of [-0.82, 0.82]) {
    const wheel = cylinder(0.27, 0.27, 0.16, 12, standard(0x111111, { roughness: 0.9 }), x, 0.28, 0.55, cart)
    wheel.rotation.z = Math.PI / 2
  }
  cylinder(0.035, 0.035, 3.1, 6, standard(0x222222, { roughness: 0.7, metalness: 0.4 }), 0, 2.2, 0, cart)
  const umbrellaMat = new THREE.MeshStandardMaterial({ color: 0xff9b3d, roughness: 0.8, side: THREE.DoubleSide })
  const umbrella = new THREE.Mesh(new THREE.ConeGeometry(2.0, 0.55, 12, 1, true), umbrellaMat)
  umbrella.position.set(0, 3.75, 0)
  umbrella.castShadow = true
  cart.add(umbrella)
  for (let i = 0; i < 12; i++) {
    const stripe = new THREE.Mesh(new THREE.ConeGeometry(2.01, 0.56, 12, 1, true, (i / 12) * Math.PI * 2, Math.PI * 2 / 24), new THREE.MeshStandardMaterial({ color: i % 2 ? 0xffd45a : 0xff9b3d, roughness: 0.8, side: THREE.DoubleSide }))
    stripe.position.y = 3.75
    cart.add(stripe)
  }
  hit(box(2.4, 1.5, 1.3, new THREE.MeshBasicMaterial({ visible: false }), 0, 0.75, 0, cart))
  collide(10.5, -12.5, 1.3, 0.9)

  // Concrete barriers.
  const barrierPositions = [[-4.5, -12.5, 0.2], [5.2, 7.2, -0.3], [-13, 8.5, 0.4], [14.5, 5.5, 0.1]]
  barrierPositions.forEach(([x, z, r], i) => {
    const b = new THREE.Group()
    b.position.set(x, 0, z)
    b.rotation.y = r
    group.add(b)
    box(3.2, 0.95, 0.7, standard(0x8d8b80, { roughness: 0.95 }), 0, 0.48, 0, b)
    box(3.3, 0.16, 0.82, standard(0x5c5b55, { roughness: 0.95 }), 0, 1.0, 0, b)
    const stripe = box(1.4, 0.18, 0.72, standard(i % 2 ? 0xffd23f : 0xd9ff45, { roughness: 0.7 }), 0, 0.7, 0, b)
    stripe.castShadow = false
    hit(box(3.2, 1.0, 0.7, new THREE.MeshBasicMaterial({ visible: false }), 0, 0.5, 0, b))
    collide(x, z, 1.7, 0.5)
  })

  // Crates & barrels.
  const cratePositions = [[-14, -10, 0.2], [13.5, 9.5, -0.4], [-15.5, 14, 0.5], [16.5, -15, 0.1]]
  cratePositions.forEach(([x, z, r], i) => {
    const c = new THREE.Group()
    c.position.set(x, 0, z)
    c.rotation.y = r
    group.add(c)
    for (let j = 0; j < 3; j++) {
      const s = 0.72 - j * 0.08
      box(s, s, s, standard(j === 0 ? 0x81522f : 0x9a6539, { roughness: 0.9 }), j * 0.2 - 0.2, s / 2 + j * 0.64, j * 0.16, c)
      const band = box(s + 0.02, 0.06, s + 0.02, standard(0x3a2a1c, { roughness: 1 }), j * 0.2 - 0.2, s / 2 + j * 0.64, j * 0.16, c)
      band.castShadow = false
    }
    hit(box(1.5, 1.8, 1.1, new THREE.MeshBasicMaterial({ visible: false }), 0, 0.9, 0, c))
    collide(x, z, 0.9, 0.7)
  })

  const barrelPositions = [[-17.5, -4], [7, 13], [18.5, -7], [-9, 14]]
  barrelPositions.forEach(([x, z], i) => {
    const g = new THREE.Group()
    g.position.set(x, 0, z)
    group.add(g)
    const barrel = cylinder(0.46, 0.5, 1.15, 14, standard(i % 2 ? 0x365b67 : 0x75423b, { roughness: 0.7, metalness: 0.25 }), 0, 0.58, 0, g)
    const rim = cylinder(0.5, 0.5, 0.08, 14, standard(0x222222, { roughness: 0.6, metalness: 0.4 }), 0, 1.0, 0, g)
    rim.castShadow = false
    const band = cylinder(0.51, 0.51, 0.05, 14, standard(0xd9ff45, { roughness: 0.5 }), 0, 0.66, 0, g)
    band.castShadow = false
    hit(box(1.0, 1.2, 1.0, new THREE.MeshBasicMaterial({ visible: false }), 0, 0.6, 0, g))
    collide(x, z, 0.55, 0.55)
  })

  // Tire stacks.
  const tireMat = standard(0x141414, { roughness: 0.95 })
  for (const [x, z] of [[-19, -17], [19, -18], [19.5, 17]]) {
    const g = new THREE.Group()
    g.position.set(x, 0, z)
    group.add(g)
    for (let i = 0; i < 4; i++) {
      const tire = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.16, 8, 16), tireMat)
      tire.rotation.x = Math.PI / 2
      tire.position.y = 0.17 + i * 0.26
      tire.castShadow = true
      g.add(tire)
    }
    collide(x, z, 0.6, 0.6)
  }

  // Samba stage at the back.
  const stage = new THREE.Group()
  stage.position.set(0, 0, -19.5)
  group.add(stage)
  box(8.5, 0.7, 4.4, standard(0x33221a, { roughness: 0.9 }), 0, 0.35, 0, stage)
  box(8.8, 0.14, 4.7, standard(0x101010, { roughness: 0.8 }), 0, 0.72, 0, stage)
  for (let i = 0; i < 3; i++) {
    const drum = cylinder(0.42 - i * 0.04, 0.48 - i * 0.04, 1.0, 14, standard(0x8d5a36, { roughness: 0.75 }), -1.6 + i * 1.6, 1.32, 0.2, stage)
    drum.rotation.z = 0.04 * i
    const skin = cylinder(0.43 - i * 0.04, 0.43 - i * 0.04, 0.06, 14, standard(0xf1d6a7, { roughness: 0.8 }), -1.6 + i * 1.6, 1.84, 0.2, stage)
    skin.castShadow = false
  }
  const stageNeon = box(7.5, 0.08, 0.08, standard(0xff3e80, { emissive: 0xff3e80, emissiveIntensity: 2.4, roughness: 0.3 }), 0, 3.2, -2.1, stage)
  stageNeon.castShadow = false
  for (const x of [-3.6, 3.6]) cylinder(0.08, 0.08, 3.2, 6, standard(0x242424, { roughness: 0.7 }), x, 2.3, -2.1, stage)
  hit(box(8.5, 0.8, 4.5, new THREE.MeshBasicMaterial({ visible: false }), 0, 0.4, 0, stage))
  collide(0, -19.5, 4.3, 2.3)

  // Palm trees.
  function palmTree(x, z, scale = 1) {
    const g = new THREE.Group()
    g.position.set(x, 0, z)
    g.scale.setScalar(scale)
    group.add(g)
    const trunkMat = standard(0x6a4a2d, { roughness: 0.95 })
    let y = 0
    for (let i = 0; i < 5; i++) {
      const seg = cylinder(0.14 - i * 0.012, 0.17 - i * 0.012, 1.2, 7, trunkMat, Math.sin(i * 0.7) * 0.16, 0.6 + i * 1.05, Math.cos(i * 0.7) * 0.12, g)
      seg.rotation.z = 0.06 * i
      y = seg.position.y + 0.6
    }
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2f6b3f, roughness: 0.85, side: THREE.DoubleSide })
    const leafGeo = new THREE.ConeGeometry(0.24, 3.0, 4, 1, true)
    for (let i = 0; i < 7; i++) {
      const leaf = new THREE.Mesh(leafGeo, leafMat)
      leaf.position.set(Math.sin(i * 1.2) * 0.1, y, Math.cos(i * 1.2) * 0.1)
      leaf.rotation.z = Math.PI / 2.5
      leaf.rotation.y = (i / 7) * Math.PI * 2
      leaf.castShadow = true
      g.add(leaf)
      palms.push({ leaf, phase: Math.random() * 10, baseZ: leaf.rotation.z })
    }
    for (let i = 0; i < 3; i++) {
      const coconut = new THREE.Mesh(new THREE.SphereGeometry(0.12, 7, 5), standard(0x3b2b1d, { roughness: 0.9 }))
      coconut.position.set(Math.cos(i * 2.1) * 0.28, y - 0.2, Math.sin(i * 2.1) * 0.28)
      g.add(coconut)
    }
    collide(x, z, 0.3, 0.3)
  }
  palmTree(-18.5, 13.5, 1.05)
  palmTree(18.5, 14.5, 0.9)
  palmTree(17, -18, 1.15)
  palmTree(-17, -17.5, 0.8)

  // Street lamps.
  function streetLamp(x, z, color) {
    const g = new THREE.Group()
    g.position.set(x, 0, z)
    group.add(g)
    cylinder(0.07, 0.11, 5.3, 6, standard(0x2a2b2b, { roughness: 0.65, metalness: 0.4 }), 0, 2.65, 0, g)
    const arm = box(1.2, 0.07, 0.07, standard(0x2a2b2b, { roughness: 0.65, metalness: 0.4 }), 0.5, 5.2, 0, g)
    arm.castShadow = false
    const head = box(0.55, 0.14, 0.34, standard(0xfff3c4, { emissive: color, emissiveIntensity: 2.6, roughness: 0.4 }), 1.05, 5.14, 0, g)
    head.castShadow = false
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color, transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.AdditiveBlending }))
    glow.position.set(1.05, 5.1, 0)
    glow.scale.set(2.4, 2.4, 1)
    g.add(glow)
    collide(x, z, 0.2, 0.2)
  }
  streetLamp(-16.5, -6.5, 0xffd36a)
  streetLamp(16.5, 7, 0x46f2d0)

  // Bushes / plants.
  const bushMat = new THREE.MeshStandardMaterial({ color: 0x1f4b2f, roughness: 0.95 })
  for (let i = 0; i < 14; i++) {
    const x = (Math.random() - 0.5) * 42
    const z = (Math.random() - 0.5) * 42
    if (Math.hypot(x, z) < 9) continue
    const bush = new THREE.Mesh(new THREE.IcosahedronGeometry(0.35 + Math.random() * 0.45, 0), bushMat)
    bush.position.set(x, 0.3, z)
    bush.scale.y = 0.7
    bush.castShadow = true
    group.add(bush)
  }

  // ---------------------------------------------------------------- STRING LIGHTS + FLAGS
  function catenary(a, b, sag, steps = 12) {
    const pts = []
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const x = THREE.MathUtils.lerp(a.x, b.x, t)
      const y = THREE.MathUtils.lerp(a.y, b.y, t) - Math.sin(t * Math.PI) * sag
      const z = THREE.MathUtils.lerp(a.z, b.z, t)
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }

  function stringLights(a, b, sag, count, color = 0xffd36a) {
    const pts = catenary(a, b, sag, 24)
    const curve = new THREE.CatmullRomCurve3(pts)
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.012, 4, false), standard(0x171713, { roughness: 1 }))
    tube.castShadow = false
    group.add(tube)
    const bulbMat = new THREE.MeshBasicMaterial({ color })
    for (let i = 1; i < count; i++) {
      const p = curve.getPoint(i / count)
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.065, 6, 4), bulbMat)
      bulb.position.copy(p)
      bulb.position.y -= 0.06
      group.add(bulb)
    }
    return curve
  }

  function flagRow(a, b, sag, count) {
    const pts = catenary(a, b, sag, 30)
    const curve = new THREE.CatmullRomCurve3(pts)
    const colors = [0xd9ff45, 0xffd23f, 0xff3e80, 0x46f2d0, 0xf0f5e8]
    const mats = colors.map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9, side: THREE.DoubleSide }))
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute([-0.19, 0, 0, 0.19, 0, 0, 0, -0.42, 0], 3))
    geo.computeVertexNormals()
    for (let i = 0; i < count; i++) {
      const p = curve.getPoint((i + 0.5) / count)
      const next = curve.getPoint(Math.min(1, (i + 1.1) / count))
      const flag = new THREE.Mesh(geo, mats[i % mats.length])
      flag.position.copy(p)
      flag.rotation.y = Math.atan2(next.x - p.x, next.z - p.z)
      flag.userData.phase = Math.random() * 10
      flag.userData.baseRot = flag.rotation.y
      flag.castShadow = false
      group.add(flag)
      flags.push(flag)
    }
    const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.008, 3, false), standard(0x191915, { roughness: 1 }))
    group.add(wire)
  }

  stringLights(new THREE.Vector3(-23, 8.6, -16), new THREE.Vector3(23, 7.8, -16), 2.2, 25)
  stringLights(new THREE.Vector3(-23, 7.2, 2), new THREE.Vector3(23, 8.4, 2), 1.8, 24, 0xff8ab0)
  stringLights(new THREE.Vector3(-23, 8.2, 18), new THREE.Vector3(23, 7.4, 18), 2.6, 24, 0x8fffe4)
  flagRow(new THREE.Vector3(-23, 8.9, -8), new THREE.Vector3(23, 8.2, -8), 2.4, 30)
  flagRow(new THREE.Vector3(-23, 7.8, 11), new THREE.Vector3(23, 8.8, 11), 2.0, 28)

  // ---------------------------------------------------------------- ATMOSPHERE
  const confettiCount = quality === 'mobile' ? 130 : 230
  const confettiPos = new Float32Array(confettiCount * 3)
  const confettiCol = new Float32Array(confettiCount * 3)
  const confettiMeta = []
  const confettiColors = [new THREE.Color(0xd9ff45), new THREE.Color(0xff3e80), new THREE.Color(0xffd23f), new THREE.Color(0x46f2d0), new THREE.Color(0xf0f5e8)]
  for (let i = 0; i < confettiCount; i++) {
    confettiPos[i * 3] = (Math.random() - 0.5) * 46
    confettiPos[i * 3 + 1] = 0.5 + Math.random() * 11
    confettiPos[i * 3 + 2] = (Math.random() - 0.5) * 46
    const c = confettiColors[i % confettiColors.length]
    confettiCol[i * 3] = c.r
    confettiCol[i * 3 + 1] = c.g
    confettiCol[i * 3 + 2] = c.b
    confettiMeta.push({ speed: 0.18 + Math.random() * 0.35, phase: Math.random() * 10, sway: 0.3 + Math.random() * 0.7 })
  }
  const confettiGeo = new THREE.BufferGeometry()
  confettiGeo.setAttribute('position', new THREE.BufferAttribute(confettiPos, 3))
  confettiGeo.setAttribute('color', new THREE.BufferAttribute(confettiCol, 3))
  const confetti = new THREE.Points(confettiGeo, new THREE.PointsMaterial({
    size: 0.075,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  }))
  confetti.frustumCulled = false
  group.add(confetti)

  // Smoke from the food cart.
  const smokeTex = cloudTexture()
  for (let i = 0; i < 8; i++) {
    const mat = new THREE.SpriteMaterial({ map: smokeTex, color: 0xbba9a0, transparent: true, opacity: 0.14, depthWrite: false })
    const sprite = new THREE.Sprite(mat)
    sprite.position.set(10.5 + (Math.random() - 0.5) * 0.8, 4.2 + Math.random() * 1.2, -12.5 + (Math.random() - 0.5) * 0.8)
    sprite.scale.set(2.4, 1.1, 1)
    group.add(sprite)
    smoke.push({ sprite, baseY: sprite.position.y, phase: Math.random() * 10, speed: 0.25 + Math.random() * 0.2 })
  }

  // Dust motes around the arena.
  const dustCount = quality === 'mobile' ? 90 : 170
  const dustPos = new Float32Array(dustCount * 3)
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 50
    dustPos[i * 3 + 1] = 0.3 + Math.random() * 8
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 50
  }
  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    size: 0.04,
    color: 0xffd9a8,
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }))
  dust.frustumCulled = false
  group.add(dust)

  // Spawn gates / street beacons.
  spawnPoints.push(
    new THREE.Vector3(-20.2, 0, -20.5),
    new THREE.Vector3(-4, 0, -21.8),
    new THREE.Vector3(15, 0, -21.2),
    new THREE.Vector3(21.2, 0, -8),
    new THREE.Vector3(21.2, 0, 10),
    new THREE.Vector3(10, 0, 21.2),
    new THREE.Vector3(-8, 0, 21.2),
    new THREE.Vector3(-21.2, 0, 9),
  )
  spawnPoints.forEach((p, i) => {
    const gateMat = new THREE.MeshBasicMaterial({ color: i % 2 ? 0xff3e80 : 0xd9ff45, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide })
    const arch = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.035, 5, 20, Math.PI), gateMat)
    arch.position.set(p.x, 2.4, p.z)
    arch.rotation.y = i < 3 ? 0 : i < 5 ? Math.PI / 2 : i < 7 ? Math.PI : -Math.PI / 2
    arch.renderOrder = 2
    group.add(arch)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: i % 2 ? 0xff3e80 : 0xd9ff45, transparent: true, opacity: 0.09, depthWrite: false, blending: THREE.AdditiveBlending }))
    glow.position.set(p.x, 2.0, p.z)
    glow.scale.set(5, 5, 1)
    group.add(glow)
    animatedLights.push({ glow, base: 0.09, phase: Math.random() * 10 })
  })

  // Fine wire fencing at the front edges, just for silhouette.
  const fenceMat = standard(0x2a2c29, { roughness: 0.7, metalness: 0.3 })
  for (const [x, z, r] of [[-24, -3, 0], [24, 3, 0], [3, 24, Math.PI / 2]]) {
    for (let i = 0; i < 8; i++) {
      const pole = box(0.05, 2.1, 0.05, fenceMat, x + (r ? 0 : (i - 3.5) * 1.4), 1.05, z + (r ? (i - 3.5) * 1.4 : 0), group)
      pole.castShadow = false
    }
  }

  // ---------------------------------------------------------------- UPDATE
  const clockStart = performance.now()
  let elapsed = 0
  function update(dt) {
    elapsed += dt
    const t = elapsed
    waterMat.uniforms.uTime.value = t
    sky.position.copy(scene.camera?.position || new THREE.Vector3())
    for (const f of flags) {
      f.rotation.z = Math.sin(t * 2.4 + f.userData.phase) * 0.17
      f.rotation.x = Math.sin(t * 1.7 + f.userData.phase * 0.7) * 0.08
    }
    for (const p of palms) {
      p.leaf.rotation.z = p.baseZ + Math.sin(t * 1.2 + p.phase) * 0.035
    }
    for (const s of smoke) {
      s.sprite.position.y += dt * s.speed
      s.sprite.position.x += Math.sin(t * 0.4 + s.phase) * dt * 0.06
      if (s.sprite.position.y > s.baseY + 3.2) s.sprite.position.y = s.baseY
      s.sprite.material.opacity = 0.08 + Math.sin(t * 0.6 + s.phase) * 0.03
    }
    for (const a of animatedLights) {
      a.glow.material.opacity = a.base + Math.sin(t * 1.8 + a.phase) * 0.025
    }
    for (const f of flickers) {
      const v = 0.75 + Math.sin(t * f.speed + f.phase) * 0.12 + (Math.random() > 0.985 ? -0.45 : 0)
      f.mesh.material.opacity = Math.max(0.25, v)
    }
    // Confetti drift.
    const pos = confettiGeo.attributes.position.array
    for (let i = 0; i < confettiCount; i++) {
      const m = confettiMeta[i]
      pos[i * 3 + 1] -= dt * m.speed
      pos[i * 3] += Math.sin(t * 0.5 + m.phase) * dt * 0.12 * m.sway
      if (pos[i * 3 + 1] < 0.2) {
        pos[i * 3 + 1] = 10 + Math.random() * 2
        pos[i * 3] = (Math.random() - 0.5) * 46
        pos[i * 3 + 2] = (Math.random() - 0.5) * 46
      }
    }
    confettiGeo.attributes.position.needsUpdate = true
    // Dust drift.
    const dpos = dustGeo.attributes.position.array
    for (let i = 0; i < dustCount; i++) {
      dpos[i * 3] += Math.sin(t * 0.3 + i) * dt * 0.035
      dpos[i * 3 + 1] += Math.cos(t * 0.23 + i * 1.7) * dt * 0.02
    }
    dustGeo.attributes.position.needsUpdate = true
  }

  return {
    group,
    colliders,
    hitMeshes,
    spawnPoints,
    update,
    arenaHalf: HALF,
    sunDirection: sunDir,
    lights: neonLights,
    dispose() {
      scene.remove(group)
    },
  }
}
