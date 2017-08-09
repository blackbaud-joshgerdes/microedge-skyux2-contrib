import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'skyContribFilter' })
export class SkyChecklistDataFilterPipe implements PipeTransform {
  public transform(data: any, searchText: any) {
    if (data === undefined || data === undefined) {
      return undefined;
    }

    if (searchText === undefined || searchText === undefined || searchText.length === 0) {
      return data;
    }

    searchText = searchText.toLowerCase();
    return data.filter((item: any) => this.search(item, searchText, 'label')
      || this.search(item, searchText, 'description'));
  }

  public search(item: any, searchText: any, searchField: any) {
    if (item[searchField]) {
      return item[searchField].toLowerCase().indexOf(searchText) !== -1;
    }

    return false;
  }
}
