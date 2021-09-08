import React from 'react';
import { useSelector } from 'react-redux';
import * as models from '../../helpers/Api/models';
import { AppState } from '../../store/store';

import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';

interface ContactInfo {
  contactPerson: string;
  contactDC: string;
  whatsApp: string;
  phone: number;
  mobile?: string;
  linkedin?: string;
  fax?: string;
  email: string;
}

interface Props {
  refresh: () => void;
}

const AddContact: React.FC<Props> = ({ refresh }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const [customerContacts, setCustomerContacts] = React.useState<models.CustomerDetailsContactsGroupItem[]>([]);
  const [contact, setContact] = React.useState<ContactInfo>();

  React.useEffect(() => {
    loadCustomerContacts();
  }, []);

  const loadCustomerContacts = async () => {
    const customerId = state.opportuntyDetails.opportunityDefaultParams.customer;
    const customerContactsData = await CustomerDetailsApi.getAllContactDetails(customerId);
    setCustomerContacts(customerContactsData);
  };

  const onCustomerContactSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedContact: models.CustomerDetailsContactsGroupItem | undefined = customerContacts.find(
      (obj: models.CustomerDetailsContactsGroupItem) => obj.contactDC === e.currentTarget.value
    );

    if (selectedContact) {
      const tempContact: ContactInfo = {
        contactPerson: selectedContact.contactPerson,
        contactDC: selectedContact.contactDC,
        whatsApp: '',
        email: selectedContact.email,
        phone: selectedContact.phone,
        mobile: selectedContact?.mobile,
        linkedin: selectedContact?.linkedin,
        fax: selectedContact?.fax,
      };

      setContact(tempContact);
    }
  };

  const onNextButtonClick = () => {
    const opptyId = state.opportuntyDetails.opportunityDefaultParams.opportunityId;
    if (contact) {
      const params: models.AddCustomerContactRequestParams = {
        contactParentId: opptyId,
        contactPerson: contact.contactPerson,
        phone: contact.phone,
        mobile: contact.mobile,
        whatsApp: contact.whatsApp,
        linkedin: contact.linkedin,
        fax: contact.fax,
        email: contact.email,
      };
      AddOpportunityApi.addContact(params).then(() => {
        refresh();
      });
    }
  };

  return (
    <>
      <div className="card add-contacts">
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
          <>
            <p>
              <b>{contact && contact.contactPerson}</b>
            </p>
            <p>Email: {contact && contact.email ? contact?.email : '--'}</p>
            <p>Phone: {contact && contact.phone ? contact.phone : '--'}</p>
            <p>Mobile: {contact && contact.mobile ? contact.mobile : '--'}</p>
            <p>Whatsapp: {contact && contact.whatsApp ? contact.whatsApp : '--'}</p>
            <p>Fax: {contact && contact.fax ? contact.fax : '--'}</p>
            <p>Linkedin: {contact && contact.linkedin ? contact.linkedin : '--'}</p>
          </>
        </div>
      </div>
      <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
        <button type="button" className={contact ? 'stepone-next-btn done' : 'stepone-next-btn inactive'} onClick={onNextButtonClick}>
          Done
        </button>
      </div>
    </>
  );
};

export default AddContact;
