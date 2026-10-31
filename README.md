# VOX//ARENA

**O FPS onde tudo o que você fala vira arma.**

VOX//ARENA é um jogo de tiro em primeira pessoa feito para rodar direto no navegador. Fale uma frase — “canhão de plasma supersônico”, “metralhadora de gelo”, “laser tóxico” — e a forja transforma as palavras em uma receita de coleta: são **10 bloquinhos do mapa para cada palavra**. Junte todos e a arma procedural se materializa em 3D.

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

## Forja por coleta

A frase não entrega a arma na hora: ela abre uma coleta na arena.

- **10 bloquinhos por palavra.** “canhão de plasma” tem 3 palavras, então exige 30 bloquinhos.
- Cada palavra forma um grupo de 10 mini blocos, marcado por uma coluna de luz e pelo próprio nome flutuando sobre o mapa.
- Pise perto dos blocos: eles são atraídos para você e contam no HUD.
- O painel **FORJA EM COLETA** mostra a frase, a contagem e a barra de progresso.
- Ao juntar o último bloquinho, a arma é materializada com som, anel de energia e atualização dos atributos.
- Uma nova frase durante a coleta substitui a receita anterior e espalha novos bloquinhos.
- Morrer, reiniciar ou voltar ao menu limpa a coleta em andamento.

Dica: os grupos ficam distribuídos em anéis pela arena. Use as colunas de luz e os nomes flutuantes para encontrá-los sem parar de se mover.

## Voz e privacidade

- O reconhecimento usa a Web Speech API do navegador, em `pt-BR`.
- O microfone serve apenas para criar armas. O jogo não grava, armazena nem envia áudio por conta própria.
- **Chrome/Edge no Android e no desktop** têm o melhor suporte ao reconhecimento contínuo. O Safari do iOS não expõe a Web Speech API; nesse caso, use **Jogar digitando** — o microfone do teclado do iPhone pode ditar a frase diretamente no campo.
- Se o navegador bloquear o microfone, o jogo pausa e oferece “Tentar novamente” ou o modo de digitação.
- Em alguns navegadores o reconhecimento de voz depende de um serviço online do próprio fabricante.

### Frases que funcionam bem

A forja entende português e combina palavras de elemento, arquétipo e intensidade. A coleta é sempre **10 bloquinhos por palavra**:

- `canhão de plasma supersônico` → 4 palavras, 40 bloquinhos; canhão de plasma, alto dano e explosão.
- `metralhadora de fogo` → 3 palavras, 30 bloquinhos; rifle de fogo, cadência alta.
- `laser de gelo` → 3 palavras, 30 bloquinhos; emissor de criogenia, feixe contínuo.
- `espingarda tóxica` → 2 palavras, 20 bloquinhos; espingarda de ácido com vários projéteis.
- `railgun de vazio lendária` → 4 palavras, 40 bloquinhos; railgun de vazio, precisão e raridade elevada.
- `pistola comum` → 2 palavras, 20 bloquinhos; pistola neutra, equilibrada.

Palavras desconhecidas continuam funcionando: a forja cai em uma pistola de acesso e usa a frase como nome da arma.

## Recursos

- Arena 3D procedural com obelisco, neon, poeira, estrelas e bloom.
- Coleta de bloquinhos no mapa: 10 por palavra, com grupos iluminados e nomes flutuantes.
- Armas geradas proceduralmente em geometria, cor, som e estatísticas.
- Sem modelos, texturas ou áudio externos: a arena, as armas e os sons são gerados em tempo de execução.
- Ondas infinitas com sentinelas, brutos e tecelãs.
- Mira assistida sutil em telas de toque.
- HUD responsivo, dano flutuante, hit markers, killfeed, combos e screen shake.
- Áudio Web Audio procedural: tiros, impactos, kills, ondas e ambiência.
- Pausa, reinício, resumo de partida e retorno ao menu.
- Modo de teste por URL: `?play=1` inicia sem microfone e `?weapon=canhão%20de%20plasma` já abre a coleta da arma.

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
