import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyPageComponent } from './page.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule
  ],
  declarations: [
    SkyPageComponent
  ],
  exports: [
    SkyPageComponent
  ]
})
export class SkyContribPageModule {}
