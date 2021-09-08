import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { isArray } from 'lodash';
import { useHistory } from 'react-router';
import i18n from '../../i18n';
import { AppState } from '../../store/store';
import { OpportunityDetailsDefault, ApprovalLogsDefault, UpdateOpportunityResponse, InitiateSubmitApprovalPopupData } from '../../helpers/Api/models';
import { getCurrencySymbol, getQuarterOfYearFromDate } from '../../helpers/utilities/lib';
import ImageConfig from '../../config/ImageConfig';
import { StagesInfo } from '../../helpers/Api/StagesInfo';
import { StageInfo } from '../../helpers/Api/models/StageInfo';
import { openOpportunityForm } from '../../store/OpportunityDetails/Actions';
import { setOpportunityLoader } from '../../store/AddOpportunity/Actions';
import { ApprovalInfo } from '../../helpers/Api/Approvals';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import { setLoadingMask, removeLoadingMask } from '../../store/InitialConfiguration/Actions';

import { APPROVAL_STATUS } from '../../config/Constants';

export interface Data {
  data: OpportunityDetailsDefault;
  reloadOpportunityDetailsPage: () => void;
}

const OpportunityInfoMobile: React.FC<Data> = (props) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const { user } = state.auth.user;
  const history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();
  const { data, reloadOpportunityDetailsPage } = props;
  const [stages, setStages] = React.useState<StageInfo[]>();
  const [logsData, setLogsData] = React.useState<ApprovalLogsDefault[]>([]);

  React.useEffect(() => {
    dispatch(setOpportunityLoader(true));
    ApprovalInfo.getApprovalLogs(data.opportunityId).then((logResponse) => {
      setLogsData(logResponse);
    });
    dispatch(setOpportunityLoader(false));
  }, []);

  React.useEffect(() => {
    StagesInfo.get().then((response) => setStages(response.items));
  }, []);

  const getUserName = (str: string) => {
    if (str) {
      const userObj = state.users.users.find((obj) => obj.user === str);
      return userObj?.description;
    }
    return '';
  };

  const backToOpportunityList = () => {
    history.goBack();
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

  const updateStage = async (obj: StageInfo) => {
    const opportunity = state.opportuntyDetails.opportunityDefaultParams;
    opportunity.stage = obj.salesStage;
    dispatch(setLoadingMask());
    const response: UpdateOpportunityResponse = await AddOpportunityApi.update(opportunity);
    dispatch(removeLoadingMask());
    if (response && response.error) {
      if (response.messages && isArray(response.messages) && response.messages[0] && response.messages[0].text) {
        // eslint-disable-next-line no-alert
        alert(response.messages[0].text);
      } else {
        // eslint-disable-next-line no-alert
        alert(i18n.t('commonErrorMessage'));
      }
    } else {
      reloadOpportunityDetailsPage();
    }
  };

  return (
    // <!-- SECTION MOBILE PRODUCT NAME CARD START -->
    <section className="opp-product-mobilecard">
      <div className="d-flex justify-content-between product-name-action-row">
        <div role="presentation" className="lft-prodname" onClick={backToOpportunityList}>
          <p>
            {data.customerName} <span className="id-num">{data.customer} </span>
            <span className="location">{data.handler}, NA</span>
          </p>
        </div>
        <div className="rgt-actioncol">
          <ul className="list-inline ">
            <li className="list-inline-item">
              <img src={ImageConfig.HISTORY} alt="History" title="History" />
            </li>
            <li className="list-inline-item">
              <img src={ImageConfig.STAR} alt="Star" title="Star" />
            </li>
            <li className="list-inline-item">
              <img src={ImageConfig.MORE_V_ELLIPSIS} alt="More" title="More" />
            </li>
          </ul>
        </div>
      </div>

      <div className="status-row">
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
          <li className="list-inline-item status">{data.approvalStatus}</li>
        </ul>
      </div>

      <div className="qtr-details d-flex justify-content-between">
        <div className="curr-qtr">
          <p>
            <span>Close Quarter</span>
            {getQuarterOfYearFromDate(data.endDate)}
          </p>
        </div>

        <div className="deal-size">
          <p>
            <span>Deal Size</span> {`${getCurrencySymbol(data.currency)} ${data.currentValue}`}
          </p>
        </div>
      </div>

      <div className="mobsec-staging">
        <p className="title">Stage</p>

        <div className="stage-lvl">
          <div className="hscroll-wrapper">
            <ul className="list-inline stage-circles d-flex justify-content-between">
              {stages
                ? stages.map((obj) => {
                    if (data.stage === obj.salesStage) {
                      return (
                        <li
                          className={
                            data.approvalStatus === APPROVAL_STATUS.REJECTED
                              ? 'list-inline-item reject'
                              : data.approvalStatus === APPROVAL_STATUS.SUBMITTED
                              ? 'list-inline-item submit'
                              : data.approvalStatus === APPROVAL_STATUS.APPROVED
                              ? 'list-inline-item active'
                              : data.approvalStatus === APPROVAL_STATUS.LOST
                              ? 'list-inline-item lost'
                              : 'list-inline-item active'
                          }>
                          {obj.salesStage}
                        </li>
                      );
                    }
                    if (
                      state.opportuntyDetails.editOportunity.allowEdit &&
                      data.approvalStatus !== APPROVAL_STATUS.SUBMITTED &&
                      data.approvalStatus !== APPROVAL_STATUS.REJECTED
                    ) {
                      return (
                        <li className="list-inline-item" role="presentation" onClick={() => updateStage(obj)}>
                          {obj.salesStage}
                        </li>
                      );
                    } else {
                      return (
                        <li className="list-inline-item disabled" role="presentation" onClick={() => updateStage(obj)}>
                          {obj.salesStage}
                        </li>
                      );
                    }
                  })
                : null}
            </ul>
          </div>
          {data.approvalStatus === APPROVAL_STATUS.SUBMITTED && data.approver !== user && (
            <div className="sec-change-approver sec-change-submit d-flex justify-content-between">
              <div className="cont">Shared for approval with {getUserName(data.approver ? data.approver : '')}</div>
              <div className="action-btn">
                <button type="button" className="ghost-btn" onClick={() => submitApproval('changeApprover')}>
                  {i18n.t('changeApprover')}
                </button>
              </div>
            </div>
          )}
          {data.approvalStatus === APPROVAL_STATUS.REJECTED && data.approver !== user && (
            <div className="sec-change-approver sec-change-reject d-flex justify-content-between">
              <div className="action-btn">
                <button type="button" className="txt-link reject-text" onClick={() => toggleDrawer(true, logsData, 'approval', 'history', '')}>
                  {i18n.t('approvalHistory')}
                </button>
                <button type="button" className="txt-link reject-text" onClick={() => submitApproval('resubmitApproval')}>
                  {i18n.t('resubmitApproval')}
                </button>
              </div>
            </div>
          )}
          {data.approvalStatus === APPROVAL_STATUS.NEW && data.approvalRequired === true && data.approver !== user && (
            <div className="sec-change-approver sec-change-new d-flex justify-content-between">
              <div className="action-btn">
                <button type="button" className="txt-link submit-text" onClick={() => submitApproval('')}>
                  {i18n.t('submitApproval')}
                </button>
              </div>
            </div>
          )}
          {data.approvalStatus === APPROVAL_STATUS.LOST && data.approver !== user && (
            <div className="sec-change-approver sec-change-lost d-flex justify-content-between">
              <div>Opportunity lost due to</div>
            </div>
          )}
          {data.approver === user && data.approvalStatus === APPROVAL_STATUS.SUBMITTED && (
            <div className="sec-change-approver sec-change-submit d-flex justify-content-between">
              <div className="action-btn">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OpportunityInfoMobile;
