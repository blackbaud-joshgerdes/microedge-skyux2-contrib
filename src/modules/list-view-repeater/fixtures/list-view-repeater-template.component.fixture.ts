import { Component, ViewChild } from '@angular/core';
import { SkyContribListViewRepeaterComponent } from '../list-view-repeater.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-view-repeater-template.component.fixture.html'
})
export class ListViewRepeaterTestTemplateComponent {
  @ViewChild(SkyContribListViewRepeaterComponent) public repeater: SkyContribListViewRepeaterComponent;
}
