import { AddBusinessPartnerTypes, AddBusinessPartnerReduxActions } from './Types';
import addBusinessPartnerReducer, { createAddBusinessPartnerInitialState } from './Reducers';
import CustomerDetailsMock from '../../mocks/CustomerDetails.mock';
import { OpportunityDetailsMock } from '../../mocks/OpportunityDetails.mock';

const initialBusinessPartnerState = createAddBusinessPartnerInitialState();

describe('Business Partner Reducer', () => {
  it('should return the initial state', () => {
    expect(addBusinessPartnerReducer(undefined, {} as AddBusinessPartnerReduxActions)).toEqual(initialBusinessPartnerState);
  });

  it('should handle SAVE_BUSINESS_PARTNER_DEFAULT_FIELDS', () => {
    const businessPartner = CustomerDetailsMock.getCustomerDetailsDefaultFields();
    const state = { ...initialBusinessPartnerState, businessPartnerDefaultFields: businessPartner };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_DEFAULT_FIELDS,
        businessPartner,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_BUSINESS_PARTNER_ATTRIBUTE', () => {
    const attributes = OpportunityDetailsMock.getOpportunityDetailsGroupItem(1);
    const state = { ...initialBusinessPartnerState, attributes };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_ATTRIBUTE,
        attributes,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_BUSINESS_PARTNER_CONTACT', () => {
    const contacts = CustomerDetailsMock.getCustomerDetailsContactsGroupItem(1);
    const state = { ...initialBusinessPartnerState, contacts };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.SAVE_BUSINESS_PARTNER_CONTACT,
        contacts,
      })
    ).toEqual(state);
  });

  it('should handle SET_ADD_BUSINESS_PARTNER_LOADER', () => {
    const state = { ...initialBusinessPartnerState, loader: true };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_LOADER,
        loader: true,
      })
    ).toEqual(state);
  });

  it('should handle SET_ADD_BUSINESS_PARTNER_WINDOW', () => {
    const state = { ...initialBusinessPartnerState, addBusinessPartnerWindowActive: true };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.SET_ADD_BUSINESS_PARTNER_WINDOW,
        addBusinessPartnerWindowActive: true,
      })
    ).toEqual(state);
  });

  it('should handle SET_BUSINESS_PARTNER_WINDOW_GROUP', () => {
    const state = { ...initialBusinessPartnerState, businessPartnerWindowGroup: 'window' };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_WINDOW_GROUP,
        businessPartnerWindowGroup: 'window',
      })
    ).toEqual(state);
  });

  it('should handle SET_BUSINESS_PARTNER_CONTACT_ID', () => {
    const state = { ...initialBusinessPartnerState, businessPartnerContactId: 'someId' };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.SET_BUSINESS_PARTNER_CONTACT_ID,
        businessPartnerContactId: 'someId',
      })
    ).toEqual(state);
  });

  it('should handle SET_UPDATE_CUSTOMER_SUCCESS', () => {
    const state = { ...initialBusinessPartnerState, success: true };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.SET_UPDATE_CUSTOMER_SUCCESS,
        success: true,
      })
    ).toEqual(state);
  });

  it('should handle SET_UPDATE_CUSTOMER_ERROR', () => {
    const state = { ...initialBusinessPartnerState, error: 'Something went wrong' };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.SET_UPDATE_CUSTOMER_ERROR,
        error: 'Something went wrong',
      })
    ).toEqual(state);
  });

  it('should handle RESET_BUSINESS_PARTNER_DATA', () => {
    const state = {
      ...initialBusinessPartnerState,
      loader: false,
      addBusinessPartnerWindowActive: false,
      items: [],
      businessPartnerWindowGroup: '',
      businessPartnerContactId: '',
      success: false,
      error: '',
    };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_DATA,
      })
    ).toEqual(state);
  });

  it('should handle RESET_BUSINESS_PARTNER_FIELDS', () => {
    const state = {
      ...initialBusinessPartnerState,
      businessPartnerDefaultFields: {},
      attributes: [],
      contacts: [],
    };
    expect(
      addBusinessPartnerReducer(initialBusinessPartnerState, {
        type: AddBusinessPartnerTypes.RESET_BUSINESS_PARTNER_FIELDS,
      })
    ).toEqual(state);
  });
});
