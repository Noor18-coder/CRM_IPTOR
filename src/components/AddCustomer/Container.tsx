import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from "react-redux";

import Drawer from '@material-ui/core/Drawer';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Loader from '../Shared/Loader/Loader';
import { AppState } from "../../store/store";
import { CustomerContextProvider } from './CustomerContext';

export interface containerProps {
    containerType: string;
    containerData?: any;
    groupType?: string;
    contactId?: string;
}

const Container: React.FC<containerProps> = ({ containerType, containerData, groupType, contactId }) => {

  const state:AppState = useSelector((state: AppState) => state);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  
  return (
      <React.Fragment>
          <CustomerContextProvider value={containerData}>
              {state.addBusinessPartner.loader ? <Loader /> : null}
              {isMobile || isTablet ? (state.addBusinessPartner.addBusinessPartnerWindowActive ?
                  containerType === 'add' ? <AddCustomer /> :
                  containerType === 'edit' && < EditCustomer groupType={groupType} contactId={contactId} /> :
                  null) :
                  <Drawer anchor={'right'} open={state.addBusinessPartner.addBusinessPartnerWindowActive}>
                      {containerType === 'add' && <AddCustomer />}
                      {containerType === 'edit' && <EditCustomer groupType={groupType} contactId={contactId} />}
                  </Drawer>}
          </CustomerContextProvider>
    </React.Fragment>
  );
}

export default Container;