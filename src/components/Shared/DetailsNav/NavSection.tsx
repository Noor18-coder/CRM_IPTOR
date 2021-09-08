import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import ImageConfig from '../../../config/ImageConfig';

export interface Props {
  backToOpportunityList: () => void;
  popover?: () => void;
}

export const NavSection: React.FC<Props> = ({ backToOpportunityList, popover }) => {
  const popup = popover ? popover() : null;
  return (
    <>
      <section className="d-flex justify-content-between pagelvl-actionrow">
        <div className="lft-actionitem">
          <img
            src={ImageConfig.LEFT_ARROW}
            onClick={backToOpportunityList}
            onKeyDown={backToOpportunityList}
            role="presentation"
            alt="Back"
            title="Back"
            className="action-icon"
          />
        </div>
        <div className="rgt-actionitem">
          <ul className="list-inline ">
            <li className="list-inline-item">
              <img src={ImageConfig.HISTORY} alt="History" title="History" />
            </li>
            <li className="list-inline-item">
              <img src={ImageConfig.STAR} alt="Star" title="Star" />
            </li>
            {popup ? (
              <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={popup}>
                <img src={ImageConfig.MORE_V_ELLIPSIS} alt="More" title="More" />
              </OverlayTrigger>
            ) : null}
          </ul>
        </div>
      </section>
    </>
  );
};
