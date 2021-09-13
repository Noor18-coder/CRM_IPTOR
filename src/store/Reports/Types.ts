/** Authentication Action Types */

import { Action } from 'redux';
import { SelectedFilters } from '../../helpers/Api/models';

/** Enum for Authentication Actions */
export enum ReportTypes {
  SAVE_OPPTY_REPORT_PARAMS = 'SAVE_OPPTY_REPORT_PARAMS',
}

/** Authentication success action */
export interface SaveOpptyReportsAction extends Action<ReportTypes.SAVE_OPPTY_REPORT_PARAMS> {
  opportunityReportParams: SelectedFilters;
}

// /** Authentication success action */
// export interface SaveOpportunityFilterAction extends Action<OpportunityTypes.SAVE_OPPTY_FILTERS> {
//   filter: OpportunityFilterItem[];
// }

export type OpportunityReportActions = SaveOpptyReportsAction;

/** Authentication state definition */
export interface ReportsState {
  readonly opportunityReportsParams: SelectedFilters;
}
