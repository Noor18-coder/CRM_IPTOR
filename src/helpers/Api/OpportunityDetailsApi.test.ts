import axios from 'axios';
import OpportunityDetailsApi from './OpportunityDetailsApi';
import { ApiRequest } from './ApiRequest';
import GeneralMock from '../../mocks/General.mock';
import AttributeMock from '../../mocks/Attribute.mock';
import ProductMock from '../../mocks/Product.mock';
import AddOpportunityMock from '../../mocks/AddOpportunity.mock';
import { OpportunityDetailsMock } from '../../mocks/OpportunityDetails.mock';
import * as m from './models';
import { Constants } from '../../config/Constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OpportunityDetailsApi', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get opportunity details', async () => {
    const responseData = AttributeMock.getAttributeValuesResponse();
    const requestData = new ApiRequest<m.OpportunityDetailsParams>('mopOpportunity.get', { opportunityId: GeneralMock.uuid });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(OpportunityDetailsApi.get(requestData.params?.opportunityId ?? '')).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get group info', async () => {
    const responseData = AttributeMock.getAttributeValuesResponse();
    const requestData = new ApiRequest<m.OpportunityDetailsGroupItemParams>('mopAttributes.get', {
      parentFile: 'SROMOPH',
      parentId: GeneralMock.uuid,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(OpportunityDetailsApi.getGroupInfo(requestData.params?.parentId ?? '')).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get opportunity contact', async () => {
    const responseData = OpportunityDetailsMock.getOpportunityContactsResponse();
    const requestData = new ApiRequest<m.OpportunityContactsParams>('mopContacts.get', {
      rootId: GeneralMock.uuid,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(OpportunityDetailsApi.getOpportunityContact(requestData.params?.rootId ?? '')).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get opportunity items', async () => {
    const responseData = ProductMock.getProductResponse();
    const requestData = new ApiRequest<m.ProductParams>('mopItems.get', {
      rootId: GeneralMock.uuid,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(OpportunityDetailsApi.getOpportunityItems(requestData.params?.rootId ?? '')).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get contact details', async () => {
    const responseData = AttributeMock.getAttributeValuesResponse();
    const requestData = new ApiRequest<m.OpportunityDetailsGroupItemParams>('mopAttributes.get', {
      parentId: GeneralMock.uuid,
      parentFile: 'SROMOPCH',
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(OpportunityDetailsApi.getContactDetails(requestData.params?.parentId ?? '')).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get product details', async () => {
    const responseData = AttributeMock.getAttributeValuesResponse();
    const requestData = new ApiRequest<m.OpportunityDetailsGroupItemParams>('mopAttributes.get', {
      parentId: GeneralMock.uuid,
      parentFile: Constants.OPPORTUNITY_PRODUCTS_FILE,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(OpportunityDetailsApi.getProductDetails(requestData.params?.parentId ?? '')).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get customer group info', async () => {
    const responseData = OpportunityDetailsMock.getOpportunityDetailsDefaultResponse();
    const requestData = new ApiRequest<m.OpportunityDetailsGroupItemParams>('mopAttributes.get', {
      parentId: GeneralMock.uuid,
      parentFile: 'SRONAM',
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(OpportunityDetailsApi.getCustomerGroupInfo(requestData.params?.parentId ?? '')).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should delete item', async () => {
    const params = AddOpportunityMock.getDeleteOpportunityItemParams();
    const requestData = new ApiRequest<m.DeleteOpportunityItemParams>('mopItem.delete', params);

    mockedAxios.post.mockResolvedValue({ data: {}, status: 200 });

    await expect(OpportunityDetailsApi.deleteItem(params)).resolves.toEqual({});
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should opportunity delete', async () => {
    const requestData = new ApiRequest<m.OpportunityDetailsParams>('mopOpportunity.delete', { opportunityId: GeneralMock.uuid });

    mockedAxios.post.mockResolvedValue({ data: {}, status: 200 });

    await expect(OpportunityDetailsApi.opportunityDelete(requestData.params?.opportunityId ?? '')).resolves.toEqual({});
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
