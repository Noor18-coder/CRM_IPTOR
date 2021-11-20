import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { isArray } from 'lodash';
import i18n from '../../i18n';
import { AppState } from '../../store/store';
import { ApprovalLog } from '../../helpers/Api/ApprovalLog';
import * as models from '../../helpers/Api/models';
import { openOpportunityForm, saveOpportunityDetails, saveOpportunityLogs } from '../../store/OpportunityDetails/Actions';
import { setLoadingMask, removeLoadingMask } from '../../store/InitialConfiguration/Actions';
import { ParentFiles, APPROVAL_STATUS } from '../../config/Constants';
import { Notes } from '../../helpers/Api/Notes';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';

interface Props {
  reloadOpportunity: () => void;
}

const ApproverSubmit: React.FC<Props> = ({ reloadOpportunity }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();

  const key = state.opportuntyDetails.editOportunity.subGroupName;
  const opportunityData = state.opportuntyDetails.editOportunity.approvalHistory;

  const [approvalError, setApprovalError] = React.useState<string>('');
  const [comment, setComment] = React.useState<string>('');

  const closePopupAndReloadOpportunity = () => {
    document.body.classList.remove('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: false }));
    reloadOpportunity();
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  const isManager = (userId: string) => {
    const tempUser: models.UserItem | undefined = state.users.users.find((obj: models.UserItem) => {
      return obj.user === userId;
    });

    if (tempUser && tempUser.MANAGER && tempUser.MANAGER === state.auth.user.user) {
      return true;
    }
    return false;
  };

  const submitApproval = async () => {
    if (opportunityData && key) {
      const submitApprovalDetails = {
        approver: opportunityData.approver ? opportunityData.approver : '',
        opportunityId: opportunityData.opportunityId,
        salesStage: opportunityData.stage ? opportunityData.stage : '',
        levelId: opportunityData.level ? opportunityData.level : 0,
        user: opportunityData.approver ? opportunityData.approver : '',
        approvalLogStatus: key,
      };

      try {
        const data: any = await ApprovalLog.addApprovalLog(submitApprovalDetails);
        dispatch(setLoadingMask());
        if (data && data.data && data.data.approvalLogId) {
          const params: models.AddNotesRequestParam = {
            parentFile: ParentFiles.OPPORTUNITY_APPROVALS_NOTES,
            parentId: data.data.approvalLogId,
            text: comment,
          };
          await Notes.addNote(params);
          dispatch(removeLoadingMask());
          closePopupAndReloadOpportunity();
          const details: models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(opportunityData.opportunityId);
          dispatch(saveOpportunityDetails(details));
          dispatch(saveOpportunityLogs(opportunityData.opportunityId));
          if (
            details &&
            (state.auth.user.role === 'Admin' ||
              (details.approvalStatus &&
                details.approvalStatus !== APPROVAL_STATUS.SUBMITTED &&
                details.activ === true &&
                state.auth.user.user === details.userId) ||
              (data.activ === true && data.userId && isManager(data.userId)))
          ) {
            dispatch(openOpportunityForm({ allowEdit: true }));
          } else {
            dispatch(openOpportunityForm({ allowEdit: false }));
          }
        } else if (data && data.messages && isArray(data.messages) && data.messages[0] && data.messages[0].text) {
          setApprovalError(data.messages[0].text);
          dispatch(removeLoadingMask());
        } else {
          setApprovalError(i18n.t('commonErrorMessage'));
          dispatch(removeLoadingMask());
        }
      } catch (error) {
        dispatch(removeLoadingMask());
        setApprovalError(i18n.t('commonErrorMessage'));
      }
    }
  };

  return (
    <>
      <div className="stage-level-container">
        <div className="stage-level-section">
          <div className="stage-row approval-data-rows">
            <div className="form-group oppty-form-elements">
              <label className="cust-label" htmlFor="comment">
                {i18n.t('comment')}
              </label>
              <textarea className="form-control" placeholder={i18n.t('addComment')} id="comment" onChange={onInputValueChange} />
            </div>
            <button className="approval-btn" type="button" onClick={submitApproval}>
              {key === 'rejected' ? i18n.t('reject') : i18n.t('approve')}
            </button>
            {approvalError ? <p className="error">{approvalError}</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApproverSubmit;
