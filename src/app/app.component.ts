import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { GameModel } from './game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Tic-Tac-Toe';

  constructor(private dataStoageService: DataStorageService) {}
  
  ngOnInit() {
    // const gameData1: GameModel = new GameModel();
    //   gameData1.elements = ['X', 'O', 'X', null, null, null, 'O', 'X', 'O'];
    //   gameData1.turn = true;
    //   gameData1.nowPlaying = 'player-1';
    //   gameData1.symbol = 'x';
    //   console.log(gameData1);
    // this.dataStoageService.storeData(gameData1);
  }
  
}
