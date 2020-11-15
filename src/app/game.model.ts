export class GameModel {
    public elements: {};
    public turn: boolean;
    public nowPlaying: string;
    public symbol: string;

    constructor(elements: {}, turn: boolean) {
        this.elements = elements;
        this.turn = turn;
        this.nowPlaying = this.turn ? 'player-1' : 'player-2';
        this.symbol = this.turn ? 'X' : 'O';
    }
}