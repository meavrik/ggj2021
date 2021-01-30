import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';

export interface IKey {
  label: string;
  value: string;
  hide?: boolean;
}


@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input() key: IKey;

  @HostBinding('class.empty') isEmpty = false;
  @HostBinding('class.disable') @Input() disabled: boolean;
  constructor() { }

  ngOnInit() {
    if (this.key) {
      this.isEmpty = this.key.hide;
    }

  }

}
