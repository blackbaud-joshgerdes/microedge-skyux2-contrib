import { TreeViewStateOrchestrator } from '../tree-view-state.rxstate';
import { TreeNodeModel } from '../../tree-node.model';
import * as moment from 'moment';
import {
  TreeViewNodesLoadAction,
  TreeViewNodesSetLoadingAction,
  TreeViewNodesSetNodeSelectedAction,
  TreeViewNodesSetNodesSelectedAction
} from './actions';
import { AsyncList } from 'microedge-rxstate/dist';

export class TreeViewNodesOrchestrator extends TreeViewStateOrchestrator<AsyncList<TreeNodeModel>> {
  constructor() {
    super();
    this
      .register(TreeViewNodesLoadAction, this.load)
      .register(TreeViewNodesSetLoadingAction, this.setLoading)
      .register(TreeViewNodesSetNodeSelectedAction, this.setItemSelected)
      .register(TreeViewNodesSetNodesSelectedAction, this.setItemsSelected);
  }

  private setLoading(
    state: AsyncList<TreeNodeModel>,
    action: TreeViewNodesSetLoadingAction): AsyncList<TreeNodeModel> {
    return new AsyncList<TreeNodeModel>(state.items, state.lastUpdate, action.loading);
  }

  private load(
    state: AsyncList<TreeNodeModel>,
    action: TreeViewNodesLoadAction): AsyncList<TreeNodeModel> {
    let newNodes = action.items.map(i => new TreeNodeModel(i));
    return new AsyncList<TreeNodeModel>(
      [...state.items, ...newNodes],
      moment(),
      false
    );
  }

  private setItemSelected(
    state: AsyncList<TreeNodeModel>,
    action: TreeViewNodesSetNodeSelectedAction): AsyncList<TreeNodeModel> {
    let selectedNodes = state.items.filter(i => i.id === action.id);
    if (selectedNodes.length > 0) {
      let newNode = new TreeNodeModel(selectedNodes[0]);
      newNode.isSelected = action.selected;
      return new AsyncList<TreeNodeModel>(
        [...state.items.filter(i => i.id !== action.id), newNode],
        moment(),
        false
      );
    }

    return new AsyncList<TreeNodeModel>(state.items, state.lastUpdate, false);
  }

  private setItemsSelected(
    state: AsyncList<TreeNodeModel>,
    action: TreeViewNodesSetNodesSelectedAction): AsyncList<TreeNodeModel> {
    let selectedNodes = state.items.filter(i => action.ids.indexOf(i.id) > -1);
    let nodesToExpand: any[] = [];
    if (selectedNodes.length > 0) {
      let newNodes = selectedNodes.map(n => {
        let node = new TreeNodeModel(n);
        node.isSelected = action.selected;
        if (node.isSelected && node.parent) {
          this.getAncestorIds(node, nodesToExpand);
        }

        return node;
      });

      let expandedNodes = state.items.filter(i => nodesToExpand.indexOf(i.id) > -1);
      let newExpandedNodes: TreeNodeModel[] = [];
      if (expandedNodes.length > 0) {
        newExpandedNodes = expandedNodes.map(n => {
          let node = new TreeNodeModel(n);
          node.isExpanded = true;

          return node;
        });
      }

      return new AsyncList<TreeNodeModel>(
        [...state.items.filter(i => action.ids.indexOf(i.id) === -1
          && nodesToExpand.indexOf(i.id) === -1), ...newNodes, ...newExpandedNodes],
        moment(),
        false
      );
    }

    return new AsyncList<TreeNodeModel>(state.items, state.lastUpdate, false);
  }

  private getAncestorIds(node: TreeNodeModel, nodesToExpand: any[]) {
    if (node.parent) {
      nodesToExpand.push(node.parent.id);
      this.getAncestorIds(node.parent, nodesToExpand);
    }
  }
}
