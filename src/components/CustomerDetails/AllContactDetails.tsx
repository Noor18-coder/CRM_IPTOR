import React from 'react';
import { Card, Image, Accordion, Form } from 'react-bootstrap';
import { CustomerDetailsContactsGroupItem } from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import { setBusinessPartnerWindowActive, setBusinessPartnerWindowGroup, setBusinessPartnerContactId, setBusinessPartnerLoader } from '../../store/AddCustomer/Actions';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';

interface Props {
    title: string,
    contactData: CustomerDetailsContactsGroupItem[]
}

export const AllContactsAccordian: React.FC<Props> = ({ title, contactData }) => {
    const [activeClass, setActiveClass] = React.useState("");
    const dispatch: Dispatch<any> = useDispatch();

    const toggleAccordion = () => {
      setActiveClass(activeClass === "" ? "active" : "");
    }

    const toggleDrawer = (open: boolean, groupType: string, contactId: string) => (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
        dispatch(setBusinessPartnerWindowActive(true));
        dispatch(setBusinessPartnerWindowGroup(groupType));
        dispatch(setBusinessPartnerContactId(contactId));
    };

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const selectedContact = contactData.filter((element) => element.contactDC == id);
        selectedContact[0]['ACTIVE'] = e.currentTarget.checked
        dispatch(setBusinessPartnerLoader(true));
        CustomerDetailsApi.updateContactDetails(selectedContact[0]);
        setTimeout(function () {
            window.location.reload(false);
            dispatch(setBusinessPartnerLoader(false));
        }, 1000);
    }
  
    return (
        <Accordion defaultActiveKey="0">
            <Card className="contact-class">
                <Accordion.Toggle  className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
                    {title}
                    <span className="cust-info"><span>{contactData.length} CONTACTS</span></span>
                    <Image src={ImageConfig.ADD_BTN} className="add-img action-icon" alt="Add" title="Add" onClick={toggleDrawer(true, 'add contact fields', '')} />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <div className="accr-body-container">
                        {contactData.length ?
                                contactData.map((obj: CustomerDetailsContactsGroupItem) => {
                                    return <Card className={obj.ACTIVE ? "accordian-card" : "accordian-card disabled-card"}>
                                    <Card.Body>
                                        <div className="contact-left-card">
                                            <p><b>{obj.contactPerson}</b></p>
                                            <p className="role">{obj.role}</p>
                                            <p>{obj.email ? obj.email : '--'}</p>
                                            <p>{obj.phone ? obj.phone : '--'}</p> <br />
                                            <p>{obj.ADDRESS ? obj.ADDRESS : '--'}</p>
                                            {/*<p>{obj.ADDRESS_2 ? obj.ADDRESS_2 : '--'}</p>*/}
                                            </div>
                                        <div className="contact-right-card">
                                            <Image className="card-delete" height="20" src={ImageConfig.DEL_ICON} alt="Delete" title="Delete" />
                                            <Image src={ImageConfig.EDIT_ICON} className={obj.ACTIVE ? 'action-icon' : ''} alt="Edit" title="Edit" onClick={obj.ACTIVE ? toggleDrawer(true, 'contact fields', obj.contactDC ? obj.contactDC.toString() : '') : undefined} />
                                    </div>
                                    </Card.Body>
                                        <Card.Footer className="text-muted right-align">
                                        <ul className="list-inline contact-footer">
                                                <li className="list-inline-item"> <span className="active-text">Active <label className="switch active-box">
                                                    <input type="checkbox" id="ACTIVE" checked={obj.ACTIVE} onChange={(e) => onInputValueChange(e, obj.contactDC ? obj.contactDC.toString() : '')} />
                                                <span className="slider round"></span>
                                            </label> </span> </li>
                                        </ul>
                                    </Card.Footer>
                                </Card>
                         }) : <div className="padding-28"> No Contacts Found </div>}
                        </div>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );

}

