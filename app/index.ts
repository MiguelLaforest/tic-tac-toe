import Game from "./components/Game";

const game = new Game(document.querySelector("#board"));

document.getElementById("reset").addEventListener("click", game.board.reset);

document.getElementById("restart").addEventListener("click", () => {
  game.playAgain();
});
