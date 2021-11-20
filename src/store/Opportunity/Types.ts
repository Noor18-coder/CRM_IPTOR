/** Authentication Action Types */

import { Action } from 'redux';
import { SelectOptionMethod } from '../../components/Opportunity/Opportunities';
import { SortModel } from '../../components/Shared/Grid/Grid';
import { OpportunityListItem, OpportunityFilterItem } from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum OpportunityTypes {
  SAVE_LIST_OPPTY = 'SAVE_LIST_OPPTY',
  SAVE_OPPTY_FILTERS = 'SAVE_OPPTY_FILTERS',
  SAVE_OPPTY_SEL_FILTERS = 'SAVE_OPPTY_SEL_FILTERS',
  SAVE_OPPTY_SEL_HANDLER = 'SAVE_OPPTY_SEL_HANDLER',
  SAVE_OPPTY_SORT_ORDER = 'SAVE_OPPTY_SORT_ORDER',
  SAVE_OPPTY_SEARCH_TEXT = 'SAVE_OPPTY_SEARCH_TEXT',
  SAVE_OPPTY_CHANGE_HANDLER = 'SAVE_OPPTY_CHANGE_HANDLER',
}

/** Authentication success action */
export interface SaveOpportuntiesAction extends Action<OpportunityTypes.SAVE_LIST_OPPTY> {
  opportunities: OpportunityListItem[];
}

/** Authentication success action */
export interface SaveOpportunityFilterAction extends Action<OpportunityTypes.SAVE_OPPTY_FILTERS> {
  filter: OpportunityFilterItem[];
}

export interface SaveOpportunitySelectedFilterAction extends Action<OpportunityTypes.SAVE_OPPTY_SEL_FILTERS> {
  selected: SelectOptionMethod;
}

export interface SaveOpportunitySelectedHandlerAction extends Action<OpportunityTypes.SAVE_OPPTY_SEL_HANDLER> {
  handler: string;
}

export interface SaveOpportunityHandlerChangeAction extends Action<OpportunityTypes.SAVE_OPPTY_CHANGE_HANDLER> {
  handlerChange: boolean;
}

export interface SaveOpportunitySortOrderAction extends Action<OpportunityTypes.SAVE_OPPTY_SORT_ORDER> {
  sortOrder: SortModel[];
}

export interface SaveOpportunitySearchTextAction extends Action<OpportunityTypes.SAVE_OPPTY_SEARCH_TEXT> {
  searchText: string;
}

export type OpportunityActions =
  | SaveOpportuntiesAction
  | SaveOpportunityFilterAction
  | SaveOpportunitySelectedFilterAction
  | SaveOpportunitySelectedHandlerAction
  | SaveOpportunitySortOrderAction
  | SaveOpportunitySearchTextAction
  | SaveOpportunityHandlerChangeAction;

/** Authentication state definition */
export interface OpportunityState {
  readonly opportunities: OpportunityListItem[];
  readonly opportunityFilters: OpportunityFilterItem[];
  readonly opportunitySelectedFilters: SelectOptionMethod;
  readonly opportunitySortOrder?: SortModel[];
  readonly opportunitySelectedHandler: string;
  readonly opportunitySearchText: string;
  readonly opportunityHandlerChange: boolean;
}
