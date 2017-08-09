import { Component, ViewContainerRef, ViewChild, Input, TemplateRef, OnInit} from '@angular/core';

@Component({
  selector: 'sky-contrib-list-toolbar-item-renderer',
  template: '<ng-template #container></ng-template>',
  styleUrls: ['./list-toolbar-item-renderer.component.scss']
})
export class SkyContribListToolbarItemRendererComponent implements OnInit {
  @Input() public template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

  public ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
