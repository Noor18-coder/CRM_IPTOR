import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { OpportunityDetailsGroupItem, OpportunityDetailsBasicInfo, OpportunityMoreInfoSection } from '../../helpers/Api/models';
import {BasicsAccordion} from "../Shared/CustomAccordion/BasicsAccordion";

interface Props {
  title: string,
  data: OpportunityDetailsBasicInfo[]
}

export const InfoAccordion: React.FC<Props> = ({ title, data }) => {
  return (
      <BasicsAccordion title={"Basics"} data={data}/>
  );
}

export const InfoAccordionGroups: React.FC<OpportunityMoreInfoSection> = ({ title, data }) => {
  const keys = Object.keys(data);

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Link} eventKey="1">
          {title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
            <>
            {
              keys.map((key:string) => {
                return <DisplayGroup title={key} data={data[key]} />
              })
            }
          </>
         
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}




export const DisplayGroup: React.FC<Props> = ({ title, data }) => {
  return (

    <div className='more-info-group-container'>
      <div className='more-info-group-name'>
        {title}
      </div>
      <div className="accr-body-container">
        {data.map((obj:any) => {
          return (
            <ul className="list-inline bdy-list-item">
              <li className="list-inline-item">
                <span>{obj.description}</span>
                {obj.attributeValue ? obj.attributeValue : "NA"}
              </li>
            </ul>
          )
        })
        }
      </div>
    </div>

  )
}