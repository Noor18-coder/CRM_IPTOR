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
// import { setLoadingMask, removeLoadingMask } from '../InitialConfiguration/Actions';

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
  return async (dispatch: Dispatch) => {
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
