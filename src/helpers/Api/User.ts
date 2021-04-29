import axios from 'axios';

import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';
import * as models from './models';
export class User {
    /** API Method */
   //private static apiMethod: string = 'user.get';
    private static apiMethod: string = 'user.get';
   
    /**
     * Helper function to fetch sales order list
     * @param params user id
     * @returns information about user
     */
   static async get(userId?: string): Promise<models.UserResponse> {
    //static async get(): Promise<CompaniesResponse> {
      const requestData = new ApiRequest<models.UserParams>(this.apiMethod, { user: userId });
      //const requestData = new ApiRequest(this.apiMethod);
      //const response = await axios.post<models.UserResponse>('/api/service', requestData);
      //return get(response, 'data.data', []);
      const response = await axios.post<models.UserResponse>('/api/service', requestData);
      return get(response, 'data.data',{});

    }
  
  }
   