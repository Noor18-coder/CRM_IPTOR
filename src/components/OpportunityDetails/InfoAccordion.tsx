import React from 'react';
import { includes } from 'lodash';
import { Accordion, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import ImageConfig from '../../config/ImageConfig';
import { getDateInFormat } from '../../helpers/utilities/lib';

import {
  OpportunityDetailsBasicInfo,
  AttributeField,
  IAttributesList,
  AttributeValueObject,
  OpportunityEditOptions,
  OpportunityType,
} from '../../helpers/Api/models';

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
                    {obj.attributeValue ? `${obj.attributeValue}` : 'NA'}
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
  openEditForm: (groupName: string) => void;
  oppType: string;
}

export const InfoAccordionGroups: React.FC<GroupAccordianProps> = ({ title, openEditForm, oppType }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const { attributes, opportunityDefaultParams } = state.opportuntyDetails;
  const [moreInformationGroups, setMoreInformationGroups] = React.useState<IAttributesList[]>([]);
  const [activeClass, setActiveClass] = React.useState('');

  const toggleAccordion = () => {
    setActiveClass(activeClass === '' ? 'active' : '');
  };

  const setAllFields = (_opptyType: string) => {
    const groups = new Set(
      state.enviornmentConfigs.opportunityAttributes.map((obj: any) => {
        return obj.group;
      })
    );

    const recordType: OpportunityType | undefined = state.enviornmentConfigs.crmOpportunityTypes.find((obj: OpportunityType) => {
      return obj.oppRecordType === _opptyType;
    });

    const optionalFields = recordType && recordType.OPTIONAL_FIELDS ? recordType.OPTIONAL_FIELDS : [];
    const mandatoryFields = recordType && recordType.MANDATORY_FIELDS ? recordType.MANDATORY_FIELDS : [];
    const strArray = [...optionalFields, ...mandatoryFields];
    const tempAttributes: AttributeField[] = state.enviornmentConfigs.opportunityAttributes || [];

    if (strArray.length) {
      const response: IAttributesList[] = [];
      const filteredAttributes: AttributeField[] = tempAttributes.filter((obj: AttributeField) => {
        return includes(strArray, obj.attributeType);
      });

      groups.forEach((group: string) => {
        const items: AttributeField[] = filteredAttributes.filter((obj) => obj.group === group);
        if (items.length) {
          response.push({ group, items });
        }
      });

      setMoreInformationGroups(response);
    } else {
      const response: IAttributesList[] = [];
      groups.forEach((group: string) => {
        const groupAttributes: IAttributesList = { group, items: [] };
        groupAttributes.items = state.enviornmentConfigs.opportunityAttributes.filter((obj) => obj.group === group);
        response.push(groupAttributes);
      });
      setMoreInformationGroups(response);
    }
  };

  React.useEffect(() => {
    setAllFields(oppType);
  }, [oppType]);

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
          {title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <>
            {opportunityDefaultParams.oppRecordType && moreInformationGroups && moreInformationGroups?.length
              ? moreInformationGroups.map((key: IAttributesList) => {
                  return (
                    <DisplayGroup
                      title={key.group}
                      fields={key.items}
                      data={attributes}
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
      if (value !== '') {
        const year = value.substring(0, 4);
        const month = value.substring(4, 6);
        const day = value.substring(6, 8);
        const tempDate = `${year}-${month}-${day}`;
        return getDateInFormat(new Date(tempDate));
      } else {
        return '--';
      }
    } else if (field?.valueFormatDesc === 'BOOLEAN') {
      return (
        <span className="checkbox-label">
          <label className="switch value-checkbox">
            <input type="checkbox" tabIndex={0} checked={value === 'Y'} />
            <span className="slider round disabled-checkbox">&nbsp;</span>
          </label>
        </span>
      );
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

    if (!value) {
      return '-';
    }

    if (value && obj?.valueFormatDesc === 'DATE') {
      const year = value.substring(0, 4);
      const month = value.substring(4, 6);
      const day = value.substring(6, 8);
      return `${year}-${month}-${day}`;
    } else if (obj?.valueFormatDesc === 'BOOLEAN') {
      return value ? (value === 'Y' ? 'No' : 'Yes') : '-';
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

export const AccordianForMobileWithGroups: React.FC<GroupAccordianProps> = ({ title, openEditForm, oppType }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const { attributes } = state.opportuntyDetails;
  const [moreInformationGroups, setMoreInformationGroups] = React.useState<IAttributesList[]>([]);
  const [activeClass, setActiveClass] = React.useState('');
  const toggleAccordion = () => {
    setActiveClass(activeClass === '' ? 'active' : '');
  };

  // React.useEffect(() => {
  //   const groups = new Set(
  //     state.enviornmentConfigs.opportunityAttributes.map((obj: any) => {
  //       return obj.group;
  //     })
  //   );
  //   const response: IAttributesList[] = [];
  //   groups.forEach((group: string) => {
  //     const groupName = group.toLowerCase();
  //     const groupAttributes: IAttributesList = { group: groupName, items: [] };
  //     groupAttributes.items = state.enviornmentConfigs.opportunityAttributes.filter((obj) => obj.group.toLowerCase() === groupName);
  //     response.push(groupAttributes);
  //   });
  //   setMoreInformationGroups(response);
  // }, []);

  const setAllFields = (_opptyType: string) => {
    const groups = new Set(
      state.enviornmentConfigs.opportunityAttributes.map((obj: any) => {
        return obj.group;
      })
    );

    const recordType: OpportunityType | undefined = state.enviornmentConfigs.crmOpportunityTypes.find((obj: OpportunityType) => {
      return obj.oppRecordType === _opptyType;
    });

    const optionalFields = recordType && recordType.OPTIONAL_FIELDS ? recordType.OPTIONAL_FIELDS : [];
    const mandatoryFields = recordType && recordType.MANDATORY_FIELDS ? recordType.MANDATORY_FIELDS : [];
    const strArray = [...optionalFields, ...mandatoryFields];
    const tempAttributes: AttributeField[] = state.enviornmentConfigs.opportunityAttributes || [];

    if (strArray.length) {
      const response: IAttributesList[] = [];
      const filteredAttributes: AttributeField[] = tempAttributes.filter((obj: AttributeField) => {
        return includes(strArray, obj.attributeType);
      });

      groups.forEach((group: string) => {
        const items: AttributeField[] = filteredAttributes.filter((obj) => obj.group === group);
        if (items.length) {
          response.push({ group, items });
        }
      });

      setMoreInformationGroups(response);
    } else {
      const response: IAttributesList[] = [];
      groups.forEach((group: string) => {
        const groupAttributes: IAttributesList = { group, items: [] };
        groupAttributes.items = state.enviornmentConfigs.opportunityAttributes.filter((obj) => obj.group === group);
        response.push(groupAttributes);
      });
      setMoreInformationGroups(response);
    }
  };

  React.useEffect(() => {
    setAllFields(oppType);
  }, [oppType]);

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
                      <DisplayGroupMobile fields={obj.items} data={attributes} />
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
