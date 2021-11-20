/* eslint-disable prettier/prettier */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import i18n from '../../i18n';
import { ApprovalLogsDefault, OpportunityDetailsDefault, InitiateSubmitApprovalPopupData, Reason, ApprovalLogsData} from '../../helpers/Api/models';
import { getCurrencySymbol, getQuarterOfYearFromDate } from '../../helpers/utilities/lib';
import Staging from './Staging';
import { openOpportunityForm, saveOpportunityLogs } from '../../store/OpportunityDetails/Actions';
import { APPROVAL_STATUS } from '../../config/Constants';
import ImageConfig from '../../config/ImageConfig';
import { AppState } from '../../store/store';

const OpportunityInfo: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const data: OpportunityDetailsDefault = state.opportuntyDetails.opportunityDefaultParams;
  const logsData: ApprovalLogsData = state.opportuntyDetails.approvalHistoryLogs;
  const { user } = state.auth.user;
  const dispatch: Dispatch<any> = useDispatch();

  React.useEffect(() => {
    const { opportunityId } = state.opportuntyDetails.opportunityDefaultParams;
    dispatch(saveOpportunityLogs(opportunityId));
  }, []);

  const getUserName = (str: string) => {
    if (str) {
      const userObj = state.users.users.find((obj) => obj.user === str);
      return userObj && userObj.description ? userObj?.description : str;
    }
    return '';
  };

  const toggleDrawer = (drawerOpen: boolean, historyData: any, submitAction: string, group: string, subGroup: string) => {
    dispatch(openOpportunityForm({ open: drawerOpen, approvalHistory: historyData, action: submitAction, groupName: group, subGroupName: subGroup }));
    document.body.classList.add('body-scroll-hidden');
  };

  const getEstimatedValue = (basicInfo: OpportunityDetailsDefault) => {
    // eslint-disable-next-line max-len
    return `${
      state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA && getCurrencySymbol(state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA)
    } ${basicInfo.estimatedValueSys ? Math.round(basicInfo.estimatedValueSys) : ''}`;
  };

  const submitApproval = (subGroupName: string) => {
    const submitApprovalData: InitiateSubmitApprovalPopupData = {
      defaultApprover: data.defaultApprover ? data.defaultApprover : '',
      salesStage: data.stage ? data.stage : '',
      levelId: data.level ? data.level : 0,
      opportunityId: data.opportunityId,
      approvalLogStatus: data.approvalStatus ? data.approvalStatus : '',
      approver: data.approver ? data.approver : '',
    };
    dispatch(openOpportunityForm({ open: true, submitApprovalData, action: 'approval', groupName: 'submit_approval', subGroupName }));
    document.body.classList.add('body-scroll-hidden');
  };

  const getLastApprover = () => {
    const { logs } = state.opportuntyDetails.approvalHistoryLogs;
    const approvalLogsData = logs.find((obj: ApprovalLogsDefault) => {
      return obj.approvalLogStatus === data.approvalStatus;
    });

    if (approvalLogsData) {
      const approverName = approvalLogsData && approvalLogsData.approver ? getUserName(approvalLogsData.approver) : '';
      if (approverName && approvalLogsData.approvalLogStatus === APPROVAL_STATUS.APPROVED) {
        return `Approved by ${approverName}`;
      } else if (approverName && approvalLogsData.approvalLogStatus === APPROVAL_STATUS.REJECTED) {
        return `Rejected by ${approverName}`;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const getReasonText = (text?: string) => {
    if (!text) return '';
    const errorObject: Reason | undefined = state.enviornmentConfigs.reasons.find((obj: Reason) => {
      return obj.reasonCode === text;
    });
    return errorObject && errorObject.description;
  };

  const getMessage = () => {
    if (data.approvalStatus === APPROVAL_STATUS.SUBMITTED) {
      return `Shared for approval with ${getUserName(data.approver ? data.approver : '')}`;
    } else if (data.approvalStatus === APPROVAL_STATUS.APPROVED) {
      return `${data && logsData.logs.length ? getLastApprover() : null}`;
    } else if (data.approvalRequired === true && data.approvalStatus === APPROVAL_STATUS.REJECTED) {
      return `${data && logsData.logs.length ? getLastApprover() : null}`;
    } else if (data.approvalStatus === APPROVAL_STATUS.LOST) {
      return `Opportunity lost due to ${getReasonText(data.reason)}`;
    } else if (data.approver === user && data.approvalStatus === APPROVAL_STATUS.SUBMITTED) {
      return getLastApprover();
    } else {
      return '';
    }
  };

  return (
    // <!-- PRODUCT NAME SECTION START -->
    <>
      <section className="d-flex justify-content-between sec-product-desc">
        <div className="prod-name">
          <p>
            {data.desc}{' '}
            <span>
              {data.opportunityId} | {data.customerName}
            </span>
          </p>
        </div>
        <div className="mid-sec">
          <ul className="list-inline">
            <li className="list-inline-item">
              close quarter<span>{getQuarterOfYearFromDate(data.endDate)}</span>
            </li>
            <li className="list-inline-item">
              Opportunity Value<span>{`${getEstimatedValue(data)}`}</span>
            </li>
            <li className="list-inline-item">
              Opportunity Type<span>{data.oppRecordType}</span>
            </li>
          </ul>
        </div>

        <div className="sec-status">
          <ul className="list-inline">
            <li
              className={
                data.approvalStatus === APPROVAL_STATUS.REJECTED
                  ? 'list-inline-item reject'
                  : data.approvalStatus === APPROVAL_STATUS.SUBMITTED
                  ? 'list-inline-item submit'
                  : data.approvalStatus === APPROVAL_STATUS.APPROVED
                  ? 'list-inline-item grade'
                  : data.approvalStatus === APPROVAL_STATUS.WON
                  ? 'list-inline-item grade'
                  : data.approvalStatus === APPROVAL_STATUS.LOST
                  ? 'list-inline-item lost'
                  : 'list-inline-item grade'
              }>
              {data.stage}
            </li>
            <li
              className={
                data.approvalStatus === APPROVAL_STATUS.REJECTED
                  ? 'list-inline-item status rejectStatus'
                  : data.approvalStatus === APPROVAL_STATUS.APPROVED
                  ? 'list-inline-item status'
                  : 'list-inline-item status submitStatus'
              }>
              {data.approvalStatus}
            </li>
          </ul>
        </div>
      </section>
      <section className="sec-staging">
        <div className="d-flex justify-content-between title-row">
          <div className="lft-col">
            <p className="stage-bold">Stage</p>
          </div>
          <div className="rgt-col">
           { getMessage()}
          {/* {data.approvalStatus === APPROVAL_STATUS.LOST && <>Opportunity lost due to {getReasonText(data.reason)}</>} */}
          {(data.approvalStatus === APPROVAL_STATUS.LOST ||
              data.approvalStatus === APPROVAL_STATUS.WON ||
              data.approvalStatus === APPROVAL_STATUS.APPROVED || 
              data.approvalStatus === APPROVAL_STATUS.REJECTED || 
              data.approvalStatus === APPROVAL_STATUS.SUBMITTED) && logsData.logs.length ? (
              <>
                {logsData.logs.length && (
                  <button type="button" className="ghost-btn" onClick={() => toggleDrawer(true, logsData, 'approval', 'history', '')}>
                    {i18n.t('approvalHistory')}
                  </button>
                )}
              </>
              ) : ''
                }
              { data.activ && data.approvalStatus === APPROVAL_STATUS.SUBMITTED && (
              <>
                {/* // Shared for approval with {getUserName(data.approver ? data.approver : '')} */}
                <button type="button" className="ghost-btn" onClick={() => submitApproval('changeApprover')}>
                  {i18n.t('changeApprover')}
                </button>
              </>
            )}
            
            {data.activ && data.approvalRequired === true && 
            data.approvalStatus === APPROVAL_STATUS.REJECTED &&
              (user === data.userId || state.auth.user.role === 'Admin') && (
              <>
                <button type="button" className="reject-btn" onClick={() => submitApproval('resubmitApproval')}>
                  {i18n.t('resubmitApproval')}
                </button>
              </>
            )}
            {
            // eslint-disable-next-line max-len
            data.activ && data.approvalStatus !== APPROVAL_STATUS.SUBMITTED && data.approvalStatus !== APPROVAL_STATUS.REJECTED && data.approvalRequired === true && (
              <button type="button" className="submit-btn" onClick={() => submitApproval('')}>
                {i18n.t('submitApproval')}
              </button>
            )}
            
            {data.activ && data.approver === user && data.approvalStatus === APPROVAL_STATUS.SUBMITTED && (
              <>
                {/* {logsData.logs.length ? getLastApprover() : null} */}
                <button
                  type="button"
                  className="approver-reject-btn"
                  onClick={() => toggleDrawer(true, data, 'approval', 'approverSubmit', 'rejected')}>
                  <img src={ImageConfig.BTN_CLOSE_ICON} alt="Cross Icon" className="btn-icon" /> {i18n.t('reject')}
                </button>
                <button
                  type="button"
                  className="approver-approve-btn"
                  onClick={() => toggleDrawer(true, data, 'approval', 'approverSubmit', 'approved')}>
                  <img src={ImageConfig.BTN_CHECK_ICON} alt="Right Icon" className="btn-icon" /> {i18n.t('approve')}
                </button>
              </>
            )}
          </div>
        </div>
        <Staging />
      </section>
    </>
  );
};

export default OpportunityInfo;
