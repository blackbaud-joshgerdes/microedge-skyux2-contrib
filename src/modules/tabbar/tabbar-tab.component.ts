import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'sky-contrib-tabbar-tab',
  templateUrl: './tabbar-tab.component.html',
  styleUrls: ['./tabbar-tab.component.scss']
})
export class SkyContribTabBarTabComponent {
  @Input() public active: boolean = false;
  @Input() public disabled: boolean = false;
  @HostBinding('class.active') get classAction() { return this.active; };
  @HostBinding('class.disabled') get classDisabled() { return this.disabled; };
  @Output('action') itemClicked = new EventEmitter();

  onClick() {
    if (!this.disabled) {
      this.itemClicked.emit({});
    }
  }
}
