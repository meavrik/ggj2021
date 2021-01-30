import { Component, OnInit } from '@angular/core';
import { GameEngineService } from './services/game-engine.service';
import { map } from 'rxjs/operators';
import { of, interval, combineLatest, timer } from 'rxjs';
import { animate, state, transition, trigger, style } from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class GameComponent implements OnInit {
  levels$ = this.gameEngine.levels$;
  currentLevel$ = this.gameEngine.currentLevel$;
  userKeys$ = this.gameEngine.userKeys$;
  score$ = this.gameEngine.money$.pipe(map(sco => sco.toString().padStart(6, '0')));
  pause$ = this.gameEngine.pause$;

  instructions = [
    'the keyboard keys are scrambled - find the logic and the missing keys', '',
    'using hint will reduce random amount of money from your account', '',
    'after the first letter, each letter typed wrong will reduce money', '',
    'try to save as much money as you can (game & life goal)', ''
  ]
  showIstr: string;
  currentInstruction$ = combineLatest(timer(1000,5000), of(this.instructions), (time, inst) => inst[time % inst.length])
  constructor(private gameEngine: GameEngineService) { }

  ngOnInit() {
    this.currentInstruction$.subscribe(a => {
      this.showIstr = a;
    })
  }

  onKeyPress(key) {
    // console.log('PRESS', key);
    this.gameEngine.addKey(key)
  }

  onEnter() {
    this.gameEngine.checkResult();
  }

  // only for debug!!
  onLevelClick(level) {
    this.gameEngine.goToLevel(level.index)
  }

}
