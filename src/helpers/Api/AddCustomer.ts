import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { AddBusinessPartnerDefaultParams, AddBusinessPartnerResponse, SaveUserDefinedFieldParam } from './models';
import { ApiRequest } from './ApiRequest';

export default class AddCustomerApi {
  /** API Method */
  private static apiMethod = 'crmBusinessPartner.add';

  private static updateApiMethod = 'crmBusinessPartner.update';

  private static saveAttributeValueMethod = 'mopAttribute.add';

  private static saveAttributeValueMethodFile = 'SRONAM';

  /**
   * Helper function to fetch Business Partner Info
   * API Method: crmBusinessPartner.add
   * */
  static async add(businessPartner: AddBusinessPartnerDefaultParams): Promise<AddBusinessPartnerResponse> {
    const requestData = new ApiRequest<AddBusinessPartnerDefaultParams>(this.apiMethod, businessPartner);
    const response = await axios.post<AddBusinessPartnerResponse>('/api/service', requestData);
    return get<AxiosResponse<AddBusinessPartnerResponse>, 'data'>(response, 'data');
  }

  static async update(businessPartner: AddBusinessPartnerDefaultParams): Promise<AddBusinessPartnerResponse> {
    const requestData = new ApiRequest<AddBusinessPartnerDefaultParams>(this.updateApiMethod, businessPartner);
    const response = await axios.post<AddBusinessPartnerResponse>('/api/service', requestData);
    return get<AxiosResponse<AddBusinessPartnerResponse>, 'data'>(response, 'data');
  }

  static async addAttributes(
    businessPartnerId: string,
    attributeType: string,
    attributeValue: string | number,
    type?: string
  ): Promise<AddBusinessPartnerResponse> {
    const params: SaveUserDefinedFieldParam = {
      attributeType,
      parentFile: this.saveAttributeValueMethodFile,
      parentId: businessPartnerId,
      attributeValue,
    };
    if (type === 'date') {
      delete params.attributeValue;
      params.attributeValueD = attributeValue;
    }
    const requestData = new ApiRequest<SaveUserDefinedFieldParam>(this.saveAttributeValueMethod, params);
    const response = await axios.post<AddBusinessPartnerResponse>('/api/service', requestData);
    return get<AxiosResponse<AddBusinessPartnerResponse>, 'data'>(response, 'data');
  }
}
