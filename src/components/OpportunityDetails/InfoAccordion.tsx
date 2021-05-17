import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { OpportunityDetailsGroupItem } from '../../helpers/Api/models';

interface Props {
  title: string,
  data: OpportunityDetailsGroupItem[]
}

const InfoAccordion: React.FC<Props> = ({ title, data }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Link} eventKey="1">
          {title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body className="accr-body-container">
            <ul className="list-inline bdy-list-item">
              {
                data.map((obj) => {
                  return <li className="list-inline-item"><span>{obj.description}</span>{obj.attributeValue ? obj.attributeValue : 'NA'}</li>
                })
              }
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );

}

export default InfoAccordion
