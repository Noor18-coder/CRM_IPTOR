import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-bootstrap';

import { useKeycloak } from '@react-keycloak/web';
import { Redirect } from 'react-router';
import logo from '../../assets/images/iptor-logo-orange.svg';
import LoginFooter from './Shared/LoginFooter';

import { UserItem } from '../../helpers/Api/models';
import { AppState } from '../../store';
import LeftColmData from './Shared/LeftColmData';
import Loader from '../Shared/Loader/Loader';
// import { authWithCompany, logOut } from '../../store/Auth/Actions';
import { authWithCompany } from '../../store/Auth/Actions';
import { Company } from './Shared/Company';

export const SsoLogin: React.FC = () => {
  // Fetching companies list from the redux-store.
  const state: UserItem = useSelector((companyState: AppState) => companyState.auth.user);
  const [loader, setLoader] = React.useState<boolean>(false);
  const { keycloak, initialized } = useKeycloak();
  const [loggedIn, loggedInChange] = React.useState<boolean>(false);

  const dispatch: Dispatch<any> = useDispatch();

  // Clear the previous selection and send the company name to call login API.
  const selectState = (code: string) => {
    if (state.selectedCompany === '') setLoader(true);

    if (keycloak?.authenticated && initialized && code !== '') {
      const token: any = keycloak.idTokenParsed;
      const authRequest = { user: token.app_user_id, company: code };
      dispatch(authWithCompany(authRequest));
      loggedInChange(true);
    }
  };
  const backToLogin = () => {
    keycloak.logout();
  };
  if (loggedIn || state.selectedCompany !== '') {
    return <Redirect to="/" exact />;
  }

  return (
    <div className="main-wrapper companypage">
      <LeftColmData />
      <p className="mobile-backto-login">
        <button type="button" className="txt-link footer-anchor-button" onClick={backToLogin}>
          Back to Login
        </button>
      </p>
      <div className="login-panel-container">
        <Image className="login-form-logo" src={logo} alt="Iptor" title="Iptor" />
        <p className="username-txt">
          <span className="user-txt">Hi {state.text},</span>
          <span className="company-txt">Please Select Company</span>
        </p>
        {loader && <Loader />}
        <div className="companylist-container">
          <Company companies={state.currentEnvironment!} doClick={selectState} />
        </div>
        <p className="desk-backto-login">
          <button type="button" className="txt-link footer-anchor-button" onClick={backToLogin}>
            Back to Login
          </button>
        </p>
        <LoginFooter />
      </div>
    </div>
  );
};
