import axios, { AxiosResponse } from 'axios';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';

export default class AddOpportunityFields {
  /** API Method */

  private static attributesFileName = 'SROMOPH';

  private static apiGetAttributeType = 'mopAttributeType.get';

  private static apiGetAttributeValues = 'mopAttributeValues.get';

  private static industryAttributesFileName = 'SRONAM';

  /**
   * Helper function to fetch Opportunity default info
   * API Method: .get
   *
   */

  static async getAllFields(opportunityId: string[]): Promise<any> {
    const res = await Promise.all(
      opportunityId.map((obj: string) => {
        return this.getGroupInfo(obj);
      })
    ).then((data) => {
      return data;
    });

    return res;
  }

  static async getAllFieldsValues(fields: apiModels.UserDefinedField[]): Promise<any> {
    const res: apiModels.UserDefinedFieldsValueDropDown = await Promise.all(
      fields.map(async (obj: apiModels.UserDefinedFieldValuesParams) => {
        const values = await this.getAttributeValues(obj.attributeId);
        const c: apiModels.DropDownValues = {
          attributeId: obj.attributeId,
          values: values.items,
        };
        return c;
      })
    ).then((data) => {
      const response: apiModels.UserDefinedFieldsValueDropDown = {
        data: [],
      };
      data.forEach((obj: apiModels.DropDownValues) => {
        response.data.push(obj);
      });
      return response;
    });

    return res;
  }

  static async getGroupInfo(opportunityId: string): Promise<any> {
    const requestData = new ApiRequest<apiModels.UserDefinedFieldParam>(this.apiGetAttributeType, {
      parentFile: this.attributesFileName,
      attributeType: opportunityId,
    });
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return response.data.data;
  }

  static async getAttributeValues(attributeId: string): Promise<any> {
    const requestData = new ApiRequest<apiModels.UserDefinedFieldValuesParams>(this.apiGetAttributeValues, { attributeId });
    const response = await axios.post<apiModels.UserDefinedFieldValuesResponse>('/api/service', requestData);
    return response.data.data;
  }

  static async getIndustryInfo(attributeType: string): Promise<any> {
    const requestData = new ApiRequest<apiModels.UserDefinedFieldParam>(this.apiGetAttributeType, {
      parentFile: this.industryAttributesFileName,
      attributeType,
    });
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return response.data.data;
  }
}
