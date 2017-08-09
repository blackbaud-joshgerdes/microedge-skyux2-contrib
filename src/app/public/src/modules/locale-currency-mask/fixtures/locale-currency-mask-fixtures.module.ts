import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyContribLocaleCurrencyMaskModule } from '../';

import {
  LocaleCurrencyMaskDefaultTestComponent
} from './locale-currency-mask-default-options.component.fixture';

@NgModule({
  declarations: [
    LocaleCurrencyMaskDefaultTestComponent
  ],
  imports: [
    CommonModule,
    SkyContribLocaleCurrencyMaskModule
  ],
  exports: [
    LocaleCurrencyMaskDefaultTestComponent
  ]
})
export class LocaleCurrencyMaskFixturesModule { }
