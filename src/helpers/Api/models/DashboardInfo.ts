export interface LogsInfoItem {
  logId: string;
  creationDate: string;
  creationTime: string;
  parentFile: string;
  parentId: string;
  loggedAction: string;
}

export interface LogsListResponse {
  data: {
    items: LogsInfoItem[];
  };
}

export interface LogsListParams {
  logParentFile?: string;
  loggedAction?: string;
}

export interface StatisticsDetailsItem {
  industry: string;
  total: number;
  inProgress: number;
  won: number;
  lost: number;
  totalValue: number;
  inProgressValue: number;
  wonValue: number;
  lostValue: number;
  currency: string;
}

export interface StatisticsDetailsResponse {
  data: {
    items: StatisticsDetailsItem[];
  };
}

export interface StatisticDetailsResponse {
  control?: {
    total: number;
  };
  data: {
    items: StatisticsDetailsItem[];
  };
}

export interface StatisticsDetailsParams {
  groupBy?: string;
  closeDateFrom?: string;
  closeDateTo?: string;
}

export interface TypeFilters {
  valueField: string;
  id: string;
}

export interface LogsApiMethodParams {
  limit?: number;
  orderBy?: string;
  otherparams?: LogsListParams;
}

export interface OpportunityStatisticsParams {
  limit?: number;
  orderBy?: string;
  otherparams?: StatisticsDetailsParams;
}
