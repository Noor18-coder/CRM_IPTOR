import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import AddOpportunity from './AddOpportunity';
import Loader from '../Shared/Loader/Loader';
import { AppState } from '../../store/store';
import { AddOpportunityContextProvider, AddOpportunityContextInterface } from './AddOpportunityContext';

const Container: React.FC<AddOpportunityContextInterface> = ({ customerId, customerName }) => {
  const state: AppState = useSelector((appState: AppState) => appState);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  const customerData: AddOpportunityContextInterface = {
    customerId,
    customerName,
  };

  return (
    <>
      <AddOpportunityContextProvider value={customerData}>
        {state.addOpportunity.loader ? <Loader /> : null}
        {state.addOpportunity.loader ? <Loader /> : null}
        {isMobile || isTablet ? (
          state.addOpportunity.addOpptyWindowActive ? (
            <AddOpportunity />
          ) : null
        ) : (
          <Drawer anchor="right" open={state.addOpportunity.addOpptyWindowActive}>
            <AddOpportunity />
          </Drawer>
        )}
      </AddOpportunityContextProvider>
    </>
  );
};

export default Container;
