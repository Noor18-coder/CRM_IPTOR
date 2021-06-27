import axios from 'axios';
import { CountryInfoResponse } from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export class CountryInfo {
    /** API Method */
    private static apiMethod: string = 'crmCountries.get';
   
    static async get(): Promise<CountryInfoResponse> {
      const requestData = new ApiRequest(this.apiMethod);
      const response = await axios.post<CountryInfoResponse>('/api/service', requestData);
      return get(response, 'data.data.items',[]);
    }
  }
   