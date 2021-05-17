import { CompanyInfo } from './CompanyInfo';
import { CompanyInfoItemResponse } from './models';
import axios from 'axios';
import { ApiRequest } from './ApiRequest';
import { CompanyInfoMock } from '../../mocks/CompanyInfo.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const companyInfoMock = CompanyInfoMock.getCompanyInfoItem();

describe('CompanyInfo', () => {
  let data: CompanyInfoItemResponse;

  beforeAll(() => {
    data = companyInfoMock;
  });

  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should return company info object', async () => {
    const requestData = new ApiRequest('environmentCompanies.get');

    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data : data }));

    await expect(CompanyInfo.get()).resolves.toEqual(companyInfoMock);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});

