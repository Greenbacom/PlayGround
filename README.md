# VOX//ARENA

**O FPS onde tudo o que você fala vira arma.**

VOX//ARENA é um jogo de tiro em primeira pessoa feito para rodar direto no navegador. Fale uma frase — “canhão de plasma supersônico”, “metralhadora de gelo”, “laser tóxico” — e a forja interpreta elemento, tipo, raridade, dano e cadência para materializar uma arma procedural em 3D.

Jogue no computador com teclado e mouse, ou no celular e tablet com controles de toque e inclinação opcional.

## Jogar

```bash
npm install
npm run dev -- --port 3000
```

Abra `http://localhost:3000`.

Para gerar a build de produção:

```bash
npm run build
npm run preview
```

## Como jogar

### Desktop

| Ação | Controle |
| --- | --- |
| Mover | `WASD` ou setas |
| Olhar | mouse (clique na arena para capturar) |
| Atirar | botão esquerdo ou `Espaço` |
| Pausar | `Esc` ou botão de pausa |
| Criar arma por texto | botão de teclado no HUD |

### Celular e tablet

- **Joystick** à esquerda para mover.
- **Arraste** na área da arena para olhar.
- **FOGO** à direita: mantenha pressionado para disparar.
- **Microfone** no HUD liga e desliga a escuta.
- **Teclado** no HUD abre a entrada manual de frases.
- **Inclinação** (opcional): ative na tela inicial ou no menu de pausa. No iOS, a permissão de movimento é solicitada no primeiro toque. Use “Recalibrar inclinação” para definir a posição atual como neutra.

## Voz e privacidade

- O reconhecimento usa a Web Speech API do navegador, em `pt-BR`.
- O microfone serve apenas para criar armas. O jogo não grava, armazena nem envia áudio por conta própria.
- **Chrome/Edge no Android e no desktop** têm o melhor suporte ao reconhecimento contínuo. O Safari do iOS não expõe a Web Speech API; nesse caso, use **Jogar digitando** — o microfone do teclado do iPhone pode ditar a frase diretamente no campo.
- Se o navegador bloquear o microfone, o jogo pausa e oferece “Tentar novamente” ou o modo de digitação.
- Em alguns navegadores o reconhecimento de voz depende de um serviço online do próprio fabricante.

### Frases que funcionam bem

A forja entende português e combina palavras de elemento, arquétipo e intensidade:

- `canhão de plasma supersônico` → canhão de plasma, alto dano e explosão.
- `metralhadora de fogo` → rifle de fogo, cadência alta.
- `laser de gelo` → emissor de criogenia, feixe contínuo.
- `espingarda tóxica` → espingarda de ácido com vários projéteis.
- `railgun de vazio lendária` → railgun de vazio, precisão e raridade elevada.
- `pistola comum` → pistola neutra, equilibrada.

Palavras desconhecidas continuam funcionando: a forja cai em uma pistola de acesso e usa a frase como nome da arma.

## Recursos

- Arena 3D procedural com obelisco, neon, poeira, estrelas e bloom.
- Armas geradas proceduralmente em geometria, cor, som e estatísticas.
- Sem modelos, texturas ou áudio externos: a arena, as armas e os sons são gerados em tempo de execução.
- Ondas infinitas com sentinelas, brutos e tecelãs.
- Mira assistida sutil em telas de toque.
- HUD responsivo, dano flutuante, hit markers, killfeed, combos e screen shake.
- Áudio Web Audio procedural: tiros, impactos, kills, ondas e ambiência.
- Pausa, reinício, resumo de partida e retorno ao menu.
- Modo de teste por URL: `?play=1` inicia sem microfone e `?weapon=canhão%20de%20gelo` já materializa uma arma.

## Stack

- [Vite](https://vite.dev/) para desenvolvimento e build.
- [Three.js](https://threejs.org/) para a cena, pós-processamento e modelos procedurais.
- Web Speech API, Web Audio API, Pointer Events e DeviceOrientation.
- Sem backend e sem dependências de mídia.

## Estrutura

```text
index.html        Menu, HUD, modais e controles
src/main.js       Fluxo de jogo, voz, toque, teclado e inclinação
src/game.js       Cena, arena, inimigos, ondas, tiro e efeitos
src/weapons.js    Semântica das frases e armas procedurais
src/audio.js      Síntese de áudio
src/style.css     Interface responsiva
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
