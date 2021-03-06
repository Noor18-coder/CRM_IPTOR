/** Authentication Action Types */

import { Action } from 'redux';
import {
  OpportunityType,
  StageInfo,
  CurrencyItem,
  AttributeField,
  DefaultOpportunityInfo,
  CountryInfo,
  AreaInfo,
  DropDownValue,
  ForeCastInfo,
  Reason,
} from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum AppLoadingTypes {
  SAVE_OPPORTUNITY_TYPES = 'SAVE_OPPORTUNITY_TYPES',
  SAVE_OPPORTUNITY_STAGES = 'SAVE_OPPORTUNITY_STAGES',
  SAVE_CURRENCIES = 'SAVE_CURRENCIES',
  SET_LOADING_MASK = 'SET_LOADING_MASK',
  REMOVE_LOADING_MASK = 'REMOVE_LOADING_MASK',
  SET_ERROR_MSG = 'SET_ERROR_MSG',
  SAVE_OPPORTUNITY_ATTRIBUTES = 'SAVE_OPPORTUNITY_ATTRIBUTES',
  SAVE_CUSTOMER_ATTRIBUTES = 'SAVE_CUSTOMER_ATTRIBUTES',
  SAVE_OPPORTUNITY_DEFAULT = 'SAVE_OPPORTUNITY_DEFAULT',
  SAVE_COUNTRY_INFO = 'SAVE_COUNTRY_INFO',
  SAVE_AREA_INFO = 'SAVE_AREA_INFO',
  SAVE_OPPORTUNITY_CONTACT_ROLES = 'SAVE_OPPORTUNITY_CONTACT_ROLES',
  SAVE_INDUSTRY_INFO = 'SAVE_INDUSTRY_INFO',
  SAVE_PRODUCT_INFO = 'SAVE_PRODUCT_INFO',
  SAVE_FORECAST_INFO = 'SAVE_FORECAST_INFO',
  SAVE_REASON_CODES = 'SAVE_REASON_CODES',
  SAVE_PRODUCTS_ATTRIBUTES = 'SAVE_PRODUCTS_ATTRIBUTES',
  SAVE_OPPORTUNITY_CONTACTS_ATTRIBUTES = 'SAVE_OPPORTUNITY_CONTACTS_ATTRIBUTES',
  SAVE_CUSTOMER_CONTACTS_ATTRIBUTES = 'SAVE_CUSTOMER_CONTACTS_ATTRIBUTES',
}

/** Authentication success action */
export interface SaveOpportunityTypes extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_TYPES> {
  opportunityTypes: OpportunityType[];
}

/** Authentication success action */
export interface SaveOpportunityStages extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_STAGES> {
  stages: StageInfo[];
}

/** Authentication success action */
export interface SaveOpportunityCurrencies extends Action<AppLoadingTypes.SAVE_CURRENCIES> {
  currencies: CurrencyItem[];
}

/** Authentication success action */
export interface SaveOpportunityAttributes extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_ATTRIBUTES> {
  attributes: AttributeField[];
}

/** Authentication success action */
export interface SaveCustomerAttributes extends Action<AppLoadingTypes.SAVE_CUSTOMER_ATTRIBUTES> {
  attributes: AttributeField[];
}

/** Authentication success action */
export interface SaveProductsAttributes extends Action<AppLoadingTypes.SAVE_PRODUCTS_ATTRIBUTES> {
  attributes: AttributeField[];
}

/** Authentication success action */
export interface SaveOpportunityContactsAttributes extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_CONTACTS_ATTRIBUTES> {
  attributes: AttributeField[];
}

/** Authentication success action */
export interface SaveCustomerContactsAttributes extends Action<AppLoadingTypes.SAVE_CUSTOMER_CONTACTS_ATTRIBUTES> {
  attributes: AttributeField[];
}

/** Authentication success action */
export interface SetLoadingMaskAction extends Action<AppLoadingTypes.SET_LOADING_MASK> {}

/** Authentication success action */
export interface RemoveLoadingMaskAction extends Action<AppLoadingTypes.REMOVE_LOADING_MASK> {}

/** Authentication success action */
export interface SetErrorMessageAction extends Action<AppLoadingTypes.SET_ERROR_MSG> {}

/** Authentication success action */
export interface SaveOpportunityDefault extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_DEFAULT> {
  defaultOppInfo: DefaultOpportunityInfo;
}

/** Authentication success action */
export interface SaveOpportunityContactRoles extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_CONTACT_ROLES> {
  roles: DropDownValue[];
}

export interface SaveIndustryInfo extends Action<AppLoadingTypes.SAVE_INDUSTRY_INFO> {
  crmIndustries: DropDownValue[];
}

export interface SaveProductInfo extends Action<AppLoadingTypes.SAVE_PRODUCT_INFO> {
  crmProductFamily: DropDownValue[];
}

export interface SaveCountryInfo extends Action<AppLoadingTypes.SAVE_COUNTRY_INFO> {
  countries: CountryInfo[];
}

export interface SaveAreaInfo extends Action<AppLoadingTypes.SAVE_AREA_INFO> {
  areas: AreaInfo[];
}

export interface SaveForecastInfo extends Action<AppLoadingTypes.SAVE_FORECAST_INFO> {
  forecastInfo: ForeCastInfo[];
}

/** Authentication success action */
export interface SaveReasonCodes extends Action<AppLoadingTypes.SAVE_REASON_CODES> {
  reasons: Reason[];
}

export type AppLoadingActions =
  | SaveOpportunityTypes
  | SaveOpportunityStages
  | SaveOpportunityCurrencies
  | SetLoadingMaskAction
  | RemoveLoadingMaskAction
  | SetErrorMessageAction
  | SaveCustomerAttributes
  | SaveOpportunityAttributes
  | SaveOpportunityDefault
  | SaveCountryInfo
  | SaveAreaInfo
  | SaveOpportunityContactRoles
  | SaveCustomerContactsAttributes
  | SaveIndustryInfo
  | SaveProductInfo
  | SaveForecastInfo
  | SaveReasonCodes
  | SaveProductsAttributes
  | SaveOpportunityContactsAttributes;

/** Authentication state definition */
export interface InitialConfigState {
  readonly crmOpportunityTypes: OpportunityType[];
  readonly crmOpportunityStage: StageInfo[];
  readonly currency: CurrencyItem[];
  readonly loadingMask: boolean;
  readonly error: boolean;
  readonly customerAttributes: AttributeField[];
  readonly opportunityAttributes: AttributeField[];
  readonly productAttributes: AttributeField[];
  readonly opportunityContactAttributes: AttributeField[];
  readonly customerContactAttributes: AttributeField[];
  readonly defaultOpprtunityInfo: DefaultOpportunityInfo;
  readonly crmCountryInfo: CountryInfo[];
  readonly crmAreaInfo: AreaInfo[];
  readonly opportunityContactRoles: DropDownValue[];
  readonly crmIndustries: DropDownValue[];
  readonly crmProductFamily: DropDownValue[];
  readonly forecastInfo: ForeCastInfo[];
  readonly reasons: Reason[];
}
