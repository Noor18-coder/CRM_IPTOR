import * as types from './Types';
import * as actions from './Actions';

import StoreMock, { ReportsStoreType } from '../../mocks/Store.mock';
import ReportsMock from '../../mocks/Reports.mock';

let store: ReportsStoreType;

describe('Reports Actions', () => {
  beforeAll(() => {
    store = StoreMock.createReportsStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as ReportsStoreType;
  });

  it('should create an action to SAVE_OPPTY_REPORT_PARAMS', () => {
    const filter = ReportsMock.getSelectedFilters();
    const expectedAction = [
      {
        type: types.ReportTypes.SAVE_OPPTY_REPORT_PARAMS,
        opportunityReportParams: filter,
      },
    ];
    store.dispatch(actions.saveOpptyReportParams(filter));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_CUST_REPORT_PARAMS', () => {
    const filter = ReportsMock.getCustomerFilters();
    const expectedAction = [
      {
        type: types.ReportTypes.SAVE_CUST_REPORT_PARAMS,
        customerReportParams: filter,
      },
    ];
    store.dispatch(actions.saveCustReportParams(filter));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

describe('Reports Thunk Actions', () => {
  beforeAll(() => {
    store = StoreMock.createReportsStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as ReportsStoreType;
  });

  it('should save opportunity params', async () => {
    const filter = ReportsMock.getSelectedFilters();
    const expectedAction = [
      {
        type: types.ReportTypes.SAVE_OPPTY_REPORT_PARAMS,
        opportunityReportParams: filter,
      },
    ];

    await store.dispatch<any>(actions.saveOpportunityParams(filter));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should save custom reports', async () => {
    const filter = ReportsMock.getCustomerFilters();
    const expectedAction = [
      {
        type: types.ReportTypes.SAVE_CUST_REPORT_PARAMS,
        customerReportParams: filter,
      },
    ];

    await store.dispatch<any>(actions.saveCustomerParams(filter));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
