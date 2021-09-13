/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { isArray } from 'lodash';
import * as models from '../../helpers/Api/models';
import * as types from './Types';
import { AppState } from '../store';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import { ApprovalLog } from '../../helpers/Api/ApprovalLog';
import { APPROVAL_STATUS, Constants } from '../../config/Constants';
import { Attributes } from '../../helpers/Api/Attributes';

/** Action to set auth state logged in status */
export const saveOpportunityDetails: ActionCreator<types.SaveOpportunityDetailsAction> = (opportunity: models.OpportunityDetailsDefault) => {
  return {
    type: types.OpportunityDetailsTypes.SAVE_OPPORTUNITY_DETAILS,
    opportunity,
  };
};

export const saveOpportunityAttributes: ActionCreator<types.SaveOpportunityAttributesAction> = (attributes: models.AttributeValueObject[]) => {
  return {
    type: types.OpportunityDetailsTypes.SAVE_OPPORTUNITY_ATTRIBUTE_VALUES,
    attributes,
  };
};

export const saveOpportunityProducts: ActionCreator<types.SaveOpportunityProducts> = (products: models.Product[]) => {
  return {
    type: types.OpportunityDetailsTypes.SAVE_OPPORTUNITY_PRODUCTS,
    products,
  };
};

export const saveProductinformation: ActionCreator<types.SaveProductInformation> = (product: models.Product) => {
  return {
    type: types.OpportunityDetailsTypes.SAVE_PRODUCT_INFORMATION,
    product,
  };
};

export const saveOpportunityContacts: ActionCreator<types.SaveOpportunityContacts> = (contacts: models.OpportunityContact[]) => {
  return {
    type: types.OpportunityDetailsTypes.SAVE_OPPORTUNITY_CONTACTS,
    contacts,
  };
};

export const openOpportunityForm: ActionCreator<types.OpenOpportunityEditFormAction> = (options: models.OpportunityEditOptions) => {
  return {
    type: types.OpportunityDetailsTypes.OPEN_FOR_EDIT,
    options,
  };
};

export const setOpportunityEditSuccess: ActionCreator<types.SetOpportunityEditStatus> = (success: models.OpportunityEditOptions) => {
  return {
    type: types.OpportunityDetailsTypes.EDIT_OPPORTUNITY_STATUS,
    success,
  };
};

export const setEditOpportunityErrorMessage: ActionCreator<types.SetOpportunityEditErrorMessage> = (_error: string) => {
  return {
    type: types.OpportunityDetailsTypes.SET_EDIT_OPPORTUNITY_ERROR,
    error: _error,
  };
};

export const setOpportunityDetailsError: ActionCreator<types.SetOpportunityDetailsError> = (_error: string) => {
  return {
    type: types.OpportunityDetailsTypes.SET_OPPORTUNITY_DETAILS_ERROR,
    error: _error,
  };
};

/** Action to set auth state logged in status */
export const setOpportunityDetailsLoader: ActionCreator<types.SetOpportunityDetailsLoaderAction> = () => {
  return {
    type: types.OpportunityDetailsTypes.SET_OPPTY_DETAILS_LOADING_MASK,
  };
};

/** Action to set auth state logged in status */
export const removeOpportunityDetailsLoader: ActionCreator<types.RemoveOpportunityDetailsLoaderAction> = () => {
  return {
    type: types.OpportunityDetailsTypes.REMOVE_OPPTY_DETAILS_LOADING_MASK,
  };
};

/** Action to set auth state logged in status */
export const setApprovalSubmitStatus: ActionCreator<types.SetOpportunityApprovalError> = (_message: string) => {
  return {
    type: types.OpportunityDetailsTypes.SET_OPPORTUNITY_APPROVAL_STATUS,
    message: _message,
  };
};

export const editOpportunity: ActionCreator<
  ThunkAction<
    Promise<types.SetOpportunityEditStatus | types.SetOpportunityEditErrorMessage>,
    AppState,
    undefined,
    types.SetOpportunityEditStatus | types.SetOpportunityEditErrorMessage
  >
