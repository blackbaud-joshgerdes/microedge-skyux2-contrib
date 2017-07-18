import { Component, ViewChild } from '@angular/core';
import { SkyContribListViewChecklistComponent } from '../list-view-checklist.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-view-checklist.component.fixture.html'
})
export class ListViewChecklistTestComponent {
  @ViewChild(SkyContribListViewChecklistComponent) public checklist: SkyContribListViewChecklistComponent;
}
