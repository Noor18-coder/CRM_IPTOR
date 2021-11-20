import React from 'react';
import { Card, Image, Table, Accordion } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../../i18n';
import { AttributeValueObject, Product } from '../../helpers/Api/models';
import * as models from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import { AppState } from '../../store/store';
import { getDateInFormat } from '../../helpers/utilities/lib';
import {
  getOpportunityProducts,
  getProductInformation,
  openOpportunityForm,
  deleteOpportunityProducts,
} from '../../store/OpportunityDetails/Actions';

export interface ContactProps {
  data: models.Product;
  opportunityId: string;
}

interface Props {
  opportunityId: string;
}

export const ProductAccordian: React.FC<Props> = ({ opportunityId }) => {
  const isMobile = useMediaQuery({ maxWidth: 767.98 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  const [activeClass, setActiveClass] = React.useState('');
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const { products } = state.opportuntyDetails;
  const toggleAccordion = () => {
    setActiveClass(activeClass === '' ? 'active' : '');
  };
  const openAddItemForm = (str: string) => {
    document.body.classList.add('body-scroll-hidden');
    dispatch(openOpportunityForm({ open: true, groupName: str, action: 'edit' }));
  };

  React.useEffect(() => {
    dispatch(getOpportunityProducts(opportunityId));
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      <Card className="add-details">
        <Accordion.Toggle className={activeClass} onClick={toggleAccordion} as={Card.Link} eventKey="1">
          {i18n.t('productSectionTitle')}
          {state.opportuntyDetails.editOportunity.allowEdit ? (
            <Image className="addnew-red-icon" src={ImageConfig.ADD_BTN} alt="Add New" title="Add New" onClick={() => openAddItemForm('add_item')} />
          ) : null}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <div className="accr-body-container prod-modules-tbl mob-prod-modules-tbl">
            {(() => {
              if (products.length) {
                if (isMobile || isTablet) {
                  return products.map((obj: Product) => {
                    return <ProductCards data={obj} opportunityId={opportunityId} />;
                  });
                } else {
                  return (
                    <Table borderless>
                      <thead>
                        <tr>
                          <th>{i18n.t('itemId')}</th>
                          <th>{i18n.t('itemName')}</th>
                          {state.enviornmentConfigs.productAttributes.slice(0, 5).map((obj: models.AttributeField) => {
                            return <th>{obj.description}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {state.opportuntyDetails.products.length &&
                          state.opportuntyDetails.products.map((obj: Product) => {
                            return <ProductCardsTable data={obj} opportunityId={opportunityId} />;
                          })}
                      </tbody>
                    </Table>
                  );
                }
              } else {
                return <div className="no-prod-data-txt"> No Records Found </div>;
              }
            })()}
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export const ProductCards: React.FC<ContactProps> = ({ data, opportunityId }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  React.useEffect(() => {
    dispatch(getProductInformation(data.itemId));
  }, []);

  const dispatch: Dispatch<any> = useDispatch();

  const openAddItemForm = (action: string) => {
    if (action === 'delete_item') {
      dispatch(deleteOpportunityProducts(opportunityId, data));
    } else {
      document.body.classList.add('body-scroll-hidden');
      dispatch(openOpportunityForm({ open: true, groupName: action, data, action: 'edit' }));
    }
  };

  const getValue = (obj: models.AttributeField) => {
    const attributes: models.AttributeValueObject[] | undefined =
      data &&
      data.attributes &&
      data.attributes.filter((dataAttributeValue: AttributeValueObject) => {
        return obj.attributeType === dataAttributeValue.attributeType;
      });

    let result = '';

    if (!attributes) {
      return result;
    }

    attributes.forEach((attribute: models.AttributeValueObject) => {
      const value = attribute && attribute.attributeValue ? attribute.attributeValue : '--';
      if (obj?.valueFormatDesc === 'DATE') {
        const year = value.substring(0, 4);
        const month = value.substring(4, 6);
        const day = value.substring(6, 8);
        result += `${year}-${month}-${day}, `;
        const tempDate = `${year}-${month}-${day}`;
        result += `${getDateInFormat(new Date(tempDate))}, `;
      } else if (obj?.valueFormatDesc === 'BOOLEAN') {
        result += `${value ? (value === 'Y' ? 'Yes' : 'No') : '--'}, `;
      } else {
        result += `${value}, `;
      }
    });
    result = result.slice(0, -2);
    if (result === '') {
      return '--';
    } else {
      return result;
    }
  };

  return (
    <>
      <div className="mr-10 mob-prod-modules-card">
        <div className="d-flex justify-content-between product-row">
          <div className="lft-col">
            {i18n.t('itemId')} <span>{data.item}</span>
          </div>
          <div className="rgt-col">
            {i18n.t('itemName')} <span className="danger">{data.itemDescription}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between product-row prod-mod-collection">
          {state.enviornmentConfigs.productAttributes.slice(0, 5).map((obj: models.AttributeField, index: number) => {
            if (index % 2 === 0) {
              return (
                <div className="lft-col">
                  {obj.description} <div className="values">{getValue(obj)}</div>
                </div>
              );
            } else {
              return (
                <div className="rgt-col">
                  {obj.description} <div className="values">{getValue(obj)}</div>
                </div>
              );
            }
          })}
        </div>

        <div className="d-flex justify-content-between product-row action-row">
          <button
            type="button"
            className=" d-flex justify-content-between product-row icon-class mr-6"
            onClick={() => openAddItemForm('delete_item')}>
            <span className="icon">
              <Image className="del-icon" src={ImageConfig.DELETE_ICON} alt="edit" title="edit" />
              Delete
            </span>
          </button>
          <button type="button" className=" d-flex justify-content-between product-row icon-class" onClick={() => openAddItemForm('edit_item')}>
            <span className="icon">
              <Image className="del-icon" src={ImageConfig.EDIT_ICON} alt="edit" title="edit" />
              Edit
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export const ProductCardsTable: React.FC<ContactProps> = ({ opportunityId, data }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  // const data: models.Product | undefined = state.opportuntyDetails.products.find((obj: models.Product) => obj.itemId === itemId);
  const dispatch: Dispatch<any> = useDispatch();
  const openAddItemForm = (action: string) => {
    if (action === 'delete_item') {
      dispatch(deleteOpportunityProducts(opportunityId, data));
    } else {
      document.body.classList.add('body-scroll-hidden');
      dispatch(openOpportunityForm({ open: true, groupName: action, data, action: 'edit' }));
    }
  };

  const getValue = (obj: models.AttributeField) => {
    const attributes: models.AttributeValueObject[] | undefined =
      data &&
      data.attributes &&
      data.attributes.filter((dataAttributeValue: AttributeValueObject) => {
        return obj.attributeType === dataAttributeValue.attributeType;
      });

    let result = '';

    if (!attributes) {
      return result;
    }

    attributes.forEach((attribute: models.AttributeValueObject) => {
      const value = attribute && attribute.attributeValue ? attribute.attributeValue : '';
      if (obj?.valueFormatDesc === 'DATE') {
        if (value !== '0') {
          const year = value.substring(0, 4);
          const month = value.substring(4, 6);
          const day = value.substring(6, 8);
          const tempDate = `${year}-${month}-${day}`;
          result += `${getDateInFormat(new Date(tempDate))}, `;
        } else {
          result = '--';
        }
      } else if (obj?.valueFormatDesc === 'BOOLEAN') {
        result += `${value ? (value === 'Y' ? 'Yes' : 'No') : '--'}, `;
      } else {
        result += `${value}, `;
      }
    });
    result = result.slice(0, -2);
    if (result === '') {
      return '--';
    } else {
      return result;
    }
  };

  return (
    <>
      {data ? (
        <tr>
          <td className="prod-class">{data.item}</td>
          <td className="prod-class">{data.itemDescription}</td>
          {state.opportuntyDetails.products
            ? state.enviornmentConfigs.productAttributes.slice(0, 5).map((obj: models.AttributeField) => {
                return <td className="prod-class">{getValue(obj)}</td>;
              })
            : null}
          <td className="prod-revenue-class">
            {state.opportuntyDetails.editOportunity.allowEdit ? (
              <div className="d-flex justify-content-between title-row float-right">
                <button type="button" className="lft-col" onClick={() => openAddItemForm('delete_item')}>
                  <Image src={ImageConfig.CLOSE_BTN} alt="delete" title="delete" />
                </button>
                <button type="button" className="rgt-col" onClick={() => openAddItemForm('edit_item')}>
                  <Image src={ImageConfig.EDIT_ICON} alt="edit" title="edit" />
                </button>
              </div>
            ) : null}
          </td>
        </tr>
      ) : null}
    </>
  );
};
