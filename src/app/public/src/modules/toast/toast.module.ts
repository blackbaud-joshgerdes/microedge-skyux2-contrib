import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribToastComponent } from './toast.component';
import { SkyContribToastContainerComponent } from './toast-container.component';
import { SkyContribToastProvider } from './toast.provider';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SkyContribToastComponent,
    SkyContribToastContainerComponent
  ],
  entryComponents: [
    SkyContribToastContainerComponent
  ],
  exports: [
    SkyContribToastComponent
  ],
  providers: [
    SkyContribToastProvider
  ]
})
export class SkyContribToastModule {}
