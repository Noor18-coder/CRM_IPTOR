import React from 'react'

export interface Props {
  groupName:string;
}


export const GroupSection:React.FC<Props> = ({
   groupName,
  }) => {
    return (
        <section className="d-flex sec-customer-desc">
        <div className="cust-name">
          <p>{groupName}</p>
        </div>
        <div className="group-sec">
          <ul className="list-inline">
          <li className="list-inline-item"><span className="cust-info">2 ACTIVE</span> </li>
          <li className="list-inline-item"><span className="cust-info">5 CLOSED</span></li>
          <li className="list-inline-item"><span className="cust-info">9 TOTAL</span></li>
          </ul>
        </div>
      </section>
    )
};
