import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";

import ImageConfig from '../../../config/ImageConfig';
import { getIntialsFromFullName } from '../../../helpers/utilities/lib';

import { UserItem, CompanyInfoItem } from "../../../helpers/Api/models";
import { logOut } from "../../../store/Auth/Actions";
import { AppState } from "../../../store/store";
import { OverlayTrigger, Popover, Image} from 'react-bootstrap'

const Header = () => {

    const state: UserItem = useSelector((state: AppState) => state.auth.user);
    const dispatch: Dispatch<any> = useDispatch();

    const userProfileActions = () => {
        dispatch(logOut());
    }
    const getCompanyName = () => {
      
        if (state.currentEnvironment) {
            const data = state.currentEnvironment.find((obj: CompanyInfoItem) => { return obj.companyCode == state.selectedCompany })
            const name = data && data.name ? data.name : ''
            return name
        }
      
          return ''  
    }
    const popover = (
        <Popover id="popover-basic" className="tool-tip">
          <Popover.Content>
            { state.description}
          </Popover.Content>
          <Popover.Content>
            <a onClick={userProfileActions} role="button">
            Logout <Image className="logout-image" height="15" src={ImageConfig.LOGOUT_ICON} alt="Iptor" title="Iptor"/>              
            </a>
          </Popover.Content>
        </Popover>
      );

    return (
        <>
            <nav className={"site-navbar navbar navbar-default bg-black"} role="navigation">

                <div className={"navbar-container container-fluid"}>
                    <div className={"navbar-header"}>
                        <div className={"navbar-brand navbar-brand-center navbar-sec-logo"}>
                            <img className={"navbar-brand-logo"} src={ImageConfig.IPTOR_ICON} title={"iptor"} />
                        </div>
                        <div className={"navbar-brand navbar-brand-center navbar-sec-flag"}>
                            <span className={"navbar-brand-text hidden-xs-down"}> {state.currentEnvironment ?  getCompanyName() : ''}</span>
                        </div>
                    </div>


                    <ul className={"nav navbar-toolbar navbar-right navbar-toolbar-right"}>

                        <li className={"nav-item"}>
                            <a className={"nav-link navbar-avatar"} href="#" aria-expanded="false" data-animation="scale-up" role="button">
                                <span className={"avatar avatar-online"}>
                                    <img src={ImageConfig.NAV_DASHBOARD_ICON} alt="..." />
                                    <i>Dashboard</i>
                                </span>
                            </a>
                        </li>

                        <li className={"nav-item active"}>
                            <a className={"nav-link navbar-avatar"} href="#" aria-expanded="false" data-animation="scale-up" role="button">
                                <span className={"avatar avatar-online"}>
                                    <img src={ImageConfig.NAV_OPPTY_ICON} alt="..." />
                                    <i>Opportunities</i>
                                </span>
                            </a>
                        </li>


                        <li className="nav-item">
                            <a className={"nav-link navbar-avatar"} href="#" aria-expanded="false" data-animation="scale-up" role="button">
                                <span className={"avatar avatar-online"}>
                                    <img src={ImageConfig.NAV_CUSTOMER_ICON} alt="..." />
                                    <i>Customers</i>
                                </span>
                            </a>
                        </li>


                        <li className={"nav-item"}>
                            <a className={"nav-link navbar-avatar"} href="#" aria-expanded="false" data-animation="scale-up" role="button">
                                <span className={"avatar avatar-online"}>
                                    <img src={ImageConfig.NAV_REPORTS_ICON} alt="..." />
                                    <i>Reports</i>
                                </span>
                            </a>
                        </li>


                        <li className={"nav-item"}>
                            <a className={"nav-link navbar-avatar"} aria-expanded={"false"} data-animation={"scale-up"} role="button">
                                <span className={"avatar avatar-online"}>
                                    <img src={ImageConfig.NAV_NOTIFICATION_ICON} alt={"..."} />
                                    <i>Notifications</i>
                                    <span className={"notifications-badge"}></span>
                                </span>
                            </a>
                        </li>
                    </ul>

                    <ul className={"nav navbar-toolbar"}>
                        <li className={"nav-item no-p"}>
                            <a className={"nav-link navbar-avatar"} href="#" aria-expanded="false" data-animation="scale-up" role="button">
                                <span className={"avatar avatar-online"}>
                                    <img src={ImageConfig.NAV_SEARCH_ICON} alt="..." />
                                    <i></i>
                                </span>
                            </a>
                        </li>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                            <button className="logout"> {state.description && getIntialsFromFullName(state.description) }</button>
                        </OverlayTrigger>
                    </ul>
                </div>
            </nav>
        </>

    );
}

export default Header;