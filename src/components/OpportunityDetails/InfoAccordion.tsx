import React from 'react'
import { Accordion, Card} from 'react-bootstrap'
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
          <div className="accr-body-container">
            {data.map((obj) => {
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

export default InfoAccordion
