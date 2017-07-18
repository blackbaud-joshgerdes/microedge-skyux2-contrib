import { Component, Input, ContentChildren, TemplateRef, QueryList, OnInit } from '@angular/core';
import { ListItemModel } from '../list/state/items/item.model';
import { ListViewComponent } from '../list/list-view.component';

@Component({
  selector: 'sky-contrib-list-filter',
  template: '<ng-content></ng-content>'
})
export class SkyContribListFilterComponent implements OnInit {
  @Input() name: string;
  @Input() label: string;
  @Input() type: string;
  @Input() view: ListViewComponent;
  @Input() defaultValue: any;
  @Input() validator: (() => boolean) = () => true;
  /* tslint:disable */
  @Input('filter') filterFunction: (item: ListItemModel, filter: any) => boolean;
  @Input('template') templateInput: TemplateRef<any>;
  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;
  /* tslint:enable */

  public ngOnInit() {
    if (this.name === undefined || this.name.length === 0) {
      throw new Error('Sky List Filter requires a name.');
    }
  }

  public get template(): TemplateRef<any> {
    return this.templates.length > 0 ? this.templates.first : this.templateInput;
  }
}
