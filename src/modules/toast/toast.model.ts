export class SkyToast {
  id: number;

  constructor(
    public type: string,
    public message: string,
    public title?: string,
    public classNames?: string) {
  }
}
