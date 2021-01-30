import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { GameEngineService } from '../../services/game-engine.service';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss']
})
export class HintComponent implements OnInit {
  @Input() hint: string;

  @HostBinding('class.show') show: boolean;
  @HostListener('mousedown') onmousedown() {
    this.show = !this.show;
    this.gameEngine.takeAHint();
  }
  constructor(private gameEngine: GameEngineService) { }

  ngOnInit() {
  }

}
