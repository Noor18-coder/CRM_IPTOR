import { AddOpportunityTypes, AddOpportunityReduxActions } from './Types';
import addOpportunityReducer, { createAddOpportunitInitialState } from './Reducers';
import AddOpportunityMock from '../../mocks/AddOpportunity.mock';
import AttributeMock from '../../mocks/Attribute.mock';
import ItemMock from '../../mocks/Item.mock';
import CustomerDetailsMock from '../../mocks/CustomerDetails.mock';

const initialAddOpportunityState = createAddOpportunitInitialState();

describe('Add Opportunity Reducer', () => {
  it('should return the initial state', () => {
    expect(addOpportunityReducer(undefined, {} as AddOpportunityReduxActions)).toEqual(initialAddOpportunityState);
  });

  it('should handle SAVE_ADD_OPPTY_DEFAULT_FIELDS', () => {
    const opportunity = AddOpportunityMock.getAddOpportunityDefaultParams();
    const state = {
      ...initialAddOpportunityState,
      opportunityDefaultParams: { ...initialAddOpportunityState.opportunityDefaultParams, ...opportunity },
    };
    expect(
      addOpportunityReducer(initialAddOpportunityState, {
        type: AddOpportunityTypes.SAVE_ADD_OPPTY_DEFAULT_FIELDS,
        opportunity,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_ADD_OPPTY_ATTRIBUTE', () => {
    const attributes = AttributeMock.getUserDefinedFieldReduxParams(1);
    const state = { ...initialAddOpportunityState, attributes };
    expect(
      addOpportunityReducer(initialAddOpportunityState, {
        type: AddOpportunityTypes.SAVE_ADD_OPPTY_ATTRIBUTE,
        attributes,
      })
    ).toEqual(state);
  });

  it('should handle SET_ADD_OPPORTUNITY_LOADER', () => {
    const state = { ...initialAddOpportunityState, loader: true };
    expect(
      addOpportunityReducer(initialAddOpportunityState, {
        type: AddOpportunityTypes.SET_ADD_OPPORTUNITY_LOADER,
        loader: true,
      })
    ).toEqual(state);
  });

  it('should handle SET_ADD_OPPORTUNITY_WINDOW', () => {
    const state = { ...initialAddOpportunityState, addOpptyWindowActive: true };
    expect(
      addOpportunityReducer(initialAddOpportunityState, {
        type: AddOpportunityTypes.SET_ADD_OPPORTUNITY_WINDOW,
        addOpptyWindowActive: true,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_ADD_OPPTY_ITEMS', () => {
    const items = ItemMock.getItems(1);
    const state = { ...initialAddOpportunityState, items: [...items] };
    expect(
      addOpportunityReducer(initialAddOpportunityState, {
        type: AddOpportunityTypes.SAVE_ADD_OPPTY_ITEMS,
        items,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_ADD_OPPTY_CONTACTS', () => {
    const contacts = CustomerDetailsMock.getCustomerDetailsContactsGroupItem(1);
    const state = { ...initialAddOpportunityState, contacts };
    expect(
      addOpportunityReducer(initialAddOpportunityState, {
        type: AddOpportunityTypes.SAVE_ADD_OPPTY_CONTACTS,
        contacts,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_ADD_OPPTY_PRODUCTS', () => {
    const products = ItemMock.getItems(1);
    const state = { ...initialAddOpportunityState, products };
    expect(
      addOpportunityReducer(initialAddOpportunityState, {
        type: AddOpportunityTypes.SAVE_ADD_OPPTY_PRODUCTS,
        products,
      })
    ).toEqual(state);
  });

  it('should handle SET_ADD_OPPORTUNITY_SUCCESS', () => {
    const state = { ...initialAddOpportunityState, success: true };
    expect(
      addOpportunityReducer(initialAddOpportunityState, {
        type: AddOpportunityTypes.SET_ADD_OPPORTUNITY_SUCCESS,
        success: true,
      })
    ).toEqual(state);
  });

  it('should handle SET_ADD_OPPORTUNITY_ERROR', () => {
    const state = { ...initialAddOpportunityState, error: 'Something went wrong' };
    expect(
      addOpportunityReducer(initialAddOpportunityState, {
        type: AddOpportunityTypes.SET_ADD_OPPORTUNITY_ERROR,
        error: 'Something went wrong',
      })
    ).toEqual(state);
  });

  it('should handle RESET_OPPORTUNITY_DATA', () => {
    const state = {
      ...initialAddOpportunityState,
      loader: false,
      addOpptyWindowActive: false,
      opportunityDefaultParams: {},
      attributes: [],
      items: [],
      contacts: [],
      products: [],
      error: '',
      success: false,
    };
    expect(
      addOpportunityReducer(initialAddOpportunityState, {
        type: AddOpportunityTypes.RESET_OPPORTUNITY_DATA,
      })
    ).toEqual(state);
  });
});
