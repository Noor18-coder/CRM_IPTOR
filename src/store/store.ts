import { applyMiddleware, combineReducers, createStore, Store, Reducer } from 'redux';
import thunk from 'redux-thunk';
import  opportunityReducer  from './Opportunity/Reducers';
import { OpportunityState } from './Opportunity/Types';

export interface AppState {
  readonly opportunities: OpportunityState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
   opportunities: opportunityReducer
});

export function configureStore(initialState?: AppState): Store<AppState> {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
}