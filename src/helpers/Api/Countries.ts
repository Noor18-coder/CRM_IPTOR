import axios from 'axios';
import { CountryInfoResponse, AreaInfoResponse } from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export class CountryInfo {
    /** API Method */
    private static apiMethod: string = 'crmCountries.get';
    private static areaApiMethod: string = 'areas.get';
   
    static async get(): Promise<CountryInfoResponse> {
      const requestData = new ApiRequest(this.apiMethod);
      const response = await axios.post<CountryInfoResponse>('/api/service', requestData);
      return get(response, 'data.data.items',[]);
    }

    static async getArea(): Promise<AreaInfoResponse> {
        const requestData = new ApiRequest(this.areaApiMethod);
        const response = await axios.post<AreaInfoResponse>('/api/service', requestData);
        return get(response, 'data.data.items', []);
    }
  }
   