import React from 'react'
import ImageConfig from '../../../config/ImageConfig';
import { OverlayTrigger, Popover, Image } from 'react-bootstrap'

export interface Props {
  backToOpportunityList : () => void,
  popover ?: () => void
}

export const NavSection: React.FC<Props> = ({ backToOpportunityList, popover}) => {
   const popup = popover ? popover() : null ;
    return (
        <>
        <section className="d-flex justify-content-between pagelvl-actionrow">
         <div className="lft-actionitem"><a onClick={backToOpportunityList} role="button"><img src={ImageConfig.LEFT_ARROW} alt="Back" title="Back"/></a></div>
         <div className="rgt-actionitem">
           <ul className="list-inline ">
             <li className="list-inline-item"><img src={ImageConfig.HISTORY} alt="History" title="History"/></li>
             <li className="list-inline-item"><img src={ImageConfig.STAR} alt="Star" title="Star"/></li>
             {/* <li className="list-inline-item"><img src={ImageConfig.MORE_V_ELLIPSIS} alt="More" title="More"/></li> */}
             { popup ? <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={popup}>
                   <img src={ImageConfig.MORE_V_ELLIPSIS} alt="More" title="More"/>
              </OverlayTrigger> : null }
           </ul>
         </div>
       </section> 
        </>
    )
}
