import { LinkRecordsMatchItemModel } from './link-records-match-item.model';

export class LinkRecordsItemModel {
  public key: string;
  public status: string;
  public item: any;
  public match: LinkRecordsMatchItemModel = new LinkRecordsMatchItemModel();

  constructor(data: any = null) {
    if (data != null) {
      this.key = data.key;
      this.status = data.status;
      this.item = data.item;
      this.match = data.match;
    }
  }
}
