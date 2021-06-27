/** Authentication Action Types */

import { Action } from 'redux';
import { OpportunityType, StageInfo, CurrencyItem, AttributeField, DefaultOpportunityInfo, CountryInfo} from '../../helpers/Api/models';


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
  SAVE_COUNTRY_INFO = 'SAVE_COUNTRY_INFO'
}

/** Authentication success action */
export interface SaveOpportunityTypes extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_TYPES> {
  opportunityTypes:OpportunityType[]
}

/** Authentication success action */
export interface SaveOpportunityStages extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_STAGES> {
  stages:StageInfo[]
}

/** Authentication success action */
export interface SaveOpportunityCurrencies extends Action<AppLoadingTypes.SAVE_CURRENCIES> {
  currencies:CurrencyItem[]
}


/** Authentication success action */
export interface SaveOpportunityAttributes extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_ATTRIBUTES> {
  attributes:AttributeField[]
}


/** Authentication success action */
export interface SaveCustomerAttributes extends Action<AppLoadingTypes.SAVE_CUSTOMER_ATTRIBUTES> {
  attributes:AttributeField[]
}

/** Authentication success action */
export interface SetLoadingMaskAction extends Action<AppLoadingTypes.SET_LOADING_MASK> {}

/** Authentication success action */
export interface RemoveLoadingMaskAction extends Action<AppLoadingTypes.REMOVE_LOADING_MASK> {}

/** Authentication success action */
export interface SetErrorMessageAction extends Action<AppLoadingTypes.SET_ERROR_MSG> {}

/** Authentication success action */
export interface SaveOpportunityDefault extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_DEFAULT> {
  defaultOppInfo: DefaultOpportunityInfo
}

export interface SaveCountryInfo extends Action<AppLoadingTypes.SAVE_COUNTRY_INFO> {
  countries: CountryInfo[]
}

export type AppLoadingActions = SaveOpportunityTypes | 
                                SaveOpportunityStages | 
                                SaveOpportunityCurrencies |
                                SetLoadingMaskAction | 
                                RemoveLoadingMaskAction |
                                SetErrorMessageAction |
                                SaveCustomerAttributes | 
                                SaveOpportunityAttributes |
                                SaveOpportunityDefault | SaveCountryInfo;



/** Authentication state definition */
export interface InitialConfigState {
  readonly crmOpportunityTypes: OpportunityType[],
  readonly crmOpportunityStage: StageInfo[],
  readonly currency:CurrencyItem[],
  readonly loadingMask:boolean,
  readonly error : boolean, 
  readonly customerAttributes:AttributeField[],
  readonly opportunityAttributes:AttributeField[]
  readonly defaultOpprtunityInfo: DefaultOpportunityInfo,
  readonly crmCountryInfo: CountryInfo[],
}