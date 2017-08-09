import {
  Component, Input, QueryList,
  ContentChildren, TemplateRef, forwardRef,
  OnInit, AfterContentInit
} from '@angular/core';
import { TreeNodeModel } from './tree-node.model';
import { SkyContribTreeViewContentComponent } from './tree-view-content.component';
import { SkyContribTreeViewDropdownComponent } from './tree-view-dropdown.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TreeViewStateDispatcher, TreeViewState } from './state/';
import {
  TreeViewNodesLoadAction,
  TreeViewNodesSetLoadingAction,
  TreeViewNodesSetNodesSelectedAction
} from './state/nodes/actions';

@Component({
  selector: 'sky-contrib-tree-view',
  templateUrl: './tree-view.component.html',
  providers: [TreeViewStateDispatcher, TreeViewState],
  styleUrls: ['./tree-view.component.scss']
})
export class SkyContribTreeViewComponent implements OnInit, AfterContentInit {
  @Input() public data: Observable<Array<TreeNodeModel>> = Observable.of([]);
  @Input() public disableParents: boolean = false;
  @Input() public leafOnlySelection: boolean = false;
  @Input() public showControls: boolean = true;
  @Input() public selectable: boolean = false;
  @Input() public contentTemplate: TemplateRef<any>;
  @Input() public dropdownTemplate: TemplateRef<any>;
  /* tslint:disable */
  @ContentChildren(forwardRef(() => SkyContribTreeViewContentComponent)) public nodeContent: QueryList<SkyContribTreeViewContentComponent>;
  @ContentChildren(forwardRef(() => SkyContribTreeViewDropdownComponent)) public nodeDropdown: QueryList<SkyContribTreeViewDropdownComponent>;
  /* tslint:enable */
  constructor(
    private dispatcher: TreeViewStateDispatcher,
    private state: TreeViewState
  ) { }

  public ngOnInit() {
    if (!(this.data instanceof Observable)) {
      this.data = Observable.of(this.data);
    }

    this.data.distinctUntilChanged().subscribe(nodes => {
      this.dispatcher.next(new TreeViewNodesSetLoadingAction());
      this.dispatcher.next(new TreeViewNodesLoadAction(nodes));
    });
  }

  public ngAfterContentInit() {
    if (this.nodeContent.length > 0) {
      this.contentTemplate = this.nodeContent.first.template;
    }

    if (this.nodeDropdown.length > 0) {
      this.dropdownTemplate = this.nodeDropdown.first.template;
    }
  }

  get treeNodes() {
    return this.state.map(s => s.nodes.items).distinctUntilChanged();
  }

  get rootNodes() {
    return this.treeNodes.map(nodes => nodes.filter(node => !node.parent));
  }

  get selectedNodes() {
    return this.treeNodes.map(nodes => nodes.filter(node => node.selected));
  }

  public setNodesSelected(ids: string[], selected: boolean = true) {
    this.dispatcher.next(
      new TreeViewNodesSetNodesSelectedAction(ids, selected, this.disableParents)
    );
  }

  public clickSelectAll() {
    this.treeNodes.take(1).subscribe(nodes => {
      let selectedNodeIds = new Array<string>();
      nodes.forEach(node => {
        let isLeaf = this.isLeaf(node.id, nodes);

        if (node.enabled && (!this.leafOnlySelection || (this.leafOnlySelection && isLeaf))) {
          selectedNodeIds.push(node.id);
        }

        if (!isLeaf) {
          node.expanded = true;
        }
      });

      this.dispatcher.next(
        new TreeViewNodesSetNodesSelectedAction(selectedNodeIds, true, this.disableParents)
      );
    });
  }

  public clickClearAll() {
    this.treeNodes.take(1).subscribe(nodes => {
      let clearedNodeIds = nodes.map(node => node.id);

      this.dispatcher.next(
        new TreeViewNodesSetNodesSelectedAction(clearedNodeIds, false, this.disableParents)
      );
    });
  }

  public clickExpandAll() {
    this.treeNodes.take(1).subscribe(nodes => {
      nodes.forEach(node => {
        if (!this.isLeaf(node.id, nodes)) {
          node.expanded = true;
        }
      });
    });
  }

  public clickCollapseAll() {
    this.treeNodes.take(1).subscribe(nodes => {
      nodes.forEach(node => {
        node.expanded = false;
      });
    });
  }

  private isLeaf(nodeId: string, nodes: Array<TreeNodeModel>) {
    let isLeaf = true;
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      if (node.parent !== undefined && nodeId === node.parent.id) {
        isLeaf = false;
        break;
      }
    }

    return isLeaf;
  }

}
