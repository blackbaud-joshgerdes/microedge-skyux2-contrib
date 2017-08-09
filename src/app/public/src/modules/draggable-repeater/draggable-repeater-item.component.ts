import {
  Component,
  Input,
  HostBinding,
  TemplateRef,
  ContentChildren,
  QueryList,
  forwardRef,
  OnInit,
  AfterContentInit
} from '@angular/core';
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
    styleUrls: ['./draggable-repeater-item.component.scss']
})
export class SkyContribDraggableRepeaterItemComponent implements OnInit, AfterContentInit {
  public isExpanded: boolean = true;
  @Input() public isExpandable: boolean = false;
  @Input() public showContent: boolean = false;
  @Input() public id: string;
  @Input() public item: any;
  @Input() public itemTitleTemplate: TemplateRef<any>;
  @Input() public itemLeftTemplate: TemplateRef<any>;
  @Input() public itemRightTemplate: TemplateRef<any>;
  @Input() public itemContentTemplate: TemplateRef<any>;
  @ContentChildren(forwardRef(() => SkyContribDraggableRepeaterItemContentComponent))
    public itemContentNode: QueryList<SkyContribDraggableRepeaterItemContentComponent>;
  @ContentChildren(forwardRef(() => SkyContribDraggableRepeaterItemTitleComponent))
    public itemTitleNode: QueryList<SkyContribDraggableRepeaterItemTitleComponent>;
  @ContentChildren(forwardRef(() => SkyContribDraggableRepeaterItemLeftComponent))
    public itemLeftNode: QueryList<SkyContribDraggableRepeaterItemLeftComponent>;
  @ContentChildren(forwardRef(() => SkyContribDraggableRepeaterItemRightComponent))
    public itemRightNode: QueryList<SkyContribDraggableRepeaterItemRightComponent>;

  @HostBinding('attr.repeater-item-id') get repeaterItemId() { return this.id; }

  public ngOnInit() {
    if (this.id === undefined) {
      throw new Error('You must supply [id] to the grid control for it to function');
    }
  }

  public ngAfterContentInit() {
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

  public toggle(event: any) {
    this.isExpanded = !this.isExpanded;
  }
}
