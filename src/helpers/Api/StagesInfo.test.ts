import axios from 'axios';
import { StagesInfo } from './StagesInfo';
import { ApiRequest } from './ApiRequest';
import ConfigMock from '../../mocks/Config.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('StagesInfo', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get stages info', async () => {
    const responseData = ConfigMock.getStageInfoResponse();
    const requestData = new ApiRequest('mopSalesStages.get');

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(StagesInfo.get()).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
