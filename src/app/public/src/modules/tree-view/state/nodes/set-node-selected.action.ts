export class TreeViewNodesSetNodeSelectedAction {
  constructor(
    public id: string,
    public selected: boolean = false,
    public disableParents: boolean = false,
    public refresh: boolean = true
  ) {}
}
