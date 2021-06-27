import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';
import { AppState } from "../../store/store";

import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';



interface ContactInfo {
    contactPerson: string
    contactDC: string;
    whatsApp: string;
    phone: number;
    mobile?: string;
    linkedin?: string;
    fax?: string;
    email: string
}

interface Props {
    refresh: () => void,
    edit: boolean
}

const AddContact: React.FC<Props> = ({ refresh, edit }) => {
    const state: AppState = useSelector((state: AppState) => state);
    const [customerContacts, setCustomerContacts] = React.useState<models.CustomerDetailsContactsGroupItem[]>([]);
    const [contact, setContact] = React.useState<ContactInfo>();

    React.useEffect(() => {
        loadCustomerContacts();
    }, []);

    const loadCustomerContacts = async () => {

        const customerId = state.opportuntyDetails.opportunityDefaultParams.customer;
        const customerContactsData = await CustomerDetailsApi.getAllContactDetails(customerId);
        setCustomerContacts(customerContactsData);
    }

    const onCustomerContactSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedContact: models.CustomerDetailsContactsGroupItem | undefined = customerContacts.find((obj: models.CustomerDetailsContactsGroupItem) => obj.contactDC === (e.currentTarget.value));

        if (selectedContact) {
            const tempContact: ContactInfo = {
                contactPerson: selectedContact.contactPerson,
                contactDC: selectedContact.contactDC,
                whatsApp: '',
                email: selectedContact.email,
                phone: selectedContact.phone,
                mobile: selectedContact?.mobile,
                linkedin: selectedContact?.linkedin,
                fax: selectedContact?.fax

            }

            setContact(tempContact);
        }
    }

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (contact) {
            setContact({
                ...contact,
                [e.currentTarget.id]: e.currentTarget.value
            });
        }
    }

    const onNextButtonClick = async () => {
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
                email: contact.email
            };
            const data = await AddOpportunityApi.addContact(params);
            refresh();
        }

    }


    return (
        <>
            <div className="card add-contacts">
                <div className="contact-details">
                    <div className="form-group oppty-form-elements">
                        <label className="opp-label">Select Customer Contact</label>
                        <select className="form-control iptor-dd" id="customer-contact" onChange={onCustomerContactSelect}>
                            <option disabled selected>Select Customer Contact</option>
                            {customerContacts.map((obj: models.CustomerDetailsContactsGroupItem) => {
                                return <option value={obj.contactDC}>{obj.contactPerson}</option>
                            })}
                        </select>
                    </div>
                    <>
                        <p><b>{contact && contact.contactPerson}</b></p>
                        <p>Email: {contact && contact.email ? contact?.email : '--'}</p>
                        <p>Phone: {contact && contact.phone ? contact.phone : '--'}</p>
                        <p>Mobile: {contact && contact.mobile ? contact.mobile : '--'}</p>
                        <p>Whatsapp: {contact && contact.whatsApp ? contact.whatsApp : '--'}</p>
                        <p>Fax: {contact && contact.fax ? contact.fax : '--'}</p>
                        <p>Linkedin: {contact && contact.linkedin ? contact.linkedin : '--'}</p>
                    </>
                </div>
            </div>
            <div className="step-nextbtn-with-arrow stepsone-nxtbtn" onClick={onNextButtonClick}>
                <a className={ contact ? "stepone-next-btn done" : "stepone-next-btn inactive"}>Done</a>
            </div>
        </>
    )

}

export default AddContact;

