import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card, Image, Accordion, Form } from 'react-bootstrap';
import { DeleteCustomerContactParams, OpportunityContact } from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';
import { AppState } from '../../store';
import { Attributes } from '../../helpers/Api';

export interface ContactProps {
    data: OpportunityContact,
    deleteContact: (params:DeleteCustomerContactParams) => void
}

interface Props {
    title: string,
    data: OpportunityContact[],
    openAddContactForm: () => void,
    deleteContact:  (params:DeleteCustomerContactParams) => void
}

export const ContactAccordian: React.FC<Props> = ({ title, data, openAddContactForm, deleteContact }) => {
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
                                    return <ContactCards data={obj} deleteContact={deleteContact} />
                         }) : <div className="padding-28"> No Contacts Found </div>}
                        </div>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );

}
    
export const ContactCards: React.FC<React.PropsWithChildren<ContactProps>> = ({ data, deleteContact }) => {
    const state:AppState = useSelector((state: AppState) => state);
    const [contactDetails, setContactDetails] = React.useState<models.OpportunityDetailsGroupItem[]>([]);
    const [opportunityRole, setOpportunityRole] = React.useState<string | undefined>('');
    React.useEffect(() => {
        loadContactAttributes();
    }, []);

    const loadContactAttributes = async () => {
        const response = await OpportunityDetailsApi.getContactDetails(data.contactId); 
        setContactDetails(response);
        const addressObj = response.find((obj:any) => obj.attributeType === 'ADDRESS');
        data.visitingAddress = addressObj?.attributeValue
        const roleObj = response.find((obj) => obj.attributeType === 'ROLE');
        setOpportunityRole(roleObj?.attributeValue);
    }

    const removeContact = () => {
        const params:DeleteCustomerContactParams = {
            contactId: data.contactId,
            contactParentId: data.contactParentId,
            contactParentFile: data.contactParentFile
        };
        deleteContact(params);
    }

    const changeRole = async (e: React.ChangeEvent<HTMLSelectElement>) => {
         const newValue = e.currentTarget.value;
        
        if(opportunityRole){
            const roleObj = contactDetails.find((obj) => obj.attributeType === 'ROLE');
            const valueId =  roleObj?.valueId ? roleObj.valueId : '';
            const data = await Attributes.updateAttribute('ROLE',  valueId, newValue);
            setOpportunityRole(newValue);
        }else{
           const res = await Attributes.addAttributes('SROMOPCH', data.contactId, 'ROLE', newValue);
            setOpportunityRole(newValue);
        }
     }


   

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
                    <Image className="card-delete" height="20" src={ImageConfig.DEL_ICON}  onClick={removeContact}  />
                </div>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Form>
                    <Form.Group>
                        <Form.Label className="contact-label">Select Opportunity Role</Form.Label>
                        <Form.Control as="select" className="form-control contact-font" value={opportunityRole} multiple={false} onChange={changeRole}>
                            { 
                                 state.enviornmentConfigs.opportunityContactRoles.map((obj:models.DropDownValue) => {
                                    return <option value={obj.valueField}>{obj.valueField}</option> 
                                }) } 
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Card.Footer>
        </Card>
     );
}

