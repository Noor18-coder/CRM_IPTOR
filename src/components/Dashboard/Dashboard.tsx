import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { AppState } from '../../store/store';
import Header from '../Shared/Header/Header';
import Loader from '../Shared/Loader/Loader';
import FooterMobile from '../Shared/Footer/FooterMobile';

import {
  loadInitialConfig,
  getOppDefaults,
  getCountries,
  getAreas,
  getOpportunityForecasts,
  getCustomerIndustry,
  getCustomerProducts,
  getCustomerContactRoles,
  getReasonCodes,
} from '../../store/InitialConfiguration/Actions';

const Dashboard: React.FC = () => {
  const state: AppState = useSelector((DashboardState: AppState) => DashboardState);
  const dispatch: Dispatch<any> = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  React.useEffect(() => {
    dispatch(loadInitialConfig());
    dispatch(getOppDefaults());
    dispatch(getCountries());
    dispatch(getAreas());
    dispatch(getOpportunityForecasts());
    dispatch(getCustomerIndustry());
    dispatch(getCustomerProducts());
    dispatch(getCustomerContactRoles());
    dispatch(getReasonCodes());
  }, []);

  return (
    <>
      {state.enviornmentConfigs.error && (
        <div>
          <h1>Error Occurred!!!</h1>
        </div>
      )}
      {state.enviornmentConfigs.loadingMask && <Loader component="opportunity" />}
      <Header page={0} />
      {state.enviornmentConfigs.error ? (
        <div>
          <h1>Error Occurred!!!</h1>
        </div>
      ) : (
        <h1> Dashboard </h1>
      )}
      {isMobile || isTablet ? <FooterMobile page={0} /> : null}
    </>
  );
};

export default Dashboard;
