import { LinkRecordsStateOrchestrator } from '../link-records-state.rxstate';
import { AsyncItem } from 'microedge-rxstate/dist';
import * as moment from 'moment';

import { LinkRecordsFieldModel } from './field.model';
import { LinkRecordsFieldsSetFieldsAction } from './actions';

export class LinkRecordsFieldsOrchestrator
  extends LinkRecordsStateOrchestrator<AsyncItem<{[key: string]:
    Array<LinkRecordsFieldModel>}>> {
  constructor() {
    super();

    this
      .register(LinkRecordsFieldsSetFieldsAction, this.setFields);
  }

  private setFields(
    state: AsyncItem<{[key: string]: Array<LinkRecordsFieldModel>}>,
    action: LinkRecordsFieldsSetFieldsAction):
      AsyncItem<{[key: string]: Array<LinkRecordsFieldModel>}> {
      let newStateItem = Object.assign({}, state.item);
      let fields = (newStateItem[action.key]) ? newStateItem[action.key] : [];
      let newFields = Object.assign(fields, action.fields).filter(f => f);
      newStateItem[action.key] = newFields;

      return new AsyncItem<{[key: string]: Array<LinkRecordsFieldModel>}>(
        newStateItem, moment(), state.loading);
  }
}
