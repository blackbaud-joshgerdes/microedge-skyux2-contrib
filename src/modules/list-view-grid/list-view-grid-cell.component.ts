import {
  Component, Input, ViewChild, ViewContainerRef, TemplateRef, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { ListItemModel } from '../list/state/items/item.model';
import { ListState } from '../list/state';
import { getData } from '../list/helpers';

@Component({
  selector: 'sky-contrib-list-view-grid-cell',
  template: '<ng-template #cell></ng-template>',
  styleUrls: ['./list-view-grid-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewGridCellComponent implements OnInit {
  @Input() item: ListItemModel;
  @Input() columnId: string;
  @Input() isSelected: boolean;
  @Input() template: TemplateRef<any>;
  @Input() fieldSelector: string;
  @ViewChild('cell', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private state: ListState) {
  }

  public ngOnInit() {
    this.container.createEmbeddedView(this.template, this);
  }

  get row() {
    return this.item.data;
  }

  get value() {
    if (this.item.data && (this.fieldSelector || this.columnId)) {
      return getData(this.item.data, this.fieldSelector || this.columnId);
    }

    return undefined;
  }
}
