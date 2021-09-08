import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Loader from '../Shared/Loader/Loader';
import { AppState } from '../../store/store';
import { CustomerContextProvider } from './CustomerContext';

export interface ContainerProps {
  containerType: string;
  containerData?: any;
  groupType?: string;
  contactId?: string;
}

const Container: React.FC<ContainerProps> = ({ containerType, containerData, groupType, contactId }) => {
  const state: AppState = useSelector((containerState: AppState) => containerState);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  return (
    <>
      <CustomerContextProvider value={containerData}>
        {state.addBusinessPartner.loader ? <Loader /> : null}
        {isMobile || isTablet ? (
          state.addBusinessPartner.addBusinessPartnerWindowActive ? (
            containerType === 'add' ? (
              <AddCustomer />
            ) : (
              containerType === 'edit' && <EditCustomer groupType={groupType} contactId={contactId} />
            )
          ) : null
        ) : (
          <Drawer anchor="right" open={state.addBusinessPartner.addBusinessPartnerWindowActive}>
            {containerType === 'add' && <AddCustomer />}
            {containerType === 'edit' && <EditCustomer groupType={groupType} contactId={contactId} />}
          </Drawer>
        )}
      </CustomerContextProvider>
    </>
  );
};

export default Container;
