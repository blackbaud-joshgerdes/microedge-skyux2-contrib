import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkyContribDemoComponentsService } from './demo-components.service';
import { SkyWizardDemoFormComponent } from './wizard/wizard-demo-form.component';

require('style-loader!prismjs/themes/prism.css');

@NgModule({
  entryComponents: [
    SkyWizardDemoFormComponent
  ],
  imports: [
    FormsModule
  ],
  providers: [
    SkyContribDemoComponentsService
  ]
})
export class SkyContribDemoComponentsModule { }
