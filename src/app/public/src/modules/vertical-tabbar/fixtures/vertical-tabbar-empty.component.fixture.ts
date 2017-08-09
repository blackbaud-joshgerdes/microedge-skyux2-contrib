import { Component, ViewChild } from '@angular/core';
import { SkyContribVerticalTabbarComponent } from '../vertical-tabbar.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './vertical-tabbar-empty.component.fixture.html'
})
export class VerticalTabbarEmptyTestComponent {
  @ViewChild(SkyContribVerticalTabbarComponent) public tabbar: SkyContribVerticalTabbarComponent;
}
