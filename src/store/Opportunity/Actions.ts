/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
//import axios from 'axios';
import {OpportunityTypes , OpportunityActions, OpportunityState, IOpportunity , IOpportunityAdd } from './Types';


export const addOpportunity : ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<IOpportunityAdd>,
  // The type for the data within the last action
  IOpportunity[],
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  IOpportunityAdd
>> = (opportunity:IOpportunity) => {
  return async (dispatch: Dispatch) => {
    const addOpportunityAction : IOpportunityAdd = {
      type: OpportunityTypes.ADD_OPPORTUNITY,
      opprtunity:opportunity
    };
    return dispatch(addOpportunityAction);
  }
    
};
