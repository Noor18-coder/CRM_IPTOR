import * as types from './Types';
import * as actions from './Actions';

import StoreMock, { OpportuntyDetailsStoreType } from '../../mocks/Store.mock';
import { OpportunityDetailsMock } from '../../mocks/OpportunityDetails.mock';
import AttributeMock from '../../mocks/Attribute.mock';
import ProductMock from '../../mocks/Product.mock';

let store: OpportuntyDetailsStoreType;

describe('Opportunty Details Actions', () => {
  beforeAll(() => {
    store = StoreMock.createOpportuntyDetailsStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as OpportuntyDetailsStoreType;
  });

  it('should create an action to SAVE_OPPTY_REPORT_PARAMS', () => {
    const opportunity = OpportunityDetailsMock.getOpportunityDetailsDefault();
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.SAVE_OPPORTUNITY_DETAILS,
        opportunity,
      },
    ];
    store.dispatch(actions.saveOpportunityDetails(opportunity));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPORTUNITY_ATTRIBUTE_VALUES', () => {
    const attributes = AttributeMock.getAttributeValueObject(1);
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.SAVE_OPPORTUNITY_ATTRIBUTE_VALUES,
        attributes,
      },
    ];
    store.dispatch(actions.saveOpportunityAttributes(attributes));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPORTUNITY_PRODUCTS', () => {
    const products = ProductMock.getProduct(1);
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.SAVE_OPPORTUNITY_PRODUCTS,
        products,
      },
    ];
    store.dispatch(actions.saveOpportunityProducts(products));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_PRODUCT_INFORMATION', () => {
    const product = ProductMock.getProduct(1)[0];
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.SAVE_PRODUCT_INFORMATION,
        product,
      },
    ];
    store.dispatch(actions.saveProductinformation(product));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPORTUNITY_CONTACTS', () => {
    const contacts = OpportunityDetailsMock.getOpportunityContact(1);
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.SAVE_OPPORTUNITY_CONTACTS,
        contacts,
      },
    ];
    store.dispatch(actions.saveOpportunityContacts(contacts));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to OPEN_FOR_EDIT', () => {
    const options = OpportunityDetailsMock.getOpportunityEditOptions();
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.OPEN_FOR_EDIT,
        options,
      },
    ];
    store.dispatch(actions.openOpportunityForm(options));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to EDIT_OPPORTUNITY_STATUS', () => {
    const success = OpportunityDetailsMock.getOpportunityEditOptions();
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.EDIT_OPPORTUNITY_STATUS,
        success,
      },
    ];
    store.dispatch(actions.setOpportunityEditSuccess(success));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_EDIT_OPPORTUNITY_ERROR', () => {
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.SET_EDIT_OPPORTUNITY_ERROR,
        error: 'Something went wrong',
      },
    ];
    store.dispatch(actions.setEditOpportunityErrorMessage('Something went wrong'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_OPPORTUNITY_DETAILS_ERROR', () => {
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.SET_OPPORTUNITY_DETAILS_ERROR,
        error: 'Something went wrong',
      },
    ];
    store.dispatch(actions.setOpportunityDetailsError('Something went wrong'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_OPPTY_DETAILS_LOADING_MASK', () => {
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.SET_OPPTY_DETAILS_LOADING_MASK,
      },
    ];
    store.dispatch(actions.setOpportunityDetailsLoader());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to REMOVE_OPPTY_DETAILS_LOADING_MASK', () => {
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.REMOVE_OPPTY_DETAILS_LOADING_MASK,
      },
    ];
    store.dispatch(actions.removeOpportunityDetailsLoader());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to RESET_OPPORTUNITY_DETAILS', () => {
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.RESET_OPPORTUNITY_DETAILS,
      },
    ];
    store.dispatch(actions.resetOpportunityDetails());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_OPPORTUNITY_APPROVAL_STATUS', () => {
    const expectedAction = [
      {
        type: types.OpportunityDetailsTypes.SET_OPPORTUNITY_APPROVAL_STATUS,
        message: 'Approved',
      },
    ];
    store.dispatch(actions.setApprovalSubmitStatus('Approved'));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
