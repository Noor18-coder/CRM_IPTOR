import axios, {AxiosResponse} from 'axios';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';

export default class AddOpportunityFields {
  /** API Method */
 
  private static attributesFileName: string = 'SROMOPH';
  private static apiGetAttributeType: string = 'mopAttributeType.get';
  private static apiGetAttributeValues: string = "mopAttributeValues.get";

  /**
   * Helper function to fetch Opportunity default info
   * API Method: .get
   *
   */

   static async getAllFields(opportunityId: string[]) {
       const data = await Promise.all(opportunityId.map((obj:string) => {
           return this.getGroupInfo(obj)
       })).then((data)=> {
            return data;
       });

       return  data;
  }

  static async getAllFieldsValues(fields: apiModels.UserDefinedField[]) {
    //let data:apiModels.UserDefinedFieldsValueDropDown = { data : {}};

    let data:apiModels.UserDefinedFieldsValueDropDown =  await Promise.all(fields.map(async (obj:apiModels.UserDefinedFieldValuesParams) => {
          const values = await this.getAttributeValues(obj.attributeId);
          const items = values.items ? values.items : [];
          const c:apiModels.DropDownValues = {
            attributeId: obj.attributeId,
            values: values.items
          };
          return c;

            
          
    })).then((data)=> {
      const response:apiModels.UserDefinedFieldsValueDropDown = {
        data:[]
      };
        data.forEach((obj:apiModels.DropDownValues) => {
          response.data.push(obj);
        })
        return response;
    });

    return  data;
}
  
  
  static async getGroupInfo(opportunityId: string){
    const requestData = new ApiRequest<apiModels.UserDefinedFieldParam>(this.apiGetAttributeType, { parentFile : this.attributesFileName, attributeType:opportunityId});
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return response.data.data;
  }

  static async getAttributeValues(attributeId: string){
    const requestData = new ApiRequest<apiModels.UserDefinedFieldValuesParams>(this.apiGetAttributeValues, { attributeId:attributeId});
    const response = await axios.post<apiModels.UserDefinedFieldValuesResponse>('/api/service', requestData);
    return response.data.data;
  }
}
