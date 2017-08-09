import {
  Component,
  Input,
  HostBinding,
  ContentChild,
  OnInit,
  TemplateRef
} from '@angular/core';
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
    styleUrls: ['./list-repeater-item.component.scss']
})
export class SkyContribListRepeaterItemComponent implements OnInit {
  public isExpanded: boolean = true;
  @Input() public isEditing: boolean;
  @Input() public isExpandable: boolean = false;
  @Input() public showContent: boolean = false;
  @Input() public id: string;
  @Input() public item: any;
  @ContentChild(SkyContribListRepeaterItemLeftComponent)
    public leftComponent: SkyContribListRepeaterItemLeftComponent;
  @ContentChild(SkyContribListRepeaterItemRightComponent)
    public rightComponent: SkyContribListRepeaterItemRightComponent;
  @ContentChild(SkyContribListRepeaterItemTitleComponent)
    public titleComponent: SkyContribListRepeaterItemTitleComponent;
  @ContentChild(SkyContribListRepeaterItemDescriptionComponent)
    public descriptionComponent: SkyContribListRepeaterItemDescriptionComponent;
  @ContentChild(SkyContribListRepeaterItemContentComponent)
    public contentComponent: SkyContribListRepeaterItemContentComponent;
  @ContentChild(SkyContribListRepeaterItemEditorComponent)
    public editorComponent: SkyContribListRepeaterItemEditorComponent;

  @HostBinding('attr.repeater-item-id') public get (): string { return this.id; }

  public ngOnInit() {
    if (this.id === undefined) {
      throw new Error('You must supply [id] to the list repeater control for it to function');
    }
  }

  public toggle(event: any) {
    this.isExpanded = !this.isExpanded;
  }

  get leftTemplate(): TemplateRef<any> {
    return this.leftComponent !== undefined ? this.leftComponent.template : undefined;
  }

  get rightTemplate(): TemplateRef<any> {
    return this.rightComponent !== undefined ? this.rightComponent.template : undefined;
  }

  get titleTemplate(): TemplateRef<any> {
    return this.titleComponent !== undefined ? this.titleComponent.template : undefined;
  }

  get descriptionTemplate(): TemplateRef<any> {
    return this.descriptionComponent !== undefined ? this.descriptionComponent.template : undefined;
  }

  get contentTemplate(): TemplateRef<any> {
    return this.contentComponent !== undefined ? this.contentComponent.template : undefined;
  }

  get editorTemplate(): TemplateRef<any> {
    return this.editorComponent !== undefined ? this.editorComponent.template : undefined;
  }
}
