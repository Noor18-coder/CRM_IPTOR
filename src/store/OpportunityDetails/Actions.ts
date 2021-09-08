/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator } from 'redux';
import * as models from '../../helpers/Api/models';
import { OpportunityDetailsTypes, SaveOpportunityDetailsAction, SaveOpportunityAttributesAction, OpenOpportunityEditFormAction } from './Types';

/** Action to set auth state logged in status */
export const saveOpportunityDetails: ActionCreator<SaveOpportunityDetailsAction> = (opportunity: models.OpportunityDetailsDefault) => {
  return {
    type: OpportunityDetailsTypes.SAVE_OPPORTUNITY_DETAILS,
    opportunity,
  };
};

export const saveOpportunityAttributes: ActionCreator<SaveOpportunityAttributesAction> = (attributes: models.AttributeValueObject[]) => {
  return {
    type: OpportunityDetailsTypes.SAVE_OPPORTUNITY_ATTRIBUTE_VALUES,
    attributes,
  };
};

export const openOpportunityForm: ActionCreator<OpenOpportunityEditFormAction> = (options: models.OpportunityEditOptions) => {
  return {
    type: OpportunityDetailsTypes.OPEN_FOR_EDIT,
    options,
  };
};
