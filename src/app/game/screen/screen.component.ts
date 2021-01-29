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

  @HostBinding('class.wrong') wrong: boolean;

  constructor(private gameEngine: GameEngineService) { }

  ngOnInit() {
    this.gameEngine.isWrongChar$.subscribe(wrong => {
      this.wrong = wrong;
      if (wrong) {
        console.log('WRONG!!!');
        
        setTimeout(() => {
          this.gameEngine.reset();
        }, 2000);

      }

    })

  }

  /* ngOnChanges(changes: SimpleChanges): void {
    this.text = this.keys.join('');
  } */

}
