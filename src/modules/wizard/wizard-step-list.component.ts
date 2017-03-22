import { Component, Input, QueryList } from '@angular/core';
import { SkyWizardComponent } from './wizard.component';
import { SkyWizardStepComponent } from './wizard-step.component';

@Component({
  selector: 'sky-contrib-wizard-step-list',
  templateUrl: './wizard-step-list.component.html',
  styleUrls: [
    './wizard-step-list.component.scss'
  ]
})
export class SkyWizardStepListComponent {
  @Input() steps: QueryList<SkyWizardStepComponent>;
  @Input() currentStep: SkyWizardStepComponent;
  @Input() wizard: SkyWizardComponent;

  isStepEnabled(step: SkyWizardStepComponent) {
    let steps = this.steps.toArray();
    let index = steps.indexOf(step);

    let isStepEnabled = true;
    for (let i = 0; i <= index; i++) {
      if (!steps[i].validator(this.wizard.model)) {
        isStepEnabled = false;
        break;
      }
    }

    return isStepEnabled;
  }
}
