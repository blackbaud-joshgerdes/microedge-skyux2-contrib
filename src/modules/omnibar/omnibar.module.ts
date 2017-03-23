import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyOmnibarComponent } from './omnibar.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule
  ],
  declarations: [
    SkyOmnibarComponent
  ],
  exports: [
    SkyOmnibarComponent
  ],
  providers: [
    { provide: 'window', useValue: window},
  ]
})
export class SkyOmnibarModule {}
