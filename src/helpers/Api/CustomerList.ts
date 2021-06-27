import axios from 'axios';
import { BusinessPartnerListItem, BusinessPartnerListParams, BusinessPartnerFilterItem, BusinessPartnerListResponse } from './models/Customer';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export default class BusinessPartnerList {
    /** API Method */
    private static apiMethod: string = 'businessPartners.get';

    /**
     * Helper function to fetch Business Partner Info
     * API Method: businessPartnerInfo.get
     * @param freeTextSearch search term
     * @param limit pagination page limit
     * @param offset pagination offset
     * @returns Array of business patners and control object
     */
    static async get(freeTextSearch: string, limit?: number, offset?: number, orderBy?: string, otherparams?: BusinessPartnerListParams): Promise<BusinessPartnerListResponse> {
        let params: BusinessPartnerListParams = {
            businessPartnerTextSearch: otherparams?.businessPartnerTextSearch,
            searchField: otherparams?.searchField
        };
        const requestData = new ApiRequest<BusinessPartnerListParams>(this.apiMethod, params, { freeTextSearch, limit, offset, orderBy });
        const response = await axios.post<BusinessPartnerListResponse>('/api/service', requestData);
        return get(response,'data');
    }
}
