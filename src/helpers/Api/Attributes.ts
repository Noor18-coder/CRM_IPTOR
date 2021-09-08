import axios, {AxiosResponse} from 'axios';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export class Attributes {
  /** API Method */
 
  private static opportunityAttributesFileName: string = 'SROMOPH';
  private static customersAttributesFileName: string = 'SRONAM';
  private static mopAttributesGet : string = 'mopAttributes.get';
  private static attributeMethod : string = 'mopAttributeTypes.get';
  private static addAttributeMethod : string = 'mopAttribute.add';
  private static updateAttributeMethod : string = 'mopAttribute.update';
  private static mopAttributeTypeGet: string = 'mopAttributeType.get';
  private static mopAttributeValues: string = 'mopAttributeValues.get';


  
  static async getOpportunityAttributes():Promise<apiModels.AttributeResponse>{
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile : this.opportunityAttributesFileName});
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getCustomerAttributes():Promise<apiModels.AttributeResponse>{
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile : this.customersAttributesFileName});
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async updateAttributes(businessPartnerId: string, attributeType: string, attributeValue: string | number, valueId: string): Promise<apiModels.AddBusinessPartnerResponse> {
    const params: apiModels.SaveAttributeFieldParam = {
        attributeType: attributeType,
        parentFile: this.customersAttributesFileName,
        parentId: businessPartnerId,
        attributeValue: attributeValue,
        valueId: valueId
    }
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.updateAttributeMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
}



   
  static async addAttribute(type: string, parentId:string, attributeType: string, attributeValue: string | number): Promise<any> {
    const filename = type === 'opportunity' ? this.opportunityAttributesFileName : this.customersAttributesFileName;
    const params: apiModels.SaveAttributeFieldParam = {
      attributeType: attributeType,
      parentFile: this.opportunityAttributesFileName,
      parentId: parentId,
      attributeValue: attributeValue
    }
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.addAttributeMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async updateAttribute( attributeType: string, valueId: string, attributeValue: string | number): Promise<any> {
    const params: apiModels.SaveAttributeFieldParam = {
      valueId: valueId,
      attributeValue: attributeValue, 
     attributeType: attributeType
    }
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.updateAttributeMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async getAttributeType(attributeType:string, parentFile:string): Promise<AxiosResponse> {
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.mopAttributeTypeGet, {attributeType:attributeType, parentFile:parentFile});
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  } 

  static async getAttributeValues(attributeId: string) {
    const requestData = new ApiRequest<apiModels.AttributeValuesRequestParam>(this.mopAttributeValues, { attributeId:attributeId});
    const response = await axios.post<apiModels.UserDefinedFieldValuesResponse>('/api/service', requestData);
    return response.data.data;
  }

  static async addAttributes(fileName: string, parentId:string, attributeType: string, attributeValue: string | number): Promise<any> {
      const params: apiModels.SaveAttributeFieldParam = {
      attributeType: attributeType,
      parentFile: fileName,
      parentId: parentId,
      attributeValue: attributeValue
    }
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>(this.addAttributeMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  static async getAttributeTypes(fileName: string): Promise<apiModels.AttributeField[]> {
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile :fileName});
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getAttributes(fileName: string, parentId:string): Promise<apiModels.AttributeValuesResponse> {
    const requestData = new ApiRequest<apiModels.AttributesValuesRequestParam>(this.mopAttributesGet, { parentFile :fileName, parentId: parentId});
    const response = await axios.post<apiModels.AttributeValuesResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }

}
