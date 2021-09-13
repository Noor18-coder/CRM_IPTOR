import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { setOpportunityWindowActive } from '../../store/AddOpportunity/Actions';
import ImageConfig from '../../config/ImageConfig';
import { NavSection } from '../Shared/DetailsNav/NavSection';
import { CustomerDetailsDefault, CrmCountry } from '../../helpers/Api/models';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import { AppState } from '../../store/store';
import AddCustomerApi from '../../helpers/Api/AddCustomer';
import { setBusinessPartnerLoader } from '../../store/AddCustomer/Actions';

export interface Data {
  data: CustomerDetailsDefault;
}

const CustomerInfo: React.FC<Data> = (props) => {
  const {
    data: { name, isParent },
  } = props;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const state: AppState = useSelector((InfoState: AppState) => InfoState);
  const history = useHistory();
  const backToOpportunityList = () => {
    history.goBack();
  };
  const [country, setCountry] = React.useState<CrmCountry[]>([]);
  const [customerFields, setCustomerFields] = React.useState<any>({});
  const dispatch: Dispatch<any> = useDispatch();

  const toggleDrawer = () => {
    dispatch(setOpportunityWindowActive(true));
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customerData = { ...customerFields };
    customerData.active = e.currentTarget.checked;
    setCustomerFields(customerData);
    AddCustomerApi.update(customerData);
    dispatch(setBusinessPartnerLoader(true));
    setTimeout(function () {
      window.location.reload(false);
      dispatch(setBusinessPartnerLoader(false));
    }, 3000);
  };

  React.useEffect(() => {
    CustomerDetailsApi.getCountry(props.data.country).then((data) => {
      setCountry(data);
    });
    setCustomerFields(props.data);
  }, []);
  return (
    <>
      {isMobile || isTablet ? (
        <section className="customer-mobilecard">
          <div className="d-flex justify-content-between customer-row">
            <div className="lft-custname" onClick={backToOpportunityList} onKeyDown={backToOpportunityList} role="presentation">
              <p>
                {name}
                <span className="location">
                  {country
                    ? country.map((data: CrmCountry) => {
                        return data.description;
                      })
                    : null}
                </span>
              </p>
            </div>
            <div className="rgt-actioncol">
              {/* Commented non-working buttons<ul className="list-inline ">
                <li className="list-inline-item">
                  <img src={ImageConfig.HISTORY} alt="History" title="History" />
                </li>
                <li className="list-inline-item">
                  <img src={ImageConfig.STAR} alt="Star" title="Star" />
                </li>
                <li className="list-inline-item">
                  <img src={ImageConfig.MORE_V_ELLIPSIS} alt="More" title="More" />
                </li>
              </ul> */}
            </div>
          </div>

          <div className="customer-details d-flex align-items-center justify-content-between">
            <div className="left-data">
              <p>
                <span>Active</span>
              </p>
            </div>

            <div className="right-data">
              <p>
                <span>
                  <label className="switch" htmlFor="active">
                    <input
                      type="checkbox"
                      id="active"
                      checked={customerFields.active}
                      onChange={!!state.auth.user.role && state.auth.user.role === 'Admin' ? onInputValueChange : undefined}
                    />
                    <span
                      className={!!state.auth.user.role && state.auth.user.role === 'Admin' ? 'slider round' : 'slider round disabled-checkbox'}
                    />
                  </label>
                </span>
              </p>
            </div>
          </div>
          <div className="customer-details d-flex  align-items-center justify-content-between">
            <div className="left-data">
              <p>
                <span>Parent Group</span>
              </p>
            </div>

            <div className="right-data">
              <p>{isParent ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {customerFields.active && (
            <div className="customer-details d-flex align-items-center justify-content-between">
              <div className="left-data">
                <p>
                  <span>New Opportunity</span>
                </p>
              </div>

              <div className="right-data">
                <p>
                  <span>
                    {' '}
                    <Image src={ImageConfig.ADD_ICON} onClick={toggleDrawer} />
                  </span>
                </p>
              </div>
            </div>
          )}
        </section>
      ) : (
        <>
          <NavSection backToOpportunityList={backToOpportunityList} />
          <section className="d-flex justify-content-between align-items-center sec-customer-addr">
            <div className="cust-name">
              <p>
                {name}
                <span>
                  {country
                    ? country.map((data: CrmCountry) => {
                        return data.description;
                      })
                    : null}
                </span>
              </p>
            </div>
            <div className="mid-sec">
              <ul className="list-inline">
                <li className="list-inline-item">
                  {' '}
                  <span>
                    Active{' '}
                    <label className="switch" htmlFor="deskActive">
                      <input
                        type="checkbox"
                        id="deskActive"
                        checked={customerFields.active}
                        onChange={!!state.auth.user.role && state.auth.user.role === 'Admin' ? onInputValueChange : undefined}
                      />
                      <span
                        className={!!state.auth.user.role && state.auth.user.role === 'Admin' ? 'slider round' : 'slider round disabled-checkbox'}
                      />
                    </label>{' '}
                  </span>{' '}
                </li>
              </ul>
            </div>

            <div className="parent-name">
              <p>
                Parent Group
                <span>{isParent ? 'Yes' : 'No'}</span>
              </p>
            </div>

            {customerFields.active && (
              <div className="sec-add-cust ">
                <button className="btn add-customer" type="button" onClick={toggleDrawer}>
                  + New Opportunity
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
};
export default CustomerInfo;
