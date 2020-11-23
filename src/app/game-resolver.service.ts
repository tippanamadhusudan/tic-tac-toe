import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { AppService } from './app.service';
import { DataStorageService } from './data-storage.service';

@Injectable({providedIn: 'root'})
export class GameResolverService implements Resolve<any> {
    constructor(private appService: AppService,
        private dataStorageService: DataStorageService) { }

    resolve() {
        const elements = this.appService.gameData.elements;
        let nullElement = true;

        for(let i=0 ; i<elements.length; i++) {
            if(elements[i] != null) {
                nullElement = false;
            }
        }

        if(nullElement) {
            return this.dataStorageService.fetchData();
        } else {
            return elements;
        }
    }
}