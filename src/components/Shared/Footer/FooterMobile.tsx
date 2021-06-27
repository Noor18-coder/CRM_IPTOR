import ImageConfig from '../../../config/ImageConfig';
const FooterMobile = () => {

    return (
        <section className="iptor-sticky-footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col"><a href="/"><img src={ImageConfig.NAV_DASHBOARD_ICON} alt="Dashboard" title="Dashboard" /></a></div>
                    <div className="col active-menu"><a href="/opportunities"><img src={ImageConfig.NAV_OPPTY_ICON} alt="Opportunity" title="Opportunity" /></a></div>
                    <div className="col"><a href="/customers"><img src={ImageConfig.NAV_CUSTOMER_ICON} alt="Customers" title="Customers" /></a></div>
                    <div className="col"><img src={ImageConfig.NAV_REPORTS_ICON} alt="Reports" title="Reports" /></div>
                    <div className="col noti"><span className="notification"><span className="red-dot"></span><img src={ImageConfig.NAV_NOTIFICATION_ICON} alt="Notification" title="Notification" /></span></div>
                </div>
            </div>
        </section>
    );
}

export default FooterMobile;