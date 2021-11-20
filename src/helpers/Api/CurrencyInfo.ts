import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { CurrencyItem, CurrencyInfoResponse } from './models';
import { ApiRequest } from './ApiRequest';

export class CurrencyInfo {
  /** API Method */
  private static apiMethod = 'currencies.get';

  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
  static async get(): Promise<CurrencyItem[]> {
    const requestData = new ApiRequest(this.apiMethod);
    const response = await axios.post<CurrencyInfoResponse>('/api/service', requestData);
    return get<AxiosResponse<CurrencyInfoResponse>, 'data', 'data', 'items', CurrencyItem[]>(response, ['data', 'data', 'items'], []);
  }
}
