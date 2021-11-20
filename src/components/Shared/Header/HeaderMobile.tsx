import React from 'react';
import { Image } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { UserItem, CompanyInfoItem } from '../../../helpers/Api/models';
import { logOut } from '../../../store/Auth/Actions';
import ImageConfig from '../../../config/ImageConfig';
import { AppState } from '../../../store/store';

const HeaderMobile = (): JSX.Element => {
  const state: UserItem = useSelector((appState: AppState) => appState.auth.user);
  const dispatch: Dispatch<any> = useDispatch();
  const toggleLogoutDrawer = () => {
    document.body.style.overflowY = 'hidden';

    const mLogout = document.getElementById('mob-logout') as HTMLElement;

    mLogout.style.display = 'block';
  };
  const HideLogout = () => {
    const mLogout = document.getElementById('mob-logout') as HTMLElement;

    mLogout.style.display = 'none';
  };
  const getCompanyName = () => {
    if (state.currentEnvironment) {
      const data = state.currentEnvironment.find((obj: CompanyInfoItem) => {
        return obj.companyCode === state.selectedCompany;
      });
      return data && data.name ? data.name : '';
    }

    return '';
  };

  const logout = () => {
    dispatch(logOut());
  };
  return (
    <>
      <div className="dshbrd-sticky-header">
        <div className="dshbrd-logo-row">
          <div className="row">
            <div className="col-9 lft-col pr-0">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <Image src={ImageConfig.MOB_IPTOR_LOGO} />
                </li>
                <li className="list-inline-item">{state.currentEnvironment ? getCompanyName() : ''}</li>
              </ul>
            </div>
            <div className="col-3 pl-0 rgt-col text-right">
              <ul className="list-inline">
                {/*
                // Commented Non- Functioning Buttons
                 <li className="list-inline-item">
                  <Image src={ImageConfig.MOB_HEADER_SEARCH} />
                </li> */}
                <li className="list-inline-item">
                  <Image src={ImageConfig.HEADER_USER_ICON} className="dshbrd-mob-usericon" onClick={toggleLogoutDrawer} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="mob-logout" role="presentation" onKeyDown={HideLogout} onClick={HideLogout} className="mobview-user-prof-container">
        <div className="panel-container">
          <ul className="user-settings-list">
            <li className="username">{state.description}</li>
            <li onClick={logout} role="presentation" onKeyDown={logout} className="mob-logout">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default HeaderMobile;
