import { Component, ViewChild } from '@angular/core';
import { SkyContribListViewGridComponent } from '../list-view-grid.component';
import { ListItemModel } from '../../list/state/items/item.model';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-view-grid-display.component.fixture.html'
})
export class ListViewGridDisplayTestComponent {
  public displayedColumns: Array<string> = ['column3', 'column4'];
  @ViewChild(SkyContribListViewGridComponent) public grid: SkyContribListViewGridComponent;

  public itemSearch(item: ListItemModel, searchText: string) {
    return false;
  }
}
