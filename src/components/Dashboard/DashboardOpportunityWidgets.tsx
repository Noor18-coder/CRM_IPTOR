import React from 'react';
import i18n from '../../i18n';
import LineChart from '../Shared/Chart/LineChart';
import StackBarChart from '../Shared/Chart/StackBarChart';
import { DashboardInfo } from '../../helpers/Api/DashboardInfo';
import { StatisticsDetailsParams } from '../../helpers/Api/models';
import { yearStartDate, yearEndDate, getDashDateFormat, monthStartDate, monthEndDate, weekStartDate, weekEndDate } from '../../helpers/utilities/lib';
import { Constants } from '../../config/Constants';

const DashboardOpportunityWidgets: React.FC = () => {
  const [pipelineData, setPipelineData] = React.useState<any>();
  const [closeDateData, setCloseDateData] = React.useState<any>();
  const [minCloseDate, setMinCloseDate] = React.useState<any>();
  const [maxCloseDate, setMaxCloseDate] = React.useState<any>();
  const [groupType, setGroupType] = React.useState<string>('');
  const [filterType, setFilterType] = React.useState<string>('');
  const [pipelineDataLoading, setPipelineDataLoading] = React.useState<boolean>(false);
  const [wonDataLoading, setWonDataLoading] = React.useState<boolean>(false);
  const [regionDataLoading, setRegionDataLoading] = React.useState<boolean>(false);

  const wonRevenueFilter = [{ valueField: i18n.t('wonLost') }, { valueField: i18n.t('revenue') }];
  const regionTypeFilter = [
    { valueField: i18n.t('allRegions') },
    { valueField: i18n.t('allIndustry') },
    { valueField: i18n.t('type') },
    { valueField: i18n.t('topSalesPerson') },
  ];

  const getStatisticsDetails = (groupBy: string, closeDateFrom: string, closeDateTo: string, limit?: number, orderBy?: string) => {
    const statisticsParams: StatisticsDetailsParams = {
      groupBy,
      closeDateFrom,
      closeDateTo,
    };
    DashboardInfo.getOpportunityStatistics(limit, orderBy, statisticsParams).then((data) => {
      if (groupBy === Constants.INDUSTRY_TYPE) {
        setPipelineData(data);
        setPipelineDataLoading(false);
      }
      if (groupBy === Constants.CLOSE_DATE_TYPE) {
        setCloseDateData(data);
        setWonDataLoading(false);
      }
      if (groupBy === Constants.AREA_TYPE) {
        setRegionDataLoading(false);
      }
      return data;
    });
  };

  const onWonLostYearChange = (type: string) => {
    if (type === Constants.YEAR_TYPE) {
      setWonDataLoading(true);
      getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(yearStartDate), getDashDateFormat(yearEndDate));
      setGroupType('year');
    }
    if (type === Constants.MONTH_TYPE) {
      setWonDataLoading(true);
      getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(monthStartDate), getDashDateFormat(monthEndDate));
      setGroupType('month');
    }
    if (type === Constants.WEEK_TYPE) {
      setWonDataLoading(true);
      getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(weekStartDate), getDashDateFormat(weekEndDate));
      setGroupType('week');
    }
  };

  const onWonRevenueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.currentTarget.value === Constants.REVENUE_TYPE) {
      setWonDataLoading(true);
      if (groupType === Constants.YEAR_TYPE) {
        getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(yearStartDate), getDashDateFormat(yearEndDate));
      }
      if (groupType === Constants.MONTH_TYPE) {
        getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(monthStartDate), getDashDateFormat(monthEndDate));
      }
      if (groupType === Constants.WEEK_TYPE) {
        getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(weekStartDate), getDashDateFormat(weekEndDate));
      }
      setFilterType('revenue');
    }
    if (e.currentTarget.value === i18n.t('wonLost')) {
      setWonDataLoading(true);
      if (groupType === Constants.YEAR_TYPE) {
        getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(yearStartDate), getDashDateFormat(yearEndDate));
      }
      if (groupType === Constants.MONTH_TYPE) {
        getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(monthStartDate), getDashDateFormat(monthEndDate));
      }
      if (groupType === Constants.WEEK_TYPE) {
        getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(weekStartDate), getDashDateFormat(weekEndDate));
      }
      setFilterType('wonLost');
    }
  };

  React.useEffect(() => {
    setPipelineDataLoading(true);
    setWonDataLoading(true);
    setRegionDataLoading(true);
    getStatisticsDetails(
      Constants.INDUSTRY_TYPE,
      getDashDateFormat(yearStartDate),
      getDashDateFormat(yearEndDate),
      Constants.MED_DATA_LIMIT,
      Constants.INPROGRESS_DESC
    );
    getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(yearStartDate), getDashDateFormat(yearEndDate));
    getStatisticsDetails(Constants.AREA_TYPE, getDashDateFormat(yearStartDate), getDashDateFormat(yearEndDate));
    setGroupType('year');
    setFilterType('wonLost');
  }, []);

  React.useEffect(() => {
    if (closeDateData) {
      setMinCloseDate(closeDateData[0].closeDate);
      setMaxCloseDate(closeDateData[closeDateData.length - 1].closeDate);
    }
  }, [closeDateData]);

  return (
    <div className="row">
      <div className="col-12">
        <p className="cardsec-title">{i18n.t('opportunity')}</p>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card mb-2">
          <div className="card-title-row">
            <div className="row">
              <div className="col-4">
                <select className="form-control dshbrd-cards-dd" onChange={onWonRevenueChange}>
                  {wonRevenueFilter &&
                    wonRevenueFilter.map((obj: any) => {
                      return <option value={obj.valueField}>{obj.valueField}</option>;
                    })}
                </select>
              </div>
              <div className="col-8 text-right">
                <ul className="nav nav-tabs dsbd-tabs float-right" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={groupType === 'week' ? 'nav-link active' : 'nav-link'}
                      id="day-tab"
                      data-toggle="tab"
                      type="button"
                      onClick={() => onWonLostYearChange('week')}>
                      {i18n.t('week')}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={groupType === 'month' ? 'nav-link active' : 'nav-link'}
                      id="month-tab"
                      type="button"
                      onClick={() => onWonLostYearChange('month')}>
                      {i18n.t('month')}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={groupType === 'year' ? 'nav-link active' : 'nav-link'}
                      id="year-tab"
                      type="button"
                      onClick={() => onWonLostYearChange('year')}>
                      {i18n.t('year')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="tab-content">
              {wonDataLoading ? (
                <div className="text-center">{i18n.t('loadingData')}</div>
              ) : (
                <LineChart minDate={minCloseDate} maxDate={maxCloseDate} closeDateData={closeDateData} group={groupType} filter={filterType} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card mb-2">
          <div className="card-title-row">
            <div className="row">
              <div className="col-4">
                <select className="form-control dshbrd-cards-dd">
                  {regionTypeFilter &&
                    regionTypeFilter.map((obj: any) => {
                      return <option value={obj.valueField}>{obj.valueField}</option>;
                    })}
                </select>
              </div>
              <div className="col-8 text-right">
                <ul className="nav nav-tabs dsbd-tabs float-right" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="day-tab" type="button">
                      {i18n.t('week')}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="month-tab" type="button">
                      {i18n.t('month')}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="year-tab" type="button">
                      {i18n.t('year')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="tab-content">{regionDataLoading ? <div className="text-center">{i18n.t('loadingData')}</div> : <StackBarChart />}</div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card mb-2">
          <div className="card-title-row">
            <div className="row">
              <div className="col-6">
                <p className="card-title">{i18n.t('pipeline')}</p>
              </div>
              <div className="col-6 text-right singlelink">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="pipeline-title-link">
                  View All
                </a>
              </div>
            </div>
          </div>
          <div className="card-body pipeline">
            {pipelineDataLoading ? (
              <div className="text-center">{i18n.t('loadingData')}</div>
            ) : (
              <div className="row">
                {pipelineData &&
                  pipelineData.map((obj: any) => {
                    return (
                      <div className="col-4 pipeline-items">
                        {obj.inProgress} <span>{obj.industry ? obj.industry : '--'}</span>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOpportunityWidgets;
