/**
 * Business Partner Actions and Middleware definition
 */
 import { ActionCreator } from 'redux';
 import { AddBusinessPartnerDefaultParams , UserDefinedFieldReduxParams } from '../../helpers/Api/models';
 import {
    SaveBusinessPartnerParamAction, SetAddBusinessPartnerLoaderAction, SetAddBusinessPartnerDrawerActive,
    RemoveBusinessPartnerDataAction, SaveBusinessPartnerAddAttributeAction, AddBusinessPartnerTypes,
    SetEditBusinessPartnerDrawerGroup, SetBusinessPartnerContactId
} from './Types';
 
 /** Action to set auth state logged in status */
 export const saveOpportunityParams : ActionCreator<SaveBusinessPartnerParamAction> = (businessPartner:AddBusinessPartnerDefaultParams) => {
   return {
     type: AddBusinessPartnerTypes.SAVE_ADD_BUSINESS_PARTNER_DEFAULT_FIELDS,
     businessPartner: businessPartner
   };
 };
 
 export const saveBusinessPartnerAttributes : ActionCreator<SaveBusinessPartnerAddAttributeAction> = (attributes:UserDefinedFieldReduxParams[]) => {
   return {
     type: AddBusinessPartnerTypes.SAVE_ADD_BUSINESS_PARTNER_ATTRIBUTE,
     attributes: attributes
   };
 };

 export const setBusinessPartnerLoader : ActionCreator<SetAddBusinessPartnerLoaderAction> = (loader:boolean) => {
  return {
    type: AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_LOADER,
    loader: loader
  };
};

export const setBusinessPartnerWindowActive: ActionCreator<SetAddBusinessPartnerDrawerActive> = (addBusinessPartnerWindowActive:boolean) => {
  return {
    type: AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_WINDOW,
    addBusinessPartnerWindowActive: addBusinessPartnerWindowActive
  };
};

export const setBusinessPartnerWindowGroup: ActionCreator<SetEditBusinessPartnerDrawerGroup> = (businessPartnerWindowGroup: string) => {
    return {
        type: AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_WINDOW_GROUP,
        businessPartnerWindowGroup: businessPartnerWindowGroup
    };
};

export const setBusinessPartnerContactId: ActionCreator<SetBusinessPartnerContactId> = (businessPartnerContactId: string) => {
    return {
        type: AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_CONTACT_ID,
        businessPartnerContactId: businessPartnerContactId
    };
};

export const resetBusinessPartnerData: ActionCreator<RemoveBusinessPartnerDataAction> = () => {
  return {
    type: AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_DATA
  };
};
