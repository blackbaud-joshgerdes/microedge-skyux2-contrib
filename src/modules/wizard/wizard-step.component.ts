import { Component, Input, Inject, HostBinding, forwardRef } from '@angular/core';
import { SkyWizardComponent } from './wizard.component';

@Component({
  selector: 'sky-contrib-wizard-step',
  template: '<ng-content></ng-content>'
})
export class SkyWizardStepComponent {
  @Input() title: string;
  @Input() validator: ((state: any) => boolean) = (state) => true;
  @HostBinding('class.active') get classActive() { return this.wizard.currentStep === this; }

  constructor(@Inject(forwardRef(() => SkyWizardComponent))private wizard: SkyWizardComponent) {
  }
}
