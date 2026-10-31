import * as THREE from "three";

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,240,1)");
  g.addColorStop(0.14, "rgba(255,246,190,.95)");
  g.addColorStop(0.36, "rgba(255,180,76,.55)");
  g.addColorStop(0.7, "rgba(255,77,47,.1)");
  g.addColorStop(1, "rgba(255,77,47,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function rbox(w, h, d, r, material, x = 0, y = 0, z = 0) {
  const geo = new THREE.BoxGeometry(w, h, d, 1, 1, 1);
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return mesh;
}

function cyl(rt, rb, h, seg, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), material);
  mesh.position.set(x, y, z);
  return mesh;
}

function limb(from, to, radius, material, taper = 0.82) {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const dir = new THREE.Vector3().subVectors(b, a);
  const length = dir.length();
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * taper, radius, length, 9),
    material
  );
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return mesh;
}

export function createWeapon() {
  const root = new THREE.Group();
  const pivot = new THREE.Group();
  root.add(pivot);

  const metal = new THREE.MeshStandardMaterial({ color: 0x1d2948, roughness: 0.34, metalness: 0.82 });
  const metalLight = new THREE.MeshStandardMaterial({ color: 0x41617f, roughness: 0.32, metalness: 0.76 });
  const teal = new THREE.MeshStandardMaterial({ color: 0x0d726d, roughness: 0.5, metalness: 0.35 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x7b4831, roughness: 0.75 });
  const brass = new THREE.MeshStandardMaterial({ color: 0xd5a647, roughness: 0.28, metalness: 0.75 });
  const coral = new THREE.MeshStandardMaterial({ color: 0xef583d, roughness: 0.45, metalness: 0.28 });
  const cream = new THREE.MeshStandardMaterial({ color: 0xe9dcc0, roughness: 0.6, metalness: 0.2 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x0c1126, roughness: 0.55, metalness: 0.4 });

  // Receiver: slim, teal-and-brass, with coral inlays so the silhouette reads
  // even when the phone crops the stock off the bottom of the screen.
  pivot.add(rbox(0.135, 0.13, 0.42, 0.03, metal, 0, 0, -0.16));
  pivot.add(rbox(0.105, 0.045, 0.4, 0.02, metalLight, 0, 0.078, -0.17));
  pivot.add(rbox(0.145, 0.035, 0.2, 0.015, teal, 0, 0.045, -0.1));
  for (const side of [-1, 1]) {
    const plate = rbox(0.012, 0.06, 0.2, 0.01, coral, side * 0.073, -0.005, -0.18);
    pivot.add(plate);
    const notch = rbox(0.015, 0.012, 0.12, 0.006, brass, side * 0.079, -0.038, -0.17);
    pivot.add(notch);
  }

  // Barrel and coil cage. The lighter barrel catches the sunset rim light.
  const barrel = cyl(0.034, 0.044, 0.66, 12, metalLight, 0, 0.012, -0.64);
  barrel.rotation.x = Math.PI / 2;
  pivot.add(barrel);
  pivot.add(cyl(0.052, 0.052, 0.05, 12, brass, 0, 0.012, -0.36));
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.058 + i * 0.004, 0.009, 6, 16), brass);
    ring.position.set(0, 0.012, -0.53 - i * 0.085);
    pivot.add(ring);
  }
  pivot.add(cyl(0.058, 0.048, 0.07, 12, coral, 0, 0.012, -0.94));
  pivot.add(cyl(0.038, 0.038, 0.09, 10, dark, 0, 0.012, -0.99));

  // Glass chamber with a glowing core.
  const chamber = new THREE.Mesh(
    new THREE.CylinderGeometry(0.056, 0.056, 0.2, 12, 1, true),
    new THREE.MeshStandardMaterial({
      color: 0xff9d57,
      transparent: true,
      opacity: 0.16,
      roughness: 0.18,
      metalness: 0.1,
      side: THREE.DoubleSide,
      emissive: 0xff5b3d,
      emissiveIntensity: 0.45,
    })
  );
  chamber.rotation.x = Math.PI / 2;
  chamber.position.set(0, 0.012, -0.62);
  pivot.add(chamber);
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.042, 0), new THREE.MeshBasicMaterial({ color: 0xffe7a0 }));
  core.position.set(0, 0.012, -0.62);
  pivot.add(core);
  const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(),
    color: 0xffad57,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  coreGlow.position.copy(core.position);
  coreGlow.scale.setScalar(0.34);
  pivot.add(coreGlow);

  // Stock and grip. The stock is deliberately compact: most phones crop it.
  pivot.add(rbox(0.1, 0.105, 0.26, 0.02, wood, 0, -0.012, 0.2));
  pivot.add(rbox(0.12, 0.14, 0.07, 0.02, dark, 0, -0.035, 0.35));
  pivot.add(rbox(0.03, 0.035, 0.12, 0.01, brass, 0.055, 0.02, 0.16));
  const grip = rbox(0.072, 0.19, 0.095, 0.018, wood, 0, -0.145, 0.075);
  grip.rotation.x = -0.2;
  pivot.add(grip);
  const guard = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.012, 5, 12, Math.PI), brass);
  guard.rotation.set(0, 0, Math.PI);
  guard.position.set(0, -0.075, 0.02);
  pivot.add(guard);

  // Front handguard.
  pivot.add(rbox(0.115, 0.09, 0.24, 0.02, teal, 0, -0.06, -0.4));
  for (let i = 0; i < 3; i++) {
    pivot.add(rbox(0.125, 0.011, 0.018, 0.005, coral, 0, -0.06 + (i - 1) * 0.026, -0.48));
  }

  // Low-profile sight. It should suggest aim direction without becoming a
  // giant gold ring in front of the player.
  pivot.add(rbox(0.052, 0.022, 0.26, 0.008, dark, 0, 0.118, -0.22));
  const sightRing = new THREE.Mesh(new THREE.TorusGeometry(0.027, 0.006, 6, 14), brass);
  sightRing.position.set(0, 0.158, -0.3);
  pivot.add(sightRing);
  pivot.add(rbox(0.011, 0.04, 0.014, 0.004, brass, 0, 0.14, -0.3));
  const sightDot = new THREE.Mesh(new THREE.SphereGeometry(0.007, 6, 5), new THREE.MeshBasicMaterial({ color: 0xff7c58 }));
  sightDot.position.set(0, 0.158, -0.3);
  pivot.add(sightDot);

  // Hand charm, a little Brazil.
  const cord = cyl(0.006, 0.006, 0.14, 5, brass, 0.085, -0.1, 0.16);
  cord.rotation.z = -0.16;
  pivot.add(cord);
  const charm = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.008, 5, 12), brass);
  charm.position.set(0.095, -0.18, 0.16);
  charm.rotation.x = 0.35;
  pivot.add(charm);
  const charmDot = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), coral);
  charmDot.position.set(0.095, -0.213, 0.16);
  pivot.add(charmDot);

  // Hands: small gloves gripping the weapon, with forearms entering from the
  // bottom corners instead of crossing the middle of the screen.
  const glove = new THREE.MeshStandardMaterial({ color: 0x1c786f, roughness: 0.78 });
  const gloveDark = new THREE.MeshStandardMaterial({ color: 0x0d3835, roughness: 0.9 });
  const sleeve = new THREE.MeshStandardMaterial({ color: 0x182144, roughness: 0.86 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xa86446, roughness: 0.88 });

  const rightHand = new THREE.Group();
  rightHand.add(rbox(0.078, 0.095, 0.1, 0.022, glove, 0, 0, 0));
  for (let i = 0; i < 3; i++) {
    const finger = rbox(0.022, 0.042, 0.062, 0.008, skin, -0.022 + i * 0.022, 0.02, -0.065);
    finger.rotation.x = -0.55;
    rightHand.add(finger);
  }
  rightHand.position.set(0.012, -0.175, 0.075);
  rightHand.rotation.set(-0.35, 0.12, -0.1);
  pivot.add(rightHand);
  pivot.add(limb([0.34, -0.55, 0.34], [0.045, -0.23, 0.11], 0.038, sleeve));
  pivot.add(limb([0.095, -0.3, 0.17], [0.075, -0.27, 0.15], 0.041, coral));

  const leftHand = new THREE.Group();
  leftHand.add(rbox(0.088, 0.082, 0.13, 0.024, glove, 0, 0, 0));
  for (let i = 0; i < 4; i++) {
    const f = rbox(0.021, 0.036, 0.058, 0.007, skin, -0.03 + i * 0.02, 0.052, -0.035);
    f.rotation.x = -0.9;
    leftHand.add(f);
  }
  leftHand.position.set(-0.018, -0.082, -0.37);
  leftHand.rotation.set(-0.12, 0.22, -0.18);
  leftHand.scale.setScalar(0.82);
  pivot.add(leftHand);
  pivot.add(limb([-0.36, -0.38, -0.1], [-0.18, -0.2, -0.27], 0.036, sleeve));
  pivot.add(limb([-0.18, -0.2, -0.27], [-0.06, -0.115, -0.33], 0.028, gloveDark));
  pivot.add(limb([-0.185, -0.207, -0.267], [-0.173, -0.193, -0.257], 0.038, coral));

  // Muzzle flash.
  const flash = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(),
    color: 0xffc870,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  flash.position.set(0, 0.012, -1.05);
  flash.scale.setScalar(0.95);
  pivot.add(flash);
  const muzzle = new THREE.Object3D();
  muzzle.position.set(0, 0.012, -1.05);
  pivot.add(muzzle);

  const sideGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(),
    color: 0xff7f48,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  sideGlow.position.set(0.02, 0.035, -0.59);
  sideGlow.scale.setScalar(0.26);
  pivot.add(sideGlow);

  const state = {
    root,
    pivot,
    muzzle,
    flash,
    core,
    coreGlow,
    recoil: 0,
    recoilRot: 0,
    reloadT: 0,
    reloading: false,
    swayX: 0,
    swayY: 0,
    lookX: 0,
    lookY: 0,
    time: 0,
    flashT: 0,
    base: new THREE.Vector3(0.245, -0.285, -0.7),
    baseRot: new THREE.Euler(0.015, 0.11, 0.005),
  };

  root.position.copy(state.base);
  root.rotation.copy(state.baseRot);

  state.fire = () => {
    state.recoil = Math.min(1.15, state.recoil + 0.85);
    state.recoilRot = 0.75;
    state.flashT = 0.055;
    state.flash.material.rotation = Math.random() * Math.PI * 2;
    state.flash.scale.setScalar(0.72 + Math.random() * 0.36);
  };

  state.setReloading = (value) => {
    state.reloading = value;
    if (value) state.reloadT = 0;
  };

  state.look = (dx, dy) => {
    state.lookX += dx * 0.00008;
    state.lookY += dy * 0.00008;
    state.lookX = THREE.MathUtils.clamp(state.lookX, -0.035, 0.035);
    state.lookY = THREE.MathUtils.clamp(state.lookY, -0.03, 0.03);
  };

  state.update = (dt, options = {}) => {
    state.time += dt;
    const t = state.time;
    const moving = options.moving ? 1 : 0;
    const speed = options.speed || 0;
    const bobRate = 7.2 + speed * 0.9;
    const bobX = Math.sin(t * bobRate) * 0.007 * moving;
    const bobY = Math.abs(Math.cos(t * bobRate)) * 0.006 * moving;
    state.swayX = THREE.MathUtils.damp(state.swayX, state.lookX, 11, dt);
    state.swayY = THREE.MathUtils.damp(state.swayY, state.lookY, 11, dt);
    state.lookX = THREE.MathUtils.damp(state.lookX, 0, 5, dt);
    state.lookY = THREE.MathUtils.damp(state.lookY, 0, 5, dt);

    state.recoil = THREE.MathUtils.damp(state.recoil, 0, 16, dt);
    state.recoilRot = THREE.MathUtils.damp(state.recoilRot, 0, 13, dt);
    state.flashT = Math.max(0, state.flashT - dt);
    state.flash.material.opacity = state.flashT > 0 ? 0.98 : 0;

    let reloadPhase = 0;
    if (state.reloading) {
      state.reloadT += dt;
      const p = Math.min(1, state.reloadT / 1.15);
      reloadPhase = Math.sin(p * Math.PI);
      if (p >= 1) {
        state.reloading = false;
        options.onReloaded?.();
      }
    }

    const jumpOffset = options.jumpOffset || 0;
    const land = options.landing || 0;
    root.position.x = state.base.x + bobX + state.swayX;
    root.position.y = state.base.y + bobY + state.swayY - reloadPhase * 0.16 - jumpOffset * 0.06 - land * 0.02;
    root.position.z = state.base.z + state.recoil * 0.075;
    root.rotation.x = state.baseRot.x + state.recoilRot * 0.1 + reloadPhase * 0.42 + state.swayY * 0.6;
    root.rotation.y = state.baseRot.y + state.swayX * 0.8 + reloadPhase * 0.08;
    root.rotation.z = state.baseRot.z + state.swayX * 0.35 + reloadPhase * 0.75 + bobX * 0.25;
    pivot.position.y = reloadPhase * 0.025;
    pivot.rotation.z = -reloadPhase * 0.2;

    core.rotation.y += dt * 2.2;
    core.rotation.x += dt * 1.3;
    coreGlow.material.opacity = 0.68 + Math.sin(t * 4.3) * 0.16;
    sideGlow.material.opacity = 0.22 + Math.sin(t * 5.1) * 0.10;
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(68, 1, 0.01, 5);
  scene.add(root);
  const hemi = new THREE.HemisphereLight(0xffc09a, 0x212741, 2.4);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffbd82, 3.2);
  key.position.set(-1.5, 2, 1.5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x627cff, 1.4);
  rim.position.set(2, 0.5, -1);
  scene.add(rim);

  state.viewScene = scene;
  state.viewCamera = camera;
  state.resize = (aspect) => {
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    let scale;
    let bx;
    let by;
    let bz;
    let yaw;
    if (aspect < 0.62) {
      scale = 0.58;
      bx = 0.13;
      by = -0.24;
      bz = -0.66;
      yaw = 0.3;
    } else if (aspect < 0.82) {
      scale = 0.68;
      bx = 0.15;
      by = -0.252;
      bz = -0.66;
      yaw = 0.28;
    } else if (aspect < 1.05) {
      scale = 0.82;
      bx = 0.195;
      by = -0.265;
      bz = -0.68;
      yaw = 0.27;
    } else if (aspect < 1.35) {
      scale = 0.94;
      bx = 0.235;
      by = -0.285;
      bz = -0.7;
      yaw = 0.28;
    } else {
      scale = 1;
      bx = 0.26;
      by = -0.3;
      bz = -0.72;
      yaw = 0.28;
    }
    root.scale.setScalar(scale);
    state.base.set(bx, by, bz);
    state.baseRot.y = yaw;
    root.position.copy(state.base);
    root.rotation.copy(state.baseRot);
  };
  return state;
}
