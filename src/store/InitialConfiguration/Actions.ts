/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as models from '../../helpers/Api/models';
import {
  AppLoadingTypes,
  SaveOpportunityDefault,
  SaveCountryInfo,
  SaveAreaInfo,
  SaveOpportunityContactRoles,
  SaveForecastInfo,
  SaveIndustryInfo,
  SaveProductInfo,
  SaveReasonCodes,
} from './Types';

import * as actionTypes from './Types';
import { AppState } from '../store';
import { OpportunityType, StagesInfo, CurrencyInfo, Attributes, CountryInfo, ForeCastsInfo, ReasonCodes } from '../../helpers/Api';

export const CUSTOMER_PARAMS = {
  PRODUCT_FAMILY: 'productFamily',
  INDUSTRY: 'industry',
  ROLE: 'ROLE',
  CUSTOMER_FILE: 'SRONAM',
  CONTACTS_FILE: 'SROMOPCH',
};

/** Action to set auth state logged in status */
export const saveOpptyTypes: ActionCreator<actionTypes.SaveOpportunityTypes> = (opportunityTypes: models.OpportunityType[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SAVE_OPPORTUNITY_TYPES,
    opportunityTypes,
  };
};

/** Action to set auth state logged in status */
export const saveOpptyStages: ActionCreator<actionTypes.SaveOpportunityStages> = (stages: models.StageInfo[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SAVE_OPPORTUNITY_STAGES,
    stages,
  };
};

/** Action to set auth state logged in status */
export const saveCurrencies: ActionCreator<actionTypes.SaveOpportunityCurrencies> = (currencies: models.CurrencyItem[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SAVE_CURRENCIES,
    currencies,
  };
};

/** Action to set auth state logged in status */
export const saveOpportunityAttributes: ActionCreator<actionTypes.SaveOpportunityAttributes> = (attributes: models.AttributeField[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SAVE_OPPORTUNITY_ATTRIBUTES,
    attributes,
  };
};

/** Action to set auth state logged in status */
export const saveCustomerAttributes: ActionCreator<actionTypes.SaveCustomerAttributes> = (attributes: models.AttributeField[]) => {
  return {
    type: actionTypes.AppLoadingTypes.SAVE_CUSTOMER_ATTRIBUTES,
    attributes,
  };
};

/** Action to set auth state logged in status */
export const setLoadingMask: ActionCreator<actionTypes.SetLoadingMaskAction> = () => {
  return {
    type: actionTypes.AppLoadingTypes.SET_LOADING_MASK,
  };
};

/** Action to set auth state logged in status */
export const removeLoadingMask: ActionCreator<actionTypes.RemoveLoadingMaskAction> = () => {
  return {
    type: actionTypes.AppLoadingTypes.REMOVE_LOADING_MASK,
  };
};

/** Action to set auth state logged in status */
export const setErrorMessage: ActionCreator<actionTypes.SetErrorMessageAction> = () => {
  return {
    type: actionTypes.AppLoadingTypes.SET_ERROR_MSG,
  };
};

export const saveDefaultOpportunity: ActionCreator<SaveOpportunityDefault> = (defaultOppInfo: models.DefaultOpportunityInfo) => {
  return {
    type: AppLoadingTypes.SAVE_OPPORTUNITY_DEFAULT,
    defaultOppInfo,
  };
};

export const saveCountryInfo: ActionCreator<SaveCountryInfo> = (countries: models.CountryInfo[]) => {
  return {
    type: AppLoadingTypes.SAVE_COUNTRY_INFO,
    countries,
  };
};

export const saveAreaInfo: ActionCreator<SaveAreaInfo> = (areas: models.AreaInfo[]) => {
  return {
    type: AppLoadingTypes.SAVE_AREA_INFO,
    areas,
  };
};

export const saveOpportunityContactRoles: ActionCreator<SaveOpportunityContactRoles> = (roles: models.DropDownValue[]) => {
  return {
    type: AppLoadingTypes.SAVE_OPPORTUNITY_CONTACT_ROLES,
    roles,
  };
};

