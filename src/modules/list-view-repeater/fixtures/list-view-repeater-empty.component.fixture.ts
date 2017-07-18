import { Component, ViewChild } from '@angular/core';
import { SkyContribListViewRepeaterComponent } from '../list-view-repeater.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-view-repeater-empty.component.fixture.html'
})
export class ListViewRepeaterTestEmptyComponent {
  @ViewChild(SkyContribListViewRepeaterComponent) public repeater: SkyContribListViewRepeaterComponent;
}
