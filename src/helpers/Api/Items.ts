import axios from 'axios';
import { get } from 'lodash';
import { ItemResponse } from './models/Items';
import { ApiRequest } from './ApiRequest';

export default class Items {
  /** API Method */
  private static apiMethod = 'items.get';

  /**
   * Helper function to fetch list of items.
   * API Method: items.get
   * @param freeTextSearch search term
   * @param limit pagination page limit
   * @param offset pagination offset
   * @returns Array of business patners and control object
   */
  static async get(freeTextSearch: string, offset?: number, limit?: number): Promise<ItemResponse> {
    const requestData = new ApiRequest(this.apiMethod, {}, { freeTextSearch, limit, offset });
    const response = await axios.post<ItemResponse>('/api/service', requestData);
    return get(response, 'data');
  }
}
