import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { AppService } from './app.service';
import { GameModel } from './game.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient,
        private appService: AppService) {}

    storeData(gameData: GameModel) {
        this.http
            .put('https://tic-tac-toe-b0a8c.firebaseio.com/gameData.json', gameData)
            .subscribe(response => {
                // console.log(response);
            }, error => {
                console.log(error);
            });
    }

    fetchData() {
        //     .get<GameModel>('https://tic-tac-toe-b0a8c.firebaseio.com/gameData.json').subscribe(
        //         data => {
        //             this.appService.gameData = data;
        //             console.log(this.appService.gameData);
        //         },
        //         error => console.log(error)
        //     );
        return this.http
            .get<GameModel>('https://tic-tac-toe-b0a8c.firebaseio.com/gameData.json')
            .pipe(tap(data => {
                if(data.elements) {
                    this.appService.gameData = data;
                }
                // console.log(this.appService.gameData);
            })
        );
    }
}