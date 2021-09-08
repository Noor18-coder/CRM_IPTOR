import axios from 'axios';
import { get } from 'lodash';
import { OpportunityListResponse, OpportunityListParams } from './models';
import { ApiRequest } from './ApiRequest';

export default class OpportunityList {
  /** API Method */
  private static apiMethod = 'mopOpportunities.get';

  /**
   * Helper function to fetch Business Partner Info
   * API Method: businessPartnerInfo.get
   * @param freeTextSearch search term
   * @param limit pagination page limit
   * @param offset pagination offset
   * @returns Array of business patners and control object
   */
  static async get(
    handler: string,
    freeTextSearch: string,
    limit?: number,
    offset?: number,
    orderBy?: string,
    otherparams?: OpportunityListParams
  ): Promise<OpportunityListResponse> {
    const params: OpportunityListParams = {
      handler,
      selectHandler: otherparams?.selectHandler,
      selectStageFrom: otherparams?.selectStageFrom,
      selectStageTo: otherparams?.selectStageTo,
      searchField: otherparams?.searchField,
      selectCloseDateFrom: otherparams?.selectCloseDateFrom,
      selectCloseDateTo: otherparams?.selectCloseDateTo,
      selectOppRecordType: otherparams?.selectOppRecordType,
      selectCustomer: otherparams?.selectCustomer,
      activeOp: otherparams?.activeOp,
    };
    const requestData = new ApiRequest<OpportunityListParams>(this.apiMethod, params, { freeTextSearch, limit, offset, orderBy });
    const response = await axios.post<OpportunityListResponse>('/api/service', requestData);
    return get(response, 'data');
  }
}
