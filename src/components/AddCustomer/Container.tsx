import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";

import { setBusinessPartnerWindowActive } from '../../store/AddCustomer/Actions';
import Drawer from '@material-ui/core/Drawer';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Loader from '../Shared/Loader/Loader';
import { AppState } from "../../store/store";
import { CustomerContextProvider, CustomerContextInterface } from './CustomerContext';

export interface containerProps {
    containerType: string;
    containerData?: any;
}

const Container: React.FC<containerProps> = ({ containerType, containerData }) => {

  const state:AppState = useSelector((state: AppState) => state);
  const dispatch:Dispatch<any> = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  
  return (
      <React.Fragment>
          <CustomerContextProvider value={containerData}>
              {state.addBusinessPartner.loader ? <Loader /> : null}
              {isMobile || isTablet ? (state.addBusinessPartner.addBusinessPartnerWindowActive ? <AddCustomer /> : null) :
                  <Drawer anchor={'right'} open={state.addBusinessPartner.addBusinessPartnerWindowActive}>
                      {containerType === 'add' && <AddCustomer />}
                      {containerType === 'edit' && <EditCustomer />}
                  </Drawer>}
          </CustomerContextProvider>
    </React.Fragment>
  );
}

export default Container;