import axios from 'axios';
import * as types from './Types';
import * as actions from './Actions';

import StoreMock, { BusinesspartnersStoreType } from '../../mocks/Store.mock';
import BusinessPartnerListItemMock from '../../mocks/BusinessPartnerListItem.mock';
import BusinessPartnerList from '../../helpers/Api/CustomerList';

let store: BusinesspartnersStoreType;
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Business Partners Actions', () => {
  beforeAll(() => {
    store = StoreMock.createBusinesspartnersStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as BusinesspartnersStoreType;
  });

  it('should create an action to SAVE_LIST_BUSINESSPARTNER', () => {
    const businesspartners = BusinessPartnerListItemMock.getBusinessPartnerListItem(1);
    const expectedAction = [
      {
        type: types.BusinessPartnerTypes.SAVE_LIST_BUSINESSPARTNER,
        businesspartners,
      },
    ];
    store.dispatch(actions.saveBusinessPartnerList(businesspartners));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_BUSINESSPARTNER_FILTERS', () => {
    const filter = BusinessPartnerListItemMock.getBusinessPartnerAreaInfoOrIndustriesFilterItem(1);
    const expectedAction = [
      {
        type: types.BusinessPartnerTypes.SAVE_BUSINESSPARTNER_FILTERS,
        filter,
      },
    ];
    store.dispatch(actions.saveBusinessPartnerFilters(filter));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_BUSINESSPARTNER_SELECTED_FILTER', () => {
    const selected = BusinessPartnerListItemMock.getSelectOptionMethod();
    const expectedAction = [
      {
        type: types.BusinessPartnerTypes.SAVE_BUSINESSPARTNER_SELECTED_FILTER,
        selected,
      },
    ];
    store.dispatch(actions.saveBusinessPartnerSelectedFilter(selected));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_BUSINESSPARTNER_SEARCH_TEXT', () => {
    const expectedAction = [
      {
        type: types.BusinessPartnerTypes.SAVE_BUSINESSPARTNER_SEARCH_TEXT,
        searchText: 'searchText',
      },
    ];
    store.dispatch(actions.saveBusinessPartnerSearchText('searchText'));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

describe('Business Partners Thunk Actions', () => {
  beforeAll(() => {
    store = StoreMock.createBusinesspartnersStore();
  });

  afterEach(() => {
    mockedAxios.post.mockClear();
    mockedAxios.get.mockClear();
    store.clearActions();
  });

  afterAll(() => {
    store = {} as BusinesspartnersStoreType;
  });

  it('should get business partners', async () => {
    const businesspartners = BusinessPartnerListItemMock.getBusinessPartnerListItem(1);
    const businesspartnersdata = { items: businesspartners };
    const response = { data: businesspartnersdata };

    jest.spyOn(BusinessPartnerList, 'get').mockResolvedValueOnce(response);

    const expectedAction = [
      {
        type: types.BusinessPartnerTypes.SAVE_LIST_BUSINESSPARTNER,
        businesspartners: response,
      },
    ];

    await store.dispatch<any>(actions.getBusinesspartners('search'));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
