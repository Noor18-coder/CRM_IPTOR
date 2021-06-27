import * as React from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from 'react-responsive'

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


interface result {
  items: BusinessPartnerListItem[],
  load: boolean
}

export interface SelectOptionMethod {
    value: string;
    selectParam: string;
    handler: string;
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

    const openBusinessPartnerDetails = () => { }

    const newColumns = ColumnDefs.map((obj: any) => {
        if (obj.field == "handler") {
            obj.cellRenderer = (params: any) => {
                let cellValue = params.value;
                return cellValue;
            }
            return obj;
        }
        return obj;
    });

    const fetchOppty = async (start: number, orderBy: string): Promise<result> => {
        const res: result = {
            items: [],
            load: true
        };
        const filters: BusinessPartnerListParams = {
            businessPartnerTextSearch: '',
            searchField: ''
        }

        const data: any = await BusinessPartnerList.get(searchText, 20, start, orderBy, filters);
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
        }
    }

    const searchBusinesspartner = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter' && searchFieldValue.length > 0) {
            selectFilter({
                value: '',
                selectParam: '',
                handler: ''
            });
            setSearchText(searchFieldValue);
            setRefresh(!refresh);
            setLoader(true)
        }
    }

    React.useEffect(() => {
        //dispatch(saveOpportunityFilters(OpportunityFilterOpions))
        if (state.businesspartners.length === 0)
            setLoader(true)
    }, []);


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
                            <button className={"btn add-opportunity"} data-toggle="modal" data-target="#myModal2">+ New</button>
                        </div>}
                    </div>
                    {((isMobile || isTablet) && searchText.length) && loader ? <Loader component='opportunity' /> : ''}
                    {((isMobile || isTablet) ?
                        <BusinessPartnerListMobile refresh={refresh} gridRowClicked={openBusinessPartnerDetails} getDataRows={fetchOppty} />
                        : <React.Fragment>
                            {loader && <Loader component='opportunity' />}
                            <Grid refresh={refresh} col={newColumns} gridRowClicked={openBusinessPartnerDetails} getDataRows={fetchOppty} ></Grid>
                        </React.Fragment>
                        
                    )}
                </div>
            </section>

            <footer style={{ position: "fixed" }}>
                <p><img src={ImageConfig.IPTOR_LOGO_ORANGE} alt="Iptor" title="Iptor" /> &copy; All Content Copyright 2021 </p>
            </footer>
            { (isMobile || isTablet) ? <FooterMobile /> : null}
        </div>
        )
}

export default BusinessPartners;