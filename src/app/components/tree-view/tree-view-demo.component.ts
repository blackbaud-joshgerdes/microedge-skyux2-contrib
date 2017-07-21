import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TreeNodeModel, SkyContribTreeViewComponent } from '../../../core';

@Component({
  selector: 'sky-tree-view-demo',
  templateUrl: './tree-view-demo.component.html'
})
export class SkyContribTreeViewDemoComponent implements AfterViewInit {
  @ViewChild('tree') tree: SkyContribTreeViewComponent;
  disableParents: boolean;
  leafOnlySelection: boolean;
  data: Array<TreeNodeModel> = [];
  data2: Array<TreeNodeModel> = [];

  constructor() {
    this.disableParents = true;
    this.leafOnlySelection = false;
    let root1node = new TreeNodeModel({id: '1', name: 'root1'});
    let child1node = new TreeNodeModel({ id: '2', name: 'child1', parent: root1node });
    let child1nodeChildren =
      [new TreeNodeModel({id: '2.1', name: 'sub-child1', parent: child1node})];
    let child2node = new TreeNodeModel({ id: '3', name: 'child2', parent: root1node });
    let child2nodeChildren =
      [new TreeNodeModel({id: '3.1', name: 'sub-child2', parent: child2node})];
    let child2nodeGrandChildren =
      [new TreeNodeModel({id: '3.11', name: 'sub-sub-child1', parent: child2nodeChildren[0]})];

    this.data.push(root1node, child1node);

    root1node = new TreeNodeModel({id: '1', name: 'root1'});
    child1node = new TreeNodeModel({ id: '2', name: 'child1', parent: root1node });
    child1nodeChildren = [new TreeNodeModel({id: '2.1', name: 'sub-child1', parent: child1node})];
    child2node = new TreeNodeModel({ id: '3', name: 'child2', parent: root1node });
    child2nodeChildren = [new TreeNodeModel({id: '3.1', name: 'sub-child2', parent: child2node})];
    child2nodeGrandChildren =
      [new TreeNodeModel({id: '3.11', name: 'sub-sub-child1', parent: child2nodeChildren[0]})];

    this.data2.push(root1node, child1node, child2node,
      ...child1nodeChildren, ...child2nodeChildren, ...child2nodeGrandChildren);
  }

  public ngAfterViewInit() {
    this.tree.setNodesSelected(['3.11', '2']);
  }
}
