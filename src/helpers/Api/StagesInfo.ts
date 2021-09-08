import axios from 'axios';
import { get } from 'lodash';
import { StageInfoResponse } from './models';
import { ApiRequest } from './ApiRequest';

export class StagesInfo {
  /** API Method */
  private static apiMethod = 'mopSalesStages.get';

  /**
   * Helper function to fetch Stage Info
   * @returns information about Stage Info
   */
  static async get(): Promise<StageInfoResponse> {
    const requestData = new ApiRequest(this.apiMethod);
    const response = await axios.post<StageInfoResponse>('/api/service', requestData);
    return get(response, 'data.data', []);
  }
}
