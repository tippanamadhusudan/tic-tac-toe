import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { DataStorageService } from './data-storage.service';

import { GameModel } from './game.model';

@Injectable({providedIn: 'root'})
export class AppService {
    gameData: GameModel;

    nowPlaying: string = "player-1";
    // nowPlaying: string;
    turn: boolean = true;
    // turn: boolean;
    symbol: string = 'X';
    // symbol: string;
    elements = [];

    playerChanged = new Subject<boolean>();
    gameClear = new Subject<{}>();

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
        this.elements = new Array(9);
        this.gameData = new GameModel(this.elements, this.turn);
        this.gameClear.next(this.elements);
        this.playerChanged.next(this.turn);
    }
}