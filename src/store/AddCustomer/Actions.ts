/**
 * Business Partner Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { isArray } from 'lodash';
import { AppState } from '../store';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import AddCustomerApi from '../../helpers/Api/AddCustomer';
import * as models from '../../helpers/Api/models';
import {
  SaveBusinessPartnerParamAction,
  SetAddBusinessPartnerLoaderAction,
  SetAddBusinessPartnerDrawerActive,
  RemoveBusinessPartnerDataAction,
  RemoveBusinessPartnerFieldsAction,
  SaveBusinessPartnerAttributeAction,
  SaveBusinessPartnerContactAction,
  AddBusinessPartnerTypes,
  SetEditBusinessPartnerDrawerGroup,
  SetBusinessPartnerContactId,
  SetUpdateCustomerSuccess,
  SetUpdateCustomerError,
} from './Types';
import { Attributes } from '../../helpers/Api/Attributes';

/** Action to set auth state logged in status */
export const saveCustomerDefaultFields: ActionCreator<SaveBusinessPartnerParamAction> = (businessPartner: models.CustomerDetailsDefaultFields) => {
  return {
    type: AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_DEFAULT_FIELDS,
    businessPartner,
  };
};

export const saveBusinessPartnerAttributes: ActionCreator<SaveBusinessPartnerAttributeAction> = (
  attributes: models.OpportunityDetailsGroupItem[]
) => {
  return {
    type: AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_ATTRIBUTE,
    attributes,
  };
};

export const saveBusinessPartnerContacts: ActionCreator<SaveBusinessPartnerContactAction> = (contacts: models.CustomerDetailsContactsGroupItem[]) => {
  return {
    type: AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_CONTACT,
    contacts,
  };
};

export const setBusinessPartnerLoader: ActionCreator<SetAddBusinessPartnerLoaderAction> = (loader: boolean) => {
  return {
    type: AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_LOADER,
    loader,
  };
};

export const setBusinessPartnerWindowActive: ActionCreator<SetAddBusinessPartnerDrawerActive> = (addBusinessPartnerWindowActive: boolean) => {
  return {
    type: AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_WINDOW,
    addBusinessPartnerWindowActive,
  };
};

export const setBusinessPartnerWindowGroup: ActionCreator<SetEditBusinessPartnerDrawerGroup> = (businessPartnerWindowGroup: string) => {
  return {
    type: AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_WINDOW_GROUP,
    businessPartnerWindowGroup,
  };
};

export const setBusinessPartnerContactId: ActionCreator<SetBusinessPartnerContactId> = (businessPartnerContactId: string) => {
  return {
    type: AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_CONTACT_ID,
    businessPartnerContactId,
  };
};

export const setUpdateCustomerSuccess: ActionCreator<SetUpdateCustomerSuccess> = (success: boolean) => {
  return {
    type: AddBusinessPartnerTypes.SET_UPDATE_CUSTOMER_SUCCESS,
    success,
  };
};

export const setUpdateCustomerError: ActionCreator<SetUpdateCustomerError> = (error: string) => {
  return {
    type: AddBusinessPartnerTypes.SET_UPDATE_CUSTOMER_ERROR,
    error,
  };
};

export const resetBusinessPartnerData: ActionCreator<RemoveBusinessPartnerDataAction> = () => {
  return {
    type: AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_DATA,
  };
};

export const resetBusinessPartnerFields: ActionCreator<RemoveBusinessPartnerFieldsAction> = () => {
  return {
    type: AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_FIELDS,
  };
};

export const updateCustomerContact: ActionCreator<
  ThunkAction<Promise<SetUpdateCustomerSuccess | SetUpdateCustomerError>, AppState, undefined, SetUpdateCustomerSuccess | SetUpdateCustomerError>
