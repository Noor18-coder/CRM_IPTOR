import { Action } from 'redux';

/** Enum for Opportunities Actions */
export enum OpportunityTypes {
  ADD_OPPORTUNITY = 'ADD_OPPORTUNITY'
}

export interface Opportunity {
  id: string,
  dealSize : string,
  company : string,
  status: string
}

/** Opportunity add action */

  export interface OpportunityAdd
  extends Action<OpportunityTypes.ADD_OPPORTUNITY> {
    opportunity: Opportunity
  }


  

export type OpportunityActions = OpportunityAdd;

export interface OpportunityState {
  opportunities : Opportunity[]
}
