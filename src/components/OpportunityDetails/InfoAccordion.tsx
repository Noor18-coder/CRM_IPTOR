import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";
import ImageConfig from '../../config/ImageConfig';


import { OpportunityDetailsGroupItem, OpportunityDetailsBasicInfo, OpportunityMoreInfoSection, AttributeField, IAttributesList, AttributeValueObject } from '../../helpers/Api/models';

interface Props {
  title: string,
  data: OpportunityDetailsBasicInfo[],
  openEditOpportunity: () => void
}

export const InfoAccordion: React.FC<Props> = ({ title, data, openEditOpportunity }) => {
  const [activeClass , setActiveClass] = React.useState("");
  const toggleAccordion = () => {
    setActiveClass(activeClass === "" ? "active" : "");
  }
  return (
    <Accordion defaultActiveKey="0">
    <Card>
      <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
        {title}
        <img src={ImageConfig.EDIT_ICON}  onClick={openEditOpportunity} />
      
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="1">
        <div className="accr-body-container">
         {data.map((obj: OpportunityDetailsBasicInfo) => {
            return (
              <ul className="list-inline bdy-list-item">
                <li className="list-inline-item">
                  <span>{obj.description}</span>
                  {obj.attributeValue ? obj.attributeValue : "NA"}
                </li>
              </ul>
            );
          })}
        </div>
      </Accordion.Collapse>
    </Card>
  </Accordion>
  );
}


interface GroupAccordianProps {
  title: string,
  data: AttributeValueObject[],
  openEditForm: (groupName:string) => void
}


export const InfoAccordionGroups: React.FC<GroupAccordianProps> = ({ title, data , openEditForm }) => {
  const state: AppState = useSelector((state: AppState) => state);
  const [moreInformationGroups, setMoreInformationGroups] = React.useState<IAttributesList[]>();
  const [activeClass , setActiveClass] = React.useState("");
  const toggleAccordion = () => {
    setActiveClass(activeClass === "" ? "active" : "");
  }

  React.useEffect(() => {
    const groups = new Set(state.enviornmentConfigs.opportunityAttributes.map((obj:any) => {return obj.group}));
    let response:IAttributesList[] = [];
    groups.forEach((group: string) => {
        const groupName = group.toLowerCase();
        const groupAttributes:IAttributesList = { group: groupName, items:[]}
        groupAttributes.items = state.enviornmentConfigs.opportunityAttributes.filter((obj) => obj.group.toLowerCase() === groupName);
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
            { moreInformationGroups?.length ? (
              moreInformationGroups.map((key:IAttributesList) => {
                return <DisplayGroup title={key.group} fields={key.items} data={data} openEditForm={openEditForm}/>
              })) : null }
            
          </>
         
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

interface GroupData {
  title: string,
  fields: AttributeField[],
  data:AttributeValueObject[],
  openEditForm: (key:string) => void
}


export const DisplayGroup: React.FC<GroupData> = ({ title, fields ,data, openEditForm }) => {

  const getValue = (attributeType:string) => {
     const obj = data.find((obj:AttributeValueObject) => {return obj.attributeType === attributeType});
     const value = obj && obj.attributeValue ? obj.attributeValue : '--';
     return value;
  }

   return (

    <div className='more-info-group-container'>
      <div className='more-info-group-name'>
        {title}
        <img src={ImageConfig.EDIT_ICON}  onClick={() => openEditForm(title)}/>
      
      </div>
      <div className="accr-body-container">

       
        {fields.map((obj:AttributeField) => {
          return (
            <ul className="list-inline bdy-list-item">
              <li className="list-inline-item">
                <span>{obj.description}</span>
                {getValue(obj.attributeType)} 
              </li>
            </ul>
          )
        }) }
        
      </div>
    </div>

  )
}