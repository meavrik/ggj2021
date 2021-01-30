import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { ILevel } from '../services/game-engine.service';
@Component({
  selector: 'app-key-board',
  templateUrl: './key-board.component.html',
  styleUrls: ['./key-board.component.scss']
})
export class KeyBoardComponent implements OnInit, OnChanges {

  @Input() level: ILevel;
  @Input() disabled: boolean = true;
  @Input() wrote: boolean = true;
  filteredKeys: any[];
  staticKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].map(a => ({ label: a, hide: false }))
  @Output() onkeypress = new EventEmitter<string>();
  @Output() onenter = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.staticKeys);


  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredKeys = this.level.keys.map(k =>
      ({
        label: this.level.mapFunc ? this.level.mapFunc(k) : k,
        value: k,
        hide: this.level.lost.find(a => a === k)
      }));
  }


  onKeyClick(key) {
    this.onkeypress.emit(key.value);
  }

  onDelete(key) {
    this.onkeypress.emit(key.value);
  }
  onEnter() {
    this.onenter.emit();
  }

}
