import { Component } from '@angular/core';
import { SkyContribWizardService } from '../../public';
import { SkyWizardDemoFormComponent } from './wizard-demo-form.component';

@Component({
  selector: 'sky-wizard-demo',
  templateUrl: './wizard-demo.component.html'
})
export class SkyWizardDemoComponent {
  constructor(private wizardService: SkyContribWizardService) {}

  public openWizard() {
    this.wizardService.open(SkyWizardDemoFormComponent, undefined)
      .onSaved.subscribe((r: any) => {
        console.log('wizard saved!');
      });
  }
}
