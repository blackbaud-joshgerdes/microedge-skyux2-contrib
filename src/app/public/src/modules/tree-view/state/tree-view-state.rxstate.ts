import { Injectable } from '@angular/core';
import { StateDispatcher, StateOrchestrator } from 'microedge-rxstate/dist';
import { TreeViewStateAction } from './tree-view-state-action.type';

@Injectable()
export class TreeViewStateDispatcher extends StateDispatcher<TreeViewStateAction> {
}

export class TreeViewStateOrchestrator<T> extends StateOrchestrator<T, TreeViewStateAction> {
}
