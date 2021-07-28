import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlayersComponent } from './game/players/players.component';
import { GameboxComponent } from './game/gamebox/gamebox.component';
import { GameResolverService } from './game-resolver.service';
import { GameComponent } from './game/game.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: GameComponent, resolve: [GameResolverService]},
  { path: 'rules', loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule)},
  { path: 'loginOrSignup', loadChildren: () => import('./login-or-signup/login-or-signup.module').then(m => m.LoginOrSignupModule)}
]

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    GameboxComponent,
    GameComponent,
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
