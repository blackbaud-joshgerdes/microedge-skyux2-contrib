import { Component, Input, TemplateRef } from '@angular/core';
import { TreeNodeModel } from './tree-node.model';
import { TreeViewStateDispatcher, TreeViewState } from './state/';
import { TreeViewNodesSetNodeSelectedAction } from './state/nodes/actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sky-contrib-tree-view-node',
  templateUrl: './tree-view-node.component.html',
  styleUrls: ['./tree-view-node.component.scss']
})
export class SkyContribTreeViewNodeComponent {
  @Input() node: TreeNodeModel;
  @Input() disableParents: boolean = false;
  @Input() leafOnlySelection: boolean = false;
  @Input() selectable: boolean = false;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() dropdownTemplate: TemplateRef<any>;

  constructor(
    private dispatcher: TreeViewStateDispatcher,
    private state: TreeViewState
  ) { }

  public toggleExpanded(node: any) {
    node.expanded = !node.expanded;
  }

  public toggleSelected(event: any) {
    this.dispatcher.next(new TreeViewNodesSetNodeSelectedAction(this.node.id, event.checked));
  }

  hasChildren(nodeId: string): Observable<boolean> {
    return this.treeNodes.take(1)
      .map(nodes => nodes.filter(n => n.parent != null && nodeId === n.parent.id))
      .map(b => b != null && b.length > 0);
  }

  getChildren(nodeId: string): Observable<Array<TreeNodeModel>> {
    return this.treeNodes.take(1)
      .map(nodes => nodes.filter(n => n.parent != null && nodeId === n.parent.id));
  }

  get treeNodes() {
    return this.state.map(s => s.nodes.items).distinctUntilChanged();
  }

  public get enabled() {
    if (!this.node.enabled) {
      return false;
    }

    return this.disableParents ? !this.hasSelectedChildren(this.node) : true;
  }

  public get isSelectable() {
    if (!this.selectable) {
      return false;
    }

    return !this.leafOnlySelection || (this.leafOnlySelection && this.node.isLeaf());
  }

  private hasSelectedChildren(node: TreeNodeModel): boolean {
    if (this.isSelectable && node.selected && node !== this.node) {
      this.node.selected = true;

      return true;
    }

    let enabled = false;
    node.children.forEach(c => {
      enabled = enabled || this.hasSelectedChildren(c);
    });

    return enabled;
  }
}
