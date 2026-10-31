import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { glowTexture, brazilPatchTexture } from './textures.js'

export const WEAPONS = {
  rifle: {
    id: 'rifle',
    name: 'IAUARETÊ-77',
    type: 'FUZIL DE ASSALTO',
    mode: 'AUTO',
    caliber: '5.56',
    magSize: 30,
    reserveMax: 240,
    rate: 0.105,
    damage: 27,
    headshot: 2.5,
    spread: 0.0085,
    pellets: 1,
    auto: true,
    reloadTime: 1.38,
    sound: 'rifle',
    recoil: 1,
    range: 95,
    adsSpread: 0.0018,
    muzzle: new THREE.Vector3(0.235, -0.15, -0.82),
  },
  shotgun: {
    id: 'shotgun',
    name: 'BERIMBAU-12',
    type: 'ESPINGARDA',
    mode: 'SEMI',
    caliber: 'CAL 12',
    magSize: 6,
    reserveMax: 48,
    rate: 0.68,
    damage: 13,
    headshot: 1.6,
    spread: 0.052,
    pellets: 9,
    auto: false,
    reloadTime: 1.95,
    sound: 'shotgun',
    recoil: 2.5,
    range: 45,
    adsSpread: 0.034,
    muzzle: new THREE.Vector3(0.21, -0.14, -0.72),
  },
}

const MAT = {
  metal: new THREE.MeshStandardMaterial({ color: 0x202a29, metalness: 0.78, roughness: 0.32 }),
  metalDark: new THREE.MeshStandardMaterial({ color: 0x0c1211, metalness: 0.62, roughness: 0.42 }),
  metalLight: new THREE.MeshStandardMaterial({ color: 0x53605c, metalness: 0.85, roughness: 0.25 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x6e3b22, roughness: 0.58, metalness: 0.08 }),
  woodDark: new THREE.MeshStandardMaterial({ color: 0x442415, roughness: 0.66 }),
  acid: new THREE.MeshStandardMaterial({ color: 0xd9ff45, emissive: 0xd9ff45, emissiveIntensity: 0.55, metalness: 0.35, roughness: 0.35 }),
  gold: new THREE.MeshStandardMaterial({ color: 0xd2a84c, metalness: 0.85, roughness: 0.24 }),
  red: new THREE.MeshStandardMaterial({ color: 0xff3e80, emissive: 0xff3e80, emissiveIntensity: 1.4, metalness: 0.3, roughness: 0.35 }),
  skin: new THREE.MeshStandardMaterial({ color: 0x8c5a3c, roughness: 0.72, metalness: 0 }),
  skinDark: new THREE.MeshStandardMaterial({ color: 0x6f432b, roughness: 0.75 }),
  sleeve: new THREE.MeshStandardMaterial({ color: 0x1a3025, roughness: 0.85 }),
  glove: new THREE.MeshStandardMaterial({ color: 0x101512, roughness: 0.7 }),
  lens: new THREE.MeshStandardMaterial({ color: 0x3b0a13, emissive: 0xff3e80, emissiveIntensity: 2.4, metalness: 0.2, roughness: 0.2 }),
  reticle: new THREE.MeshBasicMaterial({ color: 0xff4055 }),
}

function rounded(w, h, d, radius = 0.02, mat = MAT.metal) {
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(radius, Math.min(w, h, d) * 0.45)), mat)
}

function box(w, h, d, mat, x = 0, y = 0, z = 0, group) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
  m.position.set(x, y, z)
  group?.add(m)
  return m
}

function cyl(rt, rb, h, mat, x = 0, y = 0, z = 0, seg = 12, group) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat)
  m.position.set(x, y, z)
  group?.add(m)
  return m
}

function capsule(radius, length, mat, x, y, z, group) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 4, 8), mat)
  m.position.set(x, y, z)
  group?.add(m)
  return m
}

