import React from 'react';

const DashboardNewsWidgets: React.FC = () => {
  return (
    <div className="row newsandupdates">
      <div className="col-12">
        <p className="cardsec-title">News &amp; Updates</p>
      </div>

      <div className="col-md-6">
        <div className="card mb-4">
          <div className="row">
            <div className="col-sm-4">
              <div className="img-holder news-img1">
                <p className="newsimg-desc">Seminar 2021 | Live</p>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="news-desc-content">
                <p className="title">
                  Seminar 2021 | Live <span className="news-dt float-right">April 2021</span>
                </p>
                <p className="news-cont">
                  Based on current developments around the COVID-19 spread, growing travel restrictions within the US Iptor customer
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  landscape, as well as recommendations from the WHO and global CDC's...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card mb-4">
          <div className="row">
            <div className="col-sm-4 col-12">
              <div className="img-holder news-img2">
                <p className="newsimg-desc">Seminar 2021 | Live</p>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="news-desc-content">
                <p className="title">
                  Seminar 2021 | Live <span className="news-dt float-right">April 2021</span>
                </p>
                <p className="news-cont">
                  Based on current developments around the COVID-19 spread, growing travel restrictions within the US Iptor customer
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  landscape, as well as recommendations from the WHO and global CDC's...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNewsWidgets;
