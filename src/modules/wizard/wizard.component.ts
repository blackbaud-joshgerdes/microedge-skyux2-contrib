import {
  Component, Input, Output, EventEmitter,
  ViewChild, ContentChildren, QueryList,
  TemplateRef, forwardRef, AfterContentInit
} from '@angular/core';
import { SkyContribWizardStepComponent } from './wizard-step.component';
import { SkyContribWizardStepListComponent } from './wizard-step-list.component';
import { SkyModalComponent, SkyModalService } from '@blackbaud/skyux/dist/core';
import { SkyContribWizardHeaderComponent } from './wizard-header.component';
import { SkyContribWizardStepsComponent } from './wizard-steps.component';

@Component({
  selector: 'sky-contrib-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: [
    './wizard.component.scss'
  ]
})
export class SkyContribWizardComponent implements AfterContentInit {
  @Input() public model: any = {};
  @Output() public onSaveAndClose: EventEmitter<any> = new EventEmitter();
  @ViewChild(SkyModalComponent) public modal: SkyModalComponent;
  @ViewChild(SkyContribWizardStepListComponent) public stepList: SkyContribWizardStepListComponent;
  @ContentChildren(SkyContribWizardStepComponent, {descendants: true})
  public steps: QueryList<SkyContribWizardStepComponent> = null;
  @Input() public headerTemplate: TemplateRef<any>;
  @Input() public stepsTemplate: TemplateRef<any>;
  @ContentChildren(forwardRef(() => SkyContribWizardHeaderComponent)) public headerNode:
    QueryList<SkyContribWizardHeaderComponent>;
  @ContentChildren(forwardRef(() => SkyContribWizardStepsComponent)) public stepsNode:
    QueryList<SkyContribWizardStepsComponent>;

  self: SkyContribWizardComponent;
  visitedSteps: Array<SkyContribWizardStepComponent> = [];

  private step: SkyContribWizardStepComponent = null;
  set currentStep(step) {
    this.step = step;

    if (this.visitedSteps.indexOf(step) === -1) {
      this.visitedSteps.push(step);
    }
  }

  get currentStep() {
    if (this.step == null && this.steps != null && this.steps.length > 0) {
      this.step = this.steps.first;
      this.visitedSteps.push(this.step);
    }

    return this.step;
  }

  constructor(private modalService: SkyModalService) {
    this.self = this;
  }

  public ngAfterContentInit() {
    if (this.headerNode.length > 0) {
      this.headerTemplate = this.headerNode.first.template;
    }

    if (this.stepsNode.length > 0) {
      this.stepsTemplate = this.stepsNode.first.template;
    }
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

  public goToStep(step: SkyContribWizardStepComponent): void {
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
