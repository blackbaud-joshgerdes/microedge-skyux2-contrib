export class SkyContribToast {
  id: number;

  constructor(
    public type: string,
    public message: string,
    public title?: string,
    public autoDismiss?: boolean,
    public classNames?: string) {
  }
}
