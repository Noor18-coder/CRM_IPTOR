import React from "react";
import * as models from "../../helpers/Api/models";
import { AreaListItem } from "../../helpers/Api/models/Customer";
import { DropDownValue } from "../../helpers/Api/models/OpportunityAttributes";
import { AppState } from "../../store/store";
import { useSelector } from "react-redux";

export const CustomerReport = () => {
  const state: AppState = useSelector((state: AppState) => state);
  const industryDetails = state.enviornmentConfigs.crmIndustries;
  const productDetails = state.enviornmentConfigs.crmProductFamily;
  const AreaDetails = state.enviornmentConfigs.crmAreaInfo;
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <CardList title="Region" AreaListItems={AreaDetails} />
          <CardList title="Product Family" ProductListItems={productDetails} />
          <CardList title="Industry" IndustryItems={industryDetails} />
        </div>
      </div>
    </>
  );
};
export interface Props {
  title: string;
  AreaListItems?: AreaListItem[];
  ProductListItems?: DropDownValue[];
  IndustryItems?: DropDownValue[];
}

export const CardList: React.FC<Props> = ({
  title,
  AreaListItems,
  ProductListItems,
  IndustryItems,
}) => {
  const [activeClass, setActiveClass] = React.useState("");
  const ItemClicked = () => {
    setActiveClass(activeClass === "" ? "active" : "");
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
                  onClick={() => ItemClicked()}
                  className={"all " + activeClass}
                >
                  All
                </li>
              )}
              {AreaListItems
                ? AreaListItems &&
                  AreaListItems.map((obj: models.AreaListItem) => {
                    return (
                      <li key={obj.area} className={activeClass}>
                        {obj.description}
                      </li>
                    );
                  })
                : null}
              {ProductListItems && (
                <li
                  onClick={() => ItemClicked()}
                  className={"all " + activeClass}
                >
                  All
                </li>
              )}
              {ProductListItems
                ? ProductListItems.map((obj: models.DropDownValue) => {
                    return (
                      <li key={obj.valueField} className={activeClass}>
                        {obj.valueField}
                      </li>
                    );
                  })
                : null}
              {IndustryItems && (
                <li
                  onClick={() => ItemClicked()}
                  className={"all " + activeClass}
                >
                  All
                </li>
              )}
              {IndustryItems
                ? IndustryItems.map((obj: models.DropDownValue) => {
                    return (
                      <li key={obj.valueField} className={activeClass}>
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