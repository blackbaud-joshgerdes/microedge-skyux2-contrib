import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyDraggableRepeaterComponent } from './draggable-repeater.component';
import { SkyDraggableRepeaterItemComponent } from './draggable-repeater-item.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    DragulaModule
  ],
  declarations: [
    SkyDraggableRepeaterComponent,
    SkyDraggableRepeaterItemComponent
  ],
  exports: [
    SkyDraggableRepeaterComponent,
    SkyDraggableRepeaterItemComponent
  ]
})
export class SkyDraggableRepeaterModule {}
