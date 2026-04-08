import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITabs } from '../../../core/models/tabs';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  @Input() tabs :ITabs[] = [];
  @Output() tabOnpressed = new EventEmitter<number>();
  @Input() itemSelected = 0;
  @Input() width = 500;
  selectItem(index: number) {
    this.itemSelected = index;
    this.tabOnpressed.emit(index);
  }
}
