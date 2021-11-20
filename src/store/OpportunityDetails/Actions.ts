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
import { ApprovalInfo } from '../../helpers/Api/Approvals';
import { APPROVAL_STATUS, Constants } from '../../config/Constants';
import { Attributes } from '../../helpers/Api/Attributes';
import i18n from '../../i18n';

const commonErrorMessage = i18n.t('commonErrorMessage');

/** Action to save opportunity details */
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

/** Action to set loading mask */
export const setOpportunityDetailsLoader: ActionCreator<types.SetOpportunityDetailsLoaderAction> = () => {
  return {
    type: types.OpportunityDetailsTypes.SET_OPPTY_DETAILS_LOADING_MASK,
  };
};

/** Action to remove loading mask */
export const removeOpportunityDetailsLoader: ActionCreator<types.RemoveOpportunityDetailsLoaderAction> = () => {
  return {
    type: types.OpportunityDetailsTypes.REMOVE_OPPTY_DETAILS_LOADING_MASK,
  };
};

/** Action to reset opportunity details */
export const resetOpportunityDetails: ActionCreator<types.ResetOpportunityDetails> = () => {
  return {
    type: types.OpportunityDetailsTypes.RESET_OPPORTUNITY_DETAILS,
  };
};

/** Action to set auth state logged in status */
export const setApprovalSubmitStatus: ActionCreator<types.SetOpportunityApprovalError> = (_message: string) => {
  return {
    type: types.OpportunityDetailsTypes.SET_OPPORTUNITY_APPROVAL_STATUS,
    message: _message,
  };
};

/** Action to set auth state logged in status */
export const saveApprovalHistoryLogs: ActionCreator<types.SaveApprovalHistoryLogs> = (_data: models.ApprovalLogsData) => {
  return {
    type: types.OpportunityDetailsTypes.SAVE_APPROVAL_LOGS,
    data: _data,
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
    const { opportuntyDetails, auth, users } = getState();

    const isManager = (userId: string) => {
      const tempUser: models.UserItem | undefined = users.users.find((obj: models.UserItem) => {
        return obj.user === userId;
      });

      if (tempUser && tempUser.MANAGER && tempUser.MANAGER === auth.user.user) {
        return true;
      }
      return false;
    };

    const getErrorString = (data: models.UpdateOpportunityResponse) => {
      if (data.messages && isArray(data.messages) && data.messages[0] && data.messages[0].text) {
        return data.messages[0].text;
      } else {
        return commonErrorMessage;
      }
    };

    dispatch(setOpportunityDetailsLoader());
    try {
      const data: models.UpdateOpportunityResponse = await AddOpportunityApi.update(opportunity);
      if (data && data.error) {
        dispatch(removeOpportunityDetailsLoader());
        const error: string = getErrorString(data);
        return dispatch(setOpportunityEditSuccess({ success: true, error, open: false }));
      } else {
        if (
          opportuntyDetails.opportunityDefaultParams.estimatedValue !== opportunity.estimatedValue &&
          opportuntyDetails.opportunityDefaultParams.minimumStage
        ) {
          if (data.data.minimumStage && opportunity.stage > data.data.minimumStage) {
            opportunity.stage = data.data.minimumStage;
            const updateData: models.UpdateOpportunityResponse = await AddOpportunityApi.update(opportunity);
            if (updateData.error) {
              dispatch(removeOpportunityDetailsLoader());
              const error: string = getErrorString(updateData);
              return dispatch(setOpportunityEditSuccess({ success: true, error, open: false }));
            }
          }
          await ApprovalLog.deleteOpportunityApprovalLogs({ opportunityId: opportunity.opportunityId });
        }
        const details: models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(opportunity.opportunityId);

        if (
          details &&
          (auth.user.role === 'Admin' ||
            (details.approvalStatus &&
              details.approvalStatus !== APPROVAL_STATUS.SUBMITTED &&
              details.activ === true &&
              auth.user.user === details.userId) ||
            (details.activ === true && details.userId && isManager(details.userId)))
        ) {
          dispatch(openOpportunityForm({ allowEdit: true }));
        } else {
          dispatch(openOpportunityForm({ allowEdit: false }));
        }

        if (
          details &&
          details.defaultApprover &&
          details.userId &&
          details.approvalRequired &&
          details.approvalRequired === true &&
          details.defaultApprover === details.userId
        ) {
          await submitAutoApprovals(details, dispatch);
          dispatch(removeOpportunityDetailsLoader());
          saveOpportunityLogs(details.opportunityId);
          return dispatch(setOpportunityEditSuccess({ success: true, error: '', open: false }));
          // const opptyDetailsResponse: models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(opportunity.opportunityId);
        } else {
          dispatch(saveOpportunityDetails(details));
          dispatch(removeOpportunityDetailsLoader());
          saveOpportunityLogs(details.opportunityId);
          return dispatch(setOpportunityEditSuccess({ success: true, error: '', open: false }));
        }
      }
    } catch {
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(setEditOpportunityErrorMessage(commonErrorMessage));
    }
  };
};

