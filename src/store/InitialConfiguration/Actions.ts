/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { CurrencyInfo } from '../../helpers/Api/CurrencyInfo';
import * as models from '../../helpers/Api/models';
import OpportunityType from '../../helpers/Api/OpportunityType';
import { StagesInfo } from '../../helpers/Api/StagesInfo';
import { AppLoadingTypes , SaveOpportunityTypes, SaveOpportunityStages, SaveOpportunityCurrencies } from './Types';


/** Action to set auth state logged in status */
export const saveOpptyTypes: ActionCreator<SaveOpportunityTypes> = (opportunityTypes: models.OpportunityType[]) => {
  return {
    type: AppLoadingTypes.SAVE_OPPORTUNITY_TYPES,
    opportunityTypes: opportunityTypes
  };
};

/** Action to set auth state logged in status */
export const saveOpptyStages: ActionCreator<SaveOpportunityStages> = (stages: models.StageInfo[]) => {
  return {
    type: AppLoadingTypes.SAVE_OPPORTUNITY_STAGES,
    stages: stages
  };
};

/** Action to set auth state logged in status */
export const saveCurrencies: ActionCreator<SaveOpportunityCurrencies> = (currencies: models.CurrencyItem[]) => {
  return {
    type: AppLoadingTypes.SAVE_CURRENCIES,
    currencies: currencies
  };
};



export const getOpportunityTypes = () => {
  return async (dispatch: Dispatch) => {
    const opptyTypes = await OpportunityType.get();
    return dispatch(saveOpptyTypes(opptyTypes));
  }
}

export const saveOpportunityStages = () => {
  return async (dispatch: Dispatch) => {
    const stageInfo = await StagesInfo.get();
    dispatch(saveOpptyStages(stageInfo.items));
  }
};

export const getCurrencies = () => {
  return async (dispatch: Dispatch) => {
    const items = await CurrencyInfo.get();
    dispatch(saveCurrencies(items));
  }
}