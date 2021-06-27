import axios from 'axios';
import { BusinessPartnerListItem, BusinessPartnerListParams, BusinessPartnerFilterItem, BusinessPartnerListResponse, AreaListParams, AreaListResponse } from './models/Customer';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export default class BusinessPartnerList {
    /** API Method */
    private static apiMethod: string = 'crmBusinessPartners.get';
    private static areaApiMethod: string = 'areas.get';
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
            searchField: otherparams?.searchField,
            includeInactive: otherparams?.includeInactive,
            crmAttributesTextSearch: otherparams?.crmAttributesTextSearch,
            industry: otherparams?.industry,
            area: otherparams?.area
        };
        const requestData = new ApiRequest<BusinessPartnerListParams>(this.apiMethod, params, { freeTextSearch, limit, offset, orderBy });
        const response = await axios.post<BusinessPartnerListResponse>('/api/service', requestData);
        return get(response,'data');
    }

    static async getAreas() {
        const requestData = new ApiRequest<AreaListParams>(this.areaApiMethod);
        const response = await axios.post<AreaListResponse>('/api/service', requestData);
        return get(response, 'data');
    }
}
