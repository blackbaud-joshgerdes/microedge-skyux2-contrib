import {
  Component, Input, TemplateRef, ContentChildren, QueryList, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sky-contrib-tree-view-dropdown',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribTreeViewDropdownComponent {
  /* tslint:disable */
  @Input('template') inputTemplate: TemplateRef<any>;
  /* tslint:enable */
  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;

  get template() { return this.templates.length > 0 ? this.templates.first : this.inputTemplate; }
}
