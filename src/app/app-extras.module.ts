import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SkyContribDemoTitleService } from './shared/title.service';
import { SkyContribDemoComponentsModule } from './components/demo-components.module';
import { SkyModule } from '@blackbaud/skyux/dist/core';
import { MicroedgeSkyContribModule } from '../core';

require('style-loader!./styles.scss');

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [],
  imports: [
    MicroedgeSkyContribModule,
    SkyModule,
    SkyContribDemoComponentsModule
  ],
  exports: [
    MicroedgeSkyContribModule
  ],
  providers: [
    SkyContribDemoTitleService
  ]
})
export class AppExtrasModule { }
