import axios from 'axios';
import * as apiModels from './models';
import { ApiRequest } from './ApiRequest';
import { get } from 'lodash';

export default class OpportunityDetailsApi {
  /** API Method */
  private static apiMethod: string = 'mopOpportunity.get';
  private static attributesFileName: string = 'SROMOPH';
   private static apiGroupMethod: string = 'mopAttributes.get';

  /**
   * Helper function to fetch Opportunity default info
   * API Method: mopOpportunity.get
   *
   */
  static async get(opportunityId: string): Promise<apiModels.OpportunityDetailsDefault> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsParams>(this.apiMethod, { opportunityId : opportunityId });
    const response = await axios.post<apiModels.OpportunityDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data', {});
  }

  static async getGroupInfo(opportunityId: string): Promise<apiModels.OpportunityDetailsGroupItem[]> {
    const requestData = new ApiRequest<apiModels.OpportunityDetailsGroupItemParams>(this.apiGroupMethod, { parentId : opportunityId, parentFile: this.attributesFileName});
    const response = await axios.post<apiModels.OpportunityDetailsDefaultResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }
}
