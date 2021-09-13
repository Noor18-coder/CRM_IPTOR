import React from 'react';
import _ from 'lodash';
import i18n from '../../i18n';
import { DashboardInfo } from '../../helpers/Api/DashboardInfo';
import { LogsListParams, LogsInfoItem, BusinessPartnerListParams, StatisticsDetailsParams } from '../../helpers/Api/models';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import { Attributes } from '../../helpers/Api';
import BusinessPartnerList from '../../helpers/Api/CustomerList';
import { Constants } from '../../config/Constants';
import HorizontalBarChart from '../Shared/Chart/HorizontalBarChart';
import { getStartDateOfQuarterAndYear, getEndDateOfQuarterAndYear, currentRunningYear } from '../../helpers/utilities/lib';

const DashboarCustomerdWidgets: React.FC = () => {
  const [newCustomers, setNewCustomers] = React.useState<any>();
  const [inactiveCustomers, setInactiveCustomers] = React.useState<any>();
  const [targatedCustomers, setTargatedCustomers] = React.useState<any>();
  const [showNewCustomer, setShowNewCustomer] = React.useState<boolean>(true);
  const [showInactiveCustomer, setShowInactiveCustomer] = React.useState<boolean>(false);
  const [campaignList, setCampaignList] = React.useState<any>();
  const [campaignFilters] = React.useState<BusinessPartnerListParams>({});
  const [isNewLoading, setIsNewLoading] = React.useState<boolean>(false);
  const [isCampaignLoading, setIsCampaignLoading] = React.useState<boolean>(false);
  const [topOpportunityData, setTopOpportunityData] = React.useState<any>();
  const [topOpportunityDataLoading, setTopOpportunityDataLoading] = React.useState<any>();
  const [selectedQuater, setSelectedQuater] = React.useState<string>('');

  const LogParams: LogsListParams = {
    logParentFile: Constants.CUSTOMER_PARENT_FILE,
    loggedAction: Constants.ADD_ACTION,
  };

  const InactiveFilters: BusinessPartnerListParams = {
    businessPartnerTextSearch: '',
    searchField: '',
    includeInactive: true,
    crmAttributesTextSearch: '',
    industry: '',
    area: '',
    active: false,
  };

  const getCustomerLogs = async () => {
    setIsNewLoading(true);
    const logsData: any = await DashboardInfo.getLogs(Constants.DATA_LIMIT_4, Constants.LOGID_DESC, LogParams);
    if (logsData) {
      Promise.all(
        logsData.map((obj: LogsInfoItem) => {
          return CustomerDetailsApi.get(obj.parentId);
        })
      ).then((entityData) => {
        setNewCustomers(entityData);
        setIsNewLoading(false);
        return entityData;
      });
    }
  };

  const getCampaigns = async () => {
    setIsCampaignLoading(true);
    const attributeType = await Attributes.getAttributeType(Constants.ATTRIBUTE_CAMPAIGN, Constants.CUSTOMER_PARENT_FILE);
    if (attributeType.data) {
      const attributeValues = await Attributes.getAttributeValues(attributeType.data.attributeId);
      if (attributeValues.items) {
        setCampaignList(attributeValues.items);
        setIsCampaignLoading(false);
      }
    }
  };

  const getStatisticsDetails = (groupBy: string, closeDateFrom: string, closeDateTo: string, limit?: number, orderBy?: string) => {
    setTopOpportunityDataLoading(true);
    const statisticsParams: StatisticsDetailsParams = {
      groupBy,
      closeDateFrom,
      closeDateTo,
    };
    DashboardInfo.getOpportunityStatistics(limit, orderBy, statisticsParams).then((data) => {
      if (groupBy === Constants.CUSTOMER_TYPE) {
        const topCustorerData: any = data;
        if (topCustorerData) {
          Promise.all(
            topCustorerData.map((obj: any) => {
              return CustomerDetailsApi.get(obj.customer);
            })
          ).then((response) => {
            const customerData: any = response;
            customerData.forEach((customer: any) => {
              topCustorerData.forEach((element: any) => {
                if (element.customer === customer.businessPartner) {
                  _.set(element, 'customerName', customer.internalName);
                }
              });
            });
            setTopOpportunityData(topCustorerData);
            return response;
          });
        }
        setTopOpportunityDataLoading(false);
      }
      return data;
    });
  };

  const handleRecentCustomer = (type: string) => {
    if (type === Constants.NEW_TYPE) {
      setShowNewCustomer(true);
      setShowInactiveCustomer(false);
    } else {
      setShowNewCustomer(false);
      setShowInactiveCustomer(true);
      if (!inactiveCustomers) {
        setIsNewLoading(true);
        getCustomers(InactiveFilters);
      }
    }
  };

  const getCustomers = (filters: BusinessPartnerListParams) => {
    BusinessPartnerList.get('', Constants.DATA_LIMIT_4, 0, '', filters).then((data) => {
      if (filters.includeInactive) {
        setInactiveCustomers(data.data.items);
        setIsNewLoading(false);
      } else {
        setTargatedCustomers(data.data.items);
        setIsCampaignLoading(false);
      }
      setIsNewLoading(false);
      return data;
    });
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    campaignFilters.crmAttributesTextSearch = `CAMPAIGN ${e.target.value}`;
    getCustomers(campaignFilters);
    setIsCampaignLoading(true);
  };

  const onQuaterChange = (quaterType: string) => {
    if (quaterType === 'first') {
      getStatisticsDetails(
        Constants.CUSTOMER_TYPE,
        getStartDateOfQuarterAndYear(Constants.FIRST_QUATER, currentRunningYear.toString()),
        getEndDateOfQuarterAndYear(Constants.FIRST_QUATER, currentRunningYear.toString()),
        Constants.DATA_LIMIT_3,
        Constants.TOTAL_VALUE_DESC
      );
      setSelectedQuater('first');
    }
    if (quaterType === 'second') {
      getStatisticsDetails(
        Constants.CUSTOMER_TYPE,
        getStartDateOfQuarterAndYear(Constants.SECOND_QUATER, currentRunningYear.toString()),
        getEndDateOfQuarterAndYear(Constants.SECOND_QUATER, currentRunningYear.toString()),
        Constants.DATA_LIMIT_3,
        Constants.TOTAL_VALUE_DESC
      );
      setSelectedQuater('second');
    }
    if (quaterType === 'third') {
      getStatisticsDetails(
        Constants.CUSTOMER_TYPE,
        getStartDateOfQuarterAndYear(Constants.THIRD_QUATER, currentRunningYear.toString()),
        getEndDateOfQuarterAndYear(Constants.THIRD_QUATER, currentRunningYear.toString()),
        Constants.DATA_LIMIT_3,
        Constants.TOTAL_VALUE_DESC
      );
      setSelectedQuater('third');
    }
    if (quaterType === 'fourth') {
      getStatisticsDetails(
        Constants.CUSTOMER_TYPE,
        getStartDateOfQuarterAndYear(Constants.FOURTH_QUATER, currentRunningYear.toString()),
        getEndDateOfQuarterAndYear(Constants.FOURTH_QUATER, currentRunningYear.toString()),
        Constants.DATA_LIMIT_3,
        Constants.TOTAL_VALUE_DESC
      );
      setSelectedQuater('fourth');
    }
  };

  React.useEffect(() => {
    getCustomerLogs();
    getCampaigns();
    getStatisticsDetails(
      Constants.CUSTOMER_TYPE,
      getStartDateOfQuarterAndYear(Constants.FIRST_QUATER, currentRunningYear.toString()),
      getEndDateOfQuarterAndYear(Constants.FIRST_QUATER, currentRunningYear.toString()),
      Constants.DATA_LIMIT_3,
      Constants.TOTAL_VALUE_DESC
    );
    setSelectedQuater('first');
  }, []);

  React.useEffect(() => {
    if (campaignList) {
      campaignFilters.crmAttributesTextSearch = `CAMPAIGN ${campaignList[0].valueField}`;
      setIsCampaignLoading(true);
      getCustomers(campaignFilters);
    }
  }, [campaignList]);

  React.useEffect(() => {
    if (newCustomers) {
      Promise.all(
        newCustomers.map((obj: any) => {
          return Attributes.getAttribute(obj.businessPartner, Constants.CUSTOMER_PARENT_FILE, Constants.INDUSTRY_TYPE);
        })
      ).then((response) => {
        const industryData: any = response;
        industryData.forEach((industry: any) => {
          newCustomers.forEach((element: any) => {
            if (element.businessPartner === industry.parentId) {
              _.set(element, 'industry', industry.attributeValue);
            }
          });
        });
        return response;
      });
    }
  }, [newCustomers]);

  return (
    <div className="row">
      <div className="col-12">
        <p className="cardsec-title">{i18n.t('customer')}</p>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card mb-2">
          <div className="card-title-row">
            <div className="row">
              <div className="col-12">
                <ul className="nav nav-tabs dsbd-tabs lftside-tabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={showNewCustomer ? 'nav-link active' : 'nav-link'}
                      id="cust-newlyadded"
                      type="button"
                      onClick={() => handleRecentCustomer('new')}>
                      {i18n.t('newAdded')}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={showInactiveCustomer ? 'nav-link active' : 'nav-link'}
                      id="custinactive"
                      type="button"
                      onClick={() => handleRecentCustomer('inactive')}>
                      {i18n.t('inactive')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane fade show active" id="cust-newly-added" role="tabpanel" aria-labelledby="cust-newlyadded">
                {isNewLoading && <div className="text-center">{i18n.t('loadingData')}</div>}
                {showNewCustomer && (
                  <ul className="recent-customer-list">
                    {newCustomers &&
                      newCustomers.map((items: any) => {
                        return (
                          <li>
                            <p className="no-mb">{items.internalName}</p>
                            <span>{items.industry ? items.industry : '--'}</span>
                          </li>
                        );
                      })}
                  </ul>
                )}
                {showInactiveCustomer && (
                  <ul className="recent-customer-list">
                    {inactiveCustomers &&
                      inactiveCustomers.map((items: any) => {
                        return (
                          <li>
                            <p className="no-mb">{items.internalName}</p>
                            <span>{items.industry ? items.industry : '--'}</span>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </div>
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
                  <option>Top 3 by Opportunities</option>
                </select>
              </div>
              <div className="col-8 text-right">
                <ul className="nav nav-tabs dsbd-tabs float-right" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={selectedQuater === 'first' ? 'nav-link active' : 'nav-link'}
                      id="qone"
                      type="button"
                      onClick={() => onQuaterChange('first')}>
                      Q1
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={selectedQuater === 'second' ? 'nav-link active' : 'nav-link'}
                      id="qtwo"
                      type="button"
                      onClick={() => onQuaterChange('second')}>
                      Q2
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={selectedQuater === 'third' ? 'nav-link active' : 'nav-link'}
                      id="qthree"
                      type="button"
                      onClick={() => onQuaterChange('third')}>
                      Q3
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={selectedQuater === 'fourth' ? 'nav-link active' : 'nav-link'}
                      id="qfour"
                      type="button"
                      onClick={() => onQuaterChange('fourth')}>
                      Q4
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane fade show active" id="opp-qone" role="tabpanel" aria-labelledby="qone">
                {topOpportunityDataLoading ? (
                  <div className="text-center">{i18n.t('loadingData')}</div>
                ) : (
                  <HorizontalBarChart data={topOpportunityData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card mb-2">
          <div className="card-title-row">
            <div className="row">
              <div className="col">
                <p className="card-title">Targeted Customers</p>
              </div>
              <div className="col text-right">
                <select className="form-control dshbrd-cards-dd float-right" onChange={onSelectChange}>
                  {campaignList &&
                    campaignList.map((obj: any) => {
                      return <option value={obj.valueField}>{obj.valueField}</option>;
                    })}
                </select>
              </div>
            </div>
          </div>

          <div className="card-body">
            {isCampaignLoading ? (
              <div className="text-center">{i18n.t('loadingData')}</div>
            ) : (
              <ul className="target-customer-list">
                {targatedCustomers &&
                  targatedCustomers.map((items: any) => {
                    return <li>{items.internalName}</li>;
                  })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboarCustomerdWidgets;
