import { Component, OnInit } from '@angular/core';
import { GameEngineService } from './services/game-engine.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  levels$ = this.gameEngine.levels$;
  currentLevel$ = this.gameEngine.currentLevel$;
  userKeys$ = this.gameEngine.userKeys$;
  score$ = this.gameEngine.score$.pipe(map(sco => sco.toString().padStart(6, '0')))
  constructor(private gameEngine: GameEngineService) { }

  ngOnInit() {


  }

  onKeyPress(key) {
    console.log('PRESS', key);
    this.gameEngine.addKey(key)
  }

  // only for debug!!
  onLevelClick(level) {
    this.gameEngine.goToLevel(level.index)
  }

}
