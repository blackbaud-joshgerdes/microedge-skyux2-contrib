import { Component, Input, TemplateRef, OnInit } from '@angular/core';
import { TreeNodeModel } from './tree-node.model';
import { TreeViewStateDispatcher, TreeViewState } from './state/';
import { TreeViewNodesSetNodeSelectedAction } from './state/nodes/actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sky-contrib-tree-view-node',
  templateUrl: './tree-view-node.component.html',
  styleUrls: ['./tree-view-node.component.scss']
})
export class SkyContribTreeViewNodeComponent implements OnInit {
  @Input() public node: TreeNodeModel;
  @Input() public disableParents: boolean = false;
  @Input() public leafOnlySelection: boolean = false;
  @Input() public selectable: boolean = false;
  @Input() public contentTemplate: TemplateRef<any>;
  @Input() public dropdownTemplate: TemplateRef<any>;
  private isLeaf: boolean;

  constructor(
    private dispatcher: TreeViewStateDispatcher,
    private state: TreeViewState
  ) { }

  public ngOnInit() {
    this.state.map(s => s.nodes.items).take(1).subscribe(nodes => {
      this.isLeaf = true;
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (node.parent !== undefined && this.node.id === node.parent.id) {
          this.isLeaf = false;
          break;
        }
      }
    });
  }

  public toggleExpanded(node: any) {
    node.expanded = !node.expanded;
  }

  public toggleSelected(event: any) {
    this.dispatcher.next(
      new TreeViewNodesSetNodeSelectedAction(this.node.id, event.checked, this.disableParents)
    );
  }

  public hasChildren(nodeId: string): Observable<boolean> {
    return this.treeNodes.take(1)
      .map(nodes => nodes.filter(n => n.parent !== undefined && nodeId === n.parent.id))
      .map(b => b !== undefined && b.length > 0);
  }

  public getChildren(nodeId: string): Observable<Array<TreeNodeModel>> {
    return this.treeNodes.take(1)
      .map(nodes => nodes.filter(n => n.parent !== undefined && nodeId === n.parent.id));
  }

  get treeNodes() {
    return this.state.map(s => s.nodes.items).distinctUntilChanged();
  }

  public get isSelectable() {
    if (!this.selectable) {
      return false;
    }

    return !this.leafOnlySelection || (this.leafOnlySelection && this.isLeaf);
  }

  private checkDescendants(nodeId: string, nodes: Array<TreeNodeModel>, selected = false): boolean {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];

      if (node.parent && node.parent.id === nodeId) {
        if (node.selected) {
          selected = node.selected;
          break;
        } else {
           selected = this.checkDescendants(node.id, nodes);
        }
      }
    }

    return selected;
  }
}
