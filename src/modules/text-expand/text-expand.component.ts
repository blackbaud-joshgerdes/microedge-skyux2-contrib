import { Component, Input } from '@angular/core';
import { SkyModalService } from '../modal';
import { SkyTextExpandModalComponent } from './text-expand-modal.component';

@Component({
  selector: 'sky-contrib-text-expand',
  templateUrl: './text-expand.component.html',
  styleUrls: [
    './text-expand.component.scss'
  ]
})
export class SkyTextExpandComponent {
  displayToggle: boolean = true;
  isExpanded: boolean = false;
  @Input() private modalMode: boolean = false;
  @Input() private maxLength: number;
  @Input() private content: string;
  @Input() private modalHeading: string;

  constructor(private modalService: SkyModalService) { }

  ngAfterContentInit() {
    this.content = this.content.trim();
  }

  public toggle() {
    if (this.modalMode) {
      this.modalService.open(SkyTextExpandModalComponent, [
        { provide: 'content', useValue: this.content },
        { provide: 'modalHeading', useValue: this.modalHeading }
      ]);
    } else {
      this.isExpanded = !this.isExpanded;
    }
  }

  public getContent(content: string, isExpanded: boolean, maxLength: number) {
    return isExpanded ? content : content.substring(0, maxLength);
  }
}
