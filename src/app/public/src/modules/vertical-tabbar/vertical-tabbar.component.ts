import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';
import {
  SkyContribVerticalTabbarItemComponent
} from './vertical-tabbar-item.component';

@Component({
    selector: 'sky-contrib-vertical-tabbar',
    templateUrl: './vertical-tabbar.component.html',
    styleUrls: ['./vertical-tabbar.component.scss']
})
export class SkyContribVerticalTabbarComponent implements AfterContentInit {
  @ContentChildren(SkyContribVerticalTabbarItemComponent)
    public tabs: QueryList<SkyContribVerticalTabbarItemComponent>;

  public ngAfterContentInit() {
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

  public onClick(tab: SkyContribVerticalTabbarItemComponent) {
    if (!tab.disabled && !tab.active) {
      this.tabs.forEach((t) => t.active = false);
      tab.active = true;
      tab.action.emit(tab);
    }
  }
}
