import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as models from '../../helpers/Api/models';
import { AppState } from '../../store/store';
import { saveCustReportParams } from '../../store/Reports/Actions';
import i18n from '../../i18n';

export const CustomerReport = (): JSX.Element => {
  const state: AppState = useSelector((custState: AppState) => custState);
  const industryDetails = state.enviornmentConfigs.crmIndustries;
  const productDetails = state.enviornmentConfigs.crmProductFamily;
  const AreaDetails = state.enviornmentConfigs.crmAreaInfo;
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <CardList title={`${i18n.t('region')}`} AreaListItems={AreaDetails} />
          <CardList title={`${i18n.t('productFamily')}`} ProductListItems={productDetails} />
          <CardList title={`${i18n.t('industry')}`} IndustryItems={industryDetails} />
        </div>
      </div>
    </>
  );
};
export interface Props {
  title: string;
  AreaListItems?: models.AreaListItem[];
  ProductListItems?: models.DropDownValue[];
  IndustryItems?: models.DropDownValue[];
}

export const CardList: React.FC<Props> = ({ title, AreaListItems, ProductListItems, IndustryItems }) => {
  const state: AppState = useSelector((opptState: AppState) => opptState);
  const [allAreaSelected, setAllAreaSelected] = React.useState<boolean>(true);
  const [allAreaBtnClass, setAllAreaBtnClass] = React.useState('active');
  const [allProductSelected, setAllProductSelected] = React.useState<boolean>(true);
  const [allProductBtnClass, setAllProductBtnClass] = React.useState('active');
  const [allIndustrySelected, setAllIndustrySelected] = React.useState<boolean>(true);
  const [allIndustryBtnClass, setAllIndustryBtnClass] = React.useState('active');
  const [activeClass, setActiveClass] = React.useState('active');
  const [isSingle, setIsSingle] = React.useState(false);
  const dispatch: Dispatch<any> = useDispatch();

  const AllItemsClicked = (clickedItem: string) => {
    if (clickedItem === 'allAreas') {
      const filters = state.reports.customerReportParams;
      setAllAreaBtnClass(allAreaSelected === false ? 'active' : '');
      setAllAreaSelected(!allAreaSelected);
      filters.area = [];
      dispatch(saveCustReportParams(filters));
    }

    if (clickedItem === 'allProduct') {
      const filters = state.reports.customerReportParams;
      setAllProductBtnClass(allProductSelected === false ? 'active' : '');
      setAllProductSelected(!allProductSelected);
      filters.productFamily = [];
      dispatch(saveCustReportParams(filters));
    }

    if (clickedItem === 'allIndustry') {
      const filters = state.reports.customerReportParams;
      setAllIndustryBtnClass(allIndustrySelected === false ? 'active' : '');
      setAllIndustrySelected(!allIndustrySelected);
      filters.industry = [];
      dispatch(saveCustReportParams(filters));
    }
  };

  React.useEffect(() => {
    setAllAreaBtnClass(allAreaSelected === true ? 'active' : '');
    setAllProductBtnClass(allProductSelected === true ? 'active' : '');
    setAllIndustryBtnClass(allIndustrySelected === true ? 'active' : '');
  }, [allAreaSelected, allProductSelected, allIndustrySelected]);

  React.useEffect(() => {
    if (allAreaBtnClass === 'active') {
      const list = Array.from(document.querySelectorAll('li.Area'));
      list.forEach((element) => {
        element.className = 'Area active';
      });
    }
    if (allAreaBtnClass === '' && !isSingle) {
      const list = Array.from(document.querySelectorAll('li.Area'));
      list.forEach((element) => {
        element.className = 'Area';
      });
    }
    setIsSingle(false);
  }, [allAreaBtnClass]);

  React.useEffect(() => {
    if (allProductBtnClass === 'active') {
      const list = Array.from(document.querySelectorAll('li.Product'));
      list.forEach((element) => {
        element.className = 'Product active';
      });
    }
    if (allProductBtnClass === '' && !isSingle) {
      const list = Array.from(document.querySelectorAll('li.Product'));
      list.forEach((element) => {
        element.className = 'Product';
      });
    }
    setIsSingle(false);
  }, [allProductBtnClass]);

  React.useEffect(() => {
    if (allIndustryBtnClass === 'active') {
      const list = Array.from(document.querySelectorAll('li.Industry'));
      list.forEach((element) => {
        element.className = 'Industry active';
      });
    }
    if (allIndustryBtnClass === '' && !isSingle) {
      const list = Array.from(document.querySelectorAll('li.Industry'));
      list.forEach((element) => {
        element.className = 'Industry';
      });
    }
    setIsSingle(false);
  }, [allIndustryBtnClass]);

  const ItemClicked = (value: string, e: any, key: string) => {
    const filters = state.reports.customerReportParams;
    if (key === 'Areas') {
      if (e.className === 'Area') {
        e.className = 'Area active';
      } else {
        e.className = 'Area';
        setIsSingle(true);
      }
    }

    if (key === 'productFamily') {
      if (e.className === 'Product') {
        e.className = 'Product active';
      } else {
        e.className = 'Product';
        setIsSingle(true);
      }
    }

    if (key === 'Industry') {
      if (e.className === 'Industry') {
        e.className = 'Industry active';
      } else {
        e.className = 'Industry';
        setIsSingle(true);
      }
    }

    if (title === 'Region' && AreaListItems) {
      setAllAreaSelected(false);
      if (allAreaSelected) {
        const Areas: string[] = AreaListItems.map((obj: models.AreaListItem) => {
          return obj.area;
        });

        const filteredAreas = Areas.filter((val: string) => {
          return val !== value;
        });
        filters.area = filteredAreas;
        dispatch(saveCustReportParams(filters));
      } else {
        const index = filters.area.indexOf(value);
        if (index === -1) {
          filters.area.push(value);
        } else {
          filters.area.splice(index, 1);
        }

        if (filters.area.length === AreaListItems.length) {
          setAllAreaSelected(true);
          setActiveClass('active');
          filters.area = [];
        }
        dispatch(saveCustReportParams(filters));
      }
    }

    if (title === 'Product Family' && ProductListItems) {
      setAllProductSelected(false);
      if (allProductSelected) {
        const Product: string[] = ProductListItems.map((obj: models.DropDownValue) => {
          return obj.valueField;
        });
        const filteredProduct = Product.filter((val: string) => {
          return val !== value;
        });
        filters.productFamily = filteredProduct;
        dispatch(saveCustReportParams(filters));
      } else {
        const index = filters.productFamily.indexOf(value);
        if (index === -1) {
          filters.productFamily.push(value);
        } else {
          filters.productFamily.splice(index, 1);
        }
        if (filters.productFamily.length === ProductListItems.length) {
          setAllProductSelected(true);
          setActiveClass('active');
          filters.productFamily = [];
        }
        dispatch(saveCustReportParams(filters));
      }
    }

    if (title === 'Industry' && IndustryItems) {
      setAllIndustrySelected(false);
      if (allIndustrySelected) {
        const Industry: string[] = IndustryItems.map((obj: models.DropDownValue) => {
          return obj.valueField;
        });
        const filteredIndustry = Industry.filter((val: string) => {
          return val !== value;
        });
        filters.industry = filteredIndustry;
        dispatch(saveCustReportParams(filters));
      } else {
        const index = filters.industry.indexOf(value);
        if (index === -1) {
          filters.industry.push(value);
        } else {
          filters.industry.splice(index, 1);
        }
        if (filters.industry.length === IndustryItems.length) {
          setAllIndustrySelected(true);
          setActiveClass('active');
          filters.industry = [];
        }
        dispatch(saveCustReportParams(filters));
      }
    }
  };
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="card mb-4">
        <div className="card-body">
          <div className="card-title">{title}</div>
          <div className="card-list-item-container">
            <ul className="report-list-items">
              {AreaListItems && (
                <li
                  onClick={() => AllItemsClicked('allAreas')}
                  role="presentation"
                  onKeyDown={() => AllItemsClicked('allAreas')}
                  className={allAreaBtnClass}>
                  {i18n.t('all')}
                </li>
              )}
              {AreaListItems
                ? AreaListItems &&
                  AreaListItems.map((obj: models.AreaListItem) => {
                    return (
                      <li
                        onClick={(e) => ItemClicked(obj.area, e.currentTarget, 'Areas')}
                        role="presentation"
                        onKeyDown={(e) => ItemClicked(obj.area, e.currentTarget, 'Areas')}
                        key={obj.description}
                        className={`Area ${activeClass}`}>
                        {obj.area} - {obj.description}
                      </li>
                    );
                  })
                : null}
              {ProductListItems && (
                <li role="presentation" className={allProductBtnClass} onClick={() => AllItemsClicked('allProduct')}>
                  {i18n.t('all')}
                </li>
              )}
              {ProductListItems
                ? ProductListItems.map((obj: models.DropDownValue) => {
                    return (
                      <li
                        onClick={(e) => ItemClicked(obj.valueField, e.currentTarget, 'productFamily')}
                        role="presentation"
                        onKeyDown={(e) => ItemClicked(obj.valueField, e.currentTarget, 'productFamily')}
                        key={obj.valueField}
                        className={`Product ${activeClass}`}>
                        {obj.valueField}
                      </li>
                    );
                  })
                : null}
              {IndustryItems && (
                <li role="presentation" className={allIndustryBtnClass} onClick={() => AllItemsClicked('allIndustry')}>
                  {i18n.t('all')}
                </li>
              )}
              {IndustryItems
                ? IndustryItems.map((obj: models.DropDownValue) => {
                    return (
                      <li
                        onClick={(e) => ItemClicked(obj.valueField, e.currentTarget, 'Industry')}
                        role="presentation"
                        onKeyDown={(e) => ItemClicked(obj.valueField, e.currentTarget, 'Industry')}
                        key={obj.valueField}
                        className={`Industry ${activeClass}`}>
                        {obj.valueField}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
