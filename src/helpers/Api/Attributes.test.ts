import axios from 'axios';
import { Attributes } from './Attributes';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';
import { Constants } from '../../config/Constants';
import AttributeMock from '../../mocks/Attribute.mock';
import CustomerDetailsMock from '../../mocks/CustomerDetails.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Attributes', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get opportunity attributes', async () => {
    const responseData = AttributeMock.getAttributeResponse(1);
    const requestData = new ApiRequest<apiModels.AttributeParams>(
      'mopAttributeTypes.get',
      { parentFile: Constants.OPPORTUNITY_ATTRIBUTES_PARENT_FILE },
      { limit: 100, offset: 0 }
    );

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.getOpportunityAttributes()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get customer attributes', async () => {
    const responseData = AttributeMock.getAttributeResponse(1);
    const requestData = new ApiRequest<apiModels.AttributeParams>('mopAttributeTypes.get', { parentFile: Constants.CUSTOMER_PARENT_FILE });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.getCustomerAttributes()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get product attribues', async () => {
    const responseData = AttributeMock.getAttributeResponse(1);
    const requestData = new ApiRequest<apiModels.AttributeParams>('mopAttributeTypes.get', { parentFile: Constants.OPPORTUNITY_PRODUCTS_FILE });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.getProductAttribues()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get opportunity contact attributes', async () => {
    const responseData = AttributeMock.getAttributeResponse(1);
    const requestData = new ApiRequest<apiModels.AttributeParams>('mopAttributeTypes.get', { parentFile: Constants.OPPORTUNITY_CONTACTS_FILE });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.getOpportunityContactAttributes()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get customer contact attributes', async () => {
    const responseData = AttributeMock.getAttributeResponse(1);
    const requestData = new ApiRequest<apiModels.AttributeParams>('mopAttributeTypes.get', { parentFile: Constants.CUSTOMER_CONTACTS_FILE });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.getCustomerContactAttributes()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should update attributes when type is date', async () => {
    const actionParams = AttributeMock.getUpdateAttributeParamsMethodParams('date');
    const params = AttributeMock.getUpdateAttributeParams(
      actionParams.businessPartnerId,
      actionParams.attributeType,
      actionParams.attributeValue,
      actionParams.valueId,
      actionParams.type
    );
    const responseData = CustomerDetailsMock.getAddBusinessPartnerResponse(actionParams.businessPartnerId);
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>('mopAttribute.update', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(
      Attributes.updateAttributes(
        actionParams.businessPartnerId,
        actionParams.attributeType,
        actionParams.attributeValue,
        actionParams.valueId,
        actionParams.type
      )
    ).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should update attributes when type not been provided', async () => {
    const actionParams = AttributeMock.getUpdateAttributeParamsMethodParams();
    const params = AttributeMock.getUpdateAttributeParams(
      actionParams.businessPartnerId,
      actionParams.attributeType,
      actionParams.attributeValue,
      actionParams.valueId,
      actionParams.type
    );
    const responseData = CustomerDetailsMock.getAddBusinessPartnerResponse(actionParams.businessPartnerId);
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>('mopAttribute.update', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(
      Attributes.updateAttributes(
        actionParams.businessPartnerId,
        actionParams.attributeType,
        actionParams.attributeValue,
        actionParams.valueId,
        actionParams.type
      )
    ).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should add attribue', async () => {
    const params = AttributeMock.getSaveAttributeFieldParam();
    const responseData = { status: true };
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>('mopAttribute.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.addAttribute(params)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get attribue', async () => {
    const actionParams = AttributeMock.getSaveAttributeFieldParamRequired();
    const params = {
      parentId: actionParams.parentId,
      parentFile: actionParams.parentFile,
      attributeType: actionParams.attributeType,
    };
    const responseData = { status: true };
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>('mopAttribute.get', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.getAttribute(params.parentId, params.parentFile, params.attributeType)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should update attribue', async () => {
    const params = AttributeMock.getSaveAttributeFieldParam();
    const responseData = { status: true };
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>('mopAttribute.update', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.updateAttribute(params)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get attribute type', async () => {
    const params = AttributeMock.getSaveAttributeFieldParamRequired();
    const responseData = { status: true };
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>('mopAttributeType.get', {
      attributeType: params.attributeType,
      parentFile: params.parentFile,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.getAttributeType(params.attributeType, params.parentFile)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get attribute values', async () => {
    const params = AttributeMock.getAttributeValuesRequestParam();
    const responseData = AttributeMock.getUserDefinedFieldValuesResponse(1);
    const requestData = new ApiRequest<apiModels.AttributeValuesRequestParam>('mopAttributeValues.get', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.getAttributeValues(params.attributeId)).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should add attributes with attributeValue', async () => {
    const actionParams = AttributeMock.getaAdAttributesMethodParams();
    const params = AttributeMock.getAddAttributesParams(
      actionParams.fileName,
      actionParams.parentId,
      actionParams.attributeType,
      actionParams.attributeValue
    );
    const responseData = { status: true };
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>('mopAttribute.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(
      Attributes.addAttributes(actionParams.fileName, actionParams.parentId, actionParams.attributeType, actionParams.attributeValue)
    ).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should add attributes with attributeValueB', async () => {
    const actionParams = AttributeMock.getaAdAttributesMethodParams(true, false);
    const params = AttributeMock.getAddAttributesParams(
      actionParams.fileName,
      actionParams.parentId,
      actionParams.attributeType,
      actionParams.attributeValue,
      actionParams.attributeValueB
    );
    const responseData = { status: true };
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>('mopAttribute.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(
      Attributes.addAttributes(
        actionParams.fileName,
        actionParams.parentId,
        actionParams.attributeType,
        actionParams.attributeValue,
        actionParams.attributeValueB
      )
    ).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should add attributes with attributeValueD', async () => {
    const actionParams = AttributeMock.getaAdAttributesMethodParams(false, true);
    const params = AttributeMock.getAddAttributesParams(
      actionParams.fileName,
      actionParams.parentId,
      actionParams.attributeType,
      actionParams.attributeValue,
      undefined,
      actionParams.attributeValueD
    );
    const responseData = { status: true };
    const requestData = new ApiRequest<apiModels.SaveAttributeFieldParam>('mopAttribute.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(
      Attributes.addAttributes(
        actionParams.fileName,
        actionParams.parentId,
        actionParams.attributeType,
        actionParams.attributeValue,
        undefined,
        actionParams.attributeValueD
      )
    ).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get attribute types', async () => {
    const fileName = Constants.OPPORTUNITY_ATTRIBUTES_PARENT_FILE;
    const responseData = AttributeMock.getAttributeResponse(1);
    const requestData = new ApiRequest<apiModels.AttributeParams>('mopAttributeTypes.get', { parentFile: fileName });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.getAttributeTypes(fileName)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get attributes', async () => {
    const params = AttributeMock.getAttributesValuesRequestParam();
    const responseData = AttributeMock.getAttributeValuesResponse(1);
    const requestData = new ApiRequest<apiModels.AttributesValuesRequestParam>('mopAttributes.get', {
      parentFile: params.parentFile,
      parentId: params.parentId,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.getAttributes(params.parentFile, params.parentId)).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should delete attribute', async () => {
    const params = AttributeMock.getDeleteAttributeMethodParams();
    const responseData = { status: true };
    const requestData = new ApiRequest<apiModels.DeleteAttributeMethodParams>('mopAttribute.delete', {
      valueId: params.valueId,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(Attributes.deleteAttribute(params.valueId)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
