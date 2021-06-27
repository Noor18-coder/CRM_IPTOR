import React from 'react'
import { OpportunityDetailsDefault } from '../../helpers/Api/models';
import {getCurrencySymbol, getQuarterOfYearFromDate } from '../../helpers/utilities/lib';
import ImageConfig from '../../config/ImageConfig';
import OpportunityStages from '../../config/OpportunityStages';
export interface Data {

  data:OpportunityDetailsDefault

}

interface Props {
  stage: string
}
const OpportunityInfoMobile:React.FC<Data> = (props, stage) => {
    return (
        // <!-- SECTION MOBILE PRODUCT NAME CARD START -->
        <section className="opp-product-mobilecard">
        <div className="d-flex justify-content-between product-name-action-row">
          <div className="lft-prodname">
            <p>{props.data.customerName}  <span className="id-num">{props.data.customer} </span><span className="location">{props.data.handler}, NA</span></p>
          </div>
          <div className="rgt-actioncol">
            <ul className="list-inline ">
              <li className="list-inline-item"><img src={ImageConfig.HISTORY} alt="History" title="History"/></li>
              <li className="list-inline-item"><img src={ImageConfig.STAR} alt="Star" title="Star"/></li>
              <li className="list-inline-item"><img src={ImageConfig.MORE_V_ELLIPSIS} alt="More" title="More"/></li>
            </ul>
          </div>
        </div>

        <div className="status-row">
          <ul className="list-inline">
            <li className="list-inline-item grade">{stage.data}</li>
            <li className="list-inline-item open">Open</li>
            <li className="list-inline-item status">Approved</li>
          </ul>
        </div>

        <div className="qtr-details d-flex justify-content-between">
          <div className="curr-qtr">
            <p><span>Close Quarter</span>{getQuarterOfYearFromDate(props.data.endDate)}</p>
          </div>

          <div className="deal-size">
            <p><span>Deal Size</span> {getCurrencySymbol(props.data.currency) + ' ' + props.data.currentValue}</p>
          </div>
        </div>

        <div className="mobsec-staging">
          <p className="title">Stage</p>

          <div className="stage-lvl">
            <ul className="list-inline stage-circles d-flex justify-content-between">
            {
              OpportunityStages.map((obj) => {
                if (stage == obj.status) {
                  return <li className="list-inline-item active">{obj.status}</li>
                }
                return <li className="list-inline-item">{obj.status}</li>
              })
            }
            </ul>
            <div className="sec-change-approver d-flex justify-content-between">
              <div className="cont">Shared for approval with Lawerence Matthew</div>
              <div className="action-btn">
                <a href="#" className="txt-link">Change Approver</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    //   <!-- SECTION MOBILE PRODUCT NAME CARD END -->
    )
}

export default OpportunityInfoMobile
