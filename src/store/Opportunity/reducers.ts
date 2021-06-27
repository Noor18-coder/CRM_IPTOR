/**
 * Authentication State Reducer
 */

 import { Reducer } from 'redux';
 import { OpportunityActions , OpportunityTypes, OpportunityState } from './Types';
 
 /**
  * Initial State
  */
  export const createOpportunityInitialState = (): OpportunityState => {
     return {
         opportunities: [],
         opportunityFilters: new Set(['all'])
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
         case OpportunityTypes.SAVE_LIST_OPPTY : 
                     return {
            ...state,
            opportunities: [...state.opportunities, ...action.opportunities]
          }; 
          case OpportunityTypes.SAVE_OPPTY_FILTERS : 
            return {
                ...state,
                opportunityFilters: state.opportunityFilters.add(action.filter)
            };
         default:
             return state;
     }
 };
 
 export default opportunityReducer;