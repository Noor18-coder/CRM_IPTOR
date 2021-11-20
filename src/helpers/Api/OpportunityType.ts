import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import * as models from './models';
import { ApiRequest } from './ApiRequest';

export class OpportunityType {
  /** API Method */
  private static apiMethod = 'crmOpportunityTypes.get';

  private static defaultApiMethod = 'mopOpportunityDefaults.get';

  /**
   * Helper function to fetch Business Partner Info
   * API Method: crmOpportunityTypes.get
   * @param freeTextSearch search term
   * @param limit pagination page limit
   * @param offset pagination offset
   * @returns Array of opportunity types.
   */
  static async get(): Promise<models.OpportunityType[]> {
    const requestData = new ApiRequest(this.apiMethod);
    const response = await axios.post<models.OpportunityTypeResponse>('/api/service', requestData);
    return get<AxiosResponse<models.OpportunityTypeResponse>, 'data', 'data', 'items', models.OpportunityType[]>(
      response,
      ['data', 'data', 'items'],
      []
    );
  }

  static async getDefault(): Promise<models.DefaultOpportunityInfo> {
    const requestData = new ApiRequest(this.defaultApiMethod);
    const response = await axios.post<models.DefaultOpportunityInfoResponse>('/api/service', requestData);
    return get<AxiosResponse<models.DefaultOpportunityInfoResponse>, 'data', 'data', models.DefaultOpportunityInfo>(response, ['data', 'data'], {});
  }
}
