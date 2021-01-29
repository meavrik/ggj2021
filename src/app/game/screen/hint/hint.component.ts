import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss']
})
export class HintComponent implements OnInit {
  @Input() hint: string;
  show: boolean;

  @HostListener('mousedown') onmousedown() {
    this.show = !this.show;
  }
  constructor() { }

  ngOnInit() {
  }

}
