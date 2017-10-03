import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ContentChildren,
  QueryList,
  TemplateRef,
  forwardRef,
  AfterContentInit,
  Inject
} from '@angular/core';
import { SkyContribWizardStepComponent } from './wizard-step.component';
import { SkyContribWizardStepListComponent } from './wizard-step-list.component';
import { SkyModalInstance } from '@blackbaud/skyux/dist/modules/modal';
import { SkyContribWizardHeaderComponent } from './wizard-header.component';
import { SkyContribWizardStepsComponent } from './wizard-steps.component';

@Component({
  selector: 'sky-contrib-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class SkyContribWizardComponent implements AfterContentInit {
  @Input() public model: any = {};
  @Output() public onSaveAndClose: EventEmitter<any> = new EventEmitter();
  @ViewChild(SkyContribWizardStepListComponent) public stepList: SkyContribWizardStepListComponent;
  @ContentChildren(SkyContribWizardStepComponent, {descendants: true})
  public steps: QueryList<SkyContribWizardStepComponent> = undefined;
  @Input() public headerTemplate: TemplateRef<any>;
  @Input() public stepsTemplate: TemplateRef<any>;
  @Input() public footerTemplate: TemplateRef<any>;
  @ContentChildren(forwardRef(() => SkyContribWizardHeaderComponent)) public headerNode:
    QueryList<SkyContribWizardHeaderComponent>;
  @ContentChildren(forwardRef(() => SkyContribWizardStepsComponent)) public stepsNode:
    QueryList<SkyContribWizardStepsComponent>;

  public self: SkyContribWizardComponent;
  public visitedSteps: Array<SkyContribWizardStepComponent> = [];

  private step: SkyContribWizardStepComponent = undefined;

  set currentStep(step) {
    this.step = step;

    if (this.visitedSteps.indexOf(step) === -1) {
      this.visitedSteps.push(step);
    }
  }

  get currentStep() {
    if (this.step === undefined && this.steps !== undefined && this.steps.length > 0) {
      this.step = this.steps.first;
      this.visitedSteps.push(this.step);
    }

    return this.step;
  }

  constructor(@Inject(SkyModalInstance) public modalInstance: SkyModalInstance) {
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

  private getCurrentStepIndex(): number {
    return this.steps.toArray().indexOf(this.currentStep);
  }
}
