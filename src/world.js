import * as THREE from "three";

const C = {
  cream: 0xfff2d4,
  paper: 0xebd9b4,
  ink: 0x11142d,
  ink2: 0x1b2144,
  coral: 0xff5b3d,
  coralDeep: 0xcc3f30,
  gold: 0xffc552,
  pink: 0xff3d86,
  teal: 0x18a69b,
  tealDeep: 0x08766e,
  violet: 0x7568ff,
  ocean: 0x144d62,
  sand: 0xd2a374,
  wood: 0x6e3c2b,
  leaf: 0x19755d,
  leafLight: 0x2e9a71,
  stone: 0x39405d,
  dark: 0x191d38,
};

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvasTexture(width, height, draw, renderer) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer?.capabilities?.getMaxAnisotropy?.() || 4);
  return texture;
}

function makeGlowTexture() {
  return canvasTexture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.12, "rgba(255,248,218,.95)");
    g.addColorStop(0.32, "rgba(255,182,92,.46)");
    g.addColorStop(0.62, "rgba(255,94,55,.12)");
    g.addColorStop(1, "rgba(255,94,55,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}

function makeCloudTexture() {
  return canvasTexture(512, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < 12; i++) {
      const x = 50 + Math.random() * (w - 100);
      const y = h * 0.55 + (Math.random() - 0.5) * 70;
      const r = 45 + Math.random() * 80;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,217,190,.24)");
      g.addColorStop(0.6, "rgba(255,177,160,.09)");
      g.addColorStop(1, "rgba(255,150,150,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function makeStripeTexture(renderer, colorA = "#fff2d4", colorB = "#e84634") {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = colorA;
    ctx.fillRect(0, 0, w, h);
    const stripe = w / 8;
    ctx.fillStyle = colorB;
    for (let i = 0; i < 8; i += 2) ctx.fillRect(i * stripe, 0, stripe, h);
    ctx.fillStyle = "rgba(80,28,20,.12)";
    for (let y = 0; y < h; y += 5) ctx.fillRect(0, y, w, 1);
  }, renderer);
}

function makeMosaicTexture(renderer) {
  return canvasTexture(1536, 1536, (ctx, w, h) => {
    const rand = mulberry32(77);
    const cx = w / 2;
    const cy = h / 2;
    const R = w / 2;
    ctx.fillStyle = "#ead9b7";
    ctx.fillRect(0, 0, w, h);

    // Soft paper variation
    for (let i = 0; i < 8000; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const a = 0.018 + rand() * 0.036;
      ctx.fillStyle = rand() > 0.5 ? `rgba(50,44,30,${a})` : `rgba(255,255,240,${a})`;
      ctx.fillRect(x, y, 2 + rand() * 5, 1 + rand() * 2);
    }

    // Copacabana-inspired wave bands
    const colors = ["#173c57", "#173c57", "#d95a3c", "#ead9b7", "#173c57", "#d95a3c"];
    let band = 0;
    for (let y0 = -40; y0 < h + 80; y0 += 37) {
      const c = colors[band % colors.length];
      if (c !== "#ead9b7") {
        ctx.beginPath();
        for (let x = -30; x <= w + 30; x += 8) {
          const y = y0 + Math.sin(x * 0.007 + band * 0.52) * 20 + Math.sin(x * 0.017) * 5;
          if (x === -30) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = band % 3 === 0 ? 12 : 6;
        ctx.strokeStyle = c;
        ctx.globalAlpha = band % 3 === 0 ? 0.9 : 0.55;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      band++;
    }

    // Central compass medallion
    const med = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.27);
    med.addColorStop(0, "#f8e7bf");
    med.addColorStop(0.7, "#ead9b7");
    med.addColorStop(1, "#e1cda7");
    ctx.fillStyle = med;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.285, 0, Math.PI * 2);
    ctx.fill();

    for (const [radius, width, color] of [
      [R * 0.285, 7, "#173c57"],
      [R * 0.257, 3, "#d95a3c"],
      [R * 0.20, 4, "#173c57"],
      [R * 0.14, 2, "#d95a3c"],
    ]) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    }

    // 16-point sun compass
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
      const long = i % 2 === 0;
      const r1 = R * 0.07;
      const r2 = long ? R * 0.245 : R * 0.15;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a - 0.055) * r1, cy + Math.sin(a - 0.055) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.lineTo(cx + Math.cos(a + 0.055) * r1, cy + Math.sin(a + 0.055) * r1);
      ctx.closePath();
      ctx.fillStyle = long ? "#173c57" : "#d95a3c";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,242,212,.42)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.055, 0, Math.PI * 2);
    ctx.fillStyle = "#d95a3c";
    ctx.fill();
    ctx.strokeStyle = "#173c57";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Outer border mosaic
    for (const [radius, width, color] of [
      [R * 0.945, 15, "#173c57"],
      [R * 0.96, 4, "#ffc552"],
      [R * 0.89, 7, "#d95a3c"],
      [R * 0.86, 2, "#173c57"],
    ]) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    }

    // Inner "azulejo" ticks
    ctx.save();
    ctx.translate(cx, cy);
    for (let i = 0; i < 64; i++) {
      ctx.rotate((Math.PI * 2) / 64);
      ctx.fillStyle = i % 4 === 0 ? "#d95a3c" : "#173c57";
      ctx.globalAlpha = 0.62;
      ctx.fillRect(R * 0.90, -2, R * 0.045, 4);
    }
    ctx.restore();
    ctx.globalAlpha = 1;

    // Faint grout lines and wear
    ctx.strokeStyle = "rgba(53,42,30,.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 34; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, R * (0.02 + i * 0.028), 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = 0; i < 850; i++) {
      const a = rand() * Math.PI * 2;
      const rr = Math.sqrt(rand()) * R;
      const x = cx + Math.cos(a) * rr;
      const y = cy + Math.sin(a) * rr;
      ctx.fillStyle = `rgba(66,49,28,${0.015 + rand() * 0.04})`;
      ctx.fillRect(x, y, 2 + rand() * 8, 1 + rand() * 2);
    }
  }, renderer);
}

