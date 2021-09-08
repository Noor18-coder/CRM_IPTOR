import * as React from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive'

import { getStartDateOfQuarter, getEndDateOfQuarter } from '../../helpers/utilities/lib';
import OpportunityListMobile from './OpportunityListMobile';

import { OpportunityState, OpportunityTypes } from '../../store/Opportunity/Types';
import { AppState } from "../../store/store";
import { getUsersInfo } from '../../store/Users/Actions';

import Grid from '../Shared/Grid/Grid';
import Header from '../Shared/Header/Header';

import OpportunityList from '../../helpers/Api/OpportunityList';
import ColumnDefs from '../../config/OpportunityGrid';
import {OpportunityFilterOpions} from '../../config/OpportunityFilterOptions';

import { OpportunityListItem, OpportunityListParams, StageInfo, OpportunityType } from '../../helpers/Api/models';
import { saveOpptyList, saveOpptyFilters, saveOpportunityFilters } from '../../store/Opportunity/Actions';
import { setOpportunityWindowActive } from '../../store/AddOpportunity/Actions';
import { GridFilter } from '../../components/Shared/Filter/GridFilter';
import ImageConfig from '../../config/ImageConfig';
import FooterMobile from '../Shared/Footer/FooterMobile';
import Loader from '../Shared/Loader/Loader';
import Container from '../AddOpportunity/Container';



export interface SelectOptionMethod {
  value: string;
  selectParam: string;
  handler:string;
}

interface result {
  items: OpportunityListItem[],
  load: boolean
}

const Opportunities: React.FC = (props: any) => {
  
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  const isDesktop = useMediaQuery({ minWidth: 992 })

  const state:AppState  = useSelector((state: AppState) => state);
  const customerState = props.location.state ? props.location.state: ''
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
    const userObj = state.users.users.find((obj) => obj.handler === str);
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
      filters.selectHandler = filter.handler == 'all' ? '' : state.auth.user.handler;
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

    if(filter?.selectParam == 'selectOpportunityType'){
      filters.selectOppRecordType = filter.value;
    }

    if(searchText.length){
      filters.searchField = searchText;
      }
    if(customerState){
        filters.selectCustomer = customerState.selectCustomer;
        filters.activeOp = customerState.activeOp;
    }
    const data: any = await OpportunityList.get(state.auth.user.handler, '', 20, start, orderBy, filters);
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

    const stages = state.enviornmentConfigs.crmOpportunityStage; 
    const opportunityRecordTypes = state.enviornmentConfigs.crmOpportunityTypes;

    const filterStages = stages.map((obj:StageInfo) => { return { value: obj.salesStage, selectParam: 'selectStage'}});
    const filterOpptyTypes = opportunityRecordTypes.map((obj:OpportunityType) => { return { value: obj.oppRecordType, selectParam: 'selectOpportunityType'}});

    const filterOptions = [...OpportunityFilterOpions, ...filterStages, ...filterOpptyTypes];

    dispatch(saveOpportunityFilters(filterOptions));
      if (state.opportunities.opportunities.length === 0)
          setLoader(true)
    history.replace({
        ...props.location,
        state: undefined,
    });
  }, []);

  const onFilter = (obj: SelectOptionMethod) => {
    if(filter?.handler !== obj.handler){
      selectFilter(obj);
    
    }else if(filter?.selectParam === obj.selectParam && filter.value === obj.value){
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
        setLoader(true)
    }
  }

  const searchOpportunity = (event:React.KeyboardEvent<HTMLInputElement>) => {
    
    if(event.key == 'Enter' && searchFieldValue.length > 0){
      selectFilter({ value: '',
        selectParam: '',
        handler:''});
      setSearchText(searchFieldValue);
        setRefresh(!refresh);
        setLoader(true)
    }

  }

  const toggleDrawer = (open:boolean) => (event:React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
    
    dispatch(setOpportunityWindowActive(true));
  };

  return (
    <div>
      <Header page={1}/>
      <section className="opportunities">
        <div className={"container-fluid"}>

          <div className={"row s-header"}>
    
            { isMobile ? null : <div className={"col col-md-4"}>
              <div className={"page-title"}>
                {searchText.length ? 'Showing results for "' + searchText + '"': ''}
              </div>
            </div> }

            <div className={"col col-md-4"}>
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
              <button className={"btn add-opportunity"} onClick={toggleDrawer(true)}>+ New</button>
            </div>}
          </div>
           <GridFilter filters={Array.from(state.opportunities.opportunityFilters)} selected={filter} selectOption={onFilter} component='opportunity' /> 
           {loader && <Loader component='opportunity'/>}
           { state.users.users && state.users.users.length ? ((isMobile || isTablet) ?(  state.addOpportunity.addOpptyWindowActive === false ? <OpportunityListMobile refresh={refresh} gridRowClicked={openOpptyDetails} getDataRows={fetchOppty} /> : null) : <Grid refresh={refresh} col={newColumns} gridRowClicked={openOpptyDetails} getDataRows={fetchOppty} ></Grid> ) : null}
          </div>
      </section>
   
      <footer style={{position: "fixed"}}>
        <p><img src={ImageConfig.IPTOR_LOGO_ORANGE} alt="Iptor" title="Iptor"/> &copy; All Content Copyright 2021 </p>
      </footer>
      { (isMobile || isTablet) ? <FooterMobile page={1} /> : null }
      <Container />
    </div>
  );
}
export default Opportunities;