/**
 * Opportunity Actions and Middleware definition
 */
import { ActionCreator, Dispatch } from 'redux';
import { SelectedFilters, CustomerFilters } from '../../helpers/Api/models';
import { ReportTypes, SaveOpptyReportsAction, SaveCustReportsAction } from './Types';

/** Action to set OpptyReportParams in reports */
export const saveOpptyReportParams: ActionCreator<SaveOpptyReportsAction> = (filter: SelectedFilters) => {
  return {
    type: ReportTypes.SAVE_OPPTY_REPORT_PARAMS,
    opportunityReportParams: filter,
  };
};

export const saveCustReportParams: ActionCreator<SaveCustReportsAction> = (filter: CustomerFilters) => {
  return {
    type: ReportTypes.SAVE_CUST_REPORT_PARAMS,
    customerReportParams: filter,
  };
};

export const saveOpportunityParams = (reports: SelectedFilters) => {
  return async (dispatch: Dispatch) => {
    return dispatch(saveOpptyReportParams(reports));
  };
};

export const saveCustomerParams = (reports: CustomerFilters) => {
  return async (dispatch: Dispatch) => {
    return dispatch(saveCustReportParams(reports));
  };
};
