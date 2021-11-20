import axios from 'axios';
import { ReportsOpptyList } from './ReportsOpptyList';
import { ApiRequest } from './ApiRequest';
import ConfigMock from '../../mocks/Config.mock';
import ReportOpptyListMock from '../../mocks/ReportOpptyList.mock';
import * as apiModels from './models';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ReportsOpptyList', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get reports oppty list', async () => {
    const params = ConfigMock.getReportsOpptyListApiMethodParams();
    const responseData = ReportOpptyListMock.getReportsOpptyResponse();
    const requestData = new ApiRequest<apiModels.ReportRequestParams>('crmReportingOpportunities.get', params.filterParams, {
      limit: params.limit,
      offset: params.offset,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(ReportsOpptyList.get(params.filterParams, params.offset, params.limit)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
