export class TreeNodeModel {
  public id: string;
  public name: string;
  public parent: TreeNodeModel;
  public selected = false;
  public expanded = false;
  public enabled = true;
  public data: any;

  constructor(data: any = undefined) {
    if (data !== undefined) {
      this.id = data.id;
      this.name = data.name;
      this.parent = data.parent;
      this.data = data.data;

      if (data.enabled !== undefined) {
        this.enabled = data.enabled;
      }

      if (data.expanded !== undefined) {
        this.expanded = data.expanded;
      }

      if (data.selected !== undefined) {
        this.selected = data.selected;
      }
    }
  }
}
