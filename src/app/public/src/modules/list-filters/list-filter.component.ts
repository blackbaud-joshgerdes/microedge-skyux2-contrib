import {
  Component,
  Input,
  ContentChildren,
  TemplateRef,
  QueryList,
  OnInit
} from '@angular/core';
import { ListItemModel } from '../list/state/items/item.model';
import { ListViewComponent } from '../list/list-view.component';

@Component({
  selector: 'sky-contrib-list-filter',
  template: '<ng-content></ng-content>'
})
export class SkyContribListFilterComponent implements OnInit {
  private inputTemplate: TemplateRef<any>;
  @ContentChildren(TemplateRef) private templates: QueryList<TemplateRef<any>>;
  @Input() public name: string;
  @Input() public label: string;
  @Input() public type: string;
  @Input() public view: ListViewComponent;
  @Input() public defaultValue: any;
  @Input() public validator: (() => boolean) = () => true;
  @Input() public set template(value) { this.inputTemplate = value; }
  public get template() {
    return this.templates.length > 0 ? this.templates.first : this.inputTemplate;
  }

  /* tslint:disable */
  @Input('filter') filterFunction: (item: ListItemModel, filter: any) => boolean;
  /* tslint:enable */

  public ngOnInit() {
    if (this.name === undefined || this.name.length === 0) {
      throw new Error('Sky List Filter requires a name.');
    }
  }
}
