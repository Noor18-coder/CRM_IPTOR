import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { OverlayTrigger } from 'react-bootstrap';
import { isArray } from 'lodash';
import { useHistory } from 'react-router';
import i18n from '../../i18n';
import { AppState } from '../../store/store';
import {
  ApprovalLogsDefault,
  UpdateOpportunityResponse,
  InitiateSubmitApprovalPopupData,
  OpportunityDetailsDefault,
  StageInfo,
  Reason,
} from '../../helpers/Api/models';
import { getCurrencySymbol, getQuarterOfYearFromDate } from '../../helpers/utilities/lib';
import ImageConfig from '../../config/ImageConfig';
import { StagesInfo } from '../../helpers/Api/StagesInfo';
import { openOpportunityForm, saveOpportunityLogs } from '../../store/OpportunityDetails/Actions';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import { setLoadingMask, removeLoadingMask } from '../../store/InitialConfiguration/Actions';

import { APPROVAL_STATUS } from '../../config/Constants';

export interface Props {
  popover?: () => void;
}

const OpportunityInfoMobile: React.FC<Props> = ({ popover }) => {
  const popup = popover ? popover() : null;
  const state: AppState = useSelector((appState: AppState) => appState);
  const { user } = state.auth.user;
  const history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();
  const { opportunityDefaultParams, approvalHistoryLogs } = state.opportuntyDetails;

  const [stages, setStages] = React.useState<StageInfo[]>();

  React.useEffect(() => {
    StagesInfo.get().then((response) => setStages(response.items));
    const { opportunityId } = opportunityDefaultParams;
    dispatch(saveOpportunityLogs(opportunityId));
  }, []);

  const getUserName = (str: string | undefined) => {
    if (str) {
      const userObj = state.users.users.find((obj) => obj.user === str);
      return userObj && userObj.description ? userObj?.description : str;
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

  const getLastApprover = () => {
    const approvalLogsData: ApprovalLogsDefault | undefined = approvalHistoryLogs.logs.find((obj: ApprovalLogsDefault) => {
      return obj.approvalLogStatus === opportunityDefaultParams.approvalStatus;
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

  const submitApproval = (subGroupName: string) => {
    const submitApprovalData: InitiateSubmitApprovalPopupData = {
      defaultApprover: opportunityDefaultParams.defaultApprover ? opportunityDefaultParams.defaultApprover : '',
      salesStage: opportunityDefaultParams.stage ? opportunityDefaultParams.stage : '',
      levelId: opportunityDefaultParams.level ? opportunityDefaultParams.level : 0,
      opportunityId: opportunityDefaultParams.opportunityId,
      approvalLogStatus: opportunityDefaultParams.approvalStatus ? opportunityDefaultParams.approvalStatus : '',
      approver: opportunityDefaultParams.approver ? opportunityDefaultParams.approver : '',
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
      //  reloadOpportunityDetailsPage();
    }
  };

  const getEstimatedValue = (basicInfo: OpportunityDetailsDefault) => {
    // eslint-disable-next-line max-len
    return `${
      state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA && getCurrencySymbol(state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA)
    } ${basicInfo.estimatedValueSys ? Math.round(basicInfo.estimatedValueSys) : ''}`;
  };

  const changeActiveStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.body.style.overflowY = 'hidden';
    const active: boolean = e.currentTarget.checked;
    if (active) {
      dispatch(openOpportunityForm({ open: true, groupName: 'deactivate-opportunity', action: 'edit' }));
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
    if (opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.SUBMITTED) {
      return `Shared for approval with ${getUserName(opportunityDefaultParams.approver ? opportunityDefaultParams.approver : '')}`;
    } else if (opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.APPROVED) {
      return `${opportunityDefaultParams && approvalHistoryLogs.logs.length ? getLastApprover() : null}`;
    } else if (opportunityDefaultParams.approvalRequired === true && opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.REJECTED) {
      return `${opportunityDefaultParams && approvalHistoryLogs.logs.length ? getLastApprover() : null}`;
    } else if (opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.LOST) {
      return `Opportunity lost due to ${getReasonText(opportunityDefaultParams.reason)}`;
    } else if (opportunityDefaultParams.approver === user && opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.SUBMITTED) {
      return getLastApprover();
    } else {
      return null;
    }
  };

  const getClassName = () => {
    if (opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.SUBMITTED) {
      return `sec-change-approver sec-change-submit d-flex justify-content-between`;
    } else if (opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.APPROVED) {
      return `sec-change-approver sec-change-approved d-flex justify-content-between`;
    } else if (opportunityDefaultParams.approvalRequired === true && opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.REJECTED) {
      return `sec-change-approver sec-change-reject d-flex justify-content-between`;
    } else if (opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.LOST) {
      return `sec-change-approver sec-change-lost d-flex justify-content-between`;
    } else if (opportunityDefaultParams.approver === user && opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.SUBMITTED) {
      return `sec-change-approver sec-change-submit d-flex justify-content-between`;
    } else {
      return `sec-change-approver sec-change-new d-flex justify-content-between`;
    }
  };

  return (
    // <!-- SECTION MOBILE PRODUCT NAME CARD START -->
    <section className="opp-product-mobilecard">
      <div className="d-flex justify-content-between product-name-action-row">
        <div role="presentation" className="lft-prodname" onClick={backToOpportunityList}>
          <p>
            {opportunityDefaultParams.desc} <span className="id-num">{opportunityDefaultParams.customerName} </span>
            <span className="location">{getUserName(opportunityDefaultParams?.userId)}</span>
          </p>
        </div>
        <div className="rgt-actioncol">
          <ul className="list-inline ">
            {
              // Commented Non- Functioning Buttons
              /* <li className="list-inline-item">
              <img src={ImageConfig.HISTORY} alt="History" title="History" />
            </li>
            <li className="list-inline-item">
              <img src={ImageConfig.STAR} alt="Star" title="Star" />
            </li> */
            }
            {popup && state.opportuntyDetails.editOportunity.allowEdit ? (
              <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={popup}>
                <img src={ImageConfig.MORE_V_ELLIPSIS} alt="More" title="More" />
              </OverlayTrigger>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="status-row">
        <ul className="list-inline">
          <li
            className={
              opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.REJECTED
                ? 'list-inline-item reject'
                : opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.SUBMITTED
                ? 'list-inline-item submit'
                : opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.APPROVED
                ? 'list-inline-item grade'
                : opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.LOST
                ? 'list-inline-item lost'
                : 'list-inline-item grade'
            }>
            {opportunityDefaultParams.stage}
          </li>
          <li className="list-inline-item status">{opportunityDefaultParams.approvalStatus}</li>
        </ul>
      </div>

      <div className="qtr-details d-flex justify-content-between">
        <div className="curr-qtr">
          <p>
            <span>Close Quarter</span>
            {getQuarterOfYearFromDate(opportunityDefaultParams.endDate)}
          </p>
        </div>

        <div className="deal-size">
          <p>
            <span>Opportunity Value</span> {getEstimatedValue(opportunityDefaultParams)}
          </p>
        </div>
      </div>

      {state.opportuntyDetails.editOportunity.allowEdit && (
        <div className="mobile-opp-lost d-flex justify-content-between">
          <p className="oppt-lost">Opportunity Lost</p>
          <label className="switch">
            <input
              type="checkbox"
              id="oppty-lost"
              tabIndex={0}
              checked={state.opportuntyDetails.editOportunity.closeLostForm && false}
              onChange={changeActiveStatus}
            />
            <span className="slider round" />
          </label>
        </div>
      )}

      <div className="mobsec-staging">
        <p className="title">Stage</p>

        <div className="stage-lvl">
          <div className="hscroll-wrapper">
            <ul className="list-inline stage-circles d-flex justify-content-between">
              {stages
                ? stages.map((obj) => {
                    if (opportunityDefaultParams.stage === obj.salesStage) {
                      return (
                        <li
                          className={
                            opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.REJECTED
                              ? 'list-inline-item reject'
                              : opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.SUBMITTED
                              ? 'list-inline-item submit'
                              : opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.APPROVED
                              ? 'list-inline-item active'
                              : opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.LOST
                              ? 'list-inline-item lost'
                              : 'list-inline-item active'
                          }>
                          {obj.salesStage}
                        </li>
                      );
                    }
                    if (state.opportuntyDetails.editOportunity.allowEdit && opportunityDefaultParams.approvalStatus !== APPROVAL_STATUS.SUBMITTED) {
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

            <div className={getClassName()}>
              <div className="cont">{opportunityDefaultParams && getMessage()}</div>
              <div className="action-btn">
                {(opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.LOST ||
                  opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.WON ||
                  opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.APPROVED ||
                  opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.REJECTED ||
                  opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.SUBMITTED) &&
                approvalHistoryLogs.logs.length ? (
                  <button
                    type="button"
                    className="ghost-btn approval-btns"
                    onClick={() => toggleDrawer(true, approvalHistoryLogs.logs, 'approval', 'history', '')}>
                    {i18n.t('approvalHistory')}
                  </button>
                ) : (
                  ''
                )}

                {opportunityDefaultParams.activ && opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.SUBMITTED && (
                  <>
                    <button type="button" className="ghost-btn approval-btns" onClick={() => submitApproval('changeApprover')}>
                      {i18n.t('changeApprover')}
                    </button>
                  </>
                )}

                {opportunityDefaultParams.activ &&
                  opportunityDefaultParams.approvalRequired === true &&
                  opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.REJECTED &&
                  (user === opportunityDefaultParams.userId || state.auth.user.ROLE === 'Admin') && (
                    <>
                      <button type="button" className="ghost-btn approval-btns" onClick={() => submitApproval('resubmitApproval')}>
                        {i18n.t('resubmitApproval')}
                      </button>
                    </>
                  )}
                {opportunityDefaultParams.activ &&
                  opportunityDefaultParams.approvalStatus !== APPROVAL_STATUS.SUBMITTED &&
                  opportunityDefaultParams.approvalStatus !== APPROVAL_STATUS.REJECTED &&
                  opportunityDefaultParams.approvalRequired === true && (
                    <button type="button" className="txt-link submit-text approval-btns" onClick={() => submitApproval('')}>
                      {i18n.t('submitApproval')}
                    </button>
                  )}
                {opportunityDefaultParams.activ &&
                  opportunityDefaultParams.approver === user &&
                  opportunityDefaultParams.approvalStatus === APPROVAL_STATUS.SUBMITTED && (
                    <>
                      <button
                        type="button"
                        className="approver-reject-btn approval-btns"
                        onClick={() => toggleDrawer(true, opportunityDefaultParams, 'approval', 'approverSubmit', 'rejected')}>
                        <img src={ImageConfig.BTN_CLOSE_ICON} alt="Cross Icon" className="btn-icon" /> {i18n.t('reject')}
                      </button>
                      <button
                        type="button"
                        className="approver-approve-btn approval-btns"
                        onClick={() => toggleDrawer(true, opportunityDefaultParams, 'approval', 'approverSubmit', 'approved')}>
                        <img src={ImageConfig.BTN_CHECK_ICON} alt="Right Icon" className="btn-icon" /> {i18n.t('approve')}
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpportunityInfoMobile;
