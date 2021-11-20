import axios from 'axios';
import { OpportunityType } from './OpportunityType';
import { ApiRequest } from './ApiRequest';
import OpportunityTypeMock from '../../mocks/OpportunityType.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OpportunityType', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should opportunity type', async () => {
    const responseData = OpportunityTypeMock.getOpportunityTypeResponse();
    const requestData = new ApiRequest('crmOpportunityTypes.get');

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(OpportunityType.get()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should default opportunity info', async () => {
    const responseData = OpportunityTypeMock.getDefaultOpportunityInfoResponse();
    const requestData = new ApiRequest('mopOpportunityDefaults.get');

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(OpportunityType.getDefault()).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