function addHands(group, opts = {}) {
  const right = new THREE.Group()
  right.position.set(0.02, -0.16, 0.17)
  right.rotation.set(-0.25, 0, -0.2)
  group.add(right)
  const rpalm = rounded(0.11, 0.15, 0.15, 0.04, MAT.glove)
  right.add(rpalm)
  const rthumb = capsule(0.028, 0.08, MAT.glove, -0.04, 0.07, -0.02, right)
  rthumb.rotation.z = 0.7
  const rfinger = rounded(0.03, 0.1, 0.06, 0.014, MAT.glove)
  rfinger.position.set(0.045, 0.07, -0.04)
  rfinger.rotation.z = -0.2
  right.add(rfinger)
  const rsleeve = capsule(0.075, 0.24, MAT.sleeve, 0.01, -0.15, 0.12, right)
  rsleeve.rotation.x = 0.8
  const rskin = capsule(0.052, 0.1, MAT.skin, 0.005, -0.02, 0.04, right)
  rskin.rotation.x = 0.6

  const left = new THREE.Group()
  left.position.set(-0.02, -0.13, opts.leftZ ?? -0.25)
  left.rotation.set(0.1, 0, 0.35)
  group.add(left)
  const lpalm = rounded(0.12, 0.1, 0.16, 0.04, MAT.glove)
  left.add(lpalm)
  for (let i = 0; i < 3; i++) {
    const f = capsule(0.024, 0.065, MAT.glove, -0.035 + i * 0.035, 0.065, -0.03, left)
    f.rotation.x = -0.65
  }
  const lsleeve = capsule(0.08, 0.28, MAT.sleeve, 0, -0.12, 0.18, left)
  lsleeve.rotation.x = -0.65
  const lskin = capsule(0.052, 0.11, MAT.skin, 0, -0.005, 0.07, left)
  lskin.rotation.x = -0.4
}

