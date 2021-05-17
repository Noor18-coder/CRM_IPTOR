import React from 'react'

const ProductMobile = () => {
    return (
        // <!-- SECTION MOBILE PRODUCT NAME CARD START -->
        <section className="opp-product-mobilecard">
        <div className="d-flex justify-content-between product-name-action-row">
          <div className="lft-prodname">
            <p>Dell Laptops <span className="id-num">8900129</span><span className="location">Astra Zeneca, NA</span></p>
          </div>
          <div className="rgt-actioncol">
            <ul className="list-inline ">
              <li className="list-inline-item"><img src="../assets/images/history.svg" alt="History" title="History"/></li>
              <li className="list-inline-item"><img src="../assets/images/star.svg" alt="Star" title="Star"/></li>
              <li className="list-inline-item"><img src="../assets/images/more-v-ellipsis.svg" alt="More" title="More"/></li>
            </ul>
          </div>
        </div>

        <div className="status-row">
          <ul className="list-inline">
            <li className="list-inline-item grade">A3</li>
            <li className="list-inline-item open">Open</li>
            <li className="list-inline-item status">Approved</li>
          </ul>
        </div>

        <div className="qtr-details d-flex justify-content-between">
          <div className="curr-qtr">
            <p><span>Close Quarter</span>Q2</p>
          </div>

          <div className="deal-size">
            <p><span>Deal Size</span> $ 36.7K</p>
          </div>
        </div>

        <div className="mobsec-staging">
          <p className="title">Stage</p>

          <div className="stage-lvl">
            <ul className="list-inline stage-circles d-flex justify-content-between">
              <li className="list-inline-item">A0</li>
              <li className="list-inline-item">A1</li>
              <li className="list-inline-item">A2</li>
              <li className="list-inline-item active">A3</li>
              <li className="list-inline-item ready">A4</li>
              <li className="list-inline-item ready">A5</li>
              <li className="list-inline-item">A6</li>
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

export default ProductMobile
