export class TreeViewNodesSetNodesSelectedAction {
    constructor(
      public ids: string[],
      public selected: boolean = false,
      public refresh: boolean = true
    ) {}
}
