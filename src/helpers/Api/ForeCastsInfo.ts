import axios from 'axios';
import { get } from 'lodash';
import { ForeCastInfoResponse } from './models';
import { ApiRequest } from './ApiRequest';

export class ForeCastsInfo {
  /** API Method */
  private static apiMethod = 'crmForecastCategories.get';

  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
  static async get(): Promise<ForeCastInfoResponse> {
    const requestData = new ApiRequest(this.apiMethod);
    const response = await axios.post<ForeCastInfoResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }
}
