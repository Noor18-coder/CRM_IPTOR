import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import ImageConfig from '../../config/ImageConfig';
import { AppState } from '../../store/store';

import EditAttributes from './EditAttributes';
import EditBasicInfo from './EditBasicInfo';
import AddContact from './AddContact';
import EditItem from './EditItem';
import AddItem from './AddItem';
import AssignOpportunity from './AssignOpportunity';
import { openOpportunityForm } from '../../store/OpportunityDetails/Actions';

interface Props {
  reloadOpportunityDetailsPage: () => void;
}
const EditOpportunity: React.FC<Props> = ({ reloadOpportunityDetailsPage }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [headerName, setHeaderName] = React.useState<string>('Edit Opportunity');

  const closeAction = () => {
    document.body.classList.remove('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: false }));
  };

  const loadComponent = () => {
    const { groupName } = state.opportuntyDetails.editOportunity;

    if (groupName === 'opportunity_defaults') {
      return <EditBasicInfo reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />;
    }
    if (groupName === 'add_contact') {
      return <AddContact refresh={reloadOpportunityDetailsPage} />;
    }
    if (groupName === 'edit_item') {
      return <EditItem reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />;
    }
    if (groupName === 'add_item') {
      return <AddItem reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />;
    }
    if (groupName === 'assign_opportunity') {
      return <AssignOpportunity reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />;
    }
    return <EditAttributes reloadOpportunityDetailsPage={reloadOpportunityDetailsPage} />;
  };

  React.useEffect(() => {
    const { groupName } = state.opportuntyDetails.editOportunity;
    if (groupName === 'add_contact') {
      setHeaderName('Add Contacts');
    } else if (groupName === 'add_item') {
      setHeaderName('Add Product');
    } else if (groupName === 'edit_item') {
      setHeaderName('Edit Product');
    } else if (groupName === 'assign_opportunity') {
      setHeaderName('Assign Opportunity');
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
            <div className="opportunity-forms">
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

export default EditOpportunity;
