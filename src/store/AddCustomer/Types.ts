import { Action } from 'redux';
import * as models from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum AddBusinessPartnerTypes {
  SAVE_BUSINESS_PARTNER_DEFAULT_FIELDS = 'SAVE_BUSINESS_PARTNER_DEFAULT_FIELDS',
  CLEAR_ADD_DEFAULT_OBJECTS = 'CLEAR_ADD_DEFAULT_OBJECTS',
  SAVE_BUSINESS_PARTNER_ATTRIBUTE = 'SAVE_BUSINESS_PARTNER_ATTRIBUTE',
  SAVE_BUSINESS_PARTNER_CONTACT = 'SAVE_BUSINESS_PARTNER_CONTACT',
  SET_ADD_BUSINESS_PARTNER_LOADER = 'SET_ADD_BUSINESS_PARTNER_LOADER',
  RESET_BUSINESS_PARTNER_DATA = 'RESET_BUSINESS_PARTNER_DATA',
  RESET_BUSINESS_PARTNER_FIELDS = 'RESET_BUSINESS_PARTNER_FIELDS',
  SET_ADD_BUSINESS_PARTNER_WINDOW = 'SET_ADD_BUSINESS_PARTNER_WINDOW',
  SET_BUSINESS_PARTNER_WINDOW_GROUP = 'SET_BUSINESS_PARTNER_WINDOW_GROUP',
  SET_BUSINESS_PARTNER_CONTACT_ID = 'SET_BUSINESS_PARTNER_CONTACT_ID',
  SET_UPDATE_CUSTOMER_SUCCESS = 'SET_UPDATE_CUSTOMER_SUCCESS',
  SET_UPDATE_CUSTOMER_ERROR = 'SET_UPDATE_CUSTOMER_ERROR',
}

/** Action to save default parameters of business partner */
export interface SaveBusinessPartnerParamAction extends Action<AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_DEFAULT_FIELDS> {
  businessPartner: models.CustomerDetailsDefaultFields;
}

/** Action to save attributes (user defined) parameters of business partner */
export interface SaveBusinessPartnerAttributeAction extends Action<AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_ATTRIBUTE> {
  attributes: models.OpportunityDetailsGroupItem[];
}

export interface SaveBusinessPartnerContactAction extends Action<AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_CONTACT> {
  contacts: models.CustomerDetailsContactsGroupItem[];
}

/** Authentication success action */
export interface RemoveBusinessPartnerDataAction extends Action<AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_DATA> {}

export interface RemoveBusinessPartnerFieldsAction extends Action<AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_FIELDS> {}

/** Authentication success action */
export interface SetAddBusinessPartnerLoaderAction extends Action<AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_LOADER> {
  loader: boolean;
}

/** Authentication success action */
export interface SetAddBusinessPartnerDrawerActive extends Action<AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_WINDOW> {
  addBusinessPartnerWindowActive: boolean;
}

export interface SetEditBusinessPartnerDrawerGroup extends Action<AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_WINDOW_GROUP> {
  businessPartnerWindowGroup: string;
}

export interface SetBusinessPartnerContactId extends Action<AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_CONTACT_ID> {
  businessPartnerContactId: string;
}

export interface SetUpdateCustomerSuccess extends Action<AddBusinessPartnerTypes.SET_UPDATE_CUSTOMER_SUCCESS> {
  success: boolean;
}

export interface SetUpdateCustomerError extends Action<AddBusinessPartnerTypes.SET_UPDATE_CUSTOMER_ERROR> {
  error: string;
}

export type AddBusinessPartnerReduxActions =
  | SaveBusinessPartnerParamAction
  | SaveBusinessPartnerAttributeAction
  | SaveBusinessPartnerContactAction
  | RemoveBusinessPartnerDataAction
  | RemoveBusinessPartnerFieldsAction
  | SetAddBusinessPartnerLoaderAction
  | SetAddBusinessPartnerDrawerActive
  | SetEditBusinessPartnerDrawerGroup
  | SetBusinessPartnerContactId
  | SetUpdateCustomerSuccess
  | SetUpdateCustomerError;

/** Authentication state definition */
export interface AddBusinessPartnerState {
  readonly addBusinessPartnerWindowActive: boolean;
  readonly businessPartnerDefaultFields: models.CustomerDetailsDefaultFields;
  readonly attributes: models.OpportunityDetailsGroupItem[];
  readonly contacts: models.CustomerDetailsContactsGroupItem[];
  readonly businessPartnerWindowGroup: string;
  readonly businessPartnerContactId: string;
  readonly loader: boolean;
  readonly success: boolean;
  readonly error: string;
}
