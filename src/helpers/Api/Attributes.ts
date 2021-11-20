import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';
import { Constants } from '../../config/Constants';

export class Attributes {
  /** API Method */

  private static opportunityAttributesFileName = Constants.OPPORTUNITY_ATTRIBUTES_PARENT_FILE;

  private static customersAttributesFileName = Constants.CUSTOMER_PARENT_FILE;

  private static mopAttributesGet = 'mopAttributes.get';

  private static attributeMethod = 'mopAttributeTypes.get';

  private static addAttributeMethod = 'mopAttribute.add';

  private static deleteAttributeMethod = 'mopAttribute.delete';

  private static getAttributeMethod = 'mopAttribute.get';

  private static updateAttributeMethod = 'mopAttribute.update';

  private static mopAttributeTypeGet = 'mopAttributeType.get';

  private static mopAttributeValues = 'mopAttributeValues.get';

  static async getOpportunityAttributes(): Promise<apiModels.AttributeField[]> {
    const requestData = new ApiRequest<apiModels.AttributeParams>(
      this.attributeMethod,
      { parentFile: Constants.OPPORTUNITY_ATTRIBUTES_PARENT_FILE },
      { limit: 100, offset: 0 }
    );
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get<AxiosResponse<apiModels.AttributeResponse>, 'data', 'data', 'items', apiModels.AttributeField[]>(
      response,
      ['data', 'data', 'items'],
      []
    );
  }

  static async getCustomerAttributes(): Promise<apiModels.AttributeField[]> {
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile: Constants.CUSTOMER_PARENT_FILE });
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get<AxiosResponse<apiModels.AttributeResponse>, 'data', 'data', 'items', apiModels.AttributeField[]>(
      response,
      ['data', 'data', 'items'],
      []
    );
  }

  static async getProductAttribues(): Promise<apiModels.AttributeField[]> {
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile: Constants.OPPORTUNITY_PRODUCTS_FILE });
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get<AxiosResponse<apiModels.AttributeResponse>, 'data', 'data', 'items', apiModels.AttributeField[]>(
      response,
      ['data', 'data', 'items'],
      []
    );
  }

  static async getOpportunityContactAttributes(): Promise<apiModels.AttributeField[]> {
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile: Constants.OPPORTUNITY_CONTACTS_FILE });
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getCustomerContactAttributes(): Promise<apiModels.AttributeField[]> {
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile: Constants.CUSTOMER_CONTACTS_FILE });
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
    const response = await axios.post<apiModels.AddBusinessPartnerResponse>('/api/service', requestData);
    return get<AxiosResponse<apiModels.AddBusinessPartnerResponse>, 'data'>(response, 'data');
  }

  static async addAttribute(params: apiModels.SaveAttributeFieldParam): Promise<any> {
    // const filename = type === 'opportunity' ? this.opportunityAttributesFileName : this.customersAttributesFileName;
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.addAttributeMethod, params);
    const response = await axios.post('/api/service', requestData);
    return get<AxiosResponse, 'data'>(response, 'data');
  }

  static async getAttribute(parentId: string, parentFile: string, attributeType: string): Promise<any> {
    const params = {
      parentId,
      parentFile,
      attributeType,
    };
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.getAttributeMethod, params);
    const response = await axios.post('/api/service', requestData);
    return get<AxiosResponse, 'data'>(response, 'data');
  }

  static async updateAttribute(params: apiModels.SaveAttributeFieldParam): Promise<any> {
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.updateAttributeMethod, params);
    const response = await axios.post('/api/service', requestData);
    return get<AxiosResponse, 'data'>(response, 'data');
  }

  static async getAttributeType(attributeType: string, parentFile: string): Promise<any> {
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.mopAttributeTypeGet, { attributeType, parentFile });
    const response = await axios.post('/api/service', requestData);
    return get<AxiosResponse, 'data'>(response, 'data');
  }

  static async getAttributeValues(attributeId: string): Promise<apiModels.UserDefinedFieldValuesResponse['data']> {
    const requestData = new ApiRequest<apiModels.AttributeValuesRequestParam>(this.mopAttributeValues, { attributeId });
    const response = await axios.post<apiModels.UserDefinedFieldValuesResponse>('/api/service', requestData);
    const defaultData = {} as apiModels.UserDefinedFieldValuesResponse['data'];
    return get<AxiosResponse<apiModels.UserDefinedFieldValuesResponse>, 'data', 'data', apiModels.UserDefinedFieldValuesResponse['data']>(
      response,
      ['data', 'data'],
      defaultData
    );
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
    const response = await axios.post('/api/service', requestData);
    return get<AxiosResponse, 'data'>(response, 'data');
  }

  static async getAttributeTypes(fileName: string): Promise<apiModels.AttributeField[]> {
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile: fileName });
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get<AxiosResponse<apiModels.AttributeResponse>, 'data', 'data', 'items', apiModels.AttributeField[]>(
      response,
      ['data', 'data', 'items'],
      []
    );
  }

  static async getAttributes(fileName: string, parentId: string): Promise<apiModels.AttributeValuesResponse['data']> {
    const requestData = new ApiRequest<apiModels.AttributesValuesRequestParam>(this.mopAttributesGet, { parentFile: fileName, parentId });
    const response = await axios.post<apiModels.AttributeValuesResponse>('/api/service', requestData);
    const defaultData = {} as apiModels.AttributeValuesResponse['data'];
    return get<AxiosResponse<apiModels.AttributeValuesResponse>, 'data', 'data', apiModels.AttributeValuesResponse['data']>(
      response,
      ['data', 'data'],
      defaultData
    );
  }

  static async deleteAttribute(valueId: string): Promise<any> {
    const requestData = new ApiRequest<apiModels.DeleteAttributeMethodParams>(this.deleteAttributeMethod, { valueId });
    const response = await axios.post('/api/service', requestData);
    return get<AxiosResponse, 'data'>(response, 'data');
  }
}
