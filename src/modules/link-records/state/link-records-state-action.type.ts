import {
  LinkRecordsMatchesLoadAction,
  LinkRecordsMatchesSetStatusAction,
  LinkRecordsMatchesSetItemAction
} from './matches/actions';
import { LinkRecordsFieldsSetFieldsAction } from './fields/actions';
import { LinkRecordsResultsLoadAction } from './results/actions';
import { LinkRecordsSelectedSetSelectedAction } from './selected/actions';

export type LinkRecordsStateAction =
  LinkRecordsMatchesLoadAction | LinkRecordsMatchesSetStatusAction |
  LinkRecordsMatchesSetItemAction |
  LinkRecordsFieldsSetFieldsAction |
  LinkRecordsResultsLoadAction |
  LinkRecordsSelectedSetSelectedAction;
