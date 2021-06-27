/** Authentication Action Types */

import { Action } from 'redux';
import { AddOpportunityDefaultParams, UserDefinedFieldReduxParams , Item} from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum AddOpportunityTypes {
  SAVE_ADD_OPPTY_DEFAULT_FIELDS = 'SAVE_ADD_OPPTY_DEFAULT_FIELDS',
  CLEAR_ADD_DEFAULT_OBJECTS = 'CLEAR_ADD_DEFAULT_OBJECTS',
  SAVE_ADD_OPPTY_ATTRIBUTE = 'SAVE_ADD_OPPTY_ATTRIBUTE',
  SAVE_ADD_OPPTY_ITEMS = 'SAVE_ADD_OPPTY_ITEMS',
  SET_ADD_OPPORTUNITY_LOADER = 'SET_ADD_OPPORTUNITY_LOADER',
  RESET_OPPORTUNITY_DATA = 'RESET_OPPORTUNITY_DATA',
  SET_ADD_OPPORTUNITY_WINDOW = 'SET_ADD_OPPORTUNITY_WINDOW'
}
  
/** Action to save default parameters of opportunity */
export interface SaveOpportuntyParamAction extends Action<AddOpportunityTypes.SAVE_ADD_OPPTY_DEFAULT_FIELDS> {
  opportunity:AddOpportunityDefaultParams
}

/** Action to save attributes (user defined) parameters of opportunity */
export interface SaveOpportuntyAddAttributeAction extends Action<AddOpportunityTypes.SAVE_ADD_OPPTY_ATTRIBUTE> {
  attributes:UserDefinedFieldReduxParams[]
}

/** Action to save attributes (user defined) parameters of opportunity */
export interface SaveOpportuntyAddItemsAction extends Action<AddOpportunityTypes.SAVE_ADD_OPPTY_ITEMS> {
  items:Item[]
}


/** Authentication success action */
export interface RemoveOpportunityDataAction extends Action<AddOpportunityTypes.RESET_OPPORTUNITY_DATA> {}

// /** Authentication success action */
// export interface RemoveOpportunityDataAction extends Action<AddOpportunityTypes.REMOVE_OPPORTUNITY_DATA> {}


/** Authentication success action */
export interface SetAddOpportunityLoaderAction extends Action<AddOpportunityTypes.SET_ADD_OPPORTUNITY_LOADER> {
  loader:boolean
}

/** Authentication success action */
export interface SetAddOpportunityDrawerActive extends Action<AddOpportunityTypes.SET_ADD_OPPORTUNITY_WINDOW> {
  addOpptyWindowActive:boolean
}

export type AddOpportunityReduxActions = SaveOpportuntyParamAction |
                                  SaveOpportuntyAddAttributeAction |
                                  SetAddOpportunityLoaderAction | 
                                  SetAddOpportunityDrawerActive |
                                  SaveOpportuntyAddItemsAction | 
                                  RemoveOpportunityDataAction;

/** Authentication state definition */
export interface AddOpportunityState {
  readonly addOpptyWindowActive: boolean;
  readonly loader: boolean,
  readonly opportunityDefaultParams: AddOpportunityDefaultParams,
  readonly attributes:UserDefinedFieldReduxParams[],
  readonly items: Item[]

}

