import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { AppState } from '../../store/store';
import Header from '../Shared/Header/Header';
import HeaderMobile from '../Shared/Header/HeaderMobile';
import Loader from '../Shared/Loader/Loader';
import FooterMobile from '../Shared/Footer/FooterMobile';
import DashboardOpportunityWidgets from './DashboardOpportunityWidgets';
import DashboarCustomerdWidgets from './DashboardCustomerWidgets';
import DashboardNewsWidgets from './DashboardNewsWidgets';
import { getUsersInfo } from '../../store/Users/Actions';

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
  getProductAttributes,
  getOpportunityContactAttributes,
  getCustomerContactAttributes,
} from '../../store/InitialConfiguration/Actions';

const Dashboard: React.FC = () => {
  const state: AppState = useSelector((DashboardState: AppState) => DashboardState);
  const dispatch: Dispatch<any> = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767.98 });

  React.useEffect(() => {
    dispatch(loadInitialConfig());
    dispatch(getUsersInfo());
    dispatch(getOppDefaults());
    dispatch(getCountries());
    dispatch(getAreas());
    dispatch(getOpportunityForecasts());
    dispatch(getCustomerIndustry());
    dispatch(getCustomerProducts());
    dispatch(getCustomerContactRoles());
    dispatch(getReasonCodes());
    dispatch(getProductAttributes());
    dispatch(getOpportunityContactAttributes());
    dispatch(getCustomerContactAttributes());
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
      <HeaderMobile />
      {state.enviornmentConfigs.error ? (
        <div>
          <h1>Error Occurred!!!</h1>
        </div>
      ) : (
        <div className="dashboard-cards-container">
          <div className="container-fluid">
            <DashboardOpportunityWidgets />
            <DashboarCustomerdWidgets />
            <DashboardNewsWidgets />
          </div>
        </div>
      )}
      {isMobile ? <FooterMobile page={0} /> : null}
    </>
  );
};

export default Dashboard;
