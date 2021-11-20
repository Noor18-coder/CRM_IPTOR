import * as React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive';

import { getStartDateOfQuarter, getEndDateOfQuarter, getCurrencySymbol } from '../../helpers/utilities/lib';
import OpportunityListMobile from './OpportunityListMobile';

import { AppState } from '../../store/store';
import { getUsersInfo } from '../../store/Users/Actions';

import Grid, { SortModel } from '../Shared/Grid/Grid';
import Header from '../Shared/Header/Header';

import OpportunityList from '../../helpers/Api/OpportunityList';
import ColumnDefs from '../../config/OpportunityGrid';
import { OpportunityFilterOpions } from '../../config/OpportunityFilterOptions';

import { OpportunityListItem, OpportunityListParams, StageInfo, OpportunityType } from '../../helpers/Api/models';
import {
  saveOpptyList,
  saveOpportunityFilters,
  saveOpptySelFilters,
  saveOpptySelHandler,
  saveOpptySearchText,
  saveOpptySortOrder,
} from '../../store/Opportunity/Actions';
import { setOpportunityWindowActive } from '../../store/AddOpportunity/Actions';
import { GridFilter } from '../Shared/Filter/GridFilter';
import ImageConfig from '../../config/ImageConfig';
import FooterMobile from '../Shared/Footer/FooterMobile';
import Loader from '../Shared/Loader/Loader';
import Container from '../AddOpportunity/Container';
import { Constants } from '../../config/Constants';

export interface SelectOptionMethod {
  value: string;
  selectParam: string;
  handler?: string;
}

interface Result {
  items: OpportunityListItem[];
  load: boolean;
}

