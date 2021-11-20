import { AppLoadingTypes, AppLoadingActions } from './Types';
import configReducer, { createInitalConfigDefaultState } from './Reducers';

import OpportunityTypeMock from '../../mocks/OpportunityType.mock';
import ConfigMock from '../../mocks/Config.mock';
import AttributeMock from '../../mocks/Attribute.mock';

const initialState = createInitalConfigDefaultState();

describe('Config Reducer', () => {
  it('should return the initial state', () => {
    expect(configReducer(undefined, {} as AppLoadingActions)).toEqual(initialState);
  });

  it('should handle SAVE_LIST_OPPTY', () => {
    const opportunityTypes = OpportunityTypeMock.getOpportunityTypes(1);
    const state = { ...initialState, crmOpportunityTypes: opportunityTypes };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_OPPORTUNITY_TYPES,
        opportunityTypes,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPORTUNITY_STAGES', () => {
    const stages = ConfigMock.getStageInfo(1);
    const state = { ...initialState, crmOpportunityStage: stages };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_OPPORTUNITY_STAGES,
        stages,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_CURRENCIES', () => {
    const currencies = ConfigMock.getCurrencyItem(1);
    const state = { ...initialState, currency: currencies };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_CURRENCIES,
        currencies,
      })
    ).toEqual(state);
  });

  it('should handle SET_LOADING_MASK', () => {
    const state = { ...initialState, loadingMask: true };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SET_LOADING_MASK,
      })
    ).toEqual(state);
  });

  it('should handle REMOVE_LOADING_MASK', () => {
    const state = { ...initialState, loadingMask: false };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.REMOVE_LOADING_MASK,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_CUSTOMER_ATTRIBUTES', () => {
    const attributes = AttributeMock.getAttributeField(1);
    const state = { ...initialState, customerAttributes: attributes };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_CUSTOMER_ATTRIBUTES,
        attributes,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPORTUNITY_ATTRIBUTES', () => {
    const attributes = AttributeMock.getAttributeField(1);
    const state = { ...initialState, opportunityAttributes: attributes };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_OPPORTUNITY_ATTRIBUTES,
        attributes,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_PRODUCTS_ATTRIBUTES', () => {
    const attributes = AttributeMock.getAttributeField(1);
    const state = { ...initialState, productAttributes: attributes };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_PRODUCTS_ATTRIBUTES,
        attributes,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPORTUNITY_DEFAULT', () => {
    const defaultOppInfo = OpportunityTypeMock.getDefaultOpportunityInfo();
    const state = { ...initialState, defaultOpprtunityInfo: defaultOppInfo };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_OPPORTUNITY_DEFAULT,
        defaultOppInfo,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_COUNTRY_INFO', () => {
    const countries = ConfigMock.getCountryInfo(1);
    const state = { ...initialState, crmCountryInfo: countries };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_COUNTRY_INFO,
        countries,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_AREA_INFO', () => {
    const areas = ConfigMock.getAreaInfo(1);
    const state = { ...initialState, crmAreaInfo: areas };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_AREA_INFO,
        areas,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_OPPORTUNITY_CONTACT_ROLES', () => {
    const roles = ConfigMock.getDropDownValue(1);
    const state = { ...initialState, opportunityContactRoles: roles };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_OPPORTUNITY_CONTACT_ROLES,
        roles,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_INDUSTRY_INFO', () => {
    const industries = ConfigMock.getDropDownValue(1);
    const state = { ...initialState, crmIndustries: industries };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_INDUSTRY_INFO,
        crmIndustries: industries,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_PRODUCT_INFO', () => {
    const productFamily = ConfigMock.getDropDownValue(1);
    const state = { ...initialState, crmProductFamily: productFamily };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_PRODUCT_INFO,
        crmProductFamily: productFamily,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_FORECAST_INFO', () => {
    const forecastInfo = ConfigMock.getForeCastInfo(1);
    const state = { ...initialState, forecastInfo };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_FORECAST_INFO,
        forecastInfo,
      })
    ).toEqual(state);
  });

  it('should handle SAVE_REASON_CODES', () => {
    const reasons = ConfigMock.getReason(1);
    const state = { ...initialState, reasons };
    expect(
      configReducer(initialState, {
        type: AppLoadingTypes.SAVE_REASON_CODES,
        reasons,
      })
    ).toEqual(state);
  });
});
