import React from 'react';
import { Card, Accordion, Image } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { OpportunityMoreInfoSection, OpportunityDetailsBasicInfo, CustomerDetailsDefault } from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import { setBusinessPartnerWindowActive, setBusinessPartnerWindowGroup } from '../../store/AddCustomer/Actions';
import { getDateInFormat } from '../../helpers/utilities/lib';
import { AppState } from '../../store/store';

interface Props {
  title: string;
  data: OpportunityDetailsBasicInfo[];
  customerDetails: CustomerDetailsDefault;
}

export const MoreInfoAccordian: React.FC<OpportunityMoreInfoSection> = ({ title, data, customerDetails }) => {
  const keys = Object.keys(data);
  const [activeClass, setActiveClass] = React.useState('');

  const toggleAccordion = () => {
    setActiveClass(activeClass === '' ? 'active' : '');
  };

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
          {title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <>
            {keys.map((key: string) => {
              return <DisplayGroup title={key} data={data[key]} customerDetails={customerDetails} />;
            })}
          </>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export const DisplayGroup: React.FC<Props> = ({ title, data, customerDetails }) => {
  const state: AppState = useSelector((CustomerState: AppState) => CustomerState);
  const dispatch: Dispatch<any> = useDispatch();

  const filteredData = _.uniqBy(data, 'attributeType');
  const getUserName = (str: string) => {
    const userObj = state.users.users.find((obj) => obj.user === str);
    return userObj?.description ? userObj?.description : '--';
  };

  const getValue = (obj: any) => {
    const { customerAttributes } = state.enviornmentConfigs;

    const dataObject = data.find((object: any) => {
      return object.attributeType === obj.attributeType;
    });
    const field = customerAttributes.find((object: any) => {
      return object.attributeType === obj.attributeType;
    });
    const value = dataObject && dataObject.attributeValue && dataObject.attributeValue !== '' ? dataObject.attributeValue : '--';
    if (field?.valueFormatDesc === 'DATE') {
      if (value === '--') {
        return '--';
      } else {
        const year = value.substring(0, 4);
        const month = value.substring(4, 6);
        const day = value.substring(6, 8);
        const tempDate = `${year}-${month}-${day}`;
        return getDateInFormat(new Date(tempDate));
      }
    } else if (field?.valueFormatDesc === 'BOOLEAN') {
      return (
        <span className="checkbox-label">
          <label className="switch value-checkbox">
            <input type="checkbox" tabIndex={0} checked={value !== 'N'} />
            <span className="slider round disabled-checkbox">&nbsp;</span>
          </label>
        </span>
      );
    } else if (field?.attributeType === 'owner' || field?.attributeType === 'PS_ACCOUNT_OWNER') {
      return getUserName(obj.attributeValue);
    }
    return value;
  };

  const getMultipleValue = (obj: any) => {
    const { customerAttributes } = state.enviornmentConfigs;
    const field = customerAttributes.find((object: any) => {
      return object.attributeType === obj.attributeType;
    });

    const value = obj && obj.attributeValue && obj.attributeValue !== '' ? obj.attributeValue : '--';

    if (field?.valueFormatDesc === 'DATE') {
      if (value === '--') {
        return '--';
      } else {
        const year = value.substring(0, 4);
        const month = value.substring(4, 6);
        const day = value.substring(6, 8);
        const tempDate = `${year}-${month}-${day}`;
        return getDateInFormat(new Date(tempDate));
      }
    } else if (field?.attributeType === 'owner' || field?.attributeType === 'PS_ACCOUNT_OWNER') {
      return getUserName(obj.attributeValue);
    }
    return value;
  };

  const toggleDrawer = (open: boolean, groupType: string) => {
    dispatch(setBusinessPartnerWindowActive(true));
    dispatch(setBusinessPartnerWindowGroup(groupType));
  };

  return (
    <div className="more-info-group-container">
      <div className="more-info-group-name">
        <span>{title}</span>
        {!customerDetails.active ? (
          ((!!state.auth.user.role && state.auth.user.role === 'Admin') || state.auth.user.user === customerDetails.owner) && (
            <span className="group-icon">
              <Image src={ImageConfig.EDIT_ICON} className="action-icon" alt="Edit" title="Edit" onClick={() => toggleDrawer(true, title)} />
            </span>
          )
        ) : (
          <span className="group-icon">
            <Image src={ImageConfig.EDIT_ICON} className="action-icon" alt="Edit" title="Edit" onClick={() => toggleDrawer(true, title)} />
          </span>
        )}
      </div>
      <div className="accr-body-container">
        <ul className="list-inline bdy-list-item accr-list-columns">
          {filteredData.map((obj: any) => {
            const dataObj = data.filter((dataObject: any) => {
              return dataObject.attributeType === obj.attributeType;
            });
            if (dataObj.length > 1) {
              return dataObj.map((elem: any) => {
                return (
                  <li className="list-inline-item">
                    <span>{obj.description}</span>
                    {getMultipleValue(elem)}
                  </li>
                );
              });
            } else {
              return (
                <li className="list-inline-item">
                  <span>{obj.description}</span>
                  {getValue(obj)}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export const MoreInfoAccordianMobile: React.FC<OpportunityMoreInfoSection> = ({ title, data, customerDetails }) => {
  const state: AppState = useSelector((CustomerState: AppState) => CustomerState);
  const keys = Object.keys(data);
  const [activeClass, setActiveClass] = React.useState('');
  const dispatch: Dispatch<any> = useDispatch();

  const toggleAccordion = () => {
    setActiveClass(activeClass === '' ? 'active' : '');
  };

  const toggleDrawer = (open: boolean, groupType: string) => {
    document.body.classList.add('body-scroll-hidden');
    dispatch(setBusinessPartnerWindowActive(true));
    dispatch(setBusinessPartnerWindowGroup(groupType));
  };

  return (
    <div className="opp-moreinfo-sec">
      {title}
      <>
        {keys.map((key: string) => {
          return (
            <Accordion defaultActiveKey="0">
              <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
                <span className="edit-subtitle">{key}</span>
                {!customerDetails.active ? (
                  ((!!state.auth.user.role && state.auth.user.role === 'Admin') || state.auth.user.user === customerDetails.owner) && (
                    <button className="panel-close-icon link-anchor-button" onClick={() => toggleDrawer(true, key)} type="button">
                      <img src={ImageConfig.EDIT_ICON} className="mob-edit-icon-cust action-icon" alt="Edit" />
                    </button>
                  )
                ) : (
                  <button className="panel-close-icon link-anchor-button" onClick={() => toggleDrawer(true, key)} type="button">
                    <img src={ImageConfig.EDIT_ICON} className="mob-edit-icon-cust action-icon" alt="Edit" />
                  </button>
                )}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <DisplayGroupMobile title={key} data={data[key]} customerDetails={customerDetails} />
              </Accordion.Collapse>
            </Accordion>
          );
        })}
      </>
    </div>
  );
};

export const DisplayGroupMobile: React.FC<Props> = ({ data }) => {
  const state: AppState = useSelector((CustomerState: AppState) => CustomerState);

  const getUserName = (str: string) => {
    const userObj = state.users.users.find((obj) => obj.user === str);
    return userObj?.description ? userObj?.description : '--';
  };

  const getValue = (obj: any) => {
    const { customerAttributes } = state.enviornmentConfigs;

    const dataObject = data.find((object: any) => {
      return object.attributeType === obj.attributeType;
    });
    const field = customerAttributes.find((object: any) => {
      return object.attributeType === obj.attributeType;
    });
    const value = dataObject && dataObject.attributeValue ? dataObject.attributeValue : '--';

    if (field?.valueFormatDesc === 'DATE') {
      if (value === '') {
        return '--';
      } else {
        const year = value.substring(0, 4);
        const month = value.substring(4, 6);
        const day = value.substring(6, 8);
        const tempDate = `${year}-${month}-${day}`;
        return getDateInFormat(new Date(tempDate));
      }
    } else if (field?.valueFormatDesc === 'BOOLEAN') {
      return (
        <span className="checkbox-label">
          <label className="switch value-checkbox">
            <input type="checkbox" tabIndex={0} checked={value !== 'N'} />
            <span className="slider round disabled-checkbox">&nbsp;</span>
          </label>
        </span>
      );
    } else if (field?.description === 'Account Owner') {
      return getUserName(obj.attributeValue);
    }
    return value;
  };

  return (
    <div className="more-info-group-container">
      <div className="accr-body-container">
        {data.map((obj: any) => {
          return (
            <ul className="list-inline bdy-list-item">
              <li className="list-inline-item">
                <span>{obj.description}</span>
                {getValue(obj)}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};
