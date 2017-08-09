import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyModalModule } from '@blackbaud/skyux/dist/core';
import { SkyContribWizardComponent } from './wizard.component';
import { SkyContribWizardStepComponent } from './wizard-step.component';
import { SkyContribWizardStepListComponent } from './wizard-step-list.component';
import { SkyContribWizardService } from './wizard.service';
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
    SkyContribWizardComponent,
    SkyContribWizardStepComponent,
    SkyContribWizardStepListComponent,
    SkyContribWizardRendererComponent,
    SkyContribWizardStepsComponent,
    SkyContribWizardHeaderComponent
  ],
  exports: [
    SkyContribWizardComponent,
    SkyContribWizardStepComponent,
    SkyContribWizardStepListComponent,
    SkyContribWizardRendererComponent,
    SkyContribWizardStepsComponent,
    SkyContribWizardHeaderComponent
  ],
  providers: [
    SkyContribWizardService
  ]
})
export class SkyContribWizardModule {}
