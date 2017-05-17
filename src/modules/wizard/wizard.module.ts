import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyModalModule } from '@blackbaud/skyux/dist/modules/modal';
import { SkyWizardComponent } from './wizard.component';
import { SkyWizardStepComponent } from './wizard-step.component';
import { SkyWizardStepListComponent } from './wizard-step-list.component';
import { SkyWizardService } from './wizard.service';
import { SkyContribWizardStepsComponent } from './wizard-steps.component';
import { SkyContribWizardHeaderComponent } from './wizard-header.component';
import { SkyContribWizardRendererComponent } from './wizard-renderer.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    SkyModalModule
  ],
  declarations: [
    SkyWizardComponent,
    SkyWizardStepComponent,
    SkyWizardStepListComponent,
    SkyContribWizardRendererComponent,
    SkyContribWizardStepsComponent,
    SkyContribWizardHeaderComponent
  ],
  exports: [
    SkyWizardComponent,
    SkyWizardStepComponent,
    SkyWizardStepListComponent,
    SkyContribWizardRendererComponent,
    SkyContribWizardStepsComponent,
    SkyContribWizardHeaderComponent
  ],
  providers: [
    SkyWizardService
  ]
})
export class SkyWizardModule {}
