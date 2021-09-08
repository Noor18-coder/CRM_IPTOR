import axios from 'axios';
import { get } from 'lodash';
import { ApiRequest } from './ApiRequest';
import * as models from './models';

export class User {
  /** API Method */
  private static apiMethod = 'user.get';

  private static apiUserProfleMethod = 'apiUserProfile.get';

  private static apiGetAllUsers = 'users.get';

  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
  static async get(userId?: string): Promise<models.UserItem> {
    const requestData = { method: this.apiMethod, user: userId };
    const response = await axios.post<models.UserResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }

  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
  static async getUserProfile(): Promise<any> {
    const requestData = new ApiRequest<models.UserParams>(this.apiUserProfleMethod);
    const response = await axios.post('/api/service', requestData).then((res) => res);
    return get(response, 'data.data', {});
  }

  /**
   * Helper function to fetch sales order list
   * @param params user id
   * @returns information about user
   */
  static async getAll(freeTextSearch: string, offset?: number, limit?: number): Promise<models.UserItem[]> {
    const requestData = new ApiRequest<models.UsersParams>(this.apiGetAllUsers, {}, { freeTextSearch, limit, offset });
    const response = await axios.post<models.UsersResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }
}
