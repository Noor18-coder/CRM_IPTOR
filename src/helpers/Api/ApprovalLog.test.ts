import axios from 'axios';
import { ApprovalLog } from './ApprovalLog';
import { ApprovalLogAddRequestParams, DeleteApprovalLogsParams } from './models';
import { ApiRequest } from './ApiRequest';

import ApprovalsMock from '../../mocks/Approvals.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApprovalLog', () => {
  afterEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should add approval log', async () => {
    const params = ApprovalsMock.getApprovalLogAddRequestParams();
    const responseData = ApprovalsMock.getApprovalLogAddResponse();
    const requestData = new ApiRequest<ApprovalLogAddRequestParams>('crmOpportunityApprovalLog.add', params);

    mockedAxios.post.mockResolvedValue({ data: responseData, status: 200 });

    await expect(ApprovalLog.addApprovalLog(params)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });

  it('should delete opportunity approval logs', async () => {
    const params = ApprovalsMock.getDeleteApprovalLogsParams();
    const responseData = ApprovalsMock.getApprovalLogAddResponse();
    const requestData = new ApiRequest<DeleteApprovalLogsParams>('crmOpportunityApprovalLog.delete', params);

    mockedAxios.post.mockResolvedValue({ data: { data: { items: responseData } }, status: 200 });

    await expect(ApprovalLog.deleteOpportunityApprovalLogs(params)).resolves.toEqual(responseData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/service', requestData);
  });
});