> = (opportunity: models.OpportunityDetailsDefault) => {
  return async (dispatch: Dispatch, getState) => {
    dispatch(setOpportunityDetailsLoader());
    try {
      const data: models.UpdateOpportunityResponse = await AddOpportunityApi.update(opportunity);
      if (data && data.error) {
        dispatch(removeOpportunityDetailsLoader());
        if (data.messages && isArray(data.messages) && data.messages[0] && data.messages[0].text) {
          const error: string = data.messages[0].text;
          return dispatch(setEditOpportunityErrorMessage(error));
        } else {
          // eslint-disable-next-line no-alert
          return dispatch(setEditOpportunityErrorMessage('Something went wrong.'));
        }
      } else {
        const details: models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(opportunity.opportunityId);
        dispatch(saveOpportunityDetails(details));
        const { auth } = getState();
        if (
          details &&
          details.activ &&
          details.approvalStatus &&
          details.activ === true &&
          details.approvalStatus !== APPROVAL_STATUS.SUBMITTED &&
          details.approvalStatus !== APPROVAL_STATUS.REJECTED &&
          (auth.user.role?.toLowerCase() === 'admin' || auth.user.user === details.handler)
        ) {
          dispatch(openOpportunityForm({ allowEdit: true }));
        } else {
          dispatch(openOpportunityForm({ allowEdit: false }));
        }

        if (
          details &&
          details.defaultApprover &&
          details.handler &&
          details.approvalRequired &&
          details.approvalRequired === true &&
          details.defaultApprover === details.handler
        ) {
          submitAutoApprovals(details, dispatch);
        }
        dispatch(removeOpportunityDetailsLoader());

        return dispatch(setOpportunityEditSuccess({ success: true, error: '', open: false }));
      }
    } catch {
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(setEditOpportunityErrorMessage('Something went wrong.'));
    }
  };
};

export const submitAutoApprovals = async (opportunity: models.OpportunityDetailsDefault, dispatch: Dispatch) => {
  try {
    let message = '';
    const submitApprovalDetails = {
      approver: opportunity.defaultApprover ? opportunity.defaultApprover : '',
      opportunityId: opportunity.opportunityId,
      salesStage: opportunity.stage ? opportunity.stage : '',
      levelId: opportunity.level ? opportunity.level : 0,
      user: opportunity.handler ? opportunity.handler : '',
      approvalLogStatus: 'submitted',
    };
    const approvalSubmitted: any = await ApprovalLog.addApprovalLog(submitApprovalDetails);

    if (approvalSubmitted && approvalSubmitted.data && approvalSubmitted.data.approvalLogId) {
      submitApprovalDetails.approvalLogStatus = 'approved';
      const approved: any = await ApprovalLog.addApprovalLog(submitApprovalDetails);
      message = 'Opportunity submitted for Approval.';

      if (approved && approved.data && approved.data.approvalLogId) {
        const details: models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(opportunity.opportunityId);
        message = 'Opportunity Approved successfully.';
        dispatch(saveOpportunityDetails(details));
      }
    } else {
      message = 'Unable to update the approval status.';
    }
    return dispatch(setApprovalSubmitStatus(message));
  } catch (error) {
    const message = 'Unable to update the approval status.';
    return dispatch(setApprovalSubmitStatus(message));
  }
};

export const getOpportunityDetails: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityDetailsAction | types.SetOpportunityDetailsError>,
    AppState,
    undefined,
    types.SaveOpportunityDetailsAction | types.SetOpportunityDetailsError
  >
> = (opportunityId: string) => {
  return async (dispatch: Dispatch, getState) => {
    dispatch(setOpportunityDetailsLoader());
    const { auth } = getState();
    try {
      const data: models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(opportunityId);
      dispatch(removeOpportunityDetailsLoader());
      if (data && data.error) {
        // eslint-disable-next-line no-alert
        return dispatch(setOpportunityDetailsError('Something went wrong.'));
      } else {
        if (
          data &&
          data.activ &&
          data.approvalStatus &&
          data.activ === true &&
          data.approvalStatus !== APPROVAL_STATUS.SUBMITTED &&
          data.approvalStatus !== APPROVAL_STATUS.REJECTED &&
          (auth.user.role?.toLowerCase() === 'admin' || auth.user.user === data.handler)
        ) {
          dispatch(openOpportunityForm({ allowEdit: true }));
        } else {
          dispatch(openOpportunityForm({ allowEdit: false }));
        }
        return dispatch(saveOpportunityDetails(data));
      }
    } catch {
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(setOpportunityDetailsError('Something went wrong.'));
    }
  };
};

