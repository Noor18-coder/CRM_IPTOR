import React from 'react';
import { Card, Accordion } from 'react-bootstrap';
import { OpportunityMoreInfoSection, OpportunityDetailsBasicInfo } from '../../helpers/Api/models';

interface Props {
    title: string,
    data: OpportunityDetailsBasicInfo[]
}

export const MoreInfoAccordian: React.FC<OpportunityMoreInfoSection> = ({ title, data }) => {
    const keys = Object.keys(data);
    const [activeClass, setActiveClass] = React.useState("");
    const toggleAccordion = () => {
        setActiveClass(activeClass === "" ? "active" : "");
    }
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
                    {title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <>
                        {
                            keys.map((key: string) => {
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
                {obj.attributeValue ? obj.attributeValue : "--"}
              </li>
            </ul>
          )
        })
        }
      </div>
    </div>
  )
}


