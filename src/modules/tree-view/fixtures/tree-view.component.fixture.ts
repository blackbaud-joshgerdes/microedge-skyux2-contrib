import { Component, ViewChild } from '@angular/core';
import { SkyTreeViewComponent } from '../tree-view.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './tree-view.component.fixture.html'
})
export class TreeViewTestComponent {
  @ViewChild(SkyTreeViewComponent) public tree: SkyTreeViewComponent;
}
