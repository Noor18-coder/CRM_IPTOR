import thunk from 'redux-thunk';
import configureStore, { MockStore, MockStoreCreator } from "redux-mock-store"; 
import { createAuthInitialState } from '../store/Auth/Reducers';
import { createOpportunityInitialState } from '../store/Opportunity/Reducers';
import { createBusinessPartnerInitialState } from '../store/Customer/Reducer';
import { createInitalConfigDefaultState } from '../store/InitialConfiguration/Reducers';
import { createAddOpportunitInitialState } from '../store/AddOpportunity/Reducers';
import { createAddBusinessPartnerInitialState } from '../store/AddCustomer/Reducers';
import { createOpportunityDetailsInitialState } from '../store/OpportunityDetails/Reducers';
import {createUsersData } from '../store/Users/Reducers';
import { AppState } from '../store';

export class AppMock {
  
  private static getMiddlewares = () : any[] => {
    return [thunk]; 
  };

  private static configureStore = () : MockStoreCreator<AppState, {}> => {
    return configureStore<AppState, {}>(AppMock.getMiddlewares());
  };

  static createAppInitialState = () : AppState => {
    return {
      auth: createAuthInitialState(),
      users: createUsersData(),
      opportunities: createOpportunityInitialState(),
      businesspartners: createBusinessPartnerInitialState(),
      enviornmentConfigs: createInitalConfigDefaultState(),
      addOpportunity: createAddOpportunitInitialState(),
      addBusinessPartner: createAddBusinessPartnerInitialState(),
      opportuntyDetails:createOpportunityDetailsInitialState()
    };
  };

  static createStore = (state: AppState): MockStore<AppState> => { 
    const mockStoreCreator = AppMock.configureStore();
    const store = mockStoreCreator(state); 
    //store.clearActions(); ??
    return store; 
  };

  static createInitialStore = (): MockStore<AppState> => { 
    return AppMock.createStore(AppMock.createAppInitialState());
  };

  static createAnyStore = (state: any): MockStore<any> => { 
    const mockStoreCreator = configureStore(AppMock.getMiddlewares());
    const store = mockStoreCreator(state); 
    //store.clearActions(); ??
    return store; 
  };
}