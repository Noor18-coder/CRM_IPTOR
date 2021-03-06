import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import * as models from './models';
import { ApiRequest } from './ApiRequest';

export class ReasonCodes {
  /** API Method */
  private static apiMethod = 'mopReasonCodes.get';

  static async get(): Promise<models.Reason[]> {
    const requestData = new ApiRequest(this.apiMethod);
    const response = await axios.post<models.ReasonCodeResponse>('/api/service', requestData);
    return get<AxiosResponse<models.ReasonCodeResponse>, 'data', 'data', 'items', models.Reason[]>(response, ['data', 'data', 'items'], []);
  }
}
