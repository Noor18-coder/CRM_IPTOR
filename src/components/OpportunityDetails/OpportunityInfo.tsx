import React from 'react'
import { OpportunityDetailsDefault } from '../../helpers/Api/models';
import {getCurrencySymbol, getQuarterOfYearFromDate } from '../../helpers/utilities/lib';
import Staging from './Staging';
import InfoAccordion from './InfoAccordion'


export interface Data {
  data:OpportunityDetailsDefault
}


const OpportunityInfo:React.FC<Data> = (props) =>   {

  return (
    // <!-- PRODUCT NAME SECTION START -->
  <>
    <section className="d-flex justify-content-between sec-product-desc">
        <div className="prod-name">
          <p>{props.data.customerName} <span>{props.data.customer} | {props.data.handler}, NA</span></p>
        </div>
        <div className="mid-sec">
          <ul className="list-inline">
            <li className="list-inline-item">close quarter<span>{getQuarterOfYearFromDate(props.data.endDate)}</span></li>
            <li className="list-inline-item">Opportuity Value<span>{getCurrencySymbol(props.data.currency) + ' ' + props.data.currentValue}</span></li>
            <li className="list-inline-item">Record Type<span>{props.data.oppRecordType}</span></li>
          </ul>
        </div>

        <div className="sec-status">
          <ul className="list-inline">
            <li className="list-inline-item grade">{props.data.stage}</li>
            <li className="list-inline-item status">Approved</li>
          </ul>
        </div>
      </section>
      <section className="sec-staging">
        <div className="d-flex justify-content-between title-row">
          <div className="lft-col">
            Stage
          </div>
          <div className="rgt-col">
            Shared for approval with Lawerence Matthew <a className="ghost-btn">Change Approver</a>
          </div>
        </div>
        <Staging stage={props.data.stage}/>
      </section>
    </>

  )
}

export default OpportunityInfo
