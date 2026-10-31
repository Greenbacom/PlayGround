# MORRO VIVO

**O morro não se entrega.** A Brazil-inspired wave-defense FPS built for phones and tablets, with a full desktop fallback.

You are on a Rio rooftop at dusk. Hold the território against sacis-drones, headless mulas, and the Boitatá — a fire serpent that wakes every five waves. Açaí blaster in hand, guaraná on the roof, capivara on standby.

## Play

```bash
npm install
npm run dev
```

Open the printed local URL. For a production build:

```bash
npm run build
npm run preview
```

The deployment runtime serves the Vite `dist/` output automatically.

## Controls

| Action | Touch | Desktop |
| --- | --- | --- |
| Move | Drag anywhere in the left half (floating joystick) | `WASD` / arrows |
| Look | Drag in the right half | Mouse |
| Fire | Hold **AÇAÍ** | Hold left mouse |
| Dash | Tap **IMPULSO** | `Space` |
| Pause | Top-right pause button | `Esc` / `P` |

### Tilt aiming (optional)

Tap **Inclinar** in the menu or pause screen. On iOS, the browser asks for motion permission through `DeviceOrientationEvent.requestPermission()`. Tilt offsets are layered on top of touch/mouse look, can be recalibrated from the green HUD chip, and are never required.

## Features

- Touch-first HUD with a floating stick, drag-to-look, hold-to-fire heat meter, cooldown dash, and off-screen threat arrows.
- Optional gyroscope aiming with iOS permission flow and calibration.
- Three enemy archetypes with distinct behavior: ranged sacis, charging mulas, and a segmented Boitatá boss.
- Procedural Rio rooftop: Christ the Redeemer, Sugarloaf, favela skyline, bunting, açaí stand, sound system, and a capivara.
- Procedural Web Audio funk/tamborzão loop and SFX — no external audio files.
- Combos, wave healing, guaraná/açaí pickups, personal best in `localStorage`.
- Responsive layouts for portrait phones, landscape phones, and tablets; adaptive pixel ratio for lower-end GPUs.

## Tech

- [Vite](https://vite.dev/) + [three.js](https://threejs.org/)
- Bundled Archivo / Archivo Black fonts
- All geometry, textures, particles, and audio generated at runtime

## Project map

```
src/main.js      game loop, state machine, waves, scoring, pickups
src/world.js     rooftop arena, city, sky, landmarks, props
src/enemies.js   saci / mula / Boitatá behavior, projectiles, hit detection
src/weapon.js    açaí blaster viewmodel, heat, recoil, muzzle FX
src/controls.js  touch, keyboard, joystick, tilt aiming
src/ui.js        screens, HUD, banners, score pops
src/audio.js     procedural music and SFX
src/fx.js        pooled particles, tracers, rings
src/style.css    menu, HUD, responsive layout
```

---

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Created using [OMGithub.com](https://omgithub.com).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://omgithub.com/Greenbacom/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/Greenbacom/PlayGround)

- 🎮 [Open the project](https://omgithub.com/Greenbacom/PlayGround).
- ✨ [Remix this project](https://omgithub.com/?remix=Greenbacom%2FPlayGround).
- 💻 [Explore the source](https://github.com/Greenbacom/PlayGround).
- 🛠️ [Check build runs](https://github.com/Greenbacom/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/Greenbacom/PlayGround/issues).
- 👤 [Explore the creator's projects](https://omgithub.com/Greenbacom).
- 🌍 [Create with OMGithub](https://omgithub.com).
<!-- omgithub:readme:end -->
