import { Component, ViewChild } from '@angular/core';
import { SkyContribVerticalTabbarComponent } from '../vertical-tabbar.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './vertical-tabbar-no-select.component.fixture.html'
})
export class VerticalTabbarNoSelectTestComponent {
  @ViewChild(SkyContribVerticalTabbarComponent) tabbar: SkyContribVerticalTabbarComponent;
}