export const submitAutoApprovals = async (
  opportunity: models.OpportunityDetailsDefault,
  dispatch: Dispatch
): Promise<types.SetOpportunityApprovalError> => {
  try {
    let message = '';
    const submitApprovalDetails = {
      approver: opportunity.defaultApprover ? opportunity.defaultApprover : '',
      opportunityId: opportunity.opportunityId,
      salesStage: opportunity.stage ? opportunity.stage : '',
      levelId: opportunity.level ? opportunity.level : 0,
      user: opportunity.userId ? opportunity.userId : '',
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
    const { auth, users } = getState();

    const isManager = (userId: string) => {
      const tempUser: models.UserItem | undefined = users.users.find((obj: models.UserItem) => {
        return obj.user === userId;
      });

      if (tempUser && tempUser.MANAGER && tempUser.MANAGER === auth.user.user) {
        return true;
      }
      return false;
    };
    try {
      const data: models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(opportunityId);
      dispatch(removeOpportunityDetailsLoader());
      if (data && data.error) {
        // eslint-disable-next-line no-alert
        return dispatch(setOpportunityDetailsError(commonErrorMessage));
      } else {
        if (
          (data &&
            (auth.user.role === 'Admin' ||
              (data.approvalStatus && data.approvalStatus !== APPROVAL_STATUS.SUBMITTED && data.activ === true && auth.user.user === data.userId))) ||
          (data.activ === true && data.userId && isManager(data.userId))
        ) {
          dispatch(openOpportunityForm({ allowEdit: true }));
        } else {
          dispatch(openOpportunityForm({ allowEdit: false }));
        }
        return dispatch(saveOpportunityDetails(data));
      }
    } catch {
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(setOpportunityDetailsError(commonErrorMessage));
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
      return dispatch(setOpportunityDetailsError(commonErrorMessage));
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
              params.attributeValueB = obj.attributeValueB;
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
              params.attributeValueB = obj.attributeValueB;
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
        return dispatch(setEditOpportunityErrorMessage(commonErrorMessage));
      }
    } catch (error) {
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(setEditOpportunityErrorMessage(commonErrorMessage));
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

      const data = await Promise.all(
        products.map((obj: models.Product) => {
          return OpportunityDetailsApi.getProductDetails(obj.itemId);
        })
      ).then((res: any) => {
        return res;
      });
      dispatch(removeOpportunityDetailsLoader());
      if (data) {
        products.forEach((obj: models.Product, index: number) => {
          products[index].attributes = data[index];
        });
        return dispatch(saveOpportunityProducts(products));
      }
      return dispatch(setOpportunityDetailsError(commonErrorMessage));
    } catch {
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(setOpportunityDetailsError(commonErrorMessage));
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
      return dispatch(setOpportunityDetailsError(commonErrorMessage));
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
        dispatch(saveOpportunityProducts(products));

        products.forEach(async (obj: models.Product, index: number) => {
          const productDetails: models.AttributeValueObject[] = await OpportunityDetailsApi.getProductDetails(obj.itemId);
          if (index > -1) {
            products[index].attributes = productDetails;
          }
        });
        return dispatch(saveOpportunityProducts(products));
      } else {
        return dispatch(setOpportunityDetailsError(commonErrorMessage));
      }
    } catch {
      return dispatch(setOpportunityDetailsError(commonErrorMessage));
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
      const productDetails: models.AttributeValueObject[] = await OpportunityDetailsApi.getProductDetails(itemId);

      if (index > -1) {
        products[index].attributes = productDetails;
        return dispatch(saveOpportunityProducts(products));
      }
      return dispatch(setOpportunityDetailsError(commonErrorMessage));
    } catch {
      return dispatch(setOpportunityDetailsError(commonErrorMessage));
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
        contactDC: contact.contactDC,
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
      return dispatch(setOpportunityDetailsError(commonErrorMessage));
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
      return dispatch(setOpportunityDetailsError(commonErrorMessage));
    } finally {
      document.body.classList.remove('body-scroll-hidden');
      dispatch(openOpportunityForm({ open: false }));
    }
  };
};

export const deleteAttribute: ActionCreator<
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
          return Attributes.deleteAttribute(obj.valueId);
        })
      ).then((res: any) => {
        return res;
      });
      if (data) {
        const attributeValues: models.AttributeValueObject[] = await OpportunityDetailsApi.getGroupInfo(opportunityId);
        return dispatch(saveOpportunityAttributes(attributeValues));
      } else {
        dispatch(removeOpportunityDetailsLoader());
        return dispatch(setEditOpportunityErrorMessage(commonErrorMessage));
      }
    } catch (error) {
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(setEditOpportunityErrorMessage(commonErrorMessage));
    }
  };
};

export const updateItemAttributes: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityProducts | types.SetOpportunityEditErrorMessage>,
    AppState,
    undefined,
    types.SaveOpportunityProducts | types.SetOpportunityEditErrorMessage
  >
