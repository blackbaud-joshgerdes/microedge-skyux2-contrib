import { Component, Input, QueryList,
  ContentChildren, TemplateRef, forwardRef } from '@angular/core';
import { TreeNodeModel } from './tree-node.model';
import { SkyTreeViewContentComponent } from './tree-view-content.component';
import { SkyTreeViewDropdownComponent } from './tree-view-dropdown.component';

@Component({
  selector: 'sky-contrib-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class SkyTreeViewComponent {
  @Input() data: TreeNodeModel[] = [];
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

  ngAfterContentInit() {
    if (this.nodeContent.length > 0) {
      this.contentTemplate = this.nodeContent.first.template;
    }

    if (this.nodeDropdown.length > 0) {
      this.dropdownTemplate = this.nodeDropdown.first.template;
    }
  }

  public selectAll(nodes: TreeNodeModel[]) {
    nodes.forEach(node => {
      if (this.leafOnlySelection) {
        if (node.isLeaf()) {
          node.isSelected = true;
        }
      } else {
        node.isSelected = true;
      }
      if (!node.isLeaf()) {
        node.isExpanded = true;
      }

      this.selectAll(node.children);
    });
  }

  public clearAll(nodes: TreeNodeModel[]) {
    nodes.forEach(node => {
      node.isSelected = false;

      this.clearAll(node.children);
    });
  }

  public getTreeDepth(nodes: TreeNodeModel[]) {
    if (nodes.length === 0) {
      return 0;
    }

    let depth = 0;

    nodes.forEach(node => {
      let tempDepth = this.getTreeDepth(node.children);
      if (tempDepth > depth) {
        depth = tempDepth;
      }
    });

    return 1 + depth;
  }

  public expandAll(nodes: TreeNodeModel[]) {
    nodes.forEach(node => {
      if (!node.isLeaf()) {
        node.isExpanded = true;
        this.expandAll(node.children);
      }
    });
  }

  public collapseAll(nodes: TreeNodeModel[]) {
    nodes.forEach(node => {
      node.isExpanded = false;
      this.collapseAll(node.children);
    });
  }
}
