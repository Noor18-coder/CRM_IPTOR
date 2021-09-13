import React from 'react';
import LineChart from '../Shared/Chart/LineChart';
import StackBarChart from '../Shared/Chart/StackBarChart';
import DashboarCustomerdWidgets from './DashboardCustomerWidgets';
import DashboardNewsWidgets from './DashboardNewsWidgets';

const DashboardWidgets: React.FC = () => {
  return (
    <div className="dashboard-cards-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <p className="cardsec-title">Opportunity</p>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card mb-2">
              <div className="card-title-row">
                <div className="row">
                  <div className="col-4">
                    <select className="form-control dshbrd-cards-dd">
                      <option>Won vs Lost</option>
                      <option>Card 1 DD</option>
                      <option>Card 1 DD</option>
                      <option>Card 1 DD</option>
                      <option>Card 1 DD</option>
                      <option>Card 1 DD</option>
                    </select>
                  </div>
                  <div className="col-8 text-right">
                    <ul className="nav nav-tabs dsbd-tabs float-right" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="day-tab"
                          data-toggle="tab"
                          href="#opp-day"
                          role="tab"
                          aria-controls="opp-day"
                          aria-selected="true">
                          Day
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="month-tab"
                          data-toggle="tab"
                          href="#opp-month"
                          role="tab"
                          aria-controls="opp-month"
                          aria-selected="false">
                          Month
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          id="year-tab"
                          data-toggle="tab"
                          href="#opp-year"
                          role="tab"
                          aria-controls="opp-year"
                          aria-selected="false">
                          Year
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="tab-content">
                  <LineChart />
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
                      <option>All Region</option>
                      <option>Region 1</option>
                      <option>Region 2</option>
                    </select>
                  </div>
                  <div className="col-8 text-right">
                    <ul className="nav nav-tabs dsbd-tabs float-right" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="day-tab"
                          data-toggle="tab"
                          href="#region-day"
                          role="tab"
                          aria-controls="region-day"
                          aria-selected="true">
                          Day
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="month-tab"
                          data-toggle="tab"
                          href="#region-month"
                          role="tab"
                          aria-controls="region-month"
                          aria-selected="false">
                          Month
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          id="year-tab"
                          data-toggle="tab"
                          href="#region-year"
                          role="tab"
                          aria-controls="region-year"
                          aria-selected="false">
                          Year
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="tab-content">
                  <StackBarChart />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card mb-2">
              <div className="card-title-row">
                <div className="row">
                  <div className="col-6">
                    <p className="card-title">Pipline</p>
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
                <div className="row">
                  <div className="col-4 pipeline-items">
                    08 <span>Pharma</span>
                  </div>
                  <div className="col-4 pipeline-items">
                    03 <span>Supply Chain</span>
                  </div>
                  <div className="col-4 pipeline-items">
                    11 <span>Manufacturing</span>
                  </div>
                  <div className="col-4 pipeline-items">
                    12 <span>Automotive</span>
                  </div>
                  <div className="col-4 pipeline-items">
                    06 <span>Lifestyle</span>
                  </div>
                  <div className="col-4 pipeline-items">
                    00 <span>Media</span>
                  </div>
                  <div className="col-4 pipeline-items">
                    02 <span>Life Science</span>
                  </div>
                  <div className="col-4 pipeline-items">
                    15 <span>Diagnostics</span>
                  </div>
                  <div className="col-4 pipeline-items">
                    09 <span>Healthcare</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DashboarCustomerdWidgets />
        <DashboardNewsWidgets />
      </div>
    </div>
  );
};

export default DashboardWidgets;
