import React from 'react';
import {Accordion, Card, Image}  from 'react-bootstrap';
import ImageConfig from '../../config/ImageConfig';
import {GroupSection} from '../CustomerDetails/Shared/GroupSection';
import { useMediaQuery } from 'react-responsive';
import { CustomerDetailsDefault, CustomerDetailsGroupItem } from  '../../helpers/Api/models';

export interface Data {
  data:CustomerDetailsDefault,
  ownerData:CustomerDetailsGroupItem[]
}

const CustomerCard:React.FC<Data> = (props) =>   {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  const OwnerObj = props.ownerData.find((obj) => obj.attributeType === 'OWNER_ID');
  const ownerName= OwnerObj?.attributeValue;
    return (
      <>
        <section className="sec-info-accordion">
          <Accordion  defaultActiveKey="0">
          <Card className="cust-details">
            <Accordion.Toggle as={Card.Link} eventKey="1">
            Contact Address
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="accr-body-container">  
                 <ul className="list-inline bdy-list-item">
                  <li className="list-inline-item"><span>Contact Address</span>{props.data.addressLine1},<p>{props.data.addressLine2}</p></li>
                  <li className="list-inline-item"><span>Region</span>{props.data.area}<p>&nbsp;</p></li>
                  <li className="list-inline-item"><span>Phone Number</span>&nbsp;<p>&nbsp;</p></li>
                  {/* <li className="list-inline-item">
                  <Image  src={ImageConfig.EDIT_ICON} alt="edit" title="edit" /></li> */}
                </ul></Card.Body>
            </Accordion.Collapse>
          </Card>
          </Accordion>
        </section>


      { (isMobile || isTablet) ? 
      <section className="customer-mobilecard">
      <div className="customer-details d-flex justify-content-between">
        <div className="lft-col">
            Account owner
           <span>
           {ownerName}
         </span>
        </div>
        

        <div className="right-data">
          <p><Image className="edit" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" /></p>
        </div>
      </div>
      <div className="customer-details d-flex justify-content-between">
        <div className="lft-col">
           <span>
           +46 93801093
         </span>
        </div>

        <div className="right-data">
          <p><Image  width="25" src={ImageConfig.PHONE} alt="phone" title="phone" /></p>
        </div>
      </div>

      <div className="customer-details d-flex justify-content-between">

        <div className="lft-col">
           <span>
           Tomcoudyzer@iptor.com
         </span>
        </div>

        <div className="right-data">
          <p><Image  width="25" src={ImageConfig.MAIL} alt="mail" title="mail" /></p>
        </div>
      </div>
      </section>:
           <section className="d-flex justify-content-between sec-customer-desc">
           <div className="accr-body-container">  
               <ul className="list-inline bdy-list-item">
               <li className="list-inline-item"><span>Account owner</span>{ownerName}</li>
               <li className="list-inline-item"><Image  width="25" src={ImageConfig.PHONE} alt="phone" title="phone" />&nbsp; &nbsp;+46 93801093</li>
               <li className="list-inline-item"><Image  width="25" src={ImageConfig.MAIL} alt="mail" title="mail" />&nbsp;&nbsp; tomcoudyzer@iptor.com</li>
               {/* <li className="list-inline-item">
               <Image className="edit" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" /></li> */}
             </ul></div>
       
       </section> }


      <section className="d-flex sec-customer-desc">
        <div className="cust-name">
          <p>Product family</p>
        </div>
        <div className="group-sec">
          <ul className="list-inline">
          <li className="list-inline-item"><span className="cust-info">DC1</span> </li>
          <li className="list-inline-item"><span className="cust-info">CRM</span></li>
          <li className="list-inline-item"><span className="cust-info">ERP</span></li>
          </ul>
        </div>
        
        {/* <div className="sec-status">
        <ul className="list-inline"><li className="list-inline-item">
        <Image src={ImageConfig.ADD_BTN} alt="Add" title="Add" /> 
        <Image className="del-icon" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" /></li></ul>
        </div> */}
      </section>

      <section className="sec-info-accordion">
          <Accordion  defaultActiveKey="0">
          <Card className="contact-class">
          <Accordion.Toggle as={Card.Link} eventKey="1">
            All Contact
            <span className="cust-info"><span>03 CONTACTS</span></span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
            <Card className="accordian-card">
            <Card.Body>
                <div className="left-card">
                <p><b>Manne C Petersson</b></p>
                <p>Associate - Sales</p>
                <p>mannecp@astrazeneca.com</p>
                <p>0435-592234</p>
                <p>Dadalvagen 33, KINSLINGE,</p>
                <p>289 00, Sweden </p>
                </div>
                <div className="right-card">  
                </div>
            </Card.Body>
            <Card.Footer className="text-muted">
            </Card.Footer>
           </Card>
            </Accordion.Collapse>
          </Card>
          </Accordion>
        </section>

        <GroupSection  groupName={"Opportinities"}/>

        <section className="d-flex sec-customer-desc">
        <div className="cust-name">
          <p>Subsidiary - Entity</p>
        </div>
        <div className="group-sec">
          <ul className="list-inline">
          <li className="list-inline-item"><span className="cust-info">Astra Zeneca Pharma - Sweden</span> </li>
          <li className="list-inline-item"><span className="cust-info">Astra Zeneca Pharma - Sweden</span></li>
          <li className="list-inline-item"><span className="cust-info">+ more</span></li>
          </ul>
        </div>
        
        {/* <div className="sec-status">
        <ul className="list-inline"><li className="list-inline-item">
        <Image src={ImageConfig.ADD_BTN} alt="Add" title="Add" /> 
        <Image className="del-icon" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" /></li></ul>
        </div> */}
      </section>
      
      </>
    )
}

export default CustomerCard
