import {
  Component, Input, QueryList,
  ContentChildren, TemplateRef, forwardRef,
  OnInit, AfterContentInit, ChangeDetectorRef
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
  @Input() data: Observable<Array<TreeNodeModel>> = Observable.of([]);
  @Input() disableParents: boolean = false;
  @Input() leafOnlySelection: boolean = false;
  @Input() showControls: boolean = true;
  @Input() selectable: boolean = false;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() dropdownTemplate: TemplateRef<any>;
  /* tslint:disable */
  @ContentChildren(forwardRef(() => SkyContribTreeViewContentComponent)) nodeContent: QueryList<SkyContribTreeViewContentComponent>;
  @ContentChildren(forwardRef(() => SkyContribTreeViewDropdownComponent)) nodeDropdown: QueryList<SkyContribTreeViewDropdownComponent>;
  /* tslint:enable */
  constructor(
    private dispatcher: TreeViewStateDispatcher,
    private state: TreeViewState,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!(this.data instanceof Observable)) {
      this.data = Observable.of(this.data);
    }

    this.data.distinctUntilChanged().subscribe(nodes => {
      this.dispatcher.next(new TreeViewNodesSetLoadingAction());
      this.dispatcher.next(new TreeViewNodesLoadAction(nodes));
    });
  }

  ngAfterContentInit() {
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
    this.dispatcher.next(new TreeViewNodesSetNodesSelectedAction(ids, selected));
    this.cdr.detectChanges();
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

      this.dispatcher.next(new TreeViewNodesSetNodesSelectedAction(selectedNodeIds, true));
    });
  }

  public clickClearAll() {
    this.treeNodes.take(1).subscribe(nodes => {
      let clearedNodeIds = nodes.map(node => node.id);

      this.dispatcher.next(new TreeViewNodesSetNodesSelectedAction(clearedNodeIds, false));
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
      if (node.parent != null && nodeId === node.parent.id) {
        isLeaf = false;
        break;
      }
    }

    return isLeaf;
  }

}
