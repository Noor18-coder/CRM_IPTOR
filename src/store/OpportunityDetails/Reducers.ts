/**
 * Authentication State Reducer
 */

import { Reducer } from 'redux';
import { OpportunityDetailsReduxActions, OpportunityDetailsState, OpportunityDetailsTypes } from './Types';

/**
 * Initial State
 */
export const createOpportunityDetailsInitialState = (): OpportunityDetailsState => {
  return {
    opportunityDefaultParams: {
      opportunityId: '',
      desc: '',
      customer: '',
      customerName: '',
      handler: '',
      area: '',
      stage: '',
      currency: '',
      endDate: '',
      oppRecordType: '',
    },
    attributes: [],
    editOportunity: {
      open: false,
    },
    loader: false,
  };
};

const initialState = createOpportunityDetailsInitialState();

/**
 * Sales Order Reducer
 * @param state auth state object
 * @param action auth actions
 */
const opportuntyDetailsReducer: Reducer<OpportunityDetailsState, OpportunityDetailsReduxActions> = (state = initialState, action) => {
  switch (action.type) {
    case OpportunityDetailsTypes.SAVE_OPPORTUNITY_DETAILS:
      return {
        ...state,
        opportunityDefaultParams: { ...state.opportunityDefaultParams, ...action.opportunity },
      };
    case OpportunityDetailsTypes.SAVE_OPPORTUNITY_ATTRIBUTE_VALUES:
      return {
        ...state,
        attributes: action.attributes,
      };
    case OpportunityDetailsTypes.OPEN_FOR_EDIT:
      return {
        ...state,
        editOportunity: { ...state.editOportunity, ...action.options },
      };

    case OpportunityDetailsTypes.EDIT_OPPORTUNITY_STATUS:
      return {
        ...state,
        editOportunity: { ...state.editOportunity, ...action.success },
      };

    case OpportunityDetailsTypes.SET_EDIT_OPPORTUNITY_ERROR:
      return {
        ...state,
        editOportunity: { ...state.editOportunity, error: action.error },
      };
    case OpportunityDetailsTypes.SET_OPPTY_DETAILS_LOADING_MASK:
      return {
        ...state,
        loader: true,
      };
    case OpportunityDetailsTypes.REMOVE_OPPTY_DETAILS_LOADING_MASK:
      return {
        ...state,
        loader: false,
      };
    case OpportunityDetailsTypes.SET_OPPORTUNITY_APPROVAL_STATUS:
      return {
        ...state,
        editOportunity: { ...state.editOportunity, approvalSubmitMessage: action.message },
      };

    default:
      return state;
  }
};

export default opportuntyDetailsReducer;
