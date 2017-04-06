import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyTextExpandComponent } from './text-expand.component';
import { SkyTextExpandModalComponent } from './text-expand-modal.component';
import { SkyModalModule } from '@blackbaud/skyux/dist/modules/modal';

@NgModule({
  imports: [
    CommonModule,
    SkyModalModule
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
