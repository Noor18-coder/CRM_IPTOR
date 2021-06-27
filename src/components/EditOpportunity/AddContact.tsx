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
    edit:boolean
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

    const onCustomerContactSelect = (e: React.ChangeEvent< HTMLSelectElement> ) => {

        const selectedContact:models.CustomerDetailsContactsGroupItem | undefined = customerContacts.find((obj:models.CustomerDetailsContactsGroupItem) => obj.contactId === (e.currentTarget.value));

        if(selectedContact){
            const tempContact:ContactInfo = {
                contactPerson:selectedContact.contactPerson,
                contactDC:selectedContact.contactId,
                whatsApp:'',
                email:selectedContact.email,
                phone:selectedContact.phone,
                mobile:selectedContact?.mobile,
                linkedin:selectedContact?.linkedin,
                fax:selectedContact?.fax

            }

            setContact(tempContact);
        }
    }

    const onInputValueChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
        if(contact){
            setContact({
                ...contact,
                [e.currentTarget.id]: e.currentTarget.value
            });
        }
    }

    const onNextButtonClick = async () => {
        const opptyId = state.opportuntyDetails.opportunityDefaultParams.opportunityId;
        if(contact){
            const params:models.AddCustomerContactRequestParams = {
                contactParentId:opptyId,
                contactPerson:contact.contactPerson,
                phone:contact.phone,
                mobile:contact.mobile,
                whatsApp:contact.whatsApp,
                linkedin:contact.linkedin,
                fax:contact.fax,
                email:contact.email
            };
            const data = await AddOpportunityApi.addContact(params);
            refresh();
        }

    }


    return (
        <>
            <div>
                <form>
                    <div className="form-group oppty-form-elements">
                        <label className="opp-label">Select Customer Contact</label>
                        <select className="form-control iptor-dd" id="customer-contact" onChange={onCustomerContactSelect}>
                            <option disabled selected>Select Customer Contact</option>
                            {customerContacts.map((obj: models.CustomerDetailsContactsGroupItem) => {
                                return <option value={obj.contactId}>{obj.contactPerson}</option>
                            })}
                        </select>

                        <div className="form-group oppty-form-elements">
                            <label className="opp-label">Contact Person</label>
                            <input type="text" value={contact?.contactPerson} className="form-control" placeholder="Contact Person" id="contactPerson" onChange={onInputValueChange}  disabled={edit} />
                        </div>

                        <div className="form-group oppty-form-elements">
                            <label className="opp-label">Email</label>
                            <input type="text" value={contact?.email} className="form-control" placeholder="Email" id="mobile" onChange={onInputValueChange} disabled={edit} />
                        </div>

                        <div className="form-group oppty-form-elements">
                            <label className="opp-label">Phone No</label>
                            <input type="text" value={contact?.phone} className="form-control" placeholder="Phone Number" id="phone" onChange={onInputValueChange} disabled={edit} />
                        </div>
                        <div className="form-group oppty-form-elements">
                            <label className="opp-label">Mobile Number</label>
                            <input type="text" value={contact?.mobile} className="form-control" placeholder="Mobile Number" id="mobile" onChange={onInputValueChange} disabled={edit} />
                        </div>

                        <div className="form-group oppty-form-elements">
                            <label className="opp-label">Whatsapp</label>
                            <input type="text" value={contact?.whatsApp} className="form-control" placeholder="Whatsapp Number" id="whatsApp" onChange={onInputValueChange} disabled={edit} />
                        </div>
                        <div className="form-group oppty-form-elements">
                            <label className="opp-label">LinkedIn</label>
                            <input type="text" value={contact?.linkedin} className="form-control" placeholder="Linkedin" id="linkedin" onChange={onInputValueChange} disabled={edit} />
                        </div>
                        <div className="form-group oppty-form-elements">
                            <label className="opp-label">Fax</label>
                            <input type="text" value={contact?.fax} className="form-control" placeholder="Fax" id="fax" onChange={onInputValueChange} disabled={edit} />
                        </div>
                    </div>
                </form>
            </div>  
            <div className="step-nextbtn-with-arrow stepsone-nxtbtn" onClick={onNextButtonClick}>
                <a className="stepone-next-btn">
                    Next <span className="right-whit-arrow"><img src={ImageConfig.CHEVRON_RIGHT_WHITE} /></span>
                </a>
            </div>
        </>
    )

}

export default AddContact;