function buildRifle() {
  const g = new THREE.Group()

  // Receiver.
  const body = rounded(0.12, 0.17, 0.55, 0.025, MAT.metal)
  body.position.set(0, 0.01, -0.03)
  g.add(body)
  const upper = rounded(0.1, 0.07, 0.5, 0.018, MAT.metalDark)
  upper.position.set(0, 0.115, -0.06)
  g.add(upper)
  const topRail = box(0.075, 0.022, 0.42, MAT.metalLight, 0, 0.16, -0.05, g)
  for (let i = 0; i < 7; i++) {
    const tooth = box(0.085, 0.018, 0.018, MAT.metalDark, 0, 0.172, -0.24 + i * 0.065, g)
    tooth.rotation.x = 0
  }
  // Barrel + handguard.
  const barrel = cyl(0.026, 0.029, 0.52, MAT.metalDark, 0, 0.035, -0.48, 14, g)
  barrel.rotation.x = Math.PI / 2
  const brake = cyl(0.044, 0.038, 0.11, MAT.metalLight, 0, 0.035, -0.77, 10, g)
  brake.rotation.x = Math.PI / 2
  const brakeRing = cyl(0.048, 0.048, 0.022, MAT.acid, 0, 0.035, -0.72, 10, g)
  brakeRing.rotation.x = Math.PI / 2
  const handguard = rounded(0.13, 0.13, 0.32, 0.03, MAT.metal)
  handguard.position.set(0, 0.035, -0.35)
  g.add(handguard)
  for (let i = 0; i < 4; i++) {
    const slot = box(0.135, 0.012, 0.035, MAT.metalDark, 0, 0.09 - i * 0.028, -0.36, g)
    slot.castShadow = false
  }
  const sideAccent = box(0.012, 0.035, 0.3, MAT.acid, 0.066, 0.04, -0.34, g)
  sideAccent.castShadow = false
  // Magazine.
  const mag = rounded(0.085, 0.26, 0.13, 0.025, MAT.metalDark)
  mag.position.set(0, -0.17, -0.01)
  mag.rotation.x = -0.13
  g.add(mag)
  const magAccent = box(0.09, 0.03, 0.135, MAT.acid, 0, -0.28, -0.025, g)
  magAccent.rotation.x = -0.13
  // Grip + stock.
  const grip = rounded(0.09, 0.22, 0.11, 0.03, MAT.metalDark)
  grip.position.set(0, -0.13, 0.2)
  grip.rotation.x = 0.25
  g.add(grip)
  const stock = rounded(0.11, 0.15, 0.3, 0.03, MAT.wood)
  stock.position.set(0, -0.005, 0.38)
  g.add(stock)
  const stockPad = rounded(0.12, 0.17, 0.035, 0.02, MAT.metalDark)
  stockPad.position.set(0, -0.005, 0.535)
  g.add(stockPad)
  // Sights.
  const sightBase = box(0.07, 0.05, 0.12, MAT.metalDark, 0, 0.19, -0.03, g)
  const sightHood = box(0.065, 0.09, 0.03, MAT.metalDark, 0, 0.235, 0.015, g)
  const reticle = box(0.028, 0.028, 0.008, MAT.reticle, 0, 0.235, -0.002, g)
  const frontPost = box(0.018, 0.07, 0.02, MAT.metalDark, 0, 0.215, -0.48, g)
  // Trigger guard.
  const guard = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.012, 5, 12, Math.PI), MAT.metalDark)
  guard.position.set(0, -0.085, 0.14)
  guard.rotation.set(Math.PI / 2, 0, 0)
  g.add(guard)
  // Brazilian patch.
  const patchMat = new THREE.MeshBasicMaterial({ map: brazilPatchTexture(), transparent: true })
  const patch = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.075), patchMat)
  patch.position.set(0.0615, 0.015, 0.05)
  patch.rotation.y = Math.PI / 2
  g.add(patch)
  // Charm: tiny gold ring on the side.
  const charm = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.006, 5, 10), MAT.gold)
  charm.position.set(0.085, -0.06, 0.14)
  charm.rotation.y = Math.PI / 2
  g.add(charm)
  const charm2 = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), MAT.acid)
  charm2.position.set(0.086, -0.1, 0.14)
  g.add(charm2)
  // Laser module.
  const laser = rounded(0.06, 0.06, 0.13, 0.015, MAT.metalDark)
  laser.position.set(0.075, 0.07, -0.28)
  g.add(laser)
  const laserLens = new THREE.Mesh(new THREE.CircleGeometry(0.017, 10), MAT.red)
  laserLens.position.set(0.108, 0.07, -0.28)
  laserLens.rotation.y = Math.PI / 2
  g.add(laserLens)
  // Sling.
  const sling = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.012, 4, 20, Math.PI * 0.8), MAT.sleeve)
  sling.position.set(0.02, -0.1, 0.26)
  sling.rotation.set(0.2, 0.2, 0.1)
  g.add(sling)
  addHands(g, { leftZ: -0.3 })
  // Muzzle flash anchor.
  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, 0.035, -0.84)
  g.add(muzzle)
  return { group: g, muzzle, pump: null }
}

