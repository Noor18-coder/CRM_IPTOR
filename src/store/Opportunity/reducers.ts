/**
 * Authentication State Reducer
 */

import { Reducer } from 'redux';
import { IOpportunity, OpportunityActions, OpportunityTypes, OpportunityState } from './Types';

/**
 * Initial State
 */
const initialState: OpportunityState = {
    opportunities: [
        {
            id: '1234569',
            company: 'Astra Zenecaa',
            dealSize: '$22K',
            status: 'Closed-Won'
        },
        {
            id: '1234568',
            company: 'fIZER',
            dealSize: '$25K',
            status: 'Closed-Won'
        },
        {
            id: '1234567',
            company: 'Serum',
            dealSize: '$32K',
            status: 'Closed-Lost'
        },
    ],
};

/**
 * Sales Order Reducer
 * @param state auth state object
 * @param action auth actions
 */
 const opportunityReducer: Reducer<OpportunityState, OpportunityActions> = (state = initialState, action) => {
    switch (action.type) {
        case OpportunityTypes.ADD_OPPORTUNITY : 
            const newOppty: IOpportunity = {
                    id:action.opprtunity.id,
                    company: action.opprtunity.company,
                    dealSize: action.opprtunity.dealSize,
                    status: action.opprtunity.status
                }
                console.log("PPP", newOppty);
                return {
                    ...state,
                    opportunities: state.opportunities.concat(newOppty),
                }
        default:
            return state;
    }
};

export default opportunityReducer;