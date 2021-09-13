/** Authentication Action Types */

import { Action } from 'redux';
import * as models from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum OpportunityDetailsTypes {
  SAVE_OPPORTUNITY_DETAILS = 'SAVE_OPPORTUNITY_DETAILS',
  SAVE_OPPORTUNITY_ATTRIBUTE_VALUES = 'SAVE_OPPORTUNITY_ATTRIBUTE_VALUES',
  OPEN_FOR_EDIT = 'OPEN_FOR_EDIT',
  OPPORTUNITY_DETAILS_SAVED = 'OPPORTUNITY_DETAILS_SAVED',
  EDIT_OPPORTUNITY_STATUS = 'EDIT_OPPORTUNITY_STATUS',
  SET_EDIT_OPPORTUNITY_ERROR = 'SET_EDIT_OPPORTUNITY_ERROR',
  SET_OPPTY_DETAILS_LOADING_MASK = 'SET_OPPTY_DETAILS_LOADING_MASK',
  REMOVE_OPPTY_DETAILS_LOADING_MASK = 'REMOVE_OPPTY_DETAILS_LOADING_MASK',
  SET_OPPORTUNITY_APPROVAL_STATUS = 'SET_OPPORTUNITY_APPROVAL_STATUS',
  SET_OPPORTUNITY_DETAILS_ERROR = 'SET_OPPORTUNITY_DETAILS_ERROR',
  SAVE_OPPORTUNITY_PRODUCTS = 'SAVE_OPPORTUNITY_PRODUCTS',
  SAVE_OPPORTUNITY_CONTACTS = 'SAVE_OPPORTUNITY_CONTACTS',
  SAVE_PRODUCT_INFORMATION = 'SAVE_PRODUCT_INFORMATION',
}

/** Action to save default parameters of opportunity */
export interface SaveOpportunityDetailsAction extends Action<OpportunityDetailsTypes.SAVE_OPPORTUNITY_DETAILS> {
  opportunity: models.OpportunityDetailsDefault;
}

/** Action to save attributes (user defined) parameters of opportunity */
export interface SaveOpportunityAttributesAction extends Action<OpportunityDetailsTypes.SAVE_OPPORTUNITY_ATTRIBUTE_VALUES> {
  attributes: models.AttributeValueObject[];
}

/** Action to save attributes (user defined) parameters of opportunity */
export interface OpenOpportunityEditFormAction extends Action<OpportunityDetailsTypes.OPEN_FOR_EDIT> {
  options: models.OpportunityEditOptions;
}

/** Action to save attributes (user defined) parameters of opportunity */
export interface SetOpportunityEditStatus extends Action<OpportunityDetailsTypes.EDIT_OPPORTUNITY_STATUS> {
  success: models.OpportunityEditOptions;
}

/** Action to save attributes (user defined) parameters of opportunity */
export interface SetOpportunityEditErrorMessage extends Action<OpportunityDetailsTypes.SET_EDIT_OPPORTUNITY_ERROR> {
  error: string;
}

/** Action to save attributes (user defined) parameters of opportunity */
export interface SetOpportunityApprovalError extends Action<OpportunityDetailsTypes.SET_OPPORTUNITY_APPROVAL_STATUS> {
  message: string;
}

/** Action to save error while loading opportunity */
export interface SetOpportunityDetailsError extends Action<OpportunityDetailsTypes.SET_OPPORTUNITY_DETAILS_ERROR> {
  error: string;
}

/** Action to save error while loading opportunity */
export interface SaveOpportunityProducts extends Action<OpportunityDetailsTypes.SAVE_OPPORTUNITY_PRODUCTS> {
  products: models.Product[];
}

/** Action to save error while loading opportunity */
export interface SaveProductInformation extends Action<OpportunityDetailsTypes.SAVE_PRODUCT_INFORMATION> {
  product: models.Product;
}

/** Action to save error while loading opportunity */
export interface SaveOpportunityContacts extends Action<OpportunityDetailsTypes.SAVE_OPPORTUNITY_CONTACTS> {
  contacts: models.OpportunityContact[];
}

/** Set Loading mask on opportunity details action */
export interface SetOpportunityDetailsLoaderAction extends Action<OpportunityDetailsTypes.SET_OPPTY_DETAILS_LOADING_MASK> {}

/** Remove Loading mask on opportunity details action */
export interface RemoveOpportunityDetailsLoaderAction extends Action<OpportunityDetailsTypes.REMOVE_OPPTY_DETAILS_LOADING_MASK> {}

export type OpportunityDetailsReduxActions =
  | SaveOpportunityDetailsAction
  | SaveOpportunityAttributesAction
  | OpenOpportunityEditFormAction
  | SetOpportunityEditStatus
  | SetOpportunityEditErrorMessage
  | SetOpportunityDetailsLoaderAction
  | RemoveOpportunityDetailsLoaderAction
  | SetOpportunityApprovalError
  | SetOpportunityDetailsError
  | SaveOpportunityContacts
  | SaveOpportunityProducts
  | SaveProductInformation;

/** Authentication state definition */
export interface OpportunityDetailsState {
  readonly opportunityDefaultParams: models.OpportunityDetailsDefault;
  readonly attributes: models.AttributeValueObject[];
  readonly products: models.Product[];
  readonly contacts: models.OpportunityContact[];
  readonly editOportunity: models.OpportunityEditOptions;
  readonly loader: boolean;
  readonly error?: string;
}
