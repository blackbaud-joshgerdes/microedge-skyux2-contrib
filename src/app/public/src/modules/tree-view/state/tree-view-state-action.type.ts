import {
    TreeViewNodesLoadAction,
    TreeViewNodesSetLoadingAction,
    TreeViewNodesSetNodeSelectedAction,
    TreeViewNodesSetNodesSelectedAction
} from './nodes/actions';

export type TreeViewStateAction =
    TreeViewNodesLoadAction | TreeViewNodesSetLoadingAction | TreeViewNodesSetNodeSelectedAction |
    TreeViewNodesSetNodesSelectedAction;
