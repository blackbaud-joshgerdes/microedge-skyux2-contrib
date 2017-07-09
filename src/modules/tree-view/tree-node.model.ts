export class TreeNodeModel {
  public id: string;
  public name: string;
  public children: TreeNodeModel[] = [];
  public parent: TreeNodeModel;
  public selected = false;
  public expanded = false;
  public enabled = true;
  public data: any;

  constructor(data: any = null) {
    if (data != null) {
      this.id = data.id;
      this.name = data.name;
      this.parent = data.parent;
      this.data = data.data;

      if (data.enabled != null) {
        this.enabled = data.enabled;
      }

      if (data.expanded != null) {
        this.expanded = data.expanded;
      }

      if (data.selected != null) {
        this.selected = data.selected;
      }

      if (data.children && Array.isArray(data.children)) {
        this.children = data.children.map((c: any) => new TreeNodeModel(c));
      }
    }
  }

  public isLeaf() {
    return this.children.length === 0;
  }
}
