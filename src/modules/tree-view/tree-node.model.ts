export class TreeNodeModel {
  public id: string;
  public name: string;
  public children: TreeNodeModel[] = [];
  public parent: TreeNodeModel;
  public isSelected = false;
  public isExpanded = false;
  public data: any;

  constructor(data: any = null) {
    if (data != null) {
      this.id = data.id;
      this.name = data.name;
      this.parent = data.parent;
      this.isSelected = data.isSelected ? data.isSelected : false;
      this.isExpanded = data.isExpanded ? data.isExpanded : false;
      this.data = data.data;

      if (data.children && Array.isArray(data.children)) {
        this.children = data.children.map((c: any) => new TreeNodeModel(c));
      }
    }
  }

  public isLeaf() {
    return this.children.length === 0;
  }
}
