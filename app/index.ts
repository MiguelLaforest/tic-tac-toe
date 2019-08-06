import Board from "./components/Board";

const board = new Board();
const reset = document.getElementById("reset");
const restart = document.getElementById("restart");

reset.addEventListener("click", () => {
  board.reset();
});

restart.addEventListener("click", () => {
  board.reset();
});



