import React from 'react';
import { Card, Image, Table, Accordion } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../../i18n';
import { Product } from '../../helpers/Api/models';
import OpportunityDetailsApi from '../../helpers/Api/OpportunityDetailsApi';
import * as models from '../../helpers/Api/models';
import ImageConfig from '../../config/ImageConfig';
import { AppState } from '../../store/store';
import {
  getOpportunityProducts,
  getProductInformation,
  setOpportunityDetailsLoader,
  removeOpportunityDetailsLoader,
  openOpportunityForm,
} from '../../store/OpportunityDetails/Actions';

export interface ContactProps {
  data: models.Product;
  opportunityId: string;
}

interface Props {
  opportunityId: string;
}

export const ProductAccordian: React.FC<Props> = ({ opportunityId }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
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
                          <th>ITEM ID</th>
                          <th>ITEM NAME</th>
                          <th>VERSION</th>
                          <th>COST</th>
                          <th>REVENUE TYPE</th>
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
  // const state: AppState = useSelector((appState: AppState) => appState);
  React.useEffect(() => {
    dispatch(getProductInformation(data.itemId));
  }, []);

  const dispatch: Dispatch<any> = useDispatch();

  const openAddItemForm = (action: string) => {
    if (action === 'delete_item') {
      const params: models.DeleteOpportunityItemParams = {
        parentId: opportunityId,
        itemId: data && data.itemId ? data.itemId : '',
      };
      dispatch(setOpportunityDetailsLoader());
      OpportunityDetailsApi.deleteItem(params).then(() => {
        dispatch(removeOpportunityDetailsLoader());
        dispatch(getOpportunityProducts(opportunityId));
      });
    } else {
      document.body.classList.add('body-scroll-hidden');
      dispatch(openOpportunityForm({ open: true, groupName: action, data, action: 'edit' }));
    }
  };
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
            Version <span>{data.version ? data.version : '--'}</span>
          </div>
          <div className="rgt-col">
            Cost <span className="danger">{data.cost ? data.cost : '--'}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between product-row">
          <div className="lft-col">
            Revenue Type <span>{data.revenue ? data.revenue : '--'}</span>
          </div>
          <div className="rgt-col" />
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
  React.useEffect(() => {
    dispatch(getProductInformation(data.itemId));
  }, []);

  const openAddItemForm = (action: string) => {
    if (action === 'delete_item') {
      const params: models.DeleteOpportunityItemParams = {
        parentId: opportunityId,
        itemId: data && data.itemId ? data.itemId : '',
      };
      dispatch(setOpportunityDetailsLoader());
      OpportunityDetailsApi.deleteItem(params).then(() => {
        dispatch(removeOpportunityDetailsLoader());
        dispatch(getOpportunityProducts(opportunityId));
      });
    } else {
      document.body.classList.add('body-scroll-hidden');
      dispatch(openOpportunityForm({ open: true, groupName: action, data, action: 'edit' }));
    }
  };

  return (
    <>
      {data ? (
        <tr>
          <td className="prod-class">{data.item}</td>
          <td className="prod-class">{data.itemDescription}</td>
          <td className="prod-class">{data.version}</td>
          <td className="prod-class">{data.cost}</td>
          <td className="prod-class">{data.revenue}</td>
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
