import { Component, Input, Inject, HostBinding, forwardRef } from '@angular/core';
import { SkyContribWizardComponent } from './wizard.component';

@Component({
  selector: 'sky-contrib-wizard-step',
  template: '<ng-content></ng-content>'
})
export class SkyContribWizardStepComponent {
  @Input() title: string;
  @Input() validator: ((state: any) => boolean) = (state) => true;
  @HostBinding('class.active') get classActive() { return this.wizard.currentStep === this; }

  constructor(@Inject(forwardRef(() => SkyContribWizardComponent))private wizard: SkyContribWizardComponent) {
  }
}
