import { Game } from "./game.js";

const canvas = document.getElementById("scene");
const game = new Game(canvas);
window.__pracaDoSol = game;

game.init().catch((error) => {
  console.error("Praça do Sol failed to start:", error);
  const loading = document.getElementById("loading");
  if (loading) {
    loading.innerHTML = `
      <div style="max-width:340px;text-align:center;padding:24px;line-height:1.6">
        <strong style="font-family:Anton, sans-serif;font-size:26px;display:block;margin-bottom:8px">A PRAÇA NÃO ABRIU</strong>
        <span style="font-size:11px;opacity:.65">Este navegador não conseguiu iniciar o WebGL. Tente atualizar ou abrir em outro aparelho.</span>
      </div>
    `;
  }
});
