/** Authentication Action Types */

import { Action } from 'redux';
import * as models from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum OpportunityDetailsTypes {
  SAVE_OPPORTUNITY_DETAILS = 'SAVE_OPPORTUNITY_DETAILS',
  SAVE_OPPORTUNITY_ATTRIBUTE_VALUES = 'SAVE_OPPORTUNITY_ATTRIBUTE_VALUES',
  OPEN_FOR_EDIT = 'OPEN_FOR_EDIT',
  OPPORTUNITY_DETAILS_SAVED = 'OPPORTUNITY_DETAILS_SAVED'
}
  
/** Action to save default parameters of opportunity */
export interface SaveOpportunityDetailsAction extends Action<OpportunityDetailsTypes.SAVE_OPPORTUNITY_DETAILS> {
  opportunity:models.OpportunityDetailsDefault
}

/** Action to save attributes (user defined) parameters of opportunity */
export interface SaveOpportunityAttributesAction extends Action<OpportunityDetailsTypes.SAVE_OPPORTUNITY_ATTRIBUTE_VALUES> {
  attributes: models.AttributeValueObject[]
}

/** Action to save attributes (user defined) parameters of opportunity */
export interface OpenOpportunityEditFormAction extends Action<OpportunityDetailsTypes.OPEN_FOR_EDIT> {
  options: models.OpportunityEditOptions
}

export type OpportunityDetailsReduxActions = SaveOpportunityDetailsAction |
                                            SaveOpportunityAttributesAction |
                                            OpenOpportunityEditFormAction ;

/** Authentication state definition */
export interface OpportunityDetailsState {
  readonly opportunityDefaultParams: models.OpportunityDetailsDefault,
  readonly attributes: models.AttributeValueObject[],
  readonly editOportunity : models.OpportunityEditOptions
}

