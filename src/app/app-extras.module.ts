import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SkyDemoTitleService } from './shared/title.service';
import { SkyDemoComponentsModule } from './components/demo-components.module';
import { SkyModule } from '@blackbaud/skyux/dist/core';
import { MicroedgeSkyContribModule } from '../core';

require('style!./styles.scss');

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [],
  imports: [
    MicroedgeSkyContribModule,
    SkyModule,
    SkyDemoComponentsModule
  ],
  exports: [
    MicroedgeSkyContribModule
  ],
  providers: [
    SkyDemoTitleService
  ]
})
export class AppExtrasModule { }
