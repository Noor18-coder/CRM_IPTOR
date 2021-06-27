/** Authentication Action Types */

import { Action } from 'redux';
import { OpportunityType , StageInfo, CurrencyItem} from '../../helpers/Api/models';


/** Enum for Authentication Actions */
export enum AppLoadingTypes {
  SAVE_OPPORTUNITY_TYPES = 'SAVE_OPPORTUNITY_TYPES',
  SAVE_OPPORTUNITY_STAGES = 'SAVE_OPPORTUNITY_STAGES',
  SAVE_CURRENCIES = 'SAVE_CURRENCIES'
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

export type AppLoadingActions = SaveOpportunityTypes | SaveOpportunityStages | SaveOpportunityCurrencies;

/** Authentication state definition */
export interface InitialConfigState {
  readonly crmOpportunityTypes: OpportunityType[],
  readonly crmOpportunityStage: StageInfo[],
  readonly currency:CurrencyItem[]
}