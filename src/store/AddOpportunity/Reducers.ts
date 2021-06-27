/**
 * Authentication State Reducer
 */

 import { Reducer } from 'redux';
 import { AddOpportunityReduxActions , AddOpportunityState, AddOpportunityTypes} from './Types';
 
 /**
  * Initial State
  */
 export const createAddOpportunitInitialState = (): AddOpportunityState => {
     return {
         loader:false,
         opportunityDefaultParams:{},
         attributes:[]
     }
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
                 opportunityDefaultParams: {...state.opportunityDefaultParams, ...action.opportunity }
             };
         case AddOpportunityTypes.SAVE_ADD_OPPTY_ATTRIBUTE:
             return {
                 ...state,
                 attributes: action.attributes
             };
 
         default:
             return state;
     }
 };
 
 export default addOpportunityReducer;