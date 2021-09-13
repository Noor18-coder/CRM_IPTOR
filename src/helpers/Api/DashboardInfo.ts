import axios from 'axios';
import { get } from 'lodash';
import { LogsListParams, LogsListResponse, LogsInfoItem } from './models';
import { ApiRequest } from './ApiRequest';

export class DashboardInfo {
  /** API Method */
  private static logsApiMethod = 'mopLogs.get';

  static async getLogs(limit?: number, orderBy?: string, otherparams?: LogsListParams): Promise<LogsInfoItem[]> {
    const params: LogsListParams = {
      logParentFile: otherparams?.logParentFile,
      loggedAction: otherparams?.loggedAction,
    };
    const requestData = new ApiRequest<LogsListParams>(this.logsApiMethod, params, { limit, orderBy });
    const response = await axios.post<LogsListResponse>('/api/service', requestData);
    return get(response, 'data.data.items', []);
  }
}
