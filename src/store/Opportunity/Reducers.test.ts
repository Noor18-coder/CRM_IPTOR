import { OpportunityTypes, OpportunityActions } from './Types';
import opportunityReducer, { createOpportunityInitialState } from './Reducers';

import { OpportunityMock } from '../../mocks/Opportunity.mocks';

const initialState = createOpportunityInitialState();

describe('Opportunity Reducer', () => {
  it('should return the initial state', () => {
    expect(opportunityReducer(undefined, {} as OpportunityActions)).toEqual(initialState);
  });

  it('should handle SAVE_LIST_OPPTY', () => {
    const opportunities = OpportunityMock.getOpportunityListItem(1);
    const state = { ...initialState, opportunities: [...initialState.opportunities, ...opportunities] };
    expect(
      opportunityReducer(initialState, {
        type: OpportunityTypes.SAVE_LIST_OPPTY,
        opportunities,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPTY_FILTERS', () => {
    const filter = OpportunityMock.getOpportunityFilterItem(1);
    const state = { ...initialState, opportunityFilters: [...initialState.opportunityFilters, ...filter] };
    expect(
      opportunityReducer(initialState, {
        type: OpportunityTypes.SAVE_OPPTY_FILTERS,
        filter,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPTY_SEL_FILTERS', () => {
    const selected = OpportunityMock.getSelectOptionMethod();
    const state = { ...initialState, opportunitySelectedFilters: selected };
    expect(
      opportunityReducer(initialState, {
        type: OpportunityTypes.SAVE_OPPTY_SEL_FILTERS,
        selected,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPTY_SORT_ORDER', () => {
    const sortOrder = OpportunityMock.getSortModel(1);
    const state = { ...initialState, opportunitySortOrder: sortOrder };
    expect(
      opportunityReducer(initialState, {
        type: OpportunityTypes.SAVE_OPPTY_SORT_ORDER,
        sortOrder,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPTY_SEL_HANDLER', () => {
    const handler = 'handler';
    const state = { ...initialState, opportunitySelectedHandler: handler };
    expect(
      opportunityReducer(initialState, {
        type: OpportunityTypes.SAVE_OPPTY_SEL_HANDLER,
        handler,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPTY_SEARCH_TEXT', () => {
    const searchText = 'searchText';
    const state = { ...initialState, opportunitySearchText: searchText };
    expect(
      opportunityReducer(initialState, {
        type: OpportunityTypes.SAVE_OPPTY_SEARCH_TEXT,
        searchText,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPTY_CHANGE_HANDLER', () => {
    const handlerChange = true;
    const state = { ...initialState, opportunityHandlerChange: handlerChange };
    expect(
      opportunityReducer(initialState, {
        type: OpportunityTypes.SAVE_OPPTY_CHANGE_HANDLER,
        handlerChange,
      })
    ).toEqual(state);
  });
});
