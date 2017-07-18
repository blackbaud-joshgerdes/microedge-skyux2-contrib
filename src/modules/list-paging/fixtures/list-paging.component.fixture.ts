import { Component, ViewChild } from '@angular/core';
import { SkyContribListPagingComponent } from '../list-paging.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-paging.component.fixture.html'
})
export class ListPagingTestComponent {
  @ViewChild(SkyContribListPagingComponent) public pagingComponent: SkyContribListPagingComponent;
}
