import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlayersComponent } from './game/players/players.component';
import { GameboxComponent } from './game/gamebox/gamebox.component';
import { GameResolverService } from './game-resolver.service';
import { LoginOrSignupComponent } from './login-or-signup/login-or-signup.component';
import { GameComponent } from './game/game.component';

const appRoutes: Routes = [
  { path: '', component: GameComponent, resolve: [GameResolverService]},
  { path: 'loginOrSignup', component: LoginOrSignupComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    GameboxComponent,
    LoginOrSignupComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
