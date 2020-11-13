import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppService {
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
        this.turn = !this.turn;
        this.playerChanged.next(this.turn);
    }

    isGameOver() {
        // let noOfNulls = 0;
        // for(let i = 0; i < elements.length; i++) {
        //     if(elements[i] === null) {
        //         noOfNulls += 1;
        //     }
        // }

        // if(noOfNulls === 0) {
        //     if(this.winCheck(elements) === 'win'){
        //         alert(`Game over: ${this.nowPlaying} won`);
        //     }
        //     else{
        //         alert("Game over: No more moves left. It's a tie");
        //     }
        // }
        // else{
        //     if(this.winCheck(elements) === 'win'){
        //         alert(`Game over: ${this.nowPlaying} won`);
        //     }
        // }
        let emptyBoxes = 0;
        for(let i = 0; i < 9; i++) {
            if(!this.elements.hasOwnProperty(i)) {
                emptyBoxes += 1;
            }
        }

        if(this.winCheck() === 'win'){
            alert(`Game over: ${this.nowPlaying} won`);
            this.clearGame();
        } else if(emptyBoxes === 0) {
            alert("Game over: No more moves left. It's a tie");
            this.clearGame();
        }



        // if(emptyBoxes === 0) {
        //     if(this.winCheck() === 'win'){
        //         alert(`Game over: ${this.nowPlaying} won`);
        //     }
        //     else{
        //         alert("Game over: No more moves left. It's a tie");
        //     }
        //     this.clearGame();
        // }
        // else{
        //     if(this.winCheck() === 'win'){
        //         alert(`Game over: ${this.nowPlaying} won`);
        //         this.clearGame();
        //     }
        // }
    }

    private winCheck() {
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
        //this.turn = true;
        this.elements = {};
        this.gameClear.next(this.elements);
        this.playerChanged.next(true);
        this.symbol = 'X';
    }
}