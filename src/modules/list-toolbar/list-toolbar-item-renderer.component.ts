import { Component, ViewContainerRef, ViewChild, Input, TemplateRef, OnInit} from '@angular/core';

@Component({
  selector: 'sky-contrib-list-toolbar-item-renderer',
  template: '<ng-template #container></ng-template>',
  styleUrls: ['./list-toolbar-item-renderer.component.scss']
})
export class SkyListToolbarItemRendererComponent implements OnInit {
  @Input() template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
