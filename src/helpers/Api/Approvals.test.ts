import axios from 'axios';
import { ApprovalInfo } from './Approvals';
import { ApprovalLogsParams, AllNotesParams } from './models';
import { ApiRequest } from './ApiRequest';

import ApprovalsMock from '../../mocks/Approvals.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Approvals', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should get approval logs', async () => {
    const params = ApprovalsMock.getApprovalLogsParams();
    const responseData = ApprovalsMock.getApprovalLogsResponse(1);
    const requestData = new ApiRequest<ApprovalLogsParams>('crmOpportunityApprovalLogs.get', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(ApprovalInfo.getApprovalLogs(params.opportunityId)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should get all notes', async () => {
    const params = ApprovalsMock.getAllNotesParams();
    const responseData = ApprovalsMock.getAllNotesResponse(params.parentId);
    const requestData = new ApiRequest<AllNotesParams>('mopNotes.get', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(ApprovalInfo.getAllNotes(params.parentId)).resolves.toEqual(responseData.data.items);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
