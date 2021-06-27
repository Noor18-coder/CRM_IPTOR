import axios, {AxiosResponse} from 'axios';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export class Attributes {
  /** API Method */
 
  private static opportunityAttributesFileName: string = 'SROMOPH';
  private static customersAttributesFileName: string = 'SRONAM';
  private static attributeMethod : string = 'mopAttributeTypes.get';


  
  static async getOpportunityAttributes():Promise<apiModels.AttributeResponse>{
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile : this.opportunityAttributesFileName});
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }

  static async getCustomerAttributes(){
    const requestData = new ApiRequest<apiModels.AttributeParams>(this.attributeMethod, { parentFile : this.customersAttributesFileName});
    const response = await axios.post<apiModels.AttributeResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }
}
