import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyTextExpandComponent } from './text-expand.component';
import { SkyTextExpandModalComponent } from './text-expand-modal.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule
  ],
  declarations: [
    SkyTextExpandComponent,
    SkyTextExpandModalComponent
  ],
  exports: [
    SkyTextExpandComponent,
    SkyTextExpandModalComponent
  ],
  entryComponents: [
    SkyTextExpandModalComponent
  ]
})
export class SkyTextExpandModule {}