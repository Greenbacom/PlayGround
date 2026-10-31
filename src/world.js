// Vila Vento — procedural Brazilian seaside plaza, dusk, festa junina.
import * as THREE from 'three'
import {
  rand, randInt, pick, canvasTexture, glowTexture, groundTexture,
  facadeTextures, buntingFlagGeometry, textTexture, clamp, TAU
} from './utils.js'

const UP = new THREE.Vector3(0, 1, 0)

export class World {
  constructor(renderer) {
    this.renderer = renderer
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0x4a2848, 46, 210)
    this.colliders = []
    this.bounds = 26
    this.time = 0
    this.buntingGroups = []
    this.fires = []
    this.capybara = null
    this.animatedLights = []
    this.fireflies = null
    this.capyLook = 0

    this.buildSky()
    this.buildLights()
    this.buildGround()
    this.buildDistant()
    this.buildCityRing()
    this.buildChurch()
    this.buildProps()
    this.buildBunting()
    this.buildFireflies()
    this.buildCapybara()
    this.buildSpawnRing()
  }

  /* ---------------------------------------------------------- sky */
  buildSky() {
    const geo = new THREE.SphereGeometry(260, 32, 20)
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        topColor: { value: new THREE.Color(0x150c2a) },
        midColor: { value: new THREE.Color(0x5c2450) },
        botColor: { value: new THREE.Color(0xff8a4e) },
        sunColor: { value: new THREE.Color(0xffd9a3) },
        sunDir: { value: new THREE.Vector3(-0.42, 0.13, -0.9).normalize() },
      },
      vertexShader: /* glsl */`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */`
        uniform vec3 topColor, midColor, botColor, sunColor, sunDir;
        varying vec3 vDir;
        void main() {
          vec3 d = normalize(vDir);
          float h = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
          vec3 col = mix(botColor, midColor, smoothstep(0.455, 0.57, h));
          col = mix(col, topColor, smoothstep(0.57, 0.92, h));
          float sd = max(dot(d, normalize(sunDir)), 0.0);
          col += sunColor * pow(sd, 380.0) * 2.6;
          col += sunColor * pow(sd, 9.0) * 0.24;
          col += vec3(1.0, 0.4, 0.16) * pow(1.0 - abs(d.y), 9.0) * 0.16;
          gl_FragColor = vec4(col, 1.0);
        }`,
    })
    const sky = new THREE.Mesh(geo, mat)
    sky.frustumCulled = false
    this.scene.add(sky)
    this.sky = sky

    // sun disc
    const sunDir = new THREE.Vector3(-0.42, 0.13, -0.9).normalize()
    const sun = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,231,183,1)', 'rgba(255,140,60,0)'),
      color: 0xffd49a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    }))
    sun.position.copy(sunDir).multiplyScalar(238)
    sun.scale.set(68, 68, 1)
    this.scene.add(sun)

    // stars
    const starPos = []
    for (let i = 0; i < 240; i++) {
      const a = rand(0, TAU)
      const y = rand(0.16, 0.95)
      const r = Math.sqrt(1 - y * y) * 245
      starPos.push(Math.cos(a) * r, y * 245, Math.sin(a) * r)
    }
    const sg = new THREE.BufferGeometry()
    sg.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3))
    this.scene.add(new THREE.Points(sg, new THREE.PointsMaterial({
      color: 0xffe9cf, size: 1.5, sizeAttenuation: false, transparent: true,
      opacity: 0.7, depthWrite: false, fog: false, blending: THREE.AdditiveBlending,
    })))
  }

  buildLights() {
    this.scene.add(new THREE.HemisphereLight(0x9a72ff, 0x4a2432, 2.1))
    const sun = new THREE.DirectionalLight(0xffb277, 2.9)
    sun.position.set(-24, 18, -44)
    this.scene.add(sun)
    const fill = new THREE.DirectionalLight(0x6a8dff, 0.85)
    fill.position.set(20, 10, 30)
    this.scene.add(fill)
    const warm = new THREE.AmbientLight(0x3a2440, 0.7)
    this.scene.add(warm)
  }

  /* ------------------------------------------------------- ground */
  buildGround() {
    const tex = groundTexture()
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(43, 72),
      new THREE.MeshLambertMaterial({ map: tex, color: 0xffffff })
    )
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = false
    this.scene.add(floor)

    // outer ground
    const outer = new THREE.Mesh(
      new THREE.CircleGeometry(320, 48),
      new THREE.MeshLambertMaterial({ color: 0x17121d })
    )
    outer.rotation.x = -Math.PI / 2
    outer.position.y = -0.2
    this.scene.add(outer)

    // sea on the east side
    const sea = new THREE.Mesh(
      new THREE.PlaneGeometry(340, 320),
      new THREE.MeshStandardMaterial({ color: 0x14223c, roughness: 0.22, metalness: 0.35 })
    )
    sea.rotation.x = -Math.PI / 2
    sea.position.set(212, -0.16, -20)
    this.scene.add(sea)

    // sidewalk curb
    const curb = new THREE.Mesh(
      new THREE.TorusGeometry(27.2, 0.22, 6, 90),
      new THREE.MeshLambertMaterial({ color: 0xcfc4ae })
    )
    curb.rotation.x = Math.PI / 2
    curb.position.y = 0.16
    this.scene.add(curb)

    // painted capoeira circle at plaza center
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(3.2, 3.42, 64),
      new THREE.MeshBasicMaterial({ color: 0xffe6b0, transparent: true, opacity: 0.24, side: THREE.DoubleSide, depthWrite: false })
    )
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.015
    this.scene.add(ring)
    const ring2 = ring.clone()
    ring2.geometry = new THREE.RingGeometry(1.1, 1.2, 48)
    ring2.material = ring.material.clone()
    ring2.material.opacity = 0.13
    this.scene.add(ring2)
  }

  /* ----------------------------------------------------- distant */
  buildDistant() {
    const mountainMat = new THREE.MeshLambertMaterial({ color: 0x2a1a33, flatShading: true })
    const hill = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 12), mountainMat)
    hill.scale.set(48, 17, 42)
    hill.position.set(-34, -4, -104)
    this.scene.add(hill)

    // Sugarloaf
    const loaf = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 14), new THREE.MeshLambertMaterial({ color: 0x261a31, flatShading: true }))
    loaf.scale.set(24, 42, 24)
    loaf.position.set(78, 6, -118)
    this.scene.add(loaf)
    const loaf2 = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), new THREE.MeshLambertMaterial({ color: 0x2b1d36, flatShading: true }))
    loaf2.scale.set(17, 27, 17)
    loaf2.position.set(53, 2, -132)
    this.scene.add(loaf2)

    // Cristo silhouette
    const cristo = new THREE.Group()
    const stone = new THREE.MeshLambertMaterial({ color: 0x1c1324, emissive: 0x2a1c33, emissiveIntensity: 0.5 })
    const robe = new THREE.Mesh(new THREE.ConeGeometry(2.6, 11, 7), stone)
    robe.position.y = 5.5
    cristo.add(robe)
    const torso = new THREE.Mesh(new THREE.BoxGeometry(2.2, 4.6, 1.4), stone)
    torso.position.y = 10.4
    cristo.add(torso)
    const arms = new THREE.Mesh(new THREE.BoxGeometry(14, 1.15, 1.15), stone)
    arms.position.y = 11.6
    cristo.add(arms)
    const head = new THREE.Mesh(new THREE.SphereGeometry(1.05, 10, 8), stone)
    head.position.y = 13.3
    cristo.add(head)
    cristo.position.set(-32, 13.5, -100)
    cristo.rotation.y = 0.12
    this.scene.add(cristo)

    // distant city lights
    const pos = []
    const col = []
    for (let i = 0; i < 220; i++) {
      const a = rand(-2.6, 0.6)
      const r = rand(62, 150)
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r - 30
      const y = rand(0.5, 12)
      pos.push(x, y, z)
      const c = new THREE.Color().setHSL(rand(0.07, 0.13), rand(0.5, 1), rand(0.5, 0.7))
      col.push(c.r, c.g, c.b)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
    this.scene.add(new THREE.Points(g, new THREE.PointsMaterial({
      size: 1.7, sizeAttenuation: false, vertexColors: true, transparent: true,
      opacity: 0.85, depthWrite: false, fog: false, blending: THREE.AdditiveBlending,
    })))

    // a few silhouetted palms on the horizon
    for (let i = 0; i < 10; i++) {
      const a = rand(-2.2, 0.3)
      const r = rand(52, 72)
      this.makePalm(Math.cos(a) * r, Math.sin(a) * r, rand(1.2, 2.2), 0.16)
    }
  }

  /* --------------------------------------------------- city ring */
  buildCityRing() {
    const walls = ['#c96a4a', '#3f7f7a', '#d9a441', '#8e4b6b', '#5f7f4e', '#b2543c', '#486b8f', '#c98d55']
    const windows = ['#ffd58a', '#ffb45e', '#ffe8b0', '#ffc078']
    const defs = [
      { a: -0.28, r: 35, w: 10, h: 12, d: 8 },
      { a: 0.22, r: 36, w: 12, h: 9, d: 8 },
      { a: 0.62, r: 35, w: 8, h: 14, d: 7 },
      { a: 1.02, r: 37, w: 11, h: 11, d: 8 },
      { a: 1.48, r: 36, w: 9, h: 8, d: 8 },
      { a: 1.95, r: 36, w: 13, h: 13, d: 8 },
      { a: 2.38, r: 35, w: 9, h: 10, d: 7 },
      { a: 2.85, r: 37, w: 12, h: 15, d: 9 },
      { a: 3.3, r: 36, w: 10, h: 9, d: 8 },
      { a: 3.75, r: 36, w: 8, h: 12, d: 7 },
      { a: 4.18, r: 35, w: 12, h: 10, d: 8 },
      { a: 4.62, r: 37, w: 9, h: 13, d: 7 },
      { a: 5.05, r: 36, w: 11, h: 8, d: 8 },
      { a: 5.5, r: 35, w: 10, h: 14, d: 8 },
      { a: 5.95, r: 37, w: 12, h: 10, d: 9 },
    ]
    defs.forEach((d, i) => {
      const wall = walls[i % walls.length]
      const win = windows[i % windows.length]
      const { map, emissive } = facadeTextures(wall, win)
      const side = new THREE.MeshLambertMaterial({ map, emissive: 0xffffff, emissiveMap: emissive, emissiveIntensity: 0.95 })
      const roof = new THREE.MeshLambertMaterial({ color: 0x2b1c2c })
      const dark = new THREE.MeshLambertMaterial({ color: 0x120b18 })
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(d.w, d.h, d.d), [side, side, roof, dark, side, side])
      const x = Math.cos(d.a) * d.r
      const z = Math.sin(d.a) * d.r
      mesh.position.set(x, d.h / 2 - 0.1, z)
      mesh.lookAt(0, d.h / 2, 0)
      mesh.rotation.y += Math.PI
      this.scene.add(mesh)

      // rooftop clutter
      if (i % 2 === 0) {
        const tank = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1.6, 10), new THREE.MeshLambertMaterial({ color: 0x7d6a5e }))
        tank.position.set(x + rand(-2, 2), d.h + 0.8, z + rand(-2, 2))
        this.scene.add(tank)
      }
      if (i % 3 === 0) {
        const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 4, 4), new THREE.MeshLambertMaterial({ color: 0x2a2230 }))
        ant.position.set(x, d.h + 2, z)
        this.scene.add(ant)
        const tip = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff3344 }))
        tip.position.set(x, d.h + 4, z)
        this.scene.add(tip)
      }
    })

    // low wall segments between buildings
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * TAU
      const x = Math.cos(a) * 30.5
      const z = Math.sin(a) * 30.5
      const wall = new THREE.Mesh(new THREE.BoxGeometry(5.4, 1.1, 0.7), new THREE.MeshLambertMaterial({ color: 0x8a7f74 }))
      wall.position.set(x, 0.55, z)
      wall.rotation.y = -a + Math.PI / 2
      this.scene.add(wall)
    }
  }

  buildChurch() {
    const g = new THREE.Group()
    const wall = new THREE.MeshLambertMaterial({ color: 0xe7d9bd, emissive: 0x3a2a24, emissiveIntensity: 0.5 })
    const roof = new THREE.MeshLambertMaterial({ color: 0x6d3434 })
    const base = new THREE.Mesh(new THREE.BoxGeometry(12, 9, 10), wall)
    base.position.y = 4.5
    g.add(base)
    const roofMesh = new THREE.Mesh(new THREE.ConeGeometry(8.4, 3.6, 4), roof)
    roofMesh.position.y = 10.8
    roofMesh.rotation.y = Math.PI / 4
    g.add(roofMesh)
    for (const sx of [-4.4, 4.4]) {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(3, 15, 3), wall)
      tower.position.set(sx, 7.5, 0)
      g.add(tower)
      const cap = new THREE.Mesh(new THREE.ConeGeometry(2.4, 3, 4), roof)
      cap.position.set(sx, 16.5, 0)
      cap.rotation.y = Math.PI / 4
      g.add(cap)
      const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.3, 0.16), new THREE.MeshBasicMaterial({ color: 0xffd9a0 }))
      crossV.position.set(sx, 18.6, 0)
      g.add(crossV)
      const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.16, 0.16), new THREE.MeshBasicMaterial({ color: 0xffd9a0 }))
      crossH.position.set(sx, 18.8, 0)
      g.add(crossH)
    }
    // glowing doorway
    const door = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.6), new THREE.MeshBasicMaterial({ color: 0xffb763 }))
    door.position.set(0, 1.9, 5.03)
    g.add(door)
    g.position.set(0, 0, -44)
    g.rotation.y = 0
    this.scene.add(g)
  }

  /* ------------------------------------------------------- props */
  addCollider(x, z, r, h = 3.5) {
    this.colliders.push({ x, z, r, h })
  }

  makePalm(x, z, scale = 1, tint = 1) {
    const g = new THREE.Group()
    const trunkMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(0x6b4a32).multiplyScalar(tint) })
    let y = 0
    let offX = 0
    for (let i = 0; i < 4; i++) {
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.26 * scale, 1.7 * scale, 6), trunkMat)
      offX += 0.12 * scale
      seg.position.set(offX * i * 0.4, y + 0.85 * scale, 0)
      seg.rotation.z = -0.05 - i * 0.02
      g.add(seg)
      y += 1.6 * scale
    }
    const leafMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(0x1f5d3a).multiplyScalar(tint), flatShading: true, side: THREE.DoubleSide })
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * TAU
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.42 * scale, 3.4 * scale, 3), leafMat)
      leaf.position.set(Math.cos(a) * 1.1 * scale, y + 0.35 * scale, Math.sin(a) * 1.1 * scale)
      leaf.rotation.z = Math.PI / 2 - 0.5
      leaf.rotation.y = -a
      leaf.rotation.x = 0.2
      g.add(leaf)
    }
    const coconutMat = new THREE.MeshLambertMaterial({ color: 0x4a3a22 })
    for (let i = 0; i < 3; i++) {
      const c = new THREE.Mesh(new THREE.SphereGeometry(0.16 * scale, 6, 5), coconutMat)
      const a = rand(0, TAU)
      c.position.set(Math.cos(a) * 0.45 * scale, y - 0.1 * scale, Math.sin(a) * 0.45 * scale)
      g.add(c)
    }
    g.position.set(x, 0, z)
    this.scene.add(g)
    if (tint > 0.4) this.addCollider(x, z, 0.55 * scale, 6 * scale)
    return g
  }

  makeStall(x, z, rot, label, awningA = '#1f9c62', awningB = '#ffcf3f') {
    const g = new THREE.Group()
    const wood = new THREE.MeshLambertMaterial({ color: 0x6d4a33 })
    const counter = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.05, 1.9), wood)
    counter.position.y = 0.52
    g.add(counter)
    const top = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.12, 2.1), new THREE.MeshLambertMaterial({ color: 0xb98d5f }))
    top.position.y = 1.1
    g.add(top)
    for (const sx of [-2, 2]) {
      for (const sz of [-0.8, 0.8]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 2.9, 5), wood)
        post.position.set(sx, 1.45, sz)
        g.add(post)
      }
    }
    const awningTex = canvasTexture(256, 128, (ctx, w, h) => {
      const stripe = 32
      for (let i = 0; i < w / stripe; i++) {
        ctx.fillStyle = i % 2 ? awningA : awningB
        ctx.fillRect(i * stripe, 0, stripe, h)
      }
      ctx.fillStyle = 'rgba(0,0,0,0.12)'
      ctx.fillRect(0, h - 14, w, 14)
    })
    const awning = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.1, 2.9), new THREE.MeshLambertMaterial({ map: awningTex }))
    awning.position.set(0, 2.95, 0)
    awning.rotation.x = 0.1
    g.add(awning)
    const signTex = textTexture([label], { w: 512, h: 128, bg: 'rgba(20,10,26,0.92)', color: '#ffe2a6', font: 'bold 74px sans-serif' })
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 0.68), new THREE.MeshBasicMaterial({ map: signTex }))
    sign.position.set(0, 2.28, 1.02)
    g.add(sign)
    // goods
    const fruitMat = [0x8a2b6b, 0xffcf3f, 0xd9532e, 0x6fae4a]
    for (let i = 0; i < 7; i++) {
      const fruit = new THREE.Mesh(new THREE.SphereGeometry(rand(0.11, 0.18), 6, 5), new THREE.MeshLambertMaterial({ color: pick(fruitMat) }))
      fruit.position.set(rand(-1.6, 1.6), 1.26, rand(-0.6, 0.6))
      g.add(fruit)
    }
    // bulbs under awning
    for (const sx of [-1.5, 0, 1.5]) {
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), new THREE.MeshBasicMaterial({ color: 0xffd58a }))
      bulb.position.set(sx, 2.78, 0)
      g.add(bulb)
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,205,120,0.9)', 'rgba(255,140,50,0)'), color: 0xffbe72, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
      glow.position.copy(bulb.position)
      glow.scale.set(0.75, 0.75, 1)
      g.add(glow)
    }
    g.position.set(x, 0, z)
    g.rotation.y = rot
    this.scene.add(g)
    this.addCollider(x, z, 2.2, 3)
  }

  makeSpeakerStack(x, z, rot) {
    const g = new THREE.Group()
    const boxMat = new THREE.MeshLambertMaterial({ color: 0x1a1622 })
    const coneMat = new THREE.MeshLambertMaterial({ color: 0x33293f, emissive: 0x7a2d6b, emissiveIntensity: 0.6 })
    for (let i = 0; i < 3; i++) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.15, 1.05), boxMat)
      box.position.y = 0.58 + i * 1.2
      box.rotation.y = rand(-0.06, 0.06)
      g.add(box)
      for (const sx of [-0.34, 0.34]) {
        const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.08, 12), coneMat)
        cone.rotation.x = Math.PI / 2
        cone.position.set(sx, box.position.y, 0.55)
        g.add(cone)
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 5, 14), new THREE.MeshBasicMaterial({ color: 0xff5aa8 }))
        ring.position.set(sx, box.position.y, 0.58)
        g.add(ring)
      }
    }
    g.position.set(x, 0, z)
    g.rotation.y = rot
    this.scene.add(g)
    this.addCollider(x, z, 1.0, 3.6)
  }

  makeLamp(x, z) {
    const g = new THREE.Group()
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.11, 4.6, 6), new THREE.MeshLambertMaterial({ color: 0x2a2430 }))
    pole.position.y = 2.3
    g.add(pole)
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.08), new THREE.MeshLambertMaterial({ color: 0x2a2430 }))
    arm.position.set(0.4, 4.55, 0)
    g.add(arm)
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe0a0 }))
    bulb.position.set(0.8, 4.45, 0)
    g.add(bulb)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,220,150,0.95)', 'rgba(255,150,60,0)'), color: 0xffc97a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
    glow.position.copy(bulb.position)
    glow.scale.set(2.4, 2.4, 1)
    g.add(glow)
    g.position.set(x, 0, z)
    this.scene.add(g)
    this.addCollider(x, z, 0.3, 5)
  }

  buildProps() {
    // palms
    const palmSpots = [
      [-18, -14, 1.15], [18, -13, 1.0], [22, 4, 0.9], [-22, 2, 1.05],
      [-15, 17, 0.95], [14, 18, 1.1], [0, -20, 1.2], [-20, -20, 0.85],
    ]
    for (const [x, z, s] of palmSpots) this.makePalm(x, z, s)

    // festa stalls
    this.makeStall(-12, -10, 0.35, 'AÇAÍ', '#1f9c62', '#ffcf3f')
    this.makeStall(13, 8, -0.5, 'MILHO', '#d94b3f', '#ffe08a')
    this.makeStall(-14, 12, 0.9, 'QUENTÃO', '#7b3fa0', '#ffcf3f')
    this.makeStall(12, -16, 2.5, 'PAÇOCA', '#2b7bbd', '#fff0c4')

    // speaker stacks as cover
    this.makeSpeakerStack(6, -7, -0.35)
    this.makeSpeakerStack(-7, -13, 0.5)
    this.makeSpeakerStack(-16, 3, 1.2)

    // lamps
    for (const [x, z] of [[-19, 9], [19, 10], [-10, -19], [10, -21], [21, -7], [-22, -6]]) {
      this.makeLamp(x, z)
    }

    // fountain + capybara home
    const fountain = new THREE.Group()
    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x8d8478 })
    const basin = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.5, 0.7, 18), stoneMat)
    basin.position.y = 0.35
    fountain.add(basin)
    const water = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.05, 0.1, 18), new THREE.MeshStandardMaterial({ color: 0x1b4a66, roughness: 0.15, metalness: 0.3, emissive: 0x123044, emissiveIntensity: 0.8 }))
    water.position.y = 0.68
    fountain.add(water)
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 2.2, 10), stoneMat)
    column.position.y = 1.5
    fountain.add(column)
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 0.55, 0.35, 12), stoneMat)
    bowl.position.y = 2.7
    fountain.add(bowl)
    fountain.position.set(-8, 0, 5.5)
    this.scene.add(fountain)
    this.addCollider(-8, 5.5, 2.4, 3)

    // bonfire
    const fireG = new THREE.Group()
    const stoneRing = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.28, 6, 14), new THREE.MeshLambertMaterial({ color: 0x5c5048 }))
    stoneRing.rotation.x = Math.PI / 2
    stoneRing.position.y = 0.16
    fireG.add(stoneRing)
    for (let i = 0; i < 5; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.17, 2.2, 5), new THREE.MeshLambertMaterial({ color: 0x4a2f21 }))
      log.position.y = 0.35
      log.rotation.z = Math.PI / 2
      log.rotation.y = (i / 5) * TAU
      fireG.add(log)
    }
    fireG.position.set(10, 0, 4)
    this.scene.add(fireG)
    this.addCollider(10, 4, 1.7, 2)

    // fire particles
    const count = 70
    const fg = new THREE.BufferGeometry()
    const fpos = new Float32Array(count * 3)
    const fseed = []
    for (let i = 0; i < count; i++) {
      fseed.push({ life: rand(0, 1), speed: rand(0.7, 1.9), x: rand(-0.55, 0.55), z: rand(-0.55, 0.55), sway: rand(0, TAU) })
      fpos[i * 3] = 10
      fpos[i * 3 + 1] = 0.4
      fpos[i * 3 + 2] = 4
    }
    fg.setAttribute('position', new THREE.BufferAttribute(fpos, 3))
    const fm = new THREE.PointsMaterial({
      map: glowTexture('rgba(255,220,140,1)', 'rgba(255,80,20,0)'),
      color: 0xffa64d, size: 0.9, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: 0.95, sizeAttenuation: true,
    })
    const fire = new THREE.Points(fg, fm)
    fire.frustumCulled = false
    this.scene.add(fire)
    this.fireParticles = { points: fire, seed: fseed, base: new THREE.Vector3(10, 0.4, 4) }

    const fireLight = new THREE.PointLight(0xff7a33, 18, 20, 1.7)
    fireLight.position.set(10, 1.8, 4)
    this.scene.add(fireLight)
    this.animatedLights.push({ light: fireLight, base: 18, speed: 7.3 })

    // crates / caixas
    for (const [x, z, r] of [[4, 10, 0.4], [-4, -4, -0.3], [17, -2, 0.8]]) {
      const crate = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), new THREE.MeshLambertMaterial({ color: 0x7b5637 }))
      crate.position.set(x, 0.6, z)
      crate.rotation.y = r
      this.scene.add(crate)
      const crate2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), new THREE.MeshLambertMaterial({ color: 0x93683f }))
      crate2.position.set(x + 0.2, 1.5, z + 0.1)
      crate2.rotation.y = r + 0.4
      this.scene.add(crate2)
      this.addCollider(x, z, 1.0, 2)
    }
  }

  buildBunting() {
    const flagGeo = buntingFlagGeometry()
    const colors = [0xffcf3f, 0xff3d8b, 0x2ee6c8, 0xff7a2f, 0xfff6e6, 0x8a5cff]
    const strings = [
      [new THREE.Vector3(-22, 6.4, -8), new THREE.Vector3(22, 6.1, -6)],
      [new THREE.Vector3(-21, 6.2, 10), new THREE.Vector3(21, 6.6, 12)],
      [new THREE.Vector3(-6, 6.5, -21), new THREE.Vector3(8, 6.3, 21)],
      [new THREE.Vector3(-20, 5.9, 18), new THREE.Vector3(20, 6.2, -18)],
    ]
    const dummy = new THREE.Object3D()
    const totalFlags = strings.length * 18
    const inst = new THREE.InstancedMesh(flagGeo, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }), totalFlags)
    inst.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    inst.frustumCulled = false
    let idx = 0
    const flagData = []
    for (const [a, b] of strings) {
      const len = a.distanceTo(b)
      const n = 18
      for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n
        const p = a.clone().lerp(b, t)
        p.y -= Math.sin(t * Math.PI) * 0.75
        dummy.position.copy(p)
        dummy.rotation.set(0, rand(-0.2, 0.2), rand(-0.1, 0.1))
        dummy.scale.setScalar(rand(0.9, 1.15))
        dummy.updateMatrix()
        inst.setMatrixAt(idx, dummy.matrix)
        inst.setColorAt(idx, new THREE.Color(pick(colors)))
        flagData.push({ base: p.clone(), phase: rand(0, TAU), amp: rand(0.04, 0.1) })
        idx++
      }
      // string line
      const pts = []
      for (let i = 0; i <= 20; i++) {
        const t = i / 20
        const p = a.clone().lerp(b, t)
        p.y -= Math.sin(t * Math.PI) * 0.75
        pts.push(p)
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
      this.scene.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x20141f, transparent: true, opacity: 0.75 })))
      // little bulbs
      const bulbPos = []
      for (let i = 0; i < 16; i++) {
        const t = (i + 0.5) / 16
        const p = a.clone().lerp(b, t)
        p.y -= Math.sin(t * Math.PI) * 0.75
        bulbPos.push(p.x, p.y - 0.1, p.z)
      }
      const bg = new THREE.BufferGeometry()
      bg.setAttribute('position', new THREE.Float32BufferAttribute(bulbPos, 3))
      this.scene.add(new THREE.Points(bg, new THREE.PointsMaterial({
        map: glowTexture('rgba(255,230,170,1)', 'rgba(255,160,60,0)'),
        color: 0xffd08a, size: 0.42, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, sizeAttenuation: true,
      })))
    }
    inst.instanceColor.needsUpdate = true
    this.scene.add(inst)
    this.bunting = inst
    this.buntingData = flagData

    // support poles
    for (const [x, z] of [[-22, -8], [22, -6], [-21, 10], [21, 12], [-6, -21], [8, 21], [-20, 18], [20, -18]]) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 6.6, 6), new THREE.MeshLambertMaterial({ color: 0x3a2a26 }))
      pole.position.set(x, 3.3, z)
      this.scene.add(pole)
      this.addCollider(x, z, 0.25, 6.6)
    }
  }

  buildFireflies() {
    const count = 46
    const pos = new Float32Array(count * 3)
    const seeds = []
    for (let i = 0; i < count; i++) {
      seeds.push({ a: rand(0, TAU), r: rand(4, 24), y: rand(0.8, 4.4), sp: rand(0.1, 0.4), ph: rand(0, TAU) })
      pos[i * 3] = 0
      pos[i * 3 + 1] = -10
      pos[i * 3 + 2] = 0
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const p = new THREE.Points(g, new THREE.PointsMaterial({
      map: glowTexture('rgba(255,240,170,1)', 'rgba(190,255,120,0)'),
      color: 0xffe27a, size: 0.26, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: 0.9,
    }))
    p.frustumCulled = false
    this.scene.add(p)
    this.fireflies = { points: p, seeds }
  }

  buildCapybara() {
    const g = new THREE.Group()
    const fur = new THREE.MeshLambertMaterial({ color: 0x8a6a48 })
    const darkFur = new THREE.MeshLambertMaterial({ color: 0x5e452e })
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.62, 12, 9), fur)
    body.scale.set(1.5, 1.0, 1.0)
    body.position.y = 0.68
    g.add(body)
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 8), fur)
    head.scale.set(1.15, 1.0, 0.9)
    head.position.set(0.82, 0.92, 0)
    g.add(head)
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.3, 0.34), darkFur)
    snout.position.set(1.15, 0.8, 0)
    g.add(snout)
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 5), new THREE.MeshBasicMaterial({ color: 0x241a18 }))
    nose.position.set(1.38, 0.85, 0)
    g.add(nose)
    for (const sz of [-0.18, 0.18]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 5), new THREE.MeshBasicMaterial({ color: 0x120d10 }))
      eye.position.set(1.03, 1.05, sz)
      g.add(eye)
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 5), darkFur)
      ear.scale.set(0.7, 1, 0.7)
      ear.position.set(0.68, 1.25, sz * 1.6)
      g.add(ear)
    }
    for (const [lx, lz] of [[-0.5, -0.28], [-0.5, 0.28], [0.5, -0.28], [0.5, 0.28]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.42, 5), darkFur)
      leg.position.set(lx, 0.22, lz)
      g.add(leg)
    }
    g.position.set(-5.6, 0, 7.8)
    g.rotation.y = -1.2
    this.scene.add(g)
    this.capybara = g
    this.capyHead = head
    this.capySnout = snout
    this.capyNose = nose
  }

  buildSpawnRing() {
    this.spawnPoints = []
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * TAU + 0.13
      const r = 23.6
      this.spawnPoints.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r))
    }
  }

  /* ---------------------------------------------------- gameplay */
  collide(pos, radius) {
    const len = Math.hypot(pos.x, pos.z)
    const max = this.bounds - radius
    if (len > max) {
      pos.x = (pos.x / len) * max
      pos.z = (pos.z / len) * max
    }
    for (const c of this.colliders) {
      const dx = pos.x - c.x
      const dz = pos.z - c.z
      const d = Math.hypot(dx, dz)
      const min = c.r + radius
      if (d < min && d > 0.0001) {
        const push = (min - d) / d
        pos.x += dx * push
        pos.z += dz * push
      } else if (d <= 0.0001) {
        pos.x += min
      }
    }
  }

  rayDistance(origin, dir, maxDist = 70) {
    let best = maxDist
    if (dir.y < -0.0001) {
      const t = -origin.y / dir.y
      if (t > 0.05 && t < best) best = t
    }
    for (const c of this.colliders) {
      const ox = origin.x - c.x
      const oz = origin.z - c.z
      const a = dir.x * dir.x + dir.z * dir.z
      if (a < 1e-6) continue
      const b = 2 * (ox * dir.x + oz * dir.z)
      const cc = ox * ox + oz * oz - c.r * c.r
      const disc = b * b - 4 * a * cc
      if (disc < 0) continue
      const t = (-b - Math.sqrt(disc)) / (2 * a)
      if (t > 0.05 && t < best) {
        const y = origin.y + dir.y * t
        if (y >= 0 && y <= c.h) best = t
      }
    }
    return best
  }

  randomSpawn(minDistFromPlayer = 8) {
    for (let i = 0; i < 30; i++) {
      const p = pick(this.spawnPoints).clone()
      p.x += rand(-1.4, 1.4)
      p.z += rand(-1.4, 1.4)
      this.collide(p, 0.8)
      return p
    }
    return new THREE.Vector3(0, 0, -23)
  }

  /* ------------------------------------------------------- update */
  update(dt, playerPos) {
    this.time += dt
    const t = this.time

    // flags flutter
    if (this.bunting) {
      const dummy = new THREE.Object3D()
      for (let i = 0; i < this.buntingData.length; i++) {
        const f = this.buntingData[i]
        dummy.position.copy(f.base)
        dummy.position.y += Math.sin(t * 1.7 + f.phase) * f.amp
        dummy.rotation.set(Math.sin(t * 1.3 + f.phase) * 0.08, Math.sin(t * 0.9 + f.phase) * 0.18, Math.sin(t * 1.6 + f.phase) * 0.1)
        dummy.updateMatrix()
        this.bunting.setMatrixAt(i, dummy.matrix)
      }
      this.bunting.instanceMatrix.needsUpdate = true
    }

    // fire
    if (this.fireParticles) {
      const { points, seed, base } = this.fireParticles
      const arr = points.geometry.attributes.position.array
      for (let i = 0; i < seed.length; i++) {
        const s = seed[i]
        s.life += dt * s.speed
        if (s.life > 1) {
          s.life -= 1
          s.x = rand(-0.55, 0.55)
          s.z = rand(-0.55, 0.55)
        }
        const life = s.life
        arr[i * 3] = base.x + s.x + Math.sin(t * 3 + s.sway) * life * 0.45
        arr[i * 3 + 1] = base.y + life * 3.4
        arr[i * 3 + 2] = base.z + s.z + Math.cos(t * 2.6 + s.sway) * life * 0.45
      }
      points.geometry.attributes.position.needsUpdate = true
      points.material.opacity = 0.85
    }
    for (const l of this.animatedLights) {
      l.light.intensity = l.base + Math.sin(t * l.speed) * l.base * 0.18 + Math.sin(t * 13.7) * 1.6
    }

    // fireflies
    if (this.fireflies) {
      const { points, seeds } = this.fireflies
      const arr = points.geometry.attributes.position.array
      for (let i = 0; i < seeds.length; i++) {
        const s = seeds[i]
        s.a += dt * s.sp * 0.35
        arr[i * 3] = Math.cos(s.a) * s.r + Math.sin(t * 0.8 + s.ph) * 1.2
        arr[i * 3 + 1] = s.y + Math.sin(t * 1.4 + s.ph) * 0.5
        arr[i * 3 + 2] = Math.sin(s.a) * s.r + Math.cos(t * 0.7 + s.ph) * 1.2
      }
      points.geometry.attributes.position.needsUpdate = true
    }

    // capybara watches the guardian
    if (this.capybara && playerPos) {
      const dx = playerPos.x - this.capybara.position.x
      const dz = playerPos.z - this.capybara.position.z
      const target = Math.atan2(dz, dx)
      this.capyLook += (target - this.capyLook) * Math.min(1, dt * 2.2)
      this.capybara.rotation.y = this.capyLook
      this.capyHead.rotation.y = Math.sin(t * 0.5) * 0.12
      this.capySnout.position.y = 0.8 + Math.sin(t * 0.9) * 0.015
    }
  }
}
