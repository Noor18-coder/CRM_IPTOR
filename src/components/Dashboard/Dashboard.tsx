import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";
import Header from '../Shared/Header/Header';
import Loader from '../Shared/Loader/Loader';
import { useMediaQuery } from 'react-responsive';
import FooterMobile from '../Shared/Footer/FooterMobile';

import { setLoadingMask, loadInitialConfig, getOpportunityTypes, getOpportunityContactRoles, getCurrencies, getOppDefaults, getCountries, getAreas } from '../../store/InitialConfiguration/Actions';

const Dashboard:React.FC = () => {
    const state: AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })

    React.useEffect(() => {
        dispatch(loadInitialConfig());
        dispatch(getOppDefaults());
        dispatch(getCountries());
        dispatch(getAreas());
        dispatch(getOpportunityContactRoles());
    },[]);

    return (
       <>
            { state.enviornmentConfigs.error && <div><h1>Error Occurred!!!</h1></div>}
            {state.enviornmentConfigs.loadingMask && <Loader component='opportunity'/>}
            <Header page={0}/>
            { state.enviornmentConfigs.error ? <div><h1>Error Occurred!!!</h1></div> : <h1> Dashboard </h1>}
            { (isMobile || isTablet) ? <FooterMobile /> : null}
       </>
    )
}

export default Dashboard;