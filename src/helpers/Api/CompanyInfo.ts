import axios from 'axios';
import { CompanyInfoItem, CompanyInfoItemResponse } from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export class CompanyInfo {
    /** API Method */
   private static apiMethod: string = 'environmentCompanies.get';
   
    /**
     * Helper function to fetch sales order list
     * @param params user id
     * @returns information about user
     */
   static async get(): Promise<CompanyInfoItemResponse> {
      const requestData = new ApiRequest(this.apiMethod);
      const response = await axios.post<CompanyInfoItemResponse>('/api/service', requestData);
      return get(response, 'data.data',[]);
    }
  
  }
   