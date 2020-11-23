import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameModel } from 'src/app/game.model';
import { AppService } from '../../app.service';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {
  turn: boolean = true;
  private change: Subscription;

  constructor(private appService: AppService,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.change = this.appService.change.subscribe((gameData: GameModel) => {
      this.turn = gameData.turn;
    });
  }

  onClear() {
    this.appService.clearGame();
    this.dataStorageService.storeData(this.appService.gameData);
  }

  // onFetch() {
  //   this.appService.change.next(this.appService.gameData);
  //   this.turn = this.appService.gameData.turn;
  // }

  ngOnDestroy() {
    this.change.unsubscribe();
  }

}
