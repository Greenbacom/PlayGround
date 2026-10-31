import * as THREE from 'three'

const CYAN = new THREE.Color('#62f4ff')
const MAGENTA = new THREE.Color('#ff3d7f')
const ACID = new THREE.Color('#c7ff4a')
const VIOLET = new THREE.Color('#9a64ff')

function mulberry32 (seed) {
  return function () {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

const rand = mulberry32(707)

export function createWorld (scene, renderer) {
  const root = new THREE.Group()
  root.name = 'arena'
  scene.add(root)

  scene.background = new THREE.Color('#04040a')
  scene.fog = new THREE.FogExp2('#04040a', 0.021)

  const ambient = new THREE.HemisphereLight('#9ecfff', '#2a0524', 0.95)
  scene.add(ambient)
  const topLight = new THREE.DirectionalLight('#9fc8ff', 0.62)
  topLight.position.set(4, 18, 6)
  scene.add(topLight)

  const key = new THREE.PointLight('#62f4ff', 75, 55, 1.8)
  key.position.set(-7, 12, -3)
  scene.add(key)

  const rim = new THREE.PointLight('#ff3d7f', 90, 52, 1.7)
  rim.position.set(9, 7, 7)
  scene.add(rim)

  const center = new THREE.PointLight('#c7ff4a', 38, 30, 2)
  center.position.set(0, 6, 0)
  scene.add(center)

  /* ── sky dome ── */
  const skyGeo = new THREE.SphereGeometry(120, 32, 20)
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uTop: { value: new THREE.Color('#020208') },
      uHorizon: { value: new THREE.Color('#12102a') },
      uGlow: { value: new THREE.Color('#0a2a35') },
    },
    vertexShader: `
      varying vec3 vWorld;
      void main() {
        vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vWorld;
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      uniform vec3 uGlow;
      void main() {
        float h = clamp(normalize(vWorld).y * 0.5 + 0.5, 0.0, 1.0);
        vec3 col = mix(uHorizon, uTop, smoothstep(0.38, 1.0, h));
        float band = exp(-pow((h - 0.48) * 10.0, 2.0));
        col += uGlow * band * 0.6;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
  scene.add(new THREE.Mesh(skyGeo, skyMat))

  /* ── stars ── */
  const starCount = 1300
  const starPos = new Float32Array(starCount * 3)
  const starColors = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    const r = 60 + rand() * 52
    const theta = rand() * Math.PI * 2
    const phi = Math.acos(Math.min(1, rand() * 1.6 - 0.35))
    starPos[i * 3] = Math.cos(theta) * Math.sin(phi) * r
    starPos[i * 3 + 1] = Math.abs(Math.cos(phi)) * r * 0.8 + 3
    starPos[i * 3 + 2] = Math.sin(theta) * Math.sin(phi) * r
    const c = rand() > 0.86 ? MAGENTA : rand() > 0.6 ? CYAN : new THREE.Color('#d9e7ff')
    starColors[i * 3] = c.r
    starColors[i * 3 + 1] = c.g
    starColors[i * 3 + 2] = c.b
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 0.38,
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  }))
  scene.add(stars)

  /* ── arena base ── */
  const baseMat = new THREE.MeshStandardMaterial({
    color: '#070810',
    metalness: 0.86,
    roughness: 0.38,
    envMapIntensity: 0.5,
  })
  const base = new THREE.Mesh(new THREE.CylinderGeometry(25.8, 26.4, 0.7, 96), baseMat)
  base.position.y = -0.38
  base.receiveShadow = true
  root.add(base)

  const edgeMat = new THREE.MeshStandardMaterial({ color: '#0d1018', metalness: 0.9, roughness: 0.26 })
  const edge = new THREE.Mesh(new THREE.TorusGeometry(25.7, 0.16, 8, 128), edgeMat)
  edge.rotation.x = Math.PI / 2
  edge.position.y = 0.01
  root.add(edge)

  const edgeGlow = new THREE.Mesh(
    new THREE.TorusGeometry(25.65, 0.035, 6, 160),
    new THREE.MeshBasicMaterial({ color: CYAN, toneMapped: false, transparent: true, opacity: 0.7 })
  )
  edgeGlow.rotation.x = Math.PI / 2
  edgeGlow.position.y = 0.02
  root.add(edgeGlow)

  /* ── reactive floor shader ── */
  const floorMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: CYAN.clone() },
      uColorB: { value: MAGENTA.clone() },
      uPulse: { value: 0 },
    },
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vPos = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: `
      varying vec3 vPos;
      uniform float uTime;
      uniform float uPulse;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      float lineMask(float x, float width) {
        return 1.0 - smoothstep(0.0, width, abs(x));
      }
      void main() {
        vec2 p = vPos.xz;
        float r = length(p);
        float angle = atan(p.y, p.x);
        float gridX = lineMask(fract(p.x / 2.0 + 0.5) - 0.5, 0.024);
        float gridY = lineMask(fract(p.y / 2.0 + 0.5) - 0.5, 0.024);
        float grid = max(gridX, gridY);
        float ring = lineMask(fract(r / 3.2 + 0.5) - 0.5, 0.035);
        float spokes = lineMask(fract(angle / 0.3927 + 0.5) - 0.5, 0.02) * smoothstep(4.0, 12.0, r);
        float sweep = smoothstep(0.55, 1.0, sin(angle * 2.0 - uTime * 0.7) * 0.5 + 0.5) * smoothstep(3.0, 18.0, r);
        float fade = smoothstep(25.5, 17.0, r) * smoothstep(0.0, 3.0, r);
        vec3 col = mix(uColorA, uColorB, smoothstep(2.0, 22.0, r));
        float alpha = (grid * 0.075 + ring * 0.18 + spokes * 0.06 + sweep * 0.025) * fade;
        alpha += grid * ring * 0.08 * fade;
        alpha *= 0.8 + uPulse * 0.4;
        gl_FragColor = vec4(col * (0.8 + uPulse * 0.35), alpha);
      }
    `,
  })
  const floor = new THREE.Mesh(new THREE.CircleGeometry(25.8, 96), floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = 0.012
  root.add(floor)

  // central landing emblem
  const emblem = new THREE.Group()
  emblem.position.y = 0.025
  const ringGeo = new THREE.RingGeometry(2.35, 2.42, 64)
  const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
    color: ACID, transparent: true, opacity: 0.45, side: THREE.DoubleSide, toneMapped: false, depthWrite: false,
  }))
  ring.rotation.x = -Math.PI / 2
  emblem.add(ring)
  const ring2 = ring.clone()
  ring2.scale.setScalar(0.72)
  ring2.material = ring.material.clone()
  ring2.material.color = CYAN
  ring2.material.opacity = 0.3
  emblem.add(ring2)
  for (let i = 0; i < 4; i++) {
    const tick = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.006, 0.9), new THREE.MeshBasicMaterial({
      color: ACID, transparent: true, opacity: 0.4, toneMapped: false, depthWrite: false,
    }))
    tick.position.set(Math.cos(i * Math.PI / 2) * 2.9, 0, Math.sin(i * Math.PI / 2) * 2.9)
    tick.rotation.y = -i * Math.PI / 2
    emblem.add(tick)
  }
  root.add(emblem)

  /* ── perimeter monoliths ── */
  const monoliths = []
  const pillarMat = new THREE.MeshStandardMaterial({
    color: '#090b13',
    metalness: 0.82,
    roughness: 0.3,
    emissive: '#03050a',
    emissiveIntensity: 0.6,
  })
  const pillarEdgeMat = new THREE.MeshBasicMaterial({ color: CYAN, toneMapped: false, transparent: true, opacity: 0.62 })
  const pillarEdgeMat2 = new THREE.MeshBasicMaterial({ color: MAGENTA, toneMapped: false, transparent: true, opacity: 0.52 })

  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2 + 0.08
    const radius = 27 + rand() * 2.4
    const height = 5.5 + rand() * 10
    const width = 0.8 + rand() * 1.5
    const group = new THREE.Group()
    group.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
    group.rotation.y = -angle + Math.PI / 2 + (rand() - 0.5) * 0.2
    const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, width * 0.7), pillarMat)
    body.position.y = height / 2
    group.add(body)
    const cap = new THREE.Mesh(new THREE.BoxGeometry(width * 1.12, 0.16, width * 0.8), new THREE.MeshStandardMaterial({
      color: '#171c27', metalness: 0.9, roughness: 0.2,
    }))
    cap.position.y = height + 0.06
    group.add(cap)
    const stripMat = i % 3 === 0 ? pillarEdgeMat2 : pillarEdgeMat
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.035, height * 0.62, 0.02), stripMat)
    strip.position.set(width * 0.18, height * 0.5, width * 0.36)
    group.add(strip)
    const capGlow = new THREE.Mesh(new THREE.BoxGeometry(width * 1.05, 0.025, width * 0.74), stripMat)
    capGlow.position.y = height + 0.14
    group.add(capGlow)
    for (let band = 0; band < 3; band++) {
      if (rand() > 0.5) continue
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(width * (0.3 + rand() * 0.4), 0.035, 0.012),
        new THREE.MeshBasicMaterial({
          color: i % 4 === 0 ? ACID : i % 3 === 0 ? MAGENTA : CYAN,
          transparent: true,
          opacity: 0.4 + rand() * 0.35,
          toneMapped: false,
          depthWrite: false,
        })
      )
      panel.position.set((rand() - 0.5) * width * 0.35, height * (0.2 + rand() * 0.55), width * 0.355)
      group.add(panel)
    }
    if (i % 4 === 0) {
      const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.2, 5), stripMat)
      antenna.position.y = height + 1.2
      group.add(antenna)
    }
    root.add(group)
    monoliths.push({ group, height, stripMat, baseY: 0, phase: rand() * Math.PI * 2 })
  }

  /* ── broken inner columns ── */
  const columns = []
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2 + 0.5
    const radius = 18.5 + rand() * 2.5
    const height = 1.2 + rand() * 3.4
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.52, height, 6), new THREE.MeshStandardMaterial({
      color: '#0a0c13', metalness: 0.75, roughness: 0.42,
    }))
    col.position.set(Math.cos(angle) * radius, height / 2, Math.sin(angle) * radius)
    col.rotation.y = rand() * Math.PI
    col.rotation.z = (rand() - 0.5) * 0.12
    root.add(col)
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.012, 4, 12), i % 2 ? pillarEdgeMat : pillarEdgeMat2)
    band.rotation.x = Math.PI / 2
    band.position.copy(col.position)
    band.position.y = height * 0.62
    root.add(band)
    columns.push(col)
  }

  /* ── floating debris ── */
  const shards = []
  const shardMats = [
    new THREE.MeshStandardMaterial({ color: '#0b0e17', metalness: 0.8, roughness: 0.25, emissive: '#071b22', emissiveIntensity: 0.7 }),
    new THREE.MeshStandardMaterial({ color: '#100d18', metalness: 0.8, roughness: 0.28, emissive: '#20081a', emissiveIntensity: 0.7 }),
  ]
  for (let i = 0; i < 30; i++) {
    const geo = i % 3 === 0 ? new THREE.OctahedronGeometry(0.18 + rand() * 0.5, 0) : new THREE.TetrahedronGeometry(0.18 + rand() * 0.45, 0)
    const mesh = new THREE.Mesh(geo, shardMats[i % 2])
    const angle = rand() * Math.PI * 2
    const radius = 7 + rand() * 18
    mesh.position.set(Math.cos(angle) * radius, 1.2 + rand() * 10, Math.sin(angle) * radius)
    mesh.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI)
    mesh.userData = {
      baseY: mesh.position.y,
      phase: rand() * Math.PI * 2,
      speed: 0.2 + rand() * 0.8,
      spin: (rand() - 0.5) * 0.35,
    }
    root.add(mesh)
    shards.push(mesh)
  }

  /* ── dust ── */
  const dustCount = 420
  const dustPos = new Float32Array(dustCount * 3)
  for (let i = 0; i < dustCount; i++) {
    const angle = rand() * Math.PI * 2
    const radius = 2 + rand() * 25
    dustPos[i * 3] = Math.cos(angle) * radius
    dustPos[i * 3 + 1] = 0.3 + rand() * 13
    dustPos[i * 3 + 2] = Math.sin(angle) * radius
  }
  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: '#8beaff',
    size: 0.05,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  }))
  root.add(dust)

  /* ── light columns ── */
  const beams = []
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2 + 0.35
    const color = i % 2 ? MAGENTA : CYAN
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.012,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 1.25, 22, 12, 1, true), mat)
    beam.position.set(Math.cos(angle) * 24, 11, Math.sin(angle) * 24)
    root.add(beam)
    beams.push(beam)
    const laser = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 22, 5),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
    )
    laser.position.set(Math.cos(angle) * 24, 11, Math.sin(angle) * 24)
    root.add(laser)
    beams.push(laser)
  }

  const tmpColor = new THREE.Color()

  return {
    root,
    floor,
    floorMat,
    emblem,
    key,
    rim,
    center,
    stars,
    dust,
    update (time, dt, energy = 0) {
      floorMat.uniforms.uTime.value = time
      floorMat.uniforms.uPulse.value += (energy - floorMat.uniforms.uPulse.value) * Math.min(1, dt * 5)
      emblem.rotation.y = time * 0.08
      ring2.rotation.z = time * 0.22
      stars.rotation.y = time * 0.0035
      dust.rotation.y = time * 0.006
      dust.position.y = Math.sin(time * 0.18) * 0.2

      key.intensity = 70 + Math.sin(time * 1.3) * 8
      rim.intensity = 86 + Math.sin(time * 0.9 + 2) * 10
      center.intensity = 30 + Math.sin(time * 1.8) * 6 + energy * 20

      for (const monolith of monoliths) {
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.8 + monolith.phase)
        monolith.stripMat.opacity = 0.36 + pulse * 0.36
      }
      for (const shard of shards) {
        shard.position.y = shard.userData.baseY + Math.sin(time * shard.userData.speed + shard.userData.phase) * 0.55
        shard.rotation.x += dt * shard.userData.spin
        shard.rotation.y += dt * shard.userData.spin * 1.3
      }
      for (let i = 0; i < beams.length; i++) {
        if (beams[i].material.opacity < 0.1) {
          beams[i].material.opacity = 0.012 + Math.sin(time * 0.5 + i) * 0.008 + energy * 0.008
        } else {
          beams[i].material.opacity = 0.42 + Math.sin(time * 0.8 + i) * 0.14
        }
      }
      edgeGlow.material.opacity = 0.55 + Math.sin(time * 1.5) * 0.15
    },
    setEnergy (energy) {
      tmpColor.copy(CYAN).lerp(MAGENTA, energy)
      floorMat.uniforms.uColorA.value.copy(tmpColor)
    },
  }
}
