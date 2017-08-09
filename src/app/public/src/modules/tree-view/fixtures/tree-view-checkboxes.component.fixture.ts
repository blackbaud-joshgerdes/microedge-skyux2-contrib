import { Component, ViewChild } from '@angular/core';
import { SkyContribTreeViewComponent } from '../tree-view.component';
import { TreeNodeModel } from '../tree-node.model';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './tree-view-checkboxes.component.fixture.html'
})
export class TreeViewCheckboxesTestComponent {
  public data: TreeNodeModel[] = [];
  @ViewChild(SkyContribTreeViewComponent) public tree: SkyContribTreeViewComponent;

  constructor() {
    let root1node = new TreeNodeModel({id: '1', name: 'root1'});
    let child1node = new TreeNodeModel({ id: '2', name: 'child1', parent: root1node });
    let child1nodeChildren =
      [new TreeNodeModel({id: '2.1', name: 'sub-child1', parent: child1node})];
    let child2node = new TreeNodeModel({ id: '3', name: 'child2', parent: root1node });
    let child2nodeChildren =
      [new TreeNodeModel({id: '3.1', name: 'sub-child2', parent: child2node})];
    let child2nodeGrandChildren =
      [new TreeNodeModel({id: '3.11', name: 'sub-sub-child1', parent: child2nodeChildren[0]})];

    this.data = [root1node, child1node, child2node,
      ...child1nodeChildren, ...child2nodeChildren, ...child2nodeGrandChildren];
  }
}
