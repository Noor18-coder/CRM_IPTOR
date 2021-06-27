/**
 * Opportunity Actions and Middleware definition
 */
 import { ActionCreator, Dispatch } from 'redux';
 import { ThunkAction } from 'redux-thunk';
 import { AddOpportunityDefaultParams , UserDefinedFieldReduxParams, Item } from '../../helpers/Api/models';
 import { SaveOpportuntyParamAction, SetAddOpportunityLoaderAction, SetAddOpportunityDrawerActive, RemoveOpportunityDataAction, SaveOpportuntyAddAttributeAction , SaveOpportuntyAddItemsAction, AddOpportunityState, AddOpportunityTypes} from './Types';
 
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

 export const setOpportunityLoader : ActionCreator<SetAddOpportunityLoaderAction> = (loader:boolean) => {
  return {
    type: AddOpportunityTypes.SET_ADD_OPPORTUNITY_LOADER,
    loader:loader
  };
};

export const setOpportunityWindowActive : ActionCreator<SetAddOpportunityDrawerActive> = (addOpptyWindowActive:boolean) => {
  return {
    type: AddOpportunityTypes.SET_ADD_OPPORTUNITY_WINDOW,
    addOpptyWindowActive:addOpptyWindowActive
  };
};

export const setOpportunityItems : ActionCreator<SaveOpportuntyAddItemsAction> = (items:Item[]) => {
  return {
    type: AddOpportunityTypes.SAVE_ADD_OPPTY_ITEMS,
    items:items
  };
};


export const resetOpportunityData : ActionCreator<RemoveOpportunityDataAction> = () => {
  return {
    type: AddOpportunityTypes.RESET_OPPORTUNITY_DATA
  };
};