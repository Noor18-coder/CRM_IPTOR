import axios from 'axios';
import AddOpportunityFields from './OpportunityUserDefinedFields';
import { ApiRequest } from './ApiRequest';
import GeneralMock from '../../mocks/General.mock';
import AttributeMock from '../../mocks/Attribute.mock';
import * as m from './models';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AddOpportunityFields', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get group info', async () => {
    const requestData = new ApiRequest<m.UserDefinedFieldParam>('mopAttributeType.get', {
      parentFile: 'SROMOPH',
      attributeType: GeneralMock.uuid,
    });

    mockedAxios.post.mockResolvedValue({ data: { data: [] }, status: 200 });

    await expect(AddOpportunityFields.getGroupInfo(requestData.params?.attributeType ?? '')).resolves.toEqual([]);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get attribute values', async () => {
    const responseData = AttributeMock.getUserDefinedFieldValuesResponse();
    const requestData = new ApiRequest<m.UserDefinedFieldValuesParams>('mopAttributeValues.get', {
      attributeId: GeneralMock.uuid,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(AddOpportunityFields.getAttributeValues(requestData.params?.attributeId ?? '')).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get industry info', async () => {
    const requestData = new ApiRequest<m.UserDefinedFieldParam>('mopAttributeType.get', {
      parentFile: 'SRONAM',
      attributeType: GeneralMock.uuid,
    });

    mockedAxios.post.mockResolvedValue({ data: { data: [] }, status: 200 });

    await expect(AddOpportunityFields.getIndustryInfo(requestData.params?.attributeType ?? '')).resolves.toEqual([]);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get all fields', async () => {
    const opportunityId = Array(5).fill(GeneralMock.uuid);
    const responseData = Array(5).fill(GeneralMock.uuid);

    const getGroupInfoSpy = jest.spyOn(AddOpportunityFields, 'getGroupInfo');
    getGroupInfoSpy.mockResolvedValue(responseData);

    await expect(AddOpportunityFields.getAllFields(opportunityId)).resolves.toEqual(Array(5).fill(responseData));
    expect(getGroupInfoSpy).toHaveBeenCalledTimes(5);
  });

  it('should get all fields values', async () => {
    const fields = Array(5).fill({ attributeId: GeneralMock.uuid }) as m.UserDefinedField[];
    const responseData = AttributeMock.getUserDefinedFieldValuesResponse();
    const dropdownValues: m.DropDownValues[] = fields.map((field) => ({ attributeId: field.attributeId, values: responseData.data.items }));
    const response: m.UserDefinedFieldsValueDropDown = { data: dropdownValues };

    const getAttributeValuesSpy = jest.spyOn(AddOpportunityFields, 'getAttributeValues');
    getAttributeValuesSpy.mockResolvedValue(responseData.data);

    await expect(AddOpportunityFields.getAllFieldsValues(fields)).resolves.toEqual(response);
    expect(getAttributeValuesSpy).toHaveBeenCalledTimes(5);
  });
});
