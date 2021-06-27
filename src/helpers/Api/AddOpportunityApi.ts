import axios, { AxiosResponse } from 'axios';
import { AddOpportunityDefaultParams, AddOpportunityResponse, SaveUserDefinedFieldParam, AddItemToOpportunityParams, AddItemToOpportunityResponse } from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export default class AddOpportunityApi {
  /** API Method */
  private static apiMethod: string = 'mopOpportunity.add';
  private static saveAttributeValueMethod: string = 'mopAttribute.add';
  private static saveAttributeValueMethodFile: string = 'SROMOPH';
  private static saveItemMethod: string = 'mopItem.add';

  /**
   * Helper function to fetch Business Partner Info
   * API Method: mopOpportunity.get
   * @param freeTextSearch search term
   * 
   */
  static async add(opportunity: AddOpportunityDefaultParams): Promise<AddOpportunityResponse> {
    const requestData = new ApiRequest<AddOpportunityDefaultParams>(this.apiMethod, opportunity);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  /**
   * Helper function to fetch Business Partner Info
   * API Method: mopOpportunity.get
   * @param freeTextSearch search term
   * 
   */
  static async addAttributes(opportunityId: string, attributeType: string, attributeValue: string | number): Promise<AddOpportunityResponse> {
    const params: SaveUserDefinedFieldParam = {
      attributeType: attributeType,
      parentFile: this.saveAttributeValueMethodFile,
      parentId: opportunityId,
      attributeValue: attributeValue
    }
    const requestData = new ApiRequest<SaveUserDefinedFieldParam>(this.saveAttributeValueMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  /**
   * Helper function to fetch Business Partner Info
   * API Method: mopOpportunity.get
   * @param freeTextSearch search term
   * 
   */
  static async addItem(opportunityId: string, item: string, quantity: number, unit:string): Promise<AddItemToOpportunityResponse> {
    const params: AddItemToOpportunityParams = {
      parentFile: this.saveAttributeValueMethodFile,
      parentId: opportunityId,
      item: item,
      quantity: quantity,
      unit:unit
    }
    const requestData = new ApiRequest<AddItemToOpportunityParams>(this.saveItemMethod, params);
    const response = await axios.post<AddItemToOpportunityResponse>('/api/service', requestData);
    return get(response, 'data');
  }
}
