import Player from "./Player";
import Board from "./Board";
import Scoreboard from "./Scoreboard";

interface PlayerDisplay {
  container: HTMLDivElement;
  display: Function;
}

export default class Game {
  players: Player[];
  board: Board;
  scoreBoard: Scoreboard;

  scores: number[];

  playing = Math.round(Math.random() * 1);

  playerDisplay: PlayerDisplay = {
    container: document.querySelector("#current-player"),
    display: function(name: string) {
      this.container.innerText = name;
    }
  };

  constructor(board: HTMLDivElement) {
    this.board = new Board(board);
    this.players = [ new Player(1, "X"), new Player(2, "O") ];
    this.scoreBoard = new Scoreboard(this.players, this);
    this.playerDisplay.display(this.players[this.playing].name);

    this.board.gridDisplay.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell.addEventListener("click", () => {
          this.board.insertToken(i, j, this.currentPlayer().token);
          if (this.board.isFull() || this.winner()) {
            this.finished();
          } else {
            this.nextPlayer();
          }
        });
      });
    });
  }

  currentPlayer(): Player {
    return this.players[this.playing];
  }

  nextPlayer() {
    this.playing = +!this.playing;
    this.playerDisplay.display(this.currentPlayer().name);
  }

  finished() {
    const winner = this.winner();

    if (winner) {
      document.getElementById("winner").innerHTML = winner.name + " WINS";
      winner.win();
    } else {
      document.getElementById("winner").innerHTML = "TIE";
    }
    this.board.hide();
    this.scoreBoard.show();
  }

  winner() {
    let winner = null;

    for (let i = 0; i < 3; i++) {
      if (
        this.same3(
          this.board.grid[i][0],
          this.board.grid[i][1],
          this.board.grid[i][2]
        )
      ) {
        winner = this.currentPlayer();
      }
      if (
        this.same3(
          this.board.grid[0][i],
          this.board.grid[1][i],
          this.board.grid[2][i]
        )
      ) {
        winner = this.currentPlayer();
      }
    }

    if (
      this.same3(
        this.board.grid[0][0],
        this.board.grid[1][1],
        this.board.grid[2][2]
      )
    ) {
      winner = this.currentPlayer();
    }
    if (
      this.same3(
        this.board.grid[0][2],
        this.board.grid[1][1],
        this.board.grid[2][0]
      )
    ) {
      winner = this.currentPlayer();
    }

    return winner;
  }

  resetPlayers() {
    this.players = [ new Player(1, "X"), new Player(2, "O") ];
  }

  playAgain(): void {
    this.board.reset();
    this.board.show();
    this.scoreBoard.hide();
    this.playing = Math.round(Math.random() * 1);
    this.playerDisplay.display(this.currentPlayer().name);
  }

  displayScore() {
    const p1 = document.getElementById("player-1-score");
    const p2 = document.getElementById("player-2-score");

    p1.innerText = this.players[0].score.toString();
    p2.innerText = this.players[1].score.toString();
  }

  private same3(a: string, b: string, c: string) {
    if (a === "" || b === "" || c === "") {
      return;
    }

    return a == b && b == c;
  }
}
