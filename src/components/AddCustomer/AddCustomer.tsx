import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import i18n from '../../i18n';
import { AppState } from '../../store/store';
import ImageConfig from '../../config/ImageConfig';
import { emailPattern, numberPattern } from '../../helpers/utilities/lib';

import { AddBusinessPartnerDefaultParams, UserDefinedFieldReduxParams, CountryInfo, AreaInfo } from '../../helpers/Api/models';
import { setBusinessPartnerWindowActive, setBusinessPartnerLoader, resetBusinessPartnerData } from '../../store/AddCustomer/Actions';
import AddCustomerApi from '../../helpers/Api/AddCustomer';

const AddCustomer: React.FC = () => {
  const state: AppState = useSelector((addCustomerState: AppState) => addCustomerState);
  const dispatch: Dispatch<any> = useDispatch();
  const [customerFields, setCustomerFields] = React.useState<AddBusinessPartnerDefaultParams>({});
  const [attributes, setAttributes] = React.useState<UserDefinedFieldReduxParams[]>([]);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const [emailErr, setEmailErr] = React.useState<boolean>(false);
  const [phoneErr, setPhoneErr] = React.useState<boolean>(false);
  const history = useHistory();

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, id } = e.currentTarget;
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (value.length && id === 'EMAIL' && !value.match(emailPattern)) {
      inputElement.style.border = '1px solid #ED2024';
      setIsSubmit(false);
      setEmailErr(true);
    } else if (value.length && id === 'phone' && !value.match(numberPattern)) {
      inputElement.style.border = '1px solid #ED2024';
      setIsSubmit(false);
      setPhoneErr(true);
    } else {
      inputElement.style.border = '1px solid #DAE2E7';
      setEmailErr(false);
      setPhoneErr(false);
    }
    setCustomerFields({
      ...customerFields,
      [e.currentTarget.id]: e.currentTarget.value,
    });
    if (e.currentTarget.id === 'EMAIL') {
      const newArray = [...attributes];
      newArray[0].attributeValue = e.currentTarget.value;
      setAttributes(newArray);
    }
  };

  const validateField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const element = document.getElementById(e.currentTarget.id) as HTMLInputElement;
    if (e.currentTarget.value === '' || e.currentTarget.value.includes('Select')) {
      element.style.border = '1px solid #ED2024';
      setIsSubmit(false);
    } else {
      element.style.border = '1px solid #DAE2E7';
    }
  };

  const createCustomer = async () => {
    dispatch(setBusinessPartnerLoader(true));
    customerFields.primaryCurrency = state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA;
    customerFields.language = state.enviornmentConfigs.defaultOpprtunityInfo.language;
    customerFields.type = 1;
    if (!!state.auth.user.role && state.auth.user.role === 'Admin') customerFields.active = true;
    else customerFields.active = false;

    const data = await AddCustomerApi.add(customerFields);
    const customerId = data.data.businessPartner;

    Promise.all(
      attributes.map((obj: UserDefinedFieldReduxParams) => {
        return AddCustomerApi.addAttributes(customerId, obj.attributeType, obj.attributeValue);
      })
    ).then((details) => {
      return details;
    });

    dispatch(setBusinessPartnerWindowActive(false));
    dispatch(setBusinessPartnerLoader(false));
    dispatch(resetBusinessPartnerData());
    document.body.classList.remove('body-scroll-hidden');

    if (customerId) {
      history.push({ pathname: '/cust-details', state: { custId: customerId } });
    }
  };

  const onSubmit = () => {
    createCustomer();
  };

  const closeAction = () => {
    dispatch(resetBusinessPartnerData());
    dispatch(setBusinessPartnerWindowActive(false));
    dispatch(setBusinessPartnerLoader(false));
    document.body.classList.remove('body-scroll-hidden');
  };

  React.useEffect(() => {
    const emailTypeAttribute: UserDefinedFieldReduxParams = { attributeType: 'EMAIL', attributeValue: '' };
    setAttributes([emailTypeAttribute]);
  }, []);

  React.useEffect(() => {
    if (
      customerFields?.name &&
      customerFields?.addressLine1 &&
      customerFields?.country &&
      customerFields?.EMAIL &&
      customerFields?.area &&
      customerFields?.phone &&
      !emailErr &&
      !phoneErr
    )
      setIsSubmit(true);
  }, [customerFields]);

  return (
    <>
      <div className="sliding-panel-container">
        <div className="sliding-panel">
          <div className="title-row opp-header-text">
            <button type="button" className="mob-steps-back" onClick={closeAction}>
              <img src={ImageConfig.CHEVRON_LEFT} alt="Back" />
            </button>
            {i18n.t('addCustomer')}
            <button className="panel-close-icon link-anchor-button" onClick={closeAction} type="button">
              <img src={ImageConfig.CLOSE_BTN} alt="Close" />
            </button>
          </div>
          <div className="all-opportunity-steps-container pt-24">
            <div className="opportunity-forms">
              <p className="add-subtitle">{i18n.t('customerInfo')}</p>
              <div className="">
                <div className="steps-one-forms">
                  <form>
                    <div className="form-group oppty-form-elements">
                      <label className="cust-label" htmlFor="name">
                        {i18n.t('customerName')}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={i18n.t('giveCustomerName')}
                        id="name"
                        onChange={onInputValueChange}
                        onBlur={validateField}
                      />
                    </div>
                    <p className="add-subtitle">{i18n.t('contactAddr')}</p>
                    <div className="form-group oppty-form-elements">
                      <label className="cust-label" htmlFor="addressLine1">
                        {i18n.t('addr')}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={i18n.t('giveAddr')}
                        id="addressLine1"
                        onChange={onInputValueChange}
                        onBlur={validateField}
                      />
                    </div>
                    <div className="form-group oppty-form-elements">
                      <label className="cust-label" htmlFor="country">
                        {i18n.t('country')}
                      </label>
                      <select className="form-control iptor-dd" id="country" onChange={onInputValueChange} onBlur={validateField}>
                        <option disabled selected>
                          {i18n.t('selectCountry')}
                        </option>
                        {state.enviornmentConfigs.crmCountryInfo.map((obj: CountryInfo) => {
                          return <option value={obj.country}>{obj.description}</option>;
                        })}
                      </select>
                    </div>
                    <div className="form-group oppty-form-elements">
                      <label className="cust-label" htmlFor="area">
                        {i18n.t('area')}
                      </label>
                      <select className="form-control iptor-dd" id="area" onChange={onInputValueChange} onBlur={validateField}>
                        <option disabled selected>
                          {i18n.t('selectArea')}
                        </option>
                        {state.enviornmentConfigs.crmAreaInfo.map((obj: AreaInfo) => {
                          return (
                            <option value={obj.area}>
                              {obj.area} - {obj.description}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group oppty-form-elements">
                      <label className="cust-label" htmlFor="phone">
                        {i18n.t('phone')}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={i18n.t('giveNumber')}
                        id="phone"
                        onChange={onInputValueChange}
                        onBlur={validateField}
                      />
                      {phoneErr && <span className="form-hints">{i18n.t('numericFieldError')}</span>}
                    </div>
                    <p className="add-subtitle">{i18n.t('accountInfo')}</p>
                    <div className="form-group oppty-form-elements">
                      <label className="cust-label" htmlFor="EMAIL">
                        {i18n.t('email')}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={i18n.t('giveEmail')}
                        id="EMAIL"
                        onChange={onInputValueChange}
                        onBlur={validateField}
                      />
                      {emailErr && <span className="form-hints">{i18n.t('emailFieldError')}</span>}
                    </div>
                  </form>
                </div>
                <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
                  <button className={isSubmit ? 'customer-btn' : 'customer-btn disable-link'} onClick={isSubmit ? onSubmit : undefined} type="button">
                    {!!state.auth.user.role && state.auth.user.role === 'Admin' ? i18n.t('addCustomerBtn') : i18n.t('addShareApproval')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
