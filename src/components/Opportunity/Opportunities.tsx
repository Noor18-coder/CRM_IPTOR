import * as React from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router';

import { getStartDateOfQuarter, getEndDateOfQuarter } from '../../helpers/utilities/lib';

import { OpportunityState } from '../../store/Opportunity/Types';
import { AppState } from "../../store/store";
import { AuthState } from '../../store/Auth/Types';
import { getUsersInfo } from '../../store/Users/Actions';

import Grid from '../Shared/Grid/Grid';
import Header from '../Shared/Header/Header';
import { UsersData } from '../../store/Users/Types';

import OpportunityList from '../../helpers/Api/OpportunityList';
import ColumnDefs from '../../config/OpportunityGrid';
import {OpportunityFilterOpions} from '../../config/OpportunityFilterOptions';

import { OpportunityListItem, OpportunityListParams, OpportunityFilterItem } from '../../helpers/Api/models';
import { saveOpptyList, saveOpptyFilters, saveOpportunityFilters } from '../../store/Opportunity/Actions';
import Footer from "../Shared/Footer/Footer";
import ImageConfig from '../../config/ImageConfig';


import { GridFilter } from '../../components/Shared/Filter/GridFilter';
export interface SelectOptionMethod {
  value: string;
  selectParam: string;
  handler:string;
}

interface result {
  items: OpportunityListItem[],
  load: boolean
}

const Opportunities: React.FC = () => {

  const state: OpportunityState = useSelector((state: AppState) => state.opportunities);
  const authState: AuthState = useSelector((state: AppState) => state.auth);
  const usersData: UsersData = useSelector((state: AppState) => state.users);
  const [filter, selectFilter] = React.useState<SelectOptionMethod>();
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();


  const newColumns = ColumnDefs.map((obj: any) => {
    if (obj.field == "handler") {
      obj.cellRenderer = (params: any) => {
        let cellValue = getName(params.value);
        cellValue = cellValue ? cellValue : params.value;
        return cellValue;
      }
      return obj;
    }
    return obj;
  });

  const getName = (str: string) => {
    const userObj = usersData.users.find((obj) => obj.handler === str);
    return userObj?.description;
  }

  const openOpptyDetails = (data: any) => {
    const opptyId = data && data.opportunityId ? data.opportunityId : null;
    if (opptyId) {
      history.push({ pathname: "/opp-details", state: { oppid: opptyId } })
    }
  }

  const fetchOppty = async (start: number, orderBy: string): Promise<result> => {
    const res: result = {
      items: [],
      load: true
    };

    const filters: OpportunityListParams = {
      handler: '',
      selectHandler:  ''
    }


    if(filter?.handler){
      filters.selectHandler = filter.handler == 'all' ? '' : authState.user.handler;
    }

   
   if (filter?.selectParam == 'selectStage') {
      filters.selectStageFrom = filter?.value;
      filters.selectStageTo = filter?.value;
    }
    
    const data: any = await OpportunityList.get(authState.user.handler, '', 20, start, orderBy, filters);

    if (data && data.data && data.control?.more) {
      res.items = data.data.items;
      dispatch(saveOpptyList(res.items));
      res.load = true;
    } else {
      if(data && data.data && data.data.items){
        res.items = data.data.items;
      }else{
        res.items = []
      }
      dispatch(saveOpptyList(res.items));
       res.load = false;
    }
    return res;
  }


  React.useEffect(() => {
    dispatch(getUsersInfo());
    dispatch(saveOpportunityFilters(OpportunityFilterOpions))
  }, []);

  const onFilter = (obj: SelectOptionMethod) => {
    console.log(refresh);
    const re = !refresh;
    setRefresh(re);
    selectFilter(obj);
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
              <button className={"btn add-opportunity"} data-toggle="modal" data-target="#myModal2">+ New</button>
            </div>
          </div>
        </div>
        <div className={"container-fluid"}>
           <GridFilter filters={Array.from(state.opportunityFilters)} selected={filter} selectOption={onFilter} /> 
          {usersData.users && usersData.users.length ? <Grid col={newColumns} refresh={refresh} gridRowClicked={openOpptyDetails} getDataRows={fetchOppty} ></Grid> : null}
        </div>
      </section>
      <footer style={{position: "fixed"}}>
      <p><img src={ImageConfig.IPTOR_LOGO_ORANGE} alt="Iptor" title="Iptor"/> &copy; All Content Copyright 2021 </p>
      </footer>
    </div>
  );
}
export default Opportunities;
