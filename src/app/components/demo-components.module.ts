import { NgModule } from '@angular/core';

import { SkyContribDemoComponentsService } from './demo-components.service';

require('style-loader!prismjs/themes/prism.css');

@NgModule({
  providers: [
    SkyContribDemoComponentsService
  ]
})
export class SkyContribDemoComponentsModule { }
