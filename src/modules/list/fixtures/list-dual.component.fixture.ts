import { Component, ViewChild, Inject } from '@angular/core';
import { SkyContribListComponent } from '../list.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-dual.component.fixture.html'
})
export class ListDualTestComponent {
  @ViewChild(SkyContribListComponent) public list: SkyContribListComponent;

  constructor(@Inject('items') public items: any) {
  }
}
