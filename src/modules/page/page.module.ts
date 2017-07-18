import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribPageComponent } from './page.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule
  ],
  declarations: [
    SkyContribPageComponent
  ],
  exports: [
    SkyContribPageComponent
  ]
})
export class SkyContribContribPageModule {}
