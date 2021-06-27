import axios from 'axios';

import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';
import * as models from './models';

export class User {
  /** API Method */
  //private static apiMethod: string = 'user.get';
  private static apiMethod: string = 'user.get';
  private static apiUserProfleMethod: string = 'apiUserProfile.get';
  private static apiGetAllUsers: string = 'users.get';

  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
  static async get(userId?: string): Promise<models.UserResponse> {
    //static async get(): Promise<CompaniesResponse> {
    //const requestData = new ApiRequest(this.apiMethod);
    //const response = await axios.post<models.UserResponse>('/api/service', requestData);
    //return get(response, 'data.data', []);
    const requestData = { method: this.apiMethod, user: userId };
    const response = await axios.post<models.UserResponse>('/api/service', requestData);
    return get(response, 'data.data', {});

  }


  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
  static async getUserProfile() {
    //const requestData = {method: this.apiMethod, user: userId };
    const requestData = new ApiRequest<models.UserParams>(this.apiUserProfleMethod)
    let response = await axios.post('/api/service', requestData).then((response) => response);
    return get(response, 'data.data', {});
  }

  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
   static async getAll(freeTextSearch: string, offset?: number, limit?: number): Promise<models.UserItem[]> {
    const requestData = new ApiRequest<models.UsersParams>(this.apiGetAllUsers, {}, { freeTextSearch, limit, offset});
    const response = await axios.post<models.UsersResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);

  }
}
