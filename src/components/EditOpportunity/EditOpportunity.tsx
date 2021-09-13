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
import DeactivateOpportunity from './DeactivateOpportunity';
import AssignOpportunity from './AssignOpportunity';
import { openOpportunityForm } from '../../store/OpportunityDetails/Actions';

const EditOpportunity: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [headerName, setHeaderName] = React.useState<string>('Edit Opportunity');

  const closeAction = () => {
    document.body.classList.remove('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: false }));
  };

  const loadComponent = () => {
    const { groupName } = state.opportuntyDetails.editOportunity;

    switch (groupName) {
      case 'opportunity_defaults':
        return <EditBasicInfo />;
        break;
      case 'add_contact':
        return <AddContact />;
        break;
      case 'edit_item':
        return <EditItem />;
        break;
      case 'add_item':
        return <AddItem />;
        break;
      case 'assign_opportunity':
        return <AssignOpportunity />;
        break;
      case 'deactivate-opportunity':
        return <DeactivateOpportunity />;
        break;
      default:
        return <EditAttributes />;
    }
  };

  React.useEffect(() => {
    const { groupName } = state.opportuntyDetails.editOportunity;

    switch (groupName) {
      case 'add_contact':
        setHeaderName('Add Contacts');
        break;
      case 'edit_item':
        setHeaderName('Edit Product');
        break;
      case 'add_item':
        setHeaderName('Add Product');
        break;
      case 'assign_opportunity':
        setHeaderName('Assign Opportunity');
        break;
      case 'deactivate-opportunity':
        setHeaderName('Deactivate Opportunity');
        break;
      default:
        setHeaderName('Edit Opportunity');
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
