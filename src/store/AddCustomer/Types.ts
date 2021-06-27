
import { Action } from 'redux';
import { AddBusinessPartnerDefaultParams, UserDefinedFieldReduxParams} from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum AddBusinessPartnerTypes {
  SAVE_ADD_BUSINESS_PARTNER_DEFAULT_FIELDS = 'SAVE_ADD_BUSINESS_PARTNER_DEFAULT_FIELDS',
  CLEAR_ADD_DEFAULT_OBJECTS = 'CLEAR_ADD_DEFAULT_OBJECTS',
  SAVE_ADD_BUSINESS_PARTNER_ATTRIBUTE = 'SAVE_ADD_BUSINESS_PARTNER_ATTRIBUTE',
  SET_ADD_BUSINESS_PARTNER_LOADER = 'SET_ADD_BUSINESS_PARTNER_LOADER',
  RESET_BUSINESS_PARTNER_DATA = 'RESET_BUSINESS_PARTNER_DATA',
  SET_ADD_BUSINESS_PARTNER_WINDOW = 'SET_ADD_BUSINESS_PARTNER_WINDOW',
  SET_BUSINESS_PARTNER_WINDOW_GROUP = 'SET_BUSINESS_PARTNER_WINDOW_GROUP'
}
  
/** Action to save default parameters of business partner */
export interface SaveBusinessPartnerParamAction extends Action<AddBusinessPartnerTypes.SAVE_ADD_BUSINESS_PARTNER_DEFAULT_FIELDS> {
  businessPartner:AddBusinessPartnerDefaultParams
}

/** Action to save attributes (user defined) parameters of business partner */
export interface SaveBusinessPartnerAddAttributeAction extends Action<AddBusinessPartnerTypes.SAVE_ADD_BUSINESS_PARTNER_ATTRIBUTE> {
  attributes:UserDefinedFieldReduxParams[]
}

/** Authentication success action */
export interface RemoveBusinessPartnerDataAction extends Action<AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_DATA> {}

/** Authentication success action */
export interface SetAddBusinessPartnerLoaderAction extends Action<AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_LOADER> {
  loader:boolean
}

/** Authentication success action */
export interface SetAddBusinessPartnerDrawerActive extends Action<AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_WINDOW> {
  addBusinessPartnerWindowActive:boolean
}

export interface SetEditBusinessPartnerDrawerGroup extends Action<AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_WINDOW_GROUP> {
    businessPartnerWindowGroup: string
}

export type AddBusinessPartnerReduxActions = SaveBusinessPartnerParamAction | SaveBusinessPartnerAddAttributeAction |
    RemoveBusinessPartnerDataAction | SetAddBusinessPartnerLoaderAction | SetAddBusinessPartnerDrawerActive | SetEditBusinessPartnerDrawerGroup;

/** Authentication state definition */
export interface AddBusinessPartnerState {
  readonly addBusinessPartnerWindowActive: boolean;
  readonly loader: boolean,
  readonly businessPartnerDefaultParams: AddBusinessPartnerDefaultParams,
  readonly attributes:UserDefinedFieldReduxParams[],
  readonly businessPartnerWindowGroup: string
}

