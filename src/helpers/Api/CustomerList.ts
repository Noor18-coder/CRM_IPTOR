import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { BusinessPartnerListParams, BusinessPartnerListResponse, AreaListParams, AreaListResponse } from './models/Customer';
import { ApiRequest } from './ApiRequest';

export default class BusinessPartnerList {
  /** API Method */
  private static apiMethod = 'crmBusinessPartners.get';

  private static areaApiMethod = 'areas.get';

  /**
   * Helper function to fetch Business Partner Info
   * API Method: businessPartnerInfo.get
   * @param freeTextSearch search term
   * @param limit pagination page limit
   * @param offset pagination offset
   * @returns Array of business patners and control object
   */
  static async get(
    freeTextSearch: string,
    limit?: number,
    offset?: number,
    orderBy?: string,
    otherparams?: BusinessPartnerListParams
  ): Promise<BusinessPartnerListResponse> {
    const params: BusinessPartnerListParams = {
      businessPartnerTextSearch: otherparams?.businessPartnerTextSearch,
      searchField: otherparams?.searchField,
      includeInactive: otherparams?.includeInactive,
      crmAttributesTextSearch: otherparams?.crmAttributesTextSearch,
      industry: otherparams?.industry,
      area: otherparams?.area,
      productFamily: otherparams?.productFamily,
      includeAddresses: otherparams?.includeAddresses,
      includeContacts: otherparams?.includeContacts,
      active: otherparams?.active,
    };
    const requestData = new ApiRequest<BusinessPartnerListParams>(this.apiMethod, params, { freeTextSearch, limit, offset, orderBy });
    const response = await axios.post<BusinessPartnerListResponse>('/api/service', requestData);
    return get<AxiosResponse<BusinessPartnerListResponse>, 'data'>(response, 'data');
  }

  static async getAreas(): Promise<AreaListResponse> {
    const requestData = new ApiRequest<AreaListParams>(this.areaApiMethod);
    const response = await axios.post<AreaListResponse>('/api/service', requestData);
    return get<AxiosResponse<AreaListResponse>, 'data'>(response, 'data');
  }
}
