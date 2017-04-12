import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sky-contrib-vertical-tabbar-item',
    templateUrl: './vertical-tabbar-item.component.html'
})
export class SkyContribVerticalTabbarItemComponent {
  @Input() title: string;
  @Input() active: boolean = false;
  @Input() disabled: boolean = false;
  @Output('action') itemClicked = new EventEmitter();

  ngOnInit() {
    if (this.title === undefined || this.title.length === 0) {
      throw new Error('Sky Vertical Tabbar Item requires a [title].');
    }
  }
}
