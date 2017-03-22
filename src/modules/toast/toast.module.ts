import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyToastComponent } from './toast.component';
import { SkyToastContainer } from './toast-container.component';
import { SkyToastProvider } from './toast.provider';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SkyToastComponent,
    SkyToastContainer
  ],
  entryComponents: [
    SkyToastContainer
  ],
  exports: [
    SkyToastComponent
  ],
  providers: [
    SkyToastProvider
  ]
})
export class SkyToastModule {}
