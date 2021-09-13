import React from 'react';
import { Card, Image, Accordion } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import * as models from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import {
  setBusinessPartnerWindowActive,
  setBusinessPartnerWindowGroup,
  setBusinessPartnerContactId,
  setBusinessPartnerLoader,
} from '../../store/AddCustomer/Actions';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';

interface Props {
  title: string;
  contactData: models.CustomerDetailsContactsGroupItem[];
  customerData: models.CustomerDetailsDefault;
}

export const AllContactsAccordian: React.FC<Props> = ({ title, contactData, customerData }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const [activeClass, setActiveClass] = React.useState('');
  const dispatch: Dispatch<any> = useDispatch();

  const toggleAccordion = () => {
    setActiveClass(activeClass === '' ? 'active' : '');
  };

  const toggleDrawer = (groupType: string, contactId: string) => {
    document.body.classList.add('body-scroll-hidden');
    dispatch(setBusinessPartnerWindowActive(true));
    dispatch(setBusinessPartnerWindowGroup(groupType));
    dispatch(setBusinessPartnerContactId(contactId));
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const selectedContact = contactData.filter((element) => element.contactDC === id);
    selectedContact[0].ACTIVE = e.currentTarget.checked;
    dispatch(setBusinessPartnerLoader(true));
    CustomerDetailsApi.updateContactDetails(selectedContact[0]);
    setTimeout(function () {
      window.location.reload(false);
      dispatch(setBusinessPartnerLoader(false));
    }, 3000);
  };

  const deleteContact = (customerId: string, contactId: string) => {
    dispatch(setBusinessPartnerLoader(true));
    CustomerDetailsApi.deleteContact(customerId, contactId);
    setTimeout(function () {
      window.location.reload(false);
      dispatch(setBusinessPartnerLoader(false));
    }, 3000);
  };

  return (
    <Accordion defaultActiveKey="0">
      <Card className="contact-class">
        <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
          <span className="cust-title">{title}</span>
          <span className="cust-info">
            <span>{contactData.length} CONTACTS</span>
          </span>
          {customerData.active ? (
            <Image
              src={ImageConfig.ADD_BTN}
              className="add-img action-icon"
              alt="Add"
              title="Add"
              onClick={() => toggleDrawer('add contact fields', '')}
            />
          ) : null}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <div className="accr-body-container customers-comp">
            <div className="container-fluid">
              <div className="row">
                {contactData.length ? (
                  contactData.map((obj: models.CustomerDetailsContactsGroupItem) => {
                    return (
                      <div className="col-md-4">
                        <Card className="accordian-card mb-4">
                          <Card.Body className={!obj.ACTIVE ? 'disabled-card' : ''}>
                            <div className="name-add-sec">
                              <p className="person-name-desig">
                                <span className="name">{obj.contactPerson}</span>
                                <span className="designation">{obj.role}</span>
                              </p>
                              <p className="mailid">{obj.email ? obj.email : '--'}</p>
                              <p className="contact-num">{obj.phone ? obj.phone : '--'}</p> <br />
                              <p className="contact-address">
                                <span className="line1">{obj.ADDRESS ? obj.ADDRESS : '--'}</span>
                              </p>
                            </div>
                            <div className="card-action-icons">
                              {obj.ACTIVE && (
                                <>
                                  <Image
                                    className="card-delete action-icon"
                                    height="20"
                                    src={isMobile || isTablet ? ImageConfig.DELETE_ICON : ImageConfig.CLOSE_BTN}
                                    alt="Delete"
                                    title="Delete"
                                    onClick={() =>
                                      deleteContact(
                                        obj.businessPartner ? obj.businessPartner.toString() : '',
                                        obj.contactDC ? obj.contactDC.toString() : ''
                                      )
                                    }
                                  />
                                  <Image
                                    src={ImageConfig.EDIT_ICON}
                                    className="action-icon"
                                    alt="Edit"
                                    title="Edit"
                                    onClick={() => toggleDrawer('contact fields', obj.contactDC ? obj.contactDC.toString() : '')}
                                  />
                                </>
                              )}
                            </div>
                            <div className="active-switch">
                              <span className="active-text">
                                Active
                                <label className="switch active-box">
                                  <input
                                    type="checkbox"
                                    id="ACTIVE"
                                    checked={obj.ACTIVE}
                                    onChange={(e) => onInputValueChange(e, obj.contactDC ? obj.contactDC.toString() : '')}
                                  />
                                  <span className="slider round">&nbsp;</span>
                                </label>
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  })
                ) : (
                  <div className="padding-28"> No Contacts Found </div>
                )}
              </div>
            </div>
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
