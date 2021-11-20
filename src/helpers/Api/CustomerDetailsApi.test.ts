import axios from 'axios';
import CustomerDetailsApi from './CustomerDetailsApi';
import { ApiRequest } from './ApiRequest';
import * as apiModels from './models';
import CustomerDetailsMock from '../../mocks/CustomerDetails.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CustomerDetailsApi', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get business partner', async () => {
    const params = CustomerDetailsMock.getCustomerDetailsParams();
    const responseData = CustomerDetailsMock.getCustomerDetailsDefaultResponse();
    const requestData = new ApiRequest<apiModels.CustomerDetailsParams>('crmBusinessPartner.get', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CustomerDetailsApi.get(params.businessPartner)).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get owner details by name', async () => {
    const params = CustomerDetailsMock.getCrmUserDetailsParams();
    const responseData = CustomerDetailsMock.getCrmUserDetailsResponse();
    const requestData = new ApiRequest<apiModels.CrmUserDetailsParams>('crmUser.get', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CustomerDetailsApi.getOwnerDetailsByName(params.user)).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get all contact details', async () => {
    const params = CustomerDetailsMock.getCustomerDetailsParams();
    const responseData = CustomerDetailsMock.getCustomerDetailsContactsGroupItemResponse();
    const requestData = new ApiRequest<apiModels.CustomerDetailsParams>('mopContactsDC1.get', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CustomerDetailsApi.getAllContactDetails(params.businessPartner)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should add contact details', async () => {
    const params = CustomerDetailsMock.getCustomerDetailsContactsGroupItem(1)[0];
    const responseData = CustomerDetailsMock.getCustomerDetailsContactsGroupItemResponse();
    const requestData = new ApiRequest<apiModels.CustomerDetailsContactsGroupItem>('mopContactDC1.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CustomerDetailsApi.addContactDetails(params)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should update contact details', async () => {
    const params = CustomerDetailsMock.getCustomerDetailsContactsGroupItem(1)[0];
    const responseData = CustomerDetailsMock.getCustomerDetailsContactsGroupItemResponse();
    const requestData = new ApiRequest<apiModels.CustomerDetailsContactsGroupItem>('mopContactDC1.update', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CustomerDetailsApi.updateContactDetails(params)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should delete contact', async () => {
    const params = CustomerDetailsMock.getCustomerDeleteParams();
    const responseData = CustomerDetailsMock.getCustomerDeleteResponse();
    const requestData = new ApiRequest<apiModels.CustomerDeleteParams>('mopContactDC1.delete', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CustomerDetailsApi.deleteContact(params.businessPartner, params.contactDC)).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get country', async () => {
    const params = CustomerDetailsMock.getCrmCountryParams();
    const responseData = CustomerDetailsMock.getCrmCountryResponse();
    const requestData = new ApiRequest<apiModels.CrmCountryParams>('crmCountries.get', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CustomerDetailsApi.getCountry(params.country)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get area', async () => {
    const params = CustomerDetailsMock.getAreaParams();
    const responseData = CustomerDetailsMock.getAreaResponse();
    const requestData = new ApiRequest<apiModels.AreaParams>('areas.get', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CustomerDetailsApi.getArea(params.area)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
