import React from 'react'
import {Accordion, Card}  from 'react-bootstrap'
import { OpportunityDetailsMock, DetailsData, getInfo} from '../../mocks/OpportunityDetails.mock';

const InfoAccordion = () => {
  // const islogExist= rowData[0].logExist;
  const Info = getInfo()

    return (
        // <!-- INFO ACCORDION MAIN SECTION START -->
        
        <section className="sec-info-accordion">
        {/*    <!-- ACCORDION START --> */}
        {Info.map((obj) => {
           return (
        <Accordion  defaultActiveKey="0">
    
            <Card>
              <Accordion.Toggle as={Card.Link} eventKey="1">
              {obj.Infotype}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body className="accr-body-container">   
                <ul className="list-inline bdy-list-item">
                    <li className="list-inline-item"><span>Opp owner</span>{obj.owner}</li>
                    <li className="list-inline-item"><span>Opp Type</span>{obj.type}</li>
                    <li className="list-inline-item"><span>Opp Number</span>{obj.number}</li>
                    <li className="list-inline-item"><span>Region</span>{obj.Region}</li>
                    <li className="list-inline-item"><span>RLF Year 1</span> {obj.RLFYear}</li>
                    <li className="list-inline-item"><span>M&amp; Year 1</span>{obj.MYear}</li>
                    <li className="list-inline-item"><span>PS Value</span>{obj.PsValue}</li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
              
            </Accordion>
            );
          })}
          
         {/* <!-- ACCORDION END --> */}
        </section>
        // <!-- INFO ACCORDION MAIN SECTION END -->
    )
}

export default InfoAccordion
