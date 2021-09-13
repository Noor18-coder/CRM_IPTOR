/** Authentication Action Types */

import { Action } from 'redux';
import { SelectedFilters, CustomerFilters } from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum ReportTypes {
  SAVE_OPPTY_REPORT_PARAMS = 'SAVE_OPPTY_REPORT_PARAMS',
  SAVE_CUST_REPORT_PARAMS = 'SAVE_CUST_REPORT_PARAMS',
}

/** Authentication success action */
export interface SaveOpptyReportsAction extends Action<ReportTypes.SAVE_OPPTY_REPORT_PARAMS> {
  opportunityReportParams: SelectedFilters;
}

export interface SaveCustReportsAction extends Action<ReportTypes.SAVE_CUST_REPORT_PARAMS> {
  customerReportParams: CustomerFilters;
}

// /** Authentication success action */
// export interface SaveOpportunityFilterAction extends Action<OpportunityTypes.SAVE_OPPTY_FILTERS> {
//   filter: OpportunityFilterItem[];
// }

export type ReportActions = SaveOpptyReportsAction | SaveCustReportsAction;

/** Authentication state definition */
export interface ReportsState {
  readonly opportunityReportsParams: SelectedFilters;
  readonly customerReportParams: CustomerFilters;
}
