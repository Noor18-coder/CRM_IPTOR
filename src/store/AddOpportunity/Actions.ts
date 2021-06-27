/**
 * Opportunity Actions and Middleware definition
 */
 import { ActionCreator, Dispatch } from 'redux';
 import { ThunkAction } from 'redux-thunk';
 import { AddOpportunityDefaultParams , UserDefinedFieldReduxParams } from '../../helpers/Api/models';
 import { SaveOpportuntyParamAction, SaveOpportuntyAddAttributeAction , AddOpportunityState, AddOpportunityTypes} from './Types';
 
 /** Action to set auth state logged in status */
 export const saveOpportunityParams : ActionCreator<SaveOpportuntyParamAction> = (opportunity:AddOpportunityDefaultParams) => {
   return {
     type: AddOpportunityTypes.SAVE_ADD_OPPTY_DEFAULT_FIELDS,
     opportunity:opportunity
   };
 };
 
 export const saveOpportunityAttributes : ActionCreator<SaveOpportuntyAddAttributeAction> = (attributes:UserDefinedFieldReduxParams[]) => {
   return {
     type: AddOpportunityTypes.SAVE_ADD_OPPTY_ATTRIBUTE,
     attributes:attributes
   };
 };
