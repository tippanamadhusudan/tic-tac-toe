import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Tic-Tac-Toe';
  isSignin: boolean = false;
  signin: Subscription;

  constructor(private appService: AppService) {}
  
  ngOnInit() { 
    this.signin = this.appService.signin.subscribe(data => {
      this.isSignin = data;
    });
  }

  onLogout() {

  }
  
}
