/**
 * Authentication State Reducer
 */

import { Reducer } from 'redux';
import { AppLoadingTypes, AppLoadingActions, InitialConfigState } from './Types';

/**
 * Initial State
 */
export const createInitalConfigDefaultState = ():InitialConfigState => {
    return {
        crmOpportunityTypes: [],
        crmOpportunityStage: []
    }
};

const initialState = createInitalConfigDefaultState();

/**
 * Sales Order Reducer
 * @param state auth state object
 * @param action auth actions
 */
const configReducer: Reducer<InitialConfigState, AppLoadingActions> = (state = initialState, action) => {
    switch (action.type) {
        case AppLoadingTypes.SAVE_OPPORTUNITY_TYPES:
            return {
                ...state,
                crmOpportunityTypes: action.opportunityTypes
            };
        case AppLoadingTypes.SAVE_OPPORTUNITY_STAGES:
            return {
                ...state,
                crmOpportunityStage: action.stages
            };
        default:
            return state;
    }
};

export default configReducer;