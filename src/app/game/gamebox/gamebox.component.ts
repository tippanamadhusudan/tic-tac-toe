import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameModel } from 'src/app/game.model';

import { AppService } from '../../app.service';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-gamebox',
  templateUrl: './gamebox.component.html',
  styleUrls: ['./gamebox.component.css']
})
export class GameboxComponent implements OnInit, OnDestroy {
  elements: any;
  turn: boolean;
  private change: Subscription;

  constructor(private appService: AppService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.elements = this.appService.gameData.elements;
    this.turn = this.appService.gameData.turn;

    this.change = this.appService.change.subscribe((gameData: GameModel) => {
      this.elements = gameData.elements;
      this.turn = gameData.turn;
    });
  }

  onMarkBox(n: number) {
    // Check and Mark the box played by the player
    this.markBox(n);

    // Check if the game is over and if it is, clear the game.
    if(this.isGameOver()) {
      this.clearGame();
    }

    // Change player turn
    this.appService.playerTurn();

    // Game AI's turn to play
    this.gameAI();

    // Check if the game is over and if it is, clear the game.
    if(this.isGameOver()) {
      this.clearGame();
    }

    // Change player turn
    this.appService.playerTurn();
  }

  markBox(n: number) {
    if(!this.appService.gameData.elements.hasOwnProperty(n)) {
      this.appService.gameData.elements[n] = this.appService.gameData.symbol;
      this.appService.gameData.turn = !this.appService.gameData.turn;
      // this.appService.playerTurn();
      this.turn = this.appService.gameData.turn;
      this.dataStorageService.storeData(this.appService.gameData);

    } else {
      alert("This box is occupied!");
    }
  }

  gameAI() {
    if(!this.appService.gameData.turn) {
      let index = this.appService.gameAI();
      this.markBox(index);
    }
  }

  isGameOver() {
    let emptyBoxes = 0;
    for(let i = 0; i < 9; i++) {
        if(!this.elements.hasOwnProperty(i)) {
            emptyBoxes += 1;
        }
    }

    if(this.appService.winCheck() === 'win'){
        alert(`Game over: ${this.appService.gameData.nowPlaying} won`);
        return true;
    } else if(emptyBoxes === 0) {
        alert("Game over: No more moves left. It's a tie");
        return true;
    } else return false;
  }

  clearGame() {
    this.appService.clearGame();
    this.dataStorageService.storeData(this.appService.gameData);
  }

  ngOnDestroy() {
    this.change.unsubscribe();
  }

}
