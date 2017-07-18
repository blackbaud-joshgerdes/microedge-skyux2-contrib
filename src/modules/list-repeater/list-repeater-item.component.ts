import { Component, Input, HostBinding, ContentChild, OnInit } from '@angular/core';
import { SkyContribListRepeaterItemTitleComponent } from './list-repeater-item-title.component';
import { SkyContribListRepeaterItemEditorComponent } from './list-repeater-item-editor.component';
import { SkyContribListRepeaterItemLeftComponent } from './list-repeater-item-left.component';
import { SkyContribListRepeaterItemRightComponent } from './list-repeater-item-right.component';
import { SkyContribListRepeaterItemContentComponent } from './list-repeater-item-content.component';
import { SkyContribListRepeaterItemDescriptionComponent }
  from './list-repeater-item-description.component';

@Component({
    selector: 'sky-contrib-list-repeater-item',
    templateUrl: './list-repeater-item.component.html',
    styleUrls: [
      './list-repeater-item.component.scss'
    ]
})
export class SkyContribListRepeaterItemComponent implements OnInit {
  isExpanded: boolean = true;
  @Input() isEditing: boolean;
  @Input() isExpandable: boolean = false;
  @Input() showContent: boolean = false;
  @Input() id: string;
  @Input() item: any;
  @ContentChild(SkyContribListRepeaterItemLeftComponent)
    leftComponent: SkyContribListRepeaterItemLeftComponent;
  @ContentChild(SkyContribListRepeaterItemRightComponent)
    rightComponent: SkyContribListRepeaterItemRightComponent;
  @ContentChild(SkyContribListRepeaterItemTitleComponent)
    titleComponent: SkyContribListRepeaterItemTitleComponent;
  @ContentChild(SkyContribListRepeaterItemDescriptionComponent)
    descriptionComponent: SkyContribListRepeaterItemDescriptionComponent;
  @ContentChild(SkyContribListRepeaterItemContentComponent)
    contentComponent: SkyContribListRepeaterItemContentComponent;
  @ContentChild(SkyContribListRepeaterItemEditorComponent)
    editorComponent: SkyContribListRepeaterItemEditorComponent;

  @HostBinding('attr.repeater-item-id') get (): string { return this.id; }

  ngOnInit() {
    if (this.id == null) {
      throw new Error('You must supply [id] to the list repeater control for it to function');
    }
  }

  toggle(event: any) {
    this.isExpanded = !this.isExpanded;
  }

  get leftTemplate() {
    return this.leftComponent !== undefined ? this.leftComponent.template : undefined;
  }

  get rightTemplate() {
    return this.rightComponent !== undefined ? this.rightComponent.template : undefined;
  }

  get titleTemplate() {
    return this.titleComponent !== undefined ? this.titleComponent.template : undefined;
  }

  get descriptionTemplate() {
    return this.descriptionComponent !== undefined ? this.descriptionComponent.template : undefined;
  }

  get contentTemplate() {
    return this.contentComponent !== undefined ? this.contentComponent.template : undefined;
  }

  get editorTemplate() {
    return this.editorComponent !== undefined ? this.editorComponent.template : undefined;
  }
}
