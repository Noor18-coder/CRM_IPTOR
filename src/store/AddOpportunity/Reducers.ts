/**
 * Authentication State Reducer
 */

import { Reducer } from 'redux';
import { AddOpportunityReduxActions, AddOpportunityState, AddOpportunityTypes } from './Types';

/**
 * Initial State
 */
export const createAddOpportunitInitialState = (): AddOpportunityState => {
  return {
    loader: false,
    addOpptyWindowActive: false,
    opportunityDefaultParams: {},
    attributes: [],
    items: [],
    contacts: [],
    products: [],
    success: false,
    error: '',
  };
};

const initialState = createAddOpportunitInitialState();

/**
 * Sales Order Reducer
 * @param state auth state object
 * @param action auth actions
 */
const addOpportunityReducer: Reducer<AddOpportunityState, AddOpportunityReduxActions> = (state = initialState, action) => {
  switch (action.type) {
    case AddOpportunityTypes.SAVE_ADD_OPPTY_DEFAULT_FIELDS:
      return {
        ...state,
        opportunityDefaultParams: { ...state.opportunityDefaultParams, ...action.opportunity },
      };
    case AddOpportunityTypes.SAVE_ADD_OPPTY_ATTRIBUTE:
      return {
        ...state,
        attributes: action.attributes,
      };
    case AddOpportunityTypes.SET_ADD_OPPORTUNITY_LOADER:
      return {
        ...state,
        loader: action.loader,
      };
    case AddOpportunityTypes.SET_ADD_OPPORTUNITY_WINDOW:
      return {
        ...state,
        addOpptyWindowActive: action.addOpptyWindowActive,
      };
    case AddOpportunityTypes.SAVE_ADD_OPPTY_ITEMS:
      return {
        ...state,
        items: [...action.items],
      };
    case AddOpportunityTypes.SAVE_ADD_OPPTY_CONTACTS:
      return {
        ...state,
        contacts: action.contacts,
      };
    case AddOpportunityTypes.SAVE_ADD_OPPTY_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case AddOpportunityTypes.SET_ADD_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        success: action.success,
      };
    case AddOpportunityTypes.SET_ADD_OPPORTUNITY_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case AddOpportunityTypes.RESET_OPPORTUNITY_DATA:
      return {
        ...state,
        loader: false,
        addOpptyWindowActive: false,
        opportunityDefaultParams: {},
        attributes: [],
        items: [],
        contacts: [],
        products: [],
        error: '',
        success: false,
      };

    default:
      return state;
  }
};

export default addOpportunityReducer;
