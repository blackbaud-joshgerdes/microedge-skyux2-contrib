import { Injectable } from '@angular/core';
import { StateNode } from 'microedge-rxstate/dist';
import { TreeViewStateDispatcher } from './tree-view-state.rxstate';
import { TreeViewStateModel } from './tree-view-state.model';
import { TreeViewNodesOrchestrator } from './nodes/nodes.orchestrator';

@Injectable()
export class TreeViewState extends StateNode<TreeViewStateModel> {
  constructor(dispatcher: TreeViewStateDispatcher) {
    super(new TreeViewStateModel(), dispatcher);

    this
      .register('nodes', TreeViewNodesOrchestrator)
      .begin();
  }
}
