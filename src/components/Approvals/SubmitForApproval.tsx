import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { isArray } from 'lodash';
import { Image } from 'react-bootstrap';
import errorIcon from '../../assets/images/error.png';
import { AppState } from '../../store/store';
import { ApprovalLog } from '../../helpers/Api/ApprovalLog';
import * as models from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import ApproverSearchField from '../Shared/Search/ApproverSearchField';
import i18n from '../../i18n';
import { Notes } from '../../helpers/Api/Notes';
import { ParentFiles } from '../../config/Constants';
import { setLoadingMask, removeLoadingMask } from '../../store/InitialConfiguration/Actions';
import { openOpportunityForm } from '../../store/OpportunityDetails/Actions';

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
  const handler = subGroupData !== '' ? existedApprover : defaultApprover;
  const [comment, setComment] = React.useState<string>('');
  const [approver, setApprover] = React.useState<string>(handler);
  const closePopupAndReloadOpportunity = () => {
    document.body.classList.remove('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: false }));
    reloadOpportunity();
  };

  const submitForApproval = async () => {
    if (approvalData) {
      const submitApprovalRequest = {
        approver,
        opportunityId: approvalData?.opportunityId,
        salesStage: approvalData?.salesStage,
        levelId: approvalData?.levelId,
        user: state.auth.user.handler,
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
      const userObj = state.users.users.find((obj) => obj.handler === str);
      return userObj?.description;
    }
    return '';
  };

  const onHandlerChange = (user: models.UserItem[]) => {
    if (user && user.length) {
      setApprover(user[0].handler);
    }
    setChangeApprover(false);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  return (
    <div className="submit-approval-form">
      <p className="approval-error">Because the deal size is more than 120K and is moved to stage A3.</p>
      <div className="form-group oppty-form-elements">
        <label htmlFor="desc" className="opp-label">
          Approver Name
        </label>
        <>
          {changeApprover ? (
            <ApproverSearchField onChange={onHandlerChange} description="Owner" />
          ) : (
            <div className="approver-search-container">
              <button
                type="button"
                className="edit-icon"
                onClick={() => {
                  setChangeApprover(true);
                }}>
                <img src={ImageConfig.EDIT_ICON} alt="edit" />
              </button>
              <span className="approver-name-value">{approver ? getName(approver) : ''}</span>
            </div>
          )}
        </>
      </div>
      <div className="form-group oppty-form-elements">
        <label htmlFor="comments" className="opp-label">
          Comment
        </label>
        <textarea className="form-control" id="comment" onChange={onCommentChange} rows={3} />
      </div>
      <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
        <button type="button" className="stepone-next-btn done" onClick={submitForApproval}>
          Done
        </button>
      </div>
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
