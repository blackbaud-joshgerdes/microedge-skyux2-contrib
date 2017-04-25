import { Component, Input, TemplateRef } from '@angular/core';
import { TreeNodeModel } from './tree-node.model';

@Component({
  selector: 'sky-contrib-tree-view-node',
  templateUrl: './tree-view-node.component.html',
  styleUrls: ['./tree-view-node.component.scss']
})
export class SkyTreeViewNodeComponent {
  @Input() node: TreeNodeModel;
  @Input() disableParents: boolean = false;
  @Input() leafOnlySelection: boolean = false;
  @Input() selectable: boolean = false;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() dropdownTemplate: TemplateRef<any>;

  public toggleExpanded(node: any) {
    node.isExpanded = !node.isExpanded;
  }

  public toggleSelected(event: any) {
    this.node.isSelected = event.checked;
  }

  public get enabled() {
    return this.disableParents ? !this.hasSelectedChildren(this.node) : true;
  }

  public get isSelectable() {
    if (!this.selectable) return false;

    return !this.leafOnlySelection || (this.leafOnlySelection && this.node.isLeaf());
  }

  private hasSelectedChildren(node: TreeNodeModel): boolean {
    if (node.isSelected && node !== this.node) {
      this.selectable ? this.node.isSelected = true : '';
      return true;
    }

    let enabled = false;
    node.children.forEach(c => {
      enabled = enabled || this.hasSelectedChildren(c);
    });

    return enabled;
  }
}
