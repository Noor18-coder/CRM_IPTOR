import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { CountryInfoResponse, AreaInfoResponse, CountryListParams, CountryInfo as CountryInfoObj, AreaInfo } from './models';
import { ApiRequest } from './ApiRequest';

export class CountryInfo {
  /** API Method */
  private static apiMethod = 'crmCountries.get';

  private static areaApiMethod = 'areas.get';

  static async get(countryParams?: CountryListParams): Promise<CountryInfoObj[]> {
    const params: CountryListParams = {
      country: countryParams?.country,
    };
    const requestData = new ApiRequest<CountryListParams>(this.apiMethod, params, { orderBy: 'description' });
    const response = await axios.post<CountryInfoResponse>('/api/service', requestData);
    return get<AxiosResponse<CountryInfoResponse>, 'data', 'data', 'items', CountryInfoObj[]>(response, ['data', 'data', 'items'], []);
  }

  static async getArea(): Promise<AreaInfo[]> {
    const requestData = new ApiRequest(this.areaApiMethod);
    const response = await axios.post<AreaInfoResponse>('/api/service', requestData);
    return get<AxiosResponse<AreaInfoResponse>, 'data', 'data', 'items', AreaInfo[]>(response, ['data', 'data', 'items'], []);
  }
}
