import axios from 'axios';
import { get } from 'lodash';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';

export class ReportsOpptyList {
  /** API Method */
  private static apiMethod = 'crmReportingOpportunities.get';

  /**
   * Helper function to fetch Report Opportunity List
   * @returns  Opportunity Report
   */
  static async get(filterParams: apiModels.ReportRequestParams, offset: number, limit: number): Promise<apiModels.ReportsOpptyResponse> {
    const requestData = new ApiRequest<apiModels.ReportRequestParams>(this.apiMethod, filterParams, { limit, offset });
    const response = await axios.post<apiModels.ReportsOpptyResponse>('/api/service', requestData);
    return get(response, 'data', {});
  }
}
