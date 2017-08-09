import { Component, Input, QueryList } from '@angular/core';
import { SkyContribWizardComponent } from './wizard.component';
import { SkyContribWizardStepComponent } from './wizard-step.component';

@Component({
  selector: 'sky-contrib-wizard-step-list',
  templateUrl: './wizard-step-list.component.html',
  styleUrls: ['./wizard-step-list.component.scss']
})
export class SkyContribWizardStepListComponent {
  @Input() public steps: QueryList<SkyContribWizardStepComponent>;
  @Input() public currentStep: SkyContribWizardStepComponent;
  @Input() public wizard: SkyContribWizardComponent;

  public isStepEnabled(step: SkyContribWizardStepComponent) {
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
