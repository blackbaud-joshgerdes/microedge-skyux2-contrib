import { Component, ViewChild } from '@angular/core';
import { SkyContribListViewRepeaterComponent } from '../list-view-repeater.component';
import { ListItemModel } from '../../list/state/items/item.model';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-view-repeater.component.fixture.html'
})
export class ListViewRepeaterTestComponent {
  @ViewChild(SkyContribListViewRepeaterComponent) public repeater: SkyContribListViewRepeaterComponent;

  public itemSearch(item: ListItemModel, searchText: string) {
    return false;
  }
}
