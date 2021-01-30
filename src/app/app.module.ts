import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { KeyBoardComponent } from './game/key-board/key-board.component';
import { KeyComponent } from './game/key-board/key/key.component';
import { ScreenComponent } from './game/screen/screen.component';
import { HintComponent } from './game/screen/hint/hint.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent, KeyBoardComponent, KeyComponent, ScreenComponent, HintComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
