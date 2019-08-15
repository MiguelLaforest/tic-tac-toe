import Player from "./Player";

export default class Scoreboard {
  players: Player[];
  container = document.getElementById("scoreboard");

  constructor(players: Player[]) {
    this.players = players;
    this.render();
  }

  render() {
    this.container.innerHTML = /* html */ `
    <div class="container">
    <span id="winner"></span>
    <div class="scores">
      <div class="names">
        <span class="n1">P1</span>
        <span class="n2">P2</span>

        <span class="s1" id="player-1-score">${this.players[0].score}</span>
        <span class="s2" id="player-2-score">${this.players[1].score}</span>
      </div>
    </div>
    <button id="restart">Play Again!</button>
  </div>
    `;
  }

  show() {
    this.container.classList.remove("hidden");
  }

  hide() {
    this.container.classList.add("hidden");
  }
}
