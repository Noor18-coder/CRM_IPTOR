import * as React from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive'

import { getStartDateOfQuarter, getEndDateOfQuarter } from '../../helpers/utilities/lib';
import OpportunityListMobile from './OpportunityListMobile';

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
import { GridFilter } from '../../components/Shared/Filter/GridFilter';
import Search from '../Shared/Search/Search';
import ImageConfig from '../../config/ImageConfig';
import FooterMobile from '../Shared/Footer/FooterMobile';
import Loader from '../Shared/Loader/Loader'



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
  
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  const isDesktop = useMediaQuery({ minWidth: 992 })

  const state: OpportunityState = useSelector((state: AppState) => state.opportunities);
  const authState: AuthState = useSelector((state: AppState) => state.auth);
  const usersData: UsersData = useSelector((state: AppState) => state.users);
  const [filter, selectFilter] = React.useState<SelectOptionMethod>();
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchFieldValue, setSearchField] = React.useState<string>('');
  const [loader, setLoader] = React.useState<boolean>(false);
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

    if (filter?.selectParam == 'selectQtr') {
      let qtr = filter.value[1];
      const qtrNum = parseInt(qtr);

      filters.selectCloseDateFrom = getStartDateOfQuarter(qtrNum);
      filters.selectCloseDateTo = getEndDateOfQuarter(qtrNum);
    }

    if(searchText.length){
      filters.searchField = searchText;
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
      setLoader(false)
    return res;
  }


  React.useEffect(() => {
    dispatch(getUsersInfo());
      dispatch(saveOpportunityFilters(OpportunityFilterOpions))
      if (state.opportunities.length === 0)
          setLoader(true)
  }, []);

  const onFilter = (obj: SelectOptionMethod) => {
    if(filter?.selectParam === obj.selectParam && filter.value === obj.value){
      selectFilter({...filter, selectParam:'', value:''});
    }else {
      selectFilter(obj);
    }
    const re = !refresh;
    setRefresh(re);
    setLoader(true)
  }

  const searchStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;
    setSearchField(str)
    if(str.length === 0){
      setSearchText('');
      setRefresh(!refresh);
    }
  }

  const searchOpportunity = (event:React.KeyboardEvent<HTMLInputElement>) => {
    
    if(event.key == 'Enter' && searchFieldValue.length > 3){
      selectFilter({ value: '',
        selectParam: '',
        handler:''});
      setSearchText(searchFieldValue);
      setRefresh(!refresh);
    }

  }




  return (
    <div>
      <Header />
      <section className="opportunities">
        <div className={"container-fluid"}>

          <div className={"row s-header"}>
    
            { isMobile ? null : <div className={"col col-md-4"}>
              <div className={"page-title"}>
                {searchText.length ? 'Showing results for "' + searchText + '"': ''}
              </div>
            </div> }

            <div className={"col col-md-4"}>
              {/* <Search onChange={searchStart} onSearchItemSelect={openOpptyDetails} onSearch={searchOpportunity} /> */}
              <div className="navbar-search-overlap">
                <div className="form-group">
                    <div className="input-search">
                      <i className="input-search-icon wb-search" aria-hidden="true"></i>
                      <input type="text" className="form-control sitesearch" onChange={searchStart} value={searchFieldValue} onKeyPress={searchOpportunity}  placeholder="Search" />
                      <button type="button" className="search-settings-button"></button>
                    </div>
                  </div>
                
              </div>
            </div>

            { isMobile ? null : <div className={"col col-md-4 justify-content-end"}>
              <button className={"btn add-opportunity"} data-toggle="modal" data-target="#myModal2">+ New</button>
            </div>}
          </div>
           <GridFilter filters={Array.from(state.opportunityFilters)} selected={filter} selectOption={onFilter} /> 
           {loader && <Loader component='opportunity'/>}
           { usersData.users && usersData.users.length ? ((isMobile || isTablet) ? <OpportunityListMobile refresh={refresh} gridRowClicked={openOpptyDetails} getDataRows={fetchOppty} /> : <Grid refresh={refresh} col={newColumns} gridRowClicked={openOpptyDetails} getDataRows={fetchOppty} ></Grid> ) : null}
          </div>
      </section>
   
      <footer style={{position: "fixed"}}>
        <p><img src={ImageConfig.IPTOR_LOGO_ORANGE} alt="Iptor" title="Iptor"/> &copy; All Content Copyright 2021 </p>
      </footer>
      { (isMobile || isTablet) ? <FooterMobile /> : null }
    </div>
  );
}
export default Opportunities;