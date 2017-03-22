import { Component, ViewChild, Inject } from '@angular/core';
import { SkyModalComponent, SkyModalService, SKY_MODAL_PROVIDERS } from '../modal';

@Component({
  selector: 'sky-contrib-text-expand-modal',
  templateUrl: './text-expand-modal.component.html',
  styleUrls: ['./text-expand-modal.component.scss'],
  providers: [SkyModalService, SKY_MODAL_PROVIDERS]
})
export class SkyTextExpandModalComponent {
  @ViewChild(SkyModalComponent) modal: SkyModalComponent;

  constructor(
    @Inject('modalHeading') private modalHeading: string,
    @Inject('content') private content: string
  ) {}
}
