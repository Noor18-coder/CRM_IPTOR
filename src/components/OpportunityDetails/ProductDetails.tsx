import React from 'react';
import { Card, Image, Table, Accordion } from 'react-bootstrap'
import { Product } from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import * as models from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import { useMediaQuery } from 'react-responsive'

export interface ContactProps {
    data: Product
}

interface Props {
    title: string,
    data: Product[]
}

export const ProductAccordian: React.FC<Props> = ({ title, data }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const [activeClass , setActiveClass] = React.useState("");
    const toggleAccordion = () => {
      setActiveClass(activeClass === "" ? "active" : "");
    }
    return (
        <Accordion defaultActiveKey="0">
            <Card className="add-details">
                <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
                    {title}
                    <Image src={ImageConfig.ADD_BTN} alt="Add" title="Add" /> 
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <div className="accr-body-container">
                        {(isMobile || isTablet) ? data.length ?
                            data.map((obj: Product) => {
                                return <ProductCards data={obj} />
                            }) : <div className="padding-28"> No Records Found </div>
                            : data.length ?
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
                                    {data.length &&
                                        data.map((obj: Product) => {
                                            return <ProductCardsTable data={obj} />
                                        })
                                    }
                                </tbody>
                            </Table>
                            : <div className="padding-28"> No Records Found </div>
                        }
                    </div>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );

}

export const ProductCards: React.FC<ContactProps> = ({ data }) => {
    const [productDetails, setProductDetails] = React.useState<models.OpportunityDetailsGroupItem[]>([]);
    React.useEffect(() => {
        OpportunityDetailsApi.getProductDetails(data.itemId).then((contactData) => {
            setProductDetails(contactData)
        });
    }, []);
    const costObj = productDetails.find((obj) => obj.attributeType === 'COST');
    data.cost = costObj?.attributeValue
    const revenueObj = productDetails.find((obj) => obj.attributeType === 'REVENUE_TYPE');
    data.revenue = revenueObj?.attributeValue
    const versionObj = productDetails.find((obj) => obj.attributeType === 'VERSION');
    data.version = versionObj?.attributeValue
    return (
        <>
            <div className="mr-10">
                <div className="d-flex justify-content-between product-row">
                    <div className="lft-col">
                        Item ID <span>{data.item}</span>
                    </div>
                    <div className="rgt-col">
                        Item Name <span className="danger">{data.itemDescription}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between product-row">
                    <div className="lft-col">
                        Version <span>{data.version}</span>
                    </div>
                    <div className="rgt-col">
                        Cost <span className="danger">{data.cost}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between product-row">
                    <div className="lft-col">
                        Revenue Type <span>{data.revenue}</span>
                    </div>
                    <div className="rgt-col">
                    </div>
                </div>
                <div className="d-flex justify-content-between product-row">
                    <div className=" d-flex justify-content-between product-row icon-class mr-6">
                        <span className="icon"> <img className="del-icon" src={ImageConfig.DELETE_ICON} alt="delete" title="delete" />Delete</span>
                    </div>
                    <div className=" d-flex justify-content-between product-row icon-class">
                        <span className="icon"> <img className="del-icon" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" />Edit</span>
                    </div>
                </div>
            </div> 
        </>
    );
}

export const ProductCardsTable: React.FC<ContactProps> = ({ data }) => {
    const [productDetails, setProductDetails] = React.useState<models.OpportunityDetailsGroupItem[]>([]);
    React.useEffect(() => {
        OpportunityDetailsApi.getProductDetails(data.itemId).then((contactData) => {
            setProductDetails(contactData)
        });
    }, []);
    const costObj = productDetails.find((obj) => obj.attributeType === 'COST');
    data.cost = costObj?.attributeValue
    const revenueObj = productDetails.find((obj) => obj.attributeType === 'REVENUE_TYPE');
    data.revenue = revenueObj?.attributeValue
    const versionObj = productDetails.find((obj) => obj.attributeType === 'VERSION');
    data.version = versionObj?.attributeValue
    return (
        <>
        <tr>
            <td className="prod-class">{data.item}</td>
            <td className="prod-class">{data.itemDescription}</td>
            <td className="prod-class">{data.version}</td>
            <td className="prod-class">{data.cost}</td>
            <td className="prod-class">{data.revenue}</td>
            <td className="prod-revenue-class" >
                <div className="d-flex justify-content-between title-row">
                    <div className="lft-col">
                            <Image height="20" width="14" src={ImageConfig.DEL_ICON} alt="delete" title="delete" />
                    </div>
                    <div className="rgt-col">
                        <Image height="20" width="14" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" />
                    </div>
                </div>
            </td>
        </tr>
        </>
    );
}



