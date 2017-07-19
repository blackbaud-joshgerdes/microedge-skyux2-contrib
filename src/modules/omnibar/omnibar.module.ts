import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowRef } from '../utils/windowref';
import { SkyContribOmnibarComponent } from './omnibar.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule
  ],
  declarations: [
    SkyContribOmnibarComponent
  ],
  exports: [
    SkyContribOmnibarComponent
  ],
  providers: [
    WindowRef
  ]
})
export class SkyContribOmnibarModule {}
