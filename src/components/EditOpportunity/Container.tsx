import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";

import Drawer from '@material-ui/core/Drawer';
import Loader from '../Shared/Loader/Loader';
import { AppState } from "../../store/store";
import EditOpportunity from '../EditOpportunity/EditOpportunity';
import {  openOpportunityForm} from '../../store/OpportunityDetails/Actions';

interface Props {
  reloadOpportunityDetailsPage : () => void
}
const Container: React.FC<Props> = ({reloadOpportunityDetailsPage}) => {

  const state:AppState = useSelector((state: AppState) => state);
  const dispatch:Dispatch<any> = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const closeDrawerAndRefresh = () => {
     dispatch(openOpportunityForm({open:false}));
     reloadOpportunityDetailsPage();
  }
  
  return (
    <React.Fragment>
        {state.addOpportunity.loader ? <Loader /> : null}
        {  isMobile || isTablet ? (state.opportuntyDetails.editOportunity.open ? <EditOpportunity reloadOpportunityDetailsPage={closeDrawerAndRefresh} />  : null ) :  
        <Drawer anchor={'right'} open={state.opportuntyDetails.editOportunity.open}>
          { state.opportuntyDetails.editOportunity.open ? <EditOpportunity  reloadOpportunityDetailsPage={closeDrawerAndRefresh}/> : null}
        </Drawer> }
    </React.Fragment>

  );
}

export default Container;