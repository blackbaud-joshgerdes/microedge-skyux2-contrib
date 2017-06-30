import {
  Component, Input, QueryList,
  ContentChildren, TemplateRef, forwardRef,
  OnInit, AfterContentInit
} from '@angular/core';
import { TreeNodeModel } from './tree-node.model';
import { SkyTreeViewContentComponent } from './tree-view-content.component';
import { SkyTreeViewDropdownComponent } from './tree-view-dropdown.component';
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
export class SkyTreeViewComponent implements OnInit, AfterContentInit {
  @Input() data: Observable<Array<TreeNodeModel>> = Observable.of([]);
  @Input() disableParents: boolean = false;
  @Input() leafOnlySelection: boolean = false;
  @Input() showControls: boolean = true;
  @Input() selectable: boolean = false;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() dropdownTemplate: TemplateRef<any>;
  /* tslint:disable */
  @ContentChildren(forwardRef(() => SkyTreeViewContentComponent)) nodeContent: QueryList<SkyTreeViewContentComponent>;
  @ContentChildren(forwardRef(() => SkyTreeViewDropdownComponent)) nodeDropdown: QueryList<SkyTreeViewDropdownComponent>;
  /* tslint:enable */
  constructor(
    private dispatcher: TreeViewStateDispatcher,
    private state: TreeViewState
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
    return this.treeNodes.map(nodes => nodes.filter(node => node.isSelected));
  }

  public setNodesSelected(ids: string[], selected: boolean = true) {
    this.dispatcher.next(new TreeViewNodesSetNodesSelectedAction(ids, selected));
  }

  public clickSelectAll() {
    this.treeNodes.take(1).subscribe(nodes => {
      let selectedNodeIds = new Array<string>();
      nodes.forEach(node => {
        if (this.leafOnlySelection && this.isLeaf(node.id, nodes)) {
          selectedNodeIds.push(node.id);
        } else {
          selectedNodeIds.push(node.id);
        }

        if (!this.isLeaf(node.id, nodes)) {
          node.isExpanded = true;
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
          node.isExpanded = true;
        }
      });
    });
  }

  public clickCollapseAll() {
    this.treeNodes.take(1).subscribe(nodes => {
      nodes.forEach(node => {
        node.isExpanded = false;
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
