import {
  Component, Input, ContentChildren, TemplateRef, QueryList,
  ViewChild, ViewContainerRef, AfterContentInit
} from '@angular/core';

@Component({
  selector: 'sky-contrib-list-action-bar-item',
  template: '<template #actionBarItem></template>'
})
export class SkyListActionBarItemComponent implements AfterContentInit {
  /* tslint:disable */
  @Input('template') templateInput: TemplateRef<any>;
  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;
  /* tslint:enable */
  @ViewChild('actionBarItem', { read: ViewContainerRef }) container: ViewContainerRef;

  public ngAfterContentInit() {
    if (this.template) {
      this.container.createEmbeddedView(this.template, this);
    }
  }

  public get template(): TemplateRef<any> {
    return this.templates && this.templates.length > 0 ? this.templates.first : this.templateInput;
  }
}
