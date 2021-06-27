import React from 'react'
import OpportunityStages from '../../config/OpportunityStages';
import {StagesInfo} from '../../helpers/Api/StagesInfo';
import {StageInfo} from '../../helpers/Api/models/StageInfo'

interface Props {
  stage: string
}

const Staging: React.FC<Props> = ({ stage }) => {
  const [stages, setStages] = React.useState<StageInfo[]>();
  React.useEffect(() => {
  
      StagesInfo.get().then((data) => setStages(data.items));

}, []);
  return (
    <>
    <div className="staging-highlight d-flex justify-content-between title-row">
        <div className="lft-col">
          <ul className="hbreadcrumb">
          { stages ?
            stages.map((obj) => {
              if (stage == obj.salesStage) {
                return <li><a href="" className="active">{obj.salesStage}<span>{obj.description}</span></a></li>
              }
              return <li><a href="">{obj.salesStage}<span>{obj.description}</span></a></li>
            }): null
          }
          </ul>
        </div>
        <div className="rgt-col">
          <p className="oppt-lost">Opportunity Lost</p>
          <label className="switch">
          <input type="checkbox"/>
          <span className="slider round"></span>
          </label>
        </div>
      </div>
    </>
  )
}

export default Staging
