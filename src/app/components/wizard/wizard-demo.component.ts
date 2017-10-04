import { Component } from '@angular/core';
import { SkyModalService } from '@blackbaud/skyux/dist/core';
import { SkyWizardDemoFormComponent } from './wizard-demo-form.component';

@Component({
  selector: 'sky-wizard-demo',
  templateUrl: './wizard-demo.component.html'
})
export class SkyWizardDemoComponent {
  constructor(private wizardService: SkyModalService) {}

  public openWizard() {
    this.wizardService.open(SkyWizardDemoFormComponent, undefined)
      .closed.subscribe((r: any) => {
        console.log('wizard saved!', r);
      });
  }
}
