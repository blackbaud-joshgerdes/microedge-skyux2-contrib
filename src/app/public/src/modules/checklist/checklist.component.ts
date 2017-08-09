import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SkyContribConsoleService } from '../shared';

@Component({
    selector: 'sky-contrib-checklist',
    templateUrl: './checklist.component.html',
    styleUrls: ['./checklist.component.scss']
})
export class SkyContribChecklistComponent implements OnInit {
  @Input() public items: Array<any> = [];
  @Input() public itemsObservable: Observable<any>;
  @Input() public selectedItems: Array<any> = [];
  @Input() public selectedItemsObservable: Observable<Array<any>>;
  @Input() public idField: string = 'id';
  @Input() public labelField: string = 'name';
  @Input() public descriptionField: string = 'description';
  @Output() public onItemChanged: EventEmitter<any> = new EventEmitter();
  @Output() public onSelectedItemsChanged: EventEmitter<any> = new EventEmitter();
  public viewData: Array<any>;
  public searchText: string;

  constructor(private consoleService: SkyContribConsoleService) {
    this.consoleService.deprecated('sky-contrib-checklist', 'sky-contrib-list-view-checklist');
  }

  get result() {
    return this.viewData.filter(i => i.checked)
      .map(i => this.items.filter(item => item[this.idField] === i[this.idField])[0]);
  }

  public ngOnInit() {
    if (this.itemsObservable && this.selectedItemsObservable) {
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

  public clearAll() {
    this.selectedItems = [];

    if (this.itemsObservable === undefined && this.selectedItemsObservable === undefined) {
      this.updateViewData();
    }

    this.onSelectedItemsChanged.emit({ selectedItems: this.selectedItems });
  }

  public selectAll() {
    this.selectedItems = this.items.slice();

    if (this.itemsObservable === undefined && this.selectedItemsObservable === undefined) {
      this.updateViewData();
    }

    this.onSelectedItemsChanged.emit({ selectedItems: this.selectedItems });
  }

  public itemChanged(item: any, checked: any) {
    item.checked = checked;
    this.selectedItems = this.viewData.map(x => x.checked ? x.item : undefined)
      .filter(x => x !== undefined);
    this.onItemChanged.emit({ item: item });
    this.onSelectedItemsChanged.emit({ selectedItems: this.selectedItems });
  }

  public updateViewData() {
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
