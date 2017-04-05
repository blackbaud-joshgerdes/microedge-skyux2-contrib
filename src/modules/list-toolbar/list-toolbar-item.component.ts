import { Component, Input, ContentChildren, TemplateRef, QueryList } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'sky-contrib-list-toolbar-item',
  template: '<ng-content></ng-content>'
})
export class SkyListToolbarItemComponent {
  @Input() id: string = moment().toDate().getTime().toString();
  @Input() index: number = -1;
  @Input() location: string = 'left';
  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;

  get template(): TemplateRef<any> {
    return this.templates.length > 0 ? this.templates.first : undefined;
  }
}
