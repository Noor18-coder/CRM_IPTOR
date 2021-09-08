import React from 'react';
import { Card, Image, Table, Accordion } from 'react-bootstrap'
import { Product } from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import * as models from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import { useMediaQuery } from 'react-responsive'

export interface ContactProps {
    data: Product,
    openAddItemForm:(groupName:string,  data?: models.Product) => void
}

interface Props {
    title: string,
    data: Product[],
    openAddItemForm:(groupName:string,  data?: models.Product) => void
}

export const ProductAccordian: React.FC<Props> = ({ title, data, openAddItemForm }) => {
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
                    <Image className="addnew-red-icon" src={ImageConfig.ADD_BTN} alt="Add New" title="Add New" onClick={() => openAddItemForm('add_item')} /> 
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <div className="accr-body-container prod-modules-tbl mob-prod-modules-tbl">
                        {(isMobile || isTablet) ? data.length ?
                            data.map((obj: Product) => {
                                return <ProductCards data={obj}   openAddItemForm={openAddItemForm} />
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
                                            return <ProductCardsTable data={obj}  openAddItemForm={openAddItemForm} />
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

export const ProductCards: React.FC<ContactProps> = ({ data, openAddItemForm  }) => {
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
            <div className="mr-10 mob-prod-modules-card">
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
                <div className="d-flex justify-content-between product-row action-row">
                    <div className=" d-flex justify-content-between product-row icon-class mr-6" onClick={() => openAddItemForm('delete_item', data)}>
                        <span className="icon"> <img className="del-icon" src={ImageConfig.DELETE_ICON} alt="delete" title="delete" />Delete</span>
                    </div>
                    <div className=" d-flex justify-content-between product-row icon-class" onClick={() => openAddItemForm('edit_item', data)}>
                        <span className="icon"> <img className="del-icon" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" />Edit</span>
                    </div>
                </div>
            </div> 
        </>
    );
}

export const ProductCardsTable: React.FC<ContactProps> = ({ data, openAddItemForm }) => {
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
                <div className="d-flex justify-content-between title-row float-right">
                    <div className="lft-col" onClick={() => openAddItemForm('delete_item', data)}>
                            <Image src={ImageConfig.DEL_ICON} alt="delete" title="delete" />
                    </div>
                    <div className="rgt-col" onClick={() => openAddItemForm('edit_item', data)}>
                        <Image src={ImageConfig.EDIT_ICON} alt="edit" title="edit" />
                    </div>
                </div>
            </td>
        </tr>
        </>
    );
}



