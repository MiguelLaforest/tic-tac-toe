/**
 * Board
 */
class Board {
  grid: string[][];
  currentPlayer: Player;
  players: Player[] = [];

  /**
   * Creates an instance of board.
   */
  constructor() {
    this.initPlayers();
    this.initBoard();
    this.display();
  }

  /**
   * Inits players
   */
  initPlayers() {
    this.players.push(new Player(1, "X"));
    this.players.push(new Player(2, "O"));
    this.currentPlayer = this.players[
      Math.floor(Math.random() * this.players.length)
    ];
  }

  /**
   * Inits board
   */
  initBoard() {
    this.grid = [ [ "", "", "" ], [ "", "", "" ], [ "", "", "" ] ];
  }

  /**
   * Displays board
   */
  display() {
    const board = document.getElementById("board");
    const playerDisplay = document.getElementById("current-player");

    board.innerHTML = "";
    board.style.opacity = "1";

    for (let [ i, row ] of this.grid.entries()) {
      const rowContainer = document.createElement("div");

      rowContainer.className = "row";

      for (let [ j, cell ] of row.entries()) {
        const container = document.createElement("div");

        container.className = "cell";
        container.innerText = cell;

        const putToken = () => {
          container.innerText = this.currentPlayer.token;
          this.grid[i][j] = this.currentPlayer.token;

          if (this.full() || this.winner()) {
            this.finished();
          } else {
            this.nextPlayer();
          }

          container.removeEventListener("click", putToken);
        };

        container.addEventListener("click", () => {
          putToken();
        });

        rowContainer.appendChild(container);
      }
      board.appendChild(rowContainer);
    }

    const h1 = document.createElement("div");
    const h2 = document.createElement("div");
    const v1 = document.createElement("div");
    const v2 = document.createElement("div");

    h1.className = "grid h1";
    h2.className = "grid h2";
    v1.className = "grid v1";
    v2.className = "grid v2";

    board.appendChild(h1);
    board.appendChild(h2);
    board.appendChild(v1);
    board.appendChild(v2);

    playerDisplay.innerText = this.currentPlayer.name;
  }

  displayBoard() {
    const board = document.getElementById("board");

    board.style.zIndex = "1";
    board.style.opacity = "1";

    this.hideScoreBoard();
  }

  hideBoard() {
    const board = document.getElementById("board");

    board.style.zIndex = "-1";
    board.style.opacity = "0";
  }

  displayScoreBoard() {
    const scoreBoard = document.getElementById("scoreboard");

    scoreBoard.style.zIndex = "1";
    scoreBoard.style.opacity = "1";

    this.hideBoard();
  }

  hideScoreBoard() {
    const scoreBoard = document.getElementById("scoreboard");

    scoreBoard.style.zIndex = "-1";
    scoreBoard.style.opacity = "0";
  }

  nextPlayer() {
    const playerDisplay = document.getElementById("current-player");

    switch (this.currentPlayer.token) {
      case "O":
        this.currentPlayer = this.players[0];
        break;

      case "X":
        this.currentPlayer = this.players[1];
        break;

      default:
        break;
    }

    playerDisplay.innerText = this.currentPlayer.name;
  }

  winner() {
    let winner = null;

    for (let i = 0; i < 3; i++) {
      if (this.same3(this.grid[i][0], this.grid[i][1], this.grid[i][2])) {
        winner = this.currentPlayer;
      }
      if (this.same3(this.grid[0][i], this.grid[1][i], this.grid[2][i])) {
        winner = this.currentPlayer;
      }
    }

    if (this.same3(this.grid[0][0], this.grid[1][1], this.grid[2][2])) {
      winner = this.currentPlayer;
    }
    if (this.same3(this.grid[0][2], this.grid[1][1], this.grid[2][0])) {
      winner = this.currentPlayer;
    }

    return winner;
  }

  full() {
    let isFull = true;
    this.grid.forEach(row => {
      if (row.includes("")) {
        isFull = false;
      }
    });
    return isFull;
  }

  finished() {
    const winner = this.winner();

    if (winner) {
      document.getElementById("winner").innerHTML = winner.name + " WINS";
      winner.win();
    } else {
      document.getElementById("winner").innerHTML = "TIE";
    }

    this.displayScore();
    this.displayScoreBoard();
  }

  private same3(a: string, b: string, c: string) {
    if (a === "" || b === "" || c === "") {
      return;
    }

    return a == b && b == c;
  }

  reset() {
    this.grid = [ [ "", "", "" ], [ "", "", "" ], [ "", "", "" ] ];
    this.currentPlayer = this.players[
      Math.floor(Math.random() * this.players.length)
    ];
    this.display();
    this.displayBoard();
  }

  displayScore() {
    const p1 = document.getElementById("player-1-score");
    const p2 = document.getElementById("player-2-score");

    p1.innerText = this.players[0].score.toString();
    p2.innerText = this.players[1].score.toString();
  }
}

class Player {
  id: number;
  name: string;
  token: string;
  private _score: number = 0;

  constructor(id: number, token: string) {
    this.name = "Player-" + id;
    this.token = token;
  }

  win() {
    console.log("this.score:", this.score);
    this.score++;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }
}

const board = new Board();
const reset = document.getElementById("reset");
const restart = document.getElementById("restart");

reset.addEventListener("click", () => {
  board.reset();
});

restart.addEventListener("click", () => {
  board.reset();
});
