import axios from 'axios';
import AddOpportunityApi from './AddOpportunityApi';
import {
  AddOpportunityDefaultParams,
  SaveUserDefinedFieldParam,
  AddItemToOpportunityParams,
  AddCustomerContactRequestParams,
  DeleteCustomerContactParams,
} from './models';
import { ApiRequest } from './ApiRequest';

import AddOpportunityMock from '../../mocks/AddOpportunity.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AddOpportunityApi', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should add opportunity', async () => {
    const params = AddOpportunityMock.getAddOpportunityDefaultParams();
    const responseData = AddOpportunityMock.getAddOpportunityResponse(params.opportunityId ?? '');
    const requestData = new ApiRequest<AddOpportunityDefaultParams>('mopOpportunity.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(AddOpportunityApi.add(params)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should update opportunity', async () => {
    const params = AddOpportunityMock.getAddOpportunityDefaultParams();
    const responseData = AddOpportunityMock.getUpdateOpportunityResponse();
    const requestData = new ApiRequest<AddOpportunityDefaultParams>('mopOpportunity.update', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(AddOpportunityApi.update(params)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should add attributes', async () => {
    const actionParams = AddOpportunityMock.getAddAttributesThunkActionParams();
    const params = AddOpportunityMock.getSaveUserDefinedFieldParam(
      actionParams.opportunityId,
      actionParams.attributeType,
      actionParams.attributeValue
    );
    const responseData = AddOpportunityMock.getAddOpportunityResponse(actionParams.opportunityId ?? '');
    const requestData = new ApiRequest<SaveUserDefinedFieldParam>('mopAttribute.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(
      AddOpportunityApi.addAttributes(actionParams.opportunityId, actionParams.attributeType, actionParams.attributeValue)
    ).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should add items', async () => {
    const actionParams = AddOpportunityMock.getAddItemsActionParams();
    const params = AddOpportunityMock.getAddItemToOpportunityParams(actionParams);
    const responseData = AddOpportunityMock.getAddItemToOpportunityResponse();
    const requestData = new ApiRequest<AddItemToOpportunityParams>('mopItem.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(AddOpportunityApi.addItem(actionParams.opportunityId, actionParams.item, actionParams.quantity, actionParams.unit)).resolves.toEqual(
      responseData
    );
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should add contact', async () => {
    const params = AddOpportunityMock.getAddCustomerContactRequestParams();
    const requestData = new ApiRequest<AddCustomerContactRequestParams>('mopContact.add', params);

    mockedAxios.post.mockResolvedValue({ data: params, status: 200 });

    await expect(AddOpportunityApi.addContact(params)).resolves.toEqual(params);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should delete contact', async () => {
    const params = AddOpportunityMock.getDeleteCustomerContactParams();
    const requestData = new ApiRequest<DeleteCustomerContactParams>('mopContact.delete', params);

    mockedAxios.post.mockResolvedValue({ data: params, status: 200 });

    await expect(AddOpportunityApi.deleteContact(params)).resolves.toEqual(params);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
