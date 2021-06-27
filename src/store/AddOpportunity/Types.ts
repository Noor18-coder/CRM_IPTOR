/** Authentication Action Types */

import { Action } from 'redux';
import { AddOpportunityDefaultParams, UserDefinedFieldReduxParams } from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum AddOpportunityTypes {
  SAVE_ADD_OPPTY_DEFAULT_FIELDS = 'SAVE_ADD_OPPTY_DEFAULT_FIELDS',
  CLEAR_ADD_DEFAULT_OBJECTS = 'CLEAR_ADD_DEFAULT_OBJECTS',
  SAVE_ADD_OPPTY_ATTRIBUTE = 'SAVE_ADD_OPPTY_ATTRIBUTE'
}
  
/** Authentication success action */
export interface SaveOpportuntyParamAction extends Action<AddOpportunityTypes.SAVE_ADD_OPPTY_DEFAULT_FIELDS> {
  opportunity:AddOpportunityDefaultParams
}

/** Authentication success action */
export interface SaveOpportuntyAddAttributeAction extends Action<AddOpportunityTypes.SAVE_ADD_OPPTY_ATTRIBUTE> {
  attributes:UserDefinedFieldReduxParams[]
}

export type AddOpportunityReduxActions = SaveOpportuntyParamAction | SaveOpportuntyAddAttributeAction;

/** Authentication state definition */
export interface AddOpportunityState {
  readonly loader:boolean,
  readonly opportunityDefaultParams: AddOpportunityDefaultParams,
  readonly attributes:UserDefinedFieldReduxParams[]
}

