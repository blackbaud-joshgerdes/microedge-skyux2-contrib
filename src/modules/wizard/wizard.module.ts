import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyModalModule } from '@blackbaud/skyux/dist/core';
import { SkyWizardComponent } from './wizard.component';
import { SkyWizardStepComponent } from './wizard-step.component';
import { SkyWizardStepListComponent } from './wizard-step-list.component';
import { SkyWizardService } from './wizard.service';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    SkyModalModule
  ],
  declarations: [
    SkyWizardComponent,
    SkyWizardStepComponent,
    SkyWizardStepListComponent
  ],
  exports: [
    SkyWizardComponent,
    SkyWizardStepComponent,
    SkyWizardStepListComponent
  ],
  providers: [
    SkyWizardService
  ]
})
export class SkyWizardModule {}
