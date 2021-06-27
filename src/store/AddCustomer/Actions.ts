/**
 * Business Partner Actions and Middleware definition
 */
 import { ActionCreator } from 'redux';
 import { AddBusinessPartnerDefaultParams , UserDefinedFieldReduxParams } from '../../helpers/Api/models';
 import {
    SaveBusinessPartnerParamAction, SetAddBusinessPartnerLoaderAction, SetAddBusinessPartnerDrawerActive,
    RemoveBusinessPartnerDataAction, SaveBusinessPartnerAddAttributeAction, AddBusinessPartnerTypes } from './Types';
 
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

export const resetBusinessPartnerData: ActionCreator<RemoveBusinessPartnerDataAction> = () => {
  return {
    type: AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_DATA
  };
};
