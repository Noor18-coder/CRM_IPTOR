import React from 'react';
import { Card, Image, Accordion, Form } from 'react-bootstrap';
import { OpportunityContact } from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';

export interface ContactProps {
    data: OpportunityContact
}

interface Props {
    title: string,
    data: OpportunityContact[],
    openAddContactForm: () => void
}

export const ContactAccordian: React.FC<Props> = ({ title, data, openAddContactForm }) => {
    const [activeClass , setActiveClass] = React.useState("");
    const toggleAccordion = () => {
      setActiveClass(activeClass === "" ? "active" : "");
    }
    return (
        <Accordion defaultActiveKey="0">
            <Card className="add-details">
                <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
                    {title}
                    <Image src={ImageConfig.ADD_BTN} alt="Add" title="Add" onClick={openAddContactForm}/> 
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <div className="accr-body-container">
                        {data.length ?
                                data.map((obj: OpportunityContact) => {
                                    return <ContactCards data={obj}/>
                         }) : <div className="padding-28"> No Contacts Found </div>}
                        </div>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );

}
    
export const ContactCards: React.FC<React.PropsWithChildren<ContactProps>> = ({ data }) => {
    const [contactDetails, setContactDetails] = React.useState<models.OpportunityDetailsGroupItem[]>([]);
    React.useEffect(() => {
        OpportunityDetailsApi.getContactDetails(data.contactId).then((contactData) => {
            setContactDetails(contactData)
        });
    }, []);
    const addressObj = contactDetails.find((obj) => obj.attributeType === 'ADDRESS');
    data.visitingAddress = addressObj?.attributeValue
    const roleObj = contactDetails.find((obj) => obj.attributeType === 'ROLE');
    data.role = roleObj?.attributeValue
    return (
        <Card className="accordian-card">
            <Card.Body>
                <div className="left-card">
                    <p><b>{data.contactPerson}</b></p>
                    {/*<p className="mb-2 text-muted">{data.visitingAddress}</p><br />*/}
                    <p>{data.email ? data.email : '--'}</p>
                    <p>{data.phone ? data.phone : '--'}</p> <br />
                    <p>{data.visitingAddress ? data.visitingAddress : '--'}</p>
                </div>
                <div className="right-card">
                    <Image className="card-delete" height="20" src={ImageConfig.DEL_ICON} alt="Iptor" title="Iptor" />
                </div>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Form>
                    <Form.Group>
                        <Form.Label className="contact-label">Select Opportunity Role</Form.Label>
                        <Form.Control as="select" className="form-control contact-font">
                            <option>{data.role}</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Card.Footer>
        </Card>
     );
}

