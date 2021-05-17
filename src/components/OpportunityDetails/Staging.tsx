import React from 'react'
import OpportunityStages from '../../config/OpportunityStages';

interface Props {
  stage: string
}

const Staging: React.FC<Props> = ({ stage }) => {
  return (
    <div className="staging-highlight">
      <ul className="hbreadcrumb">
        {
          OpportunityStages.map((obj) => {
            if (stage == obj.status) {
              return <li><a href="#" className="active">{obj.status}<span>{obj.name}</span></a></li>
            }
            return <li><a href="#">{obj.status}<span>{obj.name}</span></a></li>
          })
        }
      </ul>
    </div>
  )
}

export default Staging
