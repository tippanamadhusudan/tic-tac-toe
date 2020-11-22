export class GameModel {
    public elements: any;
    public turn: boolean;
    public nowPlaying: string;
    public symbol: string;

    constructor() {
        this.elements = new Array(9);
        this.turn = true;
        this.nowPlaying = this.turn ? 'player-1' : 'player-2';
        this.symbol = this.turn ? 'X' : 'O';
    }
}