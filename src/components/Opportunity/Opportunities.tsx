import * as React from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router'; 

import { OpportunityState } from '../../store/Opportunity/Types';
import { AppState } from "../../store/store";

import Grid from '../Shared/Grid/Grid';
import Header from '../Shared/Header/Header';
import GridFilter from '../Shared/Filter/GridFilter';
import { getOpportunities } from '../../store/Opportunity/Actions';

const Opportunites: React.FC = () => {

 const state:OpportunityState = useSelector((state: AppState) => state.opportunities);
 const history = useHistory();

  const filters = [
    {
      value:'all',
      name:'All',
      active:true
    },
    {
      value:'one',
      name:'One',
      active:false
    },
    {
    value:'two',
    name:'Two',
    active:false
  },
  {
    value:'three',
    name:'Three',
    active:false
  },
  {
    value:'four',
    name:'Four',
    active:false
  }];

  const onGridSort = (key:String) => {
  }

  const dispatch: Dispatch<any> = useDispatch();

  React.useEffect(() => {
    console.log("Loading oppty");
    dispatch(getOpportunities('',100,0));
  },[]);

  const openOpptyDetails = (data:any) => {
    const opptyId = data && data.opportunityId ? data.opportunityId : null;
    if(opptyId) {
      history.push({  pathname:  "/opp-details", state: { oppid: opptyId}})
    }
  }


  return (
    <div>
      <Header />
      <section>
        <div className={"container-fluid"}>

          <div className={"row s-header"}>
            <div className={"col col-md-4"}>
              <div className={"page-title"}>
                {'Opportunities' + ( state.opportunities.length)}
              </div>
            </div>
            
            <div className={"col col-md-4"}>
              <div className={"navbar-search-overlap"}>
                <form role="search">
                  <div className={"form-group"}>
                    <div className={"input-search"}>
                      <i className={"input-search-icon wb-search"} aria-hidden="true"></i>
                      <input type="text" className={"form-control"} name="site-search" placeholder="Search" />
                      <button type="button" className={"search-settings-button"}></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className={"col col-md-4 justify-content-end"}>
              <button className={"btn add-opportunity"} data-toggle="modal" data-target="#myModal2">+ New Opportunity</button>
            </div>
          </div>
        </div>
        <GridFilter filters={filters} selectOption={onGridSort} />
        {/* { state.opportunities.length ? console.log(state.opportunities)  : null  } */}
        {state.opportunities.length ? <Grid rowData={state.opportunities} openOpptyDetails={openOpptyDetails}/>   : null  }
        
      </section>
    </div>
  );
}

export default Opportunites;