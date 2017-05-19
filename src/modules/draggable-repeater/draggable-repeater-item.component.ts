import { Component, Input, HostBinding, TemplateRef, ContentChildren,
  QueryList, forwardRef, OnInit, AfterContentInit } from '@angular/core';
import { SkyContribDraggableRepeaterItemTitleComponent }
  from './draggable-repeater-item-title.component';
import { SkyContribDraggableRepeaterItemLeftComponent}
  from './draggable-repeater-item-left.component';
import { SkyContribDraggableRepeaterItemRightComponent }
  from './draggable-repeater-item-right.component';
import { SkyContribDraggableRepeaterItemContentComponent }
  from './draggable-repeater-item-content.component';

@Component({
    selector: 'sky-contrib-draggable-repeater-item',
    templateUrl: './draggable-repeater-item.component.html',
    styleUrls: [
      './draggable-repeater-item.component.scss'
    ]
})
export class SkyDraggableRepeaterItemComponent implements OnInit, AfterContentInit {
  @Input() isExpandable: boolean = false;
  @Input() showContent: boolean = false;
  @Input() id: string;
  @Input() itemTitleTemplate: TemplateRef<any>;
  @Input() itemLeftTemplate: TemplateRef<any>;
  @Input() itemRightTemplate: TemplateRef<any>;
  @Input() itemContentTemplate: TemplateRef<any>;
  @ContentChildren(forwardRef(() => SkyContribDraggableRepeaterItemContentComponent)) itemContentNode:
    QueryList<SkyContribDraggableRepeaterItemContentComponent>;
  @ContentChildren(forwardRef(() => SkyContribDraggableRepeaterItemTitleComponent)) itemTitleNode:
    QueryList<SkyContribDraggableRepeaterItemTitleComponent>;
  @ContentChildren(forwardRef(() => SkyContribDraggableRepeaterItemLeftComponent)) itemLeftNode:
    QueryList<SkyContribDraggableRepeaterItemLeftComponent>;
  @ContentChildren(forwardRef(() => SkyContribDraggableRepeaterItemRightComponent)) itemRightNode:
    QueryList<SkyContribDraggableRepeaterItemRightComponent>;
  isExpanded: boolean = true;

  @HostBinding('attr.repeater-item-id') get repeaterItemId() { return this.id; };

  ngOnInit() {
    if (this.id == null) {
      throw new Error('You must supply [id] to the grid control for it to function');
    }
  }

  ngAfterContentInit() {
    if (this.itemTitleNode.length > 0) {
      this.itemTitleTemplate = this.itemTitleNode.first.template;
    }

    if (this.itemLeftNode.length > 0) {
      this.itemLeftTemplate = this.itemLeftNode.first.template;
    }

    if (this.itemRightNode.length > 0) {
      this.itemRightTemplate = this.itemRightNode.first.template;
    }

    if (this.itemContentNode.length > 0) {
      this.itemContentTemplate = this.itemContentNode.first.template;
    }
  }

  toggle(event: any) {
    this.isExpanded = !this.isExpanded;
  }
}
