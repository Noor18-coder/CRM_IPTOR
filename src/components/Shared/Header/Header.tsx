import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { OverlayTrigger, Popover, Image } from 'react-bootstrap';
import ImageConfig from '../../../config/ImageConfig';
import { getIntialsFromFullName } from '../../../helpers/utilities/lib';

import { UserItem, CompanyInfoItem } from '../../../helpers/Api/models';
import { logOut } from '../../../store/Auth/Actions';
import { AppState } from '../../../store/store';

interface Props {
  page: number;
}

const Header: React.FC<Props> = ({ page }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(page);
  const state: UserItem = useSelector((appState: AppState) => appState.auth.user);
  const dispatch: Dispatch<any> = useDispatch();
  const activeClass = 'nav-item';
  const userProfileActions = () => {
    dispatch(logOut());
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

  const popover = (
    <Popover id="popover-basic" className="tool-tip">
      <Popover.Content>{state.description}</Popover.Content>
      <Popover.Content>
        <button className="link-anchor-button header-logout" onClick={userProfileActions} tabIndex={-1} type="button">
          Logout <Image className="logout-image" height="15" src={ImageConfig.LOGOUT_ICON} alt="Iptor" title="Iptor" />
        </button>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <nav className="site-navbar navbar navbar-default bg-black" role="navigation">
        <div className="navbar-container container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand navbar-brand-center navbar-sec-logo">
              <img alt="..." className="navbar-brand-logo" src={ImageConfig.IPTOR_ICON} title="iptor" />
            </div>
            <div className="navbar-brand navbar-brand-center navbar-sec-flag">
              <span className="navbar-brand-text hidden-xs-down"> {state.currentEnvironment ? getCompanyName() : ''}</span>
            </div>
          </div>

          <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">
            <li className={currentPage === 0 ? `${activeClass} active` : activeClass}>
              <a
                className="nav-link navbar-avatar"
                onClick={() => setCurrentPage(0)}
                href="/"
                aria-expanded="false"
                data-animation="scale-up"
                role="button">
                <span className="avatar avatar-online">
                  <img src={page === 0 ? ImageConfig.NAV_DASHBOARD_ACTIVE_ICON : ImageConfig.NAV_DASHBOARD_ICON} alt="..." />
                  <i>Dashboard</i>
                </span>
              </a>
            </li>

            <li className={currentPage === 1 ? `${activeClass} active` : activeClass}>
              <a
                className="nav-link navbar-avatar"
                onClick={() => setCurrentPage(1)}
                href="/opportunities"
                aria-expanded="false"
                data-animation="scale-up"
                role="button">
                <span className="avatar avatar-online">
                  <img src={page === 1 ? ImageConfig.NAV_OPPTY_ACTIVE_ICON : ImageConfig.NAV_OPPTY_ICON} alt="..." />
                  <i>Opportunities</i>
                </span>
              </a>
            </li>

            <li className={currentPage === 2 ? `${activeClass} active` : activeClass}>
              <a className="nav-link navbar-avatar" href="/customers" aria-expanded="false" data-animation="scale-up" role="button">
                <span className="avatar avatar-online">
                  <img src={page === 2 ? ImageConfig.NAV_CUSTOMER_ACTIVE_ICON : ImageConfig.NAV_CUSTOMER_ICON} alt="..." />
                  <i>Customers</i>
                </span>
              </a>
            </li>

            <li className={currentPage === 3 ? `${activeClass} active` : activeClass}>
              <a className="nav-link navbar-avatar" href="/reports" aria-expanded="false" data-animation="scale-up" role="button">
                <span className="avatar avatar-online">
                  <img src={page === 3 ? ImageConfig.NAV_REPORTS_ACTIVE_ICON : ImageConfig.NAV_REPORTS_ICON} alt="..." />
                  <i>Reports</i>
                </span>
              </a>
            </li>

            <li className={currentPage === 4 ? `${activeClass} active` : activeClass}>
              <a
                className="nav-link navbar-avatar header-notification"
                href="/notifications"
                aria-expanded="false"
                data-animation="scale-up"
                role="button">
                <span className="avatar avatar-online">
                  <img src={page === 4 ? ImageConfig.NAV_NOTIFICATION_ACTIVE_ICON : ImageConfig.NAV_NOTIFICATION_ICON} alt="..." />
                  <i>Notifications</i>
                </span>
              </a>
            </li>
          </ul>

          <ul className="nav navbar-toolbar">
            <li className="nav-item no-p">
              <button className="nav-link navbar-avatar header-search" aria-expanded="false" data-animation="scale-up" type="button">
                <span className="avatar avatar-online">
                  <img src={ImageConfig.NAV_SEARCH_ICON} alt="..." />
                  <i />
                </span>
              </button>
            </li>
            <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={popover}>
              <button className="logout" type="button">
                {state.description && getIntialsFromFullName(state.description)}
              </button>
            </OverlayTrigger>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Header;
