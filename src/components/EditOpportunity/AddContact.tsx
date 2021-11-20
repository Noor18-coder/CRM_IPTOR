import React from 'react';
import { Dispatch } from 'redux';
import { has, get, isArray } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../../i18n';
import * as models from '../../helpers/Api/models';
import { AppState } from '../../store/store';

import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import { addContactToOpportunity } from '../../store/OpportunityDetails/Actions';

import AddContactFields from '../../config/AddContactFields';
import { AttributeField } from '../../helpers/Api/models';

const AddContact: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const [customerContacts, setCustomerContacts] = React.useState<models.CustomerDetailsContactsGroupItem[]>([]);
  const [contact, setContact] = React.useState<models.ContactInfo>();
  const opportunityContacts = state.opportuntyDetails.contacts;
  const contactAttributes = state.enviornmentConfigs.customerContactAttributes;

  React.useEffect(() => {
    loadCustomerContacts();
  }, []);

  const loadCustomerContacts = async () => {
    const customerId = state.opportuntyDetails.opportunityDefaultParams.customer;
    const customerContactsData = await CustomerDetailsApi.getAllContactDetails(customerId);
    if (opportunityContacts.length > 0) {
      const result = customerContactsData.filter((obj) => opportunityContacts.every((contactObj) => contactObj.contactPerson !== obj.contactPerson));
      setCustomerContacts(result);
    } else {
      setCustomerContacts(customerContactsData);
    }
  };

  const onCustomerContactSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedContact: models.CustomerDetailsContactsGroupItem | undefined = customerContacts.find(
      (obj: models.CustomerDetailsContactsGroupItem) => obj.contactDC === e.currentTarget.value
    );

    if (selectedContact) {
      setContact(selectedContact);
    }
  };

  const getValues = (_attributeType: string) => {
    const objValue = get(contact, _attributeType, '');
    if (isArray(objValue)) {
      return Array.prototype.map
        .call(objValue, function csvFormat(csvobj) {
          return csvobj;
        })
        .join(',');
    } else {
      return objValue;
    }
  };

  const onNextButtonClick = () => {
    const opptyId = state.opportuntyDetails.opportunityDefaultParams.opportunityId;
    if (contact) {
      const params: models.AddCustomerContactRequestParams = {
        contactParentId: opptyId,
        contactPerson: contact.contactPerson,
        contactDC: contact.contactDC,
        phone: contact.phone,
        mobile: contact.mobile,
        // whatsApp: contact.whatsApp,
        // linkedin: contact.linkedin,
        fax: contact.fax,
        email: contact.email,
      };
      dispatch(addContactToOpportunity(opptyId, params));
    }
  };

  return (
    <>
      {customerContacts.length > 0 ? (
        <>
          <div className="add-contacts">
            <div className="contact-details">
              <div className="form-group oppty-form-elements">
                <label htmlFor="customer-contact" className="opp-label">
                  Select Customer Contact
                </label>
                <select className="form-control iptor-dd" id="customer-contact" onChange={onCustomerContactSelect}>
                  <option disabled selected>
                    Select Customer Contact
                  </option>
                  {customerContacts.map((obj: models.CustomerDetailsContactsGroupItem) => {
                    return <option value={obj.contactDC}>{obj.contactPerson}</option>;
                  })}
                </select>
              </div>
              <div className="add-contact-contact-info">
                <>
                  {contact
                    ? AddContactFields.map((field: models.DropDownValue) => {
                        const { valueField, fieldDescription } = field;
                        if (has(contact, valueField)) {
                          return <p>{`${fieldDescription}: ${get(contact, valueField, '')}`}</p>;
                        }
                        return null;
                      })
                    : null}
                </>
                <>
                  {contact
                    ? contactAttributes.map((attributeField: AttributeField) => {
                        const { description, attributeType, valueFormat } = attributeField;
                        return (
                          <>
                            {valueFormat === 'B' ? (
                              <p>
                                <span className="checkbox-description">{description}:</span>
                                <span className="checkbox-label">
                                  <label className="switch value-checkbox">
                                    <input type="checkbox" tabIndex={0} checked={getValues(attributeType) === true} />
                                    <span className="slider round disabled-checkbox">&nbsp;</span>
                                  </label>
                                </span>
                              </p>
                            ) : (
                              <p>{`${description}: ${getValues(attributeType)}`}</p>
                            )}
                          </>
                        );
                      })
                    : null}
                </>
              </div>
            </div>
          </div>
          <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
            <button type="button" className={contact ? 'stepone-next-btn done' : 'stepone-next-btn inactive'} onClick={onNextButtonClick}>
              Done
            </button>
          </div>
        </>
      ) : (
        <div className="add-contact-msg">{i18n.t('NoContactsMsg')}</div>
      )}
    </>
  );
};

export default AddContact;
