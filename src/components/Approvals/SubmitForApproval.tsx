import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { isArray } from 'lodash';
import { Image } from 'react-bootstrap';
import errorIcon from '../../assets/images/error.png';
import { AppState } from '../../store/store';
import { ApprovalLog } from '../../helpers/Api/ApprovalLog';
import * as models from '../../helpers/Api/models';
import ApproverSearchField from '../Shared/Search/ApproverSearchField';
import i18n from '../../i18n';
import { Notes } from '../../helpers/Api/Notes';
import { ParentFiles, APPROVAL_STATUS } from '../../config/Constants';
import { setLoadingMask, removeLoadingMask } from '../../store/InitialConfiguration/Actions';
import { openOpportunityForm, saveOpportunityDetails, saveOpportunityLogs } from '../../store/OpportunityDetails/Actions';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';

interface Props {
  reloadOpportunity: () => void;
}

const SubmitForApprovals: React.FC<Props> = ({ reloadOpportunity }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();

  const approvalData = state.opportuntyDetails.editOportunity.submitApprovalData;
  const subGroupData = state.opportuntyDetails.editOportunity.subGroupName;
  const defaultApprover = approvalData && approvalData.defaultApprover ? approvalData.defaultApprover : '';
  const existedApprover = approvalData && approvalData.approver ? approvalData.approver : '';
  const [changeApprover, setChangeApprover] = React.useState<boolean>(false);
  const [approvalError, setApprovalError] = React.useState<string>('');
  const [nextButtonEnabled, setNextButtonEnabled] = React.useState<boolean>(false);
  const handler = subGroupData !== '' ? existedApprover : defaultApprover;
  const [comment, setComment] = React.useState<string>('');
  const [approver, setApprover] = React.useState<string>(handler);
  const closePopupAndReloadOpportunity = () => {
    document.body.classList.remove('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: false }));
    reloadOpportunity();
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

  const submitForApproval = async () => {
    if (approvalData) {
      const submitApprovalRequest = {
        approver,
        opportunityId: approvalData?.opportunityId,
        salesStage: approvalData?.salesStage,
        levelId: approvalData?.levelId,
        user: state.auth.user.user,
        approvalLogStatus: 'submitted',
      };

      try {
        const data: any = await ApprovalLog.addApprovalLog(submitApprovalRequest);
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
          const details: models.OpportunityDetailsDefault = await OpportunityDetailsApi.get(approvalData?.opportunityId);
          dispatch(saveOpportunityDetails(details));
          dispatch(saveOpportunityLogs(approvalData?.opportunityId));
          if (
            details &&
            (state.auth.user.role === 'Admin' ||
              (details.approvalStatus &&
                details.approvalStatus !== APPROVAL_STATUS.SUBMITTED &&
                details.activ === true &&
                state.auth.user.user === details.userId) ||
              (details.activ === true && details.userId && isManager(details.userId)))
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

  const getName = (str: string) => {
    if (str) {
      const userObj = state.users.users.find((obj) => obj.user === str);
      return userObj?.description;
    }
    return '';
  };

  const onHandlerChange = (user: string) => {
    if (user) {
      setApprover(user);
    } else {
      setApprover('');
    }
    setChangeApprover(false);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  React.useEffect(() => {
    if (approver) {
      setNextButtonEnabled(true);
    }
  }, []);

  React.useEffect(() => {
    if (approver) {
      setNextButtonEnabled(true);
    } else {
      setNextButtonEnabled(false);
    }
  }, [approver]);

  return (
    <div className="approval-container">
      <p className="lbl-apporver-name">Approver’s Name</p>
      <p className="apporver-name">
        <>
          <div className="approver-search-container">
            <ApproverSearchField
              onChange={onHandlerChange}
              description="Owner"
              value={approver ? getName(approver) : ''}
              disabled={!changeApprover}
              currentSelectedUser={approver}
            />
          </div>
        </>
      </p>

      {/* // Comment for now. 
       <button type="button" className="add-cc" onClick={OpenCommentBox}>
        Add CC
      </button>  */}

      <div id="comment" className="form-group oppty-form-elements">
        <label htmlFor="comments" className="opp-label">
          Comment
        </label>
        <textarea className="form-control" onChange={onCommentChange} rows={3} />
      </div>

      <button
        type="button"
        className={nextButtonEnabled ? 'stepone-next-btn' : 'stepone-next-btn inactive'}
        disabled={!nextButtonEnabled}
        onClick={submitForApproval}>
        Send for Approval
      </button>
      {approvalError ? (
        <p className="error">
          <Image className="alert-icon" src={errorIcon} width={15} height={12} />
          &nbsp; {approvalError}
        </p>
      ) : null}
    </div>
  );
};

export default SubmitForApprovals;
