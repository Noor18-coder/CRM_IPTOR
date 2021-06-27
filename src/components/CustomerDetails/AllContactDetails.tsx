import React from 'react';
import { Card, Image, Accordion, Form } from 'react-bootstrap';
import { CustomerDetailsContactsGroupItem } from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';

interface Props {
    title: string,
    contactData: CustomerDetailsContactsGroupItem[]
}

export const AllContactsAccordian: React.FC<Props> = ({ title, contactData }) => {
    return (
        <Accordion defaultActiveKey="0">
            <Card className="contact-class">
                <Accordion.Toggle as={Card.Link} eventKey="1">
                    {title}
                    <span className="cust-info"><span>{contactData.length} CONTACTS</span></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <div className="accr-body-container">
                        {contactData.length ?
                                contactData.map((obj: CustomerDetailsContactsGroupItem) => {
                                    return         <Card className="accordian-card">
                                    <Card.Body>
                                        <div className="left-card">
                                            <p><b>{obj.contactPerson}</b></p>
                                            <p>{obj.role}</p>
                                            <p>{obj.email ? obj.email : '--'}</p>
                                            <p>{obj.phone ? obj.phone : '--'}</p> <br />
                                            {/* <p>Dadalvagen 33, KINSLINGE,</p>
                                             <p>289 00, Sweden </p> */}
                                        </div>
                                        <div className="right-card">
                                            <Image className="card-delete" height="20" src={ImageConfig.DEL_ICON} alt="Iptor" title="Iptor" />
                                        </div>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                    </Card.Footer>
                                </Card>
                         }) : <div className="padding-28"> No Contacts Found </div>}
                        </div>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );

}