export const saveIndustryInfo: ActionCreator<SaveIndustryInfo> = (industries: models.DropDownValue[]) => {
  return {
    type: AppLoadingTypes.SAVE_INDUSTRY_INFO,
    crmIndustries: industries,
  };
};

export const saveProductInfo: ActionCreator<SaveProductInfo> = (productFamily: models.DropDownValue[]) => {
  return {
    type: AppLoadingTypes.SAVE_PRODUCT_INFO,
    crmProductFamily: productFamily,
  };
};

export const saveForeCastInfo: ActionCreator<SaveForecastInfo> = (forecastInfo: models.ForeCastInfo[]) => {
  return {
    type: AppLoadingTypes.SAVE_FORECAST_INFO,
    forecastInfo,
  };
};

export const saveReasonCodes: ActionCreator<SaveReasonCodes> = (_reasons: models.Reason[]) => {
  return {
    type: AppLoadingTypes.SAVE_REASON_CODES,
    reasons: _reasons,
  };
};

export const getOpportunityTypes: ActionCreator<
  ThunkAction<Promise<actionTypes.SaveOpportunityTypes>, AppState, undefined, actionTypes.SaveOpportunityTypes>
> = () => {
  return async (dispatch: Dispatch) => {
    const opptyTypes = await OpportunityType.get();
    return dispatch(saveOpptyTypes(opptyTypes));
  };
};

export const saveOpportunityStages: ActionCreator<
  ThunkAction<Promise<actionTypes.SaveOpportunityStages>, AppState, undefined, actionTypes.SaveOpportunityStages>
> = () => {
  return async (dispatch: Dispatch) => {
    const stageInfo = await StagesInfo.get();
    return dispatch(saveOpptyStages(stageInfo.items));
  };
};

export const getCurrencies: ActionCreator<
  ThunkAction<Promise<actionTypes.SaveOpportunityCurrencies>, AppState, undefined, actionTypes.SaveOpportunityCurrencies>
> = () => {
  return async (dispatch: Dispatch) => {
    const items = await CurrencyInfo.get();
    return dispatch(saveCurrencies(items));
  };
};

/** Middleware to handle authentication */
export const loadInitialConfig: ActionCreator<
  ThunkAction<
    Promise<actionTypes.RemoveLoadingMaskAction | undefined>,
    AppState,
    undefined,
    actionTypes.RemoveLoadingMaskAction | actionTypes.SaveOpportunityTypes
  >
> = () => {
  // eslint-disable-next-line consistent-return
  return async (dispatch: Dispatch) => {
    dispatch(setLoadingMask());

    try {
      Promise.all([
        StagesInfo.get(),
        OpportunityType.get(),
        CurrencyInfo.get(),
        Attributes.getOpportunityAttributes(),
        Attributes.getCustomerAttributes(),
      ])
        .then((response: any) => {
          dispatch(saveOpptyStages(response[0].items));
          dispatch(saveOpptyTypes(response[1]));
          dispatch(saveCurrencies(response[2]));
          dispatch(saveOpportunityAttributes(response[3]));
          dispatch(saveCustomerAttributes(response[4]));
          return dispatch(removeLoadingMask());
        })
        .catch(() => {
          dispatch(setErrorMessage());
          return dispatch(removeLoadingMask());
        });
    } catch (e: any) {
      dispatch(setErrorMessage());
      return dispatch(removeLoadingMask());
    }
  };
};
export const getOppDefaults: ActionCreator<
  ThunkAction<Promise<actionTypes.SaveOpportunityDefault>, AppState, undefined, actionTypes.SaveOpportunityDefault>
> = () => {
  return async (dispatch: Dispatch) => {
    const items = await OpportunityType.getDefault();
    return dispatch(saveDefaultOpportunity(items));
  };
};

