import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyListRepeaterComponent } from './list-repeater.component';
import { SkyListRepeaterItemComponent } from './list-repeater-item.component';
import { SkyListRepeaterPagingComponent } from './list-repeater-paging.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyListRepeaterComponent,
    SkyListRepeaterItemComponent,
    SkyListRepeaterPagingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyListRepeaterComponent,
    SkyListRepeaterItemComponent,
    SkyListRepeaterPagingComponent
  ]
})
export class SkyListRepeaterModule {
}
