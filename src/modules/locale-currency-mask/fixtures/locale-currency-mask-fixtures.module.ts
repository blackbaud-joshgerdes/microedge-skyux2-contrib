import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyLocaleCurrencyMaskModule } from '../';

import {
  LocaleCurrencyMaskDefaultTestComponent
} from './locale-currency-mask-default-options.component.fixture';

@NgModule({
  declarations: [
    LocaleCurrencyMaskDefaultTestComponent
  ],
  imports: [
    CommonModule,
    SkyLocaleCurrencyMaskModule
  ],
  exports: [
    LocaleCurrencyMaskDefaultTestComponent
  ]
})
export class LocaleCurrencyMaskFixturesModule { }
