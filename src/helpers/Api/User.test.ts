import axios from 'axios';
import { User } from './User';
import { ApiRequest } from './ApiRequest';
import * as models from './models';
import { UserMock } from '../../mocks/User.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('User', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get user', async () => {
    const param = UserMock.getUserId();
    const responseData = UserMock.getUserResponse();
    const requestData = { method: 'user.get', user: param };

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(User.get(param)).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get user profile', async () => {
    const responseData = UserMock.getUserResponse();
    const requestData = new ApiRequest<models.UserParams>('apiUserProfile.get');

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(User.getUserProfile()).resolves.toEqual(responseData.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get all users', async () => {
    const params = UserMock.getUsersParams();
    const responseData = UserMock.getUsersResponse();
    const requestData = new ApiRequest<models.UsersParams>('crmUsers.get', {}, params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(User.getAll(params.freeTextSearch, params.offset, params.limit)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
