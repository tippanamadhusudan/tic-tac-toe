import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { GameModel } from './game.model';

@Injectable({providedIn: 'root'})
export class AppService {
    gameData: GameModel = new GameModel();
    
    change = new Subject<{}>();

    playerTurn() {
        this.gameData.turn = !this.gameData.turn;
        if(this.gameData.turn) {
            this.gameData.nowPlaying = 'player-1';
            this.gameData.symbol = 'X';
        } else {
            this.gameData.nowPlaying = 'player-2';
            this.gameData.symbol = 'O';
        }
        // this.gameData.playerChange(this.gameData.turn);

        this.change.next(this.gameData);
    }

    winCheck() {
        const data = this.gameData.elements;
        if(data[0] === data[1] && data[1] === data[2]) {
            if(data[1] != null)
                return 'win';
        }
        else if(data[0] === data[3] && data[3] === data[6]) {
            if(data[3] != null)
                return 'win';
        }
        else if(data[0] === data[4] && data[4] === data[8]) {
            if(data[4] != null)
                return 'win';
        }
        else if(data[1] === data[4] && data[4] === data[7]) {
            if(data[4] != null)
                return 'win';
        }
        else if(data[2] === data[5] && data[5] === data[8]) {
            if(data[5] != null)
                return 'win';
        }
        else if(data[2] === data[4] && data[4] === data[6]) {
            if(data[4] != null)
                return 'win';
        }
        else if(data[3] === data[4] && data[3] === data[5]) {
            if(data[4] != null)
                return 'win';
        }
        else if(data[6] === data[7] && data[7] === data[8]) {
            if(data[7] != null)
                return 'win';
        }
    }

    clearGame() {
        this.gameData = new GameModel();
        // console.log(this.gameData);
        this.change.next(this.gameData);
    }
}