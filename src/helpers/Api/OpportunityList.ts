import axios, { AxiosResponse } from 'axios';
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
  static async get(limit?: number, offset?: number, orderBy?: string, otherparams?: OpportunityListParams): Promise<OpportunityListResponse> {
    const params: OpportunityListParams = {
      selectUserId: otherparams?.selectUserId,
      selectHandler: otherparams?.selectHandler,
      selectStageFrom: otherparams?.selectStageFrom,
      selectStageTo: otherparams?.selectStageTo,
      searchField: otherparams?.searchField,
      selectCloseDateFrom: otherparams?.selectCloseDateFrom,
      selectCloseDateTo: otherparams?.selectCloseDateTo,
      selectOppRecordType: otherparams?.selectOppRecordType,
      selectCustomer: otherparams?.selectCustomer,
      selectApprover: otherparams?.selectApprover,
      selectApprovalStatus: otherparams?.selectApprovalStatus,
      activeOp: otherparams?.activeOp,
    };
    const requestData = new ApiRequest<OpportunityListParams>(this.apiMethod, params, { limit, offset, orderBy });
    const response = await axios.post<OpportunityListResponse>('/api/service', requestData);
    return get<AxiosResponse<OpportunityListResponse>, 'data'>(response, 'data');
  }
}
