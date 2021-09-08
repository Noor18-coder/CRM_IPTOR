import React from "react";
import { AppState } from "../../store/store";
import { useSelector } from "react-redux";
import * as models from "../../helpers/Api/models";
import { StageInfo } from "../../helpers/Api/models/StageInfo";
import { OpportunityType } from "../../helpers/Api/models";
import { ForeCastInfo } from "../../helpers/Api/models/ForeCastInfo";
import { getCurrPrevNextYearQuarters } from '../../helpers/utilities/lib';

export const OpportunityReport = () => {
  const state: AppState = useSelector((state: AppState) => state);
  const StageInfoDetails = state.enviornmentConfigs.crmOpportunityStage;
  const OpportunityTypeDetails = state.enviornmentConfigs.crmOpportunityTypes;
  const foreCastDetails = state.enviornmentConfigs.forecastInfo;

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <CardList title="Stages" StageInfoItems={StageInfoDetails} />
          <CardList
            title="Type"
            OpportunityTypeItems={OpportunityTypeDetails}
          />
          <CardList title="Forecast" ForeCastItems={foreCastDetails} />
          <CardList
            title="Quarter"
            QuarterItems={getCurrPrevNextYearQuarters()}
          />
        </div>
      </div>
    </>
  );
};
export interface Props {
  title: string;
  StageInfoItems?: StageInfo[];
  OpportunityTypeItems?: OpportunityType[];
  ForeCastItems?: ForeCastInfo[];
  QuarterItems?: string[];
}

export const CardList: React.FC<Props> = ({
  title,
  StageInfoItems,
  OpportunityTypeItems,
  ForeCastItems,
  QuarterItems,
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
              {StageInfoItems && (
                <li
                  onClick={() => ItemClicked()}
                  className={"all " + activeClass}
                >
                  All
                </li>
              )}
              {StageInfoItems
                ? StageInfoItems &&
                  StageInfoItems.map((obj: models.StageInfo) => {
                    return (
                      <li key={obj.salesStage} className={activeClass}>
                        {obj.salesStage} - {obj.description}
                      </li>
                    );
                  })
                : null}
              {OpportunityTypeItems && (
                <li
                  onClick={() => ItemClicked()}
                  className={"all " + activeClass}
                >
                  All
                </li>
              )}
              {OpportunityTypeItems
                ? OpportunityTypeItems.map((obj: models.OpportunityType) => {
                    return (
                      <li key={obj.description} className={activeClass}>
                        {obj.description}
                      </li>
                    );
                  })
                : null}
              {ForeCastItems && (
                <li
                  onClick={() => ItemClicked()}
                  className={"all " + activeClass}
                >
                  All
                </li>
              )}
              {ForeCastItems
                ? ForeCastItems.map((obj: models.ForeCastInfo) => {
                    return (
                      <li key={obj.forecastCategory} className={activeClass}>
                        {obj.forecastCategory}
                      </li>
                    );
                  })
                : null}
              {QuarterItems && (
                <li
                  onClick={() => ItemClicked()}
                  className={"all " + activeClass}
                >
                  All
                </li>
              )}
              {QuarterItems
                ? QuarterItems.map((item: any) => {
                    return (
                      <li key={item} className={activeClass}>
                        {item}
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