function makeSignTexture(text, bg = "#173c57", fg = "#ffe6a3", renderer) {
  return canvasTexture(512, 160, (ctx, w, h) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,242,212,.4)";
    ctx.lineWidth = 5;
    ctx.strokeRect(9, 9, w - 18, h - 18);
    ctx.fillStyle = fg;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 72px Arial Black, Arial, sans-serif";
    ctx.fillText(text, w / 2, h / 2 + 2);
    ctx.fillStyle = "rgba(255,91,61,.75)";
    ctx.fillRect(w * 0.19, h - 22, w * 0.62, 5);
  }, renderer);
}

function makeWindowTexture(renderer) {
  return canvasTexture(256, 512, (ctx, w, h) => {
    ctx.fillStyle = "#1a2040";
    ctx.fillRect(0, 0, w, h);
    const rand = mulberry32(9);
    for (let y = 14; y < h - 10; y += 28) {
      for (let x = 14; x < w - 10; x += 26) {
        const lit = rand() > 0.54;
        ctx.fillStyle = lit
          ? ["#ffc552", "#ff9b62", "#ffe6a3", "#7fe0cf"][Math.floor(rand() * 4)]
          : "rgba(8,12,29,.92)";
        ctx.globalAlpha = lit ? 0.62 + rand() * 0.38 : 1;
        ctx.fillRect(x, y, 12, 16);
      }
    }
    ctx.globalAlpha = 1;
  }, renderer);
}

function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function cylinder(rt, rb, h, seg, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function leafGeometry(length = 2.5, width = 0.34) {
  const segments = 7;
  const vertices = [];
  const indices = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = Math.sin(t * Math.PI) * width + 0.015;
    const y = Math.sin(t * Math.PI * 1.05) * 0.12 - t * t * 0.32;
    const z = -t * length;
    vertices.push(-x, y, z, x, y, z);
  }
  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function createPalm(rand, glowTexture, renderer) {
  const group = new THREE.Group();
  const height = 5.8 + rand() * 2.8;
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x7e5734, roughness: 0.96 });
  const ringMat = new THREE.MeshStandardMaterial({ color: 0x5a3c28, roughness: 1 });
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.14 + rand() * 0.15, height * 0.34, 0.04),
    new THREE.Vector3(-0.1 + rand() * 0.26, height * 0.68, 0.1),
    new THREE.Vector3(0.05 + rand() * 0.22, height, 0),
  ]);
  const trunk = new THREE.Mesh(new THREE.TubeGeometry(curve, 9, 0.17, 7, false), trunkMat);
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  group.add(trunk);
  for (let i = 1; i < 8; i++) {
    const t = i / 8;
    const p = curve.getPoint(t);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.17 - t * 0.04, 0.016, 4, 10), ringMat);
    ring.position.copy(p);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
  }
  const crown = new THREE.Group();
  crown.position.copy(curve.getPoint(1));
  group.add(crown);

  const leafMat = new THREE.MeshStandardMaterial({
    color: C.leaf,
    roughness: 0.82,
    side: THREE.DoubleSide,
    flatShading: true,
  });
  const leafMat2 = new THREE.MeshStandardMaterial({
    color: C.leafLight,
    roughness: 0.85,
    side: THREE.DoubleSide,
    flatShading: true,
  });
  const leaves = [];
  for (let i = 0; i < 8; i++) {
    const leaf = new THREE.Mesh(leafGeometry(2.5 + rand() * 1.2, 0.31 + rand() * 0.12), i % 3 ? leafMat : leafMat2);
    leaf.rotation.y = (i / 8) * Math.PI * 2 + (rand() - 0.5) * 0.3;
    leaf.rotation.x = -0.34 + rand() * 0.38;
    leaf.castShadow = true;
    crown.add(leaf);
    leaves.push({ mesh: leaf, phase: rand() * Math.PI * 2, baseX: leaf.rotation.x, baseZ: leaf.rotation.z });
  }
  // Coconuts
  const cocoMat = new THREE.MeshStandardMaterial({ color: 0x6f4a32, roughness: 0.9 });
  for (let i = 0; i < 3; i++) {
    const coco = new THREE.Mesh(new THREE.SphereGeometry(0.13, 7, 5), cocoMat);
    const a = (i / 3) * Math.PI * 2 + 0.4;
    coco.position.set(Math.cos(a) * 0.18, -0.13, Math.sin(a) * 0.18);
    crown.add(coco);
  }
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0xffcf6b,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  glow.position.y = height - 0.2;
  glow.scale.setScalar(1.8);
  group.add(glow);
  group.userData.height = height;
  return { group, leaves, height };
}

