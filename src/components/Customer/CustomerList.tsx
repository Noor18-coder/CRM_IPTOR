import * as React from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from 'react-responsive'
import _ from 'lodash';

import Header from '../Shared/Header/Header';
import FooterMobile from '../Shared/Footer/FooterMobile';
import Loader from '../Shared/Loader/Loader'
import ImageConfig from '../../config/ImageConfig';
import Grid from '../Shared/Grid/Grid';

import { AppState } from "../../store/store";
import { BusinessPartnerState } from '../../store/Customer/Types';
import ColumnDefs from '../../config/CustomerGrid'
import { BusinessPartnerListItem, BusinessPartnerListParams } from '../../helpers/Api/models/Customer';
import { saveBusinessPartnerList, saveBusinessPartnerFilters, saveBusinessPartnersFilters } from '../../store/Customer/Actions';
import BusinessPartnerList from '../../helpers/Api/CustomerList';
import BusinessPartnerListMobile from './CustomerListMobile';
import { setBusinessPartnerWindowActive } from '../../store/AddCustomer/Actions';
import { useHistory } from 'react-router';

import * as models from '../../helpers/Api/models';
import OpportunityUserDefinedFields from '../../helpers/Api/OpportunityUserDefinedFields';
import CustomerList from '../../helpers/Api/CustomerList';
import { GridFilter } from '../../components/Shared/Filter/GridFilter';
import Container from '../AddCustomer/Container'


interface result {
  items: BusinessPartnerListItem[],
  load: boolean
}

export interface SelectOptionMethod {
    value: string;
    selectParam: string;
}

const BusinessPartners: React.FC = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })

    const state: BusinessPartnerState = useSelector((state: AppState) => state.businesspartners);
    const dispatch: Dispatch<any> = useDispatch();

    const [loader, setLoader] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState<string>('');
    const [searchFieldValue, setSearchField] = React.useState<string>('');
    const [refresh, setRefresh] = React.useState<boolean>(false);
    const [filter, selectFilter] = React.useState<SelectOptionMethod>();

    const [industryId, setIndustryId] = React.useState<string>('');
    const [industryDetails, setIndustryDetails] = React.useState<models.DropDownValue[]>([]);
    const [areaDetails, setAreaDetails] = React.useState<models.AreaListItem[]>([]);

    const history = useHistory();

    const openBusinessPartnerDetails = (data: any) => {
        const custId = data && data.businessPartner ? data.businessPartner : null;
        if(custId) {
          history.push({  pathname:  "/cust-details", state: { custId: custId}})
        }
    }

    const fetchOppty = async (start: number, orderBy: string): Promise<result> => {
        const res: result = {
            items: [],
            load: true
        };
        const filters: BusinessPartnerListParams = {
            businessPartnerTextSearch: searchText,
            searchField: '',
            includeInactive: true,
            crmAttributesTextSearch: '',
            industry: '',
            area: '',
        }
        if (filter?.selectParam == 'industry') {
            filters.industry = filter?.value;
        }
        if (filter?.selectParam == 'area') {
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
                res.items = []
            }
            dispatch(saveBusinessPartnerList(res.items));
            res.load = false;
        }
        setLoader(false)
        return res;
    }

    const searchStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        const str = event.target.value;
        setSearchField(str)
        if (str.length === 0) {
            setSearchText('');
            setRefresh(!refresh);
            setLoader(true)
        }
    }

    const searchBusinesspartner = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter' && searchFieldValue.length > 0) {
            selectFilter({
                value: '',
                selectParam: '',
            });
            setSearchText(searchFieldValue);
            setRefresh(!refresh);
            setLoader(true)
        }
    }

    React.useEffect(() => {
        if (state.businesspartners.length === 0)
            setLoader(true)
        OpportunityUserDefinedFields.getIndustryInfo('INDUSTRY').then((data) => {
            setIndustryId(data.attributeId)
        });
        
    }, []);

    React.useEffect(() => {
        CustomerList.getAreas().then((data) => {
            setAreaDetails(data.data.items)
        });
        OpportunityUserDefinedFields.getAttributeValues(industryId).then((data) => {
            if(data)
                setIndustryDetails(data.items)
        });
    }, [industryId]);

    React.useEffect(() => {
        _.forEach(industryDetails, function (obj) {
            _.set(obj, 'value', obj.valueField);
            _.set(obj, 'selectParam', 'industry');
        });
        _.forEach(areaDetails, function (obj) {
            _.set(obj, 'value', obj.area);
            _.set(obj, 'selectParam', 'area');
        });
        let filterArray = [...areaDetails, ...industryDetails]
        dispatch(saveBusinessPartnerFilters(filterArray))
    }, [areaDetails, industryDetails]);

    const onFilter = (obj: SelectOptionMethod) => {
       if (filter?.selectParam === obj.selectParam && filter.value === obj.value) {
            selectFilter({ ...filter, selectParam: '', value: '' });
        } else {
            selectFilter(obj);
        }
        const re = !refresh;
        setRefresh(re);
        setLoader(true)
    }

    const toggleDrawer = (open: boolean) => (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
        dispatch(setBusinessPartnerWindowActive(true));
    };

    return (
        <div>
            <Header page={2} />
            <section className="opportunities">
                <div className={"container-fluid"}>
                    <div className={"row s-header"}>
                        {isMobile ? null : <div className={"col col-md-4"}>
                            <div className={"page-title"}>
                                {searchText.length ? 'Showing results for "' + searchText + '"' : ''}
                            </div>
                        </div>}
                        <div className={"col col-md-4"}>
                            <div className="navbar-search-overlap">
                                <div className="form-group">
                                    <div className="input-search">
                                        <i className="input-search-icon wb-search" aria-hidden="true"></i>
                                        <input type="text" className="form-control sitesearch" onChange={searchStart} value={searchFieldValue} onKeyPress={searchBusinesspartner} placeholder="Search" />
                                        <button type="button" className="search-settings-button"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isMobile ? null : <div className={"col col-md-4 justify-content-end"}>
                            <button className={"btn add-opportunity"} onClick={toggleDrawer(true)}>+ New</button>
                        </div>}
                    </div>
                    {((isMobile || isTablet) && searchText.length) && loader ? <Loader component='opportunity' /> : ''}
                    {((isMobile || isTablet) ?
                        <React.Fragment>
                            <GridFilter filters={Array.from(state.businessPartnerFilters)} selected={filter} selectOption={onFilter} component="customer" />
                            <BusinessPartnerListMobile refresh={refresh} gridRowClicked={openBusinessPartnerDetails} getDataRows={fetchOppty} />
                        </React.Fragment>
                        : <React.Fragment>
                            <GridFilter filters={Array.from(state.businessPartnerFilters)} selected={filter} selectOption={onFilter} />
                            {loader && <Loader component='opportunity' />}
                            <Grid refresh={refresh} col={ColumnDefs} gridRowClicked={openBusinessPartnerDetails} getDataRows={fetchOppty} ></Grid>
                        </React.Fragment>
                    )}
                </div>
            </section>

            <footer style={{ position: "fixed" }}>
                <p><img src={ImageConfig.IPTOR_LOGO_ORANGE} alt="Iptor" title="Iptor" /> &copy; All Content Copyright 2021 </p>
            </footer>
            { (isMobile || isTablet) ? <FooterMobile /> : null}
            <Container containerType='add'/>
        </div>
        )
}

export default BusinessPartners;