import axios from 'axios';
import { CountryInfo } from './Countries';
import { CountryListParams } from './models';
import { ApiRequest } from './ApiRequest';

import ConfigMock from '../../mocks/Config.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Countries', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should countries with params', async () => {
    const params = ConfigMock.getCountryListParams();
    const responseData = ConfigMock.getCountryInfoResponse(1);
    const requestData = new ApiRequest<CountryListParams>('crmCountries.get', params, { orderBy: 'description' });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CountryInfo.get(params)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should countries without params', async () => {
    const responseData = ConfigMock.getCountryInfoResponse(1);
    const requestData = new ApiRequest<CountryListParams>('crmCountries.get', {}, { orderBy: 'description' });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CountryInfo.get()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get area', async () => {
    const responseData = ConfigMock.getAreaInfoResponse(1);
    const requestData = new ApiRequest('areas.get');

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(CountryInfo.getArea()).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
