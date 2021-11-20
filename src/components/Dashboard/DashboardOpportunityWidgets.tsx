import React from 'react';
import { useHistory } from 'react-router';
import i18n from '../../i18n';
import LineChart from '../Shared/Chart/LineChart';
import StackBarChart from '../Shared/Chart/StackBarChart';
import { DashboardInfo } from '../../helpers/Api/DashboardInfo';
import { yearStartDate, yearEndDate, getDashDateFormat, monthStartDate, monthEndDate, weekStartDate, weekEndDate } from '../../helpers/utilities/lib';
import { Constants } from '../../config/Constants';
import { StatisticsDetailsParams, TypeFilters, StatisticsDetailsItem, StatisticDetailsResponse } from '../../helpers/Api/models';

const DashboardOpportunityWidgets: React.FC = () => {
  const [pipelineData, setPipelineData] = React.useState<any>();
  const [closeDateData, setCloseDateData] = React.useState<any>();
  const [regionData, setRegionData] = React.useState<any>();
  const [minCloseDate, setMinCloseDate] = React.useState<any>();
  const [maxCloseDate, setMaxCloseDate] = React.useState<any>();
  const [groupType, setGroupType] = React.useState<string>('');
  const [areaGroupType, setAreaGroupType] = React.useState<string>('');
  const [filterType, setFilterType] = React.useState<string>('');
  const [areaFilterType, setAreaFilterType] = React.useState<string>('');
  const [pipelineDataLoading, setPipelineDataLoading] = React.useState<boolean>(false);
  const [wonDataLoading, setWonDataLoading] = React.useState<boolean>(false);
  const [regionDataLoading, setRegionDataLoading] = React.useState<boolean>(false);
  const history = useHistory();

  const wonRevenueFilter: TypeFilters[] = [
    { valueField: i18n.t('wonLost'), id: 'wonLost' },
    { valueField: i18n.t('revenue'), id: 'revenue' },
  ];
  const regionTypeFilter: TypeFilters[] = [
    { valueField: i18n.t('allRegions'), id: 'allRegions' },
    { valueField: i18n.t('topIndustry'), id: 'topIndustry' },
    { valueField: i18n.t('topType'), id: 'topType' },
    { valueField: i18n.t('topSalesPerson'), id: 'topSalesPerson' },
  ];

  const getStatisticsDetails = (
    groupBy: string,
    closeDateFrom: string,
    closeDateTo: string,
    isChartData?: boolean,
    limit?: number,
    orderBy?: string
  ) => {
    if (groupBy === Constants.CLOSE_DATE_TYPE) {
      getStatisticsDetailsCloseDateType(Constants.CLOSE_DATE_TYPE, closeDateFrom, closeDateTo, orderBy);
      return;
    }

    const statisticsParams: StatisticsDetailsParams = {
      groupBy,
      closeDateFrom,
      closeDateTo,
    };
    DashboardInfo.getOpportunityStatistics(limit, orderBy, statisticsParams).then((data) => {
      if (groupBy === Constants.INDUSTRY_TYPE && !isChartData) {
        setPipelineData(data);
        setPipelineDataLoading(false);
      }
      if (groupBy === Constants.CLOSE_DATE_TYPE) {
        setCloseDateData(data);
        setWonDataLoading(false);
      }
      if (groupBy === Constants.AREA_TYPE) {
        setRegionData(data);
        setRegionDataLoading(false);
      }
      if (groupBy === Constants.INDUSTRY_TYPE && isChartData) {
        setRegionData(data);
        setRegionDataLoading(false);
      }
      if (groupBy === Constants.OPPORTUNITY_RECORD_TYPE) {
        setRegionData(data);
        setRegionDataLoading(false);
      }
      if (groupBy === Constants.USER_TYPE) {
        setRegionData(data);
        setRegionDataLoading(false);
      }
      return data;
    });
  };

  const getStatisticsDetailsCloseDateType = async (groupBy: string, closeDateFrom: string, closeDateTo: string, orderBy?: string) => {
    const statisticsParams: StatisticsDetailsParams = {
      groupBy,
      closeDateFrom,
      closeDateTo,
    };
    const limit = Constants.DATA_LIMIT_50;

    let newOffset = 0;
    const allData: StatisticsDetailsItem[] = [];
    const data: StatisticDetailsResponse = await DashboardInfo.getOpportunityStatisticsCloseDate(limit, orderBy, statisticsParams, newOffset);

    if (data && data.control && data.control.total && newOffset < data.control.total) {
      allData.splice(allData.length, 0, ...data.data.items);
      const Promises = [];
      newOffset += limit;
      while (newOffset < data.control.total) {
        const p1 = DashboardInfo.getOpportunityStatisticsCloseDate(limit, orderBy, statisticsParams, newOffset);
        Promises.push(p1);
        newOffset += limit;
      }

      Promise.all(Promises)
        .then((response: any) => {
          response.forEach((res: any) => {
            allData.splice(allData.length, 0, ...res.data.items);
          });
          setCloseDateData(allData);
          setWonDataLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (data) {
      allData.splice(allData.length, 0, ...data.data.items);
      setCloseDateData(allData);
      setWonDataLoading(false);
    }
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

  const onWonRevenueFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const onAreaYearChange = (type: string) => {
    if (type === Constants.YEAR_TYPE) {
      setRegionDataLoading(true);
      setAreaGroupType('year');
      if (areaFilterType === 'regions') {
        getStatisticsDetails(Constants.AREA_TYPE, getDashDateFormat(yearStartDate), getDashDateFormat(yearEndDate));
      }
      if (areaFilterType === 'industry') {
        getStatisticsDetails(
          Constants.INDUSTRY_TYPE,
          getDashDateFormat(yearStartDate),
          getDashDateFormat(yearEndDate),
          true,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      if (areaFilterType === 'type') {
        getStatisticsDetails(
          Constants.OPPORTUNITY_RECORD_TYPE,
          getDashDateFormat(yearStartDate),
          getDashDateFormat(yearEndDate),
          false,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      if (areaFilterType === 'salesPerson') {
        getStatisticsDetails(
          Constants.USER_TYPE,
          getDashDateFormat(yearStartDate),
          getDashDateFormat(yearEndDate),
          false,
          Constants.DATA_LIMIT_5,
          Constants.TOTAL_DESC
        );
      }
    }
    if (type === Constants.MONTH_TYPE) {
      setRegionDataLoading(true);
      setAreaGroupType('month');
      if (areaFilterType === 'regions') {
        getStatisticsDetails(Constants.AREA_TYPE, getDashDateFormat(monthStartDate), getDashDateFormat(monthEndDate));
      }
      if (areaFilterType === 'industry') {
        getStatisticsDetails(
          Constants.INDUSTRY_TYPE,
          getDashDateFormat(monthStartDate),
          getDashDateFormat(monthEndDate),
          true,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      if (areaFilterType === 'type') {
        getStatisticsDetails(
          Constants.OPPORTUNITY_RECORD_TYPE,
          getDashDateFormat(monthStartDate),
          getDashDateFormat(monthEndDate),
          false,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      if (areaFilterType === 'salesPerson') {
        getStatisticsDetails(
          Constants.USER_TYPE,
          getDashDateFormat(monthStartDate),
          getDashDateFormat(monthEndDate),
          false,
          Constants.DATA_LIMIT_5,
          Constants.TOTAL_DESC
        );
      }
    }
    if (type === Constants.WEEK_TYPE) {
      setRegionDataLoading(true);
      setAreaGroupType('week');
      if (areaFilterType === 'regions') {
        getStatisticsDetails(Constants.AREA_TYPE, getDashDateFormat(weekStartDate), getDashDateFormat(weekEndDate));
      }
      if (areaFilterType === 'industry') {
        getStatisticsDetails(
          Constants.INDUSTRY_TYPE,
          getDashDateFormat(weekStartDate),
          getDashDateFormat(weekEndDate),
          true,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      if (areaFilterType === 'type') {
        getStatisticsDetails(
          Constants.OPPORTUNITY_RECORD_TYPE,
          getDashDateFormat(weekStartDate),
          getDashDateFormat(weekEndDate),
          false,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      if (areaFilterType === 'salesPerson') {
        getStatisticsDetails(
          Constants.USER_TYPE,
          getDashDateFormat(weekStartDate),
          getDashDateFormat(weekEndDate),
          false,
          Constants.DATA_LIMIT_5,
          Constants.TOTAL_DESC
        );
      }
    }
  };

  const onAreaFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.currentTarget.value === i18n.t('allRegions')) {
      setRegionDataLoading(true);
      if (areaGroupType === Constants.YEAR_TYPE) {
        getStatisticsDetails(Constants.AREA_TYPE, getDashDateFormat(yearStartDate), getDashDateFormat(yearEndDate));
      }
      if (areaGroupType === Constants.MONTH_TYPE) {
        getStatisticsDetails(Constants.AREA_TYPE, getDashDateFormat(monthStartDate), getDashDateFormat(monthEndDate));
      }
      if (areaGroupType === Constants.WEEK_TYPE) {
        getStatisticsDetails(Constants.AREA_TYPE, getDashDateFormat(weekStartDate), getDashDateFormat(weekEndDate));
      }
      setAreaFilterType('regions');
    }
    if (e.currentTarget.value === i18n.t('topIndustry')) {
      setRegionDataLoading(true);
      if (areaGroupType === Constants.YEAR_TYPE) {
        getStatisticsDetails(
          Constants.INDUSTRY_TYPE,
          getDashDateFormat(yearStartDate),
          getDashDateFormat(yearEndDate),
          true,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      if (areaGroupType === Constants.MONTH_TYPE) {
        getStatisticsDetails(
          Constants.INDUSTRY_TYPE,
          getDashDateFormat(monthStartDate),
          getDashDateFormat(monthEndDate),
          true,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      if (areaGroupType === Constants.WEEK_TYPE) {
        getStatisticsDetails(
          Constants.INDUSTRY_TYPE,
          getDashDateFormat(weekStartDate),
          getDashDateFormat(weekEndDate),
          true,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      setAreaFilterType('industry');
    }
    if (e.currentTarget.value === i18n.t('topType')) {
      setRegionDataLoading(true);
      if (areaGroupType === Constants.YEAR_TYPE) {
        getStatisticsDetails(
          Constants.OPPORTUNITY_RECORD_TYPE,
          getDashDateFormat(yearStartDate),
          getDashDateFormat(yearEndDate),
          false,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      if (areaGroupType === Constants.MONTH_TYPE) {
        getStatisticsDetails(
          Constants.OPPORTUNITY_RECORD_TYPE,
          getDashDateFormat(monthStartDate),
          getDashDateFormat(monthEndDate),
          false,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      if (areaGroupType === Constants.WEEK_TYPE) {
        getStatisticsDetails(
          Constants.OPPORTUNITY_RECORD_TYPE,
          getDashDateFormat(weekStartDate),
          getDashDateFormat(weekEndDate),
          false,
          Constants.DATA_LIMIT_10,
          Constants.TOTAL_DESC
        );
      }
      setAreaFilterType('type');
    }
    if (e.currentTarget.value === i18n.t('topSalesPerson')) {
      setRegionDataLoading(true);
      if (areaGroupType === Constants.YEAR_TYPE) {
        getStatisticsDetails(
          Constants.USER_TYPE,
          getDashDateFormat(yearStartDate),
          getDashDateFormat(yearEndDate),
          false,
          Constants.DATA_LIMIT_5,
          Constants.TOTAL_DESC
        );
      }
      if (areaGroupType === Constants.MONTH_TYPE) {
        getStatisticsDetails(
          Constants.USER_TYPE,
          getDashDateFormat(monthStartDate),
          getDashDateFormat(monthEndDate),
          false,
          Constants.DATA_LIMIT_5,
          Constants.TOTAL_DESC
        );
      }
      if (areaGroupType === Constants.WEEK_TYPE) {
        getStatisticsDetails(
          Constants.USER_TYPE,
          getDashDateFormat(weekStartDate),
          getDashDateFormat(weekEndDate),
          false,
          Constants.DATA_LIMIT_5,
          Constants.TOTAL_DESC
        );
      }
      setAreaFilterType('salesPerson');
    }
  };

  const openOpptyList = () => {
    history.push({
      pathname: '/opportunities',
      state: { flag: 'pipelineData' },
    });
  };

  React.useEffect(() => {
    setPipelineDataLoading(true);
    setWonDataLoading(true);
    setRegionDataLoading(true);
    getStatisticsDetails(
      Constants.INDUSTRY_TYPE,
      getDashDateFormat(yearStartDate),
      getDashDateFormat(yearEndDate),
      false,
      Constants.DATA_LIMIT_9,
      Constants.INPROGRESS_DESC
    );
    getStatisticsDetails(Constants.CLOSE_DATE_TYPE, getDashDateFormat(yearStartDate), getDashDateFormat(yearEndDate));
    getStatisticsDetails(Constants.AREA_TYPE, getDashDateFormat(yearStartDate), getDashDateFormat(yearEndDate));
    setGroupType('year');
    setAreaGroupType('year');
    setFilterType('wonLost');
    setAreaFilterType('regions');
  }, []);

  React.useEffect(() => {
    if (closeDateData && closeDateData.length > 0) {
      setMinCloseDate(closeDateData[0].closeDate);
      setMaxCloseDate(closeDateData[closeDateData.length - 1].closeDate);
    }
  }, [closeDateData]);

  return (
    <div className="row">
      <div className="col-12">
        <p className="cardsec-title">{i18n.t('opportunity')}</p>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div className="card mb-2">
          <div className="card-title-row">
            <div className="row">
              <div className="col-xl-6 col-lg-5 col-md-6 col-sm-4 col-5">
                <select className="form-control dshbrd-cards-dd" onChange={onWonRevenueFilterChange}>
                  {wonRevenueFilter &&
                    wonRevenueFilter.map((obj) => {
                      return (
                        <option value={obj.valueField} key={obj.id}>
                          {obj.valueField}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-xl-6 col-lg-7 col-md-6 col-sm-8 col-7 text-right">
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

          <div className="card-body card-body-height">
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

      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div className="card mb-2">
          <div className="card-title-row">
            <div className="row">
              <div className="col-xl-6 col-lg-5 col-md-6 col-sm-4 col-5">
                <select className="form-control dshbrd-cards-dd" onChange={onAreaFilterChange}>
                  {regionTypeFilter &&
                    regionTypeFilter.map((obj) => {
                      return (
                        <option value={obj.valueField} key={obj.id}>
                          {obj.valueField}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-xl-6 col-lg-7 col-md-6 col-sm-8 col-7 text-right">
                <ul className="nav nav-tabs dsbd-tabs float-right" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={areaGroupType === 'week' ? 'nav-link active' : 'nav-link'}
                      id="day-tab"
                      type="button"
                      onClick={() => onAreaYearChange('week')}>
                      {i18n.t('week')}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={areaGroupType === 'month' ? 'nav-link active' : 'nav-link'}
                      id="month-tab"
                      type="button"
                      onClick={() => onAreaYearChange('month')}>
                      {i18n.t('month')}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={areaGroupType === 'year' ? 'nav-link active' : 'nav-link'}
                      id="year-tab"
                      type="button"
                      onClick={() => onAreaYearChange('year')}>
                      {i18n.t('year')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-body card-body-height">
            <div className="tab-content">
              {regionDataLoading ? (
                <div className="text-center">{i18n.t('loadingData')}</div>
              ) : (
                <StackBarChart data={regionData} selectedFilter={areaFilterType} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div className="card mb-2">
          <div className="card-title-row">
            <div className="row">
              <div className="col-6">
                <p className="card-title">{i18n.t('pipeline')}</p>
              </div>
              <div className="col-6 text-right singlelink">
                <span className="pipeline-title-link" onClick={openOpptyList} onKeyDown={openOpptyList} role="presentation">
                  {i18n.t('viewAll')}
                </span>
              </div>
            </div>
          </div>
          <div className="card-body pipeline card-body-height">
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
