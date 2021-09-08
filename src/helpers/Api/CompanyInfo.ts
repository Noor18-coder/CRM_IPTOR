import axios from 'axios';
import { get } from 'lodash';
import { CompanyInfoItemResponse } from './models';
import { ApiRequest } from './ApiRequest';

export class CompanyInfo {
  /** API Method */
  private static apiMethod = 'environmentCompanies.get';

  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
  static async get(): Promise<CompanyInfoItemResponse> {
    const requestData = new ApiRequest(this.apiMethod);
    const response = await axios.post<CompanyInfoItemResponse>('/api/service', requestData);
    return get(response, 'data.data', []);
  }
}
