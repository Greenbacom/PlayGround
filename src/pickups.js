// Açaí, maracujá, guaraná and moedas — floating pickups.
import * as THREE from 'three'
import { rand, pick, glowTexture, TAU } from './utils.js'

export class PickupManager {
  constructor(game) {
    this.game = game
    this.list = []
  }

  reset() {
    for (const p of this.list) {
      this.game.world.scene.remove(p.group)
      p.group.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.() })
    }
    this.list.length = 0
  }

  spawn(type, pos) {
    const g = new THREE.Group()
    let glowColor = 0xffcf3f
    if (type === 'acai') {
      glowColor = 0xb05cff
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.2, 0.18, 12), new THREE.MeshLambertMaterial({ color: 0x5b3a2a }))
      bowl.position.y = 0.02
      g.add(bowl)
      const acai = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 8, 0, TAU, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x5a1f8a, emissive: 0x2a0a4a, emissiveIntensity: 0.8 }))
      acai.position.y = 0.11
      g.add(acai)
      const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42, 5), new THREE.MeshLambertMaterial({ color: 0xffcf3f }))
      straw.position.set(0.1, 0.35, 0.02)
      straw.rotation.z = -0.4
      g.add(straw)
    } else if (type === 'shield') {
      glowColor = 0xffd54a
      const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 9), new THREE.MeshLambertMaterial({ color: 0xffcf3f, emissive: 0x6a4a08, emissiveIntensity: 0.9 }))
      g.add(fruit)
      for (let i = 0; i < 3; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.3, 4), new THREE.MeshLambertMaterial({ color: 0x2f8a4a }))
        leaf.position.set(Math.cos(i * 2.1) * 0.12, 0.22, Math.sin(i * 2.1) * 0.12)
        leaf.rotation.z = Math.cos(i * 2.1) * 0.9
        leaf.rotation.x = Math.sin(i * 2.1) * 0.9
        g.add(leaf)
      }
    } else if (type === 'rapid') {
      glowColor = 0xff3d5a
      const can = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.42, 10), new THREE.MeshLambertMaterial({ color: 0xc42430, emissive: 0x4a0810, emissiveIntensity: 0.8 }))
      g.add(can)
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.145, 0.1, 10), new THREE.MeshLambertMaterial({ color: 0xffcf3f }))
      g.add(band)
      const top = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.06, 10), new THREE.MeshLambertMaterial({ color: 0xb8b8c0 }))
      top.position.y = 0.23
      g.add(top)
    } else {
      glowColor = 0xffcf3f
      const coin = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.06, 6, 16), new THREE.MeshLambertMaterial({ color: 0xffcf3f, emissive: 0x6a4a08, emissiveIntensity: 0.9 }))
      g.add(coin)
      const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.02, 12), new THREE.MeshLambertMaterial({ color: 0xffe08a }))
      inner.rotation.x = Math.PI / 2
      g.add(inner)
    }

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,255,255,0.9)', 'rgba(255,120,40,0)'),
      color: glowColor, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.85,
    }))
    glow.scale.set(1.9, 1.9, 1)
    g.add(glow)

    const ground = new THREE.Mesh(
      new THREE.RingGeometry(0.32, 0.4, 20),
      new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.62
    g.add(ground)

    const p = new THREE.Vector3(pos.x, 0.95, pos.z)
    this.game.world.collide(p, 0.4)
    g.position.set(p.x, 0.95, p.z)
    this.game.world.scene.add(g)
    this.list.push({ type, group: g, life: 15, baseY: 0.95, phase: rand(0, TAU), color: glowColor })
  }

  update(dt) {
    const pp = this.game.player.position
    for (let i = this.list.length - 1; i >= 0; i--) {
      const p = this.list[i]
      p.life -= dt
      p.group.rotation.y += dt * 1.8
      p.group.position.y = p.baseY + Math.sin(this.game.world.time * 2.4 + p.phase) * 0.12
      if (p.life < 3.5) {
        p.group.visible = Math.sin(p.life * 16) > -0.2
      }
      const d = Math.hypot(p.group.position.x - pp.x, p.group.position.z - pp.z)
      if (d < 1.5 && p.life > 0) {
        this.game.effects.ring(p.group.position, { color: p.color, from: 0.2, to: 2.4, life: 0.4, flat: false })
        this.game.effects.spawnParticles(p.group.position, 14, { color: p.color, color2: 0xffffff, speed: 4, spread: 0.4, life: 0.5, size: 0.4, gravity: 1 })
        this.game.onPickup(p.type)
        this.game.world.scene.remove(p.group)
        p.group.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.() })
        this.list.splice(i, 1)
        continue
      }
      if (p.life <= 0) {
        this.game.world.scene.remove(p.group)
        p.group.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.() })
        this.list.splice(i, 1)
      }
    }
  }
}
