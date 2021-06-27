/** Authentication Action Types */

import { Action } from 'redux';
import { OpportunityType , StageInfo} from '../../helpers/Api/models';


/** Enum for Authentication Actions */
export enum AppLoadingTypes {
  SAVE_OPPORTUNITY_TYPES = 'SAVE_OPPORTUNITY_TYPES',
  SAVE_OPPORTUNITY_STAGES = 'SAVE_OPPORTUNITY_STAGES'
}

/** Authentication success action */
export interface SaveOpportunityTypes extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_TYPES> {
  opportunityTypes:OpportunityType[]
}

/** Authentication success action */
export interface SaveOpportunityStages extends Action<AppLoadingTypes.SAVE_OPPORTUNITY_STAGES> {
  stages:StageInfo[]
}

export type AppLoadingActions = SaveOpportunityTypes | SaveOpportunityStages;

/** Authentication state definition */
export interface InitialConfigState {
  readonly crmOpportunityTypes: OpportunityType[],
  readonly crmOpportunityStage: StageInfo[],
}