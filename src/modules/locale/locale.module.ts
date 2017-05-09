import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribLocaleService } from './locale.service';
import { LocaleService, LocalizationService } from 'angular2localization';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule
  ],
  providers: [
    SkyContribLocaleService,
    LocaleService,
    LocalizationService
  ]
})
export class SkyContribLocaleModule {
}
