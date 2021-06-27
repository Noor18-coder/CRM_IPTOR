import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";

import { setBusinessPartnerWindowActive } from '../../store/AddCustomer/Actions';
import Drawer from '@material-ui/core/Drawer';
import AddCustomer from './AddCustomer';
import Loader from '../Shared/Loader/Loader';
import { AppState } from "../../store/store";

const Container:React.FC = () => {

  const state:AppState = useSelector((state: AppState) => state);
  const dispatch:Dispatch<any> = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  //const isDesktop = useMediaQuery({ minWidth: 992 });
  //const [isOpen, setState] = React.useState(false);

  //const closeDrawer = () => (event:React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
  //  dispatch(setBusinessPartnerWindowActive(false))
  //};
  
  return (
      <React.Fragment>
      {state.addBusinessPartner.loader ? <Loader /> : null}
      {  isMobile || isTablet ? (state.addBusinessPartner.addBusinessPartnerWindowActive ? <AddCustomer  />  : null ) :  
      <Drawer anchor={'right'} open={state.addBusinessPartner.addBusinessPartnerWindowActive}>
        <AddCustomer />
      </Drawer> }
    </React.Fragment>

  );
}

export default Container;