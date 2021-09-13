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
