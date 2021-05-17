/** Authentication Action Types */

import { Action } from 'redux';
import { OpportunityListItem } from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum OpportunityTypes {
  SAVE_LIST_OPPTY = 'SAVE_LIST_OPPTY'
}
  
/** Authentication success action */
export interface SaveOpportuntiesAction extends Action<OpportunityTypes.SAVE_LIST_OPPTY> {
  opportunities:OpportunityListItem[]
}
/** Authentication state definition */
export interface OpportunityState {
  readonly opportunities:OpportunityListItem[] 
}

