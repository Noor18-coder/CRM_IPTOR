import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import {
  AddOpportunityDefaultParams,
  AddOpportunityResponse,
  SaveUserDefinedFieldParam,
  AddItemToOpportunityParams,
  AddItemToOpportunityResponse,
  DeleteCustomerContactParams,
  AddCustomerContactRequestParams,
} from './models';
import { ApiRequest } from './ApiRequest';

export default class AddOpportunityApi {
  /** API Method */
  private static opportinityAddMethod = 'mopOpportunity.add';

  private static opportunitUpdateMethod = 'mopOpportunity.update';

  private static saveAttributeValueMethod = 'mopAttribute.add';

  private static saveAttributeValueMethodFile = 'SROMOPH';

  private static saveItemMethod = 'mopItem.add';

  private static saveContactFileName = 'SROMOPCH';

  private static saveContactMethod = 'mopContact.add';

  private static deleteCustomerContact = 'mopContact.delete';

  /**
   * Helper function to create an opportunity.
   * API Method: mopOpportunity.add
   * @param opportunity: Object contains all required fields to create opportunity.
   *
   */
  static async add(opportunity: AddOpportunityDefaultParams): Promise<AddOpportunityResponse> {
    const requestData = new ApiRequest<AddOpportunityDefaultParams>(this.opportinityAddMethod, opportunity);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  /**
   * Helper function to create an opportunity.
   * API Method: mopOpportunity.add
   * @param opportunity: Object contains all required fields to create opportunity.
   *
   */
  static async update(opportunity: AddOpportunityDefaultParams): Promise<AddOpportunityResponse> {
    const requestData = new ApiRequest<AddOpportunityDefaultParams>(this.opportunitUpdateMethod, opportunity);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  /**
   * Helper function to fetch Business Partner Info
   * API Method: mopOpportunity.get
   * @param freeTextSearch search term
   *
   */
  static async addAttributes(opportunityId: string, attributeType: string, attributeValue: string | number): Promise<AddOpportunityResponse> {
    const params: SaveUserDefinedFieldParam = {
      attributeType,
      parentFile: this.saveAttributeValueMethodFile,
      parentId: opportunityId,
      attributeValue,
    };
    const requestData = new ApiRequest<SaveUserDefinedFieldParam>(this.saveAttributeValueMethod, params);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  /**
   * Helper function to fetch Business Partner Info
   * API Method: mopOpportunity.get
   * @param freeTextSearch search term
   *
   */
  static async addItem(opportunityId: string, item: string, quantity: number, unit: string): Promise<AddItemToOpportunityResponse> {
    const params: AddItemToOpportunityParams = {
      parentFile: this.saveAttributeValueMethodFile,
      parentId: opportunityId,
      item,
      quantity,
      unit,
    };
    const requestData = new ApiRequest<AddItemToOpportunityParams>(this.saveItemMethod, params);
    const response = await axios.post<AddItemToOpportunityResponse>('/api/service', requestData);
    return get(response, 'data');
  }

  /**
   * Helper function to fetch Business Partner Info
   * API Method: mopOpportunity.get
   * @param freeTextSearch search term
   *
   */
  static async addContact(params: AddCustomerContactRequestParams): Promise<AxiosResponse> {
    const request: AddCustomerContactRequestParams = {
      contactParentFile: this.saveAttributeValueMethodFile,
      contactParentId: params.contactParentId,
      contactPerson: params.contactPerson,
      contactDC: params.contactDC,
      phone: params.phone,
      mobile: params.mobile,
      whatsApp: params.whatsApp,
      linkedin: params.email,
      fax: params.fax,
      email: params.email,
    };

    const requestData = new ApiRequest<AddCustomerContactRequestParams>(this.saveContactMethod, request);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);

    return get(response, 'data');
  }

  /**
   * Helper function to fetch Business Partner Info
   * API Method: mopOpportunity.get
   * @param freeTextSearch search term
   *
   */
  static async deleteContact(params: DeleteCustomerContactParams): Promise<AxiosResponse> {
    const request: DeleteCustomerContactParams = {
      contactParentFile: this.saveAttributeValueMethodFile,
      contactParentId: params.contactParentId,
      contactId: params.contactId,
    };

    const requestData = new ApiRequest<DeleteCustomerContactParams>(this.deleteCustomerContact, request);
    const response = await axios.post<AxiosResponse>('/api/service', requestData);
    return get(response, 'data');
  }
}
