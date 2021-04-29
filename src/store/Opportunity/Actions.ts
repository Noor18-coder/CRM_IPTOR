/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
//import axios from 'axios';
import {OpportunityTypes , OpportunityActions, OpportunityState, Opportunity , OpportunityAdd } from './Types';


export const addOpportunity : ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<OpportunityAdd>,
  // The type for the data within the last action
  Opportunity[],
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  OpportunityAdd
>> = (opportunity:Opportunity) => {
  return async (dispatch: Dispatch) => {
    const addOpportunityAction : OpportunityAdd = {
      type: OpportunityTypes.ADD_OPPORTUNITY,
      opportunity:opportunity
    };
    return dispatch(addOpportunityAction);
  }
    
};
