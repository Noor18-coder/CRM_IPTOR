/**
 * Authentication State Reducer
 */

import { Reducer } from 'redux';
import { AppLoadingTypes, AppLoadingActions, InitialConfigState } from './Types';

/**
 * Initial State
 */
export const createInitalConfigDefaultState = (): InitialConfigState => {
  return {
    crmOpportunityTypes: [],
    crmOpportunityStage: [],
    currency: [],
    loadingMask: false,
    error: false,
    customerAttributes: [],
    opportunityAttributes: [],
    defaultOpprtunityInfo: {},
    crmCountryInfo: [],
    crmAreaInfo: [],
    opportunityContactRoles: [],
    crmIndustries: [],
    crmProductFamily: [],
    forecastInfo: [],
    reasons: [],
  };
};

const initialState = createInitalConfigDefaultState();

/**
 * Sales Order Reducer
 * @param state auth state object
 * @param action auth actions
 */
const configReducer: Reducer<InitialConfigState, AppLoadingActions> = (state = initialState, action) => {
  switch (action.type) {
    case AppLoadingTypes.SAVE_OPPORTUNITY_TYPES:
      return {
        ...state,
        crmOpportunityTypes: action.opportunityTypes,
      };
    case AppLoadingTypes.SAVE_OPPORTUNITY_STAGES:
      return {
        ...state,
        crmOpportunityStage: action.stages,
      };
    case AppLoadingTypes.SAVE_CURRENCIES:
      return {
        ...state,
        currency: action.currencies,
      };
    case AppLoadingTypes.SET_LOADING_MASK:
      return {
        ...state,
        loadingMask: true,
      };
    case AppLoadingTypes.REMOVE_LOADING_MASK:
      return {
        ...state,
        loadingMask: false,
      };

    case AppLoadingTypes.SAVE_CUSTOMER_ATTRIBUTES:
      return {
        ...state,
        customerAttributes: action.attributes,
      };
    case AppLoadingTypes.SAVE_OPPORTUNITY_ATTRIBUTES:
      return {
        ...state,
        opportunityAttributes: action.attributes,
      };
    case AppLoadingTypes.SAVE_OPPORTUNITY_DEFAULT:
      return {
        ...state,
        defaultOpprtunityInfo: action.defaultOppInfo,
      };
    case AppLoadingTypes.SAVE_COUNTRY_INFO:
      return {
        ...state,
        crmCountryInfo: action.countries,
      };
    case AppLoadingTypes.SAVE_AREA_INFO:
      return {
        ...state,
        crmAreaInfo: action.areas,
      };
    case AppLoadingTypes.SAVE_OPPORTUNITY_CONTACT_ROLES:
      return {
        ...state,
        opportunityContactRoles: action.roles,
      };
    case AppLoadingTypes.SAVE_INDUSTRY_INFO:
      return {
        ...state,
        crmIndustries: action.crmIndustries,
      };
    case AppLoadingTypes.SAVE_PRODUCT_INFO:
      return {
        ...state,
        crmProductFamily: action.crmProductFamily,
      };
    case AppLoadingTypes.SAVE_FORECAST_INFO:
      return {
        ...state,
        forecastInfo: action.forecastInfo,
      };
    case AppLoadingTypes.SAVE_REASON_CODES:
      return {
        ...state,
        reasons: action.reasons,
      };
    default:
      return state;
  }
};

export default configReducer;
