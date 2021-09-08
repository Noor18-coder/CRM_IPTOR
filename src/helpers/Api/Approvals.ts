import axios from 'axios';
import { get } from 'lodash';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';

export class ApprovalInfo {
  /** API Method */
  private static allApprovalsMethod = 'crmOpportunityApprovalLogs.get';

  private static allNotesMethod = 'mopNotes.get';

  private static notesParentFile = 'SROMOPAL';

  static async getApprovalLogs(opportunityId: string): Promise<apiModels.ApprovalLogsDefault[]> {
    const requestData = new ApiRequest<apiModels.ApprovalLogsParams>(this.allApprovalsMethod, { opportunityId });
    const response = await axios.post<apiModels.ApprovalLogsResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }

  static async getAllNotes(parentId: string): Promise<apiModels.AllNotesDefault> {
    const requestData = new ApiRequest<apiModels.AllNotesParams>(this.allNotesMethod, { parentFile: this.notesParentFile, parentId });
    const response = await axios.post<apiModels.AllNotesResponse>('/api/service', requestData);
    return get(response, 'data.data.items', {});
  }
}
