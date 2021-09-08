import React from 'react';
import { useHistory } from 'react-router-dom';
import { OpportunityDetailsDefault } from '../../helpers/Api/models';
import { getCurrencySymbol, getQuarterOfYearFromDate } from '../../helpers/utilities/lib';
import ImageConfig from '../../config/ImageConfig';
import { StagesInfo } from '../../helpers/Api/StagesInfo';
import { StageInfo } from '../../helpers/Api/models/StageInfo';

export interface Data {
  data: OpportunityDetailsDefault;
}

const OpportunityInfoMobile: React.FC<Data> = (props) => {
  const history = useHistory();
  const { data } = props;

  const backToOpportunityList = () => {
    history.goBack();
  };
  const [stages, setStages] = React.useState<StageInfo[]>();
  React.useEffect(() => {
    StagesInfo.get().then((response) => setStages(response.items));
  }, []);
  return (
    // <!-- SECTION MOBILE PRODUCT NAME CARD START -->
    <section className="opp-product-mobilecard">
      <div className="d-flex justify-content-between product-name-action-row">
        <div role="presentation" className="lft-prodname" onClick={backToOpportunityList}>
          <p>
            {data.customerName} <span className="id-num">{data.customer} </span>
            <span className="location">{data.handler}, NA</span>
          </p>
        </div>
        <div className="rgt-actioncol">
          <ul className="list-inline ">
            <li className="list-inline-item">
              <img src={ImageConfig.HISTORY} alt="History" title="History" />
            </li>
            <li className="list-inline-item">
              <img src={ImageConfig.STAR} alt="Star" title="Star" />
            </li>
            <li className="list-inline-item">
              <img src={ImageConfig.MORE_V_ELLIPSIS} alt="More" title="More" />
            </li>
          </ul>
        </div>
      </div>

      <div className="status-row">
        <ul className="list-inline">
          <li className="list-inline-item grade">{data.stage}</li>
          <li className="list-inline-item open">Open</li>
          <li className="list-inline-item status">Approved</li>
        </ul>
      </div>

      <div className="qtr-details d-flex justify-content-between">
        <div className="curr-qtr">
          <p>
            <span>Close Quarter</span>
            {getQuarterOfYearFromDate(data.endDate)}
          </p>
        </div>

        <div className="deal-size">
          <p>
            <span>Deal Size</span> {`${getCurrencySymbol(data.currency)} ${data.currentValue}`}
          </p>
        </div>
      </div>

      <div className="mobsec-staging">
        <p className="title">Stage</p>

        <div className="stage-lvl">
          <div className="hscroll-wrapper">
            <ul className="list-inline stage-circles d-flex justify-content-between">
              {stages
                ? stages.map((obj) => {
                    if (data.stage === obj.salesStage) {
                      return <li className="list-inline-item active">{obj.salesStage}</li>;
                    }
                    return <li className="list-inline-item">{obj.salesStage}</li>;
                  })
                : null}
            </ul>
          </div>
          <div className="sec-change-approver d-flex justify-content-between">
            <div className="cont">Shared for approval with Lawerence Matthew</div>
            <div className="action-btn">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="txt-link">
                Change Approver
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    //   <!-- SECTION MOBILE PRODUCT NAME CARD END -->
  );
};

export default OpportunityInfoMobile;
