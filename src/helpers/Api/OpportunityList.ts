import axios from 'axios';
import { OpportunityListItem, OpportunityListResponse, OpportunityListParams } from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export default class OpportunityList {
  /** API Method */
  private static apiMethod: string = 'mopOpportunities.get';

  /**
   * Helper function to fetch Business Partner Info
   * API Method: businessPartnerInfo.get
   * @param freeTextSearch search term
   * @param limit pagination page limit
   * @param offset pagination offset
   * @returns Array of business patners and control object
   */
   static async get(handler:string, freeTextSearch: string, limit?: number, offset?: number, orderBy?:string, selectHandler?:string): Promise<OpportunityListResponse> {
    const params: OpportunityListParams = { handler:handler};
    selectHandler && selectHandler !== 'all' ? params.selectHandler = selectHandler : params.selectHandler = '';
    const requestData = new ApiRequest<OpportunityListParams>(this.apiMethod, params, { freeTextSearch, limit, offset, orderBy});
    const response = await axios.post<OpportunityListResponse>('/api/service', requestData);
     return get(response, 'data');
  }
}
