import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { SaveAndCloseComponent, SaveAndCloseEvent } from '../../public/src/modules/wizard';
import { SkyContribWizardComponent } from '../../public';

@Component({
  selector: 'sky-demo-wizard-form',
  templateUrl: './wizard-demo-form.component.html'
})
export class SkyWizardDemoFormComponent implements SaveAndCloseComponent {
  @ViewChild(SkyContribWizardComponent) public wizard: SkyContribWizardComponent;
  @Output()
  public onSaveAndClose: EventEmitter<SaveAndCloseEvent> = new EventEmitter<SaveAndCloseEvent>();
  public requiredValue1: string = '';
  public requiredValue2: boolean = false;

  public stepOneValidator = () => {
    return this.requiredValue1 && this.requiredValue1.length > 0;
  }

  public stepTwoValidator = () => {
    return this.requiredValue2;
  }

  public confirmApply(): void {
    this.onSaveAndClose.emit(<SaveAndCloseEvent>{ saved: true });
    this.wizard.close();
  }
}
