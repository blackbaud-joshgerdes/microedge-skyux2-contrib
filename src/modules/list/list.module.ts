import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribListComponent } from './list.component';

@NgModule({
  declarations: [
    SkyContribListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyContribListComponent
  ]
})
export class SkyContribListModule {
}