> = (customerFields: any, customerId: any, deleteAttributes: any, type: string) => {
  return async (dispatch: Dispatch) => {
    try {
      if (type === 'update') {
        const data: any = await CustomerDetailsApi.updateContactDetails(customerFields);
        if (deleteAttributes) {
          Promise.all(
            deleteAttributes.map((obj: any) => {
              return Attributes.deleteAttribute(obj.valueId);
            })
          ).then((res: any) => {
            return res;
          });
        }
        if (data && data.error) {
          dispatch(setBusinessPartnerLoader(false));
          if (data.messages && isArray(data.messages) && data.messages[0] && data.messages[0].text) {
            const error: string = data.messages[0].text;
            return dispatch(setUpdateCustomerError(error));
          } else {
            // eslint-disable-next-line no-alert
            return dispatch(setUpdateCustomerError('Something went wrong.'));
          }
        } else {
          const details: any = await CustomerDetailsApi.getAllContactDetails(customerId);
          dispatch(saveBusinessPartnerContacts(details));

          dispatch(setBusinessPartnerLoader(false));
          dispatch(setBusinessPartnerWindowActive(false));
          return dispatch(setUpdateCustomerSuccess(true));
        }
      } else {
        const data: any = await CustomerDetailsApi.addContactDetails(customerFields);
        if (deleteAttributes) {
          Promise.all(
            deleteAttributes.map((obj: any) => {
              return Attributes.deleteAttribute(obj.valueId);
            })
          ).then((res: any) => {
            return res;
          });
        }
        if (data && data.error) {
          dispatch(setBusinessPartnerLoader(false));
          if (data.messages && isArray(data.messages) && data.messages[0] && data.messages[0].text) {
            const error: string = data.messages[0].text;
            return dispatch(setUpdateCustomerError(error));
          } else {
            // eslint-disable-next-line no-alert
            return dispatch(setUpdateCustomerError('Something went wrong.'));
          }
        } else {
          const details: any = await CustomerDetailsApi.getAllContactDetails(customerId);
          dispatch(saveBusinessPartnerContacts(details));

          dispatch(setBusinessPartnerLoader(false));
          dispatch(setBusinessPartnerWindowActive(false));
          return dispatch(setUpdateCustomerSuccess(true));
        }
      }
    } catch {
      dispatch(setBusinessPartnerLoader(false));
      return dispatch(setUpdateCustomerError('Something went wrong.'));
    }
  };
};

export const deleteCustomerContact: ActionCreator<
  ThunkAction<Promise<SetUpdateCustomerSuccess | SetUpdateCustomerError>, AppState, undefined, SetUpdateCustomerSuccess | SetUpdateCustomerError>
> = (customerId: string, contactId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const data: any = await CustomerDetailsApi.deleteContact(customerId, contactId);
      if (data && data.error) {
        dispatch(setBusinessPartnerLoader(false));
        if (data.messages && isArray(data.messages) && data.messages[0] && data.messages[0].text) {
          const error: string = data.messages[0].text;
          return dispatch(setUpdateCustomerError(error));
        } else {
          // eslint-disable-next-line no-alert
          return dispatch(setUpdateCustomerError('Something went wrong.'));
        }
      } else {
        const details: any = await CustomerDetailsApi.getAllContactDetails(customerId);
        dispatch(saveBusinessPartnerContacts(details));

        dispatch(setBusinessPartnerLoader(false));
        return dispatch(setUpdateCustomerSuccess(true));
      }
    } catch {
      dispatch(setBusinessPartnerLoader(false));
      return dispatch(setUpdateCustomerError('Something went wrong.'));
    }
  };
};

export const updateCustomerDefaultFields: ActionCreator<
  ThunkAction<Promise<SetUpdateCustomerSuccess | SetUpdateCustomerError>, AppState, undefined, SetUpdateCustomerSuccess | SetUpdateCustomerError>
> = (customerDetails: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const data: any = await AddCustomerApi.update(customerDetails);
      if (data && data.error) {
        dispatch(setBusinessPartnerLoader(false));
        if (data.messages && isArray(data.messages) && data.messages[0] && data.messages[0].text) {
          const error: string = data.messages[0].text;
          return dispatch(setUpdateCustomerError(error));
        } else {
          // eslint-disable-next-line no-alert
          return dispatch(setUpdateCustomerError('Something went wrong.'));
        }
      } else {
        const details: any = await CustomerDetailsApi.get(customerDetails.businessPartner);
        dispatch(saveCustomerDefaultFields(details));

        dispatch(setBusinessPartnerLoader(false));
        dispatch(setBusinessPartnerWindowActive(false));
        document.body.classList.remove('body-scroll-hidden');
        return dispatch(setUpdateCustomerSuccess(true));
      }
    } catch {
      dispatch(setBusinessPartnerLoader(false));
      return dispatch(setUpdateCustomerError('Something went wrong.'));
    }
  };
};
