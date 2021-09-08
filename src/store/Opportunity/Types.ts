/** Authentication Action Types */

import { Action } from 'redux';
import { OpportunityListItem, OpportunityFilterItem } from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum OpportunityTypes {
  SAVE_LIST_OPPTY = 'SAVE_LIST_OPPTY',
  SAVE_OPPTY_FILTERS = 'SAVE_OPPTY_FILTERS',
}

/** Authentication success action */
export interface SaveOpportuntiesAction extends Action<OpportunityTypes.SAVE_LIST_OPPTY> {
  opportunities: OpportunityListItem[];
}

/** Authentication success action */
export interface SaveOpportunityFilterAction extends Action<OpportunityTypes.SAVE_OPPTY_FILTERS> {
  filter: OpportunityFilterItem[];
}

export type OpportunityActions = SaveOpportuntiesAction | SaveOpportunityFilterAction;

/** Authentication state definition */
export interface OpportunityState {
  readonly opportunities: OpportunityListItem[];
  readonly opportunityFilters: OpportunityFilterItem[];
}
