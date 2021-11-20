import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { ApprovalLogsDefault } from '../../helpers/Api/models';
import { AppState } from '../../store/store';
import { getDateTimeFormat } from '../../helpers/utilities/lib';
import { setOpportunityLoader } from '../../store/AddOpportunity/Actions';
import { ApprovalInfo } from '../../helpers/Api/Approvals';
import { APPROVAL_STATUS } from '../../config/Constants';

const ApprovalHistory: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [approvalDetails, setApprovalDetails] = React.useState<ApprovalLogsDefault[]>([]);
  const [stageData, setStageData] = React.useState<any>();
  const [stageGroups, setStageGroups] = React.useState<any>();
  const [comments, setComments] = React.useState<any>();
  const { logs } = state.opportuntyDetails.approvalHistoryLogs;

  const getCommentsDetails = (approvalData: ApprovalLogsDefault[]) => {
    dispatch(setOpportunityLoader(true));
    Promise.all(
      approvalData.map((approvalObj: ApprovalLogsDefault) => {
        return ApprovalInfo.getAllNotes(approvalObj.approvalLogId);
      })
    ).then((noteDetails) => {
      const noteData = noteDetails;
      setComments(noteData);
      dispatch(setOpportunityLoader(false));
    });
  };

  React.useEffect(() => {
    if (logs) {
      getCommentsDetails(logs);
      setApprovalDetails(logs);
    }
  }, [logs]);

  React.useEffect(() => {
    dispatch(setOpportunityLoader(false));
    if (approvalDetails.length) {
      const groups = new Set(
        approvalDetails.map((obj) => {
          return obj.salesStage;
        })
      );
      const response: any = [];
      groups.forEach((salesStage: string) => {
        const groupName = salesStage;
        response[groupName] = approvalDetails.filter((obj) => obj.salesStage === groupName);
      });
      const selectedStage = response;
      setStageData(selectedStage);
    }
  }, [approvalDetails]);
  React.useEffect(() => {
    if (stageData) {
      const groups = Object.keys(stageData);
      setStageGroups(groups);
    }
  }, [stageData]);

  return (
    <>
      <div className="stage-level-container">
        <div className="stage-level-section">
          {stageGroups && stageGroups.length
            ? stageGroups.map((key: string, index: number) => {
                return <DisplayGroup title={key} data={stageData[key]} comments={comments} index={index} />;
              })
            : null}
        </div>
      </div>
    </>
  );
};

interface GroupData {
  title: string;
  data: ApprovalLogsDefault[];
  comments: [];
  index: number;
}

export const DisplayGroup: React.FC<GroupData> = ({ title, data, comments, index }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const finalStatus = data[0].approvalLogStatus;
  const finalDate = data[0].approvalLogId.slice(0, 10).replaceAll('-', '.');
  const finalTime = data[0].approvalLogId.slice(11, 16);
  const finalDateTimeValue = `${finalDate} ${finalTime}`;

  const getUserName = (str: string) => {
    if (str) {
      const userObj = state.users.users.find((obj) => obj.user === str);
      return userObj?.description;
    }
    return '';
  };

  const getUserRole = (str: string) => {
    if (str) {
      const userObj = state.users.users.find((obj) => obj.user === str);
      if (userObj && userObj.ROLE) {
        return userObj?.ROLE;
      } else {
        return '--';
      }
    }
    return '';
  };

  return (
    <>
      <div className="stage-row approval-data-rows d-flex">
        <div className="lft-col mr-auto">
          <span>Stage</span>
          {title}
        </div>
        <div className="rgt-col">
          <div className="d-flex justify-content-end ">
            <span
              className={
                finalStatus === APPROVAL_STATUS.APPROVED
                  ? 'stage-status approved'
                  : finalStatus === APPROVAL_STATUS.REJECTED
                  ? 'stage-status rejected'
                  : finalStatus === APPROVAL_STATUS.SUBMITTED
                  ? 'stage-status submitted'
                  : 'stage-status rejected'
              }>
              {data[0].approvalLogStatus}
            </span>
          </div>
          <div className="stage-dt">{getDateTimeFormat(finalDateTimeValue)}</div>
        </div>
      </div>
      {data.map((obj: ApprovalLogsDefault) => {
        const date = obj.approvalLogId.slice(0, 10).replaceAll('-', '.');
        const time = obj.approvalLogId.slice(11, 16);
        const dateTimeValue = `${date} ${time}`;
        return (
          <div className="manager-row approval-data-rows d-flex">
            <div className="lft-col mr-auto">
              <span>{getUserRole(obj.user ? obj.user : '')}</span>
              {getUserName(obj.user ? obj.user : '')}
            </div>
            <div className="rgt-col">
              <div className="d-flex justify-content-end ">
                <span
                  className={
                    obj.approvalLogStatus === APPROVAL_STATUS.APPROVED
                      ? 'txt-approved'
                      : obj.approvalLogStatus === APPROVAL_STATUS.REJECTED
                      ? 'txt-rejected'
                      : 'txt-submitted'
                  }>
                  {obj.approvalLogStatus}
                </span>
              </div>
              <div className="stage-dt">{getDateTimeFormat(dateTimeValue)}</div>
            </div>
          </div>
        );
      })}
      {index === 0 && comments && (
        <div className="section-comments">
          <div className="title">Comments</div>
          <ul className="user-comment-lists">
            {comments.map((comment: any) => {
              return (
                comment.length &&
                comment.map((commentItem: any) => {
                  const commentDate = commentItem.changedDate.replaceAll('-', '.');
                  const commentTime = commentItem.changedTime.slice(0, 5);
                  const commentDateTimeValue = `${commentDate} / ${commentTime}`;
                  return (
                    <li className="user-comment">
                      <div className="username-dt">
                        <p className="align-lft">{getUserName(commentItem.changedBy)}</p>
                        <p className="align-rgt">{getDateTimeFormat(commentDateTimeValue)}</p>
                      </div>
                      <div className="clear">&nbsp;</div>
                      <p className="comments-para">{commentItem.text}</p>
                    </li>
                  );
                })
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default ApprovalHistory;
