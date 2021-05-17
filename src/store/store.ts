import { applyMiddleware, combineReducers, createStore, Store, Reducer } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
import { composeWithDevTools } from 'redux-devtools-extension';


import  opportunityReducer  from './Opportunity/Reducers';
import {authReducer} from './Auth/Reducers';
import { OpportunityState } from './Opportunity/Types';
import { AuthState, AuthActions } from './Auth/Types';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth'] // which reducer want to store
};

export type AppActions = AuthActions;

export interface AppState {
  readonly opportunities: OpportunityState;
  readonly auth : AuthState
}
const appReducer = combineReducers({
  auth: authReducer 
});

const rootReducer = (state: any, action: AppActions) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined
  }

  return appReducer(state , action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

export {
  store, persistor
};