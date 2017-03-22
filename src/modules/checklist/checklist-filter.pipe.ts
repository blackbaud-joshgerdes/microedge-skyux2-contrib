import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class SkyChecklistDataFilterPipe implements PipeTransform {
  transform(data, searchText) {
    if (data === null || data === undefined) {
      return null;
    }

    if (searchText === null || searchText === undefined || searchText.length === 0) {
      return data;
    }

    searchText = searchText.toLowerCase();
    return data.filter(item => this.search(item, searchText, 'label') || this.search(item, searchText, 'description'));
  }

  search(item, searchText, searchField) {
    if (item[searchField]) {
      return item[searchField].toLowerCase().indexOf(searchText) !== -1;
    }

    return false;
  }
}
