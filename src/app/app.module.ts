import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { GameboxComponent } from './gamebox/gamebox.component';
import { Routes } from '@angular/router';

// const appRoutes: Routes = [
//   { path: '', redirectTo:}
// ]

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    GameboxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
