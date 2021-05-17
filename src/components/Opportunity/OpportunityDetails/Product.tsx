import React from 'react'
import { DetailsData} from '../../../mocks/OpportunityDetails.mock';

export interface Data {

  data:DetailsData

}
const Product:React.FC<Data> = (props) =>   {

  return (
    // <!-- PRODUCT NAME SECTION START -->
    <section className="d-flex justify-content-between sec-product-desc">
        <div className="prod-name">
          <p>{props.data.customerName} <span>{props.data.customer} | {props.data.handler}, NA</span></p>
        </div>
        <div className="mid-sec">
          <ul className="list-inline">
            <li className="list-inline-item">close quarter<span>Q2</span></li>
            <li className="list-inline-item">deal size<span>$ 36.7K</span></li>
            <li className="list-inline-item">Type<span>License</span></li>
          </ul>
        </div>

        <div className="sec-status">
          <ul className="list-inline">
            <li className="list-inline-item grade">{props.data.stage}</li>
            <li className="list-inline-item status">Approved</li>
          </ul>
        </div>
      </section>
        // <!-- PRODUCT NAME SECTION END -->
  )
}

export default Product
