import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { ApprovalLogAddRequestParams, ApprovalLogAddResponse, DeleteApprovalLogsParams } from './models';
import { ApiRequest } from './ApiRequest';

export class ApprovalLog {
  /** API Method */
  private static apiMethod = 'crmOpportunityApprovalLog.add';

  private static deleteApprovalLogs = 'crmOpportunityApprovalLog.delete';

  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
  static async addApprovalLog(params: ApprovalLogAddRequestParams): Promise<ApprovalLogAddResponse> {
    const requestData = new ApiRequest<ApprovalLogAddRequestParams>(this.apiMethod, params);
    const response = await axios.post<ApprovalLogAddResponse>('/api/service', requestData);
    return get<AxiosResponse<ApprovalLogAddResponse>, 'data'>(response, 'data');
  }

  static async deleteOpportunityApprovalLogs(params: DeleteApprovalLogsParams): Promise<ApprovalLogAddResponse> {
    const requestData = new ApiRequest<DeleteApprovalLogsParams>(this.deleteApprovalLogs, params);
    const response = await axios.post<ApprovalLogAddResponse>('/api/service', requestData);
    return get(response, 'data.data.items', {});
  }
}
