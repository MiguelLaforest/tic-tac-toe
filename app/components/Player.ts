export default class Player {
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