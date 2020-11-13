export class Game {
    public elements: string[];
    public nowPlaying: string;
    public symbol: string;

    constructor(elements: string[], nowPlaying: string) {
        elements;
        nowPlaying;
    }

    playerSymbol(): void {
        if(this.nowPlaying === 'player-1') {
            this.symbol = 'X';
        } else {
            this.symbol = 'O';
        }
    }
}