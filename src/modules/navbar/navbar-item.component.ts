import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'sky-contrib-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss']
})
export class SkyContribNavbarItemComponent {
  @Input() active: boolean = false;
  @Input() divider: boolean = false;
  @Input() disabled: boolean = false;
  @Input() submenu: boolean = false;
  @HostBinding('attr.role') get role() { return (this.divider) ? '' : 'menuitem'; };
  @HostBinding('class.active') get classAction() { return this.active; };
  @HostBinding('class.divider') get classDivider() { return this.divider; };
  @HostBinding('class.navbar-divider') get classNavbarDivider() { return this.divider; };
  @HostBinding('class.disabled') get classDisabled() { return this.disabled; };
  @HostBinding('class.submenu-item') get classSubmenuItem() { return this.submenu; };
  @Output('action') itemClicked = new EventEmitter();

  onClick() {
    if (!this.disabled) {
      this.itemClicked.emit({});
    }
  }
}
