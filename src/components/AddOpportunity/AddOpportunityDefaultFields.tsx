import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import AsyncSearchInput from '../Shared/Search/AsyncSearchInput';

import { AppState } from '../../store/store';
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';
import { OpportunityTypeList } from './OpportunityTypeList';
import { Context } from './AddOpportunityContext';

import { AddOpportunityDefaultParams, CustomerDetailsContactsGroupItem } from '../../helpers/Api/models';

import { BusinessPartnerListItem } from '../../helpers/Api/models/Customer';
import CustomerList from '../../helpers/Api/CustomerList';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import { saveOpportunityParams, setOpportunityContacts } from '../../store/AddOpportunity/Actions';

interface Props {
  changeStep: (num: number) => void;
}

const AddOpportunityDefaultFields: React.FC<Props> = ({ changeStep }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [selectedOpportunityType, selectOpportunityType] = React.useState('');
  const [customerContacts, setCustomerContacts] = React.useState<CustomerDetailsContactsGroupItem[]>([]);
  const [opportunity, setOpportunityField] = React.useState<AddOpportunityDefaultParams>();
  const contextValue = React.useContext(Context);

  const searchCustomers = async (key: string) => {
    const data = await CustomerList.get(key, 20, 0);
    return data.data.items;
  };

  const loadCustomerContacts = async (customerId: string) => {
    const customerContactsData = await CustomerDetailsApi.getAllContactDetails(customerId);
    setCustomerContacts(customerContactsData);
  };

  const onSearchItemSelect = async (data: any) => {
    const selectItem: BusinessPartnerListItem = data[0];
    setOpportunityField({
      ...opportunity,
      customer: selectItem.businessPartner,
    });
    loadCustomerContacts(selectItem.businessPartner);
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOpportunityField({
      ...opportunity,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const onOpportunityTypeSelect = (type: string) => {
    setOpportunityField({
      ...opportunity,
      oppRecordType: type,
    });
    selectOpportunityType(type);
  };

  const onNextButtonClick = () => {
    if (validate()) {
      changeStep(2);
      dispatch(saveOpportunityParams(opportunity));
    } else {
      alert('Please fill all mandatory fields.');
    }
  };

  const validate = () => {
    if (opportunity?.desc && opportunity?.oppRecordType && opportunity?.customer && opportunity?.stage) {
      return true;
    }
    return false;
  };

  const onCustomerContactSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedContactId = e.currentTarget.value;

    const selectedContact = customerContacts.filter((obj: CustomerDetailsContactsGroupItem) => {
      return obj.contactId === selectedContactId;
    });
    dispatch(setOpportunityContacts(selectedContact));
  };

  React.useEffect(() => {
    if (contextValue?.customerId) {
      setOpportunityField({
        ...opportunity,
        customer: contextValue.customerId,
      });
      loadCustomerContacts(contextValue.customerId);
    }
  }, []);

  return (
    <>
      <div className="opportunity-step-circles">
        <ul className="list-inline step-circles">
          <li className="list-inline-item circle-stepone steps active">
            <span className="num">1</span>
          </li>
          <li className="list-inline-item circle-steptwo steps">
            <span className="num">2</span>
          </li>
          <li className="list-inline-item circle-stepthree steps">
            <span className="num">3</span>
          </li>
        </ul>
      </div>
      <div className="opportunity-forms">
        <p className="stepone-title">Opportunity Name &amp; Type</p>

        <div className="">
          <div className="steps-one-forms">
            <form>
              <div className="form-group oppty-form-elements">
                <label htmlFor="desc" className="opp-label">
                  Opportunity Name
                </label>
                <input type="text" className="form-control" placeholder="Give opportunity a name" id="desc" onChange={onInputValueChange} />
              </div>
              <div className="form-group oppty-form-elements">
                <label htmlFor="customer" className="opp-label">
                  Select Customer
                </label>
                {contextValue?.customerName && contextValue?.customerId ? (
                  <input
                    type="text"
                    id="customer"
                    className="form-control"
                    placeholder=""
                    contentEditable={false}
                    value={contextValue.customerName}
                  />
                ) : (
                  <AsyncSearchInput id="customer" onSearch={searchCustomers} onSearchItemSelect={onSearchItemSelect} />
                )}
              </div>

              <div className="form-group oppty-form-elements">
                <label htmlFor="customer-contact" className="opp-label">
                  Add customer contact <span className="opt-field">(Optional field)</span>
                </label>
                <select className="form-control iptor-dd" id="customer-contact" onChange={onCustomerContactSelect}>
                  <option disabled selected>
                    Select Customer Contact
                  </option>
                  {customerContacts.map((obj: models.CustomerDetailsContactsGroupItem) => {
                    return <option value={obj.contactId}>{obj.contactPerson}</option>;
                  })}
                </select>
              </div>

              <div className="form-group oppty-form-elements">
                <label htmlFor="stage" className="opp-label">
                  Select Stage
                </label>
                <select className="form-control iptor-dd" id="stage" onChange={onInputValueChange}>
                  <option disabled selected>
                    Select stage
                  </option>
                  {state.enviornmentConfigs.crmOpportunityStage.map((obj: models.StageInfo) => {
                    return <option>{obj.salesStage}</option>;
                  })}
                </select>
              </div>

              <div className="radiobtn-collection oppty-form-elements">
                <span className="opp-label">Select opportunity type</span>
                <div className="opportunity-type-container">
                  {state.enviornmentConfigs.crmOpportunityTypes.length ? (
                    <OpportunityTypeList
                      opptyTypes={state.enviornmentConfigs.crmOpportunityTypes}
                      doClick={onOpportunityTypeSelect}
                      selected={selectedOpportunityType}
                    />
                  ) : (
                    <div>
                      <input type="radio" id="" name="stepone-radiogrp" value="1" />
                      <span>No Customers</span>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
            <button type="button" className="stepone-next-btn" onClick={onNextButtonClick}>
              Next
              <span className="right-whit-arrow">
                <img src={ImageConfig.CHEVRON_RIGHT_WHITE} alt="Next Arrow" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOpportunityDefaultFields;
