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
    <div className="staging-highlight">
      <ul className="hbreadcrumb">
        { stages ?
          stages.map((obj) => {
            if (stage == obj.salesStage) {
              return <li><a href="#" className="active">{obj.salesStage}<span>{obj.description}</span></a></li>
            }
            return <li><a href="#">{obj.salesStage}<span>{obj.description}</span></a></li>
          }): null
        }
      </ul>
    </div>
    </>
  )
}

export default Staging
