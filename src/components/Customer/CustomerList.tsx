import * as React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';

import { useHistory } from 'react-router';
import Header from '../Shared/Header/Header';
import FooterMobile from '../Shared/Footer/FooterMobile';
import Loader from '../Shared/Loader/Loader';
import ImageConfig from '../../config/ImageConfig';
import Grid from '../Shared/Grid/Grid';

import { AppState } from '../../store/store';
import { BusinessPartnerState } from '../../store/Customer/Types';
import ColumnDefs from '../../config/CustomerGrid';
import { BusinessPartnerListItem, BusinessPartnerListParams } from '../../helpers/Api/models/Customer';
import { saveBusinessPartnerList, saveBusinessPartnerFilters } from '../../store/Customer/Actions';
import BusinessPartnerList from '../../helpers/Api/CustomerList';
import BusinessPartnerListMobile from './CustomerListMobile';
import { setBusinessPartnerWindowActive, resetBusinessPartnerFields } from '../../store/AddCustomer/Actions';

import { GridFilter } from '../Shared/Filter/GridFilter';
import Container from '../AddCustomer/Container';

interface Result {
  items: BusinessPartnerListItem[];
  load: boolean;
}

export interface SelectOptionMethod {
  value: string;
  selectParam: string;
}

export const BusinessPartners: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  const appState: AppState = useSelector((state: AppState) => state);
  const state: BusinessPartnerState = useSelector((CustomerState: AppState) => CustomerState.businesspartners);
  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory();

  const [loader, setLoader] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchFieldValue, setSearchField] = React.useState<string>('');
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [filter, selectFilter] = React.useState<SelectOptionMethod>();
  const industryDetails = appState.enviornmentConfigs.crmIndustries;
  const areaDetails = appState.enviornmentConfigs.crmAreaInfo;

  const openBusinessPartnerDetails = (data: any) => {
    const custId = data && data.businessPartner ? data.businessPartner : null;
    if (custId) {
      history.push({ pathname: '/cust-details', state: { custId } });
    }
  };

  const fetchOppty = async (start: number, orderBy: string): Promise<Result> => {
    const res: Result = {
      items: [],
      load: true,
    };
    const filters: BusinessPartnerListParams = {
      businessPartnerTextSearch: searchText,
      searchField: '',
      includeInactive: true,
      crmAttributesTextSearch: '',
      industry: '',
      area: '',
    };
    if (filter?.selectParam === 'industry') {
      filters.industry = filter?.value;
    }
    if (filter?.selectParam === 'area') {
      filters.area = filter?.value;
    }
    const data: any = await BusinessPartnerList.get('', 20, start, orderBy, filters);
    if (data && data.data && data.data.items && data.control?.total) {
      res.items = data.data.items;
      dispatch(saveBusinessPartnerList(res.items));
      res.load = true;
    } else {
      if (data && data.data && data.data.items) {
        res.items = data.data.items;
      } else {
        res.items = [];
      }
      dispatch(saveBusinessPartnerList(res.items));
      res.load = false;
    }
    setLoader(false);
    return res;
  };

  const searchStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;
    setSearchField(str);
    if (str.length === 0) {
      setSearchText('');
      setRefresh(!refresh);
      setLoader(true);
    }
  };

  const searchBusinesspartner = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchFieldValue.length > 0) {
      selectFilter({
        value: '',
        selectParam: '',
      });
      setSearchText(searchFieldValue);
      setRefresh(!refresh);
      setLoader(true);
    }
  };

  React.useEffect(() => {
    dispatch(resetBusinessPartnerFields());
    if (state.businesspartners.length === 0) setLoader(true);
  }, []);

  React.useEffect(() => {
    _.forEach(industryDetails, function (obj) {
      _.set(obj, 'value', obj.valueField);
      _.set(obj, 'selectParam', 'industry');
    });
    _.forEach(areaDetails, function (obj) {
      _.set(obj, 'value', obj.area);
      _.set(obj, 'selectParam', 'area');
    });
    const filterArray = [...areaDetails, ...industryDetails];
    dispatch(saveBusinessPartnerFilters(filterArray));
  }, [areaDetails, industryDetails]);

  const onFilter = (obj: SelectOptionMethod) => {
    if (filter?.selectParam === obj.selectParam && filter.value === obj.value) {
      selectFilter({ ...filter, selectParam: '', value: '' });
    } else {
      selectFilter(obj);
    }
    const re = !refresh;
    setRefresh(re);
    setLoader(true);
  };

  const toggleDrawer = () => {
    dispatch(setBusinessPartnerWindowActive(true));
    document.body.classList.add('body-scroll-hidden');
  };

  return (
    <div>
      <Header page={2} />
      <section className="opportunities">
        <div className="container-fluid">
          <div className="row s-header">
            {isMobile ? null : (
              <div className="col col-md-4">
                <div className="page-title">{searchText.length ? `Showing results for "${searchText}"` : ''}</div>
              </div>
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
                      value={searchFieldValue}
                      onKeyPress={searchBusinesspartner}
                      placeholder="Search"
                    />
                    {/* Commented non-working button <button type="button" className="search-settings-button">
                      &nbsp;
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            {isMobile ? null : (
              <div className="col col-md-4 justify-content-end">
                <button className="btn add-opportunity" type="button" onClick={toggleDrawer}>
                  + New
                </button>
              </div>
            )}
          </div>
          {(isMobile || isTablet) && searchText.length && loader ? <Loader component="opportunity" /> : ''}
          {isMobile || isTablet ? (
            <>
              <GridFilter filters={Array.from(state.businessPartnerFilters)} selected={filter} selectOption={onFilter} component="customer" />
              <BusinessPartnerListMobile refresh={refresh} gridRowClicked={openBusinessPartnerDetails} getDataRows={fetchOppty} />
            </>
          ) : (
            <>
              <GridFilter filters={Array.from(state.businessPartnerFilters)} selected={filter} selectOption={onFilter} />
              {loader && <Loader component="opportunity" />}
              <Grid refresh={refresh} col={ColumnDefs} gridRowClicked={openBusinessPartnerDetails} getDataRows={fetchOppty} />
            </>
          )}
        </div>
      </section>

      <footer style={{ position: 'fixed' }}>
        <p>
          <img src={ImageConfig.IPTOR_LOGO_ORANGE} alt="Iptor" title="Iptor" /> &copy; All Content Copyright 2021{' '}
        </p>
      </footer>
      {isMobile || isTablet ? <FooterMobile page={2} /> : null}
      <Container containerType="add" />
    </div>
  );
};
