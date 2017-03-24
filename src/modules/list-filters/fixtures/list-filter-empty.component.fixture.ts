import { Component, ViewChild } from '@angular/core';
import { SkyListFilterComponent } from '../list-filter.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-filter-empty.component.fixture.html'
})
export class ListFilterEmptyTestComponent {
  @ViewChild(SkyListFilterComponent) public filter: SkyListFilterComponent;
}
