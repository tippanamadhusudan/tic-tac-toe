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
    // if(this.elements[n-1] === null) {
    //   this.elements[n-1] = this.appService.symbol;
    //   this.appService.isGameOver(this.elements);
    //   this.appService.playerTurn();
    //   this.turn = this.appService.turn;
    // } else {
    //   alert("This box is occupied!");
    // }
    if(!this.elements.hasOwnProperty(n-1)) {
      this.elements[n-1] = this.appService.symbol;
      this.appService.playerTurn();
      this.appService.isGameOver();
      this.turn = this.appService.turn;
    } else {
      alert("This box is occupied!");
    }
  }

  clearGame() {
    this.appService.clearGame();
  }

  ngOnDestroy() {
    this.gameClear.unsubscribe();
  }

}
