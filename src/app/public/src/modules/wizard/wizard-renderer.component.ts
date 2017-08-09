import { Component, Input, TemplateRef, ViewChild, ViewContainerRef, OnInit } from '@angular/core';

@Component({
  selector: 'sky-contrib-wizard-renderer',
  template: '<ng-template #container></ng-template>'
})
export class SkyContribWizardRendererComponent implements OnInit {
  @Input() private template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) private container: ViewContainerRef;

  public ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
