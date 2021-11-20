import { OpportunityDetailsTypes, OpportunityDetailsReduxActions } from './Types';
import opportuntyDetailsReducer, { createOpportunityDetailsInitialState } from './Reducers';

import { OpportunityDetailsMock } from '../../mocks/OpportunityDetails.mock';
import AttributeMock from '../../mocks/Attribute.mock';
import ProductMock from '../../mocks/Product.mock';

const initialState = createOpportunityDetailsInitialState();

describe('Reports Reducer', () => {
  it('should return the initial state', () => {
    expect(opportuntyDetailsReducer(undefined, {} as OpportunityDetailsReduxActions)).toEqual(initialState);
  });

  it('should handle SAVE_OPPORTUNITY_DETAILS', () => {
    const opportunity = OpportunityDetailsMock.getOpportunityDetailsDefault();
    const state = { ...initialState, opportunityDefaultParams: { ...initialState.opportunityDefaultParams, ...opportunity } };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.SAVE_OPPORTUNITY_DETAILS,
        opportunity,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPORTUNITY_ATTRIBUTE_VALUES', () => {
    const attributes = AttributeMock.getAttributeValueObject(1);
    const state = { ...initialState, attributes };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.SAVE_OPPORTUNITY_ATTRIBUTE_VALUES,
        attributes,
      })
    ).toEqual(state);
  });

  it('should handle OPEN_FOR_EDIT', () => {
    const options = OpportunityDetailsMock.getOpportunityEditOptions();
    const state = { ...initialState, editOportunity: { ...initialState.editOportunity, ...options, error: '' } };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.OPEN_FOR_EDIT,
        options,
      })
    ).toEqual(state);
  });

  it('should handle EDIT_OPPORTUNITY_STATUS', () => {
    const success = OpportunityDetailsMock.getOpportunityEditOptions();
    const state = { ...initialState, editOportunity: { ...initialState.editOportunity, ...success } };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.EDIT_OPPORTUNITY_STATUS,
        success,
      })
    ).toEqual(state);
  });

  it('should handle SET_EDIT_OPPORTUNITY_ERROR', () => {
    const state = { ...initialState, editOportunity: { ...initialState.editOportunity, error: 'Something went wrong' } };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.SET_EDIT_OPPORTUNITY_ERROR,
        error: 'Something went wrong',
      })
    ).toEqual(state);
  });

  it('should handle SET_OPPTY_DETAILS_LOADING_MASK', () => {
    const state = { ...initialState, loader: true };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.SET_OPPTY_DETAILS_LOADING_MASK,
      })
    ).toEqual(state);
  });

  it('should handle REMOVE_OPPTY_DETAILS_LOADING_MASK', () => {
    const state = { ...initialState, loader: false };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.REMOVE_OPPTY_DETAILS_LOADING_MASK,
      })
    ).toEqual(state);
  });

  it('should handle SET_OPPORTUNITY_APPROVAL_STATUS', () => {
    const state = { ...initialState, editOportunity: { ...initialState.editOportunity, approvalSubmitMessage: 'Approved' } };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.SET_OPPORTUNITY_APPROVAL_STATUS,
        message: 'Approved',
      })
    ).toEqual(state);
  });

  it('should handle SET_OPPORTUNITY_DETAILS_ERROR', () => {
    const state = { ...initialState, error: 'Something went wrong' };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.SET_OPPORTUNITY_DETAILS_ERROR,
        error: 'Something went wrong',
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPORTUNITY_PRODUCTS', () => {
    const products = ProductMock.getProduct(1);
    const state = { ...initialState, products };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.SAVE_OPPORTUNITY_PRODUCTS,
        products,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPORTUNITY_CONTACTS', () => {
    const contacts = OpportunityDetailsMock.getOpportunityContact(1);
    const state = { ...initialState, contacts };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.SAVE_OPPORTUNITY_CONTACTS,
        contacts,
      })
    ).toEqual(state);
  });

  it('should handle RESET_OPPORTUNITY_DETAILS', () => {
    const state = {
      opportunityDefaultParams: {
        opportunityId: '',
        desc: '',
        customer: '',
        customerName: '',
        handler: '',
        area: '',
        stage: '',
        currency: '',
        endDate: '',
        oppRecordType: '',
      },
      attributes: [],
      products: [],
      contacts: [],
      editOportunity: {
        open: false,
      },
      loader: false,
    };
    expect(
      opportuntyDetailsReducer(initialState, {
        type: OpportunityDetailsTypes.RESET_OPPORTUNITY_DETAILS,
      })
    ).toEqual(state);
  });
});
