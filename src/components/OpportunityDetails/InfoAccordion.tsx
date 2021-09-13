import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import ImageConfig from '../../config/ImageConfig';

import { OpportunityDetailsBasicInfo, AttributeField, IAttributesList, AttributeValueObject, OpportunityEditOptions } from '../../helpers/Api/models';

interface Props {
  title: string;
  data: OpportunityDetailsBasicInfo[];
  openEditOpportunity: () => void;
}

export const InfoAccordion: React.FC<Props> = ({ title, data, openEditOpportunity }) => {
  const state: OpportunityEditOptions = useSelector((appState: AppState) => appState.opportuntyDetails.editOportunity);

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
          <div className="accr-body-container">
            {state.allowEdit ? (
              <button type="button" className="edit-icon" onClick={openEditOpportunity}>
                <img src={ImageConfig.EDIT_ICON} alt="edit" />
              </button>
            ) : null}
            <ul className="list-inline bdy-list-item accr-list-columns">
              {data.map((obj: OpportunityDetailsBasicInfo) => {
                return (
                  <li className="list-inline-item">
                    <span>{obj.description}</span>
                    {obj.attributeValue ? obj.attributeValue : 'NA'}
                  </li>
                );
              })}
            </ul>
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

interface GroupAccordianProps {
  title: string;
  data: AttributeValueObject[];
  openEditForm: (groupName: string) => void;
}

export const InfoAccordionGroups: React.FC<GroupAccordianProps> = ({ title, data, openEditForm }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const [moreInformationGroups, setMoreInformationGroups] = React.useState<IAttributesList[]>();
  const [activeClass, setActiveClass] = React.useState('');
  const toggleAccordion = () => {
    setActiveClass(activeClass === '' ? 'active' : '');
  };

  React.useEffect(() => {
    const groups = new Set(
      state.enviornmentConfigs.opportunityAttributes.map((obj: any) => {
        return obj.group;
      })
    );
    const response: IAttributesList[] = [];
    groups.forEach((group: string) => {
      const groupAttributes: IAttributesList = { group, items: [] };
      groupAttributes.items = state.enviornmentConfigs.opportunityAttributes.filter((obj) => obj.group === group);
      response.push(groupAttributes);
    });
    setMoreInformationGroups(response);
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
          {title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <>
            {moreInformationGroups?.length
              ? moreInformationGroups.map((key: IAttributesList) => {
                  return (
                    <DisplayGroup
                      title={key.group}
                      fields={key.items}
                      data={data}
                      openEditForm={openEditForm}
                      allowEdit={state.opportuntyDetails.editOportunity.allowEdit}
                    />
                  );
                })
              : null}
          </>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

interface GroupData {
  title: string;
  fields: AttributeField[];
  data: AttributeValueObject[];
  openEditForm: (key: string) => void;
  allowEdit?: boolean;
}

export const DisplayGroup: React.FC<GroupData> = ({ title, fields, data, openEditForm, allowEdit }) => {
  const getValue = (obj: AttributeField) => {
    const dataObject = data.find((object: AttributeValueObject) => {
      return object.attributeType === obj.attributeType;
    });
    const field = fields.find((object: AttributeField) => {
      return object.attributeType === obj.attributeType;
    });
    const value = dataObject && dataObject.attributeValue ? dataObject.attributeValue : '';

    if (field?.valueFormatDesc === 'DATE') {
      const year = value.substring(0, 4);
      const month = value.substring(4, 6);
      const day = value.substring(6, 8);
      return `${year}-${month}-${day}`;
    } else if (field?.valueFormatDesc === 'BOOLEAN') {
      return value ? (value === 'Y' ? 'No' : 'Yes') : '--';
    }
    return value;
  };

  return (
    <div className="more-info-group-container">
      <div className="more-info-group-name">
        {title}
        {allowEdit ? (
          <button type="button" className="edit-moreinfo" onClick={() => openEditForm(title)}>
            <img src={ImageConfig.EDIT_ICON} alt="edit" />
          </button>
        ) : null}
      </div>
      <div className="accr-body-container">
        <ul className="list-inline bdy-list-item accr-list-columns">
          {fields.map((obj: AttributeField) => {
            if (obj.uniqueRecord) {
              return (
                <li className="list-inline-item">
                  <span>{obj.description}</span>
                  {getValue(obj)}
                </li>
              );
            } else {
              const dataObj: AttributeValueObject[] = data.filter((dataObject: AttributeValueObject) => {
                return dataObject.attributeType === obj.attributeType;
              });
              if (dataObj.length) {
                return dataObj.map((elem: AttributeValueObject) => {
                  return (
                    <li className="list-inline-item">
                      <span>{obj.description}</span>
                      {elem.attributeValue}
                    </li>
                  );
                });
              } else {
                return (
                  <li className="list-inline-item">
                    <span>{obj.description}</span>
                    --
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
    </div>
  );
};

interface GroupMobileData {
  fields: AttributeField[];
  data: AttributeValueObject[];
}

export const DisplayGroupMobile: React.FC<GroupMobileData> = ({ fields, data }) => {
  const getValue = (obj: AttributeField) => {
    const dataObject = data.find((object: AttributeValueObject) => {
      return object.attributeType === obj.attributeType;
    });

    const value = dataObject && dataObject.attributeValue ? dataObject.attributeValue : '';

    if (obj?.valueFormatDesc === 'DATE') {
      const year = value.substring(0, 4);
      const month = value.substring(4, 6);
      const day = value.substring(6, 8);
      return `${year}-${month}-${day}`;
    } else if (obj?.valueFormatDesc === 'BOOLEAN') {
      return value ? (value === 'Y' ? 'No' : 'Yes') : '--';
    }
    return value;
  };
  return (
    <div className="more-info-group-container">
      <div className="accr-body-container">
        <ul className="list-inline bdy-list-item">
          {fields.map((obj: AttributeField) => {
            return (
              <li className="list-inline-item">
                <span>{obj.description}</span>
                {getValue(obj)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export const AccordianForMobileWithGroups: React.FC<GroupAccordianProps> = ({ title, data, openEditForm }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const [moreInformationGroups, setMoreInformationGroups] = React.useState<IAttributesList[]>();
  const [activeClass, setActiveClass] = React.useState('');
  const toggleAccordion = () => {
    setActiveClass(activeClass === '' ? 'active' : '');
  };

  React.useEffect(() => {
    const groups = new Set(
      state.enviornmentConfigs.opportunityAttributes.map((obj: any) => {
        return obj.group;
      })
    );
    const response: IAttributesList[] = [];
    groups.forEach((group: string) => {
      const groupName = group.toLowerCase();
      const groupAttributes: IAttributesList = { group: groupName, items: [] };
      groupAttributes.items = state.enviornmentConfigs.opportunityAttributes.filter((obj) => obj.group.toLowerCase() === groupName);
      response.push(groupAttributes);
    });
    setMoreInformationGroups(response);
  }, []);

  return (
    <div className="opp-moreinfo-sec">
      {title}
      <>
        {moreInformationGroups && moreInformationGroups.length
          ? moreInformationGroups.map((obj: IAttributesList) => {
              return (
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
                      {obj.group}
                      {state.opportuntyDetails.editOportunity.allowEdit ? (
                        <button type="button" className="mob-edit-icon" onClick={() => openEditForm(obj.group)}>
                          <img src={ImageConfig.EDIT_ICON} alt="edit" />
                        </button>
                      ) : null}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <DisplayGroupMobile fields={obj.items} data={data} />
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              );
            })
          : null}
      </>
    </div>
  );
};
