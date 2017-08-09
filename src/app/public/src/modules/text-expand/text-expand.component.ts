import { Component, Input, AfterContentInit } from '@angular/core';
import { SkyModalService } from '@blackbaud/skyux/dist/core';
import { SkyContribTextExpandModalComponent } from './text-expand-modal.component';

@Component({
  selector: 'sky-contrib-text-expand',
  templateUrl: './text-expand.component.html',
  styleUrls: ['./text-expand.component.scss']
})
export class SkyContribTextExpandComponent implements AfterContentInit {
  public displayToggle: boolean = true;
  public isExpanded: boolean = false;
  @Input() public modalMode: boolean = false;
  @Input() public maxLength: number;
  @Input() public content: string;
  @Input() public modalHeading: string;

  constructor(private modalService: SkyModalService) { }

  public ngAfterContentInit() {
    this.content = (this.content) ? this.content.trim() : '';
  }

  public toggle() {
    if (this.modalMode) {
      let providers = [
        { provide: 'content', useValue: this.content },
        { provide: 'modalHeading', useValue: this.modalHeading }
      ];

      this.modalService.open(SkyContribTextExpandModalComponent, providers);
    } else {
      this.isExpanded = !this.isExpanded;
    }
  }

  public getContent(content: string, isExpanded: boolean, maxLength: number) {
    return isExpanded ? content : content.substring(0, maxLength);
  }
}
