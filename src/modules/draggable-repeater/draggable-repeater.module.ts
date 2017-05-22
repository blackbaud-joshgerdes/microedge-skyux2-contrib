import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyDraggableRepeaterComponent } from './draggable-repeater.component';
import { SkyDraggableRepeaterItemComponent } from './draggable-repeater-item.component';
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
    SkyDraggableRepeaterComponent,
    SkyDraggableRepeaterItemComponent,
    SkyContribDraggableRepeaterItemLeftComponent,
    SkyContribDraggableRepeaterItemTitleComponent,
    SkyContribDraggableRepeaterItemContentComponent,
    SkyContribDraggableRepeaterItemRightComponent,
    SkyContribDraggableRepeaterRendererComponent
  ],
  exports: [
    SkyDraggableRepeaterComponent,
    SkyDraggableRepeaterItemComponent,
    SkyContribDraggableRepeaterItemLeftComponent,
    SkyContribDraggableRepeaterItemTitleComponent,
    SkyContribDraggableRepeaterItemContentComponent,
    SkyContribDraggableRepeaterItemRightComponent,
    SkyContribDraggableRepeaterRendererComponent
  ]
})
export class SkyDraggableRepeaterModule {}
