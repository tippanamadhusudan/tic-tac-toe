import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { GameModel } from './game.model';

@Injectable({providedIn: 'root'})
export class AppService {
    gameData: GameModel;
    nowPlaying: string = "player-1";
    turn: boolean = true;
    playerChanged = new Subject<boolean>();
    gameClear = new Subject<{}>();
    symbol: string = 'X';
    elements = {};

    playerTurn() {
        if(this.nowPlaying === "player-1") {
            this.nowPlaying = "player-2";
            this.symbol = 'O';
        } else {
            this.nowPlaying = "player-1";
            this.symbol = 'X';
        }
        console.log(this.turn);
        this.turn = !this.turn;
        this.gameData = new GameModel(this.elements, this.turn);
        // console.log(this.gameData);
        this.playerChanged.next(this.turn);
        // alert(`Now ${this.nowPlaying}'s turn`);
    }

    // isGameOver() {
    //     let emptyBoxes = 0;
    //     for(let i = 0; i < 9; i++) {
    //         if(!this.elements.hasOwnProperty(i)) {
    //             emptyBoxes += 1;
    //         }
    //     }

    //     if(this.winCheck() === 'win'){
    //         alert(`Game over: ${this.nowPlaying} won`);
    //         this.clearGame();
    //     } else if(emptyBoxes === 0) {
    //         alert("Game over: No more moves left. It's a tie");
    //         this.clearGame();
    //     }
    // }

    winCheck() {
        if(this.elements[0] === this.elements[1] && this.elements[1] === this.elements[2]) {
            if(this.elements[1] != null)
                return 'win';
        }
        else if(this.elements[0] === this.elements[3] && this.elements[3] === this.elements[6]) {
            if(this.elements[3] != null)
                return 'win';
        }
        else if(this.elements[0] === this.elements[4] && this.elements[4] === this.elements[8]) {
            if(this.elements[4] != null)
                return 'win';
        }
        else if(this.elements[1] === this.elements[4] && this.elements[4] === this.elements[7]) {
            if(this.elements[4] != null)
                return 'win';
        }
        else if(this.elements[2] === this.elements[5] && this.elements[5] === this.elements[8]) {
            if(this.elements[5] != null)
                return 'win';
        }
        else if(this.elements[2] === this.elements[4] && this.elements[4] === this.elements[6]) {
            if(this.elements[4] != null)
                return 'win';
        }
        else if(this.elements[3] === this.elements[4] && this.elements[3] === this.elements[5]) {
            if(this.elements[4] != null)
                return 'win';
        }
        else if(this.elements[6] === this.elements[7] && this.elements[7] === this.elements[8]) {
            if(this.elements[7] != null)
                return 'win';
        }
    }

    clearGame() {
        this.turn = true;
        this.nowPlaying = "player-1"
        this.symbol = 'X';
        this.elements = {};
        this.gameClear.next(this.elements);
        this.playerChanged.next(this.turn);
    }
}