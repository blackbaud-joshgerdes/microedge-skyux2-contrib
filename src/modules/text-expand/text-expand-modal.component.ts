import { Component, ViewChild, Inject } from '@angular/core';
import { SkyModalComponent } from '@blackbaud/skyux/dist/modules/modal';

@Component({
  selector: 'sky-contrib-text-expand-modal',
  templateUrl: './text-expand-modal.component.html',
  styleUrls: ['./text-expand-modal.component.scss']
})
export class SkyTextExpandModalComponent {
  modalHeading: string;
  content: string;
  @ViewChild(SkyModalComponent) modal: SkyModalComponent;

  constructor(
    @Inject('content') content: string,
    @Inject('modalHeading') modalHeading: string
  ) {
    this.content = (content) ? content.trim() : '';
    this.modalHeading = (modalHeading) ? modalHeading.trim() : '';
  }
}
