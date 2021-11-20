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
import { BusinessPartnerListItem, BusinessPartnerListParams, SelectOptionMethod } from '../../helpers/Api/models/Customer';
import {
  saveBusinessPartnerList,
  saveBusinessPartnerFilters,
  saveBusinessPartnerSelectedFilter,
  saveBusinessPartnerSearchText,
} from '../../store/Customer/Actions';
import BusinessPartnerList from '../../helpers/Api/CustomerList';
import BusinessPartnerListMobile from './CustomerListMobile';
import { setBusinessPartnerWindowActive, resetBusinessPartnerFields } from '../../store/AddCustomer/Actions';
import { getCustomerIndustry } from '../../store/InitialConfiguration/Actions';

import { GridFilter } from '../Shared/Filter/GridFilter';
import Container from '../AddCustomer/Container';
import { Constants } from '../../config/Constants';

interface Result {
  items: BusinessPartnerListItem[];
  load: boolean;
}

export const BusinessPartners: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767.98 });
  const appState: AppState = useSelector((appstate: AppState) => appstate);
  const state: BusinessPartnerState = useSelector((CustomerState: AppState) => CustomerState.businesspartners);
  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory();

  const [loader, setLoader] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>(appState.businesspartners.businessPartnerSearchText);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const industryDetails = appState.enviornmentConfigs.crmIndustries;
  const areaDetails = appState.enviornmentConfigs.crmAreaInfo;

  const newColumns = ColumnDefs.map((obj: any) => {
    if (obj.field === 'owner') {
      obj.cellRenderer = (params: any) => {
        if (params.value) {
          let cellValue = getName(params.value);
          cellValue = cellValue || params.value;
          return cellValue;
        } else {
          return '';
        }
      };
      return obj;
    }
    return obj;
  });

  const getName = (str: string) => {
    const userObj = appState.users.users.find((obj) => obj.user === str);
    return userObj?.description;
  };

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
    const filter = { ...appState.businesspartners.businessPartnerSelectedFilter };
    if (filter?.selectParam === 'industry') {
      filters.industry = filter?.value;
    }
    if (filter?.selectParam === 'area') {
      filters.area = filter?.value;
    }

    const data: any = await BusinessPartnerList.get('', 20, start, orderBy, filters);
    if (data && data.data && data.data.items && data.data.items.length > Constants.CUSTOMER_RECORD_COUNT) {
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
    dispatch(saveBusinessPartnerSearchText(str));
    if (str.length === 0) {
      setSearchText('');
      setRefresh(!refresh);
      setLoader(true);
    }
  };

  const searchBusinesspartner = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && appState.businesspartners.businessPartnerSearchText.length > 0) {
      dispatch(saveBusinessPartnerSelectedFilter({ value: '', selectParam: '' }));
      setSearchText(appState.businesspartners.businessPartnerSearchText);
      setRefresh(!refresh);
      setLoader(true);
    }
  };

  React.useEffect(() => {
    dispatch(resetBusinessPartnerFields());
    if (state.businesspartners.length === 0) setLoader(true);
  }, []);

  React.useEffect(() => {
    if (industryDetails.length) {
      _.forEach(industryDetails, (obj) => {
        _.set(obj, 'value', obj.valueField);
        _.set(obj, 'selectParam', 'industry');
      });
    } else {
      dispatch(getCustomerIndustry());
    }
    _.forEach(areaDetails, (obj) => {
      _.set(obj, 'value', obj.area);
      _.set(obj, 'selectParam', 'area');
    });
    const filterArray = [...areaDetails, ...industryDetails];
    dispatch(saveBusinessPartnerFilters(filterArray));
  }, [areaDetails, industryDetails]);

  const onFilter = (obj: SelectOptionMethod) => {
    const filter = appState.businesspartners.businessPartnerSelectedFilter;
    if (filter?.selectParam === obj.selectParam && filter.value === obj.value) {
      dispatch(saveBusinessPartnerSelectedFilter({ ...filter, selectParam: '', value: '' }));
    } else {
      dispatch(saveBusinessPartnerSelectedFilter(obj));
    }
    const re = !refresh;
    setRefresh(re);
    setLoader(true);
  };

  const toggleDrawer = () => {
    dispatch(setBusinessPartnerWindowActive(true));
    document.body.classList.add('body-scroll-hidden');
  };

  const renderRearchText = searchText.length ? `Showing results for "${searchText}"` : '';

  return (
    <div>
      <Header page={2} />
      <section className="opportunities">
        <div className="container-fluid">
          <div className="row s-header">
            {isMobile ? null : (
              <div className="col col-md-4">
                <div className="page-title">{renderRearchText}</div>
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
                      value={appState.businesspartners.businessPartnerSearchText}
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
          {isMobile && searchText.length && loader ? <Loader component="opportunity" /> : ''}
          {isMobile ? (
            <>
              <GridFilter
                filters={Array.from(state.businessPartnerFilters)}
                selected={appState.businesspartners.businessPartnerSelectedFilter}
                selectOption={onFilter}
                component="customer"
              />
              <BusinessPartnerListMobile
                refresh={refresh}
                gridRowClicked={openBusinessPartnerDetails}
                getDataRows={fetchOppty}
                searchLoader={loader}
              />
            </>
          ) : (
            <>
              <GridFilter
                filters={Array.from(state.businessPartnerFilters)}
                selected={appState.businesspartners.businessPartnerSelectedFilter}
                selectOption={onFilter}
              />
              {loader && <Loader component="opportunity" />}
              <Grid refresh={refresh} col={newColumns} gridRowClicked={openBusinessPartnerDetails} getDataRows={fetchOppty} />
            </>
          )}
        </div>
      </section>

      <footer style={{ position: 'fixed' }}>
        <p>
          <img src={ImageConfig.IPTOR_LOGO_ORANGE} alt="Iptor" title="Iptor" /> &copy; All Content Copyright 2021{' '}
        </p>
      </footer>
      {isMobile ? <FooterMobile page={2} /> : null}
      <Container containerType="add" />
    </div>
  );
};
