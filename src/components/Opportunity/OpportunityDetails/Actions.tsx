import React from 'react'
import ImageConfig from '../../../config/ImageConfig';

const Actions = () => {
    return (
         // <!-- ACTION ROW START -->
         <section className="d-flex justify-content-between pagelvl-actionrow">
         <div className="lft-actionitem"><img src={ImageConfig.LEFT_ARROW} alt="Back" title="Back"/></div>
         <div className="rgt-actionitem">
           <ul className="list-inline ">
             <li className="list-inline-item"><img src={ImageConfig.HISTORY} alt="History" title="History"/></li>
             <li className="list-inline-item"><img src={ImageConfig.STAR} alt="Star" title="Star"/></li>
             <li className="list-inline-item"><img src={ImageConfig.MORE_V_ELLIPSIS} alt="More" title="More"/></li>
           </ul>
         </div>
       </section>
       //  <!-- ACTION ROW END -->
    )
}

export default Actions
