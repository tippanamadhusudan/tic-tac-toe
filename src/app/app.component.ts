import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { DataStorageService } from './data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Tic-Tac-Toe';
  collapsed = true;

  constructor(private appService: AppService,
    private dataStorageService: DataStorageService) {}
  
  ngOnInit() {
    // this.dataStorageService.fetchData();
    console.log("appComponent.ts");
  }
  
}
