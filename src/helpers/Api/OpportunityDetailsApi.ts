import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';

export default class OpportunityDetailsApi {
  /** API Method */
  private static apiMethod = 'mopOpportunity.get';

  private static attributesFileName = 'SROMOPH';

  private static attributesContactFileName = 'SROMOPCH';

  private static attributesProductFileName = 'SROMOPI';

  private static customerAttributesFileName = 'SRONAM';

  private static apiGroupMethod = 'mopAttributes.get';

  private static apiContactMethod = 'mopContacts.get';

  private static apiItemsMethod = 'mopItems.get';

  private static apiDeleteItem = 'mopItem.delete';

  private static mopOpportunityDelete = 'mopOpportunity.delete';

  /**
   * Helper function to fetch Opportunity default info
   * API Method: mopOpportunity.get
   *
   */
  static async get(opportunityId: string): Promise<apiModels.OpportunityDetailsDefault> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsParams>(this.apiMethod, { opportunityId });
    const response = await axios.post<apiModels.AttributeValuesResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }

  static async getGroupInfo(opportunityId: string): Promise<apiModels.AttributeValueObject[]> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsGroupItemParams>(this.apiGroupMethod, {
      parentId: opportunityId,
      parentFile: this.attributesFileName,
    });
    const response = await axios.post<apiModels.AttributeValuesResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getOpportunityContact(rootId: string): Promise<apiModels.OpportunityContact[]> {
    const requestData = new ApiRequest<apiModels.OpportunityContactsParams>(this.apiContactMethod, { rootId });
    const response = await axios.post<apiModels.OpportunityContactsResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getOpportunityItems(rootId: string): Promise<apiModels.Product[]> {
    const requestData = new ApiRequest<apiModels.ProductParams>(this.apiItemsMethod, { rootId });
    const response = await axios.post<apiModels.ProductResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getContactDetails(contactId: string): Promise<apiModels.OpportunityDetailsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsGroupItemParams>(this.apiGroupMethod, {
      parentId: contactId,
      parentFile: this.attributesContactFileName,
    });
    const response = await axios.post<apiModels.AttributeValuesResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getProductDetails(itemId: string): Promise<apiModels.OpportunityDetailsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsGroupItemParams>(this.apiGroupMethod, {
      parentId: itemId,
      parentFile: this.attributesProductFileName,
    });
    const response = await axios.post<apiModels.AttributeValuesResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getCustomerGroupInfo(customerId: string): Promise<apiModels.OpportunityDetailsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsGroupItemParams>(this.apiGroupMethod, {
      parentId: customerId,
      parentFile: this.customerAttributesFileName,
    });
    const response = await axios.post<apiModels.OpportunityDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async deleteItem(params: apiModels.DeleteOpportunityItemParams): Promise<any> {
    const requestData = new ApiRequest<apiModels.DeleteOpportunityItemParams>(this.apiDeleteItem, {
      parentId: params.parentId,
      parentFile: this.attributesProductFileName,
      itemId: params.itemId,
    });
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async opportunityDelete(opportunityId: string): Promise<any> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsParams>(this.mopOpportunityDelete, { opportunityId });
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }
}
