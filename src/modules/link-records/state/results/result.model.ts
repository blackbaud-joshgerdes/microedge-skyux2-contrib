export class LinkRecordsResultModel {
  public key: string;
  public status: string;
  public item: any;

  constructor(data: any = null) {
    if (data != null) {
      this.key = data.key;
      this.status = data.status;
      this.item = data.item;
    }
  }
}
