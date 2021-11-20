/**
 * Authentication State Reducer
 */

import { Reducer } from 'redux';
import { ReportTypes, ReportActions, ReportsState } from './Types';

/**
 * Initial State
 */
export const createReportInitialState = (): ReportsState => {
  return {
    opportunityReportsParams: {
      selectStage: [],
      selectOppRecordType: [],
      selectForecastCategory: [],
      selectCloseDate: [],
    },
    customerReportParams: {
      area: [],
      productFamily: [],
      industry: [],
      includeAddresses: true,
      includeContacts: true,
    },
  };
};

const initialState = createReportInitialState();

/**
 * Sales Order Reducer
 * @param state auth state object
 * @param action auth actions
 */
const reportsReducer: Reducer<ReportsState, ReportActions> = (state = initialState, action) => {
  switch (action.type) {
    case ReportTypes.SAVE_OPPTY_REPORT_PARAMS:
      return {
        ...state,
        opportunityReportParams: action.opportunityReportParams,
      };
    case ReportTypes.SAVE_CUST_REPORT_PARAMS:
      return {
        ...state,
        customerReportParams: action.customerReportParams,
      };
    default:
      return state;
  }
};

export default reportsReducer;
