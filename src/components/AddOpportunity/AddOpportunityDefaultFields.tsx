import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import AsyncSearchInput from '../Shared/Search/AsyncSearchInput';

import { AppState } from "../../store/store";
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';
import { OpportunityTypeList } from './OpportunityTypeList';

import { AddOpportunityDefaultParams } from '../../helpers/Api/models';

import { BusinessPartnerListItem,  BusinessPartnerFilterItem } from '../../helpers/Api/models/Customer';
import CustomerList from '../../helpers/Api/CustomerList';
import {saveOpportunityParams} from '../../store/AddOpportunity/Actions';


interface Props {
    changeStep: (num: number) => void
}

const AddOpportunityDefaultFields: React.FC<Props> = ({ changeStep }) => {

    const state: AppState = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
    const [selectedOpportunityType, selectOpportunityType] = React.useState('');
    const [opportunity, setOpportunityField] = React.useState<AddOpportunityDefaultParams>();
    

    const onChangeCustomerInput = () => { }

    const searchCustomers = async (key: string) => {
        const data = await CustomerList.get(key, 20, 0);
        return data.data.items;
    }

    const onSearchItemSelect = (data: any) => {
        const selectItem:BusinessPartnerListItem = data[0];
        setOpportunityField({
            ...opportunity,
            customer: selectItem.businessPartner});
        
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
        if(opportunity?.desc && opportunity?.oppRecordType && opportunity?.customer && opportunity?.stage){
            return true;
        }
        return false;
    }
    

    return (
        <>
            <div className="opportunity-step-circles">
                <ul className="list-inline step-circles">
                    <li className="list-inline-item circle-stepone steps active"><span className="num">1</span>
                        <span className="checked"><img src="../assets/images/steps-completed-check.svg" /></span></li>
                    <li className="list-inline-item circle-steptwo steps"><span className="num">2</span>
                        <span className="checked"><img src="../assets/images/steps-completed-check.svg" /></span></li>
                    <li className="list-inline-item circle-stepthree steps"><span className="num">3</span>
                        <span className="checked"><img src="../assets/images/steps-completed-check.svg" /></span></li>
                </ul>
            </div>
            <div className="opportunity-forms">
                <p className="stepone-title">Opportunity Name &amp; Type</p>
                
                <div className="">
                    <div className="steps-one-forms">
                        <form>
                            <div className="form-group oppty-form-elements">
                                <p className="title">Opportunity Name</p>
                                <input type="text" className="form-control" placeholder="Give opportunity a name" id="desc" onChange={onInputValueChange} />
                            </div>
                            <div className="form-group oppty-form-elements">
                                <p className="title">Select Customer</p>
                                <AsyncSearchInput onChange={onChangeCustomerInput} onSearch={searchCustomers} onSearchItemSelect={onSearchItemSelect} />
                            </div>

                            <div className="form-group oppty-form-elements">
                                <label>Add customer contact <span className="float-right font-italic opt-field">(Optional field)</span></label>
                                <select className="form-control iptor-dd" id="slct-stage">
                                    {/* <option disabled selected>Type or Select a customer</option> */}
                                    {/* {state.customers.customers.map((obj: models.CustomerListItem) => {
                                        return <option>{obj.description}</option>
                                    })} */}
                                </select>
                            </div>

                            <div className="form-group oppty-form-elements">
                                <label>Select Stage</label>
                                <select className="form-control iptor-dd" id="stage" onChange={onInputValueChange}>
                                    <option disabled selected>Select stage</option>
                                    {state.enviornmentConfigs.crmOpportunityStage.map((obj: models.StageInfo) => {
                                        return <option>{obj.salesStage}</option>
                                    })}
                                </select>
                            </div>

                            <div className="radiobtn-collection">
                                <p className="title">Select opportunity type</p>
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