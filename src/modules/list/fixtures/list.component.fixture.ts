import { Component, ViewChild, Inject } from '@angular/core';
import { SkyContribListComponent } from '../list.component';
import { ListFilterDataModel } from '../state/filters/filter-data.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list.component.fixture.html'
})
export class ListTestComponent {
  @ViewChild(SkyContribListComponent) public list: SkyContribListComponent;

  constructor(@Inject('items') public items: any) {
  }

  public get options() {
    let bs = new BehaviorSubject<Array<any>>(['banana', 'apple']);
    return bs.asObservable();
  }

  public itemSearch(item: any, searchText: string) {
    return item.column2.toLowerCase().indexOf(searchText) !== -1 ?
      item.column2.toLowerCase() : -1;
  }

  public filterOnStatus(item: any, filter: ListFilterDataModel) {
    /* tslint:disable */
    return item.data.column2 !== null ?
      item.data.column2.toLowerCase().indexOf(filter.value) !== -1 : false;
  }
}
