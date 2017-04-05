import { Component, ViewContainerRef, ViewChild, Input, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'sky-contrib-list-filter-renderer',
  template: '<template #container></template>'
})
export class SkyListFilterRendererComponent implements OnInit {
  @Input() template: TemplateRef<any>;
  @Input() filter: any;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  public ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
