import { Component, ViewChild, Inject } from '@angular/core';
import { SkyModalComponent } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-contrib-text-expand-modal',
  templateUrl: './text-expand-modal.component.html',
  styleUrls: ['./text-expand-modal.component.scss']
})
export class SkyContribTextExpandModalComponent {
  public modalHeading: string;
  public content: string;
  @ViewChild(SkyModalComponent) public modal: SkyModalComponent;

  constructor(
    @Inject('content') content: string,
    @Inject('modalHeading') modalHeading: string
  ) {
    this.content = (content) ? content.trim() : '';
    this.modalHeading = (modalHeading) ? modalHeading.trim() : '';
  }
}
