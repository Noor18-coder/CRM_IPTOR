/**
 * Authentication State Reducer
 */

import { Reducer } from 'redux';
import { ReportTypes, OpportunityReportActions, ReportsState } from './Types';

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
  };
};

const initialState = createReportInitialState();

/**
 * Sales Order Reducer
 * @param state auth state object
 * @param action auth actions
 */
const reportsReducer: Reducer<ReportsState, OpportunityReportActions> = (state = initialState, action) => {
  switch (action.type) {
    case ReportTypes.SAVE_OPPTY_REPORT_PARAMS:
      return {
        ...state,
        opportunityReportParams: action.opportunityReportParams,
      };
      break;
    default:
      return state;
  }
};

export default reportsReducer;