function createKiosk(renderer, stripeTexture, name, color, glowTexture) {
  const group = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: C.wood, roughness: 0.85 });
  const woodLight = new THREE.MeshStandardMaterial({ color: 0x9d6241, roughness: 0.9 });
  const dark = new THREE.MeshStandardMaterial({ color: C.dark, roughness: 0.7, metalness: 0.1 });
  const body = new THREE.MeshStandardMaterial({ color, roughness: 0.8 });

  group.add(box(3.9, 0.22, 2.9, woodLight, 0, 0.11, 0));
  group.add(box(3.55, 2.1, 0.16, body, 0, 1.2, -1.25));
  group.add(box(0.16, 2.1, 2.35, body, -1.69, 1.2, 0));
  group.add(box(3.5, 0.78, 0.62, wood, 0, 0.66, 0.87));
  group.add(box(3.62, 0.1, 0.78, woodLight, 0, 1.05, 0.87));

  // Posts and awning
  const postMat = new THREE.MeshStandardMaterial({ color: 0x5a3427, roughness: 0.9 });
  for (const x of [-1.66, 1.66]) {
    for (const z of [-1.17, 1.12]) {
      group.add(cylinder(0.065, 0.075, 3.1, 6, postMat, x, 1.55, z));
    }
  }
  const awningMat = new THREE.MeshStandardMaterial({
    map: stripeTexture,
    roughness: 0.92,
    side: THREE.DoubleSide,
  });
  const a1 = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.65), awningMat);
  a1.rotation.x = -Math.PI * 0.30;
  a1.position.set(0, 2.93, -0.38);
  a1.castShadow = true;
  group.add(a1);
  const a2 = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.65), awningMat);
  a2.rotation.x = Math.PI * 0.30;
  a2.rotation.y = Math.PI;
  a2.position.set(0, 2.93, 0.38);
  a2.castShadow = true;
  group.add(a2);
  // Scalloped valance
  const valMat = new THREE.MeshStandardMaterial({ color: 0xfff1d0, roughness: 0.9 });
  for (let i = 0; i < 9; i++) {
    const v = new THREE.Mesh(new THREE.SphereGeometry(0.19, 8, 5, 0, Math.PI), valMat);
    v.rotation.x = Math.PI / 2;
    v.position.set(-1.7 + i * 0.425, 2.42, 1.13);
    group.add(v);
  }

  // Hanging sign
  const signTex = makeSignTexture(name, "#173c57", "#ffe6a3", renderer);
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 0.5),
    new THREE.MeshBasicMaterial({ map: signTex, transparent: true, side: THREE.DoubleSide })
  );
  sign.position.set(0, 2.24, 1.17);
  group.add(sign);
  for (const x of [-0.62, 0.62]) {
    group.add(cylinder(0.007, 0.007, 0.34, 4, dark, x, 2.60, 1.17));
  }

  // Produce on the counter
  const fruitColors = [0xffb23f, 0xff6b3e, 0x9bd14b, 0xf43b6a, 0xffd264];
  for (let c = 0; c < 2; c++) {
    for (let i = 0; i < 5; i++) {
      const fruit = new THREE.Mesh(
        new THREE.SphereGeometry(0.105 + Math.random() * 0.035, 8, 6),
        new THREE.MeshStandardMaterial({ color: fruitColors[(i + c) % fruitColors.length], roughness: 0.72 })
      );
      fruit.position.set(-1.05 + c * 1.72 + i * 0.17, 1.19, 0.84 + (i % 2) * 0.12);
      fruit.castShadow = true;
      group.add(fruit);
    }
  }
  // Crates
  for (const x of [-1.35, 1.32]) {
    group.add(box(0.62, 0.34, 0.48, wood, x, 1.27, 0.77));
  }

  // Little warm lamp
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0xffb55c,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  glow.position.set(0, 2.13, 1.18);
  glow.scale.setScalar(0.95);
  group.add(glow);
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xffe2a0 })
  );
  bulb.position.copy(glow.position);
  group.add(bulb);
  group.userData.glow = glow;
  return group;
}

