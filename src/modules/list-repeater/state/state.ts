import { Injectable } from '@angular/core';
import { SkyListRepeaterStateDispatcher } from './list-repeater.rxstate';
import { StateNode } from 'microedge-rxstate/dist';
import { SkyListRepeaterStateModel } from './state.model';

// state helper functions
import { PagingOptionsOrchestrator } from './paging-options';

@Injectable()
export class SkyListRepeaterState extends StateNode<SkyListRepeaterStateModel> {
  constructor(initialState: SkyListRepeaterStateModel, dispatcher: SkyListRepeaterStateDispatcher) {
    super(initialState, dispatcher);

    this
      .register('pagingOptions', PagingOptionsOrchestrator)
      .begin();
  }
}
