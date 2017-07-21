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
      let multiAction = {
        ids: [action.id],
        selected: action.selected,
        disableParents: action.disableParents,
        refresh: action.refresh
      };

      return this.setItemsSelected(state, multiAction);
  }

  private setItemsSelected(
    state: AsyncList<TreeNodeModel>,
    action: TreeViewNodesSetNodesSelectedAction): AsyncList<TreeNodeModel> {
    if (action.ids && action.ids.length > 0) {
      let nodesToExpand = new Array<string>();
      let nodesToDisable = new Array<string>();
      let nodesToEnable = new Array<string>();

      let newNodes = state.items.map(n => {
        let newNode = new TreeNodeModel(n);
        if (action.ids.indexOf(newNode.id) > -1) {
          let ancestorIds = this.getAncestorIds(newNode.id, state.items);
          newNode.selected = action.selected;

          if (newNode.selected) {
            nodesToExpand = nodesToExpand.concat(ancestorIds);
          }

          if (action.disableParents) {
            if (newNode.selected) {
              nodesToDisable = nodesToDisable.concat(ancestorIds);
            } else {
              nodesToEnable = nodesToEnable.concat(ancestorIds);
            }
          }
        }

        return newNode;
      });

      nodesToExpand = nodesToExpand.filter((val, i, self) => self.indexOf(val) === i);
      nodesToDisable = nodesToDisable.filter((val, i, self) => self.indexOf(val) === i);
      nodesToEnable = nodesToEnable.filter((val, i, self) => self.indexOf(val) === i);

      for (let i = 0; i < newNodes.length; i++) {
        if (nodesToExpand.indexOf(newNodes[i].id) > -1) {
          newNodes[i].expanded = true;
        }

        if (nodesToDisable.indexOf(newNodes[i].id) > -1) {
          newNodes[i].enabled = false;
        }

        if (nodesToEnable.indexOf(newNodes[i].id) > -1 && !this.isDescendantsSelected(newNodes[i].id, newNodes)) {
          newNodes[i].enabled = true;
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

  private getAncestorIds(nodeId: string, nodes: Array<TreeNodeModel>) {
    let result = new Array<string>();
    if (nodeId && nodeId.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === nodeId) {
          if (nodes[i].parent) {
            result.push(nodes[i].parent.id);
            result = result.concat(this.getAncestorIds(nodes[i].parent.id, nodes));
          }

          break;
        }
      }
    }

    return result;
  }

  private isDescendantsSelected(nodeId: string, nodes: Array<TreeNodeModel>): boolean {
    let result: boolean = false;
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      if (node.parent && node.parent.id === nodeId) {
        result = (node.selected) ? true : this.isDescendantsSelected(node.id, nodes);
        if (result) {
          break;
        }
      }
    }

    return result;
  }
}
