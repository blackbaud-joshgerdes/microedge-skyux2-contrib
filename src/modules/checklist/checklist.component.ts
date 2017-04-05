import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'sky-contrib-checklist',
    templateUrl: './checklist.component.html',
    styleUrls: [
      './checklist.component.scss'
    ]
})
export class SkyChecklistComponent {
  @Input() items: Array<any> = [];
  @Input() itemsObservable: Observable<any>;
  @Input() selectedItems: Array<any> = [];
  @Input() selectedItemsObservable: Observable<Array<any>>;
  @Input() idField: string = 'id';
  @Input() labelField: string = 'name';
  @Input() descriptionField: string = 'description';
  @Output() onItemChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSelectedItemsChanged: EventEmitter<any> = new EventEmitter();
  viewData: Array<any>;
  searchText: string;

  constructor() {
  }

  get result() {
    return this.viewData.filter(i => i.checked)
      .map(i => this.items.filter(item => item[this.idField] === i[this.idField])[0]);
  }

  ngOnInit() {
    if (this.itemsObservable != null && this.selectedItemsObservable != null) {
      this.itemsObservable.subscribe(items => {
        this.items = items;
        this.updateViewData();
      });

      this.selectedItemsObservable.subscribe(selectedItems => {
        this.selectedItems = selectedItems;
        this.updateViewData();
      });
    } else {
      this.updateViewData();
    }
  }

  clearAll() {
    this.selectedItems = [];

    if (this.itemsObservable == null && this.selectedItemsObservable == null) {
      this.updateViewData();
    }

    this.onSelectedItemsChanged.emit({ selectedItems: this.selectedItems });
  }

  selectAll() {
    this.selectedItems = this.items.slice();

    if (this.itemsObservable == null && this.selectedItemsObservable == null) {
      this.updateViewData();
    }

    this.onSelectedItemsChanged.emit({ selectedItems: this.selectedItems });
  }

  itemChanged(item: any, checked: any) {
    item.checked = checked;
    this.selectedItems = this.viewData.map(x => x.checked ? x.item : null)
      .filter(x => x != null);
    this.onItemChanged.emit({ item: item });
    this.onSelectedItemsChanged.emit({ selectedItems: this.selectedItems });
  }

  updateViewData() {
    this.viewData = this.items.map(x => {
      let id = x[this.idField];

      return {
        id: id,
        label: x[this.labelField],
        description: x[this.descriptionField],
        checked: this.selectedItems.filter(y => y[this.idField] === id).length > 0,
        item: x
      };
    });
  }
}
