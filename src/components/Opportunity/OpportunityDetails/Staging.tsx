import React from 'react'

const Staging = () => {
    return (
        // <!-- STAGING SECTION START -->
      <section className="sec-staging">
        <div className="d-flex justify-content-between title-row">
          <div className="lft-col">
            Stage
          </div>
          <div className="rgt-col">
            Shared for approval with Lawerence Matthew <a className="ghost-btn" href="#">Change Approver</a>
          </div>
        </div>

        <div className="staging-highlight">

          <ul className="hbreadcrumb">
            <li><a href="#">A0 <span>Initial</span></a></li>
            <li><a href="#">A1 <span>Initiated</span></a></li>
            <li><a href="#">A2 <span>Evaluate</span></a></li>
            <li><a href="#" className="active">A3 <span>Validate</span></a></li>
            <li><a href="#" className="ready">A4 <span>Demonstrate</span></a></li>
            <li><a href="#" className="ready">A5 <span>Negotiate</span></a></li>
            <li><a href="#">A6 <span>Closed</span></a></li>
          </ul>
        </div>
      </section>
    //   <!-- STAGING SECTION END -->
    )
}

export default Staging
