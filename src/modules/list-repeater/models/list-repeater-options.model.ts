export class SkyListRepeaterOptionsModel {
  public enablePaging: boolean = true;
  public pageNumber: number = 1;
  public pageSize: number = 5;
  public maxPages: number = 5;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}
