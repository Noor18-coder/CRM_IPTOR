import * as React from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { AddOpportunity } from './AddOpportunity';

import { addOpportunity  } from "../../store/Opportunity/Actions";
import { Dispatch } from "redux"
import { AppState } from '../../store/store';
import { Opportunity } from './Opportunity';
import { IOpportunity } from "../../store/Opportunity/Types";


const ShowTeams: React.FC = () => {
 

  const state : AppState = useSelector(
    (state: AppState) => state
  );

 

  const dispatch: Dispatch<any> = useDispatch()

  const saveOppty = React.useCallback(
    (opportunity: IOpportunity) => dispatch(addOpportunity(opportunity)),
    [dispatch]
  )

  return (
    <div>
        <h1>Opportunities</h1>
       <AddOpportunity saveOppty={saveOppty} />
       {/* {state.loading ? <h3>Loading</h3> : null} */}
   { state.opportunities.opportunities.map((oppty: IOpportunity) => <Opportunity opportunity={oppty} /> )}   
      {/* {console.log(teams)} */}

    </div>
  );
}

export default ShowTeams;