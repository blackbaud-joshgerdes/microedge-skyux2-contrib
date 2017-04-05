import {
  Component, Input, ContentChildren, TemplateRef, QueryList, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sky-contrib-list-view-grid-column',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewGridColumnComponent {
  @Input() id: string;
  @Input() heading: string;
  @Input() description: string;
  @Input() width: number;
  @Input() hidden: boolean;
  @Input() locked: boolean;
  @Input() field: string;
  @Input() type: string = 'string';

  /* tslint:disable */
  @Input('search') searchFunction: (value: any, searchText: string) => boolean = this.search;
  @Input('template') templateInput: TemplateRef<any>;
  /* tslint:enable */

  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;

  public get template(): TemplateRef<any> {
    return (this.templates.length > 0 ? this.templates.first : undefined) || this.templateInput;
  };

  private search(value: any, searchText: string): boolean {
    /* tslint:disable */
    if (value !== undefined && value !== null) {
      return value.toString().toLowerCase().indexOf(searchText) !== -1;
    }
    /* tslint:enable */

    return false;
  }
}
