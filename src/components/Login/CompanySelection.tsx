import React from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';

import logo from '../../assets/images/iptor-logo-orange.svg';

import { Company } from './Shared/Company';
import LoginFooter from './Shared/LoginFooter';

import { CompanyInfoItem, UserItem } from '../../helpers/Api/models';
import { AppState } from '../../store';
import LeftColmData from './Shared/LeftColmData';
import Loader from '../Shared/Loader/Loader';

export interface Props {
  selectCompany: (company: string) => void;
  backToLogin: () => void;
}

export const CompanySelection: React.FC<Props> = ({ selectCompany, backToLogin }) => {
  // Fetching companies list from the redux-store.
  const state: UserItem = useSelector((companyState: AppState) => companyState.auth.user);
  // Assign the same list to local state variable.
  const [user, setsUser] = React.useState<any>(state.currentEnvironment);
  const [company, setCurrentCompany] = React.useState<string>();
  const [loader, setLoader] = React.useState<boolean>(false);

  // Clear the previous selection and send the company name to call login API.
  const selectState = (key: string) => {
    if (state.selectedCompany === '') setLoader(true);
    if (key === company) {
      return;
    }

    const newList = user.map((item: CompanyInfoItem) => {
      if (item.companyCode === key || item.companyCode === company) {
        const updatedItem = {
          ...item,
          selected: !item.selected,
        };
        return updatedItem;
      }
      return item;
    });
    setsUser(newList);
    setCurrentCompany(key);
    selectCompany(key);
  };

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
          <Company companies={user} doClick={selectState} />
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
