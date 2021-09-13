export interface DateParams {
  dateFrom: string;
  dateTo: string;
}

export interface SelectedFilters {
  selectStage: string[];
  selectOppRecordType: string[];
  selectForecastCategory: string[];
  selectCloseDate: string[];
}

export interface SaveParams {
  key: string;
  value: string;
}

export interface ReportRequestParams {
  selectStage: string[];
  selectOppRecordType: string[];
  selectForecastCategory: string[];
  selectCloseDate: DateParams[];
}
