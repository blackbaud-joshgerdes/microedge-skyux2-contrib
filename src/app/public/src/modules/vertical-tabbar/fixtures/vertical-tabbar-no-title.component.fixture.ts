import { Component, ViewChild } from '@angular/core';
import { SkyContribVerticalTabbarComponent } from '../vertical-tabbar.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './vertical-tabbar-no-title.component.fixture.html'
})
export class VerticalTabbarNoTitleTestComponent {
  @ViewChild(SkyContribVerticalTabbarComponent) public tabbar: SkyContribVerticalTabbarComponent;
}
