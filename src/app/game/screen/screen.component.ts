import { Component, OnInit, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { ILevel, GameEngineService } from '../services/game-engine.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  @Input() level: ILevel;
  @Input() keys: string[];
  text$ = this.gameEngine.userKeys$.pipe(map(k => k.join('')));
  gameOver$ = this.gameEngine.gameOver$;
  money$ = this.gameEngine.money$;

  @HostBinding('class.wrong') wrong: boolean;

  constructor(private gameEngine: GameEngineService) { }

  ngOnInit() {
    this.gameEngine.wrongAnswear$.subscribe(wrong => {
      this.gameEngine.pause$.next(true);
      this.wrong = wrong;
    })
  }

  tryAgain() {
    this.gameEngine.pause$.next(false);
    this.wrong = false;
  }

}
