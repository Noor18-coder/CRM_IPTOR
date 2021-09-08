import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Image, Accordion } from 'react-bootstrap';
import { DeleteCustomerContactParams, OpportunityContact } from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import ImageConfig from '../../config/ImageConfig';
import * as models from '../../helpers/Api/models';
import { AppState } from '../../store';
import { Attributes } from '../../helpers/Api';

export interface ContactProps {
  data: OpportunityContact;
  deleteContact: (params: DeleteCustomerContactParams) => void;
}

interface Props {
  title: string;
  data: OpportunityContact[];
  openAddContactForm: () => void;
  deleteContact: (params: DeleteCustomerContactParams) => void;
}

export const ContactAccordian: React.FC<Props> = ({ title, data, openAddContactForm, deleteContact }) => {
  const [activeClass, setActiveClass] = React.useState('');
  const toggleAccordion = () => {
    setActiveClass(activeClass === '' ? 'active' : '');
  };
  return (
    <Accordion defaultActiveKey="0">
      <Card className="add-details">
        <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
          {title}
          <Image src={ImageConfig.ADD_BTN} alt="Add" title="Add" onClick={openAddContactForm} />
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <div className="container-fluid">
            <div className="row">
              {data.length ? (
                data.map((obj: OpportunityContact) => {
                  return <ContactCards data={obj} deleteContact={deleteContact} />;
                })
              ) : (
                <div className="padding-28"> No Contacts Found </div>
              )}
            </div>
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export const ContactCards: React.FC<React.PropsWithChildren<ContactProps>> = ({ data, deleteContact }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const [contactDetails, setContactDetails] = React.useState<models.OpportunityDetailsGroupItem[]>([]);
  const [opportunityRole, setOpportunityRole] = React.useState<string | undefined>('');
  React.useEffect(() => {
    loadContactAttributes();
  }, []);

  const loadContactAttributes = async () => {
    const response = await OpportunityDetailsApi.getContactDetails(data.contactId);
    setContactDetails(response);
    const addressObj = response.find((obj: any) => obj.attributeType === 'ADDRESS');
    // eslint-disable-next-line no-param-reassign
    data.visitingAddress = addressObj?.attributeValue;
    const roleObj = response.find((obj) => obj.attributeType === 'ROLE');
    setOpportunityRole(roleObj?.attributeValue);
  };

  const removeContact = () => {
    const params: DeleteCustomerContactParams = {
      contactId: data.contactId,
      contactParentId: data.contactParentId,
      contactParentFile: data.contactParentFile,
    };
    deleteContact(params);
  };

  const changeRole = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.currentTarget.value;

    if (opportunityRole) {
      const roleObj = contactDetails.find((obj) => obj.attributeType === 'ROLE');
      const valueId = roleObj?.valueId ? roleObj.valueId : '';
      await Attributes.updateAttribute('ROLE', valueId, newValue);
      setOpportunityRole(newValue);
    } else {
      await Attributes.addAttributes('SROMOPCH', data.contactId, 'ROLE', newValue);
      setOpportunityRole(newValue);
    }
  };

  return (
    <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-body">
          <div className="name-add-sec">
            <p className="person-name-desig">
              <span className="name">{data.contactPerson}</span>
              <span className="designation">Associate - Sales</span>
            </p>
            <p className="mailid">{data.email ? data.email : '--'}</p>
            <p className="contact-num">{data.phone ? data.phone : '--'}</p>
            <p className="contact-address">{data.visitingAddress ? data.visitingAddress : '--'}</p>
          </div>
          <button type="button" className="address-card-close link-anchor-button" onClick={removeContact}>
            <Image className="card-delete" height="20" src={ImageConfig.CLOSE_BTN} />
          </button>

          <div className="select-opportunity-sec">
            <div className="form-group">
              <label htmlFor="contact-role">Select Opportunity Role</label>
              <select className="form-control opportunity-dd" id="contact-role" value={opportunityRole} multiple={false} onChange={changeRole}>
                {state.enviornmentConfigs.opportunityContactRoles.map((obj: models.DropDownValue) => {
                  return <option value={obj.valueField}>{obj.valueField}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
