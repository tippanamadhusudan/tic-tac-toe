import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-gamebox',
  templateUrl: './gamebox.component.html',
  styleUrls: ['./gamebox.component.css']
})
export class GameboxComponent implements OnInit, OnDestroy {
  // symbol: string = 'X';
  //elements: string[] = [null, null, null, null, null, null, null, null, null];
  elements: any;
  turn: boolean = true;
  private gameClear: Subscription;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.elements = this.appService.elements;
    this.appService.gameClear.subscribe((elements: {}) => {
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
        return false;
    }
  }

  clearGame() {
    this.appService.clearGame();
  }

  ngOnDestroy() {
    this.gameClear.unsubscribe();
  }

}
