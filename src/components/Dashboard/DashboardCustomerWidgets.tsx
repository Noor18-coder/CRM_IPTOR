import React from 'react';
import i18n from '../../i18n';
import { DashboardInfo } from '../../helpers/Api/DashboardInfo';
import { LogsListParams, LogsInfoItem, BusinessPartnerListParams } from '../../helpers/Api/models';
import CustomerDetailsApi from '../../helpers/Api/CustomerDetailsApi';
import BusinessPartnerList from '../../helpers/Api/CustomerList';

const DashboarCustomerdWidgets: React.FC = () => {
  const [newCustomers, setNewCustomers] = React.useState<any>();
  const [inactiveCustomers, setInactiveCustomers] = React.useState<any>();
  const [showNewCustomer, setShowNewCustomer] = React.useState<boolean>(true);
  const [showInactiveCustomer, setShowInactiveCustomer] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const LogParams: LogsListParams = {
    logParentFile: 'SRONAM',
    loggedAction: 'ADD',
  };

  const CustomerFilters: BusinessPartnerListParams = {
    businessPartnerTextSearch: '',
    searchField: '',
    includeInactive: true,
    crmAttributesTextSearch: '',
    industry: '',
    area: '',
    active: false,
  };

  const getCustomerLogs = async () => {
    setIsLoading(true);
    const logsData: any = await DashboardInfo.getLogs(4, 'logId DESC', LogParams);
    if (logsData) {
      Promise.all(
        logsData.map((obj: LogsInfoItem) => {
          return CustomerDetailsApi.get(obj.parentId);
        })
      ).then((entityData) => {
        setNewCustomers(entityData);
        setIsLoading(false);
        return entityData;
      });
    }
  };

  const handleAddedCustomer = (type: string) => {
    if (type === 'new') {
      setShowNewCustomer(true);
      setShowInactiveCustomer(false);
    } else {
      setShowNewCustomer(false);
      setShowInactiveCustomer(true);
      if (!inactiveCustomers) {
        setIsLoading(true);
        BusinessPartnerList.get('', 4, 0, '', CustomerFilters).then((data) => {
          setInactiveCustomers(data.data.items);
          setIsLoading(false);
          return data;
        });
      }
    }
  };

  React.useEffect(() => {
    getCustomerLogs();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <p className="cardsec-title">Customer</p>
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
                      onClick={() => handleAddedCustomer('new')}>
                      Newly Added
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={showInactiveCustomer ? 'nav-link active' : 'nav-link'}
                      id="custinactive"
                      type="button"
                      onClick={() => handleAddedCustomer('inactive')}>
                      Inactive
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane fade show active" id="cust-newly-added" role="tabpanel" aria-labelledby="cust-newlyadded">
                {isLoading && <div className="text-center">{i18n.t('loadingData')}</div>}
                {showNewCustomer && (
                  <ul className="recent-customer-list">
                    {newCustomers &&
                      newCustomers.map((items: any) => {
                        return (
                          <li>
                            <p className="no-mb">{items.internalName}</p>
                            <span>{items.area}</span>
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
                            <span>{items.area}</span>
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
                  <option>Top Opportunity 1</option>
                  <option>Top Opportunity 2</option>
                  <option>Top Opportunity 3</option>
                </select>
              </div>
              <div className="col-8 text-right">
                <ul className="nav nav-tabs dsbd-tabs float-right" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a className="nav-link" id="qone" data-toggle="tab" href="#opp-qone" role="tab" aria-controls="opp-qone" aria-selected="true">
                      Q1
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link" id="qtwo" data-toggle="tab" href="#opp-qtwo" role="tab" aria-controls="opp-qtwo" aria-selected="false">
                      Q2
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="qthree"
                      data-toggle="tab"
                      href="#opp-qthree"
                      role="tab"
                      aria-controls="opp-qthree"
                      aria-selected="false">
                      Q3
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link" id="qfour" data-toggle="tab" href="#opp-qfour" role="tab" aria-controls="opp-qfour" aria-selected="false">
                      Q4
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane fade show active" id="opp-qone" role="tabpanel" aria-labelledby="qone">
                Q1 tab content goes here Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi architecto dolor similique praesentium id illo
                eveniet, quo dicta, earum fugit molestiae dolorem et, rem nisi debitis esse illum aliquid obcaecati!
              </div>
              <div className="tab-pane fade" id="opp-qtwo" role="tabpanel" aria-labelledby="qtwo">
                Q2 tab content goes here Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos odio quos maxime earum non quis eveniet
                eligendi eius quisquam magnam minus sunt aperiam, repellat voluptatum accusamus soluta dolorem? Ipsam, sunt.
              </div>
              <div className="tab-pane fade" id="opp-qthree" role="tabpanel" aria-labelledby="qthree">
                Q3 tab content goes here Dignissimos odio quos maxime earum non quis eveniet eligendi eius quisquam magnam minus sunt aperiam,
                repellat voluptatum accusamus soluta dolorem? Ipsam, sunt.
              </div>
              <div className="tab-pane fade" id="opp-qfour" role="tabpanel" aria-labelledby="qfour">
                Q4 tab content goes here Dignissimos odio quos maxime earum non quis eveniet eligendi eius quisquam magnam minus sunt aperiam,
                repellat voluptatum accusamus soluta dolorem? Ipsam, sunt.
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
                <select className="form-control dshbrd-cards-dd float-right">
                  <option>Pharma</option>
                  <option>Pharma 1</option>
                  <option>Pharma 2</option>
                  <option>Pharma 3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card-body">
            <ul className="target-customer-list">
              <li>Astra Zeneca</li>
              <li>Universal Life Science</li>
              <li>Johnson &amp; Johnson</li>
              <li>Pfizer Inc</li>
              <li>Merck &amp; Co.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboarCustomerdWidgets;
