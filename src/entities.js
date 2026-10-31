import * as THREE from 'three'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const TAU = Math.PI * 2

/* ───────────────────────────── particles ───────────────────────────── */

export class ParticleSystem {
  constructor (scene, max = 700) {
    this.max = max
    this.cursor = 0
    this.pos = new Float32Array(max * 3)
    this.col = new Float32Array(max * 3)
    this.size = new Float32Array(max)
    this.alpha = new Float32Array(max)
    this.vel = new Float32Array(max * 3)
    this.life = new Float32Array(max)
    this.maxLife = new Float32Array(max)
    this.gravity = new Float32Array(max)
    this.drag = new Float32Array(max)

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1))
    geo.setDrawRange(0, max)

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {},
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (320.0 / max(0.1, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float a = smoothstep(0.5, 0.05, d) * vAlpha;
          if (a < 0.01) discard;
          gl_FragColor = vec4(vColor * (1.0 + (1.0 - d) * 1.6), a);
        }
      `,
    })
    this.points = new THREE.Points(geo, mat)
    this.points.frustumCulled = false
    this.points.renderOrder = 8
    scene.add(this.points)
    this.geo = geo
  }

  spawn ({ position, velocity, color, size = 0.1, life = 0.6, gravity = 0, drag = 0.94 }) {
    const i = this.cursor
    this.cursor = (this.cursor + 1) % this.max
    this.pos[i * 3] = position.x
    this.pos[i * 3 + 1] = position.y
    this.pos[i * 3 + 2] = position.z
    this.vel[i * 3] = velocity?.x || 0
    this.vel[i * 3 + 1] = velocity?.y || 0
    this.vel[i * 3 + 2] = velocity?.z || 0
    const c = new THREE.Color(color)
    this.col[i * 3] = c.r
    this.col[i * 3 + 1] = c.g
    this.col[i * 3 + 2] = c.b
    this.size[i] = size
    this.alpha[i] = 1
    this.life[i] = life
    this.maxLife[i] = life
    this.gravity[i] = gravity
    this.drag[i] = drag
  }

  burst (position, color, count = 10, speed = 5, { size = 0.09, life = 0.55, gravity = 0, spread = 1 } = {}) {
    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize()
      dir.y *= spread
      this.spawn({
        position,
        velocity: dir.multiplyScalar(speed * (0.3 + Math.random() * 0.9)),
        color,
        size: size * (0.6 + Math.random() * 0.8),
        life: life * (0.5 + Math.random() * 0.8),
        gravity,
        drag: 0.92,
      })
    }
  }

  update (dt) {
    const pos = this.pos
    const vel = this.vel
    for (let i = 0; i < this.max; i++) {
      if (this.life[i] <= 0) {
        if (this.alpha[i] !== 0) this.alpha[i] = 0
        continue
      }
      this.life[i] -= dt
      const k = this.life[i] / this.maxLife[i]
      this.alpha[i] = Math.max(0, k * k)
      this.vel[i * 3 + 1] -= this.gravity[i] * dt
      const drag = Math.pow(this.drag[i], dt * 60)
      vel[i * 3] *= drag
      vel[i * 3 + 1] *= drag
      vel[i * 3 + 2] *= drag
      pos[i * 3] += vel[i * 3] * dt
      pos[i * 3 + 1] += vel[i * 3 + 1] * dt
      pos[i * 3 + 2] += vel[i * 3 + 2] * dt
      if (pos[i * 3 + 1] < 0.03) {
        pos[i * 3 + 1] = 0.03
        vel[i * 3 + 1] *= -0.25
      }
    }
    this.geo.attributes.position.needsUpdate = true
    this.geo.attributes.aColor.needsUpdate = true
    this.geo.attributes.aSize.needsUpdate = true
    this.geo.attributes.aAlpha.needsUpdate = true
  }
}

/* ───────────────────────────── effects ───────────────────────────── */

function radialTexture () {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.2, 'rgba(255,255,255,0.8)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.16)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export class Effects {
  constructor (scene) {
    this.scene = scene
    this.particles = new ParticleSystem(scene, 800)
    this.transients = []
    this.flashTex = radialTexture()
    this.lights = []
    this.lightPool = []
    for (let i = 0; i < 5; i++) {
      const light = new THREE.PointLight('#62f4ff', 0, 18, 2)
      light.visible = false
      scene.add(light)
      this.lightPool.push({ light, life: 0, maxLife: 0, intensity: 0 })
    }
  }

  light (position, color, intensity = 24, life = 0.18) {
    const item = this.lightPool.find(l => l.life <= 0) || this.lightPool[0]
    item.light.position.copy(position)
    item.light.color.set(color)
    item.light.intensity = intensity
    item.light.visible = true
    item.life = life
    item.maxLife = life
    item.intensity = intensity
  }

  sprite (position, color, scale = 1, life = 0.15) {
    const mat = new THREE.SpriteMaterial({
      map: this.flashTex,
      color,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
    const sprite = new THREE.Sprite(mat)
    sprite.position.copy(position)
    sprite.scale.setScalar(scale)
    sprite.renderOrder = 12
    this.scene.add(sprite)
    this.transients.push({
      mesh: sprite,
      life,
      maxLife: life,
      update (obj, k) {
        obj.scale.setScalar(scale * (0.6 + (1 - k) * 0.8))
        obj.material.opacity = k * 0.9
      },
    })
  }

  muzzle (position, color, energy = 0.5) {
    this.sprite(position, color, 0.55 + energy * 0.35, 0.09)
    this.light(position, color, 10 + energy * 14, 0.08)
    this.particles.burst(position, color, 4, 5, { size: 0.045, life: 0.2, spread: 0.6 })
  }

  impact (position, color, normal = null) {
    this.particles.burst(position, color, 7, 5, { size: 0.055, life: 0.35, gravity: 2, spread: 0.8 })
    this.sprite(position, color, 0.35, 0.1)
    if (normal) {
      const p = position.clone().addScaledVector(normal, 0.05)
      this.particles.burst(p, '#ffffff', 3, 3, { size: 0.035, life: 0.18 })
    }
  }

  explosion (position, color, radius = 2.5) {
    this.sprite(position, color, radius * 1.6, 0.35)
    this.sprite(position, '#ffffff', radius * 0.7, 0.16)
    this.light(position, color, 55, 0.32)
    this.particles.burst(position, color, 28, 12, { size: 0.16, life: 0.85, gravity: 2.2, spread: 1 })
    this.particles.burst(position, '#fff1d6', 12, 7, { size: 0.11, life: 0.55, gravity: 1.4 })
    const ringGeo = new THREE.RingGeometry(0.1, radius, 48)
    const ringMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.copy(position)
    ring.position.y = 0.08
    ring.renderOrder = 10
    this.scene.add(ring)
    this.transients.push({
      mesh: ring,
      life: 0.55,
      maxLife: 0.55,
      update (obj, k) {
        const scale = 1 + (1 - k) * 1.8
        obj.scale.setScalar(scale)
        obj.material.opacity = k * 0.65
      },
    })
    // vertical shell
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 0.45, 12, 8),
      new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
    )
    shell.position.copy(position)
    this.scene.add(shell)
    this.transients.push({
      mesh: shell,
      life: 0.35,
      maxLife: 0.35,
      update (obj, k) {
        obj.scale.setScalar(1 + (1 - k) * 2.8)
        obj.material.opacity = k * 0.4
      },
    })
  }

  beam (start, end, color, life = 0.16) {
    const dir = new THREE.Vector3().subVectors(end, start)
    const length = dir.length()
    if (length < 0.01) return
    const geo = new THREE.CylinderGeometry(0.018, 0.055, length, 6, 1, true)
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.copy(start).addScaledVector(dir, 0.5)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
    mesh.renderOrder = 9
    this.scene.add(mesh)
    this.transients.push({
      mesh,
      life,
      maxLife: life,
      update (obj, k) {
        obj.material.opacity = k * 0.9
        obj.scale.x = 0.5 + k * 0.7
        obj.scale.z = 0.5 + k * 0.7
      },
    })
    this.light(start.clone().lerp(end, 0.5), color, 28, 0.12)
    this.particles.burst(end, color, 6, 4, { size: 0.05, life: 0.25 })
  }

  slash (position, direction, color) {
    const geo = new THREE.TorusGeometry(1.4, 0.045, 6, 32, Math.PI * 0.9)
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.copy(position)
    mesh.rotation.x = Math.PI / 2
    mesh.rotation.z = Math.atan2(direction.x, direction.z) + 0.6
    mesh.renderOrder = 9
    this.scene.add(mesh)
    this.transients.push({
      mesh,
      life: 0.25,
      maxLife: 0.25,
      update (obj, k) {
        obj.scale.setScalar(0.8 + (1 - k) * 0.9)
        obj.material.opacity = k
        obj.rotation.z -= 0.045
      },
    })
  }

  portal (position, color) {
    const group = new THREE.Group()
    group.position.copy(position)
    const ringMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.03, 5, 32), ringMat)
    ring.rotation.x = Math.PI / 2
    group.add(ring)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.02, 5, 24), ringMat.clone())
    ring2.rotation.x = Math.PI / 2
    ring2.rotation.z = 0.4
    group.add(ring2)
    this.scene.add(group)
    this.transients.push({
      mesh: group,
      life: 0.65,
      maxLife: 0.65,
      update (obj, k) {
        obj.scale.setScalar(0.5 + (1 - k) * 1.4)
        obj.rotation.y += 0.06
        obj.children.forEach(child => { child.material.opacity = k * 0.8 })
      },
    })
    this.particles.burst(position, color, 14, 4, { size: 0.07, life: 0.65 })
  }

  ringBurst (position, color, radius = 2) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.2, 0.32, 40),
      new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.9, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
      })
    )
    ring.position.copy(position)
    ring.position.y = 0.05
    ring.rotation.x = -Math.PI / 2
    this.scene.add(ring)
    this.transients.push({
      mesh: ring,
      life: 0.45,
      maxLife: 0.45,
      update (obj, k) {
        obj.scale.setScalar(1 + (1 - k) * radius * 2)
        obj.material.opacity = k * 0.7
      },
    })
  }

  clear () {
    for (const item of this.transients) {
      this.scene.remove(item.mesh)
      item.mesh.traverse?.(obj => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
          else obj.material.dispose()
        }
      })
    }
    this.transients.length = 0
    this.particles.life.fill(0)
    this.particles.alpha.fill(0)
    this.particles.geo.attributes.aAlpha.needsUpdate = true
    for (const item of this.lightPool) {
      item.life = 0
      item.light.visible = false
      item.light.intensity = 0
    }
  }

  update (dt) {
    this.particles.update(dt)
    for (let i = this.transients.length - 1; i >= 0; i--) {
      const item = this.transients[i]
      item.life -= dt
      if (item.life <= 0) {
        this.scene.remove(item.mesh)
        item.mesh.traverse?.(obj => {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
            else obj.material.dispose()
          }
        })
        this.transients.splice(i, 1)
      } else {
        item.update?.(item.mesh, Math.max(0, item.life / item.maxLife))
      }
    }
    for (const item of this.lightPool) {
      if (item.life > 0) {
        item.life -= dt
        const k = Math.max(0, item.life / item.maxLife)
        item.light.intensity = item.intensity * k * k
        if (item.life <= 0) item.light.visible = false
      }
    }
  }
}

/* ───────────────────────────── enemies ───────────────────────────── */

export const ENEMY_TYPES = {
  echo: {
    id: 'echo', hp: 34, speed: 2.1, radius: 0.72, color: '#ff3d7f', score: 100,
    attackRange: 15, cooldown: 3.1, ranged: true, hover: 1.75, damage: 8, scale: 1,
  },
  wisp: {
    id: 'wisp', hp: 20, speed: 4.6, radius: 0.5, color: '#ffb545', score: 130,
    attackRange: 1.55, cooldown: 1.25, ranged: false, hover: 1.35, damage: 11, scale: 0.74,
  },
  brute: {
    id: 'brute', hp: 135, speed: 1.12, radius: 1.05, color: '#b14cff', score: 330,
    attackRange: 17, cooldown: 4.1, ranged: true, hover: 2.15, damage: 16, scale: 1.45, burst: 3,
  },
}

function enemyMaterial (color) {
  return new THREE.MeshStandardMaterial({
    color: '#202536',
    metalness: 0.62,
    roughness: 0.28,
    emissive: new THREE.Color(color).multiplyScalar(0.32),
    emissiveIntensity: 1.2,
  })
}

export class EnemyManager {
  constructor (scene, effects) {
    this.scene = scene
    this.effects = effects
    this.enemies = []
    this.dead = []
    this.temp = new THREE.Vector3()
    this.temp2 = new THREE.Vector3()
    this.spawnId = 0
  }

  spawn (typeId, position, camera) {
    const type = ENEMY_TYPES[typeId] || ENEMY_TYPES.echo
    const group = new THREE.Group()
    const color = new THREE.Color(type.color)
    const bodyMat = enemyMaterial(type.color)
    const glowMat = new THREE.MeshBasicMaterial({ color, toneMapped: false })

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.52, 0), bodyMat)
    core.scale.set(1, 1.18, 0.82)
    group.add(core)

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.55, 0),
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.35, toneMapped: false })
    )
    wire.scale.set(1.02, 1.2, 0.84)
    group.add(wire)
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 1), glowMat)
    inner.position.z = 0.12
    inner.scale.set(1.2, 1.3, 0.6)
    group.add(inner)
    const aura = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.effects.flashTex, color, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    }))
    aura.scale.setScalar(1.45)
    group.add(aura)

    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.115, 10, 10), glowMat)
    eye.position.set(0, 0.06, 0.49)
    group.add(eye)
    const eyeHalo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.effects.flashTex, color, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    }))
    eyeHalo.scale.setScalar(0.75)
    eyeHalo.position.set(0, 0.06, 0.54)
    group.add(eyeHalo)

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.018, 5, 32), glowMat.clone())
    ring.rotation.x = Math.PI / 2.35
    ring.rotation.z = 0.3
    group.add(ring)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.01, 4, 24), glowMat.clone())
    ring2.material.opacity = 0.55
    ring2.rotation.x = Math.PI / 1.65
    group.add(ring2)

    for (let i = 0; i < 3; i++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.42, 4), bodyMat)
      const a = i * TAU / 3 + 0.4
      spike.position.set(Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0)
      spike.rotation.z = -a + Math.PI / 2
      group.add(spike)
    }

    // health pips
    const bar = new THREE.Group()
    bar.position.y = 1.3
    const bg = new THREE.Sprite(new THREE.SpriteMaterial({ color: '#05050a', transparent: true, opacity: 0.65, depthWrite: false }))
    bg.scale.set(0.94, 0.055, 1)
    bar.add(bg)
    const fill = new THREE.Sprite(new THREE.SpriteMaterial({ color, transparent: true, opacity: 0.9, depthWrite: false, toneMapped: false }))
    fill.scale.set(0.9, 0.032, 1)
    bar.add(fill)
    group.add(bar)

    group.scale.setScalar(0.001)
    group.position.copy(position)
    group.position.y = type.hover
    group.userData = {
      typeId: type.id,
      hp: type.hp * (1 + Math.min(0.55, (this.spawnId / 40) * 0.35)),
      maxHp: type.hp,
      type,
      radius: type.radius * type.scale,
      group,
      core,
      wire,
      eye,
      eyeHalo,
      ring,
      ring2,
      bar,
      fill,
      spawn: 0,
      spawnDelay: 0.5,
      hoverBase: type.hover,
      phase: Math.random() * TAU,
      cooldown: 1 + Math.random() * 2,
      strafe: Math.random() > 0.5 ? 1 : -1,
      strafeTimer: 1 + Math.random() * 2,
      hitFlash: 0,
      slow: 0,
      pull: new THREE.Vector3(),
      dead: false,
      id: ++this.spawnId,
      spawnColor: type.color,
    }
    group.userData.maxHp = group.userData.hp
    this.scene.add(group)
    this.enemies.push(group)
    this.effects.portal(position.clone().setY(0.08), type.color)
    return group
  }

  damage (enemy, amount, hitPosition) {
    if (!enemy || enemy.userData.dead) return { killed: false, damage: 0 }
    const data = enemy.userData
    data.hp -= amount
    data.hitFlash = 0.13
    if (hitPosition) this.effects.impact(hitPosition, data.type.color)
    if (data.hp <= 0) {
      data.dead = true
      return { killed: true, damage: amount }
    }
    return { killed: false, damage: amount }
  }

  removeDead () {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i]
      if (enemy.userData.dead) {
        this.scene.remove(enemy)
        enemy.traverse(obj => {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
            else obj.material.dispose()
          }
        })
        this.enemies.splice(i, 1)
      }
    }
  }

  update (dt, playerPosition, camera, onShoot, time) {
    const alive = this.enemies
    for (const enemy of alive) {
      const data = enemy.userData
      if (data.dead) continue
      data.spawn += dt
      if (data.spawn < data.spawnDelay) {
        const k = data.spawn / data.spawnDelay
        const eased = 1 + 2.4 * Math.pow(k - 1, 3) + 1.4 * Math.pow(k - 1, 2)
        enemy.scale.setScalar(Math.max(0.001, eased))
        continue
      }
      if (enemy.scale.x < 1) {
        enemy.scale.setScalar(Math.min(1, enemy.scale.x + dt * 3.4))
      }

      const dx = playerPosition.x - enemy.position.x
      const dz = playerPosition.z - enemy.position.z
      const dist = Math.hypot(dx, dz)
      const nx = dx / (dist || 1)
      const nz = dz / (dist || 1)
      const speed = data.type.speed * (data.slow > 0 ? 0.42 : 1) * (data.spawn < 1 ? 0.4 : 1)
      let moveX = 0
      let moveZ = 0

      if (data.type.ranged) {
        const desired = data.type.id === 'brute' ? 11 : 9
        if (dist > desired + 1) {
          moveX = nx * speed
          moveZ = nz * speed
        } else if (dist < desired - 2) {
          moveX = -nx * speed * 0.75
          moveZ = -nz * speed * 0.75
        }
        data.strafeTimer -= dt
        if (data.strafeTimer <= 0) {
          data.strafe *= -1
          data.strafeTimer = 1.3 + Math.random() * 2.2
        }
        moveX += -nz * speed * 0.45 * data.strafe
        moveZ += nx * speed * 0.45 * data.strafe
      } else {
        if (dist > 1.25) {
          moveX = nx * speed
          moveZ = nz * speed
        }
      }

      // separation
      for (const other of alive) {
        if (other === enemy || other.userData.dead) continue
        const ox = enemy.position.x - other.position.x
        const oz = enemy.position.z - other.position.z
        const d = Math.hypot(ox, oz)
        const min = data.radius + other.userData.radius + 0.2
        if (d < min && d > 0.001) {
          moveX += (ox / d) * (min - d) * 3.2
          moveZ += (oz / d) * (min - d) * 3.2
        }
      }

      if (data.pull.lengthSq() > 0.001) {
        moveX += data.pull.x
        moveZ += data.pull.z
        data.pull.multiplyScalar(Math.pow(0.03, dt))
      }

      enemy.position.x += moveX * dt
      enemy.position.z += moveZ * dt
      const r = Math.hypot(enemy.position.x, enemy.position.z)
      if (r > 23.5) {
        enemy.position.x *= 23.5 / r
        enemy.position.z *= 23.5 / r
      }
      data.phase += dt
      enemy.position.y = data.hoverBase + Math.sin(data.phase * 1.8) * 0.18
      enemy.lookAt(playerPosition.x, enemy.position.y + 0.1, playerPosition.z)
      data.ring.rotation.z += dt * (data.type.id === 'brute' ? 0.35 : 0.8)
      data.ring2.rotation.z -= dt * 1.2
      data.eye.scale.setScalar(1 + Math.sin(time * 5 + data.phase) * 0.14)
      data.eyeHalo.material.opacity = 0.35 + Math.sin(time * 4 + data.phase) * 0.16

      if (data.hitFlash > 0) {
        data.hitFlash -= dt
        data.core.material.emissiveIntensity = 4
        data.core.material.emissive.set('#ffffff')
      } else {
        data.core.material.emissiveIntensity = 1
        data.core.material.emissive.set(data.type.color).multiplyScalar(0.18)
      }

      const hpRatio = clamp(data.hp / data.maxHp, 0, 1)
      data.fill.scale.x = 0.9 * hpRatio
      data.fill.position.x = -0.45 * (1 - hpRatio)
      data.bar.visible = hpRatio < 0.999

      data.cooldown -= dt
      if (data.cooldown <= 0) {
        if (data.type.ranged && dist < data.type.attackRange) {
          onShoot(enemy, data.type)
          data.cooldown = data.type.cooldown * (0.78 + Math.random() * 0.5)
        } else if (!data.type.ranged && dist < data.type.attackRange + 0.5) {
          onShoot(enemy, data.type)
          data.cooldown = data.type.cooldown
        }
      }
      if (data.slow > 0) data.slow -= dt
    }
  }

  applySlow (center, radius, duration) {
    for (const enemy of this.enemies) {
      if (enemy.userData.dead) continue
      if (enemy.position.distanceTo(center) < radius) enemy.userData.slow = Math.max(enemy.userData.slow, duration)
    }
  }

  applyPull (center, radius, force, dt) {
    for (const enemy of this.enemies) {
      if (enemy.userData.dead) continue
      const d = enemy.position.distanceTo(center)
      if (d < radius && d > 0.1) {
        const dir = this.temp.subVectors(center, enemy.position).normalize()
        enemy.userData.pull.addScaledVector(dir, force * dt * (1 - d / radius))
      }
    }
  }

  nearestTo (position, maxDistance = Infinity, exclude = null) {
    let best = null
    let bestDist = maxDistance
    for (const enemy of this.enemies) {
      if (enemy.userData.dead || enemy === exclude) continue
      const d = enemy.position.distanceTo(position)
      if (d < bestDist) {
        bestDist = d
        best = enemy
      }
    }
    return best
  }

  clear () {
    for (const enemy of this.enemies) {
      this.scene.remove(enemy)
      enemy.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
          else obj.material.dispose()
        }
      })
    }
    this.enemies.length = 0
  }
}

/* ───────────────────────────── projectiles ───────────────────────────── */

function projectileMesh (weapon, kind) {
  let geo
  let mat
  const color = weapon.color
  if (kind === 'rocket') {
    geo = new THREE.ConeGeometry(0.09, 0.35, 8)
    geo.rotateX(-Math.PI / 2)
    mat = new THREE.MeshBasicMaterial({ color: weapon.accent, toneMapped: false })
  } else if (kind === 'void') {
    geo = new THREE.TorusGeometry(0.16, 0.025, 5, 16)
    mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  } else if (kind === 'pellet') {
    geo = new THREE.OctahedronGeometry(0.075, 0)
    mat = new THREE.MeshBasicMaterial({ color, toneMapped: false })
  } else if (kind === 'swarm') {
    geo = new THREE.TetrahedronGeometry(0.07, 0)
    mat = new THREE.MeshBasicMaterial({ color, toneMapped: false })
  } else if (kind === 'flame') {
    geo = new THREE.SphereGeometry(0.09, 6, 6)
    mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  } else {
    geo = new THREE.SphereGeometry(0.065, 6, 6)
    mat = new THREE.MeshBasicMaterial({ color, toneMapped: false })
  }
  const mesh = new THREE.Mesh(geo, mat)
  mesh.renderOrder = 7
  return mesh
}

export class ProjectileManager {
  constructor (scene, effects) {
    this.scene = scene
    this.effects = effects
    this.projectiles = []
    this.temp = new THREE.Vector3()
  }

  spawn (weapon, origin, direction, options = {}) {
    const kind = weapon.behavior
    const mesh = projectileMesh(weapon, kind)
    mesh.position.copy(origin)
    this.scene.add(mesh)
    const speed = options.speed ?? weapon.stats.speed
    const velocity = direction.clone().multiplyScalar(speed)
    const projectile = {
      mesh,
      weapon,
      kind,
      velocity,
      life: kind === 'flame' ? 0.42 : kind === 'void' ? 2.2 : kind === 'rocket' ? 3.4 : 1.8,
      age: 0,
      radius: kind === 'rocket' ? 0.22 : kind === 'flame' ? 0.25 : 0.1,
      damage: options.damage ?? weapon.stats.damage,
      hit: new Set(),
      homing: options.homing ?? false,
      target: null,
      trailTimer: 0,
      direction: direction.clone(),
    }
    if (kind === 'rocket') mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction.clone().normalize())
    if (kind === 'void') mesh.rotation.x = Math.PI / 2
    this.projectiles.push(projectile)
    return projectile
  }

  update (dt, enemies, playerPosition, onExplode, onVoidHit, onHit) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i]
      p.age += dt
      p.life -= dt
      p.trailTimer -= dt

      if (p.homing) {
        if (!p.target || p.target.userData.dead) p.target = enemies.nearestTo(p.mesh.position, 26)
        if (p.target) {
          const desired = this.temp.subVectors(p.target.position, p.mesh.position).normalize().multiplyScalar(p.velocity.length())
          p.velocity.lerp(desired, Math.min(1, dt * 4.5))
        }
      }
      p.mesh.position.addScaledVector(p.velocity, dt)

      if (p.kind === 'flame') {
        p.mesh.scale.setScalar(1 + p.age * 5)
        p.mesh.material.opacity = Math.max(0, p.life / 0.42)
        if (p.trailTimer <= 0) {
          p.trailTimer = 0.025
          this.effects.particles.spawn({
            position: p.mesh.position.clone(),
            velocity: new THREE.Vector3((Math.random() - 0.5) * 0.8, 0.5 + Math.random(), (Math.random() - 0.5) * 0.8),
            color: Math.random() > 0.5 ? p.weapon.color : p.weapon.accent,
            size: 0.2 + Math.random() * 0.14,
            life: 0.3 + Math.random() * 0.2,
            drag: 0.9,
          })
        }
      } else if (p.trailTimer <= 0 && p.kind !== 'pellet') {
        p.trailTimer = 0.035
        this.effects.particles.spawn({
          position: p.mesh.position.clone(),
          velocity: new THREE.Vector3(0, 0, 0),
          color: p.weapon.color,
          size: p.kind === 'rocket' ? 0.13 : 0.055,
          life: 0.28,
          drag: 0.88,
        })
      }
      if (p.kind === 'void') p.mesh.rotation.z += dt * 5

      let hit = false
      for (const enemy of enemies.enemies) {
        if (enemy.userData.dead || p.hit.has(enemy.userData.id)) continue
        const r = enemy.userData.radius + p.radius + 0.15
        if (p.mesh.position.distanceToSquared(enemy.position) < r * r) {
          if (p.kind === 'rocket') {
            onExplode(p, enemy.position.clone())
          } else if (p.kind === 'void') {
            onVoidHit(p, enemy.position.clone())
          } else {
            const dir = p.velocity.clone().normalize()
            const hitPos = enemy.position.clone().addScaledVector(dir, -0.45)
            enemy.userData.hp -= p.damage
            enemy.userData.hitFlash = 0.12
            this.effects.impact(hitPos, p.weapon.color, dir.clone().negate())
            if (p.kind === 'pellet' && p.weapon.typeId === 'frost') enemies.applySlow(enemy.position, 2.2, 1.2)
            if (p.weapon.typeId === 'swarm') {
              // swarm projectiles detonate on impact
              onExplode(p, hitPos, 0.9)
            }
            const killed = enemy.userData.hp <= 0
            if (killed) enemy.userData.dead = true
            onHit?.(enemy, p, killed)
          }
          p.hit.add(enemy.userData.id)
          hit = true
          break
        }
      }

      const floorHit = p.mesh.position.y <= 0.12
      const outside = Math.hypot(p.mesh.position.x, p.mesh.position.z) > 27
      if (hit || p.life <= 0 || floorHit || outside) {
        if (p.kind === 'rocket' && !hit) onExplode(p, p.mesh.position.clone())
        else if (p.kind === 'void' && !hit) onVoidHit(p, p.mesh.position.clone())
        else if (hit || floorHit) {
          this.effects.impact(p.mesh.position.clone(), p.weapon.color)
        }
        this.scene.remove(p.mesh)
        p.mesh.geometry.dispose()
        p.mesh.material.dispose()
        this.projectiles.splice(i, 1)
      }
    }
  }

  clear () {
    for (const p of this.projectiles) {
      this.scene.remove(p.mesh)
      p.mesh.geometry.dispose()
      p.mesh.material.dispose()
    }
    this.projectiles.length = 0
  }
}

export class EnemyProjectileManager {
  constructor (scene, effects) {
    this.scene = scene
    this.effects = effects
    this.projectiles = []
    this.geo = new THREE.SphereGeometry(0.13, 8, 8)
  }

  spawn (origin, target, color, speed = 10, damage = 8) {
    const mat = new THREE.MeshBasicMaterial({ color, toneMapped: false })
    const mesh = new THREE.Mesh(this.geo, mat)
    mesh.position.copy(origin)
    this.scene.add(mesh)
    const dir = new THREE.Vector3().subVectors(target, origin).normalize()
    this.projectiles.push({
      mesh,
      velocity: dir.multiplyScalar(speed),
      life: 4,
      damage,
      trail: 0,
      color,
    })
    this.effects.sprite(origin, color, 0.35, 0.12)
  }

  update (dt, playerPosition, playerRadius = 0.7) {
    let totalDamage = 0
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i]
      p.life -= dt
      p.mesh.position.addScaledVector(p.velocity, dt)
      p.trail -= dt
      if (p.trail <= 0) {
        p.trail = 0.05
        this.effects.particles.spawn({
          position: p.mesh.position.clone(),
          velocity: new THREE.Vector3(0, 0, 0),
          color: p.color,
          size: 0.06,
          life: 0.3,
          drag: 0.9,
        })
      }
      const d = p.mesh.position.distanceTo(playerPosition)
      const floor = p.mesh.position.y < 0.1
      if (d < playerRadius + 0.18) {
        totalDamage += p.damage
        this.effects.impact(p.mesh.position.clone(), p.color)
        this.scene.remove(p.mesh)
        p.mesh.material.dispose()
        this.projectiles.splice(i, 1)
      } else if (p.life <= 0 || floor || Math.hypot(p.mesh.position.x, p.mesh.position.z) > 27) {
        this.scene.remove(p.mesh)
        p.mesh.material.dispose()
        this.projectiles.splice(i, 1)
      }
    }
    return totalDamage
  }

  clear () {
    for (const p of this.projectiles) {
      this.scene.remove(p.mesh)
      p.mesh.material.dispose()
    }
    this.projectiles.length = 0
  }
}

/* ───────────────────────────── void field ───────────────────────────── */

export class VoidField {
  constructor (scene, effects, position, weapon) {
    this.scene = scene
    this.effects = effects
    this.position = position.clone()
    this.position.y = Math.max(0.5, position.y)
    this.life = 2.2
    this.weapon = weapon
    const group = new THREE.Group()
    group.position.copy(this.position)
    const mat = new THREE.MeshBasicMaterial({
      color: weapon.color, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
    })
    this.ring = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.02, 5, 30), mat)
    this.ring.rotation.x = Math.PI / 2
    group.add(this.ring)
    this.ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.01, 5, 20), mat.clone())
    this.ring2.rotation.y = Math.PI / 2
    group.add(this.ring2)
    this.core = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 10), new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }))
    group.add(this.core)
    this.group = group
    scene.add(group)
  }

  update (dt, enemies) {
    this.life -= dt
    const k = Math.max(0, this.life / 2.2)
    this.group.rotation.y += dt * 2.2
    this.ring.rotation.z += dt * 1.8
    this.ring2.rotation.x += dt * 2.5
    this.group.scale.setScalar(1 + (1 - k) * 0.7)
    enemies.applyPull(this.position, 7.5, 14, dt)
    if (this.life <= 0) {
      this.effects.explosion(this.position, this.weapon.color, 2.2)
      this.scene.remove(this.group)
      this.group.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) obj.material.dispose()
      })
      return false
    }
    return true
  }
}
