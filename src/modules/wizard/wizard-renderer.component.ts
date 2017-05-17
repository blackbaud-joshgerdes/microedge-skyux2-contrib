import { Component, Input, TemplateRef, ViewChild, ViewContainerRef, OnInit } from '@angular/core';

@Component({
  selector: 'sky-contrib-wizard-renderer',
  template: '<template #container></template>'
})
export class SkyContribWizardRendererComponent implements OnInit {
  @Input() template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
