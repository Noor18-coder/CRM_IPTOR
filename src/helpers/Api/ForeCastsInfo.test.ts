import axios from 'axios';
import { ForeCastsInfo } from './ForeCastsInfo';
import { ApiRequest } from './ApiRequest';
import ForeCastsInfoMock from '../../mocks/ForeCastInfo.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ForeCastsInfo', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get fore casts info', async () => {
    const responseData = ForeCastsInfoMock.getForeCastInfoResponse();
    const requestData = new ApiRequest('crmForecastCategories.get');

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(ForeCastsInfo.get()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
