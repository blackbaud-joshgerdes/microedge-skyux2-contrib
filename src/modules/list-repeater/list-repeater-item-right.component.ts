import {
  Component, Input, TemplateRef, ContentChildren, QueryList, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sky-contrib-list-repeater-item-right',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListRepeaterItemRightComponent {
  @Input('template') inputTemplate: TemplateRef<any>;
  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;

  get template() { return this.templates.length > 0 ? this.templates.first : this.inputTemplate; }
}
