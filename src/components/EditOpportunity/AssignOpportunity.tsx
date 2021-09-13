import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { pick } from 'lodash';
import { AppState } from '../../store/store';

import * as models from '../../helpers/Api/models';
import UserSearchField from '../Shared/Search/UserSearchField';
import { editOpportunity } from '../../store/OpportunityDetails/Actions';

const AssignOpportunity: React.FC = () => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();
  const opportunityDetails: models.AddOpportunityDefaultParams = pick(state.opportuntyDetails.opportunityDefaultParams, ['opportunityId', 'handler']);
  const [opportunity, setOpportunity] = React.useState<models.AddOpportunityDefaultParams>(opportunityDetails);
  const [handler, setHandler] = React.useState<string | undefined>(opportunityDetails?.handler);

  const onNextButtonClick = () => {
    dispatch(editOpportunity(opportunity));
  };

  const onHandlerChange = (user: models.UserItem[]) => {
    if (user && user.length) {
      setOpportunity({
        ...opportunity,
        handler: user[0].handler,
      });
      setHandler(handler);
    }
  };

  return (
    <>
      <div className="opportunity-edit-form">
        <div className="">
          <div className="form-group oppty-form-elements">
            <label htmlFor="owner" className="opp-label">
              Assign Opportunity
            </label>
            <UserSearchField onChange={onHandlerChange} description="Owner" />
          </div>
        </div>
      </div>
      <div className="step-nextbtn-with-arrow stepsone-nxtbtn">
        <button
          type="button"
          className={handler !== opportunity.handler ? 'stepone-next-btn done' : 'stepone-next-btn inactive'}
          onClick={onNextButtonClick}>
          Done
        </button>
      </div>
    </>
  );
};

export default AssignOpportunity;