> = (item: models.Product, attributesSet: models.AttributeFormField[]) => {
  // eslint-disable-next-line consistent-return
  return async (dispatch: Dispatch, getState) => {
    dispatch(setOpportunityDetailsLoader());
    try {
      const data = await Promise.all(
        attributesSet.map((obj: any) => {
          if (obj && obj.valueId) {
            const params: models.SaveAttributeFieldParam = {
              parentFile: Constants.OPPORTUNITY_PRODUCTS_FILE,
              attributeType: obj.attributeType,
              valueId: obj.valueId,
            };
            if (obj.attributeValueB) {
              params.attributeValueB = obj.attributeValueB;
            } else if (obj.attributeValueD) {
              params.attributeValueD = obj.attributeValueD;
            } else {
              params.attributeValue = obj.attributeValue;
            }
            return Attributes.updateAttribute(params);
          } else {
            const params: models.SaveAttributeFieldParam = {
              parentFile: Constants.OPPORTUNITY_PRODUCTS_FILE,
              parentId: item.itemId,
              attributeType: obj.attributeType,
            };
            if (obj.attributeValueB) {
              params.attributeValueB = obj.attributeValueB;
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
        let error = '';
        data.forEach((response: any) => {
          if (response && response.error) {
            if (response.messages && isArray(response.messages) && response.messages[0] && response.messages[0].text) {
              error += ` ${response.messages[0].text}`;
            }
          }
        });
        if (!error) {
          document.body.classList.remove('body-scroll-hidden');
          const { opportuntyDetails } = getState();
          const products = [...opportuntyDetails.products];
          const index: number = products.findIndex((obj: models.Product) => obj.itemId === item.itemId);
          const productDetails: models.AttributeValueObject[] = await OpportunityDetailsApi.getProductDetails(item.itemId);
          dispatch(openOpportunityForm({ open: false }));
          dispatch(removeOpportunityDetailsLoader());
          if (index > -1) {
            products[index].attributes = productDetails;
            return dispatch(saveOpportunityProducts(products));
          }
          return dispatch(setEditOpportunityErrorMessage(commonErrorMessage));
        } else {
          dispatch(removeOpportunityDetailsLoader());
          return dispatch(setEditOpportunityErrorMessage(error));
        }
      } else {
        dispatch(removeOpportunityDetailsLoader());
        return dispatch(setEditOpportunityErrorMessage(commonErrorMessage));
      }
    } catch (error) {
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(setEditOpportunityErrorMessage(commonErrorMessage));
    }
  };
};

export const deleteOpportunityProducts: ActionCreator<
  ThunkAction<
    Promise<types.SaveOpportunityProducts | types.SetOpportunityEditErrorMessage>,
    AppState,
    undefined,
    types.SaveOpportunityProducts | types.SetOpportunityEditErrorMessage
  >
> = (opportunityId: string, item: models.Product) => {
  // eslint-disable-next-line consistent-return
  return async (dispatch: Dispatch) => {
    dispatch(setOpportunityDetailsLoader());
    try {
      const params: models.DeleteOpportunityItemParams = {
        parentId: opportunityId,
        itemId: item && item.itemId ? item.itemId : '',
      };
      await OpportunityDetailsApi.deleteItem(params);
      const products: models.Product[] = await OpportunityDetailsApi.getOpportunityItems(opportunityId);

      const data = await Promise.all(
        products.map((obj: models.Product) => {
          return OpportunityDetailsApi.getProductDetails(obj.itemId);
        })
      ).then((res: any) => {
        return res;
      });
      dispatch(removeOpportunityDetailsLoader());
      if (data) {
        products.forEach((obj: models.Product, index: number) => {
          products[index].attributes = data[index];
        });
        return dispatch(saveOpportunityProducts(products));
      }
      return dispatch(setEditOpportunityErrorMessage(commonErrorMessage));
    } catch (error) {
      dispatch(removeOpportunityDetailsLoader());
      return dispatch(setEditOpportunityErrorMessage(commonErrorMessage));
    }
  };
};

export const saveOpportunityLogs: ActionCreator<
  ThunkAction<Promise<types.SaveApprovalHistoryLogs>, AppState, undefined, types.SaveApprovalHistoryLogs>
> = (opportunityId: string) => {
  // eslint-disable-next-line consistent-return
  return async (dispatch: Dispatch) => {
    try {
      const tempApprovalLogs: models.ApprovalLogsDefault[] = await ApprovalInfo.getApprovalLogs(opportunityId);
      const tempData: models.ApprovalLogsData = {
        logs: tempApprovalLogs,
        error: '',
      };
      return dispatch(saveApprovalHistoryLogs(tempData));
    } catch (error) {
      const tempData: models.ApprovalLogsData = {
        logs: [],
        error: commonErrorMessage,
      };
      return dispatch(saveApprovalHistoryLogs(tempData));
    }
  };
};