function buildShotgun() {
  const g = new THREE.Group()
  // Receiver.
  const body = rounded(0.14, 0.17, 0.4, 0.028, MAT.metal)
  body.position.set(0, 0.01, -0.02)
  g.add(body)
  const top = rounded(0.12, 0.06, 0.32, 0.02, MAT.metalDark)
  top.position.set(0, 0.12, -0.04)
  g.add(top)
  // Twin barrels.
  for (const x of [-0.035, 0.035]) {
    const barrel = cyl(0.027, 0.03, 0.67, MAT.metalDark, x, 0.055, -0.47, 14, g)
    barrel.rotation.x = Math.PI / 2
    const ring = cyl(0.034, 0.034, 0.018, MAT.gold, x, 0.055, -0.68, 10, g)
    ring.rotation.x = Math.PI / 2
  }
  const barrelBand = box(0.15, 0.075, 0.06, MAT.metal, 0, 0.055, -0.25, g)
  // Pump.
  const pumpGroup = new THREE.Group()
  pumpGroup.position.set(0, 0.02, -0.34)
  g.add(pumpGroup)
  const pump = rounded(0.16, 0.14, 0.27, 0.035, MAT.wood)
  pumpGroup.add(pump)
  for (let i = 0; i < 5; i++) {
    const groove = box(0.165, 0.012, 0.018, MAT.woodDark, 0, 0.04 - i * 0.02, 0.08, pumpGroup)
    groove.castShadow = false
  }
  const pumpAccent = box(0.168, 0.02, 0.22, MAT.acid, 0, -0.06, 0.02, pumpGroup)
  pumpAccent.castShadow = false
  // Stock.
  const stock = rounded(0.12, 0.16, 0.34, 0.03, MAT.wood)
  stock.position.set(0, -0.01, 0.36)
  g.add(stock)
  const pad = rounded(0.135, 0.18, 0.04, 0.02, MAT.metalDark)
  pad.position.set(0, -0.01, 0.53)
  g.add(pad)
  // Grip.
  const grip = rounded(0.09, 0.2, 0.11, 0.03, MAT.woodDark)
  grip.position.set(0, -0.12, 0.18)
  grip.rotation.x = 0.22
  g.add(grip)
  // Shell holder.
  const shells = new THREE.Group()
  shells.position.set(0.085, -0.02, 0.06)
  g.add(shells)
  for (let i = 0; i < 3; i++) {
    const shell = cyl(0.025, 0.025, 0.11, MAT.red, 0, -0.07 + i * 0.065, 0, 8, shells)
    shell.rotation.z = Math.PI / 2
    const cap = cyl(0.026, 0.026, 0.025, MAT.gold, 0, -0.07 + i * 0.065, 0.055, 8, shells)
    cap.rotation.z = Math.PI / 2
  }
  // Sight.
  const sight = box(0.022, 0.045, 0.025, MAT.gold, 0, 0.16, -0.37, g)
  const rear = box(0.06, 0.05, 0.03, MAT.metalDark, 0, 0.16, 0.02, g)
  const reticle = box(0.02, 0.02, 0.008, MAT.reticle, 0, 0.17, 0.003, g)
  // Brazilian patch.
  const patch = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.08), new THREE.MeshBasicMaterial({ map: brazilPatchTexture(), transparent: true }))
  patch.position.set(0.0715, 0.01, 0.05)
  patch.rotation.y = Math.PI / 2
  g.add(patch)
  addHands(g, { leftZ: -0.36 })
  const muzzle = new THREE.Object3D()
  muzzle.position.set(0, 0.055, -0.82)
  g.add(muzzle)
  return { group: g, muzzle, pump: pumpGroup }
}

