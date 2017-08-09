import {
  Component,
  ViewContainerRef,
  ViewChild,
  Input,
  TemplateRef,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sky-contrib-list-filter-renderer',
  template: '<ng-template #container></ng-template>'
})
export class SkyContribListFilterRendererComponent implements OnInit {
  @Input() public template: TemplateRef<any>;
  @Input() public filter: any;
  @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

  public ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
