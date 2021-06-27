import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";
import Header from '../Shared/Header/Header';
import Loader from '../Shared/Loader/Loader';
import { useMediaQuery } from 'react-responsive';
import FooterMobile from '../Shared/Footer/FooterMobile';

import { getOpportunityTypes,saveOpportunityStages } from '../../store/InitialConfiguration/Actions';

const Dashboard:React.FC = () => {
    const state: AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
    const [loader, setLoader] = React.useState<boolean>(false);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })

    React.useEffect(() => {
        setLoader(true);
        dispatch(saveOpportunityStages());
        dispatch(getOpportunityTypes());
        setLoader(false);
    },[]);

    return (
       <>
            {loader && <Loader component='opportunity'/>}
            <Header page={0}/>
            <h1>Dashboard</h1>
            { (isMobile || isTablet) ? <FooterMobile /> : null}
       </>
    )
}

export default Dashboard;