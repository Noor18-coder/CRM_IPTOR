import axios from 'axios';
import * as models from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export default class OpportunityType {
  /** API Method */
  private static apiMethod: string = 'crmOpportunityTypes.get';

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
    return get(response, 'data.data.items',[]);
  }
}