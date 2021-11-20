import * as types from './Types';
import * as actions from './Actions';

import StoreMock, { AddCustomerStoreType } from '../../mocks/Store.mock';
import CustomerDetailsMock from '../../mocks/CustomerDetails.mock';
import { OpportunityDetailsMock } from '../../mocks/OpportunityDetails.mock';

let store: AddCustomerStoreType;

describe('Add Customer Actions', () => {
  beforeAll(() => {
    store = StoreMock.createAddCustomerStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as AddCustomerStoreType;
  });

  it('should create an action to SAVE_BUSINESS_PARTNER_DEFAULT_FIELDS', () => {
    const businessPartner = CustomerDetailsMock.getCustomerDetailsDefaultFields();
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_DEFAULT_FIELDS,
        businessPartner,
      },
    ];
    store.dispatch(actions.saveCustomerDefaultFields(businessPartner));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_BUSINESS_PARTNER_ATTRIBUTE', () => {
    const attributes = OpportunityDetailsMock.getOpportunityDetailsGroupItem(1);
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_ATTRIBUTE,
        attributes,
      },
    ];
    store.dispatch(actions.saveBusinessPartnerAttributes(attributes));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_BUSINESS_PARTNER_CONTACT', () => {
    const contacts = CustomerDetailsMock.getCustomerDetailsContactsGroupItem(1);
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_CONTACT,
        contacts,
      },
    ];
    store.dispatch(actions.saveBusinessPartnerContacts(contacts));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_ADD_BUSINESS_PARTNER_LOADER', () => {
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_LOADER,
        loader: true,
      },
    ];
    store.dispatch(actions.setBusinessPartnerLoader(true));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_ADD_BUSINESS_PARTNER_WINDOW', () => {
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_WINDOW,
        addBusinessPartnerWindowActive: true,
      },
    ];
    store.dispatch(actions.setBusinessPartnerWindowActive(true));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_BUSINESS_PARTNER_WINDOW_GROUP', () => {
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_WINDOW_GROUP,
        businessPartnerWindowGroup: 'group',
      },
    ];
    store.dispatch(actions.setBusinessPartnerWindowGroup('group'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_BUSINESS_PARTNER_CONTACT_ID', () => {
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_CONTACT_ID,
        businessPartnerContactId: 'id',
      },
    ];
    store.dispatch(actions.setBusinessPartnerContactId('id'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_UPDATE_CUSTOMER_SUCCESS', () => {
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.SET_UPDATE_CUSTOMER_SUCCESS,
        success: true,
      },
    ];
    store.dispatch(actions.setUpdateCustomerSuccess(true));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_UPDATE_CUSTOMER_ERROR', () => {
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.SET_UPDATE_CUSTOMER_ERROR,
        error: 'Something went wrong',
      },
    ];
    store.dispatch(actions.setUpdateCustomerError('Something went wrong'));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to RESET_BUSINESS_PARTNER_DATA', () => {
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_DATA,
      },
    ];
    store.dispatch(actions.resetBusinessPartnerData());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to RESET_BUSINESS_PARTNER_FIELDS', () => {
    const expectedAction = [
      {
        type: types.AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_FIELDS,
      },
    ];
    store.dispatch(actions.resetBusinessPartnerFields());
    expect(store.getActions()).toEqual(expectedAction);
  });
});
