/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { OpportunityListItem } from '../../helpers/Api/models';
import OpportunityList from '../../helpers/Api/OpportunityList'; 
import {OpportunityTypes , SaveOpportuntiesAction, SaveOpportunityFilterAction } from './Types';

/** Action to set auth state logged in status */
export const saveOpptyList: ActionCreator<SaveOpportuntiesAction> = (opptyList) => {
  return {
    type: OpportunityTypes.SAVE_LIST_OPPTY,
    opportunities:opptyList
  };
};

/** Action to set auth state logged in status */
export const saveOpptyFilters: ActionCreator<SaveOpportunityFilterAction> = (filter:string) => {
  return {
    type: OpportunityTypes.SAVE_OPPTY_FILTERS,
    filter:filter
  };
};


export const getOpportunities : ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<SaveOpportuntiesAction>,
  // The type for the data within the last action
  OpportunityListItem[],
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  SaveOpportuntiesAction
>> = (handler:string, freeTextSearch: string, limit?: number, offset?: number) => {
  return async (dispatch: Dispatch) => {
   const opptyList = await OpportunityList.get(handler, freeTextSearch, limit , offset); 
    return dispatch(saveOpptyList(opptyList));
  }
    
};
