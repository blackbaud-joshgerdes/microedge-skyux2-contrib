import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribDraggableRepeaterComponent } from './draggable-repeater.component';
import { SkyContribDraggableRepeaterItemComponent } from './draggable-repeater-item.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SkyContribDraggableRepeaterItemLeftComponent }
  from './draggable-repeater-item-left.component';
import { SkyContribDraggableRepeaterItemTitleComponent }
  from './draggable-repeater-item-title.component';
import { SkyContribDraggableRepeaterItemContentComponent }
  from './draggable-repeater-item-content.component';
import { SkyContribDraggableRepeaterItemRightComponent }
  from './draggable-repeater-item-right.component';
import { SkyContribDraggableRepeaterRendererComponent }
  from './draggable-repeater-renderer.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    DragulaModule
  ],
  declarations: [
    SkyContribDraggableRepeaterComponent,
    SkyContribDraggableRepeaterItemComponent,
    SkyContribDraggableRepeaterItemLeftComponent,
    SkyContribDraggableRepeaterItemTitleComponent,
    SkyContribDraggableRepeaterItemContentComponent,
    SkyContribDraggableRepeaterItemRightComponent,
    SkyContribDraggableRepeaterRendererComponent
  ],
  exports: [
    SkyContribDraggableRepeaterComponent,
    SkyContribDraggableRepeaterItemComponent,
    SkyContribDraggableRepeaterItemLeftComponent,
    SkyContribDraggableRepeaterItemTitleComponent,
    SkyContribDraggableRepeaterItemContentComponent,
    SkyContribDraggableRepeaterItemRightComponent,
    SkyContribDraggableRepeaterRendererComponent
  ]
})
export class SkyContribDraggableRepeaterModule {}
