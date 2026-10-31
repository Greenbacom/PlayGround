import * as THREE from "three";

export const ENEMY_TYPES = {
  vespa: {
    name: "VESPA",
    hp: 24,
    radius: 0.62,
    speed: 3.1,
    orbit: [5.2, 9.0],
    height: [1.8, 3.2],
    fire: 0,
    score: 100,
    color: 0x9be564,
    accent: 0x44e0b0,
    scale: 0.84,
  },
  olho: {
    name: "OLHO",
    hp: 46,
    radius: 0.78,
    speed: 1.7,
    orbit: [8.2, 13.0],
    height: [2.1, 3.4],
    fire: 2.8,
    score: 150,
    color: 0xff4d8d,
    accent: 0xffa6ca,
    scale: 1,
  },
  tambor: {
    name: "TAMBOR",
    hp: 92,
    radius: 1.02,
    speed: 1.05,
    orbit: [6.8, 10.8],
    height: [1.9, 2.9],
    fire: 3.5,
    score: 240,
    color: 0xffa33f,
    accent: 0xff6f45,
    scale: 1.2,
  },
  mother: {
    name: "NÉVOA-MÃE",
    hp: 620,
    radius: 2.1,
    speed: 0.7,
    orbit: [8.0, 11.5],
    height: [3.0, 3.7],
    fire: 2.3,
    score: 2200,
    color: 0xff3b8b,
    accent: 0xffd15c,
    scale: 1.95,
    boss: true,
  },
};

function finGeometry() {
  const geo = new THREE.ConeGeometry(0.15, 0.7, 4);
  geo.rotateX(Math.PI / 2);
  return geo;
}

export function createEnemyVisual(type, glowTexture) {
  const cfg = ENEMY_TYPES[type];
  const group = new THREE.Group();
  const boss = !!cfg.boss;
  const s = cfg.scale;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x18142e,
    roughness: 0.34,
    metalness: 0.68,
    flatShading: true,
    emissive: new THREE.Color(cfg.color).multiplyScalar(0.18),
    emissiveIntensity: 0.5,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(cfg.color).multiplyScalar(0.55),
    roughness: 0.28,
    metalness: 0.55,
    emissive: new THREE.Color(cfg.color),
    emissiveIntensity: 0.5,
  });
  const eyeMat = new THREE.MeshBasicMaterial({ color: cfg.color });
  const coreMat = new THREE.MeshBasicMaterial({ color: cfg.accent });

  const body = new THREE.Mesh(new THREE.IcosahedronGeometry(0.56 * s, boss ? 1 : 0), bodyMat);
  body.scale.set(1, boss ? 0.86 : 0.72, 0.9);
  group.add(body);

  // Eye assembly (the +Z face is turned toward the player)
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.235 * s, 12, 8), eyeMat);
  eye.position.z = 0.47 * s;
  eye.scale.set(1, 0.86, 0.5);
  group.add(eye);
  const iris = new THREE.Mesh(new THREE.TorusGeometry(0.27 * s, 0.035 * s, 5, 18), trimMat);
  iris.position.z = 0.5 * s;
  group.add(iris);
  const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.075 * s, 7, 5), coreMat);
  pupil.position.z = 0.63 * s;
  group.add(pupil);

  // Additional smaller eyes for the boss
  if (boss) {
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const small = new THREE.Mesh(new THREE.SphereGeometry(0.15 * s, 9, 6), eyeMat);
      small.position.set(Math.cos(a) * 0.65 * s, Math.sin(a) * 0.42 * s, 0.42 * s);
      small.scale.set(1, 0.8, 0.45);
      group.add(small);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.16 * s, 0.02 * s, 4, 12), trimMat);
      ring.position.copy(small.position);
      ring.position.z += 0.04 * s;
      group.add(ring);
    }
  }

  // Orbiting rings
  const rings = [];
  const ringCount = boss ? 3 : 2;
  for (let i = 0; i < ringCount; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry((0.78 + i * 0.12) * s, 0.018 * s, 5, 26),
      trimMat
    );
    ring.rotation.x = 0.7 + i * 0.85;
    ring.rotation.y = i * 0.9;
    group.add(ring);
    rings.push({ mesh: ring, speed: (i % 2 ? -1 : 1) * (0.7 + i * 0.4), axis: i % 2 ? "x" : "y" });
  }

  // Swept fins
  const finMat = new THREE.MeshStandardMaterial({
    color: 0x211c3d,
    roughness: 0.42,
    metalness: 0.52,
    flatShading: true,
  });
  for (let i = 0; i < 3; i++) {
    const fin = new THREE.Mesh(finGeometry(), finMat);
    const a = (i / 3) * Math.PI * 2 + 0.5;
    fin.position.set(Math.cos(a) * 0.57 * s, Math.sin(a) * 0.17 * s, -0.1 * s);
    fin.rotation.z = a - Math.PI / 2;
    fin.scale.setScalar(s * (boss ? 1.25 : 1));
    group.add(fin);
  }

  // Glow / charge sprite
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture,
    color: cfg.color,
    transparent: true,
    opacity: 0.52,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  glow.position.z = 0.7 * s;
  glow.scale.setScalar(1.3 * s);
  group.add(glow);

  // Antennae
  const antennaMat = new THREE.MeshBasicMaterial({ color: cfg.accent });
  for (const side of [-1, 1]) {
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.01 * s, 0.012 * s, 0.55 * s, 4), finMat);
    antenna.position.set(side * 0.19 * s, 0.48 * s, 0);
    antenna.rotation.z = side * 0.36;
    group.add(antenna);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.035 * s, 6, 4), antennaMat);
    tip.position.set(side * 0.29 * s, 0.73 * s, 0);
    group.add(tip);
  }

  // Boss crown
  if (boss) {
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.11 * s, 0.8 * s, 4), trimMat);
      horn.position.set(Math.cos(a) * 0.6 * s, 0.62 * s, Math.sin(a) * 0.4 * s);
      horn.rotation.z = Math.cos(a) * 0.55;
      horn.rotation.x = Math.sin(a) * 0.35;
      group.add(horn);
    }
  }

  group.userData = { bodyMat, trimMat, eyeMat, eye, iris, pupil, rings, glow, cfg, boss };
  return group;
}

export function disposeObject3D(object) {
  object.traverse((child) => {
    // Sprite geometry is shared between every sprite in three.js.
    if (child.geometry && !child.isSprite) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
      else child.material.dispose();
    }
  });
}
