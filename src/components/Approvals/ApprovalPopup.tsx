import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import ImageConfig from '../../config/ImageConfig';
import { AppState } from '../../store/store';

import ApprovalHistory from './ApprovalHistory';
import SubmitForApproval from './SubmitForApproval';
import ApproverSubmit from './ApproverSubmit';

import { openOpportunityForm } from '../../store/OpportunityDetails/Actions';

interface Props {
  reloadOpportunityDetailsPage: () => void;
}
const ApprovalPopup: React.FC<Props> = ({ reloadOpportunityDetailsPage }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [headerName, setHeaderName] = React.useState<string>('Edit Opportunity');

  const closeAction = () => {
    document.body.classList.remove('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: false }));
  };

  const loadComponent = () => {
    const { groupName } = state.opportuntyDetails.editOportunity;

    if (groupName === 'history') {
      return <ApprovalHistory />;
    } else if (groupName === 'submit_approval') {
      return <SubmitForApproval reloadOpportunity={reloadOpportunityDetailsPage} />;
    } else {
      return <ApproverSubmit reloadOpportunity={reloadOpportunityDetailsPage} />;
    }
  };

  React.useEffect(() => {
    const { groupName } = state.opportuntyDetails.editOportunity;
    if (groupName === 'history') {
      setHeaderName('Approvals History');
    } else if (groupName === 'submit_approval') {
      setHeaderName('You Need Approval');
    } else if (groupName === 'approverSubmit') {
      setHeaderName('Approval');
    }
  }, []);

  return (
    <>
      <div className="sliding-panel-container">
        <div className="sliding-panel">
          <div className="title-row opp-header-text">
            <button type="button" className="mob-steps-back" onClick={closeAction}>
              <img src={ImageConfig.CHEVRON_LEFT} alt="Back" />
            </button>
            {headerName}
            <button type="button" className="panel-close-icon link-anchor-button" onClick={closeAction}>
              <img src={ImageConfig.CLOSE_BTN} alt="Close" />
            </button>
          </div>

          <div className="all-opportunity-steps-container">
            <div className="approval-forms">
              {/* <p className="stepone-title">Opportunity Name</p> */}
              <div className="">
                <div className="steps-one-forms">{loadComponent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovalPopup;
