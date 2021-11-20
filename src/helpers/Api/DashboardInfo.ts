import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import {
  LogsListParams,
  LogsListResponse,
  LogsInfoItem,
  StatisticsDetailsParams,
  StatisticsDetailsResponse,
  StatisticsDetailsItem,
  StatisticDetailsResponse,
} from './models';
import { ApiRequest } from './ApiRequest';

export class DashboardInfo {
  /** API Method */
  private static logsApiMethod = 'mopLogs.get';

  private static statisticsApiMethod = 'crmOpportunityStatistics.get';

  static async getLogs(limit?: number, orderBy?: string, otherparams?: LogsListParams): Promise<LogsInfoItem[]> {
    const params: LogsListParams = {
      logParentFile: otherparams?.logParentFile,
      loggedAction: otherparams?.loggedAction,
    };
    const requestData = new ApiRequest<LogsListParams>(this.logsApiMethod, params, { limit, orderBy });
    const response = await axios.post<LogsListResponse>('/api/service', requestData);
    return get<AxiosResponse<LogsListResponse>, 'data', 'data', 'items', LogsInfoItem[]>(response, ['data', 'data', 'items'], []);
  }

  static async getOpportunityStatistics(limit?: number, orderBy?: string, otherparams?: StatisticsDetailsParams): Promise<StatisticsDetailsItem[]> {
    const params: StatisticsDetailsParams = {
      groupBy: otherparams?.groupBy,
      closeDateFrom: otherparams?.closeDateFrom,
      closeDateTo: otherparams?.closeDateTo,
    };
    const requestData = new ApiRequest<StatisticsDetailsParams>(this.statisticsApiMethod, params, { limit, orderBy });
    const response = await axios.post<StatisticsDetailsResponse>('/api/service', requestData);
    return get<AxiosResponse<StatisticsDetailsResponse>, 'data', 'data', 'items', StatisticsDetailsItem[]>(response, ['data', 'data', 'items'], []);
  }

  static async getOpportunityStatisticsCloseDate(
    limit?: number,
    orderBy?: string,
    otherparams?: StatisticsDetailsParams,
    offset?: number
  ): Promise<StatisticDetailsResponse> {
    const params: StatisticsDetailsParams = {
      groupBy: otherparams?.groupBy,
      closeDateFrom: otherparams?.closeDateFrom,
      closeDateTo: otherparams?.closeDateTo,
    };
    const requestData = new ApiRequest<StatisticsDetailsParams>(this.statisticsApiMethod, params, { offset, limit, orderBy });
    const response = await axios.post<StatisticDetailsResponse>('/api/service', requestData);
    return get<AxiosResponse<StatisticDetailsResponse>, 'data'>(response, 'data');
  }
}
