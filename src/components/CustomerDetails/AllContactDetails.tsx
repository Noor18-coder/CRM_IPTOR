import React from 'react';
import { Card, Image, Accordion, Form } from 'react-bootstrap';
import { CustomerDetailsContactsGroupItem } from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import { setBusinessPartnerWindowActive, setBusinessPartnerWindowGroup, setBusinessPartnerContactId } from '../../store/AddCustomer/Actions';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

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
  
    return (
        <Accordion defaultActiveKey="0">
            <Card className="contact-class">
                <Accordion.Toggle  className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
                    {title}
                    <span className="cust-info"><span>{contactData.length} CONTACTS</span></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <div className="accr-body-container">
                        {contactData.length ?
                                contactData.map((obj: CustomerDetailsContactsGroupItem) => {
                                    return <Card className="accordian-card">
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
                                            <Image className="card-delete" height="20" src={ImageConfig.DEL_ICON} alt="Iptor" title="Iptor" />
                                            <Image src={ImageConfig.EDIT_ICON} className='action-icon' alt="Edit" title="Edit" onClick={toggleDrawer(true, 'contact fields', obj.contactId.toString())}/>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer className="text-muted right-align">
                                        <ul className="list-inline contact-footer">
                                            <li className="list-inline-item"> <span className="active-text">Active <label className="switch active-box">
                                                <input type="checkbox" id="ACTIVE" checked={true} />
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

