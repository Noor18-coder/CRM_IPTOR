import axios from 'axios';
import AddCustomerApi from './AddCustomer';
import { AddBusinessPartnerDefaultParams, SaveUserDefinedFieldParam } from './models';
import { ApiRequest } from './ApiRequest';

import CustomerDetailsMock from '../../mocks/CustomerDetails.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AddCustomerApi', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should add business partner', async () => {
    const params = CustomerDetailsMock.getAddBusinessPartnerDefaultParams();
    const responseData = CustomerDetailsMock.getAddBusinessPartnerResponse(params.businessPartner ?? '');
    const requestData = new ApiRequest<AddBusinessPartnerDefaultParams>('crmBusinessPartner.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(AddCustomerApi.add(params)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should update business partner', async () => {
    const params = CustomerDetailsMock.getAddBusinessPartnerDefaultParams();
    const responseData = CustomerDetailsMock.getAddBusinessPartnerResponse(params.businessPartner ?? '');
    const requestData = new ApiRequest<AddBusinessPartnerDefaultParams>('crmBusinessPartner.update', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(AddCustomerApi.update(params)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should add attributes with date type', async () => {
    const actionParams = CustomerDetailsMock.getAddAttributesThunkActionParams('date');
    const params = CustomerDetailsMock.getSaveUserDefinedFieldParam(
      actionParams.businessPartnerId,
      actionParams.attributeType,
      actionParams.attributeValue,
      actionParams.type
    );
    const responseData = CustomerDetailsMock.getAddBusinessPartnerResponse(actionParams.businessPartnerId ?? '');
    const requestData = new ApiRequest<SaveUserDefinedFieldParam>('mopAttribute.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(
      AddCustomerApi.addAttributes(actionParams.businessPartnerId, actionParams.attributeType, actionParams.attributeValue, actionParams.type)
    ).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should add attributes without date type', async () => {
    const actionParams = CustomerDetailsMock.getAddAttributesThunkActionParams();
    const params = CustomerDetailsMock.getSaveUserDefinedFieldParam(
      actionParams.businessPartnerId,
      actionParams.attributeType,
      actionParams.attributeValue,
      actionParams.type
    );
    const responseData = CustomerDetailsMock.getAddBusinessPartnerResponse(actionParams.businessPartnerId ?? '');
    const requestData = new ApiRequest<SaveUserDefinedFieldParam>('mopAttribute.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(
      AddCustomerApi.addAttributes(actionParams.businessPartnerId, actionParams.attributeType, actionParams.attributeValue, actionParams.type)
    ).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
