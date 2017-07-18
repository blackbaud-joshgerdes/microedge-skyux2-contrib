import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribTextExpandComponent } from './text-expand.component';
import { SkyContribTextExpandModalComponent } from './text-expand-modal.component';
import { SkyModalModule } from '@blackbaud/skyux/dist/core';

@NgModule({
  imports: [
    CommonModule,
    SkyModalModule
  ],
  declarations: [
    SkyContribTextExpandComponent,
    SkyContribTextExpandModalComponent
  ],
  exports: [
    SkyContribTextExpandComponent,
    SkyContribTextExpandModalComponent
  ],
  entryComponents: [
    SkyContribTextExpandModalComponent
  ]
})
export class SkyContribTextExpandModule {}
