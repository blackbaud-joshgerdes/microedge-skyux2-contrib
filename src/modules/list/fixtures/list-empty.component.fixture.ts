import { Component, ViewChild, Inject } from '@angular/core';
import { SkyListComponent } from '../list.component';
import { ListFilterDataModel } from '../state/filters/filter-data.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-empty.component.fixture.html')
})
export class ListEmptyTestComponent {
  @ViewChild(SkyListComponent) private list: SkyListComponent;

  constructor(@Inject('items') private items: any) {
  }

  private get options() {
    let bs = new BehaviorSubject<Array<any>>(['banana', 'apple']);
    return bs.asObservable();
  }

  private filterOnStatus(item: any, filter: ListFilterDataModel) {
    return item.data.column2 !== null ? item.data.column2.toLowerCase().indexOf(filter.value) !== -1 : false;
  }
}
