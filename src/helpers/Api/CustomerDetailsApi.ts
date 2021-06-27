import axios from 'axios';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export default class CustomerDetailsApi {
  /** API Method */
  private static apiMethod: string = 'crmBusinessPartner.get';
  private static apiUserMethod: string = 'crmUser.get';
  private static apiAllContactsMethod: string = 'mopContactsDC1.get';
  private static apiContactAddMethod: string = 'mopContactDC1.add';
  private static apiContactUpdateMethod: string = 'mopContactDC1.update';
  private static apiCountriesMethod: string = 'crmCountries.get';
  private static apiAreasMethod: string = 'areas.get';

  /**
   * Helper function to fetch Customer default info
   * API Method: businessPartnerInfo.get
   *
   */
  static async get(businessPartner: string): Promise<apiModels.CustomerDetailsDefault> {
    const requestData = new ApiRequest<apiModels.CustomerDetailsParams>(this.apiMethod, { businessPartner : businessPartner });
    const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }

  static async getOwnerDetailsByName(user: string): Promise<apiModels.CrmUserDetails> {
    const requestData = new ApiRequest<apiModels.CrmUserDetailsParams>(this.apiUserMethod, { user : user });
    const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }
  
  static async getAllContactDetails(businessPartner: string): Promise<apiModels.CustomerDetailsContactsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.CustomerDetailsParams>(this.apiAllContactsMethod,  { businessPartner : businessPartner });
    const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
    }

  static async addContactDetails(businessPartner: apiModels.CustomerDetailsContactsGroupItem): Promise<apiModels.CustomerDetailsContactsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.CustomerDetailsContactsGroupItem>(this.apiContactAddMethod, businessPartner);
    const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async updateContactDetails(businessPartner: apiModels.CustomerDetailsContactsGroupItem): Promise<apiModels.CustomerDetailsContactsGroupItem[]> {
        const requestData = new ApiRequest<apiModels.CustomerDetailsContactsGroupItem>(this.apiContactUpdateMethod, businessPartner);
        const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
        return get(response, 'data.data.items', []);
  }

  static async getCountry(country: string): Promise<apiModels.CrmCountry[]> {
    const requestData = new ApiRequest<apiModels.CrmCountryParams>(this.apiCountriesMethod,  { country : country });
    const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getArea(area: string): Promise<apiModels.Area[]> {
    const requestData = new ApiRequest<apiModels.AreaParams>(this.apiAreasMethod,  { area : area });
    const response = await axios.post<apiModels.CustomerDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

}
