import { applyMiddleware, combineReducers, createStore, Store, Reducer } from 'redux';
import thunk from 'redux-thunk';
import  opportunityReducer  from './Opportunity/Reducers';
import {authReducer} from './Auth/Reducers';
import { OpportunityState } from './Opportunity/Types';
import { AuthState } from './Auth/Types';

export interface AppState {
  readonly opportunities: OpportunityState;
  readonly auth : AuthState
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
   opportunities: opportunityReducer,
   auth: authReducer,
});

export function configureStore(initialState?: AppState): Store<AppState> {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
}