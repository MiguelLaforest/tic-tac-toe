import Player from "./Player";

export default class Board {
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
