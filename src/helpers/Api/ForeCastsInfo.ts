import axios from 'axios';
import { get } from 'lodash';
import { ForeCastInfoResponse } from './models';
import { ApiRequest } from './ApiRequest';

export class ForeCastsInfo {
  /** API Method */
  private static apiMethod = 'crmForecastCategories.get';

  /**
   * Helper function to fetch ForeCastInfo
   * @returns information about ForeCastInfo
   */
  static async get(): Promise<ForeCastInfoResponse> {
    const requestData = new ApiRequest(this.apiMethod);
    const response = await axios.post<ForeCastInfoResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }
}
