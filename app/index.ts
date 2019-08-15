import Board from "./components/Board";
import Game from "./components/Board";

const boardContainer = <HTMLDivElement>document.getElementById("board");
const game = new Game(boardContainer);
const reset = document.getElementById("reset");
const restart = document.getElementById("restart");

reset.addEventListener("click", () => {
  game.board.reset();
});

restart.addEventListener("click", () => {
  game.playAgain();
});
