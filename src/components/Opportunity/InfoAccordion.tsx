import React from 'react'
import {Accordion, Card}  from 'react-bootstrap'

const InfoAccordion = () => {
    return (
        // <!-- INFO ACCORDION MAIN SECTION START -->
        
        <section className="sec-info-accordion">
        {/*    <!-- ACCORDION START --> */}
          <Accordion  defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Link} eventKey="1">
            Basic Info
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="accr-body-container">  
                 <ul className="list-inline bdy-list-item">
                  <li className="list-inline-item"><span>Opp owner</span>Marek Kandybo</li>
                  <li className="list-inline-item"><span>Opp Type</span>License</li>
                  <li className="list-inline-item"><span>Opp Number</span>076123</li>
                  <li className="list-inline-item"><span>Region</span>north america</li>
                  <li className="list-inline-item"><span>RLF Year 1</span>-</li>
                  <li className="list-inline-item"><span>M&amp; Year 1</span>-</li>
                  <li className="list-inline-item"><span>PS Value</span>-</li>
                </ul></Card.Body>
            </Accordion.Collapse>
          </Card>
          </Accordion>

          <Accordion  defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Link} eventKey="1">
            Item Info
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="accr-body-container">   
                <ul className="list-inline bdy-list-item">
                  <li className="list-inline-item"><span>Opp owner</span>Marek Kandybo</li>
                  <li className="list-inline-item"><span>Opp Type</span>License</li>
                  <li className="list-inline-item"><span>Opp Number</span>076123</li>
                  <li className="list-inline-item"><span>Region</span>north america</li>
                  <li className="list-inline-item"><span>RLF Year 1</span>-</li>
                  <li className="list-inline-item"><span>M&amp; Year 1</span>-</li>
                  <li className="list-inline-item"><span>PS Value</span>-</li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          </Accordion>


          <Accordion  defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Link} eventKey="1">
            More Info
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="accr-body-container">   
              <ul className="list-inline bdy-list-item">
                  <li className="list-inline-item"><span>Opp owner</span>Marek Kandybo</li>
                  <li className="list-inline-item"><span>Opp Type</span>License</li>
                  <li className="list-inline-item"><span>Opp Number</span>076123</li>
                  <li className="list-inline-item"><span>Region</span>north america</li>
                  <li className="list-inline-item"><span>RLF Year 1</span>-</li>
                  <li className="list-inline-item"><span>M&amp; Year 1</span>-</li>
                  <li className="list-inline-item"><span>PS Value</span>-</li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          </Accordion>

          <Accordion  defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Link} eventKey="1">
            Contact Info
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="accr-body-container">   
              <ul className="list-inline bdy-list-item">
                  <li className="list-inline-item"><span>Opp owner</span>Marek Kandybo</li>
                  <li className="list-inline-item"><span>Opp Type</span>License</li>
                  <li className="list-inline-item"><span>Opp Number</span>076123</li>
                  <li className="list-inline-item"><span>Region</span>north america</li>
                  <li className="list-inline-item"><span>RLF Year 1</span>-</li>
                  <li className="list-inline-item"><span>M&amp; Year 1</span>-</li>
                  <li className="list-inline-item"><span>PS Value</span>-</li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          </Accordion>
          
         {/* <!-- ACCORDION END --> */}
        </section>
        // <!-- INFO ACCORDION MAIN SECTION END -->
    )
}

export default InfoAccordion
