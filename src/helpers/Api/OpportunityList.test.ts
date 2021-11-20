import axios from 'axios';
import OpportunityList from './OpportunityList';
import { ApiRequest } from './ApiRequest';
import { OpportunityMock } from '../../mocks/Opportunity.mocks';
import * as apiModels from './models';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OpportunityList', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should opportunity list', async () => {
    const params = OpportunityMock.getOpportunityListApiMethodParams();
    const responseData = OpportunityMock.getOpportunityListResponse();
    const requestData = new ApiRequest<apiModels.OpportunityListParams>('mopOpportunities.get', params.otherparams, {
      limit: params.limit,
      offset: params.offset,
      orderBy: params.orderBy,
    });

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(OpportunityList.get(params.limit, params.offset, params.orderBy, params.otherparams)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
