# PlayGround

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

## MORRO 2099

**A favela não dorme. A roda não perdoa.**

MORRO 2099 is a stylized browser FPS set in a neon Rio favela at dusk. Survive six waves, swap between two weapons, and take down **Rei Momo 2.0** while a fully procedural samba-funk soundtrack pushes the tempo. Every model, texture, sign, particle and sound is generated in code with Three.js and Web Audio — no external art or audio files.

### Controls

| Platform | Move | Aim | Fire | Aim down sights | Reload | Swap | Jump | Pause |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop | WASD / arrows | Mouse | LMB | RMB | R | Q | Space | Esc |
| Phone / tablet | Left thumbstick | Drag right side | FOGO | MIRA | Reload button | Swap button | Jump button | Pause button |

- Best on phone/tablet in landscape, with sound on.
- Tilt aiming is optional. Tap **INCLINAÇÃO** on the start screen or pause menu. On iOS the game requests motion permission through `DeviceOrientationEvent.requestPermission()` and `DeviceMotionEvent.requestPermission()`.
- Desktop mouse look uses pointer lock. Click **ENTRAR NA RODA** (or the arena) to lock the cursor; Esc releases it and pauses.

### Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite. To check the production build:

```bash
npm run build
npm run preview
```

### Stack

- Three.js r187 + Vite 8
- Procedural geometry, `CanvasTexture` signage, particles, tracers and muzzle flashes
- UnrealBloom post-processing, PCF shadows, custom HUD and radar
- Web Audio samba-funk loop and synthesized weapon/impact SFX
- Responsive touch layout, safe-area support, orientation hint and accelerometer aiming
