import React from 'react';
import { useSelector } from 'react-redux';
import { pick } from 'lodash';
import { AppState } from '../../store/store';

import * as models from '../../helpers/Api/models';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import UserSearchField from '../Shared/Search/UserSearchField';

interface Props {
  reloadOpportunityDetailsPage: () => void;
}

const AssignOpportunity: React.FC<Props> = ({ reloadOpportunityDetailsPage }) => {
  const state: AppState = useSelector((appState: AppState) => appState);
  const opportunityDetails: models.AddOpportunityDefaultParams = pick(state.opportuntyDetails.opportunityDefaultParams, [
    'opportunityId',
    'area',
    'handler',
    'reason',
    'endDate',
    'probability',
    'oppRecordType',
    'estimatedValue',
    'stage',
    'currency',
    'desc',
    'customer',
  ]);
  const [opportunity, setOpportunity] = React.useState<models.AddOpportunityDefaultParams>(opportunityDetails);
  const [handler, setHandler] = React.useState<string | undefined>(opportunityDetails?.handler);

  const onNextButtonClick = () => {
    AddOpportunityApi.update(opportunity).then(() => {
      reloadOpportunityDetailsPage();
    });
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
