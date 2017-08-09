import { Component, Input, TemplateRef, ViewChild, ViewContainerRef,
  ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'sky-contrib-draggable-repeater-renderer',
  template: '<ng-template #container></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribDraggableRepeaterRendererComponent implements OnInit {
  @Input() public item: any;
  @Input() public template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

  public ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
