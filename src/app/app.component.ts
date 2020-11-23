import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { LoginOrSignupService } from './login-or-signup/loginOrSignup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Tic-Tac-Toe';
  isSignin: boolean = false;
  signin: Subscription;

  constructor(private appService: AppService,
    private loginOrSignupService: LoginOrSignupService) {}
  
  ngOnInit() { 
    this.signin = this.appService.signin.subscribe(data => {
      this.isSignin = data;
    });
  }

  onLogout() {
    this.loginOrSignupService.logout();
    this.isSignin = !this.isSignin;
  }

  ngOnDestroy() {
    this.signin.unsubscribe();
  }
  
}
