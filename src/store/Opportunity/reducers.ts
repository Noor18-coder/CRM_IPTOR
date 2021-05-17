/**
 * Authentication State Reducer
 */

 import { Reducer } from 'redux';
 import { Opportunity, OpportunityActions, OpportunityTypes, OpportunityState } from './Types';
 
 /**
  * Initial State
  */
  export const createOpportunityInitialState = (): OpportunityState => {
     return {
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
     }
 };
 
 const initialState = createOpportunityInitialState();
 
 /**
  * Sales Order Reducer
  * @param state auth state object
  * @param action auth actions
  */
  const opportunityReducer: Reducer<OpportunityState, OpportunityActions> = (state = initialState, action) => {
     switch (action.type) {
         case OpportunityTypes.ADD_OPPORTUNITY : 
             const newOppty: Opportunity = {
                     id:action.opportunity.id,
                     company: action.opportunity.company,
                     dealSize: action.opportunity.dealSize,
                     status: action.opportunity.status
                 }
                 return {
                     ...state,
                     opportunities: state.opportunities.concat(newOppty),
                 }
         default:
             return state;
     }
 };
 
 export default opportunityReducer;