function createCoreto(renderer, glowTexture) {
  const g = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({ color: 0x2f3555, roughness: 0.82 });
  const stoneLight = new THREE.MeshStandardMaterial({ color: 0x4a4c6d, roughness: 0.78 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x74402d, roughness: 0.78 });
  const teal = new THREE.MeshStandardMaterial({ color: 0x0d6c66, roughness: 0.58, metalness: 0.12 });
  const tealDark = new THREE.MeshStandardMaterial({ color: 0x074c4b, roughness: 0.65, metalness: 0.1 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xd6a547, roughness: 0.35, metalness: 0.55 });

  g.add(cylinder(5.6, 5.9, 0.24, 24, stone, 0, 0.12, 0));
  g.add(cylinder(5.1, 5.35, 0.25, 24, stoneLight, 0, 0.37, 0));
  g.add(cylinder(4.6, 4.9, 0.32, 24, stone, 0, 0.65, 0));
  g.add(cylinder(4.37, 4.4, 0.16, 24, wood, 0, 0.89, 0));

  // Stage ring and steps
  const lip = new THREE.Mesh(new THREE.TorusGeometry(4.38, 0.055, 5, 48), gold);
  lip.rotation.x = Math.PI / 2;
  lip.position.y = 0.98;
  g.add(lip);

  // Columns
  const columnPositions = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const x = Math.cos(angle) * 3.55;
    const z = Math.sin(angle) * 3.55;
    columnPositions.push([x, z, angle]);
    g.add(cylinder(0.13, 0.18, 3.2, 8, stoneLight, x, 2.48, z));
    g.add(cylinder(0.25, 0.29, 0.17, 8, gold, x, 3.98, z));
  }
  // Railing
  for (let i = 0; i < 8; i++) {
    const a = columnPositions[i];
    const b = columnPositions[(i + 1) % 8];
    if (a[0] * b[0] + a[1] * b[1] < 2.2) continue;
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const len = Math.hypot(dx, dz);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.055, 0.055), gold);
    rail.position.set((a[0] + b[0]) / 2, 1.2, (a[1] + b[1]) / 2);
    rail.rotation.y = -Math.atan2(dz, dx);
    g.add(rail);
  }

  // Roof
  const roof = cylinder(0.5, 5.1, 2.35, 16, teal, 0, 5.04, 0);
  roof.castShadow = true;
  g.add(roof);
  g.add(cylinder(5.15, 5.18, 0.26, 16, gold, 0, 3.78, 0));
  g.add(cylinder(5.35, 5.35, 0.12, 16, tealDark, 0, 3.65, 0));
  g.add(cylinder(0.08, 0.11, 1.25, 8, gold, 0, 6.7, 0));
  const finial = new THREE.Mesh(new THREE.OctahedronGeometry(0.25, 0), gold);
  finial.position.y = 7.45;
  g.add(finial);

  // Under-roof ceiling and lantern
  const ceiling = new THREE.Mesh(new THREE.CircleGeometry(4.6, 32), new THREE.MeshBasicMaterial({ color: 0x7e3f30 }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 3.78;
  g.add(ceiling);
  const lampGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0xffb24f,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  lampGlow.position.set(0, 3.18, 0);
  lampGlow.scale.setScalar(2.7);
  g.add(lampGlow);
  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 10, 8),
    new THREE.MeshBasicMaterial({ color: 0xffe6aa })
  );
  lamp.position.set(0, 3.18, 0);
  g.add(lamp);
  const pointLight = new THREE.PointLight(0xff9f4e, 2.2, 16, 2);
  pointLight.position.set(0, 3.1, 0);
  g.add(pointLight);

  // Bulbs around rim
  const bulbs = [];
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffd277 });
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 7, 5), bulbMat.clone());
    bulb.position.set(Math.cos(a) * 5.19, 3.73, Math.sin(a) * 5.19);
    g.add(bulb);
    bulbs.push(bulb);
  }
  // Light strings from roof edge
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const b = ((i + 1) / 8) * Math.PI * 2 + Math.PI / 8;
    const points = [];
    for (let j = 0; j <= 12; j++) {
      const t = j / 12;
      const aa = a + (b - a) * t;
      const sag = Math.sin(t * Math.PI) * 0.55;
      points.push(new THREE.Vector3(Math.cos(aa) * 5.18, 3.72 - sag, Math.sin(aa) * 5.18));
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    g.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x33273a, transparent: true, opacity: 0.75 })));
    for (let j = 2; j < 11; j += 2) {
      const p = points[j];
      const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), bulbMat.clone());
      b2.position.copy(p);
      g.add(b2);
      bulbs.push(b2);
    }
  }

  // Instruments in the bandstand
  const drumMat = new THREE.MeshStandardMaterial({ color: 0xf1ddb1, roughness: 0.55 });
  const drumSide = new THREE.MeshStandardMaterial({ color: 0xc23e32, roughness: 0.5, metalness: 0.12 });
  const drum = cylinder(0.38, 0.38, 0.7, 14, drumSide, -1.05, 1.39, -0.55);
  g.add(drum);
  const drumTop = cylinder(0.39, 0.39, 0.045, 14, drumMat, -1.05, 1.75, -0.55);
  g.add(drumTop);
  const cymbal = cylinder(0.48, 0.48, 0.025, 16, gold, 0.77, 2.05, -0.6);
  cymbal.rotation.z = -0.12;
  g.add(cymbal);
  const cymbalStand = cylinder(0.025, 0.03, 1.4, 5, gold, 0.77, 1.34, -0.6);
  g.add(cymbalStand);
  // Speakers
  for (const x of [-2.7, 2.7]) {
    g.add(box(0.7, 1.3, 0.52, new THREE.MeshStandardMaterial({ color: 0x14172d, roughness: 0.72 }), x, 1.55, -1.1));
    const cone = new THREE.Mesh(new THREE.CircleGeometry(0.22, 12), new THREE.MeshBasicMaterial({ color: 0xff7a4c }));
    cone.position.set(x, 1.7, -0.83);
    g.add(cone);
  }

  // Banner with the name
  const bannerTex = makeSignTexture("CORETO", "#0a5552", "#ffe6a3", renderer);
  const banner = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 0.66),
    new THREE.MeshBasicMaterial({ map: bannerTex, transparent: true, side: THREE.DoubleSide })
  );
  banner.position.set(0, 2.95, 4.18);
  g.add(banner);

  g.userData = { pointLight, lampGlow, bulbs, banner };
  return g;
}

function createBench() {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x8a5337, roughness: 0.9 });
  const metal = new THREE.MeshStandardMaterial({ color: 0x242b49, roughness: 0.55, metalness: 0.38 });
  for (let i = 0; i < 3; i++) g.add(box(1.65, 0.08, 0.14, wood, 0, 0.48, -0.17 + i * 0.17));
  for (let i = 0; i < 2; i++) g.add(box(1.65, 0.07, 0.13, wood, 0, 0.78 + i * 0.16, 0.3));
  for (const x of [-0.62, 0.62]) {
    g.add(box(0.09, 0.5, 0.55, metal, x, 0.25, 0));
    g.add(box(0.09, 0.45, 0.08, metal, x, 0.74, 0.34));
  }
  return g;
}

function createPlanter() {
  const g = new THREE.Group();
  const pot = cylinder(0.85, 0.72, 0.9, 12, new THREE.MeshStandardMaterial({ color: 0xb4533b, roughness: 0.94 }), 0, 0.45, 0);
  g.add(pot);
  g.add(cylinder(0.91, 0.91, 0.16, 12, new THREE.MeshStandardMaterial({ color: 0xd07854, roughness: 0.9 }), 0, 0.87, 0));
  g.add(cylinder(0.8, 0.8, 0.06, 12, new THREE.MeshStandardMaterial({ color: 0x3a2b22, roughness: 1 }), 0, 0.93, 0));
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2b8067, roughness: 0.82, side: THREE.DoubleSide, flatShading: true });
  for (let i = 0; i < 9; i++) {
    const leaf = new THREE.Mesh(leafGeometry(1.2 + Math.random() * 0.65, 0.24), leafMat);
    leaf.rotation.y = (i / 9) * Math.PI * 2;
    leaf.rotation.x = -0.75 + Math.random() * 0.35;
    leaf.position.y = 0.95;
    g.add(leaf);
  }
  const flowerColors = [0xff4f5f, 0xffce5c, 0xff89ac];
  for (let i = 0; i < 5; i++) {
    const flower = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 6, 4),
      new THREE.MeshBasicMaterial({ color: flowerColors[i % 3] })
    );
    const a = Math.random() * Math.PI * 2;
    flower.position.set(Math.cos(a) * 0.5, 1.25 + Math.random() * 0.2, Math.sin(a) * 0.5);
    g.add(flower);
  }
  return g;
}

