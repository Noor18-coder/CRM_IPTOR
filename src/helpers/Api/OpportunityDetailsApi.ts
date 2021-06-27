import axios from 'axios';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export default class OpportunityDetailsApi {
  /** API Method */
  private static apiMethod: string = 'mopOpportunity.get';
  private static attributesFileName: string = 'SROMOPH';
  private static attributesContactFileName: string = 'SROMOPCH';
  private static attributesProductFileName: string = 'SROMOPI';
  private static apiGroupMethod: string = 'mopAttributes.get';
  private static apiContactMethod: string = 'mopContacts.get';
  private static apiItemsMethod: string = 'mopItems.get';

  /**
   * Helper function to fetch Opportunity default info
   * API Method: mopOpportunity.get
   *
   */
  static async get(opportunityId: string): Promise<apiModels.OpportunityDetailsDefault> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsParams>(this.apiMethod, { opportunityId : opportunityId });
    const response = await axios.post<apiModels.OpportunityDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }

  static async getGroupInfo(opportunityId: string): Promise<apiModels.OpportunityDetailsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsGroupItemParams>(this.apiGroupMethod, { parentId : opportunityId, parentFile: this.attributesFileName});
    const response = await axios.post<apiModels.OpportunityDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getOpportunityContact(rootId: string): Promise<apiModels.OpportunityContact[]> {
    const requestData = new ApiRequest<apiModels.OpportunityContactsParams>(this.apiContactMethod, { rootId : rootId});
    const response = await axios.post<apiModels.OpportunityContactsResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getOpportunityItems(rootId: string): Promise<apiModels.Product[]> {
    const requestData = new ApiRequest<apiModels.ProductParams>(this.apiItemsMethod, { rootId : rootId});
    const response = await axios.post<apiModels.ProductResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getContactDetails(contactId: string): Promise<apiModels.OpportunityDetailsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsGroupItemParams>(this.apiGroupMethod, { parentId: contactId, parentFile: this.attributesContactFileName });
    const response = await axios.post<apiModels.OpportunityDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }
  static async getProductDetails(itemId: string): Promise<apiModels.OpportunityDetailsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsGroupItemParams>(this.apiGroupMethod, { parentId: itemId, parentFile: this.attributesProductFileName });
    const response = await axios.post<apiModels.OpportunityDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }
}
