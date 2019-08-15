import Scoreboard from "./Scoreboard";
import Player from "./Player";

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
    this.scoreBoard = new Scoreboard(this.players);
    this.playerDisplay.display(this.players[this.playing].name);

    this.board.gridDisplay.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell.addEventListener("click", () => {
          this.board.insertToken(i, j, this.currentPlayer().token);
          console.log("this.board.isFull():", this.board.isFull());
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
      winner = this.currentPlayer;
    }
    if (
      this.same3(
        this.board.grid[0][2],
        this.board.grid[1][1],
        this.board.grid[2][0]
      )
    ) {
      winner = this.currentPlayer;
    }

    return winner;
  }

  resetPlayers() {
    this.players = [ new Player(1, "X"), new Player(2, "O") ];
  }

  playAgain(): void {
    const board = document.querySelector("div#board");
    this.board.reset();
    this.scoreBoard.hide();
    this.board.show();
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
class Board {
  container: HTMLDivElement;
  grid: string[][];
  gridDisplay: HTMLDivElement[][];
  players: Player[] = [];

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.grid = [ [ "", "", "" ], [ "", "", "" ], [ "", "", "" ] ];
    this.players = [ new Player(1, "X"), new Player(2, "O") ];

    this.createDisplay();
    this.display();
  }

  insertToken(row: number, col: number, token: string) {
    if (this.grid[row][col] === "") {
      this.grid[row][col] = token;
      this.gridDisplay[row][col].innerText = token;
      this.display();
    }
  }

  display() {
    this.container.innerHTML = "";

    for (let row of this.gridDisplay) {
      const rowContainer = document.createElement("div");
      rowContainer.className = "row";
      for (let cell of row) {
        rowContainer.appendChild(cell);
      }
      this.container.appendChild(rowContainer);
    }
    const h1 = document.createElement("div");
    const h2 = document.createElement("div");
    const v1 = document.createElement("div");
    const v2 = document.createElement("div");

    h1.className = "grid h1";
    h2.className = "grid h2";
    v1.className = "grid v1";
    v2.className = "grid v2";

    this.container.appendChild(h1);
    this.container.appendChild(h2);
    this.container.appendChild(v1);
    this.container.appendChild(v2);
    this.show();
  }

  createDisplay() {
    this.gridDisplay = [];
    for (let [ i, row ] of this.grid.entries()) {
      this.gridDisplay.push([]);
      for (let [ j, cell ] of row.entries()) {
        const container = document.createElement("div");

        container.className = "cell";
        container.innerText = cell;

        this.gridDisplay[i].push(container);
      }
    }
  }

  show() {
    this.container.classList.remove("hidden");
  }

  hide() {
    this.container.classList.add("hidden");
  }

  isFull() {
    return !this.grid.some(row => row.some(cell => cell === ""));
  }

  reset() {
    this.grid = [ [ "", "", "" ], [ "", "", "" ], [ "", "", "" ] ];
    this.gridDisplay.forEach(row =>
      row.forEach(cell => {
        cell.innerText = "";
      })
    );
  }
}
