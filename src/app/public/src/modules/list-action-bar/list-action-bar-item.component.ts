import {
  Component, Input, ContentChildren, TemplateRef, QueryList,
  ViewChild, ViewContainerRef, AfterContentInit
} from '@angular/core';

@Component({
  selector: 'sky-contrib-list-action-bar-item',
  template: '<ng-template #actionBarItem></ng-template>'
})
export class SkyContribListActionBarItemComponent implements AfterContentInit {
  @ViewChild('actionBarItem', { read: ViewContainerRef }) public container: ViewContainerRef;
  private inputTemplate: TemplateRef<any>;
  @ContentChildren(TemplateRef) private templates: QueryList<TemplateRef<any>>;
  @Input() public set template(value) { this.inputTemplate = value; }
  public get template() {
    return this.templates.length > 0 ? this.templates.first : this.inputTemplate;
  }

  public ngAfterContentInit() {
    if (this.template) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
