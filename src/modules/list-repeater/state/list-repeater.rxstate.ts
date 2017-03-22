import { Injectable } from '@angular/core';
import { StateDispatcher, StateOrchestrator } from 'microedge-rxstate/dist';
import { PagingOptionsAction } from './actions';

@Injectable()
export class SkyListRepeaterStateDispatcher extends StateDispatcher<PagingOptionsAction> {
}

export class SkyListRepeaterStateOrchestrator<T> extends StateOrchestrator<T, PagingOptionsAction> {
}
