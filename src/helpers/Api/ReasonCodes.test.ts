import axios from 'axios';
import { ReasonCodes } from './ReasonCodes';
import { ApiRequest } from './ApiRequest';
import ConfigMock from '../../mocks/Config.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ReasonCodes', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should reason codes', async () => {
    const responseData = ConfigMock.getReasonCodeResponse();
    const requestData = new ApiRequest('mopReasonCodes.get');

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(ReasonCodes.get()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
