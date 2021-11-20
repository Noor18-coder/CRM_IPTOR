/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SelectOptionMethod } from '../../components/Opportunity/Opportunities';
import { SortModel } from '../../components/Shared/Grid/Grid';
import { OpportunityFilterItem } from '../../helpers/Api/models';

import {
  OpportunityTypes,
  SaveOpportuntiesAction,
  SaveOpportunityFilterAction,
  SaveOpportunitySelectedFilterAction,
  SaveOpportunitySelectedHandlerAction,
  SaveOpportunitySortOrderAction,
  SaveOpportunitySearchTextAction,
  SaveOpportunityHandlerChangeAction,
} from './Types';

/** Action to set auth state logged in status */
export const saveOpptyList: ActionCreator<SaveOpportuntiesAction> = (opptyList) => {
  return {
    type: OpportunityTypes.SAVE_LIST_OPPTY,
    opportunities: opptyList,
  };
};

/** Action to set auth state logged in status */
export const saveOpptyFilters: ActionCreator<SaveOpportunityFilterAction> = (filter: OpportunityFilterItem[]) => {
  return {
    type: OpportunityTypes.SAVE_OPPTY_FILTERS,
    filter,
  };
};

export const saveOpptySelFilters: ActionCreator<SaveOpportunitySelectedFilterAction> = (selected: SelectOptionMethod) => {
  return {
    type: OpportunityTypes.SAVE_OPPTY_SEL_FILTERS,
    selected,
  };
};

export const saveOpptySortOrder: ActionCreator<SaveOpportunitySortOrderAction> = (sortOrder: SortModel[]) => {
  return {
    type: OpportunityTypes.SAVE_OPPTY_SORT_ORDER,
    sortOrder,
  };
};

export const saveOpptySelHandler: ActionCreator<SaveOpportunitySelectedHandlerAction> = (handler: string) => {
  return {
    type: OpportunityTypes.SAVE_OPPTY_SEL_HANDLER,
    handler,
  };
};

export const saveOpptyHandlerChange: ActionCreator<SaveOpportunityHandlerChangeAction> = (handlerChange: boolean) => {
  return {
    type: OpportunityTypes.SAVE_OPPTY_CHANGE_HANDLER,
    handlerChange,
  };
};

export const saveOpptySearchText: ActionCreator<SaveOpportunitySearchTextAction> = (searchText: string) => {
  return {
    type: OpportunityTypes.SAVE_OPPTY_SEARCH_TEXT,
    searchText,
  };
};

export const saveOpportunityFilters: ActionCreator<
  ThunkAction<
    // The type of the last action to be dispatched - will always be promise<T> for async actions
    Promise<SaveOpportunityFilterAction>,
    // The type for the data within the last action
    OpportunityFilterItem[],
    // The type of the parameter for the nested function
    null,
    // The type of the last action to be dispatched
    SaveOpportunityFilterAction
  >
> = (filters: OpportunityFilterItem[]) => {
  return async (dispatch: Dispatch) => {
    return dispatch(saveOpptyFilters(filters));
  };
};
