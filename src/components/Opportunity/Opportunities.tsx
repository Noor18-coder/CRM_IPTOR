import * as React from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router';

import { OpportunityState } from '../../store/Opportunity/Types';
import { AppState } from "../../store/store";
import { AuthState } from '../../store/Auth/Types';

import Grid from '../Shared/Grid/Grid';
import Header from '../Shared/Header/Header';
import { getOpportunities } from '../../store/Opportunity/Actions';

import OpportunityList from '../../helpers/Api/OpportunityList';
import ColumnDefs from '../../config/OpportunityGrid';

import { OpportunityListItem } from '../../helpers/Api/models';

import { saveOpptyList, saveOpptyFilters} from '../../store/Opportunity/Actions';

interface result {
  items: OpportunityListItem[],
  load: boolean
}

const Opportunites: React.FC = () => {

  const state: OpportunityState = useSelector((state: AppState) => state.opportunities);
  const authState: AuthState = useSelector((state: AppState) => state.auth);
  const [filter, setFilter] = React.useState<string>('all');
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();

  const openOpptyDetails = (data: any) => {
    const opptyId = data && data.opportunityId ? data.opportunityId : null;
    if (opptyId) {
      history.push({ pathname: "/opp-details", state: { oppid: opptyId } })
    }
  }

  const fetchOppty = async (start: number, orderBy: string, filter: string): Promise<result> => {
    const res: result = {
      items: [],
      load: true
    }
 
    const data: any = await OpportunityList.get(authState.user.handler, '', 20, start, orderBy, filter);
    
    if (data && data.data && data.control?.more) {
      res.items = data.data.items;

      // Saving opportunities to redux-state.
      dispatch(saveOpptyList(res.items));
      
      // Saving Handler name to redux for filter.
      const opptyTypeList = new Set( res.items.map((obj) => obj.handler ));
       opptyTypeList.forEach((obj) => {
        dispatch(saveOpptyFilters(obj));
      });

      res.load = true;
    } else {
      res.items = data.data.items;
       // Saving opportunities to redux-state.
      dispatch(saveOpptyList(res.items));
      
      // Saving Handler name to redux for filter.
      const opptyTypeList = new Set( res.items.map((obj) => obj.handler ));
       opptyTypeList.forEach((obj) => {
        dispatch(saveOpptyFilters(obj));
      });
      res.load = false;
    }
    return res;
  }



  return (
    <div>
      <Header />
      <section>
        <div className={"container-fluid"}>

          <div className={"row s-header"}>
            <div className={"col col-md-4"}>
              <div className={"page-title"}>
                {'Opportunities'}
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
        <div className={"container-fluid"}>
          {/* <GridFilter filters={filters} selectOption={onGridSort} /> */}
          <Grid col={ColumnDefs} gridRowClicked={openOpptyDetails} getDataRows={fetchOppty} ></Grid>
        </div>
      </section>
    </div>
  );
}
export default Opportunites;