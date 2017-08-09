import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SkyContribDemoTitleService } from './shared/title.service';
import { SkyContribDemoComponentsModule } from './components/demo-components.module';
import { SkyModule } from '@blackbaud/skyux/dist/core';
import { SkyAppConfig } from '@blackbaud/skyux-builder/runtime';
import { MicroedgeSkyContribModule, SkyContribConfigService } from './public';

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
    SkyContribDemoTitleService,
    // The config service acts as an adaptor for skyuxconfig.json:
    {
      provide: SkyContribConfigService,
      useExisting: SkyAppConfig
    }
  ]
})
export class AppExtrasModule { }
