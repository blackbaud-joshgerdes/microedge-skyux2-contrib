import { Component, ViewChild } from '@angular/core';
import { SkyContribVerticalTabbarComponent } from '../vertical-tabbar.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './vertical-tabbar.component.fixture.html'
})
export class VerticalTabbarTestComponent {
  @ViewChild(SkyContribVerticalTabbarComponent) tabbar: SkyContribVerticalTabbarComponent;
}
