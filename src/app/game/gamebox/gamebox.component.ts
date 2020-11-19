import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from '../../app.service';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-gamebox',
  templateUrl: './gamebox.component.html',
  styleUrls: ['./gamebox.component.css']
})
export class GameboxComponent implements OnInit, OnDestroy {
  elements: any;
  turn: boolean = true;
  private gameClear: Subscription;

  constructor(private appService: AppService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    console.log("gameboxComponent.ts");
    this.elements = this.appService.elements;
    console.log(this.appService.elements);
    console.log(this.elements);
    this.gameClear = this.appService.gameClear.subscribe((elements: {}) => {
      this.elements = elements;
    });
  }

  onMarkBox(n: number) {
    if(!this.appService.elements.hasOwnProperty(n-1)) {
      this.elements[n-1] = this.appService.symbol;

      if(this.isGameOver()) {
        this.clearGame();
      } else {
        this.appService.playerTurn();
        this.turn = this.appService.turn;
        this.dataStorageService.storeData(this.appService.gameData);
      }

    } else {
      alert("This box is occupied!");
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
        alert(`Game over: ${this.appService.nowPlaying} won`);
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
    this.gameClear.unsubscribe();
  }

}
