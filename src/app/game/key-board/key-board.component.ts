import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ILevel } from '../services/game-engine.service';
import { IKey } from './key/key.component';

@Component({
  selector: 'app-key-board',
  templateUrl: './key-board.component.html',
  styleUrls: ['./key-board.component.scss']
})
export class KeyBoardComponent implements OnInit, OnChanges {

  @Input() level: ILevel;
  filteredKeys: any[];
  // keys = ['A', 'B', 'C', 'D', 'SPACE', '', '', 'R', 'F', 'SHIFT', 'ALT', 'V', 'T', 'E', 'H', '', '', 'M', 'U', 'X', 'Z', '', '', '1', '2', '', '4', '5', '6'].map(a => ({ label: a }))

  @Output() onkeypress = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredKeys = this.level.keys.map(k => ({ label: k, hide: this.level.lost.find(a => a === k) }));
  }


  onKeyClick(key) {
    this.onkeypress.emit(key.label);
  }

}