function createMountain(radius, height, color, x, z, sides = 7) {
  const geo = new THREE.ConeGeometry(radius, height, sides);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y < height * 0.49 && y > -height * 0.5) {
      const n = 0.88 + Math.random() * 0.24;
      pos.setX(i, pos.getX(i) * n);
      pos.setZ(i, pos.getZ(i) * n);
    }
  }
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 1, flatShading: true }));
  mesh.position.set(x, height / 2 - 1.2, z);
  return mesh;
}

function createChrist(glowTexture) {
  const g = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xe7d5bf, roughness: 0.8, emissive: 0x442b35, emissiveIntensity: 0.22 });
  const base = new THREE.MeshStandardMaterial({ color: 0x474563, roughness: 0.9 });
  g.add(box(2.4, 0.8, 1.6, base, 0, 0.4, 0));
  g.add(cylinder(0.55, 0.92, 5.4, 8, white, 0, 3.3, 0));
  g.add(box(4.3, 0.56, 0.7, white, 0, 5.2, 0));
  g.add(cylinder(0.34, 0.36, 0.72, 8, white, 0, 6.35, 0));
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.46, 10, 8), white);
  head.position.y = 7.08;
  g.add(head);
  // Halo-like rim light
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0xffc06c,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  halo.position.set(0, 7.05, 0.2);
  halo.scale.setScalar(3.4);
  g.add(halo);
  return g;
}

function createCity(renderer, windowTexture, glowTexture) {
  const g = new THREE.Group();
  const rand = mulberry32(314);
  const palette = [0xb76b60, 0x587a82, 0xc88b58, 0x6b5e83, 0xa9855f, 0x3d6570, 0xd07a68, 0x77958a];
  const positions = [
    [-52, -25, 24, 15], [-48, -40, 18, 11], [-60, -8, 30, 19], [-38, -55, 20, 13],
    [-67, -48, 16, 9], [-47, 10, 24, 15], [-58, 25, 20, 13], [-35, 30, 16, 8],
    [48, -25, 28, 11], [58, -8, 24, 14], [62, -43, 18, 10], [48, 12, 22, 9],
  ];
  for (const [x, z, height, width] of positions) {
    const w = width + rand() * 10;
    const d = width * (0.55 + rand() * 0.5);
    const color = palette[Math.floor(rand() * palette.length)];
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.95 });
    const b = box(w, height, d, mat, x, height / 2 - 0.5, z);
    g.add(b);
    // A few colorful rooftop boxes to suggest a hillside neighborhood
    for (let k = 0; k < 3; k++) {
      const bw = w * (0.12 + rand() * 0.18);
      const bh = 2 + rand() * 5;
      const bx = x + (rand() - 0.5) * w * 0.7;
      const bz = z + (rand() - 0.5) * d * 0.7;
      g.add(box(bw, bh, bw, new THREE.MeshStandardMaterial({ color: palette[Math.floor(rand() * palette.length)], roughness: 0.95 }), bx, height + bh / 2 - 0.5, bz));
    }
    const windowMat = new THREE.MeshBasicMaterial({
      map: windowTexture,
      transparent: true,
      opacity: 0.62,
      color: 0xffd8a3,
    });
    const face = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, height * 0.8), windowMat);
    face.position.set(x, height / 2, z + d / 2 + 0.01);
    g.add(face);
  }
  // Tiny favela lights on the left hillside
  for (let i = 0; i < 80; i++) {
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture,
      color: [0xffc263, 0xff9d55, 0x75d9c8][i % 3],
      transparent: true,
      opacity: 0.42 + rand() * 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    const a = -2.8 + rand() * 1.45;
    glow.position.set(Math.cos(a) * (43 + rand() * 18), 2 + rand() * 14, Math.sin(a) * (43 + rand() * 18));
    glow.scale.setScalar(0.45 + rand() * 0.6);
    g.add(glow);
  }
  return g;
}

function createSugarloaf() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x505370, roughness: 1, flatShading: true });
  const geo = new THREE.SphereGeometry(9, 10, 8);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    if (y < 0) p.setY(i, y * 0.25);
    p.setX(i, p.getX(i) * (1 + Math.sin(y * 0.15) * 0.08));
    p.setZ(i, p.getZ(i) * (1 + Math.cos(y * 0.21) * 0.12));
  }
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, mat);
  m.scale.set(1.45, 1.75, 1.1);
  m.position.y = 10;
  g.add(m);
  const smaller = m.clone();
  smaller.scale.set(0.8, 0.75, 0.72);
  smaller.position.set(13, 5, 2);
  g.add(smaller);
  g.position.set(72, -2, -52);
  return g;
}

function createStringLights(glowTexture, world) {
  const g = new THREE.Group();
  const posts = [
    [-15, 4.3, 10], [-5, 4.3, 12], [5, 4.3, 12], [15, 4.3, 10],
    [-15, 4.3, -2], [15, 4.3, -2],
  ];
  const wireMat = new THREE.LineBasicMaterial({ color: 0x25233c, transparent: true, opacity: 0.72 });
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffd07a });
  const stringPairs = [
    [0, 1], [1, 2], [2, 3], [4, 0], [3, 5],
  ];
  for (const [ia, ib] of stringPairs) {
    const a = posts[ia];
    const b = posts[ib];
    const pts = [];
    for (let i = 0; i <= 18; i++) {
      const t = i / 18;
      pts.push(new THREE.Vector3(
        a[0] + (b[0] - a[0]) * t,
        a[1] - Math.sin(t * Math.PI) * 0.8,
        a[2] + (b[2] - a[2]) * t
      ));
    }
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), wireMat));
    for (let i = 2; i < 17; i += 2) {
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 4), bulbMat.clone());
      bulb.position.copy(pts[i]);
      g.add(bulb);
      world.animated.bulbs.push({ mesh: bulb, phase: i * 0.52 });
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xffc36e,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }));
      glow.position.copy(pts[i]);
      glow.scale.setScalar(0.48);
      g.add(glow);
      world.animated.glows.push({ sprite: glow, base: 0.65, phase: i * 0.52, amp: 0.25 });
    }
  }
  // Poles
  for (const [x, y, z] of posts) {
    g.add(cylinder(0.055, 0.075, y + 0.25, 6, new THREE.MeshStandardMaterial({ color: 0x242b49, roughness: 0.65 }), x, (y + 0.25) / 2, z));
  }
  return g;
}

