import React from 'react';
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";

import * as models from '../../helpers/Api/models';
import AddOpportunityApi from '../../helpers/Api/AddOpportunityApi';
import { get, map, partialRight, pick } from 'lodash';
import UserSearchField from '../Shared/Search/UserSearchField';

interface Props {
    reloadOpportunityDetailsPage : () => void
}

const AssignOpportunity: React.FC<Props> = ({ reloadOpportunityDetailsPage }) => {
    const state: AppState = useSelector((state: AppState) => state);
    const opportunityDetails: models.AddOpportunityDefaultParams = pick(state.opportuntyDetails.opportunityDefaultParams, ['opportunityId', 'area', 'handler', 'reason', 'endDate', 'probability', 'oppRecordType', 'estimatedValue', 'stage', 'currency', 'desc', 'customer']);
    const dispatch: Dispatch<any> = useDispatch();
    const [opportunity, setOpportunity] = React.useState<models.AddOpportunityDefaultParams>(opportunityDetails);
    const [handler, setHandler] = React.useState<string | undefined>(opportunityDetails?.handler);

    const onNextButtonClick = async () => {
        const data = await AddOpportunityApi.update(opportunity);
        reloadOpportunityDetailsPage();
    }

    const onHandlerChange = (user:models.UserItem[]) => {
        setOpportunity({
            ...opportunity,
            handler: user[0].handler
        });
        setHandler(handler);
    }


    return (
        <>
            <div className="opportunity-forms">
                <div className="">
                    <div className="form-group oppty-form-elements">
                        <label className="opp-label">Assign Opportunity</label>
                        <UserSearchField onChange={onHandlerChange} description={'Owner'} />
                    </div>
                </div>
            </div>
            <div className="step-nextbtn-with-arrow stepsone-nxtbtn" onClick={onNextButtonClick}>
                <a className={ handler !== opportunity.handler ? "stepone-next-btn done" : "stepone-next-btn inactive"}>SAVE</a>
            </div>
        </>
    )
}

export default  AssignOpportunity;