export const getOpportunityAttributes: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityAttributesAction | types.SetOpportunityDetailsError>,
    AppState,
    undefined,
    types.SaveOpportunityAttributesAction | types.SetOpportunityDetailsError
  >
> = (opportunityId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const attributeValues: models.AttributeValueObject[] = await OpportunityDetailsApi.getGroupInfo(opportunityId);
      return dispatch(saveOpportunityAttributes(attributeValues));
    } catch {
      return dispatch(setOpportunityDetailsError('Something went wrong.'));
    }
  };
};

export const updateAllAtrributeValues: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityAttributesAction | types.SetOpportunityEditErrorMessage>,
    AppState,
    undefined,
    types.SaveOpportunityAttributesAction | types.SetOpportunityEditErrorMessage
  >
> = (attributesSet: models.AttributeFormField[]) => {
  // eslint-disable-next-line consistent-return
  return async (dispatch: Dispatch, getState) => {
    const { opportuntyDetails } = getState();
    const { opportunityId } = opportuntyDetails.opportunityDefaultParams;
    dispatch(setOpportunityDetailsLoader());
    try {
      const data = await Promise.all(
        attributesSet.map((obj: any) => {
          if (obj && obj.valueId) {
            const params: models.SaveAttributeFieldParam = {
              parentFile: Constants.OPPORTUNITY_ATTRIBUTES_PARENT_FILE,
              attributeType: obj.attributeType,
              valueId: obj.valueId,
            };
            if (obj.attributeValueB) {
              params.attributeValueB = obj.attributeValueB === 'Y';
            } else if (obj.attributeValueD) {
              params.attributeValueD = obj.attributeValueD;
            } else {
              params.attributeValue = obj.attributeValue;
            }
            return Attributes.updateAttribute(params);
          } else {
            const params: models.SaveAttributeFieldParam = {
              parentFile: Constants.OPPORTUNITY_ATTRIBUTES_PARENT_FILE,
              parentId: opportuntyDetails.opportunityDefaultParams.opportunityId,
              attributeType: obj.attributeType,
            };
            if (obj.attributeValueB) {
              params.attributeValueB = obj.attributeValueB === 'Y';
            } else if (obj.attributeValueD) {
              params.attributeValueD = obj.attributeValueD;
            } else {
              params.attributeValue = obj.attributeValue;
            }
            return Attributes.addAttribute(params);
          }
        })
      ).then((res: any) => {
        return res;
      });
      if (data) {
        const attributeValues: models.AttributeValueObject[] = await OpportunityDetailsApi.getGroupInfo(opportunityId);
        dispatch(removeOpportunityDetailsLoader());
        document.body.classList.remove('body-scroll-hidden');
        dispatch(openOpportunityForm({ open: false }));
        return dispatch(saveOpportunityAttributes(attributeValues));
      } else {
        dispatch(removeOpportunityDetailsLoader());
        return dispatch(setEditOpportunityErrorMessage('Something went wrong.'));
      }
    } catch (error) {
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(setEditOpportunityErrorMessage('Something went wrong.'));
    }
  };
};

export const getOpportunityProducts: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityProducts | types.SetOpportunityDetailsError>,
    AppState,
    undefined,
    types.SaveOpportunityProducts | types.SetOpportunityDetailsError
  >
> = (opportunityId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const products: models.Product[] = await OpportunityDetailsApi.getOpportunityItems(opportunityId);
      return dispatch(saveOpportunityProducts(products));
    } catch {
      return dispatch(setOpportunityDetailsError('Something went wrong.'));
    }
  };
};

export const getOpportunityContacts: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityContacts | types.SetOpportunityDetailsError>,
    AppState,
    undefined,
    types.SaveOpportunityContacts | types.SetOpportunityDetailsError
  >
> = (opportunityId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const contacts: models.OpportunityContact[] = await OpportunityDetailsApi.getOpportunityContact(opportunityId);
      return dispatch(saveOpportunityContacts(contacts));
    } catch {
      return dispatch(setOpportunityDetailsError('Something went wrong.'));
    }
  };
};

export const addItemsToOpportunity: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityProducts | types.SetOpportunityDetailsError>,
    AppState,
    undefined,
    types.SaveOpportunityProducts | types.SetOpportunityDetailsError
  >
