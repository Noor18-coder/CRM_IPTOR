import React from 'react';
import {Accordion, Card, Image}  from 'react-bootstrap';
import ImageConfig from '../../config/ImageConfig';
import { AllContactsAccordian } from './AllContactDetails'
import { useMediaQuery } from 'react-responsive';
import * as models from '../../helpers/Api/models';
import { CustomerDetailsDefault, CustomerDetailsGroupItem, CustomerDetailsContactsGroupItem } from  '../../helpers/Api/models';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';

export interface Data {
  data:CustomerDetailsDefault,
  ownerData:CustomerDetailsGroupItem[],
  contactsData:CustomerDetailsContactsGroupItem[]
}

const CustomerCard:React.FC<Data> = (props) =>   {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  const OwnerObj = props.ownerData.find((obj) => obj.attributeType === 'OWNER_ID');
  const ownerName= OwnerObj?.attributeValue;
  const [subsidiaryEntities, setsubsidiaryEntities] = React.useState<models.CustomerDetailsDefault[]>([]);

  React.useEffect(() => {
    Promise.all(props.data.subsidiaryEntities.map((id: any) => {
      return CustomerDetailsApi.get(id);
    })).then((entityData) => {
      setsubsidiaryEntities(entityData);
      return entityData;
    });

  },[]);
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
                  <li className="list-inline-item"><span>Phone Number</span>{props.data.phone? props.data.phone : '--'}<p>&nbsp;</p></li>
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
           {/* +46 93801093 */}--
         </span>
        </div>

        <div className="right-data">
          <p><Image  width="25" src={ImageConfig.PHONE} alt="phone" title="phone" /></p>
        </div>
      </div>

      <div className="customer-details d-flex justify-content-between">

        <div className="lft-col">
           <span>
           {/* Tomcoudyzer@iptor.com */}--
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
               <li className="list-inline-item"><Image  width="25" src={ImageConfig.PHONE} alt="phone" title="phone" />--</li>
               <li className="list-inline-item"><Image  width="25" src={ImageConfig.MAIL} alt="mail" title="mail" />--</li>
               {/* <li className="list-inline-item">
               <Image className="edit" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" /></li> */}
             </ul></div>
       
       </section> }


       <section className="d-flex sec-customer-desc">
        <div className="cust-name">
          <p>Product Family</p>
        </div>
        {props.data.APP_FROM_IPTOR?
        props.data.APP_FROM_IPTOR.map((name: any) => {
        return ( <div className="group-sec">
          <ul className="list-inline">
          <li className="list-inline-item"><span className="cust-info">{name}</span> </li>
          </ul>
        </div>)
          }):null}
 
        {/* <div className="sec-status">
        <ul className="list-inline"><li className="list-inline-item">
        <Image src={ImageConfig.ADD_BTN} alt="Add" title="Add" /> 
        <Image className="del-icon" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" /></li></ul>
        </div> */}
      </section>

      <section className="sec-info-accordion">
      <AllContactsAccordian title={' All Contact'} contactData={props.contactsData} />
        </section>

        <section className="d-flex sec-customer-desc">
        <div className="cust-name">
          <p>Opportinities</p>
        </div>
        <div className="group-sec">
          <ul className="list-inline">
          <li className="list-inline-item"><span className="cust-info">{props.data.numberOfActiveOpportunities ? props.data.numberOfActiveOpportunities :0} ACTIVE</span> </li>
          <li className="list-inline-item"><span className="cust-info">{props.data.numberOfInactiveOpportunities? props.data.numberOfInactiveOpportunities :0} CLOSED</span></li>
          <li className="list-inline-item"><span className="cust-info">{props.data.numberOfActiveOpportunities ? props.data.numberOfActiveOpportunities :0 + props.data.numberOfInactiveOpportunities? props.data.numberOfInactiveOpportunities :0} TOTAL</span></li>
          </ul>
        </div>
      </section>

        <section className="d-flex sec-customer-desc">
        <div className="cust-name">
          <p>Subsidiary - Entity</p>
        </div>
        {subsidiaryEntities? subsidiaryEntities.map((data: CustomerDetailsDefault) => {
        return (<div className="group-sec">
          <ul className="list-inline">
          <li className="list-inline-item"><span className="cust-info">{data.name +' - ' +data.area}</span> </li>
          </ul>
        </div>)
          }):null}
    
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
