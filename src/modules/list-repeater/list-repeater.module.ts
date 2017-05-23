import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyListRepeaterComponent } from './list-repeater.component';
import { SkyListRepeaterItemComponent } from './list-repeater-item.component';
import { SkyListRepeaterPagingComponent } from './list-repeater-paging.component';
import { SkyListRepeaterItemTitleComponent } from './list-repeater-item-title.component';
import { SkyListRepeaterItemEditorComponent } from './list-repeater-item-editor.component';
import { SkyListRepeaterItemLeftComponent } from './list-repeater-item-left.component';
import { SkyListRepeaterItemRightComponent } from './list-repeater-item-right.component';
import { SkyListRepeaterItemContentComponent } from './list-repeater-item-content.component';
import { SkyListRepeaterItemDescriptionComponent }
  from './list-repeater-item-description.component';
import { SkyListRepeaterRendererComponent } from './list-repeater-renderer.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyListRepeaterComponent,
    SkyListRepeaterItemComponent,
    SkyListRepeaterPagingComponent,
    SkyListRepeaterItemTitleComponent,
    SkyListRepeaterItemEditorComponent,
    SkyListRepeaterItemLeftComponent,
    SkyListRepeaterItemRightComponent,
    SkyListRepeaterItemContentComponent,
    SkyListRepeaterItemDescriptionComponent,
    SkyListRepeaterRendererComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyListRepeaterComponent,
    SkyListRepeaterItemComponent,
    SkyListRepeaterPagingComponent,
    SkyListRepeaterItemTitleComponent,
    SkyListRepeaterItemEditorComponent,
    SkyListRepeaterItemLeftComponent,
    SkyListRepeaterItemRightComponent,
    SkyListRepeaterItemContentComponent,
    SkyListRepeaterItemDescriptionComponent,
    SkyListRepeaterRendererComponent
  ]
})
export class SkyListRepeaterModule {
}
