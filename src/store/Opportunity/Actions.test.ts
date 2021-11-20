import * as types from './Types';
import * as actions from './Actions';

import StoreMock, { OpportunitiesStoreType } from '../../mocks/Store.mock';
import { OpportunityMock } from '../../mocks/Opportunity.mocks';

let store: OpportunitiesStoreType;

describe('Opportunity Actions', () => {
  beforeAll(() => {
    store = StoreMock.createOpportunitiesStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as OpportunitiesStoreType;
  });

  it('should create an action to SAVE_OPPTY_REPORT_PARAMS', () => {
    const opportunities = OpportunityMock.getOpportunityListItem(1);
    const expectedAction = [
      {
        type: types.OpportunityTypes.SAVE_LIST_OPPTY,
        opportunities,
      },
    ];
    store.dispatch(actions.saveOpptyList(opportunities));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPTY_FILTERS', () => {
    const filter = OpportunityMock.getOpportunityFilterItem(1);
    const expectedAction = [
      {
        type: types.OpportunityTypes.SAVE_OPPTY_FILTERS,
        filter,
      },
    ];
    store.dispatch(actions.saveOpptyFilters(filter));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPTY_SEL_FILTERS', () => {
    const selected = OpportunityMock.getSelectOptionMethod();
    const expectedAction = [
      {
        type: types.OpportunityTypes.SAVE_OPPTY_SEL_FILTERS,
        selected,
      },
    ];
    store.dispatch(actions.saveOpptySelFilters(selected));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPTY_SORT_ORDER', () => {
    const sortOrder = OpportunityMock.getSortModel(1);
    const expectedAction = [
      {
        type: types.OpportunityTypes.SAVE_OPPTY_SORT_ORDER,
        sortOrder,
      },
    ];
    store.dispatch(actions.saveOpptySortOrder(sortOrder));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPTY_SEL_HANDLER', () => {
    const handler = 'handler';
    const expectedAction = [
      {
        type: types.OpportunityTypes.SAVE_OPPTY_SEL_HANDLER,
        handler,
      },
    ];
    store.dispatch(actions.saveOpptySelHandler(handler));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPTY_CHANGE_HANDLER', () => {
    const handlerChange = true;
    const expectedAction = [
      {
        type: types.OpportunityTypes.SAVE_OPPTY_CHANGE_HANDLER,
        handlerChange,
      },
    ];
    store.dispatch(actions.saveOpptyHandlerChange(handlerChange));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPTY_SEARCH_TEXT', () => {
    const searchText = 'searchText';
    const expectedAction = [
      {
        type: types.OpportunityTypes.SAVE_OPPTY_SEARCH_TEXT,
        searchText,
      },
    ];
    store.dispatch(actions.saveOpptySearchText(searchText));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

describe('Opportunity Thunk Actions', () => {
  beforeAll(() => {
    store = StoreMock.createOpportunitiesStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as OpportunitiesStoreType;
  });

  it('should save opportunity params', async () => {
    const filter = OpportunityMock.getOpportunityFilterItem(1);
    const expectedAction = [
      {
        type: types.OpportunityTypes.SAVE_OPPTY_FILTERS,
        filter,
      },
    ];

    await store.dispatch<any>(actions.saveOpportunityFilters(filter));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
