import {
  Component, Input, ContentChildren, TemplateRef, QueryList, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sky-contrib-list-view-grid-column',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribListViewGridColumnComponent {
  @Input() public id: string;
  @Input() public heading: string;
  @Input() public description: string;
  @Input() public width: number;
  @Input() public hidden: boolean;
  @Input() public locked: boolean;
  @Input() public field: string;
  @Input() public type: string = 'string';

  /* tslint:disable */
  @Input('search') public searchFunction: (value: any, searchText: string) => boolean = this.search;
  /* tslint:enable */

  private inputTemplate: TemplateRef<any>;
  @ContentChildren(TemplateRef) private templates: QueryList<TemplateRef<any>>;
  @Input() public headingTemplate: TemplateRef<any>;
  @Input() public set template(value) { this.inputTemplate = value; }
  public get template() {
    return this.templates.length > 0 ? this.templates.first : this.inputTemplate;
  }

  private search(value: any, searchText: string): boolean {
    /* tslint:disable */
    if (value !== undefined && value !== null) {
      return value.toString().toLowerCase().indexOf(searchText) !== -1;
    }
    /* tslint:enable */

    return false;
  }
}
