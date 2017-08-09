import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribListRepeaterComponent } from './list-repeater.component';
import { SkyContribListRepeaterItemComponent } from './list-repeater-item.component';
import { SkyContribListRepeaterPagingComponent } from './list-repeater-paging.component';
import { SkyContribListRepeaterItemTitleComponent } from './list-repeater-item-title.component';
import { SkyContribListRepeaterItemEditorComponent } from './list-repeater-item-editor.component';
import { SkyContribListRepeaterItemLeftComponent } from './list-repeater-item-left.component';
import { SkyContribListRepeaterItemRightComponent } from './list-repeater-item-right.component';
import { SkyContribListRepeaterItemContentComponent } from './list-repeater-item-content.component';
import { SkyContribListRepeaterItemDescriptionComponent }
  from './list-repeater-item-description.component';
import { SkyContribListRepeaterRendererComponent } from './list-repeater-renderer.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribListRepeaterComponent,
    SkyContribListRepeaterItemComponent,
    SkyContribListRepeaterPagingComponent,
    SkyContribListRepeaterItemTitleComponent,
    SkyContribListRepeaterItemEditorComponent,
    SkyContribListRepeaterItemLeftComponent,
    SkyContribListRepeaterItemRightComponent,
    SkyContribListRepeaterItemContentComponent,
    SkyContribListRepeaterItemDescriptionComponent,
    SkyContribListRepeaterRendererComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyContribListRepeaterComponent,
    SkyContribListRepeaterItemComponent,
    SkyContribListRepeaterPagingComponent,
    SkyContribListRepeaterItemTitleComponent,
    SkyContribListRepeaterItemEditorComponent,
    SkyContribListRepeaterItemLeftComponent,
    SkyContribListRepeaterItemRightComponent,
    SkyContribListRepeaterItemContentComponent,
    SkyContribListRepeaterItemDescriptionComponent,
    SkyContribListRepeaterRendererComponent
  ]
})
export class SkyContribListRepeaterModule {
}
