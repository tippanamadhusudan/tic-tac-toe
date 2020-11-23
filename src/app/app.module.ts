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
import { RulesComponent } from './rules/rules.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: GameComponent, resolve: [GameResolverService]},
  { path: 'rules', component: RulesComponent},
  { path: 'loginOrSignup', component: LoginOrSignupComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    GameboxComponent,
    LoginOrSignupComponent,
    GameComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
