export class SkyListRepeaterPagingOptionsModel {
  public pageSize: number;
  public pageNumber: number;
  public maxPages: number;
  public enabled: boolean;

  constructor(options: any = {}) {
    this.pageSize = options.pageSize || 5;
    this.pageNumber = options.pageNumber || 1;
    this.maxPages = options.maxPages || 5;
    this.enabled = (options.enabled == undefined || options.enabled == null) ? true : options.enabled;
  }

  getPage(items: Array<any>) {
    let pageStart = (this.pageNumber * this.pageSize) - this.pageSize;
    return items.slice(pageStart, pageStart + this.pageSize);
  }
}
