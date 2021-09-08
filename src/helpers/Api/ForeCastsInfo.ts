import axios from 'axios';
import { ForeCastInfoResponse } from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export class ForeCastsInfo {
    /** API Method */
   private static apiMethod: string = 'crmForecastCategories.get';
   
    /**
     * Helper function to fetch sales order list
     * @param params user id
     * @returns information about user
     */
   static async get(): Promise<ForeCastInfoResponse> {
      const requestData = new ApiRequest(this.apiMethod);
      const response = await axios.post<ForeCastInfoResponse>('/api/service', requestData);
      return get(response, 'data.data.items',[]);
    }
  
  }
   