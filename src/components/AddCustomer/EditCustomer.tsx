import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router';

import i18n from '../../i18n'
import { AppState } from "../../store/store";
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';
import { validEmail } from '../../helpers/utilities/lib'

import { AddBusinessPartnerDefaultParams, UserDefinedFieldReduxParams, CustomerDetailsDefault } from '../../helpers/Api/models';
import { setBusinessPartnerWindowActive, setBusinessPartnerLoader, resetBusinessPartnerData } from '../../store/AddCustomer/Actions';
import AddCustomerApi from '../../helpers/Api/AddCustomer';
import CustomerList from '../../helpers/Api/CustomerList';

import { Context } from '../AddCustomer/CustomerContext';

const EditCustomer: React.FC = () => {
    const state: AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
    const [customerFields, setCustomerFields] = React.useState<AddBusinessPartnerDefaultParams>({});
    const [customerData, setCustomerData] = React.useState<any>();
    const [attributes, setAttributes] = React.useState<UserDefinedFieldReduxParams[]>([]);
    const [areaDetails, setAreaDetails] = React.useState<models.AreaListItem[]>([]);
    const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
    const [emailErr, setEmailErr] = React.useState<boolean>(false);
    const history = useHistory();

    const contextValue = React.useContext(Context);

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCustomerFields({
            ...customerFields,
          [e.currentTarget.id]: e.currentTarget.value,
        });
        if (e.currentTarget.id === "EMAIL") {
            let newArray = [...attributes];
            newArray[0].attributeValue = e.currentTarget.value;
            setAttributes(newArray);
        }
    };

    const updateCustomer = async () => {
        dispatch(setBusinessPartnerLoader(true));
        customerFields.primaryCurrency = state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA
        customerFields.language = state.enviornmentConfigs.defaultOpprtunityInfo.language;
        customerFields.type = 1;

        const data = await AddCustomerApi.update(customerFields);
        const customerId = data.data.businessPartner;

        Promise.all(attributes.map((obj: UserDefinedFieldReduxParams) => {
            return AddCustomerApi.addAttributes(customerId, obj.attributeType, obj.attributeValue);
        })).then((data) => {
            return data;
        });

        dispatch(setBusinessPartnerWindowActive(false));
        dispatch(setBusinessPartnerLoader(false));
        dispatch(resetBusinessPartnerData());

        if (customerId) {
            history.push({ pathname: "/cust-details", state: { custId: customerId } })
        }
    }

    const validate = () => {
        if (!validEmail.test(customerFields.EMAIL ? customerFields.EMAIL : '')) {
            setEmailErr(true);
            return false
        }
        else {
            return true
        }
    }

    const onSubmit = () => {
        if (validate()) {
            updateCustomer();
        }
    }

    const closeAction = () => {
        dispatch(resetBusinessPartnerData());
        dispatch(setBusinessPartnerWindowActive(false));
        dispatch(setBusinessPartnerLoader(false));
    }

    React.useEffect(() => {
        const emailTypeAttribute: UserDefinedFieldReduxParams = { attributeType: 'EMAIL', attributeValue: '' };
        setAttributes([emailTypeAttribute]);
        CustomerList.getAreas().then((data) => {
            setAreaDetails(data.data.items)
        });
        //if (contextValue) {
        //    setCustomerData(contextValue)
        //}
    }, []);

    //React.useEffect(() => {
    //    if (customerData) {
    //        setCustomerFields({
    //            ...customerFields,
    //            name: customerData.name, addressLine1: customerData.addressLine1, country: customerData.country, area: customerData.area
    //        });
    //    }
    //}, [customerData]);

    React.useEffect(() => {
        if (customerFields?.name && customerFields?.addressLine1 && customerFields?.country && customerFields?.area)
            setIsSubmit(true);
    }, [customerFields]);

    return (
        <>
            {console.log(customerData)}
            <div className="sliding-panel-container">
                <div className="sliding-panel">
                    <div className="title-row opp-header-text">
                        <img src={ImageConfig.CHEVRON_LEFT} className="mob-steps-back" />
                        {i18n.t('editCustomer')}
                        <a className="panel-close-icon" onClick={closeAction}><img src={ImageConfig.CLOSE_BTN} /></a>
                    </div>
                    <div className="all-opportunity-steps-container pt-24">
                        <div className="opportunity-forms">
                            <p className="add-subtitle">{i18n.t('customerInfo')}</p>
                            <div className="">
                                <div className="steps-one-forms">
                                    <form>
                                        <div className="form-group oppty-form-elements">
                                            <label className="cust-label">{i18n.t('customerName')}</label>
                                            <input type="text" className="form-control" placeholder={i18n.t('giveCustomerName')} value={customerFields.name} id="name" onChange={onInputValueChange} />
                                        </div>
                                        <p className="add-subtitle">{i18n.t('contactAddr')}</p>
                                        <div className="form-group oppty-form-elements">
                                            <label className="cust-label">{i18n.t('addr')}</label>
                                            <input type="text" className="form-control" placeholder={i18n.t('giveAddr')} id="addressLine1" value={customerFields.addressLine1} onChange={onInputValueChange} />
                                        </div>
                                        <div className="form-group oppty-form-elements">
                                            <label className="cust-label">{i18n.t('country')}</label>
                                            <select className="form-control iptor-dd" id="country" onChange={onInputValueChange}>
                                                <option disabled selected>{customerFields.country}</option>
                                                {state.enviornmentConfigs.crmCountryInfo.map((obj: models.CountryInfo) => {
                                                    return <option value={obj.country}>{obj.description}</option>
                                                 })} 
                                            </select>
                                        </div>
                                        <div className="form-group oppty-form-elements">
                                            <label className="cust-label">{i18n.t('area')}</label>
                                            <select className="form-control iptor-dd" id="area" onChange={onInputValueChange}>
                                                <option disabled selected>{customerFields.area}</option>
                                                {areaDetails.map((obj) => {
                                                    return <option value={obj.area}>{obj.description}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group oppty-form-elements">
                                            <label className="cust-label">{i18n.t('phone')}</label>
                                            <input type="text" className="form-control" placeholder={i18n.t('giveNumber')} value={customerFields.phone} id="phone" onChange={onInputValueChange} />
                                        </div>
                                        <p className="add-subtitle">{i18n.t('accountInfo')}</p>
                                        <div className="form-group oppty-form-elements">
                                            <label className="cust-label">{i18n.t('email')}</label>
                                            <input type="text" className="form-control" placeholder={i18n.t('giveEmail')} id="EMAIL" value={customerFields.EMAIL} onChange={onInputValueChange} />
                                            {emailErr && <p className="error-text">{i18n.t('validEmail')}</p>}
                                        </div>
                                    </form>
                                </div>
                                <div className="step-nextbtn-with-arrow stepsone-nxtbtn" onClick={isSubmit ? onSubmit : undefined}>
                                    <a className={isSubmit ? 'customer-btn' : 'customer-btn disable-link'} href="#"> {i18n.t('update')} </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCustomer;