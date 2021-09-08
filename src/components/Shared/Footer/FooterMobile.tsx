import ImageConfig from '../../../config/ImageConfig';

interface Props {
    page: number
}


const FooterMobile:React.FC<Props> = ({ page }) => {

    let className = "col";

    return (
        <section className="iptor-sticky-footer">
            <div className="container-fluid">
                <div className="row">
                    <div className={page == 0 ? className + " active-menu" : className}><a href="/"><img src={page === 0 ? ImageConfig.NAV_DASHBOARD_ACTIVE_ICON : ImageConfig.NAV_DASHBOARD_ICON } alt="Dashboard" title="Dashboard" /></a></div>
                    <div className={page == 1 ? className + " active-menu" : className}><a href="/opportunities"><img src={ page === 1 ? ImageConfig.NAV_OPPTY_ACTIVE_ICON : ImageConfig.NAV_OPPTY_ICON} alt="Opportunity" title="Opportunity" /></a></div>
                    <div className={page == 2 ? className + " active-menu" : className}><a href="/customers"><img src={page === 2 ? ImageConfig.NAV_CUSTOMER_ACTIVE_ICON : ImageConfig.NAV_CUSTOMER_ICON} alt="Customers" title="Customers" /></a></div>
                    <div className={page == 3 ? className + " active-menu" : className}><a href="/reports"><img src={page === 3 ? ImageConfig.NAV_REPORTS_ACTIVE_ICON : ImageConfig.NAV_REPORTS_ICON} alt="Reports" title="Reports" /></a></div>
                    <div className={page == 4 ? className + " active-menu" : className}><span className="notification"><span className="red-dot"></span><img src={page == 4 ? ImageConfig.NAV_NOTIFICATION_ACTIVE_ICON : ImageConfig.NAV_NOTIFICATION_ICON} alt="Notification" title="Notification" /></span></div>
                </div>
            </div>
        </section>
    );
}

export default FooterMobile;