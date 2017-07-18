import { Component, ViewChild, Inject } from '@angular/core';
import { SkyContribListComponent } from '../list.component';
import { ListFilterDataModel } from '../state/filters/filter-data.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SkyContribListInMemoryDataProvider } from '../../list-data-provider-in-memory';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-empty.component.fixture.html'
})
export class ListEmptyTestComponent {
  @ViewChild(SkyContribListComponent) public list: SkyContribListComponent;
  public itemsCount: number = 2;

  constructor(
    @Inject('items') public items: any,
    public dataProvider: SkyContribListInMemoryDataProvider
  ) {
  }

  public get options() {
    let bs = new BehaviorSubject<Array<any>>(['banana', 'apple']);
    return bs.asObservable();
  }

  public filterOnStatus(item: any, filter: ListFilterDataModel) {
    return item.data.column2 !== undefined ?
      item.data.column2.toLowerCase().indexOf(filter.value) !== -1 : false;
  }
}
