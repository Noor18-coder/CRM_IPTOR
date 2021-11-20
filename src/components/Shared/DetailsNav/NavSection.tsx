import React from 'react';
import { useSelector } from 'react-redux';
import { OverlayTrigger } from 'react-bootstrap';
import ImageConfig from '../../../config/ImageConfig';
import * as models from '../../../helpers/Api/models';
import { AppState } from '../../../store/store';

export interface Props {
  backToOpportunityList: () => void;
  popover?: () => void;
}

export const NavSection: React.FC<Props> = ({ backToOpportunityList, popover }) => {
  const popup = popover ? popover() : null;
  const state: models.OpportunityEditOptions = useSelector((appState: AppState) => appState.opportuntyDetails.editOportunity);
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
            {
              // Commented Non- Functioning Buttons
              /* <li className="list-inline-item">
                <img src={ImageConfig.HISTORY} alt="History" title="History" />
              </li>
              <li className="list-inline-item">
                <img src={ImageConfig.STAR} alt="Star" title="Star" />
              </li> */
            }
            {popup && state.allowEdit ? (
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
