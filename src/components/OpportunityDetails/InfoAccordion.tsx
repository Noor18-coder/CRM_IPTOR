import React from 'react'
import { Accordion, Card, Table, Image} from 'react-bootstrap'
import { OpportunityDetailsGroupItem , Product, OpportunityContact} from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import { useMediaQuery } from 'react-responsive'

interface Props {
  title: string,
  data: OpportunityDetailsGroupItem[] | Product[] | OpportunityContact[]
}

export const InfoAccordion: React.FC<Props> = ({ title, data }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Link} eventKey="1">
          {title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <div className="accr-body-container">
            {data.map((obj:any) => {
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

export const Accordian:React.FC<Props> = ({ title, data }) => {
  console.log('38', data);
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Link} eventKey="1">
          {title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          { title.toLowerCase() === 'contacts' ? <ContactCards data={data} /> : <ProductCards data={data} />}
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );

}

interface ContactProps {
  data:OpportunityContact[] | Product[] | OpportunityDetailsGroupItem[]
}

export const ContactCards:React.FC<React.PropsWithChildren<ContactProps>> = ({ data }) => {
    return (
        <div className="accr-body-container">
            {data.length ? 
                data.map((obj:any) => {
                return (
                    <Card className="accordian-card">
                        <Card.Body>
                            <div className="left-card">
                                <p><b>{obj.contactPerson}</b></p>
                                <p className="mb-2 text-muted">{obj.contactRole}</p><br />
                                <p>{obj.email}</p>
                                <p>{obj.phone}</p> <br />
                                <p>{obj.address}</p>
                            </div>
                            <div className="right-card">
                                <Image className="card-delete" height="20" src={ImageConfig.DELETE_ICON} alt="Iptor" title="Iptor" />    
                                <Image height="20" src={ImageConfig.EDIT_ICON} alt="Iptor" title="Iptor" />    
                            </div>
                        </Card.Body>
                        <Card.Footer className="text-muted"></Card.Footer>
                    </Card>
                );
                }) : <div className="padding-28"> No Contacts Found </div>}
      </div>    
  );
}

export const ProductCards:React.FC<ContactProps> = ({ data }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  console.log('38', data);
  return (
    <div className="accr-body-container">
      {data.length ? 
      data.map((obj:any) => {
        return (
          <>
           { (isMobile || isTablet) ?   
          <div className="mr-10">
        <div className="d-flex justify-content-between product-row">
            <div className="lft-col">
              Item ID
                  <span>
                  {obj.item}
              </span>
            </div>
            <div className="rgt-col">
            Item Name
                  <span className="danger">{obj.itemDescription}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between product-row">
            <div className="lft-col">
            Version
                  <span>
              </span>
            </div>
            <div className="rgt-col">
            Cost
                  <span className="danger"></span>
            </div>
          </div>
    
          <div className="d-flex justify-content-between product-row">
            <div className="lft-col">
            Revenue Type
                  <span>
              </span>
            </div>
            <div className="rgt-col">
            </div>
          </div>

          <div className="d-flex justify-content-between product-row">
            <div className=" d-flex justify-content-between product-row icon-class mr-6">
            <span className="icon"> <img   className="del-icon"  src={ImageConfig.DELETE_ICON} alt="delete" title="delete" />Delete</span>
            </div>
            <div className=" d-flex justify-content-between product-row icon-class">
            
          
            <span className="icon"> <img  className="del-icon" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" />Edit</span>
            </div>
          </div>
          </div> : 
          <Table borderless>
          <thead>
            <tr>
              <th>ITEM ID</th>
              <th>ITEM NAME</th>
              <th>VERSION</th>
              <th>COST</th>
              <th>REVENUE TYPE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="prod-class">{obj.item}</td>
              <td className="prod-class">{obj.itemDescription}</td>
              <td className="prod-class"></td>
              <td className="prod-class"></td>
              <td className="prod-class"></td>
              <td className="prod-revenue-class" >
              <div className="d-flex justify-content-between title-row">
              <div className="lft-col">
              <Image height="20" width="14" src={ImageConfig.DELETE_ICON} alt="delete" title="delete"/>  
             </div>
              <div className="rgt-col">
              <Image height="20" width="14" src={ImageConfig.EDIT_ICON} alt="edit" title="edit"/>
              </div>
              </div> 
              </td>
            </tr>
          </tbody>
        </Table>}
        </>
        );
      }): <div className="padding-28"> Not Found </div>}
    </div>
        
  );

}

