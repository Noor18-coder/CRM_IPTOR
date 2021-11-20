import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import configureStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import { createAuthInitialState } from '../store/Auth/Reducers';
import { createOpportunityInitialState } from '../store/Opportunity/Reducers';
import { createBusinessPartnerInitialState } from '../store/Customer/Reducer';
import { createUsersData } from '../store/Users/Reducers';
import { createInitalConfigDefaultState } from '../store/InitialConfiguration/Reducers';
import { createAddOpportunitInitialState } from '../store/AddOpportunity/Reducers';
import { createAddBusinessPartnerInitialState } from '../store/AddCustomer/Reducers';
import { createOpportunityDetailsInitialState } from '../store/OpportunityDetails/Reducers';
import { createReportInitialState } from '../store/Reports/Reducers';

import { AppState } from '../store';

type DispatchExts = ThunkDispatch<AppState, void, AnyAction>;
export type StoreType = MockStoreEnhanced<AppState, DispatchExts>;
export type AuthStoreType = MockStoreEnhanced<Pick<AppState, 'auth' | 'enviornmentConfigs'>, DispatchExts>;
export type AddCustomerStoreType = MockStoreEnhanced<Pick<AppState, 'addBusinessPartner'>, DispatchExts>;
export type AddOpportunityStoreType = MockStoreEnhanced<Pick<AppState, 'addOpportunity'>, DispatchExts>;
export type BusinesspartnersStoreType = MockStoreEnhanced<Pick<AppState, 'businesspartners'>, DispatchExts>;
export type UsersStoreType = MockStoreEnhanced<Pick<AppState, 'users'>, DispatchExts>;
export type ReportsStoreType = MockStoreEnhanced<Pick<AppState, 'reports'>, DispatchExts>;
export type OpportuntyDetailsStoreType = MockStoreEnhanced<Pick<AppState, 'opportuntyDetails'>, DispatchExts>;
export type OpportunitiesStoreType = MockStoreEnhanced<Pick<AppState, 'opportunities'>, DispatchExts>;
export type EnviornmentConfigsStoreType = MockStoreEnhanced<Pick<AppState, 'enviornmentConfigs'>, DispatchExts>;

export default class StoreMock {
  private static getMiddlewares = (): any[] => {
    return [thunk];
  };

  private static configureStore = (): MockStoreCreator<AppState, DispatchExts> => {
    return configureStore<AppState, DispatchExts>(StoreMock.getMiddlewares());
  };

  static createAppInitialState = (): AppState => {
    return {
      auth: createAuthInitialState(),
      users: createUsersData(),
      opportunities: createOpportunityInitialState(),
      businesspartners: createBusinessPartnerInitialState(),
      enviornmentConfigs: createInitalConfigDefaultState(),
      addOpportunity: createAddOpportunitInitialState(),
      addBusinessPartner: createAddBusinessPartnerInitialState(),
      opportuntyDetails: createOpportunityDetailsInitialState(),
      reports: createReportInitialState(),
    };
  };

  static createStore = (state: AppState): MockStoreEnhanced<AppState, DispatchExts> => {
    const mockStoreCreator = StoreMock.configureStore();
    return mockStoreCreator(state);
  };

  static createInitialStore = (): MockStoreEnhanced<AppState, DispatchExts> => {
    return StoreMock.createStore(StoreMock.createAppInitialState());
  };

  static createInitialLoginStore = (): MockStoreEnhanced<AppState, DispatchExts> => {
    const state = StoreMock.createAppInitialState();
    const newState: AppState = { ...state, auth: { ...state.auth, login: true } };
    return StoreMock.createStore(newState);
  };

  static createAnyStore = <T>(state: T): MockStoreEnhanced<T, DispatchExts> => {
    const mockStoreCreator = configureStore<T, DispatchExts>(StoreMock.getMiddlewares());
    return mockStoreCreator(state);
  };

  static createAuthStore = (): MockStoreEnhanced<Pick<AppState, 'auth' | 'enviornmentConfigs'>, DispatchExts> => {
    return StoreMock.createAnyStore<Pick<AppState, 'auth' | 'enviornmentConfigs'>>({
      auth: createAuthInitialState(),
      enviornmentConfigs: createInitalConfigDefaultState(),
    });
  };

  static createAddCustomerStore = (): MockStoreEnhanced<Pick<AppState, 'addBusinessPartner'>, DispatchExts> => {
    return StoreMock.createAnyStore<Pick<AppState, 'addBusinessPartner'>>({
      addBusinessPartner: createAddBusinessPartnerInitialState(),
    });
  };

  static createAddOpportunityStore = (): MockStoreEnhanced<Pick<AppState, 'addOpportunity'>, DispatchExts> => {
    return StoreMock.createAnyStore<Pick<AppState, 'addOpportunity'>>({
      addOpportunity: createAddOpportunitInitialState(),
    });
  };

  static createBusinesspartnersStore = (): MockStoreEnhanced<Pick<AppState, 'businesspartners'>, DispatchExts> => {
    return StoreMock.createAnyStore<Pick<AppState, 'businesspartners'>>({
      businesspartners: createBusinessPartnerInitialState(),
    });
  };

  static createUsersStore = (): MockStoreEnhanced<Pick<AppState, 'users'>, DispatchExts> => {
    return StoreMock.createAnyStore<Pick<AppState, 'users'>>({
      users: createUsersData(),
    });
  };

  static createReportsStore = (): MockStoreEnhanced<Pick<AppState, 'reports'>, DispatchExts> => {
    return StoreMock.createAnyStore<Pick<AppState, 'reports'>>({
      reports: createReportInitialState(),
    });
  };

  static createOpportuntyDetailsStore = (): MockStoreEnhanced<Pick<AppState, 'opportuntyDetails'>, DispatchExts> => {
    return StoreMock.createAnyStore<Pick<AppState, 'opportuntyDetails'>>({
      opportuntyDetails: createOpportunityDetailsInitialState(),
    });
  };

  static createOpportunitiesStore = (): MockStoreEnhanced<Pick<AppState, 'opportunities'>, DispatchExts> => {
    return StoreMock.createAnyStore<Pick<AppState, 'opportunities'>>({
      opportunities: createOpportunityInitialState(),
    });
  };

  static createEnviornmentConfigsStore = (): MockStoreEnhanced<Pick<AppState, 'enviornmentConfigs'>, DispatchExts> => {
    return StoreMock.createAnyStore<Pick<AppState, 'enviornmentConfigs'>>({
      enviornmentConfigs: createInitalConfigDefaultState(),
    });
  };
}