> = (opportunityId: string, filterItems: models.Item[]) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await Promise.all(
        filterItems.map((item: models.Item) => {
          return AddOpportunityApi.addItem(opportunityId, item.item, 1, item.stockingUnit);
        })
      ).then((result) => {
        return result;
      });
      if (data) {
        const products: models.Product[] = await OpportunityDetailsApi.getOpportunityItems(opportunityId);
        return dispatch(saveOpportunityProducts(products));
      } else {
        return dispatch(setOpportunityDetailsError('Something went wrong.'));
      }
    } catch {
      return dispatch(setOpportunityDetailsError('Something went wrong.'));
    } finally {
      document.body.classList.remove('body-scroll-hidden');
      dispatch(openOpportunityForm({ open: false }));
    }
  };
};

export const getProductInformation: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityProducts | types.SetOpportunityDetailsError>,
    AppState,
    undefined,
    types.SaveOpportunityProducts | types.SetOpportunityDetailsError
  >
> = (itemId: string) => {
  return async (dispatch: Dispatch, getState) => {
    try {
      const { opportuntyDetails } = getState();
      const products = [...opportuntyDetails.products];
      const index: number = products.findIndex((obj: models.Product) => obj.itemId === itemId);
      const productDetails: models.OpportunityDetailsGroupItem[] = await OpportunityDetailsApi.getProductDetails(itemId);
      if (index > -1) {
        const costObj = productDetails.find((obj) => obj.attributeType === 'COST');
        // eslint-disable-next-line no-param-reassign
        products[index].cost = costObj?.attributeValue;
        const revenueObj = productDetails.find((obj) => obj.attributeType === 'REVENUE_TYPE');
        // eslint-disable-next-line no-param-reassign
        products[index].revenue = revenueObj?.attributeValue;
        const versionObj = productDetails.find((obj) => obj.attributeType === 'VERSION');
        // eslint-disable-next-line no-param-reassign
        products[index].version = versionObj?.attributeValue;
        return dispatch(saveOpportunityProducts(products));
      }
      return dispatch(setOpportunityDetailsError('Something went wrong.'));
    } catch {
      return dispatch(setOpportunityDetailsError('Something went wrong.'));
    } finally {
      document.body.classList.remove('body-scroll-hidden');
      dispatch(openOpportunityForm({ open: false }));
    }
  };
};

export const addContactToOpportunity: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityContacts | types.SetOpportunityDetailsError>,
    AppState,
    undefined,
    types.SaveOpportunityContacts | types.SetOpportunityDetailsError
  >
> = (opportunityId: string, contact: models.AddCustomerContactRequestParams) => {
  return async (dispatch: Dispatch) => {
    try {
      const params: models.AddCustomerContactRequestParams = {
        contactParentId: opportunityId,
        contactPerson: contact.contactPerson,
        phone: contact.phone,
        mobile: contact.mobile,
        whatsApp: contact.whatsApp,
        linkedin: contact.linkedin,
        fax: contact.fax,
        email: contact.email,
      };
      dispatch(setOpportunityDetailsLoader());
      await AddOpportunityApi.addContact(params);
      const contacts: models.OpportunityContact[] = await OpportunityDetailsApi.getOpportunityContact(opportunityId);
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(saveOpportunityContacts(contacts));
    } catch {
      return dispatch(setOpportunityDetailsError('Something went wrong.'));
    } finally {
      document.body.classList.remove('body-scroll-hidden');
      dispatch(openOpportunityForm({ open: false }));
    }
  };
};

export const deleteContactFromOpportunity: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityContacts | types.SetOpportunityDetailsError>,
    AppState,
    undefined,
    types.SaveOpportunityContacts | types.SetOpportunityDetailsError
  >
> = (params: models.DeleteCustomerContactParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setOpportunityDetailsLoader());
      await AddOpportunityApi.deleteContact(params);
      const contacts: models.OpportunityContact[] = await OpportunityDetailsApi.getOpportunityContact(params.contactParentId);
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(saveOpportunityContacts(contacts));
    } catch {
      return dispatch(setOpportunityDetailsError('Something went wrong.'));
    } finally {
      document.body.classList.remove('body-scroll-hidden');
      dispatch(openOpportunityForm({ open: false }));
    }
  };
};
