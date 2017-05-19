import { Component, Input, Output, EventEmitter,
  ViewChild, ContentChildren, QueryList } from '@angular/core';
import { SkyWizardStepComponent } from './wizard-step.component';
import { SkyWizardStepListComponent } from './wizard-step-list.component';
import { SkyModalComponent, SkyModalService } from '@blackbaud/skyux/dist/modules/modal';

@Component({
  selector: 'sky-contrib-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: [
    './wizard.component.scss'
  ]
})
export class SkyWizardComponent {
  @Input() model: any = {};
  @Output() onSaveAndClose: EventEmitter<any> = new EventEmitter();
  @ViewChild(SkyModalComponent) modal: SkyModalComponent;
  @ViewChild(SkyWizardStepListComponent) stepList: SkyWizardStepListComponent;
  @ContentChildren(SkyWizardStepComponent) steps: QueryList<SkyWizardStepComponent> = null;

  self: SkyWizardComponent;
  visitedSteps: Array<SkyWizardStepComponent> = [];

  private step: SkyWizardStepComponent = null;
  set currentStep(step) {
    this.step = step;

    if (this.visitedSteps.indexOf(step) === -1) {
      this.visitedSteps.push(step);
    }
  }

  get currentStep() {
    if (this.step === null && this.steps !== null) {
      this.step = this.steps.first;
      this.visitedSteps.push(this.step);
    }

    return this.step;
  }

  constructor(private modalService: SkyModalService) {
    this.self = this;
  }

  public goToPrevious(): void {
    let currentStep = this.getCurrentStepIndex();
    if (this.currentStep !== this.steps.first) {
      this.currentStep = this.steps.toArray()[currentStep - 1];
    }
  }

  public goToNext(): void {
    let currentStep = this.getCurrentStepIndex();
    if (this.currentStep !== this.steps.last) {
      this.currentStep = this.steps.toArray()[currentStep + 1];
    }
  }

  public goToStep(step: SkyWizardStepComponent): void {
    this.currentStep = step;
  }

  public isValid(): boolean {
    let isValid = true;

    for (let step of this.steps.toArray()) {
      if (!step.validator(this.model)) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }

  public saveAndClose(): void {
    let isValid = this.isValid();
    if (isValid) {
      this.onSaveAndClose.emit({ valid: isValid, model: this.model });
    }
  }

  public close(): void {
    this.modal.closeButtonClick();
  }

  private getCurrentStepIndex(): number {
    return this.steps.toArray().indexOf(this.currentStep);
  }
}
