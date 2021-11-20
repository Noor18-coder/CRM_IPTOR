import { ReportTypes, ReportActions } from './Types';
import reportsReducer, { createReportInitialState } from './Reducers';
import ReportsMock from '../../mocks/Reports.mock';

const initialReportsState = createReportInitialState();

describe('Reports Reducer', () => {
  it('should return the initial state', () => {
    expect(reportsReducer(undefined, {} as ReportActions)).toEqual(initialReportsState);
  });

  it('should handle SAVE_OPPTY_REPORT_PARAMS', () => {
    const filter = ReportsMock.getSelectedFilters();
    const state = { ...initialReportsState, opportunityReportParams: filter };
    expect(
      reportsReducer(initialReportsState, {
        type: ReportTypes.SAVE_OPPTY_REPORT_PARAMS,
        opportunityReportParams: filter,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_CUST_REPORT_PARAMS', () => {
    const filter = ReportsMock.getCustomerFilters();
    const state = { ...initialReportsState, customerReportParams: filter };
    expect(
      reportsReducer(initialReportsState, {
        type: ReportTypes.SAVE_CUST_REPORT_PARAMS,
        customerReportParams: filter,
      })
    ).toEqual(state);
  });
});
