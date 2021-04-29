import { Action } from 'redux';

/** Enum for Opportunities Actions */
export enum OpportunityTypes {
  ADD_OPPORTUNITY = 'ADD_OPPORTUNITY'
}

export interface IOpportunity {
  id: string,
  dealSize : string,
  company : string,
  status: string
}

/** Opportunity add action */

  export interface IOpportunityAdd
  extends Action<OpportunityTypes.ADD_OPPORTUNITY> {
    opprtunity: IOpportunity
  }


  

export type OpportunityActions = IOpportunityAdd;

export interface OpportunityState {
  opportunities : IOpportunity[]
}
