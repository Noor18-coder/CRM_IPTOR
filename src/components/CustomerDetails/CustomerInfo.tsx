import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { setOpportunityWindowActive } from '../../store/AddOpportunity/Actions';
import ImageConfig from '../../config/ImageConfig';
import { Image } from 'react-bootstrap';
import { NavSection } from '../Shared/DetailsNav/NavSection';
import { useHistory } from "react-router-dom";
import { CustomerDetailsDefault, CrmCountry } from '../../helpers/Api/models';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import * as models from '../../helpers/Api/models';
import { AppState } from "../../store/store";
import AddCustomerApi from '../../helpers/Api/AddCustomer';
import { setBusinessPartnerLoader } from '../../store/AddCustomer/Actions';

export interface Data {
  data: CustomerDetailsDefault
}

const CustomerInfo: React.FC<Data> = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  const state: AppState = useSelector((state: AppState) => state);
  const history = useHistory();
  const backToOpportunityList = () => {
    history.goBack()
  }
  const [country, setCountry] = React.useState<models.CrmCountry[]>([]);
  const [customerFields, setCustomerFields] = React.useState<any>({});
  const dispatch: Dispatch<any> = useDispatch();

  const toggleDrawer = (event:React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
    dispatch(setOpportunityWindowActive(true));
  };

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let customerData = { ...customerFields }
        customerData.active = e.currentTarget.checked
        setCustomerFields(customerData)
        AddCustomerApi.update(customerData);
        dispatch(setBusinessPartnerLoader(true));
        setTimeout(function () {
            window.location.reload(false);
            dispatch(setBusinessPartnerLoader(false));
        }, 3000);
  }

  React.useEffect(() => {
    CustomerDetailsApi.getCountry(props.data.country).then((data) => {
      setCountry(data);
    });
      setCustomerFields(props.data)
  }, []);
  return (
    <>
      {(isMobile || isTablet) ?
        <section className="customer-mobilecard">
          <div className="d-flex justify-content-between customer-row">
            <div className="lft-custname" onClick={backToOpportunityList}>
              <p>{props.data.name}<span className="location">{country ? country.map((data: CrmCountry) => {
                return data.description
              }) : null}</span></p>
            </div>
            <div className="rgt-actioncol">
              <ul className="list-inline ">
                <li className="list-inline-item"><img src={ImageConfig.HISTORY} alt="History" title="History" /></li>
                <li className="list-inline-item"><img src={ImageConfig.STAR} alt="Star" title="Star" /></li>
                <li className="list-inline-item"><img src={ImageConfig.MORE_V_ELLIPSIS} alt="More" title="More" /></li>
              </ul>
            </div>
          </div>

          <div className="customer-details d-flex justify-content-between">
            <div className="left-data">
              <p><span>Active</span></p>
            </div>

            <div className="right-data">
              <p><span><label className="switch">
                <input type="checkbox" checked={props.data.active} />
                <span className="slider round"></span>
              </label></span></p>
            </div>
          </div>
          <div className="customer-details d-flex justify-content-between">
            <div className="left-data">
              <p><span>Parent Group</span></p>
            </div>

            <div className="right-data">
              <p><span><label className="switch">
                <input type="checkbox" checked={props.data.isParent} />
                <span className="slider round"></span>
              </label></span></p>
            </div>
          </div>

          <div className="customer-details d-flex justify-content-between">
            <div className="left-data">
              <p><span>New Opportunity</span></p>
            </div>

            <div className="right-data">
              <p><span> <Image src={ImageConfig.ADD_ICON} /></span></p>
            </div>
          </div>
        </section> :
        <>
          <NavSection backToOpportunityList={backToOpportunityList} />
          <section className="d-flex justify-content-between sec-customer-addr">
            <div className="cust-name">
              <p>{props.data.name}<span>{country ? country.map((data: CrmCountry) => {
                return data.description
              }) : null}</span></p>
            </div>
            <div className="mid-sec">
              <ul className="list-inline">
                <li className="list-inline-item"> <span>Active <label className="switch">
                  <input type="checkbox" checked={customerFields.active} onChange={!!state.auth.user.role && state.auth.user.role === 'Admin' ? onInputValueChange : undefined} />
                  <span className={!!state.auth.user.role && state.auth.user.role === 'Admin' ? 'slider round' : 'slider round disabled-checkbox'}></span>
                </label> </span> </li>
                <li className="list-inline-item"><span className="p-left">Parent Group <label className="switch">
                  <input type="checkbox" checked={props.data.isParent} />
                  <span className="slider round"></span>
                </label> </span></li>
              </ul>
            </div>

            <div className="sec-add-cust ">
              <button className="btn add-customer" onClick={toggleDrawer} >+ New Opportunity</button>
            </div>
          </section>
        </>
      }
    </>
  )
}
export default CustomerInfo
