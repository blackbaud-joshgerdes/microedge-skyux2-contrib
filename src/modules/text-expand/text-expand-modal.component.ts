import { Component, ViewChild, Inject } from '@angular/core';
import { SkyModalComponent } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-contrib-text-expand-modal',
  templateUrl: './text-expand-modal.component.html',
  styleUrls: ['./text-expand-modal.component.scss']
})
export class SkyTextExpandModalComponent {
  @ViewChild(SkyModalComponent) modal: SkyModalComponent;

  constructor(
    @Inject('modalHeading') private modalHeading: string,
    @Inject('content') private content: string
  ) {}
}
