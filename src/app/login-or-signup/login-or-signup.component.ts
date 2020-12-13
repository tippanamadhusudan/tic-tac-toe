import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '../app.service';
import { LoginOrSignupService } from './loginOrSignup.service';

@Component({
  selector: 'app-login-or-signup',
  templateUrl: './login-or-signup.component.html',
  styleUrls: ['./login-or-signup.component.css']
})
export class LoginOrSignupComponent implements OnInit {
  isSignupPage: boolean = false;
  action: string = 'Signup';
  currentAction = 'Signin';

  constructor(private loginOrSignupService: LoginOrSignupService,
    private appService: AppService,
    private router: Router) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if(!form.value) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if(this.isSignupPage) {
      this.loginOrSignupService.signup(email, password).subscribe(res => {
        // console.log('Signup: ' + res);
      });
    } else {
      this.loginOrSignupService.login(email, password).subscribe(res => {
        this.appService.isSignin = true;
        this.appService.isSignedin();

        // Navigate to home page
        this.router.navigate(['/']);

        // Assign player-1 and player-2 to the logged in players for realtime gaming.
        this.appService.assignPlayer(res);
      });
    }

    form.reset();
  }

  onChange() {
    this.isSignupPage = !this.isSignupPage;
    if(this.isSignupPage) {
      this.action = 'Signin';
      this.currentAction = 'Signup';
    } else {
      this.action = 'Signup';
      this.currentAction = 'Signin';
    } 
  }

}
