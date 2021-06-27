import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import AsyncSearchInput from '../Shared/Search/AsyncSearchInput';

import { AppState } from "../../store/store";
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';
import { OpportunityTypeList } from './OpportunityTypeList';


import { AddOpportunityDefaultParams, CustomerDetailsContactsGroupItem} from '../../helpers/Api/models';

import { BusinessPartnerListItem,  BusinessPartnerFilterItem } from '../../helpers/Api/models/Customer';
import CustomerList from '../../helpers/Api/CustomerList';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import {saveOpportunityParams, setOpportunityContacts} from '../../store/AddOpportunity/Actions';


interface Props {
    changeStep: (num: number) => void
}

const AddOpportunityDefaultFields: React.FC<Props> = ({ changeStep }) => {
    const state: AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
    const [selectedOpportunityType, selectOpportunityType] = React.useState('');
    const [customerContacts, setCustomerContacts] = React.useState<CustomerDetailsContactsGroupItem[]>([]);
    const [opportunity, setOpportunityField] = React.useState<AddOpportunityDefaultParams>();
    

    const onChangeCustomerInput = () => { }

    const searchCustomers = async (key: string) => {
        const data = await CustomerList.get(key, 20, 0);
        return data.data.items;
    }

    const onSearchItemSelect = async (data: any) => {
        const selectItem:BusinessPartnerListItem = data[0];
        setOpportunityField({
            ...opportunity,
            customer: selectItem.businessPartner});
        const customerContactsData = await CustomerDetailsApi.getAllContactDetails(selectItem.businessPartner);
        setCustomerContacts(customerContactsData);
    }

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        setOpportunityField({
          ...opportunity,
          [e.currentTarget.id]: e.currentTarget.value,
        });
        
    };

    const onOpportunityTypeSelect = (type:string) => {
        setOpportunityField({
          ...opportunity,
          oppRecordType: type
        });
        selectOpportunityType(type);
       
    };

    const onNextButtonClick = () => {
        if(validate()){
            changeStep(2);
            dispatch(saveOpportunityParams(opportunity));
        }else {
            alert('Please fill all mandatory fields.')
        }
       
    }

    const validate = () => {
        return true;
        if(opportunity?.desc && opportunity?.oppRecordType && opportunity?.customer && opportunity?.stage){
            return true;
        }
        return false;
    }

    const onCustomerContactSelect = (e: React.ChangeEvent< HTMLSelectElement> ) => {
        const selectedContactId = parseInt(e.currentTarget.value);

        const selectedContact = customerContacts.filter((obj:CustomerDetailsContactsGroupItem) => { return obj.contactId == selectedContactId });
       dispatch(setOpportunityContacts(selectedContact));
        
    }
    

    return (
        <>
            <div className="opportunity-step-circles">
                <ul className="list-inline step-circles">
                    <li className="list-inline-item circle-stepone steps active"><span className="num">1</span></li>
                    <li className="list-inline-item circle-steptwo steps"><span className="num">2</span></li>
                    <li className="list-inline-item circle-stepthree steps"><span className="num">3</span></li>
                </ul>
            </div>
            <div className="opportunity-forms">
                <p className="stepone-title">Opportunity Name &amp; Type</p>
                
                <div className="">
                    <div className="steps-one-forms">
                        <form>
                            <div className="form-group oppty-form-elements">
                                <label className="opp-label">Opportunity Name</label>
                                <input type="text" className="form-control" placeholder="Give opportunity a name" id="desc" onChange={onInputValueChange} />
                            </div>
                            <div className="form-group oppty-form-elements">
                                <label className="opp-label">Select Customer</label>
                                <AsyncSearchInput onChange={onChangeCustomerInput} onSearch={searchCustomers} onSearchItemSelect={onSearchItemSelect} />
                            </div>

                            <div className="form-group oppty-form-elements">
                                <label className="opp-label">Add customer contact <span className="opt-field">(Optional field)</span></label>
                                <select className="form-control iptor-dd" id="customer-contact"  onChange={onCustomerContactSelect}>
                                    <option disabled selected>Select Customer Contact</option>
                                     {customerContacts.map((obj: models.CustomerDetailsContactsGroupItem) => {
                                        return <option value={obj.contactId}>{obj.contactPerson}</option>
                                    })} 
                                </select>
                            </div>

                            <div className="form-group oppty-form-elements">
                                <label className="opp-label">Select Stage</label>
                                <select className="form-control iptor-dd" id="stage" onChange={onInputValueChange}>
                                    <option disabled selected>Select stage</option>
                                    {state.enviornmentConfigs.crmOpportunityStage.map((obj: models.StageInfo) => {
                                        return <option>{obj.salesStage}</option>
                                    })}
                                </select>
                            </div>

                            <div className="radiobtn-collection oppty-form-elements">
                                <label className="opp-label">Select opportunity type</label>
                                <div className="opportunity-type-container">
                                    {state.enviornmentConfigs.crmOpportunityTypes.length ?
                                        <OpportunityTypeList opptyTypes={state.enviornmentConfigs.crmOpportunityTypes} doClick={onOpportunityTypeSelect} selected={selectedOpportunityType} /> 
                                        : <div>
                                            <input type="radio" id="" name="stepone-radiogrp" value="1" />
                                            <label>No Customers</label>
                                        </div>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="step-nextbtn-with-arrow stepsone-nxtbtn" onClick={ onNextButtonClick}>
                        <a className="stepone-next-btn" href="#">
                            Next <span className="right-whit-arrow"><img src={ImageConfig.CHEVRON_RIGHT_WHITE} /></span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddOpportunityDefaultFields;