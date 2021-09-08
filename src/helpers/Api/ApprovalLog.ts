import axios from 'axios';
import { get } from 'lodash';
import { ApprovalLogAddRequestParams, ApprovalLogAddResponse } from './models';
import { ApiRequest } from './ApiRequest';

export class ApprovalLog {
  /** API Method */
  private static apiMethod = 'crmOpportunityApprovalLog.add';

  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
  static async addApprovalLog(params: ApprovalLogAddRequestParams): Promise<ApprovalLogAddResponse> {
    const requestData = new ApiRequest<ApprovalLogAddRequestParams>(this.apiMethod, params);
    const response = await axios.post<ApprovalLogAddResponse>('/api/service', requestData);
    return get(response, 'data');
  }
}
