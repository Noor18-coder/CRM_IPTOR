/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as models from '../../helpers/Api/models';
import {
    AppLoadingTypes, SaveOpportunityDefault, SaveCountryInfo, SaveAreaInfo, SaveOpportunityContactRoles,
    SaveForecastInfo, SaveIndustryInfo, SaveProductInfo
} from './Types';

import * as actionTypes from './Types';
import { AppState } from '../store';
import { OpportunityType, StagesInfo, CurrencyInfo, Attributes, CountryInfo, ForeCastsInfo } from '../../helpers/Api';

/** Action to set auth state logged in status */
export const saveOpptyTypes: ActionCreator<actionTypes.SaveOpportunityTypes> = (opportunityTypes: models.OpportunityType[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SAVE_OPPORTUNITY_TYPES,
    opportunityTypes: opportunityTypes
  };
};

/** Action to set auth state logged in status */
export const saveOpptyStages: ActionCreator<actionTypes.SaveOpportunityStages> = (stages: models.StageInfo[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SAVE_OPPORTUNITY_STAGES,
    stages: stages
  };
};

/** Action to set auth state logged in status */
export const saveCurrencies: ActionCreator<actionTypes.SaveOpportunityCurrencies> = (currencies: models.CurrencyItem[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SAVE_CURRENCIES,
    currencies: currencies
  };
};

/** Action to set auth state logged in status */
export const saveOpportunityAttributes: ActionCreator<actionTypes.SaveOpportunityAttributes> = (attributes: models.AttributeField[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SAVE_OPPORTUNITY_ATTRIBUTES,
    attributes: attributes
  };
};

/** Action to set auth state logged in status */
export const saveCustomerAttributes: ActionCreator<actionTypes.SaveCustomerAttributes> = (attributes: models.AttributeField[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SAVE_CUSTOMER_ATTRIBUTES,
    attributes: attributes
  };
};

/** Action to set auth state logged in status */
export const setLoadingMask: ActionCreator<actionTypes.SetLoadingMaskAction> = (currencies: models.CurrencyItem[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SET_LOADING_MASK
  };
};

/** Action to set auth state logged in status */
export const removeLoadingMask: ActionCreator<actionTypes.RemoveLoadingMaskAction> = (currencies: models.CurrencyItem[]) => {
  return {
    type: actionTypes.AppLoadingTypes.REMOVE_LOADING_MASK
  };
};

/** Action to set auth state logged in status */
export const setErrorMessage: ActionCreator<actionTypes.SetErrorMessageAction> = (currencies: models.CurrencyItem[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SET_ERROR_MSG
  };
}

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

export const saveAreaInfo: ActionCreator<SaveAreaInfo> = (areas: models.AreaInfo[]) => {
    return {
        type: AppLoadingTypes.SAVE_AREA_INFO,
        areas: areas
    };
};

export const saveOpportunityContactRoles: ActionCreator<SaveOpportunityContactRoles> = (roles: models.DropDownValue[]) => {
  return {
      type: AppLoadingTypes.SAVE_OPPORTUNITY_CONTACT_ROLES,
      roles: roles
  };
};

export const saveIndustryInfo: ActionCreator<SaveIndustryInfo> = (industries: models.DropDownValue[]) => {
    return {
        type: AppLoadingTypes.SAVE_INDUSTRY_INFO,
        crmIndustries: industries
    };
};

export const saveProductInfo: ActionCreator<SaveProductInfo> = (productFamily: models.DropDownValue[]) => {
  return {
      type: AppLoadingTypes.SAVE_PRODUCT_INFO,
      crmProductFamily: productFamily
  };
};

export const saveForeCastInfo: ActionCreator<SaveForecastInfo> = (forecastInfo: models.ForeCastInfo[]) => {
    return {
        type: AppLoadingTypes.SAVE_FORECAST_INFO,
        forecastInfo: forecastInfo
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

/** Middleware to handle authentication */
export const loadInitialConfig: ActionCreator<ThunkAction<
Promise<actionTypes.RemoveLoadingMaskAction | undefined>,
AppState,
undefined,
actionTypes.RemoveLoadingMaskAction | actionTypes.SaveOpportunityTypes
>> = () => {
return async (dispatch: Dispatch, getState) => {
  dispatch(setLoadingMask());

  try {
    Promise.all([
      StagesInfo.get(),
      OpportunityType.get(),
      CurrencyInfo.get(),
      Attributes.getOpportunityAttributes(),
      Attributes.getCustomerAttributes()
    ]).then((response:any) => {
      dispatch(saveOpptyStages(response[0].items));
      dispatch(saveOpptyTypes(response[1]));
      dispatch(saveCurrencies(response[2]));
      dispatch(saveOpportunityAttributes(response[3]))
      dispatch(saveCustomerAttributes(response[4]))
       return dispatch(removeLoadingMask());
    }).catch((error:any) => {
        dispatch(setErrorMessage());
        return dispatch(removeLoadingMask());
      })
    } catch(e:any) {
      dispatch(setErrorMessage());
      return dispatch(removeLoadingMask());
    }
}};
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

export const getAreas = () => {
    return async (dispatch: Dispatch) => {
        const areas = await CountryInfo.getArea();
        dispatch(saveAreaInfo(areas));
    }
}

export const getAttributeDetails = (attributeTypes: string, fileName: string) => {
  return async (dispatch: Dispatch) => {
      const attributeType = await Attributes.getAttributeType(attributeTypes, fileName);
      const attributeValues = await Attributes.getAttributeValues(attributeType.data.attributeId);
      if (attributeTypes === 'ROLE')
          dispatch(saveOpportunityContactRoles(attributeValues.items));
      if (attributeTypes === 'INDUSTRY')
          dispatch(saveIndustryInfo(attributeValues.items));
      if (attributeTypes === 'APP_FROM_IPTOR')
          dispatch(saveProductInfo(attributeValues.items));
  }
}

export const getOpportunityForecasts = () => {
    return async (dispatch: Dispatch) => {
        const areas = await ForeCastsInfo.get();
        dispatch(saveForeCastInfo(areas));
    }
}
