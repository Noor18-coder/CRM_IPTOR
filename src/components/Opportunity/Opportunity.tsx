import * as React from "react"


import { IOpportunity } from '../../store/Opportunity/Types';

type Props = {
  opportunity: IOpportunity
}

export const Opportunity: React.FC<Props> = ({ opportunity }) => {

  return (

    <div style={{ width: '400px', height: "120px" , display:'block' }}>
      <div style={{ width: '50%', height: '90%', float: "left" }}>
        <p><b>{opportunity.id}</b></p>
        <p>{opportunity.dealSize}</p>
      </div>
      <div style={{ width: '50%',height: '90%',  float: "right" }}>
        <p>{opportunity.company}</p>
        <p>{opportunity.status}</p>
      </div>
      <hr />
    </div>



  )
}