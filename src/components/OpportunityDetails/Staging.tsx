import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { StageInfo } from '../../helpers/Api/models';
import { saveOpportunityStages } from '../../store/InitialConfiguration/Actions';
import { editOpportunity, openOpportunityForm } from '../../store/OpportunityDetails/Actions';
import { AppState } from '../../store/store';
import { APPROVAL_STATUS } from '../../config/Constants';

interface Props {
  stage: string;
  status: any;
}

const Staging: React.FC<Props> = (props) => {
  const { stage, status } = props;
  const state: AppState = useSelector((appState: AppState) => appState);
  const dispatch: Dispatch<any> = useDispatch();

  const updateStage = async (obj: StageInfo) => {
    const opportunity = state.opportuntyDetails.opportunityDefaultParams;
    opportunity.stage = obj.salesStage;
    dispatch(editOpportunity(opportunity));
  };

  React.useEffect(() => {
    if (!state.enviornmentConfigs.crmOpportunityStage.length) dispatch(saveOpportunityStages());
  }, []);

  const changeActiveStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const active: boolean = e.currentTarget.checked;
    if (active) {
      dispatch(openOpportunityForm({ open: true, groupName: 'deactivate-opportunity', action: 'edit' }));
    }
  };

  return (
    <>
      <div className="staging-highlight d-flex justify-content-between title-row">
        <div className="lft-col stages">
          <ul className="hbreadcrumb stage-lists">
            {state.enviornmentConfigs.crmOpportunityStage.map((obj: StageInfo) => {
              if (stage === obj.salesStage) {
                return (
                  <li
                    className={
                      status === APPROVAL_STATUS.NEW
                        ? 'list-inline-item active'
                        : status === APPROVAL_STATUS.REJECTED
                        ? 'list-inline-item rejected'
                        : status === APPROVAL_STATUS.SUBMITTED
                        ? 'list-inline-item submit'
                        : status === APPROVAL_STATUS.APPROVED
                        ? 'list-inline-item active'
                        : status === APPROVAL_STATUS.LOST
                        ? 'list-inline-item lost'
                        : 'list-inline-item normal'
                    }>
                    {obj.salesStage} <span>{obj.description}</span>
                  </li>
                );
              } else {
                // eslint-disable-next-line no-lonely-if
                if (state.opportuntyDetails.editOportunity.allowEdit) {
                  return (
                    <li className="list-inline-item normal" role="presentation" onClick={() => updateStage(obj)}>
                      {obj.salesStage} <span>{obj.description}</span>
                    </li>
                  );
                } else {
                  return (
                    <li className="list-inline-item normal disabled" role="presentation">
                      {obj.salesStage} <span>{obj.description}</span>
                    </li>
                  );
                }
              }
            })}
          </ul>
        </div>
        {state.opportuntyDetails.editOportunity.allowEdit ? (
          <div className="rgt-col">
            <p className="oppt-lost">Opportunity Lost</p>
            <label className="switch">
              <input type="checkbox" id="oppty-lost" onChange={changeActiveStatus} />
              <span className="slider round" />
            </label>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Staging;
