import React from 'react';
import { Dispatch } from 'redux';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import * as models from '../../helpers/Api/models';
import FooterMobile from '../Shared/Footer/FooterMobile';
import { AppState } from '../../store/store';
import { getCurrencySymbol } from '../../helpers/utilities/lib';
import OpportunityList from '../../helpers/Api/OpportunityList';
import { setBusinessPartnerLoader } from '../../store/AddCustomer/Actions';
import Loader from '../Shared/Loader/Loader';
import { Constants, APPROVAL_STATUS } from '../../config/Constants';

const NotificationList: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767.98 });
  const state: AppState = useSelector((loggedState: AppState) => loggedState);
  const [params, setParams] = React.useState<any>({});
  const [rparams, setRParams] = React.useState<any>({});
  const [isActive, setActive] = React.useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const [opptyNotificationList, setOpptyNotificationList] = React.useState<models.OpportunityListItem[]>([]);
  const history = useHistory();

  React.useEffect(() => {
    fetchOpptyNotificationList();
  }, []);

  const fetchOpptyNotificationList = async () => {
    dispatch(setBusinessPartnerLoader(true));
    params.selectApprover = state.auth.user.user;
    params.selectApprovalStatus = APPROVAL_STATUS.SUBMITTED;
    setParams(params);
    const data: any = await OpportunityList.get(Constants.OPPORTUNITY_LIST_LOAD_LIMIT, 0, '', params);
    if (data && data.data && data.data.items) {
      setOpptyNotificationList(data.data.items);
    } else {
      setOpptyNotificationList([]);
    }
    dispatch(setBusinessPartnerLoader(false));
  };

  const fetchOpptyRejectedList = async () => {
    dispatch(setBusinessPartnerLoader(true));
    rparams.selectUserId = state.auth.user.user;
    rparams.selectApprovalStatus = APPROVAL_STATUS.REJECTED;
    setRParams(rparams);
    const data: any = await OpportunityList.get(Constants.OPPORTUNITY_LIST_LOAD_LIMIT, 0, '', rparams);
    if (data && data.data && data.data.items) {
      setOpptyNotificationList(data.data.items);
    } else {
      setOpptyNotificationList([]);
    }
    dispatch(setBusinessPartnerLoader(false));
  };

  const showApproverList = () => {
    setActive(!isActive);
    fetchOpptyNotificationList();
  };

  const showRejectedList = () => {
    setActive(!isActive);
    fetchOpptyRejectedList();
  };

  const openOpptyDetails = (opportunityId: any) => {
    const opptyId = opportunityId || null;
    if (opptyId) {
      history.push({ pathname: '/opp-details', state: { oppid: opptyId } });
    }
  };
  return (
    <>
      <Header page={4} />
      {state.addBusinessPartner.loader && <Loader component="opportunity" />}
      <div className="section-notification">
        <div className="d-flex justify-content-between action-btns-row">
          <div className="lft-col noti-tabs">
            <input
              type="button"
              className={isActive ? 'report-btns' : 'report-btns active'}
              value="Pending for Approval"
              onClick={() => showApproverList()}
            />
            <input type="button" className={isActive ? 'report-btns active' : 'report-btns'} value="Rejected" onClick={() => showRejectedList()} />
          </div>
        </div>
        <div className="notification-list-items">
          {opptyNotificationList
            ? opptyNotificationList &&
              opptyNotificationList.map((obj: models.OpportunityListItem) => {
                return (
                  <div
                    className="table-body-row s-pending band-red"
                    role="presentation"
                    key={obj.opportunityId}
                    onClick={() => openOpptyDetails(obj.opportunityId)}
                    onKeyDown={() => openOpptyDetails(obj.opportunityId)}>
                    <div className="table-cell">
                      <span className="o-name">{obj.desc}</span> <span className="o-number">{obj.opportunityId}</span>
                    </div>
                    {/* <div className="table-cell justify-content-center">01 Apr, 2021 - 9:00 am</div> */}
                    <div className="table-cell justify-content-center">&nbsp;</div>
                    <div className="table-cell justify-content-center align-items-end">
                      <span className="o-size">
                        {state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA &&
                          getCurrencySymbol(state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA)}{' '}
                        {obj.estValue}
                      </span>
                    </div>
                    <div className="table-cell justify-content-center">
                      <span
                        className={
                          obj.approvalStatus === APPROVAL_STATUS.REJECTED
                            ? 'status-rejected'
                            : obj.approvalStatus === APPROVAL_STATUS.SUBMITTED
                            ? 'status-pending'
                            : obj.approvalStatus === APPROVAL_STATUS.APPROVED
                            ? 'status-approved'
                            : 'status-pending'
                        }>
                        {obj.approvalStatus}
                      </span>
                    </div>
                    <div className="table-cell justify-content-center" />
                    <div className="table-cell justify-content-center align-items-end last-cell" />
                  </div>
                );
              })
            : null}
        </div>

        <div className="mob-notification-list-items">
          {opptyNotificationList
            ? opptyNotificationList &&
              opptyNotificationList.map((obj: models.OpportunityListItem) => {
                return (
                  <div
                    className="notification-card band-red"
                    role="presentation"
                    key={obj.opportunityId}
                    onClick={() => openOpptyDetails(obj.opportunityId)}
                    onKeyDown={() => openOpptyDetails(obj.opportunityId)}>
                    <div className="customer-row d-flex justify-content-between">
                      <div className="customer-name">
                        {obj.desc}
                        <span className="id">{obj.opportunityId}</span>
                      </div>
                      {/* <div className="price-date">
                        $ 130k <span className="dt">11 APR, 2021 - 9:00 AM</span>
                      </div> */}
                      <div className="price-date">
                        {state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA &&
                          getCurrencySymbol(state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA)}{' '}
                        {obj.estValue} <span className="dt">&nbsp;</span>
                      </div>
                    </div>
                    <div className="status-row d-flex justify-content-between">
                      <div className="status pending">{obj.approvalStatus}</div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      {isMobile ? <FooterMobile page={4} /> : <Footer />}
    </>
  );
};

export default NotificationList;
