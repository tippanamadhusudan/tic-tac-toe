import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { AppService } from './app.service';
import { DataStorageService } from './data-storage.service';

@Injectable({providedIn: 'root'})
export class GameResolverService implements Resolve<any> {
    constructor(private appService: AppService,
        private dataStorageService: DataStorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const elements = this.appService.elements;
        console.log("gameResolverService");

        if(elements.length === 0) {
            return this.dataStorageService.fetchData();
        } else {
            return elements;
        }
    }
}