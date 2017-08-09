import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribLocaleCurrencyMaskDirective } from './locale-currency-mask.directive';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribLocaleCurrencyMaskDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyContribLocaleCurrencyMaskDirective
  ],
  providers: [
  ]
})
export class SkyContribLocaleCurrencyMaskModule {
}
