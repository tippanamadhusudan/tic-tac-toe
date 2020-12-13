import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { GameModel } from './game.model';

@Injectable({providedIn: 'root'})
export class AppService {
    gameData: GameModel = new GameModel();
    isSignin: boolean = false;
    playingWithPlayer: boolean = false;
    
    change = new Subject<{}>();
    signin = new Subject<boolean>();
    playingWithChange = new Subject<boolean>();

    playerTurn() {
        // this.gameData.turn = !this.gameData.turn;
        if(this.gameData.turn) {
            this.gameData.nowPlaying = 'player-1';
            this.gameData.symbol = 'X';
        } else {
            this.gameData.nowPlaying = 'player-2';
            this.gameData.symbol = 'O';

        }

        this.change.next(this.gameData);
    }

    assignPlayer(res : any) {
        if(this.gameData.player['player-1'] === '') {
            this.gameData.player['player-1'] = res.email;
        } else if (this.gameData.player['player-2'] === '') {
            this.gameData.player['player-2'] = res.email;
        } else {
            alert('NO more empty games. Please wait untill the current game is done!')
        }
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

    gameAI() {
        let emptySlots = [];

        // Find all empty boxes
        for(let i=0; i<9; i++) {
            if(!this.gameData.elements[i]) {
                emptySlots.push(i);
            }
        }

        // Randomly select an empty box
        let random = Math.floor(Math.random() * (emptySlots.length-1));
        return emptySlots[random];
    }

    clearGame() {
        this.gameData = new GameModel();
        this.change.next(this.gameData);
    }

    isSignedin() {
        this.signin.next(this.isSignin);
    }
}