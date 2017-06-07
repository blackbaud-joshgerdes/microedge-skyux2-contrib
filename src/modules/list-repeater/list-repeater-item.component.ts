import { Component, Input, HostBinding, ContentChild, OnInit } from '@angular/core';
import { SkyListRepeaterItemTitleComponent } from './list-repeater-item-title.component';
import { SkyListRepeaterItemEditorComponent } from './list-repeater-item-editor.component';
import { SkyListRepeaterItemLeftComponent } from './list-repeater-item-left.component';
import { SkyListRepeaterItemRightComponent } from './list-repeater-item-right.component';
import { SkyListRepeaterItemContentComponent } from './list-repeater-item-content.component';
import { SkyListRepeaterItemDescriptionComponent }
  from './list-repeater-item-description.component';

@Component({
    selector: 'sky-contrib-list-repeater-item',
    templateUrl: './list-repeater-item.component.html',
    styleUrls: [
      './list-repeater-item.component.scss'
    ]
})
export class SkyListRepeaterItemComponent implements OnInit {
  isExpanded: boolean = true;
  @Input() isEditing: boolean;
  @Input() isExpandable: boolean = false;
  @Input() showContent: boolean = false;
  @Input() id: string;
  @Input() item: any;
  @ContentChild(SkyListRepeaterItemLeftComponent)
    leftComponent: SkyListRepeaterItemLeftComponent;
  @ContentChild(SkyListRepeaterItemRightComponent)
    rightComponent: SkyListRepeaterItemRightComponent;
  @ContentChild(SkyListRepeaterItemTitleComponent)
    titleComponent: SkyListRepeaterItemTitleComponent;
  @ContentChild(SkyListRepeaterItemDescriptionComponent)
    descriptionComponent: SkyListRepeaterItemDescriptionComponent;
  @ContentChild(SkyListRepeaterItemContentComponent)
    contentComponent: SkyListRepeaterItemContentComponent;
  @ContentChild(SkyListRepeaterItemEditorComponent)
    editorComponent: SkyListRepeaterItemEditorComponent;

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
