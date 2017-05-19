import { Component, Input, TemplateRef, ViewChild, ViewContainerRef,
  ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'sky-contrib-draggable-repeater-renderer',
  template: '<template #container></template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribDraggableRepeaterRendererComponent implements OnInit {
  @Input() template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
