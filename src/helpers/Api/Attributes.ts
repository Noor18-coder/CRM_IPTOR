import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';

export class Attributes {
  /** API Method */

  private static opportunityAttributesFileName = 'SROMOPH';

  private static customersAttributesFileName = 'SRONAM';

  private static mopAttributesGet = 'mopAttributes.get';

  private static attributeMethod = 'mopAttributeTypes.get';

  private static addAttributeMethod = 'mopAttribute.add';

  private static getAttributeMethod = 'mopAttribute.get';

  private static updateAttributeMethod = 'mopAttribute.update';

  private static mopAttributeTypeGet = 'mopAttributeType.get';

  private static mopAttributeValues = 'mopAttributeValues.get';

  static async getOpportunityAttributes(): Promise<apiModels.AttributeResponse> {
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile: this.opportunityAttributesFileName });
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getCustomerAttributes(): Promise<apiModels.AttributeResponse> {
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile: this.customersAttributesFileName });
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async updateAttributes(
    businessPartnerId: string,
    attributeType: string,
    attributeValue: string | number,
    valueId: string,
    type?: string
  ): Promise<apiModels.AddBusinessPartnerResponse> {
    const params: apiModels.SaveAttributeFieldParam = {
      attributeType,
      parentFile: this.customersAttributesFileName,
      parentId: businessPartnerId,
      attributeValue,
      valueId,
    };
    if (type === 'date') {
      delete params.attributeValue;
      params.attributeValueD = attributeValue;
    }
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.updateAttributeMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async addAttribute(params: apiModels.SaveAttributeFieldParam): Promise<any> {
    // const filename = type === 'opportunity' ? this.opportunityAttributesFileName : this.customersAttributesFileName;
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.addAttributeMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async getAttribute(parentId: string, parentFile: string, attributeType: string): Promise<any> {
    const params = {
      parentId,
      parentFile,
      attributeType,
    };
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.getAttributeMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async updateAttribute(params: apiModels.SaveAttributeFieldParam): Promise<any> {
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.updateAttributeMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async getAttributeType(attributeType: string, parentFile: string): Promise<AxiosResponse> {
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.mopAttributeTypeGet, { attributeType, parentFile });
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async getAttributeValues(attributeId: string) {
    const requestData = new ApiRequest<apiModels.AttributeValuesRequestParam>(this.mopAttributeValues, { attributeId });
    const response = await axios.post<apiModels.UserDefinedFieldValuesResponse>('/api/service', requestData);
    return response.data.data;
  }

  static async addAttributes(
    fileName: string,
    parentId: string,
    attributeType: string,
    attributeValue: string | number,
    attributeValueB?: boolean,
    attributeValueD?: string
  ): Promise<any> {
    const params: apiModels.SaveAttributeFieldParam = {
      attributeType,
      parentFile: fileName,
      parentId,
    };
    if (attributeValueB) {
      params.attributeValueB = attributeValueB;
    } else if (attributeValueD) {
      params.attributeValueD = attributeValueD;
    } else {
      params.attributeValue = attributeValue;
    }
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.addAttributeMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async getAttributeTypes(fileName: string): Promise<apiModels.AttributeField[]> {
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile: fileName });
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getAttributes(fileName: string, parentId: string): Promise<apiModels.AttributeValuesResponse> {
    const requestData = new ApiRequest<apiModels.AttributesValuesRequestParam>(this.mopAttributesGet, { parentFile: fileName, parentId });
    const response = await axios.post<apiModels.AttributeValuesResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }
}
