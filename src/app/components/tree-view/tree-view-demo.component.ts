import { Component } from '@angular/core';
import { TreeNodeModel } from '../../../core';

@Component({
  selector: 'sky-tree-view-demo',
  templateUrl: './tree-view-demo.component.html'
})
export class SkyTreeViewDemoComponent {
  disableParents: boolean;
  leafOnlySelection: boolean;
  data: TreeNodeModel[] = [];
  data2: TreeNodeModel[] = [];

  constructor() {
    this.disableParents = true;
    this.leafOnlySelection = false;
    let root1node = new TreeNodeModel({id: 1, name: 'root1'});
    let child1node = new TreeNodeModel({ id: 2, name: 'child1', parent: root1node });
    child1node.children = [new TreeNodeModel({id: 2.1, name: 'sub-child1', parent: child1node})];
    let child2node = new TreeNodeModel({ id: 3, name: 'child2', parent: root1node });
    child2node.children = [new TreeNodeModel({id: 3.1, name: 'sub-child2', parent: child2node})];
    child2node.children[0].children =
      [new TreeNodeModel({id: 3.11, name: 'sub-sub-child1', parent: child2node.children[0]})];
    root1node.children =  [child1node, child2node];

    this.data.push(root1node);

    root1node = new TreeNodeModel({id: 1, name: 'root1'});
    child1node = new TreeNodeModel({ id: 2, name: 'child1', parent: root1node });
    child1node.children = [new TreeNodeModel({id: 2.1, name: 'sub-child1', parent: child1node})];
    child2node = new TreeNodeModel({ id: 3, name: 'child2', parent: root1node });
    child2node.children = [new TreeNodeModel({id: 3.1, name: 'sub-child2', parent: child2node})];
    child2node.children[0].children =
      [new TreeNodeModel({id: 3.11, name: 'sub-sub-child1', parent: child2node.children[0]})];
    root1node.children =  [child1node, child2node];

    this.data2.push(root1node);
  }
}
