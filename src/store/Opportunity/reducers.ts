/**
 * Authentication State Reducer
 */

 import { Reducer } from 'redux';
 import { SaveOpportuntiesAction, OpportunityTypes, OpportunityState } from './Types';
 
 /**
  * Initial State
  */
  export const createOpportunityInitialState = (): OpportunityState => {
     return {
         opportunities: []
     }
 };
 
 const initialState = createOpportunityInitialState();
 
 /**
  * Sales Order Reducer
  * @param state auth state object
  * @param action auth actions
  */
  const opportunityReducer: Reducer<OpportunityState, SaveOpportuntiesAction> = (state = initialState, action) => {
     switch (action.type) {
         case OpportunityTypes.SAVE_LIST_OPPTY : 
                     return {
            ...state,
            opportunities: action.opportunities
          };
         default:
             return state;
     }
 };
 
 export default opportunityReducer;