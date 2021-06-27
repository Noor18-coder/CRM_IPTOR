import axios, {AxiosResponse} from 'axios';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export class Attributes {
  /** API Method */
 
  private static opportunityAttributesFileName: string = 'SROMOPH';
  private static customersAttributesFileName: string = 'SRONAM';
  private static attributeMethod : string = 'mopAttributeTypes.get';
  private static updateAttributeMethod: string = 'mopAttribute.update';

  
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

}
