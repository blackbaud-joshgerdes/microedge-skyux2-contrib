import { Component, ViewChild } from '@angular/core';
import { SkyContribTreeViewComponent } from '../tree-view.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './tree-view.component.fixture.html'
})
export class TreeViewTestComponent {
  @ViewChild(SkyContribTreeViewComponent) public tree: SkyContribTreeViewComponent;
}
