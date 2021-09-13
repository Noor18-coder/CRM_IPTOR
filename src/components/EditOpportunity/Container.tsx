import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import Loader from '../Shared/Loader/Loader';
import { AppState } from '../../store/store';
import EditOpportunity from './EditOpportunity';
import { openOpportunityForm } from '../../store/OpportunityDetails/Actions';
import ApprovalPopup from '../Approvals/ApprovalPopup';

const Container: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  const closeDrawerAndRefresh = () => {
    document.body.classList.remove('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: false }));
  };

  return (
    <>
      {state.addOpportunity.loader ? <Loader /> : null}
      {isMobile || isTablet ? (
        state.opportuntyDetails.editOportunity.open ? (
          state.opportuntyDetails.editOportunity.action === 'edit' ? (
            <EditOpportunity />
          ) : state.opportuntyDetails.editOportunity.action === 'approval' ? (
            <ApprovalPopup reloadOpportunityDetailsPage={closeDrawerAndRefresh} />
          ) : null
        ) : null
      ) : (
        <Drawer anchor="right" open={state.opportuntyDetails.editOportunity.open}>
          {state.opportuntyDetails.editOportunity.open ? (
            state.opportuntyDetails.editOportunity.action === 'edit' ? (
              <EditOpportunity />
            ) : state.opportuntyDetails.editOportunity.action === 'approval' ? (
              <ApprovalPopup reloadOpportunityDetailsPage={closeDrawerAndRefresh} />
            ) : null
          ) : null}
        </Drawer>
      )}
    </>
  );
};

export default Container;
