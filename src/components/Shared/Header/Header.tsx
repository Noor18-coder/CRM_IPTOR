import React from 'react';
import { Nav } from 'react-bootstrap';

import ImageConfig from '../../../config/ImageConfig';
const Header = () => {
    return (
        <>
            <nav className={"site-navbar navbar navbar-default bg-black"} role="navigation">

                <div className={"navbar-container container-fluid"}>
                    <div className={"navbar-header"}>
                        <div className={"navbar-brand navbar-brand-center navbar-sec-logo"}>
                            <img className={"navbar-brand-logo"} src={ImageConfig.LogoImage} title={"iptor"} />
                        </div>
                        <div className={"navbar-brand navbar-brand-center navbar-sec-flag"}>
                            <img className={"navbar-br/and-logo"} src={ImageConfig.SWE_FLAG} title={"iptor"} />
                            <span className={"navbar-brand-text hidden-xs-down"}>swe</span>
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
                                    <img src={ImageConfig.NAV_REPORTS_ICON} alt={"..."} />
                                    <i>Notifications</i>
                                    <span className={"notifications-badge"}>3</span>
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
                        <li className={"nav-item no-p"}>
                            <a className={"nav-link navbar-avatar"} href="#" aria-expanded="false" data-animation="scale-up" role="button">
                                <span className={"avatar avatar-online"}>
                                    <img src={ImageConfig.NAV_PROFILE_ICON} alt={"..."} />
                                    <i></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>

    );
}

export default Header;