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
    if (action.id) {
      let nodesToExpand = new Array<string>();
      let newNodes = state.items.map(n => {
        let newNode = new TreeNodeModel(n);
        if (newNode.id === action.id) {
          newNode.selected = action.selected;

          if (newNode.selected) {
            this.getAncestorIds(newNode, nodesToExpand);
          }
        }

        return newNode;
      });

      if (nodesToExpand.length > 0) {
        for (let i = 0; i < newNodes.length; i++) {
          let node = newNodes[i];
          let indx = nodesToExpand.indexOf(node.id);
          if (indx > -1) {
            node.expanded = true;
            nodesToExpand.splice(indx, 1);

            if (nodesToExpand.length === 0) {
              break;
            }
          }
        }
      }

      return new AsyncList<TreeNodeModel>(
        newNodes,
        moment(),
        false
      );
    }

    return new AsyncList<TreeNodeModel>(state.items, state.lastUpdate, false);
  }

  private setItemsSelected(
    state: AsyncList<TreeNodeModel>,
    action: TreeViewNodesSetNodesSelectedAction): AsyncList<TreeNodeModel> {
    if (action.ids && action.ids.length > 0) {
      let nodesToExpand = new Array<string>();
      let newNodes = state.items.map(n => {
        let newNode = new TreeNodeModel(n);
        if (action.ids.indexOf(newNode.id) > -1) {
          newNode.selected = action.selected;

          if (newNode.selected) {
            this.getAncestorIds(newNode, nodesToExpand);
          }
        }

        return newNode;
      });

      if (nodesToExpand.length > 0) {
        for (let i = 0; i < newNodes.length; i++) {
          let node = newNodes[i];
          let indx = nodesToExpand.indexOf(node.id);
          if (indx > -1) {
            node.expanded = true;
            nodesToExpand.splice(indx, 1);

            if (nodesToExpand.length === 0) {
              break;
            }
          }
        }
      }

      return new AsyncList<TreeNodeModel>(
        newNodes,
        moment(),
        false
      );
    }

    return new AsyncList<TreeNodeModel>(state.items, state.lastUpdate, false);
  }

  private getAncestorIds(node: TreeNodeModel, nodesToExpand: Array<string>) {
    if (node.parent) {
      if (nodesToExpand.indexOf(node.parent.id) === -1) {
        nodesToExpand.push(node.parent.id);
      }

      this.getAncestorIds(node.parent, nodesToExpand);
    }
  }
}
