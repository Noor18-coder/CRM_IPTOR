import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";

import Drawer from '@material-ui/core/Drawer';
import Loader from '../Shared/Loader/Loader';
import { AppState } from "../../store/store";
import EditOpportunity from '../EditOpportunity/EditOpportunity';

const Container:React.FC = () => {

  const state:AppState = useSelector((state: AppState) => state);
  const dispatch:Dispatch<any> = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  const isDesktop = useMediaQuery({ minWidth: 992 });


  
  return (
    <React.Fragment>
        {state.addOpportunity.loader ? <Loader /> : null}
        {  isMobile || isTablet ? (state.opportuntyDetails.editOportunity.open ? <EditOpportunity  />  : null ) :  
        <Drawer anchor={'right'} open={state.opportuntyDetails.editOportunity.open}>
          { state.opportuntyDetails.editOportunity.open ? <EditOpportunity /> : null}
        </Drawer> }
    </React.Fragment>

  );
}

export default Container;