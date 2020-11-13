import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {
  turn: boolean = true;
  private playerChang: Subscription;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.playerChanged.subscribe((turn: boolean) => {
      this.turn = turn;
      console.log(this.turn);
    });
  }

  onClear() {
    this.appService.clearGame();
  }

  ngOnDestroy() {
    this.playerChang.unsubscribe();
  }

}
