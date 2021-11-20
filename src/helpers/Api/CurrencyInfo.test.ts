import axios from 'axios';
import { CurrencyInfo } from './CurrencyInfo';
import { ApiRequest } from './ApiRequest';

import ConfigMock from '../../mocks/Config.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CurrencyInfo', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get currency info', async () => {
    const responseData = ConfigMock.getCurrencyInfoResponse(1);
    const requestData = new ApiRequest('currencies.get');

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CurrencyInfo.get()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
