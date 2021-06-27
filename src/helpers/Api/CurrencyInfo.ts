import axios from 'axios';
import { CurrencyItem, CurrencyInfoResponse } from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export class CurrencyInfo {
    /** API Method */
   private static apiMethod: string = 'currencies.get';
   
    /**
     * Helper function to fetch sales order list
     * @param params user id
     * @returns information about user
     */
   static async get(): Promise<CurrencyItem[]> {
      const requestData = new ApiRequest(this.apiMethod);
      const response = await axios.post<CurrencyInfoResponse>('/api/service', requestData);
      return get(response, 'data.data.items',[])
    }
}
   