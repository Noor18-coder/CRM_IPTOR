/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-test-prefixes */
import * as types from './Types';
import * as actions from './Actions';

import StoreMock, { AddOpportunityStoreType } from '../../mocks/Store.mock';
import AddOpportunityMock from '../../mocks/AddOpportunity.mock';
import AttributeMock from '../../mocks/Attribute.mock';
import ItemMock from '../../mocks/Item.mock';
import CustomerDetailsMock from '../../mocks/CustomerDetails.mock';

let store: AddOpportunityStoreType;

describe('Add Opportunity Actions', () => {
  beforeAll(() => {
    store = StoreMock.createAddOpportunityStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as AddOpportunityStoreType;
  });

  it('should create an action to SAVE_ADD_OPPTY_DEFAULT_FIELDS', () => {
    const opportunity = AddOpportunityMock.getAddOpportunityDefaultParams();
    const expectedAction = [
      {
        type: types.AddOpportunityTypes.SAVE_ADD_OPPTY_DEFAULT_FIELDS,
        opportunity,
      },
    ];
    store.dispatch(actions.saveOpportunityParams(opportunity));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_ADD_OPPTY_ATTRIBUTE', () => {
    const attributes = AttributeMock.getUserDefinedFieldReduxParams(1);
    const expectedAction = [
      {
        type: types.AddOpportunityTypes.SAVE_ADD_OPPTY_ATTRIBUTE,
        attributes,
      },
    ];
    store.dispatch(actions.saveOpportunityAttributes(attributes));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_ADD_OPPORTUNITY_LOADER', () => {
    const expectedAction = [
      {
        type: types.AddOpportunityTypes.SET_ADD_OPPORTUNITY_LOADER,
        loader: true,
      },
    ];
    store.dispatch(actions.setOpportunityLoader(true));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_ADD_OPPORTUNITY_WINDOW', () => {
    const expectedAction = [
      {
        type: types.AddOpportunityTypes.SET_ADD_OPPORTUNITY_WINDOW,
        addOpptyWindowActive: true,
      },
    ];
    store.dispatch(actions.setOpportunityWindowActive(true));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_ADD_OPPTY_ITEMS', () => {
    const items = ItemMock.getItems(1);
    const expectedAction = [
      {
        type: types.AddOpportunityTypes.SAVE_ADD_OPPTY_ITEMS,
        items,
      },
    ];
    store.dispatch(actions.setOpportunityItems(items));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to RESET_OPPORTUNITY_DATA', () => {
    const expectedAction = [
      {
        type: types.AddOpportunityTypes.RESET_OPPORTUNITY_DATA,
      },
    ];
    store.dispatch(actions.resetOpportunityData());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_ADD_OPPTY_CONTACTS', () => {
    const contacts = CustomerDetailsMock.getCustomerDetailsContactsGroupItem(1);
    const expectedAction = [
      {
        type: types.AddOpportunityTypes.SAVE_ADD_OPPTY_CONTACTS,
        contacts,
      },
    ];
    store.dispatch(actions.setOpportunityContacts(contacts));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_ADD_OPPTY_PRODUCTS', () => {
    const products = ItemMock.getItems(1);
    const expectedAction = [
      {
        type: types.AddOpportunityTypes.SAVE_ADD_OPPTY_PRODUCTS,
        products,
      },
    ];
    store.dispatch(actions.setOpportunityProducts(products));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_ADD_OPPORTUNITY_SUCCESS', () => {
    const expectedAction = [
      {
        type: types.AddOpportunityTypes.SET_ADD_OPPORTUNITY_SUCCESS,
        success: true,
      },
    ];
    store.dispatch(actions.setAddOpportunitySuccess(true));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_ADD_OPPORTUNITY_ERROR', () => {
    const expectedAction = [
      {
        type: types.AddOpportunityTypes.SET_ADD_OPPORTUNITY_ERROR,
        error: 'Something went wrong',
      },
    ];
    store.dispatch(actions.setAddOpportunityError('Something went wrong'));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
