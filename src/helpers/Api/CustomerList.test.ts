import axios from 'axios';
import BusinessPartnerList from './CustomerList';
import { ApiRequest } from './ApiRequest';
import * as apiModels from './models';
import BusinessPartnerListItemMock from '../../mocks/BusinessPartnerListItem.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BusinessPartnerList', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get business partner list', async () => {
    const params = BusinessPartnerListItemMock.getBusinessPartnerListApiMethodParams();
    const responseData = BusinessPartnerListItemMock.getBusinessPartnerListResponse();
    const requestData = new ApiRequest<apiModels.BusinessPartnerListParams>('crmBusinessPartners.get', params.otherparams, {
      freeTextSearch: params.freeTextSearch,
      limit: params.limit,
      offset: params.offset,
      orderBy: params.orderBy,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(BusinessPartnerList.get(params.freeTextSearch, params.limit, params.offset, params.orderBy, params.otherparams)).resolves.toEqual(
      responseData
    );
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get Areas', async () => {
    const responseData = BusinessPartnerListItemMock.getAreaListResponse();
    const requestData = new ApiRequest<apiModels.AreaListParams>('areas.get');

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(BusinessPartnerList.getAreas()).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
