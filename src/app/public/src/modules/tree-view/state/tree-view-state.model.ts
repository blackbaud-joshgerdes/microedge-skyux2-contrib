import { AsyncList } from 'microedge-rxstate/dist';
import { TreeNodeModel } from '../tree-node.model';

export class TreeViewStateModel {
    public nodes: AsyncList<TreeNodeModel> = new AsyncList<TreeNodeModel>();
}
