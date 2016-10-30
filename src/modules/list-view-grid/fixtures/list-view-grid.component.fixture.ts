import { Component, ViewChild } from '@angular/core';
import { SkyListViewGridComponent } from '../list-view-grid.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-view-grid.component.fixture.html')
})
export class ListViewGridTestComponent {
  @ViewChild(SkyListViewGridComponent) grid: SkyListViewGridComponent;
}
