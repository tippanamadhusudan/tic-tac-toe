import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {
  turn: boolean = true;
  private playerChange: Subscription;

  constructor(private appService: AppService,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    console.log("playersComponent.ts");
    // this.dataStorageService.fetchData();
    // console.log(this.appService.gameData);
    this.playerChange = this.appService.playerChanged.subscribe((turn: boolean) => {
      // console.log(`Before: ${this.turn}`);
      this.turn = turn;
      // console.log(`After: ${this.turn}`);
    });
  }

  onClear() {
    this.appService.clearGame();
  }

  ngOnDestroy() {
    this.playerChange.unsubscribe();
  }

}
