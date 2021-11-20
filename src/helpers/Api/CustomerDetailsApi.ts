import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';

export default class CustomerDetailsApi {
  /** API Method */
  private static apiMethod = 'crmBusinessPartner.get';

  private static apiUserMethod = 'crmUser.get';

  private static apiAllContactsMethod = 'mopContactsDC1.get';

  private static ViewContactsMethod = 'mopContactDC1.get';

  private static apiContactAddMethod = 'mopContactDC1.add';

  private static apiContactUpdateMethod = 'mopContactDC1.update';

  private static apiContactDeleteMethod = 'mopContactDC1.delete';

  private static apiCountriesMethod = 'crmCountries.get';

  private static apiAreasMethod = 'areas.get';

  /**
   * Helper function to fetch Customer default info
   * API Method: businessPartnerInfo.get
   *
   */
  static async get(businessPartner: string): Promise<apiModels.CustomerDetailsDefault> {
    const requestData = new ApiRequest<apiModels.CustomerDetailsParams>(this.apiMethod, { businessPartner });
    const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }

  static async getOwnerDetailsByName(user: string): Promise<apiModels.CrmUserDetails> {
    const requestData = new ApiRequest<apiModels.CrmUserDetailsParams>(this.apiUserMethod, { user });
    const response = await axios.post<apiModels.CrmUserDetailsResponse>('/api/service', requestData);
    const defaultData = {} as apiModels.CrmUserDetails;
    return get<AxiosResponse<apiModels.CrmUserDetailsResponse>, 'data', 'data', apiModels.CrmUserDetails>(response, ['data', 'data'], defaultData);
  }

  static async getAllContactDetails(businessPartner: string): Promise<apiModels.CustomerDetailsContactsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.CustomerDetailsParams>(this.apiAllContactsMethod, { businessPartner });
    const response = await axios.post<apiModels.CustomerDetailsContactsGroupItemResponse>('/api/service', requestData);
    return get<
      AxiosResponse<apiModels.CustomerDetailsContactsGroupItemResponse>,
      'data',
      'data',
      'items',
      apiModels.CustomerDetailsContactsGroupItem[]
    >(response, ['data', 'data', 'items'], []);
  }

  static async ViewContactDetails(contactDC: any): Promise<apiModels.CustomerDetailsContactsGroupItem> {
    const requestData = new ApiRequest<apiModels.ViewCustomerDetailsParams>(this.ViewContactsMethod, { contactDC });
    const response = await axios.post<apiModels.ViewCustomerDetailsContactsItemResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }

  static async addContactDetails(businessPartner: apiModels.CustomerDetailsContactsGroupItem): Promise<apiModels.CustomerDetailsContactsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.CustomerDetailsContactsGroupItem>(this.apiContactAddMethod, businessPartner);
    const response = await axios.post<apiModels.CustomerDetailsContactsGroupItemResponse>('/api/service', requestData);
    return get<
      AxiosResponse<apiModels.CustomerDetailsContactsGroupItemResponse>,
      'data',
      'data',
      'items',
      apiModels.CustomerDetailsContactsGroupItem[]
    >(response, ['data', 'data', 'items'], []);
  }

  static async updateContactDetails(
    businessPartner: apiModels.CustomerDetailsContactsGroupItem
  ): Promise<apiModels.CustomerDetailsContactsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.CustomerDetailsContactsGroupItem>(this.apiContactUpdateMethod, businessPartner);
    const response = await axios.post<apiModels.CustomerDetailsContactsGroupItemResponse>('/api/service', requestData);
    return get<
      AxiosResponse<apiModels.CustomerDetailsContactsGroupItemResponse>,
      'data',
      'data',
      'items',
      apiModels.CustomerDetailsContactsGroupItem[]
    >(response, ['data', 'data', 'items'], []);
  }

  static async deleteContact(businessPartner: string, contactDC: string): Promise<apiModels.CustomerDeleteParams> {
    const requestData = new ApiRequest<apiModels.CustomerDeleteParams>(this.apiContactDeleteMethod, {
      businessPartner,
      contactDC,
    });
    const response = await axios.post<apiModels.CustomerDeleteResponse>('/api/service', requestData);
    return get<AxiosResponse<apiModels.CustomerDeleteResponse>, 'data', 'data', apiModels.CustomerDeleteParams>(
      response,
      ['data', 'data'],
      {} as apiModels.CustomerDeleteParams
    );
  }

  static async getCountry(country: string): Promise<apiModels.CrmCountry[]> {
    const requestData = new ApiRequest<apiModels.CrmCountryParams>(this.apiCountriesMethod, { country });
    const response = await axios.post<apiModels.CrmCountryResponse>('/api/service', requestData);
    return get<AxiosResponse<apiModels.CrmCountryResponse>, 'data', 'data', 'items', apiModels.CrmCountry[]>(response, ['data', 'data', 'items'], []);
  }

  static async getArea(area: string): Promise<apiModels.Area[]> {
    const requestData = new ApiRequest<apiModels.AreaParams>(this.apiAreasMethod, { area });
    const response = await axios.post<apiModels.AreaResponse>('/api/service', requestData);
    return get<AxiosResponse<apiModels.AreaResponse>, 'data', 'data', 'items', apiModels.Area[]>(response, ['data', 'data', 'items'], []);
  }
}
