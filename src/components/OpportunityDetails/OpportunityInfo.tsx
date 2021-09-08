import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import i18n from '../../i18n';
import { ApprovalLogsDefault, OpportunityDetailsDefault, InitiateSubmitApprovalPopupData } from '../../helpers/Api/models';
import { getCurrencySymbol, getQuarterOfYearFromDate } from '../../helpers/utilities/lib';
import Staging from './Staging';
import { openOpportunityForm } from '../../store/OpportunityDetails/Actions';
import { setOpportunityLoader } from '../../store/AddOpportunity/Actions';
import { ApprovalInfo } from '../../helpers/Api/Approvals';
import { APPROVAL_STATUS } from '../../config/Constants';
import ImageConfig from '../../config/ImageConfig';
import { AppState } from '../../store/store';

export interface Data {
  data: OpportunityDetailsDefault;
  reloadOpportunityDetailsPage: () => void;
}

const OpportunityInfo: React.FC<Data> = (props) => {
  const { data, reloadOpportunityDetailsPage } = props;
  const state: AppState = useSelector((appState: AppState) => appState);
  const { user } = state.auth.user;
  const [logsData, setLogsData] = React.useState<ApprovalLogsDefault[]>([]);
  const dispatch: Dispatch<any> = useDispatch();

  React.useEffect(() => {
    dispatch(setOpportunityLoader(true));
    ApprovalInfo.getApprovalLogs(data.opportunityId).then((logResponse) => {
      setLogsData(logResponse);
    });
    dispatch(setOpportunityLoader(false));
  }, []);

  const getUserName = (str: string) => {
    if (str) {
      const userObj = state.users.users.find((obj) => obj.user === str);
      return userObj?.description;
    }
    return '';
  };

  const toggleDrawer = (drawerOpen: boolean, historyData: any, submitAction: string, group: string, subGroup: string) => {
    dispatch(openOpportunityForm({ open: drawerOpen, approvalHistory: historyData, action: submitAction, groupName: group, subGroupName: subGroup }));
    document.body.classList.add('body-scroll-hidden');
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
              Opportunity Value<span>{`${getCurrencySymbol(data.currency)} ${data.currentValue}`}</span>
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
          <div className="lft-col">Stage</div>
          {data.approvalStatus === APPROVAL_STATUS.SUBMITTED && data.approver !== user && (
            <div className="rgt-col">
              Shared for approval with {getUserName(data.approver ? data.approver : '')}
              <button type="button" className="ghost-btn" onClick={() => submitApproval('changeApprover')}>
                {i18n.t('changeApprover')}
              </button>
            </div>
          )}
          {data.approvalStatus === APPROVAL_STATUS.REJECTED && data.approver !== user && (
            <div className="rgt-col">
              <button type="button" className="reject-btn" onClick={() => toggleDrawer(true, logsData, 'approval', 'history', '')}>
                {i18n.t('approvalHistory')}
              </button>
              <button type="button" className="reject-btn" onClick={() => submitApproval('resubmitApproval')}>
                {i18n.t('resubmitApproval')}
              </button>
            </div>
          )}
          {data.approvalStatus === APPROVAL_STATUS.NEW && data.approvalRequired === true && data.approver !== user && (
            <div className="rgt-col">
              <button type="button" className="submit-btn" onClick={() => submitApproval('')}>
                {i18n.t('submitApproval')}
              </button>
            </div>
          )}
          {data.approvalStatus === APPROVAL_STATUS.LOST && data.approver !== user && <div className="rgt-col">Opportunity lost due to</div>}
          {data.approver === user && data.approvalStatus === APPROVAL_STATUS.SUBMITTED && (
            <div className="rgt-col">
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
            </div>
          )}
        </div>
        <Staging stage={data.stage} status={data.approvalStatus} reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />
      </section>
    </>
  );
};

export default OpportunityInfo;
