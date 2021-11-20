/**
 * Authentication State Reducer
 */

import { Reducer } from 'redux';
import { BusinessPartnerActions, BusinessPartnerTypes, BusinessPartnerState } from './Types';

/**
 * Initial State
 */
export const createBusinessPartnerInitialState = (): BusinessPartnerState => {
  return {
    businesspartners: [],
    businessPartnerFilters: [],
    businessPartnerSelectedFilter: undefined,
    businessPartnerSearchText: '',
  };
};

const initialState = createBusinessPartnerInitialState();

/**
 * Sales Order Reducer
 * @param state auth state object
 * @param action auth actions
 */
const businessPartnerReducer: Reducer<BusinessPartnerState, BusinessPartnerActions> = (state = initialState, action) => {
  switch (action.type) {
    case BusinessPartnerTypes.SAVE_LIST_BUSINESSPARTNER:
      return {
        ...state,
        businesspartners: [...state.businesspartners, ...action.businesspartners],
      };
    case BusinessPartnerTypes.SAVE_BUSINESSPARTNER_FILTERS:
      return {
        ...state,
        businessPartnerFilters: [...state.businessPartnerFilters, ...action.filter],
      };
    case BusinessPartnerTypes.SAVE_BUSINESSPARTNER_SELECTED_FILTER:
      return {
        ...state,
        businessPartnerSelectedFilter: action.selected,
      };
    case BusinessPartnerTypes.SAVE_BUSINESSPARTNER_SEARCH_TEXT:
      return {
        ...state,
        businessPartnerSearchText: action.searchText,
      };
    default:
      return state;
  }
};

export default businessPartnerReducer;
