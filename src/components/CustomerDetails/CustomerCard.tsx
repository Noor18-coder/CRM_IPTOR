import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Accordion, Card, Image } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import i18n from '../../i18n';

import ImageConfig from '../../config/ImageConfig';
import { AppState } from '../../store/store';
import { AllContactsAccordian } from './AllContactDetails';
import { MoreInfoAccordian, MoreInfoAccordianMobile } from './MoreInfo';
import { CustomerDetailsDefault, CustomerDetailsContactsGroupItem, Area, IStringList } from '../../helpers/Api/models';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';

import Container from '../AddCustomer/Container';
import { setBusinessPartnerWindowActive, setBusinessPartnerLoader, setBusinessPartnerWindowGroup } from '../../store/AddCustomer/Actions';

export interface Data {
  data: CustomerDetailsDefault;
  contactsData: CustomerDetailsContactsGroupItem[];
}

const CustomerCard: React.FC<Data> = (props) => {
  const {
    data: { numberOfInactiveOpportunities, numberOfActiveOpportunities, addressLine1, phone, productFamily, owner, active },
    contactsData,
    data,
  } = props;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const [subsidiaryEntities, setsubsidiaryEntities] = React.useState<CustomerDetailsDefault[]>([]);
  const inactiveCount = numberOfInactiveOpportunities || 0;
  const activeCount = numberOfActiveOpportunities || 0;
  const [area, setArea] = React.useState<Area[]>([]);
  const [customerMoreInfoGroup, setCustomerMoreInfoGroup] = React.useState<IStringList>();

  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory();
  const state: AppState = useSelector((CustomerState: AppState) => CustomerState);
  const { customerAttributes } = state.enviornmentConfigs;

  React.useEffect(() => {
    if (props.data.subsidiaryEntities) {
      Promise.all(
        props.data.subsidiaryEntities.map((id: any) => {
          return CustomerDetailsApi.get(id);
        })
      ).then((entityData) => {
        setsubsidiaryEntities(entityData);
        return entityData;
      });
    }

    CustomerDetailsApi.getArea(props.data.area).then((dataResponse) => {
      setArea(dataResponse);
    });

    OpportunityDetailsApi.getCustomerGroupInfo(props.data.businessPartner.toString()).then((dataResult) => {
      customerAttributes.forEach((item) => {
        if (!dataResult.some((ele) => ele.attributeType === item.attributeType)) {
          dataResult.push({ attributeType: item.attributeType, group: item.group, attributeValue: '', description: item.description });
        }
      });
      const groups = new Set(
        dataResult.map((obj) => {
          return obj.group;
        })
      );
      const response: any = {};
      groups.forEach((group: string) => {
        const groupName = group.toLowerCase();
        response[groupName] = dataResult.filter((obj) => obj.group.toLowerCase() === groupName);
      });
      setCustomerMoreInfoGroup(response);
    });
    dispatch(setBusinessPartnerLoader(false));
    dispatch(setBusinessPartnerWindowActive(false));
  }, []);

  const [activeClass, setActiveClass] = React.useState('');
  const toggleAccordion = () => {
    setActiveClass(activeClass === '' ? 'active' : '');
  };

  const toggleDrawer = (open: boolean, groupType: string) => {
    document.body.classList.add('body-scroll-hidden');
    dispatch(setBusinessPartnerWindowActive(true));
    dispatch(setBusinessPartnerWindowGroup(groupType));
  };

  const openOpptyList = (flag: boolean) => {
    history.push({ pathname: '/opportunities', state: { selectCustomer: props.data.businessPartner, activeOp: flag } });
  };

  const getUserName = (str: string) => {
    const userObj = state.users.users.find((obj) => obj.user === str);
    return userObj?.description ? userObj?.description : '--';
  };

  const getOwnerEmail = (str: string) => {
    const userObj = state.users.users.find((obj) => obj.user === str);
    return userObj?.EMAIL ? userObj?.EMAIL[0] : '--';
  };

  const getOwnerPhone = (str: string) => {
    const userObj = state.users.users.find((obj) => obj.user === str);
    return userObj?.PHONE ? userObj?.PHONE[0] : '--';
  };

  return (
    <>
      <section className="sec-info-accordion mob-moreinfo-accordion">
        <Accordion defaultActiveKey="0">
          <Card className="cust-details">
            <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
              {i18n.t('basicInfo')}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="accr-body-container">
                {!active ? (
                  ((!!state.auth.user.role && state.auth.user.role === 'Admin') || state.auth.user.user === owner) && (
                    <div className="group-icon">
                      <Image
                        src={ImageConfig.EDIT_ICON}
                        className="action-icon"
                        alt="Edit"
                        title="Edit"
                        onClick={() => toggleDrawer(true, 'default fields')}
                      />
                    </div>
                  )
                ) : (
                  <div className="group-icon">
                    <Image
                      src={ImageConfig.EDIT_ICON}
                      className="action-icon"
                      alt="Edit"
                      title="Edit"
                      onClick={() => toggleDrawer(true, 'default fields')}
                    />
                  </div>
                )}
                <ul className="list-inline bdy-list-item accr-list-columns padd-24">
                  <li className={isMobile || isTablet ? '' : 'list-inline-item'}>
                    <span>Contact Address</span>
                    {addressLine1}
                  </li>
                  <li className={isMobile || isTablet ? '' : 'list-inline-item'}>
                    <span>Area</span>
                    {area
                      ? area.map((obj: Area) => {
                          return obj.description;
                        })
                      : '--'}
                  </li>
                  <li className={isMobile || isTablet ? '' : 'list-inline-item'}>
                    <span>Phone Number</span>
                    {phone || '--'}
                  </li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Container
          containerType="edit"
          containerData={props}
          groupType={state.addBusinessPartner.businessPartnerWindowGroup}
          contactId={state.addBusinessPartner.businessPartnerContactId}
        />
      </section>

      <section className="sec-info-accordion">
        {isMobile || isTablet
          ? customerMoreInfoGroup && <MoreInfoAccordianMobile title={i18n.t('moreInfo')} data={customerMoreInfoGroup} customerDetails={data} />
          : customerMoreInfoGroup && <MoreInfoAccordian title={i18n.t('moreInfo')} data={customerMoreInfoGroup} customerDetails={data} />}
      </section>

      {isMobile || isTablet ? (
        <section className="customer-mobilecard">
          <div className="customer-details d-flex justify-content-between">
            <div className="lft-col">
              Account owner
              <span>{getUserName(owner)}</span>
            </div>

            <div className="right-data">{/* <p><Image className="edit" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" /></p> */}</div>
          </div>
          <div className="customer-details d-flex justify-content-between">
            <div className="lft-col">
              <span>{getOwnerPhone(owner)}</span>
            </div>

            <div className="right-data">
              <p>
                <Image width="25" src={ImageConfig.PHONE} alt="phone" title="phone" />
              </p>
            </div>
          </div>

          <div className="customer-details d-flex justify-content-between">
            <div className="lft-col">
              <span>{getOwnerEmail(owner)}</span>
            </div>

            <div className="right-data">
              <p>
                <Image width="25" src={ImageConfig.MAIL} alt="mail" title="mail" />
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="d-flex justify-content-between align-items-center sec-customer-desc">
          <div className="accr-body-container">
            <ul className="list-inline bdy-list-item owner-section d-flex align-items-center">
              <li className="list-inline-item">
                <span>Account owner</span> {getUserName(owner)}
              </li>
              <li className="list-inline-item">
                <Image width="25" src={ImageConfig.PHONE} alt="phone" title="phone" />
                &nbsp;&nbsp;{getOwnerPhone(owner)}
              </li>
              <li className="list-inline-item">
                <Image width="25" src={ImageConfig.MAIL} alt="mail" title="mail" /> &nbsp;&nbsp;
                {getOwnerEmail(owner)}
              </li>
            </ul>
          </div>
        </section>
      )}

      <section className="d-flex align-items-center sec-customer-desc">
        <div className="cust-group">
          <p>{i18n.t('appFromIptor')}</p>
        </div>
        {productFamily
          ? productFamily.map((name: any) => {
              return (
                <div className="group-sec">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <span className="cust-info">{name}</span>{' '}
                    </li>
                  </ul>
                </div>
              );
            })
          : null}
      </section>

      <section className="sec-info-accordion">
        <AllContactsAccordian title=" All Contact" contactData={contactsData} activeCustomer={active} />
      </section>

      <section className="d-flex sec-customer-desc">
        <div className="cust-group">
          <p>Opportunities</p>
        </div>
        <div className="group-sec">
          <ul className="list-inline">
            <li className="list-inline-item">
              <span
                className={activeCount !== 0 ? 'cust-info action-icon' : 'cust-info'}
                onClick={activeCount !== 0 ? () => openOpptyList(true) : undefined}
                onKeyDown={activeCount !== 0 ? () => openOpptyList(true) : undefined}
                role="presentation">
                {activeCount} ACTIVE
              </span>{' '}
            </li>
            <li className="list-inline-item">
              <span
                className={inactiveCount !== 0 ? 'cust-info action-icon' : 'cust-info'}
                onClick={inactiveCount !== 0 ? () => openOpptyList(false) : undefined}
                onKeyDown={inactiveCount !== 0 ? () => openOpptyList(false) : undefined}
                role="presentation">
                {inactiveCount} CLOSED
              </span>
            </li>
            <li className="list-inline-item">
              <span className="cust-info">{activeCount + inactiveCount} TOTAL</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="d-flex sec-customer-desc">
        <div className="cust-group">
          <p>Subsidiary - Entity</p>
        </div>
        {subsidiaryEntities
          ? subsidiaryEntities.map((objItem: CustomerDetailsDefault) => {
              return (
                <div className="group-sec">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <span className="cust-info">{`${objItem.name} - ${objItem.area}`}</span>{' '}
                    </li>
                  </ul>
                </div>
              );
            })
          : null}
      </section>
    </>
  );
};

export default CustomerCard;
