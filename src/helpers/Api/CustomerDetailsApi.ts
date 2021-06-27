import axios from 'axios';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export default class CustomerDetailsApi {
  /** API Method */
  private static apiMethod: string = 'crmBusinessPartner.get';
  private static attributesFileName: string = 'SRONAM';
  private static apiGroupMethod: string = 'mopAttributes.get';
  private static apiAllContactsMethod: string = 'businessPartnerContacts.get';

  /**
   * Helper function to fetch Customer default info
   * API Method: businessPartnerInfo.get
   *
   */
  static async get(businessPartner: string): Promise<apiModels.CustomerDetailsDefault> {
    const requestData = new ApiRequest<apiModels.CustomerDetailsParams>(this.apiMethod, { businessPartner : businessPartner });
    const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }

  static async getOwnerDetails(businessPartner: string): Promise<apiModels.CustomerDetailsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.CustomerDetailsItemParams>(this.apiGroupMethod, { parentId: businessPartner, parentFile: this.attributesFileName });
    const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getAllContactDetails(businessPartner: string): Promise<apiModels.CustomerDetailsContactsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.CustomerDetailsParams>(this.apiAllContactsMethod,  { businessPartner : businessPartner });
    const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

}
