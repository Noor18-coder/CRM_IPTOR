import { BusinessPartnerTypes, BusinessPartnerActions } from './Types';
import businessPartnerReducer, { createBusinessPartnerInitialState } from './Reducer';
import BusinessPartnerListItemMock from '../../mocks/BusinessPartnerListItem.mock';

const initialBusinessPartnersState = createBusinessPartnerInitialState();

describe('Business Partners Reducer', () => {
  it('should return the initial state', () => {
    expect(businessPartnerReducer(undefined, {} as BusinessPartnerActions)).toEqual(initialBusinessPartnersState);
  });

  it('should handle SAVE_LIST_BUSINESSPARTNER', () => {
    const businesspartners = BusinessPartnerListItemMock.getBusinessPartnerListItem(1);
    const state = {
      ...initialBusinessPartnersState,
      businesspartners: [...initialBusinessPartnersState.businesspartners, ...businesspartners],
    };
    expect(
      businessPartnerReducer(initialBusinessPartnersState, {
        type: BusinessPartnerTypes.SAVE_LIST_BUSINESSPARTNER,
        businesspartners,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_BUSINESSPARTNER_FILTERS', () => {
    const filter = BusinessPartnerListItemMock.getBusinessPartnerAreaInfoOrIndustriesFilterItem(1);
    const state = {
      ...initialBusinessPartnersState,
      businessPartnerFilters: [...initialBusinessPartnersState.businessPartnerFilters, ...filter],
    };
    expect(
      businessPartnerReducer(initialBusinessPartnersState, {
        type: BusinessPartnerTypes.SAVE_BUSINESSPARTNER_FILTERS,
        filter,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_BUSINESSPARTNER_SELECTED_FILTER', () => {
    const selected = BusinessPartnerListItemMock.getSelectOptionMethod();
    const state = {
      ...initialBusinessPartnersState,
      businessPartnerSelectedFilter: selected,
    };
    expect(
      businessPartnerReducer(initialBusinessPartnersState, {
        type: BusinessPartnerTypes.SAVE_BUSINESSPARTNER_SELECTED_FILTER,
        selected,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_BUSINESSPARTNER_SEARCH_TEXT', () => {
    const state = {
      ...initialBusinessPartnersState,
      businessPartnerSearchText: 'searchText',
    };
    expect(
      businessPartnerReducer(initialBusinessPartnersState, {
        type: BusinessPartnerTypes.SAVE_BUSINESSPARTNER_SEARCH_TEXT,
        searchText: 'searchText',
      })
    ).toEqual(state);
  });
});
