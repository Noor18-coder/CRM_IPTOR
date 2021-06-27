import axios, { AxiosResponse } from 'axios';
import { AddBusinessPartnerDefaultParams, AddBusinessPartnerResponse, SaveUserDefinedFieldParam } from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export default class AddCustomerApi {
  /** API Method */
  private static apiMethod: string = 'crmBusinessPartner.add';
  private static updateApiMethod: string = 'crmBusinessPartner.update';
  private static saveAttributeValueMethod: string = 'mopAttribute.add';
  private static saveAttributeValueMethodFile: string = 'SRONAM';

  /**
   * Helper function to fetch Business Partner Info
   * API Method: crmBusinessPartner.add
   * */
  static async add(businessPartner: AddBusinessPartnerDefaultParams): Promise<AddBusinessPartnerResponse> {
    const requestData = new ApiRequest<AddBusinessPartnerDefaultParams>(this.apiMethod, businessPartner);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async update(businessPartner: AddBusinessPartnerDefaultParams): Promise<AddBusinessPartnerResponse> {
    const requestData = new ApiRequest<AddBusinessPartnerDefaultParams>(this.updateApiMethod, businessPartner);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async addAttributes(businessPartnerId: string, attributeType: string, attributeValue: string | number): Promise<AddBusinessPartnerResponse> {
    const params: SaveUserDefinedFieldParam = {
      attributeType: attributeType,
      parentFile: this.saveAttributeValueMethodFile,
      parentId: businessPartnerId,
      attributeValue: attributeValue
    }
    const requestData = new ApiRequest<SaveUserDefinedFieldParam>(this.saveAttributeValueMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }
}
