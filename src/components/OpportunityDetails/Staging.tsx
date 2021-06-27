import React from 'react'
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { StageInfo } from '../../helpers/Api/models/StageInfo'
import { saveOpportunityStages } from '../../store/InitialConfiguration/Actions';
import { AppState } from "../../store/store";


interface Props {
  stage: string
}

const Staging: React.FC<Props> = ({ stage }) => {
  const state: AppState = useSelector((state: AppState) => state);
  const dispatch: Dispatch<any> = useDispatch();

  React.useEffect(() => {
    if (!state.enviornmentConfigs.crmOpportunityStage.length)
      dispatch(saveOpportunityStages());
  }, []);

  return (
    <>
      <div className="staging-highlight d-flex justify-content-between title-row">
        <div className="lft-col">
          <ul className="hbreadcrumb">
            {state.enviornmentConfigs.crmOpportunityStage.map((obj: StageInfo) => {
              if (stage == obj.salesStage) {
                return <li><a href="" className="active">{obj.salesStage}<span>{obj.description}</span></a></li>
              }
              return <li><a href="">{obj.salesStage}<span>{obj.description}</span></a></li>
            })
            }
          </ul>
        </div>
        <div className="rgt-col">
          <p className="oppt-lost">Opportunity Lost</p>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </>
  )
}

export default Staging
