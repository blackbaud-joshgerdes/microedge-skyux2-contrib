import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyLocaleCurrencyMaskDirective } from './locale-currency-mask.directive';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyLocaleCurrencyMaskDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyLocaleCurrencyMaskDirective
  ],
  providers: [
  ]
})
export class SkyLocaleCurrencyMaskModule {
}
