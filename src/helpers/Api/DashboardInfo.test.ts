import axios from 'axios';
import { DashboardInfo } from './DashboardInfo';
import { ApiRequest } from './ApiRequest';
import * as apiModels from './models';
import DashboardInfoMock from '../../mocks/DashboardInfo.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DashboardInfo', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get logs', async () => {
    const params = DashboardInfoMock.getLogsApiMethodParams();
    const responseData = DashboardInfoMock.getLogsListResponse();
    const requestData = new ApiRequest<apiModels.LogsListParams>('mopLogs.get', params.otherparams, {
      limit: params.limit,
      orderBy: params.orderBy,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(DashboardInfo.getLogs(params.limit, params.orderBy, params.otherparams)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get opportunity statistics', async () => {
    const params = DashboardInfoMock.getOpportunityStatisticsParams();
    const responseData = DashboardInfoMock.getStatisticsDetailsResponse();
    const requestData = new ApiRequest<apiModels.StatisticsDetailsParams>('crmOpportunityStatistics.get', params.otherparams, {
      limit: params.limit,
      orderBy: params.orderBy,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(DashboardInfo.getOpportunityStatistics(params.limit, params.orderBy, params.otherparams)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
