/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { CurrencyInfo } from '../../helpers/Api/CurrencyInfo';
import { CountryInfo } from '../../helpers/Api/Countries';
import * as models from '../../helpers/Api/models';
import OpportunityType from '../../helpers/Api/OpportunityType';
import { StagesInfo } from '../../helpers/Api/StagesInfo';
import { AppLoadingTypes, SaveOpportunityTypes, SaveOpportunityStages, SaveOpportunityCurrencies, SaveOpportunityDefault, SaveCountryInfo } from './Types';


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

/** Action to set auth state logged in status */
export const saveDefaultOpportunity: ActionCreator<SaveOpportunityDefault> = (defaultOppInfo: models.DefaultOpportunityInfo) => {
    return {
        type: AppLoadingTypes.SAVE_OPPORTUNITY_DEFAULT,
        defaultOppInfo: defaultOppInfo
    };
};

export const saveCountryInfo: ActionCreator<SaveCountryInfo> = (countries: models.CountryInfo[]) => {
    return {
        type: AppLoadingTypes.SAVE_COUNTRY_INFO,
        countries: countries
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

export const getOppDefaults = () => {
    return async (dispatch: Dispatch) => {
        const items = await OpportunityType.getDefault();
        dispatch(saveDefaultOpportunity(items));
    }
}

export const getCountries = () => {
    return async (dispatch: Dispatch) => {
        const countries = await CountryInfo.get();
        dispatch(saveCountryInfo(countries));
    }
}