const Opportunities: React.FC<any> = (props: any) => {
  const {
    location: { state },
  } = props;
  const isMobile = useMediaQuery({ maxWidth: 767.98 });
  // const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  const oppState: AppState = useSelector((appState: AppState) => appState);
  const customerState = state;
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>(oppState.opportunities.opportunitySearchText ?? '');
  const [loader, setLoader] = React.useState<boolean>(false);
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();
  const newColumns = ColumnDefs.map((obj: any) => {
    if (obj.field === 'userId') {
      obj.cellRenderer = (params: any) => {
        let cellValue = getName(params.value);
        cellValue = cellValue || params.value;
        return cellValue;
      };
      return obj;
    } else if (obj.field === 'estValueSys') {
      obj.cellRenderer = (params: any) => {
        const CurrencySymbol =
          oppState.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA &&
          getCurrencySymbol(oppState.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA);
        const renderValue = params.value === undefined ? '' : `${CurrencySymbol} ${Math.round(params.value)}`;
        return `<span class="o-size">${renderValue}</span></div>`;
      };
      return obj;
    }
    return obj;
  });

  const getName = (str: string) => {
    const userObj = oppState.users.users.find((obj) => obj.user === str);
    return userObj?.description;
  };

  const openOpptyDetails = (data: any) => {
    const opptyId = data && data.opportunityId ? data.opportunityId : null;
    if (opptyId) {
      history.push({ pathname: '/opp-details', state: { oppid: opptyId } });
    }
  };

  const onSortChanged = (sortModel: SortModel[]) => {
    dispatch(saveOpptySortOrder(sortModel));
  };

  const fetchOppty = async (start: number, orderBy: string): Promise<Result> => {
    const res: Result = {
      items: [],
      load: true,
    };
    const filters: OpportunityListParams = {
      selectUserId: '',
    };
    const filter = { ...oppState.opportunities.opportunitySelectedFilters };
    if (filter?.handler) {
      if (customerState && !oppState.opportunities.opportunityHandlerChange) {
        filters.selectUserId = '';
        dispatch(saveOpptySelFilters({ handler: 'all' }));
        dispatch(saveOpptySelHandler('all'));
      } else {
        filters.selectUserId = filter.handler === 'all' ? '' : oppState.auth.user.user;
      }
    }

    if (filter?.selectParam === 'selectStage') {
      filters.selectStageFrom = filter?.value;
      filters.selectStageTo = filter?.value;
    }

    if (filter?.selectParam === 'selectQtr') {
      const qtr = filter.value[1];
      const qtrNum = parseInt(qtr, 10);

      filters.selectCloseDateFrom = getStartDateOfQuarter(qtrNum);
      filters.selectCloseDateTo = getEndDateOfQuarter(qtrNum);
    }

    if (filter?.selectParam === 'selectOpportunityType') {
      filters.selectOppRecordType = filter.value;
    }

    if (oppState.opportunities.opportunitySearchText.length) {
      filters.searchField = oppState.opportunities.opportunitySearchText;
    }

    if (customerState) {
      filters.selectCustomer = customerState.selectCustomer;
      filters.activeOp = customerState.activeOp;
    }
    if (oppState.opportunities.opportunities.length === 0) setLoader(true);
    const data: any = await OpportunityList.get(Constants.OPPORTUNITY_LIST_LOAD_LIMIT, start, orderBy, filters);
    if (data && data.data && data.control?.more) {
      res.items = data.data.items;
      dispatch(saveOpptyList(res.items));
      res.load = true;
    } else {
      if (data && data.data && data.data.items) {
        res.items = data.data.items;
      } else {
        res.items = [];
      }
      dispatch(saveOpptyList(res.items));
      res.load = false;
    }
    setLoader(false);
    return res;
  };

  React.useEffect(() => {
    dispatch(getUsersInfo());

    const stages = oppState.enviornmentConfigs.crmOpportunityStage;
    const opportunityRecordTypes = oppState.enviornmentConfigs.crmOpportunityTypes;

    const filterStages = stages.map((obj: StageInfo) => {
      return { value: obj.salesStage, selectParam: 'selectStage' };
    });
    const filterOpptyTypes = opportunityRecordTypes.map((obj: OpportunityType) => {
      return { value: obj.oppRecordType, selectParam: 'selectOpportunityType' };
    });

    const filterOptions = [...OpportunityFilterOpions, ...filterStages, ...filterOpptyTypes];

    dispatch(saveOpportunityFilters(filterOptions));
    // if (oppState.opportunities.opportunities.length === 0) setLoader(true);
  }, []);

  const onHandlerSelection = (handler: string) => {
    dispatch(saveOpptySelHandler(handler));
  };

  const onFilter = (obj: SelectOptionMethod) => {
    const filter = { ...oppState.opportunities.opportunitySelectedFilters };
    if (filter?.handler !== obj.handler) {
      dispatch(saveOpptySelFilters(obj));
    } else if (filter?.selectParam === obj.selectParam && filter.value === obj.value) {
      dispatch(saveOpptySelFilters({ ...filter, selectParam: '', value: '' }));
    } else {
      dispatch(saveOpptySelFilters(obj));
    }
    const re = !refresh;
    setRefresh(re);
    setLoader(true);
  };

  const searchStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;
    setSearchText(str);
    if (str.length === 0 && oppState.opportunities.opportunitySearchText.length > 0) {
      dispatch(saveOpptySearchText(''));
      setRefresh(!refresh);
      setLoader(true);
    }
  };

  const searchOpportunity = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchText.length > 0) {
      dispatch(saveOpptySearchText(searchText));

      setRefresh(!refresh);
      setLoader(true);
    }
  };

  const toggleDrawer = () => {
    dispatch(setOpportunityWindowActive(true));
  };

  const clearState = () => {
    history.replace({
      ...props.location,
      state: undefined,
    });
    window.location.reload();
  };

  const renderSearchText = () => {
    if (oppState.opportunities.opportunitySearchText.length) {
      return `Showing results for "${oppState.opportunities.opportunitySearchText}"`;
    } else if (customerState && customerState.flag !== 'pipelineData') {
      return `Showing results for "${customerState.customerName}"`;
    }
    return '';
  };

  const renderGrid = () => {
    if (isMobile) {
      if (oppState.addOpportunity.addOpptyWindowActive === false) {
        return <OpportunityListMobile refresh={refresh} getDataRows={fetchOppty} />;
      }
      return null;
    }

    return (
      <Grid
        refresh={refresh}
        col={newColumns}
        gridRowClicked={openOpptyDetails}
        getDataRows={fetchOppty}
        sortChanged={onSortChanged}
        sortOrder={oppState.opportunities.opportunitySortOrder}
      />
    );
  };

  return (
    <div>
      <Header page={1} />
      <section className="opportunities">
        <div className="container-fluid">
          <div className="row s-header">
            {isMobile ? null : (
              <>
                <div className="col col-md-4">
                  <div className="page-title">{renderSearchText()}</div>
                  {state && state.flag !== 'pipelineData' && (
                    <button className="link-anchor-button" onClick={clearState} type="button">
                      <img src={ImageConfig.CLOSE_BTN_RED} alt="Cross Icon" className="btn-icon clear-icon" />
                    </button>
                  )}
                </div>
              </>
            )}

            <div className="col col-md-4">
              <div className="navbar-search-overlap">
                <div className="form-group">
                  <div className="input-search">
                    <i className="input-search-icon wb-search" aria-hidden="true" />
                    <input
                      type="text"
                      className="form-control sitesearch"
                      onChange={searchStart}
                      value={searchText}
                      onKeyPress={searchOpportunity}
                      placeholder="Search"
                    />
                    {/* Commented non-working button <button type="button" aria-label="Search" className="search-settings-button" /> */}
                  </div>
                </div>
              </div>
            </div>

            {isMobile ? null : (
              <div className="col col-md-4 justify-content-end">
                <button className="btn add-opportunity" type="button" onClick={toggleDrawer} aria-label="New">
                  + NEW
                </button>
              </div>
            )}
          </div>
          {loader && <Loader />}
          <GridFilter
            filters={Array.from(oppState.opportunities.opportunityFilters)}
            selected={oppState.opportunities.opportunitySelectedFilters}
            selectedHandler={customerState ? 'all' : oppState.opportunities.opportunitySelectedHandler}
            selectOption={onFilter}
            selectHandler={onHandlerSelection}
            component="opportunity"
          />
          {oppState.users.users && oppState.users.users.length ? renderGrid() : null}
        </div>
      </section>

      <footer style={{ position: 'fixed' }}>
        <p>
          <img src={ImageConfig.IPTOR_LOGO_ORANGE} alt="Iptor" title="Iptor" /> &copy; All Content Copyright 2021{' '}
        </p>
      </footer>
      {isMobile ? <FooterMobile page={1} /> : null}
      <Container />
    </div>
  );
};
export default Opportunities;