function createBandeirinhas() {
  const g = new THREE.Group();
  const colors = [0xff5b3d, 0xffc552, 0x18a69b, 0xff3d86, 0x7568ff, 0xfff2d4];
  const lines = [
    { a: [-17, 0, -8], b: [17, 0, -8], y: 4.0 },
    { a: [-12, 0, 11], b: [12, 0, 11], y: 4.2 },
    { a: [-4, 0, -12.5], b: [15, 0, -2], y: 3.75 },
  ];
  const flags = [];
  lines.forEach((line, lineIndex) => {
    const points = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      points.push(new THREE.Vector3(
        line.a[0] + (line.b[0] - line.a[0]) * t,
        line.y - Math.sin(t * Math.PI) * 0.45,
        line.a[2] + (line.b[2] - line.a[2]) * t
      ));
    }
    const wire = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x2f2946, transparent: true, opacity: 0.6 }));
    g.add(wire);
    for (let i = 1; i < 23; i++) {
      const p = points[i];
      const size = 0.36 + (i % 3) * 0.06;
      const shape = new THREE.BufferGeometry();
      const verts = new Float32Array([
        -size * 0.6, 0, 0,
        size * 0.6, 0, 0,
        0, -size, 0,
      ]);
      shape.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      shape.computeVertexNormals();
      const mat = new THREE.MeshBasicMaterial({ color: colors[(i + lineIndex * 2) % colors.length], side: THREE.DoubleSide });
      const flag = new THREE.Mesh(shape, mat);
      flag.position.copy(p);
      flag.rotation.y = (lineIndex * 0.7) - Math.PI / 2;
      flag.rotation.z = 0.04;
      g.add(flag);
      flags.push({ mesh: flag, phase: i * 0.31 + lineIndex, baseZ: flag.rotation.z });
    }
  });
  g.userData.flags = flags;
  return g;
}

function createOcean(renderer) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x1e6377,
    roughness: 0.28,
    metalness: 0.32,
    transparent: true,
    opacity: 0.93,
  });
  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 1, 1), mat);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.y = -1.05;
  g.add(ocean);
  // Sun path
  const glintMat = new THREE.MeshBasicMaterial({
    color: 0xffc180,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  for (let i = 0; i < 20; i++) {
    const glint = new THREE.Mesh(new THREE.PlaneGeometry(1.1 + Math.random() * 7, 0.035), glintMat);
    glint.rotation.x = -Math.PI / 2;
    glint.position.set(-26 + Math.random() * 8, -1.03, -38 - Math.random() * 120);
    g.add(glint);
  }
  const beachMat = new THREE.MeshStandardMaterial({ color: 0xcea071, roughness: 0.98 });
  const beach = new THREE.Mesh(new THREE.RingGeometry(24.1, 92, 64), beachMat);
  beach.rotation.x = -Math.PI / 2;
  beach.position.y = -0.65;
  beach.receiveShadow = true;
  g.add(beach);
  return g;
}

function createFireflies() {
  const count = 90;
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count * 2);
  const colors = new Float32Array(count * 3);
  const palette = [
    [1, 0.78, 0.36],
    [0.32, 0.95, 0.84],
    [1, 0.45, 0.62],
  ];
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 4 + Math.random() * 18;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = 0.8 + Math.random() * 5.5;
    positions[i * 3 + 2] = Math.sin(a) * r;
    phases[i * 2] = Math.random() * Math.PI * 2;
    phases[i * 2 + 1] = 0.3 + Math.random() * 0.9;
    const col = palette[i % 3];
    colors[i * 3] = col[0];
    colors[i * 3 + 1] = col[1];
    colors[i * 3 + 2] = col[2];
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, mat);
  return { points, positions, phases, count };
}

