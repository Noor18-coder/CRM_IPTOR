/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { SelectedFilters } from '../../helpers/Api/models';
import { ReportTypes, SaveOpptyReportsAction } from './Types';

/** Action to set OpptyReportParams in reports */
export const saveOpptyReportParams: ActionCreator<SaveOpptyReportsAction> = (filter: SelectedFilters) => {
  return {
    type: ReportTypes.SAVE_OPPTY_REPORT_PARAMS,
    opportunityReportParams: filter,
  };
};

export const saveOpportunityParams = (reports: SelectedFilters) => {
  return async (dispatch: Dispatch) => {
    return dispatch(saveOpptyReportParams(reports));
  };
};
