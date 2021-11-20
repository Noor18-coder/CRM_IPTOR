import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/store';
import * as models from '../../helpers/Api/models';
import { getCurrPrevNextYearQuarters } from '../../helpers/utilities/lib';
import { saveOpportunityParams } from '../../store/Reports/Actions';
import i18n from '../../i18n';

export const OpportunityReport = (): JSX.Element => {
  const state: AppState = useSelector((opptState: AppState) => opptState);
  const StageInfoDetails = state.enviornmentConfigs.crmOpportunityStage;
  const OpportunityTypeDetails = state.enviornmentConfigs.crmOpportunityTypes;
  const foreCastDetails = state.enviornmentConfigs.forecastInfo;
  const QuarterDetails = getCurrPrevNextYearQuarters();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <CardList title={`${i18n.t('stages')}`} StageInfoItems={StageInfoDetails} />
          <CardList title={`${i18n.t('type')}`} OpportunityTypeItems={OpportunityTypeDetails} />
          <CardList title={`${i18n.t('forecast')}`} ForeCastItems={foreCastDetails} />
          <CardList title={`${i18n.t('quarter')}`} QuarterItems={QuarterDetails} />
        </div>
      </div>
    </>
  );
};
export interface Props {
  title: string;
  StageInfoItems?: models.StageInfo[];
  OpportunityTypeItems?: models.OpportunityType[];
  ForeCastItems?: models.ForeCastInfo[];
  QuarterItems?: string[];
}
export const CardList: React.FC<Props> = ({ title, StageInfoItems, OpportunityTypeItems, ForeCastItems, QuarterItems }) => {
  const state: AppState = useSelector((opptState: AppState) => opptState);
  const [allStageSelected, setAllStageSelected] = React.useState<boolean>(true);
  const [allStageBtnClass, setAllStageBtnClass] = React.useState('active');
  const [allOpptySelected, setAllOpptySelected] = React.useState<boolean>(true);
  const [allOpptyBtnClass, setAllOpptyBtnClass] = React.useState('active');
  const [allForecastSelected, setAllForecastSelected] = React.useState<boolean>(true);
  const [allForecastBtnClass, setAllForecastBtnClass] = React.useState('active');
  const [allQuaterSelected, setAllQuaterSelected] = React.useState<boolean>(true);
  const [allQuaterBtnClass, setAllQuaterBtnClass] = React.useState('active');
  const [activeClass, setActiveClass] = React.useState('active');
  const [isSingle, setIsSingle] = React.useState(false);
  const dispatch: Dispatch<any> = useDispatch();

  const AllItemsClicked = (clickedItem: string) => {
    if (clickedItem === 'allStages') {
      const filters = state.reports.opportunityReportsParams;
      setAllStageBtnClass(allStageSelected === false ? 'active' : '');
      setAllStageSelected(!allStageSelected);
      filters.selectStage = [];
      dispatch(saveOpportunityParams(filters));
    }

    if (clickedItem === 'allOppty') {
      const filters = state.reports.opportunityReportsParams;
      setAllOpptyBtnClass(allOpptySelected === false ? 'active' : '');
      setAllOpptySelected(!allOpptySelected);
      filters.selectOppRecordType = [];
      dispatch(saveOpportunityParams(filters));
    }

    if (clickedItem === 'allForecast') {
      const filters = state.reports.opportunityReportsParams;
      setAllForecastBtnClass(allForecastSelected === false ? 'active' : '');
      setAllForecastSelected(!allForecastSelected);
      filters.selectForecastCategory = [];
      dispatch(saveOpportunityParams(filters));
    }

    if (clickedItem === 'allQuater') {
      const filters = state.reports.opportunityReportsParams;
      setAllQuaterBtnClass(allQuaterSelected === false ? 'active' : '');
      setAllQuaterSelected(!allQuaterSelected);
      filters.selectCloseDate = [];
      dispatch(saveOpportunityParams(filters));
    }
  };

  React.useEffect(() => {
    setAllStageBtnClass(allStageSelected === true ? 'active' : '');
    setAllOpptyBtnClass(allOpptySelected === true ? 'active' : '');
    setAllForecastBtnClass(allForecastSelected === true ? 'active' : '');
    setAllQuaterBtnClass(allQuaterSelected === true ? 'active' : '');
  }, [allStageSelected, allOpptySelected, allForecastSelected, allQuaterSelected]);

  React.useEffect(() => {
    if (allStageBtnClass === 'active') {
      const list = Array.from(document.querySelectorAll('li.stage'));
      list.forEach((element) => {
        element.className = 'stage active';
      });
    }
    if (allStageBtnClass === '' && !isSingle) {
      const list = Array.from(document.querySelectorAll('li.stage'));
      list.forEach((element) => {
        element.className = 'stage';
      });
    }
    setIsSingle(false);
  }, [allStageBtnClass]);

  React.useEffect(() => {
    if (allOpptyBtnClass === 'active') {
      const list = Array.from(document.querySelectorAll('li.oppty'));
      list.forEach((element) => {
        element.className = 'oppty active';
      });
    }
    if (allOpptyBtnClass === '' && !isSingle) {
      const list = Array.from(document.querySelectorAll('li.oppty'));
      list.forEach((element) => {
        element.className = 'oppty';
      });
    }
    setIsSingle(false);
  }, [allOpptyBtnClass]);

  React.useEffect(() => {
    if (allForecastBtnClass === 'active') {
      const list = Array.from(document.querySelectorAll('li.forecast'));
      list.forEach((element) => {
        element.className = 'forecast active';
      });
    }
    if (allForecastBtnClass === '' && !isSingle) {
      const list = Array.from(document.querySelectorAll('li.forecast'));
      list.forEach((element) => {
        element.className = 'forecast';
      });
    }
    setIsSingle(false);
  }, [allForecastBtnClass]);

  React.useEffect(() => {
    if (allQuaterBtnClass === 'active') {
      const list = Array.from(document.querySelectorAll('li.quater'));
      list.forEach((element) => {
        element.className = 'quater active';
      });
    }
    if (allQuaterBtnClass === '' && !isSingle) {
      const list = Array.from(document.querySelectorAll('li.quater'));
      list.forEach((element) => {
        element.className = 'quater';
      });
    }
    setIsSingle(false);
  }, [allQuaterBtnClass]);

  const ItemClicked = (value: string, e: any, key: string) => {
    const filters = state.reports.opportunityReportsParams;
    if (key === 'stages') {
      if (e.className === 'stage') {
        e.className = 'stage active';
      } else {
        e.className = 'stage';
        setIsSingle(true);
      }
    }

    if (key === 'opportunity') {
      if (e.className === 'oppty') {
        e.className = 'oppty active';
      } else {
        e.className = 'oppty';
        setIsSingle(true);
      }
    }

    if (key === 'foreCast') {
      if (e.className === 'forecast') {
        e.className = 'forecast active';
      } else {
        e.className = 'forecast';
        setIsSingle(true);
      }
    }

    if (key === 'quater') {
      if (e.className === 'quater') {
        e.className = 'quater active';
      } else {
        e.className = 'quater';
        setIsSingle(true);
      }
    }

    if (title === 'Stages' && StageInfoItems) {
      setAllStageSelected(false);
      if (allStageSelected) {
        const stages: string[] = StageInfoItems.map((obj: models.StageInfo) => {
          return obj.salesStage;
        });

        const filteredStages = stages.filter((val: string) => {
          return val !== value;
        });
        filters.selectStage = filteredStages;
        dispatch(saveOpportunityParams(filters));
      } else {
        const index = filters.selectStage.indexOf(value);
        if (index === -1) {
          filters.selectStage.push(value);
        } else {
          filters.selectStage.splice(index, 1);
        }

        if (filters.selectStage.length === StageInfoItems.length) {
          setAllStageSelected(true);
          setActiveClass('active');
          filters.selectStage = [];
        }
        dispatch(saveOpportunityParams(filters));
      }
    }

    if (title === 'Type' && OpportunityTypeItems) {
      setAllOpptySelected(false);
      if (allOpptySelected) {
        const Types: string[] = OpportunityTypeItems.map((obj: models.OpportunityType) => {
          return obj.oppRecordType;
        });
        const filteredTypes = Types.filter((val: string) => {
          return val !== value;
        });
        filters.selectOppRecordType = filteredTypes;
        dispatch(saveOpportunityParams(filters));
      } else {
        const index = filters.selectOppRecordType.indexOf(value);
        if (index === -1) {
          filters.selectOppRecordType.push(value);
        } else {
          filters.selectOppRecordType.splice(index, 1);
        }
        if (filters.selectOppRecordType.length === OpportunityTypeItems.length) {
          setAllOpptySelected(true);
          setActiveClass('active');
          filters.selectOppRecordType = [];
        }
        dispatch(saveOpportunityParams(filters));
      }
    }

    if (title === 'Forecast' && ForeCastItems) {
      setAllForecastSelected(false);
      if (allForecastSelected) {
        const Forecast: string[] = ForeCastItems.map((obj: models.ForeCastInfo) => {
          return obj.forecastCategory;
        });
        const filteredForecast = Forecast.filter((val: string) => {
          return val !== value;
        });
        filters.selectForecastCategory = filteredForecast;
        dispatch(saveOpportunityParams(filters));
      } else {
        const index = filters.selectForecastCategory.indexOf(value);
        if (index === -1) {
          filters.selectForecastCategory.push(value);
        } else {
          filters.selectForecastCategory.splice(index, 1);
        }
        if (filters.selectForecastCategory.length === ForeCastItems.length) {
          setAllForecastSelected(true);
          setActiveClass('active');
          filters.selectForecastCategory = [];
        }
        dispatch(saveOpportunityParams(filters));
      }
    }

    if (title === 'Quarter' && QuarterItems) {
      setAllQuaterSelected(false);
      if (allQuaterSelected) {
        const Quarter: string[] = QuarterItems.map((obj: any) => {
          return obj;
        });
        const filteredQuarter = Quarter.filter((val: string) => {
          return val !== value;
        });
        filters.selectCloseDate = filteredQuarter;
        dispatch(saveOpportunityParams(filters));
      } else {
        const index = filters.selectCloseDate.indexOf(value);
        if (index === -1) {
          filters.selectCloseDate.push(value);
        } else {
          filters.selectCloseDate.splice(index, 1);
        }
        if (filters.selectCloseDate.length === QuarterItems.length) {
          setAllQuaterSelected(true);
          setActiveClass('active');
          filters.selectCloseDate = [];
        }
        dispatch(saveOpportunityParams(filters));
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
              {StageInfoItems && (
                <li
                  onClick={() => AllItemsClicked('allStages')}
                  role="presentation"
                  onKeyDown={() => AllItemsClicked('allStages')}
                  className={allStageBtnClass}>
                  {i18n.t('all')}
                </li>
              )}
              {StageInfoItems
                ? StageInfoItems &&
                  StageInfoItems.map((obj: models.StageInfo) => {
                    return (
                      <li
                        onClick={(e) => ItemClicked(obj.salesStage, e.currentTarget, 'stages')}
                        role="presentation"
                        onKeyDown={(e) => ItemClicked(obj.salesStage, e.currentTarget, 'stages')}
                        key={obj.salesStage}
                        className={`stage ${activeClass}`}>
                        {obj.salesStage} - {obj.description}
                      </li>
                    );
                  })
                : null}
              {OpportunityTypeItems && (
                <li role="presentation" className={allOpptyBtnClass} onClick={() => AllItemsClicked('allOppty')}>
                  {i18n.t('all')}
                </li>
              )}
              {OpportunityTypeItems
                ? OpportunityTypeItems.map((obj: models.OpportunityType) => {
                    return (
                      <li
                        onClick={(e) => ItemClicked(obj.oppRecordType, e.currentTarget, 'opportunity')}
                        role="presentation"
                        onKeyDown={(e) => ItemClicked(obj.oppRecordType, e.currentTarget, 'opportunity')}
                        key={obj.description}
                        className={`oppty ${activeClass}`}>
                        {obj.oppRecordType}
                      </li>
                    );
                  })
                : null}
              {ForeCastItems && (
                <li role="presentation" className={allForecastBtnClass} onClick={() => AllItemsClicked('allForecast')}>
                  {i18n.t('all')}
                </li>
              )}
              {ForeCastItems
                ? ForeCastItems.map((obj: models.ForeCastInfo) => {
                    return (
                      <li
                        onClick={(e) => ItemClicked(obj.forecastCategory, e.currentTarget, 'foreCast')}
                        role="presentation"
                        onKeyDown={(e) => ItemClicked(obj.forecastCategory, e.currentTarget, 'foreCast')}
                        key={obj.forecastCategory}
                        className={`forecast ${activeClass}`}>
                        {obj.forecastCategory}
                      </li>
                    );
                  })
                : null}
              {QuarterItems && (
                <li role="presentation" className={allQuaterBtnClass} onClick={() => AllItemsClicked('allQuater')}>
                  {i18n.t('all')}
                </li>
              )}
              {QuarterItems
                ? QuarterItems.map((item: any) => {
                    return (
                      <li
                        onClick={(e) => ItemClicked(item, e.currentTarget, 'quater')}
                        role="presentation"
                        onKeyDown={(e) => ItemClicked(item, e.currentTarget, 'quater')}
                        key={item}
                        className={`quater ${activeClass}`}>
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