export class WeaponRig {
  constructor(renderer) {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(58, 1, 0.01, 20)

    // Metals need something to reflect. A neutral studio environment keeps the
    // gun readable against the dark favela without washing out the neon mood.
    if (renderer) {
      const pmrem = new THREE.PMREMGenerator(renderer)
      const envScene = new RoomEnvironment()
      this.envMap = pmrem.fromScene(envScene, 0.04).texture
      this.scene.environment = this.envMap
      this.scene.environmentIntensity = 0.55
      envScene.dispose?.()
      pmrem.dispose()
    }
    this.root = new THREE.Group()
    this.root.position.set(0.27, -0.255, -0.55)
    this.root.rotation.set(0.02, -0.075, 0.015)
    this.scene.add(this.root)

    this.ambient = new THREE.AmbientLight(0xdfe9d4, 1.0)
    this.scene.add(this.ambient)
    this.key = new THREE.DirectionalLight(0xffc98e, 3.2)
    this.key.position.set(2.4, 3.2, 2.2)
    this.scene.add(this.key)
    this.rim = new THREE.PointLight(0xff3e80, 2.5, 6, 2)
    this.rim.position.set(-1.6, 0.4, 1.0)
    this.scene.add(this.rim)
    this.fill = new THREE.PointLight(0x46f2d0, 1.7, 5, 2)
    this.fill.position.set(1.4, -0.8, 0.2)
    this.scene.add(this.fill)

    this.rifle = buildRifle()
    this.shotgun = buildShotgun()
    this.rifle.group.visible = true
    this.shotgun.group.visible = false
    this.root.add(this.rifle.group)
    this.root.add(this.shotgun.group)

    // Muzzle flash: two crossed cards plus a short cone.
    this.flash = new THREE.Group()
    this.flash.visible = false
    const flashTex = glowTexture()
    const flashMat = new THREE.MeshBasicMaterial({
      map: flashTex,
      color: 0xffc25a,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), flashMat)
    const p2 = p1.clone()
    p2.rotation.z = Math.PI / 2
    this.flash.add(p1, p2)
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff1bd, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }))
    this.flash.add(core)
    this.flashLight = new THREE.PointLight(0xffb04a, 0, 2.4, 2)
    this.scene.add(this.flashLight)

    this.current = 'rifle'
    this.group = this.rifle
    this.flashT = 0
    this.recoil = 0
    this.recoilVel = 0
    this.bobTime = 0
    this.adsBlend = 0
    this.reloadT = 0
    this.reloadDuration = 0
    this.pumpT = 0
    this.switchT = 0
    this.switchTarget = null
    this.lookSway = new THREE.Vector2()
    this.muzzleWorld = new THREE.Vector3()
    this.quat = new THREE.Quaternion()
    this.basePos = new THREE.Vector3(0.27, -0.255, -0.55)
    this.baseRot = new THREE.Euler(0.02, -0.075, 0.015)
    this.adsPos = new THREE.Vector3(0, -0.145, -0.42)
    this.adsRot = new THREE.Euler(0.005, 0, 0)
  }

  resize(aspect) {
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }

  setWeapon(id, instant = false) {
    if (id === this.current) return
    if (instant) {
      this._applyWeapon(id)
      return
    }
    this.switchTarget = id
    this.switchT = 0.34
  }

  _applyWeapon(id) {
    this.current = id
    this.group = id === 'rifle' ? this.rifle : this.shotgun
    this.rifle.group.visible = id === 'rifle'
    this.shotgun.group.visible = id === 'shotgun'
    this.switchTarget = null
  }

  startReload(duration) {
    this.reloadT = duration
    this.reloadDuration = duration
  }

  cancelReload() {
    this.reloadT = 0
    this.reloadDuration = 0
  }

  fire(power = 1) {
    this.recoil = Math.min(1.8, this.recoil + 0.85 * power)
    this.recoilVel += 2.2 * power
    this.flashT = 0.055
    this.flash.visible = true
    this.flash.rotation.z = Math.random() * Math.PI
    this.flash.scale.setScalar(0.7 + Math.random() * 0.5)
    if (this.current === 'shotgun') this.pumpT = 0.48
    const muzzle = this.current === 'rifle' ? this.rifle.muzzle : this.shotgun.muzzle
    muzzle.getWorldPosition(this.muzzleWorld)
    this.flash.position.copy(this.muzzleWorld)
    this.flashLight.position.copy(this.muzzleWorld)
    this.flashLight.intensity = 4.5
  }

  update(dt, state = {}) {
    const ads = state.ads ? 1 : 0
    this.adsBlend += (ads - this.adsBlend) * Math.min(1, dt * 13)
    const move = state.moveAmount ?? 0
    const sprint = state.sprint ? 1 : 0
    this.bobTime += dt * (5 + move * 7 + sprint * 4)
    this.lookSway.lerp(new THREE.Vector2(state.lookX || 0, state.lookY || 0), Math.min(1, dt * 10))

    if (this.switchT > 0) {
      this.switchT -= dt
      if (this.switchT <= 0.17 && this.switchTarget) {
        this._applyWeapon(this.switchTarget)
      }
    }

    this.recoil += this.recoilVel * dt
    this.recoilVel -= this.recoil * 42 * dt
    this.recoilVel *= Math.pow(0.0025, dt)
    this.recoil *= Math.pow(0.0001, dt)
    if (Math.abs(this.recoil) < 0.001) this.recoil = 0

    if (this.reloadT > 0) {
      this.reloadT = Math.max(0, this.reloadT - dt)
      const progress = 1 - this.reloadT / this.reloadDuration
      const dip = Math.sin(Math.min(1, progress) * Math.PI)
      this.root.position.y = this.basePos.y - dip * 0.18
      this.root.rotation.z = this.baseRot.z + dip * 0.25
      this.root.rotation.x = this.baseRot.x + dip * 0.35
    } else {
      this.root.rotation.z = THREE.MathUtils.lerp(this.root.rotation.z, this.baseRot.z, Math.min(1, dt * 10))
      this.root.rotation.x = THREE.MathUtils.lerp(this.root.rotation.x, this.baseRot.x, Math.min(1, dt * 10))
      this.root.position.y = THREE.MathUtils.lerp(this.root.position.y, this.basePos.y, Math.min(1, dt * 12))
    }

    const swayScale = 1 - this.adsBlend * 0.65
    const bobX = Math.sin(this.bobTime) * 0.009 * move * swayScale
    const bobY = Math.abs(Math.cos(this.bobTime * 2)) * 0.006 * move * swayScale
    const sprintX = sprint * Math.sin(this.bobTime * 0.5) * 0.025
    const sprintY = sprint * Math.cos(this.bobTime) * 0.018
    const switchDip = this.switchT > 0 ? Math.sin((1 - this.switchT / 0.34) * Math.PI) * 0.18 : 0

    const targetPos = new THREE.Vector3().lerpVectors(this.basePos, this.adsPos, this.adsBlend)
    targetPos.x += bobX + sprintX - this.lookSway.x * 0.025 * swayScale
    targetPos.y += bobY + sprintY - this.lookSway.y * 0.02 * swayScale - switchDip
    targetPos.z += this.recoil * 0.035
    this.root.position.lerp(targetPos, Math.min(1, dt * 15))

    const targetRotX = THREE.MathUtils.lerp(this.baseRot.x, this.adsRot.x, this.adsBlend) + this.recoil * 0.13 - this.lookSway.y * 0.03 * swayScale
    const targetRotY = THREE.MathUtils.lerp(this.baseRot.y, this.adsRot.y, this.adsBlend) + this.lookSway.x * 0.045 * swayScale
    const targetRotZ = THREE.MathUtils.lerp(this.baseRot.z, this.adsRot.z, this.adsBlend) - sprint * 0.12
    this.root.rotation.x += (targetRotX - this.root.rotation.x) * Math.min(1, dt * 18)
    this.root.rotation.y += (targetRotY - this.root.rotation.y) * Math.min(1, dt * 18)
    if (this.reloadT <= 0) this.root.rotation.z += (targetRotZ - this.root.rotation.z) * Math.min(1, dt * 14)

    this.camera.fov = THREE.MathUtils.lerp(58, 45, this.adsBlend)
    this.camera.updateProjectionMatrix()

    if (this.flashT > 0) {
      this.flashT -= dt
      this.flash.rotation.z += dt * 20
      this.flash.scale.multiplyScalar(1 - dt * 6)
      this.flashLight.intensity = Math.max(0, this.flashLight.intensity - dt * 90)
      if (this.flashT <= 0) this.flash.visible = false
    }

    if (this.pumpT > 0) {
      this.pumpT = Math.max(0, this.pumpT - dt)
      const t = 1 - this.pumpT / 0.48
      const back = Math.sin(Math.min(1, t) * Math.PI) * 0.12
      if (this.shotgun.pump) this.shotgun.pump.position.z = -0.34 + back
    }
  }

  getMuzzleWorld(camera, target = new THREE.Vector3()) {
    const def = WEAPONS[this.current]
    target.copy(def.muzzle).applyQuaternion(camera.quaternion).add(camera.position)
    return target
  }
}
