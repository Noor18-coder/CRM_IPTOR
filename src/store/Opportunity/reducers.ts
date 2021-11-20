/**
 * Authentication State Reducer
 */

import { Reducer } from 'redux';
import { OpportunityActions, OpportunityTypes, OpportunityState } from './Types';

/**
 * Initial State
 */
export const createOpportunityInitialState = (): OpportunityState => {
  return {
    opportunities: [],
    opportunityFilters: [],
    opportunitySelectedFilters: {
      value: '',
      selectParam: '',
      handler: 'my',
    },
    opportunitySortOrder: undefined,
    opportunitySelectedHandler: 'my',
    opportunitySearchText: '',
    opportunityHandlerChange: false,
  };
};

const initialState = createOpportunityInitialState();

/**
 * Sales Order Reducer
 * @param state auth state object
 * @param action auth actions
 */
const opportunityReducer: Reducer<OpportunityState, OpportunityActions> = (state = initialState, action) => {
  switch (action.type) {
    case OpportunityTypes.SAVE_LIST_OPPTY:
      return {
        ...state,
        opportunities: [...state.opportunities, ...action.opportunities],
      };
    case OpportunityTypes.SAVE_OPPTY_FILTERS:
      return {
        ...state,
        opportunityFilters: [...state.opportunityFilters, ...action.filter],
      };
    case OpportunityTypes.SAVE_OPPTY_SEL_FILTERS:
      return {
        ...state,
        opportunitySelectedFilters: action.selected,
      };
    case OpportunityTypes.SAVE_OPPTY_SORT_ORDER:
      return {
        ...state,
        opportunitySortOrder: action.sortOrder,
      };
    case OpportunityTypes.SAVE_OPPTY_SEL_HANDLER:
      return {
        ...state,
        opportunitySelectedHandler: action.handler,
      };
    case OpportunityTypes.SAVE_OPPTY_SEARCH_TEXT:
      return {
        ...state,
        opportunitySearchText: action.searchText,
      };
    case OpportunityTypes.SAVE_OPPTY_CHANGE_HANDLER:
      return {
        ...state,
        opportunityHandlerChange: action.handlerChange,
      };
    default:
      return state;
  }
};

export default opportunityReducer;
