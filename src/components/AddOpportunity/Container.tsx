import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";

import { setOpportunityWindowActive } from '../../store/AddOpportunity/Actions';
import Drawer from '@material-ui/core/Drawer';
import AddOpportunity from './AddOpportunity';
import Loader from '../Shared/Loader/Loader';
import { AppState } from "../../store/store";
import { AddOpportunityContextProvider, AddOpportunityContextInterface } from './AddOpportunityContext';

const Container:React.FC<AddOpportunityContextInterface> = ({ customerId, customerName}) => {

  const state:AppState = useSelector((state: AppState) => state);
  const dispatch:Dispatch<any> = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const closeDrawer = () => (event:React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
    dispatch(setOpportunityWindowActive(false))
  };

  const customerData:AddOpportunityContextInterface = {
    customerId: customerId,
    customerName: customerName
  };

  
  return (
    <React.Fragment>
       <AddOpportunityContextProvider value={customerData}>
        {state.addOpportunity.loader ? <Loader /> : null}
        {  isMobile || isTablet ? (state.addOpportunity.addOpptyWindowActive ? <AddOpportunity  />  : null ) :  
        <Drawer anchor={'right'} open={state.addOpportunity.addOpptyWindowActive}>
          <AddOpportunity />
        </Drawer> }
      </AddOpportunityContextProvider>
    </React.Fragment>

  );
}

export default Container;