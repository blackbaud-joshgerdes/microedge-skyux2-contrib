import { Component, ViewChild } from '@angular/core';
import { SkyTreeViewComponent } from '../tree-view.component';
import { TreeNodeModel } from '../tree-node.model';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './tree-view-templated.component.fixture.html'
})
export class TreeViewTemplatedTestComponent {
  disableParents: boolean;
  leafOnlySelection: boolean;
  public data: TreeNodeModel[] = [];
  @ViewChild(SkyTreeViewComponent) public tree: SkyTreeViewComponent;

  constructor() {
    this.disableParents = true;
    this.leafOnlySelection = true;
    let root1node = new TreeNodeModel({id: 1, name: 'root1'});
    let child1node = new TreeNodeModel({ id: 2, name: 'child1', parent: root1node });
    child1node.children = [new TreeNodeModel({id: 2.1, name: 'sub-child1', parent: child1node})];
    let child2node = new TreeNodeModel({ id: 3, name: 'child2', parent: root1node });
    child2node.children = [new TreeNodeModel({id: 3.1, name: 'sub-child2', parent: child2node})];
    child2node.children[0].children =
      [new TreeNodeModel({id: 3.11, name: 'sub-sub-child1', parent: child2node.children[0]})];
    root1node.children =  [child1node, child2node];

    this.data.push(root1node);
  }
}
