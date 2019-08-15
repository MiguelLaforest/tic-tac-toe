import Player from "./Player";
import Game from "./Game";

export default class Scoreboard {
  game: Game;
  players: Player[];
  container = document.getElementById("scoreboard");

  constructor(players: Player[], game) {
    this.game = game;
    this.players = players;
    this.render();
  }
  update() {}

  render() {
    this.container.innerHTML = "";
    const btn = this.playAgain();
    const container = document.createElement("div");

    container.className = "container";

    container.innerHTML = /* html */ `
      <span id="winner">${this.game.winner() ? this.game.winner().name : ""}
      </span>
      <div class="scores">
        <div class="names">
          <span class="n1">P1</span>
          <span class="n2">P2</span>

          <span class="s1" id="player-1-score">${this.players[0].score}</span>
          <span class="s2" id="player-2-score">${this.players[1].score}</span>
        </div>
      </div>
    `;
    container.appendChild(btn);
    this.container.appendChild(container);
  }

  playAgain() {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => {
      this.game.playAgain();
    });
    btn.innerText = "Play Again!";
    btn.id = "restart";
    return btn;
  }

  show() {
    this.render();
    this.container.classList.remove("hidden");
  }

  hide() {
    this.container.classList.add("hidden");
  }
}
