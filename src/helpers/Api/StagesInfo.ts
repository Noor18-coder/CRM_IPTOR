import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { StageInfoResponse, StageInfoResponseData } from './models';
import { ApiRequest } from './ApiRequest';

export class StagesInfo {
  /** API Method */
  private static apiMethod = 'mopSalesStages.get';

  /**
   * Helper function to fetch Stage Info
   * @returns information about Stage Info
   */
  static async get(): Promise<StageInfoResponseData> {
    const requestData = new ApiRequest(this.apiMethod);
    const response = await axios.post<StageInfoResponse>('/api/service', requestData);
    return get<AxiosResponse<StageInfoResponse>, 'data', 'data', StageInfoResponseData>(response, ['data', 'data'], {} as StageInfoResponseData);
  }
}
