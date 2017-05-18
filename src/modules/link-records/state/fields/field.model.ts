export class LinkRecordsFieldModel {
  public key: string;
  public currentValue: any;
  public newValue: any;

  constructor(data: any = null) {
    if (data != null) {
      this.key = data.key;
      this.currentValue = data.currentValue;
      this.newValue = data.newValue;
    }
  }
}
