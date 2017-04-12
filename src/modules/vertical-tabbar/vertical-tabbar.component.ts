import { Component, ContentChildren, QueryList } from '@angular/core';
import { SkyContribVerticalTabbarItemComponent } from './vertical-tabbar-item.component';

@Component({
    selector: 'sky-contrib-vertical-tabbar',
    templateUrl: './vertical-tabbar.component.html',
    styleUrls: ['./vertical-tabbar.component.scss']
})
export class SkyContribVerticalTabbarComponent {
  @ContentChildren(SkyContribVerticalTabbarItemComponent)
    tabs: QueryList<SkyContribVerticalTabbarItemComponent>;

  constructor() {}

  ngAfterContentInit() {
    if (this.tabs && this.tabs.length > 0 ) {
      let activeTabSet: boolean = false;
      this.tabs.forEach((t) => {
        if (t.disabled) {
          t.active = false;
        } else if (t.active) {
          t.active = !activeTabSet;
          activeTabSet = true;
        }
      });

      if (!activeTabSet && this.tabs.filter((t) => !t.disabled).length > 0) {
        this.tabs.filter((t) => !t.disabled)[0].active = true;
      }
    }
  }

  onClick(tab: SkyContribVerticalTabbarItemComponent) {
    if (!tab.disabled && !tab.active) {
      this.tabs.forEach((t) => t.active = false);
      tab.active = true;
      tab.itemClicked.emit(tab);
    }
  }
}
