import { Component, ViewChild } from '@angular/core';
import { SkyContribListFilterComponent } from '../list-filter.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-filter-empty.component.fixture.html'
})
export class ListFilterEmptyTestComponent {
  @ViewChild(SkyContribListFilterComponent) public filter: SkyContribListFilterComponent;
}
