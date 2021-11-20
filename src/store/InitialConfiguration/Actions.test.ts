import * as types from './Types';
import * as actions from './Actions';

import StoreMock, { EnviornmentConfigsStoreType } from '../../mocks/Store.mock';
import OpportunityTypeMock from '../../mocks/OpportunityType.mock';
import ConfigMock from '../../mocks/Config.mock';
import AttributeMock from '../../mocks/Attribute.mock';

let store: EnviornmentConfigsStoreType;

describe('Config Actions', () => {
  beforeAll(() => {
    store = StoreMock.createEnviornmentConfigsStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  afterAll(() => {
    store = {} as EnviornmentConfigsStoreType;
  });

  it('should create an action to SAVE_OPPTY_REPORT_PARAMS', () => {
    const opportunityTypes = OpportunityTypeMock.getOpportunityTypes(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_OPPORTUNITY_TYPES,
        opportunityTypes,
      },
    ];
    store.dispatch(actions.saveOpptyTypes(opportunityTypes));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPORTUNITY_STAGES', () => {
    const stages = ConfigMock.getStageInfo(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_OPPORTUNITY_STAGES,
        stages,
      },
    ];
    store.dispatch(actions.saveOpptyStages(stages));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_CURRENCIES', () => {
    const currencies = ConfigMock.getCurrencyItem(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_CURRENCIES,
        currencies,
      },
    ];
    store.dispatch(actions.saveCurrencies(currencies));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPORTUNITY_ATTRIBUTES', () => {
    const attributes = AttributeMock.getAttributeField(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_OPPORTUNITY_ATTRIBUTES,
        attributes,
      },
    ];
    store.dispatch(actions.saveOpportunityAttributes(attributes));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_CUSTOMER_ATTRIBUTES', () => {
    const attributes = AttributeMock.getAttributeField(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_CUSTOMER_ATTRIBUTES,
        attributes,
      },
    ];
    store.dispatch(actions.saveCustomerAttributes(attributes));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_PRODUCTS_ATTRIBUTES', () => {
    const attributes = AttributeMock.getAttributeField(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_PRODUCTS_ATTRIBUTES,
        attributes,
      },
    ];
    store.dispatch(actions.saveProductsAttributes(attributes));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_LOADING_MASK', () => {
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SET_LOADING_MASK,
      },
    ];
    store.dispatch(actions.setLoadingMask());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to REMOVE_LOADING_MASK', () => {
    const expectedAction = [
      {
        type: types.AppLoadingTypes.REMOVE_LOADING_MASK,
      },
    ];
    store.dispatch(actions.removeLoadingMask());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SET_ERROR_MSG', () => {
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SET_ERROR_MSG,
      },
    ];
    store.dispatch(actions.setErrorMessage());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPORTUNITY_DEFAULT', () => {
    const defaultOppInfo = OpportunityTypeMock.getDefaultOpportunityInfo();
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_OPPORTUNITY_DEFAULT,
        defaultOppInfo,
      },
    ];
    store.dispatch(actions.saveDefaultOpportunity(defaultOppInfo));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_COUNTRY_INFO', () => {
    const countries = ConfigMock.getCountryInfo(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_COUNTRY_INFO,
        countries,
      },
    ];
    store.dispatch(actions.saveCountryInfo(countries));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_AREA_INFO', () => {
    const areas = ConfigMock.getAreaInfo(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_AREA_INFO,
        areas,
      },
    ];
    store.dispatch(actions.saveAreaInfo(areas));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_OPPORTUNITY_CONTACT_ROLES', () => {
    const roles = ConfigMock.getDropDownValue(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_OPPORTUNITY_CONTACT_ROLES,
        roles,
      },
    ];
    store.dispatch(actions.saveOpportunityContactRoles(roles));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_INDUSTRY_INFO', () => {
    const crmIndustries = ConfigMock.getDropDownValue(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_INDUSTRY_INFO,
        crmIndustries,
      },
    ];
    store.dispatch(actions.saveIndustryInfo(crmIndustries));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_PRODUCT_INFO', () => {
    const crmProductFamily = ConfigMock.getDropDownValue(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_PRODUCT_INFO,
        crmProductFamily,
      },
    ];
    store.dispatch(actions.saveProductInfo(crmProductFamily));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_FORECAST_INFO', () => {
    const forecastInfo = ConfigMock.getForeCastInfo(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_FORECAST_INFO,
        forecastInfo,
      },
    ];
    store.dispatch(actions.saveForeCastInfo(forecastInfo));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action to SAVE_REASON_CODES', () => {
    const reasons = ConfigMock.getReason(1);
    const expectedAction = [
      {
        type: types.AppLoadingTypes.SAVE_REASON_CODES,
        reasons,
      },
    ];
    store.dispatch(actions.saveReasonCodes(reasons));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
