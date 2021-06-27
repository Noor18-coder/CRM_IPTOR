/** Authentication Action Types */

import { Action } from 'redux';
import { OpportunityType, StageInfo, CurrencyItem, DefaultOpportunityInfo, CountryInfo} from '../../helpers/Api/models';


/** Enum for Authentication Actions */
export enum AppLoadingTypes {
  SAVE_OPPORTUNITY_TYPES = 'SAVE_OPPORTUNITY_TYPES',
  SAVE_OPPORTUNITY_STAGES = 'SAVE_OPPORTUNITY_STAGES',
  SAVE_CURRENCIES = 'SAVE_CURRENCIES',
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
export interface SaveOpportunityDefault extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_DEFAULT> {
    defaultOppInfo: DefaultOpportunityInfo
}

export interface SaveCountryInfo extends Action<AppLoadingTypes.SAVE_COUNTRY_INFO> {
    countries: CountryInfo[]
}

export type AppLoadingActions = SaveOpportunityTypes | SaveOpportunityStages | SaveOpportunityCurrencies
    | SaveOpportunityDefault | SaveCountryInfo;

/** Authentication state definition */
export interface InitialConfigState {
  readonly crmOpportunityTypes: OpportunityType[],
  readonly crmOpportunityStage: StageInfo[],
  readonly currency:CurrencyItem[],
  readonly defaultOpprtunityInfo: DefaultOpportunityInfo,
  readonly crmCountryInfo: CountryInfo[],
}