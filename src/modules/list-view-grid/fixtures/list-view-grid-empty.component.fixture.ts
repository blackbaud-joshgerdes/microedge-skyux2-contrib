import { Component, ViewChild } from '@angular/core';
import { SkyContribListViewGridComponent } from '../list-view-grid.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-view-grid-empty.component.fixture.html'
})
export class ListViewGridEmptyTestComponent {
  @ViewChild(SkyContribListViewGridComponent) public grid: SkyContribListViewGridComponent;
}