export function buildWorld(scene, renderer) {
  const world = {
    group: new THREE.Group(),
    colliders: [],
    animated: {
      leaves: [],
      flags: [],
      bulbs: [],
      glows: [],
      clouds: [],
      fireflies: null,
      coreto: null,
    },
    sunDirection: new THREE.Vector3(-0.26, 0.13, -0.95).normalize(),
  };
  const rand = mulberry32(2026);
  const glowTexture = makeGlowTexture();
  const stripeTexture = makeStripeTexture(renderer);
  const mosaicTexture = makeMosaicTexture(renderer);
  const windowTexture = makeWindowTexture(renderer);
  world.glowTexture = glowTexture;

  // Sky
  const skyGeo = new THREE.SphereGeometry(260, 40, 20);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uTop: { value: new THREE.Color(0x111632) },
      uMid: { value: new THREE.Color(0x6f315f) },
      uHorizon: { value: new THREE.Color(0xff8f68) },
      uSun: { value: new THREE.Color(0xffd08a) },
      uSunDir: { value: world.sunDirection.clone() },
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
      uniform vec3 uMid;
      uniform vec3 uHorizon;
      uniform vec3 uSun;
      uniform vec3 uSunDir;
      void main() {
        vec3 dir = normalize(vWorld - cameraPosition);
        float h = dir.y;
        vec3 col = mix(uHorizon, uMid, smoothstep(-0.03, 0.34, h));
        col = mix(col, uTop, smoothstep(0.28, 0.82, h));
        float glow = pow(max(dot(dir, uSunDir), 0.0), 8.0);
        col += uSun * glow * 0.24;
        float disk = smoothstep(0.9985, 0.9995, dot(dir, uSunDir));
        col += uSun * disk * 1.35;
        float band = smoothstep(0.0, 0.12, h) * (1.0 - smoothstep(0.12, 0.5, h));
        col += vec3(1.0, 0.36, 0.25) * band * 0.07;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  scene.add(sky);

  // Initial lights
  const hemi = new THREE.HemisphereLight(0xffb17e, 0x252c50, 1.35);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffa36e, 2.35);
  sun.position.set(-22, 27, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -30;
  sun.shadow.camera.right = 30;
  sun.shadow.camera.top = 30;
  sun.shadow.camera.bottom = -30;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 75;
  sun.shadow.bias = -0.0005;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x5272ff, 0.48);
  fill.position.set(18, 12, -18);
  scene.add(fill);
  // Warm bounce from ocean / low sun
  const bounce = new THREE.PointLight(0xff6b3e, 0.9, 50, 2);
  bounce.position.set(0, 2.5, -16);
  scene.add(bounce);

  // Ocean and beach
  world.group.add(createOcean(renderer));

  // Mountains and horizon
  world.group.add(createMountain(26, 17, 0x3c3f62, -48, -74, 8));
  world.group.add(createMountain(19, 12, 0x4c466b, -18, -95, 7));
  world.group.add(createMountain(32, 14, 0x444262, 29, -100, 9));
  world.group.add(createMountain(23, 9, 0x3f3e60, 82, -86, 8));
  world.group.add(createMountain(15, 14.5, 0x3f3c5e, -29, -84, 8));
  const christ = createChrist(glowTexture);
  christ.position.set(-29, 12.1, -84);
  christ.scale.setScalar(1.2);
  world.group.add(christ);
  world.group.add(createSugarloaf());
  world.group.add(createCity(renderer, windowTexture, glowTexture));

  // Clouds
  const cloudTexture = makeCloudTexture();
  for (let i = 0; i < 7; i++) {
    const mat = new THREE.SpriteMaterial({
      map: cloudTexture,
      color: [0xffb8a0, 0xffcbb4, 0xb58ab0][i % 3],
      transparent: true,
      opacity: 0.20 + rand() * 0.14,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const cloud = new THREE.Sprite(mat);
    cloud.position.set(-80 + rand() * 160, 18 + rand() * 24, -90 - rand() * 35);
    cloud.scale.set(45 + rand() * 50, 15 + rand() * 12, 1);
    cloud.userData.speed = 0.08 + rand() * 0.1;
    world.group.add(cloud);
    world.animated.clouds.push(cloud);
  }

  // Plaza base
  const platform = cylinder(24.15, 24.55, 0.9, 64, new THREE.MeshStandardMaterial({ color: 0x3b3245, roughness: 0.92 }), 0, -0.42, 0);
  platform.receiveShadow = true;
  world.group.add(platform);
  const plaza = new THREE.Mesh(
    new THREE.CircleGeometry(24.1, 96),
    new THREE.MeshStandardMaterial({ map: mosaicTexture, roughness: 0.76, metalness: 0.03 })
  );
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.y = 0.045;
  plaza.receiveShadow = true;
  world.group.add(plaza);
  // Brass border and dark stone rim
  const rim = new THREE.Mesh(
    new THREE.RingGeometry(22.75, 24.15, 96),
    new THREE.MeshStandardMaterial({ color: 0x182a3a, roughness: 0.72, metalness: 0.12 })
  );
  rim.rotation.x = -Math.PI / 2;
  rim.position.y = 0.052;
  world.group.add(rim);
  const brass = new THREE.Mesh(
    new THREE.RingGeometry(22.6, 22.78, 96),
    new THREE.MeshStandardMaterial({ color: 0xd4ac59, roughness: 0.3, metalness: 0.7 })
  );
  brass.rotation.x = -Math.PI / 2;
  brass.position.y = 0.058;
  world.group.add(brass);
  // Outer stone band
  const outerRing = new THREE.Mesh(
    new THREE.RingGeometry(24.15, 29, 64),
    new THREE.MeshStandardMaterial({ color: 0x8b7b74, roughness: 1 })
  );
  outerRing.rotation.x = -Math.PI / 2;
  outerRing.position.y = -0.02;
  outerRing.receiveShadow = true;
  world.group.add(outerRing);

  // Coreto
  const coreto = createCoreto(renderer, glowTexture);
  coreto.position.set(0, 0.05, -13.5);
  world.group.add(coreto);
  world.animated.coreto = coreto.userData;
  world.colliders.push({ x: 0, z: -13.5, r: 4.85 });

  // Kiosks
  const kioskData = [
    [-10.6, -1.5, "AÇAÍ", 0xd85b42],
    [10.2, 1.8, "TAPIOCA", 0xd99a3d],
    [-13.2, 11.7, "SUCO", 0x148c82],
    [13.1, 13.0, "MILHO", 0x6b5bb5],
  ];
  for (const [x, z, name, color] of kioskData) {
    const kiosk = createKiosk(renderer, stripeTexture, name, color, glowTexture);
    kiosk.position.set(x, 0.04, z);
    kiosk.rotation.y = Math.atan2(-x, -z);
    world.group.add(kiosk);
    world.colliders.push({ x, z, r: 2.25 });
    if (name === "AÇAÍ") {
      // Little extra fruit stand / table around the side
      const side = new THREE.Group();
      side.position.set(x + 2.7, 0.04, z + 0.7);
      side.add(box(1.5, 0.1, 1.0, new THREE.MeshStandardMaterial({ color: 0x8a5337, roughness: 0.9 }), 0, 0.92, 0));
      for (let i = 0; i < 4; i++) {
        side.add(cylinder(0.035, 0.045, 0.9, 5, new THREE.MeshStandardMaterial({ color: 0x5a3427 }), -0.58 + i * 0.38, 0.45, -0.36));
        side.add(cylinder(0.035, 0.045, 0.9, 5, new THREE.MeshStandardMaterial({ color: 0x5a3427 }), -0.58 + i * 0.38, 0.45, 0.36));
      }
      world.group.add(side);
    }
  }

  // Palms around the plaza
  const palmSpots = [
    [-18.2, -9.3], [18.1, -8.6], [-19.2, 8.1], [19.1, 9.2],
    [-16.3, 17.2], [16.0, 17.7], [-6.0, 19.7], [6.4, 19.5],
  ];
  for (const [x, z] of palmSpots) {
    const palm = createPalm(rand, glowTexture, renderer);
    palm.group.position.set(x, 0.05, z);
    palm.group.rotation.y = rand() * Math.PI * 2;
    world.group.add(palm.group);
    world.animated.leaves.push(...palm.leaves);
    world.colliders.push({ x, z, r: 0.62 });
    // Soft ground shadow
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.25, 18),
      new THREE.MeshBasicMaterial({ color: 0x1a1525, transparent: true, opacity: 0.15, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(x, 0.055, z);
    world.group.add(shadow);
  }

  // Planters
  for (const [x, z] of [[-6.9, 7.3], [6.8, 6.6], [-14.5, -6.3], [14.2, -5.7], [-4.4, 10.6]]) {
    const planter = createPlanter();
    planter.position.set(x, 0.04, z);
    planter.rotation.y = rand() * Math.PI * 2;
    world.group.add(planter);
    world.colliders.push({ x, z, r: 1.0 });
  }

  // Benches
  for (const [x, z, rot] of [[-6.4, 13.6, 0.25], [6.2, 14.2, -0.25], [-16.8, 2.2, Math.PI / 2], [17.0, 4.5, -Math.PI / 2]]) {
    const bench = createBench();
    bench.position.set(x, 0.04, z);
    bench.rotation.y = rot;
    world.group.add(bench);
  }

  // String lights, bandeirinhas
  world.group.add(createStringLights(glowTexture, world));
  const flags = createBandeirinhas();
  world.group.add(flags);
  world.animated.flags = flags.userData.flags;

  // Ambient fireflies
  const fireflies = createFireflies();
  world.group.add(fireflies.points);
  world.animated.fireflies = fireflies;

  // A few floating vinyl records / abstract music notes above the plaza
  const noteMat = new THREE.MeshBasicMaterial({ color: 0xffc552, transparent: true, opacity: 0.72 });
  for (let i = 0; i < 9; i++) {
    const note = new THREE.Group();
    const stem = box(0.035, 0.32, 0.035, noteMat, 0, 0.12, 0);
    note.add(stem);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), noteMat);
    head.scale.set(1.2, 0.72, 1);
    head.position.set(0.08, -0.04, 0);
    note.add(head);
    const flag = box(0.18, 0.07, 0.03, noteMat, 0.12, 0.34, 0);
    flag.rotation.z = -0.28;
    note.add(flag);
    const a = rand() * Math.PI * 2;
    note.position.set(Math.cos(a) * (9 + rand() * 10), 3.2 + rand() * 4, Math.sin(a) * (9 + rand() * 10));
    note.rotation.y = rand() * Math.PI;
    note.userData.phase = rand() * Math.PI * 2;
    note.userData.baseY = note.position.y;
    note.userData.spin = 0.18 + rand() * 0.2;
    world.group.add(note);
    world.animated.glows.push({ mesh: note, baseY: note.position.y, phase: note.userData.phase, spin: note.userData.spin, isNote: true });
  }

  scene.add(world.group);
  return world;
}

export function updateWorld(world, time, dt) {
  const a = world.animated;
  for (const leaf of a.leaves) {
    leaf.mesh.rotation.z = leaf.baseZ + Math.sin(time * 1.2 + leaf.phase) * 0.055;
    leaf.mesh.rotation.x = leaf.baseX + Math.sin(time * 0.9 + leaf.phase * 1.7) * 0.025;
  }
  for (const flag of a.flags) {
    flag.mesh.rotation.z = flag.baseZ + Math.sin(time * 2.1 + flag.phase) * 0.07;
    flag.mesh.rotation.x = Math.sin(time * 1.6 + flag.phase * 1.3) * 0.06;
  }
  for (const bulb of a.bulbs) {
    const s = 0.75 + Math.sin(time * 2.2 + bulb.phase) * 0.25;
    bulb.mesh.scale.setScalar(s);
    if (bulb.mesh.material) {
      bulb.mesh.material.color.setHSL(0.115, 0.9, 0.62 + Math.sin(time * 2.2 + bulb.phase) * 0.12);
    }
  }
  for (const glow of a.glows) {
    if (glow.isNote) {
      glow.mesh.rotation.y += dt * glow.spin;
      glow.mesh.position.y = glow.baseY + Math.sin(time * 0.9 + glow.phase) * 0.22;
    } else if (glow.sprite) {
      glow.sprite.material.opacity = glow.base + Math.sin(time * 2.2 + glow.phase) * glow.amp;
    }
  }
  for (const cloud of a.clouds) {
    cloud.position.x += dt * cloud.userData.speed;
    if (cloud.position.x > 150) cloud.position.x = -150;
  }
  if (a.coreto) {
    a.coreto.pointLight.intensity = 1.9 + Math.sin(time * 1.35) * 0.35;
    a.coreto.lampGlow.material.opacity = 0.78 + Math.sin(time * 1.35) * 0.1;
    for (let i = 0; i < a.coreto.bulbs.length; i++) {
      const b = a.coreto.bulbs[i];
      b.material.color.setHSL(0.115, 0.86, 0.6 + Math.sin(time * 1.8 + i * 0.3) * 0.15);
    }
  }
  if (a.fireflies) {
    const { positions, phases, count } = a.fireflies;
    for (let i = 0; i < count; i++) {
      positions[i * 3] += Math.sin(time * 0.6 + phases[i * 2]) * dt * 0.11;
      positions[i * 3 + 1] += Math.cos(time * 0.45 + phases[i * 2] * 1.7) * dt * 0.08;
      positions[i * 3 + 2] += Math.cos(time * 0.5 + phases[i * 2 + 1]) * dt * 0.1;
    }
    a.fireflies.points.geometry.attributes.position.needsUpdate = true;
    a.fireflies.points.material.opacity = 0.55 + Math.sin(time * 1.4) * 0.14;
  }
}