export const getCountries: ActionCreator<ThunkAction<Promise<actionTypes.SaveCountryInfo>, AppState, undefined, actionTypes.SaveCountryInfo>> =
  () => {
    return async (dispatch: Dispatch) => {
      const countries = await CountryInfo.get();
      return dispatch(saveCountryInfo(countries));
    };
  };

export const getAreas: ActionCreator<ThunkAction<Promise<actionTypes.SaveAreaInfo>, AppState, undefined, actionTypes.SaveAreaInfo>> = () => {
  return async (dispatch: Dispatch) => {
    const areas = await CountryInfo.getArea();
    return dispatch(saveAreaInfo(areas));
  };
};

export const getCustomerContactRoles: ActionCreator<
  ThunkAction<Promise<actionTypes.SaveOpportunityContactRoles>, AppState, undefined, actionTypes.SaveOpportunityContactRoles>
> = () => {
  return async (dispatch: Dispatch) => {
    const attributeType = await Attributes.getAttributeType(CUSTOMER_PARAMS.ROLE, CUSTOMER_PARAMS.CONTACTS_FILE);
    if (attributeType && attributeType.data && attributeType.data.attributeId) {
      const attributeValues = await Attributes.getAttributeValues(attributeType.data.attributeId);
      if (attributeValues.items) {
        return dispatch(saveOpportunityContactRoles(attributeValues.items));
      } else {
        return dispatch(saveOpportunityContactRoles([]));
      }
    } else {
      return dispatch(saveOpportunityContactRoles([]));
    }
  };
};

export const getCustomerProducts: ActionCreator<ThunkAction<Promise<actionTypes.SaveProductInfo>, AppState, undefined, actionTypes.SaveProductInfo>> =
  () => {
    return async (dispatch: Dispatch) => {
      const attributeType = await Attributes.getAttributeType(CUSTOMER_PARAMS.PRODUCT_FAMILY, CUSTOMER_PARAMS.CUSTOMER_FILE);
      if (attributeType.data) {
        const attributeValues = await Attributes.getAttributeValues(attributeType.data.attributeId);
        if (attributeValues.items) {
          return dispatch(saveProductInfo(attributeValues.items));
        } else {
          return dispatch(saveProductInfo([]));
        }
      } else {
        return dispatch(saveProductInfo([]));
      }
    };
  };

export const getOpportunityForecasts: ActionCreator<
  ThunkAction<Promise<actionTypes.SaveForecastInfo>, AppState, undefined, actionTypes.SaveForecastInfo>
> = () => {
  return async (dispatch: Dispatch) => {
    const areas = await ForeCastsInfo.get();
    return dispatch(saveForeCastInfo(areas));
  };
};

export const getCustomerIndustry: ActionCreator<
  ThunkAction<Promise<actionTypes.SaveIndustryInfo>, AppState, undefined, actionTypes.SaveIndustryInfo>
> = () => {
  return async (dispatch: Dispatch) => {
    const attributeType = await Attributes.getAttributeType(CUSTOMER_PARAMS.INDUSTRY, CUSTOMER_PARAMS.CUSTOMER_FILE);
    if (attributeType.data) {
      const attributeValues = await Attributes.getAttributeValues(attributeType.data.attributeId);
      if (attributeValues.items) {
        return dispatch(saveIndustryInfo(attributeValues.items));
      } else {
        return dispatch(saveIndustryInfo([]));
      }
    } else {
      return dispatch(saveIndustryInfo([]));
    }
  };
};

export const getReasonCodes: ActionCreator<ThunkAction<Promise<actionTypes.SaveReasonCodes>, AppState, undefined, actionTypes.SaveReasonCodes>> =
  () => {
    return async (dispatch: Dispatch) => {
      try {
        const reasons = await ReasonCodes.get();
        return dispatch(saveReasonCodes(reasons));
      } catch (error) {
        return dispatch(saveReasonCodes([]));
      }
    };
  };
