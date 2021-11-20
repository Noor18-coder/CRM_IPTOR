import React from 'react';
import { Dispatch } from 'redux';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import ImageConfig from '../../config/ImageConfig';
import { AppState } from '../../store/store';

import EditAttributes from './EditAttributes';
import EditBasicInfo from './EditBasicInfo';
import AddContact from './AddContact';
import ViewContact from './ViewContact';
import EditItem from './EditItem';
import AddItem from './AddItem';
import DeactivateOpportunity from './DeactivateOpportunity';
import AssignOpportunity from './AssignOpportunity';
import { openOpportunityForm, setEditOpportunityErrorMessage } from '../../store/OpportunityDetails/Actions';

const EditOpportunity: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [headerName, setHeaderName] = React.useState<string>('Edit Opportunity');

  const closeAction = () => {
    document.body.style.overflowY = '';
    const { groupName } = state.opportuntyDetails.editOportunity;

    document.body.classList.remove('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: false }));
    if (groupName === 'deactivate-opportunity') {
      dispatch(openOpportunityForm({ closeLostForm: true }));
    }
  };

  const loadComponent = () => {
    const { groupName } = state.opportuntyDetails.editOportunity;

    switch (groupName) {
      case 'opportunity_defaults':
        return <EditBasicInfo />;
      case 'add_contact':
        return <AddContact />;
      case 'view_contact':
        return <ViewContact />;
      case 'edit_item':
        return <EditItem />;
      case 'add_item':
        return <AddItem />;
      case 'assign_opportunity':
        return <AssignOpportunity />;
      case 'deactivate-opportunity':
        return <DeactivateOpportunity />;
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
      case 'view_contact':
        setHeaderName('View Contact Details');
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

  const hideErrorMessage = () => {
    return dispatch(setEditOpportunityErrorMessage(''));
  };

  return (
    <>
      <div className="sliding-panel-container fixed-header-footer editopp-error-msg">
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
            {state.opportuntyDetails.editOportunity.error ? (
              <Alert variant="danger" onClose={hideErrorMessage} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>{state.opportuntyDetails.editOportunity.error}</p>
              </Alert>
            ) : null}
            {loadComponent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOpportunity;
